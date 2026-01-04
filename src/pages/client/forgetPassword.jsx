import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function ForgotPasswordPage() {
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [email, setEmail] = useState("");

  function handleResetPassword() {
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    axios
      .post(import.meta.env.VITE_BACKEND_URI + "/api/users/resetPassword", {
        email: email,
        otp: otp,
        newPassword: password,
      })
      .then((res) => {
        console.log(res);
        toast.success("Password reset successful");
        navigate("/login");
      })
      .catch((err) => {
        console.log(err);
        toast.error("Error in resetting password");
      });
  }

  function sentOtp() {
    axios
      .post(import.meta.env.VITE_BACKEND_URI + "/api/users/sendOtp", {
        email: email,
      })
      .then((res) => {
        console.log(res);
        setOtpSent(true);
        toast.success("otp sent to your email");
      })
      .catch((err) => {
        console.log(err.response);
        toast.error(`error in sending otp: ${err.response.data.message}`);
      });
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 via-white to-pink-50">
      <div className="mx-auto flex min-h-screen max-w-6xl items-center justify-center px-4 py-10">
        <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-7 shadow-sm sm:p-9">
          {/* Header */}
          <div className="mb-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-rose-200 bg-rose-50 px-3 py-1 text-xs font-semibold text-rose-700">
              🔒 Password Recovery
            </div>
            <h1 className="mt-4 text-2xl font-semibold text-slate-900">
              Forgot Password
            </h1>
            <p className="mt-1 text-sm text-slate-600">
              {otpSent
                ? "Enter the OTP sent to your email and set a new password."
                : "Enter your email to receive an OTP."}
            </p>
          </div>

          {otpSent ? (
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-medium text-slate-600">
                  OTP
                </label>
                <input
                  type="text"
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-medium text-slate-600">
                  New password
                </label>
                <input
                  type="password"
                  placeholder="Enter New Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-medium text-slate-600">
                  Confirm password
                </label>
                <input
                  type="password"
                  placeholder="Confirm New Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
                />
              </div>

              <button
                onClick={handleResetPassword}
                className="mt-2 inline-flex w-full items-center justify-center rounded-2xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800 active:scale-[0.99]"
              >
                Reset Password
              </button>

              <button
                onClick={() => navigate("/login")}
                className="inline-flex w-full items-center justify-center rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
              >
                Cancel
              </button>

              <button
                onClick={() => setOtpSent(false)}
                className="w-full text-center text-xs font-semibold text-rose-700 hover:text-rose-800"
              >
                ← Change email
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-medium text-slate-600">
                  Email
                </label>
                <input
                  type="text"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
                />
              </div>

              <button
                onClick={() => {
                  sentOtp();
                }}
                className="mt-2 inline-flex w-full items-center justify-center rounded-2xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800 active:scale-[0.99]"
              >
                Send OTP
              </button>

              <button
                onClick={() => navigate("/login")}
                className="inline-flex w-full items-center justify-center rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
              >
                Back to Login
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
