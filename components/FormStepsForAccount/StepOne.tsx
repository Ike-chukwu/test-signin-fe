"use client";
import React, { Fragment, useCallback, useMemo, useState } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import InputField from "../UI/Input";

const StepOne = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [add, setAdd] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [id, setId] = useState<number | undefined>(undefined);

  const { control, watch } = useFormContext();
  const {
    fields: filmExtraFields,
    append,
    remove,
    update,
  } = useFieldArray<any, any, any>({
    control,
    name: "filmExtras",
  });
  const filmExtras = watch("filmExtras");

  const handleAddExtra = useCallback(() => {
    append({
      filmName: "",
      trailerUrl: "",
      synopsis: "",
      shortSynopsis: "",
      description: "",
      distributorId: "",
      filmRatingId: "",
      duration: 0,
      countryId: "",
    });
    setAdd(true);
    setIsOpen(true);
    setIsEdit(false);
  }, [append]);

  const addExtra = useCallback(
    (extraId: number) => {
      update(extraId, {
        filmName: filmExtras[extraId].filmName,
        trailerUrl: filmExtras[extraId].trailerUrl,
        synopsis: filmExtras[extraId].synopsis,
        shortSynopsis: filmExtras[extraId].shortSynopsis,
        description: filmExtras[extraId].description,
        distributorId: filmExtras[extraId].distributorId,
        filmRatingId: filmExtras[extraId].filmRatingId,
        duration: filmExtras[extraId].duration,
        countryId: filmExtras[extraId].countryId,
      });
      setIsOpen(false);
      setIsEdit(false);
    },

    [filmExtras, update]
  );

  const deleteExtra = useCallback(
    (extraId: number | undefined) => {
      remove(extraId);
    },
    [remove]
  );

  const editExtra = useCallback((extraId: number) => {
    setAdd(false);
    setIsEdit(true);
    setIsOpen(true);
    setId(extraId);
  }, []);

  const handleSave = useCallback(() => {
    const extrasIndex = !isEdit ? filmExtraFields.length - 1 : id;

    if (typeof extrasIndex === "number") {
      addExtra(extrasIndex);
    } else {
      // console.error("Invalid extra index");
    }
  }, [addExtra, isEdit, filmExtraFields.length, id]);

  const handleModalClose = () => {
    if (add && !filmExtraFields[filmExtraFields?.length - 1]?.filmName) {
      deleteExtra(filmExtraFields?.length - 1);
    }

    setTimeout(() => setIsOpen(false), 1000);
  };
  const methods = useFormContext();

  return (
    <div className="flex flex-col gap-4">
      <div>
        <InputField
          label="Full Name"
          name="fullname"
          type="text"
          labelClassName="text-xs font-bold capitalize pb-2"
          error={methods.formState.errors.fullname?.message as string}
          inputClassName="px-4 py-3 border-[0.1px] border-grey rounded-[4px] w-full text-[14px]  "
        />
      </div>
      <div>
        <InputField
          label="Date of Birth"
          name="dob"
          type="date"
          labelClassName="text-xs font-bold capitalize ] pt-6 pb-2"
          error={methods.formState.errors.dob?.message as string}
          inputClassName="px-4 py-3 border-[0.1px] border-grey rounded-[4px] w-full text-[14px]  "
        />
      </div>
      <div>
        <InputField
          label="Social Security Number"
          name="ssn"
          type="text"
          labelClassName="text-xs font-bold capitalize ] pt-6 pb-2"
          error={methods.formState.errors.ssn?.message as string}
          inputClassName="px-4 py-3 border-[0.1px] border-grey rounded-[4px] w-full text-[14px]  "
        />
      </div>
      <div>
        <InputField
          label="Address"
          name="address"
          type="text"
          labelClassName="text-xs font-bold capitalize pt-6 pb-2"
          error={methods.formState.errors.address?.message as string}
          inputClassName="px-4 py-3 border-[0.1px] border-grey rounded-[4px] w-full text-[14px]  "
        />
      </div>
    </div>
  );
};

export default StepOne;
