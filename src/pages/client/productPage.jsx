/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import axios from "axios";
import ProductCard from "../../components/productCard";

export default function ProductPage() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isLoading) {
      axios
        .get(import.meta.env.VITE_BACKEND_URI + "/api/products")
        .then((response) => {
          setProducts(response.data);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching products:", error);
          setIsLoading(false);
        });
    }
  }, [isLoading]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 via-white to-pink-50">
      <div className="mx-auto max-w-6xl px-4 py-10">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-slate-900 sm:text-3xl">
              Shop Products
            </h1>
            <p className="mt-1 text-sm text-slate-600">
              Discover your next skincare + beauty favorites.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="rounded-full border border-rose-200 bg-white px-3 py-1 text-xs font-semibold text-rose-700">
              {products?.length || 0} items
            </span>
          </div>
        </div>

        {/* Loading */}
        {isLoading ? (
          <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
            <div className="mx-auto mb-3 h-10 w-10 animate-spin rounded-full border-2 border-slate-200 border-t-slate-900" />
            <p className="text-sm font-medium text-slate-700">Loading products...</p>
            <p className="mt-1 text-xs text-slate-500">Please wait a moment</p>
          </div>
        ) : (
          <>
            {/* Empty state */}
            {(!products || products.length === 0) ? (
              <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center shadow-sm">
                <p className="text-base font-semibold text-slate-900">No products found</p>
                <p className="mt-1 text-sm text-slate-600">
                  Try again later or check your backend connection.
                </p>
              </div>
            ) : (
              /* Grid */
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {products.map((product) => (
                  <ProductCard
                    key={product.productId || product._id || product.id}
                    product={product}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
