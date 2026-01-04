/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import axios from "axios";
import ProductCard from "../../components/productCard";

export default function ProductPage() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    axios
      .get(import.meta.env.VITE_BACKEND_URI + "/api/products")
      .then((response) => {
        setProducts(response.data || []);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    const q = searchQuery.trim();

    if (q === "") {
      setIsSearching(false);
      setFilteredProducts([]);
      return;
    }

    setIsSearching(true);

    axios
      .get(
        `${import.meta.env.VITE_BACKEND_URI}/api/products/search?q=${encodeURIComponent(
          q
        )}`
      )
      .then((response) => {
        setFilteredProducts(response.data || []);
      })
      .catch((error) => {
        console.error("Error searching products:", error);
        setFilteredProducts([]);
      });
  }, [searchQuery]);

  const listToShow = isSearching ? filteredProducts : products;

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 via-white to-pink-50">
      <div className="mx-auto max-w-6xl px-4 py-10">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-rose-200 bg-white px-3 py-1 text-xs font-semibold text-rose-700">
              ✨ Cosmetics Store
              {isSearching ? (
                <span className="rounded-full bg-rose-50 px-2 py-0.5 text-[11px] font-semibold text-rose-700">
                  Searching
                </span>
              ) : null}
            </div>

            <h1 className="mt-4 text-2xl font-semibold text-slate-900 sm:text-3xl">
              Shop Products
            </h1>
            <p className="mt-1 text-sm text-slate-600">
              Discover your next skincare + beauty favorites.
            </p>

            {/* Search bar */}
            <div className="mt-4">
              <div className="relative">
                <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                  🔎
                </span>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products by name..."
                  className="w-full rounded-2xl border border-slate-200 bg-white py-3 pl-11 pr-4 text-sm text-slate-900 shadow-sm outline-none transition focus:border-rose-300 focus:ring-2 focus:ring-rose-200 sm:w-[420px]"
                />

                {searchQuery.trim() !== "" && (
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full border border-slate-200 bg-white px-2.5 py-1 text-[11px] font-semibold text-slate-600">
                    {isSearching ? "Searching..." : "Results"}
                  </span>
                )}
              </div>

              <p className="mt-2 text-xs text-slate-500">
                Tip: try keywords like{" "}
                <span className="font-semibold">serum</span>,{" "}
                <span className="font-semibold">lip</span>,{" "}
                <span className="font-semibold">moisturizer</span>.
              </p>
            </div>
          </div>

          {/* Count */}
          <div className="flex items-center gap-2">
            <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
              <p className="text-xs text-slate-500">Showing</p>
              <p className="text-lg font-semibold text-slate-900">
                {listToShow?.length || 0}
              </p>
              <p className="text-xs font-medium text-rose-700">
                {isSearching ? "Matched items" : "Total items"}
              </p>
            </div>
          </div>
        </div>

        {/* Loading */}
        {isLoading ? (
          <div className="rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-sm">
            <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-2 border-slate-200 border-t-slate-900" />
            <p className="text-sm font-medium text-slate-700">
              Loading products...
            </p>
            <p className="mt-1 text-xs text-slate-500">Please wait a moment</p>

            {/* Skeleton grid (style only) */}
            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
                >
                  <div className="h-44 w-full animate-pulse bg-slate-100" />
                  <div className="p-5">
                    <div className="h-4 w-3/4 animate-pulse rounded bg-slate-100" />
                    <div className="mt-3 h-3 w-full animate-pulse rounded bg-slate-100" />
                    <div className="mt-2 h-3 w-5/6 animate-pulse rounded bg-slate-100" />
                    <div className="mt-4 h-9 w-full animate-pulse rounded-xl bg-slate-100" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : !listToShow || listToShow.length === 0 ? (
          <div className="rounded-3xl border border-slate-200 bg-white p-12 text-center shadow-sm">
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-rose-50 text-xl">
              🧴
            </div>
            <p className="text-base font-semibold text-slate-900">
              {isSearching ? "No matching products" : "No products found"}
            </p>
            <p className="mt-1 text-sm text-slate-600">
              {isSearching ? "Try a different keyword." : "Try again later."}
            </p>
          </div>
        ) : (
          <>
            {/* Result hint */}
            {isSearching && (
              <div className="mb-5 rounded-2xl border border-rose-200 bg-white px-4 py-3 text-sm text-rose-700 shadow-sm">
                Showing results for{" "}
                <span className="font-semibold">“{searchQuery.trim()}”</span>
              </div>
            )}

            {/* Grid */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {listToShow.map((product) => (
                <ProductCard
                  key={product.productId || product._id || product.id}
                  product={product}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
