import AppContainer from "@/components/AppContainer";
import LogoutButton from "@/components/LogoutButton";
import UserEmail from "@/components/UserEmail";
import { getCurrentUser } from "@/lib/dal";

export default async function RootPage() {
  const user = await getCurrentUser();

  return (
    <>
      <UserEmail />
      <AppContainer />
      {user && <LogoutButton classes={"w-full my-5 lg:hidden"} />}
    </>
  );
}
