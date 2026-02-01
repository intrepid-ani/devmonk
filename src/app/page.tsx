import Header from "@/components/header";
import { getsession } from "@/lib/auth";
import LandingPage from "@/components/landingPageUi/landingPage";
import SignedInPage from "@/components/landingPageUi/isSignedIn";

async function HomePage() {
  const session = await getsession();
  return (
    <div>
      <Header />
      <>
        {!!session.user?.id ? <SignedInPage user={session} /> : <LandingPage />}
      </>
    </div>
  );
}

export default HomePage;
