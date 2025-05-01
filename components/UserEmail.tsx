import { getCurrentUser } from "@/lib/dal";
import LogoutButton from "./LogoutButton";

const UserEmail = async () => {
  const user = await getCurrentUser();

  if (!user || !user.email) {
    return (
      <div className="lg:flex lg:flex-col lg:gap-y-2 text-center my-10">
        <h2 className="text-3xl">Please sign in to view your dashboard</h2>
      </div>
    );
  }

  return (
    <div className="lg:flex lg:flex-col lg:items-center lg:gap-y-2 hidden text-center my-10">
      <h2 className="text-3xl">
        <span className="font-semibold">Welcome, </span>
        {user.email}
      </h2>

      <LogoutButton classes={"w-80 hidden lg:inline"} />
    </div>
  );
};

export default UserEmail;
