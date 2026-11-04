"use client";

import { useState } from "react";

type SavedJob = {
  id: number;
  candidate: string;
  email: string;
  country: string;
  company: string;
  jobTitle: string;
  savedDate: string;
  jobStatus: "Open" | "Closed";
};

const initialSavedJobs: SavedJob[] = [
  { id: 16001, candidate: "Aarav Sharma", email: "aarav.sharma@example.com", country: "India", company: "TechNova Solutions", jobTitle: "Senior Frontend Engineer", savedDate: "Nov 03, 2026", jobStatus: "Open" },
  { id: 16002, candidate: "Sofia Martin", email: "sofia.martin@example.com", country: "Spain", company: "Northstar Health", jobTitle: "Product Designer", savedDate: "Nov 02, 2026", jobStatus: "Open" },
  { id: 16003, candidate: "Noah Williams", email: "noah.williams@example.com", country: "United States", company: "Meridian Finance Group", jobTitle: "Data Analyst", savedDate: "Nov 01, 2026", jobStatus: "Open" },
  { id: 16004, candidate: "Amara Okafor", email: "amara.okafor@example.com", country: "Nigeria", company: "Atelier Creative", jobTitle: "Marketing Manager", savedDate: "Oct 30, 2026", jobStatus: "Closed" },
  { id: 16005, candidate: "Liam Chen", email: "liam.chen@example.com", country: "Singapore", company: "LogiFlow Systems", jobTitle: "Android Developer", savedDate: "Oct 29, 2026", jobStatus: "Open" },
  { id: 16006, candidate: "Maya Patel", email: "maya.patel@example.com", country: "Canada", company: "Greenfield Learning", jobTitle: "UX Writer", savedDate: "Oct 27, 2026", jobStatus: "Closed" },
  { id: 16007, candidate: "Oliver Fischer", email: "oliver.fischer@example.com", country: "Germany", company: "TechNova Solutions", jobTitle: "Cloud Security Engineer", savedDate: "Oct 25, 2026", jobStatus: "Open" },
];

export default function AdminSavedJobsPage() {
  const [savedJobs, setSavedJobs] = useState(initialSavedJobs);
  const [search, setSearch] = useState("");
  const [country, setCountry] = useState("All");
  const [status, setStatus] = useState("All");
  const [page, setPage] = useState(1);
  const pageSize = 5;
  const countries = [...new Set(savedJobs.map((item) => item.country))].sort();
  const filtered = savedJobs.filter((item) => {
    const term = search.trim().toLowerCase();
    return (!term || [item.candidate, item.email, item.company, item.jobTitle].some((value) => value.toLowerCase().includes(term))) &&
      (country === "All" || item.country === country) &&
      (status === "All" || item.jobStatus === status);
  });
  const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize));
  const currentPage = Math.min(page, pageCount);
  const visible = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  function deleteSavedJob(item: SavedJob) {
    if (!window.confirm(`Remove "${item.jobTitle}" from ${item.candidate}'s saved jobs?`)) return;
    setSavedJobs((items) => items.filter((saved) => saved.id !== item.id));
  }

  return (
    <main className="min-h-screen bg-slate-50 p-4 md:p-8"><div className="mx-auto max-w-7xl space-y-6">
      <header><p className="text-sm font-bold text-blue-600">SKILLBRIDGE GLOBAL · ADMIN PANEL</p><h1 className="mt-2 text-3xl font-bold text-slate-900">Saved Jobs Management</h1><p className="mt-2 text-slate-500">Review saved-job activity and help keep candidate job lists current.</p></header>
      <section className="grid gap-4 sm:grid-cols-3" aria-label="Saved jobs summary">
        {[
          ["Total Saved Jobs", savedJobs.length, "text-slate-900"],
          ["Open Listings", savedJobs.filter((item) => item.jobStatus === "Open").length, "text-green-600"],
          ["Closed Listings", savedJobs.filter((item) => item.jobStatus === "Closed").length, "text-slate-600"],
        ].map(([label, count, color]) => <div key={label} className="rounded-xl border border-slate-200 bg-white p-5"><p className="text-sm text-slate-500">{label}</p><p className={`mt-2 text-3xl font-bold ${color}`}>{count}</p></div>)}
      </section>
      <section className="rounded-xl border border-slate-200 bg-white p-5 md:p-6">
        <div><h2 className="text-lg font-bold text-slate-900">Saved Job Records</h2><p className="mt-1 text-sm text-slate-500">Filter saved listings by candidate country and current job availability.</p></div>
        <div className="mt-5 grid gap-3 md:grid-cols-3">
          <input value={search} onChange={(event) => { setSearch(event.target.value); setPage(1); }} placeholder="Search candidate, job or company..." className="rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500" />
          <select value={country} onChange={(event) => { setCountry(event.target.value); setPage(1); }} className="rounded-lg border border-slate-300 bg-white px-4 py-3"><option value="All">All countries</option>{countries.map((item) => <option key={item}>{item}</option>)}</select>
          <select value={status} onChange={(event) => { setStatus(event.target.value); setPage(1); }} className="rounded-lg border border-slate-300 bg-white px-4 py-3"><option value="All">All job statuses</option><option>Open</option><option>Closed</option></select>
        </div>
        <div className="mt-5 overflow-x-auto"><table className="w-full min-w-[900px] text-left text-sm"><thead className="bg-slate-50 text-slate-500"><tr><th className="p-3 font-medium">Candidate</th><th className="p-3 font-medium">Job Title</th><th className="p-3 font-medium">Company</th><th className="p-3 font-medium">Country</th><th className="p-3 font-medium">Saved Date</th><th className="p-3 font-medium">Job Status</th><th className="p-3 font-medium">Action</th></tr></thead><tbody>
          {visible.map((item) => <tr key={item.id} className="border-t border-slate-100"><td className="p-3"><p className="font-semibold text-slate-900">{item.candidate}</p><p className="text-xs text-slate-500">{item.email}</p></td><td className="p-3 font-medium text-slate-700">{item.jobTitle}</td><td className="p-3 text-slate-600">{item.company}</td><td className="p-3 text-slate-600">{item.country}</td><td className="p-3 text-slate-500">{item.savedDate}</td><td className="p-3"><span className={`rounded-full px-3 py-1 text-xs font-semibold ${item.jobStatus === "Open" ? "bg-green-100 text-green-700" : "bg-slate-100 text-slate-600"}`}>{item.jobStatus}</span></td><td className="p-3"><button onClick={() => deleteSavedJob(item)} className="rounded-lg border border-red-200 px-3 py-2 text-xs font-semibold text-red-600 hover:bg-red-50">Remove</button></td></tr>)}
        </tbody></table></div>
        {visible.length === 0 && <p className="py-10 text-center text-sm text-slate-500">No saved jobs match your search and filters.</p>}
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-4"><p className="text-sm text-slate-500">Showing {filtered.length === 0 ? 0 : (currentPage - 1) * pageSize + 1}–{Math.min(currentPage * pageSize, filtered.length)} of {filtered.length}</p><div className="flex items-center gap-2"><button disabled={currentPage === 1} onClick={() => setPage(currentPage - 1)} className="rounded-lg border px-3 py-2 text-sm disabled:opacity-40">Previous</button><span className="text-sm text-slate-500">Page {currentPage} of {pageCount}</span><button disabled={currentPage === pageCount} onClick={() => setPage(currentPage + 1)} className="rounded-lg border px-3 py-2 text-sm disabled:opacity-40">Next</button></div></div>
      </section>
      <p className="text-center text-xs text-slate-400">Demo saved-job activity only. No private candidate job-search data is fetched.</p>
    </div></main>
  );
}
