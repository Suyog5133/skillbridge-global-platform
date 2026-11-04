"use client";

import { useState } from "react";

type Candidate = {
  id: number;
  name: string;
  email: string;
  country: string;
  skills: string[];
  registered: string;
  status: "Active" | "Suspended";
  verification: "Pending" | "Verified" | "Not submitted";
  summary: string;
  education: string;
  experience: string;
};

const initialCandidates: Candidate[] = [
  { id: 5101, name: "Aarav Sharma", email: "aarav.sharma@example.com", country: "India", skills: ["React", "TypeScript", "Node.js"], registered: "Nov 01, 2026", status: "Active", verification: "Verified", summary: "Frontend developer focused on accessible web applications and scalable user experiences.", education: "B.Tech, Computer Science — University of Delhi", experience: "Frontend Engineer at Brightwave Digital · 2022–2026" },
  { id: 5102, name: "Sofia Martin", email: "sofia.martin@example.com", country: "Spain", skills: ["Product Design", "Figma", "Research"], registered: "Oct 29, 2026", status: "Active", verification: "Pending", summary: "Product designer with a background in research-led digital products.", education: "M.Des, Interaction Design — Elisava Barcelona", experience: "Product Designer at Studio Norte · 2023–2026" },
  { id: 5103, name: "Noah Williams", email: "noah.williams@example.com", country: "United States", skills: ["Python", "AWS", "Data Engineering"], registered: "Oct 25, 2026", status: "Suspended", verification: "Not submitted", summary: "Data engineer building cloud-native analytics platforms.", education: "B.S., Information Systems — University of Washington", experience: "Data Engineer at Cascade Analytics · 2021–2025" },
  { id: 5104, name: "Amara Okafor", email: "amara.okafor@example.com", country: "Nigeria", skills: ["Digital Marketing", "SEO", "Analytics"], registered: "Oct 22, 2026", status: "Active", verification: "Pending", summary: "Marketing specialist helping teams grow through measurable campaigns.", education: "B.Sc., Marketing — University of Lagos", experience: "Digital Marketing Associate at Lagos Creative Co. · 2024–2026" },
  { id: 5105, name: "Liam Chen", email: "liam.chen@example.com", country: "Singapore", skills: ["Java", "Kotlin", "Android"], registered: "Oct 18, 2026", status: "Active", verification: "Verified", summary: "Mobile engineer specializing in reliable Android applications.", education: "B.Eng., Software Engineering — National University of Singapore", experience: "Android Developer at Lion City Apps · 2022–2026" },
  { id: 5106, name: "Maya Patel", email: "maya.patel@example.com", country: "Canada", skills: ["UX Writing", "Content Strategy", "Accessibility"], registered: "Oct 14, 2026", status: "Active", verification: "Pending", summary: "Content designer creating clear and inclusive product experiences.", education: "B.A., Communications — University of Toronto", experience: "UX Writer at Maple Digital · 2023–2026" },
  { id: 5107, name: "Oliver Fischer", email: "oliver.fischer@example.com", country: "Germany", skills: ["Go", "Kubernetes", "Security"], registered: "Oct 10, 2026", status: "Active", verification: "Verified", summary: "Platform engineer focused on secure distributed systems.", education: "M.Sc., Computer Science — TU Munich", experience: "Platform Engineer at Rhein Systems · 2021–2026" },
];

function badge(status: Candidate["status"] | Candidate["verification"]) {
  if (status === "Active" || status === "Verified") return "bg-green-100 text-green-700";
  if (status === "Suspended") return "bg-red-100 text-red-700";
  if (status === "Pending") return "bg-orange-100 text-orange-700";
  return "bg-slate-100 text-slate-600";
}

export default function AdminCandidatesPage() {
  const [candidates, setCandidates] = useState(initialCandidates);
  const [search, setSearch] = useState("");
  const [country, setCountry] = useState("All");
  const [status, setStatus] = useState("All");
  const [selected, setSelected] = useState<Candidate | null>(null);
  const [page, setPage] = useState(1);
  const pageSize = 5;

  const countries = [...new Set(candidates.map((candidate) => candidate.country))].sort();
  const filtered = candidates.filter((candidate) => {
    const term = search.trim().toLowerCase();
    return (
      (!term || candidate.name.toLowerCase().includes(term) || candidate.email.toLowerCase().includes(term)) &&
      (country === "All" || candidate.country === country) &&
      (status === "All" || candidate.status === status)
    );
  });
  const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize));
  const currentPage = Math.min(page, pageCount);
  const pageItems = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize);
  const updateStatus = (candidate: Candidate, next: Candidate["status"]) => {
    if (next === "Suspended" && !window.confirm(`Suspend ${candidate.name}'s account?`)) return;
    setCandidates((items) => items.map((item) => item.id === candidate.id ? { ...item, status: next } : item));
    setSelected(null);
  };
  const deleteCandidate = (candidate: Candidate) => {
    if (!window.confirm(`Delete candidate "${candidate.name}" from the demo list?`)) return;
    setCandidates((items) => items.filter((item) => item.id !== candidate.id));
    setSelected(null);
  };

  return (
    <main className="min-h-screen bg-slate-50 p-4 md:p-8">
      <div className="mx-auto max-w-7xl space-y-6">
        <header>
          <p className="text-sm font-bold text-blue-600">SKILLBRIDGE GLOBAL · ADMIN PANEL</p>
          <h1 className="mt-2 text-3xl font-bold text-slate-900">Candidate Management</h1>
          <p className="mt-2 text-slate-500">Review candidate accounts, profiles, and verification progress.</p>
        </header>
        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4" aria-label="Candidate summary">
          {[
            ["Total Candidates", candidates.length, "text-slate-900"],
            ["Active Candidates", candidates.filter((item) => item.status === "Active").length, "text-green-600"],
            ["Suspended Candidates", candidates.filter((item) => item.status === "Suspended").length, "text-red-600"],
            ["Pending Verification", candidates.filter((item) => item.verification === "Pending").length, "text-orange-500"],
          ].map(([label, count, color]) => (
            <div key={label} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-sm text-slate-500">{label}</p>
              <p className={`mt-2 text-3xl font-bold ${color}`}>{count}</p>
            </div>
          ))}
        </section>
        <section className="rounded-xl border border-slate-200 bg-white p-5 md:p-6">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
            <div>
              <h2 className="text-lg font-bold text-slate-900">Candidate Accounts</h2>
              <p className="mt-1 text-sm text-slate-500">Search, filter, and manage registered candidates.</p>
            </div>
            <p className="text-sm text-slate-500">{filtered.length} result{filtered.length === 1 ? "" : "s"}</p>
          </div>
          <div className="mt-5 grid gap-3 md:grid-cols-3">
            <input value={search} onChange={(event) => { setSearch(event.target.value); setPage(1); }} placeholder="Search name or email..." className="rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500" />
            <select value={country} onChange={(event) => { setCountry(event.target.value); setPage(1); }} className="rounded-lg border border-slate-300 bg-white px-4 py-3 outline-none focus:border-blue-500">
              <option value="All">All countries</option>
              {countries.map((item) => <option key={item}>{item}</option>)}
            </select>
            <select value={status} onChange={(event) => { setStatus(event.target.value); setPage(1); }} className="rounded-lg border border-slate-300 bg-white px-4 py-3 outline-none focus:border-blue-500">
              <option value="All">All statuses</option><option>Active</option><option>Suspended</option>
            </select>
          </div>
          <div className="mt-5 overflow-x-auto">
            <table className="w-full min-w-[900px] text-left text-sm">
              <thead className="bg-slate-50 text-slate-500"><tr>
                <th className="p-3 font-medium">Candidate</th><th className="p-3 font-medium">Country</th><th className="p-3 font-medium">Skills</th><th className="p-3 font-medium">Registered</th><th className="p-3 font-medium">Status</th><th className="p-3 font-medium">Action</th>
              </tr></thead>
              <tbody>{pageItems.map((candidate) => <tr key={candidate.id} className="border-t border-slate-100">
                <td className="p-3"><p className="font-semibold text-slate-900">{candidate.name}</p><p className="text-xs text-slate-500">{candidate.email}</p></td>
                <td className="p-3 text-slate-600">{candidate.country}</td>
                <td className="max-w-xs p-3 text-slate-500">{candidate.skills.join(", ")}</td>
                <td className="p-3 text-slate-500">{candidate.registered}</td>
                <td className="p-3"><span className={`rounded-full px-3 py-1 text-xs font-semibold ${badge(candidate.status)}`}>{candidate.status}</span></td>
                <td className="p-3"><button onClick={() => setSelected(candidate)} className="rounded-lg border border-blue-200 px-3 py-2 text-xs font-semibold text-blue-700 hover:bg-blue-50">View / Manage</button></td>
              </tr>)}</tbody>
            </table>
          </div>
          {pageItems.length === 0 && <div className="py-10 text-center text-sm text-slate-500">No candidates match your search and filters.</div>}
          <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-4">
            <p className="text-sm text-slate-500">Page {currentPage} of {pageCount}</p>
            <div className="flex gap-2">
              <button disabled={currentPage <= 1} onClick={() => setPage(currentPage - 1)} className="rounded-lg border border-slate-300 px-4 py-2 text-sm disabled:opacity-40">Previous</button>
              <button disabled={currentPage >= pageCount} onClick={() => setPage(currentPage + 1)} className="rounded-lg border border-slate-300 px-4 py-2 text-sm disabled:opacity-40">Next</button>
            </div>
          </div>
        </section>
        {selected && <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-950/50 p-4">
          <section role="dialog" aria-modal="true" aria-labelledby="candidate-dialog-title" className="my-8 w-full max-w-xl rounded-2xl bg-white p-6 shadow-xl">
            <div className="flex items-start justify-between gap-4"><div><h2 id="candidate-dialog-title" className="text-xl font-bold text-slate-900">Candidate Profile</h2><p className="mt-1 text-sm text-slate-500">Demo account · #{selected.id}</p></div><button aria-label="Close" onClick={() => setSelected(null)} className="text-2xl text-slate-400">×</button></div>
            <dl className="mt-6 grid gap-4 sm:grid-cols-2">
              <div><dt className="text-xs text-slate-400">Name</dt><dd className="mt-1 font-semibold">{selected.name}</dd></div><div><dt className="text-xs text-slate-400">Email</dt><dd className="mt-1 break-all">{selected.email}</dd></div>
              <div><dt className="text-xs text-slate-400">Country</dt><dd className="mt-1">{selected.country}</dd></div><div><dt className="text-xs text-slate-400">Registration Date</dt><dd className="mt-1">{selected.registered}</dd></div>
              <div className="sm:col-span-2"><dt className="text-xs text-slate-400">Skills</dt><dd className="mt-1">{selected.skills.join(", ")}</dd></div>
              <div className="sm:col-span-2"><dt className="text-xs text-slate-400">Professional Summary</dt><dd className="mt-1 text-slate-600">{selected.summary}</dd></div>
              <div className="sm:col-span-2"><dt className="text-xs text-slate-400">Education</dt><dd className="mt-1 text-slate-600">{selected.education}</dd></div>
              <div className="sm:col-span-2"><dt className="text-xs text-slate-400">Experience</dt><dd className="mt-1 text-slate-600">{selected.experience}</dd></div>
              <div><dt className="text-xs text-slate-400">Verification</dt><dd className="mt-1"><span className={`rounded-full px-3 py-1 text-xs font-semibold ${badge(selected.verification)}`}>{selected.verification}</span></dd></div>
              <div><dt className="text-xs text-slate-400">Account Status</dt><dd className="mt-1"><span className={`rounded-full px-3 py-1 text-xs font-semibold ${badge(selected.status)}`}>{selected.status}</span></dd></div>
            </dl>
            <div className="mt-6 flex flex-wrap justify-end gap-2 border-t border-slate-100 pt-4">
              {selected.status === "Suspended" ? <button onClick={() => updateStatus(selected, "Active")} className="rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700">Activate</button> : <button onClick={() => updateStatus(selected, "Suspended")} className="rounded-lg border border-orange-200 px-4 py-2 text-sm font-semibold text-orange-700 hover:bg-orange-50">Suspend</button>}
              <button onClick={() => deleteCandidate(selected)} className="rounded-lg border border-red-200 px-4 py-2 text-sm font-semibold text-red-600 hover:bg-red-50">Delete</button>
              <button onClick={() => setSelected(null)} className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700">Close</button>
            </div>
          </section>
        </div>}
        <p className="text-center text-xs text-slate-400">SkillBridge Global · Candidate Administration · Demo data</p>
      </div>
    </main>
  );
}
