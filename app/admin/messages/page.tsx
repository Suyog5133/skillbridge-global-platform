"use client";

import { useState } from "react";

type ReportStatus = "Open" | "Reviewing" | "Resolved" | "Escalated";
type CommunicationReport = {
  id: number;
  reporter: string;
  reporterRole: string;
  reportedUser: string;
  reportedRole: string;
  category: string;
  reason: string;
  date: string;
  status: ReportStatus;
  risk: "High" | "Medium" | "Low";
};

const initialReports: CommunicationReport[] = [
  { id: 18001, reporter: "Candidate C-204", reporterRole: "Candidate", reportedUser: "Employer E-081", reportedRole: "Company", category: "Unwanted contact", reason: "Repeated contact reported after the user requested no further messages.", date: "Nov 04, 2026", status: "Open", risk: "Medium" },
  { id: 18002, reporter: "Freelancer F-112", reporterRole: "Freelancer", reportedUser: "Client CL-039", reportedRole: "Company", category: "Abusive language", reason: "Conversation flagged for personal attacks and harassment.", date: "Nov 03, 2026", status: "Reviewing", risk: "High" },
  { id: 18003, reporter: "Employer E-020", reporterRole: "Company", reportedUser: "Candidate C-087", reportedRole: "Candidate", category: "Spam", reason: "Multiple unsolicited promotional messages reported.", date: "Nov 02, 2026", status: "Open", risk: "Low" },
  { id: 18004, reporter: "Candidate C-302", reporterRole: "Candidate", reportedUser: "Client CL-021", reportedRole: "Company", category: "Threatening conduct", reason: "Potential threat described in a user report. Escalate according to safety policy.", date: "Nov 01, 2026", status: "Escalated", risk: "High" },
  { id: 18005, reporter: "Client CL-040", reporterRole: "Company", reportedUser: "Freelancer F-019", reportedRole: "Freelancer", category: "Suspicious link", reason: "A message containing a potentially unsafe external link was reported.", date: "Oct 30, 2026", status: "Resolved", risk: "Medium" },
];

const reportStatuses: ReportStatus[] = ["Open", "Reviewing", "Resolved", "Escalated"];

function reportStatusClass(status: ReportStatus) {
  if (status === "Resolved") return "bg-green-100 text-green-700";
  if (status === "Escalated") return "bg-red-100 text-red-700";
  if (status === "Reviewing") return "bg-blue-100 text-blue-700";
  return "bg-orange-100 text-orange-700";
}

export default function AdminMessagesPage() {
  const [reports, setReports] = useState(initialReports);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [selected, setSelected] = useState<CommunicationReport | null>(null);
  const filtered = reports.filter((report) => {
    const term = search.trim().toLowerCase();
    return (!term || [report.reporter, report.reportedUser, report.category, report.reason].some((value) => value.toLowerCase().includes(term))) &&
      (status === "All" || report.status === status);
  });

  function updateReport(report: CommunicationReport, next: ReportStatus) {
    if (next === "Escalated" && !window.confirm("Escalate this communication report to the trust and safety team?")) return;
    const updated = { ...report, status: next };
    setReports((items) => items.map((item) => item.id === report.id ? updated : item));
    setSelected(updated);
  }

  return (
    <main className="min-h-screen bg-slate-50 p-4 md:p-8"><div className="mx-auto max-w-7xl space-y-6">
      <header><p className="text-sm font-bold text-blue-600">SKILLBRIDGE GLOBAL · TRUST & SAFETY</p><h1 className="mt-2 text-3xl font-bold text-slate-900">Messages & Communication Management</h1><p className="mt-2 text-slate-500">Review user-submitted communication reports while minimizing access to private conversations.</p></header>
      <aside className="rounded-xl border border-blue-200 bg-blue-50 p-5"><h2 className="font-semibold text-blue-900">Privacy-first review</h2><p className="mt-1 text-sm leading-6 text-blue-800">This demo intentionally displays report metadata and user-provided summaries only. Message bodies, attachments, and unrelated conversation history are not exposed.</p></aside>
      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4" aria-label="Communication reports summary">
        {[
          ["Total Reports", reports.length, "text-slate-900"],
          ["Open", reports.filter((item) => item.status === "Open").length, "text-orange-500"],
          ["Reviewing", reports.filter((item) => item.status === "Reviewing").length, "text-blue-600"],
          ["Escalated", reports.filter((item) => item.status === "Escalated").length, "text-red-600"],
        ].map(([label, count, color]) => <div key={label} className="rounded-xl border border-slate-200 bg-white p-5"><p className="text-sm text-slate-500">{label}</p><p className={`mt-2 text-3xl font-bold ${color}`}>{count}</p></div>)}
      </section>
      <section className="rounded-xl border border-slate-200 bg-white p-5 md:p-6">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center"><div><h2 className="text-lg font-bold text-slate-900">Reported Conversations</h2><p className="mt-1 text-sm text-slate-500">Review reported behavior using minimal necessary information.</p></div><div className="grid gap-3 sm:grid-cols-2"><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search report or participant ID..." className="rounded-lg border border-slate-300 px-4 py-2.5 outline-none focus:border-blue-500" /><select value={status} onChange={(event) => setStatus(event.target.value)} className="rounded-lg border border-slate-300 bg-white px-4 py-2.5"><option value="All">All report statuses</option>{reportStatuses.map((item) => <option key={item}>{item}</option>)}</select></div></div>
        <div className="mt-5 overflow-x-auto"><table className="w-full min-w-[900px] text-left text-sm"><thead className="bg-slate-50 text-slate-500"><tr><th className="p-3 font-medium">Report</th><th className="p-3 font-medium">Participants</th><th className="p-3 font-medium">Category</th><th className="p-3 font-medium">Reported</th><th className="p-3 font-medium">Risk</th><th className="p-3 font-medium">Status</th><th className="p-3 font-medium">Action</th></tr></thead><tbody>
          {filtered.map((report) => <tr key={report.id} className="border-t border-slate-100"><td className="p-3"><p className="font-semibold text-slate-900">#{report.id}</p><p className="max-w-xs text-xs text-slate-500">{report.reason}</p></td><td className="p-3"><p className="text-slate-700">{report.reporter} <span className="text-xs text-slate-400">({report.reporterRole})</span></p><p className="mt-1 text-slate-700">{report.reportedUser} <span className="text-xs text-slate-400">({report.reportedRole})</span></p></td><td className="p-3 text-slate-600">{report.category}</td><td className="p-3 text-slate-500">{report.date}</td><td className="p-3"><span className={`rounded-full px-3 py-1 text-xs font-semibold ${report.risk === "High" ? "bg-red-100 text-red-700" : report.risk === "Medium" ? "bg-orange-100 text-orange-700" : "bg-slate-100 text-slate-600"}`}>{report.risk}</span></td><td className="p-3"><span className={`rounded-full px-3 py-1 text-xs font-semibold ${reportStatusClass(report.status)}`}>{report.status}</span></td><td className="p-3"><button onClick={() => setSelected(report)} className="rounded-lg border border-blue-200 px-3 py-2 text-xs font-semibold text-blue-700 hover:bg-blue-50">Review</button></td></tr>)}
        </tbody></table></div>
        {filtered.length === 0 && <p className="py-10 text-center text-sm text-slate-500">No communication reports match your search.</p>}
      </section>
      {selected && <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4"><section role="dialog" aria-modal="true" aria-labelledby="message-report-title" className="w-full max-w-xl rounded-2xl bg-white p-6 shadow-xl">
        <div className="flex items-start justify-between gap-4"><div><h2 id="message-report-title" className="text-xl font-bold text-slate-900">Communication Report #{selected.id}</h2><p className="mt-1 text-sm text-slate-500">Metadata-only review · {selected.date}</p></div><button aria-label="Close" onClick={() => setSelected(null)} className="text-2xl text-slate-400">×</button></div>
        <dl className="mt-5 grid gap-4 sm:grid-cols-2"><div><dt className="text-xs text-slate-400">Reporter</dt><dd className="mt-1 text-sm font-medium">{selected.reporter} · {selected.reporterRole}</dd></div><div><dt className="text-xs text-slate-400">Reported User</dt><dd className="mt-1 text-sm font-medium">{selected.reportedUser} · {selected.reportedRole}</dd></div><div><dt className="text-xs text-slate-400">Category</dt><dd className="mt-1 text-sm">{selected.category}</dd></div><div><dt className="text-xs text-slate-400">Risk Level</dt><dd className="mt-1 text-sm">{selected.risk}</dd></div><div className="sm:col-span-2"><dt className="text-xs text-slate-400">Report Summary</dt><dd className="mt-1 text-sm leading-6 text-slate-600">{selected.reason}</dd></div></dl>
        <p className="mt-4 rounded-lg bg-slate-50 p-3 text-xs leading-5 text-slate-500">No message content is available in this demo view. Access to private conversation content should be limited to authorized safety reviews and governed by applicable policy.</p>
        <label className="mt-5 block"><span className="mb-1.5 block text-sm font-medium text-slate-700">Report Status</span><select value={selected.status} onChange={(event) => updateReport(selected, event.target.value as ReportStatus)} className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3">{reportStatuses.map((item) => <option key={item}>{item}</option>)}</select></label>
        <div className="mt-5 flex flex-wrap justify-end gap-2"><button onClick={() => updateReport(selected, "Reviewing")} className="rounded-lg border border-blue-200 px-4 py-2 text-sm font-semibold text-blue-700 hover:bg-blue-50">Mark Reviewing</button><button onClick={() => updateReport(selected, "Resolved")} className="rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700">Resolve</button><button onClick={() => setSelected(null)} className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700">Close</button></div>
      </section></div>}
      <p className="text-center text-xs text-slate-400">Demo reports only. No private message content is stored or displayed.</p>
    </div></main>
  );
}
