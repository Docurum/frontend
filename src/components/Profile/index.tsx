import dynamic from "next/dynamic";
import Image from "next/image";

const myLoader = () => {
  return `https://pbs.twimg.com/profile_images/1537184036019662848/gVRdNbym_400x400.jpg`;
};

const Chart = dynamic(() => import("../Chart"), {
  ssr: false,
});

export default function Profile() {
  return (
    <div className="mt-2 flex flex-col w-full lg:w-2/4 h-[90vh]">
      <div className=" w-36 h-36 rounded-2xl m-4 shrink-0 hover:cursor-pointer">
        <Image
          style={{
            borderRadius: "20px",
          }}
          loader={myLoader}
          src={"https://avatars.dicebear.com/api/personas/her.svg"}
          alt={"avatar"}
          height={30}
          width={200}
        />
      </div>
      <Chart display="Hello chart" />
    </div>
  );
}
