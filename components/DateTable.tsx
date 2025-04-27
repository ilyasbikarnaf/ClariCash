import { MoveLeftIcon, MoveRightIcon } from "lucide-react";

const array = new Array(30).fill(0).map((_, i) => i + 1);

export default function DateTable() {
  return (
    <div className="flex flex-1 flex-col gap-y-3 p-3 bg-[#181818]/90 lg:p-6 rounded-xl lg:w-[300px]">
      <div className="flex justify-between items-center ">
        <div className="px-2 py-1 hover:bg-[#212121] rounded">
          <MoveLeftIcon
            size={20}
            className="hover:cursor-pointer hover:opacity-90"
          />
        </div>
        <h3 className="text-xl font-bold">April</h3>

        <div className="hover:cursor-pointer hover:bg-[#212121] rounded px-2 py-1">
          <MoveRightIcon
            size={20}
            className="hover:cursor-pointer hover:opacity-90"
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
        {array.map((item) => {
          return (
            <div
              className=" hover:cursor-pointer rounded hover: p-1 w-full transition-all flex flex-col hover:bg-gray-600 items-center"
              key={item}
            >
              <p className="font-semibold text-xs">{item}</p>
              <div className="w-full h-0.5 items-center flex text-xs">
                <div className={`bg-green-500 w-[80%] h-full`}></div>
                <div className={`bg-red-500 w-[20%] h-full`}></div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
