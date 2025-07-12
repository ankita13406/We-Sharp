import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSignup = (e) => {
    e.preventDefault();
    // TODO: Replace with API call
    console.log("Signup:", form);
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
        <h2 className="text-xl font-semibold mb-2">Create an Account</h2>
        <p className="text-sm text-gray-500 mb-4">
          Join us today by entering your details below.
        </p>
        <form onSubmit={handleSignup} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            className="w-full border px-4 py-2 rounded-md text-sm"
            value={form.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="john@example.com"
            className="w-full border px-4 py-2 rounded-md text-sm"
            value={form.email}
            onChange={handleChange}
            required
          />
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Min 8 Characters"
              className="w-full border px-4 py-2 rounded-md text-sm"
              value={form.password}
              onChange={handleChange}
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
            SIGN UP
          </button>
        </form>
        <p className="text-sm text-center mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-orange-600 font-medium">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
