import { useQuery } from "@tanstack/react-query";
import axios from "axios";

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

interface IConsultation {
  id: string;
  title: string;
  isComplete: number;
  durationInMinutes: number;
  attachment: Array<string>;
  attendee: {
    id: string;
    picture: string;
    name: string;
    username: string;
  };
  host: {
    id: string;
    picture: string;
    name: string;
    username: string;
  };
}

const createPaymentOrder = (data: any) => {
  try {
    return AuthAPI().post("/consult/create-payment-order", data);
  } catch (e) {
    return e as any;
  }
};

const paymentSuccess = (data: any) => {
  try {
    return AuthAPI().post("/consult/payment-success", data);
  } catch (e) {
    return e as any;
  }
};

const getAttendeePendingConsultations = () => {
  try {
    return AuthAPI().get("/consult/get-attendee-pending-consultations");
  } catch (e) {
    return e as any;
  }
};

const getAttendeeCompletedConsultations = () => {
  try {
    return AuthAPI().get("/consult/get-attendee-completed-consultations");
  } catch (e) {
    return e as any;
  }
};

const GetAttendeePendingConsultations = () =>
  useQuery({
    queryKey: ["get-attendee-pending-consultations"],
    queryFn: getAttendeePendingConsultations,
    select: (data: any) => {
      const resp = data.data.message;
      return resp as Array<IConsultation>;
    },
  });

const GetAttendeeCompletedConsultations = () =>
  useQuery({
    queryKey: ["get-attendee-completed-consultations"],
    queryFn: getAttendeeCompletedConsultations,
    select: (data: any) => {
      const resp = data.data.message;
      return resp as Array<IConsultation>;
    },
  });

export { createPaymentOrder, paymentSuccess, GetAttendeePendingConsultations, GetAttendeeCompletedConsultations };
