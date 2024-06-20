import PropTypes from "prop-types";
import WindowFixed from "./style/WindowFixed";
import { addData } from "../utils/db/connect";
import { btnMenu } from "./style/style";

const FormAdd = ({ handleAddWindow, data, newData }) => {
  const generations = [
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
  ];
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
    newData();
    e.target.name.value = "";
    e.target.dormitory.selectedIndex = "0";
    e.target.generation.selectedIndex = "0";
  };

  return (
    <WindowFixed>
      <div className="absolute right-0 m-6">
        <button className={btnMenu} onClick={handleAddWindow}>
          Close
        </button>
      </div>
      <h1 className="mt-4 mx-4 bg-green-600 text-gray-50 p-4 rounded-t-xl font-bold uppercase">
        Tambahkan
      </h1>
      <div className="mx-4 px-4 h-[70vh] bg-green-600">
        <div className="bg-gray-50 h-full rounded-xl px-2 py-4">
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
                pattern=".{3,}[A-Za-z ]" title="Fill With Your Full Name"
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
                  <option key={i} value={generation.name}>Angkatan {generation.no}</option>
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
      </div>
      <div className="mx-4 p-4 bg-green-600 rounded-b-xl"></div>
    </WindowFixed>
  );
};

FormAdd.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  newData: PropTypes.func.isRequired,
  handleAddWindow: PropTypes.func.isRequired,
};

export default FormAdd;
