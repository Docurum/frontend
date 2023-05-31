import Image from "next/image";
import { useContext, useState } from "react";
import { FaHome } from "react-icons/fa";
import { MdOutlineExplore } from "react-icons/md";
import { RiQuestionMark, RiQuestionAnswerLine } from "react-icons/ri";
import { MdLocalHospital } from "react-icons/md";
import { useRouter } from "next/router";
import { AiOutlinePlus } from "react-icons/ai";
import { AppContext } from "../../context/app-context";
import { GiVideoConference } from "react-icons/gi";

export default function BottomNavBar() {
  const appContext = useContext(AppContext);
  const router = useRouter();
  return (
    <>
      <div className="fixed bottom-0 md:hidden">
        <div className="flex flex-row">
          <div
            className={`flex flex-col ${appContext?.navigationIndex === 0 ? "bg-blue-50" : "bg-white"}  w-[20vw] h-14 justify-center items-center hover:cursor-pointer`}
            onClick={() => {
              appContext?.setNavigationIndex(0);
              router.push("/home");
            }}
          >
            <FaHome size={20} color={`${appContext?.navigationIndex === 0 ? "#2563eb" : "gray"}`} />
            <div className={`text-sm ${appContext?.navigationIndex === 0 ? "text-blue-600" : "text-slate-500"} font-bold`}>Home</div>
          </div>
          <div
            className={`flex flex-col ${appContext?.navigationIndex === 1 ? "bg-blue-50" : "bg-white"}  w-[20vw] h-14 justify-center items-center hover:cursor-pointer`}
            onClick={() => appContext?.setNavigationIndex(1)}
          >
            <MdOutlineExplore size={20} color={`${appContext?.navigationIndex === 1 ? "#2563eb" : "gray"}`} />
            <div className={`text-sm ${appContext?.navigationIndex === 1 ? "text-blue-600" : "text-slate-500"} font-bold`}>Explore</div>
          </div>
          <div className={`flex flex-col bg-white w-[20vw] h-14 justify-center items-center hover:cursor-pointer`} onClick={() => router.push("/start-topic")}>
            <div className="hidden max-lg:flex flex-row items-center justify-center h-12 w-12 m-1 bg-blue-600 rounded-full shadow-blue-300 shadow-md hover:cursor-pointer">
              <AiOutlinePlus size={30} color="white" />
            </div>
          </div>
          <div
            className={`flex flex-col ${appContext?.navigationIndex === 2 ? "bg-blue-50" : "bg-white"}  w-[20vw] h-14 justify-center items-center hover:cursor-pointer`}
            onClick={() => {
              appContext?.setNavigationIndex(2);
              router.push("/my-topics");
            }}
          >
            <RiQuestionMark size={20} color={`${appContext?.navigationIndex === 2 ? "#2563eb" : "gray"}`} />
            <div className={`text-sm ${appContext?.navigationIndex === 2 ? "text-blue-600" : "text-slate-500"} font-bold`}>Topics</div>
          </div>
          <div
            className={`flex flex-col ${appContext?.navigationIndex === 3 ? "bg-blue-50" : "bg-white"}  w-[20vw] h-14 justify-center items-center hover:cursor-pointer`}
            onClick={() => {
              appContext?.setNavigationIndex(3);
              router.push("/consultation");
            }}
          >
            <GiVideoConference size={20} color={`${appContext?.navigationIndex === 3 ? "#2563eb" : "gray"}`} />
            <div className={`text-sm ${appContext?.navigationIndex === 3 ? "text-blue-600" : "text-slate-500"} font-bold`}>Consult</div>
          </div>
        </div>
      </div>
    </>
  );
}
