"use client";
import styles from "../login/loginPage.module.css";

interface IButtonProps {
  title: string
  handleSubmit: () => void
}
const Button : React.FC<IButtonProps> = ({title,handleSubmit}) => {
  return (
    <>
      <button
      onClick={handleSubmit}
        className={`${styles.btnRgb} btn-rgb w-full border rounded-md px-4 py-2 tracking-wide text-white`}
      >
        {title}
      </button>
    </>
  );
};
export default Button;
