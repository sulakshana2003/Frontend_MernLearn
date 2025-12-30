/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-empty */
/* eslint-disable no-unused-vars */
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router-dom";
import fileUpload from "../../utils/mediaUpload";
import axios from "axios";

export default function UpdateProductPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const [productId, setProductId] = useState(location.state.productId);
  const [name, setName] = useState(location.state.name);
  const [altNames, setAltNames] = useState(location.state.altNames);
  const [description, setDescription] = useState(location.state.description);
  const [images, setImages] = useState([]);
  const [stock, setStock] = useState(location.state.stock);
  const [price, setPrice] = useState(location.state.price);
  const [labledPrice, setLabledPrice] = useState(location.state.labledPrice);

  console.log(location.state);

  async function updateProduct() {
    const token = localStorage.getItem("token");
    if (!token) {
      return toast.error("You must be logged in to access this page");
    }
    let imageUrls = location.state.images;

    const promisesArray = [];
    for (let i = 0; i < images.length; i++) {
      promisesArray[i] = fileUpload(images[i]);
    }
    try {
      if (images.length > 0) {
        imageUrls = await Promise.all(promisesArray);
      }
      console.log(imageUrls);
      const altnamesArray = altNames.map((n) => n.trim()).filter(Boolean);

      const productData = {
        productId,
        name,
        altNames: altnamesArray,
        description,
        stock,
        price,
        labledprice: labledPrice,
        images: imageUrls,
      };

      axios
        .put(import.meta.env.VITE_BACKEND_URI + "/api/products/" + productId, productData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          console.log(res.data);
          toast.success("Product Updated successfully");
          navigate("/admin/products");
        })
        .catch((err) => {
          console.log(err);
          toast.error("Error adding product");
        });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="min-h-screen w-full bg-slate-50">
      <div className="mx-auto max-w-4xl px-4 py-10">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-slate-900">Update Product</h1>
          <p className="mt-1 text-sm text-slate-600">
            Edit details and optionally upload new images.
          </p>
        </div>

        {/* Card */}
        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="p-6 md:p-8">
            {/* Form Grid */}
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              {/* Product ID (disabled) */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-slate-700">Product ID</label>
                <input
                  type="text"
                  placeholder="Product ID"
                  disabled
                  value={productId}
                  onChange={(e) => setProductId(e.target.value)}
                  className="w-full cursor-not-allowed rounded-xl border border-slate-200 bg-slate-100 px-4 py-2.5 text-slate-700 outline-none"
                />
                <p className="text-xs text-slate-500">Product ID can’t be changed.</p>
              </div>

              {/* Name */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-slate-700">Name</label>
                <input
                  type="text"
                  placeholder="Product name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-slate-900 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
                />
              </div>

              {/* Alt Names */}
              <div className="flex flex-col gap-2 md:col-span-2">
                <label className="text-sm font-medium text-slate-700">
                  Alternative Names
                  <span className="ml-2 text-xs font-normal text-slate-500">(comma separated)</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Mouse, Wireless Mouse, BT Mouse"
                  value={altNames.join(",")}
                  onChange={(e) => setAltNames(e.target.value.split(","))}
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-slate-900 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
                />
              </div>

              {/* Description */}
              <div className="flex flex-col gap-2 md:col-span-2">
                <label className="text-sm font-medium text-slate-700">Description</label>
                <textarea
                  placeholder="Write a short product description..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={5}
                  className="w-full resize-none rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
                />
              </div>

              {/* Existing Images Preview */}
              <div className="md:col-span-2">
                <label className="text-sm font-medium text-slate-700">Current Images</label>
                <div className="mt-2 rounded-2xl border border-slate-200 bg-white p-4">
                  {location.state?.images?.length ? (
                    <div className="flex flex-wrap gap-3">
                      {location.state.images.map((url, idx) => (
                        <div
                          key={`${url}-${idx}`}
                          className="h-20 w-20 overflow-hidden rounded-2xl border border-slate-200 bg-slate-50"
                        >
                          <img src={url} alt={`Product ${idx + 1}`} className="h-full w-full object-cover" />
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-slate-500">No images found.</p>
                  )}
                </div>
              </div>

              {/* Upload New Images */}
              <div className="md:col-span-2">
                <label className="text-sm font-medium text-slate-700">
                  Upload New Images
                  <span className="ml-2 text-xs font-normal text-slate-500">
                    (leave empty to keep current)
                  </span>
                </label>

                <div className="mt-2 rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-4">
                  <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                    <div>
                      <p className="text-sm font-medium text-slate-800">Choose files</p>
                      <p className="text-xs text-slate-500">PNG, JPG. Multiple allowed.</p>
                    </div>

                    <label className="inline-flex cursor-pointer items-center justify-center rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-slate-800">
                      Select files
                      <input
                        type="file"
                        multiple
                        className="hidden"
                        onChange={(e) => setImages(Array.from(e.target.files))}
                      />
                    </label>
                  </div>

                  {/* Selected New Files */}
                  <div className="mt-4">
                    {images?.length ? (
                      <div className="flex flex-wrap gap-2">
                        {images.map((f, idx) => (
                          <span
                            key={`${f.name}-${idx}`}
                            className="inline-flex items-center rounded-full border border-slate-200 bg-white px-3 py-1 text-xs text-slate-700"
                          >
                            {f.name}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <p className="text-xs text-slate-500">No new files selected.</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Stock */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-slate-700">Stock</label>
                <input
                  type="number"
                  placeholder="0"
                  value={stock}
                  onChange={(e) => setStock(Number(e.target.value))}
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-slate-900 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
                />
              </div>

              {/* Price */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-slate-700">Price</label>
                <input
                  type="number"
                  placeholder="0"
                  value={price}
                  onChange={(e) => setPrice(Number(e.target.value))}
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-slate-900 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
                />
              </div>

              {/* Labeled Price */}
              <div className="flex flex-col gap-2 md:col-span-2">
                <label className="text-sm font-medium text-slate-700">Labeled Price</label>
                <input
                  type="number"
                  placeholder="0"
                  value={labledPrice}
                  onChange={(e) => setLabledPrice(Number(e.target.value))}
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-slate-900 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
                />
              </div>
            </div>

            {/* Actions */}
            <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-end">
              <Link
                className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50"
                to="/admin/Products"
              >
                Cancel
              </Link>

              <button
                className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-slate-800 active:scale-[0.99]"
                onClick={updateProduct}
              >
                Update Product
              </button>
            </div>
          </div>
        </div>

        <p className="mt-6 text-center text-xs text-slate-500">
          Uploading new images will replace the current ones.
        </p>
      </div>
    </div>
  );
}
