import Image from "next/image";
import { useState } from "react";
import { FaHome } from "react-icons/fa";
import { MdOutlineExplore } from "react-icons/md";
import { RiQuestionMark, RiQuestionAnswerLine } from "react-icons/ri";
import { MdLocalHospital } from "react-icons/md";
import { useRouter } from "next/router";

export default function LeftLane() {
  const [index, setIndex] = useState(0);
  const router = useRouter();
  return (
    <div className="w-[25%] hidden md:block">
      <div className="flex flex-col h-[85vh] mt-10 ml-[10%] items-between justify-between">
        <div className="flex flex-col">
          <div
            className={`flex flex-row ${index === 0 ? "bg-blue-50" : "bg-white"}  w-46 xl:w-72 h-10 items-center hover:cursor-pointer mb-4`}
            onClick={() => {
              router.push("/home");
              setIndex(0);
            }}
          >
            <div className={`w-1 mr-3 h-10 ${index === 0 ? "bg-blue-600" : "bg-white"}`}></div>
            <FaHome size={20} color={`${index === 0 ? "#2563eb" : "gray"}`} />
            <div className={`text-md ${index === 0 ? "text-blue-600" : "text-slate-500"} font-bold ml-2`}>Home</div>
          </div>
          <div className={`flex flex-row ${index === 1 ? "bg-blue-50" : "bg-white"}  w-46 xl:w-72 h-10 items-center hover:cursor-pointer mb-4`} onClick={() => setIndex(1)}>
            <div className={`w-1 mr-3 h-10 ${index === 1 ? "bg-blue-600" : "bg-white"}`}></div>
            <MdOutlineExplore size={20} color={`${index === 1 ? "#2563eb" : "gray"}`} />
            <div className={`text-md ${index === 1 ? "text-blue-600" : "text-slate-500"} font-bold ml-2`}>Explore</div>
          </div>
          <div className={`flex flex-row ${index === 2 ? "bg-blue-50" : "bg-white"}  w-46 xl:w-72 h-10 items-center hover:cursor-pointer mb-4`} onClick={() => setIndex(2)}>
            <div className={`w-1 mr-3 h-10 ${index === 2 ? "bg-blue-600" : "bg-white"}`}></div>
            <RiQuestionMark size={20} color={`${index === 2 ? "#2563eb" : "gray"}`} />
            <div className={`text-md ${index === 2 ? "text-blue-600" : "text-slate-500"} font-bold ml-2`}>My Topics</div>
          </div>
          <div className={`flex flex-row ${index === 3 ? "bg-blue-50" : "bg-white"}  w-46 xl:w-72 h-10 items-center hover:cursor-pointer mb-4`} onClick={() => setIndex(3)}>
            <div className={`w-1 mr-3 h-10 ${index === 3 ? "bg-blue-600" : "bg-white"}`}></div>
            <RiQuestionAnswerLine size={20} color={`${index === 3 ? "#2563eb" : "gray"}`} />
            <div className={`text-md ${index === 3 ? "text-blue-600" : "text-slate-500"} font-bold ml-2`}>My Answers</div>
          </div>
        </div>
        <div className="h-96 relative w-52 xl:w-72 mb-4 rounded-md hidden flex-col items-center justify-end md:flex">
          <div className="z-1 absolute h-32 bg-green-100 w-full rounded-lg"></div>
          <div className="absolute z-2 w-full items-end flex flex-col">
            <Image src="/female_doctor.png" alt="female doctor" height={200} width={170} />
          </div>
          <div className="flex flex-row justify-center items-center z-3 absolute h-12 bg-green-500 w-32 lg:w-48 rounded-lg mb-4 hover:cursor-pointer hover:shadow-md hover:shadow-green-200">
            <MdLocalHospital size={28} color="white" />
            <div className="text-white hidden text-sm lg:text-[16px] ml-1 font-bold text-center lg:flex">Consult a doctor</div>
            <div className="text-white hidden text-md lg:text-[16px] ml-1 font-bold text-center max-lg:flex">Consult</div>
          </div>
        </div>
      </div>
    </div>
  );
}
