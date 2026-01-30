"use client";
import React, { useState } from "react";
import { toast } from "sonner";
import { redirect } from "next/navigation";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { FcGoogle } from "react-icons/fc";
import { FaGithub, FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { BsDashLg } from "react-icons/bs";

import { signUp } from "@/lib/auth-client";
import { FaSpinner } from "react-icons/fa6";

import type { Loading, SignUp } from "../types";
import { githubSignIn, googleSigIn } from "../hooks/auth-hooks";
import { CardAction, CardContent, CardFooter } from "@/components/ui/card";

function SignUpForm() {
  const [formData, setFormData] = useState<SignUp>({
    name: "",
    email: "",
    password: "",
    image: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState<Loading>({
    createBtnLaoding: false,
    githubBtnLoading: false,
    googleBtnLoading: false,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading((prev) => ({ ...prev, createBtnLaoding: true }));

    try {
      const res = await signUp.email(
        {
          name: formData.name,
          email: formData.email,
          password: formData.password,
          image: formData.image,
        },
        {
          onSuccess: () => {
            toast.success("Account created successfully");
            redirect("/");
          },
          onError: (ctx) => {
            console.log("[SIGNUP ERROR]: ", ctx);
            toast.error(ctx.error.message || "Authentication Failed");
          },
        },
      );
      console.log("User created: ", res.data?.user);
    } finally {
      setLoading((prev) => ({ ...prev, createBtnLaoding: false }));
    }
  };

  const handleSocialSignin = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    try {
      if (e.currentTarget.id === "google-signin") {
        setLoading((prev) => ({ ...prev, googleBtnLoading: true }));
        const google = await googleSigIn();
        console.log("Google SignIn: ", google);
      } else if (e.currentTarget.id === "github-signin") {
        setLoading((prev) => ({ ...prev, githubBtnLoading: true }));
        const github = await githubSignIn();
        console.log("Github SignIn: ", github);
      }
    } finally {
      setLoading({
        createBtnLaoding: false,
        githubBtnLoading: false,
        googleBtnLoading: false,
      });
    }
  };

  return (
    <>
      {" "}
      <CardContent>
        <div className="md:flex justify-around mb-5 gap-2">
          <Button
            id="google-signin"
            variant={"secondary"}
            className="w-full mb-2 md:mb-0 md:w-[46%]"
            onClick={handleSocialSignin}
            disabled={loading.googleBtnLoading === true}
          >
            {loading.googleBtnLoading ? (
              <FaSpinner className="animate-spin" />
            ) : (
              <FcGoogle />
            )}{" "}
            Continue with Google
          </Button>

          <Button
            id="github-signin"
            variant={"secondary"}
            className="w-full md:w-[46%]"
            onClick={handleSocialSignin}
            disabled={loading.githubBtnLoading === true}
          >
            {loading.githubBtnLoading ? (
              <FaSpinner className="animate-spin" />
            ) : (
              <FaGithub />
            )}
            Continue with Github
          </Button>
        </div>

        <p className="text-lg text-accent-foreground/50 text-center mb-3 flex items-center gap-4 justify-center">
          <BsDashLg /> or <BsDashLg />
        </p>

        <form className="space-y-4" onSubmit={handleSignUp}>
          <Label htmlFor="name" className="mb-2">
            Name:
          </Label>
          <Input
            required
            id="name"
            name="name"
            type="text"
            placeholder="Enter your name"
            value={formData.name}
            onChange={handleInputChange}
            autoComplete="name"
            className="shadow-xl shadow-accent-foreground border-2 border-accent-foreground/50"
          />
          <Label htmlFor="email" className="mb-2">
            Email:
          </Label>
          <Input
            required
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleInputChange}
            className="shadow-xl shadow-accent-foreground border-2 border-accent-foreground/50"
          />
          <Label htmlFor="password" className="mb-2">
            Password:
          </Label>
          <div className="relative">
            <Input
              required
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleInputChange}
              autoComplete="current-password"
              className="shadow-xl shadow-accent-foreground border-2 border-accent-foreground/50 mb-5 pr-10"
            />
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              className="absolute right-2 top-[32%] -translate-y-1/2 h-8 w-8 p-0"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
            </Button>
          </div>
          <div className="flex justify-end items-center">
            <Button
              type="submit"
              className="w-1/2"
              disabled={loading.createBtnLaoding === true}
            >
              {loading.createBtnLaoding && (
                <FaSpinner className="animate-spin" />
              )}
              Create account
            </Button>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex-col">
        <CardAction className="mb-3">
          <span className="text-xs my-auto">Already have an account?</span>
          <Link
            href={"/signin"}
            className="text-xs px-3 text-primary underline-offset-4 hover:underline"
          >
            Sign In
          </Link>
        </CardAction>

        <p className="text-xs text-muted-foreground font-extralight">
          By signing in you accept the Dev Monk{" "}
          <Link
            href={"#"}
            className="text-primary hover:underline underline-offset-4"
          >
            Terms of Service
          </Link>{" "}
          and acknowledge our{" "}
          <Link
            href={"#"}
            className="text-primary hover:underline underline-offset-4"
          >
            Privacy Policy
          </Link>
          .
        </p>
      </CardFooter>
    </>
  );
}

export default SignUpForm;
