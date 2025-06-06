import { addData } from "../utils/db/connect";
import { toast } from "react-toastify";
import moment from "moment";
import { FormEvent, ReactNode, useState } from "react";
import { defaultSettings } from "../utils/toastConfig";
import { Generation, MemberPUB } from "../types";
import { Authentication, useAppContext } from "../components";
import { Link } from "react-router-dom";

interface GenerationFormElement extends HTMLFormElement {
  genName: HTMLInputElement;
  genNo: HTMLSelectElement;
}

interface MemberFormElement extends HTMLFormElement {
  memberName: HTMLInputElement;
  dormitory: HTMLSelectElement;
  generation: HTMLSelectElement;
}

const AddPage = () => {
  const { datas, fetchData, generations, setGenerations } = useAppContext();

  const [tab, setTab] = useState(0);

  const handleAddGen = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as GenerationFormElement;
    let genNumber = form.genNo.value.trim();
    let genName = form.genName.value.trim();

    if (!genName) return toast.error("Nama Tidak Boleh Kosong!", defaultSettings);
    if (!genNumber)
      return toast.error("Pilih Nomor Angkatan!", defaultSettings);
    if (generations.some((gen) => gen.name === genName))
      return toast.error(
        `Angkatan ${genName} telah ada`,
        defaultSettings
      );
    if (generations.some((gen) => gen.no.toString() === genNumber))
      return toast.error(
        `Angkatan ${genNumber} telah ada dengan nama lain`,
        defaultSettings
      );
    const newGen: Generation = {
      no: parseInt(genNumber, 10),
      name: genName,
      count: 0,
    };
    setGenerations([...generations, newGen]);
    genName = "";
    genNumber = "";
    toast.success("Berhasil Menambah Angkatan", defaultSettings);
  };

  const handleAddMember = async (e: FormEvent<HTMLFormElement>) => {
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

    const capitalizeFirstLetter = (str: string) => {
      return str.charAt(0).toUpperCase() + str.slice(1);
    };

    const capitalizedValue = value
      .split(" ")
      .map(capitalizeFirstLetter)
      .join(" ");

    const dataNew: MemberPUB = {
      name: capitalizedValue,
      dormitory: dormitory,
      generation: generation,
      point: 10,
      late: false,
      alpha: false,
      permit: false,
      present: false,
    };

    await addData(dataNew, datas != null || datas ? datas.length : 0)
      .then(() => {
        toast.success("Berhasil Menambah Member", defaultSettings);
        fetchData();
      })
      .catch((e) => toast.error(e.message, defaultSettings));
    form.memberName.value = "";
    form.dormitory.selectedIndex = 0;
    form.generation.selectedIndex = 0;
  };

  const daftar = () => {
    const data: number[] = [];
    for (let i = 0; i < 5; i++) {
      data.push(parseInt(moment().format("YY"), 10) - 1 - i);
    }
    return data;
  };
  return (
    <Authentication>
      <main className="sm:w-[98vw] h-[72vh] mx-2 bg-green-600 px-4 border-green-600 transition-all">
        <div className="h-[72vh] lg:h-[76vh] rounded-lg bg-white relative px-2 overflow-y-scroll">
          <div className="flex px-2 py-4 gap-4">
            <Link to='/'>
            &lt;- Back
            </Link>
          </div>
          <div className="flex px-2 pb-4 gap-4">
            <button
              onClick={() => setTab(0)}
              disabled={tab === 0}
              className={`border-b-2 ${tab === 0 ? "border-black" : ""} p-2`} // Gunakan ternary operator untuk menentukan kelas aktif
            >
              Anggota
            </button>
            <button
              onClick={() => setTab(1)}
              disabled={tab === 1}
              className={`border-b-2 ${tab === 1 ? "border-black" : ""} p-2`} // Gunakan ternary operator untuk menentukan kelas aktif
            >
              Angkatan
            </button>
          </div>

          {tab === 0 && (
            <div className="rounded-b-xl px-2 py-4">
              <form
                action="post"
                className="flex flex-col gap-4 text-md font-semibold"
                onSubmit={handleAddMember}
              >
                <div className="flex flex-col p-2 gap-2 my-2">
                  <label htmlFor="nama" className="px-4">
                    NAMA
                  </label>
                  <input
                    type="text"
                    name="memberName"
                    id="nama"
                    placeholder="John Doe"
                    className="border capitalize p-3 rounded-full"
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
                        Angkatan {generation.no as ReactNode}
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
                      <option key={i} value={generation}>
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
    </Authentication>
  );
};

export default AddPage;
