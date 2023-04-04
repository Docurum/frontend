import { TextField } from "@mui/material";
import classNames from "classnames";
import React, {
  Dispatch,
  FC,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { Dropzone } from "../Dropzone";
import { MdDeleteForever } from "react-icons/md";
import { useDropzone } from "react-dropzone";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import cuid2, { createId } from "@paralleldrive/cuid2";
import Logo from "../Logo/Logo";
import { FiUpload } from "react-icons/fi";
import { z } from "zod";
import Lottie from "react-lottie-player";
import goldTrophy from "../../animations/113974-verified.json";
enum FileTupes {
  PHOTO_ID = "photoId",
  DEGREE = "degree",
  REGISTRATION = "registration",
}
const verifyDoctorSchema = z
  .object({
    medicalCouncil: z.string(),
    registrationNumber: z.string(),
    registrationYear: z.string(),
    hospital: z.string(),
    photoId: z.string(),
    registrationCertificate: z.string(),
    degreeCertificate: z.string(),
    biography: z.string(),
    qualification: z.string(),
    title: z.string(),
    speciality: z.string(),
    experience: z.string(),
    languages: z.string(),
    contact: z.string(),
  })
  .strict();
export type verifyDoctorSchemaType = z.infer<typeof verifyDoctorSchema>;
const VerfiicationPanel = () => {
  
const [uploadType, setUploadType] = useState<string>("");
  const [currentFile, setCurrentFile] = useState<any>(null);
 
const[uuid,setUuid]=useState<string>(createId());
  const degree: React.MutableRefObject<string> = useRef("");
  const photoId: React.MutableRefObject<string> = useRef("");
  const registration: React.MutableRefObject<string> = useRef("");

  const onDrop: any = useCallback(
    (acceptedFiles: string[], fileRejections: any[],filetype:string) => {
      if (acceptedFiles.length > 0) {
      setCurrentFile(acceptedFiles[0]);

     if(filetype==="degree"){
      setUploadType("degree");
     }
      if(filetype==="photoId"){
      setUploadType("photoId");
      }
      if(filetype==="registration"){
      setUploadType("registration");
      }
      
      }
      fileRejections.forEach((selectedFile) => {
        selectedFile.errors.forEach((err: any) => {
          if (err.code === "file-too-large") {
            toast.error("File is larger than 10 MB", { id: "Large-File" });
          }
          if (err.code === "file-invalid-type") {
            toast.error("Only jpg/png files supported!", {
              id: "Invalid-File",
            });
          }
        });
      });
    },
    []
  );


const registrationDropZone =
    useDropzone({
      onDrop: (acceptedFiles, fileRejections) => onDrop(acceptedFiles, fileRejections,FileTupes.REGISTRATION),
      multiple: false,
      maxSize: 10485760,
      validator: (file) => {
        const fileFormat = file.name.split(".")[1];
        console.log(fileFormat);

        if (
          fileFormat === "pdf" ||
          fileFormat === "jpg" ||
          fileFormat === "png" ||
          fileFormat === "jpeg"
        ) {
          return null;
        }

        return {
          code: "file-invalid-type",
          message: "Only jpg/png files supported!",
        };
      },
    });

  const {
    reset,
    register,
    handleSubmit,
    setError,
    clearErrors,
    setValue,
    formState: { errors, isSubmitting, isValidating },
  } = useForm<verifyDoctorSchemaType>({
    mode: "onChange",
    // resolver: zodResolver(any),
    defaultValues: {
      medicalCouncil: "",
      registrationNumber: "",
      registrationYear: "",
      hospital: "",
      photoId: "",
      registrationCertificate: "",
      degreeCertificate: "",
      biography: "",
      qualification: "",
      title: "",
      speciality: "",
      experience: "",
      languages: "",
      contact: "",
    },
  });

  const uploadFile = async () => {
    const client = new S3Client({
      region: "ap-south-1",
      credentials: {
        accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY!,
        secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY!,
      },
    });

    if (currentFile !== null) {
      let keyName = createId() + "." + currentFile.name.split(".")[1];

      const command = new PutObjectCommand({
        Bucket: "docurum-forum-assets",
        Key: keyName,
        Body: currentFile,
        ACL: "public-read",
      });
      let payload = {
        picture: `https://docurum-forum-assets.s3.ap-south-1.amazonaws.com/${keyName}`,
      };

      try {
        await client.send(command);
        if(uploadType === "registration"){
          registration.current = payload.picture;
        }
        if(uploadType === "degree"){
          degree.current = payload.picture;
        }
        if(uploadType === "photoId"){
          photoId.current = payload.picture;
        }
      

        setCurrentFile(null);
      } catch (error) {
        console.log("Error: ", error);
      }
    }
  };
useEffect(() => {
  uploadFile();
}, [uploadType,currentFile]);
  return (
    <div className="w-full flex   ">
      <div className="w-[25%] hidden md:block bg-blue-300 h-[100vh]">
        <div>
          <Lottie animationData={goldTrophy} play loop={true} />
        </div>
        <div>
          <div className="flex  px-10 my-10 flex-row items-center ml-2 sm:ml-8 hover:cursor-pointer">
            <Logo className="h-10 w-10 sm:h-10 sm:w-10" />
            <div className="text-xl sm:text-3xl font-bold text-black">doc</div>
            <div className="text-xl sm:text-3xl font-bold text-blue-600">
              urum
            </div>
          </div>
        </div>
      </div>
      <div
        className={classNames([
          "flex  scale-90 flex-col   mt-6   lg:w-full h-[96vh] w-full  bg-white",
        ])}
      >
        <h2 className="text-2xl font-bold">Submit for Verification</h2>
        <div className="mt-8 max-w-md">
          <div className="grid grid-cols-1 gap-6">
            <label className="block">
              <TextField
                {...register("medicalCouncil", { required: true })}
                type="text"
                className="w-[calc(100%-16px)]"
                id="Medical Council"
                label="Medical Council: *"
                variant="outlined"
                placeholder=""
              />
            </label>
            <label className="block">
              <TextField
                {...register("hospital", { required: true })}
                type="text"
                className="w-[calc(100%-16px)]"
                id="Hospital"
                label="Hospital *"
                variant="outlined"
                placeholder=""
              />
            </label>
            <label className="block">
              <TextField
                {...register("qualification", { required: true })}
                type="text"
                className="w-[calc(100%-16px)]"
                id="qualification"
                label="qualification *"
                variant="outlined"
                placeholder=""
              />
            </label>
            <label className="block">
              <TextField
                type="text"
                {...register("title", { required: true })}
                className="w-[calc(100%-16px)]"
                id="Title"
                label="Title *"
                variant="outlined"
                placeholder=""
              />
            </label>
            <label className="block">
              <TextField
                {...register("speciality", { required: true })}
                type="text"
                className="w-[calc(100%-16px)]"
                id="speciality"
                label="speciality *"
                variant="outlined"
                placeholder=""
              />
            </label>

            <label className="block">
              <TextField
                {...register("languages", { required: true })}
                type="text"
                className="w-[calc(100%-16px)]"
                id="languages"
                label="languages *"
                variant="outlined"
                placeholder=""
              />
            </label>
            <label className="block">
              <TextField
                {...register("contact", { required: true })}
                type="text"
                className="w-[calc(100%-16px)]"
                id="Contact"
                label="Contact *"
                variant="outlined"
                placeholder=""
              />
            </label>

            <label className="block">
              <TextField
                {...register("experience", { required: true })}
                type="nubmer"
                className="w-[calc(100%-16px)]"
                id="Experience"
                label="Experience *"
                variant="outlined"
                placeholder=""
              />
            </label>
            <label className="block">
              <TextField
                {...register("registrationYear", { required: true })}
                type="text"
                className="w-[calc(100%-16px)]"
                id="registration Year"
                label="registration Year *"
                variant="outlined"
                placeholder=""
              />
            </label>

            <label className="block">
              <span className="text-gray-700">biography</span>
              <textarea
                {...register("biography", { required: true })}
                className="
                    mt-0
                    block
                    w-full
                    px-0.5
                    border-0 border-b-2 border-gray-200
                    focus:ring-0 focus:border-black
                  "
                rows={2}
              ></textarea>
            </label>
            <div className="flex px-20">
              <div
                {...registrationDropZone.getRootProps()}
                className="flex flex-col mx-1 items-center mt-4"
              >
                <input {...registrationDropZone.getInputProps()} />
                {registration.current === "" ? (
                  <div className="flex flex-row items-center justify-center w-28 h-28 bg-slate-200 rounded-2xl">
                    <Logo color="#808080" className="h-12 w-12" />
                  </div>
                ) : (
                  <img
                    alt="logo-img"
                    src={registration.current}
                    height="112px"
                    width="112px"
                    className="rounded-2xl"
                  />
                )}
                <div  className="flex flex-row mt-2 items-center ">
                  <FiUpload  className="" size={20} />
                  <div className="text-sm font-bold ml-1">Upload logo</div>
                </div>
              </div>
              {/* <div
                {...getRootProps()}
                className="flex mx-10 flex-col items-center mt-4"
              >
                <input {...getInputProps()} />
                {degree.current === "" ? (
                  <div className="flex flex-row items-center justify-center w-28 h-28 bg-slate-200 rounded-2xl">
                    <Logo color="#808080" className="h-12 w-12" />
                  </div>
                ) : (
                  <img
                    alt="logo-img"
                    src={degree.current}
                    height="112px"
                    width="112px"
                    className="rounded-2xl"
                  />
                )}
                <div className="flex flex-row mt-2 items-center ">
                  <FiUpload className="" size={20} />
                  <div className="text-sm font-bold ml-1">
                    Upload Registercard
                  </div>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>
      <></>
    </div>
  );
};

export default VerfiicationPanel;
