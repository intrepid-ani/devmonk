import React from "react";
import type { UserSessionObj } from "@/lib/auth";

import { ChatTextArea } from "../ui/chat-textarea";

interface IsSignedInProp {
  user: UserSessionObj;
}

function isSignedIn({ user }: IsSignedInProp) {
  return (
    <main className="max-w-335 mt-[18vh] md:mt-[20vh]">
      <div id="welcome" className="w-fit mx-auto text-center mb-8 my-auto">
        <span className="text-xl md:text-2xl">
          Hello, {user.user?.firstName}
        </span>
        <br />
        <span className="text-2xl md:text-4xl">What are we building?</span>
      </div>
      <section>
        <ChatTextArea className="" autoFocus />
      </section>
    </main>
  );
}

export default isSignedIn;
