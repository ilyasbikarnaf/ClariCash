"use client";

import { useTransition } from "react";
import { Button } from "./ui/button";
import { deleteTransaction } from "@/app/actions/transaction";
import toast from "react-hot-toast";

export default function DeleteButton({ transactionId, onSuccess }) {
  const [isPending, startTransition] = useTransition();

  function handleDelete() {
    startTransition(async () => {
      try {
        const result = await deleteTransaction(transactionId);

        toast.success(result.message);
        onSuccess();
        return;
      } catch (err) {
        console.log(err);
        toast.error("An error occured during deleting this transaction");
        return null;
      }
    });
  }

  return (
    <Button
      // variant="destructive"
      size="sm"
      onClick={handleDelete}
      disabled={isPending}
      className="rounded bg-purple-500 text-white hover:bg-purple-600 hover:cursor-pointer lg:w-[90px] w-[70px] text-sm lg:text-md"
    >
      {isPending ? "Deleting..." : "Delete"}
    </Button>
  );
}
