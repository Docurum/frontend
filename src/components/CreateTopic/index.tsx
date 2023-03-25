/* eslint-disable @next/next/no-img-element */
import dynamic from "next/dynamic";
import { ChangeEvent, Dispatch, FC, SetStateAction, useCallback, useEffect, useState } from "react";
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

const Editor = dynamic(() => import("../RichText").then((mod) => mod.RichTextExample), {
  ssr: false,
});
interface ICreateTopicProps{
files:any[],
setFiles:Dispatch<SetStateAction<any[]>>
}
const CreateTopic:FC<ICreateTopicProps>=({files,setFiles})=> {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
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

  const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    let data: any[] = [];
    initialCatList.forEach((d) => {
      if (d.name.toLocaleLowerCase().includes(event.target.value.toLowerCase())) {
        data.push(d);
      }
    });
    setCatList(data);
  };

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


  const [uploadedFiles, setUploadedFiles] = useState<any[]>([]);

  const [categoryIncludedIndex, setCategoryIncludedIndex] = useState<string[]>([]);
  const [categoryItems, setCategoryItems] = useState<string[]>([]);

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

        <Dialog.Root>
          <Dialog.Trigger className="outline-none">
            <div className="flex flex-row mt-5 hover:cursor-pointer bg-slate-50 w-[130px] items-center justify-around p-2 rounded-md shadow-md shadow-slate-200">
              <AiOutlinePlus color="rgba(108, 122, 137, 0.8)" className="shrink-0 h-5 w-5" />
              <div className="text-slate-400">Add Category</div>
            </div>
          </Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Overlay />
            <Dialog.Content className="p-4 h-[390px] w-[300px] sm:w-[400px] rounded-md bg-white shadow-md shadow-slate-200 fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
              <input
                className="pl-2 h-12 outline-none w-[260px] sm:w-[360px] text-lg bg-gray-50 rounded-md shadow-md text-gray-700"
                onChange={onInputChange}
                type="text"
                name="category_search"
                placeholder="    Search catories here ..."
              />
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
                <Dialog.Close>
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
        <div className="mt-2">
          <HealthCategory category={categoryItems} />
        </div>
        <Editor formValues={formValues} setFormValues={setFormValues} />
        <div className="flex flex-col mt-4 gap-y-3">
          <DropzoneMobile setFiles={setFiles} />
          <div className="flex pr-6 w-screen overflow-x-scroll scrollbar custom-scrollbar mb-4">
            <div className="hidden max-lg:flex gap-x-2">
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
export default CreateTopic
