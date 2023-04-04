import * as Dialog from "@radix-ui/react-dialog";
import Image from "next/image";
import { Dispatch, FC, SetStateAction, useCallback, useEffect, useRef, useState } from "react";
import { AiFillCheckCircle, AiOutlinePlus } from "react-icons/ai";
import { MdOutlineRadioButtonUnchecked } from "react-icons/md";
import Logo from "../Logo/Logo";
import { GetCategoriesById, GetSearchCategoriesByName } from "../../api/forum";
import { BsFilter } from "react-icons/bs";
import { RxCross2 } from "react-icons/rx";
import { TiTick } from "react-icons/ti";

const FilterCategoriesDialog: FC<{
  categoryIncludedId: string[];
  setCategoryIncludedId: Dispatch<SetStateAction<string[]>>;
}> = ({ categoryIncludedId, setCategoryIncludedId }) => {
  const [categorySearchQuery, setCategorySearchQuery] = useState("");

  const searchCategory = GetSearchCategoriesByName({ name: categorySearchQuery });

  useEffect(() => {
    searchCategory.refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categorySearchQuery]);

  return (
    <Dialog.Root>
      <Dialog.Trigger className="outline-none">
        <div className="mr-2 flex flex-row hover:cursor-pointer bg-slate-50 w-[50px] sm:w-[150px] items-center justify-around p-2 rounded-md shadow-md shadow-slate-200">
          <BsFilter color="rgba(108, 122, 137, 0.8)" className="shrink-0 h-5 w-5" />
          <div className="hidden sm:flex text-slate-400">Filter Category</div>
        </div>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay />
        <Dialog.Content className="p-4 h-[390px] w-[350px] sm:w-[400px] rounded-md bg-white shadow-md shadow-slate-200 fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
          <div className="flex flex-row items-center justify-between w-[330px] sm:w-[360px] text-lg bg-gray-50 rounded-md shadow-md text-gray-700">
            <input className=" bg-gray-50 pl-2 h-12 outline-none" onChange={(e) => setCategorySearchQuery(e.target.value)} type="text" name="category_search" placeholder="Search catories here ..." />
          </div>

          <div className="flex flex-col custom-scrollbar scrollbar h-64 overflow-y-scroll mt-4">
            {searchCategory.data?.map((item, index) => {
              return (
                <div
                  key={index}
                  className="flex flex-row mb-2 items-center mt-2"
                  onClick={() => {
                    let catList = categoryIncludedId;
                    if (catList.includes(item.id)) {
                      catList = catList.filter((c) => c !== item.id);
                    } else {
                      catList.push(item.id);
                    }
                    setCategoryIncludedId([...catList]);
                  }}
                >
                  {!categoryIncludedId.includes(item.id) && <MdOutlineRadioButtonUnchecked size={25} color={"gray"} className="mr-2" />}
                  {categoryIncludedId.includes(item.id) && <AiFillCheckCircle size={25} color={"rgb(34 197 94)"} className="mr-2" />}
                  <div
                    className="flex w-min h-14 flex-row p-2 ml-2 rounded-lg items-center shadow-md"
                    style={{
                      backgroundColor: `${item.color}`,
                      boxShadow: `3px 5px 20px  ${item.color}`,
                    }}
                  >
                    {item.imageUrl === "" ? (
                      <div className="flex flex-row items-center justify-center w-12 h-12">
                        <Logo color="#808080" className="h-10 w-10" />
                      </div>
                    ) : (
                      <div className="flex flex-row items-center justify-center w-10 h-10">
                        <Image alt="logo-img" src={item.imageUrl} height="30" width="31" className="rounded-2xl" />
                      </div>
                    )}
                    <div className="ml-2 font-bold mr-2">{item.name}</div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="w-full flex flex-row my-3 justify-end">
            <Dialog.Close onClick={() => setCategoryIncludedId([])}>
              <div className="flex flex-row items-center justify-between px-2 h-9 w-20 bg-slate-500 rounded-md hover:cursor-pointer" onClick={() => {}}>
                <div className="text-white font-bold text-md">Clear </div>
                <RxCross2 size={20} color={"white"} />
              </div>
            </Dialog.Close>
            <Dialog.Close>
              <div className="flex ml-4 flex-row items-center justify-between px-2 h-9 w-16 bg-blue-600 rounded-md hover:cursor-pointer" onClick={() => {}}>
                <div className="text-white font-bold text-md">OK </div>
                <TiTick size={20} color={"white"} />
              </div>
            </Dialog.Close>
          </div>
          <Dialog.Close />
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default FilterCategoriesDialog;
