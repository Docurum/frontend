import { ChangeEvent, useState } from "react";
import { list } from "../../../constants";
import BottomNavBar from "../../components/BottomNavBar";
import { QandACard, QandASectionHome } from "../../components/QandASection";
import SearchBar from "../../components/SearchBar";

export default function SearchPage() {
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
  return (
    <div className="flex flex-col max-h-[100vh] h-[100vh] max-w-[100vw] w-[100vw] overflow-y-hidden justify-center items-center">
      <div className="flex flex-col items-center h-screen max-w-[1920px] w-[100vw]">
        {/* <div className="flex flex-row justify-center shadow max-h-[10vh] h-[8vh] sm:h-[10vh] items-center">
          <input
            className="p-4 h-12 outline-none text-lg bg-gray-200 rounded-md shadow-lg w-[92vw] sm:w-[75vw] md:w-[60vw] lg:w-[45vw] text-gray-700"
            type="text"
            name="searchInputController"
            placeholder="🔍 Search for topics here"
            onChange={(event) => onInputChange(event)}
          />
        </div> */}
        <SearchBar />
        <QandASectionHome />
        <BottomNavBar />
      </div>
    </div>
  );
}
