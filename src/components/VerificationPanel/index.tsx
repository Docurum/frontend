import { TextField } from "@mui/material";
import classNames from "classnames";
import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import { useDropzone } from "react-dropzone";
import toast from "react-hot-toast";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import Logo from "../Logo/Logo";
import { FiUpload } from "react-icons/fi";
import { z } from "zod";

import { verificationRequest } from "../../api/clinic";
import { createId } from "@paralleldrive/cuid2";
import { useRouter } from "next/router";
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
  const router = useRouter();
const [uploadType, setUploadType] = useState<string>("");
  const [currentFile, setCurrentFile] = useState<any>(null);
 
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

  const onSubmit: SubmitHandler<z.infer<any>> = async (formdata: any) => {
   
    formdata.degreeCertificate = degree.current;
     
 formdata.speciality=formdata.speciality.split(",");
   
    formdata.registrationCertificate = registration.current;
    formdata.photoId = photoId.current;
    formdata.languages=formdata.languages.split(",");
    formdata.experience = parseInt(formdata.experience);


    try {
      reset();
      const { data } = await verificationRequest (formdata);
      toast.success(data.message)
      router.push("/profile");
    } catch (err: any) {
      console.log(err);
    }
  };
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
    const degreeDropZone =
    useDropzone({
      onDrop: (acceptedFiles, fileRejections) => onDrop(acceptedFiles, fileRejections,FileTupes.DEGREE),
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
const photoIdDropZone =
    useDropzone({
      onDrop: (acceptedFiles, fileRejections) => onDrop(acceptedFiles, fileRejections,FileTupes.PHOTO_ID),
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
  } = useForm<any>({
    mode: "onChange",
    resolver: zodResolver(verifyDoctorSchema),
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
      experience: 0,
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
    
 
      <div
        className={classNames([
          "flex flex-col w-[75vw]   mt-6 ",
        ])}
      >
        <h2 className="text-2xl font-bold">Submit for Verification</h2>
        <div className="mt-2 w-5/6">
          <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex ">
              <div className="w-full gap-8 flex flex-col  ">

              <label className="block">
              <TextField
                {...register("medicalCouncil")}
                type="text"
                className="w-96"
                id="Medical Council"
                label="Medical Council: *"
                variant="outlined"
                placeholder=""
              />
            </label>
            <label className="block">
              <TextField
                {...register("hospital")}
                type="text"
               className="w-96"
                id="Hospital"
                label="Hospital *"
                variant="outlined"
                placeholder=""
              />
            </label>
            <label className="block">
              <TextField
                {...register("qualification")}
                type="text"
               className="w-96"
                id="qualification"
                label="qualification *"
                variant="outlined"
                placeholder=""
              />
            </label>
            <label className="block">
              <TextField
                type="text"
                {...register("title")}
                
            className="w-96"
                id="Title"
                label="Title *"

                variant="outlined"
                placeholder=""
              />
            </label>
            <label className="block">
              <TextField
                {...register("speciality")}
                type="text"
              className="w-96"
                error={Boolean(errors.speciality)}
                            helperText={errors.speciality ? (errors.speciality.message as string) : ""}
                id="speciality"
                label="speciality *"
                variant="outlined"
                placeholder=""
              />
            </label>
  <button
                type="submit"
                onClick={() => {
                  handleSubmit(onSubmit);
                }}
                className="bg-blue-500 hover:bg-blue-700 w-96 text-white font-bold py-2 px-4 rounded"
              >
                Save
              </button>
            </div>
          <div className="w-full gap-8 flex flex-col ">
              <label className="block">
              <TextField
                {...register("languages")}
                type="text"
                 className="w-96"
                id="languages"
                label="languages *"
                variant="outlined"
                placeholder=""
              />
            </label>
            <label className="block">
              <TextField
                {...register("contact")}
                type="text"
              className="w-96"
                id="Contact"
                label="Contact *"
                variant="outlined"
                placeholder=""
              />
            </label>

            <label className="block">
              <TextField
                {...register("experience")}
                type="nubmer"
              className="w-96"
                id="Experience"
                label="Experience *"
                variant="outlined"
                placeholder=""
              />
            </label>
            <label className="block">
              <TextField
                {...register("registrationYear")}
                type="text"
                className="w-96"
                id="registration Year"
                label="registration Year *"
                variant="outlined"
                placeholder=""
              />
            </label>
      <label className="block">
              <TextField
                {...register("registrationNumber")}
                type="text"
                className="w-96"
                id="registrationNumber"
                label="registrationNumber *"
                variant="outlined"
                placeholder=""
              />
            </label>

            <label className="block">
              
              <TextField
                {...register("biography")}
                type="text"
                className="w-96"
                id="registration Year"
                label="bio *"
                variant="outlined"
              
                placeholder="bio"
              ></TextField>
            </label>
          </div>
        
          <div className=" flex  items-center justify-center flex-col ">
              <div
                {...registrationDropZone.getRootProps()}
                className=""
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
                    className="rounded-2xl w-28 h-28"
                  />
                )}
                <div  className="flex flex-row mt-2 items-center ">
                  <FiUpload  className="" size={20} />
                  <div className="text-sm font-bold ml-1">Upload degree</div>
                </div>
              </div>
              <div
                {...degreeDropZone.getRootProps()}
                className="w-36"
              >
                <input {...degreeDropZone.getInputProps()} />
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
                    className="rounded-2xl  w-28 h-28"
                  />
                )}
                <div  className="flex w-36 flex-row mt-2 items-center ">
                  <FiUpload  className="" size={20} />
                  <div className="text-sm font-bold ml-1">Upload photoID</div>
                </div>
              </div>
              <div
                {...photoIdDropZone.getRootProps()}
                className="flex flex-col items-center mt-4"
              >
                <input {...photoIdDropZone.getInputProps()} />
                {photoId.current === "" ? (
                  <div className="flex flex-row items-center justify-center w-28 h-28 bg-slate-200 rounded-2xl">
                    <Logo color="#808080" className="h-12 w-12" />
                  </div>
                ) : (
                  <img
                    alt="logo-img"
                    src={photoId.current}
                    height="112px"
                    width="112px"
                    className="rounded-2xl  w-38 h-28"
                  />
                )}
                <div className="flex w-36  flex-row mt-2 items-center ">
                  <FiUpload className="" size={20} />
                  <div className="text-sm font-bold ml-1">
                    Upload Registercard
                  </div>
                </div>
              </div>
            </div>
          <div>
            
          </div>
          </div>
       
          </form>
        </div>
        
      </div>
           
  
      
    
  );
};

export default VerfiicationPanel;
