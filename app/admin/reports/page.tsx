"use client";

import { useState } from "react";

type Report = {
  id: number;
  reporter: string;
  reportedUser: string;
  category: string;
  description: string;
  date: string;
  priority: string;
  status: string;
};

const initialReports: Report[] = [
  {
    id: 1,
    reporter: "Alex Morgan",
    reportedUser: "Unknown Recruiter",
    category: "Fake Job Listing",
    description: "Recruiter is asking candidates to pay money before an interview.",
    date: "Today",
    priority: "High",
    status: "Pending",
  },
  {
    id: 2,
    reporter: "Priya Sharma",
    reportedUser: "John Smith",
    category: "Fake Profile",
    description: "The profile contains suspicious information.",
    date: "Today",
    priority: "High",
    status: "Under Review",
  },
  {
    id: 3,
    reporter: "Daniel Lee",
    reportedUser: "Global Hiring Ltd.",
    category: "Scam",
    description: "The company is requesting personal documents through an unknown link.",
    date: "Yesterday",
    priority: "High",
    status: "Pending",
  },
  {
    id: 4,
    reporter: "Sara Wilson",
    reportedUser: "Unknown User",
    category: "Inappropriate Message",
    description: "Received repeated unwanted messages.",
    date: "Yesterday",
    priority: "Medium",
    status: "Resolved",
  },
  {
    id: 5,
    reporter: "Rahul Patil",
    reportedUser: "Creative Agency",
    category: "Payment Dispute",
    description: "The client has not paid for completed freelance work.",
    date: "2 days ago",
    priority: "Medium",
    status: "Pending",
  },
];

export default function AdminReportsPage() {
  const [reports, setReports] = useState<Report[]>(initialReports);
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Report | null>(null);

  const updateStatus = (id: number, status: string) => {
    setReports((previous) =>
      previous.map((report) =>
        report.id === id ? { ...report, status } : report
      )
    );
    setSelected(null);
  };

  const deleteReport = (id: number) => {
    if (!confirm("Delete this report?")) return;

    setReports((previous) =>
      previous.filter((report) => report.id !== id)
    );
    setSelected(null);
  };

  const filteredReports = reports.filter((report) => {
    const matchesFilter =
      filter === "All" || report.status === filter;

    const matchesSearch =
      report.reporter.toLowerCase().includes(search.toLowerCase()) ||
      report.reportedUser.toLowerCase().includes(search.toLowerCase()) ||
      report.category.toLowerCase().includes(search.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  const getStatusStyle = (status: string) => {
    if (status === "Resolved") return "bg-green-100 text-green-700";
    if (status === "Dismissed") return "bg-gray-100 text-gray-600";
    if (status === "Under Review") return "bg-blue-100 text-blue-700";
    return "bg-yellow-100 text-yellow-700";
  };

  const stats = [
    { title: "Total Reports", value: reports.length, color: "text-blue-600" },
    {
      title: "Pending",
      value: reports.filter((r) => r.status === "Pending").length,
      color: "text-yellow-600",
    },
    {
      title: "Under Review",
      value: reports.filter((r) => r.status === "Under Review").length,
      color: "text-indigo-600",
    },
    {
      title: "Resolved",
      value: reports.filter((r) => r.status === "Resolved").length,
      color: "text-green-600",
    },
    {
      title: "Dismissed",
      value: reports.filter((r) => r.status === "Dismissed").length,
      color: "text-gray-600",
    },
  ];

  return (
    <main className="min-h-screen bg-slate-50 p-4 md:p-8">
      <div className="mx-auto max-w-7xl">

        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm font-bold text-blue-600">
              ADMIN CONTROL PANEL
            </p>
            <h1 className="mt-2 text-3xl font-bold text-slate-900">
              Reports & Abuse Management
            </h1>
            <p className="mt-2 text-slate-500">
              Manage complaints and keep SkillBridge Global safe.
            </p>
            <p className="mt-4 rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm text-amber-800">
              Demo data only: report details and actions are temporary.
            </p>
          </div>

          <a
            href="/dashboard/admin"
            className="rounded-lg border bg-white px-5 py-3 font-semibold text-slate-700"
          >
            ← Back to Dashboard
          </a>
        </div>

        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {stats.map((stat) => (
            <div
              key={stat.title}
              className="rounded-xl border bg-white p-5 shadow-sm"
            >
              <p className="text-sm text-slate-500">{stat.title}</p>
              <h2 className={`mt-2 text-3xl font-bold ${stat.color}`}>
                {stat.value}
              </h2>
            </div>
          ))}
        </div>

        <section className="rounded-xl border bg-white p-5 shadow-sm">
          <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row">
            <h2 className="text-xl font-bold text-slate-900">
              Reported Activities
            </h2>

            <input
              type="text"
              placeholder="Search reports..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="rounded-lg border px-4 py-3 outline-none focus:border-blue-500"
            />
          </div>

          <div className="mb-6 flex flex-wrap gap-2">
            {["All", "Pending", "Under Review", "Resolved", "Dismissed"].map(
              (item) => (
                <button
                  key={item}
                  onClick={() => setFilter(item)}
                  className={`rounded-lg px-4 py-2 text-sm font-semibold ${
                    filter === item
                      ? "bg-blue-600 text-white"
                      : "bg-slate-100 text-slate-600"
                  }`}
                >
                  {item}
                </button>
              )
            )}
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[850px] text-left">
              <thead>
                <tr className="border-b bg-slate-50 text-sm text-slate-500">
                  <th className="p-4">Report ID</th>
                  <th className="p-4">Reported User</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Priority</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Action</th>
                </tr>
              </thead>

              <tbody>
                {filteredReports.map((report) => (
                  <tr key={report.id} className="border-b hover:bg-slate-50">
                    <td className="p-4 font-semibold">
                      #RPT-{report.id.toString().padStart(4, "0")}
                    </td>

                    <td className="p-4">
                      <p className="font-semibold text-slate-800">
                        {report.reportedUser}
                      </p>
                      <p className="text-xs text-slate-500">
                        By {report.reporter}
                      </p>
                    </td>

                    <td className="p-4 text-sm">{report.category}</td>

                    <td className="p-4">
                      <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700">
                        {report.priority}
                      </span>
                    </td>

                    <td className="p-4">
                      <span className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusStyle(report.status)}`}>
                        {report.status}
                      </span>
                    </td>

                    <td className="p-4">
                      <button
                        onClick={() => setSelected(report)}
                        className="rounded-lg bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700"
                      >
                        Review
                      </button>
                    </td>
                  </tr>
                ))}

                {filteredReports.length === 0 && (
                  <tr>
                    <td colSpan={6} className="p-8 text-center text-slate-500">
                      No reports found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

        {selected && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div role="dialog" aria-modal="true" aria-label="Report Details" className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl">
              <div className="mb-5 flex justify-between">
                <h2 className="text-xl font-bold">Report Details</h2>
                <button
                  onClick={() => setSelected(null)}
                  className="text-2xl text-gray-500"
                >
                  ×
                </button>
              </div>

              <div className="space-y-3 rounded-xl bg-slate-50 p-4">
                <p><strong>Reported User:</strong> {selected.reportedUser}</p>
                <p><strong>Reporter:</strong> {selected.reporter}</p>
                <p><strong>Category:</strong> {selected.category}</p>
                <p><strong>Date:</strong> {selected.date}</p>
                <p><strong>Description:</strong> {selected.description}</p>
                <p><strong>Priority:</strong> {selected.priority}</p>
                <p><strong>Status:</strong> {selected.status}</p>
              </div>

              <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                <button
                  onClick={() => updateStatus(selected.id, "Under Review")}
                  className="rounded-lg bg-blue-600 p-3 font-semibold text-white"
                >
                  Start Investigation
                </button>

                <button
                  onClick={() => updateStatus(selected.id, "Resolved")}
                  className="rounded-lg bg-green-600 p-3 font-semibold text-white"
                >
                  Mark Resolved
                </button>

                <button
                  onClick={() => updateStatus(selected.id, "Dismissed")}
                  className="rounded-lg border p-3 font-semibold text-gray-700"
                >
                  Dismiss Report
                </button>

                <button
                  onClick={() => deleteReport(selected.id)}
                  className="rounded-lg border border-red-200 p-3 font-semibold text-red-600"
                >
                  Delete Report
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}