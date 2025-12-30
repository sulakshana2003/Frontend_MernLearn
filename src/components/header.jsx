import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-rose-100 bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <div className="flex items-center gap-2">
            <img
                src="/logo.png"
                alt="Glow Cosmetics"
                className="h-9 w-9 rounded-2xl"
              />
            <span className="text-lg font-semibold text-slate-900">
              <Link to="/">
                Glow Cosmetics
              </Link>
            </span>
          </div>

          <nav className="hidden items-center gap-6 md:flex">
            {/* <Link to="#categories" className="text-sm font-medium text-slate-700 hover:text-slate-900">
              Categories
            </Link> */}
            <Link to="#bestsellers" className="text-sm font-medium text-slate-700 hover:text-slate-900">
              About
            </Link>
            <Link to="#offers" className="text-sm font-medium text-slate-700 hover:text-slate-900">
              Contacts
            </Link>
            <Link to="#reviews" className="text-sm font-medium text-slate-700 hover:text-slate-900">
              Reviews
            </Link>
          </nav>

          <div className="flex items-center gap-2">
            <Link
              to="/products"
              className="hidden rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 sm:inline-flex"
            >
              Shop
            </Link>
            <Link
              to="/login"
              className="inline-flex rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800"
            >
              Sign in
            </Link>
          </div>
        </div>
      </header>  
  );
}