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
    if (JSON.stringify(selectedTimezone) !== "{}") {
      console.log(schedule);
    } else {
      toast.error("Select your timezone");
    }
  };

  return (
    <div className={classNames([styles["scrollbar"]], ["flex flex-col items-center overflow-y-scroll scrollbar mt-2 w-full lg:w-1/2 h-[90vh]"])}>
      <main className="dashboard__main">
        <h2 className="dashboard__heading">Select your availability</h2>
        <div className="timezone__wrapper">
          <p>Pick your timezone</p>
          <TimezoneSelect value={selectedTimezone} onChange={setSelectedTimezone} />

          {schedule.map((sch, id) => (
            <div className="form" key={id}>
              <p>{sch.day}</p>
              <div className="select__wrapper">
                <label htmlFor="startTime">Start Time</label>
                <select name="startTime" id="startTime" onChange={(e) => handleTimeChange(e, id)}>
                  {time.map((t) => (
                    <option key={t.id} value={t.t} id={t.id}>
                      {t.t}
                    </option>
                  ))}
                </select>
              </div>
              <div className="select__wrapper">
                <label htmlFor="endTime">End Time</label>
                <select name="endTime" id="endTime" onChange={(e) => handleTimeChange(e, id)}>
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

        <div className="saveBtn__container">
          <button onClick={handleSaveSchedules}>SAVE SCHEDULES</button>
        </div>
      </main>
      <BottomNavBar />
    </div>
  );
};

export { Booking };
