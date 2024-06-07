import PropTypes from "prop-types";
import FormGroup from "./style/FormGroup";
import { PencilSharp, TrashBin } from "react-ionicons";

const ListAbsen = ({ data, setEditData, onEditShow, handleAlpha, handlePermit, handlePresent, handleDelete }) => {

  return (
    <div className="w-full h-[70vh] flex flex-col gap-2 overflow-y-scroll p-2 xl:text-xl">
      {data != null && data.length > 0
        ? data
            .sort((a, b) => a.name.localeCompare(b.name))
            .map((item, i) => (
              <div
                key={i}
                className="w-full border p-2 flex flex-col gap-2 hover:bg-gray-200 cursor-pointer relative rounded-md"
              >
                <FormGroup>
                  <span className="">{i + 1 + ". " + item.name}</span>
                </FormGroup>
                <div className="flex justify-between items-center">
                  <div className="checkbox flex justify-between gap-4">
                    <FormGroup>
                      <input
                        required
                        id="check"
                        type="radio"
                        name={"check-"+i}
                        className="size-4 accent-green-600"
                        onChange={(e) => handlePresent(e, item.id)}
                        checked={item.present}
                      />{" "}
                      <label className="">H</label>
                    </FormGroup>
                    <FormGroup>
                      <input
                        required
                        id="check"
                        type="radio"
                        name={"check-"+i}
                        className="size-4 accent-yellow-600"
                        onChange={(e) => handlePermit(e, item.id)}
                        checked={item.permit}
                      />{" "}
                      <label className="">I</label>
                    </FormGroup>
                    <FormGroup>
                      <input
                        required
                        id="check"
                        type="radio"
                        name={"check-"+i}
                        className="size-4 accent-red-500"
                        onChange={(e) => handleAlpha(e, item.id)}
                        checked={item.alpha}
                      />{" "}
                      <label className="">A</label>
                    </FormGroup>
                  </div>
                  <div className="btn-group flex gap-4">
                    <button onClick={()=>{onEditShow();setEditData(item)}}>
                      <PencilSharp color={"green"} />
                      {/* Edit */}
                    </button>
                    <button
                    className="hidden"
                      onClick={() => handleDelete(item.id)}>
                      <TrashBin color={"#f00"} />
                      {/* Delete */}
                    </button>
                  </div>
                </div>
              </div>
            ))
        : "Tidak Ada Data"}
    </div>
  );
};

export default ListAbsen;

ListAbsen.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  setEditData: PropTypes.func.isRequired,
  handleAlpha: PropTypes.func.isRequired,
  handlePermit: PropTypes.func.isRequired,
  handlePresent: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
  onEditShow: PropTypes.func.isRequired,
};
