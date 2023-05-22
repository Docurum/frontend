import { useState, useEffect } from "react";
import TimezoneSelect from "react-timezone-select";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs, { Dayjs } from "dayjs";
import TextField from "@mui/material/TextField";

import classNames from "classnames";
import BottomNavBar from "../BottomNavBar";
import styles from "./index.module.css";
import toast from "react-hot-toast";

interface ScheduleItem {
  [key: string]: string | number;
  day: string;
  startTime: string;
  endTime: string;
  numberOfConsultations: number;
}

export const time = [
  { id: "null", t: "Timezone" },
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
    { day: "Sun", startTime: "", endTime: "", numberOfConsultations: 0 },
    { day: "Mon", startTime: "", endTime: "", numberOfConsultations: 0 },
    { day: "Tue", startTime: "", endTime: "", numberOfConsultations: 0 },
    { day: "Wed", startTime: "", endTime: "", numberOfConsultations: 0 },
    { day: "Thu", startTime: "", endTime: "", numberOfConsultations: 0 },
    { day: "Fri", startTime: "", endTime: "", numberOfConsultations: 0 },
    { day: "Sat", startTime: "", endTime: "", numberOfConsultations: 0 },
  ]);

  const handleTimeChange = (e: React.ChangeEvent<HTMLSelectElement>, id: number): void => {
    const { name, value } = e.target;
    if (value === "Select") return;
    const list = [...schedule];
    list[id][name] = value;
    setSchedule(list);
  };
  const [fromDate, setFromDate] = useState(dayjs(new Date()));
  const [toDate, setToDate] = useState(dayjs(new Date()));
  const handleNumberOfConsultChange = (e: React.ChangeEvent<HTMLInputElement>, id: number): void => {
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
          <div className="flex flex-row mt-4 justify-around">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <div className="flex flex-row mr-2 w-[180px]">
                <DatePicker
                  label="From"
                  minDate={dayjs(new Date("01-01-2021"))}
                  maxDate={dayjs(Date.now())}
                  value={fromDate}
                  onChange={(newValue: any) => {
                    let month = newValue["$M"] + 1;
                    if (month < 10) {
                      month = "0" + month.toString();
                    }
                    let day = newValue["$D"];
                    if (day < 10) {
                      day = "0" + day.toString();
                    }
                    let d = newValue["$y"] + "-" + month + "-" + day;
                    console.log("From date: ", newValue["$d"]);
                    console.log("From date: ", d);
                    setFromDate(newValue);
                  }}
                />
              </div>
              <div className="flex flex-row mr-2 w-[180px]">
                <DatePicker
                  minDate={dayjs(fromDate)}
                  maxDate={dayjs(new Date())}
                  label="To"
                  value={toDate}
                  onChange={(newValue: any) => {
                    let month = newValue["$M"] + 1;
                    if (month < 10) {
                      month = "0" + month.toString();
                    }
                    let day = newValue["$D"];
                    if (day < 10) {
                      day = "0" + day.toString();
                    }
                    let d = newValue["$y"] + "-" + month + "-" + day;
                    setToDate(newValue);
                  }}
                />
              </div>
            </LocalizationProvider>
            <div className="flex flex-col">
              <TimezoneSelect  className=" border-slate-40 w-60" minMenuHeight={50} value={selectedTimezone} onChange={setSelectedTimezone} />
            </div>
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
              <div className="flex flex-col ml-4">
                <label htmlFor="endTime">No. of Consultations</label>
                <input
                  type="number"
                  className="w-32 border-2 p-2 mt-2 border-slate-400 h-8 rounded-md"
                  name="numberOfConsultations"
                  id="numberOfConsultations"
                  onChange={(e) => handleNumberOfConsultChange(e, id)}
                />
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
