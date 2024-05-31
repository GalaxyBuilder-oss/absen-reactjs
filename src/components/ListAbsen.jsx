import PropTypes from "prop-types";
import { deleteData, setDBData } from "./db/connect";
import FormGroup from "./style/FormGroup";
import { btnDelete, btnEdit } from "./style/style";

const ListAbsen = ({ data, newData, onEditShow }) => {
  const handleCheckboxChange = (id) => {
    const updatedData = data.map((item) => {
      if (item.id === id) {
        return { ...item, checked: !item.checked };
      }
      return item;
    });

    setDBData(updatedData); // Memperbarui data asli
    newData();
  };

  // const handleCheckAll = () => {
  //   const allChecked = Object.keys(checkedItems).length === data.length;
  //   const newCheckedItems = {};

  //   // Jika semua sudah dicentang, maka hapus semua centang
  //   if (allChecked) {
  //     data.forEach((item) => {
  //       newCheckedItems[item.id] = false;
  //     });
  //   } else {
  //     // Jika belum semua dicentang, maka centang semua
  //     data.forEach((item) => {
  //       newCheckedItems[item.id] = true;
  //     });
  //   }

  //   setCheckedItems(newCheckedItems);
  // };

  return (
    <ul className="h-96 xl:h-[430px] flex flex-col gap-2 overflow-y-scroll py-2 xl:text-xl">
      {data != null && data.length > 1
        ? data
            .sort((a, b) => a.name.localeCompare(b.name))
            .filter((item) => item.id != 0)
            .map((item, i) => (
              <li
                key={i}
                className="border-b sm:px-4 px-2 py-2 flex justify-between hover:bg-gray-200 cursor-pointer relative"
              >
                <span className="sm:hidden">
                  {item.name.substring(0, 12)}...
                </span>
                <span className="hidden sm:inline">
                  {i + 1 + ". " + item.name}
                </span>
                <FormGroup>
                  <div className="form-input">
                    <input
                      required
                      id="check"
                      type="checkbox"
                      name="hadir"
                      className="size-4"
                      onChange={() => handleCheckboxChange(item.id)}
                      checked={item.checked}
                    />{" "}
                    <label className="hidden sm:inline">Hadir</label>
                  </div>
                  <button className={btnEdit} onClick={onEditShow}>
                    Edit
                  </button>
                  <button
                    className={btnDelete}
                    onClick={() => {
                      deleteData(item.id)
                        .then(() => {
                          console.log("Data di tengah array berhasil dihapus.");
                          newData();
                        })
                        .catch((error) => {
                          console.error(
                            "Gagal menghapus data di tengah array:",
                            error
                          );
                        });
                    }}
                  >
                    Delete
                  </button>
                </FormGroup>
              </li>
            ))
        : "Tidak Ada Data"}
    </ul>
  );
};

export default ListAbsen;

ListAbsen.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  newData: PropTypes.func.isRequired,
  onEditShow: PropTypes.func.isRequired,
};
