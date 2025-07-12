// src/pages/SwapRequests.jsx
import React, { useEffect, useState } from "react";
import RequestCard from "../components/RequestCard";
import { Pagination } from "../components/ui/Pagination";

// dummy data
const DUMMY_REQUESTS = [
  {
    id: 1,
    name: "Marc Demo",
    avatarUrl: "/avatars/marc.jpg",
    skillsOffered: ["JavaScript", "Python"],
    skillsWanted: ["Photoshop"],
    rating: 3.9,
    status: "Pending",
  },
  {
    id: 2,
    name: "Alice Smith",
    avatarUrl: "/avatars/alice.jpg",
    skillsOffered: ["HTML", "CSS"],
    skillsWanted: ["React"],
    rating: 4.2,
    status: "Rejected",
  },
  {
    id: 3,
    name: "Bob Lee",
    avatarUrl: "/avatars/bob.jpg",
    skillsOffered: ["UI/UX"],
    skillsWanted: ["JavaScript"],
    rating: 4.8,
    status: "Accepted",
  },
  // …more
];

export default function SwapRequests() {
  const [requests, setRequests] = useState([]);
  const [filter, setFilter] = useState("Pending");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const perPage = 3;

  useEffect(() => {
    let data = DUMMY_REQUESTS.filter((r) => r.status === filter);
    if (search.trim()) {
      data = data.filter((r) =>
        r.name.toLowerCase().includes(search.toLowerCase())
      );
    }
    setRequests(data);
  }, [filter, search]);

  const totalPages = Math.ceil(requests.length / perPage);
  const visible = requests.slice((page - 1) * perPage, page * perPage);

  const handleAction = (id, newStatus) => {
    setRequests((rs) =>
      rs.map((r) => (r.id === id ? { ...r, status: newStatus } : r))
    );
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* top bar */}
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Skill Swap Platform</h1>
        <div className="flex items-center space-x-4">
          <a href="/" className="hover:underline">Home</a>
          <img
            src="/avatars/you.jpg"
            alt="You"
            className="w-10 h-10 rounded-full"
          />
        </div>
      </header>

      {/* filters */}
      <div className="flex items-center space-x-4">
        <select
          value={filter}
          onChange={(e) => { setFilter(e.target.value); setPage(1); }}
          className="border rounded px-3 py-1"
        >
          {["Pending", "Accepted", "Rejected"].map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Search by name…"
          value={search}
          onChange={(e) => { setSearch(e.target.value); setPage(1); }}
          className="flex-1 border rounded px-3 py-1"
        />
      </div>

      {/* request list */}
      <div className="space-y-4">
        {visible.map((req) => (
          <RequestCard
            key={req.id}
            request={req}
            onAction={handleAction}
          />
        ))}
      </div>

      {/* pagination */}
      <div className="flex justify-center">
        <Pagination
          totalPages={totalPages}
          currentPage={page}
          onPageChange={setPage}
        />
      </div>
    </div>
  );
}
