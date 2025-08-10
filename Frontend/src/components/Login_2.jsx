import React, { useState } from "react";
import axios from "axios";
import { FcGoogle } from "react-icons/fc";

const Login_2 = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // User Registration
  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await axios.post("/api/auth/register", { name, email, password });
      setMessage(res.data.message);
      if (res.data.success) {
        setIsLogin(true);
      }
    } catch (err) {
      setMessage("Registration failed");
    } finally {
      setLoading(false);
    }
  };

  // User Login
  const handleUserLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await axios.post("/api/users/login", { email, password });
      setMessage(res.data.message);
      if (res.data.success) {
        // Redirect or store token
        console.log("User token:", res.data.token);
      }
    } catch (err) {
      setMessage("Login failed");
    } finally {
      setLoading(false);
    }
  };

  // Admin Login
  const handleAdminLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await axios.post("/api/admin/login", { email, password });
      setMessage(res.data.message);
      if (res.data.success) {
        console.log("Admin token:", res.data.token);
      }
    } catch (err) {
      setMessage("Admin login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="flex w-full max-w-4xl bg-white/30 backdrop-blur-md rounded-xl shadow-lg overflow-hidden">

        {/* Left Side with GIF */}
        <div className="hidden md:flex flex-col justify-center items-center w-1/2 relative">
          <img
            src="https://i.pinimg.com/originals/54/58/a1/5458a14ae4c8f07055b7441ff0f234cf.gif"
            alt="Animated Background"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right Side */}
        <div className="w-full md:w-1/2 p-8 bg-white/70 backdrop-blur-sm">
          <h3 className="text-3xl font-semibold text-gray-800 mb-1">
            {isAdmin ? "Admin Login" : isLogin ? "Login" : "Register"}
          </h3>
          <p className="text-sm text-gray-500 mb-6">
            {isAdmin
              ? "Enter your admin credentials to access the dashboard."
              : isLogin
              ? "Welcome back! Please login to your account."
              : "Create your account to get started."}
          </p>

          {message && (
            <div className={`mb-4 text-sm ${message.includes("success") ? "text-green-600" : "text-red-500"}`}>
              {message}
            </div>
          )}

          <form
            className="space-y-4"
            onSubmit={
              isAdmin
                ? handleAdminLogin
                : isLogin
                ? handleUserLogin
                : handleRegister
            }
          >
            {!isLogin && !isAdmin && (
              <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            )}
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
              disabled={loading}
              className={`w-full py-2 rounded transition ${
                isAdmin
                  ? "bg-red-500 text-white hover:bg-red-600"
                  : "bg-purple-600 text-white hover:bg-purple-700 mt-5 mb-8 rounded-lg"
              }`}
            >
              {loading
                ? "Processing..."
                : isAdmin
                ? "Login as Admin"
                : isLogin
                ? "Login"
                : "Create Account"}
            </button>
          </form>

          <div className="relative text-center my-6">
            <span className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-gray-300"></span>
            </span>
            <span className="relative bg-white/70 px-2 text-sm text-gray-500">
              or {isLogin ? "login" : "register"} with
            </span>
          </div>

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
            </>
          )}

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

export default Login_2;
