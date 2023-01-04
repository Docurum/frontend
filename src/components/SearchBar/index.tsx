import classNames from "classnames";
import { ChangeEvent, FC, useEffect, useRef, useState } from "react";
import styles from "./index.module.css";

export default function SearchBar() {
  const ulRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const list = [
    {
      id: 0,
      title: "Diabetics",
      description:
        "Diabetes is a chronic (long-lasting) health condition that affects how your body turns food into energy. Your body breaks down most of the food you eat into sugar (glucose) and releases it into your bloodstream. When your blood sugar goes up, it signals your pancreas to release insulin.",
      author: "Arnab Bhattacharya",
      commentCount: 3,
      upvote: 10,
      createdAt: new Date().getTime(),
      updatedAt: new Date().getTime(),
      views: "173k",
    },
    {
      id: 1,
      title: "Cancer",
      description: "Cancer is a group of diseases characterized by the uncontrolled growth and spread of abnormal cells. If left untreated, cancer can cause serious illness and death.",
      author: "Samantha Smith",
      commentCount: 5,
      upvote: 15,
      createdAt: new Date().getTime(),
      updatedAt: new Date().getTime(),
      views: "89k",
    },
    {
      id: 2,
      title: "Heart Disease",
      description: "Heart disease is a broad term that refers to any type of disorder that affects the heart. It is a leading cause of death worldwide.",
      author: "John Doe",
      commentCount: 2,
      upvote: 8,
      createdAt: new Date().getTime(),
      updatedAt: new Date().getTime(),
      views: "45k",
    },
    {
      id: 3,
      title: "Stroke",
      description:
        "A stroke is a serious, life-threatening medical condition that occurs when the blood supply to part of the brain is cut off. Symptoms of a stroke include weakness, numbness, and difficulty speaking or understanding speech.",
      author: "Jane Doe",
      commentCount: 4,
      upvote: 12,
      createdAt: new Date().getTime(),
      updatedAt: new Date().getTime(),
      views: "100k",
    },
    {
      id: 4,
      title: "Asthma",
      description: "Asthma is a chronic respiratory disease characterized by inflammation of the airways and difficulty breathing. Symptoms include coughing, wheezing, and shortness of breath.",
      author: "Mike Smith",
      commentCount: 3,
      upvote: 9,
      createdAt: new Date().getTime(),
      updatedAt: new Date().getTime(),
      views: "70k",
    },
    {
      id: 5,
      title: "Influenza",
      description: "Influenza, also known as the flu, is a highly contagious respiratory illness caused by the influenza virus. Symptoms include fever, cough, sore throat, and body aches.",
      author: "Emma Watson",
      commentCount: 6,
      upvote: 17,
      createdAt: new Date().getTime(),
      updatedAt: new Date().getTime(),
      views: "120k",
    },
    {
      id: 6,
      title: "Chronic Obstructive Pulmonary Disease (COPD)",
      description:
        "Chronic obstructive pulmonary disease (COPD) is a chronic inflammatory lung disease that causes obstructed airflow from the lungs. Symptoms include breathing difficulty, cough, mucus (sputum) production and wheezing",
      author: "Mike Smith",
      commentCount: 3,
      upvote: 9,
      createdAt: new Date().getTime(),
      updatedAt: new Date().getTime(),
      views: "70k",
    },
    {
      id: 7,
      title: "Diabetics",
      description:
        "Diabetes is a chronic (long-lasting) health condition that affects how your body turns food into energy. Your body breaks down most of the food you eat into sugar (glucose) and releases it into your bloodstream. When your blood sugar goes up, it signals your pancreas to release insulin.",
      author: "Arnab Bhattacharya",
      commentCount: 3,
      upvote: 10,
      createdAt: new Date().getTime(),
      updatedAt: new Date().getTime(),
      views: "173k",
    },
    {
      id: 8,
      title: "Cancer",
      description: "Cancer is a group of diseases characterized by the uncontrolled growth and spread of abnormal cells. If left untreated, cancer can cause serious illness and death.",
      author: "Samantha Smith",
      commentCount: 5,
      upvote: 15,
      createdAt: new Date().getTime(),
      updatedAt: new Date().getTime(),
      views: "89k",
    },
    {
      id: 9,
      title: "Heart Disease",
      description: "Heart disease is a broad term that refers to any type of disorder that affects the heart. It is a leading cause of death worldwide.",
      author: "John Doe",
      commentCount: 2,
      upvote: 8,
      createdAt: new Date().getTime(),
      updatedAt: new Date().getTime(),
      views: "45k",
    },
    {
      id: 10,
      title: "Stroke",
      description:
        "A stroke is a serious, life-threatening medical condition that occurs when the blood supply to part of the brain is cut off. Symptoms of a stroke include weakness, numbness, and difficulty speaking or understanding speech.",
      author: "Jane Doe",
      commentCount: 4,
      upvote: 12,
      createdAt: new Date().getTime(),
      updatedAt: new Date().getTime(),
      views: "100k",
    },
    {
      id: 11,
      title: "Asthma",
      description: "Asthma is a chronic respiratory disease characterized by inflammation of the airways and difficulty breathing. Symptoms include coughing, wheezing, and shortness of breath.",
      author: "Mike Smith",
      commentCount: 3,
      upvote: 9,
      createdAt: new Date().getTime(),
      updatedAt: new Date().getTime(),
      views: "70k",
    },
    {
      id: 12,
      title: "Influenza",
      description: "Influenza, also known as the flu, is a highly contagious respiratory illness caused by the influenza virus. Symptoms include fever, cough, sore throat, and body aches.",
      author: "Emma Watson",
      commentCount: 6,
      upvote: 17,
      createdAt: new Date().getTime(),
      updatedAt: new Date().getTime(),
      views: "120k",
    },
    {
      id: 13,
      title: "Chronic Obstructive Pulmonary Disease (COPD)",
      description:
        "Chronic obstructive pulmonary disease (COPD) is a chronic inflammatory lung disease that causes obstructed airflow from the lungs. Symptoms include breathing difficulty, cough, mucus (sputum) production and wheezing",
      author: "Mike Smith",
      commentCount: 3,
      upvote: 9,
      createdAt: new Date().getTime(),
      updatedAt: new Date().getTime(),
      views: "70k",
    },
  ];

  const [searchList, updateSearchList] = useState(list);

  const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    let data: any[] = [];
    list.forEach((d) => {
      if (d.title.toLocaleLowerCase().includes(event.target.value.toLowerCase())) {
        data.push(d);
      }
    });
    updateSearchList(data);
  };

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
    <div>
      <input
        className="p-4 h-10 outline-none text-lg bg-gray-200 rounded-md shadow-lg w-[430px] text-gray-700"
        type="text"
        name="searchInputController"
        ref={inputRef}
        placeholder=" Search for topics here"
        onChange={(event) => onInputChange(event)}
      />
      <div ref={ulRef} className={classNames([styles["search-scrollbar"]], ["absolute flex flex-col max-h-[400px] w-[430px] overflow-y-scroll overflow-x-hidden rounded-md bg-gray-100"])}>
        {searchList.map((d) => {
          return <SearchCard key={d.id} title={d.title} description={d.description} author={d.author} commentCount={d.commentCount} likes={d.views} />;
        })}
      </div>
    </div>
  );
}

interface ISearchCardProps {
  title: string;
  description: string;
  author: string;
  commentCount: number;
  likes: string;
}

const SearchCard: FC<ISearchCardProps> = ({ title, description, author, commentCount, likes }) => {
  return (
    <div className="mt-2 pb-2 mb-2 relative mx-2 px-4 pt-2 shadow-md w-[4300px] rounded-lg flex flex-col shadow-blue-300 hover:cursor-pointer hover:shadow-blue-400 ">
      <div className=" text-xl font-bold">{title}</div>
      <div className="flex flex-col w-[410px] text-md h-42">{description.length > 130 ? description.substring(0, 130) : description}</div>
    </div>
  );
};
