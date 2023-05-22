import React from "react";
import AppBar from "../../components/AppBar";
import LeftLane from "../../components/LeftLane";
import RightLane from "../../components/RightLane";

export default function RefundPolicy() {
  return (
    <div className="flex flex-col max-h-[100vh] h-[100vh] max-w-[100vw] w-[100vw] overflow-y-hidden justify-center items-center">
      <div className="flex flex-col h-screen max-w-[1920px] w-[100vw]">
        <AppBar />
        <div className="flex flex-row h-[90vh]">
          <LeftLane />
          <RefundComponent />
          <RightLane />
        </div>
      </div>
    </div>
  );
}

const RefundComponent = () => {
  return (
    <div className="flex custom-scrollbar p-4 scrollbar flex-col items-start overflow-y-scroll scrollbar mt-2 w-full lg:w-1/2 h-[90vh]">
      <div className="">
        <p className=" text-xl my-2 font-bold">Cancellation & Refund Policy</p>
        <p className=" text-blue-600 text-lg font-bold"> </p>
        <p className="text-lg">No refunds will be given to any user, once you buy any plan/subscription. </p>
      </div>
    </div>
  );
};
