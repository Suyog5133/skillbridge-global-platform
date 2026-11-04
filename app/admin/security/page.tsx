"use client";

import { useState } from "react";

type SecurityEvent = {
  id: number;
  user: string;
  email: string;
  event: string;
  location: string;
  device: string;
  time: string;
  status: "Safe" | "Suspicious" | "Blocked";
};

const initialEvents: SecurityEvent[] = [
  {
    id: 1,
    user: "Alex Johnson",
    email: "alex@example.com",
    event: "Successful Login",
    location: "United States",
    device: "Chrome / Windows",
    time: "04 Nov 2026, 10:30 AM",
    status: "Safe",
  },
  {
    id: 2,
    user: "Unknown User",
    email: "unknown@example.com",
    event: "Multiple Failed Login Attempts",
    location: "Unknown Location",
    device: "Firefox / Linux",
    time: "04 Nov 2026, 09:45 AM",
    status: "Suspicious",
  },
  {
    id: 3,
    user: "Priya Sharma",
    email: "priya@example.com",
    event: "Password Changed",
    location: "India",
    device: "Chrome / Android",
    time: "04 Nov 2026, 09:10 AM",
    status: "Safe",
  },
  {
    id: 4,
    user: "Suspicious Account",
    email: "risk@example.com",
    event: "Unusual Login Activity",
    location: "Unknown Location",
    device: "Unknown Device",
    time: "03 Nov 2026, 08:20 PM",
    status: "Suspicious",
  },
];

export default function AdminSecurityPage() {
  const [events, setEvents] = useState(initialEvents);
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<SecurityEvent | null>(null);

  const [twoFactor, setTwoFactor] = useState(true);
  const [loginAlerts, setLoginAlerts] = useState(true);
  const [accountProtection, setAccountProtection] = useState(true);

  const filteredEvents = events.filter((event) => {
    const matchesSearch =
      event.user.toLowerCase().includes(search.toLowerCase()) ||
      event.email.toLowerCase().includes(search.toLowerCase()) ||
      event.event.toLowerCase().includes(search.toLowerCase());

    return matchesSearch &&
      (filter === "All" || event.status === filter);
  });

  const suspicious = events.filter(
    (event) => event.status === "Suspicious"
  ).length;

  const blocked = events.filter(
    (event) => event.status === "Blocked"
  ).length;

  const safe = events.filter(
    (event) => event.status === "Safe"
  ).length;

  function updateStatus(id: number, status: SecurityEvent["status"]) {
    setEvents((previous) =>
      previous.map((event) =>
        event.id === id ? { ...event, status } : event
      )
    );

    setSelected((previous) =>
      previous?.id === id ? { ...previous, status } : previous
    );
  }

  function exportLogs() {
    const headers = [
      "User",
      "Email",
      "Event",
      "Location",
      "Device",
      "Time",
      "Status",
    ];

    const rows = filteredEvents.map((event) => [
      event.user,
      event.email,
      event.event,
      event.location,
      event.device,
      event.time,
      event.status,
    ]);

    const csv = [headers, ...rows]
      .map((row) =>
        row.map((value) =>
          `"${String(value).replace(/"/g, '""')}"`
        ).join(",")
      )
      .join("\n");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "skillbridge-security-logs.csv";
    link.click();

    URL.revokeObjectURL(url);
  }

  const statusStyle = (status: SecurityEvent["status"]) => {
    if (status === "Safe") return "bg-green-100 text-green-700";
    if (status === "Suspicious") return "bg-amber-100 text-amber-700";
    return "bg-red-100 text-red-700";
  };

  return (
    <main className="min-h-screen bg-slate-50 p-4 md:p-8">
      <div className="mx-auto max-w-7xl">

        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <p className="text-sm font-bold text-blue-600">
              ADMIN / SECURITY
            </p>
            <h1 className="mt-2 text-3xl font-bold text-slate-900">
              Security & Risk Monitoring
            </h1>
            <p className="mt-2 text-slate-500">
              Monitor account security and suspicious platform activity.
            </p>
          </div>

          <button
            onClick={exportLogs}
            className="rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700"
          >
            Export Security Logs
          </button>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: "Total Security Events", value: events.length, color: "text-blue-600" },
            { label: "Safe Events", value: safe, color: "text-green-600" },
            { label: "Suspicious Events", value: suspicious, color: "text-amber-600" },
            { label: "Blocked Events", value: blocked, color: "text-red-600" },
          ].map((stat) => (
            <div key={stat.label} className="rounded-2xl border bg-white p-5 shadow-sm">
              <p className="text-sm text-slate-500">{stat.label}</p>
              <h2 className={`mt-3 text-3xl font-bold ${stat.color}`}>
                {stat.value}
              </h2>
            </div>
          ))}
        </div>

        <section className="mt-8 rounded-2xl border bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900">
            Security Controls
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Platform security configuration preview.
          </p>

          <div className="mt-5 divide-y">
            {[
              {
                title: "Two-Factor Authentication",
                description: "Require an additional verification step.",
                value: twoFactor,
                change: setTwoFactor,
              },
              {
                title: "Login Alerts",
                description: "Enable alerts for account login activity.",
                value: loginAlerts,
                change: setLoginAlerts,
              },
              {
                title: "Account Protection",
                description: "Enable additional account protection controls.",
                value: accountProtection,
                change: setAccountProtection,
              },
            ].map((control) => (
              <div
                key={control.title}
                className="flex items-center justify-between gap-4 py-5"
              >
                <div>
                  <h3 className="font-semibold text-slate-800">
                    {control.title}
                  </h3>
                  <p className="mt-1 text-sm text-slate-500">
                    {control.description}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => control.change(!control.value)}
                  aria-label={control.title}
                  aria-pressed={control.value}
                  className={`relative h-7 w-12 shrink-0 rounded-full transition ${
                    control.value ? "bg-blue-600" : "bg-slate-300"
                  }`}
                >
                  <span
                    className={`absolute top-1 h-5 w-5 rounded-full bg-white transition ${
                      control.value ? "left-6" : "left-1"
                    }`}
                  />
                </button>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-8 rounded-2xl border bg-white p-6 shadow-sm">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
            <div>
              <h2 className="text-xl font-bold text-slate-900">
                Security Activity Logs
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Review login attempts and suspicious activities.
              </p>
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-3 md:flex-row">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search user, email or event..."
              className="flex-1 rounded-xl border px-4 py-3 outline-none focus:border-blue-500"
            />

            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="rounded-xl border px-4 py-3"
            >
              <option>All</option>
              <option>Safe</option>
              <option>Suspicious</option>
              <option>Blocked</option>
            </select>
          </div>

          <div className="mt-5 overflow-x-auto">
            <table className="w-full min-w-[850px] text-left">
              <thead>
                <tr className="border-b bg-slate-50 text-sm text-slate-500">
                  <th className="p-4">User</th>
                  <th className="p-4">Activity</th>
                  <th className="p-4">Location</th>
                  <th className="p-4">Device</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Action</th>
                </tr>
              </thead>

              <tbody>
                {filteredEvents.map((event) => (
                  <tr key={event.id} className="border-b text-sm">
                    <td className="p-4">
                      <p className="font-semibold text-slate-800">
                        {event.user}
                      </p>
                      <p className="text-xs text-slate-400">
                        {event.email}
                      </p>
                    </td>

                    <td className="p-4 text-slate-600">
                      {event.event}
                      <p className="mt-1 text-xs text-slate-400">
                        {event.time}
                      </p>
                    </td>

                    <td className="p-4 text-slate-600">
                      {event.location}
                    </td>

                    <td className="p-4 text-slate-600">
                      {event.device}
                    </td>

                    <td className="p-4">
                      <span className={`rounded-full px-3 py-1 text-xs font-semibold ${statusStyle(event.status)}`}>
                        {event.status}
                      </span>
                    </td>

                    <td className="p-4">
                      <button
                        onClick={() => setSelected(event)}
                        className="rounded-lg bg-blue-50 px-3 py-2 text-xs font-semibold text-blue-700"
                      >
                        Investigate
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filteredEvents.length === 0 && (
              <p className="py-10 text-center text-slate-500">
                No security events found.
              </p>
            )}
          </div>
        </section>

        <section className="mt-8 rounded-2xl border border-amber-200 bg-amber-50 p-5">
          <h2 className="font-bold text-amber-900">
            Important Security Notice
          </h2>
          <p className="mt-2 text-sm leading-6 text-amber-800">
            This dashboard currently displays sample security records.
            Real login monitoring, IP tracking, threat detection,
            two-factor authentication and account blocking require
            backend security services.
          </p>
        </section>

        {selected && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div role="dialog" aria-modal="true" aria-label="Investigate Activity" className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold">Investigate Activity</h2>
                <button
                  onClick={() => setSelected(null)}
                  className="text-2xl text-slate-400"
                >
                  ×
                </button>
              </div>

              <div className="mt-5 space-y-3 text-sm">
                <p><strong>User:</strong> {selected.user}</p>
                <p><strong>Email:</strong> {selected.email}</p>
                <p><strong>Activity:</strong> {selected.event}</p>
                <p><strong>Location:</strong> {selected.location}</p>
                <p><strong>Device:</strong> {selected.device}</p>
                <p><strong>Time:</strong> {selected.time}</p>
                <p><strong>Status:</strong> {selected.status}</p>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <button
                  onClick={() => updateStatus(selected.id, "Safe")}
                  className="rounded-xl bg-green-100 p-3 font-semibold text-green-700"
                >
                  Mark Safe
                </button>

                <button
                  onClick={() => updateStatus(selected.id, "Blocked")}
                  className="rounded-xl bg-red-100 p-3 font-semibold text-red-700"
                >
                  Mark Blocked
                </button>
              </div>

              <button
                onClick={() => setSelected(null)}
                className="mt-3 w-full rounded-xl bg-slate-100 p-3 font-semibold text-slate-700"
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