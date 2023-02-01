import AppBar from "../../components/AppBar";
import CreateTopic from "../../components/CreateTopic";
import LeftLane from "../../components/LeftLane";
import Uppy from "@uppy/core";
import { DashboardModal } from "@uppy/react";
import { FileUpload } from "../../components/FileUpload";

export default function StartTopicPage() {
  return (
    <div className="flex flex-col max-h-[100vh] h-[100vh] max-w-[100vw] w-[100vw] overflow-y-hidden justify-center items-center">
      <div className="flex flex-col max-w-[1920px] w-[100vw]">
        <AppBar />
        <div className="flex flex-row h-[90vh]">
          <LeftLane />
          <CreateTopic />
          <FileUpload />
        </div>
      </div>
    </div>
  );
}
