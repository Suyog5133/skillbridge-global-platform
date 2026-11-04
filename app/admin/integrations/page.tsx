
"use client";

import { useState } from "react";

const initialIntegrations = [
  { name: "Google OAuth", category: "Authentication", description: "Google login and account access", status: "Connected" },
  { name: "Email Service", category: "Communication", description: "Registration emails and notifications", status: "Connected" },
  { name: "Payment Gateway", category: "Payments", description: "Process subscriptions and payments", status: "Not Connected" },
  { name: "Cloud Storage", category: "Storage", description: "Store resumes and company documents", status: "Connected" },
  { name: "Google Analytics", category: "Analytics", description: "Website traffic and user analytics", status: "Connected" },
  { name: "Video Meetings", category: "Communication", description: "Online interviews and meetings", status: "Not Connected" },
  { name: "AI Matching API", category: "Artificial Intelligence", description: "Candidate and job matching", status: "Not Connected" },
  { name: "Maps API", category: "Location", description: "Country and location services", status: "Connected" },
];

export default function IntegrationsPage() {
  const [integrations, setIntegrations] = useState(initialIntegrations);
  const [message, setMessage] = useState("");

  const toggleConnection = (index: number) => {
    setIntegrations((current) =>
      current.map((item, i) =>
        i === index
          ? { ...item, status: item.status === "Connected" ? "Not Connected" : "Connected" }
          : item
      )
    );
    setMessage("Demo connection status updated.");
  };

  const testConnection = (name: string) => {
    setMessage(`${name}: Demo connection test completed.`);
  };

  return (
    <main className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <p className="text-sm font-semibold text-blue-600">ADMINISTRATION / INTEGRATIONS</p>
          <h1 className="mt-2 text-3xl font-bold text-slate-900">
            API & Integrations
          </h1>
          <p className="mt-2 text-slate-500">
            Manage external services connected to SkillBridge Global.
          </p>
        </div>

        {message && (
          <div className="mb-5 rounded-xl border border-blue-200 bg-blue-50 p-4 text-sm text-blue-700">
            {message}
          </div>
        )}

        <div className="mb-6 grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">Total Integrations</p>
            <h2 className="mt-2 text-3xl font-bold text-slate-900">
              {integrations.length}
            </h2>
          </div>
          <div className="rounded-2xl bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">Connected</p>
            <h2 className="mt-2 text-3xl font-bold text-green-600">
              {integrations.filter((i) => i.status === "Connected").length}
            </h2>
          </div>
          <div className="rounded-2xl bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">Not Connected</p>
            <h2 className="mt-2 text-3xl font-bold text-orange-600">
              {integrations.filter((i) => i.status !== "Connected").length}
            </h2>
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {integrations.map((item, index) => (
            <section
              key={item.name}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                    {item.category}
                  </span>
                  <h2 className="mt-3 text-lg font-bold text-slate-900">
                    {item.name}
                  </h2>
                  <p className="mt-1 text-sm text-slate-500">
                    {item.description}
                  </p>
                </div>
                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${
                    item.status === "Connected"
                      ? "bg-green-100 text-green-700"
                      : "bg-orange-100 text-orange-700"
                  }`}
                >
                  {item.status}
                </span>
              </div>

              <div className="mt-5 flex flex-wrap gap-2 border-t border-slate-100 pt-4">
                <button
                  onClick={() => testConnection(item.name)}
                  className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
                >
                  Test Connection
                </button>
                <button
                  onClick={() => toggleConnection(index)}
                  className={`rounded-lg px-4 py-2 text-sm font-semibold text-white ${
                    item.status === "Connected"
                      ? "bg-red-600 hover:bg-red-700"
                      : "bg-blue-600 hover:bg-blue-700"
                  }`}
                >
                  {item.status === "Connected" ? "Disconnect" : "Connect"}
                </button>
              </div>
            </section>
          ))}
        </div>

        <div className="mt-8 rounded-2xl border border-amber-200 bg-amber-50 p-5">
          <h3 className="font-bold text-amber-900">Security Reminder</h3>
          <p className="mt-2 text-sm leading-6 text-amber-800">
            This is a frontend demo. Never store API keys, passwords, or secret
            tokens in frontend code. Real credentials must be stored securely
            as server-side environment variables and accessed through protected
            backend APIs.
          </p>
        </div>
      </div>
    </main>
  );
}
