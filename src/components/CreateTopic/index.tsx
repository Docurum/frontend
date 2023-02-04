/* eslint-disable @next/next/no-img-element */
import dynamic from "next/dynamic";
import { useState } from "react";
import { MdDeleteForever } from "react-icons/md";
import BottomNavBar from "../BottomNavBar";
import { DropzoneMobile } from "../Dropzone";
import classNames from "classnames";
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
