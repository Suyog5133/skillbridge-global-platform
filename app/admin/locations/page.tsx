
"use client";

import { useState } from "react";

type Country = {
  id: number;
  name: string;
  code: string;
  currency: string;
  region: string;
  status: "Active" | "Inactive";
};

const initialCountries: Country[] = [
  { id: 1, name: "India", code: "IN", currency: "INR", region: "Asia", status: "Active" },
  { id: 2, name: "United States", code: "US", currency: "USD", region: "North America", status: "Active" },
  { id: 3, name: "United Kingdom", code: "GB", currency: "GBP", region: "Europe", status: "Active" },
  { id: 4, name: "Canada", code: "CA", currency: "CAD", region: "North America", status: "Active" },
  { id: 5, name: "Germany", code: "DE", currency: "EUR", region: "Europe", status: "Active" },
  { id: 6, name: "Australia", code: "AU", currency: "AUD", region: "Oceania", status: "Inactive" },
  { id: 7, name: "Japan", code: "JP", currency: "JPY", region: "Asia", status: "Active" },
];

const regions = [
  "Asia",
  "Europe",
  "North America",
  "South America",
  "Africa",
  "Oceania",
  "Middle East",
];

export default function AdminLocationsPage() {
  const [countries, setCountries] = useState(initialCountries);
  const [search, setSearch] = useState("");
  const [regionFilter, setRegionFilter] = useState("All");
  const [showForm, setShowForm] = useState(false);

  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [currency, setCurrency] = useState("");
  const [region, setRegion] = useState("Asia");

  const filteredCountries = countries.filter((country) => {
    const matchesSearch =
      country.name.toLowerCase().includes(search.toLowerCase()) ||
      country.code.toLowerCase().includes(search.toLowerCase());

    const matchesRegion =
      regionFilter === "All" || country.region === regionFilter;

    return matchesSearch && matchesRegion;
  });

  function addCountry() {
    if (!name.trim() || !code.trim() || !currency.trim()) {
      alert("Please complete all fields.");
      return;
    }

    if (countries.some((country) => country.code === code.trim().toUpperCase())) {
      alert("This country code already exists.");
      return;
    }

    setCountries((current) => [
      ...current,
      {
        id: Date.now(),
        name: name.trim(),
        code: code.trim().toUpperCase(),
        currency: currency.trim().toUpperCase(),
        region,
        status: "Active",
      },
    ]);

    setName("");
    setCode("");
    setCurrency("");
    setRegion("Asia");
    setShowForm(false);
  }

  function toggleStatus(id: number) {
    setCountries((current) =>
      current.map((country) =>
        country.id === id
          ? {
              ...country,
              status: country.status === "Active" ? "Inactive" : "Active",
            }
          : country
      )
    );
  }

  function deleteCountry(id: number) {
    if (confirm("Delete this country from the demo list?")) {
      setCountries((current) => current.filter((country) => country.id !== id));
    }
  }

  const activeCount = countries.filter((c) => c.status === "Active").length;

  return (
    <main className="min-h-screen bg-slate-50 p-4 md:p-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold text-blue-600">
              ADMIN PANEL / GLOBAL SETTINGS
            </p>
            <h1 className="mt-2 text-3xl font-bold text-slate-900">
              Country & Region Management
            </h1>
            <p className="mt-2 text-slate-500">
              Manage countries and regions supported by SkillBridge Global.
            </p>
          </div>

          <button
            onClick={() => setShowForm(true)}
            className="rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700"
          >
            + Add Country
          </button>
        </div>

        <div className="mb-6 grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border bg-white p-5">
            <p className="text-sm text-slate-500">Total Countries</p>
            <h2 className="mt-2 text-3xl font-bold">{countries.length}</h2>
          </div>

          <div className="rounded-2xl border bg-white p-5">
            <p className="text-sm text-slate-500">Active Countries</p>
            <h2 className="mt-2 text-3xl font-bold text-green-600">
              {activeCount}
            </h2>
          </div>

          <div className="rounded-2xl border bg-white p-5">
            <p className="text-sm text-slate-500">Regions Covered</p>
            <h2 className="mt-2 text-3xl font-bold">
              {new Set(countries.map((c) => c.region)).size}
            </h2>
          </div>
        </div>

        <div className="rounded-2xl border bg-white p-5 shadow-sm">
          <div className="mb-5 flex flex-col gap-3 sm:flex-row">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search country or country code..."
              className="flex-1 rounded-xl border p-3 outline-none focus:border-blue-500"
            />

            <select
              value={regionFilter}
              onChange={(e) => setRegionFilter(e.target.value)}
              className="rounded-xl border p-3 outline-none"
            >
              <option value="All">All Regions</option>
              {regions.map((item) => (
                <option key={item} value={item}>{item}</option>
              ))}
            </select>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[750px] text-left text-sm">
              <thead className="bg-slate-50 text-slate-500">
                <tr>
                  <th className="p-4">Country</th>
                  <th className="p-4">Code</th>
                  <th className="p-4">Currency</th>
                  <th className="p-4">Region</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Actions</th>
                </tr>
              </thead>

              <tbody>
                {filteredCountries.map((country) => (
                  <tr key={country.id} className="border-t">
                    <td className="p-4 font-semibold">{country.name}</td>
                    <td className="p-4">{country.code}</td>
                    <td className="p-4">{country.currency}</td>
                    <td className="p-4">{country.region}</td>
                    <td className="p-4">
                      <span className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        country.status === "Active"
                          ? "bg-green-100 text-green-700"
                          : "bg-slate-100 text-slate-600"
                      }`}>
                        {country.status}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => toggleStatus(country.id)}
                          className="rounded-lg border px-3 py-2 text-xs font-semibold"
                        >
                          {country.status === "Active" ? "Deactivate" : "Activate"}
                        </button>
                        <button
                          onClick={() => deleteCountry(country.id)}
                          className="rounded-lg border border-red-200 px-3 py-2 text-xs font-semibold text-red-600"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

                {filteredCountries.length === 0 && (
                  <tr>
                    <td colSpan={6} className="p-8 text-center text-slate-500">
                      No countries found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <p className="mt-4 text-xs text-slate-400">
            Demo data only. Country settings are not connected to a database.
          </p>
        </div>

        {showForm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/50 p-4">
            <div role="dialog" aria-modal="true" aria-label="Add New Country" className="my-8 w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl">
              <h2 className="mb-5 text-xl font-bold">Add New Country</h2>

              <div className="space-y-4">
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Country name"
                  className="w-full rounded-xl border p-3"
                />

                <input
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder="Country code (e.g. IN)"
                  maxLength={2}
                  className="w-full rounded-xl border p-3"
                />

                <input
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                  placeholder="Currency code (e.g. INR)"
                  maxLength={3}
                  className="w-full rounded-xl border p-3"
                />

                <select
                  value={region}
                  onChange={(e) => setRegion(e.target.value)}
                  className="w-full rounded-xl border p-3"
                >
                  {regions.map((item) => (
                    <option key={item} value={item}>{item}</option>
                  ))}
                </select>
              </div>

              <div className="mt-6 flex justify-end gap-3">
                <button
                  onClick={() => setShowForm(false)}
                  className="rounded-xl border px-5 py-3"
                >
                  Cancel
                </button>
                <button
                  onClick={addCountry}
                  className="rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white"
                >
                  Save Country
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
