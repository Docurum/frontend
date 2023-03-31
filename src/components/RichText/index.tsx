/* eslint-disable @next/next/no-img-element */
import classNames from "classnames";
import isHotkey from "is-hotkey";
import { FC, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { BaseEditor, Descendant, Editor, Element as SlateElement, Transforms, createEditor } from "slate";
import { withHistory } from "slate-history";
import { Editable, Slate, useSlate, withReact } from "slate-react";
import { DropzoneCommentArea, DropzoneMobile } from "../Dropzone";
import { MdDeleteForever } from "react-icons/md";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { createId } from "@paralleldrive/cuid2";
import toast from "react-hot-toast";
import { createComment } from "../../api/forum/commentService";

const HOTKEYS = {
  "mod+b": "bold",
  "mod+i": "italic",
  "mod+u": "underline",
  "mod+`": "code",
};

const LIST_TYPES = ["numbered-list", "bulleted-list"];
const TEXT_ALIGN_TYPES = ["left", "center", "right", "justify"];

interface IRichTextProps {
  formValues: any;
  setFormValues: any;
}

const RichTextExample: FC<IRichTextProps> = ({ formValues, setFormValues }) => {
  const renderElement = useCallback((props: any) => <Element {...props} />, []);
  const renderLeaf = useCallback((props: any) => <Leaf {...props} />, []);
  const editor = useMemo(() => withHistory(withReact(createEditor())), []);

  const [descVal, setDescVal] = useState(initialValue);

  return (
    <Slate
      editor={editor}
      value={formValues.description}
      onChange={(val) => {
        setDescVal(val);
        setFormValues({ ...formValues, description: val });
      }}
    >
      <div className="flex flex-row mt-4 p-2">
        <MarkButton format="bold" text="B" icon="format_bold" />
        <MarkButton format="italic" text="I" icon="format_italic" />
        <MarkButton format="underline" text="U" icon="format_underlined" />
        {/* <MarkButton format="code" text="<>" icon="code" /> */}
      </div>
      {/* <div className="flex flex-row  border-b-[1px] border-slate-500 mb-5 p-2"> */}
      {/* <BlockButton format="heading-one" icon="looks_one" />
         <BlockButton format="heading-two" icon="looks_two" />
        <BlockButton format="block-quote" icon="format_quote" />
        <BlockButton format="numbered-list" icon="format_list_numbered" />
        <BlockButton format="bulleted-list" icon="format_list_bulleted" />
        <BlockButton format="left" icon="format_align_left" />
        <BlockButton format="center" icon="format_align_center" />
        <BlockButton format="right" icon="format_align_right" />
        <BlockButton format="justify" icon="format_align_justify" /> */}
      {/* </div> */}
      <Editable
        className="mt-1 p-4 max-h-96 h-60 overflow-x-hidden overflow-y-scroll custom-scrollbar scrollbar items-start justify-start outline-none bg-slate-50 text-lg rounded-md shadow-md w-[95vw] sm:w-[75vw] md:w-[60vw] lg:w-[45vw] text-gray-700"
        renderElement={renderElement}
        renderLeaf={renderLeaf}
        placeholder="What's on your mind ?"
        spellCheck
        aria-atomic
        autoFocus
        onKeyDown={(event) => {
          for (let hotkey in HOTKEYS) {
            if (isHotkey(hotkey, event as any)) {
              event.preventDefault();
              const mark = (HOTKEYS as any)[hotkey];
              toggleMark(editor, mark);
            }
          }
        }}
      />
    </Slate>
  );
};

const ReadOnlyRichText: FC<{
  data: any[];
}> = ({ data }) => {
  const editor = useMemo(() => withHistory(withReact(createEditor())), []);

  return (
    <Slate editor={editor} value={data}>
      <Editable readOnly className="text-md text-gray-600 mt-2 pr-6 font-bold items-start justify-start outline-none w-[95vw] sm:w-[75vw] md:w-[60vw] lg:w-[45vw]" />
    </Slate>
  );
};

const RichTextCommentArea: FC<{
  formValues: any;
  setFormValues: any;
  isCommentSelected: boolean;
  topicId: string;
}> = ({ formValues, setFormValues, isCommentSelected, topicId }) => {
  const renderElement = useCallback((props: any) => <Element {...props} />, []);
  const renderLeaf = useCallback((props: any) => <Leaf {...props} />, []);
  const editor = useMemo(() => withHistory(withReact(createEditor())), []);

  const [descVal, setDescVal] = useState(initialValue);
  const [files, setFiles] = useState<any[]>([]);
  const uploadedImages: React.MutableRefObject<any[]> = useRef([]);
  const uploadedImageFiles: React.MutableRefObject<any[]> = useRef([]);

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

  const deleteFile = (file: any) => {
    setFiles((files) => {
      const newFiles = files.filter((f) => f.path !== file.path);
      return newFiles;
    });
  };

  const submit = async () => {
    try {
      const { data } = await createComment({
        topicId: topicId,
        description: formValues,
        assetUrl: uploadedImages.current,
      });
      toast.success(data.message, { id: data.message });
      setFiles([]);
      uploadedImages.current = [];
      uploadedImageFiles.current = [];
      setDescVal(initialValue);
      setFormValues([]);
    } catch (e) {
      toast.error("Something went wrong! Unable to Create topic", { id: "server-conn-fail" });
    }
  };

  return (
    <div className="flex flex-col">
      <Slate
        editor={editor}
        value={descVal}
        onChange={(val) => {
          setDescVal(val);
          setFormValues(val);
        }}
      >
        <Editable
          className="mt-1 p-4 max-h-96 h-30 overflow-x-hidden overflow-y-scroll custom-scrollbar scrollbar items-start justify-start outline-none text-lg rounded-md w-[80vw] sm:w-[80vw] md:w-[65vw] lg:w-[45vw] text-gray-700"
          renderElement={renderElement}
          renderLeaf={renderLeaf}
          placeholder="Share your thoughts . . . "
          spellCheck
          aria-atomic
          autoFocus
          onKeyDown={(event) => {
            for (let hotkey in HOTKEYS) {
              if (isHotkey(hotkey, event as any)) {
                event.preventDefault();
                const mark = (HOTKEYS as any)[hotkey];
                toggleMark(editor, mark);
              }
            }
          }}
        />

        {isCommentSelected ? (
          <div className="flex flex-row items-center justify-between">
            <div className="flex flex-row p-2">
              <MarkButton format="bold" text="B" icon="format_bold" />
              <MarkButton format="italic" text="I" icon="format_italic" />
              <MarkButton format="underline" text="U" icon="format_underlined" />
              {/* <MarkButton format="code" text="<>" icon="code" /> */}
              <DropzoneCommentArea setFiles={setFiles} />
            </div>
            <div className={classNames(["mx-4 flex flex-row items-center justify-center shrink-0 h-8 sm:h-10 w-16 sm:w-20 bg-blue-600 rounded-lg"], [""])} onClick={() => submit()}>
              <div className="text-white font-bold text-md sm:text-lg">Reply</div>
            </div>
          </div>
        ) : (
          <></>
        )}
      </Slate>
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
  );
};

const toggleBlock = (editor: any, format: any) => {
  const isActive = isBlockActive(editor, format, TEXT_ALIGN_TYPES.includes(format) ? "align" : "type");

  const isList = LIST_TYPES.includes(format);

  Transforms.unwrapNodes(editor, {
    match: (n) => !Editor.isEditor(n) && SlateElement.isElement(n) && LIST_TYPES.includes((n as any).type) && !TEXT_ALIGN_TYPES.includes(format),
    split: true,
  });
  let newProperties: Partial<SlateElement> | any;
  if (TEXT_ALIGN_TYPES.includes(format)) {
    newProperties = {
      align: isActive ? undefined : format,
    };
  } else {
    newProperties = {
      type: "paragraph",
    };
  }
  Transforms.setNodes<SlateElement>(editor, newProperties);
  if (!isActive && isList) {
    const block = { type: format, children: [] };
    Transforms.wrapNodes(editor, block);
  }
};

const toggleMark = (editor: BaseEditor, format: string) => {
  const isActive = isMarkActive(editor, format);
  if (isActive) {
    Editor.removeMark(editor, format);
  } else {
    Editor.addMark(editor, format, true);
  }
};

const isBlockActive = (editor: BaseEditor, format: any, blockType: string) => {
  const { selection } = editor;
  if (!selection) return false;
  const [match] = Array.from(
    Editor.nodes(editor, {
      at: Editor.unhangRange(editor, selection),
      match: (n) => !Editor.isEditor(n) && SlateElement.isElement(n) && (n as any)[blockType] === format,
    })
  );
  return !!match;
};

const isMarkActive = (editor: BaseEditor, format: string | number) => {
  const marks = Editor.marks(editor);
  return marks ? (marks as any)[format] === true : false;
};

// TODO: h1 and h2 may not work with tailwind use tailwind classes inside div
const Element = ({ attributes, children, element }: { attributes: any; children: any; element: any }) => {
  const style = { textAlign: element.align };
  switch (element.type) {
    case "block-quote":
      return (
        <blockquote style={style} {...attributes}>
          {children}
        </blockquote>
      );
    case "bulleted-list":
      return (
        <ul style={style} {...attributes}>
          {children}
        </ul>
      );
    case "heading-one":
      return (
        <h1 style={style} {...attributes}>
          {children}
        </h1>
      );
    case "heading-two":
      return (
        <h2 style={style} {...attributes}>
          {children}
        </h2>
      );
    case "list-item":
      return (
        <li style={style} {...attributes}>
          {children}
        </li>
      );
    case "numbered-list":
      return (
        <ol style={style} {...attributes}>
          {children}
        </ol>
      );
    default:
      return (
        <p style={style} {...attributes}>
          {children}
        </p>
      );
  }
};

const Leaf = ({ attributes, children, leaf }: { attributes: any; children: any; leaf: any }) => {
  if (leaf.bold) {
    children = <strong>{children}</strong>;
  }

  if (leaf.code) {
    children = <code>{children}</code>;
  }

  if (leaf.italic) {
    children = <em>{children}</em>;
  }

  if (leaf.underline) {
    children = <u>{children}</u>;
  }

  return <span {...attributes}>{children}</span>;
};

const BlockButton = (format: any, icon: any) => {
  const editor = useSlate();
  let active = isBlockActive(editor, format, TEXT_ALIGN_TYPES.includes(format) ? "align" : "type") ? "bg-white" : "bg-white";
  return (
    <div
      className={`${active} cursor-pointer`}
      onMouseDown={(event: { preventDefault: () => void }) => {
        event.preventDefault();
        toggleBlock(editor, format);
      }}
    >
      <span>{icon}</span>
    </div>
  );
};

const MarkButton = ({ format, icon, text }: { format: any; icon: any; text: string }) => {
  const editor = useSlate();
  const color = isMarkActive(editor, format) ? "text-black" : "text-gray-400";
  return (
    <div
      className={classNames(
        [color],
        ["cursor-pointer mr-2 items-center justify-center flex flex-row text-center rounded-lg h-8 w-8 bg-gray-200"],
        { "font-bold": text === "B" },
        { "font-serif italic": text === "I" },
        { underline: text === "U" }
      )}
      onMouseDown={(event: { preventDefault: () => void }) => {
        event.preventDefault();
        toggleMark(editor, format);
      }}
    >
      <span className="text-center">{text}</span>
    </div>
  );
};

const initialValue: Descendant[] | any[] = [
  {
    type: "paragraph",
    children: [{ text: "" }],
  },
  // {
  //   type: "paragraph",
  //   children: [
  //     {
  //       text: "Since it's rich text, you can do things like turn a selection of text ",
  //     },
  //     { text: "bold", bold: true },
  //     {
  //       text: ", or add a semantically rendered block quote in the middle of the page, like this:",
  //     },
  //   ],
  // },
  // {
  //   type: "block-quote",
  //   children: [{ text: "A wise quote." }],
  // },
  // {
  //   type: "paragraph",
  //   align: "center",
  //   children: [{ text: "Try it out for yourself!" }],
  // },
];

export { RichTextExample, RichTextCommentArea, ReadOnlyRichText };
