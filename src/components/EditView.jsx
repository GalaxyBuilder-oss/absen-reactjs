import Proptype from "prop-types";
import FormGroup from "./style/FormGroup";
import WindowFixed from "./style/WindowFixed";
import { btnClassic, btnMenu } from "./style/style";

const EditView = ({ handleClick, data, saveData }) => {
  const handleOnSubmit = (e) => {
    e.preventDefault();
    const value = e.target.name.value.trim();
    const dormitory = e.target.dormitory.value.trim();
    const generation = e.target.generation.value.trim();

    if (!value) return; // Jika input kosong, hentikan fungsi
    if (!dormitory) return; // Jika input kosong, hentikan fungsi
    if (!generation) return; // Jika input kosong, hentikan fungsi

    // Fungsi untuk mengonversi huruf pertama setiap kata menjadi kapital
    const capitalizeFirstLetter = (str) => {
      return str.charAt(0).toUpperCase() + str.slice(1);
    };

    console.log("test")

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

    saveData(dataNew);
    e.target.name.value = "";
    e.target.dormitory.selectedIndex = "0";
    e.target.generation.selectedIndex = "0";
    handleClick();
  };
  return (
    <WindowFixed>
      <div className="absolute right-0 m-6">
        <button className={btnMenu} onClick={handleClick}>
          Close
        </button>
      </div>
      <h1 className="mt-4 mx-4 bg-green-600 text-gray-50 p-4 rounded-t-xl font-bold uppercase">
        Edit
      </h1>
      <div className="mx-4 px-4 h-[70vh] bg-green-600">
        <div className="bg-gray-50 h-full px-2 py-8 rounded-xl overflow-y-scroll">
          <form
            action="post"
            className="flex flex-col gap-4 text-md font-semibold"
            onSubmit={handleOnSubmit}
          >
            <FormGroup>
              <label htmlFor="nama">Nama :</label>
              <input
                type="text"
                name="name"
                id="nama"
                placeholder={data.name}
                className="border capitalize"
              />
            </FormGroup>
            <FormGroup>
              <label htmlFor="dormitory">Asrama :</label>
              <select name="dormitory" id="dormitory" className="text-xs">
                <option value="">-- Pilih Asrama --</option>
                <option value="Asrama Ikhwan">
                  Asrama Ikhwan(Aswan)(Ikhwan)
                </option>
                <option value="Asrama Putra">
                  Asrama Putra(Astra)(Ikhwan)
                </option>
                <option value="Asrama Putri">Asrama Putri(Asri)(Akhwat)</option>
                <option value="Asrama Baru">Asrama Baru(Asbar)(Akhwat)</option>
              </select>
            </FormGroup>
            <FormGroup>
              <label htmlFor="generation">Angkatan :</label>
              <select name="generation" id="generation" className="text-xs">
                <option value="">-- Pilih Angkatan --</option>
                <option value="integer">Angkatan 20</option>
                <option value="getch">Angkatan 21</option>
                <option value="include">Angkatan 22</option>
              </select>
            </FormGroup>
            <div className="mt-1 flex gap-2">
              <button type="submit" className={btnClassic}>
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="mx-4 p-4 bg-green-600 rounded-b-xl"></div>
    </WindowFixed>
  );
};

EditView.propTypes = {
  handleClick: Proptype.func,
  data: Proptype.object.isRequired,
  saveData: Proptype.func,
};

export default EditView;
