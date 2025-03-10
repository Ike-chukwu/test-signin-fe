"use client";
import { CompleteFormIcon } from "@/components/icons";
import { Button } from "@nextui-org/button";
import { useRouter } from "next/navigation";
import React from "react";

const page = () => {
  return (
    <div className="mt-4 flex flex-col items-center px-4 gap-8 py-6 md:mt-10">
      <CompleteFormIcon></CompleteFormIcon>
      <div className="flex flex-col items-center gap-4">
        <p className="text-[14px] text-center">
          Thank you for taking the time to sign in!
        </p>
      </div>
    </div>
  );
};

export default page;
