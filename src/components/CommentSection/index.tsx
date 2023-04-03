import { AiOutlineArrowDown, AiOutlineArrowUp } from "react-icons/ai";
import { GoGraph } from "react-icons/go";
import { BsFillShareFill } from "react-icons/bs";
import Image from "next/image";
import { FC } from "react";
import { ReadOnlyRichText } from "../RichText";
import toast from "react-hot-toast";
import { downvoteComment, GetCommentByTopicIdQuery, upvoteComment } from "../../api/forum/commentService";

// const QandASectionHome = () => {
//   return (
//     <div className={classNames([styles["scrollbar"]], ["flex flex-col overflow-y-scroll scrollbar mt-2 w-full lg:w-1/2 h-[90vh]"])}>
//       <QandASection />
//       <div className="hidden max-lg:flex z-5 flex-row items-center justify-center h-12 w-12 mb-4 mr-4 bg-blue-600 absolute bottom-12 right-0 rounded-full shadow-blue-300 shadow-md hover:cursor-pointer">
//         <AiOutlinePlus size={30} color="white" />
//       </div>
//       <BottomNavBar />
//     </div>
//   );
// };

const CommentSection: FC<{
  topicId: string;
}> = ({ topicId }) => {
  const commentsQuery = GetCommentByTopicIdQuery(topicId);

  if (commentsQuery.isLoading) {
    return <div>Comments Loading ...</div>;
  }

  if (commentsQuery.isError) {
    return <div>Unable to load comments ...</div>;
  }

  return (
    <div className="flex flex-col mb-4">
      {commentsQuery.data?.map((d, index: number) => {
        return <CommentCard topicId={topicId} key={index} shares={""} votes={d.votes} views={""} description={d.description} author={d.user} id={d.id} createdAt={""} />;
      })}
    </div>
  );
};

interface ICommentCardProps {
  topicId: string;
  description: any[];
  author: {
    name: string;
    username: string;
    id: string;
    picture: string;
  };
  views: string;
  votes: number;
  shares: string;
  id: string;
  createdAt: string;
}

const CommentCard: FC<ICommentCardProps> = ({ topicId, description, author, views, votes, shares, id }) => {
  const commentsQuery = GetCommentByTopicIdQuery(topicId);
  const upvote = async () => {
    try {
      const { data } = await upvoteComment({ id: id });
      commentsQuery.refetch();
      toast.success(data.message, { id: data.message });
    } catch (e) {
      toast.error("Something went wrong", { id: `Error ${id}` });
    }
  };

  const downvote = async () => {
    try {
      const { data } = await downvoteComment({ id: id });
      commentsQuery.refetch();
      toast.success(data.message, { id: data.message });
    } catch (e) {
      toast.error("Something went wrong", { id: `Error ${id}` });
    }
  };
  return (
    <div className="mx-2 mt-2">
      <div className="flex flex-row">
        <div className="shadow-md shadow-blue-200  flex flex-col pl-6 mt-4 rounded-md">
          <div>
            <div className="flex-row items-center flex mt-2">
              <div className=" shadow-md rounded-2xl h-8 w-8 sm:h-9 sm:w-9 mr-2">
                {!author.picture ? (
                  <Image src={`https://avatars.dicebear.com/api/personas/${author?.username}.svg`} alt="avatar" height={30} width={30} />
                ) : (
                  <Image src={author.picture} alt="avatar" height={40} width={40} className="rounded-full" />
                )}
              </div>
              <div className="font-bold text-lg text-blue-600 hover:cursor-pointer">Dr. {author?.name}</div>
            </div>
            {/* <div className="flex flex-row items-center justify-between mr-8">
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
            </div> */}

            {/* <div className="hidden text-md text-gray-600 mt-2 mr-6 font-bold sm:block">{description.length < 300 ? description : description.substring(0, 300) + "..."}</div>
          <div className="hidden text-md text-gray-600 text-sm mt-2 mr-6 font-bold max-sm:block">{description.length < 200 ? description : description.substring(0, 200) + "..."}</div> */}
            <ReadOnlyRichText data={description} />
          </div>
          <div className="h-[2px] bg-gray-400 mr-8 mt-4"></div>
          <div className="flex flex-row my-4 items-center justify-between mr-8">
            <div className="flex-row  items-center flex">
              <div className="hover:cursor-pointer" onClick={upvote}>
                <AiOutlineArrowUp size={25} color={votes > 0 ? "#2548f5" : "gray"} />
              </div>
              <div className="text-lg font-bold ml-2">{votes}</div>
              <div className="hover:cursor-pointer ml-2" onClick={downvote}>
                <AiOutlineArrowDown size={25} color={votes < 0 ? "red" : "gray"} />
              </div>
            </div>

            <div className="flex flex-row">
              <div className="flex flex-row items-center mr-4">
                <GoGraph size={20} color="gray" />
                <div className="ml-1 font-bold text-gray-400 text-sm">{views}</div>
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

export { CommentSection, CommentCard };
