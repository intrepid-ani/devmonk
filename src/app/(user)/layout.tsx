import { getsession } from "@/lib/auth";
import { redirect } from "next/navigation";
import React from "react";
import Header from "@/components/header";

async function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getsession();

  if (session.isAuthenticated) redirect("/");

  return (
    <>
      <Header />
      {children}
    </>
  );
}

export default layout;
