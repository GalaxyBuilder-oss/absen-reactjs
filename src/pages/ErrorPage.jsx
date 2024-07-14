import { useRouteError } from "react-router-dom";
import Footer from "../components/Footer";
import NavigationBar from "../components/NavigationBar";
import { useEffect } from "react";
import { HandIcon } from "lucide-react"

const ErrorPage = () => {
  const error = useRouteError();

  useEffect(() => console.error(error), [error]);

  let errorMessage = "An unexpected error occurred."; // Default message

  if (error) {
    errorMessage = error.error.message || errorMessage;

    // Consider creating custom error messages for common scenarios:
    if (error.status === 404) {
      errorMessage = "We couldn't find the page you requested. ";
    } else if (error.status === 500) {
      errorMessage = "Something went wrong on our end. We're working on it! ️";
    }
  }

  return (
    <>
      <header>
        <NavigationBar />
      </header>
      <main className="h-[76vh] mx-2 bg-green-600 px-4 border-green-600">
        <div className="flex flex-col items-center lg:h-[76vh] rounded-lg bg-white relative p-4 text-center">
          <HandIcon className="w-full text-4xl mb-4 text-center" shake={true} />
          {/* Optional subtle animation */}
          <h1>Aww, Snap!</h1>
          <div>
            <h3>Error {error?.status} :</h3>
            <p>{errorMessage}</p>
            <p className="my-4">
              <a href="/help" className="text-blue-500 underline">
                See our FAQs for more info
              </a>
            </p>
            {error?.status === 404 && (
              <a href="/" className="bg-gray-50 hover:bg-green-600 hover:text-gray-50 transition-all hover:animate-pulse text-green-600 py-2 px-4 rounded-full font-bold">
                Go Back Home
              </a>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default ErrorPage;
