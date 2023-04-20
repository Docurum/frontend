import { MdLocalHospital } from "react-icons/md";
import Image from "next/image";
import * as Dialog from "@radix-ui/react-dialog";
import { ScheduleMeeting } from "../ScheduleMeetingCalender";
import { useRouter } from "next/router";
import getGoogleOAuthURL from "../../utils/getGoogleUrl";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

export default function Consult() {
  const [cookieValue, setCookieValue] = useState("");
  const router = useRouter();
  useEffect(() => {
    const myCookie = Cookies.get("googleTokenCookie");
    if (myCookie !== undefined) {
      setCookieValue(myCookie);
      console.log("Oauth cookie: ", myCookie);
    }
  }, []);
  const availableTimeslots = [0, 1, 2, 3, 4, 5].map((id) => {
    return {
      id,
      startTime: new Date(new Date(new Date().setDate(new Date().getDate() + id)).setHours(9, 0, 0, 0)),
      endTime: new Date(new Date(new Date().setDate(new Date().getDate() + id)).setHours(17, 0, 0, 0)),
    };
  });

  return (
    <div className="h-96 relative w-52 xl:w-72 mb-4 rounded-md hidden flex-col items-center justify-end md:flex">
      <div className="z-1 absolute h-32 bg-green-100 w-full rounded-lg"></div>
      <div className="absolute z-2 w-full items-end flex flex-col">
        <Image src="/female_doctor.png" alt="female doctor" height={200} width={170} />
      </div>
      <Dialog.Root>
        <Dialog.Trigger className="flex flex-row justify-center items-center z-3 absolute h-12 w-32 lg:w-48 rounded-lg mb-4 hover:cursor-pointer outline-none">
          <div
            className="flex flex-row justify-center items-center z-3 absolute h-12 bg-green-500 w-32 lg:w-48 rounded-lg mb-4 hover:cursor-pointer hover:shadow-md hover:shadow-green-200 outline-none"
            onClick={() => {
              // router.push("/api/oauth/google");
              // window.location.href = getGoogleOAuthURL("home");
              console.log("Cookie value: ", cookieValue);
            }}
          >
            <MdLocalHospital size={28} color="white" />
            <div className="text-white hidden text-sm lg:text-[16px] ml-1 font-bold text-center lg:flex">Consult a doctor</div>
            <div className="text-white hidden text-md lg:text-[16px] ml-1 font-bold text-center max-lg:flex">Consult</div>
          </div>
        </Dialog.Trigger>
        <Dialog.Portal className="">
          <Dialog.Overlay className="bg-slate-700 h-[100vh] w-[100vw]">
            <Dialog.Content className="z-10 p-4 h-[80vh] w-[300px] sm:w-[70vw] rounded-md bg-white shadow-md shadow-slate-200 fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
              <ScheduleMeeting borderRadius={10} primaryColor="#3f5b85" eventDurationInMinutes={30} availableTimeslots={availableTimeslots} onStartTimeSelect={console.log} />
              <div className="w-full flex flex-row my-3 justify-end">
                <Dialog.Close>
                  <div
                    className="flex flex-row items-center justify-center h-9 w-20 bg-slate-400 rounded-md mr-2"
                    onClick={() => {
                      // console.log(formValues);
                    }}
                  >
                    <div className="text-white font-bold text-md">Cancel</div>
                  </div>
                </Dialog.Close>
                <Dialog.Close>
                  <div className="flex flex-row items-center justify-center h-9 w-20 bg-blue-600 rounded-md" onClick={() => {}}>
                    <div className="text-white font-bold text-md">Add</div>
                  </div>
                </Dialog.Close>
              </div>
              <Dialog.Close />
            </Dialog.Content>
          </Dialog.Overlay>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
}
