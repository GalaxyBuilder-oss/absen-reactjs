import { ReactNode } from "react";
import { useAppContext } from "../provider/useAppContext";
import { useNavigate } from "react-router-dom";

export const Authentication = ({ children }: { children: ReactNode }) => {
  const { showIsAdmin } = useAppContext();
  const navigate = useNavigate();
  return <>{showIsAdmin ? children : navigate("/forbidden")}</>;
};
