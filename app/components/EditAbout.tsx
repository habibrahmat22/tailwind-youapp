"use client";
import { ChangeEvent, useState, useEffect } from "react";
import axios from "axios";

interface IProps {
  title: string;
  setInputAbout: Function;
  detailUser :any ;
}
const EditAbout: React.FC<IProps> = ({ title, setInputAbout, detailUser}) => {
  const [image, setImage] = useState<string | null>(null);
  const [fullname, setFullname] = useState<string>(detailUser.fullname);
  const [gender, setGender] = useState<string>(detailUser.gender);
  const [birthday, setBirthday] = useState<string>(detailUser.birthday);
  const [horoscope, setHoroscope] = useState<string>(detailUser.horoscope);
  const [zodiac, setZodiac] = useState<string>(detailUser.zodiac);
  const [height, setHeight] = useState<string>(detailUser.height);
  const [weight, setWeight] = useState<string>(detailUser.weight);

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file : any = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }

    console.log(file);
    const token = localStorage.getItem("token");
    const formData = new FormData();
    formData.append("img_url", file);
    axios
      .post(
        `http://localhost:5000/api/v1/users/upload/${localStorage.getItem("userId")}`,formData,
        { headers: {Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' } }
      )
      .then((res: any) => {
      
      })
      .catch((err: any) => {
        console.log(err);
      });
  };

  const getHoroscopeSign = (date: string) => {
    const parts = date.split("-");
    const day = parseInt(parts[0]);
    const month = parseInt(parts[1]);

    if ((month === 3 && day >= 21) || (month === 4 && day <= 19))
      return "Aries";
    if ((month === 4 && day >= 20) || (month === 5 && day <= 20))
      return "Taurus";
    if ((month === 5 && day >= 21) || (month === 6 && day <= 21))
      return "Gemini";
    if ((month === 6 && day >= 22) || (month === 7 && day <= 22))
      return "Cancer";
    if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return "Leo";
    if ((month === 8 && day >= 23) || (month === 9 && day <= 22))
      return "Virgo";
    if ((month === 9 && day >= 23) || (month === 10 && day <= 23))
      return "Libra";
    if ((month === 10 && day >= 24) || (month === 11 && day <= 21))
      return "Scorpius";
    if ((month === 11 && day >= 22) || (month === 12 && day <= 21))
      return "Sagittarius";
    if ((month === 12 && day >= 22) || (month === 1 && day <= 19))
      return "Capricornus";
    if ((month === 1 && day >= 20) || (month === 2 && day <= 18))
      return "Aquarius";
    if ((month === 2 && day >= 19) || (month === 3 && day <= 20))
      return "Pisces";
  };

  const getZodiacSign = (date: string) => {
    const parts = date.split("-");
    const day = parseInt(parts[0]);
    const month = parseInt(parts[1]);

    if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return "Ram";
    if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return "Bull";
    if ((month === 5 && day >= 21) || (month === 6 && day <= 21))
      return "Twins";
    if ((month === 6 && day >= 22) || (month === 7 && day <= 22)) return "Crab";
    if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return "Lion";
    if ((month === 8 && day >= 23) || (month === 9 && day <= 22))
      return "Virgin";
    if ((month === 9 && day >= 23) || (month === 10 && day <= 23))
      return "Balance";
    if ((month === 10 && day >= 24) || (month === 11 && day <= 21))
      return "Scorpion";
    if ((month === 11 && day >= 22) || (month === 12 && day <= 21))
      return "Archer";
    if ((month === 12 && day >= 22) || (month === 1 && day <= 19))
      return "Goat";
    if ((month === 1 && day >= 20) || (month === 2 && day <= 18))
      return "Water Bearer";
    if ((month === 2 && day >= 19) || (month === 3 && day <= 20)) return "Fish";
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedDate = e.target.value;
    setBirthday(selectedDate);
    const zodiacSign = getZodiacSign(selectedDate) || "Unknown";
    const horoscopeSign = getHoroscopeSign(selectedDate) || "Unknown";
    setZodiac(zodiacSign);
    setHoroscope(horoscopeSign);
  };
  const handleOpen = () => {
    const idUser = localStorage.getItem("userId")
    const token = localStorage.getItem("token")
    if (fullname && gender && birthday && horoscope && zodiac && height &&weight) {
      const data = {
        fullname,
        gender,
        birthday,
        horoscope,
        zodiac,
        height,
        weight,
      };

      axios.put(`http://localhost:5000/api/v1/users/${idUser}`,data,{headers :{ 'Authorization': `Bearer ${token}` }  })
    .then((res)=>{
      if(res.data.status == "success"){
        setTimeout(() => {
          setInputAbout(false);
        }, 900);
      }
    })
    .catch((err)=>{
      console.log(err.response.status == 400)
    })
    }
  };
  return (
    <>
      <div
        style={{
          background: "rgba(255, 255, 255, 0.15)",
          backdropFilter: "blur(15px)",
        }}
        className="w-full p-3 border rounded-lg shadow border-gray-700"
      >
        <span className="absolute top-1 left-2 text-white text-base pl-2">
          {title}
        </span>
        <button
          className="absolute top-0 right-2 pr-2 inline-block rounded-lg text-sm"
          style={{
            backgroundImage:
              "linear-gradient(to right top, #94783e, #a68d50, #b7a262, #c9b876, #dbce8a, #e3da98, #ebe5a7, #f3f1b6, #f4f3c2, #f5f6ce, #f6f8d9, #f8fae5)",
            WebkitBackgroundClip: "text",
            color: "transparent",
            border: "none",
            padding: "8px 12px",
            cursor: "pointer",
          }}
          type="button"
          onClick={handleOpen}
        >
          Save & Update
        </button>
        <div className="mb-1 mt-12 pl-2 flex items-start gap-x-4">
          <div className="relative inline-block overflow-hidden">
            {image ? (
              <img
                src={image}
                alt="Uploaded"
                className="w-16 h-16 object-cover rounded-2xl"
              />
            ) : (
              <label
                htmlFor="uploadInput"
                className="cursor-pointer  w-16 h-16 border-2 border-gray-600 rounded-2xl flex items-center justify-center text-4xl"
                style={{
                  background:
                    "linear-gradient(to right top, #94783e, #a68d50, #b7a262, #c9b876, #dbce8a, #e3da98, #ebe5a7, #f3f1b6, #f4f3c2, #f5f6ce, #f6f8d9, #f8fae5)",
                  color: "transparent", // Set text color to transparent
                  WebkitBackgroundClip: "text", // For Webkit (Chrome, Safari, etc.)
                  backdropFilter: "blur(15px)",
                }}
              >
                +
                <input
                  type="file"
                  id="uploadInput"
                  className="hidden"
                  onChange={handleImageUpload}
                />
              </label>
            )}
            {!image && (
              <span className="flex right-0  transform -translate-y-11 pl-20  text-white">
                Add Image
              </span>
            )}
          </div>
        </div>
        <div className="mb-1 mt-4 flex items-center gap-x-4">
          <label className="w-2/5  text-sm" style={{ color: "#5C6368" }}>
            Display Name :
          </label>
          <input
            style={{
              background: "rgba(255, 255, 255, 0.15)",
              backdropFilter: "blur(15px)",
            }}
            value={fullname}
            placeholder="EnterName"
            onChange={(e) => setFullname(e.target.value)}
            type="text"
            className="block w-4/6 px-4 py-2 mt-2 text-white  border rounded-md  border-gray-700 focus:ring-opacity-40 outline-none"
          />
        </div>
        <div className="mb-1 mt-1 flex items-center gap-x-4">
          <label className="w-2/5  text-sm" style={{ color: "#5C6368" }}>
            Gender :
          </label>
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            style={{
              background: "rgba(255, 255, 255, 0.15)",
              backdropFilter: "blur(15px)",
            }}
            className="block w-4/6 px-4 py-2 mt-2 text-white  border rounded-md  border-gray-700 focus:ring-opacity-40 outline-none"
          >
            <option className="bg-gray-500" disabled value="">
              Select Gender
            </option>
            <option className="bg-gray-500 " value="male">
              Male
            </option>
            <option className="bg-gray-500 " value="female">
              Female
            </option>
          </select>
        </div>
        <div className="mb-1 mt-1 flex items-center gap-x-4">
          <label className="w-2/5  text-sm" style={{ color: "#5C6368" }}>
            Birthday :
          </label>
          <input
            placeholder="DD-MM-YYYY"
            onChange={handleDateChange}
            value={birthday}
            style={{
              background: "rgba(255, 255, 255, 0.15)",
              backdropFilter: "blur(15px)",
            }}
            type="text"
            className="block w-4/6 px-4 py-2 mt-2 text-white  border rounded-md  border-gray-700 focus:ring-opacity-40 outline-none"
          />
        </div>
        <div className="mb-1 mt-1 flex items-center gap-x-4">
          <label className="w-2/5  text-sm" style={{ color: "#5C6368" }}>
            Horoscope :
          </label>
          <input
            placeholder="--"
            value={horoscope}
            style={{
              background: "rgba(255, 255, 255, 0.15)",
              backdropFilter: "blur(15px)",
            }}
            type="text"
            className="block w-4/6 px-4 py-2 mt-2 text-white  border rounded-md  border-gray-700 focus:ring-opacity-40 outline-none"
            disabled
          />
        </div>
        <div className="mb-1 mt-1 flex items-center gap-x-4">
          <label className="w-2/5  text-sm" style={{ color: "#5C6368" }}>
            Zodiac :
          </label>
          <input
            placeholder="--"
            value={zodiac}
            style={{
              background: "rgba(255, 255, 255, 0.15)",
              backdropFilter: "blur(15px)",
            }}
            type="text"
            className="block w-4/6 px-4 py-2 mt-2 text-white  border rounded-md  border-gray-700 focus:ring-opacity-40 outline-none"
            disabled
          />
        </div>
        <div className="mb-1 mt-1 flex items-center gap-x-4">
          <label className="w-2/5  text-sm" style={{ color: "#5C6368" }}>
            Height :
          </label>
          <input
            placeholder="Add Height"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            style={{
              background: "rgba(255, 255, 255, 0.15)",
              backdropFilter: "blur(15px)",
            }}
            type="text"
            className="block w-4/6 px-4 py-2 mt-2 text-white  border rounded-md  border-gray-700 focus:ring-opacity-40 outline-none"
          />
        </div>
        <div className="mb-1 mt-1 flex items-center gap-x-4">
          <label className="w-2/5  text-sm" style={{ color: "#5C6368" }}>
            Weight :
          </label>
          <input
            placeholder="Add Weight"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            style={{
              background: "rgba(255, 255, 255, 0.15)",
              backdropFilter: "blur(15px)",
            }}
            type="text"
            className="block w-4/6 px-4 py-2 mt-2 text-white  border rounded-md  border-gray-700 focus:ring-opacity-40 outline-none"
          />
        </div>
      </div>
    </>
  );
};
export default EditAbout;
