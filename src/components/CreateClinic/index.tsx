import { MdLocalHospital } from "react-icons/md";
import Image from "next/image";
import * as Dialog from "@radix-ui/react-dialog";
import Lottie from "react-lottie-player";
import clinicAnimation from "../../animations/Clinic_report.json";
import clinicSetupAnimation from "../../animations/clinic.json";
import Logo from "../Logo/Logo";
import { TextField } from "@mui/material";
import { FiUpload } from "react-icons/fi";
import { Dropzone } from "../Dropzone";
import { useState } from "react";

export default function CreateClinic() {
  const [files, setFiles] = useState<any[]>([]);
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
                  <div className="mt-4 mb-2 ml-4">
                    <TextField className="w-[90%]" id="clinic-name" label="Clinic/Hospital name: *" variant="outlined" />
                  </div>
                  <div className="flex flex-row my-2 ml-4">
                    <div className="w-1/2">
                      <TextField
                        className="w-[calc(100%-16px)]"
                        id="email"
                        label="Email: *"
                        variant="outlined"
                        onChange={(e) => {
                          console.log(e.target.value);
                        }}
                      />
                    </div>
                    <div className="w-1/2">
                      <TextField className="w-[calc(90%-32px)]" id="phone" label="Phone : *" variant="outlined" />
                    </div>
                  </div>
                  <div className="ml-4 my-2">
                    <TextField className="w-[90%]" id="clinic-name" label="Address: *" variant="outlined" />
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
                      <TextField
                        className="w-[calc(100%-16px)]"
                        id="email"
                        label="State: *"
                        variant="outlined"
                        onChange={(e) => {
                          console.log(e.target.value);
                        }}
                      />
                    </div>
                    <div className="w-1/2">
                      <TextField className="w-[calc(90%-32px)]" id="phone" label="City : *" variant="outlined" />
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
                    <Dropzone setFiles={setFiles} title="Add upto four other clinic images" className="w-[300px] h-[137px] rounded-2xl hover:cursor-pointer text-center focus:outline-none" />
                    <div className="flex flex-col ml-4">
                      <Dialog.Close>
                        <div className="flex flex-row items-center justify-center mt-4 h-9 w-28 shadow-lg shadow-blue-300 bg-blue-600 rounded-md" onClick={() => {}}>
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
                </div>
              </div>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      </div>
    </div>
  );
}
