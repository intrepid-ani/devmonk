import { betterAuth } from "better-auth";
import { createAuthMiddleware } from "better-auth/api";
import { prismaAdapter } from "better-auth/adapters/prisma";
import prisma from "./db";
import { cache } from "react";
import { headers } from "next/headers";

function getRandomPfp(): string {
  const pfpArray = [
    "https://res.cloudinary.com/dumeqtz0w/image/upload/v1758968499/zqatettyhzkvjanmvcbv.png",
    "https://res.cloudinary.com/dumeqtz0w/image/upload/v1758968542/peubqe2arowzbahcuina.png",
    "https://res.cloudinary.com/dumeqtz0w/image/upload/v1758968604/jj8spiz8whi2mctaltyx.png",
    "https://res.cloudinary.com/dumeqtz0w/image/upload/v1758968656/ygs8afolhmfzs55qd6lj.png",
    "https://res.cloudinary.com/dumeqtz0w/image/upload/v1758968693/wncgbpz64mwzvgriwrhv.png",
    "https://res.cloudinary.com/dumeqtz0w/image/upload/v1758968729/odnfl2cimkgeh2eseghi.png",
    "https://res.cloudinary.com/dumeqtz0w/image/upload/v1758968760/kfhbxbjjvxawdzpyugwe.png",
    "https://res.cloudinary.com/dumeqtz0w/image/upload/v1758968781/yebyyf3t0cgdtknmh5vh.png",
    "https://res.cloudinary.com/dumeqtz0w/image/upload/v1758966528/j8cpruxhtxkumec07ztd.png",
    "https://res.cloudinary.com/dumeqtz0w/image/upload/v1758966754/rvqew1rl8tsvwdlhgeme.png",
  ];
  return pfpArray[Math.floor(Math.random() * pfpArray.length)];
}

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    },
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    },
  },
  hooks: {
    before: createAuthMiddleware(async (ctx) => {
      if (ctx.path === "/sign-up/email") {
        ctx.body.image = getRandomPfp();
      }
    }),
  },
});

export interface UserSessionObj {
  isAuthenticated: boolean;
  user?: {
    id: string;
    avatar: string | null | undefined;
    firstName: string;
    name: string;
    email: string;
    metadata: {
      verified: boolean;
      createdAt: Date;
    };
  } | null;
}

export const getsession = cache(async (): Promise<UserSessionObj> => {
  const user = await auth.api.getSession({
    headers: await headers(),
  });
  const name = `${user?.user.name.split("")[0].toUpperCase()}${user?.user.name.toLowerCase().split("").slice(1).join("")}`;
  return {
    isAuthenticated: user?.user.id ? true : false,
    user: user?.user
      ? {
          id: user.user.id,
          avatar: user.user.image,
          firstName: name.split(" ")[0],
          name: name,
          email: user.user.email,
          metadata: {
            verified: user.user.emailVerified,
            createdAt: user.user.createdAt,
          },
        }
      : null,
  };
});
