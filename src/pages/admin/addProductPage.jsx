/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-empty */
/* eslint-disable no-unused-vars */
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import fileUpload from "../../utils/mediaUpload";
import axios from "axios";

export default function AddProductPage() {
    const navigate = useNavigate();
    const [productId, setProductId] = useState("");
    const [name, setName] = useState("");
    const [altNames, setAltNames] = useState([]);
    const [description, setDescription] = useState("");
    const [images, setImages] = useState([]);
    const [stock, setStock] = useState(0);
    const [price, setPrice] = useState(0);
    const [labledPrice, setLabledPrice] = useState(0);

    async function handleAddProduct() {
        const token = localStorage.getItem("token");
            if (!token) {
                return toast.error("You must be logged in to access this page");
            }
        if (images.length == 0) {
            toast.error("Please upload at least one image");
            return;
        }
        const promisesArray = [];
        for (let i = 0; i < images.length; i++) {
            promisesArray[i] = fileUpload(images[i]);
        }
        try {
           const imagesUrls = await Promise.all(promisesArray);
           console.log(imagesUrls); 
           const altnamesArray = altNames.map((n) => n.trim()).filter(Boolean);


        const productData = {
            productId,
            name,
            altNames: altnamesArray,
            description,
            stock,
            price,
            labledprice: labledPrice,
            images: imagesUrls
        };
        
        axios.post(import.meta.env.VITE_BACKEND_URI + "/api/products/add", productData, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((res) => {
            console.log(res.data);
            toast.success("Product added successfully");
            navigate("/admin/products");
        }).catch((err) => {
            console.log(err);
            toast.error("Error adding product");
        });

        } catch (error) {
            console.log(error);
        }
        
        
    }

return (
    <div className="w-full h-full flex-col justify-center items-center">
        <input type="text" placeholder="Product ID" value={productId} onChange={(e) => setProductId(e.target.value)} />
        <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
        <input type="text" placeholder="Alt Names (comma separated)" value={altNames.join(",")} onChange={(e) => setAltNames(e.target.value.split(","))} />
        <input type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
        <input
            type="file"
            multiple
            onChange={(e) => setImages(Array.from(e.target.files))}
            />

        <input type="number" placeholder="Stock" value={stock} onChange={(e) => setStock(Number(e.target.value))} />
        <input type="number" placeholder="Price" value={price} onChange={(e) => setPrice(Number(e.target.value))} />
        <input type="number" placeholder="Labled Price" value={labledPrice} onChange={(e) => setLabledPrice(Number(e.target.value))} />
        <Link className="bg-blue-500 text-white p-2 rounded mt-4" to="/admin/Products">Cancel</Link>
        <button className="bg-gray-500 text-white p-2 rounded mt-4" onClick={handleAddProduct}>Add Product</button>
    </div>
    )

}