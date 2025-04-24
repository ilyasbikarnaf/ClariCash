"use client";

import CircularChart from "@/components/CircularChart";
import DateTable from "@/components/DateTable";
import LinearChart from "@/components/LinearChart";
import { Plus } from "lucide-react";

export default function RootPage() {
  return (
    <div className="space-y-8 md:space-y-0 md:grid md:grid-cols-[1fr_100px] md:gap-5">
      <div className="md:hidden">
        <h6>Your Total Balance</h6>
        <h2 className="text-4xl font-bold">$7,540.00</h2>
      </div>
      <div className="bg-[#181818]/80 rounded-2xl p-4 backdrop-blur-xs">
        <LinearChart />
      </div>

      <div className="flex gap-2 md:gap-y-5 md:flex-col md:grid md:col-start-2 md:col-end-3 md:row-span-2">
        <DateTable />
        <div className="bg-[#181818]/80 rounded-2xl backdrop-blur-xs w-[200px] place-content-center md:w-full md:p-2">
          <CircularChart />
        </div>
        <div className="hidden md:inline py-4 px-10 place-content-center  bg-[#181818]/80 rounded-2xl">
          <h6>Total Balance</h6>
          <h2 className="text-4xl font-bold">$7,540.00</h2>
        </div>
      </div>

      <div className="bg-[#181818]/80 rounded-2xl p-6 backdrop-blur-xs flex flex-col gap-y-5">
        <div className="flex justify-between items-center">
          <h4 className="font-semibold text-2xl">Last Transactions</h4>
          <button className="px-1.5 py-1 bg-purple-700 rounded hover:cursor-pointer hover:bg-purple-800 transition-all">
            <Plus size={20} />
          </button>
        </div>

        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl">Spotify</h2>
              <p className="text-xs text-gray-700">April 18, 2024 11:01 AM</p>
            </div>
            <h4 className="text-green-400 font-bold">$400.00</h4>
          </div>
          <div className="flex justify-between items-center ">
            <div>
              <h2 className="text-xl">Spotify</h2>
              <p className="text-xs text-gray-700">April 18, 2024 11:01 AM</p>
            </div>
            <h4 className="text-green-400 font-bold">$400.00</h4>
          </div>
          <div className="flex justify-between items-center ">
            <div>
              <h2 className="text-xl">Spotify</h2>
              <p className="text-xs text-gray-700">April 18, 2024 11:01 AM</p>
            </div>
            <h4 className="text-green-400 font-bold">$400.00</h4>
          </div>
          <div className="flex justify-between items-center ">
            <div>
              <h2 className="text-xl">Spotify</h2>
              <p className="text-xs text-gray-700">April 18, 2024 11:01 AM</p>
            </div>
            <h4 className="text-green-400 font-bold">$400.00</h4>
          </div>
          <div className="flex justify-between items-center ">
            <div>
              <h2 className="text-xl">Spotify</h2>
              <p className="text-xs text-gray-700">April 18, 2024 11:01 AM</p>
            </div>
            <h4 className="text-green-400 font-bold">$400.00</h4>
          </div>
          <div className="flex justify-between items-center ">
            <div>
              <h2 className="text-xl">Spotify</h2>
              <p className="text-xs text-gray-700">April 18, 2024 11:01 AM</p>
            </div>
            <h4 className="text-green-400 font-bold">$400.00</h4>
          </div>
        </div>
      </div>
    </div>
  );
}
