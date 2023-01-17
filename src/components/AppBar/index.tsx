import Logo from "../Logo/Logo";
import SearchBar from "../SearchBar";
import { IoIosNotificationsOutline } from "react-icons/io";
import Image from "next/image";

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
        <div className="border-2 border-gray-400 rounded-2xl ml-5 shrink-0">
          <Image src={"https://avatars.dicebear.com/api/personas/her.svg"} alt={"avatar"} height={30} width={30} />
        </div>
      </div>
    </div>
  );
}
