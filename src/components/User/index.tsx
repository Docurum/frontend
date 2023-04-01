/* eslint-disable @next/next/no-img-element */
import dynamic from "next/dynamic";
import Image from "next/image";
import Lottie from "react-lottie-player";
import lungsAnimation from "../../animations/lungs.json";
import { MdDelete, MdEdit, MdEmail, MdLocationOn, MdVerified } from "react-icons/md";
import { FcGraduationCap } from "react-icons/fc";
import { AiFillMedicineBox } from "react-icons/ai";
import { ImProfile } from "react-icons/im";
import { BsFillTelephoneFill, BsGlobe } from "react-icons/bs";
import { toast } from "react-hot-toast";
import classNames from "classnames";
import styles from "./index.module.css";
import { QandASection, UserQandASection } from "../QandASection";
import BottomNavBar from "../BottomNavBar";
import { BADGE, Badge, GoldBadge, SilverBadge } from "../ProfileRightSection";
import { useQuery } from "@tanstack/react-query";
import { getUser } from "../../api";
import { CgProfile } from "react-icons/cg";
import Logo from "../Logo/Logo";
import { deleteClinic, GetClinicByUsernameQuery, GetClinicsQuery, IClinicType } from "../../api/clinic";
import { useRouter } from "next/router";
import { FC, useEffect } from "react";
import { GetUserByUsernameQuery } from "../../api/user";

const myLoader = (imageUrl: any) => {
  return imageUrl;
};

const Chart = dynamic(() => import("../Chart"), {
  ssr: false,
});

const User: FC<{
  username: string;
}> = ({ username }) => {
  const router = useRouter();

  const userQuery = GetUserByUsernameQuery(username);

  const clinics = GetClinicByUsernameQuery(username);

  useEffect(() => {
    userQuery.refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [username]);

  if (userQuery.isLoading) {
    return <div>Loading...</div>;
  }

  if (userQuery.isError) {
    return <div>Oops! Something went wrong. Try refreshing</div>;
  }

  return (
    <div className={classNames([styles["scrollbar"]], ["mt-2 flex flex-col w-full lg:w-2/4 lg:max-w-1/2 h-[90vh] overflow-y-scroll scrollbar"])}>
      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-row">
          <div className="flex flex-row h-40 max-sm:w-28 max-sm:h-28 rounded-2xl m-4 shrink-0 hover:cursor-pointer">
            {!userQuery.data.picture ? (
              <div className="flex flex-row max-sm:w-28 max-sm:h-28 rounded-2xl shrink-0 bg-slate-100 w-36 h-36 hover:cursor-pointer items-center justify-center">
                <CgProfile size={80} color="gray" />
              </div>
            ) : (
              <Image
                style={{
                  borderRadius: "20px",
                }}
                src={userQuery.data.picture}
                alt={""}
                height={30}
                width={160}
              />
            )}
          </div>
          <div className="flex flex-col mt-4">
            <div className="flex flex-row items-center">
              <div className="text-xl font-bold text-slate-700">Dr. {userQuery.data.name}</div>
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
      <div className="shadow-md w-[98.5%] shadow-blue-200 mx-2 mt-2 rounded-md">
        <div className="flex flex-col">
          <div className="flex flex-row p-4 items-center justify-between">
            <div className="text-blue-600 text-xl font-bold">Clinic</div>
          </div>
          {clinics.isLoading ? (
            <></>
          ) : (
            clinics.data?.map((clinic: IClinicType, index: number) => {
              return (
                <div
                  key={index}
                  // onClick={() =>
                  //   router.push({
                  //     pathname: "/clinic/[id]",
                  //     query: { id: clinic.id },
                  //   })
                  // }
                  className="flex flex-col shadow-lg w-[96.5%] shadow-blue-300 mx-4 mt-2 rounded-md p-4 mb-4"
                >
                  <div className="flex flex-row items-center justify-between">
                    <div className="flex flex-row items-center">
                      {clinic.logo === "" || clinic.logo === null ? (
                        <div className="flex flex-row items-center justify-center w-12 h-12 bg-slate-200 rounded-2xl">
                          <Logo color="#808080" className="h-6 w-6" />
                        </div>
                      ) : (
                        <div className="flex flex-row items-center justify-center max-w-16 h-12 bg-slate-200 rounded-2xl">
                          <Image alt="clinic-logo" src={clinic.logo!} width={48} height={48} className="max-w-16 h-12" />
                        </div>
                      )}

                      <div className="text-blue-600 text-xl ml-2 font-bold">{clinic.name}</div>
                    </div>
                  </div>
                  <div className="h-[2px] bg-slate-300 mt-4"></div>
                  <div className="flex flex-row mt-4 ml-2">
                    <MdLocationOn size={25} color="red" />
                    <div className="text-slate-500 text-md ml-6 font-bold">
                      {clinic.address}, {clinic.city}, {clinic.state}, {clinic.country}, {clinic.pincode}
                    </div>
                  </div>
                  <div className="flex flex-row mt-4 ml-3 items-center">
                    <BsFillTelephoneFill size={20} color="green" />
                    <div className="text-slate-500 text-md ml-6 font-bold">{clinic.phoneNumber}</div>
                  </div>
                  <div className="flex flex-row mt-4 ml-3 items-center">
                    <MdEmail size={22} color="gray" />
                    <div className="text-slate-500 text-md ml-6 font-bold">{clinic.email}</div>
                  </div>
                  <div className="flex ml-4 overflow-x-scroll scrollbar custom-scrollbar mt-4">
                    <div className="flex gap-x-1">
                      {clinic.displayImages.map((file, index) => {
                        return (
                          <div key={index} className="flex flex-col items-center justify-center">
                            <div className={classNames(["flex relative w-48 h-28 rounded-lg font-medium"])}>
                              <Image src={file} alt={file} width={220} height={100} className="absolute -z-10 w-48 h-28 rounded-lg" />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* <div className="hidden sm:block">
        <Chart display="Hello chart" />
      </div> */}
      <UserQandASection username={username} />
      {/* <div className="flex flex-row  items-center mb-10">
        <GoldBadge />
        <SilverBadge />
        <Badge name={BADGE.BRONZE} number={13} list={["Critic", "Nice Question"]} />
      </div> */}
      <BottomNavBar />
    </div>
  );
};

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

export default User;
