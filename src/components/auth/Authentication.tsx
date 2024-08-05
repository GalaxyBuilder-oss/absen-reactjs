import { ReactNode } from "react";
import { useAppContext } from "../provider/useAppContext";
import { useNavigate } from "react-router-dom";

const Authentication = ({ children }: { children: ReactNode }) => {
  const { showIsAdmin } = useAppContext();
  const navigate = useNavigate();
  return <>{showIsAdmin ? children : navigate("/forbidden")}</>;
};
export default Authentication
