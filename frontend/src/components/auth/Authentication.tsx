import { ReactNode } from "react";
import { useAppContext } from "../provider/useAppContext";
import { useNavigate } from "react-router-dom";

const Authentication = ({ children }: { children: ReactNode }) => {
  const { isAdmin } = useAppContext();
  const navigate = useNavigate();
  return <>{isAdmin ? children : navigate("/forbidden")}</>;
};
export default Authentication
