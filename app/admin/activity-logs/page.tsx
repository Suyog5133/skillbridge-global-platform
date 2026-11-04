"use client";

import { useState } from "react";

type Activity = {
  id: number;
  user: string;
  role: string;
  action: string;
  category: string;
  details: string;
  date: string;
  status: "Success" | "Warning" | "Failed";
  ip: string;
};

const initialActivities: Activity[] = [
  {
    id: 1,
    user: "Admin User",
    role: "Administrator",
    action: "Approved Job",
    category: "Job Management",
    details: "Approved Frontend Developer job listing.",
    date: "Today, 10:30 AM",
    status: "Success",
    ip: "192.168.1.10",
  },
  {
    id: 2,
    user: "Priya Sharma",
    role: "Candidate",
    action: "Account Created",
    category: "Registration",
    details: "New candidate account registered.",
    date: "Today, 10:15 AM",
    status: "Success",
    ip: "192.168.1.15",
  },
  {
    id: 3,
    user: "Unknown User",
    role: "Unknown",
    action: "Login Attempt",
    category: "Security",
    details: "Multiple unsuccessful login attempts.",
    date: "Today, 09:50 AM",
    status: "Failed",
    ip: "203.0.113.25",
  },
  {
    id: 4,
    user: "TechNova Solutions",
    role: "Company",
    action: "Profile Submitted",
    category: "Verification",
    details: "Company submitted details for verification.",
    date: "Yesterday, 05:20 PM",
    status: "Success",
    ip: "192.168.1.22",
  },
  {
    id: 5,
    user: "Admin User",
    role: "Administrator",
    action: "Report Reviewed",
    category: "Trust & Safety",
    details: "Reviewed a suspicious job report.",
    date: "Yesterday, 03:40 PM",
    status: "Success",
    ip: "192.168.1.10",
  },
  {
    id: 6,
    user: "Unknown User",
    role: "Unknown",
    action: "Suspicious Activity",
    category: "Security",
    details: "Unusual account activity flagged for review.",
    date: "Yesterday, 02:10 PM",
    status: "Warning",
    ip: "198.51.100.12",
  },
  {
    id: 7,
    user: "Daniel Lee",
    role: "Freelancer",
    action: "Profile Updated",
    category: "Profile",
    details: "Freelancer updated professional information.",
    date: "2 days ago",
    status: "Success",
    ip: "192.168.1.30",
  },
];

export default function AdminActivityLogsPage() {
  const [activities, setActivities] = useState(initialActivities);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [selected, setSelected] = useState<Activity | null>(null);

  const filteredActivities = activities.filter((activity) => {
    const matchesFilter =
      filter === "All" ||
      activity.category === filter ||
      activity.status === filter;

    const matchesSearch =
      activity.user.toLowerCase().includes(search.toLowerCase()) ||
      activity.action.toLowerCase().includes(search.toLowerCase()) ||
      activity.category.toLowerCase().includes(search.toLowerCase()) ||
      activity.details.toLowerCase().includes(search.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  const successCount = activities.filter(
    (a) => a.status === "Success"
  ).length;

  const warningCount = activities.filter(
    (a) => a.status === "Warning"
  ).length;

  const failedCount = activities.filter(
    (a) => a.status === "Failed"
  ).length;

  const statusStyle = (status: Activity["status"]) => {
    if (status === "Success") return "bg-green-100 text-green-700";
    if (status === "Warning") return "bg-orange-100 text-orange-700";
    return "bg-red-100 text-red-700";
  };

  const exportLogs = () => {
    const headers = [
      "ID",
      "User",
      "Role",
      "Action",
      "Category",
      "Details",
      "Date",
      "Status",
      "IP",
    ];

    const rows = filteredActivities.map((a) =>
      [
        a.id,
        a.user,
        a.role,
        a.action,
        a.category,
        a.details,
        a.date,
        a.status,
        a.ip,
      ]
        .map((value) => `"${String(value).replace(/"/g, '""')}"`)
        .join(",")
    );

    const csv = [headers.join(","), ...rows].join("\n");
    const blob = new Blob([csv], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "skillbridge-activity-logs.csv";
    link.click();

    URL.revokeObjectURL(url);
  };

  const clearDemoLogs = () => {
    if (confirm("Clear all demo activity logs?")) {
      setActivities([]);
      setSelected(null);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 p-4 md:p-8">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <p className="text-sm font-bold text-blue-600">
              ADMIN CONTROL PANEL
            </p>

            <h1 className="mt-2 text-3xl font-bold text-slate-900">
              Activity Logs & Audit Trail
            </h1>

            <p className="mt-2 text-slate-500">
              Monitor user actions and platform security activities.
            </p>
          </div>

          <a
            href="/dashboard/admin"
            className="w-fit rounded-lg border bg-white px-5 py-3 font-semibold text-slate-700 hover:bg-slate-100"
          >
            ← Dashboard
          </a>
        </div>

        {/* Demo Notice */}
        <div className="mb-6 rounded-xl border border-orange-200 bg-orange-50 p-4">
          <p className="font-semibold text-orange-800">
            Demo Activity Logs
          </p>
          <p className="mt-1 text-sm text-orange-700">
            These are sample records. Real audit logs require backend
            event recording and protected storage.
          </p>
        </div>

        {/* Statistics */}
        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              title: "Total Activities",
              value: activities.length,
              color: "text-blue-600",
              icon: "📊",
            },
            {
              title: "Successful",
              value: successCount,
              color: "text-green-600",
              icon: "✓",
            },
            {
              title: "Warnings",
              value: warningCount,
              color: "text-orange-600",
              icon: "⚠",
            },
            {
              title: "Failed Activities",
              value: failedCount,
              color: "text-red-600",
              icon: "✕",
            },
          ].map((stat) => (
            <div
              key={stat.title}
              className="rounded-xl border bg-white p-5 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <p className="text-sm text-slate-500">{stat.title}</p>
                <span className="text-xl">{stat.icon}</span>
              </div>

              <h2 className={`mt-3 text-3xl font-bold ${stat.color}`}>
                {stat.value}
              </h2>
            </div>
          ))}
        </div>

        {/* Activity Table */}
        <section className="rounded-2xl border bg-white p-5 shadow-sm">

          <div className="mb-6 flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
            <div>
              <h2 className="text-xl font-bold text-slate-900">
                Platform Activity History
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Review and search recorded activities.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                onClick={exportLogs}
                className="rounded-lg bg-blue-600 px-4 py-3 text-sm font-semibold text-white hover:bg-blue-700"
              >
                ↓ Export CSV
              </button>

              <button
                onClick={clearDemoLogs}
                className="rounded-lg border border-red-200 px-4 py-3 text-sm font-semibold text-red-600 hover:bg-red-50"
              >
                Clear Demo Logs
              </button>
            </div>
          </div>

          {/* Search */}
          <div className="mb-5">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search user, action or activity..."
              className="w-full rounded-lg border px-4 py-3 outline-none focus:border-blue-500"
            />
          </div>

          {/* Filters */}
          <div className="mb-6 flex flex-wrap gap-2">
            {[
              "All",
              "Registration",
              "Job Management",
              "Verification",
              "Trust & Safety",
              "Profile",
              "Security",
              "Success",
              "Warning",
              "Failed",
            ].map((item) => (
              <button
                key={item}
                onClick={() => setFilter(item)}
                className={`rounded-lg px-3 py-2 text-sm font-semibold ${
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
                  <th className="p-4">User</th>
                  <th className="p-4">Action</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Date & Time</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Details</th>
                </tr>
              </thead>

              <tbody>
                {filteredActivities.map((activity) => (
                  <tr
                    key={activity.id}
                    className="border-b last:border-0 hover:bg-slate-50"
                  >
                    <td className="p-4">
                      <p className="font-semibold text-slate-800">
                        {activity.user}
                      </p>
                      <p className="text-xs text-slate-500">
                        {activity.role}
                      </p>
                    </td>

                    <td className="p-4 text-sm font-medium text-slate-700">
                      {activity.action}
                    </td>

                    <td className="p-4 text-sm text-slate-600">
                      {activity.category}
                    </td>

                    <td className="p-4 text-sm text-slate-500">
                      {activity.date}
                    </td>

                    <td className="p-4">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${statusStyle(
                          activity.status
                        )}`}
                      >
                        {activity.status}
                      </span>
                    </td>

                    <td className="p-4">
                      <button
                        onClick={() => setSelected(activity)}
                        className="rounded-lg bg-blue-50 px-3 py-2 text-sm font-semibold text-blue-700 hover:bg-blue-100"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}

                {filteredActivities.length === 0 && (
                  <tr>
                    <td
                      colSpan={6}
                      className="p-10 text-center text-slate-500"
                    >
                      No activity records found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

        {/* Details Modal */}
        {selected && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div role="dialog" aria-modal="true" aria-label="Activity Details" className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl">

              <div className="mb-5 flex items-center justify-between">
                <h2 className="text-xl font-bold text-slate-900">
                  Activity Details
                </h2>

                <button
                  onClick={() => setSelected(null)}
                  className="text-2xl text-slate-400 hover:text-slate-700"
                  aria-label="Close"
                >
                  ×
                </button>
              </div>

              <div className="space-y-4 rounded-xl bg-slate-50 p-4">
                <div>
                  <p className="text-xs text-slate-500">User</p>
                  <p className="font-semibold">{selected.user}</p>
                </div>

                <div>
                  <p className="text-xs text-slate-500">Role</p>
                  <p className="font-semibold">{selected.role}</p>
                </div>

                <div>
                  <p className="text-xs text-slate-500">Action</p>
                  <p className="font-semibold">{selected.action}</p>
                </div>

                <div>
                  <p className="text-xs text-slate-500">Category</p>
                  <p className="font-semibold">{selected.category}</p>
                </div>

                <div>
                  <p className="text-xs text-slate-500">Description</p>
                  <p className="text-sm text-slate-700">
                    {selected.details}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-slate-500">Date</p>
                  <p className="font-semibold">{selected.date}</p>
                </div>

                <div>
                  <p className="text-xs text-slate-500">IP Address (Demo)</p>
                  <p className="font-semibold">{selected.ip}</p>
                </div>

                <div>
                  <p className="text-xs text-slate-500">Status</p>
                  <span
                    className={`mt-1 inline-block rounded-full px-3 py-1 text-xs font-semibold ${statusStyle(
                      selected.status
                    )}`}
                  >
                    {selected.status}
                  </span>
                </div>
              </div>

              <button
                onClick={() => setSelected(null)}
                className="mt-5 w-full rounded-lg bg-blue-600 py-3 font-semibold text-white hover:bg-blue-700"
              >
                Close Details
              </button>
            </div>
          </div>
        )}

        <p className="mt-8 text-center text-xs text-slate-400">
          SkillBridge Global · Security & Audit Management
        </p>
      </div>
    </main>
  );
}