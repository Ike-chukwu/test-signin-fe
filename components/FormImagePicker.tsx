import React, { ChangeEvent, ReactNode, useState } from "react";
import { FieldValues, useFormContext, UseFormSetValue } from "react-hook-form";
import { clsx } from "clsx";

// import Image from "next/image";
import { toast } from "sonner";

import ImagePicker from "./UI/ImagePicker";

import { FileStatus } from "../helpers/common/index";
import { useUploadImages } from "../hooks/image";

type Prop = {
  name: string;
  className?: string;
  errorClass?: string;
  render?: (
    isLoading: boolean,
    isUploaded: boolean,
    isSelected: boolean,
    handleImageChange: (e: ChangeEvent<HTMLInputElement>) => void,
    imageDetails: {
      name: string;
      size: number;
    }[],
    imageValue: string,
    renderLoader?: (
      imageValue: string,
      progress: number,
      isLoading: boolean,
      imageDetails?: {
        name: string;
        size: number;
      }[],
      isSelected?: boolean,
      isUploaded?: boolean
    ) => ReactNode,
    error?: string,
    imgStatus?: FileStatus,
    isMultiple?: boolean,
    className?: string,
    setValue?: UseFormSetValue<FieldValues>,
    name?: string
    // progress?:number
  ) => ReactNode;
  renderLoader?: (
    imageValue: string,
    progress: number,
    isLoading: boolean,
    imageDetails?: {
      name: string;
      size: number;
    }[],
    isSelected?: boolean,
    isUploaded?: boolean
  ) => ReactNode;
  showBtn?: boolean;
  isMultiple?: boolean;
  imageLabel?: string;
  width?: string;
  height?: string;
  // imageProps?: Pick<ComponentProps<typeof ImagePicker>, "lightbox">;
};

const FormImagePicker: React.FC<Prop> = ({
  name,
  errorClass,
  className,
  render,
  renderLoader,
  showBtn = true,
  width,
  height,
  isMultiple,
  imageLabel,
}) => {
  const [imageDetails, setImageDetails] = useState<
    Array<{ name: string; size: number }>
  >([]);

  const { mutate } = useUploadImages();

  const {
    control,
    formState: { errors },
    register,
    setValue,
    watch,
  } = useFormContext();

  const imageValue = watch(name);
  const error = errors[name]?.message;

  const [imgStatus, setImgStatus] = useState<FileStatus>();

  const deleteImage = (name: string) => {
    imageDetails?.filter((image) => image.name !== name);
  };

  const imageChange = async (e: ChangeEvent<HTMLInputElement>) => {
    setImgStatus(FileStatus.SELECTED);
    if (e.target.files?.length) {
      setImgStatus(FileStatus.UPLOADING);
      const files = e.target.files;
      const images = [];

      const formData = new FormData();

      formData.append("width", `${width}`);
      formData.append("height", `${height}`);

      for (let x = 0; x < files.length; x++) {
        formData.append("file", files[x]);
      }

      // try {
      //   const { images, errors } = await uploadImages(formData);
      //
      //   if (errors?.length) {
      //     errors?.map((error: any) => toast.error(error));
      //   }
      //
      //   if (images?.length) {
      //     if (!isMultiple) {
      //       setValue(name, images[0], {
      //         shouldValidate: false,
      //       });
      //     } else {
      //       setValue(name, [...imageValue, ...images], {
      //         shouldValidate: false,
      //       });
      //     }
      //     setImgStatus(FileStatus.UPLOADED);
      //   } else {
      //     setImgStatus(FileStatus.ERROR);
      //   }
      // } catch (e) {
      //   setImgStatus(FileStatus.ERROR);
      // }
      //
      // setTimeout(() => setImgStatus(undefined), 3000);

      const response = await fetch("/api/upload", {
        body: formData,
        method: "POST",
      });

      if (response.ok) {
        const { images, errors } = await response.json();

        if (errors?.length) {
          errors?.map((error: any) => toast.error(error));
        }
        if (images?.length) {
          if (!isMultiple) {
            setValue(name, images[0], {
              shouldValidate: false,
            });
          } else {
            setValue(name, [...imageValue, ...images], {
              shouldValidate: false,
            });
          }
          setImgStatus(FileStatus.UPLOADED);
        } else {
          setImgStatus(FileStatus.ERROR);
        }
      } else {
        setImgStatus(FileStatus.ERROR);
      }
      setTimeout(() => setImgStatus(undefined), 3000);

      // try {
      //   for (const file of Object.values(e.target.files)) {
      //     const fileName = `${file.name}-${crypto.randomUUID()}`;
      //     const bucketParams = {
      //       Bucket: SPACES_BUCKET,
      //       Key: fileName,
      //       Body: file,
      //       ContentType: file.type,
      //       ACL: "public-read" as const,
      //     };
      //
      //     const resp = await s3Client.send(new PutObjectCommand(bucketParams));
      //
      //     if (resp) {
      //       images.push(`${SPACES_URL}/${fileName}`);
      //       // images.push({
      //       //   imgUrl: `${SPACES_URL}/${fileName}`,
      //       //   name: file.name,
      //       //   size: file.size,
      //       // });
      //     }
      //   }
      //   if (images.length == 1 && !Array.isArray(imageValue)) {
      //     setValue(name, images[0], {
      //       shouldValidate: true,
      //     });
      //   } else {
      //     setValue(name, [...imageValue, ...images], {
      //       shouldValidate: true,
      //     });
      //   }
      //
      //   setImgStatus(FileStatus.UPLOADED);
      //   setTimeout(() => setImgStatus(undefined), 3000);
      // } catch (e) {
      //   console.error(e);
      //   setImgStatus(FileStatus.ERROR);
      // }
    }
  };

  return (
    <div className={className}>
      {render ? (
        render(
          imgStatus === FileStatus.UPLOADING,
          imgStatus === FileStatus.UPLOADED,
          imgStatus === FileStatus.SELECTED,
          imageChange,
          imageDetails,
          imageValue,
          renderLoader,
          error?.toString(),
          imgStatus,
          isMultiple,
          className,
          setValue,
          name
        )
      ) : (
        <>
          <div className="flex flex-col gap-2.5 rounded-[4px] border border-[#626262] p-3">
            <p className="text-xs text-[#AAAAAA] md:text-sm">{imageLabel}</p>
            <ImagePicker
              // {...imageProps}
              id={name}
              imageDetails={imageDetails}
              imageValue={imageValue}
              isLoading={imgStatus === FileStatus.UPLOADING}
              isMultiple={isMultiple}
              isSelected={imgStatus === FileStatus.SELECTED}
              isUploaded={imgStatus === FileStatus.UPLOADED}
              name={name}
              renderLoader={renderLoader}
              setValue={setValue}
              showBtn={showBtn}
              onImageChange={imageChange}
            />
            <small className={clsx(errorClass, "block text-xs text-red-600")}>
              {error?.toString()}
            </small>
            {/* <small className={clsx(errorClass, "font-futura-md block text-xs")}>
              {imgStatus}
            </small> */}
          </div>
        </>
      )}
    </div>
  );
};

export default FormImagePicker;
