import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // TODO: Replace with API call
    console.log("Login:", { email, password });
    navigate("/");
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center px-4 z-50">
      <div className="bg-white w-full max-w-md rounded-xl p-6 shadow-lg relative">
        <button
          onClick={() => navigate("/")}
          className="absolute right-4 top-4 text-xl text-gray-500"
        >
          &times;
        </button>
        <h2 className="text-xl font-semibold mb-2">Welcome Back</h2>
        <p className="text-sm text-gray-500 mb-4">
          Please enter your details to log in
        </p>
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="john@example.com"
            className="w-full border px-4 py-2 rounded-md text-sm"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Min 8 Characters"
              className="w-full border px-4 py-2 rounded-md text-sm"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-2.5 cursor-pointer text-gray-500 text-sm"
            >
              {showPassword ? "Hide" : "Show"}
            </span>
          </div>
          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded-md text-sm"
          >
            LOGIN
          </button>
        </form>
        <p className="text-sm text-center mt-4">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-orange-600 font-medium">
            SignUp
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
