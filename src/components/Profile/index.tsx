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
import { FC, useCallback, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useDropzone } from "react-dropzone";
import classNames from "classnames";
import styles from "./index.module.css";
import { QandASection } from "../QandASection";
import BottomNavBar from "../BottomNavBar";
import { BADGE, Badge, GoldBadge, SilverBadge } from "../ProfileRightSection";
import { useQuery } from "@tanstack/react-query";
import { getUser, updateProfilePicture } from "../../api";
import { CgProfile } from "react-icons/cg";
import { createId } from "@paralleldrive/cuid2";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import Consult from "../Consult";
import CreateClinic from "../CreateClinic";

const myLoader = (imageUrl: any) => {
  return imageUrl;
};

const Chart = dynamic(() => import("../Chart"), {
  ssr: false,
});

export default function Profile() {
  const [files, setFiles] = useState<any[]>([]);
  const [uploadedFiles, setUploadedFiles] = useState<any[]>([]);
  const uploadFile = useCallback(async () => {
    const client = new S3Client({
      region: "ap-south-1",
      credentials: {
        accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY!,
        secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY!,
      },
    });
    let uploadObs: any[] = [];

    files.forEach(async (file) => {
      let keyName = createId() + "." + file.name.split(".")[1];
      if (!uploadedFiles.includes(files)) {
        const command = new PutObjectCommand({
          Bucket: "docurum-forum-assets",
          Key: keyName,
          Body: file,
          ACL: "public-read",
        });
        let payload = {
          picture: `https://docurum-forum-assets.s3.ap-south-1.amazonaws.com/${keyName}`,
        };

        try {
          await client.send(command);
          uploadObs.push(file);
          await updateProfilePicture(payload);

          const url = `https://docurum-forum-assets.s3.ap-south-1.amazonaws.com/${file.path}`;
          let data = uploadedFiles;
          let ob = {
            ...file,
            path: url,
          };
          data.push(ob);
          setUploadedFiles(data);
          // console.log("Asset s3 url:", url);
        } catch (error) {
          console.log("Error: ", error);
        }
      }
    });
    return uploadObs;
  }, [files, uploadedFiles]);

  useEffect(() => {
    uploadFile();
  }, [files]);
  const { isLoading, data, isError } = useQuery({
    queryKey: ["profile"],
    queryFn: getUser,
    select: (data) => data as any,
  });

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
          <div {...getRootProps()} className="flex flex-row h-40 max-sm:w-28 max-sm:h-28 rounded-2xl m-4 shrink-0 hover:cursor-pointer">
            <input {...getInputProps()} />

            {!data.data.message.user.picture ? (
              <div className="flex flex-row max-sm:w-28 max-sm:h-28 rounded-2xl shrink-0 bg-slate-100 w-36 h-36 hover:cursor-pointer items-center justify-center">
                <CgProfile size={80} color="gray" />
              </div>
            ) : (
              <img
                style={{
                  borderRadius: "20px",
                }}
                src={data.data.message.user.picture}
                alt={""}
                height={30}
                width={160}
              />
            )}
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
      {/* <CreateClinic /> */}
      <div className="hidden max-sm:grid grid-cols-2 items-center mt-4 mb-2">
        <GoldBadge />
        <SilverBadge />
        <Badge name={BADGE.BRONZE} number={13} list={["Critic", "Nice Question"]} />
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
