import { useRouter } from "next/router";
import React from "react";
import { AiOutlinePlus } from "react-icons/ai";

function RightLoading() {
  const router = useRouter();
  return (
    <div className=" hidden lg:flex   h-full w-[25%] flex-col">
    
      <div className=" flex flex-col items-center animate-pulse space-y-4 h-full">
       <div className="animate-hide flex flex-row bg-blue-600 shadow-blue-200 shadow-md rounded-lg w-[80%] mt-[5%] p-3 items-center justify-center hover:cursor-pointer">
        <AiOutlinePlus size={25} color="white" />
        <div className="text-white text-md font-bold ml-2">Start a New Topic</div>
      </div>
       <div className="flex  p-2 items-center ">
          <div className="w-9 h-9 bg-slate-500  rounded-full"></div>
     <div className="h-2 m-3 w-48 bg-slate-500 rounded"></div>
       </div>
           <div className="flex items-center">
          <div className="w-9 h-9 bg-slate-500  rounded-full"></div>
     <div className="h-2 m-3 w-48 bg-slate-500 rounded"></div>
       </div>
           <div className="flex items-center">
          <div className="w-9 h-9 bg-slate-500  rounded-full"></div>
     <div className="h-2 m-3 w-48 bg-slate-500 rounded"></div>
       </div>
           <div className="flex items-center">
          <div className="w-9 h-9 bg-slate-500  rounded-full"></div>
     <div className="h-2 m-3 w-48 bg-slate-500 rounded"></div>
       </div>
           <div className="flex items-center">
          <div className="w-9 h-9 bg-slate-500  rounded-full"></div>
     <div className="h-2 m-3 w-48 bg-slate-500 rounded"></div>
       </div>
           <div className="flex items-center">
          <div className="w-9 h-9 bg-slate-500  rounded-full"></div>
     <div className="h-2 m-3 w-48 bg-slate-500 rounded"></div>
       </div>
           <div className="flex items-center">
          <div className="w-9 h-9 bg-slate-500  rounded-full"></div>
     <div className="h-2 m-3 w-48 bg-slate-500 rounded"></div>
       </div>
      <div className="flex flex-row mt-10 ml-10 w-[80%] items-start justify-start">
        <div className="flex flex-col">
          <div className="font-bold text-sm text-slate-400 mt-2 hover:cursor-pointer">About Us</div>
          <div className="font-bold text-sm text-slate-400 mt-2 hover:cursor-pointer">Help</div>
          <div className="font-bold text-sm text-slate-400 mt-2 hover:cursor-pointer">Careers</div>
          <div className="font-bold text-sm text-slate-400 mt-2 hover:cursor-pointer">Blog</div>
        </div>
        <div className="flex flex-col ml-10">
          <div className="font-bold text-sm text-slate-400 mt-2 hover:cursor-pointer">Faqs</div>
          <div className="font-bold text-sm text-slate-400 mt-2 hover:cursor-pointer">Terms of Service</div>
          <div className="font-bold text-sm text-slate-400 mt-2 hover:cursor-pointer">Privacy Policy</div>
        </div>
      </div>
       
       
      </div>
    </div>
  );
}

export default RightLoading;
