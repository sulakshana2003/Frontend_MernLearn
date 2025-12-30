/* eslint-disable no-unused-vars */
import { use, useEffect, useState } from "react";
import { sampleProducts } from "../../assets/sampleData";
import axios from "axios";
import { createClient } from "@supabase/supabase-js";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function AdminProductPage() {
  const [products, setProducts] = useState(sampleProducts);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isLoading) {
      axios
      .get(import.meta.env.VITE_BACKEND_URI + "/api/products")
      .then((res) => {
        console.log(res.data);
        setProducts(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
    }
    
  }, [isLoading]);


  function deleteProduct(productId) {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("You must be logged in to delete a product.");
      return;
    }
    axios.delete(import.meta.env.VITE_BACKEND_URI + `/api/products/${productId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        console.log(res.data);
        toast.success("Product deleted successfully");
        setIsLoading(true);
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
        toast.error("Error deleting product");
      });
  }

  return (
    <div className="min-h-screen w-full bg-slate-50">
      <div className="mx-auto max-w-6xl px-4 py-10">
        {/* Header */}
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-slate-900">Products</h1>
            <p className="mt-1 text-sm text-slate-600">
              Manage your products, prices, and stock.
            </p>
          </div>

          <Link
            to="/admin/addproduct"
            className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-slate-800 active:scale-[0.99]"
          >
            + Add Product
          </Link>
        </div>

        {/* Table Card */}
        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 p-4 sm:p-6">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div className="text-sm text-slate-600">
                Total:{" "}
                <span className="font-semibold text-slate-900">
                  {products?.length || 0}
                </span>
              </div>

              {/* (Optional) quick hint text */}
              <div className="text-xs text-slate-500">
                Tip: Click <span className="font-medium">Edit</span> to update a
                product.
              </div>
            </div>
          </div>

          {/* Scrollable table wrapper */}
          {
            !isLoading ?         
          <div className="w-full overflow-x-auto">
            <table className="w-full min-w-[900px] text-left">
              <thead className="sticky top-0 bg-white">
                <tr className="border-b border-slate-200">
                  <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-600 sm:px-6">
                    Product ID
                  </th>
                  <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-600 sm:px-6">
                    Product
                  </th>
                  <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-600 sm:px-6">
                    Image
                  </th>
                  <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-600 sm:px-6">
                    Labeled Price
                  </th>
                  <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-600 sm:px-6">
                    Price
                  </th>
                  <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-600 sm:px-6">
                    Stock
                  </th>
                  <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-600 sm:px-6">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {products.map((item, index) => {
                  return (
                    <tr
                      key={item.productId}
                      className="transition hover:bg-slate-50"
                    >
                      <td className="px-4 py-4 text-sm text-slate-700 sm:px-6">
                        <span className="rounded-lg bg-slate-100 px-2 py-1 text-xs font-medium text-slate-700">
                          {item.productId}
                        </span>
                      </td>

                      <td className="px-4 py-4 sm:px-6">
                        <div className="flex flex-col">
                          <span className="text-sm font-semibold text-slate-900">
                            {item.name}
                          </span>
                          <span className="mt-0.5 text-xs text-slate-500">
                            {item?.altNames?.[0] ? `aka ${item.altNames[0]}` : ""}
                          </span>
                        </div>
                      </td>

                      <td className="px-4 py-4 sm:px-6">
                        <div className="flex items-center gap-3">
                          <img
                            src={item.images?.[0]}
                            alt={item.altNames?.[0] || item.name}
                            className="h-12 w-12 rounded-xl border border-slate-200 object-cover"
                          />
                          <div className="text-xs text-slate-500">
                            {item.images?.length ? `${item.images.length} photo(s)` : "—"}
                          </div>
                        </div>
                      </td>

                      <td className="px-4 py-4 text-sm text-slate-700 sm:px-6">
                        <span className="font-medium text-slate-900">
                          {item.labledprice}
                        </span>
                      </td>

                      <td className="px-4 py-4 text-sm text-slate-700 sm:px-6">
                        <span className="font-medium text-slate-900">
                          {item.price}
                        </span>
                      </td>

                      <td className="px-4 py-4 sm:px-6">
                        <span
                          className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${
                            Number(item.stock) > 0
                              ? "bg-emerald-50 text-emerald-700"
                              : "bg-rose-50 text-rose-700"
                          }`}
                        >
                          {Number(item.stock) > 0 ? `${item.stock} in stock` : "Out of stock"}
                        </span>
                      </td>

                      <td className="px-4 py-4 sm:px-6">
                        <div className="flex flex-wrap gap-2">
                          <button
                            className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-3 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-slate-800 active:scale-[0.99]"
                            onClick={() => {
                              navigate("/admin/editproduct", {
                                state: item,
                              });
                            }}
                          >
                            Edit
                          </button>

                          <button className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-rose-700 shadow-sm transition hover:bg-rose-50 active:scale-[0.99]"
                          onClick={() => deleteProduct(item.productId)}>
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          : <div className="p-4">Loading products...</div>
      }
          {/* Footer */}
          <div className="border-t border-slate-200 px-4 py-4 text-xs text-slate-500 sm:px-6">
            Showing <span className="font-medium text-slate-700">{products?.length || 0}</span>{" "}
            product(s).
          </div>
        </div>
      </div>
    </div>
  );
}
