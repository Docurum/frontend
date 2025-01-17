import React from 'react'

function CommentsLoader() {
  return (
    <><div className='h-28 flex flex-col  shadow-lg w-[96.5%] shadow-blue-300 mx-4 mt-2 rounded-md p-4 mb-4'>
          <div className=" animate-pulse space-y-3 h-full">
              <div className="grid grid-cols-2 w-4/5 gap-7">
                  <div className="h-2 w-48  bg-slate-500 rounded col-span-2"></div>

              </div>
              <div className="h-[2px]  my-10 bg-slate-300"></div>

              <div className="h-2 w-1/2 my-10 bg-slate-500 rounded"></div>
              <div className="h-2 w-1/2 bg-slate-500 rounded"></div>


          </div>
      </div><div className='h-28 flex flex-col  shadow-lg w-[96.5%] shadow-blue-300 mx-4 mt-2 rounded-md p-4 mb-4'>
              <div className=" animate-pulse space-y-3 h-full">
                  <div className="grid grid-cols-2 w-4/5 gap-7">
                      <div className="h-2 w-48  bg-slate-500 rounded col-span-2"></div>

                  </div>
                  <div className="h-[2px]  my-10 bg-slate-300"></div>

                  <div className="h-2 w-1/2 my-10 bg-slate-500 rounded"></div>
                  <div className="h-2 w-1/2 bg-slate-500 rounded"></div>


              </div>
          </div></>
  )
}

export default CommentsLoader