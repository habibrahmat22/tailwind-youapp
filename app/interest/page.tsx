'use client'
import ButtonBack from "../components/ButtonBack"
import { useRouter } from 'next/navigation'
import { useState,useEffect } from 'react';
import { redirect } from 'next/navigation'
import InputChip from "../components/InputChip";
import axios from "axios"

const Interest =()=>{
    const router = useRouter()
    const [tags, setTags] = useState([]);
    const accessDenied = !localStorage.getItem('token');
  if (accessDenied) {
    redirect('/login')
  }
  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get(
        `http://localhost:5000/api/v1/users/${localStorage.getItem("userId")}`,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((res: any) => {
        setTags(res.data.data.interest.split(","));
      })
      .catch((err: any) => {
        console.log(err);
      });
  }, []);
    const handleSave =()=>{
        const token = localStorage.getItem('token')
        const idUser = localStorage.getItem('userId')
        const interestsString: string = tags.join(",");
        if(tags){
          axios.put(`http://localhost:5000/api/v1/users/${idUser}`,{interest :interestsString},{headers :{ 'Authorization': `Bearer ${token}` }  })
          .then((res)=>{
            if(res.data.status == "success"){
              setTimeout(() => {
                router.push('/profile')
              }, 900);
            }
          })
          .catch((err)=>{
            console.log(err.response.status == 400)
          })
        }
    }
  
    
    return (
        <>
        <ButtonBack/>
        <button
          className="absolute top-6 right-5 pr-2 inline-block rounded-lg text-md font-semibold"
          style={{
            backgroundImage: "linear-gradient(to left top, #abfffd, #8dedf8, #71dbf3, #59c8ee, #48b4e7, #50b0e6, #59ade5, #61a9e4, #74b5eb, #86c1f1, #98cef8, #aadaff)",
            WebkitBackgroundClip: "text",
            color: "transparent",
            border: "none",
            padding: "8px 12px",
            cursor: "pointer",
          }}
          type="button"
          onClick={handleSave}
        >
          Save 
        </button>
        <div className=" px-6 pt-6 font-semibold text-base">
            <span style={{ backgroundImage:
              "linear-gradient(to right top, #94783e, #a68d50, #b7a262, #c9b876, #dbce8a, #e3da98, #ebe5a7, #f3f1b6, #f4f3c2, #f5f6ce, #f6f8d9, #f8fae5)",
            WebkitBackgroundClip: "text",
            color: "transparent",}}>Tell everyone about yourself</span>
        </div>
        <div className="mb-4 p-6 font-semibold text-lg text-white">
            <span>What interest you?</span>
        </div>
        <div className="mb-4 px-6 font-semibold text-lg text-white" >
        <InputChip value={tags} onChange={setTags} />
        </div>
        </>
    )
}
export default Interest