import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const createCategory = (data: any) => {
  try {
    let api = axios.create({
      baseURL: `${process.env.NEXT_PUBLIC_BACKEND_URL}/v1/`,
      headers: { authorization: `Bearer ${localStorage.getItem("token")}`, "Content-Type": "application/json" },
    });
    return api.post("/forum/create-category", data);
  } catch (e) {
    return e as any;
  }
};

export { createCategory };
