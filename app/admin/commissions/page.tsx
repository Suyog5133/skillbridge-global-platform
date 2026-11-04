
"use client";

import { useState } from "react";

type Plan = {
  id: number;
  name: string;
  monthlyPrice: number;
  yearlyPrice: number;
  commission: number;
  active: boolean;
};

export default function AdminCommissionsPage() {
  const [plans, setPlans] = useState<Plan[]>([
    { id: 1, name: "Free", monthlyPrice: 0, yearlyPrice: 0, commission: 10, active: true },
    { id: 2, name: "Starter", monthlyPrice: 499, yearlyPrice: 4999, commission: 8, active: true },
    { id: 3, name: "Professional", monthlyPrice: 999, yearlyPrice: 9999, commission: 6, active: true },
    { id: 4, name: "Enterprise", monthlyPrice: 2499, yearlyPrice: 24999, commission: 4, active: true },
  ]);

  const [newName, setNewName] = useState("");
  const [newMonthly, setNewMonthly] = useState("");
  const [newYearly, setNewYearly] = useState("");
  const [newCommission, setNewCommission] = useState("");
  const [search, setSearch] = useState("");

  const [editingId, setEditingId] = useState<number | null>(null);

  const filtered = plans.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  function updatePlan(
    id: number,
    field: "monthlyPrice" | "yearlyPrice" | "commission" | "active",
    value: number | boolean
  ) {
    setPlans(plans.map((p) =>
      p.id === id ? { ...p, [field]: value } : p
    ));
  }

  function addPlan(e: React.FormEvent) {
    e.preventDefault();

    setPlans([...plans, {
      id: Date.now(),
      name: newName,
      monthlyPrice: Number(newMonthly),
      yearlyPrice: Number(newYearly),
      commission: Number(newCommission),
      active: true,
    }]);

    setNewName("");
    setNewMonthly("");
    setNewYearly("");
    setNewCommission("");
  }

  function deletePlan(id: number) {
    const plan = plans.find((item) => item.id === id);
    if (!plan || !window.confirm(`Delete the "${plan.name}" subscription plan?`)) {
      return;
    }
    setPlans(plans.filter((p) => p.id !== id));
  }

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8">
      <div className="mx-auto max-w-7xl space-y-7">

        <div>
          <p className="text-sm font-semibold text-blue-600">ADMIN / REVENUE SETTINGS</p>
          <h1 className="mt-2 text-3xl font-bold text-slate-900">
            Subscription & Commission Management
          </h1>
          <p className="mt-2 text-slate-500">
            Configure platform membership plans and service commission rates.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-xl border bg-white p-5">
            <p className="text-sm text-slate-500">Total Plans</p>
            <h2 className="mt-2 text-3xl font-bold">{plans.length}</h2>
          </div>
          <div className="rounded-xl border bg-white p-5">
            <p className="text-sm text-slate-500">Active Plans</p>
            <h2 className="mt-2 text-3xl font-bold text-green-600">
              {plans.filter((p) => p.active).length}
            </h2>
          </div>
          <div className="rounded-xl border bg-white p-5">
            <p className="text-sm text-slate-500">Average Commission</p>
            <h2 className="mt-2 text-3xl font-bold text-blue-600">
              {plans.length
                ? (plans.reduce((sum, p) => sum + p.commission, 0) / plans.length).toFixed(1)
                : "0"}%
            </h2>
          </div>
        </div>

        <section className="rounded-xl border bg-white p-6">
          <div className="mb-5 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
            <h2 className="text-xl font-bold">Membership Plans</h2>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search plans..."
              className="rounded-lg border p-3 sm:w-64"
            />
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[850px] text-left text-sm">
              <thead className="bg-slate-100 text-slate-600">
                <tr>
                  <th className="p-3">Plan</th>
                  <th className="p-3">Monthly Price (₹)</th>
                  <th className="p-3">Yearly Price (₹)</th>
                  <th className="p-3">Commission (%)</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((p) => (
                  <tr key={p.id} className="border-b">
                    <td className="p-3 font-semibold">{p.name}</td>
                    <td className="p-3">
                      {editingId === p.id ? (
                        <input
                          type="number"
                          min="0"
                          value={p.monthlyPrice}
                          onChange={(e) => updatePlan(p.id, "monthlyPrice", Number(e.target.value))}
                          className="w-24 rounded border p-2"
                        />
                      ) : `₹${p.monthlyPrice}`}
                    </td>
                    <td className="p-3">
                      {editingId === p.id ? (
                        <input
                          type="number"
                          min="0"
                          value={p.yearlyPrice}
                          onChange={(e) => updatePlan(p.id, "yearlyPrice", Number(e.target.value))}
                          className="w-24 rounded border p-2"
                        />
                      ) : `₹${p.yearlyPrice}`}
                    </td>
                    <td className="p-3">
                      {editingId === p.id ? (
                        <input
                          type="number"
                          min="0"
                          max="100"
                          value={p.commission}
                          onChange={(e) => updatePlan(p.id, "commission", Number(e.target.value))}
                          className="w-20 rounded border p-2"
                        />
                      ) : `${p.commission}%`}
                    </td>
                    <td className="p-3">
                      <span className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        p.active ? "bg-green-100 text-green-700" : "bg-slate-100 text-slate-500"
                      }`}>
                        {p.active ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td className="space-x-2 p-3">
                      <button
                        onClick={() => setEditingId(editingId === p.id ? null : p.id)}
                        className="rounded-lg border px-3 py-2 hover:bg-slate-100"
                      >
                        {editingId === p.id ? "Done" : "Edit"}
                      </button>
                      <button
                        onClick={() => updatePlan(p.id, "active", !p.active)}
                        className="rounded-lg border px-3 py-2 hover:bg-slate-100"
                      >
                        {p.active ? "Disable" : "Enable"}
                      </button>
                      <button
                        onClick={() => deletePlan(p.id)}
                        className="rounded-lg border border-red-200 px-3 py-2 text-red-600 hover:bg-red-50"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={6} className="p-6 text-center text-slate-500">
                      No plans found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

        <section className="rounded-xl border bg-white p-6">
          <h2 className="mb-5 text-xl font-bold">Create New Subscription Plan</h2>

          <form onSubmit={addPlan} className="grid gap-4 sm:grid-cols-2">
            <input required value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder="Plan name" className="rounded-lg border p-3" />

            <input required type="number" min="0" value={newMonthly}
              onChange={(e) => setNewMonthly(e.target.value)}
              placeholder="Monthly price (₹)" className="rounded-lg border p-3" />

            <input required type="number" min="0" value={newYearly}
              onChange={(e) => setNewYearly(e.target.value)}
              placeholder="Yearly price (₹)" className="rounded-lg border p-3" />

            <input required type="number" min="0" max="100" value={newCommission}
              onChange={(e) => setNewCommission(e.target.value)}
              placeholder="Commission (%)" className="rounded-lg border p-3" />

            <button className="rounded-lg bg-blue-600 p-3 font-semibold text-white hover:bg-blue-700 sm:col-span-2">
              + Create Plan
            </button>
          </form>
        </section>

        <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
          <strong>Note:</strong> These prices and commissions are provisional demo
          values, not final business decisions. Changes are stored only in page state.
          Real subscriptions, billing, commissions, refunds and payouts require secure
          backend logic and payment-provider integration.
        </div>

      </div>
    </div>
  );
}
