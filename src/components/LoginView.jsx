/* eslint-disable react/prop-types */
import WindowFixed from "./style/WindowFixed";
import { btnMenu } from "./style/style";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../utils/db/connect";

const LoginView = ({ handleClick, onLogin }) => {
  const handleLogin = async (e) => {
    e.preventDefault();

    e.target[3].disabled=true;
    e.target[3].classList.remove("cursor-pointer")
    e.target[3].classList.add("cursor-wait")

    const email = e.target.username.value;
    const password = e.target.password.value;
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        // Signed in

        console.log("Logged In...")
        onLogin(true);
        handleClick();
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        // ..
      });
  };
  return (
    <WindowFixed>
      <div className="absolute right-0 m-6">
        <button className={btnMenu} onClick={handleClick}>
          Close
        </button>
      </div>
      <h1 className="mt-4 mx-4 bg-green-600 text-gray-50 p-4 rounded-t-xl font-bold uppercase">
        Login
      </h1>
      <div className="mx-4 px-4 h-[70vh] bg-green-600">
        <div className="bg-gray-50 h-full px-4 py-8 rounded-xl overflow-y-scroll">
          <h1 className="font-bold text-md uppercase text-center text-red-700">ADMIN PERMISSION REQUIRED</h1>
          <form
            method="post"
            onSubmit={handleLogin}
            className="flex flex-col gap-2 mt-4"
          >
            <div className="flex flex-col gap-2 my-2">
              <label htmlFor="username">USERNAME</label>
              <input
                type="text"
                id="username"
                name="username"
                className="p-3 bg-slate-100 rounded-full"
                autoComplete="true"
                pattern="[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$"
              />
            </div>
            <div className="flex flex-col gap-2 my-2 relative">
              <label htmlFor="password">PASSWORD</label>
              <input
                type="password"
                id="password"
                name="password"
                className="p-3 bg-slate-100 rounded-full"
                autoComplete="true"
                pattern=".{3,}"
              />
              <input type="checkbox" name="hide" className="position absolute bottom-4 right-4 size-4" id="" />
            </div>
            <div  className="flex flex-col gap-2 my-2">
              <input
                type="submit"
                className="border rounded-full p-3 hover:bg-gray-300 cursor-pointer"
              />
            </div>
          </form>
        </div>
      </div>
      <div className="mx-4 p-4 bg-green-600 rounded-b-xl"></div>
    </WindowFixed>
  );
};

export default LoginView;
