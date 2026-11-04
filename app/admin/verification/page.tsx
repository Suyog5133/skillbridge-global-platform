"use client";

import { useMemo, useState } from "react";

type Company = {
  id: number;
  name: string;
  email: string;
  country: string;
  website: string;
  registrationNo: string;
  submitted: string;
  status: "Pending" | "Approved" | "Rejected";
  document: string;
};

const initialCompanies: Company[] = [
  {
    id: 2001,
    name: "TechNova Solutions",
    email: "hr@technova.example",
    country: "India",
    website: "https://technova.example",
    registrationNo: "IN-2026-1001",
    submitted: "Nov 02, 2026",
    status: "Pending",
    document: "Business Registration Certificate",
  },
  {
    id: 2002,
    name: "Global Systems Ltd",
    email: "contact@globalsystems.example",
    country: "United Kingdom",
    website: "https://globalsystems.example",
    registrationNo: "UK-2026-2045",
    submitted: "Oct 30, 2026",
    status: "Approved",
    document: "Company Incorporation Certificate",
  },
  {
    id: 2003,
    name: "Creative Labs",
    email: "admin@creativelabs.example",
    country: "United States",
    website: "https://creativelabs.example",
    registrationNo: "US-2026-3050",
    submitted: "Oct 28, 2026",
    status: "Pending",
    document: "Business License",
  },
  {
    id: 2004,
    name: "FutureTech Private Limited",
    email: "careers@futuretech.example",
    country: "India",
    website: "https://futuretech.example",
    registrationNo: "IN-2026-4080",
    submitted: "Oct 25, 2026",
    status: "Rejected",
    document: "Company Registration Certificate",
  },
];

export default function CompanyVerificationPage() {
  const [companies, setCompanies] = useState(initialCompanies);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [selectedCompany, setSelectedCompany] =
    useState<Company | null>(null);
  const [notes, setNotes] = useState("");

  const filteredCompanies = useMemo(() => {
    return companies.filter((company) => {
      const query = search.toLowerCase();

      const matchesSearch =
        company.name.toLowerCase().includes(query) ||
        company.email.toLowerCase().includes(query) ||
        company.country.toLowerCase().includes(query);

      const matchesFilter =
        filter === "All" || company.status === filter;

      return matchesSearch && matchesFilter;
    });
  }, [companies, search, filter]);

  const pending = companies.filter(
    (company) => company.status === "Pending"
  ).length;

  const approved = companies.filter(
    (company) => company.status === "Approved"
  ).length;

  const rejected = companies.filter(
    (company) => company.status === "Rejected"
  ).length;

  function updateStatus(
    id: number,
    status: Company["status"]
  ) {
    setCompanies((previous) =>
      previous.map((company) =>
        company.id === id ? { ...company, status } : company
      )
    );

    setSelectedCompany(null);
    setNotes("");
  }

  function statusStyle(status: Company["status"]) {
    if (status === "Approved") {
      return "bg-green-100 text-green-700";
    }

    if (status === "Rejected") {
      return "bg-red-100 text-red-700";
    }

    return "bg-orange-100 text-orange-700";
  }

  return (
    <main className="min-h-screen bg-slate-50 p-5 md:p-8">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-8">
          <p className="mb-2 text-sm font-bold text-blue-600">
            SKILLBRIDGE GLOBAL · ADMIN PANEL
          </p>

          <h1 className="text-3xl font-bold text-slate-900">
            Company Verification
          </h1>

          <p className="mt-2 text-slate-500">
            Review company information and manage verification requests.
          </p>
          <p className="mt-4 rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm text-amber-800">
            Demo data only: verification decisions are temporary and do not verify real companies.
          </p>
        </div>

        {/* Important Notice */}
        <div className="mb-8 rounded-2xl border border-blue-100 bg-blue-50 p-5">
          <div className="flex gap-3">
            <span className="text-2xl">🛡️</span>

            <div>
              <h3 className="font-bold text-blue-900">
                Verification & Trust
              </h3>

              <p className="mt-1 text-sm leading-6 text-blue-800">
                Verify company identity and registration information
                before granting a verified company badge. Never approve
                a company without checking its documents and details.
              </p>
            </div>
          </div>
        </div>

        {/* Statistics */}
        <div className="mb-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
            <p className="text-sm text-slate-500">
              Total Companies
            </p>
            <h2 className="mt-2 text-3xl font-bold text-slate-900">
              {companies.length}
            </h2>
          </div>

          <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
            <p className="text-sm text-slate-500">
              Pending Review
            </p>
            <h2 className="mt-2 text-3xl font-bold text-orange-500">
              {pending}
            </h2>
          </div>

          <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
            <p className="text-sm text-slate-500">
              Approved
            </p>
            <h2 className="mt-2 text-3xl font-bold text-green-600">
              {approved}
            </h2>
          </div>

          <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
            <p className="text-sm text-slate-500">
              Rejected
            </p>
            <h2 className="mt-2 text-3xl font-bold text-red-600">
              {rejected}
            </h2>
          </div>
        </div>

        {/* Filters */}
        <section className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm md:p-7">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-slate-900">
              Verification Requests
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Review and process company applications.
            </p>
          </div>

          <div className="mb-6 grid gap-3 md:grid-cols-2">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search company, email or country..."
              className="rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500"
            />

            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500"
            >
              <option value="All">All Requests</option>
              <option value="Pending">Pending</option>
              <option value="Approved">Approved</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full min-w-[850px] text-left">
              <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="rounded-l-xl p-4">Company</th>
                  <th className="p-4">Country</th>
                  <th className="p-4">Submitted</th>
                  <th className="p-4">Document</th>
                  <th className="p-4">Status</th>
                  <th className="rounded-r-xl p-4">Action</th>
                </tr>
              </thead>

              <tbody>
                {filteredCompanies.map((company) => (
                  <tr
                    key={company.id}
                    className="border-b border-slate-100 text-sm last:border-0"
                  >
                    <td className="p-4">
                      <p className="font-semibold text-slate-900">
                        {company.name}
                      </p>
                      <p className="text-xs text-slate-500">
                        {company.email}
                      </p>
                    </td>

                    <td className="p-4 text-slate-600">
                      {company.country}
                    </td>

                    <td className="p-4 text-slate-500">
                      {company.submitted}
                    </td>

                    <td className="p-4 text-slate-600">
                      {company.document}
                    </td>

                    <td className="p-4">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${statusStyle(company.status)}`}
                      >
                        {company.status}
                      </span>
                    </td>

                    <td className="p-4">
                      <button
                        onClick={() => {
                          setSelectedCompany(company);
                          setNotes("");
                        }}
                        className="rounded-lg border border-blue-200 px-4 py-2 font-medium text-blue-600 hover:bg-blue-50"
                      >
                        Review
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredCompanies.length === 0 && (
            <div className="py-12 text-center text-slate-500">
              No company requests found.
            </div>
          )}
        </section>

        {/* Review Modal */}
        {selectedCompany && (
          <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-950/50 p-4">
            <div role="dialog" aria-modal="true" aria-label="Review Company" className="my-8 w-full max-w-xl rounded-2xl bg-white p-6 shadow-xl">
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-xl font-bold text-slate-900">
                  Review Company
                </h2>

                <button
                  onClick={() => setSelectedCompany(null)}
                  className="text-2xl text-slate-400 hover:text-slate-700"
                >
                  ×
                </button>
              </div>

              <div className="space-y-5">
                <div>
                  <p className="text-xs text-slate-400">
                    Company Name
                  </p>
                  <p className="font-bold text-slate-900">
                    {selectedCompany.name}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-slate-400">
                    Company Email
                  </p>
                  <p className="text-slate-700">
                    {selectedCompany.email}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-slate-400">
                    Country
                  </p>
                  <p className="text-slate-700">
                    {selectedCompany.country}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-slate-400">
                    Website
                  </p>
                  <p className="break-all text-blue-600">
                    {selectedCompany.website}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-slate-400">
                    Registration Number
                  </p>
                  <p className="text-slate-700">
                    {selectedCompany.registrationNo}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-slate-400">
                    Submitted Document
                  </p>
                  <p className="text-slate-700">
                    {selectedCompany.document}
                  </p>
                  <p className="mt-1 text-xs text-orange-600">
                    Demo record only — no actual document is attached.
                  </p>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Admin Review Notes
                  </label>

                  <textarea
                    rows={3}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Write verification notes..."
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500"
                  />
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <button
                    onClick={() =>
                      updateStatus(selectedCompany.id, "Approved")
                    }
                    className="rounded-xl bg-green-600 py-3 font-semibold text-white hover:bg-green-700"
                  >
                    ✓ Approve Company
                  </button>

                  <button
                    onClick={() =>
                      updateStatus(selectedCompany.id, "Rejected")
                    }
                    className="rounded-xl bg-red-600 py-3 font-semibold text-white hover:bg-red-700"
                  >
                    ✕ Reject Company
                  </button>
                </div>

                <button
                  onClick={() => setSelectedCompany(null)}
                  className="w-full rounded-xl border border-slate-200 py-3 font-semibold text-slate-600 hover:bg-slate-50"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        <footer className="mt-8 text-center text-xs text-slate-400">
          SkillBridge Global · Company Verification Admin Panel
        </footer>
      </div>
    </main>
  );
}