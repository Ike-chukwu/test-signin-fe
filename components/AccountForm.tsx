"use client";

import { AccountSetupSteps } from "@/constants";
import { yupResolver } from "@hookform/resolvers/yup";
import clsx from "clsx";
import React, { Fragment, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { CheckIcon, RightArrow } from "./icons";
import { useMultiStepForm } from "@/hooks/useMultiStepForm";
import {
  MultiStepPayload,
  multiStepSchema,
} from "../services/account/schema";
import StepOne from "./FormStepsForAccount/StepOne";
import StepTwo from "./FormStepsForAccount/StepTwo";
import StepThree from "./FormStepsForAccount/StepThree";
import axios from "axios";
import { ClipLoader } from "react-spinners";
import { useRouter } from "next/navigation";

type Prop = {
  onSave: (values: MultiStepPayload) => void;
  info?: any;
};

const AccountForm: React.FC<Prop> = ({ onSave, info }) => {
  const [isLoading, setIsLoading] = useState(false);
  const {
    stepIndex,
    formStep,
    back,
    next,
    changeQuery,
    isFirstStep,
    isLastStep,
    urlStep,
  } = useMultiStepForm(
    [<StepOne key={0} />, <StepTwo key={1} />, <StepThree key={2} />],
    "accountForm"
  );
  const { push } = useRouter();
  const methods = useForm({
    resolver: yupResolver(multiStepSchema),
    mode: "all",
  });

  const handleStepChange = (step: string) => {
    changeQuery("step", step);
  };

  const onSubmit = async (values: MultiStepPayload) => {
    console.log(values);
    setIsLoading(true);
    try {
      const response = await axios.post("/api/account", values);

      if (response.status === 200) {
        // toast.success("Message sent successfully!");
        // setUserInput({ name: "", email: "", message: "" });
        setIsLoading(false);
        push("/confirmation");
        // next(); // Only proceed if validation passes
      } else {
        console.error("Failed to send message.");
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Error sending message.");
      setIsLoading(false);
    }
  };

  return (
    <div className="w-[320px] md:w-[600px] px-6 py-6 mx-auto bg-white rounded-[6px]">
      <p className="text-[23px] pb-2">Identity Verification Form</p>
      <p className="text-[14px] pb-2 border-b-[0.2px] border-black">
        Fill out this form with accurate details to verify your identity. Ensure
        all information matches your official documents. 🔒 Your data is secure.
      </p>

      {stepIndex !== null && stepIndex !== undefined ? (
        <>
          <section className="flex pt-4 pb-2 w-full items-center justify-between">
            {AccountSetupSteps.map((setup, index) => (
              <Fragment key={setup.step}>
                <div
                  className={clsx(`flex items-center gap-3`, {
                    "hidden lg:flex": urlStep !== setup.step,
                  })}
                >
                  <button
                    className={clsx(
                      "grid h-8 w-8 place-content-center rounded-full",
                      { "bg-[#0171d3]": urlStep === setup.step },
                      { "border border-[#E9E9EA]": urlStep !== setup.step }
                    )}
                    type="button"
                    onClick={() => handleStepChange((index + 1).toString())}
                  >
                    {urlStep === setup.step ? (
                      <CheckIcon height={8} width={12} />
                    ) : (
                      <span>{setup.step}</span>
                    )}
                  </button>
                  <span className="whitespace-nowrap text-[14px]">
                    {setup.label}
                  </span>
                </div>
                {index < AccountSetupSteps.length - 1 ? (
                  <RightArrow
                    className="hidden lg:block"
                    height={20}
                    width={20}
                  />
                ) : null}
              </Fragment>
            ))}
          </section>

          <FormProvider {...methods}>
            <form
              className="flex flex-col gap-[20px] py-5"
              id="kdmSetup"
              onSubmit={methods.handleSubmit(onSubmit)}
            >
              {formStep}

              <div className="mt-10 flex items-center justify-between text-[14px] text-content4-200">
                {!isFirstStep && (
                  <button
                    className="flex items-center rounded-[4px] text-white cursor-pointer bg-[#c4c8cc] px-3 py-2"
                    type="button"
                    onClick={back}
                  >
                    <span>Previous</span>
                  </button>
                )}
                {!isLastStep ? (
                  <button
                    className="flex cursor-pointer items-center rounded-[4px] text-white bg-[#0171d3] px-3 py-2 ml-auto"
                    type="button"
                    onClick={next}
                  >
                    <span>Next</span>
                  </button>
                ) : (
                  <button
                    className="rounded-[4px] text-white bg-[#0171d3] px-3 py-2"
                    type="submit"
                  >
                    {isLoading ? (
                      <>
                        Saving...
                        <ClipLoader className="ml-2" size={14} color="white" />
                      </>
                    ) : (
                      "Save"
                    )}
                  </button>
                )}
              </div>
            </form>
          </FormProvider>
        </>
      ) : null}
    </div>
  );
};

export default AccountForm;
