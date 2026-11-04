
"use client";

import { useState } from "react";

type Freelancer = {
  id: number;
  name: string;
  email: string;
  country: string;
  skills: string;
  rate: number;
  portfolio: string;
  status: "Active" | "Pending" | "Suspended";
};

export default function AdminFreelancersPage() {
  const [freelancers, setFreelancers] = useState<Freelancer[]>([
    { id: 1, name: "Alex Morgan", email: "alex@example.com", country: "United States", skills: "React, Node.js", rate: 35, portfolio: "https://alexmorgan.example", status: "Active" },
    { id: 2, name: "Priya Sharma", email: "priya@example.com", country: "India", skills: "UI/UX, Figma", rate: 20, portfolio: "https://priyasharma.example", status: "Pending" },
    { id: 3, name: "Daniel Smith", email: "daniel@example.com", country: "United Kingdom", skills: "Python, AI", rate: 45, portfolio: "https://danielsmith.example", status: "Active" },
    { id: 4, name: "Sara Ahmed", email: "sara@example.com", country: "UAE", skills: "Digital Marketing", rate: 25, portfolio: "https://saraahmed.example", status: "Suspended" },
    { id: 5, name: "Rahul Patil", email: "rahul@example.com", country: "India", skills: "Java, Cybersecurity", rate: 18, portfolio: "https://rahulpatil.example", status: "Active" },
  ]);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selected, setSelected] = useState<Freelancer | null>(null);
  const [page, setPage] = useState(1);
  const pageSize = 4;

  const filtered = freelancers.filter((f) => {
    const matchesSearch =
      f.name.toLowerCase().includes(search.toLowerCase()) ||
      f.email.toLowerCase().includes(search.toLowerCase()) ||
      f.country.toLowerCase().includes(search.toLowerCase()) ||
      f.skills.toLowerCase().includes(search.toLowerCase());

    const matchesStatus = statusFilter === "All" || f.status === statusFilter;
    return matchesSearch && matchesStatus;
  });
  const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize));
  const currentPage = Math.min(page, pageCount);
  const pageFreelancers = filtered.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  function updateStatus(id: number, status: Freelancer["status"]) {
    if (
      status === "Suspended" &&
      !window.confirm("Are you sure you want to suspend this freelancer?")
    ) {
      return;
    }
    setFreelancers((current) =>
      current.map((f) => f.id === id ? { ...f, status } : f)
    );
    setSelected(null);
  }

  function deleteFreelancer(id: number) {
    if (confirm("Are you sure you want to delete this freelancer?")) {
      setFreelancers((current) => current.filter((f) => f.id !== id));
      setSelected(null);
    }
  }

  const active = freelancers.filter((f) => f.status === "Active").length;
  const pending = freelancers.filter((f) => f.status === "Pending").length;
  const suspended = freelancers.filter((f) => f.status === "Suspended").length;

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8">
      <div className="mx-auto max-w-7xl space-y-6">

        <div>
          <p className="text-sm font-medium text-blue-600">Admin / User Management</p>
          <h1 className="mt-2 text-3xl font-bold text-slate-900">
            Freelancer Management
          </h1>
          <p className="mt-2 text-slate-500">
            Manage, review and monitor freelancers across the global platform.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard title="Total Freelancers" value={freelancers.length} />
          <StatCard title="Active Freelancers" value={active} color="text-green-600" />
          <StatCard title="Pending Verification" value={pending} color="text-amber-600" />
          <StatCard title="Suspended Freelancers" value={suspended} color="text-red-600" />
        </div>

        <div className="rounded-xl border bg-white p-5">
          <div className="flex flex-col gap-3 md:flex-row">
            <input
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              placeholder="Search name, email, country or skills..."
              className="w-full rounded-lg border px-4 py-3 outline-none focus:border-blue-500"
            />

            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setPage(1);
              }}
              className="rounded-lg border px-4 py-3 outline-none focus:border-blue-500"
            >
              <option value="All">All Statuses</option>
              <option value="Active">Active</option>
              <option value="Pending">Pending</option>
              <option value="Suspended">Suspended</option>
            </select>
          </div>

          <div className="mt-5 overflow-x-auto">
            <table className="w-full min-w-[850px] text-left text-sm">
              <thead className="bg-slate-50 text-slate-500">
                <tr>
                  <th className="p-4">Freelancer</th>
                  <th className="p-4">Country</th>
                  <th className="p-4">Skills</th>
                  <th className="p-4">Hourly Rate</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Actions</th>
                </tr>
              </thead>

              <tbody>
                {pageFreelancers.map((f) => (
                  <tr key={f.id} className="border-t hover:bg-slate-50">
                    <td className="p-4">
                      <p className="font-semibold text-slate-800">{f.name}</p>
                      <p className="text-xs text-slate-500">{f.email}</p>
                    </td>
                    <td className="p-4">{f.country}</td>
                    <td className="p-4">{f.skills}</td>
                    <td className="p-4">${f.rate}/hr</td>
                    <td className="p-4">
                      <span className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        f.status === "Active"
                          ? "bg-green-100 text-green-700"
                          : f.status === "Pending"
                          ? "bg-amber-100 text-amber-700"
                          : "bg-red-100 text-red-700"
                      }`}>
                        {f.status}
                      </span>
                    </td>
                    <td className="p-4">
                      <button
                        onClick={() => setSelected(f)}
                        className="rounded-lg border px-3 py-2 text-xs font-semibold text-blue-600 hover:bg-blue-50"
                      >
                        Manage
                      </button>
                    </td>
                  </tr>
                ))}

                {pageFreelancers.length === 0 && (
                  <tr>
                    <td colSpan={6} className="p-8 text-center text-slate-500">
                      No freelancers found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm text-slate-500">
              Showing {filtered.length === 0 ? 0 : (currentPage - 1) * pageSize + 1}–
              {Math.min(currentPage * pageSize, filtered.length)} of {filtered.length} freelancers
            </p>
            <div className="flex gap-2">
              <button
                type="button"
                disabled={currentPage === 1}
                onClick={() => setPage(currentPage - 1)}
                className="rounded-lg border px-3 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-40"
              >
                Previous
              </button>
              <span className="px-2 py-2 text-sm text-slate-500">
                Page {currentPage} of {pageCount}
              </span>
              <button
                type="button"
                disabled={currentPage === pageCount}
                onClick={() => setPage(currentPage + 1)}
                className="rounded-lg border px-3 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-40"
              >
                Next
              </button>
            </div>
          </div>
        </div>

        {selected && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
            <div role="dialog" aria-modal="true" aria-label="Freelancer Details" className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold">Freelancer Details</h2>
                <button
                  onClick={() => setSelected(null)}
                  className="text-xl text-slate-500"
                >
                  ✕
                </button>
              </div>

              <div className="mt-5 space-y-3 text-sm">
                <p><strong>Name:</strong> {selected.name}</p>
                <p><strong>Email:</strong> {selected.email}</p>
                <p><strong>Country:</strong> {selected.country}</p>
                <p><strong>Skills:</strong> {selected.skills}</p>
                <p><strong>Hourly Rate:</strong> ${selected.rate}/hr</p>
                <p>
                  <strong>Portfolio:</strong>{" "}
                  <a
                    href={selected.portfolio}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    {selected.portfolio}
                  </a>
                </p>
                <p><strong>Status:</strong> {selected.status}</p>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-2">
                <button
                  onClick={() => updateStatus(selected.id, "Active")}
                  className="rounded-lg bg-green-600 px-3 py-2 text-sm font-semibold text-white"
                >
                  Activate
                </button>
                <button
                  onClick={() => updateStatus(selected.id, "Pending")}
                  className="rounded-lg bg-amber-500 px-3 py-2 text-sm font-semibold text-white"
                >
                  Set Pending
                </button>
                <button
                  onClick={() => updateStatus(selected.id, "Suspended")}
                  className="rounded-lg bg-red-600 px-3 py-2 text-sm font-semibold text-white"
                >
                  Suspend
                </button>
                <button
                  onClick={() => deleteFreelancer(selected.id)}
                  className="rounded-lg border border-red-200 px-3 py-2 text-sm font-semibold text-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}

        <p className="text-xs text-slate-400">
          Demo data only. Changes are temporary and are not saved to a database.
        </p>
      </div>
    </div>
  );
}

function StatCard({
  title,
  value,
  color = "text-slate-900",
}: {
  title: string;
  value: number;
  color?: string;
}) {
  return (
    <div className="rounded-xl border bg-white p-5">
      <p className="text-sm text-slate-500">{title}</p>
      <h2 className={`mt-2 text-3xl font-bold ${color}`}>{value}</h2>
    </div>
  );
}
