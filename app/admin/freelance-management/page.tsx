"use client";

import { useState } from "react";

type ProjectStatus = "Active" | "Pending Approval" | "Completed" | "Rejected" | "Suspended" | "Reported";
type Project = {
  id: number; title: string; client: string; budget: number; currency: string;
  skills: string[]; deadline: string; category: string; status: ProjectStatus;
  description: string; deliverables: string[]; featured: boolean;
};
const initialProjects: Project[] = [
  { id: 9101, title: "Build a multilingual company website", client: "Northstar Health", budget: 4200, currency: "USD", skills: ["Next.js", "Localization", "Tailwind CSS"], deadline: "Dec 15, 2026", category: "Web Development", status: "Pending Approval", description: "Create an accessible multilingual marketing website with CMS integration.", deliverables: ["Responsive website", "CMS setup", "Editor handover"], featured: false },
  { id: 9102, title: "Redesign mobile banking experience", client: "Meridian Finance Group", budget: 7800, currency: "USD", skills: ["Product Design", "Figma", "Prototyping"], deadline: "Dec 08, 2026", category: "Design", status: "Active", description: "Design and prototype an improved mobile banking experience for international customers.", deliverables: ["Research summary", "High-fidelity UI", "Interactive prototype"], featured: true },
  { id: 9103, title: "Create product launch campaign", client: "Atelier Creative", budget: 1800, currency: "USD", skills: ["Copywriting", "Social Media", "Campaigns"], deadline: "Nov 30, 2026", category: "Marketing", status: "Active", description: "Develop a launch campaign including content for social and email channels.", deliverables: ["Campaign plan", "Content calendar", "Creative assets"], featured: false },
  { id: 9104, title: "Automate logistics reporting", client: "LogiFlow Systems", budget: 12500, currency: "EUR", skills: ["Python", "Data Engineering", "AWS"], deadline: "Jan 20, 2027", category: "Data & Analytics", status: "Completed", description: "Build a reliable pipeline that automates weekly logistics reporting.", deliverables: ["ETL pipeline", "Dashboard", "Documentation"], featured: false },
  { id: 9105, title: "Develop employee learning portal", client: "Greenfield Learning", budget: 950, currency: "GBP", skills: ["WordPress", "LMS", "CSS"], deadline: "Dec 01, 2026", category: "Web Development", status: "Reported", description: "Configure and customize an employee learning portal using the client's LMS.", deliverables: ["Portal configuration", "Theme customization"], featured: false },
  { id: 9106, title: "Audit cloud security controls", client: "TechNova Solutions", budget: 5600, currency: "USD", skills: ["Security", "AWS", "Compliance"], deadline: "Dec 22, 2026", category: "IT & Security", status: "Suspended", description: "Review cloud controls and provide prioritized security recommendations.", deliverables: ["Control assessment", "Findings report", "Action plan"], featured: false },
];
const categories = [...new Set(initialProjects.map((project) => project.category))].sort();
const projectStatuses: ProjectStatus[] = ["Active", "Pending Approval", "Completed", "Rejected", "Suspended", "Reported"];
function projectBadge(status: ProjectStatus) {
  if (status === "Active" || status === "Completed") return "bg-green-100 text-green-700";
  if (status === "Pending Approval") return "bg-orange-100 text-orange-700";
  if (status === "Rejected" || status === "Suspended") return "bg-red-100 text-red-700";
  return "bg-purple-100 text-purple-700";
}
function money(project: Project) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: project.currency, maximumFractionDigits: 0 }).format(project.budget);
}

export default function AdminFreelanceManagementPage() {
  const [projects, setProjects] = useState(initialProjects);
  const [search, setSearch] = useState("");
  const [budgetFilter, setBudgetFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selected, setSelected] = useState<Project | null>(null);
  const filtered = projects.filter((project) => {
    const term = search.trim().toLowerCase();
    const budgetMatches = budgetFilter === "All" ||
      (budgetFilter === "Under $1,000" && project.budget < 1000) ||
      (budgetFilter === "$1,000–$5,000" && project.budget >= 1000 && project.budget <= 5000) ||
      (budgetFilter === "$5,000+" && project.budget > 5000);
    return (!term || [project.title, project.client, ...project.skills].some((value) => value.toLowerCase().includes(term))) &&
      budgetMatches &&
      (categoryFilter === "All" || project.category === categoryFilter) &&
      (statusFilter === "All" || project.status === statusFilter);
  });
  function setProjectStatus(project: Project, next: ProjectStatus) {
    if ((next === "Rejected" || next === "Suspended") && !window.confirm(`${next} project "${project.title}"?`)) return;
    setProjects((items) => items.map((item) => item.id === project.id ? { ...item, status: next } : item));
    setSelected((item) => item?.id === project.id ? { ...item, status: next } : item);
  }
  function toggleFeature(project: Project) {
    setProjects((items) => items.map((item) => item.id === project.id ? { ...item, featured: !item.featured } : item));
    setSelected((item) => item?.id === project.id ? { ...item, featured: !item.featured } : item);
  }
  function deleteProject(project: Project) {
    if (!window.confirm(`Delete project "${project.title}"?`)) return;
    setProjects((items) => items.filter((item) => item.id !== project.id));
    setSelected(null);
  }
  const summary = [
    ["Total Projects", projects.length, "text-slate-900"],
    ["Active Projects", projects.filter((item) => item.status === "Active").length, "text-green-600"],
    ["Pending Approval", projects.filter((item) => item.status === "Pending Approval").length, "text-orange-500"],
    ["Completed", projects.filter((item) => item.status === "Completed").length, "text-blue-600"],
    ["Reported Projects", projects.filter((item) => item.status === "Reported").length, "text-purple-600"],
  ];

  return (
    <main className="min-h-screen bg-slate-50 p-4 md:p-8"><div className="mx-auto max-w-7xl space-y-6">
      <header><p className="text-sm font-bold text-blue-600">SKILLBRIDGE GLOBAL · ADMIN PANEL</p><h1 className="mt-2 text-3xl font-bold text-slate-900">Freelance Project Management</h1><p className="mt-2 text-slate-500">Moderate client projects and maintain a trusted freelance marketplace.</p></header>
      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5" aria-label="Project summary">{summary.map(([label, count, tone]) => <div key={label} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"><p className="text-sm text-slate-500">{label}</p><p className={`mt-2 text-3xl font-bold ${tone}`}>{count}</p></div>)}</section>
      <section className="rounded-xl border border-slate-200 bg-white p-5 md:p-6">
        <div><h2 className="text-lg font-bold text-slate-900">Freelance Projects</h2><p className="mt-1 text-sm text-slate-500">Search and filter projects by budget, category, or moderation status.</p></div>
        <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search project, client, skill..." className="rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500" />
          <select value={budgetFilter} onChange={(event) => setBudgetFilter(event.target.value)} className="rounded-lg border border-slate-300 bg-white px-4 py-3"><option>All</option><option>Under $1,000</option><option>$1,000–$5,000</option><option>$5,000+</option></select>
          <select value={categoryFilter} onChange={(event) => setCategoryFilter(event.target.value)} className="rounded-lg border border-slate-300 bg-white px-4 py-3"><option value="All">All categories</option>{categories.map((category) => <option key={category}>{category}</option>)}</select>
          <select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)} className="rounded-lg border border-slate-300 bg-white px-4 py-3"><option value="All">All statuses</option>{projectStatuses.map((status) => <option key={status}>{status}</option>)}</select>
        </div>
        <div className="mt-5 overflow-x-auto"><table className="w-full min-w-[950px] text-left text-sm"><thead className="bg-slate-50 text-slate-500"><tr><th className="p-3 font-medium">Project Title</th><th className="p-3 font-medium">Client</th><th className="p-3 font-medium">Budget</th><th className="p-3 font-medium">Skills</th><th className="p-3 font-medium">Deadline</th><th className="p-3 font-medium">Status</th><th className="p-3 font-medium">Action</th></tr></thead><tbody>
          {filtered.map((project) => <tr key={project.id} className="border-t border-slate-100"><td className="p-3 font-semibold text-slate-900">{project.title}{project.featured && <span className="ml-2 rounded-full bg-blue-50 px-2 py-0.5 text-[10px] font-semibold text-blue-700">Featured</span>}</td><td className="p-3 text-slate-600">{project.client}</td><td className="p-3 font-medium text-slate-700">{money(project)}</td><td className="max-w-xs p-3 text-slate-500">{project.skills.join(", ")}</td><td className="p-3 text-slate-500">{project.deadline}</td><td className="p-3"><span className={`rounded-full px-3 py-1 text-xs font-semibold ${projectBadge(project.status)}`}>{project.status}</span></td><td className="p-3"><button onClick={() => setSelected(project)} className="rounded-lg border border-blue-200 px-3 py-2 text-xs font-semibold text-blue-700 hover:bg-blue-50">View / Manage</button></td></tr>)}
        </tbody></table></div>
        {filtered.length === 0 && <p className="py-10 text-center text-sm text-slate-500">No projects match your search and filters.</p>}
      </section>
      {selected && <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-950/50 p-4"><section role="dialog" aria-modal="true" aria-labelledby="project-dialog-title" className="my-8 w-full max-w-2xl rounded-2xl bg-white p-6 shadow-xl">
        <div className="flex items-start justify-between gap-3"><div><h2 id="project-dialog-title" className="text-xl font-bold text-slate-900">{selected.title}</h2><p className="mt-1 text-sm text-slate-500">{selected.client} · Project #{selected.id}</p></div><button aria-label="Close" onClick={() => setSelected(null)} className="text-2xl text-slate-400">×</button></div>
        <dl className="mt-6 grid gap-4 sm:grid-cols-2">{([["Client", selected.client], ["Category", selected.category], ["Budget", money(selected)], ["Deadline", selected.deadline], ["Status", selected.status], ["Skills", selected.skills.join(", ")]]).map(([label, value]) => <div key={label}><dt className="text-xs text-slate-400">{label}</dt><dd className="mt-1 font-medium text-slate-800">{value}</dd></div>)}<div className="sm:col-span-2"><dt className="text-xs text-slate-400">Project Description</dt><dd className="mt-1 text-slate-600">{selected.description}</dd></div><div className="sm:col-span-2"><dt className="text-xs text-slate-400">Deliverables</dt><dd className="mt-1 text-slate-600">{selected.deliverables.join(" · ")}</dd></div></dl>
        <div className="mt-6 flex flex-wrap justify-end gap-2 border-t border-slate-100 pt-4">
          {selected.status === "Pending Approval" && <><button onClick={() => setProjectStatus(selected, "Active")} className="rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700">Approve</button><button onClick={() => setProjectStatus(selected, "Rejected")} className="rounded-lg border border-red-200 px-4 py-2 text-sm font-semibold text-red-600 hover:bg-red-50">Reject</button></>}
          <button onClick={() => toggleFeature(selected)} className="rounded-lg border border-blue-200 px-4 py-2 text-sm font-semibold text-blue-700 hover:bg-blue-50">{selected.featured ? "Remove Feature" : "Feature Project"}</button>
          {selected.status !== "Suspended" && <button onClick={() => setProjectStatus(selected, "Suspended")} className="rounded-lg border border-orange-200 px-4 py-2 text-sm font-semibold text-orange-700 hover:bg-orange-50">Suspend</button>}
          {selected.status === "Suspended" && <button onClick={() => setProjectStatus(selected, "Active")} className="rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700">Reactivate</button>}
          <button onClick={() => deleteProject(selected)} className="rounded-lg border border-red-200 px-4 py-2 text-sm font-semibold text-red-600 hover:bg-red-50">Delete</button><button onClick={() => setSelected(null)} className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700">Close</button>
        </div>
      </section></div>}
      <p className="text-center text-xs text-slate-400">SkillBridge Global · Freelance Administration · Demo data</p>
    </div></main>
  );
}
