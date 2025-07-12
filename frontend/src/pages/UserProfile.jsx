import React, { useRef, useState } from "react";

const UserProfile = () => {
  const [profile, setProfile] = useState({
    name: "Mike William",
    location: "Bangalore",
    skillsOffered: ["Python", "Design"],
    skillsWanted: ["React", "Frontend"],
    availability: "weekends",
    visibility: "Public",
    profilePhoto: "https://via.placeholder.com/80",
  });

  const fileInputRef = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setProfile((prev) => ({ ...prev, profilePhoto: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const openFilePicker = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-bold">User Profile</h1>
        <div className="relative group">
          <img
            src={profile.profilePhoto}
            alt="Profile"
            className="w-20 h-20 rounded-full object-cover border border-gray-300"
          />
          <button
            onClick={openFilePicker}
            className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white opacity-0 group-hover:opacity-100 rounded-full transition-opacity"
          >
            📷
          </button>
        </div>
      </div>

      <input
        type="file"
        accept="image/*"
        capture="user"
        onChange={handleImageChange}
        ref={fileInputRef}
        className="hidden"
      />

      <div className="space-y-3">
        <p><strong>Name:</strong> {profile.name}</p>
        <p><strong>Location:</strong> {profile.location}</p>
        <p>
          <strong>Skills Offered:</strong>{" "}
          {profile.skillsOffered.map((s, i) => (
            <span key={i} className="inline-block bg-gray-200 px-2 py-1 m-1 rounded-md">
              {s}
            </span>
          ))}
        </p>
        <p>
          <strong>Skills Wanted:</strong>{" "}
          {profile.skillsWanted.map((s, i) => (
            <span key={i} className="inline-block bg-gray-200 px-2 py-1 m-1 rounded-md">
              {s}
            </span>
          ))}
        </p>
        <p><strong>Availability:</strong> {profile.availability}</p>
        <p><strong>Profile:</strong> <span className="text-blue-600 font-medium">{profile.visibility}</span></p>
      </div>
    </div>
  );
};

export default UserProfile;
