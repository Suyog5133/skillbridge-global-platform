
"use client";

import { useState } from "react";

type Gateway = {
  id: number;
  name: string;
  category: string;
  region: string;
  status: boolean;
  mode: string;
};

export default function PaymentGatewaysPage() {
  const [gateways, setGateways] = useState<Gateway[]>([
    { id: 1, name: "Stripe", category: "Card Payments", region: "Global", status: true, mode: "Test Mode" },
    { id: 2, name: "Razorpay", category: "UPI / Cards", region: "India", status: true, mode: "Test Mode" },
    { id: 3, name: "PayPal", category: "Digital Wallet", region: "Global", status: false, mode: "Test Mode" },
    { id: 4, name: "Payoneer", category: "International Payments", region: "Global", status: false, mode: "Test Mode" },
    { id: 5, name: "Paystack", category: "Online Payments", region: "Africa", status: false, mode: "Test Mode" },
  ]);

  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [region, setRegion] = useState("");
  const [category, setCategory] = useState("Online Payments");

  const activeCount = gateways.filter((g) => g.status).length;

  const filtered = gateways.filter((g) =>
    `${g.name} ${g.region} ${g.category}`.toLowerCase().includes(search.toLowerCase())
  );

  function toggleGateway(id: number) {
    setGateways(gateways.map((g) =>
      g.id === id ? { ...g, status: !g.status } : g
    ));
  }

  function changeMode(id: number, mode: string) {
    setGateways(gateways.map((g) =>
      g.id === id ? { ...g, mode } : g
    ));
  }

  function addGateway(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !region.trim()) return;

    setGateways([...gateways, {
      id: Date.now(),
      name,
      category,
      region,
      status: false,
      mode: "Test Mode",
    }]);

    setName("");
    setRegion("");
    setShowForm(false);
  }

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8">
      <div className="mx-auto max-w-7xl space-y-7">

        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <p className="text-sm font-semibold text-blue-600">ADMIN / FINANCE</p>
            <h1 className="mt-2 text-3xl font-bold text-slate-900">
              Payment Gateway Management
            </h1>
            <p className="mt-2 text-slate-500">
              Manage payment provider configurations for global transactions.
            </p>
          </div>

          <button
            onClick={() => setShowForm(!showForm)}
            className="rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700"
          >
            + Add Gateway
          </button>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-xl border bg-white p-5">
            <p className="text-sm text-slate-500">Total Gateways</p>
            <h2 className="mt-2 text-3xl font-bold">{gateways.length}</h2>
          </div>
          <div className="rounded-xl border bg-white p-5">
            <p className="text-sm text-slate-500">Enabled Gateways</p>
            <h2 className="mt-2 text-3xl font-bold text-green-600">{activeCount}</h2>
          </div>
          <div className="rounded-xl border bg-white p-5">
            <p className="text-sm text-slate-500">Disabled Gateways</p>
            <h2 className="mt-2 text-3xl font-bold text-slate-500">
              {gateways.length - activeCount}
            </h2>
          </div>
        </div>

        {showForm && (
          <section className="rounded-xl border bg-white p-6">
            <h2 className="mb-4 text-xl font-bold">Add Payment Gateway</h2>
            <form onSubmit={addGateway} className="grid gap-4 sm:grid-cols-2">
              <input
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Gateway name"
                className="rounded-lg border p-3"
              />
              <input
                required
                value={region}
                onChange={(e) => setRegion(e.target.value)}
                placeholder="Supported region"
                className="rounded-lg border p-3"
              />
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="rounded-lg border p-3"
              >
                <option>Online Payments</option>
                <option>Card Payments</option>
                <option>Digital Wallet</option>
                <option>UPI / Cards</option>
                <option>International Payments</option>
              </select>
              <button className="rounded-lg bg-blue-600 p-3 font-semibold text-white">
                Save Gateway
              </button>
            </form>
          </section>
        )}

        <section className="rounded-xl border bg-white p-6">
          <div className="mb-5 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
            <h2 className="text-xl font-bold">Connected Payment Providers</h2>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search gateway..."
              className="rounded-lg border p-3 sm:w-64"
            />
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[750px] text-left text-sm">
              <thead className="bg-slate-100 text-slate-600">
                <tr>
                  <th className="p-3">Provider</th>
                  <th className="p-3">Category</th>
                  <th className="p-3">Region</th>
                  <th className="p-3">Environment</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((g) => (
                  <tr key={g.id} className="border-b">
                    <td className="p-3 font-semibold">{g.name}</td>
                    <td className="p-3">{g.category}</td>
                    <td className="p-3">{g.region}</td>
                    <td className="p-3">
                      <select
                        value={g.mode}
                        onChange={(e) => changeMode(g.id, e.target.value)}
                        className="rounded border p-2"
                      >
                        <option>Test Mode</option>
                        <option>Live Mode</option>
                      </select>
                    </td>
                    <td className="p-3">
                      <span className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        g.status
                          ? "bg-green-100 text-green-700"
                          : "bg-slate-100 text-slate-500"
                      }`}>
                        {g.status ? "Enabled" : "Disabled"}
                      </span>
                    </td>
                    <td className="p-3">
                      <button
                        onClick={() => toggleGateway(g.id)}
                        className="rounded-lg border px-3 py-2 hover:bg-slate-100"
                      >
                        {g.status ? "Disable" : "Enable"}
                      </button>
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={6} className="p-6 text-center text-slate-500">
                      No gateways found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

        <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
          <strong>Security Notice:</strong> This is a UI demo only. No real payment
          processing is connected. Before enabling live payments, configure verified
          provider accounts, backend API integration, webhook signature validation,
          HTTPS, and secure secret storage. Never store card numbers or CVV details
          in your application database.
        </div>

      </div>
    </div>
  );
}
