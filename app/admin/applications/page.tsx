"use client";

import { useState } from "react";

type ApplicationStatus =
  | "Applied"
  | "Under Review"
  | "Shortlisted"
  | "Interview Scheduled"
  | "Interview Completed"
  | "Selected"
  | "Rejected"
  | "Offer Sent"
  | "Offer Accepted"
  | "Offer Declined"
  | "Withdrawn";

type Application = {
  id: number;
  candidate: string;
  email: string;
  country: string;
  company: string;
  jobTitle: string;
  employmentType: string;
  applied: string;
  status: ApplicationStatus;
  coverNote: string;
  experience: string;
};

const applicationStatuses: ApplicationStatus[] = [
  "Applied",
  "Under Review",
  "Shortlisted",
  "Interview Scheduled",
  "Interview Completed",
  "Selected",
  "Rejected",
  "Offer Sent",
  "Offer Accepted",
  "Offer Declined",
  "Withdrawn",
];

const initialApplications: Application[] = [
  { id: 10101, candidate: "Aarav Sharma", email: "aarav.sharma@example.com", country: "India", company: "TechNova Solutions", jobTitle: "Senior Frontend Engineer", employmentType: "Full-time", applied: "Nov 03, 2026", status: "Applied", coverNote: "I am excited to build accessible products for a global user base.", experience: "4 years · React, TypeScript, Node.js" },
  { id: 10102, candidate: "Sofia Martin", email: "sofia.martin@example.com", country: "Spain", company: "Northstar Health", jobTitle: "Product Designer", employmentType: "Full-time", applied: "Nov 02, 2026", status: "Shortlisted", coverNote: "My research-led design background aligns with your patient-first mission.", experience: "5 years · Product design, Figma, UX research" },
  { id: 10103, candidate: "Noah Williams", email: "noah.williams@example.com", country: "United States", company: "Meridian Finance Group", jobTitle: "Data Analyst", employmentType: "Contract", applied: "Nov 01, 2026", status: "Interview Scheduled", coverNote: "I have built analytics pipelines and dashboards for financial teams.", experience: "6 years · Python, SQL, Tableau" },
  { id: 10104, candidate: "Amara Okafor", email: "amara.okafor@example.com", country: "Nigeria", company: "Atelier Creative", jobTitle: "Marketing Manager", employmentType: "Full-time", applied: "Oct 30, 2026", status: "Under Review", coverNote: "I bring measurable campaign experience across diverse markets.", experience: "5 years · SEO, campaign strategy, analytics" },
  { id: 10105, candidate: "Liam Chen", email: "liam.chen@example.com", country: "Singapore", company: "LogiFlow Systems", jobTitle: "Android Developer", employmentType: "Full-time", applied: "Oct 29, 2026", status: "Offer Sent", coverNote: "I enjoy developing reliable mobile tools for complex workflows.", experience: "7 years · Kotlin, Java, Android" },
  { id: 10106, candidate: "Maya Patel", email: "maya.patel@example.com", country: "Canada", company: "Greenfield Learning", jobTitle: "UX Writer", employmentType: "Part-time", applied: "Oct 27, 2026", status: "Rejected", coverNote: "I create clear and inclusive content for digital products.", experience: "3 years · UX writing, content strategy" },
  { id: 10107, candidate: "Oliver Fischer", email: "oliver.fischer@example.com", country: "Germany", company: "TechNova Solutions", jobTitle: "Cloud Security Engineer", employmentType: "Full-time", applied: "Oct 25, 2026", status: "Interview Completed", coverNote: "I specialize in cloud security and platform reliability.", experience: "8 years · AWS, Kubernetes, security" },
  { id: 10108, candidate: "Isabella Rossi", email: "isabella.rossi@example.com", country: "Italy", company: "Northstar Health", jobTitle: "Data Analyst Intern", employmentType: "Internship", applied: "Oct 24, 2026", status: "Applied", coverNote: "I am completing my data science degree and eager to learn.", experience: "Final-year student · Python, statistics" },
];

function applicationBadge(status: ApplicationStatus) {
  if (["Selected", "Offer Accepted"].includes(status)) return "bg-green-100 text-green-700";
  if (["Rejected", "Offer Declined", "Withdrawn"].includes(status)) return "bg-red-100 text-red-700";
  if (["Shortlisted", "Interview Scheduled", "Interview Completed", "Offer Sent"].includes(status)) return "bg-blue-100 text-blue-700";
  if (status === "Under Review") return "bg-orange-100 text-orange-700";
  return "bg-slate-100 text-slate-700";
}

export default function AdminApplicationsPage() {
  const [applications, setApplications] = useState(initialApplications);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");
  const [countryFilter, setCountryFilter] = useState("All");
  const [selected, setSelected] = useState<Application | null>(null);
  const [page, setPage] = useState(1);
  const pageSize = 5;
  const countries = [...new Set(applications.map((item) => item.country))].sort();
  const types = [...new Set(applications.map((item) => item.employmentType))].sort();
  const filtered = applications.filter((item) => {
    const term = search.trim().toLowerCase();
    return (!term || [item.candidate, item.email, item.company, item.jobTitle].some((value) => value.toLowerCase().includes(term))) &&
      (statusFilter === "All" || item.status === statusFilter) &&
      (typeFilter === "All" || item.employmentType === typeFilter) &&
      (countryFilter === "All" || item.country === countryFilter);
  });
  const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize));
  const currentPage = Math.min(page, pageCount);
  const pageItems = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize);
  const updateApplication = (application: Application, next: ApplicationStatus) => {
    if (next === "Rejected" && !window.confirm(`Reject ${application.candidate}'s application for "${application.jobTitle}"?`)) return;
    setApplications((items) => items.map((item) => item.id === application.id ? { ...item, status: next } : item));
    setSelected((item) => item?.id === application.id ? { ...item, status: next } : item);
  };

  return (
    <main className="min-h-screen bg-slate-50 p-4 md:p-8"><div className="mx-auto max-w-7xl space-y-6">
      <header><p className="text-sm font-bold text-blue-600">SKILLBRIDGE GLOBAL · ADMIN PANEL</p><h1 className="mt-2 text-3xl font-bold text-slate-900">Job Applications Management</h1><p className="mt-2 text-slate-500">Review candidate applications across companies, roles, and countries.</p></header>
      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4" aria-label="Application summary">
        {[
          ["Total Applications", applications.length, "text-slate-900"],
          ["New Applications", applications.filter((item) => item.status === "Applied").length, "text-blue-600"],
          ["In Review", applications.filter((item) => ["Under Review", "Shortlisted", "Interview Scheduled", "Interview Completed"].includes(item.status)).length, "text-orange-500"],
          ["Offers", applications.filter((item) => ["Offer Sent", "Offer Accepted"].includes(item.status)).length, "text-green-600"],
        ].map(([label, count, tone]) => <div key={label} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"><p className="text-sm text-slate-500">{label}</p><p className={`mt-2 text-3xl font-bold ${tone}`}>{count}</p></div>)}
      </section>
      <section className="rounded-xl border border-slate-200 bg-white p-5 md:p-6">
        <div><h2 className="text-lg font-bold text-slate-900">All Applications</h2><p className="mt-1 text-sm text-slate-500">Search candidate, company, or job title; update the hiring stage from application details.</p></div>
        <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <input value={search} onChange={(event) => { setSearch(event.target.value); setPage(1); }} placeholder="Search candidate, company or role..." className="rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500" />
          <select value={statusFilter} onChange={(event) => { setStatusFilter(event.target.value); setPage(1); }} className="rounded-lg border border-slate-300 bg-white px-4 py-3"><option value="All">All application statuses</option>{applicationStatuses.map((status) => <option key={status}>{status}</option>)}</select>
          <select value={typeFilter} onChange={(event) => { setTypeFilter(event.target.value); setPage(1); }} className="rounded-lg border border-slate-300 bg-white px-4 py-3"><option value="All">All employment types</option>{types.map((type) => <option key={type}>{type}</option>)}</select>
          <select value={countryFilter} onChange={(event) => { setCountryFilter(event.target.value); setPage(1); }} className="rounded-lg border border-slate-300 bg-white px-4 py-3"><option value="All">All candidate countries</option>{countries.map((country) => <option key={country}>{country}</option>)}</select>
        </div>
        <div className="mt-5 overflow-x-auto"><table className="w-full min-w-[1000px] text-left text-sm">
          <thead className="bg-slate-50 text-slate-500"><tr><th className="p-3 font-medium">Candidate</th><th className="p-3 font-medium">Company</th><th className="p-3 font-medium">Job Title</th><th className="p-3 font-medium">Country</th><th className="p-3 font-medium">Applied</th><th className="p-3 font-medium">Status</th><th className="p-3 font-medium">Action</th></tr></thead>
          <tbody>{pageItems.map((item) => <tr key={item.id} className="border-t border-slate-100"><td className="p-3"><p className="font-semibold text-slate-900">{item.candidate}</p><p className="text-xs text-slate-500">{item.email}</p></td><td className="p-3 text-slate-600">{item.company}</td><td className="p-3 font-medium text-slate-700">{item.jobTitle}</td><td className="p-3 text-slate-600">{item.country}</td><td className="p-3 text-slate-500">{item.applied}</td><td className="p-3"><span className={`rounded-full px-3 py-1 text-xs font-semibold ${applicationBadge(item.status)}`}>{item.status}</span></td><td className="p-3"><button onClick={() => setSelected(item)} className="rounded-lg border border-blue-200 px-3 py-2 text-xs font-semibold text-blue-700 hover:bg-blue-50">View / Update</button></td></tr>)}</tbody>
        </table></div>
        {pageItems.length === 0 && <p className="py-10 text-center text-sm text-slate-500">No applications match your search and filters.</p>}
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-4"><p className="text-sm text-slate-500">Showing {filtered.length === 0 ? 0 : (currentPage - 1) * pageSize + 1}–{Math.min(currentPage * pageSize, filtered.length)} of {filtered.length}</p><div className="flex items-center gap-2"><button disabled={currentPage === 1} onClick={() => setPage(currentPage - 1)} className="rounded-lg border px-3 py-2 text-sm disabled:opacity-40">Previous</button><span className="text-sm text-slate-500">Page {currentPage} of {pageCount}</span><button disabled={currentPage === pageCount} onClick={() => setPage(currentPage + 1)} className="rounded-lg border px-3 py-2 text-sm disabled:opacity-40">Next</button></div></div>
      </section>
      {selected && <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-950/50 p-4"><section role="dialog" aria-modal="true" aria-labelledby="application-dialog-title" className="my-8 w-full max-w-2xl rounded-2xl bg-white p-6 shadow-xl">
        <div className="flex items-start justify-between gap-4"><div><h2 id="application-dialog-title" className="text-xl font-bold text-slate-900">Application Details</h2><p className="mt-1 text-sm text-slate-500">Application #{selected.id} · submitted {selected.applied}</p></div><button aria-label="Close" onClick={() => setSelected(null)} className="text-2xl text-slate-400">×</button></div>
        <dl className="mt-6 grid gap-4 sm:grid-cols-2">{([["Candidate", selected.candidate], ["Email", selected.email], ["Country", selected.country], ["Experience", selected.experience], ["Company", selected.company], ["Job Title", selected.jobTitle], ["Employment Type", selected.employmentType], ["Applied Date", selected.applied]]).map(([label, value]) => <div key={label}><dt className="text-xs text-slate-400">{label}</dt><dd className="mt-1 font-medium text-slate-800">{value}</dd></div>)}<div className="sm:col-span-2"><dt className="text-xs text-slate-400">Candidate Note</dt><dd className="mt-1 text-slate-600">{selected.coverNote}</dd></div></dl>
        <label className="mt-5 block"><span className="mb-1.5 block text-sm font-medium text-slate-700">Application Status</span><select value={selected.status} onChange={(event) => updateApplication(selected, event.target.value as ApplicationStatus)} className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3">{applicationStatuses.map((status) => <option key={status}>{status}</option>)}</select></label>
        <p className="mt-2 text-xs text-slate-400">Rejecting an application requires confirmation.</p><button onClick={() => setSelected(null)} className="mt-5 w-full rounded-lg border border-slate-300 py-3 font-semibold text-slate-700 hover:bg-slate-50">Close</button>
      </section></div>}
      <p className="text-center text-xs text-slate-400">SkillBridge Global · Application Administration · Demo data</p>
    </div></main>
  );
}
