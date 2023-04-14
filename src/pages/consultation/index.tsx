import AppBar from "../../components/AppBar";
import Consultation from "../../components/Consultation";
import LeftLane from "../../components/LeftLane";
import RightLane from "../../components/RightLane";

export default function ConsultationPage() {
  return (
    <div className="flex flex-col max-h-[100vh] h-[100vh] max-w-[100vw] w-[100vw] overflow-y-hidden justify-center items-center">
      <div className="flex flex-col h-screen max-w-[1920px] w-[100vw]">
        <AppBar />
        <div className="flex flex-row h-[90vh]">
          <LeftLane />
          <Consultation />
          <RightLane />
        </div>
      </div>
    </div>
  );
}
