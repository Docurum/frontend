import React from 'react'
import { BsFillTelephoneFill } from 'react-icons/bs';
import { CgProfile } from 'react-icons/cg';
import { MdEmail, MdLocationOn } from 'react-icons/md';

function ProfileLoader() {
  return (
    <>
    <div className=' hidden lg:flex w-[50%] flex-col'><div className="   py-10">
      <div className="animate-pulse  flex space-x-4">
        <div className="rounded-full mx-6 bg-slate-500 h-30 w-28"></div>
        <div className="flex-1 space-y-6 py-1">
          <div className="h-2 w-48 bg-slate-500 rounded"></div>
          <div className="space-y-3">
            <div className="grid grid-cols-3 w-4/5 gap-4">
              
              <div className="h-2 w-28  bg-slate-500 rounded col-span-2"></div>

            </div>
            <div className="h-2 w-48 bg-slate-500 rounded"></div>
            <div className="h-2 w-28 bg-slate-500 rounded"></div>
            <div className="h-2 w-48 bg-slate-500 rounded"></div>
          </div>
        </div>
      </div>

    </div>
 
    <div className="flex mt-2 flex-col shadow-md shadow-blue-200 w-min p-3 rounded-md mb-7 ml-2">
         <div className="font-bold text-slate-600">Share your page:</div>
   <div className="h-2 my-3 w-full bg-slate-500 rounded"></div>
         <div className="flex flex-row items-center">
           <div className="text-blue-600 text-lg w-[79vw] lg:w-80  mr-4 font-bold"></div>
          <div
            className="hover:cursor-pointer"
            
          >
            
          </div>
        </div>
      </div>
      
          <div className='shadow-md w-[98.5%] shadow-blue-200 mx-2 mt-2 rounded-md'>
            <div className='flex flex-row p-4 items-center justify-between'>
              <div className='text-blue-600 text-xl font-bold'>  Clinic</div>
            </div>
             <div className=' flex flex-col  shadow-lg w-[96.5%] shadow-blue-300  mx-4 mt-2 rounded-md p-5 mb-4'>
<div className=  " animate-pulse space-y-5 h-full">
            <div className="flex flex-row items-center">
                   <div className="rounded-full mx-1 bg-slate-500 h-10 w-10"></div>
              <div className="h-2 w-48 mx-3 bg-slate-500 rounded col-span-2"></div>
   
            </div>
            <div className="h-[2px]  my-10 bg-slate-300"></div>
  <div className="flex flex-row items-center">
                 <MdLocationOn  size={25} color="red" />
              <div className="h-2 w-full mx-5 bg-slate-500 rounded col-span-2"></div>
   
            </div>
              <div className="flex flex-row items-center">
                  <BsFillTelephoneFill size={20} color="green" />
              <div className="h-2 w-48 mx-5 bg-slate-500 rounded col-span-2"></div>
   
            </div>
              <div className="flex flex-row items-center">
             <MdEmail size={22} color="gray" />
              <div className="h-2 w-48 mx-5 bg-slate-500 rounded col-span-2"></div>
   
            </div>

          </div>
          
          </div>
          </div>
       
      </div>
      <div className='hidden max-sm:flex w-[90%]  flex-col'><div className="  mx-2 py-10">
      <div className="animate-pulse  flex space-x-3 mx-5">
    
        <div className="flex flex-row  ">
          
      
              <div className="rounded-full mx-6 bg-slate-500 h-20 w-20"></div>
          <div className="space-y-3">
            <div className="grid grid-cols-3 w-4/5 gap-5">
              <div className="h-2 w-28 my bg-slate-500 rounded col-span-2"></div>

            </div>
            <div className="h-2 w-28 bg-slate-500 rounded"></div>
            <div className="h-2 w-48 bg-slate-500 rounded"></div>
            <div className="h-2 w-28 bg-slate-500 rounded"></div>
            <div className="h-2 w-28 bg-slate-500 rounded"></div>
          </div>
        </div>
      </div>

    </div>
    <div className='flex h-48  flex-col  shadow-lg w-[96.5%] shadow-blue-300 mx-4 mt-2 rounded-md p-4 mb-4'>
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
      </>
  )

}
  


export default ProfileLoader