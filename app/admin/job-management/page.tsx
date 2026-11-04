"use client";

import { useState } from "react";

type JobStatus = "Active" | "Pending Approval" | "Rejected" | "Expired" | "Paused";
type Job = {
  id: number; title: string; company: string; location: string; employmentType: string;
  posted: string; status: JobStatus; salary: string; description: string; requirements: string[];
  featured: boolean;
};

const initialJobs: Job[] = [
  { id: 7101, title: "Senior Frontend Engineer", company: "TechNova Solutions", location: "Bengaluru, India · Hybrid", employmentType: "Full-time", posted: "Nov 03, 2026", status: "Pending Approval", salary: "$70,000–$95,000 / year", description: "Build responsive product interfaces for a global cloud platform.", requirements: ["React and TypeScript", "5+ years of frontend experience", "Accessibility and testing"], featured: false },
  { id: 7102, title: "Product Designer", company: "Northstar Health", location: "New York, United States", employmentType: "Full-time", posted: "Nov 02, 2026", status: "Active", salary: "$90,000–$120,000 / year", description: "Design patient-centered digital healthcare experiences.", requirements: ["Product design portfolio", "Figma proficiency", "Design systems experience"], featured: true },
  { id: 7103, title: "Data Analyst Intern", company: "Greenfield Learning", location: "Remote", employmentType: "Internship", posted: "Nov 01, 2026", status: "Active", salary: "$24 / hour", description: "Support learning product analytics and reporting.", requirements: ["SQL fundamentals", "Data visualization", "Currently enrolled in a degree"], featured: false },
  { id: 7104, title: "Finance Operations Associate", company: "Meridian Finance Group", location: "Singapore", employmentType: "Contract", posted: "Oct 28, 2026", status: "Expired", salary: "SGD 5,000–6,500 / month", description: "Support regional finance operations and reconciliations.", requirements: ["Finance operations experience", "Strong Excel skills", "Attention to detail"], featured: false },
  { id: 7105, title: "Marketing Manager", company: "Atelier Creative", location: "Toronto, Canada · Remote", employmentType: "Full-time", posted: "Oct 25, 2026", status: "Rejected", salary: "CAD 85,000–105,000 / year", description: "Lead integrated marketing programs for client brands.", requirements: ["Campaign management", "Analytics and reporting", "Team leadership"], featured: false },
  { id: 7106, title: "Cloud Security Engineer", company: "LogiFlow Systems", location: "Berlin, Germany", employmentType: "Full-time", posted: "Oct 23, 2026", status: "Paused", salary: "€75,000–€95,000 / year", description: "Improve security posture across a cloud logistics platform.", requirements: ["Cloud security", "AWS or Azure", "Infrastructure as code"], featured: false },
];

const jobStatuses: JobStatus[] = ["Active", "Pending Approval", "Rejected", "Expired", "Paused"];

function jobBadge(status: JobStatus) {
  if (status === "Active") return "bg-green-100 text-green-700";
  if (status === "Pending Approval") return "bg-orange-100 text-orange-700";
  if (status === "Rejected") return "bg-red-100 text-red-700";
  if (status === "Expired") return "bg-slate-100 text-slate-600";
  return "bg-yellow-100 text-yellow-800";
}

export default function AdminJobManagementPage() {
  const [jobs, setJobs] = useState(initialJobs);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");
  const [locationFilter, setLocationFilter] = useState("All");
  const [selected, setSelected] = useState<Job | null>(null);
  const types = [...new Set(jobs.map((job) => job.employmentType))].sort();
  const locations = [...new Set(jobs.map((job) => job.location))].sort();
  const filtered = jobs.filter((job) => {
    const term = search.trim().toLowerCase();
    return (!term || [job.title, job.company, job.location].some((value) => value.toLowerCase().includes(term))) &&
      (statusFilter === "All" || job.status === statusFilter) &&
      (typeFilter === "All" || job.employmentType === typeFilter) &&
      (locationFilter === "All" || job.location === locationFilter);
  });

  function setJobStatus(job: Job, next: JobStatus) {
    if (next === "Rejected" && !window.confirm(`Reject "${job.title}"?`)) return;
    setJobs((items) => items.map((item) => item.id === job.id ? { ...item, status: next } : item));
    setSelected((item) => item?.id === job.id ? { ...item, status: next } : item);
  }
  function toggleFeatured(job: Job) {
    setJobs((items) => items.map((item) => item.id === job.id ? { ...item, featured: !item.featured } : item));
    setSelected((item) => item?.id === job.id ? { ...item, featured: !item.featured } : item);
  }
  function deleteJob(job: Job) {
    if (!window.confirm(`Delete job listing "${job.title}"?`)) return;
    setJobs((items) => items.filter((item) => item.id !== job.id));
    setSelected(null);
  }
  const showSummary = (label: string, value: number, tone: string) => <div key={label} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"><p className="text-sm text-slate-500">{label}</p><p className={`mt-2 text-3xl font-bold ${tone}`}>{value}</p></div>;

  return (
    <main className="min-h-screen bg-slate-50 p-4 md:p-8"><div className="mx-auto max-w-7xl space-y-6">
      <header><p className="text-sm font-bold text-blue-600">SKILLBRIDGE GLOBAL · ADMIN PANEL</p><h1 className="mt-2 text-3xl font-bold text-slate-900">Job Management</h1><p className="mt-2 text-slate-500">Review job listings, moderate content, and manage publishing status.</p></header>
      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5" aria-label="Job summary">
        {showSummary("Total Jobs", jobs.length, "text-slate-900")}
        {showSummary("Active Jobs", jobs.filter((job) => job.status === "Active").length, "text-green-600")}
        {showSummary("Pending Approval", jobs.filter((job) => job.status === "Pending Approval").length, "text-orange-500")}
        {showSummary("Rejected", jobs.filter((job) => job.status === "Rejected").length, "text-red-600")}
        {showSummary("Expired", jobs.filter((job) => job.status === "Expired").length, "text-slate-600")}
      </section>
      <section className="rounded-xl border border-slate-200 bg-white p-5 md:p-6">
        <div><h2 className="text-lg font-bold text-slate-900">Job Listings</h2><p className="mt-1 text-sm text-slate-500">Search and filter job posts, then open a listing to review it.</p></div>
        <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search title, company, location..." className="rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500" />
          <select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)} className="rounded-lg border border-slate-300 bg-white px-4 py-3"><option value="All">All statuses</option>{jobStatuses.map((status) => <option key={status}>{status}</option>)}</select>
          <select value={typeFilter} onChange={(event) => setTypeFilter(event.target.value)} className="rounded-lg border border-slate-300 bg-white px-4 py-3"><option value="All">All employment types</option>{types.map((type) => <option key={type}>{type}</option>)}</select>
          <select value={locationFilter} onChange={(event) => setLocationFilter(event.target.value)} className="rounded-lg border border-slate-300 bg-white px-4 py-3"><option value="All">All locations</option>{locations.map((location) => <option key={location}>{location}</option>)}</select>
        </div>
        <div className="mt-5 overflow-x-auto"><table className="w-full min-w-[950px] text-left text-sm">
          <thead className="bg-slate-50 text-slate-500"><tr><th className="p-3 font-medium">Job Title</th><th className="p-3 font-medium">Company</th><th className="p-3 font-medium">Location</th><th className="p-3 font-medium">Employment Type</th><th className="p-3 font-medium">Posted Date</th><th className="p-3 font-medium">Status</th><th className="p-3 font-medium">Action</th></tr></thead>
          <tbody>{filtered.map((job) => <tr key={job.id} className="border-t border-slate-100"><td className="p-3 font-semibold text-slate-900">{job.title}{job.featured && <span className="ml-2 rounded-full bg-blue-50 px-2 py-0.5 text-[10px] font-semibold text-blue-700">Featured</span>}</td><td className="p-3 text-slate-600">{job.company}</td><td className="p-3 text-slate-600">{job.location}</td><td className="p-3 text-slate-600">{job.employmentType}</td><td className="p-3 text-slate-500">{job.posted}</td><td className="p-3"><span className={`rounded-full px-3 py-1 text-xs font-semibold ${jobBadge(job.status)}`}>{job.status}</span></td><td className="p-3"><button onClick={() => setSelected(job)} className="rounded-lg border border-blue-200 px-3 py-2 text-xs font-semibold text-blue-700 hover:bg-blue-50">View / Manage</button></td></tr>)}</tbody>
        </table></div>
        {filtered.length === 0 && <p className="py-10 text-center text-sm text-slate-500">No jobs match your search and filters.</p>}
      </section>
      {selected && <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-950/50 p-4"><section role="dialog" aria-modal="true" aria-labelledby="job-dialog-title" className="my-8 w-full max-w-2xl rounded-2xl bg-white p-6 shadow-xl">
        <div className="flex items-start justify-between gap-3"><div><h2 id="job-dialog-title" className="text-xl font-bold text-slate-900">{selected.title}</h2><p className="mt-1 text-sm text-slate-500">{selected.company} · Listing #{selected.id}</p></div><button aria-label="Close" onClick={() => setSelected(null)} className="text-2xl text-slate-400">×</button></div>
        <dl className="mt-6 grid gap-4 sm:grid-cols-2">{([["Company", selected.company], ["Location", selected.location], ["Employment Type", selected.employmentType], ["Posted Date", selected.posted], ["Compensation", selected.salary], ["Current Status", selected.status]]).map(([label, value]) => <div key={label}><dt className="text-xs text-slate-400">{label}</dt><dd className="mt-1 font-medium text-slate-800">{value}</dd></div>)}
          <div className="sm:col-span-2"><dt className="text-xs text-slate-400">Description</dt><dd className="mt-1 text-slate-600">{selected.description}</dd></div><div className="sm:col-span-2"><dt className="text-xs text-slate-400">Requirements</dt><dd className="mt-1 text-slate-600">{selected.requirements.join(" · ")}</dd></div></dl>
        <div className="mt-6 flex flex-wrap justify-end gap-2 border-t border-slate-100 pt-4">
          {selected.status === "Pending Approval" && <><button onClick={() => setJobStatus(selected, "Active")} className="rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700">Approve</button><button onClick={() => setJobStatus(selected, "Rejected")} className="rounded-lg border border-red-200 px-4 py-2 text-sm font-semibold text-red-600 hover:bg-red-50">Reject</button></>}
          <button onClick={() => toggleFeatured(selected)} className="rounded-lg border border-blue-200 px-4 py-2 text-sm font-semibold text-blue-700 hover:bg-blue-50">{selected.featured ? "Remove Feature" : "Feature Job"}</button>
          {selected.status === "Active" ? <button onClick={() => setJobStatus(selected, "Paused")} className="rounded-lg border border-orange-200 px-4 py-2 text-sm font-semibold text-orange-700 hover:bg-orange-50">Pause</button> : selected.status === "Paused" && <button onClick={() => setJobStatus(selected, "Active")} className="rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700">Resume</button>}
          <button onClick={() => deleteJob(selected)} className="rounded-lg border border-red-200 px-4 py-2 text-sm font-semibold text-red-600 hover:bg-red-50">Delete</button><button onClick={() => setSelected(null)} className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700">Close</button>
        </div>
      </section></div>}
      <p className="text-center text-xs text-slate-400">SkillBridge Global · Job Administration · Demo data</p>
    </div></main>
  );
}
