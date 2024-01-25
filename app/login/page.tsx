'use client'
import Link from "next/link";
import Button  from "../components/Button";
import InputText from "../components/InputText";
import InputPassword from "../components/InputPassword";
import { useState } from "react";
import axios from "axios"
import { useRouter } from 'next/navigation'

const Login : React.FC = () => {
  const [userName,setUserName] = useState<string>("")
  const [password,setPassword] = useState<string>("")
  const router = useRouter()
  const handleSubmit =()=>{
    axios.post("http://localhost:5000/api/v1/login",{
      username: userName,
      password: password
    })
    .then((res)=>{
      console.log(res)
      if(res.data.status == "success"){
        localStorage.setItem("token",res.data.data.token)
        localStorage.setItem("userId",JSON.stringify(res.data.data.id))
        setTimeout(()=>{
          router.push('/profile')
        },900)
      }
    })
    .catch((err)=>{
      console.log(err)
    })
  }
  return (
    <>
      <div className="relative flex flex-col  mx-0 items-center justify-center overflow-hidden" style={{paddingTop:'140px'}}>
        <div className="w-full p-6 rounded-md shadow-md lg:max-w-xl">
          <h1 className="text-3xl font-bold text-start text-white">Login</h1>
          <div className="mb-4 mt-6">
            <InputText placeholder="Username"  setUserName={setUserName}/>
          </div>
          <div className="mb-3">
            <InputPassword placeholder="Enter Password"  setPassword={setPassword}/>
          </div>
          <div className="mt-6">
            <Button title="Login" handleSubmit={handleSubmit}/>
          </div>
          <p className="mt-4 text-sm text-center text-white">
            No account?{" "}
            <Link
              href="/register"
              className="font-medium  underline"
              style={{ color: "#a19780" }}
            >
              Register here
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};
export default Login;
