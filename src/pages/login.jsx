import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { GrGoogle } from "react-icons/gr";
import { useGoogleLogin } from "@react-oauth/google";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const loginwithGoogle = useGoogleLogin({
    scope: "openid email profile",
    onSuccess: (response) => {
      const token = response.access_token;
      axios
        .post(import.meta.env.VITE_BACKEND_URI + "/api/users/login/google", {
          token: token,
        })
        .then((res) => {
          toast.success("Login Successful");
          console.log(res.data);
          localStorage.setItem("token", res.data.token);
          if (res.data.role === "admin") {
            navigate("/admin/");
          } else {
            navigate("/");
          }
        })
        .catch((err) => {
          toast.error("Google Login Failed");
          console.log(err);
        });
    },
    onError: () => {
      toast.error("Google Login Failed");
    },
  });

  async function handleLogin() {
    console.log(email, password);
    try {
      const response = await axios.post(
        import.meta.env.VITE_BACKEND_URI + "/api/users/login",
        {
          email: email,
          password: password,
        }
      );
      toast.success("Login Successful");
      console.log(response.data);
      localStorage.setItem("token", response.data.token);

      if (response.data.role === "admin") {
        navigate("/admin/");
      } else {
        navigate("/");
      }
    } catch (e) {
      toast.error(e.response.data.message);
      console.log(import.meta.env.VITE_BACKEND_URI);
    }
  }

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[url('/login.jpg')] bg-cover bg-center">
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60" />

      <div className="relative mx-auto flex min-h-screen max-w-6xl items-center justify-center px-4 py-10">
        <div className="grid w-full grid-cols-1 items-center gap-8 md:grid-cols-2">
          {/* Left side text */}
          <div className="hidden md:block">
            <div className="max-w-md">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold text-white">
                ✨ Welcome back
              </div>
              <h1 className="mt-4 text-4xl font-semibold leading-tight text-white">
                Sign in to continue your beauty journey.
              </h1>
              <p className="mt-3 text-sm text-white/80">
                Access your account, track orders, and explore new arrivals.
              </p>

              <div className="mt-8 grid grid-cols-3 gap-3">
                <div className="rounded-2xl border border-white/15 bg-white/10 p-4 text-white">
                  <p className="text-lg font-semibold">Fast</p>
                  <p className="text-xs text-white/75">Checkout</p>
                </div>
                <div className="rounded-2xl border border-white/15 bg-white/10 p-4 text-white">
                  <p className="text-lg font-semibold">Secure</p>
                  <p className="text-xs text-white/75">Payments</p>
                </div>
                <div className="rounded-2xl border border-white/15 bg-white/10 p-4 text-white">
                  <p className="text-lg font-semibold">Original</p>
                  <p className="text-xs text-white/75">Products</p>
                </div>
              </div>
            </div>
          </div>

          {/* Login card */}
          <div className="flex w-full justify-center md:justify-end">
            <div className="w-full max-w-md rounded-3xl border border-white/20 bg-white/10 p-7 shadow-2xl backdrop-blur-xl sm:p-9">
              <div className="mb-6">
                <h2 className="text-2xl font-semibold text-white">Login</h2>
                <p className="mt-1 text-sm text-white/75">
                  Enter your email and password to continue.
                </p>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-xs font-medium text-white/80">
                    Email
                  </label>
                  <input
                    type="text"
                    placeholder="you@example.com"
                    className="w-full rounded-2xl border border-white/20 bg-white/15 px-4 py-3 text-sm text-white placeholder:text-white/60 outline-none transition focus:border-white/30 focus:ring-2 focus:ring-white/20"
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-medium text-white/80">
                    Password
                  </label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    className="w-full rounded-2xl border border-white/20 bg-white/15 px-4 py-3 text-sm text-white placeholder:text-white/60 outline-none transition focus:border-white/30 focus:ring-2 focus:ring-white/20"
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                  />
                </div>

                <div className="pt-2 space-y-3">
                  <button
                    className="inline-flex w-full items-center justify-center rounded-2xl bg-white px-4 py-3 text-sm font-semibold text-slate-900 shadow-sm transition hover:bg-white/90 active:scale-[0.99]"
                    onClick={handleLogin}
                  >
                    Log in
                  </button>

                  <div className="relative flex items-center justify-center">
                    <div className="h-px w-full bg-white/20" />
                    <span className="absolute rounded-full bg-black/30 px-3 py-1 text-[11px] font-semibold text-white/80">
                      OR
                    </span>
                  </div>

                  <button
                    className="inline-flex w-full items-center justify-center gap-3 rounded-2xl border border-white/20 bg-white/15 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-white/20 active:scale-[0.99]"
                    onClick={loginwithGoogle}
                  >
                    <GrGoogle className="text-lg" />
                    Continue with Google
                  </button>
                </div>

                <div className="pt-2 text-center text-xs text-white/70">
                  <p>By continuing, you agree to our policies.</p>
                  <p>
                    Don't have an account?{" "}
                    <Link to="/signup" className="text-white ">
                      Sign up
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/40 to-transparent" />
    </div>
  );
}
