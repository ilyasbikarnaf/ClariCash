"use client";

import { logout } from "@/app/actions/auth";
import { cn } from "@/lib/utils";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import toast from "react-hot-toast";

export default function LogoutButton({
  classes,
}: {
  classes?: string | boolean;
}) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const queryClient = useQueryClient();

  function handleLogout() {
    startTransition(async () => {
      try {
        const signoutResult = await logout();

        if (!signoutResult.success) {
          toast.error(signoutResult.message);
          return;
        }

        toast.success(signoutResult.message);
        queryClient.invalidateQueries(["transactions"]);
        router.push("/signin");
      } catch (err) {
        console.log(err);
        toast.error("An unexpected error occured during logout");
      }
    });
  }

  return (
    <button
      className={cn(
        "lg:text-xl font-bold px-6 py-2 bg-purple-600  rounded-2xl hover:cursor-pointer hover:bg-purple-700 disabled:cursor-not-allowed disabled:opacity-70",
        classes
      )}
      onClick={handleLogout}
      disabled={isPending}
    >
      {isPending ? "Login out" : "Logout"}
    </button>
  );
}
