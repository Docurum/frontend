import { useQuery } from "@tanstack/react-query";
import axios from "axios";

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
    let api = axios.create({
      baseURL: `${process.env.NEXT_PUBLIC_BACKEND_URL}/v1/`,
      headers: { authorization: `Bearer ${localStorage.getItem("token")}`, "Content-Type": "application/json" },
    });
    return api.get("/clinic/get-clinics");
  } catch (e) {
    return e;
  }
};

const deleteClinic = (id: string) => {
  try {
    let api = axios.create({
      baseURL: `${process.env.NEXT_PUBLIC_BACKEND_URL}/v1/`,
      headers: { authorization: `Bearer ${localStorage.getItem("token")}`, "Content-Type": "application/json" },
    });
    return api.delete(`/clinic/delete-clinic/${id}`);
  } catch (e) {
    return e as any;
  }
};

const createClinic = (data: any) => {
  try {
    let api = axios.create({
      baseURL: `${process.env.NEXT_PUBLIC_BACKEND_URL}/v1/`,
      headers: { authorization: `Bearer ${localStorage.getItem("token")}`, "Content-Type": "application/json" },
    });
    return api.post("/clinic/create-clinic", data);
  } catch (e) {
    return e as any;
  }
};

const editClinicById=(id:string,data:any)=>{
try{
       let api = axios.create({
      baseURL: `${process.env.NEXT_PUBLIC_BACKEND_URL}/v1/`,
      headers: { authorization: `Bearer ${localStorage.getItem("token")}`, "Content-Type": "application/json" },
    });
      return api.put(`/clinic/edit-clinic/${id}`,data);
}catch(e){
      return e as any;

};
}
const GetClinicsQuery = () =>
  useQuery({
    queryKey: ["get-clinics"],
    queryFn: getClinics,
    select: (data: any) => {
      const resp = data.data.message;

      return resp as Array<IClinicType>;
    },
  });

export { getClinics, deleteClinic, GetClinicsQuery, createClinic,editClinicById };
export type { IClinicType };
