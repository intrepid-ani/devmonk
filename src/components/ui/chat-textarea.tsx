"use client";
import { FaArrowUp } from "react-icons/fa6";
import { Button } from "./button";
import { Textarea } from "./textarea";
import { useState } from "react";

function ChatTextArea({
  className,
  placeholder,
  ...props
}: React.ComponentProps<"textarea">) {
  const [prompt, setPrompt] = useState<string>("");

  const handleChangePrompt = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPrompt(e.target.value);
  };
  return (
    <div className="relative w-[90%] max-w-3xl mx-auto">
      <Textarea
        id="prompt"
        className={`${className} field-sizing-fixed w-full bg-transparent min-h-16 max-h-36`}
        rows={6}
        style={{ resize: "none" }}
        placeholder={placeholder || "Explain what to build..."}
        {...props}
        value={prompt}
        onChange={handleChangePrompt}
      ></Textarea>
      <Button
        className="absolute aspect-square bottom-2.5 right-2.5 rounded-full cursor-pointer disabled:cursor-not-allowed z-10"
        variant={"default"}
        disabled={prompt === ""}
      >
        <FaArrowUp />
      </Button>
    </div>
  );
}

export { ChatTextArea };
