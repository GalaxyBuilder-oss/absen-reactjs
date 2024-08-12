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
  const { filteredDatas, datas, isAdmin, isLoading, fetchData } =
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
    const updatedData = datas.map((item) => {
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

  const addPoint = () => {
    const updatedData = datas.map((item) =>
      item ? { ...item, point: 10 } : item
    );

    setDBData(updatedData);
    fetchData();
  };

  return (
    <>
      <div className="w-full h-[63vh] sm:h-[61vh] lg:h-[59vh] flex flex-col gap-2 overflow-y-scroll p-2 lg:text-xl scrollbar-hide">
        {isLoading ? (
          <div className="text-center text-xl lg:text-2xl font-mono">
            Data Is Loading...
          </div>
        ) : filteredDatas != null && filteredDatas.length > 0 ? (
          filteredDatas
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
                    {isAdmin ? (
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
                      <span className="text-sm">Sisa Poin : {item.point}</span>
                    )}
                  </div>
                  <FormGroup className="hidden sm:flex flex-col justify-center items-center">
                    <span className="w-1/4 hidden sm:flex">
                      {item.present && "Hadir"}
                      {item.permit && "Izin"}
                      {item.late && "Masbuk"}
                      {item.alpha && "Alfa"}
                    </span>
                  </FormGroup>
                  <div className="w-1/4 btn-group flex flex-col justify-center gap-4 items-end">
                    {isAdmin ? (
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
        {isAdmin && <button onClick={addPoint}>Update Data</button>}
      </div>
    </>
  );
};

export default ListAbsen;
