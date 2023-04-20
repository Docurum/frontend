import { useState, useEffect } from "react";
import TimezoneSelect from "react-timezone-select";

import classNames from "classnames";
import BottomNavBar from "../BottomNavBar";
import styles from "./index.module.css";
import toast from "react-hot-toast";

interface ScheduleItem {
  [key: string]: string;
  day: string;
  startTime: string;
  endTime: string;
}

export const time = [
  { id: "null", t: "Select" },
  { id: "7", t: "7:00am" },
  { id: "8", t: "8:00am" },
  { id: "9", t: "9:00am" },
  { id: "10", t: "10:00am" },
  { id: "11", t: "11:00am" },
  { id: "12", t: "12:00pm" },
  { id: "13", t: "13:00pm" },
  { id: "14", t: "14:00pm" },
  { id: "15", t: "15:00pm" },
  { id: "16", t: "16:00pm" },
  { id: "17", t: "17:00pm" },
  { id: "18", t: "18:00pm" },
  { id: "19", t: "19:00pm" },
];

const Booking = () => {
  const timeZone = Intl.DateTimeFormat().resolvedOptions();
  const [selectedTimezone, setSelectedTimezone] = useState({
    label: "",
    value: "",
  });
  const [schedule, setSchedule] = useState<ScheduleItem[]>([
    { day: "Sun", startTime: "", endTime: "" },
    { day: "Mon", startTime: "", endTime: "" },
    { day: "Tue", startTime: "", endTime: "" },
    { day: "Wed", startTime: "", endTime: "" },
    { day: "Thu", startTime: "", endTime: "" },
    { day: "Fri", startTime: "", endTime: "" },
    { day: "Sat", startTime: "", endTime: "" },
  ]);

  const handleTimeChange = (e: React.ChangeEvent<HTMLSelectElement>, id: number): void => {
    const { name, value } = e.target;
    if (value === "Select") return;
    const list = [...schedule];
    list[id][name] = value;
    setSchedule(list);
  };

  const handleSaveSchedules = () => {
    let initVal = {
      label: "",
      value: "",
    };

    if (JSON.stringify(selectedTimezone) !== JSON.stringify(initVal)) {
      console.log(schedule);
      console.log("Timezone: ", selectedTimezone);
      console.log("Client Timezone: ", timeZone);
    } else {
      toast.error("Select your timezone");
    }
  };

  return (
    <div className={classNames([styles["scrollbar"]], ["flex flex-col items-center overflow-y-scroll scrollbar mt-2 w-full lg:w-1/2 h-[90vh]"])}>
      <div className="flex flex-col items-center">
        <div className="font-bold text-xl text-blue-600">Select your availability</div>
        <div className="flex flex-col ">
          <div className="flex flex-row mt-4">
            <div className="font-bold text-lg text-slate-600 my-2">Timezone: </div>
            <TimezoneSelect className="ml-4 border-slate-400 w-60" value={selectedTimezone} onChange={setSelectedTimezone} />
          </div>

          {schedule.map((sch, id) => (
            <div className="flex flex-row my-4 items-center" key={id}>
              <div className="font-bold text-slate-600 mt-2 w-12">{sch.day}</div>
              <div className="flex flex-col ml-4">
                <label htmlFor="startTime">Start Time</label>
                <select className="w-32 border-2 mt-2 border-slate-400 h-8 rounded-md" name="startTime" id="startTime" onChange={(e) => handleTimeChange(e, id)}>
                  {time.map((t) => (
                    <option key={t.id} value={t.t} id={t.id}>
                      {t.t}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col ml-4">
                <label htmlFor="endTime">End Time</label>
                <select className="w-32 border-2 mt-2 border-slate-400 h-8 rounded-md" name="endTime" id="endTime" onChange={(e) => handleTimeChange(e, id)}>
                  {time.map((t) => (
                    <option key={t.id} value={t.t} id={t.id}>
                      {t.t}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          ))}
        </div>
        <button onClick={handleSaveSchedules} className="h-10 w-36 mb-8 max-sm:mb-16 flex flex-row items-center justify-center font-bold rounded-md text-white  bg-blue-600">
          SAVE SCHEDULES
        </button>
      </div>
      <BottomNavBar />
    </div>
  );
};

export { Booking };
