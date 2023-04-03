import React from 'react'

function VerfiicationPanel() {
  return (
    <div className='w-full flex min-h-screen '>
    <div className="w-[40%] hidden md:block bg-blue-400 h-[100vh]">
   <div>
        <img className='py-6 px-4' src='https://media.istockphoto.com/id/1224289744/video/online-health-technology-with-doctors-staff-animation.jpg?s=640x640&k=20&c=FEcJqlDtAgtuGfl2KExK81o-iRR_rxl2nF7AauUZf5g=' />
   </div>
   <div className='px-10 bg-blue-700 py-3'>
    <h1 className='text-white'>DOCURUM   | MAKE ALL YOUR PAINS AWAY</h1>
   </div>
    </div>
     <div className="py-10 w-full px-5">
          <h2 className="text-2xl font-bold">Underline</h2>
          <div className="mt-8 max-w-md">
            <div className="grid grid-cols-1 gap-6">
              <label className="block">
                <span className="text-gray-700">Full name</span>
                <input
                  type="text"
                  className="
                    mt-0
                    block
                    w-full
                    px-0.5
                    border-0 border-b-2 border-gray-200
                    focus:ring-0 focus:border-black
                  "
                  placeholder=""
                />
              </label>
              <label className="block">
                <span className="text-gray-700">Email address</span>
                <input
                  type="email"
                  className="
                    mt-0
                    block
                    w-full
                    px-0.5
                    border-0 border-b-2 border-gray-200
                    focus:ring-0 focus:border-black
                  "
                  placeholder="john@example.com"
                />
              </label>
              <label className="block">
                <span className="text-gray-700">When is your event?</span>
                <input
                  type="date"
                  className="
                    mt-0
                    block
                    w-full
                    px-0.5
                    border-0 border-b-2 border-gray-200
                    focus:ring-0 focus:border-black
                  "
                />
              </label>
              <label className="block">
                <span className="text-gray-700">What type of event is it?</span>
                <select
                  className="
                    block
                    w-full
                    mt-0
                    px-0.5
                    border-0 border-b-2 border-gray-200
                    focus:ring-0 focus:border-black
                  "
                >
                  <option>Corporate event</option>
                  <option>Wedding</option>
                  <option>Birthday</option>
                  <option>Other</option>
                </select>
              </label>
              <label className="block">
                <span className="text-gray-700">Additional details</span>
                <textarea
                  className="
                    mt-0
                    block
                    w-full
                    px-0.5
                    border-0 border-b-2 border-gray-200
                    focus:ring-0 focus:border-black
                  "
                  rows={2}
                ></textarea>
              </label>
              <div className="block">
                <div className="mt-2">
                  <div>
                    <label className="inline-flex items-center">
                      <input
                        type="checkbox"
                        className="
                          border-gray-300 border-2
                          text-black
                          focus:border-gray-300 focus:ring-black
                        "
                      />
                      <span className="ml-2">Email me news and special offers</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>


    </div>
  )
}

export default VerfiicationPanel