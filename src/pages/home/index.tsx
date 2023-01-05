import AppBar from "../../components/AppBar";
import QandACard from "../../components/QandACard";

export default function Home() {
  return (
    <div className="flex flex-col h-[100vh]">
      <AppBar />
      <div className="flex flex-row h-[90vh]">
        <div className="basis-1/4 shadow-md shadow-blue-400 border-2 border-black"></div>
        <QandACard />
        <div className="basis-1/4 shadow-md shadow-blue-400 border-2 border-black"></div>
      </div>
    </div>
  );
}
