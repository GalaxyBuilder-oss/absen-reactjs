
import { useAppContext } from "./provider/useAppContext";
import FormGroup from "./style/FormGroup";
import { InfoIcon } from "lucide-react";

const HistoryList = () => {

  const {histories, isLoading} = useAppContext()
  return (
    <div className="w-full h-[63vh] sm:h-[61vh] lg:h-[60vh] flex flex-col gap-2 overflow-y-scroll p-2 lg:text-xl">
      {isLoading ? (
        <div className="text-center text-xl lg:text-2xl font-mono">
          Data Is Loading...
        </div>
      ) : histories && histories.length > 0 ? (
        histories
          .sort((a, b) => a.name.localeCompare(b.name))
          .map((item, i) => (
            <div
              key={i}
              className="w-full border p-2 flex flex-col gap-2 hover:bg-gray-200 cursor-pointer rounded-md"
            >
              <FormGroup>
                <span className="">{i + 1 + ". " + item.name}</span>
              </FormGroup>
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
                        (item.late && "bg-amber-500")
                      }
                    >
                      {" "}
                    </span>
                    <label className="">M</label>
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
                    <InfoIcon color={"green"} />
                    {/* Information */}
                  </button>
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
  );
};

export default HistoryList;
