import PropsTypes from "prop-types";

const ListHead = ({ newData, showTime, onShowTimeClick }) => {
  return (
    <div className="flex justify-between items-center p-2 sm:p-4 gap-2">
      {/* <div className="flex justify-between gap-2 text-xs sm:text-sm xl:text-xl"> */}
        <select
          name="prayTimes"
          className="border rounded-md p-0 sm:px-4"
          onChange={onShowTimeClick}
        >
          {showTime.map((time, i) => (
            <option key={i} value={time} className="bg-gray-200 rounded-none">
              {time}
            </option>
          ))}
        </select>
        <button
          className="border rounded-md px-2 sm:px-4 hover:bg-gray-300"
          onClick={()=>newData()}
        >
          Refresh
        </button>
        {/* <button className="border rounded-md px-2 sm:px-4 hover:bg-gray-300">
          Mark All
        </button> */}
      {/* </div> */}
    </div>
  );
};

ListHead.propTypes = {
  newData: PropsTypes.func.isRequired,
  showTime: PropsTypes.arrayOf(PropsTypes.string),
  onShowTimeClick: PropsTypes.func.isRequired,
};

export default ListHead;
