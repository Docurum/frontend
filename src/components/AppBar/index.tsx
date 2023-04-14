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
import { FC, useEffect, useState } from "react";
import Notification from "../Notification";
import { isJWTValid } from "../../pages/_app";
import { GetUserQuery } from "../../api/user";

export default function AppBar() {
  const router = useRouter();

  const [isLoggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    setLoggedIn(isJWTValid());
  }, []);
  return (
    <div className="flex flex-row shadow max-h-[10vh] h-[8vh] sm:h-[10vh] items-center justify-between">
      <div className="flex flex-row items-center ml-2 sm:ml-8 hover:cursor-pointer" onClick={() => router.push("/home")}>
        <Logo className="h-10 w-10 sm:h-10 sm:w-10" />
        <div className="text-xl sm:text-3xl font-bold text-black">doc</div>
        <div className="text-xl sm:text-3xl font-bold text-blue-600">urum</div>
      </div>
      <div className="hidden sm:flex">
        <SearchBar />
      </div>
      <div className="flex-row items-center justify-end mr-4 sm:mr-8 shrink-0 flex md:w-36">
        <div className="hidden max-sm:flex ml-5" onClick={() => router.push("/search")}>
          <IoIosSearch size={28} />
        </div>
        {/* <div className="hidden max-sm:flex ml-5 hover:cursor-pointer" onClick={() => router.push("/notifications")}>
          <IoIosNotificationsOutline size={30} />
        </div>
        <div className="hidden sm:flex">
          <NotificationDropdownMenu />
        </div> */}
        {isLoggedIn ? (
          <ProfileDropdownMenu />
        ) : (
          <div className="flex-row items-center justify-end mr-4 sm:mr-8 shrink-0 flex md:w-36">
            <div onClick={() => router.push("/login")} className="text-lg hover:cursor-pointer text-white bg-blue-600 py-2 px-4 rounded-lg shadow-lg shadow-blue-200">
              Log In
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

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
  const userQuery = GetUserQuery();

  if (userQuery.isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger className="outline-none">
        <div className="flex flex-row items-center ml-4">
          <div className="border-2 border-gray-400 rounded-2xl shrink-0">
            {userQuery.data?.picture ? (
              <Image src={userQuery.data?.picture} alt={"avatar"} height={30} width={30} className="rounded-full" />
            ) : (
              <Image src={`https://avatars.dicebear.com/api/personas/${name}.svg`} alt={"avatar"} height={30} width={30} className="" />
            )}
          </div>
        </div>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content className="w-36 h-[90px] flex flex-col items-end  bg-white rounded-md shadow-lg shadow-slate-200" side="bottom" align="end" sideOffset={2}>
          <div className="items-end mr-[2px] w-0 h-0 border-l-transparent border-l-[6px] border-r-transparent border-r-[6px] border-b-[6px] border-b-slate-100"></div>
          <DropdownMenu.Item className="outline-none" onClick={() => router.push("/profile")}>
            <div className="flex flex-row items-start w-36 pt-2 px-4 py-2 rounded-tr-md rounded-tl-md bg-slate-100 hover:bg-slate-200 hover:cursor-pointer ">
              <div>
                <CgProfile size={25} color="gray" />
              </div>
              <div className="ml-4 text-md font-bold text-slate-700">Profile</div>
            </div>
          </DropdownMenu.Item>
          <DropdownMenu.Item onClick={() => router.push("/edit")} className="outline-none">
            <div className="flex flex-row items-start w-36 px-4 py-2 bg-slate-100  hover:bg-slate-200 hover:cursor-pointer ">
              <div>
                <CiEdit size={25} color="gray" />
              </div>
              <div className="ml-4 text-md font-bold text-slate-700">Edit</div>
            </div>
          </DropdownMenu.Item>

          <DropdownMenu.Item
            className="outline-none"
            onClick={() => {
              localStorage.removeItem("token");
              router.push("/login");
            }}
          >
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
