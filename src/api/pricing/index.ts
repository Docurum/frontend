import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface IPricingType {
  id: string;
  title: string;
  costPerSession: number;
  durationInMinutes: number;
  numberOfSessions: number;
}

const AuthAPI = () => {
  if (typeof window !== "undefined") {
    return axios.create({
      baseURL: `${process.env.NEXT_PUBLIC_BACKEND_URL}/v1/`,
      headers: { authorization: `Bearer ${localStorage.getItem("token")}`, "Content-Type": "application/json" },
    });
  } else {
    return axios.create({
      baseURL: `${process.env.NEXT_PUBLIC_BACKEND_URL}/v1/`,
      headers: { authorization: `Bearer }`, "Content-Type": "application/json" },
    });
  }
};

const createPricing = (data: any) => {
  try {
    return AuthAPI().post("/pricing/create-pricing", data);
  } catch (e) {
    return e as any;
  }
};

const deletePricing = (id: string) => {
  try {
    return AuthAPI().delete(`/pricing/delete-pricing/${id}`);
  } catch (e) {
    return e as any;
  }
};

const getPricing = () => {
  try {
    return AuthAPI().get("/pricing/get-pricing");
  } catch (e) {
    return e as any;
  }
};

const getPricingByUsername = (username: string) => {
  try {
    return AuthAPI().get(`/pricing/get-pricing-username/${username}`);
  } catch (e) {
    return e as any;
  }
};

const GetPricingQuery = () =>
  useQuery({
    queryKey: ["get-pricings"],
    queryFn: getPricing,
    select: (data: any) => {
      const resp = data.data.message;
      return resp as Array<IPricingType>;
    },
  });

const GetPricingQueryByUsername = (username: string) =>
  useQuery({
    queryKey: ["get-pricings"],
    queryFn: () => getPricingByUsername(username),
    select: (data: any) => {
      const resp = data.data.message;
      return resp as Array<IPricingType>;
    },
  });

export { createPricing, deletePricing, GetPricingQuery, GetPricingQueryByUsername };
export type { IPricingType };
