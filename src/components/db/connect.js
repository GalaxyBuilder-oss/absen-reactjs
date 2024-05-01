// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase, ref, child, get, set } from "firebase/database";
import { v4 } from "uuid";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDDqf05YtNHJ6FKLAreAPsz1_q90W43v6M",
  authDomain: "absensi-pub.firebaseapp.com",
  databaseURL: "https://absensi-pub-default-rtdb.firebaseio.com",
  projectId: "absensi-pub",
  storageBucket: "absensi-pub.appspot.com",
  messagingSenderId: "495843335501",
  appId: "1:495843335501:web:742c3ea984b83a1273eb04",
  measurementId: "G-VYBNECFZM1",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

const dbRef = ref(getDatabase());
const db = getDatabase();

export const getData = () => {
  const res = get(child(dbRef, `users/`));
  return res;
};

export const addData = (data, num) => {
  const uuid = v4();
  set(ref(db, "users/" + num), {
    id: uuid,
    name: data.name,
    checked: false,
  })
    .then(() => {
      // Data saved successfully!
      console.log("Data saved successfully!")
    })
    .catch((error) => {
      // The write failed...
      console.error(error);
    });
};

export const deleteData = (id) => {
  return get(ref(db, "users/"))
    .then((snapshot) => {
      if (snapshot.exists()) {

        // Mendapatkan nilai array dari snapshot
        const dataArray = snapshot.val();

        // Memodifikasi array dan mengecualikan id yang ini di hapus
        const modifiedArray = dataArray.filter((item) => item.id !== id);

        // Simpan array yang telah dimodifikasi kembali ke Firebase Database
        return setDBData(modifiedArray);
      } else {
        console.log("Data tidak ditemukan.");
      }
    })
};

export const setDBData = (arr) => set(ref(db, "users/"), arr);