import { Dispatch, SetStateAction, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { toast } from "react-hot-toast";
import { BsPaperclip } from "react-icons/bs";
import { GiPlainArrow } from "react-icons/gi";

const Dropzone = ({ files, setFiles }: { files: any; setFiles: any }) => {
  const onDrop: any = useCallback((acceptedFiles: string[], fileRejections: any[]) => {
    if (acceptedFiles.length > 0) {
      setFiles(acceptedFiles[0]);
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
    <div className="hidden lg:flex flex-grow my-4 px-4">
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

const DropzoneMobile = ({ files, setFiles }: { files: any; setFiles: Dispatch<SetStateAction<any[]>> }) => {
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

// import React, {useState} from 'react';
// import {useDropzone} from 'react-dropzone';

// function AcceptMaxFiles(props) {

// const [newFilesState , setnewFilesState ] = useState([]);
//   const {
//     acceptedFiles,
//     fileRejections,
//     getRootProps,
//     getInputProps
//   } = useDropzone({
//     maxFiles:2,
//    onDrop: acceptedFiles => {
//       if (acceptedFiles.length === 0) {
//         return;
//       }

//  // newFilesState = [...files.concat(newFiles)];
//  setnewFilesState((newFilesState)=>{
//  return [...newFilesState.concat(acceptedFiles)];
//  });
//     //here i add the previously added files to new state and concat them with newly droped files
//     },
//   });

//   const acceptedFileItems = newFilesState.map(file => (
//     <li key={file.path}>
//       {file.path} - {file.size} bytes
//     </li>
//   ));

//   const fileRejectionItems = fileRejections.map(({ file, errors  }) => {
//    return (
//      <li key={file.path}>
//           {file.path} - {file.size} bytes
//           <ul>
//             {errors.map(e => <li key={e.code}>{e.message}</li>)}
//          </ul>

//      </li>
//    )
//   });

//   return (
//     <section className="container">
//       <div {...getRootProps({ className: 'dropzone' })}>
//         <input {...getInputProps()} />
//         <p>Drag 'n' drop some files here, or click to select files</p>
//         <em>(2 files are the maximum number of files you can drop here)</em>
//       </div>
//       <aside>
//         <h4>Accepted files</h4>
//         <ul>{acceptedFileItems}</ul>
//         <h4>Rejected files</h4>
//         <ul>{fileRejectionItems}</ul>
//       </aside>
//     </section>
//   );
// }

// <AcceptMaxFiles />
