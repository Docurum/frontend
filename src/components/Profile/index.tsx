/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import dynamic from "next/dynamic";
import Image from "next/image";
import Lottie from "react-lottie-player";
import lungsAnimation from "../../animations/lungs.json";
import { MdDelete, MdEdit, MdEmail, MdEventAvailable, MdLocationOn, MdVerified } from "react-icons/md";
import { FcGraduationCap } from "react-icons/fc";
import { AiFillMedicineBox, AiOutlinePlus } from "react-icons/ai";
import { ImProfile } from "react-icons/im";
import { BsFillTelephoneFill, BsGlobe } from "react-icons/bs";
import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import { useDropzone } from "react-dropzone";
import classNames from "classnames";
import styles from "./index.module.css";
import { QandASection } from "../QandASection";
import BottomNavBar from "../BottomNavBar";
import { BADGE, Badge, GoldBadge, SilverBadge } from "../ProfileRightSection";
import { CgProfile } from "react-icons/cg";
import { createId } from "@paralleldrive/cuid2";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import Logo from "../Logo/Logo";
import { CiEdit } from "react-icons/ci";
import axios from "axios";
import clinicSchema from "../../schemas/clinicSchema";
import { deleteClinic, GetClinicsQuery, IClinicType, isAppliedDoctor } from "../../api/clinic";
import { useRouter } from "next/router";
import { GetUserQuery, updateProfilePicture } from "../../api/user";
import EditClinic from "../EditClinic";
import { promise } from "zod";
import MobileEditClinic from "../MobileEditClinic";
import { FiCopy } from "react-icons/fi";
import ProfileLoader from "../PulseLoaders";
import { ProfilePricing } from "../CreatePricing";

const myLoader = (imageUrl: any) => {
  return imageUrl;
};

const Chart = dynamic(() => import("../Chart"), {
  ssr: false,
});

export default function Profile() {
  const [checkstatuss, setCheckstatus] = useState("");
  let isApplied: any = promise;
  const [files, setFiles] = useState<any[]>([]);
  const profileImage = useRef("");

  const [isPageLinkCopied, setIsLinkCopied] = useState(false);
  const checkstatus = async () => {
    isApplied = await isAppliedDoctor();
    console.log(isApplied?.data?.message?.message);
    setCheckstatus(isApplied?.data?.message?.message);
    console.log(isApplied);
  };
  const uploadFile = async () => {
    const client = new S3Client({
      region: "ap-south-1",
      credentials: {
        accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY!,
        secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY!,
      },
    });
    if (files.length > 0) {
      let keyName = createId() + "." + files[0].name.split(".")[1];
      const command = new PutObjectCommand({
        Bucket: "docurum-forum-assets",
        Key: keyName,
        Body: files[0],
        ACL: "public-read",
      });
      let payload = {
        picture: `https://docurum-forum-assets.s3.ap-south-1.amazonaws.com/${keyName}`,
      };

      try {
        await client.send(command);
        await updateProfilePicture(payload);
        profileImage.current = payload.picture;
        setFiles([]);
      } catch (error) {
        console.log("Error: ", error);
      }
    }
  };
  const router = useRouter();
  useEffect(() => {
    checkstatus();
  }, []);
  useEffect(() => {
    uploadFile();
  }, [files]);
  const userQuery = GetUserQuery();

  const clinics = GetClinicsQuery();

  const onDrop: any = useCallback((acceptedFiles: string[], fileRejections: any[]) => {
    if (acceptedFiles.length > 0) {
      setFiles((files) => {
        const newFiles = [...files.concat(acceptedFiles)];
        const paths = newFiles.map((o) => o.path);
        const uniqueFiles = newFiles.filter(({ path }, index) => !paths.includes(path, index + 1));
        return uniqueFiles;
      });
    }
    fileRejections.forEach((selectedFile) => {
      selectedFile.errors.forEach((err: any) => {
        if (err.code === "file-too-large") {
          toast.error("File is larger than 10 MB", { id: "Large-File" });
        }
        if (err.code === "file-invalid-type") {
          toast.error("Invalid file type", { id: "Invalid-File" });
        }
      });
    });
  }, []);

  const { getRootProps, getInputProps, isDragAccept, isDragReject } = useDropzone({
    onDrop,
    multiple: false,
    maxSize: 10485760,
    validator: (file) => {
      const fileFormat = file.name.split(".")[1];
      if (fileFormat === "jpg" || fileFormat === "png" || fileFormat === "jpeg") {
        return null;
      }

      return {
        code: "file-invalid-type",
        message: "Only jpg/png files supported!",
      };
    },
  });

  if (userQuery.isLoading) {
    return <ProfileLoader />;
  }

  if (userQuery.isError) {
    router.push("/login");
    return <div>Oops! Something went wrong. Try refreshing</div>;
  }

  async function checkApplied() {
    isApplied = await isAppliedDoctor();
    if (isApplied.data.message.applied) {
      toast.error("you have alreaady Applied please wait for the approval");
    } else if (!isApplied.data.message.applied) {
      router.push("/verify-credentials");
    }
  }

  return (
    <div className={classNames([styles["scrollbar"]], ["mt-2 flex flex-col w-full lg:w-2/4 lg:max-w-1/2 h-[90vh] overflow-y-scroll scrollbar"])}>
      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-row">
          <div {...getRootProps()} className="flex flex-row h-40 max-sm:w-28 max-sm:h-28 rounded-2xl m-4 shrink-0 hover:cursor-pointer">
            <input {...getInputProps()} />

            {!userQuery.data.picture ? (
              <div className="flex flex-row max-sm:w-28 max-sm:h-28 rounded-2xl shrink-0 bg-slate-100 w-36 h-36 hover:cursor-pointer items-center justify-center">
                <CgProfile size={80} color="gray" />
              </div>
            ) : (
              <Image
                style={{
                  borderRadius: "20px",
                }}
                src={profileImage.current === "" ? userQuery.data.picture : profileImage.current}
                alt={""}
                height={30}
                width={160}
              />
            )}
          </div>
          <div className="flex flex-col mt-4">
            <div className="flex flex-row items-center">
              <div className="text-xl font-bold text-slate-700">{userQuery.data.isDoctor ? "Dr. " + userQuery.data.name : userQuery.data.name}</div>

              {userQuery.data.isDoctor ? (
                <div className="ml-1">
                  <MdVerified size={25} color={"green"} className="shrink-0" />
                </div>
              ) : (
                <></>
              )}
            </div>

            {userQuery.data.isDoctor ? (
              <div className="hidden sm:flex flex-col">
                {" "}
                <DoctorDetails />
              </div>
            ) : (
              <h1 className="hidden lg:flex">{userQuery.data.bio}</h1>
            )}
            <div className="hidden max-sm:flex flex-col ml-10 w-20 h-20">
              <Lottie animationData={lungsAnimation} play />
            </div>
            {!userQuery.data.isDoctor ? (
              <div
                onClick={() => {
                  checkApplied();
                }}
                className="hidden max-sm:flex flex-row justify-center items-center  h-12 bg-blue-600 w-full p-3 my-2 rounded-lg mb-4 hover:cursor-pointer hover:shadow-md hover:shadow-green-200 outline-none"
              >
                <MdVerified size={25} color={"white"} className="shrink-0" />
                <div className="text-white  font-bold text-center ">Doctor Verification</div>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>

        <div className="hidden sm:flex w-36 h-36 lg:h-44 md:w-44 mr-10">
          <Lottie animationData={lungsAnimation} play />
        </div>
      </div>
      <div className="hidden max-sm:flex flex-col ml-4">{userQuery.data.isDoctor ? <DoctorDetails /> : <h1 className="max-sm:flex">{userQuery.data.bio}</h1>}</div>
      {/* {isApplied?.data?.message.applied ? (
        <>pending</>
      ) : (
       
      )} */}

      {/* <CreateClinic /> */}
      {/* <div className="hidden max-sm:grid grid-cols-2 items-center mt-4 mb-2">
        <GoldBadge />
        <SilverBadge />
        <Badge name={BADGE.BRONZE} number={13} list={["Critic", "Nice Question"]} />
      </div> */}
      <div className="flex mt-2 flex-col shadow-md shadow-blue-200 w-min p-3 rounded-md ml-2">
        <div className="font-bold text-slate-600">Share your page:</div>

        <div className="flex flex-row items-center">
          <div className="text-blue-600 text-lg w-[79vw] lg:w-80  mr-4 font-bold">{`https://docurum.com/user/${userQuery.data.username}`}</div>
          <div
            className="hover:cursor-pointer"
            onClick={() => {
              navigator.clipboard.writeText(`https://docurum.com/user/${userQuery.data.username}`);
              setIsLinkCopied(true);
              toast.success("Link copied successfully");
            }}
          >
            <FiCopy size={22} color={isPageLinkCopied ? "green" : "gray"} />
          </div>
        </div>
      </div>
      <div
        className="flex mt-2 flex-col bg-blue-600 shadow-lg shadow-blue-300 w-min p-3 rounded-md ml-2 hover:cursor-pointer"
        onClick={() =>
          router.push({
            pathname: "/booking/[id]",
            query: { id: userQuery.data.id },
          })
        }
      >
        <div className="flex flex-row items-center">
          <div className="text-white text-lg w-[79vw] lg:w-80  mr-4 font-bold">Update Availability</div>
          <div>
            <MdEventAvailable size={25} color={"white"} />
          </div>
        </div>
      </div>
      <ProfilePricing />
      <div className="shadow-md w-[98.5%] shadow-blue-200 mx-2 mt-2 rounded-md">
        <div className="flex flex-col">
          <div className="flex flex-row p-4 items-center justify-between">
            <div className="text-blue-600 text-xl font-bold">Clinic</div>
            <div className="hidden max-sm:flex ">
              <div
                onClick={() => {
                  router.push("/create-clinic");
                }}
                className="flex flex-row bg-blue-600 px-3 py-2 rounded-lg shadow-md shadow-blue-400 hover:cursor-pointer"
              >
                <AiOutlinePlus size={25} color="white" />
                <div className="text-white text-md font-bold ml-1">Add Clinic</div>
              </div>
            </div>
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
                    <div className="flex flex-row">
                      <div className="hidden sm:flex flex-row items-center px-2 py-2 rounded-lg hover:cursor-pointer">
                        <EditClinic data={clinic} />
                      </div>
                      <div
                        className="hidden max-sm:flex flex-row items-center px-2 py-2 rounded-lg hover:cursor-pointer"
                        onClick={() => {
                          router.push(`/edit-clinic/${clinic.id}`);
                        }}
                      >
                        <MdEdit size={25} color="gray" />
                      </div>
                      <div
                        className="flex flex-row items-center px-2 py-2 rounded-lg hover:cursor-pointer"
                        onClick={async () => {
                          try {
                            const { data } = await deleteClinic(clinic.id);
                            toast.success(data.message, { id: data.message });
                            clinics.refetch();
                          } catch (err) {
                            toast.error("Unable to delete.", { id: clinic.id });
                          }
                        }}
                      >
                        <MdDelete size={25} color="red" />
                        {/* <div className="text-white text-md font-bold ml-2">Edit</div> */}
                      </div>
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
  const userQuery = GetUserQuery();

  console.log(userQuery, "data");

  return (
    <div className="">
      <div className="flex flex-row items-center mt-4">
        <AiFillMedicineBox size={25} color="gray" className="shrink-0" />
        <div className="text-sm font-bold text-slate-500 ml-2">{userQuery.data?.doctor?.speciality}</div>
      </div>
      <div className="flex flex-row items-center mt-1">
        <FcGraduationCap size={25} color="gray" className="shrink-0" />
        <div className="text-sm font-bold text-slate-500 ml-2">{userQuery.data?.doctor?.qualification}</div>
      </div>
      <div className="flex flex-row items-center mt-1">
        <ImProfile size={25} color="gray" className="shrink-0" />
        <div className="text-sm font-bold text-slate-500 ml-2">Registration No. : {userQuery.data?.doctor?.registrationNumber}</div>
      </div>
      <div className="flex flex-row items-center mt-1">
        <BsGlobe size={25} color="gray" className="shrink-0" />
        <div className="text-sm font-bold text-slate-500 ml-2">{userQuery.data?.doctor?.languages}</div>
      </div>
      <div className="flex flex-row items-center mt-1">
        <BsGlobe size={25} color="gray" className="shrink-0" />
        <div className="text-sm font-bold text-slate-500 ml-2">{userQuery.data?.bio}</div>
      </div>
    </div>
  );
};
