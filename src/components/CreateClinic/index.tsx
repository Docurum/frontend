import { MdLocalHospital } from "react-icons/md";
import Image from "next/image";
import * as Dialog from "@radix-ui/react-dialog";
import Lottie from "react-lottie-player";
import clinicAnimation from "../../animations/Clinic_report.json";
import clinicSetupAnimation from "../../animations/clinic.json";
import Logo from "../Logo/Logo";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { TextField } from "@mui/material";
import { FiUpload } from "react-icons/fi";
import { Dropzone } from "../Dropzone";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import clinicSchema from "../../schemas/clinicSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import capsEveryFirstLetter from "../../utils/capsEveryFirstLetter";
import toast from "react-hot-toast";
import { z } from "zod";
import { Input } from "@material-tailwind/react";

export default function CreateClinic() {
  const [files, setFiles] = useState<any[]>([]);
  const [type, setType] = useState<string>("");

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

  const onSubmit: SubmitHandler<z.infer<typeof clinicSchema>> = async (formData) => {
    console.table(formData);
    try {
      // const { data } = await registerUser(formData);
      // toast.success(data.message, { id: data.message });
      reset();
      // As reset will fallback to defaultValues
      // so they have to be cleared explicitly
      setValue("name", "");
      setValue("email", "");
      setValue("logo", null);
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

  return (
    <div className="flex flex-row mt-4">
      <div className="h-48 relative w-52 xl:w-72 mb-4 rounded-md hidden flex-col items-center justify-end md:flex">
        <div className="z-1 absolute h-32 bg-blue-100 w-full rounded-lg"></div>
        <div className="absolute z-2 w-full items-end flex flex-col">
          {/* <Image src="/doc.png" alt="female doctor" height={200} width={190} /> */}
          <Lottie animationData={clinicAnimation} play className="h-56" />
        </div>
        <Dialog.Root>
          <Dialog.Trigger className="flex flex-row justify-center items-center z-3 absolute h-12 bg-blue-600 w-32 lg:w-48 rounded-lg mb-4 hover:cursor-pointer hover:shadow-md hover:shadow-green-200 outline-none">
            <MdLocalHospital size={28} color="white" />
            <div className="text-white hidden text-sm lg:text-[16px] ml-1 font-bold text-center lg:flex">Add a clinic</div>
            <div className="text-white hidden text-md lg:text-[16px] ml-1 font-bold text-center max-lg:flex">Consult</div>
          </Dialog.Trigger>
          <Dialog.Portal className="">
            <Dialog.Overlay className="fixed bg-slate-700" />
            <Dialog.Content className="z-10 p-2 h-[590px] w-[1100px] rounded-xl bg-white shadow-lg shadow-slate-400 fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
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
                <div className="flex flex-col w-2/3">
                  <form onSubmit={handleSubmit(onSubmit)}>
                    {/* <div className="mt-4 mb-2 ml-4">
                    <TextField className="w-[90%]" id="clinic-name" label="Clinic/Hospital name: *" variant="outlined" />
                  </div> */}
                    <div className="flex flex-row my-2 ml-4">
                      <div className="w-1/2">
                        <div className="w-[calc(100%-16px)]">
                          <Input color="blue" variant="outlined" className="w-full" id="name" label="Clinic/Hospital Name: *" {...register("name")} onChange={(e) => {}} />
                        </div>
                      </div>
                      <div className="w-1/2">
                        <DropdownMenu.Root>
                          <DropdownMenu.Trigger className="outline-none w-[calc(90%-32px)]">
                            <TextField {...register("type")} value={type} className="w-full" id="phone" label="Clinic Type : *" variant="outlined" />
                          </DropdownMenu.Trigger>
                          <DropdownMenu.Portal className="">
                            <DropdownMenu.Content className="z-50 outline-none w-[285px] rounded-md p-2 bg-slate-200" sideOffset={1}>
                              <div className="w-full py-1 text-slate-600 text-lg hover:cursor-pointer hover:text-blue-600 hover:font-bold" onClick={() => setType("Private Clinic")}>
                                Private Clinic
                              </div>
                              <div className="w-full py-1 text-slate-600 text-lg hover:cursor-pointer hover:text-blue-600 hover:font-bold" onClick={() => setType("Hospital")}>
                                Hospital
                              </div>
                              <div className="w-full py-1 text-slate-600 text-lg hover:cursor-pointer hover:text-blue-600 hover:font-bold" onClick={() => setType("Scan Center")}>
                                Scan center
                              </div>
                            </DropdownMenu.Content>
                          </DropdownMenu.Portal>
                        </DropdownMenu.Root>
                      </div>
                    </div>
                    <div className="flex flex-row my-2 ml-4">
                      <div className="w-1/2">
                        <TextField className="w-[calc(100%-16px)]" id="email" label="Email: *" variant="outlined" {...register("email")} onChange={(e) => {}} />
                      </div>
                      <div className="w-1/2">
                        <TextField {...register("phoneNumber")} className="w-[calc(90%-32px)]" id="phone" label="Phone : *" variant="outlined" />
                      </div>
                    </div>
                    <div className="ml-4 my-2">
                      <TextField className="w-[90%]" id="clinic-name" label="Address: *" variant="outlined" {...register("address")} />
                    </div>
                    <div className="flex flex-row my-2 ml-4">
                      <div className="w-1/2">
                        <TextField
                          className="w-[calc(100%-16px)]"
                          id="email"
                          label="Country: *"
                          variant="outlined"
                          onChange={(e) => {
                            console.log(e.target.value);
                          }}
                        />
                      </div>
                      <div className="w-1/2">
                        <TextField className="w-[calc(90%-32px)]" id="phone" label="Pincode : *" variant="outlined" />
                      </div>
                    </div>
                    <div className="flex flex-row my-2 ml-4">
                      <div className="w-1/2">
                        <TextField className="w-[calc(100%-16px)]" id="state" {...register("state")} label="State: *" variant="outlined" onChange={(e) => {}} />
                      </div>
                      <div className="w-1/2">
                        <TextField className="w-[calc(90%-32px)]" id="city" label="City : *" variant="outlined" {...register("city")} />
                      </div>
                    </div>
                    <div className="flex flex-row ml-4 hover:cursor-pointer">
                      <div className="flex flex-col items-center mt-4">
                        <div className="flex flex-row items-center justify-center w-28 h-28 bg-slate-200 rounded-2xl">
                          <Logo color="#808080" className="h-12 w-12" />
                        </div>
                        <div className="flex flex-row mt-2 items-center ">
                          <FiUpload className="" size={20} />
                          <div className="text-sm font-bold ml-1">Upload logo</div>
                        </div>
                      </div>
                      <Dropzone setFiles={setFiles} title="Add upto four other clinic images" className="w-[370px] h-[137px] rounded-2xl hover:cursor-pointer text-center focus:outline-none" />
                      <div className="flex flex-col ml-4">
                        <Dialog.Close>
                          <div onClick={() => handleSubmit(onSubmit)} className="flex flex-row items-center justify-center mt-4 h-9 w-28 shadow-lg shadow-blue-300 bg-blue-600 rounded-md">
                            <div className="text-white font-bold text-md">Submit</div>
                          </div>
                        </Dialog.Close>
                        <Dialog.Close>
                          <div
                            className="flex flex-row mt-4 items-center justify-center h-9 w-28 bg-slate-400 rounded-md mr-2"
                            onClick={() => {
                              // console.log(formValues);
                            }}
                          >
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
