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
import { HealthCategory } from "../HealthCategory";
import BottomNavBar from "../BottomNavBar";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { useRouter } from "next/router";
import { downvoteTopic, GetCategoriesById, GetSearchTopics, upvoteTopic } from "../../api/forum";
import { ReadOnlyRichText } from "../RichText";
import { RxCross2 } from "react-icons/rx";
import Logo from "../Logo/Logo";
import toast from "react-hot-toast";

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
  const topics = GetSearchTopics({ name: "" });
  if (topics.isLoading) {
    return <div>Loading ...</div>;
  }
  return (
    <div className="flex flex-col mb-4">
      {topics.data?.map((d, index: number) => {
        return (
          <QandACard
            key={index}
            category={d.categories}
            shares={""}
            votes={d.votes}
            views={""}
            title={d.title}
            description={d.description}
            author={d.user}
            commentCount={d.commentCount}
            id={d.id}
            createdAt={""}
          />
        );
      })}
    </div>
  );
};

interface IQandCardProps {
  title: string;
  description: any[];
  author: {
    name: string;
    username: string;
    id: string;
    picture: string;
  };
  commentCount: number;
  views: string;
  votes: number;
  shares: string;
  category: string[];
  id: string;
  createdAt: string;
}

const QandACard: FC<IQandCardProps> = ({ title, description, author, commentCount, views, votes, shares, category, id }) => {
  const categoryQuery = GetCategoriesById({ id: category });
  const router = useRouter();

  const upvote = async () => {
    try {
      const { data } = await upvoteTopic({ id: id });
      toast.success(data.message, { id: data.message });
    } catch (e) {
      toast.error("Something went wrong", { id: `Error ${id}` });
    }
  };

  const downvote = async () => {
    try {
      const { data } = await downvoteTopic({ id: id });
      toast.success(data.message, { id: data.message });
    } catch (e) {
      toast.error("Something went wrong", { id: `Error ${id}` });
    }
  };
  return (
    <div className="shadow-md shadow-blue-200 mx-2 mt-2 rounded-md">
      <div className="basis-1 flex flex-row">
        <div className="hidden flex-col mt-8 mx-4 items-center sm:flex">
          <div className="hover:cursor-pointer" onClick={upvote}>
            <AiOutlineArrowUp size={30} color={votes > 0 ? "#2548f5" : "gray"} />
          </div>
          <div className="text-lg font-bold">{votes}</div>
          <div className="hover:cursor-pointer" onClick={downvote}>
            <AiOutlineArrowDown size={30} color={votes < 0 ? "red" : "gray"} />
          </div>
        </div>
        <div className="flex flex-col mt-6 max-sm:ml-4">
          <div
            onClick={() =>
              router.push({
                pathname: "/topic/[id]",
                query: { id: id },
              })
            }
          >
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
            <div className="flex flex-row custom-scrollbar scrollbar overflow-x-scroll mt-2">
              {categoryQuery.data?.map((item, index) => {
                return (
                  <div key={index} className="flex flex-row mb-2 mr-2 items-center">
                    <div
                      className="flex w-min h-10 flex-row p-2 rounded-lg items-center shadow-md"
                      style={{
                        backgroundColor: `${item.color}`,
                        boxShadow: `3px 3px 4px  ${item.color}`,
                      }}
                    >
                      {item.imageUrl === "" ? (
                        <div className="flex flex-row items-center justify-center w-10 h-10">
                          <Logo color="#808080" className="h-10 w-10" />
                        </div>
                      ) : (
                        <div className="flex flex-row items-center justify-center w-10 h-10">
                          <Image alt="logo-img" src={item.imageUrl} height="30" width="25" className="rounded-2xl" />
                        </div>
                      )}
                      <div className="font-bold mr-1">{item.name}</div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* <div className="hidden text-md text-gray-600 mt-2 mr-6 font-bold sm:block">{description.length < 300 ? description : description.substring(0, 300) + "..."}</div>
          <div className="hidden text-md text-gray-600 text-sm mt-2 mr-6 font-bold max-sm:block">{description.length < 200 ? description : description.substring(0, 200) + "..."}</div> */}
            <ReadOnlyRichText data={description} />
          </div>
          <div className="h-[2px] bg-gray-400 mr-8 mt-4"></div>
          <div className="flex flex-row my-4 items-center justify-between mr-8">
            <div className="hidden flex-row  items-center max-sm:flex">
              <div className="hover:cursor-pointer" onClick={upvote}>
                <AiOutlineArrowUp size={25} color={votes > 0 ? "#2548f5" : "gray"} />
              </div>
              <div className="text-lg font-bold ml-2">{votes}</div>
              <div className="hover:cursor-pointer ml-2" onClick={downvote}>
                <AiOutlineArrowDown size={25} color={votes < 0 ? "red" : "gray"} />
              </div>
            </div>
            <div className="hidden flex-row items-center sm:flex">
              <div className="border-2 border-gray-400 rounded-2xl">
                {/* <Image src={`https://avatars.dicebear.com/api/personas/${author}.svg`} alt="avatar" height={30} width={30} /> */}
                {!author.picture ? (
                  <Image src={`https://avatars.dicebear.com/api/personas/${author?.username}.svg`} alt="avatar" height={30} width={30} />
                ) : (
                  <Image src={author.picture} alt="avatar" height={30} width={30} className="rounded-full" />
                )}
              </div>
              <div className="font-bold text-gray-600 ml-4">Posted by </div>
              <div className="font-bold text-blue-600 ml-1 hover:cursor-pointer">Dr. {author?.name}</div>
            </div>
            <div className="flex flex-row">
              <div className="flex flex-row items-center mr-4">
                <GoGraph size={20} color="gray" />
                <div className="ml-1 font-bold text-gray-400 text-sm">{views}</div>
              </div>
              <div className="flex flex-row items-center mr-4 hover:cursor-pointer">
                <FaRegCommentAlt size={20} color="gray" />
                <div className="ml-1 font-bold text-gray-400 text-sm">{commentCount}</div>
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

export { QandASection, QandASectionHome, QandACard };
