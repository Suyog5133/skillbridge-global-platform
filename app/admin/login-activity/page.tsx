
"use client";

import { useState } from "react";

const initialLogs = [
  { id: 1, user: "Alex Johnson", email: "alex@example.com", role: "Candidate", ip: "192.168.1.10", device: "Chrome / Windows", action: "Login", status: "Success", time: "04 Nov 2026, 10:30 AM" },
  { id: 2, user: "Sarah Miller", email: "sarah@example.com", role: "Freelancer", ip: "192.168.1.15", device: "Safari / Mac", action: "Login", status: "Success", time: "04 Nov 2026, 10:15 AM" },
  { id: 3, user: "Unknown User", email: "unknown@example.com", role: "Unknown", ip: "103.45.22.10", device: "Firefox / Linux", action: "Login", status: "Failed", time: "04 Nov 2026, 09:50 AM" },
  { id: 4, user: "David Smith", email: "david@example.com", role: "Company", ip: "192.168.1.20", device: "Chrome / Android", action: "Logout", status: "Success", time: "04 Nov 2026, 09:30 AM" },
  { id: 5, user: "Emma Wilson", email: "emma@example.com", role: "Student", ip: "192.168.1.25", device: "Edge / Windows", action: "Login", status: "Failed", time: "04 Nov 2026, 09:00 AM" },
];

export default function LoginActivityPage() {
  const [logs] = useState(initialLogs);
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");

  const filteredLogs = logs.filter((log) => {
    const matchesFilter = filter === "All" || log.status === filter;
    const matchesSearch = `${log.user} ${log.email} ${log.ip}`
      .toLowerCase()
      .includes(search.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  return (
    <main className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl">
        <p className="text-sm font-semibold text-blue-600">
          ADMINISTRATION / LOGIN ACTIVITY
        </p>

        <h1 className="mt-2 text-3xl font-bold text-slate-900">
          System Activity & Login History
        </h1>

        <p className="mt-2 text-slate-500">
          Monitor user authentication activity and login attempts.
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: "Total Activities", value: logs.length },
            { label: "Successful Logins", value: logs.filter(l => l.action === "Login" && l.status === "Success").length },
            { label: "Failed Attempts", value: logs.filter(l => l.status === "Failed").length },
            { label: "Logout Events", value: logs.filter(l => l.action === "Logout").length },
          ].map((item) => (
            <div key={item.label} className="rounded-2xl bg-white p-5 shadow-sm">
              <p className="text-sm text-slate-500">{item.label}</p>
              <h2 className="mt-2 text-3xl font-bold text-slate-900">
                {item.value}
              </h2>
            </div>
          ))}
        </div>

        <section className="mt-8 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-lg font-bold text-slate-900">
              Login Activity Records
            </h2>

            <div className="flex flex-col gap-3 sm:flex-row">
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search user, email or IP..."
                className="rounded-lg border border-slate-300 px-4 py-2.5 text-sm"
              />

              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm"
              >
                <option>All</option>
                <option>Success</option>
                <option>Failed</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[950px] text-left text-sm">
              <thead className="bg-slate-50 text-slate-500">
                <tr>
                  <th className="p-4">User</th>
                  <th className="p-4">Role</th>
                  <th className="p-4">IP Address</th>
                  <th className="p-4">Device</th>
                  <th className="p-4">Action</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Time</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {filteredLogs.map((log) => (
                  <tr key={log.id}>
                    <td className="p-4">
                      <p className="font-semibold text-slate-900">{log.user}</p>
                      <p className="text-xs text-slate-500">{log.email}</p>
                    </td>
                    <td className="p-4 text-slate-600">{log.role}</td>
                    <td className="p-4 font-mono text-slate-600">{log.ip}</td>
                    <td className="p-4 text-slate-600">{log.device}</td>
                    <td className="p-4 text-slate-600">{log.action}</td>
                    <td className="p-4">
                      <span className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        log.status === "Success"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}>
                        {log.status}
                      </span>
                    </td>
                    <td className="p-4 text-slate-500">{log.time}</td>
                  </tr>
                ))}

                {filteredLogs.length === 0 && (
                  <tr>
                    <td colSpan={7} className="p-8 text-center text-slate-500">
                      No activity records found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

        <div className="mt-6 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
          Security note: These are sample records, not real user activity.
          Production login logs must be generated server-side, protected from
          tampering and retained according to the platform&apos;s privacy policy.
        </div>
      </div>
    </main>
  );
}
