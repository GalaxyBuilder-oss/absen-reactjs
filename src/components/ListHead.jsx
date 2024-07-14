import PropsTypes from "prop-types";

const ListHead = ({ onShowTimeClick, setDormitory, dormitory }) => {
  const prayerTimeList = ["Shubuh", "Dzuhur", "Ashar", "Maghrib", "Isya"];

  const handleDormitory = (e) => {
    setDormitory(e.target.value);
  };

  return (
    <div className="flex justify-between items-center p-2 sm:p-4 gap-2">
      <select
        name="dormitory"
        className="border rounded-md p-0 sm:px-4 text-sm sm:text-md lg:text-xl"
        onChange={handleDormitory}
        defaultValue={dormitory || ''}
      >
        <option value="Asrama Ikhwan">Asrama Ikhwan</option>
        <option value="Asrama Putra">Asrama Putra</option>
        <option value="Asrama Putri">Asrama Putri</option>
        <option value="Asrama Baru">Asrama Baru</option>
      </select>
      <a href="/copy" className="border rounded-md p-0 sm:px-4">Clipboard</a>
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
    </div>
  );
};

ListHead.propTypes = {
  onShowTimeClick: PropsTypes.func,
  setDormitory: PropsTypes.func,
  dormitory: PropsTypes.string,
};

export default ListHead;
