import AppBar from "../../components/AppBar";
import LeftLane from "../../components/LeftLane";
import QandASection from "../../components/QandASection";
import RightLane from "../../components/RightLane";

export default function Home() {
  return (
    <div className="flex flex-col max-h-[100vh] h-[100vh] max-w-[100vw] w-[100vw] overflow-y-hidden justify-center items-center">
      <div className="flex flex-col max-w-[1920px]">
        <AppBar />
        <div className="flex flex-row h-[90vh]">
          <LeftLane />
          <QandASection />
          <RightLane />
        </div>
      </div>
    </div>
  );
}
