import React, { useState, useRef } from "react";


const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    profileImage: null,
    previewUrl: null,
  });


  const fileInputRef = useRef(null);


  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;


    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData((prev) => ({
        ...prev,
        profileImage: file,
        previewUrl: reader.result,
      }));
    };
    reader.readAsDataURL(file);
  };


  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };


  const handleSubmit = (e) => {
    e.preventDefault();


    // Send formData.profileImage to backend using FormData
    console.log(formData);
  };


  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 space-y-4 border rounded-md">
      <h2 className="text-xl font-bold">Signup</h2>


      {/* Profile Image Preview */}
      <div className="text-center">
        {formData.previewUrl ? (
          <img
            src={formData.previewUrl}
            alt="Preview"
            className="w-24 h-24 object-cover rounded-full mx-auto"
          />
        ) : (
          <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto flex items-center justify-center text-gray-500">
            No Image
          </div>
        )}
        <button
          type="button"
          onClick={() => fileInputRef.current.click()}
          className="text-sm mt-2 text-blue-600 underline"
        >
          Upload Photo
        </button>
        <input
          type="file"
          accept="image/*"
          capture="user"
          ref={fileInputRef}
          onChange={handleImageChange}
          className="hidden"
        />
      </div>


      <input
        type="text"
        name="name"
        placeholder="Name"
        value={formData.name}
        onChange={handleChange}
        className="w-full p-2 border rounded"
        required
      />


      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        className="w-full p-2 border rounded"
        required
      />


      <input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        className="w-full p-2 border rounded"
        required
      />


      <button
        type="submit"
        className="bg-blue-600 text-white py-2 px-4 rounded w-full"
      >
        Sign Up
      </button>
    </form>
  );
};


export default Signup;



