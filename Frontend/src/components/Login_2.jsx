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
  const [address, setAddress] = useState("");

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
      const res = await axios.post(`${backendURL}/api/auth/register`, { name, email, password,city, address});
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
        navigate('/landingPage');
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
      const res = await axios.post(`${backendURL}/api/auth/adminlogin`, { email, password });
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
          "url('https://i.pinimg.com/1200x/ae/8e/f9/ae8ef98e6749426c59b39266bd672e47.jpg')",
      }}
    >
       {/* Text block */}
      <div className="max-w-lg text-black space-y-4 ml-40">
        <h1 className="text-3xl font-bold">Global Trotter</h1>
        <h2 className="text-5xl font-bold">EXPLORE HORIZONS</h2>
        <h3 className="text-2xl font-semibold">Where Your Dream Destinations Become Reality.</h3>
        <h3 className="text-2xl font-semibold">Embark on a journey where every corner of the world is within your reach.</h3>
      </div>
      <div className="flex w-full max-w-lg rounded-xl overflow-hidden shadow-lg border-2 border-white mr-50">

        <div className="w-full p-8 bg-gray/100 backdrop-blur-sm">
          <h3 className="text-3xl font-semibold text-white mb-1">
            {isAdmin ? "Admin Login" : isLogin ? "Login" : "Register"}
          </h3>
          <p className="text-sm font-semibold text-white mb-6">
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

            <select
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full px-4 py-2 text-gray-700 border rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="">Select City</option>
              <option value="Ahmedabad">Ahmedabad</option>
              <option value="Amritsar">Amritsar</option>
              <option value="Aurangabad">Aurangabad</option>
              <option value="Bengaluru">Bengaluru</option>
              <option value="Bhopal">Bhopal</option>
              <option value="Bhubaneswar">Bhubaneswar</option>
              <option value="Chandigarh">Chandigarh</option>
              <option value="Chennai">Chennai</option>
              <option value="Coimbatore">Coimbatore</option>
              <option value="Dehradun">Dehradun</option>
              <option value="Delhi">Delhi</option>
              <option value="Dhanbad">Dhanbad</option>
              <option value="Durgapur">Durgapur</option>
              <option value="Faridabad">Faridabad</option>
              <option value="Ghaziabad">Ghaziabad</option>
              <option value="Gorakhpur">Gorakhpur</option>
              <option value="Guwahati">Guwahati</option>
              <option value="Gwalior">Gwalior</option>
              <option value="Hyderabad">Hyderabad</option>
              <option value="Indore">Indore</option>
              <option value="Jabalpur">Jabalpur</option>
              <option value="Jaipur">Jaipur</option>
              <option value="Jalandhar">Jalandhar</option>
              <option value="Jammu">Jammu</option>
              <option value="Jamshedpur">Jamshedpur</option>
              <option value="Kanpur">Kanpur</option>
              <option value="Kochi">Kochi</option>
              <option value="Kolkata">Kolkata</option>
              <option value="Kota">Kota</option>
              <option value="Lucknow">Lucknow</option>
              <option value="Ludhiana">Ludhiana</option>
              <option value="Madurai">Madurai</option>
              <option value="Mangalore">Mangalore</option>
              <option value="Meerut">Meerut</option>
              <option value="Mumbai">Mumbai</option>
              <option value="Mysuru">Mysuru</option>
              <option value="Nagpur">Nagpur</option>
              <option value="Nashik">Nashik</option>
              <option value="Noida">Noida</option>
              <option value="Patna">Patna</option>
              <option value="Prayagraj">Prayagraj</option>
              <option value="Pune">Pune</option>
              <option value="Raipur">Raipur</option>
              <option value="Rajkot">Rajkot</option>
              <option value="Ranchi">Ranchi</option>
              <option value="Shillong">Shillong</option>
              <option value="Shimla">Shimla</option>
              <option value="Surat">Surat</option>
              <option value="Thiruvananthapuram">Thiruvananthapuram</option>
              <option value="Vadodara">Vadodara</option>
              <option value="Varanasi">Varanasi</option>
              <option value="Visakhapatnam">Visakhapatnam</option>
            </select>

            <input
              type="text"
              placeholder="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
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
              <div className="flex items-center justify-between text-sm  text-gray-600">
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
                  ? "bg-blue-500 text-white hover:bg-blue-600 mt-2 rounded-lg"
                  : "bg-blue-500 text-white hover:bg-blue-600 mt-2 rounded-lg"
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

          {!isAdmin && isLogin &&
          <div className="relative text-center my-6">
            <span className="absolute inset-0 flex items-center">
              {/* <span className="w-full border-t border-gray-300"></span> */}
            </span>
            <span className="relative px-2 text-md text-white font-semibold">
              or {isLogin ? "login" : "register"} as
            </span>
          </div>
          }

          {!isAdmin && isLogin &&(
            <>
              {/* <button
                type="button"
                className="w-full flex items-center justify-center gap-2 py-2 mb-4 border border-gray-300 rounded hover:bg-gray-100 transition"
              >
                <FcGoogle size={20} />
                <span className="text-sm text-gray-700">
                  {isLogin ? "Sign in with Google" : "Sign up with Google"}
                </span>
              </button> */}

              <button
                type="button"
                onClick={() => {
                  setIsAdmin(true);
                  setIsLogin(true);
                }}
                className="w-full py-2 mb-4 bg-blue-500 text-white hover:bg-blue-600 mt-2 rounded-lg"
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
                className="text-blue-600 hover:underline"
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
