import classNames from "classnames";
import styles from "./index.module.css";
import BottomNavBar from "../BottomNavBar";
import Lottie from "react-lottie-player";
import consultAnimation from "../../animations/consult.json";
import { GetAttendeePendingConsultations } from "../../api/consultation";

const Consultation = () => {
  return (
    <div className={classNames([styles["scrollbar"]], ["flex flex-col items-center overflow-y-scroll scrollbar mt-2 w-full lg:w-1/2 h-[90vh]"])}>
      <ConsulationsComponent />
      <BottomNavBar />
    </div>
  );
};

const ConsulationsComponent = () => {
  const consultationsPendingQuery = GetAttendeePendingConsultations();

  if (consultationsPendingQuery.isLoading) {
    return <NoConsultationsFound />;
  }

  return (
    <div className="flex flex-col">
      {consultationsPendingQuery.data?.map((consult, index) => {
        return <div key={index}>{consult.id}</div>;
      })}
    </div>
  );
};

const NoConsultationsFound = () => {
  return (
    <div className="ml-12 flex flex-row mt-10 justify-center w-[100vw] lg:w-[50vw] items-center">
      <div>
        <div className="text-blue-600 font-bold text-lg sm:text-2xl">Sorry 🥲 </div>
        <div className="text-blue-700 font-bold text-lg sm:text-2xl mt-4">No topics found</div>
      </div>
      <Lottie animationData={consultAnimation} play className="w-96 sm:w-[40vw] h-96" />
    </div>
  );
};

export default Consultation;
