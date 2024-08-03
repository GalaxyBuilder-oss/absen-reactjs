import ListHead from "../components/ListHead";
import ListAbsen from "../components/ListAbsen";
import ListHeadHistory from "../components/ListHeadHistory";
import HistoryList from "../components/HistoryList";
import FloatingButton from "../components/style/Floatingbutton";
import { useAppContext } from "../components/provider/useAppContext";

const HomePage = () => {
  const { menu } = useAppContext();
  return (
    <main className="sm:w-[98vw] h-[72vh] mx-2 bg-green-600 px-4 border-green-600 transition-all">
      <div className="h-[72vh] rounded-lg bg-white relative py-2">
        {menu === 0 ? (
          <>
            <ListHead />
            <ListAbsen />
            <FloatingButton />
          </>
        ) : menu === 1 ? (
          <>
            <ListHeadHistory />
            <HistoryList />
          </>
        ) : (
          <>Menu Tidak Tersedia</>
        )}
      </div>
    </main>
  );
};

export default HomePage;
