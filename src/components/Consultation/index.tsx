import classNames from "classnames";
import styles from "./index.module.css";
import BottomNavBar from "../BottomNavBar";
import Lottie from "react-lottie-player";
import consultAnimation from "../../animations/consult.json";
import Image from "next/image";
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

  if (consultationsPendingQuery.isError) {
    return <div>Something went wrong ...</div>;
  }

  return (
    <div className="flex flex-col w-76">
      {consultationsPendingQuery.data?.map((consult, index) => {
        const host = consult.host;
        return (
          <div key={index} className="flex flex-col shadow-md shadow-blue-200 mx-2 mt-2 rounded-md p-4 lg:p-6">
            <div className="flex flex-row items-center">
              <div className="border-2 border-gray-400 rounded-full shrink-0">
                {host.picture ? (
                  <Image src={host.picture} alt={"avatar"} height={40} width={40} className="rounded-full h-10 w-10 lg:w-14 lg:h-14" />
                ) : (
                  <Image src={`https://avatars.dicebear.com/api/personas/${host.username}.svg`} alt={"avatar"} height={30} width={30} className="" />
                )}
              </div>
              <div className="flex flex-col ml-2">
                <div className="flex flex-row items-center mb-2">
                  <div className="font-bold text-slate-600 hover:cursor-pointer text-sm lg:text-base">Title : </div>
                  <div className="font-bold text-blue-600 ml-2 hover:cursor-pointer text-sm lg:text-base">{consult.title}</div>
                </div>
                <div className="flex flex-row items-center mb-2">
                  <div className="font-bold text-slate-600 hover:cursor-pointer text-sm lg:text-base">Duration : </div>
                  <div className="font-bold text-blue-600 ml-2 hover:cursor-pointer text-sm lg:text-base">{consult.durationInMinutes} minutes</div>
                </div>
              </div>
              <div className="hover:cursor-pointer bg-blue-600 shadow-blue-300 shadow-md h-10 w-28 flex flex-row justify-center text-white text-sm font-bold items-center text-center rounded-md ml-8 lg:ml-14">
                Schedule Event
              </div>
            </div>
            <div className="flex flex-row items-center mt-3">
              <div className="font-bold text-slate-600 hover:cursor-pointer text-sm lg:text-base">Schedule a consultation with</div>
              <div className="font-bold text-blue-600 ml-2 hover:cursor-pointer lg:text-lg">{host.name}</div>
            </div>
          </div>
        );
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
