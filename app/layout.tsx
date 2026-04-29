import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import FloatingCode from "./components/FloatingCode";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Hira Khizar - Web Developer & Laravel Specialist",
  description:
    "Passionate Web Developer specializing in Laravel backend development, building secure, scalable web applications. Experienced in API development, e-commerce systems, and SaaS platforms.",
  keywords: [
    "Hira Khizar",
    "Laravel Developer",
    "PHP Developer",
    "Web Developer",
    "Sargodha Pakistan",
    "Backend Developer",
    "API Development",
  ],
  authors: [{ name: "Hira Khizar" }],
  openGraph: {
    title: "Hira Khizar - Web Developer & Laravel Specialist",
    description:
      "Passionate Web Developer specializing in Laravel backend development.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#070504] text-[#fff2df]">
        <FloatingCode />
        {children}
      </body>
    </html>
  );
}
