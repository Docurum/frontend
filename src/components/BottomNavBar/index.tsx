import Image from "next/image";
import { useState } from "react";
import { FaHome } from "react-icons/fa";
import { MdOutlineExplore } from "react-icons/md";
import { RiQuestionMark, RiQuestionAnswerLine } from "react-icons/ri";
import { MdLocalHospital } from "react-icons/md";

export default function BottomNavBar() {
  const [index, setIndex] = useState(0);
  return (
    <>
      <div className="fixed bottom-0 md:hidden">
        <div className="flex flex-row">
          <div className={`flex flex-col ${index === 0 ? "bg-blue-50" : "bg-white"}  w-[25vw] h-14 justify-center items-center hover:cursor-pointer`} onClick={() => setIndex(0)}>
            <FaHome size={20} color={`${index === 0 ? "#2563eb" : "gray"}`} />
            <div className={`text-sm ${index === 0 ? "text-blue-600" : "text-slate-500"} font-bold`}>Home</div>
          </div>
          <div className={`flex flex-col ${index === 1 ? "bg-blue-50" : "bg-white"}  w-[25vw] h-14 justify-center items-center hover:cursor-pointer`} onClick={() => setIndex(1)}>
            <MdOutlineExplore size={20} color={`${index === 1 ? "#2563eb" : "gray"}`} />
            <div className={`text-sm ${index === 1 ? "text-blue-600" : "text-slate-500"} font-bold`}>Explore</div>
          </div>
          <div className={`flex flex-col ${index === 2 ? "bg-blue-50" : "bg-white"}  w-[25vw] h-14 justify-center items-center hover:cursor-pointer`} onClick={() => setIndex(2)}>
            <RiQuestionMark size={20} color={`${index === 2 ? "#2563eb" : "gray"}`} />
            <div className={`text-sm ${index === 2 ? "text-blue-600" : "text-slate-500"} font-bold`}>Topics</div>
          </div>
          <div className={`flex flex-col ${index === 3 ? "bg-blue-50" : "bg-white"}  w-[25vw] h-14 justify-center items-center hover:cursor-pointer`} onClick={() => setIndex(3)}>
            <RiQuestionAnswerLine size={20} color={`${index === 3 ? "#2563eb" : "gray"}`} />
            <div className={`text-sm ${index === 3 ? "text-blue-600" : "text-slate-500"} font-bold`}>Answers</div>
          </div>
        </div>
      </div>
    </>
  );
}
