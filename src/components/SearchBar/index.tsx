import classNames from "classnames";
import { ChangeEvent, FC, useEffect, useRef, useState } from "react";
import styles from "./index.module.css";
import Image from "next/image";
import { GoGraph } from "react-icons/go";
import { FaRegCommentAlt } from "react-icons/fa";
import { BsFillShareFill } from "react-icons/bs";
import { AiOutlineArrowDown, AiOutlineArrowUp } from "react-icons/ai";
import { list } from "../../../constants";
import { GetSearchTopics } from "../../api/forum";
import FilterCategoriesDialog from "../FilterCategory";

export default function SearchBar() {
  const ulRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [searchInput, setSearchInput] = useState<string>("");
  const [categoryIncludedId, setCategoryIncludedId] = useState<string[]>([]);

  const topics = GetSearchTopics({ name: searchInput, categories: categoryIncludedId });

  const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchInput(event.target.value);
  };

  useEffect(() => {
    topics.refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchInput, categoryIncludedId]);

  useEffect(() => {
    inputRef.current?.addEventListener("click", (event) => {
      event.stopPropagation();
      try {
        if (ulRef.current) ulRef.current.style.display = "flex";
      } catch (e) {
        console.log(e);
      }
    });
    document.addEventListener("click", (event) => {
      try {
        if (ulRef.current) ulRef.current.style.display = "none";
      } catch (e) {
        console.log(e);
      }
    });
  }, []);

  return (
    <div className="flex flex-row items-center justify-between bg-gray-200 rounded-md shadow-lg w-[96vw] sm:w-[75vw] md:w-[60vw] lg:w-[45vw]">
      <input
        className="bg-gray-200 p-4 h-12 outline-none text-lg  text-gray-700"
        type="text"
        name="searchInputController"
        ref={inputRef}
        value={searchInput}
        placeholder="🔍 Search for topics here"
        onChange={(event) => onInputChange(event)}
      />
      <FilterCategoriesDialog categoryIncludedId={categoryIncludedId} setCategoryIncludedId={setCategoryIncludedId} />
      {/* <div
        ref={ulRef}
        className={classNames(
          [styles["search-scrollbar"]],
          ["hidden absolute z-50 flex-col max-h-[400px] w-[92vw] sm:w-[75vw] md:w-[60vw] lg:w-[45vw] overflow-y-scroll overflow-x-hidden rounded-md bg-gray-100"]
        )}
      >
        {searchList.map((d) => {
          return (
            <SearchCard key={d.id} shares={d.shares} upvote={d.upvote} views={d.views} title={d.title} description={d.description} author={d.author} commentCount={d.commentCount} likes={d.views} />
          );
        })}
      </div> */}
    </div>
  );
}

interface ISearchCardProps {
  title: string;
  description: string;
  author: string;
  commentCount: number;
  likes: string;
  views: string;
  upvote: number;
  shares: string;
}

const SearchCard: FC<ISearchCardProps> = ({ title, description, author, commentCount, likes, views, upvote, shares }) => {
  return (
    <div className="mt-2 pb-2 mb-2 relative mx-2 px-4 pt-2 shadow-md w-[90vw] sm:w-[73vw] md:w-[58.5vw] lg:w-[43vw] rounded-lg flex flex-col shadow-blue-300 hover:cursor-pointer hover:shadow-blue-400 ">
      <div className=" text-xl font-bold w-[12/13]">{title}</div>
      <div className="flex flex-col w-[12/13] text-md h-42 mr-2">{description.length > 130 ? description.substring(0, 130) : description}</div>
      <div className="h-[2px] bg-gray-400 mr-8 my-2"></div>
      {/* <div className="flex flex-row items-center">
        <div className="border-2 border-gray-400 rounded-2xl">
          <Image src={"https://avatars.dicebear.com/api/personas/her.svg"} alt={"avatar"} height={20} width={20} />
        </div>
        <div className="font-bold text-sm text-gray-600 ml-4">Posted by </div>
        <div className="font-bold text-sm text-blue-600 ml-1 hover:cursor-pointer">Dr. Arnab Bhattacharya</div>
      </div> */}
      <div className="flex flex-row">
        {upvote > 0 ? (
          <div className="flex flex-row items-center mr-4">
            <AiOutlineArrowUp size={25} color="green" />
            <div className=" font-bold text-gray-400 text-sm">{upvote}</div>
          </div>
        ) : (
          <div className="flex flex-row items-center mr-4">
            <AiOutlineArrowDown size={25} color="red" />
            <div className="font-bold text-gray-400 text-sm">{upvote}</div>
          </div>
        )}
        <div className="flex flex-row items-center mr-4">
          <GoGraph size={20} color="gray" />
          <div className="ml-1 font-bold text-gray-400 text-sm">{views}</div>
        </div>
        <div className="flex flex-row items-center mr-4 hover:cursor-pointer">
          <FaRegCommentAlt size={20} color="gray" />
          <div className="ml-1 font-bold text-gray-400 text-sm">{commentCount}+ </div>
        </div>
        <div className="flex flex-row items-center hover:cursor-pointer">
          <BsFillShareFill size={20} color="gray" />
          <div className="ml-1 font-bold text-gray-400 text-sm">{shares}</div>
        </div>
      </div>
    </div>
  );
};
