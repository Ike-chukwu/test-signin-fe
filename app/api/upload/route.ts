import { NextRequest, NextResponse } from "next/server";
import sharp from "sharp";
import { Buffer } from "node:buffer";
import crypto from "crypto";
import cloudinary from "@/lib/cloudinary";
import { UploadApiResponse } from "cloudinary";

export async function POST(req: NextRequest) {
  const images: string[] = [];
  const errors: string[] = [];

  try {
    const formData = await req.formData();
    const files = formData.getAll("file") as File[];
    const minWidth = +((formData.get("width") as string) || "0");
    const minHeight = +((formData.get("height") as string) || "0");

    if (!files.length) {
      return NextResponse.json(
        { message: "No files uploaded" },
        { status: 400 }
      );
    }

    for (const file of files) {
      try {
        if (file.size > 1024 * 1024 * 10) {
          errors.push("File size can not be larger than 2mb");
          continue;
        }

        // Process image
        const buffer = await file.arrayBuffer();
        const sharpImage = sharp(Buffer.from(buffer));
        const metadata = await sharpImage.metadata();

        const isStandard =
          minWidth && minHeight
            ? (metadata.width ?? 0) >= minWidth ||
            (metadata.height ?? 0) >= minHeight
            : true;

        if (!isStandard) {
          errors.push(
            ` ${file.name} does not meet minimum requirements of ${minWidth}x${minHeight}`
          );
          continue;
        }

        // Generate optimized image
        let optimizedBuffer: Buffer;
        if (minWidth && minHeight) {
          optimizedBuffer = await sharpImage
            .resize({
              width: minWidth,
              height: minHeight,
              fit: "cover",
            })
            .toFormat("webp", { quality: 80 })
            .toBuffer();
        } else {
          optimizedBuffer = await sharpImage
            .toFormat("webp", { quality: 80 })
            .toBuffer();
        }

        // Generate filename
        const fileName = `${file.name.substring(
          0,
          file.name.lastIndexOf(".")
        )}-${crypto.randomUUID()}`;

        // Upload to Cloudinary using buffer
        const uploadResult = await new Promise<UploadApiResponse>(
          (resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
              {
                public_id: fileName,
                folder: "images",
                resource_type: "image",
                format: "webp",
              },
              (error, result) => {
                if (error) reject(error);
                else if (result) resolve(result as UploadApiResponse);
                else reject(new Error("Upload failed with no result"));
              }
            );

            uploadStream.end(optimizedBuffer);
          }
        );

        images.push(uploadResult.secure_url);
      } catch (error: any) {
        errors.push(`Error processing ${file.name}: ${error.message}`);
      }
    }

    return NextResponse.json({ images, errors }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      {
        message: error.message || "Error processing images",
        error: error,
      },
      { status: 500 }
    );
  }
}