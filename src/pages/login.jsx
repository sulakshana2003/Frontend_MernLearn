import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

export default function LoginPage() {   

    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");

    async function handleLogin(){
        console.log(email,password);
        try{
            const response = await axios.post("http://localhost:3000/api/users/login",{
                email : email,
                password:password
            })
            toast.success("Login Successful");
            console.log(response.data);
        }catch(e){
            toast.error(e.response.data.message);
        }
    }



    return (
      <div className="flex flex-row items-center justify-center w-full h-screen bg-[url('/login.jpg')] bg-cover">
        <div className="w-[50%] h-full"></div>
        <div className="w-[500px] h-[500px] backdrop-blur-md bg-white/30 rounded-lg flex flex-col items-center justify-center p-8">
          <h2 className="text-2xl font-bold text-white mb-6">Login</h2>

          <input
            type="text"
            placeholder="Username"
            className="w-full mb-4 p-3 rounded-md bg-white/80 outline-none focus:ring-2 focus:ring-blue-400"
            onChange={(e)=>{setEmail(e.target.value)}}
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full mb-6 p-3 rounded-md bg-white/80 outline-none focus:ring-2 focus:ring-blue-400"
            onChange={(e)=>{setPassword(e.target.value)}}
          />

          <button className="w-full p-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition" onClick={handleLogin}>
            Logn in 
          </button>
        </div>
      </div>
    );
}