import classNames from "classnames";
import styles from "./index.module.css";
import BottomNavBar from "../BottomNavBar";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Dispatch, FC, SetStateAction, useState } from "react";
import { CgProfile } from "react-icons/cg";

const pricingSchema = z
  .object({
    title: z.string(),
    costPerSession: z.number(),
    numberOfSessions: z.number(),
    durationInMinutes: z.number(),
  })
  .strict();

type pricingSchemaType = z.infer<typeof pricingSchema>;

export default function CreatePricing() {
  return (
    <div className={classNames([styles["scrollbar"]], ["flex flex-col items-center overflow-y-scroll scrollbar mt-2 w-full lg:w-1/2 h-[90vh]"])}>
      <Pricing />
      <BottomNavBar />
    </div>
  );
}

const Pricing = () => {
  const {
    reset,
    register,
    handleSubmit,
    setError,
    clearErrors,
    setValue,
    formState: { errors, isSubmitting, isValidating },
  } = useForm<pricingSchemaType>({
    mode: "onChange",
    resolver: zodResolver(pricingSchema),
    defaultValues: {
      title: "",
      costPerSession: 0,
      durationInMinutes: 0,
      numberOfSessions: 0,
    },
  });

  const [tabIndex, setTabIndex] = useState(0);

  const onSubmit: SubmitHandler<pricingSchemaType> = async (formData) => {
    console.table(formData);
    try {
    } catch (err: any) {
      toast.error("Unable to Connect to Server", { id: "server-conn-fail" });
    }
  };

  return (
    <>
      <Tab i={tabIndex} setIndex={setTabIndex} />
      {tabIndex === 0 ? (
        <form className="bg-white mt-4 flex flex-col items-center w-full" onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <label className="block mb-2" htmlFor="fullname">
              Title :
            </label>
            <input
              className={classNames(
                ["rounded w-80 lg:w-96 py-2 px-3 text-gray-700"],
                [errors.title ? "border-2 border-red-500 focus:outline-red-600" : "border border-gray-300 focus:outline-blue-600"]
              )}
              id="fullname"
              type="text"
              placeholder="Enter the title"
              {...register("title")}
            />
            {errors.title && <p className="text-red-500 text-sm italic">{errors.title?.message}</p>}
          </div>
          <div className="mb-3">
            <label className="block mb-2" htmlFor="fullname">
              Cost per session :
            </label>
            <input
              className={classNames(
                ["rounded w-80 lg:w-96 py-2 px-3 text-gray-700"],
                [errors.costPerSession ? "border-2 border-red-500 focus:outline-red-600" : "border border-gray-300 focus:outline-blue-600"]
              )}
              id="fullname"
              pattern="[0-9]*\.?[0-9]*"
              type="text"
              placeholder="Enter the title"
              {...register("costPerSession", { valueAsNumber: true })}
            />
            {errors.costPerSession && <p className="text-red-500 text-sm italic">{errors.costPerSession?.message}</p>}
          </div>
          <div className="mb-3">
            <label className="block mb-2" htmlFor="fullname">
              Number of sessions :
            </label>
            <input
              className={classNames(
                ["rounded w-80 lg:w-96 py-2 px-3 text-gray-700"],
                [errors.numberOfSessions ? "border-2 border-red-500 focus:outline-red-600" : "border border-gray-300 focus:outline-blue-600"]
              )}
              id="fullname"
              pattern="[0-9]*\.?[0-9]*"
              type="text"
              placeholder="Enter the number of sessions"
              {...register("numberOfSessions", { valueAsNumber: true })}
            />
            {errors.numberOfSessions && <p className="text-red-500 text-sm italic">{errors.numberOfSessions?.message}</p>}
          </div>
          <div className="mb-3">
            <label className="block mb-2" htmlFor="fullname">
              Duration in minutes :
            </label>
            <input
              className={classNames(
                ["rounded w-80 lg:w-96 py-2 px-3 text-gray-700"],
                [errors.durationInMinutes ? "border-2 border-red-500 focus:outline-red-600" : "border border-gray-300 focus:outline-blue-600"]
              )}
              id="fullname"
              pattern="[0-9]*\.?[0-9]*"
              type="text"
              placeholder="Enter duration in minutes"
              {...register("durationInMinutes", { valueAsNumber: true })}
            />
            {errors.durationInMinutes && <p className="text-red-500 text-sm italic">{errors.durationInMinutes?.message}</p>}
          </div>

          <button
            className="w-80 lg:w-96 mt-2 bg-blue-600 hover:bg-blue-700 text-white py-2.5 px-4 rounded-lg focus:outline-none text-lg disabled:opacity-80 disabled:cursor-not-allowed"
            type="submit"
            disabled={isSubmitting || isValidating}
          >
            Create Pricing
          </button>
        </form>
      ) : (
        <div className="flex mt-6 flex-col items-start px-6 py-4 justify-center w-80 lg:w-92 shadow-md shadow-blue-200 mx-2 rounded-md">
          <div className="text-xl text-slate-600 font-bold mt-2">Basic</div>
          <div className="text-5xl text-slate-800 font-bold mt-4">$999</div>
          <div className="text-lg text-slate-500 font-bold mt-4">1 Session</div>
          <div className="text-md text-slate-500 font-bold mt-1">( * $999 per session for 15 mins)</div>
          <button className="p-6 mt-8 mb-2 bg-blue-600 hover:bg-blue-700 text-white py-2.5 px-4 rounded-lg focus:outline-none text-lg disabled:opacity-80 disabled:cursor-not-allowed" type="submit">
            Buy Now
          </button>
        </div>
      )}
    </>
  );
};

const Tab: FC<{
  i: number;
  setIndex: Dispatch<SetStateAction<number>>;
}> = ({ i, setIndex }) => {
  return (
    <div className="flex flex-row mt-10 relative items-center rounded-md w-[224px] h-10 bg-blue-100 hover:cursor-pointer">
      <div className={`z-1 duration-300 ease-in absolute rounded-md bg-blue-600 w-28 h-10 ${i === 0 ? "translate-x-0" : "translate-x-28 mr-[2px]"}`} />
      <div className="flex flex-row h-10 items-center">
        <div
          onClick={() => {
            setIndex(0);
          }}
        >
          <div className={`${i === 0 ? "font-bold text-white" : "text-slate-600"} text-lg w-28 h-8 text-center z-2 relative`}>Create </div>
        </div>

        <div
          onClick={() => {
            setIndex(1);
          }}
        >
          <div className={`${i === 1 ? "font-bold text-white" : "text-slate-600"} text-lg w-28 h-8 text-center z-2 relative`}>Preview</div>
        </div>
      </div>
    </div>
  );
};
