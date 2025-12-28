import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleRegister() {
    try {
      const API = import.meta.env.VITE_BACKEND_URI;
      if (!API) {
        toast.error("VITE_BACKEND_URI is not defined");
        return;
      }

      // Basic front-end validation
      if (!email || !firstname || !lastname || !password) {
        toast.error("Please fill all fields");
        return;
      }

      const response = await axios.post(import.meta.env.VITE_BACKEND_URI+"/api/users/register", {
        email,
        firstname,
        lastname,
        password,
      });

      toast.success("Registration Successful");
      navigate("/login")
      console.log(response.data);
      setEmail("");
      setFirstname("");
      setLastname("");
      setPassword("");
    } catch (e) {
      toast.error(e?.response?.data?.message || "Registration failed");
    }
  }

  return (
    <div className="flex flex-row items-center justify-center w-full h-screen bg-[url('/login.jpg')] bg-cover">
      <div className="w-[50%] h-full"></div>

      <div className="w-[500px] min-h-[560px] backdrop-blur-md bg-white/30 rounded-lg flex flex-col items-center justify-center p-8">
        <h2 className="text-2xl font-bold text-white mb-6">Register</h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          className="w-full mb-4 p-3 rounded-md bg-white/80 outline-none focus:ring-2 focus:ring-blue-400"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="text"
          placeholder="First Name"
          value={firstname}
          className="w-full mb-4 p-3 rounded-md bg-white/80 outline-none focus:ring-2 focus:ring-blue-400"
          onChange={(e) => setFirstname(e.target.value)}
        />

        <input
          type="text"
          placeholder="Last Name"
          value={lastname}
          className="w-full mb-4 p-3 rounded-md bg-white/80 outline-none focus:ring-2 focus:ring-blue-400"
          onChange={(e) => setLastname(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          className="w-full mb-4 p-3 rounded-md bg-white/80 outline-none focus:ring-2 focus:ring-blue-400"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="w-full p-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
          onClick={handleRegister}
        >
          Register
        </button>
      </div>
    </div>
  );
}
