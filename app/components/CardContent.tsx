

interface IProps {
  title : string;
  content : string;
  setInputAbout:Function;
  detailUser :any
}
const CardContent :React.FC<IProps> =({title,content,setInputAbout,detailUser})=>{

  const handleOpen =()=>{
    console.log("test");
    setInputAbout(true)
  }
  function calculateAge(birthday: string) {
  if(birthday){
    const parts = birthday?.split("-");
    const birthDate = new Date(parseInt(parts[2]), parseInt(parts[1]) - 1, parseInt(parts[0]));
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();

    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }

    return age;
  }
}


    return (
        <>
        <div
              style={{
                background: "rgba(255, 255, 255, 0.15)",
                backdropFilter: "blur(15px)",
              }}
              className="w-full p-6 border rounded-lg shadow border-gray-700"
            >
                <span className="absolute top-1 left-2 text-white text-base pl-2">{title}</span>
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
              {detailUser ? (
                <div>
                                  <p className="pl-0 pt-3"  style={{color:"#8B9193",marginLeft:"-7px"}}>Birthday : <label className="text-white">{detailUser.birthday} (Age {calculateAge(detailUser.birthday)})</label></p>
                <p className="pl-0 pt-3"  style={{color:"#8B9193",marginLeft:"-7px"}}>Horoscope : <label className="text-white">{detailUser.horoscope}</label></p>
                <p className="pl-0 pt-3"  style={{color:"#8B9193",marginLeft:"-7px"}}>Zodiac : <label className="text-white">{detailUser.zodiac}</label></p>
                <p className="pl-0 pt-3"  style={{color:"#8B9193",marginLeft:"-7px"}}>Height : <label className="text-white">{detailUser.height}</label></p>
                <p className="pl-0 pt-3"  style={{color:"#8B9193",marginLeft:"-7px"}}>Weight : <label className="text-white">{detailUser.weight}</label></p>
                </div>
              ):(
                <p className="mb-3 pl-0 pt-9"  style={{color:"#8B9193",marginLeft:"-7px"}}> {content}</p>
              )}
             
              
            </div>
        </>
    )
}
export default CardContent