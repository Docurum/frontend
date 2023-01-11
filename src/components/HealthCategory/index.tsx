import { FC, useState } from "react";
import { FaLungs } from "react-icons/fa";
import { TbVirus } from "react-icons/tb";
import { GiLiver, GiHeartPlus, GiHeartOrgan } from "react-icons/gi";
import { MdSick } from "react-icons/md";
import { IoMdBody } from "react-icons/io";

interface IHeathCategoryProps {
  category: string[];
}

const getColor = (type: string) => {
  if (type === "liver") {
    return "indigo";
  } else if (type === "sick") {
    return "amber";
  } else if (type === "heart") {
    return "red";
  } else if (type === "pulmonary") {
    return "green";
  } else if (type === "virus") {
    return "blue";
  } else if (type === "cardiology") {
    return "rose";
  } else if (type === "blood") {
    return "red";
  } else if (type === "virus") {
    return "gray";
  } else {
    return "gray";
  }
};

const HealthCategory: FC<IHeathCategoryProps> = ({ category }) => {
  const Disease: FC<{ type: string }> = ({ type }) => {
    return <div></div>;
  };
  return (
    <div className="flex flex-row">
      {category.map((cat, index) => {
        return <UIComp key={index} category={cat} />;
      })}
    </div>
  );
};

interface UIProps {
  category: string;
}

const UIComp: FC<UIProps> = ({ category }) => {
  const [color, setColor] = useState(getColor(category));
  const c = getColor(category);
  if (category === "liver") {
    return (
      <div className={`flex flex-row rounded-md bg-indigo-200 w-min px-2 py-1 my-1 mr-2 hover:cursor-pointer`}>
        <GiLiver size={25} color="" />
        <div className={`ml-2 font-bold text-indigo-800`}>{category}</div>
      </div>
    );
  } else if (category === "sick") {
    return (
      <div className={`flex flex-row rounded-md bg-amber-200 w-min px-2 py-1 my-1 mr-2 hover:cursor-pointer`}>
        <MdSick size={25} color="" />
        <div className={`ml-2 font-bold text-amber-800`}>{category}</div>
      </div>
    );
  } else if (category === "heart") {
    return (
      <div className={`flex flex-row rounded-md bg-red-200 w-min px-2 py-1 my-1 mr-2 hover:cursor-pointer`}>
        <GiHeartPlus size={25} color="" />
        <div className={`ml-2 font-bold text-red-800`}>{category}</div>
      </div>
    );
  } else if (category === "pulmonary") {
    return (
      <div className={`flex flex-row rounded-md bg-green-200 w-min px-2 py-1 my-1 mr-2 hover:cursor-pointer`}>
        <FaLungs size={25} color="" />
        <div className={`ml-2 font-bold text-green-800`}>{category}</div>
      </div>
    );
  } else if (category === "virus") {
    return (
      <div className={`flex flex-row rounded-md bg-blue-200 w-min px-2 py-1 my-1 mr-2 hover:cursor-pointer`}>
        <TbVirus size={25} color="" />
        <div className={`ml-2 font-bold text-blue-800`}>{category}</div>
      </div>
    );
  } else if (category === "cardiology") {
    return (
      <div className={`flex flex-row rounded-md bg-rose-200 w-min px-2 py-1 my-1 mr-2 hover:cursor-pointer`}>
        <GiHeartOrgan size={25} color="" />
        <div className={`ml-2 font-bold text-rose-800`}>{category}</div>
      </div>
    );
  } else if (category === "blood") {
    return (
      <div className={`flex flex-row rounded-md bg-red-200 w-min px-2 py-1 my-1 mr-2 hover:cursor-pointer`}>
        <FaLungs size={25} color="" />
        <div className={`ml-2 font-bold text-red-800`}>{category}</div>
      </div>
    );
  } else {
    return (
      <div className={`flex flex-row rounded-md bg-gray-200 w-min px-2 py-1 my-1 mr-2 hover:cursor-pointer`}>
        <IoMdBody size={25} color="" />
        <div className={`ml-2 font-bold text-gray-800`}>{category}</div>
      </div>
    );
  }
};

export default HealthCategory;
