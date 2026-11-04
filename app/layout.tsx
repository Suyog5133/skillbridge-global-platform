import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import ModalAccessibility from "@/components/ModalAccessibility";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SkillBridge Global | Connect Skills. Discover Opportunities.",
  description:
    "SkillBridge Global is a worldwide career and freelance platform connecting candidates, students, freelancers, and companies.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white font-sans text-navy">
        {children}
        <ModalAccessibility />
      </body>
    </html>
  );
}
