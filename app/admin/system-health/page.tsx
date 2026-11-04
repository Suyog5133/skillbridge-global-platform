
"use client";

import { useState } from "react";

const services = [
  { name: "Website Frontend", status: "Operational", uptime: "99.98%", response: "120 ms" },
  { name: "Authentication Service", status: "Operational", uptime: "99.95%", response: "180 ms" },
  { name: "Database Service", status: "Operational", uptime: "99.90%", response: "85 ms" },
  { name: "File Storage", status: "Operational", uptime: "99.85%", response: "210 ms" },
  { name: "Email Notifications", status: "Degraded", uptime: "98.20%", response: "650 ms" },
  { name: "Payment Gateway", status: "Operational", uptime: "99.99%", response: "150 ms" },
];

const initialLogs = [
  { id: 1, type: "Warning", message: "Email service response time is high", time: "14:20:10" },
  { id: 2, type: "Info", message: "Database connection successful", time: "13:45:32" },
  { id: 3, type: "Error", message: "Sample API request failed", time: "12:30:15" },
  { id: 4, type: "Info", message: "System health check completed", time: "11:15:40" },
];

export default function SystemHealthPage() {
  const [filter, setFilter] = useState("All");
  const [logs, setLogs] = useState(initialLogs);
  const [lastChecked, setLastChecked] = useState("Just now");

  const operational = services.filter(s => s.status === "Operational").length;
  const degraded = services.filter(s => s.status === "Degraded").length;
  const errors = logs.filter(l => l.type === "Error").length;

  const filteredLogs = logs.filter(
    log => filter === "All" || log.type === filter
  );

  function runHealthCheck() {
    setLastChecked(new Date().toLocaleTimeString());
    setLogs(current => [
      {
        id: Date.now(),
        type: "Info",
        message: "Demo health check requested",
        time: new Date().toLocaleTimeString(),
      },
      ...current,
    ]);
  }

  function clearLogs() {
    if (confirm("Clear all displayed demo logs?")) {
      setLogs([]);
    }
  }

  return (
    <main className="min-h-screen bg-slate-50 p-4 md:p-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <p className="text-sm font-semibold text-blue-600">
              ADMIN PANEL / SYSTEM MONITORING
            </p>
            <h1 className="mt-2 text-3xl font-bold text-slate-900">
              System Health & Monitoring
            </h1>
            <p className="mt-2 text-slate-500">
              Monitor platform services, performance and system activity.
            </p>
          </div>

          <button
            onClick={runHealthCheck}
            className="rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700"
          >
            Run Health Check
          </button>
        </div>

        <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: "Total Services", value: services.length, color: "text-blue-600" },
            { label: "Operational", value: operational, color: "text-green-600" },
            { label: "Degraded", value: degraded, color: "text-amber-600" },
            { label: "Error Logs", value: errors, color: "text-red-600" },
          ].map(item => (
            <div key={item.label} className="rounded-2xl border bg-white p-5 shadow-sm">
              <p className="text-sm text-slate-500">{item.label}</p>
              <h2 className={`mt-2 text-3xl font-bold ${item.color}`}>
                {item.value}
              </h2>
            </div>
          ))}
        </div>

        <section className="mb-6 rounded-2xl border bg-white p-6 shadow-sm">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold">Platform Services</h2>
              <p className="mt-1 text-sm text-slate-500">
                Current sample service status
              </p>
            </div>
            <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
              Demo Monitoring
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[650px] text-left text-sm">
              <thead className="bg-slate-50 text-slate-500">
                <tr>
                  <th className="p-4">Service</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Uptime</th>
                  <th className="p-4">Response Time</th>
                </tr>
              </thead>
              <tbody>
                {services.map(service => (
                  <tr key={service.name} className="border-t">
                    <td className="p-4 font-semibold">{service.name}</td>
                    <td className="p-4">
                      <span className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        service.status === "Operational"
                          ? "bg-green-100 text-green-700"
                          : "bg-amber-100 text-amber-700"
                      }`}>
                        {service.status}
                      </span>
                    </td>
                    <td className="p-4">{service.uptime}</td>
                    <td className="p-4">{service.response}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="rounded-2xl border bg-white p-6 shadow-sm">
          <div className="mb-5 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
            <div>
              <h2 className="text-xl font-bold">System Activity Logs</h2>
              <p className="mt-1 text-sm text-slate-500">
                Last checked: {lastChecked}
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              <select
                value={filter}
                onChange={e => setFilter(e.target.value)}
                className="rounded-lg border p-2 text-sm"
              >
                <option>All</option>
                <option>Info</option>
                <option>Warning</option>
                <option>Error</option>
              </select>
              <button
                onClick={clearLogs}
                className="rounded-lg border border-red-200 px-3 py-2 text-sm text-red-600"
              >
                Clear Logs
              </button>
            </div>
          </div>

          <div className="space-y-3">
            {filteredLogs.map(log => (
              <div key={log.id} className="flex flex-col justify-between gap-2 rounded-xl bg-slate-50 p-4 sm:flex-row sm:items-center">
                <div className="flex items-center gap-3">
                  <span className={`rounded-lg px-3 py-1 text-xs font-semibold ${
                    log.type === "Error"
                      ? "bg-red-100 text-red-700"
                      : log.type === "Warning"
                      ? "bg-amber-100 text-amber-700"
                      : "bg-blue-100 text-blue-700"
                  }`}>
                    {log.type}
                  </span>
                  <p className="text-sm text-slate-700">{log.message}</p>
                </div>
                <span className="text-xs text-slate-400">{log.time}</span>
              </div>
            ))}

            {filteredLogs.length === 0 && (
              <p className="py-8 text-center text-slate-500">
                No activity logs found.
              </p>
            )}
          </div>
        </section>

        <p className="mt-6 text-xs text-slate-400">
          Demo interface only. Uptime, response times and service statuses are
          sample values. Real monitoring requires backend health checks and
          infrastructure monitoring.
        </p>
      </div>
    </main>
  );
}
