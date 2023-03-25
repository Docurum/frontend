/* eslint-disable @next/next/no-img-element */
import classNames from "classnames";
import { useState } from "react";
import { MdDeleteForever } from "react-icons/md";
import AppBar from "../../components/AppBar";
import CreateTopic from "../../components/CreateTopic";
import { Dropzone } from "../../components/Dropzone";
import LeftLane from "../../components/LeftLane";

export default function StartTopicPage() {
  const [files, setFiles] = useState<any[]>([]);
  console.log(files);

  const deleteFile = (file: any) => {
    setFiles((files) => {
      const newFiles = files.filter((f) => f.path !== file.path);
      return newFiles;
    });
  };

  return (
    <div className="flex flex-col max-h-[100vh] h-[100vh] max-w-[100vw] w-[100vw] overflow-y-hidden justify-center items-center">
      <div className="flex flex-col h-screen max-w-[1920px] w-[100vw]">
        <AppBar />
        <div className="flex flex-row h-[90vh]">
          <LeftLane />
          <CreateTopic  setFiles={setFiles} files={files}/>
          <div className="hidden lg:flex flex-grow flex-col">
            <Dropzone setFiles={setFiles} />
            <div className="hidden lg:flex overflow-y-scroll scrollbar custom-scrollbar mb-4 items-center justify-center">
              <div className="grid grid-cols-2 items-center gap-2 pb-4 mt-20">
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
        </div>
      </div>
    </div>
  );
}
