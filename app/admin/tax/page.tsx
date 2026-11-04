
"use client";

import { useState } from "react";

type TaxRule = {
  id: number;
  country: string;
  code: string;
  taxName: string;
  rate: number;
  type: string;
  active: boolean;
};

export default function AdminTaxPage() {
  const [rules, setRules] = useState<TaxRule[]>([
    { id: 1, country: "India", code: "IN", taxName: "GST", rate: 18, type: "Percentage", active: true },
    { id: 2, country: "United States", code: "US", taxName: "Sales Tax", rate: 7.5, type: "Percentage", active: true },
    { id: 3, country: "United Kingdom", code: "GB", taxName: "VAT", rate: 20, type: "Percentage", active: true },
    { id: 4, country: "Germany", code: "DE", taxName: "VAT", rate: 19, type: "Percentage", active: true },
    { id: 5, country: "Australia", code: "AU", taxName: "GST", rate: 10, type: "Percentage", active: false },
  ]);

  const [country, setCountry] = useState("");
  const [code, setCode] = useState("");
  const [taxName, setTaxName] = useState("");
  const [rate, setRate] = useState("");
  const [search, setSearch] = useState("");

  const filtered = rules.filter((r) =>
    `${r.country} ${r.taxName} ${r.code}`.toLowerCase().includes(search.toLowerCase())
  );

  function addRule(e: React.FormEvent) {
    e.preventDefault();
    if (!country || !code || !taxName || !rate) return;

    setRules([...rules, {
      id: Date.now(),
      country,
      code: code.toUpperCase(),
      taxName,
      rate: Number(rate),
      type: "Percentage",
      active: true,
    }]);

    setCountry("");
    setCode("");
    setTaxName("");
    setRate("");
  }

  function toggleRule(id: number) {
    setRules(rules.map((r) =>
      r.id === id ? { ...r, active: !r.active } : r
    ));
  }

  function deleteRule(id: number) {
    const rule = rules.find((item) => item.id === id);
    if (!rule || !window.confirm(`Delete the ${rule.taxName} rule for ${rule.country}?`)) {
      return;
    }
    setRules(rules.filter((r) => r.id !== id));
  }

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8">
      <div className="mx-auto max-w-7xl space-y-7">

        <div>
          <p className="text-sm font-semibold text-blue-600">ADMIN / FINANCE SETTINGS</p>
          <h1 className="mt-2 text-3xl font-bold text-slate-900">
            Global Tax & VAT Management
          </h1>
          <p className="mt-2 text-slate-500">
            Manage country-wise tax configuration for the SkillBridge Global platform.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-xl border bg-white p-5">
            <p className="text-sm text-slate-500">Total Tax Rules</p>
            <h2 className="mt-2 text-3xl font-bold">{rules.length}</h2>
          </div>
          <div className="rounded-xl border bg-white p-5">
            <p className="text-sm text-slate-500">Active Rules</p>
            <h2 className="mt-2 text-3xl font-bold text-green-600">
              {rules.filter((r) => r.active).length}
            </h2>
          </div>
          <div className="rounded-xl border bg-white p-5">
            <p className="text-sm text-slate-500">Countries Covered</p>
            <h2 className="mt-2 text-3xl font-bold text-blue-600">
              {new Set(rules.map((r) => r.code)).size}
            </h2>
          </div>
        </div>

        <section className="rounded-xl border bg-white p-6">
          <div className="mb-5 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
            <h2 className="text-xl font-bold">Country Tax Rules</h2>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search country or tax..."
              className="rounded-lg border p-3 sm:w-72"
            />
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px] text-left text-sm">
              <thead className="bg-slate-100 text-slate-600">
                <tr>
                  <th className="p-3">Country</th>
                  <th className="p-3">Tax Name</th>
                  <th className="p-3">Rate (%)</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((r) => (
                  <tr key={r.id} className="border-b">
                    <td className="p-3">
                      <strong>{r.country}</strong>
                      <p className="text-xs text-slate-500">{r.code}</p>
                    </td>
                    <td className="p-3">{r.taxName}</td>
                    <td className="p-3 font-semibold">{r.rate}%</td>
                    <td className="p-3">
                      <span className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        r.active
                          ? "bg-green-100 text-green-700"
                          : "bg-slate-100 text-slate-500"
                      }`}>
                        {r.active ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td className="space-x-2 p-3">
                      <button
                        onClick={() => toggleRule(r.id)}
                        className="rounded-lg border px-3 py-2 hover:bg-slate-100"
                      >
                        {r.active ? "Disable" : "Enable"}
                      </button>
                      <button
                        onClick={() => deleteRule(r.id)}
                        className="rounded-lg border border-red-200 px-3 py-2 text-red-600 hover:bg-red-50"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={5} className="p-6 text-center text-slate-500">
                      No tax rules found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

        <section className="rounded-xl border bg-white p-6">
          <h2 className="mb-5 text-xl font-bold">Add Country Tax Rule</h2>

          <form onSubmit={addRule} className="grid gap-4 sm:grid-cols-2">
            <input
              required
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              placeholder="Country name"
              className="rounded-lg border p-3"
            />
            <input
              required
              maxLength={2}
              value={code}
              onChange={(e) => setCode(e.target.value.toUpperCase())}
              placeholder="Country code (e.g. IN)"
              className="rounded-lg border p-3"
            />
            <input
              required
              value={taxName}
              onChange={(e) => setTaxName(e.target.value)}
              placeholder="Tax name (GST / VAT)"
              className="rounded-lg border p-3"
            />
            <input
              required
              type="number"
              min="0"
              max="100"
              step="0.01"
              value={rate}
              onChange={(e) => setRate(e.target.value)}
              placeholder="Tax rate (%)"
              className="rounded-lg border p-3"
            />
            <button className="rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700 sm:col-span-2">
              + Add Tax Rule
            </button>
          </form>
        </section>

        <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
          <strong>Important:</strong> All tax rates shown are illustrative demo values,
          not verified current legal rates. Actual tax rules depend on country,
          transaction type, customer location and applicable law. Connect a verified
          tax service and obtain professional review before processing payments.
        </div>

      </div>
    </div>
  );
}
