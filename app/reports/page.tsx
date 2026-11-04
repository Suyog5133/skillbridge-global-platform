"use client";

import { useState } from "react";

type Report = {
  id: number;
  reporter: string;
  reportedUser: string;
  category: string;
  description: string;
  date: string;
  priority: "High" | "Medium" | "Low";
  status: "Pending" | "Under Review" | "Resolved" | "Dismissed";
};

const initialReports: Report[] = [
  {
    id: 1,
    reporter: "Alex Morgan",
    reportedUser: "Unknown Recruiter",
    category: "Fake Job Listing",
    description: "The recruiter is asking candidates to pay money before an interview.",
    date: "Today",
    priority: "High",
    status: "Pending",
  },
  {
    id: 2,
    reporter: "Priya Sharma",
    reportedUser: "John Smith",
    category: "Fake Profile",
    description: "The profile contains suspicious information and an unverified identity.",
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
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);

  const updateStatus = (
    id: number,
    status: Report["status"]
  ) => {
    setReports((current) =>
      current.map((report) =>
        report.id === id ? { ...report, status } : report
      )
    );
    setSelectedReport(null);
  };

  const deleteReport = (id: number) => {
    if (confirm("Are you sure you want to delete this report?")) {
      setReports((current) =>
        current.filter((report) => report.id !== id)
      );
      setSelectedReport(null);
    }
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

  const counts = {
    total: reports.length,
    pending: reports.filter((r) => r.status === "Pending").length,
    reviewing: reports.filter((r) => r.status === "Under Review").length,
    resolved: reports.filter((r) => r.status === "Resolved").length,
    dismissed: reports.filter((r) => r.status === "Dismissed").length,
  };

  const statusStyle = (status: Report["status"]) => {
    switch (status) {
      case "Resolved":
        return "bg-green-100 text-green-700";
      case "Dismissed":
        return "bg-slate-100 text-slate-600";
      case "Under Review":
        return "bg-blue-100 text-blue-700";
      default:
        return "bg-yellow-100 text-yellow-700";
    }
  };

  const priorityStyle = (priority: Report["priority"]) => {
    switch (priority) {
      case "High":
        return "bg-red-100 text-red-700";
      case "Medium":
        return "bg-orange-100 text-orange-700";
      default:
        return "bg-slate-100 text-slate-600";
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 p-4 md:p-8">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <p className="mb-2 text-sm font-semibold text-blue-600">
              ADMIN CONTROL PANEL
            </p>
            <h1 className="text-3xl font-bold text-slate-900">
              Reports & Abuse Management
            </h1>
            <p className="mt-2 text-slate-500">
              Review complaints and help keep SkillBridge Global safe.
            </p>
            <p className="mt-4 rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm text-amber-800">
              Demo data only: these sample reports do not represent real user reports.
            </p>
          </div>

          <a
            href="/dashboard/admin"
            className="w-fit rounded-lg border border-slate-200 bg-white px-5 py-3 font-semibold text-slate-700 hover:bg-slate-100"
          >
            ← Back to Dashboard
          </a>
        </div>

        {/* Statistics */}
        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {[
            { label: "Total Reports", value: counts.total, color: "text-blue-600" },
            { label: "Pending", value: counts.pending, color: "text-yellow-600" },
            { label: "Under Review", value: counts.reviewing, color: "text-indigo-600" },
            { label: "Resolved", value: counts.resolved, color: "text-green-600" },
            { label: "Dismissed", value: counts.dismissed, color: "text-slate-600" },
          ].map((item) => (
            <div
              key={item.label}
              className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <p className="text-sm text-slate-500">{item.label}</p>
              <h2 className={`mt-2 text-3xl font-bold ${item.color}`}>
                {item.value}
              </h2>
            </div>
          ))}
        </div>

        {/* Reports */}
        <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">

          <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="text-xl font-bold text-slate-900">
                Reported Activities
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Investigate reported users and platform activities.
              </p>
            </div>

            <input
              type="text"
              placeholder="Search reports..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500 lg:max-w-sm"
            />
          </div>

          {/* Filters */}
          <div className="mb-6 flex flex-wrap gap-2">
            {[
              "All",
              "Pending",
              "Under Review",
              "Resolved",
              "Dismissed",
            ].map((item) => (
              <button
                key={item}
                onClick={() => setFilter(item)}
                className={`rounded-lg px-4 py-2 text-sm font-semibold ${
                  filter === item
                    ? "bg-blue-600 text-white"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {item}
              </button>
            ))}
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full min-w-[950px] text-left">
              <thead>
                <tr className="border-b bg-slate-50 text-sm text-slate-500">
                  <th className="p-4">Report ID</th>
                  <th className="p-4">Reported User</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Priority</th>
                  <th className="p-4">Date</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Action</th>
                </tr>
              </thead>

              <tbody>
                {filteredReports.map((report) => (
                  <tr
                    key={report.id}
                    className="border-b last:border-0 hover:bg-slate-50"
                  >
                    <td className="p-4 font-semibold text-slate-700">
                      #RPT-{report.id.toString().padStart(4, "0")}
                    </td>

                    <td className="p-4">
                      <p className="font-semibold text-slate-900">
                        {report.reportedUser}
                      </p>
                      <p className="text-xs text-slate-500">
                        By {report.reporter}
                      </p>
                    </td>

                    <td className="p-4 text-sm text-slate-600">
                      {report.category}
                    </td>

                    <td className="p-4">
                      <span className={`rounded-full px-3 py-1 text-xs font-semibold ${priorityStyle(report.priority)}`}>
                        {report.priority}
                      </span>
                    </td>

                    <td className="p-4 text-sm text-slate-600">
                      {report.date}
                    </td>

                    <td className="p-4">
                      <span className={`rounded-full px-3 py-1 text-xs font-semibold ${statusStyle(report.status)}`}>
                        {report.status}
                      </span>
                    </td>

                    <td className="p-4">
                      <button
                        onClick={() => setSelectedReport(report)}
                        className="rounded-lg bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700 hover:bg-blue-100"
                      >
                        Review
                      </button>
                    </td>
                  </tr>
                ))}

                {filteredReports.length === 0 && (
                  <tr>
                    <td colSpan={7} className="p-10 text-center text-slate-500">
                      No reports found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

        {/* Report Details Modal */}
        {selectedReport && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div role="dialog" aria-modal="true" aria-label="Report Details" className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl">

              <div className="mb-5 flex items-center justify-between">
                <h2 className="text-xl font-bold text-slate-900">
                  Report Details
                </h2>
                <button
                  onClick={() => setSelectedReport(null)}
                  className="text-2xl text-slate-400 hover:text-slate-700"
                  aria-label="Close"
                >
                  ×
                </button>
              </div>

              <div className="space-y-4 rounded-xl bg-slate-50 p-4">
                <div>
                  <p className="text-xs text-slate-500">Report ID</p>
                  <p className="font-semibold text-slate-900">
                    #RPT-{selectedReport.id.toString().padStart(4, "0")}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-slate-500">Reported By</p>
                  <p className="font-semibold text-slate-900">
                    {selectedReport.reporter}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-slate-500">Reported User / Company</p>
                  <p className="font-semibold text-slate-900">
                    {selectedReport.reportedUser}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-slate-500">Category</p>
                  <p className="font-semibold text-slate-900">
                    {selectedReport.category}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-slate-500">Description</p>
                  <p className="text-sm leading-6 text-slate-700">
                    {selectedReport.description}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-slate-500">Priority</p>
                  <span className={`mt-1 inline-block rounded-full px-3 py-1 text-xs font-semibold ${priorityStyle(selectedReport.priority)}`}>
                    {selectedReport.priority}
                  </span>
                </div>

                <div>
                  <p className="text-xs text-slate-500">Current Status</p>
                  <span className={`mt-1 inline-block rounded-full px-3 py-1 text-xs font-semibold ${statusStyle(selectedReport.status)}`}>
                    {selectedReport.status}
                  </span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                <button
                  onClick={() => updateStatus(selectedReport.id, "Under Review")}
                  className="rounded-lg bg-blue-600 px-4 py-3 font-semibold text-white hover:bg-blue-700"
                >
                  Start Investigation
                </button>

                <button
                  onClick={() => updateStatus(selectedReport.id, "Resolved")}
                  className="rounded-lg bg-green-600 px-4 py-3 font-semibold text-white hover:bg-green-700"
                >
                  Mark Resolved
                </button>

                <button
                  onClick={() => updateStatus(selectedReport.id, "Dismissed")}
                  className="rounded-lg border border-slate-300 px-4 py-3 font-semibold text-slate-600 hover:bg-slate-100"
                >
                  Dismiss Report
                </button>

                <button
                  onClick={() => deleteReport(selectedReport.id)}
                  className="rounded-lg border border-red-200 px-4 py-3 font-semibold text-red-600 hover:bg-red-50"
                >
                  Delete Report
                </button>
              </div>

            </div>
          </div>
        )}

        <p className="mt-5 text-center text-xs text-slate-400">
          SkillBridge Global · Trust & Safety Administration
        </p>
      </div>
    </main>
  );
}