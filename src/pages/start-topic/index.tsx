import { useState } from "react";
import AppBar from "../../components/AppBar";
import CreateTopic from "../../components/CreateTopic";
import { Dropzone } from "../../components/Dropzone";
import LeftLane from "../../components/LeftLane";

export default function StartTopicPage() {
  const [files, setFiles] = useState([]);
  return (
    <div className="flex flex-col max-h-[100vh] h-[100vh] max-w-[100vw] w-[100vw] overflow-y-hidden justify-center items-center">
      <div className="flex flex-col h-screen max-w-[1920px] w-[100vw]">
        <AppBar />
        <div className="flex flex-row h-[90vh]">
          <LeftLane />
          <CreateTopic />
          <Dropzone files={files} setFiles={setFiles} />
        </div>
      </div>
    </div>
  );
}
