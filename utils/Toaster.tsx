"use client";
import { useTheme } from "next-themes";
import { Toaster } from "sonner";

export default function ToasterConfig() {
  const { forcedTheme } = useTheme();
  return (
    <Toaster
      theme={forcedTheme === "dark" ? "dark" : "light"}
      visibleToasts={2}
    />
  );
}
