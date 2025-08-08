import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  const handleAdminLogin = (e) => {
    e.preventDefault();
    alert("Admin login functionality goes here");
    // Example:
    // fetch("/api/admin/login", { method: "POST", body: JSON.stringify({ email, password }) })
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="flex w-full max-w-4xl bg-white/30 backdrop-blur-md rounded-xl shadow-lg overflow-hidden">
        {/* Left Side */}
        <div className="hidden md:flex flex-col justify-center items-center w-1/2 bg-gradient-to-br from-purple-500 via-pink-400 to-orange-400 p-8">
          <h2 className="text-4xl font-bold text-white mb-2">
            {isAdmin ? "Admin Access" : "Welcome Back!"}
          </h2>
        </div>

        {/* Right Side */}
        <div className="w-full md:w-1/2 p-8 bg-white/70 backdrop-blur-sm">
          <h3 className="text-2xl font-semibold text-gray-800 mb-1">
            {isAdmin ? "Admin Login" : isLogin ? "Login" : "Register"}
          </h3>
          <p className="text-sm text-gray-500 mb-6">
            {isAdmin
              ? "Enter your admin credentials to access the dashboard."
              : isLogin
              ? "Welcome back! Please login to your account."
              : "Create your account to get started."}
          </p>

          {!isAdmin && (
            <>
              <button
                type="button"
                className="w-full flex items-center justify-center gap-2 py-2 mb-4 border border-gray-300 rounded hover:bg-gray-100 transition"
              >
                <FcGoogle size={20} />
                <span className="text-sm text-gray-700">
                  {isLogin ? "Sign in with Google" : "Sign up with Google"}
                </span>
              </button>

              {/* Admin Login Button */}
              <button
                type="button"
                onClick={() => {
                  setIsAdmin(true);
                  setIsLogin(true);
                }}
                className="w-full py-2 mb-4 border border-red-400 text-red-500 rounded hover:bg-red-50 transition"
              >
                Admin Login
              </button>

              <div className="relative text-center my-4">
                <span className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-gray-300"></span>
                </span>
                <span className="relative bg-white/70 px-2 text-sm text-gray-500">
                  or {isLogin ? "login" : "register"} with email
                </span>
              </div>
            </>
          )}

          <form
            className="space-y-4"
            onSubmit={isAdmin ? handleAdminLogin : (e) => e.preventDefault()}
          >
            {!isLogin && !isAdmin && (
              <input
                type="text"
                placeholder="Full Name"
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            )}
            <input
              type="email"
              placeholder="Email"
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
            />

            {isLogin && !isAdmin && (
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  Remember Me
                </label>
                <button type="button" className="text-purple-600 hover:underline">
                  Forgot Password?
                </button>
              </div>
            )}

            <button
              type="submit"
              className={`w-full py-2 rounded transition ${
                isAdmin
                  ? "bg-red-500 text-white hover:bg-red-600"
                  : "bg-purple-600 text-white hover:bg-purple-700"
              }`}
            >
              {isAdmin ? "Login as Admin" : isLogin ? "Login" : "Create Account"}
            </button>
          </form>

          {!isAdmin && (
            <div className="mt-4 text-center text-sm">
              {isLogin ? (
                <>
                  New User?{" "}
                  <button
                    onClick={() => setIsLogin(false)}
                    className="text-purple-600 hover:underline"
                  >
                    Sign Up
                  </button>
                </>
              ) : (
                <>
                  Already have an account?{" "}
                  <button
                    onClick={() => setIsLogin(true)}
                    className="text-purple-600 hover:underline"
                  >
                    Login
                  </button>
                </>
              )}
            </div>
          )}

          {isAdmin && (
            <div className="mt-4 text-center text-sm">
              <button
                onClick={() => setIsAdmin(false)}
                className="text-gray-600 hover:underline"
              >
                Back to User Login
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
