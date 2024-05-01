import PropTypes from "prop-types";
import WindowFixed from "./style/WindowFixed";
import { addData } from "./db/connect";
import FormGroup from "./style/FormGroup";
import { btnClassic, btnMenu } from "./style/style";

const FormAdd = ({ handleAddWindow, data, newData }) => {

  const handleOnSubmit = (e) => {
    e.preventDefault();
    const value = e.target.name.value.trim();

    if (!value) return; // Jika input kosong, hentikan fungsi

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
      checked: false,
    };
    addData(dataNew, data != null ? Number.parseInt(data.length) : 0);
    newData();
    e.target.name.value = "";
  };

  return (
    <WindowFixed>
      <div className="absolute right-0 m-6">
        <button className={btnMenu} onClick={handleAddWindow}>
          Close
        </button>
      </div>
      <h1 className="mt-4 mx-4 bg-green-600 text-gray-50 p-4 rounded-t-xl font-bold uppercase">
        Form Add
      </h1>
      <div className="mx-4 px-4 h-[450px] bg-green-600">
        <div className="bg-gray-50 h-full rounded-xl">
          <form action="post" className="p-2" onSubmit={handleOnSubmit}>
            <FormGroup>
              <label htmlFor="nama">Nama</label>
              <input
                type="text"
                name="name"
                id="nama"
                placeholder="John Doe"
                className="border capitalize"
              />
            </FormGroup>
            <div className="mt-1 flex gap-2">
              <button type="submit" className={btnClassic}>
                Add
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="mx-4 p-4 bg-green-600 rounded-b-xl">ini footer</div>
    </WindowFixed>
  );
};

FormAdd.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  newData: PropTypes.func.isRequired,
  handleAddWindow: PropTypes.func.isRequired,
};

export default FormAdd;
