"use client";

import { useState } from "react";

const applications = [
  {
    id: 1,
    company: "Google",
    role: "Frontend Developer",
    type: "Full Time",
    date: "02 Nov 2026",
    status: "Shortlisted",
    logo: "G",
  },
  {
    id: 2,
    company: "Microsoft",
    role: "Software Engineer Intern",
    type: "Internship",
    date: "01 Nov 2026",
    status: "Pending",
    logo: "M",
  },
  {
    id: 3,
    company: "Amazon",
    role: "UI/UX Designer",
    type: "Full Time",
    date: "29 Oct 2026",
    status: "Rejected",
    logo: "A",
  },
  {
    id: 4,
    company: "TCS",
    role: "Cyber Security Analyst",
    type: "Full Time",
    date: "27 Oct 2026",
    status: "Pending",
    logo: "T",
  },
  {
    id: 5,
    company: "IBM",
    role: "Cyber Security Intern",
    type: "Internship",
    date: "25 Oct 2026",
    status: "Shortlisted",
    logo: "I",
  },
];

const statusStyles: Record<string, string> = {
  Pending: "bg-amber-50 text-amber-700",
  Shortlisted: "bg-green-50 text-green-700",
  Rejected: "bg-red-50 text-red-700",
};

export default function ApplicationsPage() {
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<(typeof applications)[number] | null>(null);

  const filteredApplications = applications.filter((application) => {
    const matchesFilter =
      filter === "All" || application.status === filter;

    const matchesSearch =
      application.company.toLowerCase().includes(search.toLowerCase()) ||
      application.role.toLowerCase().includes(search.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  const counts = {
    total: applications.length,
    pending: applications.filter((a) => a.status === "Pending").length,
    shortlisted: applications.filter((a) => a.status === "Shortlisted").length,
    rejected: applications.filter((a) => a.status === "Rejected").length,
  };

  return (
    <main className="min-h-screen bg-slate-50 p-5 sm:p-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <p className="mb-2 text-sm font-semibold text-blue-600">
              SKILLBRIDGE GLOBAL
            </p>
            <h1 className="text-3xl font-bold text-slate-900">
              My Applications
            </h1>
            <p className="mt-2 text-slate-500">
              Track and manage all your job and internship applications.
            </p>
            <p className="mt-4 rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm text-amber-800">
              Demo data only: these sample applications are not linked to a real account.
            </p>
          </div>

          <a
            href="/jobs"
            className="rounded-xl bg-blue-600 px-5 py-3 text-center font-semibold text-white transition hover:bg-blue-700"
          >
            + Find More Jobs
          </a>
        </div>

        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: "Total Applications", value: counts.total, icon: "📄" },
            { label: "Pending", value: counts.pending, icon: "⏳" },
            { label: "Shortlisted", value: counts.shortlisted, icon: "⭐" },
            { label: "Rejected", value: counts.rejected, icon: "✕" },
          ].map((item) => (
            <div
              key={item.label}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <p className="text-sm text-slate-500">{item.label}</p>
                <span className="text-2xl">{item.icon}</span>
              </div>
              <h2 className="mt-3 text-3xl font-bold text-slate-900">
                {item.value}
              </h2>
            </div>
          ))}
        </div>

        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
          <div className="mb-6 flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
            <div>
              <h2 className="text-xl font-bold text-slate-900">
                Application History
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                View the current status of your applications.
              </p>
            </div>

            <input
              type="search"
              placeholder="Search company or job..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-blue-500 lg:max-w-xs"
            />
          </div>

          <div className="mb-6 flex flex-wrap gap-2">
            {["All", "Pending", "Shortlisted", "Rejected"].map((status) => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                  filter === status
                    ? "bg-blue-600 text-white"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {status}
              </button>
            ))}
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px] text-left">
              <thead>
                <tr className="border-b border-slate-200 text-sm text-slate-500">
                  <th className="px-4 py-4 font-medium">Company</th>
                  <th className="px-4 py-4 font-medium">Job Title</th>
                  <th className="px-4 py-4 font-medium">Type</th>
                  <th className="px-4 py-4 font-medium">Applied Date</th>
                  <th className="px-4 py-4 font-medium">Status</th>
                  <th className="px-4 py-4 font-medium">Action</th>
                </tr>
              </thead>

              <tbody>
                {filteredApplications.map((application) => (
                  <tr
                    key={application.id}
                    className="border-b border-slate-100 last:border-0 hover:bg-slate-50"
                  >
                    <td className="px-4 py-5">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 font-bold text-blue-700">
                          {application.logo}
                        </div>
                        <span className="font-semibold text-slate-800">
                          {application.company}
                        </span>
                      </div>
                    </td>

                    <td className="px-4 py-5 font-medium text-slate-700">
                      {application.role}
                    </td>

                    <td className="px-4 py-5 text-sm text-slate-500">
                      {application.type}
                    </td>

                    <td className="px-4 py-5 text-sm text-slate-500">
                      {application.date}
                    </td>

                    <td className="px-4 py-5">
                      <span
                        className={`rounded-full px-3 py-1.5 text-xs font-semibold ${statusStyles[application.status]}`}
                      >
                        {application.status}
                      </span>
                    </td>

                    <td className="px-4 py-5">
                      <button
                        onClick={() => setSelected(application)}
                        className="font-semibold text-blue-600 hover:text-blue-800"
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filteredApplications.length === 0 && (
              <div className="py-12 text-center">
                <p className="font-semibold text-slate-700">
                  No applications found.
                </p>
                <p className="mt-1 text-sm text-slate-500">
                  Try another search or filter.
                </p>
              </div>
            )}
          </div>
        </section>

        {selected && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4">
            <div role="dialog" aria-modal="true" aria-label="Application Details" className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
              <div className="mb-5 flex items-center justify-between">
                <h2 className="text-xl font-bold text-slate-900">
                  Application Details
                </h2>
                <button
                  onClick={() => setSelected(null)}
                  className="text-2xl text-slate-400 hover:text-slate-700"
                  aria-label="Close details"
                >
                  ×
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <p className="text-sm text-slate-500">Company</p>
                  <p className="font-semibold text-slate-900">
                    {selected.company}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-slate-500">Job Title</p>
                  <p className="font-semibold text-slate-900">
                    {selected.role}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-slate-500">Employment Type</p>
                  <p className="font-semibold text-slate-900">
                    {selected.type}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-slate-500">Applied Date</p>
                  <p className="font-semibold text-slate-900">
                    {selected.date}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-slate-500">Current Status</p>
                  <span
                    className={`inline-block rounded-full px-3 py-1.5 text-xs font-semibold ${statusStyles[selected.status]}`}
                  >
                    {selected.status}
                  </span>
                </div>
              </div>

              <button
                onClick={() => setSelected(null)}
                className="mt-7 w-full rounded-xl bg-blue-600 py-3 font-semibold text-white hover:bg-blue-700"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}