import { getsession } from "@/lib/auth";
import { Separator } from "../ui/separator";
import Logo from "@/components/logo/logo";
import NavActions from "./nav-actions";

async function Header() {
  const session = await getsession();
  return (
    <>
      <header className="max-w-335 px-5 py-2 flex items-center justify-between">
        <Logo />

        <NavActions
          isAuthenticated={session?.id ? true : false}
          image={session?.image as string}
          displayName={session?.name.split(" ")[0]}
        />
      </header>
      <Separator />
    </>
  );
}

export default Header;
