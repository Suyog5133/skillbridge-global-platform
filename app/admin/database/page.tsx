
"use client";

import { useState } from "react";

type Backup = {
  id: number;
  name: string;
  date: string;
  size: string;
  status: "Completed" | "Failed" | "In Progress";
};

const initialBackups: Backup[] = [
  { id: 1, name: "Full Database Backup", date: "2026-11-04 09:30", size: "2.4 GB", status: "Completed" },
  { id: 2, name: "User Data Backup", date: "2026-11-03 18:00", size: "850 MB", status: "Completed" },
  { id: 3, name: "Company Data Backup", date: "2026-11-02 12:00", size: "420 MB", status: "Completed" },
  { id: 4, name: "Scheduled Backup", date: "2026-11-01 10:00", size: "1.8 GB", status: "Failed" },
];

export default function AdminDatabasePage() {
  const [backups, setBackups] = useState(initialBackups);
  const [autoBackup, setAutoBackup] = useState(true);
  const [search, setSearch] = useState("");
  const [notice, setNotice] = useState("");

  const completed = backups.filter((b) => b.status === "Completed").length;
  const failed = backups.filter((b) => b.status === "Failed").length;

  function createBackup() {
    const newBackup: Backup = {
      id: Date.now(),
      name: "Manual Database Backup",
      date: new Date().toLocaleString(),
      size: "Calculating...",
      status: "In Progress",
    };

    setBackups((current) => [newBackup, ...current]);
    setNotice("Demo backup record created. No real database backup was performed.");

    window.setTimeout(() => {
      setBackups((current) =>
        current.map((b) =>
          b.id === newBackup.id
            ? { ...b, size: "2.5 GB", status: "Completed" }
            : b
        )
      );
    }, 1500);
  }

  const filtered = backups.filter((b) =>
    b.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-slate-50 p-4 md:p-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <p className="text-sm font-semibold text-blue-600">
              ADMIN PANEL / SYSTEM MANAGEMENT
            </p>
            <h1 className="mt-2 text-3xl font-bold text-slate-900">
              Database & Backup Monitoring
            </h1>
            <p className="mt-2 text-slate-500">
              Monitor database status, backups, and storage information.
            </p>
          </div>

          <button
            onClick={createBackup}
            className="rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700"
          >
            + Create Backup
          </button>
        </div>

        <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: "Database Status", value: "Demo Online", color: "text-green-600" },
            { label: "Total Backups", value: backups.length, color: "text-blue-600" },
            { label: "Completed Backups", value: completed, color: "text-green-600" },
            { label: "Failed Backups", value: failed, color: "text-red-600" },
          ].map((item) => (
            <div key={item.label} className="rounded-2xl border bg-white p-5 shadow-sm">
              <p className="text-sm text-slate-500">{item.label}</p>
              <h2 className={`mt-2 text-2xl font-bold ${item.color}`}>
                {item.value}
              </h2>
            </div>
          ))}
        </div>

        <div className="mb-6 grid gap-5 lg:grid-cols-2">
          <section className="rounded-2xl border bg-white p-6 shadow-sm">
            <h2 className="text-lg font-bold text-slate-900">Storage Overview</h2>
            <div className="mt-5 flex items-center justify-between text-sm">
              <span className="text-slate-500">Demo storage usage</span>
              <strong>68%</strong>
            </div>
            <div className="mt-3 h-3 overflow-hidden rounded-full bg-slate-100">
              <div className="h-full w-[68%] rounded-full bg-blue-600" />
            </div>
            <div className="mt-3 flex justify-between text-xs text-slate-500">
              <span>68 GB used</span>
              <span>100 GB capacity</span>
            </div>
            <p className="mt-5 text-xs text-slate-400">
              Sample values only. Actual storage usage is not connected.
            </p>
          </section>

          <section className="rounded-2xl border bg-white p-6 shadow-sm">
            <h2 className="text-lg font-bold text-slate-900">Backup Settings</h2>
            <div className="mt-5 flex items-center justify-between gap-4">
              <div>
                <p className="font-medium text-slate-800">Automatic Backups</p>
                <p className="text-sm text-slate-500">
                  Demo setting for scheduled backups
                </p>
              </div>
              <button
                onClick={() => setAutoBackup(!autoBackup)}
                className={`rounded-full px-4 py-2 text-sm font-semibold ${
                  autoBackup
                    ? "bg-green-100 text-green-700"
                    : "bg-slate-100 text-slate-600"
                }`}
              >
                {autoBackup ? "Enabled" : "Disabled"}
              </button>
            </div>
            <div className="mt-5 border-t pt-4 text-sm text-slate-500">
              Backup frequency: Daily (sample configuration)
            </div>
          </section>
        </div>

        <section className="rounded-2xl border bg-white p-5 shadow-sm">
          <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-xl font-bold text-slate-900">Backup History</h2>
              <p className="text-sm text-slate-500">Review previous backup records.</p>
            </div>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search backups..."
              className="rounded-xl border p-3 text-sm outline-none focus:border-blue-500"
            />
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[650px] text-left text-sm">
              <thead className="bg-slate-50 text-slate-500">
                <tr>
                  <th className="p-4">Backup Name</th>
                  <th className="p-4">Date</th>
                  <th className="p-4">Size</th>
                  <th className="p-4">Status</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((backup) => (
                  <tr key={backup.id} className="border-t">
                    <td className="p-4 font-semibold">{backup.name}</td>
                    <td className="p-4">{backup.date}</td>
                    <td className="p-4">{backup.size}</td>
                    <td className="p-4">
                      <span className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        backup.status === "Completed"
                          ? "bg-green-100 text-green-700"
                          : backup.status === "Failed"
                          ? "bg-red-100 text-red-700"
                          : "bg-amber-100 text-amber-700"
                      }`}>
                        {backup.status}
                      </span>
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={4} className="p-8 text-center text-slate-500">
                      No backup records found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

        {notice && (
          <div className="mt-5 rounded-xl border border-blue-200 bg-blue-50 p-4 text-sm text-blue-800">
            {notice}
            <button
              onClick={() => setNotice("")}
              className="ml-3 font-bold underline"
            >
              Dismiss
            </button>
          </div>
        )}

        <p className="mt-6 text-xs text-slate-400">
          Demo interface only. No real database connection, backup, restore, or
          storage monitoring is implemented. Production backups must be handled
          by secure backend infrastructure.
        </p>
      </div>
    </main>
  );
}

