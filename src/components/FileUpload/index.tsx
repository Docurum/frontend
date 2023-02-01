import Uppy from "@uppy/core";
import Tus from "@uppy/tus";
import GoogleDrive from "@uppy/google-drive";
import { Dashboard, DashboardModal, DragDrop, ProgressBar, FileInput } from "@uppy/react";
import { IoIosAttach } from "react-icons/io";

import "@uppy/core/dist/style.css";
import "@uppy/dashboard/dist/style.css";
import "@uppy/drag-drop/dist/style.css";
import "@uppy/file-input/dist/style.css";
import "@uppy/progress-bar/dist/style.css";
import { useEffect, useState } from "react";
import Image from "next/image";

interface FileModel {
  name: string;
  size: string;
  imageUrl: string;
  extension: string;
}

function formatFileSize(bytes: number, decimalPoint: number) {
  if (bytes == 0) return "0 Bytes";
  var k = 1000,
    dm = decimalPoint || 2,
    sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"],
    i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
}

const FileUpload = () => {
  const [state, setState] = useState({
    showInlineDashboard: false,
    open: false,
  });

  const uppy = new Uppy({ id: "uppy1", autoProceed: true, debug: true }).use(Tus, { endpoint: "https://tusd.tusdemo.net/files/" }).use(GoogleDrive, { companionUrl: "https://companion.uppy.io" });

  const uppy2 = new Uppy({ id: "uppy2", autoProceed: false, debug: true }).use(Tus, { endpoint: "https://tusd.tusdemo.net/files/" });

  useEffect(() => {
    //this will call on component unmount

    return () => {
      uppy.close({ reason: "unmount" });
      uppy2.close({ reason: "unmount" });
    };
  }, [uppy, uppy2]);

  const handleModalClick = () => {
    setState({
      ...state,
      open: !state.open,
    });
  };

  const doneButtonHandler = () => {
    // uppy.on("", () => {});
    uppy.cancelAll();
  };

  const { showInlineDashboard } = state;

  return (
    <div className="hidden lg:flex flex-col overflow-y-scroll custom-scrollbar scrollbar mt-2 w-full lg:w-1/4 px-4">
      <div className="flex flex-col max-lg:hidden">
        <DragDrop
          uppy={uppy}
          locale={{
            strings: {
              browse: "Browse files",
              dropHereOr: "Drop your file here",
            },
          }}
        />

        <ProgressBar className="mt-2" uppy={uppy} hideAfterFinish={false} />

        <FileInput uppy={uppy} />
      </div>
    </div>
  );
};

const FileUploadMobile = () => {
  const [state, setState] = useState({
    showInlineDashboard: false,
    open: false,
  });

  const [fileList, setFileList] = useState<FileModel[]>([]);

  const uppy = new Uppy({ id: "uppy2", autoProceed: false, debug: true }).use(Tus, { endpoint: "https://tusd.tusdemo.net/files/" });

  useEffect(() => {
    //this will call on component unmount
    uppy.on("upload-success", (file, response) => {
      let fList = fileList;
      let fData: FileModel = {
        name: file!.name,
        size: formatFileSize(file!.size, 2),
        imageUrl: response.uploadURL!,
        extension: file!.extension,
      };
      fList?.push(fData);
      setFileList(fList);

      console.log("State data list:", fileList);

      console.log("image url: ", response.uploadURL);
      console.log("File: ", file?.name);
      console.log("File size: ", file?.size);
      console.log("File extension: ", file?.extension);
    });
    return () => {
      uppy.close({ reason: "unmount" });
    };
  }, [uppy]);

  const handleModalClick = () => {
    setState({
      ...state,
      open: !state.open,
    });
  };

  const doneButtonHandler = () => {
    // uppy2.on("file-removed", () => {});
    // uppy2.on("upload-success", (file, response) => {
    //   console.log("Response: ", response);
    //   console.log("File: ", file);
    // });
    // uppy.cancelAll();
  };

  const { showInlineDashboard } = state;

  return (
    <div className=" hidden max-lg:flex flex-col">
      <div className="flex lg:hidden">
        {fileList?.map((file, index) => {
          return (
            <div className="flex flex-col h-20 w-20" key={index}>
              <div className="text-sm">{file.name.substring(0, 4) + ".." + file.extension}</div>
              {/* <Image src={file.imageUrl} alt={file.name.substring(0, 4) + ".." + file.extension} width={30} height={30} /> */}
              <div className="text-sm">{file.size}</div>
            </div>
          );
        })}
        <div className="flex flex-row bg-slate-100 h-10 p-2 rounded-md items-center" onClick={handleModalClick}>
          <IoIosAttach size={25} />
          <div>Attach Files</div>
        </div>
        {/* <FileInput pretty={true} replaceTargetContent={true} inputName="Attach Files" uppy={uppy} /> */}
        <DashboardModal
          proudlyDisplayPoweredByUppy={false}
          uppy={uppy}
          height={300}
          metaFields={[]}
          // plugins={["GoogleDrive", "Webcam"]}
          showProgressDetails={true}
          doneButtonHandler={doneButtonHandler}
          open={state.open}
          // target={document.body}
          onRequestClose={() => setState({ ...state, open: false })}
        />
      </div>
    </div>
  );
};

export { FileUpload, FileUploadMobile };
