"use client";
// import { Image } from "@nextui-org/image";
import React, { Fragment } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import NextImage from "next/image";
// import { Progress } from "@nextui-org/progress";
import clsx from "clsx";
import InputField from "../UI/Input";
import ImagePicker from "../UI/ImagePicker";
import FormImagePicker from "../FormImagePicker";

const StepThree = () => {
  const { control, watch, setValue } = useFormContext();

  const methods = useFormContext();

  return (
    <div className="flex flex-col gap-4">
      <div>
        <InputField
          label="Mother's Maiden Name"
          name="mothersMaidenName"
          type="text"
          labelClassName="text-[12px] font-bold capitalize pb-2"
          error={methods.formState.errors.mothersMaidenName?.message as string}
          inputClassName="px-4 py-3 border-[0.1px] border-grey rounded-[4px] w-full text-[14px]  "
        />
      </div>

      <div>
        <InputField
          label="Father's Fullname"
          name="fathersFullName"
          type="text"
          labelClassName="text-[12px] font-bold capitalize pb-2"
          error={methods.formState.errors.fathersFirstName?.message as string}
          inputClassName="px-4 py-3 border-[0.1px] border-grey rounded-[4px] w-full text-[15px]  "
        />
      </div>
      <div>
        <FormImagePicker
          // height="1280"
          // width="720"
          name="driverLicenseFp"
          render={(
            isLoading,
            isUploaded,
            isSelected,
            handleImageChange,
            imageDetails,
            imageValue,
            renderLoader,
            error,
            imgStatus,
            isMultiple,
            className,
            setValue,
            name
          ) => (
            <div className="mb-3">
              <p className="text-[10px] font-bold md:text-sm">
                Drivers License Front Page
              </p>
              <ImagePicker
                className="space-y-3"
                id="driverLicenseFp"
                imageDetails={imageDetails}
                imageValue={imageValue}
                isLoading={isLoading}
                isSelected={isSelected}
                isUploaded={isUploaded}
                name={name}
                renderLoader={renderLoader}
                setValue={setValue}
                showBtn={true}
                onImageChange={handleImageChange}
              />
            </div>
          )}
        />
      </div>
      <div>
        <FormImagePicker
          // height="1280"
          // width="720"
          name="driverLicenseBp"
          render={(
            isLoading,
            isUploaded,
            isSelected,
            handleImageChange,
            imageDetails,
            imageValue,
            renderLoader,
            error,
            imgStatus,
            isMultiple,
            className,
            setValue,
            name
          ) => (
            <div className="mb-3">
              <label className="text-[10px] font-bold  md:text-sm">
                Drivers License Back Page
              </label>
              <ImagePicker
                className="space-y-3"
                id="driverLicenseBp"
                imageDetails={imageDetails}
                imageValue={imageValue}
                isLoading={isLoading}
                isSelected={isSelected}
                isUploaded={isUploaded}
                name={name}
                renderLoader={renderLoader}
                setValue={setValue}
                showBtn={true}
                onImageChange={handleImageChange}
              />
            </div>
          )}
        />
      </div>
    </div>
  );
};

export default StepThree;
