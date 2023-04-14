import axios from "axios";
import { useQuery } from "@tanstack/react-query";

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

interface IUser {
  id: string;
  name: string;
  bio: string;
  dob: string;
  phoneNumber: string;
  email: string;
  username: string;
  picture: string;
  isDoctor: boolean;
  doctor: {
    id: string;
    speciality: string;
    experience: number;
    qualification: string;
    hospital: string;
    isVerified: boolean;
    languages: string;
    registrationNumber: string;
  };
}

const getUser = () => {
  try {
    return AuthAPI().get("/user/get-user");
  } catch (e) {
    return e;
  }
};
const editUser = (data: { name: string; username: string; bio: string; phoneNumber: number; dob: Date }) => {
  try {
    return AuthAPI().put("/user/edit-user", data);
  } catch (e) {
    return e;
  }
};
const getRecommendedUser = () => {
  try {
    return AuthAPI().get("/user/get-recommended-users");
  } catch (e) {
    return e;
  }
};

const updateProfilePicture = (data: { picture: string }) => {
  try {
    return AuthAPI().put("/user/update-picture", data);
  } catch (e) {
    return e;
  }
};

const getUserByUsername = (username: string) => {
  try {
    if (!username) {
      throw new Error();
    }
    return AuthAPI().get(`/user/get-user-by-username/${username}`);
  } catch (e) {
    return e as any;
  }
};

const GetUserByUsernameQuery = (username: string) =>
  useQuery({
    queryKey: ["get-user-by-username", username],
    queryFn: () => getUserByUsername(username),
    select: (data: any) => {
      const resp = data.data.message;
      return resp as IUser;
    },
  });

const GetUserQuery = () =>
  useQuery({
    queryKey: ["get-user"],
    queryFn: () => getUser(),
    select: (data: any) => {
      const resp = data.data.message;
      return resp as IUser;
    },
  });

const GetRecommendedUserQuery = () =>
  useQuery({
    queryKey: ["get-recommended-user"],
    queryFn: () => getRecommendedUser(),
    select: (data: any) => {
      const resp = data.data.message;
      return resp as Array<IUser>;
    },
  });

export { getUserByUsername, editUser, GetUserByUsernameQuery, GetUserQuery, GetRecommendedUserQuery, updateProfilePicture };
