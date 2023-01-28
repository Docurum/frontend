import { AiOutlineArrowDown, AiOutlineArrowUp, AiOutlinePlus } from "react-icons/ai";
import { FaLungs, FaRegCommentAlt, FaSave } from "react-icons/fa";
import { GoGraph } from "react-icons/go";
import { BsFillShareFill, BsSave } from "react-icons/bs";
import { HiDotsVertical } from "react-icons/hi";
import { MdOutlineReportProblem, MdOutlineBlock } from "react-icons/md";
import { IoIosNotificationsOutline } from "react-icons/io";
import Image from "next/image";
import { FC, useState } from "react";
import { list } from "../../../constants";
import styles from "./index.module.css";
import classNames from "classnames";
import HealthCategory from "../HealthCategory";
import BottomNavBar from "../BottomNavBar";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

const QandASectionHome = () => {
  return (
    <div className={classNames([styles["scrollbar"]], ["flex flex-col overflow-y-scroll scrollbar mt-2 w-full lg:w-1/2 h-[90vh]"])}>
      <QandASection />
      <div className="hidden max-lg:flex z-5 flex-row items-center justify-center h-12 w-12 mb-4 mr-4 bg-blue-600 absolute bottom-12 right-0 rounded-full shadow-blue-300 shadow-md hover:cursor-pointer">
        <AiOutlinePlus size={30} color="white" />
      </div>
      <BottomNavBar />
    </div>
  );
};

const QandASection = () => {
  const [qAndAList, updateQandAList] = useState(list);
  return (
    <div className="flex flex-col mb-4">
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
    <div className="shadow-md shadow-blue-200 mx-2 mt-2 rounded-md">
      <div className="basis-1 flex flex-row">
        <div className="hidden flex-col mt-8 mx-4 items-center sm:flex">
          <div className="hover:cursor-pointer">
            <AiOutlineArrowUp size={30} color={upvote > 0 ? "#2548f5" : "gray"} />
          </div>
          <div className="text-lg font-bold">{upvote}</div>
          <div className="hover:cursor-pointer">
            <AiOutlineArrowDown size={30} color={upvote < 0 ? "red" : "gray"} />
          </div>
        </div>
        <div className="flex flex-col mt-6 max-sm:ml-4">
          <div className="flex flex-row items-center justify-between mr-8">
            <div className="text-xl font-bold hover:cursor-pointer">{title}</div>
            <DropdownMenu.Root>
              <DropdownMenu.Trigger className="outline-none">
                <div className="hover:cursor-pointer">
                  <HiDotsVertical size={20} color="gray" />
                </div>
              </DropdownMenu.Trigger>
              <DropdownMenu.Portal>
                <DropdownMenu.Content className="w-36 h-40 flex flex-col items-end  bg-white rounded-md shadow-lg shadow-slate-200" side="bottom" align="end" sideOffset={2}>
                  <div className="items-end mr-[2px] w-0 h-0 border-l-transparent border-l-[6px] border-r-transparent border-r-[6px] border-b-[6px] border-b-slate-100"></div>
                  <DropdownMenu.Item className="outline-none">
                    <div className="flex flex-row items-start w-36 pt-2 px-4 py-2 rounded-tr-md rounded-tl-md bg-slate-100 hover:bg-slate-200 hover:cursor-pointer ">
                      <div>
                        <BsSave size={25} color="gray" />
                      </div>
                      <div className="ml-4 text-md font-bold text-slate-700">Save</div>
                    </div>
                  </DropdownMenu.Item>
                  <DropdownMenu.Item className="outline-none">
                    <div className="flex flex-row items-start w-36 px-4 py-2 bg-slate-100  hover:bg-slate-200 hover:cursor-pointer ">
                      <div>
                        <IoIosNotificationsOutline size={25} color="gray" />
                      </div>
                      <div className="ml-4 text-md font-bold text-slate-700">Notify</div>
                    </div>
                  </DropdownMenu.Item>

                  <DropdownMenu.Item className="outline-none">
                    <div className="flex flex-row items-start w-36 px-4 py-2 bg-slate-100  hover:bg-slate-200 hover:cursor-pointer outline-none">
                      <div>
                        <MdOutlineReportProblem size={25} color="gray" />
                      </div>
                      <div className="ml-4 text-md font-bold text-slate-700">Report</div>
                    </div>
                  </DropdownMenu.Item>
                  <DropdownMenu.Item className="outline-none">
                    <div className="flex flex-row items-start rounded-bl-md rounded-br-md w-36 px-4 py-2 bg-slate-100  hover:bg-slate-200 hover:cursor-pointer outline-none">
                      <div>
                        <MdOutlineBlock size={25} color="gray" />
                      </div>
                      <div className="ml-4 text-md font-bold text-slate-700">Block</div>
                    </div>
                  </DropdownMenu.Item>
                </DropdownMenu.Content>
              </DropdownMenu.Portal>
            </DropdownMenu.Root>
          </div>
          <HealthCategory category={category} />
          <div className="hidden text-md text-gray-600 mt-2 mr-6 font-bold sm:block">{description.length < 300 ? description : description.substring(0, 300) + "..."}</div>
          <div className="hidden text-md text-gray-600 text-sm mt-2 mr-6 font-bold max-sm:block">{description.length < 200 ? description : description.substring(0, 200) + "..."}</div>
          <div className="h-[2px] bg-gray-400 mr-8 mt-4"></div>
          <div className="flex flex-row my-4 items-center justify-between mr-8">
            <div className="hidden flex-row  items-center max-sm:flex">
              <div className="hover:cursor-pointer">
                <AiOutlineArrowUp size={25} color={upvote > 0 ? "#2548f5" : "gray"} />
              </div>
              <div className="text-lg font-bold ml-2">{upvote}</div>
              <div className="hover:cursor-pointer ml-2">
                <AiOutlineArrowDown size={25} color={upvote < 0 ? "red" : "gray"} />
              </div>
            </div>
            <div className="hidden flex-row items-center sm:flex">
              <div className="border-2 border-gray-400 rounded-2xl">
                {/* <Image src={`https://avatars.dicebear.com/api/personas/${author}.svg`} alt="avatar" height={30} width={30} /> */}
                <Image src={`https://avatars.dicebear.com/api/personas/abc.svg`} alt="avatar" height={30} width={30} />
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

export { QandASection, QandASectionHome };
