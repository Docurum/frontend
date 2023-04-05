import Image from "next/image";
import { useState } from "react";
import { FaHome } from "react-icons/fa";
import { MdOutlineExplore } from "react-icons/md";
import { RiQuestionMark, RiQuestionAnswerLine } from "react-icons/ri";
import { MdLocalHospital } from "react-icons/md";
import { useRouter } from "next/router";
import { AiOutlinePlus } from "react-icons/ai";

export default function BottomNavBar() {
  const [index, setIndex] = useState(0);
  const router = useRouter();
  return (
    <>
      <div className="fixed bottom-0 md:hidden">
        <div className="flex flex-row">
          <div
            className={`flex flex-col ${index === 0 ? "bg-blue-50" : "bg-white"}  w-[20vw] h-14 justify-center items-center hover:cursor-pointer`}
            onClick={() => {
              setIndex(0);
              router.push("/home");
            }}
          >
            <FaHome size={20} color={`${index === 0 ? "#2563eb" : "gray"}`} />
            <div className={`text-sm ${index === 0 ? "text-blue-600" : "text-slate-500"} font-bold`}>Home</div>
          </div>
          <div className={`flex flex-col ${index === 1 ? "bg-blue-50" : "bg-white"}  w-[20vw] h-14 justify-center items-center hover:cursor-pointer`} onClick={() => setIndex(1)}>
            <MdOutlineExplore size={20} color={`${index === 1 ? "#2563eb" : "gray"}`} />
            <div className={`text-sm ${index === 1 ? "text-blue-600" : "text-slate-500"} font-bold`}>Explore</div>
          </div>
          <div className={`flex flex-col bg-white w-[20vw] h-14 justify-center items-center hover:cursor-pointer`} onClick={() => router.push("/start-topic")}>
            <div className="hidden max-lg:flex flex-row items-center justify-center h-12 w-12 m-1 bg-blue-600 rounded-full shadow-blue-300 shadow-md hover:cursor-pointer">
              <AiOutlinePlus size={30} color="white" />
            </div>
          </div>
          <div className={`flex flex-col ${index === 3 ? "bg-blue-50" : "bg-white"}  w-[20vw] h-14 justify-center items-center hover:cursor-pointer`} onClick={() => setIndex(3)}>
            <RiQuestionMark size={20} color={`${index === 3 ? "#2563eb" : "gray"}`} />
            <div className={`text-sm ${index === 3 ? "text-blue-600" : "text-slate-500"} font-bold`}>Topics</div>
          </div>
          <div className={`flex flex-col ${index === 4 ? "bg-blue-50" : "bg-white"}  w-[20vw] h-14 justify-center items-center hover:cursor-pointer`} onClick={() => setIndex(4)}>
            <RiQuestionAnswerLine size={20} color={`${index === 4 ? "#2563eb" : "gray"}`} />
            <div className={`text-sm ${index === 4 ? "text-blue-600" : "text-slate-500"} font-bold`}>Answers</div>
          </div>
        </div>
      </div>
    </>
  );
}
