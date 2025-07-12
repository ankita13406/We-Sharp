import React from "react";

const ProfileCard = ({ profile, onRequest, onClick }) => {
  const { name, skillsOffered, skillsWanted, availability, profilePhoto } = profile;

  return (
    <div
      onClick={onClick}      className="flex items-center justify-between p-4 border rounded-lg shadow-sm hover:shadow-md transition cursor-pointer"    >
      <div className="flex gap-4 items-center">
        <img
          src={profilePhoto || "/default-avatar.png"}
          alt="Profile"
          className="w-12 h-12 rounded-full object-cover"
        />
        <div>
          <h2 className="font-semibold">{name}</h2>
          <p className="text-sm">Availability: {availability}</p>
          <div className="text-xs mt-1">
            <span className="font-medium">Offers: </span>
            {skillsOffered.join(", ")} <br />
            <span className="font-medium">Wants: </span>
            {skillsWanted.join(", ")}
          </div>
        </div>
      </div>
      <button
        onClick={onRequest}
        className="px-4 py-1 bg-blue-500 text-white text-sm rounded-md hover:bg-blue-600"
      >
        Request
      </button>
    </div>
  );
};

export default ProfileCard;
