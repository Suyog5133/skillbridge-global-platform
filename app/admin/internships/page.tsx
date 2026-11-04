"use client";

import { useState } from "react";

type InternshipStatus = "Active" | "Pending Approval" | "Completed" | "Expired" | "Rejected";
type Internship = {
  id: number;
  title: string;
  company: string;
  country: string;
  location: string;
  duration: string;
  stipend: string;
  deadline: string;
  eligibility: string;
  status: InternshipStatus;
  description: string;
  featured: boolean;
};

const initialInternships: Internship[] = [
  { id: 12001, title: "Software Engineering Intern", company: "TechNova Solutions", country: "India", location: "Bengaluru · Hybrid", duration: "6 months", stipend: "₹35,000 / month", deadline: "Nov 25, 2026", eligibility: "Computer science students graduating in 2026–2028; React or JavaScript experience preferred.", status: "Pending Approval", description: "Join the product engineering team to develop cloud tools used by global customers.", featured: false },
  { id: 12002, title: "UX Research Intern", company: "Northstar Health", country: "United States", location: "Remote · United States", duration: "12 weeks", stipend: "$26 / hour", deadline: "Dec 01, 2026", eligibility: "Current undergraduate or graduate student in design, psychology, or a related field.", status: "Active", description: "Support user research and help improve digital healthcare journeys.", featured: true },
  { id: 12003, title: "Education Content Intern", company: "Greenfield Learning", country: "United Kingdom", location: "London · On-site", duration: "3 months", stipend: "£1,400 / month", deadline: "Dec 10, 2026", eligibility: "Students studying education, English, or digital media; strong writing skills.", status: "Active", description: "Create and review digital learning materials for early-career learners.", featured: false },
  { id: 12004, title: "Finance Analyst Intern", company: "Meridian Finance Group", country: "Singapore", location: "Singapore · Hybrid", duration: "6 months", stipend: "SGD 2,800 / month", deadline: "Jun 15, 2026", eligibility: "Penultimate-year finance or economics students with spreadsheet experience.", status: "Expired", description: "Assist with financial analysis, forecasting, and market research.", featured: false },
  { id: 12005, title: "Marketing Intern", company: "Atelier Creative", country: "Canada", location: "Toronto · Hybrid", duration: "4 months", stipend: "CAD 22 / hour", deadline: "Dec 05, 2026", eligibility: "Post-secondary students interested in marketing, communications, or analytics.", status: "Completed", description: "Contribute to digital campaigns and creative projects for clients.", featured: false },
  { id: 12006, title: "Supply Chain Intern", company: "LogiFlow Systems", country: "Germany", location: "Berlin · On-site", duration: "5 months", stipend: "€1,800 / month", deadline: "Nov 22, 2026", eligibility: "Enrolled in supply chain, operations, or industrial engineering studies.", status: "Rejected", description: "Support logistics analytics and workflow improvement initiatives.", featured: false },
];

const internshipStatuses: InternshipStatus[] = ["Active", "Pending Approval", "Completed", "Expired", "Rejected"];

function internshipBadge(status: InternshipStatus) {
  if (status === "Active" || status === "Completed") return "bg-green-100 text-green-700";
  if (status === "Pending Approval") return "bg-orange-100 text-orange-700";
  if (status === "Rejected") return "bg-red-100 text-red-700";
  return "bg-slate-100 text-slate-600";
}

export default function AdminInternshipsPage() {
  const [internships, setInternships] = useState(initialInternships);
  const [search, setSearch] = useState("");
  const [country, setCountry] = useState("All");
  const [duration, setDuration] = useState("All");
  const [status, setStatus] = useState("All");
  const [selected, setSelected] = useState<Internship | null>(null);
  const [page, setPage] = useState(1);
  const pageSize = 5;
  const countries = [...new Set(internships.map((item) => item.country))].sort();
  const durations = [...new Set(internships.map((item) => item.duration))].sort();
  const filtered = internships.filter((item) => {
    const term = search.trim().toLowerCase();
    return (!term || [item.title, item.company, item.location].some((value) => value.toLowerCase().includes(term))) &&
      (country === "All" || item.country === country) &&
      (duration === "All" || item.duration === duration) &&
      (status === "All" || item.status === status);
  });
  const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize));
  const currentPage = Math.min(page, pageCount);
  const visibleInternships = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize);
  function updateStatus(item: Internship, next: InternshipStatus) {
    if (next === "Rejected" && !window.confirm(`Reject internship "${item.title}"?`)) return;
    setInternships((list) => list.map((entry) => entry.id === item.id ? { ...entry, status: next } : entry));
    setSelected((entry) => entry?.id === item.id ? { ...entry, status: next } : entry);
  }
  function toggleFeature(item: Internship) {
    setInternships((list) => list.map((entry) => entry.id === item.id ? { ...entry, featured: !entry.featured } : entry));
    setSelected((entry) => entry?.id === item.id ? { ...entry, featured: !entry.featured } : entry);
  }
  function deleteInternship(item: Internship) {
    if (!window.confirm(`Delete internship "${item.title}"?`)) return;
    setInternships((list) => list.filter((entry) => entry.id !== item.id));
    setSelected(null);
  }

  return (
    <main className="min-h-screen bg-slate-50 p-4 md:p-8"><div className="mx-auto max-w-7xl space-y-6">
      <header><p className="text-sm font-bold text-blue-600">SKILLBRIDGE GLOBAL · ADMIN PANEL</p><h1 className="mt-2 text-3xl font-bold text-slate-900">Internship Management</h1><p className="mt-2 text-slate-500">Manage internship listings, eligibility, deadlines, and approvals.</p></header>
      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5" aria-label="Internship summary">
        {[
          ["Total Internships", internships.length, "text-slate-900"],
          ["Active", internships.filter((item) => item.status === "Active").length, "text-green-600"],
          ["Pending Approval", internships.filter((item) => item.status === "Pending Approval").length, "text-orange-500"],
          ["Completed", internships.filter((item) => item.status === "Completed").length, "text-blue-600"],
          ["Expired", internships.filter((item) => item.status === "Expired").length, "text-slate-600"],
        ].map(([label, count, tone]) => <div key={label} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"><p className="text-sm text-slate-500">{label}</p><p className={`mt-2 text-3xl font-bold ${tone}`}>{count}</p></div>)}
      </section>
      <section className="rounded-xl border border-slate-200 bg-white p-5 md:p-6">
        <div><h2 className="text-lg font-bold text-slate-900">Internship Listings</h2><p className="mt-1 text-sm text-slate-500">Search and filter internship opportunities before taking action.</p></div>
        <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <input value={search} onChange={(event) => { setSearch(event.target.value); setPage(1); }} placeholder="Search title, company or location..." className="rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500" />
          <select value={country} onChange={(event) => { setCountry(event.target.value); setPage(1); }} className="rounded-lg border border-slate-300 bg-white px-4 py-3"><option value="All">All countries</option>{countries.map((item) => <option key={item}>{item}</option>)}</select>
          <select value={duration} onChange={(event) => { setDuration(event.target.value); setPage(1); }} className="rounded-lg border border-slate-300 bg-white px-4 py-3"><option value="All">All durations</option>{durations.map((item) => <option key={item}>{item}</option>)}</select>
          <select value={status} onChange={(event) => { setStatus(event.target.value); setPage(1); }} className="rounded-lg border border-slate-300 bg-white px-4 py-3"><option value="All">All statuses</option>{internshipStatuses.map((item) => <option key={item}>{item}</option>)}</select>
        </div>
        <div className="mt-5 overflow-x-auto"><table className="w-full min-w-[980px] text-left text-sm"><thead className="bg-slate-50 text-slate-500"><tr><th className="p-3 font-medium">Title</th><th className="p-3 font-medium">Company</th><th className="p-3 font-medium">Location</th><th className="p-3 font-medium">Duration</th><th className="p-3 font-medium">Stipend</th><th className="p-3 font-medium">Deadline</th><th className="p-3 font-medium">Status</th><th className="p-3 font-medium">Action</th></tr></thead><tbody>
          {visibleInternships.map((item) => <tr key={item.id} className="border-t border-slate-100"><td className="p-3 font-semibold text-slate-900">{item.title}{item.featured && <span className="ml-2 rounded-full bg-blue-50 px-2 py-0.5 text-[10px] font-semibold text-blue-700">Featured</span>}</td><td className="p-3 text-slate-600">{item.company}</td><td className="p-3 text-slate-600">{item.location}</td><td className="p-3 text-slate-600">{item.duration}</td><td className="p-3 text-slate-600">{item.stipend}</td><td className="p-3 text-slate-500">{item.deadline}</td><td className="p-3"><span className={`rounded-full px-3 py-1 text-xs font-semibold ${internshipBadge(item.status)}`}>{item.status}</span></td><td className="p-3"><button onClick={() => setSelected(item)} className="rounded-lg border border-blue-200 px-3 py-2 text-xs font-semibold text-blue-700 hover:bg-blue-50">View / Manage</button></td></tr>)}
        </tbody></table></div>
        {visibleInternships.length === 0 && <p className="py-10 text-center text-sm text-slate-500">No internships match your search and filters.</p>}
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-4"><p className="text-sm text-slate-500">Showing {filtered.length === 0 ? 0 : (currentPage - 1) * pageSize + 1}–{Math.min(currentPage * pageSize, filtered.length)} of {filtered.length}</p><div className="flex items-center gap-2"><button disabled={currentPage === 1} onClick={() => setPage(currentPage - 1)} className="rounded-lg border px-3 py-2 text-sm disabled:opacity-40">Previous</button><span className="text-sm text-slate-500">Page {currentPage} of {pageCount}</span><button disabled={currentPage === pageCount} onClick={() => setPage(currentPage + 1)} className="rounded-lg border px-3 py-2 text-sm disabled:opacity-40">Next</button></div></div>
      </section>
      {selected && <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-950/50 p-4"><section role="dialog" aria-modal="true" aria-labelledby="internship-details-title" className="my-8 w-full max-w-2xl rounded-2xl bg-white p-6 shadow-xl">
        <div className="flex items-start justify-between gap-3"><div><h2 id="internship-details-title" className="text-xl font-bold text-slate-900">{selected.title}</h2><p className="mt-1 text-sm text-slate-500">{selected.company} · Internship #{selected.id}</p></div><button aria-label="Close" onClick={() => setSelected(null)} className="text-2xl text-slate-400">×</button></div>
        <dl className="mt-6 grid gap-4 sm:grid-cols-2">{([["Company", selected.company], ["Country", selected.country], ["Location", selected.location], ["Duration", selected.duration], ["Stipend", selected.stipend], ["Application Deadline", selected.deadline], ["Status", selected.status]]).map(([label, value]) => <div key={label}><dt className="text-xs text-slate-400">{label}</dt><dd className="mt-1 font-medium text-slate-800">{value}</dd></div>)}<div className="sm:col-span-2"><dt className="text-xs text-slate-400">Eligibility</dt><dd className="mt-1 text-slate-600">{selected.eligibility}</dd></div><div className="sm:col-span-2"><dt className="text-xs text-slate-400">Description</dt><dd className="mt-1 text-slate-600">{selected.description}</dd></div></dl>
        <div className="mt-6 flex flex-wrap justify-end gap-2 border-t border-slate-100 pt-4">{selected.status === "Pending Approval" && <><button onClick={() => updateStatus(selected, "Active")} className="rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700">Approve</button><button onClick={() => updateStatus(selected, "Rejected")} className="rounded-lg border border-red-200 px-4 py-2 text-sm font-semibold text-red-600 hover:bg-red-50">Reject</button></>}<button onClick={() => toggleFeature(selected)} className="rounded-lg border border-blue-200 px-4 py-2 text-sm font-semibold text-blue-700 hover:bg-blue-50">{selected.featured ? "Remove Feature" : "Feature"}</button><button onClick={() => deleteInternship(selected)} className="rounded-lg border border-red-200 px-4 py-2 text-sm font-semibold text-red-600 hover:bg-red-50">Delete</button><button onClick={() => setSelected(null)} className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700">Close</button></div>
      </section></div>}
      <p className="text-center text-xs text-slate-400">SkillBridge Global · Internship Administration · Demo data</p>
    </div></main>
  );
}
