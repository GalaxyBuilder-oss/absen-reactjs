import { AlertOctagon } from "lucide-react";

const ForbiddenPage = () => {

  return (
    <>
      <main className="sm:w-[96vw] h-[76vh] mx-2 bg-green-600 px-4 border-green-600 transition-all">
        <div className="flex flex-col items-center h-[76vh] rounded-lg bg-white relative p-4 text-center">
          <AlertOctagon className="w-full text-4xl mb-4 text-center" />
          {/* Optional subtle animation */}
          <h1>Stop, Restricted Area!</h1>
          <div>
            <p>Kamu Harus Login Untuk Menggunakan Fitur Ini</p>
            <p className="my-4">
              <a href="/help" className="text-blue-500 underline">
                See our FAQs for more info
              </a>
            </p>
            <a
              href="/"
              className="bg-gray-50 hover:bg-green-600 hover:text-gray-50 transition-all hover:animate-pulse text-green-600 py-2 px-4 rounded-full font-bold"
            >
              Go Home
            </a>
          </div>
        </div>
      </main>
    </>
  );
};

export default ForbiddenPage;
