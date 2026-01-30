import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

import Signinform from "./signin-form";

function SignInPage() {
  return (
    <div className="flex items-center justify-center my-10">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center tracking-wide leading-6 text-2xl">
            Welcome Back!
            <br /> What&apos;s new to build?
          </CardTitle>
          <CardDescription className="text-center">
            Sign in to Dev
            <span className="text-primary brightness-110 ml-0.5">
              Monk
            </span>{" "}
            with one of the options below or your credentials.
          </CardDescription>
        </CardHeader>
        <Signinform />
      </Card>
    </div>
  );
}

export default SignInPage;
