import React from "react";
import { CgProfile } from "react-icons/cg";

function TopicLoader() {
  return (
    <div className="flex w-full max-h-full flex-col">
      <div className="h-full flex flex-col  shadow-lg w-[96.5%] shadow-blue-300 mx-4 mt-2 rounded-md p-4 mb-4">
        <div className=" mx-5  flex flex-col mt-6 max-sm:ml-4 animate-pulse space-y-3 ">
          <div className="grid grid-cols-2 w-4/5 gap-7">
            <div className="h-2 w-48  bg-slate-500 rounded col-span-2"></div>
          </div>
          <div className="flex  gap-4">
            <div className=" flex h-10 flex-row p-2 rounded-lg items-center shadow-md w-48 gap-1 bg-slate-500 col-span-2"></div>
            <div className="flex h-10 flex-row p-2 rounded-lg items-center shadow-md w-28 gap-1 bg-slate-500 col-span-2"></div>
          </div>

          <div className="h-2 w-full my-10 bg-slate-500 rounded"></div>
          <div className="h-2 w-full bg-slate-500 rounded"></div>
          <div className="h-2 w-full bg-slate-500 rounded"></div>
          <div className="h-2 w-full bg-slate-500 rounded"></div>
          <div className="h-2 w-48 bg-slate-500 rounded"></div>
          <div className="h-[2px]  my-10 bg-slate-300"></div>
          <div className="flex items-center">
            <div className="w-9 h-9 bg-slate-500  rounded-full"></div>
            <div className="h-2 m-3 w-48 bg-slate-500 rounded"></div>
          </div>
        </div>
      </div>

      <div className="h-full flex flex-col  shadow-lg w-[96.5%] shadow-blue-300 mx-4 mt-2 rounded-md p-4 mb-4">
        <div className=" mx-5 flex flex-col mt-6 max-sm:ml-4 animate-pulse space-y-3 ">
          <div className="grid grid-cols-2 w-4/5 gap-7">
            <div className="h-2 w-48  bg-slate-500 rounded col-span-2"></div>
          </div>
          <div className="flex  gap-4">
            <div className=" flex h-10 flex-row p-2 rounded-lg items-center shadow-md w-48 gap-1 bg-slate-500 col-span-2"></div>
            <div className="flex h-10 flex-row p-2 rounded-lg items-center shadow-md w-28 gap-1 bg-slate-500 col-span-2"></div>
          </div>

          <div className="h-2 w-full my-10 bg-slate-500 rounded"></div>
          <div className="h-2 w-full bg-slate-500 rounded"></div>
          <div className="h-2 w-full bg-slate-500 rounded"></div>
          <div className="h-2 w-full bg-slate-500 rounded"></div>
          <div className="h-2 w-48 bg-slate-500 rounded"></div>
          <div className="h-[2px]  my-10 bg-slate-300"></div>
          <div className="flex items-center">
            <div className="w-9 h-9 bg-slate-500  rounded-full"></div>
            <div className="h-2 m-3 w-48 bg-slate-500 rounded"></div>
          </div>
          
        </div>
      </div>
    </div>
  );
}

export default TopicLoader;
