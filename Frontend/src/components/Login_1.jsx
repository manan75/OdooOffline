import React from "react";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";

const Login_1 = () => {
  return (
    <div className="flex min-h-screen">
      {/* Left side with full image */}
      <div className="w-1/2 relative h-screen">
        <img
          src="https://images.unsplash.com/photo-1604079628040-94301bb21b91?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGFic3RyYWN0fGVufDB8fDB8fHww"
          alt="Welcome"
          className="absolute inset-0 w-full h-full object-cover block"
          onError={(e) => {
            console.error("Image failed to load:", e);
            e.currentTarget.style.display = "none"; // hide broken img
          }}
        />
        <div className="absolute inset-0 bg-black bg-opacity-30 flex flex-col justify-center items-center text-white">
          <h2 className="text-4xl font-bold mb-4">Welcome Back!</h2>
          <p>Sign in to continue to your dashboard.</p>
        </div>
      </div>

      {/* Right side */}
      <div className="w-1/2 flex flex-col justify-center items-center p-8">
        <div className="w-full max-w-md">
          <h2 className="text-3xl font-bold mb-6">Login</h2>
          <button className="flex items-center justify-center border w-full py-2 mb-4">
            <FcGoogle className="mr-2" />
            Sign in with Google
          </button>
          <div className="flex items-center mb-4">
            <div className="flex-grow border-t" />
            <span className="px-2 text-gray-500">or login with email</span>
            <div className="flex-grow border-t" />
          </div>
          <form>
            <input
              type="email"
              placeholder="Email"
              className="w-full border mb-4 p-2"
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full border mb-4 p-2"
            />
            <div className="flex justify-between items-center mb-4">
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                Remember Me
              </label>
              <Link to="/forgot-password" className="text-purple-600">
                Forgot Password?
              </Link>
            </div>
            <button
              type="submit"
              className="w-full bg-purple-600 text-white py-2 mb-4"
            >
              Login
            </button>
          </form>
          <button className="w-full border border-purple-600 text-purple-600 py-2 mb-4">
            Admin Login
          </button>
          <p className="text-center">
            New User?{" "}
            <Link to="/signup" className="text-purple-600">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login_1;
