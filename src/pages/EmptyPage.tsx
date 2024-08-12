import { Link } from "react-router-dom";

const EmptyPage = () => {
    return (
      <main className="sm:w-[98vw] h-[72vh] mx-2 bg-green-600 px-4 border-green-600 transition-all">
        <div className="h-[72vh] rounded-lg bg-white relative py-2">
          <div className="flex flex-col items-center h-[72vh] rounded-lg bg-white relative p-4 text-center">
            <h1>Page Is Coming Soon...</h1>
            <Link to="/" className="bg-gray-50 hover:bg-green-600 hover:text-gray-50 transition-all hover:animate-pulse text-green-600 py-2 px-4 rounded-full font-bold">
              Go Home
            </Link>
          </div>
        </div>
      </main>
    );
  };

  export default EmptyPage;
