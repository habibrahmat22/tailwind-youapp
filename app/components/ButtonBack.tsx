
const ButtonBack =()=>{
    return (
        <>
         <a
      href="#"
      className="text-white font-bold hover:text-gray-300 inline-flex items-center pl-2 pt-8 pb-10"
      style={{ cursor: 'pointer', textDecoration: 'none' }}
      onClick={() => {
        window.history.back();
      }}
    >
      <svg
        className="w-6 h-6 mr-0"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M15 19l-7-7 7-7"
        />
      </svg>
      Back
    </a>
        </>
    )
}
export default ButtonBack