import ListHeadHistory from "../components/ListHeadHistory";
import HistoryList from "../components/HistoryList";

const HistoryPage = () => {
  return (
    <main className="sm:w-[98vw] h-[72vh] mx-2 bg-green-600 px-4 border-green-600 transition-all">
      <div className="h-[72vh] rounded-lg bg-white relative py-2">
        <>
          <ListHeadHistory />
          <HistoryList />
        </>
      </div>
    </main>
  );
};

export default HistoryPage;
