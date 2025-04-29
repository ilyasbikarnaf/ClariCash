import { createTransaction } from "@/app/actions/transaction";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useActionState, useRef } from "react";
import toast from "react-hot-toast";

export default function CreateTransactionModal({
  children,
  classes,
  selectedDate,
}) {
  const trigerRef = useRef<HTMLButtonElement>(null);
  const [state, formAction, isPending] = useActionState(
    async (prevData, formData: FormData) => {
      try {
        const transaction = await createTransaction(formData);

        if (!transaction.success) {
          toast.error(transaction.message);
          return null;
        }

        toast.success(transaction.message);
        trigerRef.current?.click();
      } catch (err) {
        console.log(err);
        toast.error("An unexpected error occured");
      }
    },
    { success: false, message: "" }
  );

  return (
    <Dialog>
      <DialogTrigger asChild ref={trigerRef}>
        <Button className={classes}>{children}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>All Transactions</DialogTitle>
          {/* <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription> */}
        </DialogHeader>
        <form className="grid gap-4 py-4" action={formAction}>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input id="name" className="col-span-3" name="name" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="amount" className="text-right">
              Amount
            </Label>
            <Input
              id="amount"
              className="col-span-3"
              name="amount"
              type="number"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="category" className="text-right">
              Category
            </Label>
            {/* <Input id="category" type="" className="col-span-3" /> */}
            <select
              className="col-span-3 border-1 p-2 rounded transition-all "
              name="category"
            >
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="date" className="text-right">
              Date
            </Label>
            <Input
              name="date"
              id="date"
              defaultValue={selectedDate.toISOString().split("T")[0]}
              type="date"
              className="col-span-3"
            />
          </div>

          <Button
            className="bg-purple-600 hover:bg-purple-700 hover:cursor-pointer text-white rounded"
            type="submit"
            disabled={isPending}
          >
            {isPending ? "Submitting..." : "Submit"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
