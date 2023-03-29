/* eslint-disable @next/next/no-img-element */
import dynamic from "next/dynamic";
import Image from "next/image";
import { ChangeEvent, Dispatch, SetStateAction, useCallback, useEffect, useState } from "react";
import { MdDeleteForever, MdOutlineRadioButtonUnchecked } from "react-icons/md";
import BottomNavBar from "../BottomNavBar";
import { DropzoneMobile } from "../Dropzone";
import { getSignedUrl, S3RequestPresigner } from "@aws-sdk/s3-request-presigner";
import { list } from "../../../constants";
import classNames from "classnames";
import { AiOutlinePlus, AiFillCheckCircle } from "react-icons/ai";
import { HealthCategory, HealthUIComp } from "../HealthCategory";
import * as Dialog from "@radix-ui/react-dialog";
import { S3Client, AbortMultipartUploadCommand, PutObjectCommand, GetObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { createId } from "@paralleldrive/cuid2";
import CategoriesDialog from "../CategoriesDialog";
import { GetCategoriesById } from "../../api/forum";
import Logo from "../Logo/Logo";

const Editor = dynamic(() => import("../RichText").then((mod) => mod.RichTextExample), {
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

  const [uploadedFiles, setUploadedFiles] = useState<any[]>([]);

  const [categoryIncludedId, setCategoryIncludedId] = useState<string[]>([]);
  const [categoryItems, setCategoryItems] = useState<string[]>([]);

  const getCategory = GetCategoriesById({ id: categoryIncludedId });

  const uploadFile = useCallback(async () => {
    const client = new S3Client({
      region: "ap-south-1",
      credentials: {
        accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY!,
        secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY!,
      },
    });
    let uploadObs: any[] = [];

    files.forEach(async (file) => {
      if (!uploadedFiles.includes(files)) {
        const command = new PutObjectCommand({
          Bucket: "docurum-forum-assets",
          Key: createId() + "." + file.name.split(".")[1],
          Body: file,
          ACL: "public-read",
        });

        try {
          await client.send(command);
          uploadObs.push(file);

          const url = `https://docurum-forum-assets.s3.ap-south-1.amazonaws.com/${file.path}`;
          let data = uploadedFiles;
          let ob = {
            ...file,
            path: url,
          };
          data.push(ob);
          setUploadedFiles(data);
          // console.log("Asset s3 url:", url);
        } catch (error) {
          console.log("Error: ", error);
        }
      }
    });
    return uploadObs;
  }, [files, uploadedFiles]);

  useEffect(() => {
    uploadFile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [files]);

  useEffect(() => {
    console.log("Use files:", uploadedFiles);
  }, [files, uploadedFiles]);

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
        <CategoriesDialog categoryIncludedId={categoryIncludedId} setCategoryIncludedId={setCategoryIncludedId} />
        <div className="mt-2">
          <div className="flex flex-row custom-scrollbar scrollbar overflow-y-scroll mt-2">
            {getCategory.data?.map((item, index) => {
              return (
                <div key={index} className="flex flex-row mb-2 mr-2 items-center">
                  <div
                    className="flex w-min h-14 flex-row p-2 rounded-lg items-center shadow-md"
                    style={{
                      backgroundColor: `${item.color}`,
                      boxShadow: `3px 4px 7px  ${item.color}`,
                    }}
                  >
                    {item.imageUrl === "" ? (
                      <div className="flex flex-row items-center justify-center w-12 h-12">
                        <Logo color="#808080" className="h-10 w-10" />
                      </div>
                    ) : (
                      <div className="flex flex-row items-center justify-center w-10 h-10">
                        <Image alt="logo-img" src={item.imageUrl} height="30" width="25" className="rounded-2xl" />
                      </div>
                    )}
                    <div className="font-bold mr-2">{item.name}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <Editor formValues={formValues} setFormValues={setFormValues} />
        <div className="flex flex-col mt-4 gap-y-3">
          <DropzoneMobile setFiles={setFiles} />
          <div className="flex pr-6 w-screen overflow-x-scroll scrollbar custom-scrollbar mb-4">
            <div className="flex gap-x-2">
              {files.map((file) => {
                const isImageFile = file.type.split("/")[0] === "image";
                return (
                  <div key={file.path} className="flex flex-col items-center justify-center">
                    <div className={classNames(["flex relative w-36 h-24 rounded-lg font-medium"], [isImageFile ? "text-black" : "text-white bg-gray-600"])}>
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

                    {/* {!uploadedFiles.includes(file) && (
                      <div className="absolute">
                        <div className="flex items-center justify-center">
                          <div
                            className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                            role="status"
                          ></div>
                        </div>
                      </div>
                    )} */}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div
          className="flex flex-row items-center justify-center h-10 w-20 bg-blue-600 rounded-md"
          onClick={() => {
            uploadFile();
          }}
        >
          <div className="text-white font-bold text-lg">Post</div>
        </div>
      </div>
      <BottomNavBar />
    </div>
  );
}
