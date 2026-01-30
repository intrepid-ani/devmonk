"use client";

import { signIn } from "@/lib/auth-client";
import { toast } from "sonner";

export async function githubSignIn() {
  const github = await signIn.social(
    { provider: "github" },
    {
      onError: (ctx) => {
        console.log(`[GITHUB SIGNIN ERROR]: ${ctx.error.message}`);
        toast.error(`${ctx.error.message}`);
      },
    },
  );
  return github;
}

export async function googleSigIn() {
  const google = await signIn.social(
    {
      provider: "google",
    },
    {
      onError: (ctx) => {
        console.log(`[GOOGLE SIGNIN ERROR]: ${ctx.error.message}`);
        toast.error(`${ctx.error.message}`);
      },
    },
  );
  if (!google.data || !google.data.url) return;

  return google;
}
