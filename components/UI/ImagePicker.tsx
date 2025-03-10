import React, { ChangeEvent, ReactNode, useEffect, useState } from "react";
import { Progress } from "@nextui-org/progress";
import { Image } from "@nextui-org/image";
import NextImage from "next/image";
import clsx from "clsx";
import { FieldValues, UseFormSetValue } from "react-hook-form";

import { CancelIcon, ImageDefault, UploadIcon } from "../icons";

import { getImageName } from "../../constants";

type Prop = {
  // src?: string;
  onImageChange: (event: ChangeEvent<HTMLInputElement>) => void;
  isLoading: boolean;
  isSelected?: boolean;
  isUploaded?: boolean;
  showBtn?: boolean;
  imageDetails?: {
    name: string;
    size: number;
  }[];
  id: string;
  imageValue: string;
  // progress: number;
  renderLoader?: (
    imageValue: string,
    progress: number,
    isLoading: boolean,
    imageDetails?: {
      name: string;
      size: number;
    }[],
    isSelected?: boolean,
    isUploaded?: boolean,
    renderLoader?: () => ReactNode,
  ) => ReactNode;
  isMultiple?: boolean;
  className?: string;
  pickerClass?: string;
  setValue?: UseFormSetValue<FieldValues>;
  name?: string;
  remove?: (index?: number | number[]) => void;
};
const ImagePicker: React.FC<Prop> = ({
  // src,
  onImageChange,
  isLoading,
  isUploaded,
  showBtn,
  id = "id",
  imageDetails,
  imageValue,
  // progress,
  renderLoader,
  isSelected,
  pickerClass,
  className,
  isMultiple,
  setValue,
  name,
  remove,
}) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let intervalId: any;

    if (isLoading) {
      intervalId = setInterval(() => {
        setProgress((prevProgress) => {
          if (prevProgress >= 90) {
            clearInterval(intervalId);

            return 90;
          }

          return prevProgress + 5;
        });
      }, 1000);
    }

    if (isUploaded) {
      setProgress(100);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isLoading, isUploaded]);

  const deleteImage = () => {
    if (setValue && name) {
      setValue(name, "", {
        shouldValidate: true,
      });
    } else {
      remove?.();
    }
  };

  return (
    <>
      <div className={clsx(className, "")}>
        <label
          className="grid w-full cursor-pointer place-content-center rounded-[4px] border-[1px] border-dashed border-content2 px-[33.5px] py-4"
          htmlFor={id}
        >
          <div className={clsx("flex items-center gap-[18px]", pickerClass)}>
            {showBtn ? <UploadIcon height="40px" width="40px" /> : null}
            <div className="space-y-1 text-xs font-light text-black">
              <p>Click to Upload image</p>
              <p>svg, png or png (max ---kb)</p>
            </div>
          </div>

          <input
            key={imageValue}
            hidden
            accept="image/*"
            id={id}
            multiple={isMultiple}
            type="file"
            onInput={(e) => {
              onImageChange(e as any);
              e.currentTarget.value = "";
            }}
          />
        </label>
        {renderLoader ? (
          renderLoader(
            imageValue,
            progress,
            isLoading,
            imageDetails,
            isSelected,
            isUploaded,
          )
        ) : (
          <>
            {isSelected ||
            isUploaded ||
            isLoading ||
            (Array.isArray(imageValue) && imageValue.length > 0) ||
            (!Array.isArray(imageValue) && imageValue) ? (
              <div className="mx-auto w-full max-w-[359px] rounded-[4px] border border-[#626262] px-[15px] py-[10px]">
                <section className="flex justify-between">
                  {imageValue ? (
                    <div className="flex w-full items-center justify-between gap-[10px] overflow-clip">
                      <div className="flex items-center gap-[11px]">
                        <div className="relative shrink-0 overflow-hidden">
                          <Image
                            alt="image"
                            as={NextImage}
                            className="rounded-[4px]"
                            fallbackSrc="https://via.placeholder.com/100x50"
                            height={100}
                            src={imageValue}
                            width={50}
                          />
                        </div>
                        <div className="flex flex-col gap-[1px] text-xs font-normal text-[#AAAAAA]">
                          <p>{getImageName(imageValue)}</p>
                          {/* <p className="text-xs">{imageValue.size}</p> */}
                        </div>
                      </div>

                      <button
                        className="flex items-center gap-[6px] rounded-lg bg-[#1F1F1F] px-[10px] py-[5px]"
                        type="button"
                        onClick={deleteImage}
                      >
                        <CancelIcon height="14" width="14" />
                        <span className="text-[10px]">Delete</span>
                      </button>
                    </div>
                  ) : (
                    <>
                      <div className="flex items-center gap-[10px]">
                        <ImageDefault height="24" width="24" />
                        <div className="flex flex-col gap-[1px] text-xs font-normal text-[#AAAAAA]">
                          <p>{imageValue}</p>
                          {/* <p className="text-[10px]">{imageValue?.size}</p> */}
                        </div>
                      </div>
                      <CancelIcon height="14" width="14" />
                    </>
                  )}
                </section>

                {isLoading && !isUploaded ? (
                  <div className="flex items-baseline justify-center gap-[7px]">
                    <Progress
                      key={imageValue}
                      aria-label="Downloading..."
                      className="max-w-[305px]"
                      classNames={{
                        base: "bg-[#D9D9D9]",
                      }}
                      color="primary"
                      size="sm"
                      value={progress}
                    />
                    <div className="text-[10px] text-[#626262]">{`${progress}%`}</div>
                  </div>
                ) : null}
              </div>
            ) : null}
          </>
        )}
      </div>
    </>
  );
};

export default ImagePicker;
