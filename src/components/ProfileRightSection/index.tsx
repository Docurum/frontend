import Lottie from "react-lottie-player";
import goldTrophy from "../../animations/Gold_Trophy.json";
import silverTrophy from "../../animations/SilverTrophy.json";
import bronzeTrophy from "../../animations/Bronze_Trophy.json";
import { FC, useState } from "react";
import CreateClinic from "../CreateClinic";

import clinicAnimation from "../../animations/113974-verified.json";
import pricingAnimation from "../../animations/pricing.json";
import { useRouter } from "next/router";

import { toast } from "react-hot-toast";
import { isAppliedDoctor } from "../../api/clinic";

import { promise } from "zod";
import { MdVerified } from "react-icons/md";
import { GetUserQuery } from "../../api/user";
import { AiFillDollarCircle } from "react-icons/ai";
import { RiMoneyDollarCircleFill } from "react-icons/ri";
const ProfileRightSection = () => {
  const router = useRouter();
  let isApplied: any = promise;
  const userquery = GetUserQuery();

  async function checkApplied() {
    isApplied = await isAppliedDoctor();
    if (isApplied.data.message.message === "Pending Approval") {
      toast.error("you have alreaady Applied please wait for the approval");
    } else if (!isApplied.data.message.applied) {
      router.push("/verify-credentials");
    }
  }

  return (
    <div className="hidden  lg:flex flex-col  w-1/4 items-center mt-4 mb-10">
      <div>
        <CreateClinic />
        <div>
          {!userquery.data?.isDoctor ? (
            <div className="flex flex-row mt-4">
              <div className="h-40 relative w-52 xl:w-72 mb-4 rounded-md hidden flex-col items-center justify-end md:flex">
                <div className="z-1 absolute w-10/12 h-32 bg-blue-100 rounded-lg"></div>
                <div className="absolute z-2 w-10/12 justify-end items-end flex flex-col">
                  <Lottie animationData={clinicAnimation} play className="h-48" />
                </div>

                <div
                  onClick={() => {
                    checkApplied();
                  }}
                  className="flex flex-row justify-center items-center z-3 absolute h-12 bg-blue-600 w-28 lg:w-40 rounded-lg mb-4 hover:cursor-pointer hover:shadow-md hover:shadow-green-200 outline-none"
                >
                  <MdVerified size={20} color={"white"} className="shrink-0" />
                  <div className="text-white hidden text-[10px] lg:text-[15px] ml-1 font-bold text-center lg:flex">Doctor Verification</div>
                </div>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
        <div>
          <div className="flex flex-row mt-8">
            <div className="h-40 relative w-52 xl:w-72 mb-4 rounded-md hidden flex-col items-center justify-end md:flex">
              <div className="z-1 absolute w-10/12 h-32 bg-blue-100 rounded-lg"></div>
              <div className="absolute z-2 w-10/12 justify-center items-center mb-8 flex flex-col">
                <Lottie animationData={pricingAnimation} play className="h-40" />
              </div>

              <div
                onClick={() => {
                  router.push("/create-pricing");
                }}
                className="flex flex-row justify-center items-center z-3 absolute h-12 bg-blue-600 w-28 lg:w-48 rounded-lg mb-4 hover:cursor-pointer hover:shadow-md hover:shadow-green-200 outline-none"
              >
                <RiMoneyDollarCircleFill size={20} color={"white"} className="shrink-0" />
                <div className="text-white hidden text-sm lg:text-[15px] ml-1 font-bold text-center lg:flex">Add Pricing</div>
              </div>
            </div>
          </div>
        </div>
      </div>
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
    </div>
  );
};

export { ProfileRightSection, GoldBadge, SilverBadge, Badge, BADGE };
