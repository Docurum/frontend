import classNames from "classnames";
import AppBar from "../../components/AppBar";
import LeftLane from "../../components/LeftLane";
import RightLane from "../../components/RightLane";
import styles from "./index.module.css";
import BottomNavBar from "../../components/BottomNavBar";
import { MyTopicsSection } from "../../components/QandASection";

export default function MyTopicPage() {
  return (
    <div className="flex flex-col max-h-[100vh] h-[100vh] max-w-[100vw] w-[100vw] overflow-y-hidden justify-center items-center">
      <div className="flex flex-col h-screen max-w-[1920px] w-[100vw]">
        <AppBar />
        <div className="flex flex-row h-[90vh]">
          <LeftLane />
          <div className={classNames([styles["scrollbar"]], ["flex flex-col overflow-y-scroll scrollbar mt-2 w-full lg:w-1/2 h-[90vh]"])}>
            <MyTopicsSection />
            <BottomNavBar />
          </div>
          <RightLane />
        </div>
      </div>
    </div>
  );
}
