import { useParams } from "react-router-dom";
import { useAppContext } from "../components/provider/useAppContext";
import { MemberPUB } from "../types/types";
import { FormEvent, useEffect, useState } from "react";
import { setDBData } from "../utils/db/connect";
import { toast } from "react-toastify";
import { defaultSettings } from "../utils/toastConfig";
import { Authentication } from "../components/auth/Authentication";

interface MemberFormElement extends HTMLFormElement {
  memberName: HTMLInputElement;
  dormitory: HTMLSelectElement;
  generation: HTMLSelectElement;
}

const EditPage = () => {
  const { data, fetchData } = useAppContext();
  const [editedData, setEditedData] = useState<MemberPUB>();
  const { id } = useParams();
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
  useEffect(() => {
    setEditedData(data.find((item) => item.id === id));
  }, [data, id]);

  const handleOnSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as MemberFormElement;
    const memberName = form.memberName.value.trim();
    const dormitory = form.dormitory.value.trim();
    const generation = generations.find(
      (gen) => gen.name === form.generation.value.trim()
    );

    if (!memberName) return; // Jika input kosong, hentikan fungsi
    if (!dormitory) return; // Jika input kosong, hentikan fungsi
    if (!generation) return; // Jika input kosong, hentikan fungsi

    const capitalizeFirstLetter = (str: string) => {
      return str.charAt(0).toUpperCase() + str.slice(1);
    };

    const capitalizedValue = memberName
      .split(" ")
      .map(capitalizeFirstLetter)
      .join(" ");

    const dataNew = {
      id: id,
      name: capitalizedValue,
      dormitory: dormitory,
      generation: generation,
      point: editedData?.point,
      alpha: false,
      permit: false,
      late: false,
      present: false,
    };

    saveData(dataNew);

    toast.success("Data Berhasil Di Update", defaultSettings);
    location.href = "/";
  };
  const saveData = (memberData: MemberPUB) => {
    const temp = data.map((item) =>
      item.id === memberData?.id ? memberData : item
    );
    setDBData(temp as MemberPUB[]);
    fetchData();
  };

  return (
    <Authentication>
      <main className="sm:w-[98vw] h-[72vh] mx-2 bg-green-600 px-4 border-green-600 transition-all">
        <div className="h-[72vh] rounded-lg bg-white relative py-2">
          <div className="h-[70vh] bg-gray-50 px-8 py-8 rounded-xl overflow-y-scroll">
            {editedData && (
              <form
                action="post"
                className="flex flex-col gap-4 text-md font-semibold"
                onSubmit={handleOnSubmit}
              >
                <div className="flex flex-col gap-2 p-2">
                  <label htmlFor="nama" className="px-4">
                    NAMA
                  </label>
                  <input
                    type="text"
                    name="memberName"
                    id="nama"
                    defaultValue={editedData?.name}
                    className="border capitalize p-3 rounded-full"
                  />
                </div>
                <div className="flex flex-col gap-2 p-2">
                  <label htmlFor="dormitory" className="px-4">
                    ASRAMA
                  </label>
                  <select
                    name="dormitory"
                    id="dormitory"
                    className="border capitalize p-3 rounded-full"
                    defaultValue={editedData?.dormitory}
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
                <div className="flex flex-col gap-2 p-2">
                  <label htmlFor="generation" className="px-4">
                    ANGKATAN
                  </label>
                  <select
                    name="generation"
                    id="generation"
                    className="border capitalize p-3 rounded-full"
                    defaultValue={editedData?.generation.name}
                  >
                    <option value="" disabled>
                      -- Pilih Angkatan --
                    </option>
                    <option value="integer">Angkatan 20</option>
                    <option value="getch">Angkatan 21</option>
                    <option value="include">Angkatan 22</option>
                  </select>
                </div>
                <div className="flex flex-col gap-2 p-2">
                  <button
                    type="submit"
                    className="border capitalize p-3 rounded-full hover:bg-slate-100"
                  >
                    Save
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </main>
    </Authentication>
  );
};

export default EditPage;
