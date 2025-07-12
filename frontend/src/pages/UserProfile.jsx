import React, { useRef, useState} from "react";
import { useNavigate } from "react-router-dom";


const initialProfile = {
  name: "",
  location: "",
  skillsOffered: [],
  skillsWanted: [],
  availability: "",
  visibility: "Public",
  profilePhoto: "https://via.placeholder.com/80",
};


const UserProfile = ({ updateAvatar }) => {
  const [profile, setProfile] = useState(() => {
    const saved = localStorage.getItem("profileData");
    return saved ? JSON.parse(saved) : initialProfile;
  });
  const [tempProfile, setTempProfile] = useState(profile);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();


  const handleChange = (field, value) => {
    setTempProfile({ ...tempProfile, [field]: value });
  };


  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;


    const reader = new FileReader();
    reader.onloadend = () => {
      setTempProfile((prev) => ({ ...prev, profilePhoto: reader.result }));
    };
    reader.readAsDataURL(file);
  };


  const openFilePicker = () => {
    fileInputRef.current.click();
  };


  const removeSkill = (type, index) => {
    const updatedSkills = [...tempProfile[type]];
    updatedSkills.splice(index, 1);
    setTempProfile({ ...tempProfile, [type]: updatedSkills });
  };


  const addSkill = (e, type) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const value = e.target.value.trim();
      if (value && !tempProfile[type].includes(value)) {
        setTempProfile({
          ...tempProfile,
          [type]: [...tempProfile[type], value],
        });
      }
      e.target.value = "";
    }
  };


  const handleSave = () => {
    setProfile(tempProfile);
    localStorage.setItem("profileData", JSON.stringify(tempProfile));
    updateAvatar(tempProfile.profilePhoto);
    navigate("/");
  };


  const handleDiscard = () => {
    setTempProfile(profile);
  };


  return (
    <div className="p-6 max-w-4xl mx-auto border rounded-xl shadow-sm bg-white">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div className="space-x-4">
          <button onClick={handleSave} className="text-green-600 font-semibold hover:underline">
            Save
          </button>
          <button onClick={handleDiscard} className="text-red-600 font-semibold hover:underline">
            Discard
          </button>
        </div>
       
      </div>


      {/* Profile Section */}
      <div className="flex flex-col md:flex-row justify-between">
        {/* Left Side */}
        <div className="space-y-4 w-full md:w-2/3">
          <div>
            <label className="font-semibold">Name</label>
            <input
              type="text"
              value={tempProfile.name}
              onChange={(e) => handleChange("name", e.target.value)}
              className="block w-full border rounded px-3 py-2 mt-1"
              placeholder="e.g. Mike William"
            />
          </div>
          <div>
            <label className="font-semibold">Location</label>
            <input
              type="text"
              value={tempProfile.location}
              onChange={(e) => handleChange("location", e.target.value)}
              className="block w-full border rounded px-3 py-2 mt-1"
              placeholder="e.g. Bangalore"
            />
          </div>


          <div>
            <label className="font-semibold">Skills Offered</label>
            <div className="flex flex-wrap mt-2">
              {tempProfile.skillsOffered.map((skill, idx) => (
                <span key={idx} className="bg-gray-200 px-3 py-1 m-1 rounded-full flex items-center">
                  {skill}
                  <button onClick={() => removeSkill("skillsOffered", idx)} className="ml-2 text-red-600">✖</button>
                </span>
              ))}
              <input
                type="text"
                onKeyDown={(e) => addSkill(e, "skillsOffered")}
                placeholder="Add +"
                className="m-1 px-2 py-1 border rounded"
              />
            </div>
          </div>


          <div>
            <label className="font-semibold">Skills Wanted</label>
            <div className="flex flex-wrap mt-2">
              {tempProfile.skillsWanted.map((skill, idx) => (
                <span key={idx} className="bg-gray-200 px-3 py-1 m-1 rounded-full flex items-center">
                  {skill}
                  <button onClick={() => removeSkill("skillsWanted", idx)} className="ml-2 text-red-600">✖</button>
                </span>
              ))}
              <input
                type="text"
                onKeyDown={(e) => addSkill(e, "skillsWanted")}
                placeholder="Add +"
                className="m-1 px-2 py-1 border rounded"
              />
            </div>
          </div>


          <div>
            <label className="font-semibold">Availability</label>
            <input
              type="text"
              value={tempProfile.availability}
              onChange={(e) => handleChange("availability", e.target.value)}
              className="block w-full border rounded px-3 py-2 mt-1"
              placeholder="e.g. weekends"
            />
          </div>


          <div>
            <label className="font-semibold">Profile Visibility</label>
            <select
              value={tempProfile.visibility}
              onChange={(e) => handleChange("visibility", e.target.value)}
              className="block w-full border rounded px-3 py-2 mt-1"
            >
              <option>Public</option>
              <option>Private</option>
            </select>
          </div>
        </div>


        {/* Right Side: Profile Picture */}
        <div className="mt-6 md:mt-0 flex flex-col items-center">
          <div className="relative group w-32 h-32 mb-2">
            <img
              src={tempProfile.profilePhoto}
              alt="Profile"
              className="w-full h-full rounded-full object-cover border"
            />
            <button
              onClick={openFilePicker}
              className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white text-sm opacity-0 group-hover:opacity-100 rounded-full"
            >
              Add/Edit
            </button>
          </div>
          <button
            onClick={() => handleChange("profilePhoto", "https://via.placeholder.com/80")}
            className="text-red-600 text-sm hover:underline"
          >
            Remove
          </button>
          <input
            type="file"
            accept="image/*"
            capture="user"
            onChange={handleImageChange}
            ref={fileInputRef}
            className="hidden"
          />
        </div>
      </div>
    </div>
  );
};


export default UserProfile;



