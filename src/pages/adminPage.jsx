import { Link, Routes, Route, useLocation } from "react-router-dom";
import AdminProductPage from "./admin/adminProductPage";
import AddProductPage from "./admin/addProductPage";
import UpdateProductPage from "./admin/editProductPage";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { jwtDecode } from "jwt-decode";
import { useEffect } from "react";
import AdminOrderPage from "./admin/order";

export default function AdminPage() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const tokenStr = localStorage.getItem("token");
    if (!tokenStr) {
      toast.error("Access denied. Please log in.");
      navigate("/", { replace: true });
      return;
    }
    const token = jwtDecode(tokenStr);
    if (token.role !== "admin") {
      toast.error("Access denied. Admins only.");
      navigate("/", { replace: true });
      return;
    }
  }, [navigate]);

  const isActive = (path) => location.pathname.startsWith(path);

  const linkBase =
    "rounded-xl px-4 py-3 text-sm font-medium transition focus:outline-none focus:ring-2 focus:ring-slate-400";

  const linkActive = "bg-slate-900 text-white shadow-sm";
  const linkIdle = "text-slate-700 hover:bg-slate-100 hover:text-slate-900";

  return (
    <div className="flex min-h-screen flex-col bg-slate-100 md:flex-row">
      {/* Sidebar */}
      <aside className="w-full bg-white shadow-sm ring-1 ring-slate-200 md:w-[280px]">
        <div className="border-b border-slate-100 px-6 py-5">
          <h1 className="text-lg font-semibold text-slate-900">Admin Panel</h1>
          <p className="mt-1 text-xs text-slate-500">
            Store management dashboard
          </p>
        </div>

        {/* Mobile: horizontal nav, Desktop: vertical nav */}
        <nav className="flex gap-2 overflow-x-auto p-3 md:flex-col md:gap-1 md:overflow-visible">
          <Link
            to="/admin/Products"
            className={[
              linkBase,
              "shrink-0",
              isActive("/admin/Products") ? linkActive : linkIdle,
            ].join(" ")}
          >
            Products Management
          </Link>

          <Link
            to="/admin/Orders"
            className={[
              linkBase,
              "shrink-0",
              isActive("/admin/Orders") ? linkActive : linkIdle,
            ].join(" ")}
          >
            Order Management
          </Link>

          <Link
            to="/admin/settings"
            className={[
              linkBase,
              "shrink-0",
              isActive("/admin/settings") ? linkActive : linkIdle,
            ].join(" ")}
          >
            Site Settings
          </Link>

          <Link
            to="/admin/reports"
            className={[
              linkBase,
              "shrink-0",
              isActive("/admin/reports") ? linkActive : linkIdle,
            ].join(" ")}
          >
            Reports
          </Link>
        </nav>

        {/* Hide this card on mobile to save space */}
        <div className="mt-auto hidden px-6 py-4 md:block">
          <div className="rounded-xl bg-slate-50 p-4 ring-1 ring-inset ring-slate-200">
            <p className="text-xs text-slate-600">
              Logged in as <span className="font-semibold">Admin</span>
            </p>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 bg-slate-50">
        <div className="p-4 sm:p-6">
          <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200 sm:p-6">
            <Routes>
              <Route path="/Products" element={<AdminProductPage />} />
              <Route path="/Orders" element={<AdminOrderPage />} />
              <Route
                path="/settings"
                element={
                  <div>
                    <h1 className="text-xl font-semibold text-slate-900">
                      Site Settings Section
                    </h1>
                    <p className="mt-2 text-sm text-slate-600">
                      Configure site-wide settings here.
                    </p>
                  </div>
                }
              />
              <Route
                path="/reports"
                element={
                  <div>
                    <h1 className="text-xl font-semibold text-slate-900">
                      Reports Section
                    </h1>
                    <p className="mt-2 text-sm text-slate-600">
                      View analytics and reports.
                    </p>
                  </div>
                }
              />
              <Route path="/addproduct" element={<AddProductPage />} />
              <Route path="/editproduct" element={<UpdateProductPage />} />
              <Route
                path="*"
                element={
                  <div className="text-center">
                    <h1 className="text-xl font-semibold text-slate-900">
                      Welcome to Admin Dashboard
                    </h1>
                    <p className="mt-2 text-sm text-slate-600">
                      Select an option from the sidebar to begin.
                    </p>
                  </div>
                }
              />
            </Routes>
          </div>
        </div>
      </main>
    </div>
  );
}
