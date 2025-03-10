"use client";
// import { useMultiStepForm } from "@/hooks/useMultiStepForm";
import clsx from "clsx";
import React, { Fragment, useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { CheckIcon, RightArrow } from "./icons";
import { useRouterQuery } from "../hooks/useRouterQuery";
import StepOne from "./FormSteps/StepOne";
import StepTwo from "./FormSteps/StepTwo";
import StepThree from "./FormSteps/StepThree";
import { LoginSetupSteps } from "../constants";
import { useMultiStepForm } from "../hooks/useMultiStepForm";
import StepFour from "./FormSteps/StepFour";
import { MultiStepPayload, multiStepSchema } from "../services/login/schema";
import StepOneDup from "./FormSteps/StepOneDup";
import StepThreeDup from "./FormSteps/StepThreeDup";
import { useRouter } from "next/navigation";

const MForm = () => {
  const {
    stepIndex,
    formStep,
    back,
    next,
    changeQuery,
    // steps,
    isFirstStep,
    isLastStep,
    urlStep,
  } = useMultiStepForm(
    [
      <StepOne key={0} />,
      <StepOneDup key={1} />,
      <StepTwo key={2} />,
      <StepThree key={3} />,
      <StepThreeDup key={4} />,
      <StepFour key={5} />,
    ],
    "loginUser"
  );
  const { push } = useRouter();
  const methods = useForm({
    resolver: yupResolver(multiStepSchema),
    mode: "all",
  });
  console.log(methods.formState.errors);
  const handleStepChange = (step: string) => {
    changeQuery("step", step);
  };
  const onSubmit = (values: MultiStepPayload) => {
    push("/confirmation");
  };

  return (
    <div className="">
      {stepIndex ? (
        <FormProvider {...methods}>
          <form
            className=""
            id="loginUser"
            onSubmit={methods.handleSubmit(onSubmit)}
          >
            {stepIndex ? formStep : <></>}
          </form>
        </FormProvider>
      ) : null}
    </div>
  );
};

export default MForm;
