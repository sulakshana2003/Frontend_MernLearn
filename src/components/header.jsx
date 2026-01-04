import { Link } from "react-router-dom";
import {
  FiShoppingBag,
  FiShoppingCart,
  FiUser,
  FiLogOut,
} from "react-icons/fi";
import { HiOutlineSparkles } from "react-icons/hi2";

export default function Header() {
  function handleLogout() {
    localStorage.removeItem("token");
    window.location.href = "/";
  }

  const token = localStorage.getItem("token");

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Glass / transparent bar (light theme) */}
      <div className="border-b border-rose-100 bg-white/60 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-2xl bg-rose-50 ring-1 ring-rose-100">
              <img
                src="/logo.png"
                alt="Glow Cosmetics"
                className="h-9 w-9 rounded-2xl"
              />
            </div>

            <div className="flex flex-col leading-tight">
              <span className="flex items-center gap-1 text-base font-semibold text-slate-900">
                Glow Cosmetics <HiOutlineSparkles className="text-rose-500" />
              </span>
              <span className="text-[11px] font-medium text-slate-500">
                skincare • makeup • fragrance
              </span>
            </div>
          </Link>

          {/* Nav (ALWAYS show shop + cart, before and after login) */}
          <nav className="hidden items-center gap-2 md:flex">
            <Link
              to="/products"
              className="inline-flex items-center gap-2 rounded-2xl px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-rose-50 hover:text-slate-900"
            >
              <FiShoppingBag className="text-base text-rose-600" />
              Shop
            </Link>

            <Link
              to="/cart"
              className="inline-flex items-center gap-2 rounded-2xl px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-rose-50 hover:text-slate-900"
            >
              <FiShoppingCart className="text-base text-rose-600" />
              Cart
            </Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {/* Mobile quick icons (ALWAYS show shop + cart) */}
            <Link
              to="/products"
              className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-white/60 text-slate-800 ring-1 ring-rose-100 transition hover:bg-rose-50 md:hidden"
              aria-label="Shop"
            >
              <FiShoppingBag className="text-rose-600" />
            </Link>

            <Link
              to="/cart"
              className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-white/60 text-slate-800 ring-1 ring-rose-100 transition hover:bg-rose-50 md:hidden"
              aria-label="Cart"
            >
              <FiShoppingCart className="text-rose-600" />
            </Link>

            {/* Auth button */}
            {!token ? (
              <Link
                to="/login"
                className="inline-flex items-center gap-2 rounded-2xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800 active:scale-[0.99]"
              >
                <FiUser className="text-base" />
                Sign in
              </Link>
            ) : (
              <button
                onClick={handleLogout}
                className="inline-flex items-center gap-2 rounded-2xl border border-rose-100 bg-white/70 px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-rose-50 active:scale-[0.99]"
              >
                <FiLogOut className="text-base text-rose-600" />
                Log out
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
