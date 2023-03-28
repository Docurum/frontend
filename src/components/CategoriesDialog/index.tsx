import * as Dialog from "@radix-ui/react-dialog";
import { ChangeEvent, useState } from "react";
import { AiFillCheckCircle, AiOutlinePlus } from "react-icons/ai";
import { MdOutlineRadioButtonUnchecked } from "react-icons/md";
import { HealthUIComp } from "../HealthCategory";

export default function CategoriesDialog() {
  const initialCatList = [
    {
      id: 0,
      name: "liver",
      selected: "false",
    },
    {
      id: 1,
      name: "sick",
      selected: "false",
    },
    {
      id: 2,
      name: "heart",
      selected: "false",
    },
    {
      id: 3,
      name: "blood",
      selected: "false",
    },
    {
      id: 4,
      name: "pulmonary",
      selected: "false",
    },
    {
      id: 5,
      name: "virus",
      selected: "false",
    },
    {
      id: 6,
      name: "cardiology",
      selected: "false",
    },
    {
      id: 3,
      name: "lungs",
      selected: "false",
    },
  ];
  const [catList, setCatList] = useState(initialCatList);

  const [addingCategory, setAddingCategory] = useState(false);

  const [categoryName, setCategoryName] = useState("");

  const [categoryIncludedIndex, setCategoryIncludedIndex] = useState<string[]>([]);
  const [categoryItems, setCategoryItems] = useState<string[]>([]);

  const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    let data: any[] = [];
    initialCatList.forEach((d) => {
      if (d.name.toLocaleLowerCase().includes(event.target.value.toLowerCase())) {
        data.push(d);
      }
    });
    setCatList(data);
  };
  return (
    <Dialog.Root>
      <Dialog.Trigger className="outline-none">
        <div className="flex flex-row mt-5 hover:cursor-pointer bg-slate-50 w-[130px] items-center justify-around p-2 rounded-md shadow-md shadow-slate-200">
          <AiOutlinePlus color="rgba(108, 122, 137, 0.8)" className="shrink-0 h-5 w-5" />
          <div className="text-slate-400">Add Category</div>
        </div>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay />
        <Dialog.Content className="p-4 h-[390px] w-[350px] sm:w-[400px] rounded-md bg-white shadow-md shadow-slate-200 fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
          {addingCategory ? (
            <div className="flex flex-row items-center justify-between w-[330px] sm:w-[360px] text-lg bg-gray-50 rounded-md shadow-md text-gray-700">
              <input className=" bg-gray-50 pl-2 h-12 outline-none" onChange={onInputChange} type="text" name="category_search" placeholder="Search catories here ..." />
              <div className="flex flex-row items-center bg-blue-600 p-[7px] rounded-md mr-1" onClick={() => setAddingCategory(true)}>
                <div className=" max-sm:hidden flex text-[17px] ml-1 text-white">Create</div>
                <AiOutlinePlus color="white" className="max-sm:m-1 ml-1 shrink-0 h-5 w-5" />
              </div>
            </div>
          ) : (
            <input
              className="flex flex-row items-center justify-between w-[330px] sm:w-[360px] text-lg rounded-md shadow-md text-gray-700 bg-gray-50 pl-2 h-12 outline-none"
              onChange={(e) => setCategoryName(e.target.value)}
              type="text"
              name="category_name"
              placeholder="Enter category name ..."
            />
          )}

          <div className="flex flex-col custom-scrollbar scrollbar h-64 overflow-y-scroll mt-4">
            {catList.map((item, index) => {
              return (
                <div
                  key={index}
                  className="flex flex-row mb-2 items-center"
                  onClick={() => {
                    let catList = categoryIncludedIndex;
                    if (catList.includes(item.name)) {
                      catList = catList.filter((c) => c !== item.name);
                    } else {
                      catList.push(item.name);
                    }
                    setCategoryIncludedIndex([...catList]);
                  }}
                >
                  {!categoryIncludedIndex.includes(item.name) && <MdOutlineRadioButtonUnchecked size={25} color={"gray"} className="mr-2" />}
                  {categoryIncludedIndex.includes(item.name) && <AiFillCheckCircle size={25} color={"rgb(34 197 94)"} className="mr-2" />}
                  <HealthUIComp category={item.name} />
                </div>
              );
            })}
          </div>
          <div className="w-full flex flex-row my-3 justify-end">
            <Dialog.Close
              onAbort={() => {
                setCategoryName("");
                setAddingCategory(false);
              }}
              onClick={() => {}}
            >
              <div
                className="flex flex-row items-center justify-center h-9 w-20 bg-slate-400 rounded-md mr-2"
                onClick={() => {
                  // console.log(formValues);
                }}
              >
                <div className="text-white font-bold text-md">Cancel</div>
              </div>
            </Dialog.Close>
            <Dialog.Close>
              <div
                className="flex flex-row items-center justify-center h-9 w-20 bg-blue-600 rounded-md"
                onClick={() => {
                  setCategoryItems(categoryIncludedIndex);
                }}
              >
                <div className="text-white font-bold text-md">Add</div>
              </div>
            </Dialog.Close>
          </div>
          <Dialog.Close />
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
