import { LoadingSpinner } from "./LoadingSpinner";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

export default function Last5Transactions({ isPending, data }) {
  return isPending ? (
    <LoadingSpinner classes={"w-[100px] h-[100px] "} />
  ) : (
    data?.slice(0, 6)?.map((transaction) => {
      return (
        <div
          key={transaction.createdAt.toString()}
          className="flex justify-between items-center hover:opacity-90 hover:bg-purple-500 px-2 py-1 rounded hover:cursor-pointer transition-all"
        >
          <div>
            <h2 className="text-xl">{transaction.name}</h2>
            <p className="text-xs text-gray-300/80">
              {format(transaction.date, "MMMM dd, yyyy hh:mm a")}
            </p>
          </div>
          <h4
            className={cn(
              " font-bold",
              transaction.category === "income"
                ? "text-green-400"
                : "text-red-400"
            )}
          >
            ${transaction.amount}
          </h4>
        </div>
      );
    })
  );
}
