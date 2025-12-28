/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react"
import { sampleProducts } from "../../assets/sampleData";
import axios from "axios";

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
