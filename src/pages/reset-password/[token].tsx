import { zodResolver } from "@hookform/resolvers/zod";
import classNames from "classnames";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import Lottie from "react-lottie-player";
import { z } from "zod";
import failedAnimation from "../../animations/94303-failed.json";
import { checkResetPasswordTokenExists, resetPassword } from "../../api";
import Logo from "../../components/Logo/Logo";
import SEO from "../../components/SEO";
import { passwordSchema } from "../../schemas";

export async function getServerSideProps(ctx: any) {
  const { token } = ctx.query;
  let isError: boolean = false;
  let errorMsg: string = "";
  try {
    await checkResetPasswordTokenExists(token);
  } catch (err: any) {
    console.log(err);
    if (err.response) {
      errorMsg = err.response.data.message;
    }
    isError = true;
  }
  return { props: { isError, errorMsg, token } };
}

const style = {
  backgroundImage: "radial-gradient( circle farthest-corner at 10% 20%,  rgba(90,92,106,1) 0%, rgba(32,45,58,1) 81.3% )",
};

const ResetPassword = ({ isError, errorMsg, token }: { isError: boolean; errorMsg: string; token: string }) => {
  if (isError) {
    return (
      <div className="h-screen w-full" style={style}>
        <SEO title="Reset Password - Docurum" />
        <div className="flex flex-col h-screen justify-center items-center text-center">
          <div className="w-48 sm:w-56 h-18 sm:h-56">
            <Lottie loop={false} animationData={failedAnimation} play />
          </div>
          <div className="text-white text-2xl sm:text-3xl px-6 font-semibold">{errorMsg}</div>
        </div>
      </div>
    );
  }
  return <div>{MainComponent({ token })}</div>;
};

const MainComponent = ({ token }: { token: string }) => {
  return (
    <div className="w-full flex min-h-screen select-none">
      <SEO title="Reset Password - Docurum" />
      <LeftHalf />
      <RightHalf token={token} />
    </div>
  );
};

const LeftHalf = () => {
  return (
    <div className="hidden w-1/2 md:flex">
      <div className="flex-grow bg-blue-200 m-6 rounded-lg relative" style={{ background: "linear-gradient(45deg, rgba(14,5,161,1) 0%, rgba(29,29,186,1) 41%, rgba(0,212,255,1) 100%)" }}>
        <Image src="/doc.png" alt="docurum" width={560} height={560} className="absolute bottom-0 left-1/2 translate-x-[-50%]" />
      </div>
    </div>
  );
};

const resetPasswordSchema = z
  .object({
    token: z.string().min(1, "Token is missing in URL"),
    password: passwordSchema,
    confirmPassword: passwordSchema,
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

type resetPasswordSchemaType = z.infer<typeof resetPasswordSchema>;

const RightHalf = ({ token }: { token: string }) => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);

  const {
    reset,
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting, isValidating },
  } = useForm<resetPasswordSchemaType>({
    mode: "onChange",
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      token,
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit: SubmitHandler<resetPasswordSchemaType> = async (formData) => {
    console.table(formData);
    try {
      const { data } = await resetPassword(formData);
      reset();
      setShowPassword(false);
      setShowConfirmPassword(false);
      router.replace("/login");
      toast.success(data.message, { id: data.message });
    } catch (err: any) {
      if (err.response) {
        const errorMessage = err.response.data.message;
        if (Array.isArray(errorMessage)) {
          errorMessage.forEach((error: { message: string; path: [keyof resetPasswordSchemaType] }) => {
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
  };

  return (
    <div className="w-full px-10 md:px-5 md:w-1/2 flex flex-col items-center justify-center gap-y-3 my-12">
      <Link href="/">
        <div
          className="bg-white border-2 border-gray-300 p-1 rounded-lg hover:cursor-pointer"
          style={{ background: "linear-gradient(0deg, rgba(221,222,225,1) 0%, rgba(255,255,255,0.5504073455554097) 100%)" }}
        >
          <Logo className="w-10 h-10" />
        </div>
      </Link>
      <div className="text-3xl font-bold text-center">Reset your Password</div>
      <div className="text-gray-500 text-center">Enter a new Password to continue</div>
      <div className="w-full max-w-md">
        <form className="bg-white" onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-5">
            <label className="block mb-2" htmlFor="password">
              New Password
            </label>
            <div className="relative">
              <input
                className={classNames(
                  ["rounded w-full py-2 px-3 text-gray-700 pr-10"],
                  [errors.password ? "border-2 border-red-500 focus:outline-red-600" : "border border-gray-300 focus:outline-blue-600"]
                )}
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Create a new password"
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
              Confirm New Password
            </label>
            <div className="relative">
              <input
                className={classNames(
                  ["rounded w-full py-2 px-3 text-gray-700 pr-10"],
                  [errors.confirmPassword ? "border-2 border-red-500 focus:outline-red-600" : "border border-gray-300 focus:outline-blue-600"]
                )}
                id="confirmpassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Enter your new password again"
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
          <button
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 px-4 rounded-lg focus:outline-none text-lg disabled:opacity-80 disabled:cursor-not-allowed mt-3"
            type="submit"
            disabled={isSubmitting || isValidating}
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
