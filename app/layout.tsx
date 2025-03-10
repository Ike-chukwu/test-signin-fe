import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"], // Choose weights you need
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Sign In Form",
  description: "A form that signs in a user",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={poppins.variable}>
      <body className={` antialiased`}>{children}</body>
    </html>
  );
}
