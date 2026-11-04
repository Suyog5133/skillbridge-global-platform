
"use client";

import { useState } from "react";

type ExperienceLevel = {
  id: number;
  name: string;
  range: string;
  description: string;
  status: "Active" | "Inactive";
};

export default function ExperienceLevelsPage() {
  const [levels, setLevels] = useState<ExperienceLevel[]>([
    { id: 1, name: "Fresher", range: "0 years", description: "No professional experience required", status: "Active" },
    { id: 2, name: "Entry Level", range: "0–2 years", description: "Starting professional career", status: "Active" },
    { id: 3, name: "Junior", range: "1–3 years", description: "Early career professionals", status: "Active" },
    { id: 4, name: "Mid Level", range: "3–5 years", description: "Experienced professionals", status: "Active" },
    { id: 5, name: "Senior", range: "5–8 years", description: "Senior-level professionals", status: "Active" },
    { id: 6, name: "Lead", range: "8–12 years", description: "Team leads and specialists", status: "Active" },
    { id: 7, name: "Executive", range: "12+ years", description: "Executive and leadership roles", status: "Active" },
  ]);

  const [name, setName] = useState("");
  const [range, setRange] = useState("");
  const [description, setDescription] = useState("");
  const [search, setSearch] = useState("");

  const filtered = levels.filter((level) =>
    level.name.toLowerCase().includes(search.toLowerCase())
  );

  const activeCount = levels.filter((level) => level.status === "Active").length;

  function addLevel() {
    if (!name.trim() || !range.trim()) {
      alert("Please enter the experience level and experience range.");
      return;
    }

    setLevels([
      ...levels,
      {
        id: Date.now(),
        name: name.trim(),
        range: range.trim(),
        description: description.trim() || "No description added",
        status: "Active",
      },
    ]);

    setName("");
    setRange("");
    setDescription("");
  }

  function toggleStatus(id: number) {
    setLevels(levels.map((level) =>
      level.id === id
        ? { ...level, status: level.status === "Active" ? "Inactive" : "Active" }
        : level
    ));
  }

  function deleteLevel(id: number) {
    if (confirm("Delete this experience level?")) {
      setLevels(levels.filter((level) => level.id !== id));
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8">
      <div className="mx-auto max-w-7xl space-y-6">
        <div>
          <p className="text-sm font-medium text-blue-600">Admin / Job Settings</p>
          <h1 className="mt-2 text-3xl font-bold text-slate-900">
            Experience Levels Management
          </h1>
          <p className="mt-2 text-slate-500">
            Manage experience levels for jobs, internships and candidate profiles.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-xl border bg-white p-5">
            <p className="text-sm text-slate-500">Total Levels</p>
            <h2 className="mt-2 text-3xl font-bold">{levels.length}</h2>
          </div>
          <div className="rounded-xl border bg-white p-5">
            <p className="text-sm text-slate-500">Active Levels</p>
            <h2 className="mt-2 text-3xl font-bold text-green-600">{activeCount}</h2>
          </div>
          <div className="rounded-xl border bg-white p-5">
            <p className="text-sm text-slate-500">Inactive Levels</p>
            <h2 className="mt-2 text-3xl font-bold text-red-500">
              {levels.length - activeCount}
            </h2>
          </div>
        </div>

        <div className="rounded-xl border bg-white p-6">
          <h2 className="text-lg font-bold">Add Experience Level</h2>
          <div className="mt-4 grid gap-3 md:grid-cols-3">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Level name (e.g. Associate)"
              className="rounded-lg border px-4 py-3 outline-none focus:border-blue-500"
            />
            <input
              value={range}
              onChange={(e) => setRange(e.target.value)}
              placeholder="Experience range (e.g. 2–4 years)"
              className="rounded-lg border px-4 py-3 outline-none focus:border-blue-500"
            />
            <input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description"
              className="rounded-lg border px-4 py-3 outline-none focus:border-blue-500"
            />
          </div>
          <button
            onClick={addLevel}
            className="mt-4 rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700"
          >
            + Add Experience Level
          </button>
        </div>

        <div className="rounded-xl border bg-white p-6">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
            <div>
              <h2 className="text-lg font-bold">Experience Level List</h2>
              <p className="text-sm text-slate-500">Manage platform experience categories.</p>
            </div>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search levels..."
              className="rounded-lg border px-4 py-2 outline-none focus:border-blue-500"
            />
          </div>

          <div className="mt-5 overflow-x-auto">
            <table className="w-full min-w-[700px] text-left text-sm">
              <thead className="bg-slate-50 text-slate-500">
                <tr>
                  <th className="p-3">Level</th>
                  <th className="p-3">Experience Range</th>
                  <th className="p-3">Description</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((level) => (
                  <tr key={level.id} className="border-t">
                    <td className="p-3 font-semibold">{level.name}</td>
                    <td className="p-3">{level.range}</td>
                    <td className="p-3 text-slate-500">{level.description}</td>
                    <td className="p-3">
                      <span className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        level.status === "Active"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}>
                        {level.status}
                      </span>
                    </td>
                    <td className="p-3">
                      <div className="flex gap-2">
                        <button
                          onClick={() => toggleStatus(level.id)}
                          className="rounded-lg border px-3 py-1.5 text-xs hover:bg-slate-50"
                        >
                          {level.status === "Active" ? "Disable" : "Enable"}
                        </button>
                        <button
                          onClick={() => deleteLevel(level.id)}
                          className="rounded-lg border border-red-200 px-3 py-1.5 text-xs text-red-600 hover:bg-red-50"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={5} className="p-8 text-center text-slate-500">
                      No experience levels found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <p className="text-xs text-slate-400">
          Demo version: changes are temporary and are not saved to a database.
        </p>
      </div>
    </div>
  );
}
