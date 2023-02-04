import { Dispatch, SetStateAction, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { toast } from "react-hot-toast";
import { BsPaperclip } from "react-icons/bs";
import { GiPlainArrow } from "react-icons/gi";

const Dropzone = ({ setFiles }: { setFiles: Dispatch<SetStateAction<any[]>> }) => {
  const onDrop: any = useCallback((acceptedFiles: string[], fileRejections: any[]) => {
    if (acceptedFiles.length > 0) {
      setFiles((files) => {
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
          toast.error("Invalid file type", { id: "Invalid-File" });
        }
      });
    });
  }, []);

  const { getRootProps, getInputProps, isDragAccept, isDragReject } = useDropzone({ onDrop, multiple: true, maxSize: 10485760 });
  return (
    <div className="hidden lg:flex my-4 px-4">
      <div {...getRootProps()} className="w-full h-80 rounded-2xl p-2 hover:cursor-pointer text-center focus:outline-none">
        <input {...getInputProps()} />
        <div className="flex flex-col gap-y-5 items-center justify-center border-2 border-gray-400 rounded-xl border-dashed h-full text-xl">
          <GiPlainArrow size={60} className="fill-gray-300" />
          <p>Drop your files here</p>
        </div>
      </div>
    </div>
  );
};

const DropzoneMobile = ({ setFiles }: { setFiles: Dispatch<SetStateAction<any[]>> }) => {
  const onDrop: any = useCallback((acceptedFiles: string[], fileRejections: any[]) => {
    if (acceptedFiles.length > 0) {
      setFiles((files) => {
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
          toast.error("Invalid file type", { id: "Invalid-File" });
        }
      });
    });
  }, []);

  const { getRootProps, getInputProps, isDragAccept, isDragReject } = useDropzone({ onDrop, multiple: true, maxSize: 10485760 });
  return (
    <div className="hidden max-lg:flex">
      <div {...getRootProps()} className="bg-gray-100 px-2.5 py-2 rounded-md hover:cursor-pointer">
        <input {...getInputProps()} />
        <div className="flex items-center gap-x-1">
          <BsPaperclip size={22} />
          <p>Attach Files</p>
        </div>
      </div>
    </div>
  );
};

export { Dropzone, DropzoneMobile };
