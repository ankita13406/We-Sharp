import React, { useEffect, useState } from "react";
import ProfileCard from "../components/ProfileCard";
import { Pagination } from "../components/ui/Pagination";

const Home = () => {
  const [profiles, setProfiles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetch(`http://localhost:5000/api/profiles?page=${currentPage}`)
      .then(res => res.json())
      .then(data => {
        setProfiles(data.profiles);
        setTotalPages(data.totalPages);
      });
  }, [currentPage]);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Skill Swap Platform</h1>
      <div className="space-y-4">
        {profiles.map(profile => (
          <ProfileCard
            key={profile.id}
            profile={profile}
            onRequest={() => alert(`Request sent to ${profile.name}`)}
          />
        ))}
      </div>
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default Home;
