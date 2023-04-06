import React from "react";
import VerfiicationPanel from "../../components/VerificationPanel";
import AppBar from "../../components/AppBar";
import LeftLane from "../../components/LeftLane";
import MobileVerfiicationPanel from "../../components/MobileVerfiication";

function verfiy() {
  return (
    <div className="flex flex-col max-h-[100vh] h-[100vh] max-w-[100vw] w-[100vw] overflow-y-hidden justify-center items-center">
      <div className="flex flex-col h-screen max-w-[1920px] w-[100vw]">
        <AppBar />
        <div className="flex flex-row h-[90vh]">
          <LeftLane />
          <VerfiicationPanel />
          <MobileVerfiicationPanel />
        </div>
      </div>
    </div>
  );
}

export default verfiy;
