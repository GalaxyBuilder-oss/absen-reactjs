/* eslint-disable react-hooks/exhaustive-deps */
import PropsTypes from "prop-types";
import momen from "moment";
import { useEffect } from "react";
import { useState } from "react";

const ListHeadHistory = ({
  dormitory,
  setDormitory,
  onShowTimeClick,
  fetchDataHistory,
  setDate,
  setMonth,
  setYear,
}) => {
  const prayerTimeList = ["Shubuh", "Dzuhur", "Ashar", "Maghrib", "Isya"];
  const [defaultDate, setDefaultDate] = useState("");


  const handleDormitory = (e) => {
    setDormitory(e.target.value);
  };

  function handleTime(e) {
    setDate(momen(e.target.value).format("D"));
    setMonth(momen(e.target.value).format("M"));
    setYear(momen(e.target.value).format("YYYY"));
    setDefaultDate(e.target.value)
  }

  useEffect(() => {
    setDefaultDate(momen().format("yyyy-MM-DD"));
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
        onChange={onShowTimeClick}
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

ListHeadHistory.propTypes = {
  dormitory: PropsTypes.string,
  setDormitory: PropsTypes.func,
  onShowTimeClick: PropsTypes.func,
  fetchDataHistory: PropsTypes.func,
  setDate: PropsTypes.func,
  setMonth: PropsTypes.func,
  setYear: PropsTypes.func,
};

export default ListHeadHistory;
