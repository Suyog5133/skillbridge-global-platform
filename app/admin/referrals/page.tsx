
"use client";

import { useState } from "react";

type Referral = {
  id: number;
  name: string;
  email: string;
  code: string;
  referrals: number;
  reward: string;
  status: string;
};

const initialReferrals: Referral[] = [
  { id: 1, name: "Alex Johnson", email: "alex@example.com", code: "ALEX2026", referrals: 12, reward: "$60", status: "Active" },
  { id: 2, name: "Sarah Miller", email: "sarah@example.com", code: "SARAH10", referrals: 8, reward: "$40", status: "Active" },
  { id: 3, name: "David Smith", email: "david@example.com", code: "DAVID25", referrals: 5, reward: "$25", status: "Pending" },
  { id: 4, name: "Emma Wilson", email: "emma@example.com", code: "EMMA2026", referrals: 3, reward: "$15", status: "Blocked" },
];

export default function ReferralsPage() {
  const [referrals, setReferrals] = useState(initialReferrals);
  const [search, setSearch] = useState("");
  const [rewardAmount, setRewardAmount] = useState("5");
  const [newCode, setNewCode] = useState("");

  const filtered = referrals.filter((item) =>
    `${item.name} ${item.email} ${item.code}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const toggleStatus = (id: number) => {
    setReferrals((current) =>
      current.map((item) =>
        item.id === id
          ? {
              ...item,
              status: item.status === "Blocked" ? "Active" : "Blocked",
            }
          : item
      )
    );
  };

  const createCode = () => {
    const code = newCode.trim().toUpperCase();
    if (!code) return;

    if (referrals.some((item) => item.code === code)) {
      alert("This referral code already exists.");
      return;
    }

    setReferrals((current) => [
      {
        id: Math.max(0, ...current.map((item) => item.id)) + 1,
        name: "New Referral",
        email: "Not assigned",
        code,
        referrals: 0,
        reward: `$${rewardAmount}`,
        status: "Active",
      },
      ...current,
    ]);

    setNewCode("");
  };

  return (
    <main className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl">
        <p className="text-sm font-semibold text-blue-600">
          ADMINISTRATION / REFERRALS
        </p>

        <h1 className="mt-2 text-3xl font-bold text-slate-900">
          Referral & Rewards
        </h1>

        <p className="mt-2 text-slate-500">
          Manage referral programs, invitation codes and user rewards.
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: "Total Referrals", value: "1,248" },
            { label: "Successful Signups", value: "856" },
            { label: "Pending Rewards", value: "$420" },
            { label: "Reward Paid", value: "$3,850" },
          ].map((item) => (
            <div key={item.label} className="rounded-2xl bg-white p-5 shadow-sm">
              <p className="text-sm text-slate-500">{item.label}</p>
              <h2 className="mt-2 text-2xl font-bold text-slate-900">
                {item.value}
              </h2>
            </div>
          ))}
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-2">
            <h2 className="text-lg font-bold text-slate-900">
              Referral Program Settings
            </h2>

            <div className="mt-5">
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Default Reward Amount (USD)
              </label>
              <input
                type="number"
                min="0"
                value={rewardAmount}
                onChange={(e) => setRewardAmount(e.target.value)}
                className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none focus:border-blue-500"
              />
            </div>

            <div className="mt-5">
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Create Referral Code
              </label>
              <div className="flex flex-col gap-3 sm:flex-row">
                <input
                  value={newCode}
                  onChange={(e) => setNewCode(e.target.value)}
                  placeholder="Example: GLOBAL2026"
                  className="min-w-0 flex-1 rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none focus:border-blue-500"
                />
                <button
                  onClick={createCode}
                  className="rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700"
                >
                  Create Code
                </button>
              </div>
            </div>
          </section>

          <section className="rounded-2xl border border-blue-100 bg-blue-50 p-6">
            <h2 className="font-bold text-blue-900">How Referrals Work</h2>
            <ol className="mt-4 list-inside list-decimal space-y-3 text-sm text-blue-900">
              <li>User shares a referral code.</li>
              <li>New user registers using that code.</li>
              <li>Platform verifies the signup.</li>
              <li>Eligible reward is approved.</li>
              <li>Reward is issued according to program rules.</li>
            </ol>
          </section>
        </div>

        <section className="mt-8 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-lg font-bold text-slate-900">
              Referral Records
            </h2>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search name, email or code..."
              className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm sm:max-w-xs"
            />
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[750px] text-left text-sm">
              <thead className="bg-slate-50 text-slate-500">
                <tr>
                  <th className="p-4">User</th>
                  <th className="p-4">Referral Code</th>
                  <th className="p-4">Referrals</th>
                  <th className="p-4">Reward</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Action</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {filtered.map((item) => (
                  <tr key={item.id}>
                    <td className="p-4">
                      <p className="font-semibold text-slate-900">{item.name}</p>
                      <p className="text-xs text-slate-500">{item.email}</p>
                    </td>
                    <td className="p-4 font-medium text-blue-600">{item.code}</td>
                    <td className="p-4 text-slate-700">{item.referrals}</td>
                    <td className="p-4 font-semibold text-slate-900">{item.reward}</td>
                    <td className="p-4">
                      <span className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        item.status === "Active"
                          ? "bg-green-100 text-green-700"
                          : item.status === "Pending"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-red-100 text-red-700"
                      }`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="p-4">
                      <button
                        onClick={() => toggleStatus(item.id)}
                        className="font-semibold text-blue-600 hover:underline"
                      >
                        {item.status === "Blocked" ? "Activate" : "Block"}
                      </button>
                    </td>
                  </tr>
                ))}

                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={6} className="p-8 text-center text-slate-500">
                      No referral records found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

        <div className="mt-6 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
          Demo only: Referral records, reward values and codes are stored
          temporarily in page state. Real referral tracking requires backend
          verification, fraud prevention and secure reward processing.
        </div>
      </div>
    </main>
  );
}
