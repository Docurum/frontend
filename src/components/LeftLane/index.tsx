import Image from "next/image";
import { useContext, useState } from "react";
import { FaHome } from "react-icons/fa";
import { MdOutlineExplore } from "react-icons/md";
import { RiQuestionMark, RiQuestionAnswerLine } from "react-icons/ri";
import { MdLocalHospital } from "react-icons/md";
import { useRouter } from "next/router";
import Consult from "../Consult";
import { GiVideoConference } from "react-icons/gi";
import { AppContext } from "../../context/app-context";

export default function LeftLane() {
  const appContext = useContext(AppContext);
  const router = useRouter();
  return (
    <div className="w-[25%] hidden md:block">
      <div className="flex flex-col h-[85vh] mt-10 ml-[10%] items-between justify-between">
        <div className="flex flex-col">
          <div
            className={`flex flex-row ${appContext?.navigationIndex === 0 ? "bg-blue-50" : "bg-white"}  w-46 xl:w-72 h-10 items-center hover:cursor-pointer mb-4`}
            onClick={() => {
              appContext?.setNavigationIndex(0);
              router.push("/home");
            }}
          >
            <div className={`w-1 mr-3 h-10 ${appContext?.navigationIndex === 0 ? "bg-blue-600" : "bg-white"}`}></div>
            <FaHome size={20} color={`${appContext?.navigationIndex === 0 ? "#2563eb" : "gray"}`} />
            <div className={`text-md ${appContext?.navigationIndex === 0 ? "text-blue-600" : "text-slate-500"} font-bold ml-2`}>Home</div>
          </div>
          <div
            className={`flex flex-row ${appContext?.navigationIndex === 1 ? "bg-blue-50" : "bg-white"}  w-46 xl:w-72 h-10 items-center hover:cursor-pointer mb-4`}
            onClick={() => appContext?.setNavigationIndex(1)}
          >
            <div className={`w-1 mr-3 h-10 ${appContext?.navigationIndex === 1 ? "bg-blue-600" : "bg-white"}`}></div>
            <MdOutlineExplore size={20} color={`${appContext?.navigationIndex === 1 ? "#2563eb" : "gray"}`} />
            <div className={`text-md ${appContext?.navigationIndex === 1 ? "text-blue-600" : "text-slate-500"} font-bold ml-2`}>Explore</div>
          </div>
          <div
            className={`flex flex-row ${appContext?.navigationIndex === 2 ? "bg-blue-50" : "bg-white"}  w-46 xl:w-72 h-10 items-center hover:cursor-pointer mb-4`}
            onClick={() => {
              appContext?.setNavigationIndex(2);
              router.push("/my-topics");
            }}
          >
            <div className={`w-1 mr-3 h-10 ${appContext?.navigationIndex === 2 ? "bg-blue-600" : "bg-white"}`}></div>
            <RiQuestionMark size={20} color={`${appContext?.navigationIndex === 2 ? "#2563eb" : "gray"}`} />
            <div className={`text-md ${appContext?.navigationIndex === 2 ? "text-blue-600" : "text-slate-500"} font-bold ml-2`}>My Topics</div>
          </div>
          <div
            className={`flex flex-row ${appContext?.navigationIndex === 3 ? "bg-blue-50" : "bg-white"}  w-46 xl:w-72 h-10 items-center hover:cursor-pointer mb-4`}
            onClick={() => {
              router.push("/consultation");
              appContext?.setNavigationIndex(3);
            }}
          >
            <div className={`w-1 mr-3 h-10 ${appContext?.navigationIndex === 3 ? "bg-blue-600" : "bg-white"}`}></div>
            <GiVideoConference size={25} color={`${appContext?.navigationIndex === 3 ? "#2563eb" : "gray"}`} />
            <div className={`text-md ${appContext?.navigationIndex === 3 ? "text-blue-600" : "text-slate-500"} font-bold ml-2`}>Consultations</div>
          </div>
        </div>
        <Consult />
      </div>
    </div>
  );
}
