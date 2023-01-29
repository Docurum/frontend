import styles from "./index.module.css";
import classNames from "classnames";
import { AiOutlineArrowDown, AiOutlineArrowUp } from "react-icons/ai";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import { FC } from "react";
import { useRouter } from "next/router";
import { ImageLoaderProps } from "next/image";
import { DropdownMenu } from "@radix-ui/react-dropdown-menu";
import Image from "next/image";

const NotificationTypeSymbol: FC<{ type: string }> = ({ type }) => {
  if (type === "Reputation Inc") {
    return (
      <div className="hover:cursor-pointer bg-blue-100 rounded-full p-1">
        <IoMdArrowDropup size={20} color={"#2548f5"} />
      </div>
    );
  }
  if (type === "Reputation Dec") {
    return (
      <div className="hover:cursor-pointer bg-red-100 rounded-full p-1">
        <IoMdArrowDropdown size={20} color={"red"} />
      </div>
    );
  }
  if (type === "Upvote") {
    return (
      <div className="hover:cursor-pointer bg-blue-100 rounded-full p-1">
        <AiOutlineArrowUp size={20} color={"#2548f5"} />
      </div>
    );
  }
  if (type === "Downvote") {
    return (
      <div className="hover:cursor-pointer bg-red-100 rounded-full p-1">
        <AiOutlineArrowDown size={20} color={"red"} />
      </div>
    );
  }
  return (
    <div className="hover:cursor-pointer bg-blue-100 rounded-full p-1">
      <AiOutlineArrowUp size={20} color={"#2548f5"} />
    </div>
  );
};

export default function Notification() {
  const notificationList = [
    {
      id: 1,
      read: false,
      description: "Gauhar Khan, Dr. Asutosh Swami, Dr. Andrew Huberman and 31 others upvoted your topic",
      author: "Dr. Arnab Bhattacharya",
      timestamp: "4hrs ago",
      type: "Reputation Inc",
    },
    { id: 2, read: true, description: "John Doe and 5 others commented on your post", author: "Jane Smith", timestamp: "1hr ago", type: "Reputation Dec" },
    { id: 3, read: false, description: "Your article has been upvoted by 50 people", author: "Users", timestamp: "8hrs ago", type: "Upvote" },
    { id: 4, read: true, description: "Your article has been downvoted by 10 people", author: "Users", timestamp: "2hrs ago", type: "Downvote" },
    { id: 5, read: false, description: "You have a new consultation request", author: "Patient", timestamp: "6hrs ago", type: "Consultation Request" },
    { id: 6, read: true, description: "You have received a positive feedback from your consultation", author: "Patient", timestamp: "12hrs ago", type: "Reputation Inc" },
    { id: 7, read: false, description: "You have received a negative feedback from your consultation", author: "Patient", timestamp: "18hrs ago", type: "Reputation Dec" },
    { id: 8, read: true, description: "Your profile has been viewed 50 times", author: "Users", timestamp: "24hrs ago", type: "Reputation Inc" },
    { id: 9, read: false, description: "Your article has been shared on social media by 10 people", author: "Users", timestamp: "1day ago", type: "Reputation Inc" },
    { id: 10, read: true, description: "Your article has been reported by 3 people", author: "Users", timestamp: "2days ago", type: "Reputation Dec" },
  ];
  const router = useRouter();
  const myLoader = ({ src }: ImageLoaderProps) => {
    return `https://avatars.dicebear.com/api/personas/${src}.svg`;
  };
  return (
    <div className={classNames([styles["scrollbar"]], ["flex flex-col items-end overflow-y-scroll scrollbar bg-white rounded-md shadow-lg shadow-slate-200"])}>
      {notificationList.map((n, i) => {
        return (
          <div key={i} className="flex flex-col w-full hover:bg-slate-100 hover:cursor-pointer pb-2">
            <div className="flex flex-row items-center px-4 py-2">
              <div className="flex flex-col h-12">
                {!n.read ? <div className="w-2 h-2 bg-blue-600 rounded-full"></div> : null}
                <div className="border-2 border-gray-400 rounded-2xl ml-2 w-10 h-10 shrink-0 hover:cursor-pointer">
                  <Image loader={myLoader} src={`${n.author}`} alt={"avatar"} height={40} width={40} />
                </div>
              </div>
              <div className="flex flex-col mx-4 w-64">
                <div className="text-sm font-bold text-slate-700">{n.description.substring(0, 65) + ". . ."}</div>
                <div className="text-sm font-bold text-blue-600">{n.timestamp}</div>
              </div>
              {n.type !== "Consultation Request" ? <NotificationTypeSymbol type={n.type} /> : null}
            </div>
            {n.type === "Consultation Request" ? (
              <div className="flex flex-row">
                <div className="flex flex-row ml-20 bg-blue-600 w-20 justify-center items-center h-8 rounded-md">
                  <div className="text-white text-sm font-semibold">Approve</div>
                </div>
                <div className="flex flex-row ml-4 border-slate-300 border-2 w-20 justify-center items-center h-8 rounded-md">
                  <div className="text-slate-600 text-sm font-semibold">Deny</div>
                </div>
              </div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
