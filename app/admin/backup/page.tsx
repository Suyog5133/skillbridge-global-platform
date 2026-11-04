
"use client";

import { useState } from "react";

type Backup = {
  id: number;
  name: string;
  type: string;
  size: string;
  date: string;
  status: string;
};

const initialBackups: Backup[] = [
  { id: 1, name: "Database Full Backup", type: "Full", size: "2.4 GB", date: "04 Nov 2026, 02:00 AM", status: "Completed" },
  { id: 2, name: "User Data Backup", type: "Incremental", size: "450 MB", date: "03 Nov 2026, 02:00 AM", status: "Completed" },
  { id: 3, name: "Company Data Backup", type: "Incremental", size: "320 MB", date: "02 Nov 2026, 02:00 AM", status: "Completed" },
  { id: 4, name: "Media Files Backup", type: "Full", size: "1.8 GB", date: "01 Nov 2026, 02:00 AM", status: "Completed" },
];

export default function BackupPage() {
  const [backups, setBackups] = useState(initialBackups);
  const [schedule, setSchedule] = useState("Daily");
  const [backupType, setBackupType] = useState("Full");
  const [notice, setNotice] = useState("");

  const createBackup = () => {
    const newBackup: Backup = {
      id: Date.now(),
      name: "Manual Backup",
      type: backupType,
      size: "Calculating...",
      date: new Date().toLocaleString(),
      status: "Demo Completed",
    };

    setBackups((current) => [newBackup, ...current]);
    setNotice("Demo backup record created. No actual data was copied.");
  };

  const removeBackup = (id: number) => {
    setBackups((current) => current.filter((backup) => backup.id !== id));
    setNotice("Demo backup record removed.");
  };

  return (
    <main className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl">
        <p className="text-sm font-semibold text-blue-600">
          ADMINISTRATION / BACKUP & RECOVERY
        </p>

        <h1 className="mt-2 text-3xl font-bold text-slate-900">
          Backup & Disaster Recovery
        </h1>

        <p className="mt-2 text-slate-500">
          Monitor backup records and configure recovery planning.
        </p>

        {notice && (
          <div className="mt-5 rounded-xl border border-blue-200 bg-blue-50 p-4 text-sm text-blue-700">
            {notice}
          </div>
        )}

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: "Backup Records", value: backups.length },
            { label: "Successful Backups", value: backups.filter(b => b.status === "Completed" || b.status === "Demo Completed").length },
            { label: "Failed Backups", value: "0" },
            { label: "Recovery Status", value: "Not Tested" },
          ].map((item) => (
            <div key={item.label} className="rounded-2xl bg-white p-5 shadow-sm">
              <p className="text-sm text-slate-500">{item.label}</p>
              <h2 className="mt-2 text-2xl font-bold text-slate-900">
                {item.value}
              </h2>
            </div>
          ))}
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-bold text-slate-900">
              Backup Configuration
            </h2>

            <div className="mt-5">
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Backup Schedule
              </label>
              <select
                value={schedule}
                onChange={(e) => setSchedule(e.target.value)}
                className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm"
              >
                <option>Hourly</option>
                <option>Daily</option>
                <option>Weekly</option>
                <option>Monthly</option>
              </select>
            </div>

            <div className="mt-5">
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Backup Type
              </label>
              <select
                value={backupType}
                onChange={(e) => setBackupType(e.target.value)}
                className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm"
              >
                <option>Full</option>
                <option>Incremental</option>
                <option>Differential</option>
              </select>
            </div>

            <button
              onClick={createBackup}
              className="mt-6 w-full rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700"
            >
              Create Demo Backup
            </button>

            <p className="mt-3 text-xs text-slate-400">
              Selected schedule: {schedule}
            </p>
          </section>

          <section className="rounded-2xl border border-blue-100 bg-blue-50 p-6">
            <h2 className="text-lg font-bold text-blue-900">
              Disaster Recovery Plan
            </h2>

            <div className="mt-5 space-y-4 text-sm text-blue-900">
              <div>
                <p className="font-semibold">1. Detect the incident</p>
                <p className="mt-1 text-blue-800">Identify the outage or data loss.</p>
              </div>
              <div>
                <p className="font-semibold">2. Protect the system</p>
                <p className="mt-1 text-blue-800">Secure affected services and data.</p>
              </div>
              <div>
                <p className="font-semibold">3. Restore backup</p>
                <p className="mt-1 text-blue-800">Recover data from verified backups.</p>
              </div>
              <div>
                <p className="font-semibold">4. Verify recovery</p>
                <p className="mt-1 text-blue-800">Test applications and data integrity.</p>
              </div>
              <div>
                <p className="font-semibold">5. Resume operations</p>
                <p className="mt-1 text-blue-800">Monitor the restored platform.</p>
              </div>
            </div>
          </section>
        </div>

        <section className="mt-8 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="p-5">
            <h2 className="text-lg font-bold text-slate-900">
              Backup History
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px] text-left text-sm">
              <thead className="bg-slate-50 text-slate-500">
                <tr>
                  <th className="p-4">Backup Name</th>
                  <th className="p-4">Type</th>
                  <th className="p-4">Size</th>
                  <th className="p-4">Date</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Action</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {backups.map((backup) => (
                  <tr key={backup.id}>
                    <td className="p-4 font-semibold text-slate-900">
                      {backup.name}
                    </td>
                    <td className="p-4 text-slate-600">{backup.type}</td>
                    <td className="p-4 text-slate-600">{backup.size}</td>
                    <td className="p-4 text-slate-500">{backup.date}</td>
                    <td className="p-4">
                      <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                        {backup.status}
                      </span>
                    </td>
                    <td className="p-4">
                      <button
                        onClick={() => removeBackup(backup.id)}
                        className="font-semibold text-red-600 hover:underline"
                      >
                        Remove Record
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <div className="mt-6 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
          Security notice: This is a frontend demonstration. It does not create
          real backups or restore data. Production backups must use secure
          server-side storage, encryption, access controls and regularly tested
          recovery procedures.
        </div>
      </div>
    </main>
  );
}
