import axios, { AxiosResponse } from "axios";
import { registerSchemaType } from "../types/signup";

const API = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BACKEND_URL}/v1/`,
  headers: { "Content-Type": "application/json" },
});

type APIResponse = Promise<AxiosResponse<{ message: string; status: string }>>;

export const registerUser = (data: registerSchemaType): APIResponse => API.post("/auth/register", data);
export const checkUsernameExists = (data: { username: string }): APIResponse => API.post("/auth/check-username", data);
export const verifyEmail = (token: string): APIResponse => API.get(`/auth/email-confirm/${token}`);
export const sendForgotPasswordMail = (data: { email: string }): APIResponse => API.post("/auth/forgot-password", data);
