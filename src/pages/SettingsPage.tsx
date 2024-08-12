import { Link } from "react-router-dom";

const SettingsPage = () => {
  return (
    <main className="sm:w-[98vw] h-[72vh] mx-2 bg-green-600 px-4 border-green-600 transition-all">
      <div className="h-[72vh] rounded-lg bg-white relative py-2">
        <div className="h-[70vh] bg-gray-50 px-8 py-8 rounded-xl overflow-y-scroll">
        <div className="flex px-2 py-4 gap-4">
            <Link to='/'>
            &lt;- Back
            </Link>
          </div>
          <div>
            ini isinya
          </div>
        </div>
      </div>
    </main>
  );
};

export default SettingsPage;
