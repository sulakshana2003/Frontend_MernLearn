import { Link } from "react-router-dom";

export default function Header() {
  return (
    <div className="flex items-center justify-between p-4 bg-white shadow-md">
        <Link to="/" className="text-2xl font-bold text-blue-600">Homepage</Link> 
        <Link to="/login" className="ml-4 text-lg text-gray-700 hover:text-blue-600">Login</Link>
        <Link to="/signup" className="ml-4 text-lg text-gray-700 hover:text-blue-600">Sign Up</Link>
    </div>  
  );
}