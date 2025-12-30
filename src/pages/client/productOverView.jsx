/* eslint-disable no-unused-vars */
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import toast from "react-hot-toast";
import js from "@eslint/js";

export default function ProductOverView() {
  const params = useParams();
  const [state, setState] = useState("Loading..."); // loading success error
  const [product, setProduct] = useState(null);
  const id = params.id;

  useEffect(() => {
    axios
      .get(import.meta.env.VITE_BACKEND_URI + `/api/products/${id}`)
      .then((res) => {
        console.log(res.data);
        setProduct(res.data);
        setState("success");
      })
      .catch((err) => {
        console.log(err);
        setState("error");
        toast.error("Error loading product");
      });
  }, []);

  const img = product?.images?.[0] || product?.image;

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 via-white to-pink-50">
      <div className="mx-auto max-w-6xl px-4 py-10">
        {/* Top bar */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-slate-900 sm:text-3xl">
              {product?.name}
            </h1>
            <p className="mt-1 text-sm text-slate-600">
              View product details, pricing, and stock.
            </p>
          </div>

          <Link
            to="/products"
            className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
          >
            ← Back
          </Link>
        </div>

        {/* Loading */}
        {state === "Loading..." && (
          <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center shadow-sm">
            <div className="mx-auto mb-3 h-10 w-10 animate-spin rounded-full border-2 border-slate-200 border-t-slate-900" />
            <p className="text-sm font-medium text-slate-700">
              Loading product...
            </p>
            <p className="mt-1 text-xs text-slate-500">Please wait a moment</p>
          </div>
        )}

        {/* Error */}
        {state === "error" && (
          <div className="rounded-2xl border border-rose-200 bg-white p-10 text-center shadow-sm">
            <p className="text-base font-semibold text-slate-900">
              Couldn’t load product
            </p>
            <p className="mt-1 text-sm text-slate-600">
              Please try again or go back to products.
            </p>
            <div className="mt-5 flex flex-col justify-center gap-3 sm:flex-row">
              <button
                onClick={() => window.location.reload()}
                className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800 active:scale-[0.99]"
              >
                Retry
              </button>
              <Link
                to="/products"
                className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
              >
                Back to Products
              </Link>
            </div>
          </div>
        )}

        {/* Success */}
        {state === "success" && product && (
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {/* Images */}
            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-100">
                {img ? (
                  <img
                    src={img}
                    alt={product?.name || "Product"}
                    className="h-[380px] w-full object-cover"
                  />
                ) : (
                  <div className="flex h-[380px] items-center justify-center text-sm text-slate-500">
                    No image available
                  </div>
                )}
              </div>

              {/* Thumbnails (if multiple images) */}
              {product?.images?.length > 1 && (
                <div className="mt-4 grid grid-cols-4 gap-3">
                  {product.images.slice(0, 4).map((url, idx) => (
                    <div
                      key={`${url}-${idx}`}
                      className="overflow-hidden rounded-xl border border-slate-200 bg-slate-100"
                    >
                      <img
                        src={url}
                        alt={`Thumb ${idx + 1}`}
                        className="h-20 w-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Details */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold text-rose-700">
                    {product?.productId
                      ? `ID: ${product.productId}`
                      : "Product"}
                  </p>
                  <h2 className="mt-1 text-2xl font-semibold text-slate-900">
                    {product?.name}
                  </h2>

                  {product?.altNames?.length ? (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {product.altNames.slice(0, 6).map((n, i) => (
                        <span
                          key={`${n}-${i}`}
                          className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-700"
                        >
                          {n}
                        </span>
                      ))}
                    </div>
                  ) : null}
                </div>

                {/* Price box */}
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-right">
                  {product?.labledprice || product?.labledPrice ? (
                    <div className="text-xs text-slate-500 line-through">
                      {product?.labledprice || product?.labledPrice}
                    </div>
                  ) : null}
                  <div className="text-xl font-semibold text-rose-700">
                    {product?.price}
                  </div>
                  <div className="mt-2 text-xs text-slate-600">
                    {Number(product?.stock) > 0 ? "Available" : "Out of stock"}
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="mt-6">
                <h3 className="text-sm font-semibold text-slate-900">
                  Description
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {product?.description || "No description provided."}
                </p>
              </div>

              {/* Meta */}
              <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
                <div className="rounded-2xl border border-slate-200 bg-white p-4">
                  <p className="text-xs text-slate-500">Stock</p>
                  <p className="mt-1 text-sm font-semibold text-slate-900">
                    {product?.stock ?? 0}
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-4">
                  <p className="text-xs text-slate-500">Price</p>
                  <p className="mt-1 text-sm font-semibold text-slate-900">
                    {product?.price ?? "-"}
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-4">
                  <p className="text-xs text-slate-500">Labeled</p>
                  <p className="mt-1 text-sm font-semibold text-slate-900">
                    {product?.labledprice || product?.labledPrice || "-"}
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-end">
                <button className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50">
                  Add to Wishlist ♡
                </button>
                <button
                  disabled={Number(product?.stock) <= 0}
                  className={`inline-flex items-center justify-center rounded-xl px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition active:scale-[0.99] ${
                    Number(product?.stock) > 0
                      ? "bg-slate-900 hover:bg-slate-800"
                      : "cursor-not-allowed bg-slate-300"
                  }`}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Debug (optional) */}
      </div>
    </div>
  );
}
