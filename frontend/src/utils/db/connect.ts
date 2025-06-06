import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase, ref, child, get, set } from "firebase/database";
import { getPerformance } from "firebase/performance";
import { v4 } from "uuid";
import { MemberPUB } from "../../types";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: import.meta.env.VITE_AUTHDOMAIN,
  databaseURL: import.meta.env.VITE_DATABASE_URL,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_ID,
  appId: import.meta.env.VITE_APP_ID,
  measurementId: import.meta.env.VITE_MEASUREMENT_ID,
};

export const app = initializeApp(firebaseConfig);

getPerformance(app);

const dbRef = ref(getDatabase());

export const auth = getAuth(app);

const db = getDatabase();

let responseAPI = {
  statusCode: 0,
  message: "",
  data: null,
};

export const getData = async () => {
  const res = await get(child(dbRef, "data/users/"));
  return res;
};

export const getHistories = () => {
  const res = get(child(dbRef, "data/history/"));
  return res;
};

export const getHistory = (
  dormitory: string,
  prayerTime: string,
  year: number,
  month: number,
  date: number
) => {
  const res = get(
    child(
      dbRef,
      `data/history/${dormitory}/${prayerTime}/${year}/${month}/${date}/`
    )
  );
  return res;
};

export const addData = async (data: MemberPUB, num: number) => {
  const uuid = v4();
  await set(ref(db, "data/users/" + num), {
    id: uuid,
    ...data,
  })
    .then(() => {
      console.log("Data saved successfully!");
    })
    .catch((error) => {
      console.error(error);
    });
};

export const addHistory = async (
  data: MemberPUB[],
  dormitory: string,
  prayerTime: string,
  year: number,
  month: number,
  date: number
) => {
  await set(
    ref(db, `data/history/${dormitory}/${prayerTime}/${year}/${month}/${date}`),
    { ...data }
  )
    .then(() => {
      responseAPI = {
        statusCode: 200,
        message: "Successfully Saved History",
        data: null,
      };
    })
    .catch((error) => {
      responseAPI = {
        statusCode: 400,
        message: error,
        data: null,
      };
    });

  return responseAPI;
};

export const deleteData = async (id: string) => {
  return await get(ref(db, "data/users/")).then((snapshot) => {
    if (snapshot.exists()) {
      const dataArray = snapshot.val();

      const modifiedArray = dataArray.filter(
        (item: MemberPUB) => item.id !== id
      );

      return setDBData(modifiedArray);
    } else {
      console.log("Data tidak ditemukan.");
    }
  });
};

export const setDBData = async (arr: MemberPUB[]) =>
  await set(ref(db, "data/users/"), arr);
