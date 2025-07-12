// src/pages/Home.jsx
import React, { useEffect, useState } from "react";
import ProfileCard from "../components/ProfileCard";
import { Pagination } from "../components/ui/Pagination";
import { useNavigate } from "react-router-dom";
const DUMMY_PROFILES = [
  {
    id: 1,
    name: "Marc Demo",
    avatarUrl: "/avatars/marc.jpg",
    skillsOffered: ["JavaScript", "Python"],
    skillsWanted: ["UI/UX", "Graphic Design"],
    rating: 3.8,
    availability: "Online",
  },
  {
    id: 2,
    name: "Mitchell",
    avatarUrl: "/avatars/mitchell.jpg",
    skillsOffered: ["JavaScript", "Ruby"],
    skillsWanted: ["UI/UX", "Graphic Design"],
    rating: 2.5,
    availability: "Offline",
  },
  {
    id: 3,
    name: "Joe Wills",
    avatarUrl: "/avatars/joe.jpg",
    skillsOffered: ["JavaScript", "Python"],
    skillsWanted: ["UI/UX", "Graphic Design"],
    rating: 4.6,
    availability: "Online",
  },
  {
    id: 1,
    name: "Marc Demo",
    avatarUrl: "/avatars/marc.jpg",
    skillsOffered: ["JavaScript", "Python"],
    skillsWanted: ["UI/UX", "Graphic Design"],
    rating: 3.8,
    availability: "Online",
  },
  {
    id: 2,
    name: "Mitchell",
    avatarUrl: "/avatars/mitchell.jpg",
    skillsOffered: ["JavaScript", "Ruby"],
    skillsWanted: ["UI/UX", "Graphic Design"],
    rating: 2.5,
    availability: "Offline",
  },
  {
    id: 3,
    name: "Joe Wills",
    avatarUrl: "/avatars/joe.jpg",
    skillsOffered: ["JavaScript", "Python"],
    skillsWanted: ["UI/UX", "Graphic Design"],
    rating: 4.6,
    availability: "Online",
  },
  // …more dummy items
];

export default function Home() {
  const [profiles, setProfiles] = useState([]);
  const navigate = useNavigate();
  const [availFilter, setAvailFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 3;

  // mimic API
  useEffect(() => {
    let data = [...DUMMY_PROFILES];
    if (availFilter !== "All") {
      data = data.filter((p) => p.availability === availFilter);
    }
    if (search.trim()) {
     data = data.filter((p) =>
      p.skillsOffered.some((want) =>
        want.toLowerCase().includes(search.toLowerCase())
       )
     );
   }

    
    setProfiles(data);
  }, [availFilter, search]);

  const totalPages = Math.ceil(profiles.length / perPage);
  const paged = profiles.slice(
    (currentPage - 1) * perPage,
    currentPage * perPage
  );

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold text-center">Skill Swap Platform</h1>

      {/* Filters bar */}
      <div className="flex items-center justify-between space-x-4">
        <select
          value={availFilter}
          onChange={(e) => { setAvailFilter(e.target.value); setCurrentPage(1); }}
          className="border rounded px-3 py-1"
        >
          {["All", "Online", "Offline"].map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>

        <input
          type="text"
          pplaceholder="Search by wanted skill…"
          value={search}
          onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
          className="flex-1 border rounded px-3 py-1"
        />
      </div>

      {/* Profile cards */}
      <div className="space-y-4">
         {paged.map((profile) => (
         <ProfileCard
            key={profile.id}
            profile={profile}
            onRequest={() => alert(`Request sent to ${profile.name}`)}
            onClick={() => navigate(`/profile/${profile.id}`)}
          />
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center">
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
}
