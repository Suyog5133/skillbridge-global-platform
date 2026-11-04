"use client";

import { useState, type FormEvent } from "react";

type ApplicationStatus = {
  id: number;
  name: string;
  description: string;
  color: string;
  status: "Active" | "Inactive";
};

const statusColorOptions = [
  { name: "Blue", value: "blue", badge: "bg-blue-100 text-blue-700" },
  { name: "Yellow", value: "yellow", badge: "bg-yellow-100 text-yellow-800" },
  { name: "Purple", value: "purple", badge: "bg-purple-100 text-purple-700" },
  { name: "Indigo", value: "indigo", badge: "bg-indigo-100 text-indigo-700" },
  { name: "Teal", value: "teal", badge: "bg-teal-100 text-teal-700" },
  { name: "Green", value: "green", badge: "bg-green-100 text-green-700" },
  { name: "Red", value: "red", badge: "bg-red-100 text-red-700" },
  { name: "Orange", value: "orange", badge: "bg-orange-100 text-orange-700" },
  { name: "Slate", value: "slate", badge: "bg-slate-100 text-slate-700" },
];

const initialStatuses: ApplicationStatus[] = [
  { id: 1, name: "Applied", description: "Application has been submitted", color: "blue", status: "Active" },
  { id: 2, name: "Under Review", description: "Application is being reviewed", color: "yellow", status: "Active" },
  { id: 3, name: "Shortlisted", description: "Candidate has been shortlisted", color: "purple", status: "Active" },
  { id: 4, name: "Interview Scheduled", description: "An interview has been arranged", color: "indigo", status: "Active" },
  { id: 5, name: "Interview Completed", description: "Candidate has completed an interview", color: "teal", status: "Active" },
  { id: 6, name: "Selected", description: "Candidate has been selected for the role", color: "green", status: "Active" },
  { id: 7, name: "Rejected", description: "Application was not selected to proceed", color: "red", status: "Active" },
  { id: 8, name: "Offer Sent", description: "An employment offer has been sent", color: "orange", status: "Active" },
  { id: 9, name: "Offer Accepted", description: "Candidate has accepted the offer", color: "green", status: "Active" },
  { id: 10, name: "Offer Declined", description: "Candidate has declined the offer", color: "red", status: "Active" },
  { id: 11, name: "Withdrawn", description: "Candidate has withdrawn the application", color: "slate", status: "Active" },
];

function getColorBadge(color: string) {
  return statusColorOptions.find((option) => option.value === color)?.badge ??
    "bg-slate-100 text-slate-700";
}

export default function AdminApplicationStatusPage() {
  const [statuses, setStatuses] = useState<ApplicationStatus[]>(initialStatuses);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [color, setColor] = useState("");
  const [search, setSearch] = useState("");

  const searchTerm = search.trim().toLowerCase();
  const filteredStatuses = statuses.filter((item) =>
    [item.name, item.description, item.color].some((value) =>
      value.toLowerCase().includes(searchTerm)
    )
  );
  const activeCount = statuses.filter(
    (item) => item.status === "Active"
  ).length;

  function addStatus(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!name.trim() || !color) return;

    setStatuses((currentStatuses) => [
      ...currentStatuses,
      {
        id: Date.now(),
        name: name.trim(),
        description: description.trim() || "No description added",
        color,
        status: "Active",
      },
    ]);
    setName("");
    setDescription("");
    setColor("");
  }

  function toggleStatus(id: number) {
    setStatuses((currentStatuses) =>
      currentStatuses.map((item) =>
        item.id === id
          ? { ...item, status: item.status === "Active" ? "Inactive" : "Active" }
          : item
      )
    );
  }

  function deleteStatus(item: ApplicationStatus) {
    if (window.confirm(`Are you sure you want to delete "${item.name}"?`)) {
      setStatuses((currentStatuses) =>
        currentStatuses.filter((status) => status.id !== item.id)
      );
    }
  }

  return (
    <main className="min-h-screen bg-slate-50 p-4 md:p-8">
      <div className="mx-auto max-w-7xl space-y-6">
        <header>
          <p className="text-sm font-medium text-blue-600">Admin / Job Settings</p>
          <h1 className="mt-2 text-3xl font-bold text-slate-900">
            Application Status Management
          </h1>
          <p className="mt-2 text-slate-500">
            Configure application stages and the colors used to identify them.
          </p>
        </header>

        <section aria-label="Application status summary" className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-xl border border-slate-200 bg-white p-5">
            <p className="text-sm text-slate-500">Total Statuses</p>
            <p className="mt-2 text-3xl font-bold text-slate-900">{statuses.length}</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-5">
            <p className="text-sm text-slate-500">Active Statuses</p>
            <p className="mt-2 text-3xl font-bold text-green-600">{activeCount}</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-5">
            <p className="text-sm text-slate-500">Inactive Statuses</p>
            <p className="mt-2 text-3xl font-bold text-red-500">
              {statuses.length - activeCount}
            </p>
          </div>
        </section>

        <section className="rounded-xl border border-slate-200 bg-white p-6">
          <h2 className="text-lg font-bold text-slate-900">Add Application Status</h2>
          <p className="mt-1 text-sm text-slate-500">
            Add a stage to the application workflow.
          </p>
          <form onSubmit={addStatus} className="mt-5 grid gap-4 md:grid-cols-2">
            <div>
              <label htmlFor="application-status-name" className="mb-1.5 block text-sm font-medium text-slate-700">
                Status Name
              </label>
              <input
                id="application-status-name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="e.g. Assessment Pending"
                required
                className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>
            <div>
              <label htmlFor="status-color" className="mb-1.5 block text-sm font-medium text-slate-700">
                Status Color
              </label>
              <select
                id="status-color"
                value={color}
                onChange={(event) => setColor(event.target.value)}
                required
                className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              >
                <option value="" disabled>Select a badge color</option>
                {statusColorOptions.map((option) => (
                  <option key={option.value} value={option.value}>{option.name}</option>
                ))}
              </select>
            </div>
            <div className="md:col-span-2">
              <label htmlFor="application-status-description" className="mb-1.5 block text-sm font-medium text-slate-700">
                Description
              </label>
              <textarea
                id="application-status-description"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                placeholder="Briefly describe this application status"
                rows={3}
                className="w-full resize-y rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>
            <div className="md:col-span-2">
              <button type="submit" className="rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                + Add Status
              </button>
            </div>
          </form>
        </section>

        <section className="rounded-xl border border-slate-200 bg-white p-6">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
            <div>
              <h2 className="text-lg font-bold text-slate-900">Application Status List</h2>
              <p className="text-sm text-slate-500">Search and manage application workflow statuses.</p>
            </div>
            <label className="w-full md:max-w-sm">
              <span className="sr-only">Search statuses</span>
              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search statuses..."
                className="w-full rounded-lg border border-slate-300 px-4 py-2.5 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </label>
          </div>
          <div className="mt-5 overflow-x-auto">
            <table className="w-full min-w-[760px] text-left text-sm">
              <thead className="bg-slate-50 text-slate-500">
                <tr>
                  <th scope="col" className="p-3 font-medium">Status</th>
                  <th scope="col" className="p-3 font-medium">Description</th>
                  <th scope="col" className="p-3 font-medium">Color</th>
                  <th scope="col" className="p-3 font-medium">Availability</th>
                  <th scope="col" className="p-3 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredStatuses.map((item) => (
                  <tr key={item.id} className="border-t border-slate-100">
                    <td className="p-3">
                      <span className={`rounded-full px-3 py-1 text-xs font-semibold ${getColorBadge(item.color)}`}>
                        {item.name}
                      </span>
                    </td>
                    <td className="max-w-sm p-3 text-slate-500">{item.description}</td>
                    <td className="p-3 capitalize text-slate-600">{item.color}</td>
                    <td className="p-3">
                      <span className={`rounded-full px-3 py-1 text-xs font-semibold ${item.status === "Active" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="p-3">
                      <div className="flex gap-2">
                        <button type="button" onClick={() => toggleStatus(item.id)} className="rounded-lg border border-slate-300 px-3 py-1.5 text-xs font-medium text-slate-700 transition hover:bg-slate-50">
                          {item.status === "Active" ? "Disable" : "Enable"}
                        </button>
                        <button type="button" onClick={() => deleteStatus(item)} className="rounded-lg border border-red-200 px-3 py-1.5 text-xs font-medium text-red-600 transition hover:bg-red-50">
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filteredStatuses.length === 0 && (
                  <tr>
                    <td colSpan={5} className="p-10 text-center text-slate-500">
                      <p className="font-medium text-slate-700">No application statuses found</p>
                      <p className="mt-1 text-sm">Try another search or add a new status.</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

        <p className="text-xs text-slate-400">
          Demo version: changes are temporary and stored only in the current page state.
        </p>
      </div>
    </main>
  );
}
