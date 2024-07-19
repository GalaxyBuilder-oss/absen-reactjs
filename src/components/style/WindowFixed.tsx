import { ReactNode } from "react";

interface WindowFixedProps {
  children: ReactNode;
}

const WindowFixed: React.FC<WindowFixedProps> = ({ children }) => {
  return (
    <div className="w-full h-full block fixed z-10 top-0 left-0 bg-gray-900 bg-opacity-40 backdrop-blur-sm animate-fade-in">
      {children}
    </div>
  );
};

export default WindowFixed;
