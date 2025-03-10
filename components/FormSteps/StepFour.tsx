"use client";
import { CompleteFormIcon } from "@/components/icons";
// import { Button } from "@nextui-org/button";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";

const StepFour = () => {
  const [text, changeText] = useState("verify your details");
  const { push } = useRouter();

  useEffect(() => {
    const timeout = setTimeout(() => {
      changeText("My Account");
    }, 4000);

    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      push("/confirmation");
    }, 6000);

    return () => clearTimeout(timeout);
  }, []);
  return (
    <div className="mt-[-30px] w-[340px] md:w-[450px] drop-shadow-custon bg-white rounded-[10px] py-8 px-8 top-[90px] flex-col flex gap-2 items-center">
      <p className="text-[14px]">You are now returning to</p>
      <p className="text-[#5A80AD] font-bold text-[14px]">{text}</p>
      <div className="py-3">
        <ClipLoader size={40} color="#0D823A" />
      </div>
    </div>
  );
};

export default StepFour;
