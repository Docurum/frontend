import classNames from "classnames";
import styles from "./index.module.css";
import BottomNavBar from "../BottomNavBar";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Dispatch, FC, SetStateAction, useState } from "react";
import { GetPricingQuery, GetPricingQueryByUsername, IPricingType, createPricing, deletePricing } from "../../api/pricing";
import { MdDelete } from "react-icons/md";
import axios from "axios";
import { createPaymentOrder, paymentSuccess } from "../../api/consultation";
import { GetUserByUsernameQuery, GetUserQuery } from "../../api/user";

const pricingSchema = z
  .object({
    title: z.string().min(3),
    costPerSession: z.number().min(3),
    numberOfSessions: z.number().min(1),
    durationInMinutes: z.number().min(5),
  })
  .strict();

type pricingSchemaType = z.infer<typeof pricingSchema>;

const CreatePricing = () => {
  return (
    <div className={classNames([styles["scrollbar"]], ["flex flex-col items-center overflow-y-scroll scrollbar mt-2 w-full lg:w-1/2 h-[90vh]"])}>
      <Pricing />
      <BottomNavBar />
    </div>
  );
};

const Pricing = () => {
  const pricingQuery = GetPricingQuery();

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
    try {
      const { data } = await createPricing(formData);
      toast.success(data.message, { id: data.message });
      reset();

      setTabIndex(1);
      pricingQuery.refetch();
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
        <ProfilePricing />
      )}
    </>
  );
};

const ProfilePricing = () => {
  const pricingQuery = GetPricingQuery();
  const loadingArray = [1, 2];
  if (pricingQuery.isLoading) {
    return (
      <div className="flex flex-row">
        {loadingArray.map((i) => {
          return <PricingLoading key={i} />;
        })}
      </div>
    );
  }
  if (pricingQuery.isError) {
    return <div>Oops! Something went wrong</div>;
  }
  return (
    <div className="flex flex-col sm:flex-row">
      {pricingQuery.data?.map((pricing, index) => {
        const totalCost = pricing.costPerSession * pricing.numberOfSessions;
        return (
          <div key={index} className="flex mt-6 flex-col items-start px-6 py-4 justify-center w-76 shadow-md shadow-blue-200 mx-2 rounded-md">
            <div className="text-lg text-slate-600 font-bold mt-2">{pricing.title}</div>
            <div className="text-3xl text-slate-800 font-bold mt-2">${totalCost}</div>
            <div className="text-lg text-slate-500 font-bold mt-2">{pricing.numberOfSessions} Session</div>
            <div className="text-sm text-slate-500 font-bold mt-1">
              ( * ${pricing.costPerSession} per session for {pricing.durationInMinutes} mins)
            </div>
            <div className="mt-6 flex flex-row items-center justify-between w-full">
              <button className="p-6 bg-blue-600 hover:bg-blue-700 text-white py-2.5 px-4 rounded-lg focus:outline-none text-lg disabled:opacity-80 disabled:cursor-not-allowed" type="submit">
                Buy Now
              </button>
              <div
                className="hover:cursor-pointer"
                onClick={async () => {
                  try {
                    const { data } = await deletePricing(pricing.id);
                    toast.success(data.message, { id: data.message });
                    pricingQuery.refetch();
                  } catch (err) {
                    toast.error("Unable to delete.", { id: pricing.id });
                  }
                }}
              >
                <MdDelete size={25} color="red" />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

const PublicProfilePricing: FC<{
  username: string;
}> = ({ username }) => {
  const pricingQuery = GetPricingQueryByUsername(username);
  const userQuery = GetUserQuery();
  const loadingArray = [1, 2];
  if (pricingQuery.isLoading) {
    return (
      <div className="flex flex-row">
        {loadingArray.map((i) => {
          return <PricingLoading key={i} />;
        })}
      </div>
    );
  }
  if (pricingQuery.isError) {
    return <div>Oops! Something went wrong</div>;
  }

  function loadScript(src: string) {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  }

  async function displayRazorpay(data: IPricingType) {
    try {
      const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");

      if (!res) {
        alert("Razorpay SDK failed to load. Are you online?");
        return;
      }
      const ob = {
        pricingId: data.id,
      };

      // creating a new order
      const result = await createPaymentOrder(ob);

      if (!result) {
        alert("Server error. Are you online?");
        return;
      }

      console.log("Payment Order data: ", result);

      // Getting the order details back
      const { amount, id: order_id, currency } = result.data.message;

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY, // Enter the Key ID generated from the Dashboard
        amount: amount.toString(),
        currency: currency,
        name: "Docurum",
        description: data.title,
        image: "",
        order_id: order_id,
        handler: async function (response: { razorpay_payment_id: any; razorpay_order_id: any; razorpay_signature: any }) {
          const paymentSuccessPayload = {
            orderCreationId: order_id,
            razorpayPaymentId: response.razorpay_payment_id,
            razorpayOrderId: response.razorpay_order_id,
            razorpaySignature: response.razorpay_signature,
            pricingId: data.id,
          };

          const result = await paymentSuccess(paymentSuccessPayload);

          // alert(result.data.msg);
        },
        prefill: {
          name: userQuery.data?.name,
          email: userQuery.data?.email,
          contact: userQuery.data?.phoneNumber,
        },
        notes: {
          address: "",
        },
        theme: {
          color: "#61dafb",
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="flex flex-col sm:flex-row">
      {pricingQuery.data?.map((pricing, index) => {
        const totalCost = pricing.costPerSession * pricing.numberOfSessions;
        return (
          <div key={index} className="flex mt-6 flex-col items-start px-6 py-4 justify-center w-76 shadow-md shadow-blue-200 mx-2 rounded-md">
            <div className="text-lg text-slate-600 font-bold mt-2">{pricing.title}</div>
            <div className="text-3xl text-slate-800 font-bold mt-2">${totalCost}</div>
            <div className="text-lg text-slate-500 font-bold mt-2">{pricing.numberOfSessions} Session</div>
            <div className="text-sm text-slate-500 font-bold mt-1">
              ( * ${pricing.costPerSession} per session for {pricing.durationInMinutes} mins)
            </div>
            <div className="mt-6 flex flex-row items-center justify-between w-full">
              <button
                onClick={() => displayRazorpay(pricing)}
                className="p-6 bg-blue-600 hover:bg-blue-700 text-white py-2.5 px-4 rounded-lg focus:outline-none text-lg disabled:opacity-80 disabled:cursor-not-allowed"
                type="submit"
              >
                Buy Now
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

const PricingLoading = () => {
  return (
    <div className="flex mt-6 flex-col animate-pulse items-start px-6 py-4 justify-center w-80 lg:w-92 shadow-md shadow-blue-200 mx-2 rounded-md">
      <div className="h-8 w-14 rounded-md bg-slate-400 text-slate-600 font-bold mt-2"></div>
      <div className="bg-slate-600 h-12 rounded-md w-24 text-slate-700 font-bold mt-4"></div>
      <div className="h-6 bg-slate-300 w-20 rounded-md font-bold mt-4"></div>
      <div className="h-8 bg-slate-300 w-44 rounded-md font-bold mt-1"></div>
      <button className="p-6 mt-8 mb-2 h-12 w-20 bg-slate-600 text-white py-2.5 px-4 rounded-lg focus:outline-none text-lg disabled:opacity-80 disabled:cursor-not-allowed" type="submit"></button>
    </div>
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

export { CreatePricing, PublicProfilePricing, ProfilePricing };
