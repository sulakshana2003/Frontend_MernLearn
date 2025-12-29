/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react"
import { sampleProducts } from "../../assets/sampleData";
import axios from "axios";
import { createClient } from "@supabase/supabase-js";
import { Link } from "react-router-dom";

export default function AdminProductPage() {
  const [products ,setProducts] = useState(sampleProducts);
  useEffect(()=>{
    axios
      .get(import.meta.env.VITE_BACKEND_URI + "/api/products")
      .then((res) => {
        console.log(res.data);
        setProducts(res.data);
      }).catch((err)=>{
        console.log(err)
      });
  },[]);

  //eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN3bHd1cHV3amF0ZXpvZnhsZ2ptIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY5MTc3MzAsImV4cCI6MjA4MjQ5MzczMH0.EeBBbiMSut6uQR0VqXvE6xyqNj14oG9p8qpntQdP9Ls
//https://cwlwupuwjatezofxlgjm.supabase.co
  
   
  
  return (
    <div className="w-full h-full bg-amber-950 max-h-full overflow-y-scroll absolute">
      <Link to="/admin/addproduct" className="bg-green-300 text-center text-xl justify-center items-center bottom-5">Add Product</Link>
      <h1>Admin Product Page</h1>
      <table className="w-full text-amber-50 text-center">
        <thead>
          <tr>
            <th>product Id</th>
            <th>Product Name</th>
            <th>Product image</th>
            <th>Labled Price</th>
            <th>Price</th>
            <th>Stock</th>
          </tr>
        </thead>
        <tbody>
          {
            products.map(
              //item or index return here
              (item,index)=>{
                return (
                  <tr key={item.productId}>
                    <th>{item.productId}</th>
                    <th>{item.name}</th>
                    <th>
                      <img src={item.images[0]} alt={item.altNames[0]} className="w-[50px] h-[50px]" />
                    </th>
                    <th>{item.labledprice}</th>
                    <th>{item.price}</th>
                    <th>{item.stock}</th>
                  </tr>
                );
              }
            )
          }
        </tbody>
      </table>
    </div>
  );
}
