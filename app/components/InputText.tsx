"use client";

interface IProps {
  placeholder: string;
  setUserName : Function ;
}
const InputText: React.FC<IProps> = ({ placeholder,setUserName }) => {
  return (
    <>
      <input
        style={{
          background: "rgba(255, 255, 255, 0.15)",
          backdropFilter: "blur(15px)",
        }}
        type="text"
        onChange={(e)=>setUserName(e.target.value)}
        placeholder={placeholder}
        className="block w-full px-4 py-2 mt-2 text-white  border rounded-md  border-gray-700 focus:ring-opacity-40 outline-none"
      />
    </>
  );
};
export default InputText;
