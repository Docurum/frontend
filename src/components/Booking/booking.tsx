import classNames from "classnames";
import BottomNavBar from "../BottomNavBar";
import styles from "./index.module.css";

const Booking = () => {
  return (
    <div className={classNames([styles["scrollbar"]], ["flex flex-col items-center overflow-y-scroll scrollbar mt-2 w-full lg:w-1/2 h-[90vh]"])}>
      <BottomNavBar />
    </div>
  );
};

export { Booking };
