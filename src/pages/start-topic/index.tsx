import AppBar from "../../components/AppBar";
import CreateTopic from "../../components/CreateTopic";
import { Dropzone } from "../../components/Dropzone";
import LeftLane from "../../components/LeftLane";

export default function StartTopicPage() {
  return (
    <div className="flex flex-col max-h-[100vh] h-[100vh] max-w-[100vw] w-[100vw] overflow-y-hidden justify-center items-center">
      <div className="flex flex-col max-w-[1920px] w-[100vw]">
        <AppBar />
        <div className="flex flex-row h-[90vh]">
          <LeftLane />
          <CreateTopic />
          <Dropzone file={"a"} onFileCapture={() => {}} setFile={() => {}} />
        </div>
      </div>
    </div>
  );
}
