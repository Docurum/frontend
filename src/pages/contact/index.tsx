import React from "react";
import AppBar from "../../components/AppBar";
import LeftLane from "../../components/LeftLane";
import RightLane from "../../components/RightLane";

export default function ContactPage() {
  return (
    <div className="flex flex-col max-h-[100vh] h-[100vh] max-w-[100vw] w-[100vw] overflow-y-hidden justify-center items-center">
      <div className="flex flex-col h-screen max-w-[1920px] w-[100vw]">
        <AppBar />
        <div className="flex flex-row h-[90vh]">
          <LeftLane />
          <ContactComponent />
          <RightLane />
        </div>
      </div>
    </div>
  );
}

const ContactComponent = () => {
  return (
    <div className="flex custom-scrollbar p-4 scrollbar flex-col items-start overflow-y-scroll scrollbar mt-2 w-full lg:w-1/2 h-[90vh]">
      <div className="">
        <p className=" text-xl my-2 font-bold">Contact Us</p>
        <div className="rounded-md bg-blue-50 p-4 shadow-md shadow-blue-300 my-4">
          <p className=" text-blue-600 text-lg font-bold">Email: </p>
          <p className="text-lg">docurumbusiness@gmail.com</p>
        </div>
        <div className="rounded-md bg-blue-50 p-4 shadow-md shadow-blue-300 my-4">
          <p className=" text-blue-600 text-lg font-bold">Phone: </p>
          <p className="text-lg">(+91) 9083972802</p>
        </div>
        <div className="rounded-md bg-blue-50 p-4 shadow-md shadow-blue-300 my-4">
          <p className=" text-blue-600 text-lg font-bold">Address: </p>
          <p className="text-lg">Subhaspally near shakti mandir club </p>
          <p className="text-lg text-blue-600 font-bold">State: </p>
          <p className="text-lg">West Bengal</p>
          <p className="text-lg text-blue-600 font-bold">Country: </p>
          <p className="text-lg">India </p>
          <p className="text-lg text-blue-600 font-bold">Pincode: </p>
          <p className="text-lg">721301</p>
        </div>
      </div>
    </div>
  );
};
