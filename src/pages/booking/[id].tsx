import dynamic from "next/dynamic";

import AppBar from "../../components/AppBar";
const Booking = dynamic(() => import("../../components/Booking/booking").then((mod) => mod.Booking), {
  ssr: false,
});
import LeftLane from "../../components/LeftLane";
import RightLane from "../../components/RightLane";

export default function BookingPage() {
  return (
    <div className="flex flex-col max-h-[100vh] h-[100vh] max-w-[100vw] w-[100vw] overflow-y-hidden justify-center items-center">
      <div className="flex flex-col h-screen max-w-[1920px] w-[100vw]">
        <AppBar />
        <div className="flex flex-row h-[90vh]">
          <LeftLane />
          <Booking />
          <RightLane />
        </div>
      </div>
    </div>
  );
}
