import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import Header from './components/header'
import Homepage from './pages/home'
import LoginPage from './pages/login'
import SignUpPage from "./pages/signup"; 
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
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/test" element={<TestPage/>} />
          <Route path="/admin/*" element={<AdminPage />} />
          <Route path="/*" element={<h2 className="text-center mt-8 text-2xl">404: Page Not Found</h2>} />  
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App
