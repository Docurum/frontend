import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { APIResponse } from "..";

export const AuthAPI = () => {
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

interface ITopicCategoryType {
  id: string;
  name: string;
  imageUrl: string;
  color: string;
}

interface ITopicType {
  id: string;
  title: string;
  description: Array<any>;
  assetUrl: string[];
  upvotes: number;
  votes: number;
  downvotes: number;
  views: number;
  shares: number;
  commentCount: number;
  user: {
    id: string;
    name: string;
    username: string;
    picture: string;
    isDoctor: boolean;
  };
  categories: string[];
  createdAt: string;
}

const createCategory = (data: any) => {
  try {
    return AuthAPI().post("/forum/create-category", data);
  } catch (e) {
    return e as any;
  }
};

const createTopic = (data: any) => {
  try {
    return AuthAPI().post("/forum/create-topic", data);
  } catch (e) {
    return e as any;
  }
};

const upvoteTopic = (data: { id: string }) => {
  try {
    return AuthAPI().get(`/forum/upvote-topic/${data.id}`);
  } catch (e) {
    return e as any;
  }
};

const downvoteTopic = (data: { id: string }) => {
  try {
    return AuthAPI().get(`/forum/downvote-topic/${data.id}`);
  } catch (e) {
    return e as any;
  }
};

const getTopic = (data: any) => {
  try {
    return AuthAPI().post("/forum/search-topics", data);
  } catch (e) {
    return e as any;
  }
};

const getTopicByUserId = () => {
  try {
    return AuthAPI().get("/forum/get-topic-userid");
  } catch (e) {
    return e;
  }
};

const checkCategoryExists = (data: any): APIResponse => {
  try {
    return AuthAPI().post("/forum/is-category-present", data);
  } catch (e) {
    return e as APIResponse;
  }
};

const searchCategoriesByName = (data: any): APIResponse => {
  try {
    return AuthAPI().post("/forum/search-categories-by-name", data);
  } catch (e) {
    return e as APIResponse;
  }
};

const getCategoriesById = (data: any): APIResponse => {
  try {
    return AuthAPI().post("/forum/get-categories-by-id", data);
  } catch (e) {
    return e as APIResponse;
  }
};

const getTopicById = (id: string) => {
  try {
    if (id === null || id === "") {
      throw new Error();
    }
    return AuthAPI().get(`/forum/get-topic/${id}`);
  } catch (e) {
    return e as any;
  }
};

const getTopicByUsername = (username: string) => {
  try {
    console.log("Get topic by username: ", username);
    if (!username) {
      throw new Error();
    }
    return AuthAPI().get(`/forum/get-topic-by-username/${username}`);
  } catch (e) {
    return e as any;
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

const GetCategoriesById = (data: { id: Array<string> }) => {
  if (!data.id) {
    data.id = [];
  }
  return useQuery({
    queryKey: ["get-categories-by-ids", ...data.id],
    queryFn: () => getCategoriesById(data),
    select: (data: any) => {
      const resp = data.data.message;
      return resp as Array<ITopicCategoryType>;
    },
  });
};

const GetSearchTopics = (data: { name: string; category: string[] }) =>
  useQuery({
    queryKey: ["search-topics-name"],
    queryFn: () => getTopic(data),
    select: (data: any) => {
      const resp = data.data.message;
      return resp as Array<ITopicType>;
    },
  });

const GetTopicByIdQuery = (id: string) =>
  useQuery({
    queryKey: ["get-topic-id", id],
    queryFn: () => getTopicById(id),
    select: (data: any) => {
      const resp = data.data.message;
      console.log(data);
      return resp as ITopicType;
    },
  });

const GetTopicByUserIdQuery = () =>
  useQuery({
    queryKey: ["get-topicbyuserid"],
    queryFn: () => getTopicByUserId(),
    select: (data: any) => {
      const resp = data.data.message;
      return resp as Array<ITopicType>;
    },
  });

const GetTopicByUsernameQuery = (username: string) =>
  useQuery({
    queryKey: ["get-topic-by-username", username],
    queryFn: () => getTopicByUsername(username),
    select: (data: any) => {
      const resp = data.data.message;
      console.log("User Topics: ", data.data.message);
      return resp as Array<ITopicType>;
    },
  });

export {
  createCategory,
  checkCategoryExists,
  createTopic,
  upvoteTopic,
  downvoteTopic,
  GetTopicByUserIdQuery,
  GetSearchCategoriesByName,
  GetCategoriesById,
  GetSearchTopics,
  GetTopicByIdQuery,
  GetTopicByUsernameQuery,
};
