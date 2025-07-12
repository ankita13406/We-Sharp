import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-white shadow px-6 py-4 flex justify-between items-center">
      <Link to="/" className="text-xl font-semibold text-blue-600">Skill Swap</Link>
      <div className="flex gap-4 text-sm">
        <Link to="/profile" className="hover:text-blue-500">Profile</Link>
        <Link to="/swap-requests" className="hover:text-blue-500">Swap Requests</Link>
        <Link to="/login" className="hover:text-blue-500">Login</Link>
        <Link to="/signup" className="hover:text-blue-500">Signup</Link>
      </div>
    </nav>
  );
};

export default Navbar;
