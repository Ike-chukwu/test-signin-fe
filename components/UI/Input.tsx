"use client";
// import { Controller, useFormContext } from "react-hook-form";
import { Controller, useFormContext } from "react-hook-form";
import { cn } from "../../utils";
import React from "react";
type Props = {
  inputClassName?: string;
  type?: string;
  label: string;
  labelClassName?: string;
  error?: string;
  name: string;
  placeHolder?: string;
};

const InputField = ({
  error,
  inputClassName,
  label,
  labelClassName,
  type,
  name,
  placeHolder,
}: Props) => {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext(); // retrieve all hook methods
  // console.log(errors[name]?.message);

  return (
    <>
      <label htmlFor="" className={labelClassName}>
        {label}
      </label>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value } }) => (
          <input
            placeholder={placeHolder}
            type={type}
            className={cn(
              inputClassName,
              error ? "border border-red-500" : null
            )}
            onChange={onChange}
            value={value}
            aria-invalid={error ? "true" : "false"}
          />
        )}
      ></Controller>
      {error && (
        <span className="text-red-500 text-[12px]" role="alert">
          {error}
        </span>
      )}
    </>
  );
};

export default InputField;
