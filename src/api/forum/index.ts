import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { APIResponse } from "..";

interface ITopicCategoryType {
  id: string;
  name: string;
  imageUrl: string;
  color: string;
}

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

const checkCategoryExists = (data: any): APIResponse => {
  try {
    let api = axios.create({
      baseURL: `${process.env.NEXT_PUBLIC_BACKEND_URL}/v1/`,
      headers: { authorization: `Bearer ${localStorage.getItem("token")}`, "Content-Type": "application/json" },
    });
    return api.post("/forum/is-category-present", data);
  } catch (e) {
    return e as APIResponse;
  }
};

const searchCategoriesByName = (data: any): APIResponse => {
  try {
    let api = axios.create({
      baseURL: `${process.env.NEXT_PUBLIC_BACKEND_URL}/v1/`,
      headers: { authorization: `Bearer ${localStorage.getItem("token")}`, "Content-Type": "application/json" },
    });
    return api.post("/forum/search-categories-by-name", data);
  } catch (e) {
    return e as APIResponse;
  }
};

const getCategoriesById = (data: any): APIResponse => {
  try {
    let api = axios.create({
      baseURL: `${process.env.NEXT_PUBLIC_BACKEND_URL}/v1/`,
      headers: { authorization: `Bearer ${localStorage.getItem("token")}`, "Content-Type": "application/json" },
    });
    return api.post("/forum/get-categories-by-id", data);
  } catch (e) {
    return e as APIResponse;
  }
};

const GetSearchCategoriesByName = (data: { name: string }) =>
  useQuery({
    queryKey: ["search-categories-name"],
    queryFn: () => searchCategoriesByName(data),
    select: (data: any) => {
      const resp = data.data.message;
      return resp as Array<ITopicCategoryType>;
    },
  });

const GetCategoriesById = (data: { id: Array<string> }) =>
  useQuery({
    queryKey: ["get-categories-by-ids"],
    queryFn: () => getCategoriesById(data),
    select: (data: any) => {
      const resp = data.data.message;
      return resp as Array<ITopicCategoryType>;
    },
  });

export { createCategory, checkCategoryExists, GetSearchCategoriesByName, GetCategoriesById };
