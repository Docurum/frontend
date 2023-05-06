/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import { MdDeleteForever, MdLocalHospital } from "react-icons/md";
import Image from "next/image";
import * as Dialog from "@radix-ui/react-dialog";
import Lottie from "react-lottie-player";
import clinicAnimation from "../../animations/Clinic_report.json";
import clinicSetupAnimation from "../../animations/clinic.json";
import Logo from "../Logo/Logo";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { DialogActions, TextField } from "@mui/material";
import { FiUpload } from "react-icons/fi";
import { Dropzone } from "../Dropzone";
import React, { ReactNode, useCallback, useEffect, useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import clinicSchema from "../../schemas/clinicSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import capsEveryFirstLetter from "../../utils/capsEveryFirstLetter";
import toast from "react-hot-toast";
import { z } from "zod";
import { Input } from "@material-tailwind/react";
import { MdOutlineCancel } from "react-icons/md";
import classNames from "classnames";
import { createId } from "@paralleldrive/cuid2";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import { useMutation, useQuery } from "@tanstack/react-query";
import { createClinic, GetClinicsQuery } from "../../api/clinic";

export default function CreateClinic() {
  const [files, setFiles] = useState<any[]>([]);
  const [uploadedFiles, setUploadedFiles] = useState<any[]>([]);
  const uploadedImages: React.MutableRefObject<any[]> = useRef([]);
  const uploadedImageFiles: React.MutableRefObject<any[]> = useRef([]);
  const logoImage: React.MutableRefObject<string> = useRef("");
  const [logoFiles, setLogoFiles] = useState<any[]>([]);

  const onDrop: any = useCallback((acceptedFiles: string[], fileRejections: any[]) => {
    if (acceptedFiles.length > 0) {
      setLogoFiles((files) => {
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
          toast.error("Only jpg/png files supported!", { id: "Invalid-File" });
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

  const getClinics = GetClinicsQuery();

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
    resolver: zodResolver(clinicSchema),
    defaultValues: {
      name: "",
      email: "",
      phoneNumber: "",
      type: "",
      address: "",
      country: "",
      pincode: "",
      state: "",
      city: "",
      displayImages: [],
      logo: "",
    },
  });

  const uploadFile = async () => {
    if (uploadedImages.current.length >= files.length) {
      uploadedImages.current = [];
    }

    const client = new S3Client({
      region: "ap-south-1",
      credentials: {
        accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY!,
        secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY!,
      },
    });

    files.forEach(async (file) => {
      let keyName = createId() + "." + file.name.split(".")[1];
      if (!uploadedImageFiles.current.includes(files)) {
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
          uploadedImages.current.push(payload.picture);

          uploadedImageFiles.current.push(file);
          setUploadedFiles(uploadedImageFiles.current);
          // console.log("Asset s3 url:", url);
        } catch (error) {
          console.log("Error: ", error);
        }
      }
    });
  };

  const uploadLogoFile = async () => {
    if (uploadedImages.current.length >= files.length) {
      uploadedImages.current = [];
    }

    const client = new S3Client({
      region: "ap-south-1",
      credentials: {
        accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY!,
        secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY!,
      },
    });

    if (logoFiles.length > 0) {
      let keyName = createId() + "." + logoFiles[0].name.split(".")[1];

      const command = new PutObjectCommand({
        Bucket: "docurum-forum-assets",
        Key: keyName,
        Body: logoFiles[0],
        ACL: "public-read",
      });
      let payload = {
        picture: `https://docurum-forum-assets.s3.ap-south-1.amazonaws.com/${keyName}`,
      };

      try {
        await client.send(command);
        logoImage.current = payload.picture;
        setLogoFiles([]);
      } catch (error) {
        console.log("Error: ", error);
      }
    }
  };

  useEffect(() => {
    uploadFile();
  }, [files]);

  useEffect(() => {
    uploadLogoFile();
  }, [logoFiles.length]);

  const [type, setType] = useState<string>("");

  const onSubmit: SubmitHandler<z.infer<typeof clinicSchema>> = async (formData) => {
    formData.displayImages = uploadedImages.current;
    formData.logo = logoImage.current;
    // uploadedImages.current.forEach((img, index) => {
    //   console.log("Image ", index, " :", img);
    // });
    // console.log("Formdata images", formData.displayImages);
    // console.table(formData);
    try {
      const { data } = await createClinic(formData);
      getClinics.refetch();
      toast.success(data.message, { id: data.message });
      reset();
      // As reset will fallback to defaultValues
      // so they have to be cleared explicitly
      setValue("name", "");
      setValue("email", "");
      setValue("logo", "");
      setType("");
      uploadedImages.current = [];
      logoImage.current = "";
      setFiles([]);
    } catch (err: any) {
      if (err.response) {
        const errorMessage = err.response.data.message;
        if (Array.isArray(errorMessage)) {
          errorMessage.forEach((error: { message: string; path: [keyof z.infer<typeof clinicSchema>] }) => {
            setError(error.path[0], {
              message: error.message,
            });
          });
        } else {
          toast.error(errorMessage, { id: errorMessage });
        }
      } else {
        toast.error("Unable to Connect to Server", { id: "server-conn-fail" });
      }
    }
  };

  const deleteFile = (file: any) => {
    setFiles((files) => {
      const newFiles = files.filter((f) => f.path !== file.path);
      return newFiles;
    });
  };

  return (
    <div className="flex flex-row mt-4">
      <div className="h-40 relative w-52 xl:w-72 mb-4 rounded-md hidden flex-col items-center justify-end md:flex">
        <div className="z-1 absolute h-32 bg-blue-100 w-10/12 rounded-lg"></div>
        <div className="absolute z-2 w-10/12 items-end flex flex-col">
          {/* <Image src="/doc.png" alt="female doctor" height={200} width={190} /> */}
          <Lottie animationData={clinicAnimation} play className="h-48" />
        </div>
        <Dialog.Root>
          <Dialog.Trigger className="flex flex-row justify-center items-center z-3 absolute h-12 bg-blue-600 w-32 lg:w-40 rounded-lg mb-4 hover:cursor-pointer hover:shadow-md hover:shadow-green-200 outline-none">
            <MdLocalHospital size={28} color="white" />
            <div className="text-white hidden text-sm lg:text-[15px] ml-1 font-bold text-center lg:flex">Add a clinic</div>
            <div className="text-white hidden text-md lg:text-[16px] ml-1 font-bold text-center max-lg:flex">Consult</div>
          </Dialog.Trigger>
          <Dialog.Portal className="">
            <Dialog.Overlay className="fixed inset-0 bg-black opacity-50" />
            <Dialog.Content className="z-10 p-2 h-[590px] w-[1100px] rounded-xl bg-white shadow-lg shadow-slate-400 fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
              <Dialog.Close className="absolute top-4 right-4">
                <MdOutlineCancel size={31} color="gray" />
              </Dialog.Close>
              <div className="w-full flex flex-row justify-items-end h-full ml-4">
                <div className="flex flex-col w-1/3 items-center h-full justify-between">
                  <div className="flex flex-col w-full items-center">
                    <Lottie animationData={clinicSetupAnimation} play className="w-96 h-84" />
                    <div className="text-2xl font-bold text-blue-600">Add your clinic</div>
                    <div className="text-lg text-slate-500 text-center mx-8 my-2">Please fill out the required details, we are happy to see you here 😄</div>
                  </div>
                  <div className="flex flex-row items-center mb-4">
                    <div className="text-md text-md text-slate-500 ">Powered by: </div>
                    <div className="flex flex-row ml-2 items-center hover:cursor-pointer">
                      <Logo className="h-6 w-6" />
                      <div className="text-xl font-bold text-black">doc</div>
                      <div className="text-xl font-bold text-blue-600">urum</div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col mt-8 w-2/3">
                  <form onSubmit={handleSubmit(onSubmit)}>
                    {/* <div className="mt-4 mb-2 ml-4">
                    <TextField className="w-[90%]" id="clinic-name" label="Clinic/Hospital name: *" variant="outlined" />
                  </div> */}
                    <div className="flex flex-row my-2 ml-4">
                      <div className="w-1/2">
                        <div className="w-[calc(100%-16px)]">
                          <TextField
                            variant="outlined"
                            className="w-full"
                            id="name"
                            label="Clinic/Hospital Name: *"
                            fullWidth
                            error={Boolean(errors.name)}
                            helperText={errors.name ? (errors.name.message as string) : ""}
                            {...register("name")}
                          />
                        </div>
                      </div>
                      <div className="w-1/2">
                        <DropdownMenu.Root>
                          <DropdownMenu.Trigger className="outline-none w-[calc(90%-32px)]">
                            <TextField value={type} className="w-full" id="type" label="Clinic Type : *" variant="outlined" />
                          </DropdownMenu.Trigger>
                          <DropdownMenu.Portal className="">
                            <DropdownMenu.Content className="z-50 outline-none w-[285px] rounded-md p-2 bg-slate-200" sideOffset={1}>
                              <div
                                className="w-full py-1 text-slate-600 text-lg hover:cursor-pointer hover:text-blue-600 hover:font-bold"
                                onClick={() => {
                                  setType("Private Clinic");
                                  setValue("type", "Private Clinic");
                                }}
                              >
                                Private Clinic
                              </div>
                              <div
                                className="w-full py-1 text-slate-600 text-lg hover:cursor-pointer hover:text-blue-600 hover:font-bold"
                                onClick={() => {
                                  setType("Hospital");
                                  setValue("type", "Hospital");
                                }}
                              >
                                Hospital
                              </div>
                              <div
                                className="w-full py-1 text-slate-600 text-lg hover:cursor-pointer hover:text-blue-600 hover:font-bold"
                                onClick={() => {
                                  setType("Scan Center");
                                  setValue("type", "Scan Center");
                                }}
                              >
                                Scan center
                              </div>
                            </DropdownMenu.Content>
                          </DropdownMenu.Portal>
                        </DropdownMenu.Root>
                      </div>
                    </div>
                    <div className="flex flex-row my-2 ml-4">
                      <div className="w-1/2">
                        <TextField
                          className="w-[calc(100%-16px)]"
                          id="email"
                          label="Email: *"
                          variant="outlined"
                          error={Boolean(errors.email)}
                          helperText={errors.email ? (errors.email.message as string) : ""}
                          {...register("email")}
                        />
                      </div>
                      <div className="w-1/2">
                        <TextField
                          className="w-[calc(90%-32px)]"
                          id="phone"
                          label="Phone : *"
                          variant="outlined"
                          error={Boolean(errors.phoneNumber)}
                          helperText={errors.phoneNumber ? (errors.phoneNumber.message as string) : ""}
                          {...register("phoneNumber")}
                        />
                      </div>
                    </div>
                    <div className="ml-4 my-2">
                      <TextField
                        className="w-[90%]"
                        id="address"
                        label="Address: *"
                        variant="outlined"
                        error={Boolean(errors.address)}
                        helperText={errors.address ? (errors.address.message as string) : ""}
                        {...register("address")}
                      />
                    </div>
                    <div className="flex flex-row my-2 ml-4">
                      <div className="w-1/2">
                        <TextField
                          className="w-[calc(100%-16px)]"
                          id="country"
                          label="Country: *"
                          variant="outlined"
                          error={Boolean(errors.country)}
                          helperText={errors.country ? (errors.country.message as string) : ""}
                          {...register("country")}
                        />
                      </div>
                      <div className="w-1/2">
                        <TextField
                          className="w-[calc(90%-32px)]"
                          id="pincode"
                          label="Pincode : *"
                          variant="outlined"
                          error={Boolean(errors.pincode)}
                          helperText={errors.pincode ? (errors.pincode.message as string) : ""}
                          {...register("pincode")}
                        />
                      </div>
                    </div>
                    <div className="flex flex-row my-2 ml-4">
                      <div className="w-1/2">
                        <TextField
                          className="w-[calc(100%-16px)]"
                          id="state"
                          label="State: *"
                          variant="outlined"
                          error={Boolean(errors.state)}
                          helperText={errors.state ? (errors.state.message as string) : ""}
                          {...register("state")}
                        />
                      </div>
                      <div className="w-1/2">
                        <TextField
                          className="w-[calc(90%-32px)]"
                          id="city"
                          label="City : *"
                          variant="outlined"
                          error={Boolean(errors.city)}
                          helperText={errors.city ? (errors.city.message as string) : ""}
                          {...register("city")}
                        />
                      </div>
                    </div>
                    <div className="flex flex-row ml-4 hover:cursor-pointer">
                      <div {...getRootProps()} className="flex flex-col items-center mt-4">
                        <input {...getInputProps()} />
                        {logoImage.current === "" ? (
                          <div className="flex flex-row items-center justify-center w-28 h-28 bg-slate-200 rounded-2xl">
                            <Logo color="#808080" className="h-12 w-12" />
                          </div>
                        ) : (
                          <img alt="logo-img" src={logoImage.current} height="112px" width="112px" className="rounded-2xl" />
                        )}
                        <div className="flex flex-row mt-2 items-center ">
                          <FiUpload className="" size={20} />
                          <div className="text-sm font-bold ml-1">Upload logo</div>
                        </div>
                      </div>

                      {files.length === 0 ? (
                        <Dropzone setFiles={setFiles} title="Add upto four other clinic images" className="w-[370px] h-[137px] rounded-2xl hover:cursor-pointer text-center focus:outline-none" />
                      ) : (
                        <></>
                      )}
                      {files.length > 0 ? (
                        <div className="flex ml-4 w-[370px] overflow-x-scroll scrollbar custom-scrollbar mb-4">
                          <div className="flex gap-x-1">
                            {files.map((file) => {
                              const isImageFile = file.type.split("/")[0] === "image";
                              return (
                                <div key={file.path} className="flex flex-col items-center justify-center">
                                  <div className={classNames(["flex relative w-24 h-24 rounded-lg font-medium"], [isImageFile ? "text-black" : "text-white bg-gray-600"])}>
                                    {isImageFile && <img src={URL.createObjectURL(file)} alt={file.name} className="absolute -z-10 w-36 h-24 opacity-40 rounded-lg" />}
                                    <p className="justify-start p-4 truncate text-sm">{file.name}</p>
                                    <p className="absolute bottom-2 left-2 text-sm truncate">{`${(file.size / (1024 * 1024)).toFixed(2)} MB`}</p>
                                    <button
                                      className="absolute bottom-2 right-2 shrink-0"
                                      onClick={() => {
                                        deleteFile(file);
                                      }}
                                    >
                                      <MdDeleteForever size={20} />
                                    </button>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      ) : (
                        <></>
                      )}
                      <div className="flex flex-col ml-4">
                        <button
                          type="submit"
                          onClick={() => {
                            handleSubmit(onSubmit);
                          }}
                          // disabled={isSubmitting || isValidating}
                          className="flex flex-row items-center justify-center mt-4 h-9 w-28 shadow-lg shadow-blue-300 bg-blue-600 rounded-md"
                        >
                          <div className="text-white font-bold text-md">Submit</div>
                        </button>
                        <Dialog.Close>
                          <div className="flex flex-row mt-4 items-center justify-center h-9 w-28 bg-slate-400 rounded-md mr-2">
                            <div className="text-white font-bold text-md">Cancel</div>
                          </div>
                        </Dialog.Close>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      </div>
    </div>
  );
}
