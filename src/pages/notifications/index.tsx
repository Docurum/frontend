import { IoIosNotificationsOutline } from "react-icons/io";
import AppBar from "../../components/AppBar";
import BottomNavBar from "../../components/BottomNavBar";
import Notification from "../../components/Notification";

export default function NotificationsPage() {
  return (
    <div className="flex flex-col max-h-[100vh] h-[100vh] max-w-[100vw] w-[100vw] overflow-y-hidden justify-center items-center">
      <div className="flex flex-col max-w-[1920px] w-[100vw]">
        <div className="flex flex-row shadow max-h-[10vh] h-[8vh] sm:h-[10vh] items-center">
          <div className="hidden max-sm:flex ml-5">
            <IoIosNotificationsOutline size={30} />
          </div>
          <div className="text-lg font-bold ml-2">Notifications</div>
        </div>
        <div className="flex flex-row h-[90vh]">
          <div className="flex flex-col w-[100vw]">
            <Notification />
          </div>
          <BottomNavBar />
        </div>
      </div>
    </div>
  );
}
