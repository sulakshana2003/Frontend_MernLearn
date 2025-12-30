import { Link } from "react-router-dom";



export default function HomepageUi() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 via-white to-pink-50">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute -top-20 right-0 h-64 w-64 rounded-full bg-rose-200/50 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-28 left-0 h-72 w-72 rounded-full bg-pink-200/50 blur-3xl" />

        <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-4 py-14 md:grid-cols-2 md:py-20">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-rose-200 bg-white px-3 py-1 text-xs font-semibold text-rose-700">
              ✨ New arrivals every week
            </div>

            <h1 className="mt-4 text-4xl font-semibold leading-tight text-slate-900 md:text-5xl">
              Glow up your routine with{" "}
              <span className="text-rose-600">clean beauty</span>.
            </h1>

            <p className="mt-4 text-base text-slate-600 md:text-lg">
              Shop skincare, makeup, and fragrances made to feel luxurious and look effortless.
              Fast delivery, easy returns, and authentic products.
            </p>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                to="/products"
                className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800 active:scale-[0.99]"
              >
                Shop Now
              </Link>
              <a
                href="#bestsellers"
                className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
              >
                View Best Sellers
              </a>
            </div>

            <div className="mt-8 grid grid-cols-3 gap-3">
              <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                <p className="text-lg font-semibold text-slate-900">100%</p>
                <p className="text-xs text-slate-500">Authentic products</p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                <p className="text-lg font-semibold text-slate-900">24–48h</p>
                <p className="text-xs text-slate-500">Fast delivery</p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                <p className="text-lg font-semibold text-slate-900">Easy</p>
                <p className="text-xs text-slate-500">Returns & support</p>
              </div>
            </div>
          </div>

          {/* Hero Visual */}
          <div className="relative">
            <div className="rounded-3xl border border-rose-100 bg-white p-6 shadow-sm">
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-2xl bg-rose-100 p-5">
                  <div className="h-10 w-10 rounded-2xl bg-rose-300" />
                  <p className="mt-4 text-sm font-semibold text-slate-900">Skincare</p>
                  <p className="text-xs text-slate-600">Hydrate & repair</p>
                </div>
                <div className="rounded-2xl bg-pink-100 p-5">
                  <div className="h-10 w-10 rounded-2xl bg-pink-300" />
                  <p className="mt-4 text-sm font-semibold text-slate-900">Makeup</p>
                  <p className="text-xs text-slate-600">Soft glam everyday</p>
                </div>
                <div className="rounded-2xl bg-fuchsia-100 p-5">
                  <div className="h-10 w-10 rounded-2xl bg-fuchsia-300" />
                  <p className="mt-4 text-sm font-semibold text-slate-900">Fragrance</p>
                  <p className="text-xs text-slate-600">Fresh & floral</p>
                </div>
                <div className="rounded-2xl bg-amber-100 p-5">
                  <div className="h-10 w-10 rounded-2xl bg-amber-300" />
                  <p className="mt-4 text-sm font-semibold text-slate-900">Hair</p>
                  <p className="text-xs text-slate-600">Smooth & shine</p>
                </div>
              </div>

              <div className="mt-5 rounded-2xl border border-slate-200 bg-white p-4">
                <p className="text-xs font-semibold text-slate-700">Today’s spotlight</p>
                <p className="mt-1 text-sm font-semibold text-slate-900">Rose Glow Lip Oil</p>
                <p className="text-xs text-slate-500">Juicy shine • Non-sticky • Vitamin E</p>
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-sm font-semibold text-rose-700">Up to 20% OFF</span>
                  <Link
                    to="/products"
                    className="rounded-xl bg-rose-600 px-4 py-2 text-xs font-semibold text-white transition hover:bg-rose-700"
                  >
                    Shop deal
                  </Link>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-4 -left-4 hidden rounded-2xl border border-slate-200 bg-white p-4 text-xs text-slate-600 shadow-sm md:block">
              <p className="font-semibold text-slate-900">Free delivery</p>
              <p>On orders over LKR 7,500</p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section id="categories" className="mx-auto max-w-6xl px-4 py-12">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold text-slate-900">Shop by category</h2>
            <p className="mt-1 text-sm text-slate-600">Find what your routine needs.</p>
          </div>
          <Link to="/products" className="text-sm font-semibold text-rose-700 hover:text-rose-800">
            View all →
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { title: "Skincare", desc: "Cleansers, serums, moisturizers", bg: "bg-rose-100" },
            { title: "Makeup", desc: "Lips, eyes, face essentials", bg: "bg-pink-100" },
            { title: "Fragrance", desc: "Fresh, floral, woody", bg: "bg-fuchsia-100" },
            { title: "Haircare", desc: "Shampoo, masks, oils", bg: "bg-amber-100" },
          ].map((c) => (
            <Link
              key={c.title}
              to="/products"
              className={`group rounded-2xl border border-slate-200 ${c.bg} p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md`}
            >
              <div className="h-10 w-10 rounded-2xl bg-white/70" />
              <p className="mt-4 text-base font-semibold text-slate-900">{c.title}</p>
              <p className="mt-1 text-sm text-slate-600">{c.desc}</p>
              <p className="mt-4 text-sm font-semibold text-slate-900 opacity-70 transition group-hover:opacity-100">
                Shop →
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* Best Sellers */}
      <section id="bestsellers" className="mx-auto max-w-6xl px-4 pb-14">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-slate-900">Best sellers</h2>
          <p className="mt-1 text-sm text-slate-600">Customer favorites this month.</p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { name: "Hydra Dew Serum", tag: "Skincare", price: "LKR 6,900" },
            { name: "Velvet Matte Lipstick", tag: "Makeup", price: "LKR 3,500" },
            { name: "Bloom Eau de Parfum", tag: "Fragrance", price: "LKR 12,900" },
          ].map((p) => (
            <div key={p.name} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="h-44 w-full rounded-2xl bg-slate-100" />
              <div className="mt-4 flex items-center justify-between">
                <span className="rounded-full bg-rose-50 px-2.5 py-1 text-xs font-semibold text-rose-700">
                  {p.tag}
                </span>
                <span className="text-sm font-semibold text-slate-900">{p.price}</span>
              </div>
              <p className="mt-2 text-base font-semibold text-slate-900">{p.name}</p>
              <div className="mt-4 flex gap-2">
                <Link
                  to="/products"
                  className="flex-1 rounded-xl bg-slate-900 px-4 py-2 text-center text-sm font-semibold text-white transition hover:bg-slate-800"
                >
                  View
                </Link>
                <button className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50">
                  ♡
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Offers */}
      <section id="offers" className="mx-auto max-w-6xl px-4 pb-14">
        <div className="rounded-3xl border border-rose-100 bg-gradient-to-r from-rose-600 to-pink-500 p-7 text-white shadow-sm">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="text-2xl font-semibold">Weekend Glow Sale ✨</h3>
              <p className="mt-1 text-sm text-white/90">
                Save up to 30% on selected skincare & makeup.
              </p>
            </div>
            <Link
              to="/products"
              className="inline-flex items-center justify-center rounded-xl bg-white px-5 py-2.5 text-sm font-semibold text-slate-900 transition hover:bg-white/90"
            >
              Shop Offers
            </Link>
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section id="reviews" className="mx-auto max-w-6xl px-4 pb-16">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-slate-900">Loved by customers</h2>
          <p className="mt-1 text-sm text-slate-600">Real reviews from real buyers.</p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {[
            { name: "Ayesha", text: "Fast delivery and the products are original. My skin feels amazing!" },
            { name: "Nimal", text: "Great prices and super clean packaging. Will order again." },
            { name: "Sadeeka", text: "The lipstick shade range is perfect. Customer service is so helpful." },
          ].map((r) => (
            <div key={r.name} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-2xl bg-rose-100" />
                <div>
                  <p className="text-sm font-semibold text-slate-900">{r.name}</p>
                  <p className="text-xs text-slate-500">Verified buyer</p>
                </div>
              </div>
              <p className="mt-4 text-sm text-slate-700">“{r.text}”</p>
              <p className="mt-3 text-xs text-amber-600">★★★★★</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-slate-600">
            © {new Date().getFullYear()} Glow Cosmetics. All rights reserved.
          </p>
          <div className="flex gap-4 text-sm font-medium text-slate-700">
            <Link to="/products" className="hover:text-slate-900">
              Shop
            </Link>
            <Link to="/contact" className="hover:text-slate-900">
              Contact
            </Link>
            <Link to="/about" className="hover:text-slate-900">
              About
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
