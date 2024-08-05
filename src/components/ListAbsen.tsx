import FormGroup from "./style/FormGroup";
import { PenBoxIcon, Trash2, InfoIcon } from "lucide-react";
import { deleteData, setDBData } from "../utils/db/connect";
import { useState } from "react";
import { toast } from "react-toastify";
import { defaultSettings } from "../utils/toastConfig";
import SVGInitials from "./SVGInitials";
import { useAppContext } from "./provider/useAppContext";
import { Link } from "react-router-dom";

const ListAbsen = () => {
  const { filteredData, data, showIsAdmin, isLoading, fetchData } =
    useAppContext();
  const [enableDelete, setEnableDelete] = useState<boolean>(false);

  const handleDelete = async (id: string) => {
    if (!confirm("Anda Yakin Menghapus ini?")) return;
    setEnableDelete(true);
    await deleteData(id)
      .then(() => {
        toast.success(
          "Data di tengah array berhasil dihapus.",
          defaultSettings
        );
        fetchData();
        setEnableDelete(false);
      })
      .catch((error) => {
        toast.error(
          "Gagal menghapus data di tengah array:" + error,
          defaultSettings
        );
      });
  };

  const handlePresent = (
    event: React.ChangeEvent<HTMLInputElement>,
    id: string
  ) => {
    event.target.disabled = true;
    setStatus(id, true, false, false, false);
    event.target.disabled = false;
  };
  const handlePermit = (
    event: React.ChangeEvent<HTMLInputElement>,
    id: string
  ) => {
    event.target.disabled = true;
    setStatus(id, false, true, false, false);
    event.target.disabled = false;
  };
  const handleLate = (
    event: React.ChangeEvent<HTMLInputElement>,
    id: string
  ) => {
    event.target.disabled = true;
    setStatus(id, false, false, true, false);
    event.target.disabled = false;
  };
  const handleAlpha = (
    event: React.ChangeEvent<HTMLInputElement>,
    id: string
  ) => {
    event.target.disabled = true;
    setStatus(id, false, false, false, true);
    event.target.disabled = false;
  };

  const setStatus = async (
    id: string,
    presentValue: boolean,
    permitValue: boolean,
    lateValue: boolean,
    alphaValue: boolean
  ) => {
    const updatedData = data.map((item) => {
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
    fetchData();
  };

  return (
    <>
      <div className="w-full h-[63vh] sm:h-[61vh] lg:h-[59vh] flex flex-col gap-2 overflow-y-scroll p-2 lg:text-xl scrollbar-hide">
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
                className="w-full border p-1 flex items-center hover:bg-gray-200 cursor-pointer rounded-md"
              >
                <div>
                  <SVGInitials
                    words={
                      item.name.includes(" ")
                        ? item.name.charAt(0) +
                          item.name.split(" ")[1].charAt(0)
                        : item.name.charAt(0)
                    }
                    backgroundColor={"fill-green-600"}
                    textColor={"fill-white"}
                  />
                </div>
                <div className="w-[90vw] p-2 flex justify-between gap-2 ">
                  <div className="w-2/4 flex justify-between flex-col">
                    <FormGroup>
                      <span className="">{item.name}</span>
                    </FormGroup>
                    {showIsAdmin ? (
                      <>
                        <div className="checkbox flex justify-between gap-4">
                          <FormGroup>
                            <input
                              required
                              type="radio"
                              name={"check-" + i}
                              className="size-4 accent-green-600"
                              onChange={(e) =>
                                handlePresent(e, item.id as string)
                              }
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
                              onChange={(e) =>
                                handlePermit(e, item.id as string)
                              }
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
                              onChange={(e) => handleLate(e, item.id as string)}
                              checked={item.late}
                            />{" "}
                            <span className="">M{}</span>
                          </FormGroup>
                          <FormGroup>
                            <input
                              required
                              type="radio"
                              name={"check-" + i}
                              className="size-4 accent-red-500"
                              onChange={(e) =>
                                handleAlpha(e, item.id as string)
                              }
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
                    <span className="w-1/4 hidden sm:inline-block">
                      {item.present && "Hadir"}
                      {item.permit && "Izin"}
                      {item.late && "Masbuk"}
                      {item.alpha && "Alfa"}
                    </span>
                  </FormGroup>
                  <div className="w-1/4 btn-group flex flex-col justify-center gap-4 items-end">
                    {showIsAdmin ? (
                      <>
                        <Link to={`/edit/${item.id}`} target="blank">
                          <PenBoxIcon />
                        </Link>
                        <button
                          onClick={() => handleDelete(item.id as string)}
                          disabled={enableDelete}
                        >
                          <Trash2 />
                        </button>
                      </>
                    ) : (
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
                    )}
                  </div>
                </div>
              </div>
            ))
        ) : (
          <div className="text-center font-mono text-xl lg:text-2xl">
            Data kosong
          </div>
        )}
      </div>
    </>
  );
};

export default ListAbsen;
