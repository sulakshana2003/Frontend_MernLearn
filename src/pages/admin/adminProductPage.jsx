/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react"
import { sampleProducts } from "../../assets/sampleData";
import axios from "axios";
import { createClient } from "@supabase/supabase-js";

export default function AdminProductPage() {
  const [products ,setProducts] = useState(sampleProducts);
  const [image, setImage] = useState(null);
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
  const url = "https://cwlwupuwjatezofxlgjm.supabase.co";
  const key ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN3bHd1cHV3amF0ZXpvZnhsZ2ptIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY5MTc3MzAsImV4cCI6MjA4MjQ5MzczMH0.EeBBbiMSut6uQR0VqXvE6xyqNj14oG9p8qpntQdP9Ls";

  const supabase = createClient(url,key)
  
  function fileUpload(){
    supabase.storage.from("images").upload(image.name , image, {
      upsert:false,
      cacheControl:"3600"
    }).then(()=>{
      const publicUrl = supabase.storage.from("images").getPublicUrl(image.name).data.publicUrl
      console.log(publicUrl)
    }).catch()
  

  }
   
  
  return (
    <div className="w-full h-full bg-amber-950 max-h-full overflow-y-scroll">
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
