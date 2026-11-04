"use client";

import { useState } from "react";

type Industry = {
  id: number;
  name: string;
  description: string;
  category: string;
  status: "Active" | "Inactive";
};

const industryCategories = [
  "Technology & Digital",
  "Healthcare & Life Sciences",
  "Education",
  "Finance & Professional Services",
  "Commerce & Retail",
  "Manufacturing & Construction",
  "Media & Communications",
  "Travel & Logistics",
  "Agriculture",
  "Other",
];

const initialIndustries: Industry[] = [
  {
    id: 1,
    name: "IT",
    description: "Software, IT services, and digital solutions",
    category: "Technology & Digital",
    status: "Active",
  },
  {
    id: 2,
    name: "Healthcare",
    description: "Healthcare services, medical care, and wellness",
    category: "Healthcare & Life Sciences",
    status: "Active",
  },
  {
    id: 3,
    name: "Education",
    description: "Education, training, and learning services",
    category: "Education",
    status: "Active",
  },
  {
    id: 4,
    name: "Finance",
    description: "Banking, financial services, and insurance",
    category: "Finance & Professional Services",
    status: "Active",
  },
  {
    id: 5,
    name: "E-commerce",
    description: "Online marketplaces and digital commerce",
    category: "Commerce & Retail",
    status: "Active",
  },
  {
    id: 6,
    name: "Manufacturing",
    description: "Production, processing, and industrial operations",
    category: "Manufacturing & Construction",
    status: "Active",
  },
  {
    id: 7,
    name: "Construction",
    description: "Building, infrastructure, and engineering",
    category: "Manufacturing & Construction",
    status: "Active",
  },
  {
    id: 8,
    name: "Marketing",
    description: "Brand strategy, advertising, and marketing services",
    category: "Media & Communications",
    status: "Active",
  },
  {
    id: 9,
    name: "Media",
    description: "Film, music, publishing, and entertainment",
    category: "Media & Communications",
    status: "Active",
  },
  {
    id: 10,
    name: "Telecommunications",
    description: "Telecom networks, connectivity, and communication services",
    category: "Media & Communications",
    status: "Active",
  },
  {
    id: 11,
    name: "Retail",
    description: "In-store retail, consumer goods, and sales",
    category: "Commerce & Retail",
    status: "Active",
  },
  {
    id: 12,
    name: "Hospitality",
    description: "Travel, accommodation, food, and guest services",
    category: "Travel & Logistics",
    status: "Active",
  },
  {
    id: 13,
    name: "Logistics",
    description: "Transportation, supply chain, and logistics services",
    category: "Travel & Logistics",
    status: "Active",
  },
  {
    id: 14,
    name: "Agriculture",
    description: "Farming, agribusiness, and food production",
    category: "Agriculture",
    status: "Active",
  },
  {
    id: 15,
    name: "Cybersecurity",
    description: "Information security, risk management, and data protection",
    category: "Technology & Digital",
    status: "Active",
  },
];

export default function AdminIndustriesPage() {
  const [industries, setIndustries] = useState<Industry[]>(initialIndustries);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [search, setSearch] = useState("");

  const searchTerm = search.trim().toLowerCase();
  const filteredIndustries = industries.filter((industry) =>
    [industry.name, industry.description, industry.category].some((value) =>
      value.toLowerCase().includes(searchTerm)
    )
  );
  const activeCount = industries.filter(
    (industry) => industry.status === "Active"
  ).length;

  function addIndustry(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!name.trim() || !category) {
      return;
    }

    setIndustries((currentIndustries) => [
      ...currentIndustries,
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
    setIndustries((currentIndustries) =>
      currentIndustries.map((industry) =>
        industry.id === id
          ? {
              ...industry,
              status: industry.status === "Active" ? "Inactive" : "Active",
            }
          : industry
      )
    );
  }

  function deleteIndustry(industry: Industry) {
    if (window.confirm(`Are you sure you want to delete "${industry.name}"?`)) {
      setIndustries((currentIndustries) =>
        currentIndustries.filter((item) => item.id !== industry.id)
      );
    }
  }

  return (
    <main className="min-h-screen bg-slate-50 p-4 md:p-8">
      <div className="mx-auto max-w-7xl space-y-6">
        <header>
          <p className="text-sm font-medium text-blue-600">
            Admin / Job Settings
          </p>
          <h1 className="mt-2 text-3xl font-bold text-slate-900">
            Industry Management
          </h1>
          <p className="mt-2 text-slate-500">
            Manage the industries available across SkillBridge Global.
          </p>
        </header>

        <section
          aria-label="Industry summary"
          className="grid gap-4 sm:grid-cols-3"
        >
          <div className="rounded-xl border border-slate-200 bg-white p-5">
            <p className="text-sm text-slate-500">Total Industries</p>
            <p className="mt-2 text-3xl font-bold text-slate-900">
              {industries.length}
            </p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-5">
            <p className="text-sm text-slate-500">Active Industries</p>
            <p className="mt-2 text-3xl font-bold text-green-600">
              {activeCount}
            </p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-5">
            <p className="text-sm text-slate-500">Inactive Industries</p>
            <p className="mt-2 text-3xl font-bold text-red-500">
              {industries.length - activeCount}
            </p>
          </div>
        </section>

        <section className="rounded-xl border border-slate-200 bg-white p-6">
          <h2 className="text-lg font-bold text-slate-900">Add Industry</h2>
          <p className="mt-1 text-sm text-slate-500">
            Add an industry to the categories available on the platform.
          </p>
          <form onSubmit={addIndustry} className="mt-5 grid gap-4 md:grid-cols-2">
            <div>
              <label
                htmlFor="industry-name"
                className="mb-1.5 block text-sm font-medium text-slate-700"
              >
                Industry Name
              </label>
              <input
                id="industry-name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="e.g. Renewable Energy"
                required
                className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>
            <div>
              <label
                htmlFor="industry-category"
                className="mb-1.5 block text-sm font-medium text-slate-700"
              >
                Industry Category
              </label>
              <select
                id="industry-category"
                value={category}
                onChange={(event) => setCategory(event.target.value)}
                required
                className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              >
                <option value="" disabled>
                  Select a category
                </option>
                {industryCategories.map((industryCategory) => (
                  <option key={industryCategory} value={industryCategory}>
                    {industryCategory}
                  </option>
                ))}
              </select>
            </div>
            <div className="md:col-span-2">
              <label
                htmlFor="industry-description"
                className="mb-1.5 block text-sm font-medium text-slate-700"
              >
                Industry Description
              </label>
              <textarea
                id="industry-description"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                placeholder="Briefly describe this industry"
                rows={3}
                className="w-full resize-y rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>
            <div className="md:col-span-2">
              <button
                type="submit"
                className="rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                + Add Industry
              </button>
            </div>
          </form>
        </section>

        <section className="rounded-xl border border-slate-200 bg-white p-6">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Industry List
              </h2>
              <p className="text-sm text-slate-500">
                Search and manage platform industries.
              </p>
            </div>
            <label className="w-full md:max-w-sm">
              <span className="sr-only">Search industries</span>
              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search industries..."
                className="w-full rounded-lg border border-slate-300 px-4 py-2.5 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </label>
          </div>

          <div className="mt-5 overflow-x-auto">
            <table className="w-full min-w-[760px] text-left text-sm">
              <thead className="bg-slate-50 text-slate-500">
                <tr>
                  <th scope="col" className="p-3 font-medium">
                    Industry
                  </th>
                  <th scope="col" className="p-3 font-medium">
                    Category
                  </th>
                  <th scope="col" className="p-3 font-medium">
                    Description
                  </th>
                  <th scope="col" className="p-3 font-medium">
                    Status
                  </th>
                  <th scope="col" className="p-3 font-medium">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredIndustries.map((industry) => (
                  <tr key={industry.id} className="border-t border-slate-100">
                    <td className="p-3 font-semibold text-slate-800">
                      {industry.name}
                    </td>
                    <td className="p-3 text-slate-600">{industry.category}</td>
                    <td className="max-w-sm p-3 text-slate-500">
                      {industry.description}
                    </td>
                    <td className="p-3">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          industry.status === "Active"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {industry.status}
                      </span>
                    </td>
                    <td className="p-3">
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => toggleStatus(industry.id)}
                          className="rounded-lg border border-slate-300 px-3 py-1.5 text-xs font-medium text-slate-700 transition hover:bg-slate-50"
                        >
                          {industry.status === "Active" ? "Disable" : "Enable"}
                        </button>
                        <button
                          type="button"
                          onClick={() => deleteIndustry(industry)}
                          className="rounded-lg border border-red-200 px-3 py-1.5 text-xs font-medium text-red-600 transition hover:bg-red-50"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filteredIndustries.length === 0 && (
                  <tr>
                    <td
                      colSpan={5}
                      className="p-10 text-center text-slate-500"
                    >
                      <p className="font-medium text-slate-700">
                        No industries found
                      </p>
                      <p className="mt-1 text-sm">
                        Try another search term or add a new industry.
                      </p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

        <p className="text-xs text-slate-400">
          Demo version: changes are temporary and stored only in the current
          page state.
        </p>
      </div>
    </main>
  );
}
