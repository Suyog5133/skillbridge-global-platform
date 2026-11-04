"use client";

import { useState } from "react";

type CompanyStatus = "Verified" | "Pending" | "Suspended" | "Rejected";
type Company = {
  id: number; name: string; email: string; country: string; industry: string;
  size: string; status: CompanyStatus; website: string; founded: string; description: string;
};

const initialCompanies: Company[] = [
  { id: 6201, name: "TechNova Solutions", email: "hr@technova.example", country: "India", industry: "Information Technology", size: "201–500", status: "Verified", website: "technova.example", founded: "2016", description: "Cloud software and digital product engineering company serving global clients." },
  { id: 6202, name: "Northstar Health", email: "talent@northstar.example", country: "United States", industry: "Healthcare", size: "501–1,000", status: "Pending", website: "northstar.example", founded: "2012", description: "Healthcare technology and patient experience services provider." },
  { id: 6203, name: "Greenfield Learning", email: "careers@greenfield.example", country: "United Kingdom", industry: "Education", size: "51–200", status: "Verified", website: "greenfield.example", founded: "2019", description: "Digital learning platform and education services organization." },
  { id: 6204, name: "Meridian Finance Group", email: "people@meridian.example", country: "Singapore", industry: "Finance", size: "1,001–5,000", status: "Pending", website: "meridian.example", founded: "2008", description: "Financial services group supporting businesses across Asia-Pacific." },
  { id: 6205, name: "Atelier Creative", email: "studio@atelier.example", country: "Canada", industry: "Marketing", size: "11–50", status: "Suspended", website: "atelier.example", founded: "2021", description: "Independent creative and brand strategy studio." },
  { id: 6206, name: "LogiFlow Systems", email: "jobs@logiflow.example", country: "Germany", industry: "Logistics", size: "201–500", status: "Rejected", website: "logiflow.example", founded: "2015", description: "Logistics and supply-chain software company." },
];
const industries = [...new Set(initialCompanies.map((company) => company.industry))].sort();

function statusStyle(status: CompanyStatus) {
  if (status === "Verified") return "bg-green-100 text-green-700";
  if (status === "Pending") return "bg-orange-100 text-orange-700";
  if (status === "Suspended" || status === "Rejected") return "bg-red-100 text-red-700";
  return "bg-slate-100 text-slate-600";
}

export default function AdminCompaniesPage() {
  const [companies, setCompanies] = useState(initialCompanies);
  const [search, setSearch] = useState("");
  const [country, setCountry] = useState("All");
  const [industry, setIndustry] = useState("All");
  const [status, setStatus] = useState("All");
  const [selected, setSelected] = useState<Company | null>(null);
  const countries = [...new Set(companies.map((company) => company.country))].sort();
  const filtered = companies.filter((company) => {
    const term = search.trim().toLowerCase();
    return (!term || [company.name, company.email, company.country, company.industry].some((value) => value.toLowerCase().includes(term))) &&
      (country === "All" || company.country === country) &&
      (industry === "All" || company.industry === industry) &&
      (status === "All" || company.status === status);
  });

  function updateCompany(company: Company, next: CompanyStatus) {
    if (!window.confirm(`${next} company account "${company.name}"?`)) return;
    setCompanies((items) => items.map((item) => item.id === company.id ? { ...item, status: next } : item));
    setSelected((item) => item?.id === company.id ? { ...item, status: next } : item);
  }

  return (
    <main className="min-h-screen bg-slate-50 p-4 md:p-8"><div className="mx-auto max-w-7xl space-y-6">
      <header><p className="text-sm font-bold text-blue-600">SKILLBRIDGE GLOBAL · ADMIN PANEL</p><h1 className="mt-2 text-3xl font-bold text-slate-900">Company Management</h1><p className="mt-2 text-slate-500">Review organization profiles and manage company accounts.</p></header>
      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4" aria-label="Company summary">
        {[
          ["Total Companies", companies.length, "text-slate-900"],
          ["Verified Companies", companies.filter((item) => item.status === "Verified").length, "text-green-600"],
          ["Pending Companies", companies.filter((item) => item.status === "Pending").length, "text-orange-500"],
          ["Suspended Companies", companies.filter((item) => item.status === "Suspended").length, "text-red-600"],
        ].map(([label, count, color]) => <div key={label} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"><p className="text-sm text-slate-500">{label}</p><p className={`mt-2 text-3xl font-bold ${color}`}>{count}</p></div>)}
      </section>
      <section className="rounded-xl border border-slate-200 bg-white p-5 md:p-6">
        <div><h2 className="text-lg font-bold text-slate-900">Company Accounts</h2><p className="mt-1 text-sm text-slate-500">Search and filter organizations by location, industry, and verification status.</p></div>
        <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search company or email..." className="rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500" />
          <select value={country} onChange={(event) => setCountry(event.target.value)} className="rounded-lg border border-slate-300 bg-white px-4 py-3"><option value="All">All countries</option>{countries.map((item) => <option key={item}>{item}</option>)}</select>
          <select value={industry} onChange={(event) => setIndustry(event.target.value)} className="rounded-lg border border-slate-300 bg-white px-4 py-3"><option value="All">All industries</option>{industries.map((item) => <option key={item}>{item}</option>)}</select>
          <select value={status} onChange={(event) => setStatus(event.target.value)} className="rounded-lg border border-slate-300 bg-white px-4 py-3"><option value="All">All verification statuses</option>{(["Verified", "Pending", "Suspended", "Rejected"] as const).map((item) => <option key={item}>{item}</option>)}</select>
        </div>
        <div className="mt-5 overflow-x-auto"><table className="w-full min-w-[950px] text-left text-sm">
          <thead className="bg-slate-50 text-slate-500"><tr><th className="p-3 font-medium">Company</th><th className="p-3 font-medium">Country</th><th className="p-3 font-medium">Industry</th><th className="p-3 font-medium">Company Size</th><th className="p-3 font-medium">Status</th><th className="p-3 font-medium">Action</th></tr></thead>
          <tbody>{filtered.map((company) => <tr key={company.id} className="border-t border-slate-100">
            <td className="p-3"><p className="font-semibold text-slate-900">{company.name}</p><p className="text-xs text-slate-500">{company.email}</p></td><td className="p-3 text-slate-600">{company.country}</td><td className="p-3 text-slate-600">{company.industry}</td><td className="p-3 text-slate-600">{company.size} employees</td>
            <td className="p-3"><span className={`rounded-full px-3 py-1 text-xs font-semibold ${statusStyle(company.status)}`}>{company.status}</span></td><td className="p-3"><button onClick={() => setSelected(company)} className="rounded-lg border border-blue-200 px-3 py-2 text-xs font-semibold text-blue-700 hover:bg-blue-50">View / Manage</button></td>
          </tr>)}</tbody>
        </table></div>
        {filtered.length === 0 && <p className="py-10 text-center text-sm text-slate-500">No companies match your search and filters.</p>}
      </section>
      {selected && <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-950/50 p-4"><section role="dialog" aria-modal="true" aria-labelledby="company-dialog-title" className="my-8 w-full max-w-xl rounded-2xl bg-white p-6 shadow-xl">
        <div className="flex items-start justify-between gap-3"><div><h2 id="company-dialog-title" className="text-xl font-bold text-slate-900">Company Details</h2><p className="mt-1 text-sm text-slate-500">Organization ID · #{selected.id}</p></div><button aria-label="Close" onClick={() => setSelected(null)} className="text-2xl text-slate-400">×</button></div>
        <dl className="mt-6 grid gap-4 sm:grid-cols-2">
          {([["Company Name", selected.name], ["Email", selected.email], ["Country", selected.country], ["Industry", selected.industry], ["Company Size", `${selected.size} employees`], ["Website", selected.website], ["Founded", selected.founded], ["Verification Status", selected.status]]).map(([label, value]) => <div key={label}><dt className="text-xs text-slate-400">{label}</dt><dd className="mt-1 font-medium text-slate-800">{value}</dd></div>)}
          <div className="sm:col-span-2"><dt className="text-xs text-slate-400">Company Description</dt><dd className="mt-1 text-slate-600">{selected.description}</dd></div>
        </dl>
        <p className="mt-4 rounded-lg bg-slate-50 p-3 text-xs text-slate-500">Demo company record. Verification documents are not attached.</p>
        <div className="mt-5 flex flex-wrap justify-end gap-2">
          {selected.status === "Pending" && <><button onClick={() => updateCompany(selected, "Verified")} className="rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700">Approve</button><button onClick={() => updateCompany(selected, "Rejected")} className="rounded-lg border border-red-200 px-4 py-2 text-sm font-semibold text-red-600 hover:bg-red-50">Reject</button></>}
          {selected.status !== "Suspended" && <button onClick={() => updateCompany(selected, "Suspended")} className="rounded-lg border border-orange-200 px-4 py-2 text-sm font-semibold text-orange-700 hover:bg-orange-50">Suspend</button>}
          {selected.status === "Suspended" && <button onClick={() => updateCompany(selected, "Verified")} className="rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700">Reactivate</button>}
          <button onClick={() => setSelected(null)} className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700">Close</button>
        </div>
      </section></div>}
      <p className="text-center text-xs text-slate-400">SkillBridge Global · Company Administration · Demo data</p>
    </div></main>
  );
}
