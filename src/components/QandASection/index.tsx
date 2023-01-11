import { AiOutlineArrowDown, AiOutlineArrowUp } from "react-icons/ai";
import { FaLungs, FaRegCommentAlt } from "react-icons/fa";
import { GoGraph } from "react-icons/go";
import { BsFillShareFill } from "react-icons/bs";
import { HiDotsVertical } from "react-icons/hi";
import Image from "next/image";
import { FC, useState } from "react";
import { list } from "../../../constants";
import styles from "./index.module.css";
import classNames from "classnames";
import HealthCategory from "../HealthCategory";

const QandASection = () => {
  const [qAndAList, updateQandAList] = useState(list);
  return (
    <div className={classNames([styles["scrollbar"]], ["basis-1/2 mt-2 flex flex-col shadow-md shadow-blue-400 overflow-y-scroll scrollbar"])}>
      {qAndAList.map((d) => {
        return (
          <QandACard
            key={d.id}
            category={d.category}
            shares={d.shares}
            upvote={d.upvote}
            views={d.views}
            title={d.title}
            description={d.description}
            author={d.author}
            commentCount={d.commentCount}
            likes={d.views}
          />
        );
      })}
    </div>
  );
};

interface IQandCardProps {
  title: string;
  description: string;
  author: string;
  commentCount: number;
  likes: string;
  views: string;
  upvote: number;
  shares: string;
  category: string[];
}

const QandACard: FC<IQandCardProps> = ({ title, description, author, commentCount, likes, views, upvote, shares, category }) => {
  return (
    <div className="shadow-md shadow-blue-400 mx-2 mt-2 rounded-md">
      <div className="basis-1 flex flex-row">
        <div className="flex flex-col mt-8 mx-4 items-center">
          <div className="hover:cursor-pointer">
            <AiOutlineArrowUp size={30} color={upvote > 0 ? "#2548f5" : "gray"} />
          </div>
          <div className="text-lg font-bold">{upvote}</div>
          <div className="hover:cursor-pointer">
            <AiOutlineArrowDown size={30} color={upvote < 0 ? "red" : "gray"} />
          </div>
        </div>
        <div className="flex flex-col mt-6">
          <div className="flex flex-row items-center justify-between mr-8">
            <div className="text-xl font-bold hover:cursor-pointer">{title}</div>
            <div className="hover:cursor-pointer">
              <HiDotsVertical size={20} color="gray" />
            </div>
          </div>
          <HealthCategory category={category} />
          <div className="text-md text-gray-600 mt-2 mr-6 font-bold">{description}</div>
          <div className="h-[2px] bg-gray-400 mr-8 mt-4"></div>
          <div className="flex flex-row my-4 items-center justify-between mr-8">
            <div className="flex flex-row items-center">
              <div className="border-2 border-gray-400 rounded-2xl">
                <Image src={`https://avatars.dicebear.com/api/personas/${author}.svg`} alt={"avatar"} height={30} width={30} />
              </div>
              <div className="font-bold text-gray-600 ml-4">Posted by </div>
              <div className="font-bold text-blue-600 ml-1 hover:cursor-pointer">Dr. {author}</div>
            </div>
            <div className="flex flex-row">
              <div className="flex flex-row items-center mr-4">
                <GoGraph size={20} color="gray" />
                <div className="ml-1 font-bold text-gray-400 text-sm">{views}</div>
              </div>
              <div className="flex flex-row items-center mr-4 hover:cursor-pointer">
                <FaRegCommentAlt size={20} color="gray" />
                <div className="ml-1 font-bold text-gray-400 text-sm">{commentCount}+</div>
              </div>
              <div className="flex flex-row items-center hover:cursor-pointer">
                <BsFillShareFill size={20} color="gray" />
                <div className="ml-1 font-bold text-gray-400 text-sm">{shares}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QandASection;
