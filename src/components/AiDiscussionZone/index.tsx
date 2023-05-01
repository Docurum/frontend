import { useRouter } from "next/router";
import { FC, useState } from "react";
import { AiOutlineSend } from "react-icons/ai";
import { FaArrowCircleRight, FaArrowRight } from "react-icons/fa";
import { GetTopicByIdQuery } from "../../api/forum";
import { getAiChatCompletion } from "../../api/consultation";

interface IPropsAiDiscussion {
  topicId: string;
}

const AiDiscussionRightZone: FC<IPropsAiDiscussion> = ({ topicId }) => {
  const router = useRouter();
  const getTopicQuery = GetTopicByIdQuery(topicId);
  const [chatArray, setChatArray] = useState<Array<string>>([]);
  const [chatInput, setChatInput] = useState<string>("");
  const [isChatLoading, setChatLoading] = useState<boolean>(false);

  const getChats = async (promptInput: string) => {
    setChatLoading(true);
    const topicDesc = getTopicQuery.data?.description;
    let topicDescString = "";
    topicDesc?.forEach((item) => {
      item.children.forEach((child: any) => {
        topicDescString += child.text;
      });
    });
    console.log("Topic Text:", topicDescString);
    try {
      let prompt = "";
      if (promptInput === "" || promptInput === undefined) {
        prompt = `Suggest diagonis and recommend medicines for the text delimited by angular brackets (<>) into a single sentence <<<${topicDescString}>>>`;
      }
      if (promptInput !== null) {
        prompt = `${promptInput} for the text delimited by angular brackets (<>) into a single sentence <<<${topicDescString}>>>`;
      }
      console.log("Chat prompt:", prompt);
      let data = JSON.stringify({
        message: prompt,
      });
      let resp = await getAiChatCompletion(data);
      console.log("Chat response: ", resp.data.message);
      let chat = resp.data.message;
      setChatArray([...chatArray, chat]);
      setChatInput("");
      setChatLoading(false);
    } catch (e) {
      setChatLoading(false);
    }
  };

  return (
    <div className="hidden  lg:flex flex-col justify-between  w-1/4 items-center mt-4 mb-10">
      <div className="flex flex-col w-11/12 h-[75vh] p-2 custom-scrollbar scroll-smooth scroll-mb-0 overflow-y-scroll scrollbar">
        <div className="p-2 text-slate-700 m-2 font-bold">Welcome to AI✨ Chat. Get Started</div>
        <div onClick={() => getChats("Explain more")} className="p-2 bg-slate-200 text-slate-700 rounded-md m-2 font-bold w-32 shadow-lg hover:cursor-pointer">
          Explain more.
        </div>
        <div onClick={() => getChats("Suggest Medications")} className="p-2 bg-slate-200 text-slate-700 rounded-md m-2 font-bold w-44 shadow-lg hover:cursor-pointer">
          Suggest medications.
        </div>
        {chatArray.map((chat, index) => {
          return (
            <div className="p-2 bg-slate-200 text-slate-700 rounded-md m-2" key={index}>
              {chat}
            </div>
          );
        })}
        {isChatLoading ? (
          <div className="flex flex-row items-center">
            <p className="p-2 text-slate-600 font-bold">Loading suggestions</p>
            <span className="inline-block ml-1">
              <span className="animate-ping absolute inline-flex h-[6px] w-[6px] rounded-full bg-slate-600 opacity-75"></span>
            </span>
            <span className="inline-block ml-4">
              <span className="animate-ping absolute inline-flex h-[6px] w-[6px] rounded-full bg-slate-600 opacity-75"></span>
            </span>
            <span className="inline-block ml-4">
              <span className="animate-ping absolute inline-flex h-[6px] w-[6px] rounded-full bg-slate-600 opacity-75"></span>
            </span>
          </div>
        ) : null}
      </div>
      <div className="flex py-1 flex-row items-center w-11/12 bg-gray-50 shadow-md rounded-md shadow-slate-300">
        <input
          className="p-4 h-12 w-full outline-none bg-gray-50 text-lg  rounded-md text-gray-700"
          onChange={(e) => {
            setChatInput(e.target.value);
          }}
          value={chatInput}
          type="text"
          name="title"
          placeholder="Ask something topic related?"
        />
        <div className="mr-4 bg-blue-600 p-2 rounded-full hover:cursor-pointer" onClick={() => getChats(chatInput)}>
          <AiOutlineSend size={22} color={"white"} />
        </div>
      </div>
    </div>
  );
};

export { AiDiscussionRightZone };
