import { useState, useEffect, FC } from "react";
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
import { MdDelete, MdDeleteForever } from "react-icons/md";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { AiOutlineDown } from "react-icons/ai";
import { FiChevronDown } from "react-icons/fi";

interface ScheduleItem {
  [key: string]: string | number | undefined;
  day: string;
  startTime: string;
  endTime: string;
  numberOfConsultations: number;
  type: string;
  location?: string;
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
    { day: "Sun", startTime: "", endTime: "", numberOfConsultations: 0, type: "Active" },
    { day: "Mon", startTime: "", endTime: "", numberOfConsultations: 0, type: "Active" },
    { day: "Tue", startTime: "", endTime: "", numberOfConsultations: 0, type: "Active" },
    { day: "Wed", startTime: "", endTime: "", numberOfConsultations: 0, type: "Active" },
    { day: "Thu", startTime: "", endTime: "", numberOfConsultations: 0, type: "Active" },
    { day: "Fri", startTime: "", endTime: "", numberOfConsultations: 0, type: "Active" },
    { day: "Sat", startTime: "", endTime: "", numberOfConsultations: 0, type: "Active" },
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
                  className=""
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
                  selectedSections={undefined}
                  onSelectedSectionsChange={undefined}
                />
              </div>
              <div className="flex flex-row mr-2 w-[180px]">
                <DatePicker
                  className=""
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
            {/* <div className="flex flex-col">
              <TimezoneSelect className=" border-slate-40 w-60" minMenuHeight={50} value={selectedTimezone} onChange={setSelectedTimezone} />
            </div> */}
          </div>
          <div className="grid grid-cols-1 xl:grid-cols-2">
            {schedule.map((sch, id) => (
              <AvailabilityDay key={id} id={id} sch={sch} handleNumberOfConsultChange={handleNumberOfConsultChange} handleTimeChange={handleTimeChange} />
            ))}
          </div>
        </div>
        <button onClick={handleSaveSchedules} className="h-10 w-36 mb-8 max-sm:mb-16 flex flex-row items-center justify-center font-bold rounded-md text-white  bg-blue-600">
          SAVE SCHEDULES
        </button>
      </div>
      <BottomNavBar />
    </div>
  );
};

interface IAvailabilityDayProps {
  id: number;
  sch: ScheduleItem;
  handleTimeChange: (e: React.ChangeEvent<HTMLSelectElement>, id: number) => void;
  handleNumberOfConsultChange: (e: React.ChangeEvent<HTMLInputElement>, id: number) => void;
}

const AvailabilityDay: FC<IAvailabilityDayProps> = ({ sch, id, handleTimeChange, handleNumberOfConsultChange }) => {
  const availabilityTypeList = ["Active", "Offline", "Disable"];
  const [availabilityType, setAvailabilityType] = useState("Active");
  const [primaryColor, setPrimaryColor] = useState("rgb(22, 163, 74)");

  //rgb(187, 247, 208) green-200
  //rgb(22, 163, 74) green-600
  //rgb(37, 99, 235) blue-600
  //rgb(71, 85, 105) slate-600
  //rgb(220, 252, 231) green-100
  return (
    <div
      className="flex transition duration-500 ease-out flex-col m-2 p-4 items-start bg-slate-50 hover:scale-105 hover:bg-blue-50 rounded-md shadow-sm hover:shadow-lg hover:shadow-blue-300 shadow-blue-200"
      key={id}
    >
      <div className="font-bold text-lg text-blue-600 w-12 mb-2">{sch.day}</div>
      <div className="flex flex-row">
        <div className="flex flex-col">
          <label className="font-bold text-slate-600" htmlFor="startTime">
            Start Time
          </label>
          <select className="w-32 border-2 mt-2 border-slate-400 h-8 rounded-md" name="startTime" id="startTime" onChange={(e) => handleTimeChange(e, id)}>
            {time.map((t) => (
              <option key={t.id} value={t.t} id={t.id}>
                {t.t}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col ml-4">
          <label className="font-bold text-slate-600" htmlFor="endTime">
            End Time
          </label>
          <select className="w-32 border-2 mt-2 border-slate-400 h-8 rounded-md" name="endTime" id="endTime" onChange={(e) => handleTimeChange(e, id)}>
            {time.map((t) => (
              <option key={t.id} value={t.t} id={t.id}>
                {t.t}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="flex flex-row items-end justify-between w-full">
        <div className="flex flex-col mt-2">
          <label className="font-bold text-slate-600" htmlFor="endTime">
            Consult Count
          </label>
          <input
            type="number"
            className="w-32 border-2 p-2 mt-2 border-slate-400 h-8 rounded-md"
            name="numberOfConsultations"
            id="numberOfConsultations"
            onChange={(e) => handleNumberOfConsultChange(e, id)}
          />
        </div>
        {/* <div className="flex flex-row p-2 rounded-md bg-red-100 shadow-md shadow-red-200 hover:cursor-pointer">
        <div className="text-red-600 text-sm font-bold mr-1">Delete</div>
        <MdDelete size={20} color="red" />
      </div> */}
        <DropdownMenu.Root>
          <DropdownMenu.Trigger className="outline-none">
            <div
              className={`flex flex-row items-center p-2 rounded-xl ${availabilityType === "Active" ? "bg-green-100" : availabilityType === "Offline" ? "bg-blue-100" : "bg-slate-100"} shadow-md ${
                availabilityType === "Active" ? "shadow-green-200" : availabilityType === "Offline" ? "shadow-blue-200" : "shadow-slate-200"
              } hover:cursor-pointer`}
            >
              <div className={`h-2 w-2 rounded-full ${availabilityType === "Active" ? "bg-green-600" : availabilityType === "Offline" ? "bg-blue-600" : "bg-slate-600"} mr-2`}></div>
              <div className={`${availabilityType === "Active" ? "text-green-600" : availabilityType === "Offline" ? "text-blue-600" : "text-slate-600"} text-sm font-bold mr-1`}>
                {availabilityType}
              </div>
              <FiChevronDown size={20} color={primaryColor} />
            </div>
          </DropdownMenu.Trigger>
          <DropdownMenu.Portal>
            <DropdownMenu.Content className="w-20 h-[90px] flex flex-col items-end  bg-white rounded-md shadow-lg shadow-slate-200" side="bottom" align="end" sideOffset={2}>
              <div className="items-end mr-[2px] w-0 h-0 border-l-transparent border-l-[6px] border-r-transparent border-r-[6px] border-b-[6px] border-b-slate-100"></div>
              {availabilityTypeList.map((a, index) => {
                let color = "";
                if (a === "Active") {
                  color = "rgb(22, 163, 74)";
                } else if (a === "Offline") {
                  color = "rgb(37, 99, 235)";
                } else if (a === "Disable") {
                  color = "rgb(71, 85, 105)";
                }
                return (
                  <DropdownMenu.Item
                    key={index}
                    className="outline-none"
                    onClick={() => {
                      setAvailabilityType(a);
                      setPrimaryColor(color);
                    }}
                  >
                    <div
                      className={`flex flex-row items-center w-24 pt-2 px-4 py-2 rounded-tr-md rounded-tl-md bg-slate-100 ${
                        a === "Active" ? "hover:bg-green-100" : a === "Offline" ? "hover:bg-blue-100" : "hover:bg-slate-200"
                      } hover:cursor-pointer `}
                    >
                      <div className={`h-2 w-2 rounded-full ${a === "Active" ? "bg-green-600" : a === "Offline" ? "bg-blue-600" : "bg-slate-600"} mr-2`}></div>
                      <div className={`${a === "Active" ? "text-green-600" : a === "Offline" ? "text-blue-600" : "text-slate-600"} text-sm font-bold mr-1`}>{a}</div>
                    </div>
                  </DropdownMenu.Item>
                );
              })}
            </DropdownMenu.Content>
          </DropdownMenu.Portal>
        </DropdownMenu.Root>
      </div>
    </div>
  );
};

export { Booking };
