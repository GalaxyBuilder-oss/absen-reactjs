import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase, ref, child, get, set } from "firebase/database";
import { v4 } from "uuid";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "absensi-pub.firebaseapp.com",
  databaseURL: "https://absensi-pub-default-rtdb.firebaseio.com",
  projectId: "absensi-pub",
  storageBucket: "absensi-pub.appspot.com",
  messagingSenderId: import.meta.env.VITE_MESSAGING_ID,
  appId: import.meta.env.VITE_APP_ID,
  measurementId: import.meta.env.VITE_MEASUREMENT_ID,
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

const dbRef = ref(getDatabase());
export const auth = getAuth(app);
const db = getDatabase();

let responseAPI = {
  statusCode: 0,
  message: "",
  data: null
}

export const getData = async () => {
  const res = await get(child(dbRef, `data/users/`));
  return res;
};

export const getHistories = () => {
  const res = get(child(dbRef, `data/history/`));
  return res;
};
export const getHistory = (dormitory, prayerTime, year, month, date) => {
  const res = get(child(dbRef, `data/history/${dormitory}/${prayerTime}/${year}/${month}/${date}`));
  return res;
};

export const addData = async (data, num) => {
  const uuid = v4();
  await set(ref(db, "data/users/" + num), {
    id: uuid,
    ...data,
  })
    .then(() => {
      // Data saved successfully!
      console.log("Data saved successfully!");
    })
    .catch((error) => {
      // The write failed...
      console.error(error);
    });
};

export const addHistory = async (data, dormitory, prayerTime, year, month, date) => {
  await set(ref(db, `data/history/${dormitory}/${prayerTime}/${year}/${month}/${date}`), {...data})
    .then(() => {
      // Data saved successfully!
      responseAPI = {
        statusCode: 200,
        message: "Successfully Saved History",
        data: null
      }
    })
    .catch((error) => {
      // The write failed...
      responseAPI = {
        statusCode: 400,
        message: error,
        data: null
      }
    });

    return responseAPI;
};

export const deleteData = async (id) => {
  return await get(ref(db, "data/users/")).then((snapshot) => {
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
  });
};

export const setDBData = async (arr) => await set(ref(db, "data/users/"), arr);
