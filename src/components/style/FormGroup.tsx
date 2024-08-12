import { ReactNode } from "react";

interface FormGroupProps {
  children: ReactNode;
  className?: string;
}

const FormGroup: React.FC<FormGroupProps> = ({ children, className }) => {
  return (
    <div
      className={
        className
          ? className
          : "flex gap-2 justify-between align-middle items-center"
      }
    >
      <>{children}</>
    </div>
  );
};

export default FormGroup;
