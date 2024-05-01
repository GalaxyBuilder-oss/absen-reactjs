import PropsTypes from "prop-types";

const ListHead = ({ newData, showTime, onShowTimeClick }) => {
  return (
    <div className="flex justify-between px-4">
      <h3 className="font-semibold">Nama</h3>
      <div className="flex justify-between gap-10">
        <select
          name="prayTimes"
          className="p-0.5 border rounded-md"
          onChange={onShowTimeClick}
        >
          {showTime.map((time, i) => (
            <option key={i} value={time} className="bg-gray-200 rounded-none">
              {time}
            </option>
          ))}
        </select>
        <button
          className="border rounded-md px-2 hover:bg-gray-300"
          onClick={newData}
        >
          Refresh
        </button>
        <button className="border rounded-md px-2 hover:bg-gray-300">
          Mark All
        </button>
      </div>
    </div>
  );
};

ListHead.propTypes = {
  newData: PropsTypes.func.isRequired,
  showTime: PropsTypes.arrayOf(PropsTypes.string),
  onShowTimeClick: PropsTypes.func.isRequired,
};

export default ListHead;
