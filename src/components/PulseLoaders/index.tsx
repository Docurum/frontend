import React from 'react'
import { CgProfile } from 'react-icons/cg';

function ProfileLoader() {
  return (
    <div className='flex w-[70%] flex-col'><div className="  mx-6 py-10">
      <div className="animate-pulse  flex space-x-4">
        <div className="rounded-full mx-6 bg-slate-500 h-30 w-28"></div>
        <div className="flex-1 space-y-6 py-1">
          <div className="h-2 w-48 bg-slate-500 rounded"></div>
          <div className="space-y-3">
            <div className="grid grid-cols-3 w-4/5 gap-4">
              <div className="h-2 w-28  bg-slate-500 rounded col-span-2"></div>

            </div>
            <div className="h-2 w-28 bg-slate-500 rounded"></div>
            <div className="h-2 w-28 bg-slate-500 rounded"></div>
            <div className="h-2 w-28 bg-slate-500 rounded"></div>
          </div>
        </div>
      </div>

    </div>
    <div className='h-48 flex flex-col  shadow-lg w-[96.5%] shadow-blue-300 mx-4 mt-2 rounded-md p-4 mb-4'>
<div className=  " animate-pulse space-y-3 h-full">
            <div className="grid grid-cols-2 w-4/5 gap-7">
              <div className="h-2 w-48  bg-slate-500 rounded col-span-2"></div>

            </div>
            <div className="h-[2px]  my-10 bg-slate-300"></div>

              <div className="h-2  my-10 bg-slate-500 rounded"></div>
            <div className="h-2 w-28 bg-slate-500 rounded"></div>
            <div className="h-2 w-48 bg-slate-500 rounded"></div>
            
              <div className="h-2 w-48 my-10 bg-slate-500 rounded"></div>
            <div className="h-2 w-28 bg-slate-500 rounded"></div>
            <div className="h-2 w-48 bg-slate-500 rounded"></div>

          </div>
          </div>
              <div className='h-48 flex flex-col  shadow-lg w-[96.5%] shadow-blue-300 mx-4 mt-2 rounded-md p-4 mb-4'>
<div className=  " animate-pulse space-y-3 h-full">
            <div className="grid grid-cols-2 w-4/5 gap-7">
              <div className="h-2 w-48  bg-slate-500 rounded col-span-2"></div>

            </div>
            <div className="h-[2px] my-10 bg-slate-300"></div>

              <div className="h-2  my-10 bg-slate-500 rounded"></div>
            <div className="h-2 w-1/2 bg-slate-500 rounded"></div>
            <div className="h-2 w-1/2 bg-slate-500 rounded"></div>
            
              <div className="h-2 w-1/2  my-10 bg-slate-500 rounded"></div>
            <div className="h-2 w-1/2 bg-slate-500 rounded"></div>
            <div className="h-2 w-1/2 bg-slate-500 rounded"></div>

          </div>
          </div>
      </div>
  )

}
  


export default ProfileLoader