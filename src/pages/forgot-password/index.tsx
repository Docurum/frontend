import { zodResolver } from "@hookform/resolvers/zod";
import classNames from "classnames";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import Lottie from "react-lottie-player";
import emailAnimation from "../../animations/87580-email-icon-animation.json";
import { sendForgotPasswordMail } from "../../api";
import Logo from "../../components/Logo/Logo";
import SEO from "../../components/SEO";
import { emailSchemaType, emailValidation } from "../../types/login";

const ForgotPassword = () => {
  return (
    <div className="w-full flex min-h-screen select-none">
      <SEO title="Forgot Password - Docurum" />
      <LeftHalf />
      <RightHalf />
    </div>
  );
};

export default ForgotPassword;

const LeftHalf = () => {
  return (
    <div className="hidden w-1/2 md:flex">
      <div className="flex-grow bg-blue-200 m-6 rounded-lg relative" style={{ background: "linear-gradient(45deg, rgba(14,5,161,1) 0%, rgba(29,29,186,1) 41%, rgba(0,212,255,1) 100%)" }}>
        <Image src="/doc.png" alt="docurum" width={560} height={560} className="absolute bottom-0 left-1/2 translate-x-[-50%]" />
      </div>
    </div>
  );
};

const RightHalf = () => {
  const [step, setStep] = useState<"one" | "two">("one");

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValidating },
  } = useForm<emailSchemaType>({
    mode: "onChange",
    resolver: zodResolver(emailValidation),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit: SubmitHandler<emailSchemaType> = async (formData) => {
    console.table(formData);
    try {
      await sendForgotPasswordMail(formData);
      reset();
      setStep("two");
    } catch (err: any) {
      if (err.response) {
        reset();
        setStep("two");
      } else {
        toast.error("Unable to Connect to Server", { id: "server-conn-fail" });
      }
    }
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
      <div className="text-3xl font-bold text-center">Forgot Password</div>
      <div className="text-gray-500 text-center">Enter the email associated with your account</div>
      <div className="w-full max-w-md mt-4">
        {step === "one" ? (
          <form className="bg-white" onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-6">
              <label className="block mb-2" htmlFor="email">
                Email address
              </label>
              <input
                className={classNames(["rounded w-full py-2 px-3 text-gray-700"], [errors.email ? "border-2 border-red-500 focus:outline-red-600" : "border border-gray-300 focus:outline-blue-600"])}
                id="email"
                type="text"
                placeholder="Enter your email address"
                {...register("email")}
              />
              {errors.email && <p className="text-red-500 text-sm italic">{errors.email.message}</p>}
            </div>
            <button
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 px-4 rounded-lg focus:outline-none text-lg disabled:opacity-80 disabled:cursor-not-allowed"
              type="submit"
              disabled={isSubmitting || isValidating}
            >
              Continue
            </button>
            <div className="text-center flex gap-x-3 items-center justify-center mt-4">
              <span className="text-gray-500 font-medium">{"Don't have an account?"}</span>
              <Link href="/signup">
                <span className="font-semibold text-blue-600 hover:cursor-pointer">Create Account</span>
              </Link>
            </div>
          </form>
        ) : (
          <div className="flex flex-col items-center justify-center">
            <div className="w-48 h-48">
              <Lottie loop={false} animationData={emailAnimation} play />
            </div>
            <span className="font-bold text-2xl mb-2 text-center">Check your mail</span>
            <span className="text-gray-600 text-center mb-4 text-lg">We have sent password recover instructions to your email.</span>
            <div className="text-gray-600 text-center">
              Did not receive the email? Check your spam filter, or
              <div
                className="cursor-pointer font-semibold text-blue-600"
                onClick={() => {
                  setStep("one");
                }}
              >
                try another email address
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
