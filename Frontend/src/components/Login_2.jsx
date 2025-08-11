import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';
import { AppContent } from '../Context/AppContext';
import { FcGoogle } from "react-icons/fc";
import { useState, useContext } from "react";

const Login_2 = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mobile, setMobile] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();
  const { backendURL, setIsLoggedIn, getUserData } = useContext(AppContent);

  // User Registration
  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await axios.post(`${backendURL}/api/auth/register`, { name, email, password });
      setMessage(res.data.message);
      if (res.data.success) {
        setIsLogin(true);
        console.log("Registration successful");
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
      const { data } = await axios.post(
        `${backendURL}/api/auth/login`,
        { email, password },
        { withCredentials: true }
      );

      setMessage(data.message);

      if (data.success) {
        setIsLoggedIn(true);
        await getUserData();
        console.log("Login response: ", data);
        navigate('/userhome');
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.error(err);
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
    <div
      className="min-h-screen flex justify-between items-center bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80')",
      }}
    >
       {/* Text block */}
      <div className="max-w-lg text-black space-y-4 ml-40">
        <h1 className="text-3xl font-bold">Global Trotter</h1>
        <h2 className="text-5xl font-bold">EXPLORE HORIZONS</h2>
        <h3 className="text-2xl">Where Your Dream Destinations Become Reality.</h3>
        <h3 className="text-2xl">Embark on a journey where every corner of the world is within your reach.</h3>
      </div>
      <div className="flex w-full max-w-lg rounded-xl overflow-hidden shadow-lg border-2 border-white mr-50">

        <div className="w-full p-8 bg-gray/100 backdrop-blur-sm">
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
            <div
              className={`mb-4 text-sm ${
                message.includes("success") ? "text-green-600" : "text-red-500"
              }`}
            >
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
            {!isLogin && !isAdmin && (<>
              <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
              />

              <input
              type="number"
              placeholder="Mobile"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
            />

            <input
              type="text"
              placeholder="City"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <input
              type="text"
              placeholder="Country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
</>
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
                  : "bg-orange-600 text-white hover:bg-purple-700 mt-2 rounded-lg"
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

          {!isAdmin && isLogin &&(
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
