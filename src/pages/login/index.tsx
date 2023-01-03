import Image from "next/image";
import Link from "next/link";
import { AiFillEyeInvisible } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import Logo from "../../components/Logo/Logo";
import SEO from "../../components/SEO";

const Login = () => {
  return (
    <div className="w-full flex min-h-screen select-none">
      <SEO title="Login" />
      <LeftHalf />
      <RightHalf />
    </div>
  );
};

export default Login;

const LeftHalf = () => {
  return (
    <div className="w-1/2 flex">
      <div className="flex-grow bg-blue-200 m-6 rounded-lg relative" style={{ background: "linear-gradient(45deg, rgba(14,5,161,1) 0%, rgba(29,29,186,1) 41%, rgba(0,212,255,1) 100%)" }}>
        <Image src="/doc.png" alt="docurum" width={560} height={560} className="absolute bottom-0 left-1/2 translate-x-[-50%]" />
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
      <div className="text-3xl font-bold">Log In to your account</div>
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
            <label className="block mb-2" htmlFor="username">
              Email address / Username
            </label>
            <input className="border border-gray-300 rounded w-full py-2 px-3 text-gray-700 focus:outline-blue-600" id="username" type="text" placeholder="Enter your email address / username" />
          </div>
          <div className="mb-3">
            <label className="block mb-2" htmlFor="password">
              Password
            </label>
            <div className="relative">
              <input className="border border-gray-300 rounded w-full py-2 px-3 text-gray-700 focus:outline-blue-600 pr-10" id="password" type="password" placeholder="Enter your password" />
              <div className="absolute top-1/2 right-1 translate-x-[-50%] translate-y-[-50%]">
                <AiFillEyeInvisible size={20} />
              </div>
            </div>
          </div>
          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 px-4 rounded-lg focus:outline-none text-lg" type="button">
            Create account
          </button>
          <div className="text-center p-4 flex gap-x-3 items-center justify-center">
            <span className="font-semibold text-blue-600">Forgot your password?</span>
          </div>
          <div className="text-center flex gap-x-3 items-center justify-center">
            <span className="text-gray-500 font-medium">{"Don't have an account?"}</span>
            <Link href="/signup">
              <span className="font-semibold text-blue-600 hover:cursor-pointer">Create Account</span>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};
