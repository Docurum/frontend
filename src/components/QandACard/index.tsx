import { AiOutlineArrowDown, AiOutlineArrowUp } from "react-icons/ai";
import { FaLungs, FaRegCommentAlt } from "react-icons/fa";
import { GoGraph } from "react-icons/go";
import { BsFillShareFill } from "react-icons/bs";
import { HiDotsVertical } from "react-icons/hi";
import Image from "next/image";

const QandACard = () => {
  return (
    <div className="basis-1/2 flex flex-col shadow-md shadow-blue-400 border-2 border-blue-600">
      <div className="basis-1 shadow-md shadow-blue-400 mx-2 rounded-md">
        <div className="basis-1 flex flex-row">
          <div className="flex flex-col mt-8 mx-4 items-center">
            <div className="hover:cursor-pointer">
              <AiOutlineArrowUp size={30} color="#2548f5" />
            </div>
            <div className="text-lg font-bold">53</div>
            <div className="hover:cursor-pointer">
              <AiOutlineArrowDown size={30} color="gray" />
            </div>
          </div>
          <div className="flex flex-col mt-6">
            <div className="flex flex-row items-center justify-between mr-8">
              <div className="text-xl font-bold hover:cursor-pointer">Chronic Obstructive Pulmonary Disease (COPD) </div>
              <div className="hover:cursor-pointer">
                <HiDotsVertical size={20} color="gray" />
              </div>
            </div>
            <div className="flex flex-row rounded-md bg-green-200 w-min px-2 py-1 my-1 hover:cursor-pointer">
              <FaLungs size={25} color="" />
              <div className="ml-2 font-bold text-green-800">Pulmonary</div>
            </div>
            <div className="text-md text-gray-600 mt-2 mr-6 font-bold">
              {
                "Chronic obstructive pulmonary disease (COPD) is a chronic inflammatory lung disease that causes obstructed airflow from the lungs. Symptoms include breathing difficulty, cough, mucus (sputum) production and wheezing. It's typically caused by long-term exposure to irritating gases or particulate matter, most often from cigarette smoke. People with COPD are at increased risk of developing heart disease, lung cancer and a variety of other conditions."
              }
            </div>
            <div className="h-[2px] bg-gray-400 mr-8 mt-4"></div>
            <div className="flex flex-row my-4 items-center justify-between mr-8">
              <div className="flex flex-row items-center">
                <div className="border-2 border-gray-400 rounded-2xl">
                  <Image src={"https://avatars.dicebear.com/api/personas/her.svg"} alt={"avatar"} height={30} width={30} />
                </div>
                <div className="font-bold text-gray-600 ml-4">Posted by </div>
                <div className="font-bold text-blue-600 ml-1 hover:cursor-pointer">Dr. Arnab Bhattacharya</div>
              </div>
              <div className="flex flex-row">
                <div className="flex flex-row items-center mr-4">
                  <GoGraph size={20} color="gray" />
                  <div className="ml-1 font-bold text-gray-400 text-sm">2.3M</div>
                </div>
                <div className="flex flex-row items-center mr-4 hover:cursor-pointer">
                  <FaRegCommentAlt size={20} color="gray" />
                  <div className="ml-1 font-bold text-gray-400 text-sm">53+</div>
                </div>
                <div className="flex flex-row items-center hover:cursor-pointer">
                  <BsFillShareFill size={20} color="gray" />
                  <div className="ml-1 font-bold text-gray-400 text-sm">1.2k</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QandACard;
