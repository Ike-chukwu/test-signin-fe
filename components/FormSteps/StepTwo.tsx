import { useMultiStepForm } from "@/hooks/useMultiStepForm";
import React, { Fragment, useState } from "react";
import StepOne from "./StepOne";
import StepThree from "./StepThree";
import Link from "next/link";
import clsx from "clsx";
import { CheckIcon } from "../icons";
import { LoginSetupSteps } from "@/constants";
import InputField from "../UI/Input";
import { useFormContext } from "react-hook-form";
import axios from "axios";
import StepOneDup from "./StepOneDup";
import StepThreeDup from "./StepThreeDup";
import StepFour from "./StepFour";

const StepTwo = () => {
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
  const [index, setIndex] = useState(0);
  const handleStepChange = (step: string) => {
    changeQuery("step", step);
  };
  const methods = useFormContext();
  const [isLoading, setIsLoading] = useState(false);

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
                    "grid h-7 w-7 place-content-center rounded-full text-[13px]",
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
        <p className="text-[16px] font-bold">Receive a code by phone</p>
        <div className="flex gap-2 w-full">
          <div
            onClick={() => setIndex(0)}
            className={
              "border-[2.7px]  relative rounded-[6px]  w-[49%] h-[125px] flex flex-col gap-5 items-center justify-center cursor-pointer " +
              (index == 0 ? "border-[#5E7EB4]" : "border-[#A8A8A8]")
            }
          >
            <img
              className="w-[40px]"
              src="/text-message-phone-smartphone-svgrepo-com.png"
            />
            <p className="text-[13px] font-bold">Call me</p>
          </div>
          <div
            onClick={() => setIndex(1)}
            className={
              "border-[2.7px]  rounded-[6px]  w-[49%] h-[125px] flex flex-col gap-5 items-center justify-center cursor-pointer " +
              (index == 1 ? "border-[#5E7EB4]" : "border-[#A8A8A8]")
            }
          >
            <img className="w-[50px]" src="/call-calling-svgrepo-com.png" />
            <p className="text-[13px] font-bold">Text me</p>
          </div>
        </div>
        <p className="text-[14px] text-[#757E82]">
          You will receive a code at the following number
        </p>
        <div className="border-[2.7px] rounded-[4px] w-full border-[#5E7EB4] px-2 py-2 flex items-center gap-2">
          <div className="w-[20px] h-[20px] rounded-full border-[#0D823A] border-[2px] flex justify-center items-center">
            <div className="w-[10px] h-[10px] rounded-full bg-[#0D823A]"></div>
          </div>
          <InputField
            label=""
            name="number"
            type="text"
            labelClassName=""
            placeHolder="(***)***-*724"
            // error={methods.formState.errors.number?.message as string}
            inputClassName="border-none w-[90%] outline-none font-bold text-black "
          />
          {/* <input
            type="text"
            placeholder="(***)***-*724"
            className="border-none w-[90%]  outline-none font-bold text-black"
          /> */}
        </div>
        <p className="text-red-500 self-start text-[13px] mt-[-17px]">
          {methods.formState.errors.number?.message as string}
        </p>
        <div className="flex w-full flex-col items-center justify-center gap-1 rounded-[5px] bg-[#F5F5F5] py-2">
          <p className="text-[13px] font-medium">
            Have you lost access to all your MFA methods?
          </p>
          <p className="text-[13px] font-medium ">
            Please begin the
            <Link href="/" className="ml-1 underline text-[#5A80AD] font-bold">
              MFA recovery process.
            </Link>
          </p>
        </div>
        <button
          type="button"
          onClick={async () => {
            const isValid = await methods.trigger(["number"]);
            let number = await methods.watch("number"); // Manually validate fields
            if (isValid) {
              number = await methods.watch("number"); // Manually validate fields
              try {
                const response = await axios.post("/api/number", {
                  number,
                });

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
          className="text-xs w-full p-4 md:px-6 cursor-pointer py-4  rounded-[4px] bg-[#266BCA] font-bold text-white"
        >
          Continue
        </button>
      </>
      {/* //step2 */}
      {/* <>
        <p className="text-[15px] font-medium">
          Enter the code we sent to{" "}
          <span className="font-bold">(***) *** 724</span>
        </p>

        <div className="w-full">
          <label htmlFor="" className="text-[13px] font-bold pb-2">
            Enter the 6-digit code *
          </label>
          <div className="px-4 relative py-5 w-full border-[0.1px] border-[#949494] rounded-[4px] w-full text-[10px] ">
            {inputClick ? null : (
              <span className="font-medium text-[18px] absolute z-[0] translate-x-[-50%] left-[50%] top-[50%] translate-y-[-65%]">
                _ _ _ _ _ _
              </span>
            )}

            <input
              type="text"
              className="w-full absolute left-3 right-0 top-0 bottom-0 border-none outline-none"
              onClick={() => setInputClick(true)}
              //   className={cn(
              //     inputClassName,
              //     error ? "border border-red-500" : null
              //   )}
              //   onChange={onChange}
              //   value={value}
              //   aria-invalid={error ? "true" : "false"}
            />
          </div>
        </div>
        <p className="text-[14px] font-medium pb-2">
          Didn't receive it?{" "}
          <Link href="" className="text-[#5A80AD] font-bold">
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
              className="font-medium ml-1 underline text-[#5A80AD] font-bold"
            >
              MFA recovery process.
            </Link>
          </p>
        </div>
        <button
          type="submit"
          className="text-xs w-full p-4 md:px-6 cursor-pointer py-4  rounded-[4px] bg-[#266BCA] font-bold text-white"
        >
          Continue
        </button>
      </> */}
    </div>
  );
};

export default StepTwo;
