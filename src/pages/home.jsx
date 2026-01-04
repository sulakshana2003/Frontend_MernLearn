import { Link } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import Header from "../components/header";
import HomepageUi from "./client/HompePageUi";
import ProductPage from "./client/productPage";
import ProductOverView from "./client/productOverView";
import Cart from "./client/cart";
import Checkout from "./client/checkout";
import LoginPage from "./login";
import RegisterPage from "./register";
import ForgotPasswordPage from "./client/forgetPassword";
export default function Homepage() {
  return (
    <>
      <Header />
      <>
        <Routes path="/*">
          <Route path="/" element={<HomepageUi />} />
          <Route path="/products" element={<ProductPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/signup" element={<RegisterPage />} />
          <Route path="/overview/:id" element={<ProductOverView />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />}></Route>
          <Route
            path="/*"
            element={
              <h2 className="text-center mt-8 text-2xl">404: Page Not Found</h2>
            }
          />
        </Routes>
      </>
    </>
  );
}
