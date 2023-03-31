import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { createId } from "@paralleldrive/cuid2";
import * as Dialog from "@radix-ui/react-dialog";
import Image from "next/image";
import { Dispatch, FC, SetStateAction, useCallback, useEffect, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import toast from "react-hot-toast";
import { AiFillCheckCircle, AiOutlinePlus } from "react-icons/ai";
import { FiUpload } from "react-icons/fi";
import { MdOutlineRadioButtonUnchecked } from "react-icons/md";
import Logo from "../Logo/Logo";
import { SketchPicker } from "react-color";
import classNames from "classnames";
import { checkCategoryExists, createCategory, GetCategoriesById, GetSearchCategoriesByName } from "../../api/forum";

const CategoriesDialog: FC<{
  categoryIncludedId: string[];
  setCategoryIncludedId: Dispatch<SetStateAction<string[]>>;
}> = ({ categoryIncludedId, setCategoryIncludedId }) => {
  const [files, setFiles] = useState<any[]>([]);

  const [addingCategory, setAddingCategory] = useState(false!);
  const [logoFiles, setLogoFiles] = useState<any[]>([]);
  const [color, setColor] = useState<any>();
  const [isColorPickerVisble, setColorPickerVisble] = useState(false);
  const toggleColor = () => {
    setColorPickerVisble(!isColorPickerVisble);
  };

  const handleChange = (color: SetStateAction<any>) => {
    console.log("Color: ", color.hex);
    setColor(color.hex);
  };

  const [categoryName, setCategoryName] = useState("");
  const [categorySearchQuery, setCategorySearchQuery] = useState("");
  const uploadedImages: React.MutableRefObject<any[]> = useRef([]);
  const logoImage: React.MutableRefObject<string> = useRef("");

  const [isCategoryNameAvailable, setIsCategoryNameAvailable] = useState<boolean>(false);
  const [categoryNameErrors, setCategoryNameErrors] = useState(null);

  const searchCategory = GetSearchCategoriesByName({ name: categorySearchQuery });
  const getCategory = GetCategoriesById({ id: categoryIncludedId });

  const onDrop: any = useCallback((acceptedFiles: string[], fileRejections: any[]) => {
    if (acceptedFiles.length > 0) {
      setLogoFiles((files) => {
        const newFiles = [...files.concat(acceptedFiles)];
        const paths = newFiles.map((o) => o.path);
        const uniqueFiles = newFiles.filter(({ path }, index) => !paths.includes(path, index + 1));
        return uniqueFiles;
      });
    }
    fileRejections.forEach((selectedFile) => {
      selectedFile.errors.forEach((err: any) => {
        if (err.code === "file-too-large") {
          toast.error("File is larger than 10 MB", { id: "Large-File" });
        }
        if (err.code === "file-invalid-type") {
          toast.error("Only jpg/png files supported!", { id: "Invalid-File" });
        }
      });
    });
  }, []);
  const { getRootProps, getInputProps, isDragAccept, isDragReject } = useDropzone({
    onDrop,
    multiple: false,
    maxSize: 10485760,
    validator: (file) => {
      const isImageFile = file.type.split("/")[0] === "image";
      if (isImageFile) {
        return null;
      }

      return {
        code: "file-invalid-type",
        message: "Only jpg/png files supported!",
      };
    },
  });

  const uploadCategoryImageFile = async () => {
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

    if (logoFiles.length > 0) {
      let keyName = createId() + "." + logoFiles[0].name.split(".")[1];

      const command = new PutObjectCommand({
        Bucket: "docurum-forum-assets",
        Key: keyName,
        Body: logoFiles[0],
        ACL: "public-read",
      });
      let payload = {
        picture: `https://docurum-forum-assets.s3.ap-south-1.amazonaws.com/${keyName}`,
      };

      try {
        await client.send(command);
        logoImage.current = payload.picture;
        setLogoFiles([]);
      } catch (error) {
        console.log("Error: ", error);
      }
    }
  };

  useEffect(() => {
    searchCategory.refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categorySearchQuery]);

  useEffect(() => {
    uploadCategoryImageFile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [logoFiles.length]);

  const checkCategorynameExistsHandler = async (e: React.ChangeEvent<HTMLInputElement>): Promise<void> => {
    try {
      setCategoryName(e.target.value);
      let data = {
        name: e.target.value,
      };
      await checkCategoryExists(data);
      setIsCategoryNameAvailable(true);
      setCategoryNameErrors(null);
    } catch (err: any) {
      if (err.response) {
        setIsCategoryNameAvailable(false);
        const errorMessage = err.response.data.message[0];
        setCategoryNameErrors(errorMessage.message);
      } else {
        toast.error("Unable to Connect to Server", { id: "server-conn-fail" });
      }
    }
  };

  const createNewCategory = async (): Promise<void> => {
    try {
      let data = {
        name: categoryName,
        imageUrl: logoImage.current,
        color: color,
      };
      await createCategory(data);
      setCategoryName("");
      logoImage.current = "";
      setColor("");
      setAddingCategory(false);
      setCategoryNameErrors(null);
      setIsCategoryNameAvailable(false);
      toast.success("Category created successfully", { id: "success-category" });
    } catch (err) {
      toast.error("Something went wrong| Unable to Create Category", { id: "server-conn-fail" });
    }
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
          {!addingCategory ? (
            <div className="flex flex-row items-center justify-between w-[330px] sm:w-[360px] text-lg bg-gray-50 rounded-md shadow-md text-gray-700">
              <input
                className=" bg-gray-50 pl-2 h-12 outline-none"
                onChange={(e) => setCategorySearchQuery(e.target.value)}
                type="text"
                name="category_search"
                placeholder="Search catories here ..."
              />
              <div className="flex flex-row items-center bg-blue-600 p-[7px] rounded-md mr-1" onClick={() => setAddingCategory(true)}>
                <div className=" max-sm:hidden flex text-[17px] ml-1 text-white">Create</div>
                <AiOutlinePlus color="white" className="max-sm:m-1 ml-1 shrink-0 h-5 w-5" />
              </div>
            </div>
          ) : (
            <div>
              <input
                className={classNames(
                  ["flex flex-row items-center justify-between w-[330px] sm:w-[360px] text-lg rounded-md shadow-md  text-gray-700 bg-gray-50 pl-2 h-12"],
                  [categoryNameErrors !== null ? "border-2 border-red-500 focus:outline-red-600" : "border border-gray-300 focus:outline-blue-600"],
                  [isCategoryNameAvailable && categoryNameErrors === null && "!border-2 border-green-600 focus:!outline-green-600"]
                )}
                onChange={(e) => checkCategorynameExistsHandler(e)}
                type="text"
                name="category_name"
                placeholder="Enter category name ..."
              />
              {categoryNameErrors !== null && <p className="text-red-500 text-sm italic">{categoryNameErrors}</p>}
              {isCategoryNameAvailable && categoryNameErrors === null && <p className="text-green-700 text-sm italic">Category available!</p>}
            </div>
          )}

          {!addingCategory ? (
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
          ) : (
            <div className="flex flex-row mt-4 items-start justify-start">
              <div className="flex flex-col h-40">
                <div {...getRootProps()} className="flex flex-col items-center">
                  <input {...getInputProps()} />
                  {logoImage.current === "" ? (
                    <div className="flex flex-row items-center justify-center w-28 h-28 bg-slate-200 rounded-2xl">
                      <Logo color="#808080" className="h-12 w-12" />
                    </div>
                  ) : (
                    <div className="max-h-32">
                      <Image alt="logo-img" src={logoImage.current} height={112} width="70" className="rounded-2xl" />
                    </div>
                  )}
                  <div className="flex flex-row mt-2 items-center ">
                    <FiUpload className="" size={20} />
                    <div className="text-sm font-bold ml-1">Upload logo</div>
                  </div>
                </div>
              </div>
              {!isColorPickerVisble ? (
                <div className="flex flex-row ml-4 h-10 rounded-lg py-2 px-3 bg-slate-200 text-sm text-slate-500 hover:cursor-pointer font-bold" onClick={() => toggleColor()}>
                  Pick color
                </div>
              ) : (
                <div className="flex flex-row ml-4 h-10 rounded-lg py-2 px-3 bg-slate-200 text-sm text-slate-500 hover:cursor-pointer font-bold" onClick={() => toggleColor()}>
                  Close picker
                </div>
              )}
              <div
                className="p-2 ml-2 rounded"
                style={{
                  backgroundColor: `${color}`,
                }}
              >
                {color}
              </div>
              {isColorPickerVisble ? (
                <div className="absolute right-8 mt-12">
                  <SketchPicker className="w-20" color={color} onChangeComplete={handleChange} />
                </div>
              ) : (
                <></>
              )}
            </div>
          )}
          {addingCategory && categoryName !== "" ? (
            <div
              className="flex w-min h-14 flex-row p-2 ml-2 rounded-lg items-center shadow-md"
              style={{
                backgroundColor: `${color}`,
                boxShadow: `3px 5px 20px  ${color}`,
              }}
            >
              {logoImage.current === "" ? (
                <div className="flex flex-row items-center justify-center w-12 h-12">
                  <Logo color="#808080" className="h-10 w-10" />
                </div>
              ) : (
                <div className="flex flex-row items-center justify-center w-10 h-10">
                  <Image alt="logo-img" src={logoImage.current} height="30" width="31" className="rounded-2xl" />
                </div>
              )}
              <div className="ml-2 font-bold mr-2">{categoryName}</div>
            </div>
          ) : (
            <></>
          )}
          {addingCategory ? (
            <div className="w-full flex flex-row my-3 justify-end">
              <div
                className="flex flex-row items-center justify-center h-9 w-20 bg-slate-400 rounded-md mr-2 hover:cursor-pointer"
                onClick={() => {
                  setCategoryName("");
                  logoImage.current = "";
                  setColor("");
                  setAddingCategory(false);
                  setCategoryNameErrors(null);
                  setIsCategoryNameAvailable(false);
                }}
              >
                <div className="text-white font-bold text-md">Cancel</div>
              </div>
              <div className="flex flex-row items-center justify-center h-9 w-20 bg-blue-600 rounded-md hover:cursor-pointer" onClick={createNewCategory}>
                <div className="text-white font-bold text-md">Create</div>
              </div>
            </div>
          ) : (
            <div className="w-full flex flex-row my-3 justify-end">
              <Dialog.Close
                onClick={() => {
                  setCategoryName("");
                  setAddingCategory(false);
                }}
              >
                <div
                  className="flex flex-row items-center justify-center h-9 w-20 bg-slate-400 rounded-md mr-2 hover:cursor-pointer"
                  onClick={() => {
                    // console.log(formValues);
                  }}
                >
                  <div className="text-white font-bold text-md">Cancel</div>
                </div>
              </Dialog.Close>
              <Dialog.Close>
                <div
                  className="flex flex-row items-center justify-center h-9 w-20 bg-blue-600 rounded-md hover:cursor-pointer"
                  onClick={() => {
                    getCategory.refetch();
                  }}
                >
                  <div className="text-white font-bold text-md">Add</div>
                </div>
              </Dialog.Close>
            </div>
          )}

          <Dialog.Close />
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default CategoriesDialog;
