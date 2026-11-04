"use client";

import { useState } from "react";

type CompanySize = {
  id: number;
  name: string;
  minimumEmployees: number;
  maximumEmployees: number | null;
  description: string;
  status: "Active" | "Inactive";
};

const initialCompanySizes: CompanySize[] = [
  {
    id: 1,
    name: "1–10 employees",
    minimumEmployees: 1,
    maximumEmployees: 10,
    description: "Small teams and early-stage businesses",
    status: "Active",
  },
  {
    id: 2,
    name: "11–50 employees",
    minimumEmployees: 11,
    maximumEmployees: 50,
    description: "Growing small businesses",
    status: "Active",
  },
  {
    id: 3,
    name: "51–200 employees",
    minimumEmployees: 51,
    maximumEmployees: 200,
    description: "Established small to medium-sized companies",
    status: "Active",
  },
  {
    id: 4,
    name: "201–500 employees",
    minimumEmployees: 201,
    maximumEmployees: 500,
    description: "Mid-sized organizations",
    status: "Active",
  },
  {
    id: 5,
    name: "501–1,000 employees",
    minimumEmployees: 501,
    maximumEmployees: 1000,
    description: "Large and expanding organizations",
    status: "Active",
  },
  {
    id: 6,
    name: "1,001–5,000 employees",
    minimumEmployees: 1001,
    maximumEmployees: 5000,
    description: "Large enterprises with multiple teams",
    status: "Active",
  },
  {
    id: 7,
    name: "5,001–10,000 employees",
    minimumEmployees: 5001,
    maximumEmployees: 10000,
    description: "Global and enterprise-scale organizations",
    status: "Active",
  },
  {
    id: 8,
    name: "10,000+ employees",
    minimumEmployees: 10001,
    maximumEmployees: null,
    description: "Organizations with more than 10,000 employees",
    status: "Active",
  },
];

function formatEmployeeCount(count: number) {
  return new Intl.NumberFormat("en-US").format(count);
}

export default function AdminCompanySizesPage() {
  const [companySizes, setCompanySizes] =
    useState<CompanySize[]>(initialCompanySizes);
  const [name, setName] = useState("");
  const [minimumEmployees, setMinimumEmployees] = useState("");
  const [maximumEmployees, setMaximumEmployees] = useState("");
  const [description, setDescription] = useState("");
  const [search, setSearch] = useState("");
  const [formError, setFormError] = useState("");

  const searchTerm = search.trim().toLowerCase();
  const filteredCompanySizes = companySizes.filter((companySize) =>
    [
      companySize.name,
      companySize.description,
      String(companySize.minimumEmployees),
      companySize.maximumEmployees === null
        ? "above 10000"
        : String(companySize.maximumEmployees),
    ].some((value) => value.toLowerCase().includes(searchTerm))
  );
  const activeCount = companySizes.filter(
    (companySize) => companySize.status === "Active"
  ).length;

  function addCompanySize(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const minimum = Number(minimumEmployees);
    const maximum = maximumEmployees ? Number(maximumEmployees) : null;

    if (
      !name.trim() ||
      !minimumEmployees ||
      !Number.isInteger(minimum) ||
      minimum < 1
    ) {
      setFormError("Enter a name and a valid minimum employee count.");
      return;
    }

    if (
      maximumEmployees &&
      (!Number.isInteger(maximum) || maximum === null || maximum < minimum)
    ) {
      setFormError(
        "Maximum employees must be a whole number greater than or equal to the minimum."
      );
      return;
    }

    setFormError("");
    setCompanySizes((currentCompanySizes) => [
      ...currentCompanySizes,
      {
        id: Date.now(),
        name: name.trim(),
        minimumEmployees: minimum,
        maximumEmployees: maximum,
        description: description.trim() || "No description added",
        status: "Active",
      },
    ]);
    setName("");
    setMinimumEmployees("");
    setMaximumEmployees("");
    setDescription("");
  }

  function toggleStatus(id: number) {
    setCompanySizes((currentCompanySizes) =>
      currentCompanySizes.map((companySize) =>
        companySize.id === id
          ? {
              ...companySize,
              status:
                companySize.status === "Active" ? "Inactive" : "Active",
            }
          : companySize
      )
    );
  }

  function deleteCompanySize(companySize: CompanySize) {
    if (
      window.confirm(
        `Are you sure you want to delete "${companySize.name}"?`
      )
    ) {
      setCompanySizes((currentCompanySizes) =>
        currentCompanySizes.filter((item) => item.id !== companySize.id)
      );
    }
  }

  return (
    <main className="min-h-screen bg-slate-50 p-4 md:p-8">
      <div className="mx-auto max-w-7xl space-y-6">
        <header>
          <p className="text-sm font-medium text-blue-600">
            Admin / Company Settings
          </p>
          <h1 className="mt-2 text-3xl font-bold text-slate-900">
            Company Size Management
          </h1>
          <p className="mt-2 text-slate-500">
            Manage the employee ranges used to describe companies on
            SkillBridge Global.
          </p>
        </header>

        <section
          aria-label="Company size summary"
          className="grid gap-4 sm:grid-cols-3"
        >
          <div className="rounded-xl border border-slate-200 bg-white p-5">
            <p className="text-sm text-slate-500">Total Company Sizes</p>
            <p className="mt-2 text-3xl font-bold text-slate-900">
              {companySizes.length}
            </p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-5">
            <p className="text-sm text-slate-500">Active</p>
            <p className="mt-2 text-3xl font-bold text-green-600">
              {activeCount}
            </p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-5">
            <p className="text-sm text-slate-500">Inactive</p>
            <p className="mt-2 text-3xl font-bold text-red-500">
              {companySizes.length - activeCount}
            </p>
          </div>
        </section>

        <section className="rounded-xl border border-slate-200 bg-white p-6">
          <h2 className="text-lg font-bold text-slate-900">
            Add Company Size
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Define an employee range for company profiles.
          </p>
          <form
            onSubmit={addCompanySize}
            className="mt-5 grid gap-4 md:grid-cols-2"
          >
            <div className="md:col-span-2">
              <label
                htmlFor="company-size-name"
                className="mb-1.5 block text-sm font-medium text-slate-700"
              >
                Company Size Name
              </label>
              <input
                id="company-size-name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="e.g. 1–10 employees"
                required
                className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>
            <div>
              <label
                htmlFor="minimum-employees"
                className="mb-1.5 block text-sm font-medium text-slate-700"
              >
                Minimum Employees
              </label>
              <input
                id="minimum-employees"
                type="number"
                min="1"
                step="1"
                value={minimumEmployees}
                onChange={(event) => setMinimumEmployees(event.target.value)}
                placeholder="e.g. 1"
                required
                className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>
            <div>
              <label
                htmlFor="maximum-employees"
                className="mb-1.5 block text-sm font-medium text-slate-700"
              >
                Maximum Employees
                <span className="font-normal text-slate-500"> (optional)</span>
              </label>
              <input
                id="maximum-employees"
                type="number"
                min="1"
                step="1"
                value={maximumEmployees}
                onChange={(event) => setMaximumEmployees(event.target.value)}
                placeholder="Leave blank for no upper limit"
                className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>
            <div className="md:col-span-2">
              <label
                htmlFor="company-size-description"
                className="mb-1.5 block text-sm font-medium text-slate-700"
              >
                Description
              </label>
              <textarea
                id="company-size-description"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                placeholder="Briefly describe this company size"
                rows={3}
                className="w-full resize-y rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>
            {formError && (
              <p role="alert" className="text-sm text-red-600 md:col-span-2">
                {formError}
              </p>
            )}
            <div className="md:col-span-2">
              <button
                type="submit"
                className="rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                + Add Company Size
              </button>
            </div>
          </form>
        </section>

        <section className="rounded-xl border border-slate-200 bg-white p-6">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Company Size List
              </h2>
              <p className="text-sm text-slate-500">
                Search and manage company employee ranges.
              </p>
            </div>
            <label className="w-full md:max-w-sm">
              <span className="sr-only">Search company sizes</span>
              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search company sizes..."
                className="w-full rounded-lg border border-slate-300 px-4 py-2.5 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </label>
          </div>

          <div className="mt-5 overflow-x-auto">
            <table className="w-full min-w-[760px] text-left text-sm">
              <thead className="bg-slate-50 text-slate-500">
                <tr>
                  <th scope="col" className="p-3 font-medium">
                    Company Size
                  </th>
                  <th scope="col" className="p-3 font-medium">
                    Minimum Employees
                  </th>
                  <th scope="col" className="p-3 font-medium">
                    Maximum Employees
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
                {filteredCompanySizes.map((companySize) => (
                  <tr
                    key={companySize.id}
                    className="border-t border-slate-100"
                  >
                    <td className="p-3 font-semibold text-slate-800">
                      {companySize.name}
                    </td>
                    <td className="p-3 text-slate-600">
                      {formatEmployeeCount(companySize.minimumEmployees)}
                    </td>
                    <td className="p-3 text-slate-600">
                      {companySize.maximumEmployees === null
                        ? "No limit"
                        : formatEmployeeCount(companySize.maximumEmployees)}
                    </td>
                    <td className="max-w-sm p-3 text-slate-500">
                      {companySize.description}
                    </td>
                    <td className="p-3">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          companySize.status === "Active"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {companySize.status}
                      </span>
                    </td>
                    <td className="p-3">
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => toggleStatus(companySize.id)}
                          className="rounded-lg border border-slate-300 px-3 py-1.5 text-xs font-medium text-slate-700 transition hover:bg-slate-50"
                        >
                          {companySize.status === "Active"
                            ? "Disable"
                            : "Enable"}
                        </button>
                        <button
                          type="button"
                          onClick={() => deleteCompanySize(companySize)}
                          className="rounded-lg border border-red-200 px-3 py-1.5 text-xs font-medium text-red-600 transition hover:bg-red-50"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filteredCompanySizes.length === 0 && (
                  <tr>
                    <td
                      colSpan={6}
                      className="p-10 text-center text-slate-500"
                    >
                      <p className="font-medium text-slate-700">
                        No company sizes found
                      </p>
                      <p className="mt-1 text-sm">
                        Try another search term or add a new company size.
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
