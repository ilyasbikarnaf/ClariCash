"server-only";
import { getCurrentUser } from "@/lib/dal";

const UserEmail = async () => {
  const user = await getCurrentUser();

  console.log(user);

  return (
    <div className="lg:flex lg:flex-col lg:gap-y-2 hidden text-center my-10">
      <h2 className="text-3xl">
        <span className="font-semibold">Good morning, </span>
        {user.email}
      </h2>
      <p className="text-xl">Welcome Back</p>
    </div>
  );
};

export default UserEmail;
