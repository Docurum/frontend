import dynamic from "next/dynamic";
import Image from "next/image";
import Lottie from "react-lottie-player";
import lungsAnimation from "../../animations/lungs.json";
import { MdVerified } from "react-icons/md";
import { FcGraduationCap } from "react-icons/fc";
import { AiFillMedicineBox } from "react-icons/ai";
import { ImProfile } from "react-icons/im";
import { BsGlobe } from "react-icons/bs";

const myLoader = () => {
  return `https://pbs.twimg.com/profile_images/1618074584833753089/7DnSmMz5_400x400.jpg`;
};

const Chart = dynamic(() => import("../Chart"), {
  ssr: false,
});

export default function Profile() {
  return (
    <div className="mt-2 flex flex-col w-full lg:w-2/4 lg:max-w-1/2 h-[90vh]">
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
    </div>
  );
}
