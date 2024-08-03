import { ChangeEventHandler } from "react";
import { useAppContext } from "./provider/useAppContext";

const ListHead = () => {
  const { handlePrayerTime, setDormitory, dormitory, prayerTimeList } = useAppContext()

  const handleDormitory: ChangeEventHandler<HTMLSelectElement> = (e) => {
    setDormitory(e.target.value);
  };

  return (
    <div className="flex justify-between items-center p-2 sm:p-4">
      <select
        name="dormitory"
        className="border rounded-md px-1 sm:px-4 text-sm sm:text-md lg:text-xl"
        onChange={handleDormitory}
        defaultValue={dormitory || ''}
      >
        <option value="Asrama Ikhwan">Asrama Ikhwan</option>
        <option value="Asrama Putra">Asrama Putra</option>
        <option value="Asrama Putri">Asrama Putri</option>
        <option value="Asrama Baru">Asrama Baru</option>
      </select>
      {/* <a href="/copy" className="border rounded-md px-1 sm:px-4">Clipboard</a> */}
      <select
        name="prayTimes"
        className="border rounded-md px-1 sm:px-4"
        onChange={handlePrayerTime}
      >
        {prayerTimeList.map((time, i) => (
          <option key={i} value={time} className="bg-gray-200 rounded-none">
            {time}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ListHead;
