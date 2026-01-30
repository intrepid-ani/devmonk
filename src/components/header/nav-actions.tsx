"use client";
import Image from "next/image";
import Link from "next/link";
import { redirect, usePathname } from "next/navigation";
import { useIsMobile } from "@/hooks/use-mobile";

import { Avatar } from "@/components/ui/avatar";
import { Button } from "../ui/button";
import ThemeButton from "../ui/theme-button";

import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { FaXTwitter } from "react-icons/fa6";
import { VscGithubAlt } from "react-icons/vsc";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signOut } from "@/lib/auth-client";
import { toast } from "sonner";
import { AvatarImage } from "@radix-ui/react-avatar";

export default function NavActions({
  isAuthenticated,
  image,
}: {
  isAuthenticated: boolean;
  image?: string;
  displayName?: string;
}) {
  const isMobile = useIsMobile();
  const path = usePathname();
  const handleSignOut = async () => {
    const response = await signOut();
    if (response.error) {
      toast.error(response.error.message || "Error, Please try again.");
    }

    if (response.data?.success === true) {
      toast.success("Sign Out successfull!");
      redirect("/");
    }
  };

  const handleBuildNew = async () => {
    if (!isAuthenticated) {
      toast("Authentication required.");
      redirect("/signin");
    }
  };

  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-1">
        <ThemeButton className={`p-1.5  hidden md:block`} />
        <a
          href={"https://x.com/intrepid_ani"}
          className="active:scale-100 text-foreground hover:text-accent-foreground rounded-md p-1.5  hover:bg-accent/70  hidden md:block"
        >
          <FaXTwitter className="text-lg" />
        </a>
        <a
          href={"https://github.com/intrepid-ani/devmonk"}
          className="active:scale-100 text-foreground hover:text-accent-foreground rounded-md p-1.5 hover:bg-accent/70  hidden md:block"
        >
          <VscGithubAlt className="text-lg" />
        </a>
      </div>
      {isAuthenticated === true && image ? (
        <div>
          <DropdownMenu>
            <DropdownMenuTrigger className="p-0 mt-2">
              <Avatar className="border border-accent-foreground">
                <AvatarImage src={image} />
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuGroup>
                <DropdownMenuItem>Profile</DropdownMenuItem>
              </DropdownMenuGroup>

              <DropdownMenuSeparator />
              {isMobile && (
                <>
                  <DropdownMenuGroup>
                    <DropdownMenuLabel className="text-accent-foreground/50">
                      Socials
                    </DropdownMenuLabel>
                    <DropdownMenuItem>
                      <FaXTwitter className="text-lg" />
                      Twitter
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <VscGithubAlt />
                      Github
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                </>
              )}
              <DropdownMenuItem variant={"destructive"} onClick={handleSignOut}>
                Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          {/* <UserAvatar src={image} /> */}
        </div>
      ) : (
        path !== "/signin" && path !== "/signup" && <SigninBtn />
      )}
      <Button className="gap-1" size={"sm"} onClick={handleBuildNew}>
        <span>Build new</span>
        <MdOutlineKeyboardArrowRight className="font-bold px-0 mx-0" />
      </Button>
    </div>
  );
}

export function SigninBtn() {
  return (
    <Link href="/signin">
      <Button size="sm" variant="secondary">
        <span className="">Sign in</span>
      </Button>
    </Link>
  );
}

export function UserAvatar({
  src,
  className,
}: {
  src: string;
  className?: string;
}) {
  return (
    <Avatar>
      <Image
        src={src}
        alt="userpfp"
        className={`${className} w-full h-full`}
        width={20}
        height={20}
      />
    </Avatar>
  );
}

// TODO: Easy navigation page on the landing page
interface NavOptionProps {
  link: string;
  displaName: string;
  id: string;
  className?: string;
}

export function NavOption({}: NavOptionProps) {
  return <nav className=""></nav>;
}
