import { NextPage } from "next";
import { useRouter } from "next/router";
import { IoIosSearch } from "react-icons/io";
import Logo from "../components/Logo/Logo";
import Image from "next/image";
import { QandASection } from "../components/QandASection";
import SearchBar from "../components/SearchBar";
import SEO from "../components/SEO";
import { AiFillFacebook, AiFillInstagram, AiFillLinkedin, AiOutlineSearch, AiOutlineTwitter } from "react-icons/ai";
import clickAnimation from "../animations/click.json";
import doctorAnimation from "../animations/doctor.json";
import doctionDancingAnimation from "../animations/doctor-dancing.json";
import doctorPushupAnimation from "../animations/doctor-push-ups.json";
import { MdHealthAndSafety, MdVerified } from "react-icons/md";
import Lottie from "react-lottie-player";
import Link from "next/link";

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
      {/* <div className="flex flex-row justify-center items-center">
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/G4h-YXu_0r8"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>
      </div> */}
      <div className="w-full flex flex-col items-center justify-center my-10">
        <div className="text-2xl md:text-4xl text-center mx-5 font-extrabold text-blue-600">
          Connect with your patients, share your
          <a className="text-3xl md:text-4xl text-center mx-5 font-extrabold bg-gradient-to-r from-blue-700 to-indigo-500 via-pink-500 inline-block text-transparent bg-clip-text">unique link</a>across
          all the social sites
        </div>
        <div className="flex flex-col items-center md:flex-row w-full mt-20">
          <div className="w-full md:w-1/2 flex flex-row items-center justify-center">
            <Lottie animationData={doctorAnimation} play className="w-96 h-96" />
          </div>
          <div className="w-11/12 md:w-1/2 flex flex-col items-center md:items-start justify-center">
            <div className="flex flex-col w-full md:w-[500px] h-24">
              <div className="text-lg md:text-xl font-bold text-slate-800">Quick Consultations 🚀</div>
              <div className="text-sm md:text-lg mt-1 font-bold text-slate-600">Summarize previous prescriptions, reports and get a detailed patient history beforehand.</div>
            </div>
            <div className="flex flex-col w-full md:w-[500px] h-24 mt-1 md:mt-5">
              <div className="text-lg md:text-xl font-bold text-slate-800">Generate more revenue 💲</div>
              <div className="text-sm md:text-lg mt-1 font-bold text-slate-600">Take consultations from high value patients with your brand and make it your advantage.</div>
            </div>
            <div className="flex flex-col w-full md:w-[500px] h-24 mt-1 md:mt-5">
              <div className="text-lg md:text-xl font-bold text-slate-800">Relationship 💝</div>
              <div className="text-sm md:text-lg mt-1 font-bold text-slate-600">Never lose your patients, if you happen to relocate due to hospital/job change or other reasons.</div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full flex flex-col items-center justify-center my-10">
        <div className="text-2xl md:text-4xl mt-10 text-center mx-5 font-extrabold text-blue-600">
          Deliver
          <a className="text-3xl md:text-4xl text-center mx-5 font-extrabold bg-gradient-to-r from-blue-700 to-indigo-500 via-pink-500 inline-block text-transparent bg-clip-text">great experience</a>
          to your patients and take back control
        </div>
        <div className="flex flex-col items-center md:flex-row w-full mt-20">
          <div className="w-11/12 md:w-1/2 flex flex-col items-center md:items-end md:pr-20 justify-center">
            <div className="flex flex-col w-full md:w-[500px] h-24">
              <div className="text-lg md:text-xl font-bold text-slate-800">Avoid Burnout 🔥</div>
              <div className="text-sm md:text-lg mt-1 font-bold text-slate-600">Only work when you want to, set your consultation timings according to your availability.</div>
            </div>
            <div className="flex flex-col w-full md:w-[500px] h-24 mt-1 md:mt-5">
              <div className="text-lg md:text-xl font-bold text-slate-800">Consult patients worldwide 🌎</div>
              <div className="text-sm md:text-lg mt-1 font-bold text-slate-600">Take consultations from around the world beyond the geographical borders.</div>
            </div>
            <div className="flex flex-col w-full md:w-[500px] h-24 mt-1 md:mt-5">
              <div className="text-lg md:text-xl font-bold text-slate-800">Analytics 📊</div>
              <div className="text-sm md:text-lg mt-1 font-bold text-slate-600">Compare patient count, revenue generated and many metrics to optimize your pricing.</div>
            </div>
          </div>
          <div className="w-full md:w-1/2 flex flex-row items-center justify-center">
            {/* <Lottie animationData={doctorPushupAnimation} play className="w-96 h-96" /> */}
            <Lottie animationData={doctionDancingAnimation} play className="w-96 h-96" />
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
          <div className="flex flex-row">
            <Link className="p-2 hover:cursor-pointer" href={"https://www.linkedin.com/company/docurum/?viewAsMember=true"} rel="noopener noreferrer" target="_blank">
              <AiFillLinkedin size={30} color="#2548f5" />
            </Link>
            <Link className="p-2 hover:cursor-pointer" href={"https://twitter.com/docurum"} rel="noopener noreferrer" target="_blank">
              <AiOutlineTwitter size={30} color="#2548f5" />
            </Link>
            <Link className="p-2 hover:cursor-pointer" href={"https://www.instagram.com/docurum/"} rel="noopener noreferrer" target="_blank">
              <AiFillInstagram size={30} color="#2548f5" />
            </Link>
            <Link className="p-2 hover:cursor-pointer" href={"https://www.facebook.com/groups/1393265961421378"} rel="noopener noreferrer" target="_blank">
              <AiFillFacebook size={30} color="#2548f5" />
            </Link>
          </div>
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
            <div className="text-[35px] font-extrabold bg-gradient-to-r from-blue-700 to-indigo-500 via-pink-500 inline-block text-transparent bg-clip-text">Hey guys 👋</div>
            <div className="text-[25px] text-slate-600 font-bold">{"let's discuss 💡"}</div>
          </div>
        </div>
        <div className="flex flex-col w-full ml-4 justify-start">
          <div className="text-2xl text-blue-600 font-bold">Contact</div>
          <div className="text-lg text-slate-600 font-bold">docurumbusiness@gmail.com</div>
          <div className="flex flex-row">
            <Link className="p-2 hover:cursor-pointer" href={"https://www.linkedin.com/company/docurum/?viewAsMember=true"} rel="noopener noreferrer" target="_blank">
              <AiFillLinkedin size={30} color="#2548f5" />
            </Link>
            <Link className="p-2 hover:cursor-pointer" href={"https://twitter.com/docurum"} rel="noopener noreferrer" target="_blank">
              <AiOutlineTwitter size={30} color="#2548f5" />
            </Link>
            <Link className="p-2 hover:cursor-pointer" href={"https://www.instagram.com/docurum/"} rel="noopener noreferrer" target="_blank">
              <AiFillInstagram size={30} color="#2548f5" />
            </Link>
            <Link className="p-2 hover:cursor-pointer" href={"https://www.facebook.com/groups/1393265961421378"} rel="noopener noreferrer" target="_blank">
              <AiFillFacebook size={30} color="#2548f5" />
            </Link>
          </div>
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
