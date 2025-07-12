import React, { useState } from "react";

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

  return (
    <div className="p-6 max-w-xl mx-auto">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-bold">User Profile</h1>
        <img
          src={profile.profilePhoto}
          alt="Profile"
          className="w-20 h-20 rounded-full object-cover"
        />
      </div>

      <div className="space-y-3">
        <p>
          <strong>Name:</strong> {profile.name}
        </p>
        <p>
          <strong>Location:</strong> {profile.location}
        </p>
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
        <p>
          <strong>Availability:</strong> {profile.availability}
        </p>
        <p>
          <strong>Profile:</strong>{" "}
          <span className="text-blue-600 font-medium">{profile.visibility}</span>
        </p>
      </div>
    </div>
  );
};

export default UserProfile;
