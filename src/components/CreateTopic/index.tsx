/* eslint-disable @next/next/no-img-element */
import dynamic from "next/dynamic";
import { useState } from "react";
import { MdDeleteForever } from "react-icons/md";
import BottomNavBar from "../BottomNavBar";
import { DropzoneMobile } from "../Dropzone";
import classNames from "classnames";
import { AiOutlinePlus } from "react-icons/ai";
import { HealthCategory, HealthUIComp } from "../HealthCategory";
import * as Dialog from "@radix-ui/react-dialog";

const Editor = dynamic(() => import("../RichText"), {
  ssr: false,
});

export default function CreateTopic() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const initialValues = {
    title: "",
    description: {},
    imageUrl: "",
  };

  const intialErrors = {
    title: "",
    description: {},
    imageUrl: "",
  };

  const [formValues, setFormValues] = useState(initialValues);

  const handleChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const [files, setFiles] = useState<any[]>([]);
  console.log(files);

  const deleteFile = (file: any) => {
    setFiles((files) => {
      const newFiles = files.filter((f) => f.path !== file.path);
      return newFiles;
    });
  };

  return (
    <div className="flex flex-col items-start w-full lg:w-1/2 h-[90vh] overflow-x-hidden scrollbar custom-scrollbar">
      <div className="flex flex-col px-2 mb-20">
        <div className="text-2xl font-bold mt-4 mb-2 text-blue-600">Start a New Topic</div>
        <input
          className="p-4 h-12 outline-none text-lg bg-gray-50 rounded-md shadow-md w-[95vw] sm:w-[75vw] md:w-[60vw] lg:w-[45vw] text-gray-700"
          onChange={handleChange}
          type="text"
          name="title"
          placeholder="Add Title"
        />

        <Dialog.Root>
          <Dialog.Trigger className="outline-none">
            <div className="flex flex-row mt-5 hover:cursor-pointer bg-slate-50 w-[130px] items-center justify-around p-2 rounded-md shadow-md shadow-slate-200">
              <AiOutlinePlus color="rgba(108, 122, 137, 0.8)" className="shrink-0 h-5 w-5" />
              <div className="text-slate-400">Add Category</div>
            </div>
          </Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Overlay />
            <Dialog.Content className="p-4 h-96 w-[300px] sm:w-[400px] rounded-md bg-white shadow-md shadow-slate-200 fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
              <input
                className=" h-12 outline-none w-[260px] sm:w-[360px] text-lg bg-gray-50 rounded-md shadow-md text-gray-700"
                onChange={handleChange}
                type="text"
                name="category_search"
                placeholder="    Search catories here ..."
              />
              <div className="mt-4">
                <HealthUIComp category="liver" />
              </div>
              <Dialog.Close />
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
        <div className="mt-2">
          <HealthCategory category={["liver", "lungs", "heart"]} />
        </div>
        <Editor formValues={formValues} setFormValues={setFormValues} />
        <div className="flex flex-col mt-4 gap-y-3">
          <DropzoneMobile setFiles={setFiles} />
          <div className="flex pr-6 w-screen overflow-x-scroll scrollbar custom-scrollbar mb-4">
            <div className="flex gap-x-2">
              {files.map((file) => {
                const isImageFile = file.type.split("/")[0] === "image";
                return (
                  <div key={file.path} className={classNames(["flex relative w-36 h-24 rounded-lg font-medium"], [isImageFile ? "text-black" : "text-white bg-gray-600"])}>
                    {isImageFile && <img src={URL.createObjectURL(file)} alt={file.name} className="absolute -z-10 w-36 h-24 opacity-40 rounded-lg" />}
                    <p className="justify-start p-4 truncate">{file.name}</p>
                    <p className="absolute bottom-4 left-4 truncate">{`${(file.size / (1024 * 1024)).toFixed(2)} MB`}</p>
                    <button
                      className="absolute bottom-4 right-4 shrink-0"
                      onClick={() => {
                        deleteFile(file);
                      }}
                    >
                      <MdDeleteForever size={25} />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div
          className="flex flex-row items-center justify-center h-10 w-20 bg-blue-600 rounded-md"
          onClick={() => {
            console.log(formValues);
          }}
        >
          <div className="text-white font-bold text-lg">Post</div>
        </div>
      </div>
      <BottomNavBar />
    </div>
  );
}
