import { Link, Routes ,Route } from "react-router-dom";
import AdminProductPage from "./admin/adminProductPage"
import AddProductPage from "./admin/addProductPage";
import UpdateProductPage from "./admin/editProductPage";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { jwtDecode } from "jwt-decode";
import { useEffect } from "react";

 export default function AdminPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const tokenStr = localStorage.getItem("token");
  if (!tokenStr) {
    toast.error("Access denied. Please log in.");
    navigate("/",{ replace: true });
    return
  }
  const token = jwtDecode(tokenStr);
  console.log("Admin token:", token.role);
  if(token.role !== "admin"){
    toast.error("Access denied. Admins only.");
    navigate("/",{ replace: true });
    return
    
  }
  }, [navigate]);
  
     return (
       <div className="flex flex-row bg-gray-100">
         <div className="h-screen w-75 bg-amber-50">
           <Link
             to="/admin/Products"
             className="block p-4 text-gray-700 hover:bg-amber-200"
           >
             Products Management
           </Link>
           <Link
             to="/admin/settings"
             className="block p-4 text-gray-700 hover:bg-amber-200"
           >
             Site Settings
           </Link>
           <Link
             to="/admin/reports"
             className="block p-4 text-gray-700 hover:bg-amber-200"
           >
             Reports
           </Link>
         </div>
         <div className="h-screen w-[calc(100%-300px)] bg-white">
           <Routes>
             <Route path="/Products" element={<AdminProductPage />} />
             <Route path="/settings" element={<h1>Site Settings Section</h1>} />
             <Route path="/reports" element={<h1>Reports Section</h1>} />
             <Route path="/addproduct" element={<AddProductPage/>} />
             <Route path="/editproduct" element={<UpdateProductPage/>} />
             <Route
               path="*"
               element={<h1>Select an option from the sidebar.</h1>}
             />
           </Routes>
         </div>
       </div>
     );
 }