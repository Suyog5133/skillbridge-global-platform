"use client";

import { useState } from "react";

type EngagementPeriod = "7 days" | "30 days" | "90 days" | "12 months";

const periodMetrics: Record<
  EngagementPeriod,
  {
    activeUsers: number;
    registrations: number;
    successfulLogins: number;
    activity: Array<{ label: string; registrations: number; logins: number }>;
  }
> = {
  "7 days": {
    activeUsers: 2840,
    registrations: 386,
    successfulLogins: 15420,
    activity: [
      { label: "Mon", registrations: 38, logins: 118 },
      { label: "Tue", registrations: 52, logins: 145 },
      { label: "Wed", registrations: 46, logins: 132 },
      { label: "Thu", registrations: 61, logins: 166 },
      { label: "Fri", registrations: 54, logins: 159 },
      { label: "Sat", registrations: 72, logins: 188 },
      { label: "Sun", registrations: 63, logins: 175 },
    ],
  },
  "30 days": {
    activeUsers: 9120,
    registrations: 1482,
    successfulLogins: 61840,
    activity: [
      { label: "Week 1", registrations: 310, logins: 1220 },
      { label: "Week 2", registrations: 352, logins: 1390 },
      { label: "Week 3", registrations: 387, logins: 1610 },
      { label: "Week 4", registrations: 433, logins: 1790 },
    ],
  },
  "90 days": {
    activeUsers: 18760,
    registrations: 4280,
    successfulLogins: 184500,
    activity: [
      { label: "Month 1", registrations: 1210, logins: 51200 },
      { label: "Month 2", registrations: 1390, logins: 59800 },
      { label: "Month 3", registrations: 1680, logins: 73500 },
    ],
  },
  "12 months": {
    activeUsers: 42650,
    registrations: 18920,
    successfulLogins: 764300,
    activity: [
      { label: "Q1", registrations: 3820, logins: 148000 },
      { label: "Q2", registrations: 4360, logins: 177300 },
      { label: "Q3", registrations: 4980, logins: 202000 },
      { label: "Q4", registrations: 5760, logins: 237000 },
    ],
  },
};

const roleDistribution = [
  { role: "Candidates", users: 21500, percent: 45, color: "bg-blue-600" },
  { role: "Students", users: 14300, percent: 30, color: "bg-indigo-500" },
  { role: "Freelancers", users: 8600, percent: 18, color: "bg-green-500" },
  { role: "Companies", users: 3340, percent: 7, color: "bg-orange-500" },
];

const loginActivity = [
  { id: 1, user: "Aarav Sharma", role: "Candidate", country: "India", action: "Successful login", time: "Nov 04, 2026 · 10:42 UTC", status: "Success" },
  { id: 2, user: "Sofia Martin", role: "Freelancer", country: "Spain", action: "Successful login", time: "Nov 04, 2026 · 10:36 UTC", status: "Success" },
  { id: 3, user: "Northstar Health", role: "Company", country: "United States", action: "Successful login", time: "Nov 04, 2026 · 10:21 UTC", status: "Success" },
  { id: 4, user: "Noah Williams", role: "Candidate", country: "United States", action: "Failed login attempt", time: "Nov 04, 2026 · 10:08 UTC", status: "Failed" },
  { id: 5, user: "Amara Okafor", role: "Student", country: "Nigeria", action: "Successful login", time: "Nov 04, 2026 · 09:54 UTC", status: "Success" },
  { id: 6, user: "Liam Chen", role: "Freelancer", country: "Singapore", action: "Successful login", time: "Nov 04, 2026 · 09:42 UTC", status: "Success" },
];

const formatter = new Intl.NumberFormat("en-US");

export default function AdminUserEngagementPage() {
  const [period, setPeriod] = useState<EngagementPeriod>("30 days");
  const [loginFilter, setLoginFilter] = useState("All");
  const metrics = periodMetrics[period];
  const maxActivity = Math.max(
    ...metrics.activity.flatMap((item) => [item.registrations, item.logins])
  );
  const filteredLogins = loginActivity.filter(
    (item) => loginFilter === "All" || item.status === loginFilter
  );

  return (
    <main className="min-h-screen bg-slate-50 p-4 md:p-8">
      <div className="mx-auto max-w-7xl space-y-6">
        <header className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-bold text-blue-600">
              SKILLBRIDGE GLOBAL · ADMIN ANALYTICS
            </p>
            <h1 className="mt-2 text-3xl font-bold text-slate-900">
              User Activity & Engagement
            </h1>
            <p className="mt-2 text-slate-500">
              Monitor platform registrations, active users, logins, and role distribution.
            </p>
          </div>
          <label className="w-full sm:w-auto">
            <span className="mb-1.5 block text-xs font-medium text-slate-500">
              Reporting period
            </span>
            <select
              value={period}
              onChange={(event) =>
                setPeriod(event.target.value as EngagementPeriod)
              }
              className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm font-medium text-slate-700 sm:min-w-44"
            >
              {(Object.keys(periodMetrics) as EngagementPeriod[]).map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </label>
        </header>

        <section
          aria-label={`Engagement summary for ${period}`}
          className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
        >
          {[
            ["Active Users", metrics.activeUsers, "text-blue-700", "Active in selected period"],
            ["New Registrations", metrics.registrations, "text-green-600", `Last ${period}`],
            ["Successful Logins", metrics.successfulLogins, "text-indigo-600", `Last ${period}`],
            ["Registered Roles", roleDistribution.length, "text-slate-900", "Candidate, student, freelancer, company"],
          ].map(([label, count, color, caption]) => (
            <div key={label} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-sm text-slate-500">{label}</p>
              <p className={`mt-2 text-3xl font-bold ${color}`}>{formatter.format(Number(count))}</p>
              <p className="mt-1 text-xs text-slate-400">{caption}</p>
            </div>
          ))}
        </section>

        <div className="grid gap-6 xl:grid-cols-[1.4fr_1fr]">
          <section className="rounded-xl border border-slate-200 bg-white p-5 md:p-6">
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Registration & Login Activity
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Relative activity values for the selected reporting period.
              </p>
            </div>
            <div className="mt-6 flex flex-wrap gap-4 text-xs text-slate-600">
              <span className="flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-sm bg-blue-600" />Registrations</span>
              <span className="flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-sm bg-indigo-300" />Login activity</span>
            </div>
            <div className="mt-6 flex h-64 items-end gap-3 border-b border-l border-slate-200 px-3 pb-2 sm:gap-5">
              {metrics.activity.map((item) => (
                <div key={item.label} className="flex h-full min-w-0 flex-1 flex-col items-center justify-end">
                  <div className="flex h-[88%] w-full items-end justify-center gap-1">
                    <div
                      title={`${formatter.format(item.registrations)} registrations`}
                      className="w-2/5 max-w-8 rounded-t bg-blue-600"
                      style={{ height: `${Math.max(5, (item.registrations / maxActivity) * 100)}%` }}
                    />
                    <div
                      title={`${formatter.format(item.logins)} login activity`}
                      className="w-2/5 max-w-8 rounded-t bg-indigo-300"
                      style={{ height: `${Math.max(5, (item.logins / maxActivity) * 100)}%` }}
                    />
                  </div>
                  <span className="mt-2 truncate text-[11px] text-slate-500 sm:text-xs">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
            <p className="mt-3 text-xs text-slate-400">
              Demo analytics visualization; login events are not fetched from production user accounts.
            </p>
          </section>

          <section className="rounded-xl border border-slate-200 bg-white p-5 md:p-6">
            <h2 className="text-lg font-bold text-slate-900">Role Distribution</h2>
            <p className="mt-1 text-sm text-slate-500">
              Share of registered platform account types.
            </p>
            <div className="mt-6 space-y-5">
              {roleDistribution.map((item) => (
                <div key={item.role}>
                  <div className="mb-2 flex items-center justify-between gap-3 text-sm">
                    <span className="font-medium text-slate-700">{item.role}</span>
                    <span className="text-slate-500">{formatter.format(item.users)} · {item.percent}%</span>
                  </div>
                  <div className="h-2.5 overflow-hidden rounded-full bg-slate-100">
                    <div className={`h-full rounded-full ${item.color}`} style={{ width: `${item.percent}%` }} />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8 rounded-lg bg-slate-50 p-4">
              <p className="text-xs text-slate-500">Most represented role</p>
              <p className="mt-1 font-semibold text-slate-900">Candidates · 45% of demo accounts</p>
            </div>
          </section>
        </div>

        <section className="rounded-xl border border-slate-200 bg-white p-5 md:p-6">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <h2 className="text-lg font-bold text-slate-900">Recent Login Activity</h2>
              <p className="mt-1 text-sm text-slate-500">Sample activity metadata for monitoring engagement.</p>
            </div>
            <select value={loginFilter} onChange={(event) => setLoginFilter(event.target.value)} className="rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm">
              <option>All</option><option>Success</option><option>Failed</option>
            </select>
          </div>
          <div className="mt-5 overflow-x-auto">
            <table className="w-full min-w-[760px] text-left text-sm">
              <thead className="bg-slate-50 text-slate-500"><tr><th className="p-3 font-medium">User</th><th className="p-3 font-medium">Role</th><th className="p-3 font-medium">Country</th><th className="p-3 font-medium">Activity</th><th className="p-3 font-medium">Time (UTC)</th><th className="p-3 font-medium">Result</th></tr></thead>
              <tbody>{filteredLogins.map((item) => <tr key={item.id} className="border-t border-slate-100">
                <td className="p-3 font-semibold text-slate-800">{item.user}</td><td className="p-3 text-slate-600">{item.role}</td><td className="p-3 text-slate-600">{item.country}</td><td className="p-3 text-slate-600">{item.action}</td><td className="p-3 text-slate-500">{item.time}</td>
                <td className="p-3"><span className={`rounded-full px-3 py-1 text-xs font-semibold ${item.status === "Success" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>{item.status}</span></td>
              </tr>)}</tbody>
            </table>
          </div>
          {filteredLogins.length === 0 && <p className="py-8 text-center text-sm text-slate-500">No login records for this filter.</p>}
        </section>

        <p className="text-center text-xs text-slate-400">
          Demo engagement data only · No additional chart packages or backend data connections used.
        </p>
      </div>
    </main>
  );
}
