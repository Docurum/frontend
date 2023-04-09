/* eslint-disable @next/next/no-img-element */
import dynamic from "next/dynamic";
import Image from "next/image";
import { Dispatch, FC, SetStateAction, useCallback, useEffect, useRef, useState } from "react";
import { MdDeleteForever } from "react-icons/md";
import BottomNavBar from "../BottomNavBar";
import { DropzoneMobile } from "../Dropzone";
import classNames from "classnames";
import { RxCross2 } from "react-icons/rx";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { createId } from "@paralleldrive/cuid2";
import CategoriesDialog from "../CategoriesDialog";
import { createTopic, GetCategoriesById } from "../../api/forum";
import Logo from "../Logo/Logo";
import toast from "react-hot-toast";
import { useRouter } from "next/router";

const Editor = dynamic(() => import("../RichText").then((mod) => mod.RichTextExample), {
  ssr: false,
});

const CreateTopic: FC<{
  files: any[];
  setFiles: Dispatch<SetStateAction<any[]>>;
}> = ({ files, setFiles }) => {

  const router =useRouter()
  const initialValues = {
    title: "",
    description: [] as any[],
    assetUrl: [] as any[],
    categories: [] as any[],
  };

  const intialErrors = {
    title: "",
    description: {},
    imageUrl: "",
  };

  const [formValues, setFormValues] = useState(initialValues);
  const uploadedImages: React.MutableRefObject<any[]> = useRef([]);
  const uploadedImageFiles: React.MutableRefObject<any[]> = useRef([]);

  const handleChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const [categoryIncludedId, setCategoryIncludedId] = useState<string[]>([]);

  const getCategory = GetCategoriesById({ id: categoryIncludedId });

  const uploadFile = async () => {
    if (uploadedImages.current.length >= files.length) {
      uploadedImages.current = [];
    }

    const client = new S3Client({
      region: "ap-south-1",
      credentials: {
        accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY!,
        secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY!,
      },
    });

    files.forEach(async (file) => {
      let keyName = createId() + "." + file.name.split(".")[1];
      if (!uploadedImageFiles.current.includes(files)) {
        const command = new PutObjectCommand({
          Bucket: "docurum-forum-assets",
          Key: keyName,
          Body: file,
          ACL: "public-read",
        });
        let payload = {
          picture: `https://docurum-forum-assets.s3.ap-south-1.amazonaws.com/${keyName}`,
        };

        try {
          await client.send(command);
          uploadedImages.current.push(payload.picture);
          uploadedImageFiles.current.push(file);
        } catch (error) {
          console.log("Error: ", error);
        }
      }
    });
  };

  useEffect(() => {
    uploadFile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [files]);

  useEffect(() => {
    getCategory.refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryIncludedId]);

  const deleteFile = (file: any) => {
    setFiles((files) => {
      const newFiles = files.filter((f) => f.path !== file.path);
      return newFiles;
    });
  };

  const submit = async () => {
    const values = formValues;
    values.assetUrl = uploadedImages.current;
    values.categories = categoryIncludedId;

    try {
      const { data } = await createTopic(values);
      toast.success(data.message, { id: data.message });
      values.title = "";
      values.description = [];
      values.assetUrl = [];
      values.categories = [];
      setFiles([]);
      uploadedImages.current = [];
      uploadedImageFiles.current = [];
      setCategoryIncludedId([]);
      setFormValues(values);
      router.push("/my-topics")
    } catch (e) {
      toast.error("Something went wrong! Unable to Create topic", { id: "server-conn-fail" });
    }
  };

  return (
    <div className="flex flex-col items-start w-full lg:w-1/2 h-[90vh] overflow-x-hidden scrollbar custom-scrollbar">
      <div className="flex flex-col px-2 mb-20">
        <div className="text-2xl font-bold mt-4 mb-2 text-blue-600">Start a New Topic</div>
        <input
          className="p-4 h-12 outline-none text-lg bg-gray-50 rounded-md shadow-md w-[95vw] sm:w-[75vw] md:w-[60vw] lg:w-[45vw] text-gray-700"
          onChange={handleChange}
          value={formValues.title}
          type="text"
          name="title"
          placeholder="Add Title"
        />
        <CategoriesDialog categoryIncludedId={categoryIncludedId} setCategoryIncludedId={setCategoryIncludedId} />
        <div className="mt-2">
          <div className="flex flex-row custom-scrollbar scrollbar overflow-x-scroll mt-2">
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
                    <div
                      className="hover:cursor-pointer mr-2"
                      onClick={() => {
                        let catList = categoryIncludedId;
                        if (catList.includes(item.id)) {
                          catList = catList.filter((c) => c !== item.id);
                        }
                        setCategoryIncludedId([...catList]);
                      }}
                    >
                      <RxCross2 size={20} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <Editor formValues={formValues} setFormValues={setFormValues} />
        <div className="flex flex-col mt-4 gap-y-3">
          <DropzoneMobile setFiles={setFiles} />
          <div className="max-lg:flex hidden pr-6 w-screen overflow-x-scroll scrollbar custom-scrollbar mb-4">
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
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="flex flex-row items-center justify-center h-10 w-20 bg-blue-600 rounded-md hover:cursor-pointer" onClick={() => submit()}>
          <div className="text-white font-bold text-lg">Post</div>
        </div>
      </div>
      <BottomNavBar />
    </div>
  );
};

export default CreateTopic;
