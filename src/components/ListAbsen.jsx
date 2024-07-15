import PropTypes from "prop-types";
import FormGroup from "./style/FormGroup";
import { PenBoxIcon, Trash2, InfoIcon } from "lucide-react"
import { deleteData, setDBData } from "../utils/db/connect";
import { useState } from "react";
import EditView from "./EditView";
import { toast } from "react-toastify";
import { defaultSettings } from "../utils/toastConfig";
import SVGInitials from "./SVGInitials";

const ListAbsen = ({
  filteredData,
  realData,
  isAdmin,
  isLoading,
  refreshData,
}) => {
  const [enableDelete, setEnableDelete] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [editData, setEditData] = useState({
    id: '',
    name: '',
    generation: {},
    dormitory: '',
    present: false,
    permit: false,
    late: false,
    alpha: false,
  });

  const handleShowEdit = () => {
    setShowEdit(!showEdit);
  };

  const saveData = (editedData) => {
    const temp = realData.map((item) => item.id === editedData.id ? editedData : item);
    setDBData(temp)
    refreshData();
    handleShowEdit();
  };

  const handleDelete = async (id) => {
    if (!confirm("Anda Yakin Menghapus ini?")) return;
    setEnableDelete(true);
    await deleteData(id)
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
    event.target.disabled = true
    setStatus(id, true, false, false, false);
    event.target.disabled = false
  };
  const handlePermit = (event, id) => {
    event.target.disabled = true
    setStatus(id, false, true, false, false);
    event.target.disabled = false
  };
  const handleLate = (event, id) => {
    event.target.disabled = true
    setStatus(id, false, false, true, false);
    event.target.disabled = false
  };
  const handleAlpha = (event, id) => {
    event.target.disabled = true
    setStatus(id, false, false, false, true);
    event.target.disabled = false
  };

  const setStatus = async (id, presentValue, permitValue, lateValue, alphaValue) => {
    const updatedData = realData.map((item) => {
      if (item.id === id)
        return {
          ...item,
          present: presentValue,
          permit: permitValue,
          late: lateValue,
          alpha: alphaValue,
        };
      return item;
    });
    setDBData(updatedData); // Memperbarui data asli
    refreshData();
  };

  return (
    <>
      <div className="w-full h-[67vh] sm:h-[63vh] flex flex-col gap-2 overflow-y-scroll p-2 lg:text-xl scrollbar-hide">
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
                className="w-full border p-2 flex items-center gap-2 hover:bg-gray-200 cursor-pointer rounded-md"
              >
                <div>
                  <SVGInitials words={item.name.includes(" ")
                    ? item.name.charAt(0) + item.name.split(" ")[1].charAt(0)
                    : item.name.charAt(0)} backgroundColor={"fill-green-600"} textColor={"fill-white"} />
                </div>
                <div className="w-[90vw] p-2 flex justify-between gap-2 ">
                  <div className="flex justify-between flex-col">
                    <FormGroup>
                      <span className="">{item.name}</span>
                    </FormGroup>
                    {isAdmin ? (
                      <>
                        <div className="checkbox flex justify-between gap-4">
                          <FormGroup>
                            <input
                              required
                              type="radio"
                              name={"check-" + i}
                              className="size-4 accent-green-600"
                              onChange={(e) => handlePresent(e, item.id)}
                              checked={item.present}
                            />{" "}
                            <span className="">H</span>
                          </FormGroup>
                          <FormGroup>
                            <input
                              required
                              type="radio"
                              name={"check-" + i}
                              className="size-4 accent-yellow-300"
                              onChange={(e) => handlePermit(e, item.id)}
                              checked={item.permit}
                            />{" "}
                            <span className="">I</span>
                          </FormGroup>
                          <FormGroup>
                            <input
                              required
                              type="radio"
                              name={"check-" + i}
                              className="size-4 accent-amber-300"
                              onChange={(e) => handleLate(e, item.id)}
                              checked={item.late}
                            />{" "}
                            <span className="">M{ }</span>
                          </FormGroup>
                          <FormGroup>
                            <input
                              required
                              type="radio"
                              name={"check-" + i}
                              className="size-4 accent-red-500"
                              onChange={(e) => handleAlpha(e, item.id)}
                              checked={item.alpha}
                            />{" "}
                            <span className="">A</span>
                          </FormGroup>
                        </div>
                      </>
                    ) : (
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
                          <span className="">H</span>
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
                          <span className="">I</span>
                        </FormGroup>
                        <FormGroup>
                          <span
                            className={
                              "size-4 rounded-full border " +
                              (item.late && "bg-amber-300")
                            }
                          >
                            {" "}
                          </span>
                          <span className="">M</span>
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
                          <span className="">A</span>
                        </FormGroup>
                      </div>
                    )}
                  </div>
                  <FormGroup>
                    <span className="hidden sm:block">{item.present && "Hadir"}{item.permit && "Izin"}{item.late && "Masbuk"}{item.alpha && "Tidak Hadir"}</span>
                  </FormGroup>
                  {isAdmin ? (<div className="btn-group flex flex-col gap-4">
                    <button
                      onClick={() => {
                        setEditData(item);
                        handleShowEdit();
                      }}
                    >
                      <PenBoxIcon />
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      disabled={enableDelete}
                    >
                      <Trash2 />
                    </button>
                  </div>) :
                    (<div className="btn-group flex gap-4">
                      <button
                        onClick={() => {
                          toast.info(
                            `Nama : ${item.name}\nAngkatan : ${item.generation.no} ${item.generation.name}`,
                            defaultSettings
                          );
                        }}
                      >
                        <InfoIcon />
                      </button>
                    </div>)}
                </div>
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
        />
      )}
    </>
  );
};

export default ListAbsen;

ListAbsen.propTypes = {
  realData: PropTypes.arrayOf(PropTypes.object),
  filteredData: PropTypes.arrayOf(PropTypes.object),
  refreshData: PropTypes.func,
  isAdmin: PropTypes.bool,
  isLoading: PropTypes.bool,
};
