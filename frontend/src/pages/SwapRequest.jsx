import React, { useEffect, useState } from "react";

const SwapRequest = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    // Replace with actual fetch from backend
    setRequests([
      {
        id: 1,
        name: "Anu Sree",
        offered: "Design",
        requested: "Frontend",
        status: "Pending",
        profilePhoto: "https://via.placeholder.com/40",
      },
      {
        id: 2,
        name: "Neha",
        offered: "Python",
        requested: "Illustration",
        status: "Rejected",
        profilePhoto: "https://via.placeholder.com/40",
      },
    ]);
  }, []);

  const handleAction = (id, action) => {
    // TODO: Update backend with accept/reject
    setRequests((prev) =>
      prev.map((r) =>
        r.id === id ? { ...r, status: action === "accept" ? "Accepted" : "Rejected" } : r
      )
    );
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Swap Requests</h1>
      <div className="space-y-4">
        {requests.map((req) => (
          <div key={req.id} className="flex items-center justify-between border p-4 rounded-md">
            <div className="flex items-center gap-4">
              <img
                src={req.profilePhoto}
                alt="Profile"
                className="w-10 h-10 rounded-full"
              />
              <div>
                <p className="font-medium">{req.name}</p>
                <p className="text-sm text-gray-600">
                  {req.offered} → {req.requested}
                </p>
              </div>
            </div>
            <div className="text-sm flex gap-2 items-center">
              <span
                className={`font-semibold ${
                  req.status === "Accepted"
                    ? "text-green-600"
                    : req.status === "Rejected"
                    ? "text-red-500"
                    : "text-yellow-500"
                }`}
              >
                {req.status}
              </span>
              {req.status === "Pending" && (
                <>
                  <button
                    onClick={() => handleAction(req.id, "accept")}
                    className="text-green-600 hover:underline"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => handleAction(req.id, "reject")}
                    className="text-red-500 hover:underline"
                  >
                    Reject
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SwapRequest;
