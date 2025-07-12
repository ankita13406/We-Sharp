// src/pages/ProfileDetail.jsx
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import SwapRequestModal from "../components/SwapRequestModal"; // adjust path if needed

export default function ProfileDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showRequestModal, setShowRequestModal] = useState(false);

  useEffect(() => {
    async function fetchProfile() {
      try {
        const res = await fetch(`http://localhost:5000/api/profiles/${id}`);
        const data = await res.json();
        setProfile(data);
      } catch (e) {
        console.error("Error fetching profile:", e);
      } finally {
        setLoading(false);
      }
    }
    fetchProfile();
  }, [id]);

  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  }
  if (!profile) {
    return <div className="text-center py-8">Profile not found</div>;
  }

  // Helpers for star ratings
  const fullStars = Math.floor(profile.rating);
  const halfStar = profile.rating - fullStars >= 0.5;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <button
        onClick={() => navigate(-1)}
        className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
      >
        ← Back
      </button>

      <div className="border rounded-lg p-6 shadow-sm">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
          {/* Avatar */}
          <div className="flex-shrink-0">
            <div className="w-32 h-32 rounded-full bg-gray-200 overflow-hidden flex items-center justify-center">
              {profile.avatar ? (
                <img
                  src={profile.avatar}
                  alt={profile.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-5xl font-bold text-gray-500">
                  {profile.name.charAt(0)}
                </span>
              )}
            </div>
          </div>

          {/* Info */}
          <div className="flex-grow space-y-4">
            <div>
              <h1 className="text-2xl font-bold">{profile.name}</h1>
              <p className="text-sm text-gray-600">{profile.availability}</p>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-2">
              <div className="flex">
                {[...Array(fullStars)].map((_, i) => (
                  <span key={`full-${i}`} className="text-yellow-400 text-xl">
                    ★
                  </span>
                ))}
                {halfStar && (
                  <span className="text-yellow-400 text-xl">☆</span>
                )}
                {[...Array(emptyStars)].map((_, i) => (
                  <span key={`empty-${i}`} className="text-gray-300 text-xl">
                    ★
                  </span>
                ))}
              </div>
              <span className="text-gray-600">
                {profile.rating.toFixed(1)} / 5
              </span>
            </div>

            {/* Skills Offered */}
            <div>
              <h2 className="font-semibold">Skills Offered</h2>
              <div className="flex flex-wrap gap-2 mt-2">
                {profile.skills_offered.map((skill) => (
                  <span
                    key={skill}
                    className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Skills Wanted */}
            <div>
              <h2 className="font-semibold">Skills Wanted</h2>
              <div className="flex flex-wrap gap-2 mt-2">
                {profile.skills_wanted.map((skill) => (
                  <span
                    key={skill}
                    className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Request Button */}
            <button
              onClick={() => setShowRequestModal(true)}
              className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Request Swap
            </button>
          </div>
        </div>
      </div>

      {/* Swap Request Modal */}
      {showRequestModal && (
        <SwapRequestModal
          profile={profile}
          onClose={() => setShowRequestModal(false)}
        />
      )}
    </div>
  );
}
