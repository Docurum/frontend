import Lottie from "react-lottie-player";
import goldTrophy from "../../animations/Gold_Trophy.json";
import silverTrophy from "../../animations/SilverTrophy.json";
import bronzeTrophy from "../../animations/Bronze_Trophy.json";
import { FC, useState } from "react";

const ProfileRightSection = () => {
  return (
    <div className="hidden  lg:flex flex-col  w-1/4 items-center mt-4 mb-10">
      <GoldBadge />
      <SilverBadge />
      <Badge name={BADGE.BRONZE} number={13} list={["Critic", "Nice Question"]} />
    </div>
  );
};

const GoldBadge = () => {
  return (
    <div className="flex flex-col sm:h-[9.5rem] mt-2 lg:w-[80%] xl:w-[70%] 2xl:w-[65%] ml-4 shadow-md shadow-[#FFDB40] rounded-lg items-start justify-items-start">
      <div className="flex flex-row">
        <div className="h-16 w-16 sm:h-20 sm:w-24">
          <Lottie animationData={goldTrophy} play loop={false} />
        </div>
        <div className="flex flex-col items-start mr-3 mt-2">
          <div className="text-sm sm:text-md text-slate-600 font-bold">Gold Badge</div>
          <div className="text-xl text-[#FFA834] font-bold">3</div>
        </div>
      </div>
      <div className="hidden sm:flex flex-col">
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
    </div>
  );
};

const SilverBadge = () => {
  return (
    <div className="flex flex-col  mt-2 sm:h-[9.5rem] lg:w-[80%] xl:w-[70%] 2xl:w-[65%] ml-4 shadow-md shadow-slate-300 rounded-lg items-start justify-items-start">
      <div className="flex flex-row">
        <div className="h-16 w-16 sm:h-20 sm:w-24">
          <Lottie animationData={silverTrophy} play loop={false} />
        </div>

        <div className="flex flex-col items-start mr-3 mt-2 sm:mt-4">
          <div className="text-sm sm:text-md text-slate-600 font-bold">Silver Badge</div>
          <div className="text-xl sm:text-2xl text-slate-400 font-bold">1</div>
        </div>
      </div>
      <div className="hidden sm:flex flex-col">
        <div className="flex flex-col items-start justify-end h-full mb-4">
          <div className="ml-6 flex flex-row bg-black rounded-md px-[3px] py-[1px] mt-2 items-center">
            <div className="bg-[#CD7F32] h-2 w-2 rounded-full mx-1"></div>
            <div className="text-sm text-white mr-1">Notable Question</div>
          </div>
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
    <div className="flex flex-col sm:h-[9.5rem] lg:w-[80%] xl:w-[70%] 2xl:w-[65%] mt-2 ml-4 shadow-md shadow-[#FFA64C] rounded-lg items-start justify-items-start">
      <div className="flex flex-row">
        <div className="h-16 w-16 sm:h-20 sm:w-24">
          <Lottie animationData={lottieJosn} play loop={false} />
        </div>
        <div className="flex flex-col items-start mr-3 mt-2 sm:mt-4">
          <div className="text-sm sm:text-md text-slate-600 font-bold">Bronze Badge</div>
          <div className="text-xl sm:text-2xl text-[#CD7F32] font-bold">13</div>
        </div>
      </div>
      <div className="hidden sm:flex flex-col">
        <div className="ml-6 flex flex-row w-max bg-black rounded-md px-[3px] py-[1px] mt-2 items-center">
          <div className="bg-[#CD7F32] h-2 w-2 rounded-full mx-1"></div>
          <div className="text-sm text-white mr-1">Critic</div>
        </div>
        <div className="ml-6 flex flex-row w-max bg-black rounded-md px-[3px] py-[1px] mt-1 items-center">
          <div className="bg-[#CD7F32] h-2 w-2 rounded-full mx-1"></div>
          <div className="text-sm text-white mr-1">Nice Question</div>
        </div>
      </div>
      {/* <div className="ml-6 flex flex-row bg-black rounded-md px-[3px] py-[1px] mt-1 items-center">
        <div className="bg-[#CD7F32] h-2 w-2 rounded-full mx-1"></div>
        <div className="text-sm text-white mr-1">Supporter</div>
      </div> */}
    </div>
  );
};

export { ProfileRightSection, GoldBadge, SilverBadge, Badge, BADGE };
