
"use client";

import { useState } from "react";

type JobType = {
  id: number;
  name: string;
  description: string;
  status: "Active" | "Inactive";
};

export default function AdminJobTypesPage() {
  const [types, setTypes] = useState<JobType[]>([
    { id: 1, name: "Full-time", description: "Permanent full-time employment", status: "Active" },
    { id: 2, name: "Part-time", description: "Flexible working hours", status: "Active" },
    { id: 3, name: "Contract", description: "Fixed-term contract work", status: "Active" },
    { id: 4, name: "Internship", description: "Student and graduate internships", status: "Active" },
    { id: 5, name: "Freelance", description: "Independent project-based work", status: "Active" },
    { id: 6, name: "Temporary", description: "Short-term employment", status: "Active" },
    { id: 7, name: "Remote", description: "Work from any location", status: "Active" },
    { id: 8, name: "Hybrid", description: "Office and remote combination", status: "Active" },
    { id: 9, name: "On-site", description: "Work from company office", status: "Active" },
  ]);

  const [search, setSearch] = useState("");
  const [newName, setNewName] = useState("");
  const [newDescription, setNewDescription] = useState("");

  const filtered = types.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  function addType() {
    if (!newName.trim()) return;

    setTypes([
      ...types,
      {
        id: Date.now(),
        name: newName.trim(),
        description: newDescription.trim() || "No description added",
        status: "Active",
      },
    ]);

    setNewName("");
    setNewDescription("");
  }

  function toggleStatus(id: number) {
    setTypes(types.map((item) =>
      item.id === id
        ? { ...item, status: item.status === "Active" ? "Inactive" : "Active" }
        : item
    ));
  }

  function deleteType(id: number) {
    if (confirm("Are you sure you want to delete this job type?")) {
      setTypes(types.filter((item) => item.id !== id));
    }
  }

  const activeCount = types.filter((item) => item.status === "Active").length;

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8">
      <div className="mx-auto max-w-7xl space-y-6">
        <div>
          <p className="text-sm font-medium text-blue-600">Admin / Job Settings</p>
          <h1 className="mt-2 text-3xl font-bold text-slate-900">
            Job Types & Employment Settings
          </h1>
          <p className="mt-2 text-slate-500">
            Manage employment types and work arrangements available on SkillBridge Global.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-xl border bg-white p-5">
            <p className="text-sm text-slate-500">Total Job Types</p>
            <h2 className="mt-2 text-3xl font-bold text-slate-900">{types.length}</h2>
          </div>
          <div className="rounded-xl border bg-white p-5">
            <p className="text-sm text-slate-500">Active Types</p>
            <h2 className="mt-2 text-3xl font-bold text-green-600">{activeCount}</h2>
          </div>
          <div className="rounded-xl border bg-white p-5">
            <p className="text-sm text-slate-500">Inactive Types</p>
            <h2 className="mt-2 text-3xl font-bold text-red-500">
              {types.length - activeCount}
            </h2>
          </div>
        </div>

        <div className="rounded-xl border bg-white p-6">
          <h2 className="text-lg font-bold text-slate-900">Add New Job Type</h2>
          <div className="mt-4 grid gap-3 md:grid-cols-3">
            <input
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder="Job type name"
              className="rounded-lg border px-4 py-3 outline-none focus:border-blue-500"
            />
            <input
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              placeholder="Description"
              className="rounded-lg border px-4 py-3 outline-none focus:border-blue-500"
            />
            <button
              onClick={addType}
              className="rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700"
            >
              + Add Job Type
            </button>
          </div>
        </div>

        <div className="rounded-xl border bg-white p-6">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
            <div>
              <h2 className="text-lg font-bold text-slate-900">Employment Types</h2>
              <p className="text-sm text-slate-500">Manage available job arrangements.</p>
            </div>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search job types..."
              className="rounded-lg border px-4 py-2 outline-none focus:border-blue-500"
            />
          </div>

          <div className="mt-5 overflow-x-auto">
            <table className="w-full min-w-[650px] text-left text-sm">
              <thead className="bg-slate-50 text-slate-500">
                <tr>
                  <th className="p-3">Job Type</th>
                  <th className="p-3">Description</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((item) => (
                  <tr key={item.id} className="border-t">
                    <td className="p-3 font-semibold text-slate-800">{item.name}</td>
                    <td className="p-3 text-slate-500">{item.description}</td>
                    <td className="p-3">
                      <span className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        item.status === "Active"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="p-3">
                      <div className="flex gap-2">
                        <button
                          onClick={() => toggleStatus(item.id)}
                          className="rounded-lg border px-3 py-1.5 text-xs font-medium hover:bg-slate-50"
                        >
                          {item.status === "Active" ? "Disable" : "Enable"}
                        </button>
                        <button
                          onClick={() => deleteType(item.id)}
                          className="rounded-lg border border-red-200 px-3 py-1.5 text-xs font-medium text-red-600 hover:bg-red-50"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={4} className="p-8 text-center text-slate-500">
                      No job types found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <p className="text-xs text-slate-400">
          Demo version: changes are temporary and stored only in the current page state.
        </p>
      </div>
    </div>
  );
}
