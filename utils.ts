import { type ClassValue, clsx } from "clsx"
import { SVGProps } from "react";
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};
export const formConfigTest = [
  // Step 1: Personal Details
  {
    id: "personalDetails",
    title: "Personal Details",
    fields: [
      {
        name: "email",
        label: "Email",
        type: "email",
        required: true,
        validation: { message: "Email is required" },
      },
      {
        name: "password",
        label: "Password",
        type: "password",
        required: true,
        validation: { message: "Password is required" },
      },
    ],
  },
  // Step 2: Contact Details
  {
    id: "modeOfReceivingCode",
    title: "Method",
    fields: [
      {
        name: "number",
        label: "",
        type: "",
        required: true,
        validation: { message: "Please fill this field" },
      },

    ],
  },
  // Step 3: Code Information
  {
    id: "code",
    title: "Code",
    fields: [
      {
        name: "code",
        label: "Enter the 6-digit code *",
        type: "text",
        required: true,
        validation: { message: "Please enter the code" },
      },
    ],
  },

];