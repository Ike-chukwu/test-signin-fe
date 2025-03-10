"use client";
import React, { Fragment, useCallback, useMemo, useState } from "react";
import { useFormContext } from "react-hook-form";
import InputField from "../UI/Input";
import SelectField from "../UI/Select";

const StepTwo = () => {
  const methods = useFormContext();
  const idTypeValue = methods.watch("idType");
  return (
    <div className="flex flex-col gap-4">
      <div>
        <InputField
          label="Mobile Number"
          name="mobileNo"
          type="text"
          labelClassName="text-xs font-bold capitalize pb-2"
          error={methods.formState.errors.mobileNo?.message as string}
          inputClassName="px-4 py-3 border-[0.1px] border-grey rounded-[4px] w-full text-[14px]  "
        />
      </div>
      <div>
        <SelectField
          error={methods.formState.errors.idType?.message as string}
          options={[
            { id: 0, name: "Drivers License" },
            { id: 1, name: "Passport" },
          ]}
          name="idType"
          label="ID Type"
          labelClassName="text-xs font-bold capitalize"
          selectClassName="px-3 text-[14px] outline-none py-4 border-[0.1px] border-grey w-full"
        />
      </div>
      {idTypeValue == 0 && (
        <div>
          <InputField
            label="Drivers License Number"
            name="driverLicenseNumber"
            type="text"
            labelClassName="text-[12px] font-bold capitalize ] pt-6 pb-2"
            error={
              methods.formState.errors.driverLicenseNumber?.message as string
            }
            inputClassName="px-4 py-3 border-[0.1px] border-grey rounded-[4px] w-full text-[14px]  "
          />
        </div>
      )}
      {idTypeValue == 0 && (
        <div>
          <InputField
            label="Expiry Date"
            name="expiryDate"
            type="date"
            labelClassName="text-[12px] font-bold capitalize ] pt-6 pb-2"
            error={methods.formState.errors.expiryDate?.message as string}
            inputClassName="px-4 py-3 border-[0.1px] border-grey rounded-[4px] w-full text-[14px]  "
          />
        </div>
      )}
      {idTypeValue == 0 && (
        <div>
          <InputField
            label="Issue Date"
            name="issueDate"
            type="date"
            labelClassName="text-[12px] font-bold capitalize ] pt-6 pb-2"
            error={methods.formState.errors.issueDate?.message as string}
            inputClassName="px-4 py-3 border-[0.1px] border-grey rounded-[4px] w-full text-[14px]  "
          />
        </div>
      )}
      {/* <div>
        <InputField
          label="Address"
          name="address"
          type="text"
          labelClassName="text-[12px] font-bold capitalize ] pt-6 pb-2"
          error={methods.formState.errors.address?.message as string}
          inputClassName="px-4 py-3 border-[0.1px] border-grey rounded-[4px] w-full text-[10px]  "
        />
      </div> */}
    </div>
  );
};

export default StepTwo;
