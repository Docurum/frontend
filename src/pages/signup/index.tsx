import Image from "next/image";
import { AiFillEyeInvisible } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import Logo from "../../components/Logo/Logo";

const SignUp = () => {
  return (
    <div className="w-full flex flex-row min-h-screen" style={{
      maxWidth:'1920px'
    }}>
      <LeftHalf />
      <RightHalf />
    </div>
  );
};

export default SignUp;

const LeftHalf = () => {
  return (
    <div className="w-1/2 flex">
      <div className="flex-grow bg-blue-200 m-6 rounded-lg relative" style={{ background: "linear-gradient(45deg, rgba(14,5,161,1) 0%, rgba(29,29,186,1) 41%, rgba(0,212,255,1) 100%)" }}>
        <Image src="/doc.png" alt="docurum" width={570} height={900} className="absolute bottom-0 left-1/2 translate-x-[-50%]" />
      </div>
    </div>
  );
};

const RightHalf = () => {
  return (
    <div className="w-1/2 flex flex-col items-center justify-center gap-y-2.5 my-12">
      <div className="bg-white border-2 border-gray-300 p-1 rounded-lg" style={{ background: "linear-gradient(0deg, rgba(221,222,225,1) 0%, rgba(255,255,255,0.5504073455554097) 100%)" }}>
        <Logo className="w-10 h-10" />
      </div>
      <div className="text-3xl font-bold">Create your account</div>
      <div className="text-gray-500">Enter the fields below to get started</div>
      <button className="flex w-full max-w-md bg-white items-center justify-center gap-x-3 font-semibold text-lg py-2 rounded-lg shadow border border-gray-300 hover:bg-gray-100">
        <FcGoogle size={30} />
        <span>Sign in with Google</span>
      </button>
      <div className="relative mb-4 mt-2 w-full max-w-md">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-400"></div>
        </div>
        <div className="relative flex justify-center">
          <span className="px-6 text-gray-700 bg-white">or</span>
        </div>
      </div>
      <div className="w-full max-w-md">
        <form className="bg-white">
          <div className="mb-3">
            <label className="block mb-2" htmlFor="fullname">
              Full name
            </label>
            <input className="border border-gray-300 rounded w-full py-2 px-3 text-gray-700 focus:outline-blue-600" id="fullname" type="text" placeholder="Enter your name" />
          </div>
          <div className="mb-3">
            <label className="block mb-2" htmlFor="username">
              Username
            </label>
            <input className="border border-gray-300 rounded w-full py-2 px-3 text-gray-700 focus:outline-blue-600" id="username" type="text" placeholder="Choose your username" />
          </div>
          <div className="mb-3">
            <label className="block mb-2" htmlFor="email">
              Email address
            </label>
            <input className="border border-gray-300 rounded w-full py-2 px-3 text-gray-700 focus:outline-blue-600" id="email" type="text" placeholder="Enter your email" />
          </div>
          <div className="mb-3">
            <label className="block mb-2" htmlFor="password">
              Password
            </label>
            <div className="relative">
              <input className="border border-gray-300 rounded w-full py-2 px-3 text-gray-700 focus:outline-blue-600 pr-10" id="password" type="password" placeholder="Create a password" />
              <div className="absolute top-1/2 right-1 translate-x-[-50%] translate-y-[-50%]">
                <AiFillEyeInvisible size={20} />
              </div>
            </div>
          </div>
          <div className="mb-3">
            <label className="block mb-2" htmlFor="confirmpassword">
              Confirm password
            </label>
            <div className="relative">
              <input className="border border-gray-300 rounded w-full py-2 px-3 text-gray-700 focus:outline-blue-600 pr-10" id="password" type="password" placeholder="Enter your password again" />
              {/* AiFillEye */}
              <div className="absolute top-1/2 right-1 translate-x-[-50%] translate-y-[-50%]">
                <AiFillEyeInvisible size={20} />
              </div>
            </div>
          </div>
          <div className="mb-3 flex w-full gap-x-5 items-center">
            <input className="rounded border border-gray-300 mb-2 h-5 w-5 text-gray-700 focus:outline-blue-600" id="isDoctor" type="checkbox" />
            <label className="block mb-2" htmlFor="isDoctor">
              Are you a Doctor ?
            </label>
          </div>
          {/* <div className="mb-3">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="******************"
            />
            <p className="text-red-500 text-xs italic">Please choose a password.</p>
          </div> */}
          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 px-4 rounded-lg focus:outline-none text-lg" type="button">
            Create account
          </button>
          <div className="text-center pt-6 flex gap-x-3 items-center justify-center">
            <span className="text-gray-500 font-medium">Already have an account?</span>
            <span className="font-semibold text-blue-600">Log in</span>
          </div>
        </form>
      </div>
    </div>
  );
};
