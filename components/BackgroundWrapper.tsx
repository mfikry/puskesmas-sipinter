"use client";
import { ReactNode } from "react";

export default function BackgroundWrapper({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url('/logo.jpeg')`, // ganti sesuai path gambarmu
      }}
    >
      <div className=" min-h-screen">{children}</div>
    </div>
  );
}
