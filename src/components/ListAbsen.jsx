import PropTypes from "prop-types";
import FormGroup from "./style/FormGroup";
import { InformationCircle, PencilSharp, TrashBin } from "react-ionicons";
import { deleteData, setDBData } from "../utils/db/connect";
import { useState } from "react";
import EditView from "./EditView";

const ListAbsen = ({
  filteredData,
  realData,
  isAdmin,
  isLoading,
  refreshData,
}) => {
  // Declare
  const [enableDelete, setEnableDelete] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [editData, setEditData] = useState();

  // Method
  const handleShowEdit = () => {
    setShowEdit(!showEdit);
  };
  const saveData = (editedData) => {
    const temp = realData.map((item) => {
      if (item.id === editData.id)
        return {
          id: editData.id,
          name: editedData.name,
          generation: editedData.generation,
          dormitory: editedData.dormitory,
          present: editedData.present,
          permit: editedData.permit,
          alpha: editedData.alpha,
        };
      return item;
    });
    temp ? setDBData(temp) : console.error("Data Kosong");
    refreshData();
    handleShowEdit()
  };
  const handleDelete = (id) => {
    setEnableDelete(true);
    deleteData(id)
      .then(() => {
        console.log("Data di tengah array berhasil dihapus.");
        refreshData();
        setEnableDelete(false);
      })
      .catch((error) => {
        console.error("Gagal menghapus data di tengah array:", error);
      });
  };
  const handlePresent = (event, id) => {
    setStatus(id, true, false, false);
  };
  const handlePermit = (event, id) => {
    setStatus(id, false, true, false);
  };
  const handleAlpha = (event, id) => {
    setStatus(id, false, false, true);
  };

  // helper method
  const setStatus = (id, presentValue, permitValue, alphaValue) => {
    const updatedData = realData.map((item) => {
      if (item.id === id)
        return {
          ...item,
          present: presentValue,
          permit: permitValue,
          alpha: alphaValue,
        };
      return item;
    });
    setDBData(updatedData); // Memperbarui data asli
    refreshData();
  };
  return (
    <>
      <div className="w-full h-[70vh] lg:h-[63vh] flex flex-col gap-2 overflow-y-scroll p-2 lg:text-xl scrollbar-hide">
        {isLoading ? (
          <div className="text-center text-xl lg:text-2xl font-mono">
            Data Is Loading...
          </div>
        ) : filteredData != null && filteredData.length > 0 ? (
          filteredData
            .sort((a, b) => a.name.localeCompare(b.name))
            .map((item, i) => (
              <div
                key={i}
                className="w-full border p-2 flex flex-col gap-2 hover:bg-gray-200 cursor-pointer rounded-md"
              >
                <FormGroup>
                  <span className="">{i + 1 + ". " + item.name}</span>
                </FormGroup>
                {isAdmin ? (
                  <div className="flex justify-between items-center">
                    <div className="checkbox flex justify-between gap-4">
                      <FormGroup>
                        <input
                          required
                          id="check"
                          type="radio"
                          name={"check-" + i}
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
                          name={"check-" + i}
                          className="size-4 accent-yellow-300"
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
                          name={"check-" + i}
                          className="size-4 accent-red-500"
                          onChange={(e) => handleAlpha(e, item.id)}
                          checked={item.alpha}
                        />{" "}
                        <label className="">A</label>
                      </FormGroup>
                    </div>
                    <div className="btn-group flex gap-4">
                      <button
                        onClick={() => {
                          setEditData(item);
                          handleShowEdit();
                        }}
                      >
                        <PencilSharp color={"green"} />
                        {/* Edit */}
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        disabled={enableDelete}
                      >
                        <TrashBin color={"#f00"} />
                        {/* Delete */}
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex justify-between items-center">
                    <div className="checkbox flex justify-between gap-4">
                      <FormGroup>
                        <span
                          className={
                            "size-4 rounded-full border " +
                            (item.present && "bg-green-600")
                          }
                        >
                          {" "}
                        </span>
                        <label className="">H</label>
                      </FormGroup>
                      <FormGroup>
                        <span
                          className={
                            "size-4 rounded-full border " +
                            (item.permit && "bg-yellow-300")
                          }
                        >
                          {" "}
                        </span>
                        <label className="">I</label>
                      </FormGroup>
                      <FormGroup>
                        <span
                          className={
                            "size-4 rounded-full border " +
                            (item.alpha && "bg-red-500")
                          }
                        >
                          {" "}
                        </span>
                        <label className="">A</label>
                      </FormGroup>
                    </div>
                    <div className="btn-group flex gap-4">
                      <button onClick={() => alert("Belum Berfungsi")}>
                        <InformationCircle color={"green"} />
                        {/* Information */}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))
        ) : (
          <div className="text-center font-mono text-xl lg:text-2xl">
            Data kosong
          </div>
        )}
      </div>
      {showEdit && (
        <EditView
          handleClick={handleShowEdit}
          data={editData}
          saveData={saveData}
          fetchData={refreshData}
        />
      )}
    </>
  );
};

export default ListAbsen;

ListAbsen.propTypes = {
  realData: PropTypes.arrayOf(PropTypes.object).isRequired,
  filteredData: PropTypes.arrayOf(PropTypes.object).isRequired,
  refreshData: PropTypes.func.isRequired,
  isAdmin: PropTypes.bool,
  isLoading: PropTypes.bool,
};
