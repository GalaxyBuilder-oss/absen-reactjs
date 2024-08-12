import { Link } from "react-router-dom";
import { HistoryList, ListHeadHistory } from "../components";

const HistoryPage = () => {
  return (
    <main className="sm:w-[98vw] h-[72vh] mx-2 bg-green-600 px-4 border-green-600 transition-all">
      <div className="h-[72vh] rounded-lg bg-white relative py-2">
        <div className="flex px-2 py-4 gap-4">
          <Link to="/">&lt;- Back</Link>
        </div>
        <ListHeadHistory />
        <HistoryList />
      </div>
    </main>
  );
};

export default HistoryPage;
