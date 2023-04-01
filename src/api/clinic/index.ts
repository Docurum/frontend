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

interface IClinicType {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  type: string;
  address: string;
  country: string;
  pincode: string;
  state: string;
  city: string;
  displayImages: Array<string>;
  logo: string;
}

const getClinics = () => {
  try {
    return AuthAPI().get("/clinic/get-clinics");
  } catch (e) {
    return e;
  }
};

const deleteClinic = (id: string) => {
  try {
    return AuthAPI().delete(`/clinic/delete-clinic/${id}`);
  } catch (e) {
    return e as any;
  }
};

const createClinic = (data: any) => {
  try {
    return AuthAPI().post("/clinic/create-clinic", data);
  } catch (e) {
    return e as any;
  }
};

const getClinicById = (id: string) => {
  try {
    if (id === null || id === "") {
      throw new Error();
    }
    return AuthAPI().get(`/clinic/get-clinic/${id}`);
  } catch (e) {
    return e as any;
  }
};

const getClinicByUsername = (username: string) => {
  try {
    if (!username) {
      throw new Error();
    }
    return AuthAPI().get(`/clinic/get-clinic-by-username/${username}`);
  } catch (e) {
    return e as any;
  }
};

const GetClinicsQuery = () =>
  useQuery({
    queryKey: ["get-clinics"],
    queryFn: getClinics,
    select: (data: any) => {
      const resp = data.data.message;
      return resp as Array<IClinicType>;
    },
  });

const GetClinicByIdQuery = (id: string) =>
  useQuery({
    queryKey: ["get-clinic-id", id],
    queryFn: () => getClinicById(id),
    select: (data: any) => {
      const resp = data.data.message;
      return resp as IClinicType;
    },
  });

const GetClinicByUsernameQuery = (username: string) =>
  useQuery({
    queryKey: ["get-clinic-by-username", username],
    queryFn: () => getClinicByUsername(username),
    select: (data: any) => {
      const resp = data.data.message;
      return resp as Array<IClinicType>;
    },
  });

export { getClinics, deleteClinic, GetClinicsQuery, GetClinicByIdQuery, createClinic, getClinicById, GetClinicByUsernameQuery };
export type { IClinicType };
