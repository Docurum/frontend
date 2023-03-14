import axios, { AxiosResponse } from "axios";
import { loginSchemaType } from "../types/login";
import { registerSchemaType } from "../types/signup";

const API = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BACKEND_URL}/v1/`,
  headers: { "Content-Type": "application/json" },
});

// const AuthAPI = axios.create({
//   baseURL: `${process.env.NEXT_PUBLIC_BACKEND_URL}/v1/`,
//   headers: { authorization: `Bearer ${localStorage.getItem("token")}`, "Content-Type": "application/json" },
// });

type APIResponse = Promise<AxiosResponse<{ message: any; status: string }>>;

export const registerUser = (data: registerSchemaType): APIResponse => API.post("/auth/register", data);
export const loginUser = (data: loginSchemaType): APIResponse => API.post("/auth/login", data);
export const checkUsernameExists = (data: { username: string }): APIResponse => API.post("/auth/check-username", data);
export const verifyEmail = (token: string): APIResponse => API.get(`/auth/email-confirm/${token}`);

export const sendForgotPasswordMail = (data: { email: string }): APIResponse => API.post("/auth/forgot-password", data);
export const checkResetPasswordTokenExists = (token: string): APIResponse => API.get(`/auth/reset-password/${token}`);
export const resetPassword = (data: { token: string; password: string; confirmPassword: string }): APIResponse => API.post("/auth/reset-password", data);

export const getUser = () => {
  try {
    let api = axios.create({
      baseURL: `${process.env.NEXT_PUBLIC_BACKEND_URL}/v1/`,
      headers: { authorization: `Bearer ${localStorage.getItem("token")}`, "Content-Type": "application/json" },
    });
    return api.get("/user/get-user");
  } catch (e) {
    return e;
  }
};
