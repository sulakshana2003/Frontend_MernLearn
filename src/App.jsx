import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import Header from './components/header'
import Homepage from './pages/home'
import LoginPage from './pages/login'
//import SignUpPage from "./pages/signup";
import RegisterPage from "./pages/register"; 
import AdminPage from "./pages/adminPage";
import TestPage from "./pages/testPage";
import { Toaster } from "react-hot-toast";


function App() {
  

  return (
    <BrowserRouter>
      <div>
        <Toaster position="top-center"/>
        {/* <Header /> */}
        <Routes path="/*">
          <Route path="/" element={<Homepage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<RegisterPage />} />
          <Route path="/test" element={<TestPage/>} />
          <Route path="/admin/*" element={<AdminPage />} />
          <Route path="/*" element={<h2 className="text-center mt-8 text-2xl">404: Page Not Found</h2>} />  
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App


//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN3bHd1cHV3amF0ZXpvZnhsZ2ptIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY5MTc3MzAsImV4cCI6MjA4MjQ5MzczMH0.EeBBbiMSut6uQR0VqXvE6xyqNj14oG9p8qpntQdP9Ls
//https://cwlwupuwjatezofxlgjm.supabase.co