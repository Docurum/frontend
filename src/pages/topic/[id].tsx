import { useRouter } from "next/router";
import AppBar from "../../components/AppBar";
import LeftLane from "../../components/LeftLane";
import { QandACard, QandASectionHome } from "../../components/QandASection";
import { list } from "../../../constants";
import RightLane from "../../components/RightLane";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { GetTopicByIdQuery } from "../../api/forum";
import { GetCommentByTopicIdQuery } from "../../api/forum/commentService";
import { CommentSection } from "../../components/CommentSection";
import BottomNavBar from "../../components/BottomNavBar";
import { AiDiscussionRightZone } from "../../components/AiDiscussionZone";
const Editor = dynamic(() => import("../../components/RichText").then((mod) => mod.RichTextCommentArea), {
  ssr: false,
});

const Topic = () => {
  const router = useRouter();
  const [topicId, setTopicId] = useState("");
  const [formValues, setFormValues] = useState([]);
  const commentRef = useRef(null);

  const [isCommentSelected, setIsCommentSelected] = useState(false);

  const getTopicQuery = GetTopicByIdQuery(topicId);

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  });

  const handleClickOutside = (event: MouseEvent) => {
    const target = event.target as Element;
    const commentElement = commentRef.current as unknown as Element;
    if (commentElement && !commentElement.contains(target)) {
      setIsCommentSelected(false);
    }
  };

  useEffect(() => {
    let unique_id = router.query.id?.toString();
    setTopicId(unique_id!);
  }, [router]);

  useEffect(() => {
    getTopicQuery.refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [topicId]);

  if (getTopicQuery.isLoading) {
    return <div>Loading ...</div>;
  }

  if (getTopicQuery.isError) {
    return <div>Error ...</div>;
  }

  return (
    <div className="flex flex-col max-h-[100vh] h-[100vh] max-w-[100vw] w-[100vw] overflow-y-hidden justify-center items-center">
      <div className="flex flex-col h-screen max-w-[1920px] w-[100vw]">
        <AppBar />
        <div className="flex flex-row h-[90vh]">
          <LeftLane />
          <div className="flex flex-col custom-scrollbar overflow-y-scroll scrollbar mt-2 w-full lg:w-1/2 h-[90vh]">
            {!getTopicQuery.isLoading && (
              <QandACard
                category={getTopicQuery.data?.categories!}
                shares={""}
                votes={getTopicQuery.data?.votes!}
                views={""}
                title={getTopicQuery.data?.title!}
                description={getTopicQuery.data?.description!}
                author={getTopicQuery.data?.user!}
                commentCount={getTopicQuery.data?.commentCount!}
                id={getTopicQuery.data?.id!}
                createdAt={getTopicQuery.data?.createdAt!}
              />
            )}
            <div ref={commentRef} className="flex flex-col shadow-md shadow-blue-200 mx-2 mt-4 rounded-md" onClick={() => setIsCommentSelected(true)}>
              {isCommentSelected && (
                <div className="flex flex-row ml-16 mt-1 items-center">
                  <div className="text-md font-semibold">Replying to </div>
                  {!getTopicQuery.isLoading && <div className="ml-1 text-md text-blue-600 font-semibold">@{getTopicQuery.data?.user.username}</div>}
                </div>
              )}
              <div className="flex flex-row items-center my-2">
                <div className="border-2 border-gray-400 rounded-2xl shrink-0 ml-4 mr-2">
                  <Image src={`https://avatars.dicebear.com/api/personas/arnab_ball.svg`} alt="avatar" height={30} width={30} />
                </div>
                <Editor topicId={topicId} isCommentSelected={isCommentSelected} formValues={formValues} setFormValues={setFormValues} />

                {/* {!isCommentSelected && (
                  <div className="mx-4 hidden sm:flex flex-row items-center justify-center shrink-0 h-10 w-20 bg-blue-400 rounded-2xl" onClick={() => {}}>
                    <div className="text-white font-bold text-lg">Reply</div>
                  </div>
                )} */}
              </div>
            </div>
            <CommentSection topicId={topicId} />
          </div>
          <AiDiscussionRightZone topicId={topicId} />
        </div>
        <BottomNavBar />
      </div>
    </div>
  );
};

export default Topic;
