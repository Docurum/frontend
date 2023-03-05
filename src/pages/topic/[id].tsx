import { useRouter } from "next/router";
import AppBar from "../../components/AppBar";
import LeftLane from "../../components/LeftLane";
import { QandACard, QandASectionHome } from "../../components/QandASection";
import { list } from "../../../constants";
import RightLane from "../../components/RightLane";
import { useEffect, useState } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
const Editor = dynamic(() => import("../../components/RichText").then((mod) => mod.RichTextCommentArea), {
  ssr: false,
});

const Topic = () => {
  const router = useRouter();
  const { id } = router.query;
  const [topic, setTopic] = useState(list[parseInt(id as string)]);
  const [formValues, setFormValues] = useState({});

  const [isCommentSelected, setIsCommentSelected] = useState(false);

  useEffect(() => {
    let unique_id = router.query.id?.toString();
    setTopic(list[parseInt(unique_id!)]);
    console.log("Router :", router.query);
  }, [router]);

  return (
    <div className="flex flex-col max-h-[100vh] h-[100vh] max-w-[100vw] w-[100vw] overflow-y-hidden justify-center items-center">
      <div className="flex flex-col h-screen max-w-[1920px] w-[100vw]">
        <AppBar />
        <div className="flex flex-row h-[90vh]">
          <LeftLane />
          <div className="flex flex-col custom-scrollbar overflow-y-scroll scrollbar mt-2 w-full lg:w-1/2 h-[90vh]">
            {topic && (
              <QandACard
                category={topic.category}
                shares={topic.shares}
                upvote={topic.upvote}
                views={topic.views}
                title={topic.title}
                description={topic.description}
                author={topic.author}
                commentCount={topic.commentCount}
                id={id as string}
                createdAt={0}
                updatedAt={0}
              />
            )}
            <div className="flex flex-col shadow-md shadow-blue-200 mx-2 mt-4 rounded-md">
              {isCommentSelected && (
                <div className="flex flex-row ml-4 mt-1 items-center">
                  <div className="text-md font-semibold">Replying to </div>
                  {topic && <div className="ml-1 text-md text-blue-600 font-semibold">@{topic.author}</div>}
                </div>
              )}
              <div className="flex flex-row items-center my-2">
                <div className="border-2 border-gray-400 rounded-2xl shrink-0 ml-4 mr-2">
                  <Image src={`https://avatars.dicebear.com/api/personas/arnab_ball.svg`} alt="avatar" height={30} width={30} />
                </div>
                {/* <input
                  className=" p-4 h-12  outline-none text-lg rounded-md w-[80vw] sm:w-[75vw] md:w-[60vw] lg:w-[40vw] text-gray-700"
                  onChange={() => {}}
                  name="comment"
                  placeholder="Share your thoughts here . . ."
                /> */}
                <Editor formValues={formValues} setFormValues={setFormValues} />

                <div className="mx-4 flex flex-row items-center justify-center h-10 w-20 bg-blue-400 rounded-2xl" onClick={() => {}}>
                  <div className="text-white font-bold text-lg">Reply</div>
                </div>
              </div>
            </div>
          </div>
          <RightLane />
        </div>
      </div>
    </div>
  );
};

export default Topic;
