import { zodResolver } from "@hookform/resolvers/zod";
import classNames from "classnames";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { loginUser } from "../../api";
import Logo from "../../components/Logo/Logo";
import SEO from "../../components/SEO";
import loginSchema from "../../schemas/loginSchema";
import { googleProfile } from "../../types/googleProfile";
import { loginSchemaType } from "../../types/login";
import getGoogleOAuthURL from "../../utils/getGoogleUrl";

export function getServerSideProps(ctx: any) {
  const googleUser = ctx.req.cookies.googleUser ? JSON.parse(ctx.req.cookies.googleUser) : null;
  return { props: { googleUser } };
}

const Login = ({ googleUser }: { googleUser: googleProfile | null }) => {
  return (
    <div className="w-full flex min-h-screen select-none">
      <SEO title="Login" />
      <LeftHalf />
      <RightHalf googleUser={googleUser} />
    </div>
  );
};

export default Login;

const LeftHalf = () => {
  return (
    <div className="hidden w-1/2 md:flex">
      <div className="flex-grow bg-blue-200 m-6 rounded-lg relative" style={{ background: "linear-gradient(45deg, rgba(14,5,161,1) 0%, rgba(29,29,186,1) 41%, rgba(0,212,255,1) 100%)" }}>
        <Image src="/doc.png" alt="docurum" width={560} height={560} className="absolute bottom-0 left-1/2 translate-x-[-50%]" />
      </div>
    </div>
  );
};

const RightHalf = ({ googleUser }: { googleUser: googleProfile | null }) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const router = useRouter();

  const {
    reset,
    register,
    handleSubmit,
    setError,
    setValue,
    formState: { errors, isSubmitting, isValidating },
  } = useForm<loginSchemaType>({
    mode: "onChange",
    resolver: zodResolver(loginSchema),
    defaultValues: {
      emailOrUsername: googleUser?.email || "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<loginSchemaType> = async (formData) => {
    console.table(formData);
    try {
      const response = await loginUser(formData);

      const { data } = response;
      if (response.status === 200) {
        localStorage.setItem("token", data.message.accessToken);
        toast.success("Login Successful", { id: data.message });
        router.replace("/home");
      } else if (response.status !== 200) {
        toast.success(data.message, { id: data.message });
      }

      reset();
      // As reset will fallback to defaultValues
      // so they have to be cleared explicitly
      setValue("emailOrUsername", "");
      setShowPassword(false);
    } catch (err: any) {
      if (err.response) {
        const errorMessage = err.response.data.message;
        if (Array.isArray(errorMessage)) {
          errorMessage.forEach((error: { message: string; path: any }) => {
            setError(error.path[0], {
              message: error.message,
            });
          });
        } else {
          toast.error(errorMessage, { id: errorMessage });
        }
      } else {
        toast.error("Unable to Connect to Server", { id: "server-conn-fail" });
      }
    }
    reset();
    // As reset will fallback to defaultValues
    // so they have to be cleared explicitly
    setValue("emailOrUsername", "");
    setShowPassword(false);
  };

  return (
    <div className="w-full px-10 md:px-5 md:w-1/2  flex flex-col items-center justify-center gap-y-2.5 my-12">
      <Link href="/">
        <div
          className="bg-white border-2 border-gray-300 p-1 rounded-lg hover:cursor-pointer"
          style={{ background: "linear-gradient(0deg, rgba(221,222,225,1) 0%, rgba(255,255,255,0.5504073455554097) 100%)" }}
        >
          <Logo className="w-10 h-10" />
        </div>
      </Link>
      <div className="text-3xl font-bold text-center">Log In to your account</div>
      <div className="text-gray-500 text-center">Enter the fields below to get started</div>
      {/* <button
        className="flex w-full max-w-md bg-white items-center justify-center gap-x-3 font-semibold text-lg py-2 rounded-lg shadow border border-gray-300 hover:bg-gray-100"
        onClick={() => {
          window.location.href = getGoogleOAuthURL("login");
        }}
      >
        <FcGoogle size={30} />
        <span>Sign in with Google</span>
      </button> */}
      <div className="relative mb-4 mt-2 w-full max-w-md">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-400"></div>
        </div>
        {/* <div className="relative flex justify-center">
          <span className="px-6 text-gray-700 bg-white">or</span>
        </div> */}
      </div>
      <div className="w-full max-w-md">
        <form className="bg-white" onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <label className="block mb-2" htmlFor="emailOrUsername">
              Email address / Username
            </label>
            <input
              className={classNames(
                ["rounded w-full py-2 px-3 text-gray-700"],
                [errors.emailOrUsername ? "border-2 border-red-500 focus:outline-red-600" : "border border-gray-300 focus:outline-blue-600"]
              )}
              id="emailOrUsername"
              type="text"
              placeholder="Enter your email address / username"
              {...register("emailOrUsername")}
            />
            {errors.emailOrUsername && <p className="text-red-500 text-sm italic">{errors.emailOrUsername.message}</p>}
          </div>
          <div className="mb-3">
            <label className="block mb-2" htmlFor="password">
              Password
            </label>
            <div className="relative">
              <input
                className={classNames(
                  ["rounded w-full py-2 px-3 text-gray-700 pr-10"],
                  [errors.password ? "border-2 border-red-500 focus:outline-red-600" : "border border-gray-300 focus:outline-blue-600"]
                )}
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                {...register("password")}
              />
              <div
                className="absolute top-1/2 right-1 translate-x-[-50%] translate-y-[-50%] hover:cursor-pointer"
                onClick={() => {
                  setShowPassword((showPassword) => !showPassword);
                }}
              >
                {showPassword ? <AiFillEye size={20} /> : <AiFillEyeInvisible size={20} />}
              </div>
            </div>
            {errors.password && <p className="text-red-500 text-sm italic">{errors.password.message}</p>}
          </div>
          <button
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 px-4 rounded-lg focus:outline-none text-lg disabled:opacity-80 disabled:cursor-not-allowed"
            type="submit"
            disabled={isSubmitting || isValidating}
          >
            Log In
          </button>
          <div className="text-center p-4 flex gap-x-3 items-center justify-center">
            <Link href="/forgot-password">
              <span className="font-semibold text-blue-600">Forgot your password?</span>
            </Link>
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
