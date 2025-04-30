"use client";

import CircularChart from "@/components/CircularChart";
import CreateTransactionModal from "@/components/CreateTransactionModal";
import DateTable from "@/components/DateTable";
import LinearChart from "@/components/LinearChart";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Eye, Plus } from "lucide-react";
import { useMemo, useState } from "react";
import { getAllTransactions } from "@/app/actions/transaction";
import { format, isSameDay } from "date-fns";
import { cn, formatAbsoluteTime, formatRelativeTime } from "@/lib/utils";
import Last5Transactions from "@/components/Last5Transactions";
import TableTransactionsModal from "@/components/TableTransactionsModal";

export default function AppContainer() {
  const [month, setMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  const queryClient = useQueryClient();

  const { data, isPending } = useQuery({
    queryKey: ["transactions"],
    queryFn: getAllTransactions,
    staleTime: Infinity,
  });

  const selectedDateTransactions = useMemo(() => {
    return data?.filter((transaction) =>
      isSameDay(selectedDate, transaction.date)
    );
  }, [data, selectedDate]);

  const { income, expense, totalBalance } = useMemo(() => {
    // get income and expense in 1 iteration through the array
    const { income, expense } = data?.reduce(
      (acc, transaction) => {
        if (transaction.category === "expense") {
          acc.expense += transaction.amount;
        } else {
          acc.income += transaction.amount;
        }

        return acc;
      },

      { income: 0, expense: 0 }
    ) || { income: 0, expense: 0 };

    const totalBalance = income - expense;

    return { income, expense, totalBalance };
  }, [data]);

  function onSuccess() {
    queryClient.invalidateQueries(["transactions"]);
  }

  return (
    <>
      <div className="space-y-4 lg:space-y-0 lg:grid lg:grid-cols-[1fr_minmax(auto,200px)] lg:grid-rows-[250px_1fr] lg:gap-5">
        <div className="lg:hidden">
          <h6>Your Total Balance</h6>
          <h2 className="text-4xl font-bold">
            ${totalBalance.toLocaleString()}
          </h2>
        </div>
        <div className="bg-[#181818]/80 rounded-2xl p-4 backdrop-blur-xs">
          <LinearChart data={selectedDateTransactions} />
        </div>

        <div className="flex gap-3 lg:gap-y-5 lg:flex-col lg:grid lg:col-start-2 lg:col-end-3 lg:row-span-2">
          <DateTable
            month={month}
            setMonth={setMonth}
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            data={data}
          />
          <div className="bg-[#181818]/80 rounded-2xl backdrop-blur-xs w-[200px] place-content-center lg:w-full lg:p-2">
            <CircularChart income={income} expense={expense} />
          </div>
          <div className="hidden lg:inline py-4 px-10 place-content-center  bg-[#181818]/80 rounded-2xl">
            <h6>Total Balance</h6>
            <h2 className="text-3xl font-bold">
              ${totalBalance.toLocaleString()}
            </h2>
          </div>
        </div>

        <div className="bg-[#181818]/80 rounded-2xl p-6 backdrop-blur-xs flex flex-col gap-y-5">
          <div className="flex justify-between items-center">
            <h4 className="font-semibold text-2xl">Last Transactions</h4>
            <div className="flex gap-2 items-center h-4">
              <TableTransactionsModal
                onSuccess={onSuccess}
                data={data?.map((transaction) => {
                  let category = transaction.category;
                  category = category[0].toUpperCase() + category.slice(1);

                  return {
                    ...transaction,
                    category,
                    date: formatAbsoluteTime(transaction.date),
                  };
                })}
                classes={
                  "flex bg-purple-700 items-center gap-x-1 transition-all rounded px-2 py-1 hover:bg-purple-800 hover:cursor-pointer h-7 text-white"
                }
              >
                <>
                  <Eye size={16} />
                  <span className="text-sm font-semibold">View All</span>
                </>
              </TableTransactionsModal>

              <CreateTransactionModal
                onSuccess={onSuccess}
                selectedDate={selectedDate}
                classes="px-1.5 py-1 bg-purple-700 rounded hover:cursor-pointer hover:bg-purple-800 transition-all text-white h-7"
              >
                <Plus size={20} />
              </CreateTransactionModal>
            </div>
          </div>

          <div className="space-y-3">
            <Last5Transactions data={data} isPending={isPending} />
          </div>
        </div>
      </div>
    </>
  );
}
