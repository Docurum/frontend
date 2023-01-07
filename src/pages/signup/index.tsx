import { zodResolver } from "@hookform/resolvers/zod";
import classNames from "classnames";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { checkUsernameExists, registerUser } from "../../api";
import Logo from "../../components/Logo/Logo";
import SEO from "../../components/SEO";
import registerSchema from "../../schemas/registerSchema";
import { googleProfile } from "../../types/googleProfile";
import { registerSchemaType } from "../../types/signup";
import capsEveryFirstLetter from "../../utils/capsEveryFirstLetter";
import getGoogleOAuthURL from "../../utils/getGoogleUrl";

export function getServerSideProps(ctx: any) {
  const googleUser = ctx.req.cookies.googleUser ? JSON.parse(ctx.req.cookies.googleUser) : null;
  return { props: { googleUser } };
}

const SignUp = ({ googleUser }: { googleUser: googleProfile | null }) => {
  return (
    <div className="w-full flex min-h-screen select-none">
      <SEO title="Signup" />
      <LeftHalf />
      <RightHalf googleUser={googleUser} />
    </div>
  );
};

export default SignUp;

const LeftHalf = () => {
  return (
    <div className="hidden w-1/2 md:flex">
      <div className="flex-grow bg-blue-200 m-6 rounded-lg relative" style={{ background: "linear-gradient(45deg, rgba(14,5,161,1) 0%, rgba(29,29,186,1) 41%, rgba(0,212,255,1) 100%)" }}>
        <Image src="/doc.png" alt="docurum" width={570} height={900} className="absolute bottom-0 left-1/2 translate-x-[-50%]" />
      </div>
    </div>
  );
};

const RightHalf = ({ googleUser }: { googleUser: googleProfile | null }) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
  const [isUsernameAvailable, setIsUsernameAvailable] = useState<boolean>(false);

  const {
    reset,
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors, isSubmitting, isValidating },
  } = useForm<registerSchemaType>({
    mode: "onChange",
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: capsEveryFirstLetter((googleUser?.name || "").toLowerCase()),
      username: "",
      email: googleUser?.email || "",
      password: "",
      confirmPassword: "",
      isDoctor: false,
    },
  });

  const onSubmit: SubmitHandler<registerSchemaType> = async (formData) => {
    console.table(formData);
    try {
      const { data } = await registerUser(formData);
      toast.success(data.message, { id: data.message });
      setIsUsernameAvailable(false);
      reset();
      setShowPassword(false);
      setShowConfirmPassword(false);
    } catch (err: any) {
      const errorMessage = err.response.data.message;
      errorMessage.forEach((error: { message: string; path: [keyof registerSchemaType] }) => {
        setError(error.path[0], {
          message: error.message,
        });
      });
    }
  };

  const checkUsernameExistsHandler = async (e: React.ChangeEvent<HTMLInputElement>): Promise<void> => {
    try {
      await checkUsernameExists({ username: e.target.value });
      clearErrors("username");
      setIsUsernameAvailable(true);
    } catch (err: any) {
      setIsUsernameAvailable(false);
      const errorMessage = err.response.data.message[0] as { message: string; path: [keyof registerSchemaType] };
      setError(errorMessage.path[0], {
        message: errorMessage.message,
      });
    }
  };

  return (
    <div className="w-full px-10 md:px-5 md:w-1/2 flex flex-col items-center justify-center gap-y-2.5 my-12">
      <div className="bg-white border-2 border-gray-300 p-1 rounded-lg" style={{ background: "linear-gradient(0deg, rgba(221,222,225,1) 0%, rgba(255,255,255,0.5504073455554097) 100%)" }}>
        <Logo className="w-10 h-10" />
      </div>
      <div className="text-3xl font-bold">Create your account</div>
      <div className="text-gray-500">Enter the fields below to get started</div>
      <button
        className="flex w-full max-w-md bg-white items-center justify-center gap-x-3 font-semibold text-lg py-2 rounded-lg shadow border border-gray-300 hover:bg-gray-100"
        onClick={() => {
          window.location.href = getGoogleOAuthURL("signup");
        }}
      >
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
        <form className="bg-white" onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <label className="block mb-2" htmlFor="fullname">
              Full name
            </label>
            <input
              className={classNames(["rounded w-full py-2 px-3 text-gray-700"], [errors.name ? "border-2 border-red-500 focus:outline-red-600" : "border border-gray-300 focus:outline-blue-600"])}
              id="fullname"
              type="text"
              placeholder="Enter your name"
              {...register("name")}
            />
            {errors.name && <p className="text-red-500 text-sm italic">{errors.name.message}</p>}
          </div>
          <div className="mb-3">
            <label className="block mb-2" htmlFor="username">
              Username
            </label>
            <input
              className={classNames(
                ["rounded w-full py-2 px-3 text-gray-700"],
                [errors.username ? "border-2 border-red-500 focus:outline-red-600" : "border border-gray-300 focus:outline-blue-600"],
                [isUsernameAvailable && !errors.username && "!border-2 border-green-600 focus:!outline-green-600"]
              )}
              id="username"
              type="text"
              placeholder="Choose your username"
              {...register("username")}
              onChange={checkUsernameExistsHandler}
            />
            {errors.username && <p className="text-red-500 text-sm italic">{errors.username.message}</p>}
            {isUsernameAvailable && !errors.username && <p className="text-green-700 text-sm italic">Username available!</p>}
          </div>
          <div className="mb-3">
            <label className="block mb-2" htmlFor="email">
              Email address
            </label>
            <input
              className={classNames(["rounded w-full py-2 px-3 text-gray-700"], [errors.email ? "border-2 border-red-500 focus:outline-red-600" : "border border-gray-300 focus:outline-blue-600"])}
              id="email"
              type="text"
              placeholder="Enter your email"
              {...register("email")}
            />
            {errors.email && <p className="text-red-500 text-sm italic">{errors.email.message}</p>}
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
                placeholder="Create a password"
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
          <div className="mb-3">
            <label className="block mb-2" htmlFor="confirmpassword">
              Confirm password
            </label>
            <div className="relative">
              <input
                className={classNames(
                  ["rounded w-full py-2 px-3 text-gray-700 pr-10"],
                  [errors.confirmPassword ? "border-2 border-red-500 focus:outline-red-600" : "border border-gray-300 focus:outline-blue-600"]
                )}
                id="confirmpassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Enter your password again"
                {...register("confirmPassword")}
              />
              <div
                className="absolute top-1/2 right-1 translate-x-[-50%] translate-y-[-50%] hover:cursor-pointer"
                onClick={() => {
                  setShowConfirmPassword((showConfirmPassword) => !showConfirmPassword);
                }}
              >
                {showConfirmPassword ? <AiFillEye size={20} /> : <AiFillEyeInvisible size={20} />}
              </div>
            </div>
            {errors.confirmPassword && <p className="text-red-500 text-sm italic">{errors.confirmPassword.message}</p>}
          </div>
          <div className="mb-3 flex w-full gap-x-5 items-center">
            <input className="rounded border border-gray-300 mb-2 h-5 w-5 text-gray-700 focus:outline-blue-600 hover:cursor-pointer" id="isDoctor" type="checkbox" {...register("isDoctor")} />
            <label className="block mb-2" htmlFor="isDoctor">
              Are you a Doctor ?
            </label>
          </div>
          <button
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 px-4 rounded-lg focus:outline-none text-lg disabled:opacity-80 disabled:cursor-not-allowed"
            type="submit"
            disabled={isSubmitting || isValidating}
          >
            Create account
          </button>
          <div className="text-center pt-6 flex gap-x-3 items-center justify-center">
            <span className="text-gray-500 font-medium">Already have an account?</span>
            <Link href="/login">
              <span className="font-semibold text-blue-600 hover:cursor-pointer">Log in</span>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};
