import { NextPage } from "next";
import { useRouter } from "next/router";
import { IoIosSearch } from "react-icons/io";
import Logo from "../components/Logo/Logo";
import LogoWithText from "../components/Logo/LogoWithText";
import { QandASection } from "../components/QandASection";
import SearchBar from "../components/SearchBar";
import SEO from "../components/SEO";

const Home: NextPage = () => {
  const router = useRouter();
  return (
    <>
      <SEO title="docurum" />
      <div className="flex flex-row shadow-sm max-h-[10vh] h-[8vh] sm:h-[10vh] items-center justify-between">
        <div className="flex flex-row items-center ml-2 sm:ml-8 hover:cursor-pointer">
          <Logo className="h-10 w-10 sm:h-10 sm:w-10" />
          <div className="text-xl sm:text-3xl font-bold text-black">doc</div>
          <div className="text-xl sm:text-3xl font-bold text-blue-600">urum</div>
        </div>
        <div className="hidden sm:flex">
          <SearchBar />
        </div>
        <div className="flex flex-row items-center">
          <div className="hidden max-sm:flex mr-5" onClick={() => router.push("/search")}>
            <IoIosSearch size={28} />
          </div>
          <div className="flex-row items-center justify-end mr-4 sm:mr-8 shrink-0 flex md:w-36">
            <div onClick={() => router.push("/login")} className="text-lg text-white bg-blue-600 py-2 px-4 rounded-lg shadow-lg shadow-blue-200">
              Log In
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-column">
        <div className="hidden lg:flex flex-row w-[100vw] justify-between items-center">
          <div className="flex flex-col w-1/2 ml-20">
            <div className="flex flex-col items-start ">
              <div className="text-[50px] font-extrabold bg-gradient-to-r from-blue-700 to-indigo-500 via-pink-500 inline-block text-transparent bg-clip-text">Forum</div>
              <div className="text-[35px] text-slate-600 font-bold"> dedicated to doctors/patients</div>
            </div>
            <div
              onClick={() => router.push("/signup")}
              className="mt-10 text-xl font-bold w-[113px] animate-bounce text-white bg-blue-600 py-2 px-4 rounded-lg shadow-lg shadow-blue-200 hover:cursor-pointer"
            >
              Join now
            </div>
          </div>
          <div className="flex flex-col w-[73vw] mt-10 mx-[5vw] max-h-[60vh] custom-scrollbar overflow-y-scroll">
            <QandASection />
          </div>
        </div>
        <div className="hidden max-lg:flex flex-col mx-4 mt-4 w-[100vw] justify-between items-center">
          <div className="flex flex-col">
            <div className="flex flex-col items-start ">
              <div className="text-[53px] font-extrabold bg-gradient-to-r from-blue-700 to-indigo-500 via-pink-500 inline-block text-transparent bg-clip-text">Forum</div>
              <div className="text-[37px] text-slate-600 font-bold"> dedicated to doctors & patients</div>
            </div>
            <div
              onClick={() => router.push("/signup")}
              className="mt-10 text-xl font-bold w-[113px] animate-bounce text-white bg-blue-600 py-2 px-4 rounded-lg shadow-lg shadow-blue-200 hover:cursor-pointer"
            >
              Join now
            </div>
          </div>
          <div className="flex flex-col w-[98vw] mt-10 max-h-96 custom-scrollbar overflow-y-scroll">
            <QandASection />
          </div>
        </div>
      </div>
      <div className="hidden lg:flex flex-row w-[90vw] mx-[5vw] mt-32 mb-20 h-[400px] bg-blue-50 rounded-lg">
        <div className="flex flex-col w-1/2 py-8 ml-8 h-[400px] justify-between">
          <div className="flex flex-row items-center hover:cursor-pointer">
            <Logo className="h-10 w-10" />
            <div className="text-xl sm:text-3xl font-bold text-black">doc</div>
            <div className="text-xl sm:text-3xl font-bold text-blue-600">urum</div>
          </div>
          <div className="flex flex-col items-start">
            <div className="text-[50px] font-extrabold bg-gradient-to-r from-blue-700 to-indigo-500 via-pink-500 inline-block text-transparent bg-clip-text">Hey guys 👋</div>
            <div className="text-[30px] text-slate-600 font-bold">{"let's discuss 💡"}</div>
          </div>
          <div className="text-slate-600 font-bold">Copyright © 2023 Docurum, Inc. All rights reserved.</div>
        </div>
        <div className="flex flex-col w-1/2 py-8 ml-8 h-[400px] justify-start">
          <div className="text-2xl text-blue-600 font-bold">Contact</div>
          <div className="text-lg mt-2 text-slate-600 font-bold">docurumbusiness@gmail.com</div>
          <div className="text-lg font-bold w-24 mt-6 hover:cursor-pointer text-white bg-blue-600 py-2 px-4 rounded-lg shadow-lg shadow-blue-200">Sign up</div>
        </div>
      </div>
      <div className="hidden max-lg:flex flex-col w-[95vw] ml-4 mt-10 mb-4 h-[440px] bg-blue-50 rounded-lg">
        <div className="flex flex-col w-full py-8 ml-4 justify-between">
          <div className="flex flex-row items-center hover:cursor-pointer">
            <Logo className="h-10 w-10" />
            <div className="text-2xl font-bold text-black">doc</div>
            <div className="text-2xl sm:text-3xl font-bold text-blue-600">urum</div>
          </div>
          <div className="flex flex-col mt-6 items-start">
            <div className="text-[40px] font-extrabold bg-gradient-to-r from-blue-700 to-indigo-500 via-pink-500 inline-block text-transparent bg-clip-text">Hey guys 👋</div>
            <div className="text-[30px] text-slate-600 font-bold">{"let's discuss 💡"}</div>
          </div>
        </div>
        <div className="flex flex-col w-full ml-4 mt-2 justify-start">
          <div className="text-2xl text-blue-600 font-bold">Contact</div>
          <div className="text-lg text-slate-600 font-bold">docurumbusiness@gmail.com</div>
          <div onClick={() => router.push("/signup")} className="text-lg font-bold w-24 mt-2 hover:cursor-pointer text-white bg-blue-600 py-2 px-4 rounded-lg shadow-lg shadow-blue-200">
            Sign up
          </div>
          <div className="mt-8 mb-8 text-slate-600 text-sm font-bold">Copyright © 2023 Docurum, Inc. All rights reserved.</div>
        </div>
      </div>
    </>
  );
};

export default Home;
