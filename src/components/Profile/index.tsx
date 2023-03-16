/* eslint-disable @next/next/no-img-element */
import dynamic from "next/dynamic";
import Image from "next/image";
import Lottie from "react-lottie-player";
import lungsAnimation from "../../animations/lungs.json";
import { MdVerified } from "react-icons/md";
import { FcGraduationCap } from "react-icons/fc";
import { AiFillMedicineBox } from "react-icons/ai";
import { ImProfile } from "react-icons/im";
import { BsGlobe } from "react-icons/bs";
import { FC, useState } from "react";
import classNames from "classnames";
import styles from "./index.module.css";
import { QandASection } from "../QandASection";
import BottomNavBar from "../BottomNavBar";
import { BADGE, Badge, GoldBadge, SilverBadge } from "../ProfileRightSection";
import { useQuery } from "@tanstack/react-query";
import { getUser } from "../../api";

const myLoader = (imageUrl: any) => {
  return imageUrl;
};

const Chart = dynamic(() => import("../Chart"), {
  ssr: false,
});

export default function Profile() {
  const { isLoading, data, isError } = useQuery({
    queryKey: ["profile"],
    queryFn: getUser,
    select: (data) => data as any,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Oops! Something went wrong. Try refreshing</div>;
  }

  console.log(data);
  return (
    <div className={classNames([styles["scrollbar"]], ["mt-2 flex flex-col w-full lg:w-2/4 lg:max-w-1/2 h-[90vh] overflow-y-scroll scrollbar"])}>
      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-row">
          <div className="max-sm:w-28 max-sm:h-28 rounded-2xl m-4 shrink-0 hover:cursor-pointer">
            <img
              style={{
                borderRadius: "20px",
              }}
              src={data.data.message.user.picture}
              alt={"avatar"}
              height={30}
              width={160}
            />
          </div>
          <div className="flex flex-col mt-4">
            <div className="flex flex-row items-center">
              <div className="text-xl font-bold text-slate-700">Dr. {data?.data?.message?.user?.name}</div>
              <div className="ml-1">
                <MdVerified size={25} color={"green"} className="shrink-0" />
              </div>
            </div>
            <div className="hidden sm:flex flex-col">
              <DoctorDetails />
            </div>
            <div className="hidden max-sm:flex flex-col ml-4 w-20 h-20">
              <Lottie animationData={lungsAnimation} play />
            </div>
          </div>
        </div>

        <div className="hidden sm:flex w-36 h-36 lg:h-44 md:w-44 mr-10">
          <Lottie animationData={lungsAnimation} play />
        </div>
      </div>
      <div className="hidden max-sm:flex flex-col ml-4">
        <DoctorDetails />
      </div>

      <div className="hidden max-sm:grid grid-cols-2 items-center mt-4 mb-2">
        <GoldBadge />
        <SilverBadge />
        <Badge name={BADGE.BRONZE} number={13} list={["Critic", "Nice Question"]} />
      </div>

      <div className="hidden sm:block">
        <Chart display="Hello chart" />
      </div>
      <QandASection />
      {/* <div className="flex flex-row  items-center mb-10">
        <GoldBadge />
        <SilverBadge />
        <Badge name={BADGE.BRONZE} number={13} list={["Critic", "Nice Question"]} />
      </div> */}
      <BottomNavBar />
    </div>
  );
}

const DoctorDetails = () => {
  return (
    <>
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
    </>
  );
};
