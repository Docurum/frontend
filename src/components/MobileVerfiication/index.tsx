import { TextField } from "@mui/material";
import classNames from "classnames";
import React, { useCallback, useEffect, useRef, useState } from "react";

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
    medicalCouncil: z
      .string()
      .min(4, "medicalCouncil must contain at least 4 characters")
      .max(150, "medicalCouncil must contain at most 150 characters")
      .trim(),
    registrationNumber: z
      .string()
      .min(6, "registrationNumber must contain at least 4 characters")
      .max(150, "registrationNumber must contain at most 150 characters")
      .trim(),
    registrationYear: z
      .string()
      .min(4, "registrationYear must contain at least 4 characters")
      .max(150, "registrationYear must contain at most 150 characters")
      .trim(),
    hospital: z
      .string()
      .min(4, "hospital must contain at least 4 characters")
      .max(150, "hospital must contain at most 150 characters")
      .trim(),
    photoId: z.string().min(4, "Please upload your photoId"),
    registrationCertificate: z
      .string()
      .min(4, "Please upload your registrationCertificate"),
    degreeCertificate: z
      .string()
      .min(4, "Please upload your degreeCertificate"),
    biography: z
      .string()
      .min(4, "biography must contain at least 4 characters")
      .max(150, "biography must contain at most 150 characters")
      .trim(),
    qualification: z
      .string()
      .min(4, "qualification must contain at least 4 characters")
      .max(150, "qualification must contain at most 150 characters")
      .trim(),
    title: z
      .string()
      .min(4, "title must contain at least 4 characters")
      .max(150, "title must contain at most 150 characters")
      .trim(),
    speciality: z
      .string()
      .min(4, "speciality must contain at least 4 characters")
      .max(150, "speciality must contain at most 150 characters")
      .trim(),
    experience: z
      .string()
      .min(4, "experience must contain at least 4 characters")
      .max(150, "experience must contain at most 150 characters")
      .trim(),
    languages: z
      .string()
      .min(4, "languages must contain at least 4 characters")
      .max(150, "languages must contain at most 150 characters")
      .trim(),
    contact: z
      .string()
      .min(10, "contact must contain at least 4 characters")
      .max(10, "contact must contain at most 150 characters")
      .trim(),
  })
  .strict();
export type verifyDoctorSchemaType = z.infer<typeof verifyDoctorSchema>;
const MobileVerfiicationPanel = () => {
  const router = useRouter();
  const [uploadType, setUploadType] = useState<string>("");
  const [currentFile, setCurrentFile] = useState<any>(null);

  const degree: React.MutableRefObject<string> = useRef("");
  const photoId: React.MutableRefObject<string> = useRef("");
  const registration: React.MutableRefObject<string> = useRef("");

  const onDrop: any = useCallback(
    (acceptedFiles: string[], fileRejections: any[], filetype: string) => {
      if (acceptedFiles.length > 0) {
        setCurrentFile(acceptedFiles[0]);

        if (filetype === "degree") {
          setUploadType("degree");
        }
        if (filetype === "photoId") {
          setUploadType("photoId");
        }
        if (filetype === "registration") {
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

    formdata.speciality = formdata.speciality.split(",");

    formdata.registrationCertificate = registration.current;
    formdata.photoId = photoId.current;
    formdata.languages = formdata.languages.split(",");
    formdata.experience = parseInt(formdata.experience);

    if (
      formdata.degreeCertificate === "" ||
      formdata.registrationCertificate === "" ||
      formdata.photoId === ""
    ) {
      toast.error("Please upload all the files");
      return;
    }
    try {
      reset();
      const { data } = await verificationRequest(formdata);
      toast.success(data.message);
      router.push("/profile");
    } catch (err: any) {
      console.log(err);
    }
  };
  const registrationDropZone = useDropzone({
    onDrop: (acceptedFiles, fileRejections) =>
      onDrop(acceptedFiles, fileRejections, FileTupes.REGISTRATION),
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
  const degreeDropZone = useDropzone({
    onDrop: (acceptedFiles, fileRejections) =>
      onDrop(acceptedFiles, fileRejections, FileTupes.DEGREE),
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
  const photoIdDropZone = useDropzone({
    onDrop: (acceptedFiles, fileRejections) =>
      onDrop(acceptedFiles, fileRejections, FileTupes.PHOTO_ID),
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
        if (uploadType === "registration") {
          registration.current = payload.picture;
        }
        if (uploadType === "degree") {
          degree.current = payload.picture;
        }
        if (uploadType === "photoId") {
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
  }, [uploadType, currentFile]);
  return (
    <div className={classNames(["hidden max-sm:flex  mb-[10vh]  flex-col w-[100vw] h-[90vh]  scrollbar overflow-y-scroll  overflow-x-hidden  p-3 mt-2 "])}>
      <h2 className="text-2xl font-bold mx-3 p-2">Submit for Verification</h2>
      <div className="mt-2">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex  ">
            <div className="w-full   gap-8 flex flex-col  ">
              <label className="block">
                <TextField
                  error={Boolean(errors.medicalCouncil)}
                  helperText={
                    errors.medicalCouncil
                      ? (errors.medicalCouncil.message as string)
                      : ""
                  }
                  {...register("medicalCouncil")}
                  type="text"
                 className="w-[calc(100%-16px)]"
                  id="Medical Council"
                  required
                  label="Medical Council: *"
                  variant="outlined"
                  placeholder=""
                />
              </label>
              <label className="block">
                <TextField
                  error={Boolean(errors.hospital)}
                  helperText={
                    errors.hospital ? (errors.hospital.message as string) : ""
                  }
                  {...register("hospital")}
                  type="text"
                   className="w-[calc(100%-16px)]"
                  id="Hospital"
                  label="Hospital *"
                  required
                  variant="outlined"
                  placeholder=""
                />
              </label>
              <label className="block">
                <TextField
                  error={Boolean(errors.qualification)}
                  helperText={
                    errors.qualification
                      ? (errors.qualification.message as string)
                      : ""
                  }
                  {...register("qualification")}
                  type="text"
                    className="w-[calc(100%-16px)]"
                  id="qualification"
                  label="qualification *"
                  variant="outlined"
                  placeholder=""
                  required
                />
              </label>
              <label className="block">
                <TextField
                  error={Boolean(errors.title)}
                  helperText={
                    errors.title ? (errors.title.message as string) : ""
                  }
                  type="text"
                  required
                  {...register("title")}
                 className="w-[calc(100%-16px)]"
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
                   className="w-[calc(100%-16px)]"
                  required
                  error={Boolean(errors.speciality)}
                  helperText={
                    errors.speciality
                      ? (errors.speciality.message as string)
                      : ""
                  }
                  id="speciality"
                  label="speciality *"
                  variant="outlined"
                  placeholder=""
                />
              </label>
               <div className="w-full gap-8 flex flex-col ">
              <label className="block">
                <TextField
                  required
                  error={Boolean(errors.languages)}
                  helperText={
                    errors.languages ? (errors.languages.message as string) : ""
                  }
                  {...register("languages")}
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
                  required
                  error={Boolean(errors.contact)}
                  helperText={
                    errors.contact ? (errors.contact.message as string) : ""
                  }
                  {...register("contact")}
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
                  required
                  error={Boolean(errors.experience)}
                  helperText={
                    errors.experience
                      ? (errors.experience.message as string)
                      : ""
                  }
                  {...register("experience")}
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
                  error={Boolean(errors.registrationYear)}
                  helperText={
                    errors.registrationYear
                      ? (errors.registrationYear.message as string)
                      : ""
                  }
                  {...register("registrationYear")}
                  type="text"
                  required
                   className="w-[calc(100%-16px)]"
                  id="registration Year"
                  label="registration Year *"
                  variant="outlined"
                  placeholder=""
                />
              </label>
              <label className="block">
                <TextField
                  required
                  error={Boolean(errors.registrationNumber)}
                  helperText={
                    errors.registrationNumber
                      ? (errors.registrationNumber.message as string)
                      : ""
                  }
                  {...register("registrationNumber")}
                  type="text"
                  className="w-[calc(100%-16px)]"
                  id="registrationNumber"
                  label="registrationNumber *"
                  variant="outlined"
                  placeholder=""
                />
              </label>

             
            </div>
              
            </div>
           

          
            <div></div>
            
          </div>
            <div className=" my-4 flex flex-col items-center  gap-2 ">
              <div {...registrationDropZone.getRootProps()} className="w-36">
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
                <div className="flex flex-row mt-2 items-center ">
                  <FiUpload className="" size={20} />
                  <div className="text-sm font-bold ml-1">Upload degree</div>
                </div>
              </div>
              <div {...degreeDropZone.getRootProps()} className="w-36">
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
                <div className="flex w-36 flex-row mt-2 items-center ">
                  <FiUpload className="" size={20} />
                  <div className="text-sm font-bold ml-1">Upload photoID</div>
                </div>
              </div>
                       <div {...degreeDropZone.getRootProps()} className="w-36">
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
                <div className="flex w-36 flex-row mt-2 items-center ">
                  <FiUpload className="" size={20} />
                  <div className="text-sm font-bold ml-1">Upload photoID</div>
                </div>
              </div>
            </div>
            <button
                type="submit"
                onClick={() => {
                  handleSubmit(onSubmit);
                }}
                className="mx-7 my-4 bg-blue-500 hover:bg-blue-700 w-4/5 text-white font-bold py-2 px-4 rounded"
              >
                Apply 
              </button>
        </form>
      </div>
    </div>
  );
};

export default MobileVerfiicationPanel;
