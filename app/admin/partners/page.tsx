
"use client";

import { useState } from "react";

type Partner = {
  id: number;
  name: string;
  email: string;
  organization: string;
  country: string;
  type: string;
  status: string;
};

export default function AdminPartnersPage() {
  const [partners, setPartners] = useState<Partner[]>([
    { id: 1, name: "Rahul Sharma", email: "rahul@example.com", organization: "Tech Solutions", country: "India", type: "Recruitment Partner", status: "Pending" },
    { id: 2, name: "Sarah Wilson", email: "sarah@example.com", organization: "Global Careers Ltd", country: "United Kingdom", type: "Business Partner", status: "Approved" },
    { id: 3, name: "Michael Brown", email: "michael@example.com", organization: "Talent Connect", country: "United States", type: "Recruitment Partner", status: "Pending" },
    { id: 4, name: "Amit Patel", email: "amit@example.com", organization: "Career Academy", country: "India", type: "Education Partner", status: "Rejected" },
  ]);

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const filtered = partners.filter((p) => {
    const matchesSearch = `${p.name} ${p.organization} ${p.country}`
      .toLowerCase().includes(search.toLowerCase());
    return matchesSearch && (filter === "All" || p.status === filter);
  });

  function updateStatus(id: number, status: string) {
    setPartners(partners.map((p) =>
      p.id === id ? { ...p, status } : p
    ));
  }

  function deletePartner(id: number) {
    const partner = partners.find((item) => item.id === id);
    if (!partner || !window.confirm(`Delete partner "${partner.organization}"?`)) {
      return;
    }
    setPartners(partners.filter((p) => p.id !== id));
  }

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8">
      <div className="mx-auto max-w-7xl space-y-7">

        <div>
          <p className="text-sm font-semibold text-blue-600">ADMIN / VERIFICATION</p>
          <h1 className="mt-2 text-3xl font-bold text-slate-900">
            Partner & Organization Verification
          </h1>
          <p className="mt-2 text-slate-500">
            Review and manage organizations applying to become platform partners.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-xl border bg-white p-5">
            <p className="text-sm text-slate-500">Total Partners</p>
            <h2 className="mt-2 text-3xl font-bold">{partners.length}</h2>
          </div>
          <div className="rounded-xl border bg-white p-5">
            <p className="text-sm text-slate-500">Approved Partners</p>
            <h2 className="mt-2 text-3xl font-bold text-green-600">
              {partners.filter((p) => p.status === "Approved").length}
            </h2>
          </div>
          <div className="rounded-xl border bg-white p-5">
            <p className="text-sm text-slate-500">Pending Reviews</p>
            <h2 className="mt-2 text-3xl font-bold text-amber-600">
              {partners.filter((p) => p.status === "Pending").length}
            </h2>
          </div>
        </div>

        <section className="rounded-xl border bg-white p-6">
          <div className="mb-5 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
            <h2 className="text-xl font-bold">Partner Applications</h2>

            <div className="flex flex-col gap-3 sm:flex-row">
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search partners..."
                className="rounded-lg border p-3"
              />

              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="rounded-lg border p-3"
              >
                <option>All</option>
                <option>Pending</option>
                <option>Approved</option>
                <option>Rejected</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[850px] text-left text-sm">
              <thead className="bg-slate-100 text-slate-600">
                <tr>
                  <th className="p-3">Contact Person</th>
                  <th className="p-3">Organization</th>
                  <th className="p-3">Country</th>
                  <th className="p-3">Partner Type</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Actions</th>
                </tr>
              </thead>

              <tbody>
                {filtered.map((p) => (
                  <tr key={p.id} className="border-b">
                    <td className="p-3">
                      <strong>{p.name}</strong>
                      <p className="text-xs text-slate-500">{p.email}</p>
                    </td>
                    <td className="p-3 font-medium">{p.organization}</td>
                    <td className="p-3">{p.country}</td>
                    <td className="p-3">{p.type}</td>
                    <td className="p-3">
                      <span className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        p.status === "Approved"
                          ? "bg-green-100 text-green-700"
                          : p.status === "Pending"
                          ? "bg-amber-100 text-amber-700"
                          : "bg-red-100 text-red-700"
                      }`}>
                        {p.status}
                      </span>
                    </td>
                    <td className="p-3">
                      <div className="flex flex-wrap gap-2">
                        <select
                          value={p.status}
                          onChange={(e) => updateStatus(p.id, e.target.value)}
                          className="rounded border p-2"
                        >
                          <option>Pending</option>
                          <option>Approved</option>
                          <option>Rejected</option>
                        </select>

                        <button
                          onClick={() => deletePartner(p.id)}
                          className="rounded-lg border border-red-200 px-3 py-2 text-red-600 hover:bg-red-50"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={6} className="p-6 text-center text-slate-500">
                      No partner applications found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

        <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
          <strong>Verification Notice:</strong> This page uses demo records only.
          Real verification should include business registration documents,
          authorized representative checks, domain verification and audit logs.
          Do not approve organizations without reviewing their evidence.
        </div>

      </div>
    </div>
  );
}
