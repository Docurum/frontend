import Logo from "../Logo/Logo";
import SearchBar from "../SearchBar";
import { IoIosNotificationsOutline, IoIosLogOut, IoIosSearch, IoMdArrowDropup, IoMdArrowDropdown } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { CiEdit } from "react-icons/ci";
import { FaRegEdit } from "react-icons/fa";
import Image from "next/image";
import styles from "./index.module.css";
import classNames from "classnames";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { BsFillShareFill, BsSave } from "react-icons/bs";
import { MdOutlineReportProblem, MdOutlineBlock } from "react-icons/md";
import { AiOutlineArrowDown, AiOutlineArrowUp, AiOutlineSearch } from "react-icons/ai";
import { useRouter } from "next/router";
import type { ImageLoaderProps } from "next/image";
import { FC } from "react";
import Notification from "../Notification";
import { GetClinicByIdQuery } from "../../api/clinic";

const ClinicAppBar: FC<{
  clinicId: string;
}> = ({ clinicId }) => {
  
  const router = useRouter();
  const clinicById = GetClinicByIdQuery(clinicId);
  if (clinicById.isLoading) {
    return <></>;
  }
  return (
    <div className="flex flex-row shadow max-h-[10vh] h-[8vh] sm:h-[10vh] items-center justify-between">
      <div className="flex flex-row items-center ml-2 sm:ml-8 hover:cursor-pointer" onClick={() => router.push("/home")}>
        {clinicById.data?.logo === "" || clinicById.data?.logo === null ? (
          <div className="flex flex-row items-center justify-center w-12 h-12 bg-slate-200 rounded-2xl">
            <Logo color="#808080" className="h-6 w-6" />
          </div>
        ) : (
          <div className="flex flex-row items-center justify-center max-w-16 h-12 bg-slate-200 rounded-2xl">
            <Image alt="clinic-logo" src={clinicById.data?.logo!} width={48} height={48} className="max-w-16 h-12" />
          </div>
        )}
        <div className="text-xl sm:text-3xl font-bold text-blue-600">{clinicById.data?.name}</div>
      </div>
      <div className="hidden sm:flex">
        <SearchBar />
      </div>
      <div className="flex-row items-center justify-end mr-4 sm:mr-8 shrink-0 flex md:w-36">
        <div className="hidden max-sm:flex ml-5" onClick={() => router.push("/search")}>
          <IoIosSearch size={28} />
        </div>
        <div className="hidden max-sm:flex ml-5 hover:cursor-pointer" onClick={() => router.push("/notifications")}>
          <IoIosNotificationsOutline size={30} />
        </div>
        <div className="hidden sm:flex">
          <NotificationDropdownMenu />
        </div>
        <ProfileDropdownMenu />
      </div>
    </div>
  );
};

const NotificationDropdownMenu = () => {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger className="outline-none">
        <div className="ml-5 hover:cursor-pointer">
          <IoIosNotificationsOutline size={30} />
        </div>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content side="bottom" align="end" className="z-50" sideOffset={2}>
          <div className={"w-96 h-[70vh] flex flex-col items-end "}>
            <Notification />
          </div>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

const ProfileDropdownMenu = () => {


  const router = useRouter();

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger className="outline-none">
        <div className="border-2 border-gray-400 rounded-2xl ml-5 shrink-0 hover:cursor-pointer">
          <Image src={"https://avatars.dicebear.com/api/personas/her.svg"} alt={"avatar"} height={30} width={30} />
        </div>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content className="w-36 h-32 flex flex-col items-end  bg-white rounded-md shadow-lg shadow-slate-200" side="bottom" align="end" sideOffset={2}>
          <div className="items-end mr-[2px] w-0 h-0 border-l-transparent border-l-[6px] border-r-transparent border-r-[6px] border-b-[6px] border-b-slate-100"></div>
          <DropdownMenu.Item className="outline-none" onClick={() => router.push("/profile")}>
            <div className="flex flex-row items-start w-36 pt-2 px-4 py-2 rounded-tr-md rounded-tl-md bg-slate-100 hover:bg-slate-200 hover:cursor-pointer ">
              <div>
                <CgProfile size={25} color="gray" />
              </div>
              <div className="ml-4 text-md font-bold text-slate-700">Profile</div>
            </div>
          </DropdownMenu.Item>
          <DropdownMenu.Item className="outline-none">
            <div className="flex flex-row items-start w-36 px-4 py-2 bg-slate-100  hover:bg-slate-200 hover:cursor-pointer ">
              <div>
                <CiEdit size={25} color="gray" />
              </div>
              <div onClick={() => router.push("/profile")}className="ml-4 text-md font-bold text-slate-700">Edit</div>
            </div>
          </DropdownMenu.Item>

          <DropdownMenu.Item className="outline-none">
            <div className="flex flex-row items-start rounded-bl-md rounded-br-md w-36 px-4 py-2 bg-slate-100  hover:bg-slate-200 hover:cursor-pointer outline-none">
              <div>
                <IoIosLogOut size={25} color="gray" />
              </div>
              <div className="ml-4 text-md font-bold text-slate-700">Logout</div>
            </div>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

export default ClinicAppBar;
