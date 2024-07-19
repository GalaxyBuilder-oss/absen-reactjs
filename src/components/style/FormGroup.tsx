import { ReactNode } from "react";

 
interface FormGroupProps {
  children: ReactNode
}

const FormGroup: React.FC<FormGroupProps> = ({ children }) => {
  return (
    <div className="flex gap-2 justify-between align-middle items-center">
      <>
        {children}
      </>
    </div>
  );
};

export default FormGroup;
