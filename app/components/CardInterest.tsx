import { useRouter } from "next/navigation";

interface IProps {
  title: string;
  content: string;
  dataInterest: string[];
}
const CardInterest: React.FC<IProps> = ({ title, content, dataInterest }) => {
  const router = useRouter();

  const handleOpen = () => {
    router.push("/interest");
  };

  return (
    <>
      <div
        style={{
          background: "rgba(255, 255, 255, 0.15)",
          backdropFilter: "blur(15px)",
        }}
        className="w-full p-6 border rounded-lg shadow border-gray-700"
      >
        <span className="absolute top-1 left-2 text-white text-base pl-2">
          {title}
        </span>
        <button
          className="absolute top-2 right-2 pr-2 inline-block text-gray-500 rounded-lg text-sm"
          type="button"
          onClick={handleOpen}
        >
          <svg
            width="17"
            height="17"
            viewBox="0 0 17 17"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9.39254 2.54999L3.57712 8.70541C3.35754 8.93916 3.14504 9.39957 3.10254 9.71832L2.84045 12.0133C2.74837 12.8421 3.34337 13.4087 4.16504 13.2671L6.44587 12.8775C6.76462 12.8208 7.21087 12.5871 7.43045 12.3462L13.2459 6.19082C14.2517 5.12832 14.705 3.91707 13.1396 2.43666C11.5813 0.970408 10.3984 1.48749 9.39254 2.54999Z"
              stroke="white"
              strokeWidth="1.0625"
              strokeMiterlimit="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M8.422 3.57712C8.72658 5.53212 10.3132 7.0267 12.2824 7.22503"
              stroke="white"
              strokeWidth="1.0625"
              strokeMiterlimit="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M2.125 15.5833H14.875"
              stroke="white"
              strokeWidth="1.0625"
              strokeMiterlimit="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        {dataInterest.length > 0 ? (
          <div className="flex gap-2 pt-6">
            {dataInterest.map((item,i) => (
              <div
                key={i}
                style={{
                  background: "rgba(255, 255, 255, 0.15)",
                  backdropFilter: "blur(15px)",
                }}
                className="  select-none items-center rounded-full py-1.5 px-2 font-sans text-xs font-bold uppercase text-white"
              >
                <span className="">{item}</span>
              </div>
            ))}
          </div>
        ) : (
          <p
            className="mb-3 pl-0 pt-9"
            style={{ color: "#8B9193", marginLeft: "-7px" }}
          >
            {" "}
            {content}
          </p>
        )}
      </div>
    </>
  );
};
export default CardInterest;
