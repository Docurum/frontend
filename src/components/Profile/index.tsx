import dynamic from "next/dynamic";
import Image from "next/image";
import Lottie from "react-lottie-player";
import lungsAnimation from "../../animations/lungs.json";
import goldTrophy from "../../animations/Gold_Trophy.json";
import silverTrophy from "../../animations/Silver_Trophy.json";
import bronzeTrophy from "../../animations/Bronze_Trophy.json";
import { MdVerified } from "react-icons/md";
import { FcGraduationCap } from "react-icons/fc";
import { AiFillMedicineBox } from "react-icons/ai";
import { ImProfile } from "react-icons/im";
import { BsGlobe } from "react-icons/bs";
import { FC, useState } from "react";
import classNames from "classnames";
import styles from "./index.module.css";
const myLoader = () => {
  return `https://pbs.twimg.com/profile_images/1618074584833753089/7DnSmMz5_400x400.jpg`;
};

const Chart = dynamic(() => import("../Chart"), {
  ssr: false,
});

export default function Profile() {
  return (
    <div className={classNames([styles["scrollbar"]], ["mt-2 flex flex-col w-full lg:w-2/4 lg:max-w-1/2 h-[90vh] overflow-y-scroll scrollbar"])}>
      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-row">
          <div className="w-38 h-38 rounded-2xl m-4 shrink-0 hover:cursor-pointer">
            <Image
              style={{
                borderRadius: "20px",
              }}
              loader={myLoader}
              src={"https://avatars.dicebear.com/api/personas/her.svg"}
              alt={"avatar"}
              height={30}
              width={160}
            />
          </div>
          <div className="flex flex-col mt-4">
            <div className="flex flex-row items-center">
              <div className="text-xl font-bold text-slate-700">Dr. Arnab Bhattacharya</div>
              <div className="ml-1">
                <MdVerified size={25} color={"green"} className="shrink-0" />
              </div>
            </div>
            <div className="flex flex-row items-center mt-4">
              <AiFillMedicineBox size={25} color="gray" className="shrink-0" />
              <div className="text-sm font-bold text-slate-500 ml-2">Pulmonology | Respiratory Medicine</div>
            </div>
            <div className="flex flex-row items-center mt-1">
              <FcGraduationCap size={25} color="gray" className="shrink-0" />
              <div className="text-sm font-bold text-slate-500 ml-2">MBBS, MD (Resp. Med.), PhD, FCCP, DAA</div>
            </div>
            <div className="flex flex-row items-center mt-1">
              <ImProfile size={25} color="gray" className="shrink-0" />
              <div className="text-sm font-bold text-slate-500 ml-2">Registration No. : 71547</div>
            </div>
            <div className="flex flex-row items-center mt-1">
              <BsGlobe size={25} color="gray" className="shrink-0" />
              <div className="text-sm font-bold text-slate-500 ml-2">English, Hindi, Bengali</div>
            </div>
          </div>
        </div>

        <div className="h-44 w-44 mr-10">
          <Lottie animationData={lungsAnimation} play />
        </div>
      </div>

      <Chart display="Hello chart" />
      <div className="flex flex-row  items-center mb-10">
        <GoldBadge />
        <SilverBadge />
        <Badge name={BADGE.BRONZE} number={13} list={["Critic", "Nice Question"]} />
      </div>
    </div>
  );
}

const GoldBadge = () => {
  return (
    <div className="flex flex-col h-[9.5rem] w-56 ml-4 shadow-md shadow-[#FFDB40] rounded-lg items-start justify-items-start">
      <div className="flex flex-row">
        <div className="h-20 w-24">
          <Lottie animationData={goldTrophy} play loop={false} />
        </div>
        <div className="flex flex-col items-start mr-6 mt-4">
          <div className="text-md text-slate-600 font-bold">Gold Badge</div>
          <div className="text-2xl text-[#FFA834] font-bold">3</div>
        </div>
      </div>
      <div className="flex flex-col items-start justify-end h-full mb-4">
        <div className="ml-6 flex flex-row bg-black rounded-md px-[3px] py-[1px] mt-2 items-center">
          <div className="bg-[#CD7F32] h-2 w-2 rounded-full mx-1"></div>
          <div className="text-sm text-white mr-1">Famous Question</div>
        </div>
        <div className="ml-6 flex flex-row bg-black rounded-md px-[3px] py-[1px] mt-2 items-center">
          <div className="bg-[#CD7F32] h-2 w-2 rounded-full mx-1"></div>
          <div className="text-sm text-white mr-1">Commentator</div>
        </div>
      </div>
    </div>
  );
};

const SilverBadge = () => {
  return (
    <div className="flex flex-col h-[9.5rem] w-56 ml-4 shadow-md shadow-slate-300 rounded-lg items-start justify-items-start">
      <div className="flex flex-row">
        <div className="h-20 w-24">
          <Lottie animationData={silverTrophy} play loop={false} />
        </div>
        <div className="flex flex-col items-start mr-6 mt-4">
          <div className="text-md text-slate-600 font-bold">Silver Badge</div>
          <div className="text-2xl text-slate-400 font-bold">1</div>
        </div>
      </div>
      <div className="flex flex-col items-start justify-end h-full mb-4">
        <div className="ml-6 flex flex-row bg-black rounded-md px-[3px] py-[1px] mt-2 items-center">
          <div className="bg-[#CD7F32] h-2 w-2 rounded-full mx-1"></div>
          <div className="text-sm text-white mr-1">Notable Question</div>
        </div>
      </div>
    </div>
  );
};

interface IBadgeProps {
  name: BADGE;
  number: Number;
  list: string[];
}

enum BADGE {
  BRONZE,
  SILVER,
  GOLD,
}

const Badge: FC<IBadgeProps> = ({ name, number, list }) => {
  let [shadowColor, setShadowColor] = useState("#FFA64C");
  let [lottieJosn, setLottieJson] = useState(bronzeTrophy);
  if (name === BADGE.BRONZE) {
  }
  return (
    <div className="flex flex-col h-[9.5rem] w-56 ml-4 shadow-md shadow-[#FFA64C] rounded-lg items-start justify-items-start">
      <div className="flex flex-row">
        <div className="h-20 w-24">
          <Lottie animationData={lottieJosn} play loop={false} />
        </div>
        <div className="flex flex-col items-start mr-6 mt-4">
          <div className="text-sm text-slate-600 font-bold">Bronze Badge</div>
          <div className="text-2xl text-[#CD7F32] font-bold">13</div>
        </div>
      </div>
      <div className="ml-6 flex flex-row bg-black rounded-md px-[3px] py-[1px] mt-2 items-center">
        <div className="bg-[#CD7F32] h-2 w-2 rounded-full mx-1"></div>
        <div className="text-sm text-white mr-1">Critic</div>
      </div>
      <div className="ml-6 flex flex-row bg-black rounded-md px-[3px] py-[1px] mt-1 items-center">
        <div className="bg-[#CD7F32] h-2 w-2 rounded-full mx-1"></div>
        <div className="text-sm text-white mr-1">Nice Question</div>
      </div>
      {/* <div className="ml-6 flex flex-row bg-black rounded-md px-[3px] py-[1px] mt-1 items-center">
        <div className="bg-[#CD7F32] h-2 w-2 rounded-full mx-1"></div>
        <div className="text-sm text-white mr-1">Supporter</div>
      </div> */}
    </div>
  );
};
