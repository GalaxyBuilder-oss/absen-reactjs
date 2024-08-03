/* eslint-disable react-hooks/exhaustive-deps */
import moment from "moment";
import { ChangeEventHandler, useEffect } from "react";
import { useState } from "react";
import { useAppContext } from "./provider/useAppContext";

const ListHeadHistory = () => {
  const { dormitory, setDormitory, handlePrayerTime, fetchDataHistory, setDate, setMonth, setYear } = useAppContext()
  const prayerTimeList: string[] = ["Shubuh", "Dzuhur", "Ashar", "Maghrib", "Isya"];
  const [defaultDate, setDefaultDate] = useState<string>(moment().format("YYYY-MM-DD"));


  const handleDormitory: ChangeEventHandler<HTMLSelectElement> = (e) => {
    setDormitory(e.target.value);
  };

  const handleTime: ChangeEventHandler<HTMLInputElement>  = (e) => {
    setDate(parseInt(moment(e.target.value).format("D")));
    setMonth(parseInt(moment(e.target.value).format("M")));
    setYear(parseInt(moment(e.target.value).format("YYYY")));
    setDefaultDate(e.target.value)
  }

  useEffect(() => {
    setDefaultDate(moment().format("yyyy-MM-DD"));
  }, []);

  useEffect(() => {
    fetchDataHistory();
  }, []);

  return (
    <div className="flex justify-between items-center flex-wrap p-2 sm:p-4 gap-2">
      <select
        name="dormitory"
        className="border rounded-md p-0 sm:px-4 text-sm sm:text-md lg:text-xl"
        onChange={handleDormitory}
        defaultValue={dormitory}
      >
        <option value="Asrama Ikhwan">Asrama Ikhwan</option>
        <option value="Asrama Putra">Asrama Putra</option>
        <option value="Asrama Putri">Asrama Putri</option>
        <option value="Asrama Baru">Asrama Baru</option>
      </select>
      <input
        type="date"
        name="date"
        onChange={handleTime}
        value={defaultDate}
        className="border rounded-md p-0 sm:px-4 text-sm sm:text-md lg:text-xl"
      />
      <select
        name="prayTimes"
        className="border rounded-md p-0 sm:px-4"
        onChange={handlePrayerTime}
      >
        {prayerTimeList.map((time, i) => (
          <option key={i} value={time} className="bg-gray-200 rounded-none">
            {time}
          </option>
        ))}
      </select>
      <input
        type="button"
        className="border rounded-md p-0 sm:px-4 text-sm sm:text-md lg:text-xl hover:cursor-pointer hover:bg-slate-100"
        value="Refresh"
        onClick={fetchDataHistory}
      />
    </div>
  );
};

export default ListHeadHistory;
