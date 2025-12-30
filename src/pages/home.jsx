import { Link } from "react-router-dom";
import { Routes ,Route } from "react-router-dom";
import Header from "../components/header";
import HomepageUi from "./client/HompePageUi";
import ProductPage from "./client/productPage";



export default function Homepage() {
  return (
    <>
    <Header/>
    <>
    <Routes path="/*">
      <Route path="/" element={<HomepageUi />} />
      <Route path="/products" element = {<ProductPage />} />
      <Route path="/*" element={<h2 className="text-center mt-8 text-2xl">404: Page Not Found</h2>} />  
    </Routes>
    </>
    
    </>

)
}
