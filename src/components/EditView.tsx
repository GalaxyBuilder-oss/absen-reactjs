import { MemberPUB } from "../types/types";
import WindowFixed from "./style/WindowFixed";
import { FormEvent } from "react";

interface EditViewProps {
  handleClick: () => void,
  data: MemberPUB | undefined,
  saveData: (newData: MemberPUB) => void
}

interface MemberFormElement extends HTMLFormElement {
  memberName: HTMLInputElement;
  dormitory: HTMLSelectElement;
  generation: HTMLSelectElement;
}

const EditView: React.FC<EditViewProps> = ({ handleClick, data, saveData }) => {
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
  const handleOnSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as MemberFormElement;
    const value = form.memberName.value.trim();
    const dormitory = form.dormitory.value.trim();
    const generation = generations.find(
      (gen) => gen.name === form.generation.value.trim()
    );

    if (!value) return; // Jika input kosong, hentikan fungsi
    if (!dormitory) return; // Jika input kosong, hentikan fungsi
    if (!generation) return; // Jika input kosong, hentikan fungsi

    // Fungsi untuk mengonversi huruf pertama setiap kata menjadi kapital
    const capitalizeFirstLetter = (str: string) => {
      return str.charAt(0).toUpperCase() + str.slice(1);
    };

    // Mengonversi value menjadi kapital tiap awal kata
    const capitalizedValue = value
      .split(" ")
      .map(capitalizeFirstLetter)
      .join(" ");

    const dataNew = {
      id: data?.id,
      name: capitalizedValue,
      dormitory: dormitory,
      generation: generation,
      point: data?.point,
      alpha: false,
      permit: false,
      late: false,
      present: false,
    };

    saveData(dataNew);
    form.memberName.value = "";
    form.dormitory.selectedIndex = 0;
    form.generation.selectedIndex = 0;
  };
  return (
    <WindowFixed>
      <div className="absolute right-0 m-6">
        <button className={`mt-4 mx-4 bg-green-600 text-gray-50 p-4 rounded-t-xl font-bold uppercase`} onClick={handleClick}>
          Close
        </button>
      </div>
      <h1 className="mt-4 mx-4 bg-green-600 text-gray-50 p-4 rounded-t-xl font-bold uppercase">
        Edit
      </h1>
      <div className="mx-4 px-4 h-[70vh] lg:h-[76vh] bg-green-600">
        <div className="bg-gray-50 h-full px-2 py-8 rounded-xl overflow-y-scroll">
          <form
            action="post"
            className="flex flex-col gap-4 text-md font-semibold"
            onSubmit={handleOnSubmit}
          >
            <div className="flex flex-col gap-2 p-2">
              <label htmlFor="nama" className="px-4">NAMA</label>
              <input
                type="text"
                name="memberName"
                id="nama"
                placeholder={data?.name}
                className="border capitalize p-3 rounded-full"
                pattern=".{3,}[A-Za-z ]" title="Fill With Your Full Name"
              />
            </div>
            <div className="flex flex-col gap-2 p-2">
              <label htmlFor="dormitory" className="px-4">ASRAMA</label>
              <select name="dormitory" id="dormitory" className="border capitalize p-3 rounded-full" defaultValue="">
                <option value="" disabled>-- Pilih Asrama --</option>
                <option value="Asrama Ikhwan">
                  Asrama Ikhwan(Aswan)
                </option>
                <option value="Asrama Putra">
                  Asrama Putra(Astra)
                </option>
                <option value="Asrama Putri">Asrama Putri(Asri)</option>
                <option value="Asrama Baru">Asrama Baru(Asbar)</option>
              </select>
            </div>
            <div className="flex flex-col gap-2 p-2">
              <label htmlFor="generation" className="px-4">ANGKATAN</label>
              <select name="generation" id="generation" className="border capitalize p-3 rounded-full" defaultValue="">
                <option value="" disabled>-- Pilih Angkatan --</option>
                <option value="integer">Angkatan 20</option>
                <option value="getch">Angkatan 21</option>
                <option value="include">Angkatan 22</option>
              </select>
            </div>
            <div className="flex flex-col gap-2 p-2">
              <button type="submit" className="border capitalize p-3 rounded-full hover:bg-slate-100">
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

export default EditView;
