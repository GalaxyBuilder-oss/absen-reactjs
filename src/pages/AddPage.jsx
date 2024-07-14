import { useOutletContext } from "react-router-dom";
import { addData } from "../utils/db/connect";
import { toast } from "react-toastify";
import moment from "moment";
import { useState } from "react";
import { defaultSettings } from "../utils/toastConfig";

const AddPage = () => {
  const [, , , data, , , , , , , , , , , ,] = useOutletContext();

  const [tab, setTab] = useState(0);
  const [generations, setGenerations] = useState([
    {
      no: 20,
      name: "integer",
      count: 10,
    },
    {
      no: 21,
      name: "getch",
      count: 30,
    },
    {
      no: 22,
      name: "include",
      count: 35,
    },
  ]);

  const handleAddGen = (e) => {
    e.preventDefault();
    const genNumber = e.target.genNo;
    const genName = e.target.genName;

    if (genName.value.trim() === "" || genName.value.length < 0)
      return toast.error("Name Cannot Empty!", defaultSettings);
    if (genNumber.value.trim() === "" || genName.value.length < 0)
      return toast.error("Please Select Generation!", defaultSettings);
    if (
      generations.filter((data) => data.name === genName.value.trim()).length >
      0
    )
      return toast.error(
        `Generation ${genName.value.trim()} was exist`,
        defaultSettings
      );
    if (
      generations.filter((data) => data.no == genNumber.value.trim()).length > 0
    )
      return toast.error(
        `Generation ${genNumber.value.trim()} was exist with another name`,
        defaultSettings
      );
    const newGen = {
      no: genNumber.value.trim(),
      name: genName.value.trim(),
      count: 0,
    };
    setGenerations([...generations, newGen]);
    genName.value = "";
    genNumber.value = "";
    toast.success("Successfully Add Generations", defaultSettings);
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    const value = e.target.name.value.trim();
    const dormitory = e.target.dormitory.value.trim();
    const generation = generations.filter(
      (data) => data.name === e.target.generation.value.trim()
    )[0];

    if (!value || value.length < 3) return; // Jika input kosong, hentikan fungsi
    if (!dormitory) return; // Jika input kosong, hentikan fungsi
    if (!generation) return; // Jika input kosong, hentikan fungsi

    // Fungsi untuk mengonversi huruf pertama setiap kata menjadi kapital
    const capitalizeFirstLetter = (str) => {
      return str.charAt(0).toUpperCase() + str.slice(1);
    };

    // Mengonversi value menjadi kapital tiap awal kata
    const capitalizedValue = value
      .split(" ")
      .map(capitalizeFirstLetter)
      .join(" ");

    const dataNew = {
      name: capitalizedValue,
      dormitory: dormitory,
      generation: generation,
      alpha: false,
      permit: false,
      present: false,
    };

    addData(dataNew, data != null ? Number.parseInt(data.length) : 0);
    e.target.name.value = "";
    e.target.dormitory.selectedIndex = "0";
    e.target.generation.selectedIndex = "0";
    toast.success("Successfully Add New Member", defaultSettings);
  };

  const daftar = () => {
    let data = [];
    for (let i = 0; i < 5; i++) {
      data[i] = moment().format("YY") - 1 - i;
    }
    return data;
  };
  return (
    <main className="h-[76vh] mx-2 bg-green-600 px-4 border-green-600">
      <div className="h-[76vh] lg:h-[76vh] rounded-lg bg-white relative px-2 overflow-y-scroll">
        <div className="flex px-2 py-4 gap-4">
          <button
            onClick={() => setTab(0)}
            disabled={tab === 0}
            className={tab === 0 && "border-b-2"}
          >
            Anggota
          </button>
          <button
            onClick={() => setTab(1)}
            disabled={tab === 1}
            className={tab === 1 && "border-b-2"}
          >
            Angkatan
          </button>
        </div>
        {tab === 0 && (
          <div className="rounded-b-xl px-2 py-4">
            <form
              action="post"
              className="flex flex-col gap-4 text-md font-semibold"
              onSubmit={handleOnSubmit}
            >
              <div className="flex flex-col p-2 gap-2 my-2">
                <label htmlFor="nama" className="px-4">
                  NAMA
                </label>
                <input
                  type="text"
                  name="name"
                  id="nama"
                  placeholder="John Doe"
                  className="border capitalize p-3 rounded-full"
                  pattern=".{3,}[A-Za-z ]"
                  title="Fill With Your Full Name"
                />
              </div>
              <div className="flex flex-col p-2 gap-2">
                <label htmlFor="dormitory" className="px-4">
                  PILIH ASRAMA
                </label>
                <select
                  name="dormitory"
                  id="dormitory"
                  className="border capitalize p-3 rounded-full"
                  defaultValue=""
                >
                  <option value="" disabled>
                    -- Pilih Asrama --
                  </option>
                  <option value="Asrama Ikhwan">Asrama Ikhwan(Aswan)</option>
                  <option value="Asrama Putra">Asrama Putra(Astra)</option>
                  <option value="Asrama Putri">Asrama Putri(Asri)</option>
                  <option value="Asrama Baru">Asrama Baru(Asbar)</option>
                </select>
              </div>
              <div className="flex flex-col p-2 gap-2">
                <label htmlFor="generation" className="px-4">
                  ANGKATAN
                </label>
                <select
                  name="generation"
                  id="generation"
                  className="border capitalize p-3 rounded-full"
                  defaultValue=""
                >
                  <option value="" disabled>
                    -- Pilih Angkatan --
                  </option>
                  {generations.map((generation, i) => (
                    <option key={i} value={generation.name}>
                      Angkatan {generation.no}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col p-2 gap-2">
                <button
                  type="submit"
                  className="border rounded-full p-3 hover:bg-gray-300 cursor-pointer font-bold hover:font-light"
                >
                  TAMBAHKAN
                </button>
              </div>
            </form>
          </div>
        )}
        {tab === 1 && (
          <div className="rounded-b-xl px-2 py-4">
            <form
              action="post"
              className="h-fit flex flex-col gap-4 text-md font-semibold"
              onSubmit={handleAddGen}
            >
              <div className="flex flex-col p-2 gap-2 my-2">
                <label htmlFor="nama" className="px-4">
                  NAMA ANGKATAN
                </label>
                <input
                  type="text"
                  name="genName"
                  id="nama"
                  placeholder="Getch"
                  className="border capitalize p-3 rounded-full"
                  pattern=".{3,}[A-Za-z ]"
                  title="Fill With Generation Name"
                />
              </div>
              <div className="flex flex-col p-2 gap-2">
                <label htmlFor="generation" className="px-4">
                  ANGKATAN
                </label>
                <select
                  name="genNo"
                  id="generation"
                  className="border capitalize p-3 rounded-full"
                  defaultValue=""
                >
                  <option value="" disabled>
                    -- Pilih Angkatan --
                  </option>
                  {daftar().map((generation, i) => (
                    <option key={i} value={Number.parseInt(generation)}>
                      Angkatan {generation}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col p-2 gap-2">
                <button
                  type="submit"
                  className="border rounded-full p-3 hover:bg-gray-300 cursor-pointer font-bold hover:font-light"
                >
                  TAMBAHKAN
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </main>
  );
};

export default AddPage;
