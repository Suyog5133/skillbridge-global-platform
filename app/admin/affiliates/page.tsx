
"use client";

import { useState } from "react";

type Affiliate = {
  id: number;
  name: string;
  email: string;
  code: string;
  referrals: number;
  earnings: number;
  status: string;
};

export default function AdminAffiliatesPage() {
  const [affiliates, setAffiliates] = useState<Affiliate[]>([
    { id: 1, name: "Rahul Sharma", email: "rahul@example.com", code: "RAHUL20", referrals: 45, earnings: 4500, status: "Approved" },
    { id: 2, name: "Priya Patel", email: "priya@example.com", code: "PRIYA15", referrals: 32, earnings: 3200, status: "Approved" },
    { id: 3, name: "Alex Johnson", email: "alex@example.com", code: "ALEX10", referrals: 18, earnings: 1800, status: "Pending" },
    { id: 4, name: "John Smith", email: "john@example.com", code: "JOHN25", referrals: 12, earnings: 1200, status: "Rejected" },
  ]);

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");

  const filtered = affiliates.filter((a) => {
    const matchesSearch = `${a.name} ${a.email} ${a.code}`
      .toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === "All" || a.status === filter;
    return matchesSearch && matchesFilter;
  });

  const totalEarnings = affiliates.reduce((sum, a) => sum + a.earnings, 0);

  function updateStatus(id: number, status: string) {
    setAffiliates(affiliates.map((a) =>
      a.id === id ? { ...a, status } : a
    ));
  }

  function addAffiliate(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !code.trim()) return;

    setAffiliates([...affiliates, {
      id: Date.now(),
      name,
      email,
      code: code.toUpperCase(),
      referrals: 0,
      earnings: 0,
      status: "Pending",
    }]);

    setName("");
    setEmail("");
    setCode("");
  }

  function deleteAffiliate(id: number) {
    const affiliate = affiliates.find((item) => item.id === id);
    if (!affiliate || !window.confirm(`Delete affiliate partner "${affiliate.name}"?`)) {
      return;
    }
    setAffiliates(affiliates.filter((a) => a.id !== id));
  }

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8">
      <div className="mx-auto max-w-7xl space-y-7">

        <div>
          <p className="text-sm font-semibold text-blue-600">ADMIN / PARTNERSHIPS</p>
          <h1 className="mt-2 text-3xl font-bold text-slate-900">
            Affiliate & Partner Management
          </h1>
          <p className="mt-2 text-slate-500">
            Manage referral partners, affiliate codes and commission activity.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-xl border bg-white p-5">
            <p className="text-sm text-slate-500">Total Affiliates</p>
            <h2 className="mt-2 text-3xl font-bold">{affiliates.length}</h2>
          </div>
          <div className="rounded-xl border bg-white p-5">
            <p className="text-sm text-slate-500">Approved Partners</p>
            <h2 className="mt-2 text-3xl font-bold text-green-600">
              {affiliates.filter((a) => a.status === "Approved").length}
            </h2>
          </div>
          <div className="rounded-xl border bg-white p-5">
            <p className="text-sm text-slate-500">Total Referrals</p>
            <h2 className="mt-2 text-3xl font-bold">
              {affiliates.reduce((sum, a) => sum + a.referrals, 0)}
            </h2>
          </div>
          <div className="rounded-xl border bg-white p-5">
            <p className="text-sm text-slate-500">Demo Earnings</p>
            <h2 className="mt-2 text-3xl font-bold text-blue-600">
              ₹{totalEarnings.toLocaleString("en-IN")}
            </h2>
          </div>
        </div>

        <section className="rounded-xl border bg-white p-6">
          <h2 className="mb-5 text-xl font-bold">Add Affiliate Partner</h2>

          <form onSubmit={addAffiliate} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <input required value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Partner name" className="rounded-lg border p-3" />

            <input required type="email" value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email address" className="rounded-lg border p-3" />

            <input required value={code}
              onChange={(e) => setCode(e.target.value.toUpperCase())}
              placeholder="Affiliate code" className="rounded-lg border p-3" />

            <button className="rounded-lg bg-blue-600 p-3 font-semibold text-white hover:bg-blue-700 sm:col-span-2 lg:col-span-3">
              + Add Affiliate
            </button>
          </form>
        </section>

        <section className="rounded-xl border bg-white p-6">
          <div className="mb-5 flex flex-col justify-between gap-3 lg:flex-row lg:items-center">
            <h2 className="text-xl font-bold">Affiliate Partners</h2>

            <div className="flex flex-col gap-3 sm:flex-row">
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search partner..."
                className="rounded-lg border p-3"
              />

              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="rounded-lg border p-3"
              >
                <option>All</option>
                <option>Approved</option>
                <option>Pending</option>
                <option>Rejected</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[850px] text-left text-sm">
              <thead className="bg-slate-100 text-slate-600">
                <tr>
                  <th className="p-3">Partner</th>
                  <th className="p-3">Affiliate Code</th>
                  <th className="p-3">Referrals</th>
                  <th className="p-3">Demo Earnings</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Actions</th>
                </tr>
              </thead>

              <tbody>
                {filtered.map((a) => (
                  <tr key={a.id} className="border-b">
                    <td className="p-3">
                      <strong>{a.name}</strong>
                      <p className="text-xs text-slate-500">{a.email}</p>
                    </td>
                    <td className="p-3 font-semibold text-blue-600">{a.code}</td>
                    <td className="p-3">{a.referrals}</td>
                    <td className="p-3">₹{a.earnings.toLocaleString("en-IN")}</td>
                    <td className="p-3">
                      <span className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        a.status === "Approved"
                          ? "bg-green-100 text-green-700"
                          : a.status === "Pending"
                          ? "bg-amber-100 text-amber-700"
                          : "bg-red-100 text-red-700"
                      }`}>
                        {a.status}
                      </span>
                    </td>
                    <td className="space-x-2 p-3">
                      <select
                        value={a.status}
                        onChange={(e) => updateStatus(a.id, e.target.value)}
                        className="rounded border p-2"
                      >
                        <option>Pending</option>
                        <option>Approved</option>
                        <option>Rejected</option>
                      </select>

                      <button
                        onClick={() => deleteAffiliate(a.id)}
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
                      No affiliate partners found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

        <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
          <strong>Note:</strong> This is a frontend demo with sample partners and
          earnings. Real referral tracking requires unique referral links, fraud
          prevention, backend attribution, verified conversions and secure payouts.
        </div>

      </div>
    </div>
  );
}
