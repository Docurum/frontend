import AppBar from "../../components/AppBar";
import QandASection from "../../components/QandASection";

export default function Home() {
  return (
    <div className="flex flex-col h-[100vh] overflow-y-hidden">
      <AppBar />
      <div className="flex flex-row h-[90vh]">
        <div className="w-[25vw] shadow-md shadow-blue-400 border-2 border-black"></div>
        <QandASection />
        <div className="w-[25vw] shadow-md shadow-blue-400 border-2 border-black"></div>
      </div>
    </div>
  );
}
