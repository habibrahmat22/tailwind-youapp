"use client";
import React, { useState, useEffect } from "react";
import ButtonBack from "../components/ButtonBack";
import CardContent from "../components/CardContent";
import EditAbout from "../components/EditAbout";
import CardInterest from "../components/CardInterest";
import { redirect } from "next/navigation";
import axios from "axios";
const Profile: React.FC = () => {
  const [inputAbout, setInputAbout] = useState<Boolean>(false);
  const [detailUser, SetDetailsUser] = useState<any>({});
  const [dataInterest, setDataInterest] = useState<string[]>([]);
  const accessDenied = localStorage.getItem("token");
  if (!accessDenied) {
    redirect("/login");
  }

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get(
        `http://localhost:5000/api/v1/users/${localStorage.getItem("userId")}`,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((res: any) => {
        SetDetailsUser(res.data.data);
        setDataInterest(res.data.data.interest.split(","));
      })
      .catch((err: any) => {
        console.log(err);
      });
  }, []);
  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get(
        `http://localhost:5000/api/v1/users/${localStorage.getItem("userId")}`,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((res: any) => {
        SetDetailsUser(res.data.data);
        setDataInterest(res.data.data.interest.split(","));
      })
      .catch((err: any) => {
        console.log(err);
      });
  }, [inputAbout]);
  return (
    <div
      style={{
        background: "#09141A",
        minHeight: "100vh",
        position: "relative",
      }}
    >
      <ButtonBack />
      <div className="relative flex flex-col mx-0 items-center justify-center overflow-hidden">
        <span className="justify-center text-white text-center">username</span>
        <div className="w-full p-6 rounded-md shadow-md lg:max-w-xl">
        <div className="mb-4">
      {detailUser ? (
 <div
 style={{
   backgroundImage: `url('/img/${detailUser.img_url}')`, 
   backgroundSize: 'cover', 
   backgroundPosition: 'center', 
   backdropFilter: "blur(15px)",
   height: "210px",
 }}
 className="w-full p-6 border rounded-lg shadow border-gray-700 relative"
>
 <div>
   <span className="text-white absolute bottom-16 left-4">
     {detailUser ? detailUser.username : "username,"}
   </span>
   <p className="text-white absolute bottom-10 left-4">Male</p>
   <div className="flex gap-2">
     <div className="absolute bottom-2 left-4  select-none items-center whitespace-nowrap rounded-full bg-gray-900 py-1.5 px-3 font-sans text-xs font-bold uppercase text-white">
       <span>{detailUser.horoscope}</span>
     </div>
     <div className="absolute bottom-2 left-24  select-none items-center whitespace-nowrap rounded-full bg-gray-900 py-1.5 px-3 font-sans text-xs font-bold uppercase text-white">
       <span>{detailUser.zodiac}</span>
     </div>
   </div>
 </div>
</div>
      ):(
        <div className="mb-4">
        <div
          style={{
            background: "rgba(255, 255, 255, 0.15)",
            backdropFilter: "blur(15px)",
            height: "250px",
          }}
          className="w-full p-6 border rounded-lg shadow border-gray-700 relative"
        >
          <div>
            <span className="text-white absolute bottom-16 left-4">
             username,
            </span>
          </div>
        </div>
      </div>
      )}
</div>
          {!inputAbout ? (
            <div className="mb-4 mt-6">
              <CardContent
                title="About"
                content="Add in your to help others know you better."
                setInputAbout={setInputAbout}
                detailUser={detailUser}
              />
            </div>
          ) : (
            <div className="mb-4 mt-6">
              <EditAbout
                title="About"
                setInputAbout={setInputAbout}
                detailUser={detailUser}
              />
            </div>
          )}
          <div className="mb-4 mt-6">
            <CardInterest
              dataInterest={dataInterest}
              title="Interest"
              content="Add in your interest to find a better match."
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Profile;
