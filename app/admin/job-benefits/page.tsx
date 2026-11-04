"use client";

import { useState, type FormEvent } from "react";

type JobBenefit = {
  id: number;
  name: string;
  description: string;
  category: string;
  status: "Active" | "Inactive";
};

const benefitCategories = [
  "Health & Wellness",
  "Financial",
  "Time Off & Flexibility",
  "Professional Development",
  "Workplace Perks",
];

const initialBenefits: JobBenefit[] = [
  { id: 1, name: "Health Insurance", description: "Medical coverage for employees and eligible dependents", category: "Health & Wellness", status: "Active" },
  { id: 2, name: "Life Insurance", description: "Life insurance coverage for employees", category: "Financial", status: "Active" },
  { id: 3, name: "Paid Leave", description: "Paid annual and personal leave", category: "Time Off & Flexibility", status: "Active" },
  { id: 4, name: "Flexible Working Hours", description: "Flexible scheduling around core working hours", category: "Time Off & Flexibility", status: "Active" },
  { id: 5, name: "Work From Home", description: "Option to work remotely from home", category: "Time Off & Flexibility", status: "Active" },
  { id: 6, name: "Performance Bonus", description: "Additional compensation based on performance", category: "Financial", status: "Active" },
  { id: 7, name: "Provident Fund", description: "Employer contributions to a provident fund", category: "Financial", status: "Active" },
  { id: 8, name: "Retirement Benefits", description: "Long-term savings and retirement support", category: "Financial", status: "Active" },
  { id: 9, name: "Learning & Development", description: "Training, courses, and professional learning support", category: "Professional Development", status: "Active" },
  { id: 10, name: "Transportation Allowance", description: "Allowance for commuting and local transportation", category: "Workplace Perks", status: "Active" },
  { id: 11, name: "Food Allowance", description: "Meal allowance or food stipend", category: "Workplace Perks", status: "Active" },
  { id: 12, name: "Paid Holidays", description: "Paid time off on designated public holidays", category: "Time Off & Flexibility", status: "Active" },
  { id: 13, name: "Wellness Programs", description: "Programs and resources supporting employee wellbeing", category: "Health & Wellness", status: "Active" },
  { id: 14, name: "Stock Options", description: "Equity or stock option opportunities", category: "Financial", status: "Active" },
];

export default function AdminJobBenefitsPage() {
  const [benefits, setBenefits] = useState<JobBenefit[]>(initialBenefits);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [search, setSearch] = useState("");

  const searchTerm = search.trim().toLowerCase();
  const filteredBenefits = benefits.filter((benefit) =>
    [benefit.name, benefit.description, benefit.category].some((value) =>
      value.toLowerCase().includes(searchTerm)
    )
  );
  const activeCount = benefits.filter(
    (benefit) => benefit.status === "Active"
  ).length;

  function addBenefit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!name.trim() || !category) return;

    setBenefits((currentBenefits) => [
      ...currentBenefits,
      {
        id: Date.now(),
        name: name.trim(),
        description: description.trim() || "No description added",
        category,
        status: "Active",
      },
    ]);
    setName("");
    setDescription("");
    setCategory("");
  }

  function toggleStatus(id: number) {
    setBenefits((currentBenefits) =>
      currentBenefits.map((benefit) =>
        benefit.id === id
          ? {
              ...benefit,
              status: benefit.status === "Active" ? "Inactive" : "Active",
            }
          : benefit
      )
    );
  }

  function deleteBenefit(benefit: JobBenefit) {
    if (window.confirm(`Are you sure you want to delete "${benefit.name}"?`)) {
      setBenefits((currentBenefits) =>
        currentBenefits.filter((item) => item.id !== benefit.id)
      );
    }
  }

  return (
    <main className="min-h-screen bg-slate-50 p-4 md:p-8">
      <div className="mx-auto max-w-7xl space-y-6">
        <header>
          <p className="text-sm font-medium text-blue-600">Admin / Job Settings</p>
          <h1 className="mt-2 text-3xl font-bold text-slate-900">
            Job Benefits Management
          </h1>
          <p className="mt-2 text-slate-500">
            Manage the benefits employers can feature on SkillBridge Global.
          </p>
        </header>

        <section aria-label="Benefit summary" className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-xl border border-slate-200 bg-white p-5">
            <p className="text-sm text-slate-500">Total Benefits</p>
            <p className="mt-2 text-3xl font-bold text-slate-900">{benefits.length}</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-5">
            <p className="text-sm text-slate-500">Active Benefits</p>
            <p className="mt-2 text-3xl font-bold text-green-600">{activeCount}</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-5">
            <p className="text-sm text-slate-500">Inactive Benefits</p>
            <p className="mt-2 text-3xl font-bold text-red-500">
              {benefits.length - activeCount}
            </p>
          </div>
        </section>

        <section className="rounded-xl border border-slate-200 bg-white p-6">
          <h2 className="text-lg font-bold text-slate-900">Add Job Benefit</h2>
          <p className="mt-1 text-sm text-slate-500">
            Add a benefit to the options available to employers.
          </p>
          <form onSubmit={addBenefit} className="mt-5 grid gap-4 md:grid-cols-2">
            <div>
              <label htmlFor="benefit-name" className="mb-1.5 block text-sm font-medium text-slate-700">
                Benefit Name
              </label>
              <input
                id="benefit-name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="e.g. Childcare Support"
                required
                className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>
            <div>
              <label htmlFor="benefit-category" className="mb-1.5 block text-sm font-medium text-slate-700">
                Benefit Category
              </label>
              <select
                id="benefit-category"
                value={category}
                onChange={(event) => setCategory(event.target.value)}
                required
                className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              >
                <option value="" disabled>Select a category</option>
                {benefitCategories.map((benefitCategory) => (
                  <option key={benefitCategory} value={benefitCategory}>{benefitCategory}</option>
                ))}
              </select>
            </div>
            <div className="md:col-span-2">
              <label htmlFor="benefit-description" className="mb-1.5 block text-sm font-medium text-slate-700">
                Description
              </label>
              <textarea
                id="benefit-description"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                placeholder="Briefly describe this benefit"
                rows={3}
                className="w-full resize-y rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>
            <div className="md:col-span-2">
              <button type="submit" className="rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                + Add Benefit
              </button>
            </div>
          </form>
        </section>

        <section className="rounded-xl border border-slate-200 bg-white p-6">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
            <div>
              <h2 className="text-lg font-bold text-slate-900">Benefit List</h2>
              <p className="text-sm text-slate-500">Search and manage available job benefits.</p>
            </div>
            <label className="w-full md:max-w-sm">
              <span className="sr-only">Search benefits</span>
              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search benefits..."
                className="w-full rounded-lg border border-slate-300 px-4 py-2.5 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </label>
          </div>
          <div className="mt-5 overflow-x-auto">
            <table className="w-full min-w-[760px] text-left text-sm">
              <thead className="bg-slate-50 text-slate-500">
                <tr>
                  <th scope="col" className="p-3 font-medium">Benefit</th>
                  <th scope="col" className="p-3 font-medium">Category</th>
                  <th scope="col" className="p-3 font-medium">Description</th>
                  <th scope="col" className="p-3 font-medium">Status</th>
                  <th scope="col" className="p-3 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredBenefits.map((benefit) => (
                  <tr key={benefit.id} className="border-t border-slate-100">
                    <td className="p-3 font-semibold text-slate-800">{benefit.name}</td>
                    <td className="p-3 text-slate-600">{benefit.category}</td>
                    <td className="max-w-sm p-3 text-slate-500">{benefit.description}</td>
                    <td className="p-3">
                      <span className={`rounded-full px-3 py-1 text-xs font-semibold ${benefit.status === "Active" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                        {benefit.status}
                      </span>
                    </td>
                    <td className="p-3">
                      <div className="flex gap-2">
                        <button type="button" onClick={() => toggleStatus(benefit.id)} className="rounded-lg border border-slate-300 px-3 py-1.5 text-xs font-medium text-slate-700 transition hover:bg-slate-50">
                          {benefit.status === "Active" ? "Disable" : "Enable"}
                        </button>
                        <button type="button" onClick={() => deleteBenefit(benefit)} className="rounded-lg border border-red-200 px-3 py-1.5 text-xs font-medium text-red-600 transition hover:bg-red-50">
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filteredBenefits.length === 0 && (
                  <tr>
                    <td colSpan={5} className="p-10 text-center text-slate-500">
                      <p className="font-medium text-slate-700">No benefits found</p>
                      <p className="mt-1 text-sm">Try another search or add a new benefit.</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

        <p className="text-xs text-slate-400">
          Demo version: changes are temporary and stored only in the current page state.
        </p>
      </div>
    </main>
  );
}
