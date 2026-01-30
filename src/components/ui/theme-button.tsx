"use client";
import React from "react";
import { useTheme } from "next-themes";
import { IoSunnyOutline } from "react-icons/io5";
import { AiOutlineMoon } from "react-icons/ai";

function ThemeButton({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme(); // Destructure for cleaner code

  return (
    <button
      className={`rounded-md hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50 ${className}`}
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      {theme === "dark" ? (
        <AiOutlineMoon className="text-xl" />
      ) : (
        <IoSunnyOutline className="text-xl animate-spin animation-duration-[12s]" />
      )}
    </button>
  );
}

export default ThemeButton;
