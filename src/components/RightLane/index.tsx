import { AiOutlinePlus } from "react-icons/ai";
import { AiOutlineArrowDown, AiOutlineArrowUp } from "react-icons/ai";
import Image from "next/image";
import classNames from "classnames";
import { FC, useState } from "react";
import styles from "./index.module.css";

export default function RightLane() {
  const list = [
    {
      id: 0,
      name: "Dr. Jonny Bhattacharya",
      upvote: "13.7k",
    },
    {
      id: 1,
      name: "Dr. Mia Chakraborty",
      upvote: "7.1k",
    },
    {
      id: 2,
      name: "Dr. Pinaki Malkova",
      upvote: "17.4k",
    },
    {
      id: 3,
      name: "Dr. Sagnik Ghosh",
      upvote: "321k",
    },
    {
      id: 4,
      name: "Dr. Daddy Kapat",
      upvote: "73k",
    },
    {
      id: 5,
      name: "Dr. Vivek Sharma",
      upvote: "131k",
    },
    {
      id: 0,
      name: "Dr. Jonny Bhattacharya",
      upvote: "13.7k",
    },
    {
      id: 1,
      name: "Dr. Mia Chakraborty",
      upvote: "7.1k",
    },
    {
      id: 2,
      name: "Dr. Pinaki Malkova",
      upvote: "17.4k",
    },
    {
      id: 3,
      name: "Dr. Sagnik Ghosh",
      upvote: "321k",
    },
    {
      id: 4,
      name: "Dr. Daddy Kapat",
      upvote: "73k",
    },
    {
      id: 5,
      name: "Dr. Vivek Sharma",
      upvote: "131k",
    },
  ];

  const [doctorsList, setdoctorsList] = useState(list);
  return (
    <div className="hidden flex-col items-center lg:flex xl:w-3/12">
      <div className="flex flex-row bg-blue-600 shadow-blue-200 shadow-md rounded-lg w-[80%] mt-[5%] p-3 items-center justify-center hover:cursor-pointer">
        <AiOutlinePlus size={25} color="white" />
        <div className="text-white text-md font-bold ml-2">Start a New Topic</div>
      </div>
      <div className="flex flex-col w-[80%] h-[50vh] shadow-slate-200 shadow-md mt-6 rounded-lg">
        <div className=" font-bold my-4 text-md text-gray-700 ml-4">Top Contributors</div>
        <div className={classNames([styles["scrollbar"]], ["flex flex-col overflow-y-scroll overflow-x-hidden scrollbar"])}>
          {doctorsList.map((d, index) => {
            return <Contributors name={d.name} votes={d.upvote} key={index} />;
          })}
        </div>
        <div className="h-1 bg-slate-300 mx-4 mb-4"></div>
        <Contributors name="Dr. Pinaki Bhattacharjee" votes="34k" />
      </div>
      <div className="flex flex-row mt-4 ml-10 w-[80%] items-start justify-start">
        <div className="flex flex-col">
          <div className="font-bold text-sm text-slate-400 mt-2 hover:cursor-pointer">About Us</div>
          <div className="font-bold text-sm text-slate-400 mt-2 hover:cursor-pointer">Help</div>
          <div className="font-bold text-sm text-slate-400 mt-2 hover:cursor-pointer">Careers</div>
          <div className="font-bold text-sm text-slate-400 mt-2 hover:cursor-pointer">Blog</div>
        </div>
        <div className="flex flex-col ml-10">
          <div className="font-bold text-sm text-slate-400 mt-2 hover:cursor-pointer">Faqs</div>
          <div className="font-bold text-sm text-slate-400 mt-2 hover:cursor-pointer">Terms of Service</div>
          <div className="font-bold text-sm text-slate-400 mt-2 hover:cursor-pointer">Privacy Policy</div>
        </div>
      </div>
    </div>
  );
}

interface IContributors {
  name: string;
  votes: string;
}

const Contributors: FC<IContributors> = ({ name, votes }) => {
  return (
    <div className="flex flex-row justify-between mx-4 mb-4">
      <div className="flex flex-row items-center">
        <div className="border-2 border-gray-400 rounded-2xl shrink-0">
          <Image src={`https://avatars.dicebear.com/api/personas/${name}.svg`} alt={"avatar"} height={30} width={30} className="" />
        </div>
        <div className="font-bold text-blue-600 ml-2 hover:cursor-pointer text-[15px]">{name}</div>
      </div>
      <div className="flex flex-row items-center">
        <div className="text-md font-bold text-slate-500 mr-1">{votes}</div>
        <div className="hover:cursor-pointer">
          <AiOutlineArrowUp size={12} color={"#2563eb"} />
        </div>
      </div>
    </div>
  );
};
