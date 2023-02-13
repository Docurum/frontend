import { useRouter } from "next/router";
import AppBar from "../../components/AppBar";
import LeftLane from "../../components/LeftLane";
import { QandACard, QandASectionHome } from "../../components/QandASection";
import { list } from "../../../constants";
import RightLane from "../../components/RightLane";
import { useEffect, useState } from "react";

const Topic = () => {
  const router = useRouter();
  const { id } = router.query;
  const [topic, setTopic] = useState(list[parseInt(id as string)]);

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
          </div>
          <RightLane />
        </div>
      </div>
    </div>
  );
};

export default Topic;
