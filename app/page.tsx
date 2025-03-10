"use client";

import MForm from "@/components/MForm";
import { ChevronDownIcon } from "@/components/icons";
import { Suspense } from "react";

export default function Home() {
  return (
    <Suspense>
      <div className="flex items-center justify-center flex-col">
        <div className="bg-white flex items-center w-full justify-center flex-col pt-1 pb-7">
          <img className="w-[120px]" src="/ID.me.png" />
        </div>

        <MForm />
        <div className="flex flex-col py-6 gap-4 items-center justify-center">
          <div className="flex items-center gap-1">
            <ChevronDownIcon />
            <p className="text-[#5A80AD] cursor-pointer font-bold text-[14px] capitalize">
              english
            </p>
          </div>
          <div className="flex gap-2 md:gap-4 items-center">
            <p className="text-[#5A80AD] cursor-pointer font-bold text-[14px] underline">
              What is ID.me?
            </p>
            <span>|</span>
            <p className="text-[#5A80AD] cursor-pointer capitalize font-bold text-[14px] underline">
              terms of service
            </p>
            <span>|</span>
            <p className="text-[#5A80AD] cursor-pointer capitalize font-bold text-[14px] underline">
              privacy policy
            </p>
          </div>
        </div>
      </div>
    </Suspense>
  );
}
