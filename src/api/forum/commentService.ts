import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { APIResponse } from "..";
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

interface ICommentType {
  id: string;
  description: Array<any>;
  assetUrl: string[];
  upvotes: number;
  votes: number;
  downvotes: number;
  views: number;
  shares: number;
  user: {
    id: string;
    name: string;
    username: string;
    picture: string;
  };
  createdAt: string;
}

const createComment = (data: any) => {
  try {
    return AuthAPI().post("/forum/create-comment", data);
  } catch (e) {
    return e as any;
  }
};

const getCommentByTopicId = (id: string) => {
  try {
    return AuthAPI().get(`/forum/get-comments-by-topic/${id}`);
  } catch (e) {
    return e as any;
  }
};

const upvoteComment = (data: { id: string }) => {
  try {
    return AuthAPI().get(`/forum/upvote-comment/${data.id}`);
  } catch (e) {
    return e as any;
  }
};

const downvoteComment = (data: { id: string }) => {
  try {
    return AuthAPI().get(`/forum/downvote-comment/${data.id}`);
  } catch (e) {
    return e as any;
  }
};

const GetCommentByTopicIdQuery = (id: string) =>
  useQuery({
    queryKey: ["get-comment-topicId", id],
    queryFn: () => getCommentByTopicId(id),
    select: (data: any) => {
      const resp = data.data.message;
      console.log(data);
      return resp as Array<ICommentType>;
    },
  });

export { createComment, upvoteComment, downvoteComment, GetCommentByTopicIdQuery };
