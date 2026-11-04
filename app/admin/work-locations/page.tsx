"use client";

import { useState } from "react";

type WorkLocation = {
  id: number;
  name: string;
  type: string;
  description: string;
  status: "Active" | "Inactive";
};

const workLocationTypes = [
  "Remote",
  "Hybrid",
  "On-site",
  "Work from Home",
  "Office-based",
  "Flexible Location",
  "Multiple Locations",
];

const initialWorkLocations: WorkLocation[] = [
  {
    id: 1,
    name: "Remote",
    type: "Remote",
    description: "Work remotely without a regular office location",
    status: "Active",
  },
  {
    id: 2,
    name: "Hybrid",
    type: "Hybrid",
    description: "Combine remote work with time at an office",
    status: "Active",
  },
  {
    id: 3,
    name: "On-site",
    type: "On-site",
    description: "Work in person at a designated work location",
    status: "Active",
  },
  {
    id: 4,
    name: "Work from Home",
    type: "Work from Home",
    description: "Work from a home-based location",
    status: "Active",
  },
  {
    id: 5,
    name: "Office-based",
    type: "Office-based",
    description: "Work primarily from a company office",
    status: "Active",
  },
  {
    id: 6,
    name: "Flexible Location",
    type: "Flexible Location",
    description: "Choose an appropriate location based on the role",
    status: "Active",
  },
  {
    id: 7,
    name: "Multiple Locations",
    type: "Multiple Locations",
    description: "Work across multiple offices or locations",
    status: "Active",
  },
];

export default function AdminWorkLocationsPage() {
  const [workLocations, setWorkLocations] =
    useState<WorkLocation[]>(initialWorkLocations);
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");
  const [search, setSearch] = useState("");

  const searchTerm = search.trim().toLowerCase();
  const filteredWorkLocations = workLocations.filter((workLocation) =>
    [workLocation.name, workLocation.type, workLocation.description].some(
      (value) => value.toLowerCase().includes(searchTerm)
    )
  );
  const activeCount = workLocations.filter(
    (workLocation) => workLocation.status === "Active"
  ).length;

  function addWorkLocation(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!name.trim() || !type) {
      return;
    }

    setWorkLocations((currentWorkLocations) => [
      ...currentWorkLocations,
      {
        id: Date.now(),
        name: name.trim(),
        type,
        description: description.trim() || "No description added",
        status: "Active",
      },
    ]);
    setName("");
    setType("");
    setDescription("");
  }

  function toggleStatus(id: number) {
    setWorkLocations((currentWorkLocations) =>
      currentWorkLocations.map((workLocation) =>
        workLocation.id === id
          ? {
              ...workLocation,
              status:
                workLocation.status === "Active" ? "Inactive" : "Active",
            }
          : workLocation
      )
    );
  }

  function deleteWorkLocation(workLocation: WorkLocation) {
    if (
      window.confirm(
        `Are you sure you want to delete "${workLocation.name}"?`
      )
    ) {
      setWorkLocations((currentWorkLocations) =>
        currentWorkLocations.filter((item) => item.id !== workLocation.id)
      );
    }
  }

  return (
    <main className="min-h-screen bg-slate-50 p-4 md:p-8">
      <div className="mx-auto max-w-7xl space-y-6">
        <header>
          <p className="text-sm font-medium text-blue-600">
            Admin / Job Settings
          </p>
          <h1 className="mt-2 text-3xl font-bold text-slate-900">
            Work Location Management
          </h1>
          <p className="mt-2 text-slate-500">
            Manage work arrangements available across SkillBridge Global.
          </p>
        </header>

        <section
          aria-label="Work location summary"
          className="grid gap-4 sm:grid-cols-3"
        >
          <div className="rounded-xl border border-slate-200 bg-white p-5">
            <p className="text-sm text-slate-500">Total Work Locations</p>
            <p className="mt-2 text-3xl font-bold text-slate-900">
              {workLocations.length}
            </p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-5">
            <p className="text-sm text-slate-500">Active</p>
            <p className="mt-2 text-3xl font-bold text-green-600">
              {activeCount}
            </p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-5">
            <p className="text-sm text-slate-500">Inactive</p>
            <p className="mt-2 text-3xl font-bold text-red-500">
              {workLocations.length - activeCount}
            </p>
          </div>
        </section>

        <section className="rounded-xl border border-slate-200 bg-white p-6">
          <h2 className="text-lg font-bold text-slate-900">
            Add Work Location
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Add a work arrangement for job listings and company profiles.
          </p>
          <form
            onSubmit={addWorkLocation}
            className="mt-5 grid gap-4 md:grid-cols-2"
          >
            <div>
              <label
                htmlFor="work-location-name"
                className="mb-1.5 block text-sm font-medium text-slate-700"
              >
                Location Name
              </label>
              <input
                id="work-location-name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="e.g. Remote — United States"
                required
                className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>
            <div>
              <label
                htmlFor="work-location-type"
                className="mb-1.5 block text-sm font-medium text-slate-700"
              >
                Location Type
              </label>
              <select
                id="work-location-type"
                value={type}
                onChange={(event) => setType(event.target.value)}
                required
                className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              >
                <option value="" disabled>
                  Select a work arrangement
                </option>
                {workLocationTypes.map((workLocationType) => (
                  <option key={workLocationType} value={workLocationType}>
                    {workLocationType}
                  </option>
                ))}
              </select>
            </div>
            <div className="md:col-span-2">
              <label
                htmlFor="work-location-description"
                className="mb-1.5 block text-sm font-medium text-slate-700"
              >
                Description
              </label>
              <textarea
                id="work-location-description"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                placeholder="Briefly describe this work arrangement"
                rows={3}
                className="w-full resize-y rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>
            <div className="md:col-span-2">
              <button
                type="submit"
                className="rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                + Add Work Location
              </button>
            </div>
          </form>
        </section>

        <section className="rounded-xl border border-slate-200 bg-white p-6">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Work Location List
              </h2>
              <p className="text-sm text-slate-500">
                Search and manage available work arrangements.
              </p>
            </div>
            <label className="w-full md:max-w-sm">
              <span className="sr-only">Search work locations</span>
              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search work locations..."
                className="w-full rounded-lg border border-slate-300 px-4 py-2.5 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </label>
          </div>

          <div className="mt-5 overflow-x-auto">
            <table className="w-full min-w-[700px] text-left text-sm">
              <thead className="bg-slate-50 text-slate-500">
                <tr>
                  <th scope="col" className="p-3 font-medium">
                    Location Name
                  </th>
                  <th scope="col" className="p-3 font-medium">
                    Location Type
                  </th>
                  <th scope="col" className="p-3 font-medium">
                    Description
                  </th>
                  <th scope="col" className="p-3 font-medium">
                    Status
                  </th>
                  <th scope="col" className="p-3 font-medium">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredWorkLocations.map((workLocation) => (
                  <tr
                    key={workLocation.id}
                    className="border-t border-slate-100"
                  >
                    <td className="p-3 font-semibold text-slate-800">
                      {workLocation.name}
                    </td>
                    <td className="p-3 text-slate-600">{workLocation.type}</td>
                    <td className="max-w-sm p-3 text-slate-500">
                      {workLocation.description}
                    </td>
                    <td className="p-3">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          workLocation.status === "Active"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {workLocation.status}
                      </span>
                    </td>
                    <td className="p-3">
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => toggleStatus(workLocation.id)}
                          className="rounded-lg border border-slate-300 px-3 py-1.5 text-xs font-medium text-slate-700 transition hover:bg-slate-50"
                        >
                          {workLocation.status === "Active"
                            ? "Disable"
                            : "Enable"}
                        </button>
                        <button
                          type="button"
                          onClick={() => deleteWorkLocation(workLocation)}
                          className="rounded-lg border border-red-200 px-3 py-1.5 text-xs font-medium text-red-600 transition hover:bg-red-50"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filteredWorkLocations.length === 0 && (
                  <tr>
                    <td
                      colSpan={5}
                      className="p-10 text-center text-slate-500"
                    >
                      <p className="font-medium text-slate-700">
                        No work locations found
                      </p>
                      <p className="mt-1 text-sm">
                        Try another search term or add a work location.
                      </p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

        <p className="text-xs text-slate-400">
          Demo version: changes are temporary and stored only in the current
          page state.
        </p>
      </div>
    </main>
  );
}
