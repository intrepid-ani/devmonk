"use client";
import React, { useState } from "react";
import Link from "next/link";
import { signIn, useAuth } from "@/lib/auth-client";
import { toast } from "sonner";
import { redirect } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

import { FcGoogle } from "react-icons/fc";
import { FaRegEye, FaRegEyeSlash, FaGithub, FaSpinner } from "react-icons/fa6";
import { BsDashLg } from "react-icons/bs";

import { githubSignIn, googleSigIn } from "../hooks/auth-hooks";

import type { Loading, SignIn } from "../types";
import { CardAction, CardContent, CardFooter } from "@/components/ui/card";

function Signinform() {
  const [formData, setFormData] = useState<SignIn>({
    userId: "",
    password: "",
    rememberMe: true,
    callbackURL: "/",
  });
  const [loading, setLoading] = useState<Loading>({
    createBtnLaoding: false,
    githubBtnLoading: false,
    googleBtnLoading: false,
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading((prev) => ({ ...prev, createBtnLaoding: true }));
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (emailRegex.test(formData.userId as string)) {
        await signIn.email(
          {
            email: formData.userId as string,
            password: formData.password,
            rememberMe: formData.rememberMe,
          },
          {
            onSuccess: (ctx) => {
              if (ctx.data.user.name !== undefined)
                toast.success(`Welcome back, ${ctx.data.user.name}`);
              else toast.success(`Welcome back!`);

              redirect("/");
            },

            onError: (ctx) => {
              console.log("[ERROR SIGNIN]: ", ctx.error);
              toast.error(ctx.error.message);
            },
          },
        );
      } else {
        await signIn.username(
          {
            username: formData.userId as string,
            password: formData.password,
            rememberMe: formData.rememberMe,
          },
          {
            onSuccess: (ctx) => {
              if (ctx.data.user.name !== undefined)
                toast.success(`Welcome back, ${ctx.data.user.name}`);
              else toast.success(`Welcome back!`);

              redirect("/");
            },

            onError: (ctx) => {
              console.log("[ERROR SIGNIN]: ", ctx.error);
              toast.error(ctx.error.message || "Authentication Failed");
            },
          },
        );
      }
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <>
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

        <form className="space-y-4" onSubmit={handleSignIn}>
          <Label htmlFor="userId" className="mb-2">
            Email/Username:
          </Label>
          <Input
            required
            id="userId"
            type="text"
            name="userId"
            autoComplete="email"
            placeholder="Enter your email / Username"
            value={formData.userId}
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
          <div className="flex justify-between items-center">
            <div className="flex gap-2 mb-6">
              <Checkbox
                id="remeber-me"
                className="text-white border dark:bg-foreground bg-accent cursor-pointer"
                checked={formData.rememberMe}
                onCheckedChange={(checked) =>
                  setFormData((prev) => ({
                    ...prev,
                    rememberMe: checked === true,
                  }))
                }
              />
              <Label htmlFor="remeber-me">Remeber me</Label>
            </div>
            <Button
              type="submit"
              className="w-1/2"
              disabled={loading.createBtnLaoding === true}
            >
              {loading.createBtnLaoding ? (
                <FaSpinner className="animate-spin" />
              ) : (
                ""
              )}
              Sign In
            </Button>
          </div>
        </form>
      </CardContent>
      <CardFooter>
        <CardAction>
          <span className="text-xs">Don&apos;t have an account?</span>
          <Link
            href={"/signup"}
            className="text-xs px-3 text-primary underline-offset-4 hover:underline"
          >
            Create an account
          </Link>
        </CardAction>
      </CardFooter>
    </>
  );
}

export default Signinform;
