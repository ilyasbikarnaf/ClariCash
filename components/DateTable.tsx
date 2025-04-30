"use client";
import { MoveLeftIcon, MoveRightIcon } from "lucide-react";
import { Dispatch, SetStateAction, useMemo, useState } from "react";
import {
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  getDate,
  isSameDay,
  isSameMonth,
  startOfMonth,
  startOfWeek,
  subMonths,
} from "date-fns";
import { cn } from "@/lib/utils";
import { type TransactionType } from "@/lib/types";

type DateTableProps = {
  month: Date;
  setMonth: Dispatch<SetStateAction<Date>>;
  selectedDate: Date;
  setSelectedDate: Dispatch<SetStateAction<Date>>;
  data: TransactionType[] | undefined;
};

export default function DateTable({
  month,
  setMonth,
  selectedDate,
  setSelectedDate,
  data,
}: DateTableProps) {
  const days = useMemo(() => {
    const start = startOfWeek(startOfMonth(month), { weekStartsOn: 1 });
    const end = endOfWeek(endOfMonth(month), { weekStartsOn: 1 });

    return eachDayOfInterval({ start, end });
  }, [month]);

  const today = useMemo(() => new Date(), []);

  return (
    <div className="flex flex-1 flex-col gap-y-3 p-3 bg-[#181818]/90 lg:p-6 rounded-2xl lg:w-[300px]">
      <div className="flex justify-between items-center">
        <div className="px-2 py-1 hover:bg-[#212121] rounded">
          <MoveLeftIcon
            size={20}
            className="hover:cursor-pointer hover:opacity-90"
            onClick={() => setMonth(subMonths(month, 1))}
          />
        </div>
        <h3 className="text-lg md:text-xl font-bold">
          {format(month, "LLLL, y")}
        </h3>

        <div className="hover:cursor-pointer hover:bg-[#212121] rounded px-2 py-1">
          <MoveRightIcon
            size={20}
            className="hover:cursor-pointer hover:opacity-90"
            onClick={() => setMonth(addMonths(month, 1))}
          />
        </div>
      </div>
      <div className="grid grid-cols-7 gap-x-3 gap-y-1">
        <div className="font-bold text-xs place-self-center">M</div>
        <div className="font-bold text-xs place-self-center">T</div>
        <div className="font-bold text-xs place-self-center">W</div>
        <div className="font-bold text-xs place-self-center">T</div>
        <div className="font-bold text-xs place-self-center">F</div>
        <div className="font-bold text-xs place-self-center">S</div>
        <div className="font-bold  text-xs place-self-center">S</div>
        {days.map((day) => {
          const { income, expense } = data
            ?.filter((transaction) => isSameDay(day, transaction.date))
            .reduce(
              (acc, transaction) => {
                if (transaction.category === "expense") {
                  acc.expense += transaction.amount;
                } else if (transaction.category === "income") {
                  acc.income += transaction.amount;
                }

                return acc;
              },

              { income: 0, expense: 0 }
            ) || { income: 0, expense: 0 };

          const total = income + expense;
          const incomePercentage = total ? (income / total) * 100 : 0;
          const expensePercentage = total ? (expense / total) * 100 : 0;

          return (
            <div key={day.getTime()} className="w-6 lg:w-auto">
              <div
                className={cn(
                  " hover:cursor-pointer rounded p-1 w-full transition-all flex flex-col hover:bg-gray-600 items-center",
                  !isSameMonth(day, month) && "opacity-60",
                  isSameDay(day, selectedDate) && "bg-purple-500 text-white",
                  isSameDay(day, today) &&
                    !isSameDay(day, selectedDate) &&
                    "ring ring-white/20"
                )}
                onClick={() => setSelectedDate(day)}
              >
                <p
                  className={cn(
                    "font-semibold text-xs",
                    !isSameMonth(day, month) && "text-gray-400"
                  )}
                >
                  {getDate(day)}
                </p>
                <div className="w-full h-0.5 items-center flex text-xs">
                  <div
                    className={`bg-green-500  h-full`}
                    style={{ width: `${incomePercentage}%` }}
                  ></div>
                  <div
                    className={`bg-red-500 h-full`}
                    style={{ width: `${expensePercentage}%` }}
                  ></div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
