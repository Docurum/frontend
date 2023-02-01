import dynamic from "next/dynamic";
import { useState } from "react";
import BottomNavBar from "../BottomNavBar";
import { FileUploadMobile } from "../FileUpload";
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

  return (
    <div className="flex flex-col items-start mt-2 w-full lg:w-1/2 h-[90vh] overflow-x-hidden scrollbar custom-scrollbar">
      <div className="flex flex-col px-2">
        <div className="text-2xl font-bold mt-4 mb-2 text-blue-600">Start a New Topic</div>
        <input
          className="p-4 h-12 outline-none text-lg bg-gray-50 rounded-md shadow-md w-[95vw] sm:w-[75vw] md:w-[60vw] lg:w-[45vw] text-gray-700"
          onChange={handleChange}
          type="text"
          name="title"
          placeholder="Add Title"
        />
        <Editor formValues={formValues} setFormValues={setFormValues} />
        <div className="flex flex-row justify-between items-center mt-4">
          <div
            className="flex flex-row items-center justify-center h-10 w-20 bg-blue-600 rounded-md"
            onClick={() => {
              console.log(formValues);
            }}
          >
            <div className="text-white font-bold text-lg">Post</div>
          </div>
          <FileUploadMobile />
        </div>
      </div>
      <BottomNavBar />
    </div>
  );
}
