import { zodResolver } from "@hookform/resolvers/zod";
import classNames from "classnames";
import Image from "next/image";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { z } from "zod";
import Logo from "../../components/Logo/Logo";

const nameSchema = z.string().min(3).max(80).trim();

const usernameSchema = z
  .string()
  .min(4)
  .max(20)
  // https://stackoverflow.com/questions/12018245/regular-expression-to-validate-username
  .regex(/^(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/gm)
  .trim()
  .transform((username) => username.toLocaleLowerCase());

const emailSchema = z.string().max(60).email().trim();

const passwordSchema = z
  .string()
  .min(8)
  .max(50)
  // https://stackoverflow.com/questions/19605150/regex-for-password-must-contain-at-least-eight-characters-at-least-one-number-a
  .regex(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/gm,
    "Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character."
  )
  .trim();

const registerSchema = z
  .object({
    name: nameSchema,
    username: usernameSchema,
    email: emailSchema,
    password: passwordSchema,
    confirmPassword: z.string().trim(),
    isDoctor: z.boolean().default(false),
  })
  .strict()
  .refine(
    ({ confirmPassword, password }) => {
      return confirmPassword === password;
    },
    {
      path: ["confirmPassword"],
      message: "Passwords don't match",
    }
  );

type registerSchemaType = z.infer<typeof registerSchema>;

const SignUp = () => {
  return (
    <div className="w-full flex min-h-screen select-none">
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
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
  const {
    reset,
    register,
    handleSubmit,
    getFieldState,
    formState: { errors, isSubmitting, isValidating },
  } = useForm<registerSchemaType>({
    mode: "onBlur",
    resolver: zodResolver(registerSchema),
  });
  const onSubmit: SubmitHandler<registerSchemaType> = (data) => {
    console.table(data);
    reset();
    setShowPassword(false);
    setShowConfirmPassword(false);
  };
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
                [getFieldState("username").isDirty && !errors.username && "!border-2 border-green-600 focus:!outline-green-600"]
              )}
              id="username"
              type="text"
              placeholder="Choose your username"
              {...register("username")}
            />
            {errors.username && <p className="text-red-500 text-sm italic">{errors.username.message}</p>}
            {getFieldState("username").isDirty && !errors.username && <p className="text-green-700 text-sm italic">Username available!</p>}
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
                  ["rounded w-full py-2 px-3 text-gray-700"],
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
          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 px-4 rounded-lg focus:outline-none text-lg disabled:opacity-80 disabled:cursor-not-allowed" type="submit" disabled={isSubmitting || isValidating}>
            Create account
          </button>
          <div className="text-center pt-6 flex gap-x-3 items-center justify-center">
            <span className="text-gray-500 font-medium">Already have an account?</span>
            <span className="font-semibold text-blue-600 hover:cursor-pointer">Log in</span>
          </div>
        </form>
      </div>
    </div>
  );
};
