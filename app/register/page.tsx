"use client";
import Button from "../components/Button";
import InputText from "../components/InputText";
import InputPassword from "../components/InputPassword";
import Link from "next/link"
import ButtonBack from "../components/ButtonBack";
import AlertNotif from "../components/AlertNotif";
import { useState } from "react";
import ModalNotif from "../components/ModalNotif";
import axios from "axios"
import { useRouter } from 'next/navigation'

const Register = () => {
  const router = useRouter()
const [email,setEmail] = useState<string>('')
const [username,setUserName] = useState<string>('')
const [password,setPassword] = useState<string>('')
const [rePassword,setRePassword] = useState<string>('')
const [showAlert, setShowAlert] = useState<boolean>(false);
const [errorMessage, setErrorMessage] = useState<string>('')
const [showModal, setShowModal] = useState<boolean>(false);
const [modalMessage, setModalMessage] = useState<string>('')


const handleSubmit=()=>{
  if(password != rePassword){
    setShowAlert(true)
    setErrorMessage("password not match!")
  } if ( !username || !email || !password || !rePassword){
    setShowAlert(true)
    setErrorMessage("Please complite input form")
  }else {
    axios.post("http://localhost:5000/api/v1/users",{
      email: email,
      username: username,
      password: password
    })
    .then((res)=>{
      console.log(res.data.status == "success")
      if(res.data.status == "success"){
        setShowModal(true)
        setModalMessage("Register Success")
        setTimeout(()=>{
          router.push('/login')  
        },800)

      }
    })
    .catch((err)=>{
      console.log(err.response.status == 400)
      if(err.response.status == 400){
        setShowModal(true)
        setModalMessage(err.response.data.message)
      }
    })
  }
}
  return (
    <>
    <AlertNotif showAlert={showAlert} errorMessage={errorMessage}/>
    <ModalNotif  showModal={showModal} setShowModal={setShowModal} modalMessage={modalMessage}/>
      <ButtonBack />
      <div className="relative flex flex-col  mx-0  justify-center overflow-hidden"> 
        <div className="w-full p-6 rounded-md shadow-md lg:max-w-xl">
          <h1 className="text-3xl font-bold text-start text-white">Register</h1>
          <div className="mb-4 mt-6">
            <InputText placeholder="Enter Email" setUserName={setEmail}/>
          </div>
          <div className="mb-4 mt-6">
            <InputText placeholder="Create Username" setUserName={setUserName}/>
          </div>
          <div className="mb-3">
            <InputPassword placeholder="Create Password"  setPassword={setPassword}/>
          </div>
          <div className="mb-3">
            <InputPassword placeholder="Confirm Password"  setPassword={setRePassword}/>
          </div>
          <div className="mt-6">
           <Button title="Register" handleSubmit={handleSubmit}/>
          </div>
          <p className="mt-4 text-sm text-center text-white">
            Have an account?{" "}
            <Link
              href="/login"
              className="font-medium  underline"
              style={{ color: "#a19780" }}
            >
              Login here
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};
export default Register;
