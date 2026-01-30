import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

import SignUpForm from "./signup-form";

function SignUpPage() {
  return (
    <div className="flex items-center justify-center my-10">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center tracking-wide leading-6 text-2xl">
            Create an account
            <br />
          </CardTitle>
          <CardDescription className="text-center">
            Join a developer community, with Dev<span>Monk</span> agent.
          </CardDescription>
        </CardHeader>
        <SignUpForm />
      </Card>
    </div>
  );
}

export default SignUpPage;
