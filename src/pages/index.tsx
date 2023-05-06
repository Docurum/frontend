import { NextPage } from "next";
import { useRouter } from "next/router";
import { IoIosSearch } from "react-icons/io";
import Logo from "../components/Logo/Logo";
import Image from "next/image";
import { QandASection } from "../components/QandASection";
import SearchBar from "../components/SearchBar";
import SEO from "../components/SEO";
import { AiOutlineSearch } from "react-icons/ai";
import clickAnimation from "../animations/click.json";
import { MdHealthAndSafety, MdVerified } from "react-icons/md";
import Lottie from "react-lottie-player";

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
      <div className="flex flex-col lg:flex-row justify-between items-center">
        <div className="flex flex-col w-full lg:w-1/2 ml-10 lg:ml-20">
          <div className="relative">
            <div className="flex flex-col items-start mt-10 lg:mt-0">
              <div className="text-[50px] font-extrabold bg-gradient-to-r from-blue-700 to-indigo-500 via-pink-500 inline-block text-transparent bg-clip-text">One-click</div>
              <div className="text-[35px] text-slate-600 font-bold">consultation with doctors</div>
            </div>
            <div
              onClick={() => router.push("/signup")}
              className="mt-10 text-xl font-bold w-[113px] animate-bounce text-white bg-blue-600 py-2 px-4 rounded-lg shadow-lg shadow-blue-200 hover:cursor-pointer"
            >
              Join now
            </div>
            <div className="absolute top-36 max-lg:top-44 hover:cursor-pointer" onClick={() => router.push("/signup")}>
              <Lottie animationData={clickAnimation} play className="w-32 h-32" />
            </div>
          </div>
        </div>
        <div className="hidden lg:block relative w-full lg:w-1/2 h-[450px] lg:mr-36 mb-10 lg:mb-20">
          <div className="bg-blue-600 w-[350px] lg:w-[430px] absolute right-0 bottom-0 h-80 bg-semicircle-rounded shadow-lg shadow-blue-300"></div>
          <div className="absolute bottom-0 right-[260px] mb-5">
            <div className="flex flex-row items-center h-16 w-56 mb-4 bg-blue-50 shadow-md shadow-blue-500 rounded-md">
              <div className="flex flex-row  items-center justify-center p-1 bg-blue-600 opacity-100 h-10 w-10 ml-2 rounded-full">
                <MdHealthAndSafety size={25} color="white" />
              </div>
              <div className="text-slate-800 ml-3 font-bold">Find the best doctors</div>
            </div>
            <div className="flex flex-row items-center h-16 w-56 mb-4 bg-blue-50 shadow-md shadow-blue-500 rounded-md">
              <div className="flex flex-row  items-center justify-center p-1 bg-blue-600 opacity-100 h-10 w-10 ml-2 rounded-full">
                <MdVerified size={25} color="white" />
              </div>
              <div className="text-slate-800 ml-3 font-bold">Get the solution</div>
            </div>
            <div className="flex flex-row items-center h-16 w-56 border-[1px] border-slate-400 bg-[rgba(191, 219, 254, 0.1)] shadow-md shadow-blue-500 rounded-md backdrop-blur-sm">
              <div className="flex flex-row  items-center justify-center p-1 bg-blue-600 opacity-100 h-10 w-10 ml-2 rounded-full">
                <AiOutlineSearch size={25} color="white" />
              </div>
              <div className="text-white ml-3 font-bold">Search for topics</div>
            </div>
          </div>
          <div className="absolute bottom-0 right-[-83px]">
            <Image className="rounded-lg" src="/doc.png" alt="female doctor" height={400} width={370} />
          </div>
        </div>
        <div className="hidden max-lg:block relative w-full lg:w-1/2 h-[290px] mb-10 mr-4">
          <div className="bg-blue-600 w-[310px] absolute right-0  bottom-0 h-52 bg-semicircle-rounded shadow-lg shadow-blue-300"></div>

          <div className="absolute bottom-0 right-[-20px]">
            <Image className="rounded-lg" src="/doc.png" alt="female doctor" height={400} width={230} />
          </div>
          <div className="absolute bottom-0 right-[150px] mb-5">
            <div className="flex flex-row items-center h-14 w-52 mb-3 bg-blue-50 shadow-md shadow-blue-500 rounded-md">
              <div className="flex flex-row  items-center justify-center p-1 bg-blue-600 opacity-100 h-8 w-8 ml-2 rounded-full">
                <MdHealthAndSafety size={20} color="white" />
              </div>
              <div className="text-slate-800 ml-3 text-sm font-bold">Find the best doctors</div>
            </div>
            <div className="flex flex-row items-center h-14 w-52 mb-3 bg-blue-50 shadow-md shadow-blue-500 rounded-md">
              <div className="flex flex-row  items-center justify-center p-1 bg-blue-600 opacity-100 h-8 w-8 ml-2 rounded-full">
                <MdVerified size={20} color="white" />
              </div>
              <div className="text-slate-800 text-sm ml-3 font-bold">Get the solution</div>
            </div>
            <div className="flex flex-row items-center h-14 w-52 border-[1px] border-slate-400 bg-[rgba(191, 219, 254, 0.1)] shadow-md shadow-blue-500 rounded-md backdrop-blur-sm">
              <div className="flex flex-row  items-center justify-center p-1 bg-blue-600 opacity-100 h-8 w-8 ml-2 rounded-full">
                <AiOutlineSearch size={20} color="white" />
              </div>
              <div className="text-slate-800 ml-3 text-sm font-bold">Search for topics</div>
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
          <div className="text-lg font-bold w-24 mt-6 hover:cursor-pointer text-white bg-blue-600 py-2 px-4 rounded-lg shadow-lg shadow-blue-200" onClick={() => router.push("/signup")}>
            Sign up
          </div>
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
