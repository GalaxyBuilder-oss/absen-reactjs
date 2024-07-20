import { User, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../utils/db/connect";
import { useNavigate, useOutletContext } from "react-router-dom";
import Cookies from "universal-cookie";
import { FormEvent } from "react";
import { OutletContextType } from "../types/OutletContextType";
import { toast } from "react-toastify";
import { defaultSettings } from "../utils/toastConfig";

const LoginPage = () => {
  const [, , , , , , , , , , , , , , , , ,]: OutletContextType =
    useOutletContext();
  const cookies = new Cookies();
  const navigate = useNavigate();
  const currentUser = cookies.get("currentUser") as User;

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const password = (form.elements.namedItem("password") as HTMLInputElement)
      .value;
    const submit = form.elements.namedItem("submit") as HTMLInputElement;

    submit.disabled = true;
    submit.classList.remove("cursor-pointer");
    submit.classList.add("cursor-wait");

    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      const expireDate: Date = new Date();
      expireDate.setDate(new Date().getDate() + 7);
      cookies.set("currentUser", response.user, {
        expires: expireDate,
      });
      cookies.set("loggedIn", true, {
        expires: expireDate,
      });
      navigate("/");
    } catch (error) {
      submit.disabled = false;
      submit.classList.remove("cursor-wait");
      submit.classList.add("cursor-pointer");
      toast.error("Wrong Email or Password!", defaultSettings);
      console.log(error);
    }
  };

  const handleLogout = async () => {
    try {
      await auth.signOut();
      cookies.remove("loggedIn");
      cookies.remove("currentUser");
      location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  const obfuscateEmail = (email: string): string => {
    if (!email) return "Alamat Email Tidak Valid";
    const [localPart, domain] = email.split("@");
    const obfuscationLength = 10;

    if (localPart.length > obfuscationLength) {
      return `${localPart.slice(0, -obfuscationLength)}****@${domain}`;
    } else {
      return `****@${domain}`;
    }
  };

  return (
    <>
      <main className="sm:w-[98vw] h-[72vh] mx-2 bg-green-600 px-4 border-green-600 transition-all">
        <div className="h-[72vh] rounded-lg bg-white relative py-2">
          <div className="bg-gray-50 h-full px-4 py-8 rounded-xl overflow-y-scroll">
            {currentUser ? (
              <>
                <div>
                  Selamat Datang {obfuscateEmail(currentUser?.email as string)}
                </div>
                <button onClick={handleLogout}>Logout</button>
              </>
            ) : (
              <>
                <h1 className="font-bold text-md uppercase text-center text-red-700">
                  ADMIN PERMISSION REQUIRED
                </h1>
                <form
                  method="post"
                  onSubmit={handleLogin}
                  className="flex flex-col gap-2 mt-4"
                >
                  <div className="flex flex-col gap-2 my-2">
                    <label htmlFor="email">E-mail</label>
                    <input
                      type="text"
                      id="email"
                      name="email"
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
                    <input
                      type="checkbox"
                      name="hide"
                      className="position absolute bottom-4 right-4 size-4"
                      id=""
                    />
                  </div>
                  <div className="flex flex-col gap-2 my-2">
                    <input
                      type="submit"
                      name="submit"
                      className="border rounded-full p-3 hover:bg-gray-300 cursor-pointer"
                    />
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      </main>
    </>
  );
};

export default LoginPage;
