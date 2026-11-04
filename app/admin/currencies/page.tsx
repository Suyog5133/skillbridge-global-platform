
"use client";

import { useState } from "react";

type Currency = {
  code: string;
  name: string;
  symbol: string;
  rate: number;
  active: boolean;
};

export default function AdminCurrenciesPage() {
  const [currencies, setCurrencies] = useState<Currency[]>([
    { code: "USD", name: "US Dollar", symbol: "$", rate: 1, active: true },
    { code: "INR", name: "Indian Rupee", symbol: "₹", rate: 88.5, active: true },
    { code: "EUR", name: "Euro", symbol: "€", rate: 0.86, active: true },
    { code: "GBP", name: "British Pound", symbol: "£", rate: 0.75, active: true },
    { code: "CAD", name: "Canadian Dollar", symbol: "C$", rate: 1.38, active: true },
    { code: "AUD", name: "Australian Dollar", symbol: "A$", rate: 1.52, active: false },
  ]);

  const [search, setSearch] = useState("");
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [symbol, setSymbol] = useState("");
  const [rate, setRate] = useState("");
  const [defaultCurrency, setDefaultCurrency] = useState("USD");

  const filtered = currencies.filter((c) =>
    `${c.code} ${c.name}`.toLowerCase().includes(search.toLowerCase())
  );

  function addCurrency(e: React.FormEvent) {
    e.preventDefault();
    if (!code.trim() || !name.trim() || !symbol.trim() || !rate) return;
    if (currencies.some((c) => c.code === code.toUpperCase())) {
      alert("Currency already exists.");
      return;
    }
    setCurrencies([...currencies, {
      code: code.toUpperCase(),
      name,
      symbol,
      rate: Number(rate),
      active: true,
    }]);
    setCode("");
    setName("");
    setSymbol("");
    setRate("");
  }

  function updateRate(code: string, value: string) {
    setCurrencies(currencies.map((c) =>
      c.code === code ? { ...c, rate: Number(value) || 0 } : c
    ));
  }

  function toggleCurrency(code: string) {
    setCurrencies(currencies.map((c) =>
      c.code === code ? { ...c, active: !c.active } : c
    ));
  }

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8">
      <div className="mx-auto max-w-7xl space-y-7">
        <div>
          <p className="text-sm font-semibold text-blue-600">ADMIN / PLATFORM SETTINGS</p>
          <h1 className="mt-2 text-3xl font-bold text-slate-900">
            Global Currency Management
          </h1>
          <p className="mt-2 text-slate-500">
            Manage supported currencies and platform exchange-rate settings.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-xl border bg-white p-5">
            <p className="text-sm text-slate-500">Total Currencies</p>
            <h2 className="mt-2 text-3xl font-bold">{currencies.length}</h2>
          </div>
          <div className="rounded-xl border bg-white p-5">
            <p className="text-sm text-slate-500">Active Currencies</p>
            <h2 className="mt-2 text-3xl font-bold text-green-600">
              {currencies.filter((c) => c.active).length}
            </h2>
          </div>
          <div className="rounded-xl border bg-white p-5">
            <p className="text-sm text-slate-500">Default Currency</p>
            <h2 className="mt-2 text-3xl font-bold text-blue-600">{defaultCurrency}</h2>
          </div>
        </div>

        <section className="rounded-xl border bg-white p-6">
          <h2 className="mb-4 text-xl font-bold">Default Platform Currency</h2>
          <div className="flex flex-col gap-3 sm:flex-row">
            <select
              value={defaultCurrency}
              onChange={(e) => setDefaultCurrency(e.target.value)}
              className="rounded-lg border p-3 sm:w-72"
            >
              {currencies.filter((c) => c.active).map((c) => (
                <option key={c.code} value={c.code}>
                  {c.code} - {c.name}
                </option>
              ))}
            </select>
            <p className="self-center text-sm text-slate-500">
              Used as the platform&apos;s default display currency.
            </p>
          </div>
        </section>

        <section className="rounded-xl border bg-white p-6">
          <div className="mb-5 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
            <h2 className="text-xl font-bold">Supported Currencies</h2>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search currency..."
              className="rounded-lg border p-3 sm:w-64"
            />
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[650px] text-left text-sm">
              <thead className="bg-slate-100 text-slate-600">
                <tr>
                  <th className="p-3">Currency</th>
                  <th className="p-3">Symbol</th>
                  <th className="p-3">Sample Rate (per USD)</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((c) => (
                  <tr key={c.code} className="border-b">
                    <td className="p-3">
                      <strong>{c.code}</strong>
                      <p className="text-xs text-slate-500">{c.name}</p>
                    </td>
                    <td className="p-3 text-lg">{c.symbol}</td>
                    <td className="p-3">
                      <input
                        type="number"
                        step="0.0001"
                        min="0"
                        value={c.rate}
                        onChange={(e) => updateRate(c.code, e.target.value)}
                        className="w-28 rounded border p-2"
                      />
                    </td>
                    <td className="p-3">
                      <span className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        c.active ? "bg-green-100 text-green-700" : "bg-slate-100 text-slate-500"
                      }`}>
                        {c.active ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td className="p-3">
                      <button
                        onClick={() => toggleCurrency(c.code)}
                        className="rounded-lg border px-3 py-2 hover:bg-slate-100"
                      >
                        {c.active ? "Disable" : "Enable"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="rounded-xl border bg-white p-6">
          <h2 className="mb-4 text-xl font-bold">Add New Currency</h2>
          <form onSubmit={addCurrency} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <input required maxLength={3} value={code}
              onChange={(e) => setCode(e.target.value.toUpperCase())}
              placeholder="Code (e.g. JPY)" className="rounded-lg border p-3" />
            <input required value={name} onChange={(e) => setName(e.target.value)}
              placeholder="Currency name" className="rounded-lg border p-3" />
            <input required value={symbol} onChange={(e) => setSymbol(e.target.value)}
              placeholder="Symbol (e.g. ¥)" className="rounded-lg border p-3" />
            <input required type="number" min="0.0001" step="0.0001"
              value={rate} onChange={(e) => setRate(e.target.value)}
              placeholder="Sample rate per USD" className="rounded-lg border p-3" />
            <button className="rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700 sm:col-span-2 lg:col-span-4">
              + Add Currency
            </button>
          </form>
        </section>

        <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
          <strong>Important:</strong> These are sample rates for UI testing only,
          not live exchange rates. A trusted exchange-rate API and backend validation
          are required before using rates for actual payments or conversions.
        </div>
      </div>
    </div>
  );
}
