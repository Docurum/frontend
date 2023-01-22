import Logo from "../Logo/Logo";
import SearchBar from "../SearchBar";
import { IoIosNotificationsOutline } from "react-icons/io";
import Image from "next/image";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { BsFillShareFill, BsSave } from "react-icons/bs";
import { MdOutlineReportProblem, MdOutlineBlock } from "react-icons/md";

export default function AppBar() {
  return (
    <div className="flex flex-row shadow p-4 max-h-[10vh] items-center justify-between">
      <div className="hidden flex-row items-center sm:ml-8 sm:flex">
        <Logo className="h-10 w-10" />
        <div className="text-3xl font-bold text-black hidden md:block">doc</div>
        <div className="text-3xl font-bold text-blue-600 hidden md:block">urum</div>
      </div>
      <SearchBar />
      <div className="flex-row items-center justify-end mr-8 shrink-0 hidden md:flex md:w-36">
        <IoIosNotificationsOutline size={30} />

        <DropdownMenu.Root>
          <DropdownMenu.Trigger className="outline-none">
            <div className="border-2 border-gray-400 rounded-2xl ml-5 shrink-0 hover:cursor-pointer">
              <Image src={"https://avatars.dicebear.com/api/personas/her.svg"} alt={"avatar"} height={30} width={30} />
            </div>
          </DropdownMenu.Trigger>
          <DropdownMenu.Portal>
            <DropdownMenu.Content className="w-36 h-40 flex flex-col items-end  bg-white rounded-md shadow-lg shadow-slate-200" side="bottom" align="end" sideOffset={2}>
              <div className="items-end mr-[2px] w-0 h-0 border-l-transparent border-l-[6px] border-r-transparent border-r-[6px] border-b-[6px] border-b-slate-100"></div>
              <DropdownMenu.Item className="outline-none">
                <div className="flex flex-row items-start w-36 pt-2 px-4 py-2 rounded-tr-md rounded-tl-md bg-slate-100 hover:bg-slate-200 hover:cursor-pointer ">
                  <div>
                    <BsSave size={25} color="gray" />
                  </div>
                  <div className="ml-4 text-md font-bold text-slate-700">Profile</div>
                </div>
              </DropdownMenu.Item>
              <DropdownMenu.Item className="outline-none">
                <div className="flex flex-row items-start w-36 px-4 py-2 bg-slate-100  hover:bg-slate-200 hover:cursor-pointer ">
                  <div>
                    <IoIosNotificationsOutline size={25} color="gray" />
                  </div>
                  <div className="ml-4 text-md font-bold text-slate-700">Edit</div>
                </div>
              </DropdownMenu.Item>

              <DropdownMenu.Item className="outline-none">
                <div className="flex flex-row items-start w-36 px-4 py-2 bg-slate-100  hover:bg-slate-200 hover:cursor-pointer outline-none">
                  <div>
                    <MdOutlineReportProblem size={25} color="gray" />
                  </div>
                  <div className="ml-4 text-md font-bold text-slate-700">Report</div>
                </div>
              </DropdownMenu.Item>
              <DropdownMenu.Item className="outline-none">
                <div className="flex flex-row items-start rounded-bl-md rounded-br-md w-36 px-4 py-2 bg-slate-100  hover:bg-slate-200 hover:cursor-pointer outline-none">
                  <div>
                    <MdOutlineBlock size={25} color="gray" />
                  </div>
                  <div className="ml-4 text-md font-bold text-slate-700">Block</div>
                </div>
              </DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Portal>
        </DropdownMenu.Root>
      </div>
    </div>
  );
}
