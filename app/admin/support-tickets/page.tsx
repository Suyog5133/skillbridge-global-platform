
"use client";

import { useState } from "react";

type Ticket = {
  id: number;
  name: string;
  email: string;
  subject: string;
  category: string;
  priority: "High" | "Medium" | "Low";
  status: "Open" | "In Progress" | "Resolved";
  message: string;
};

const initialTickets: Ticket[] = [
  {
    id: 1001,
    name: "Rahul Sharma",
    email: "rahul@example.com",
    subject: "Unable to apply for job",
    category: "Technical",
    priority: "High",
    status: "Open",
    message: "I am unable to submit my job application. The submit button is not working.",
  },
  {
    id: 1002,
    name: "Emma Wilson",
    email: "emma@example.com",
    subject: "Company verification issue",
    category: "Verification",
    priority: "Medium",
    status: "In Progress",
    message: "My company verification has been pending for several days.",
  },
  {
    id: 1003,
    name: "Amit Patel",
    email: "amit@example.com",
    subject: "Payment query",
    category: "Payment",
    priority: "Low",
    status: "Resolved",
    message: "I need help understanding my subscription payment.",
  },
];

export default function SupportTicketsPage() {
  const [tickets, setTickets] = useState(initialTickets);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [selected, setSelected] = useState<Ticket | null>(null);

  const filtered = tickets.filter((ticket) => {
    const matchesSearch =
      ticket.name.toLowerCase().includes(search.toLowerCase()) ||
      ticket.subject.toLowerCase().includes(search.toLowerCase()) ||
      ticket.email.toLowerCase().includes(search.toLowerCase());

    return matchesSearch && (filter === "All" || ticket.status === filter);
  });

  function updateStatus(id: number, status: Ticket["status"]) {
    setTickets((current) =>
      current.map((ticket) =>
        ticket.id === id ? { ...ticket, status } : ticket
      )
    );
    setSelected(null);
  }

  const stats = [
    { label: "Total Tickets", value: tickets.length, color: "text-blue-600" },
    { label: "Open", value: tickets.filter(t => t.status === "Open").length, color: "text-red-600" },
    { label: "In Progress", value: tickets.filter(t => t.status === "In Progress").length, color: "text-amber-600" },
    { label: "Resolved", value: tickets.filter(t => t.status === "Resolved").length, color: "text-green-600" },
  ];

  return (
    <main className="min-h-screen bg-slate-50 p-4 md:p-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <p className="text-sm font-semibold text-blue-600">ADMIN PANEL / SUPPORT</p>
          <h1 className="mt-2 text-3xl font-bold text-slate-900">
            Support Ticket Management
          </h1>
          <p className="mt-2 text-slate-500">
            Manage user complaints, support requests and customer issues.
          </p>
        </div>

        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-sm text-slate-500">{stat.label}</p>
              <p className={`mt-2 text-3xl font-bold ${stat.color}`}>{stat.value}</p>
            </div>
          ))}
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-5 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-xl font-bold text-slate-900">All Support Tickets</h2>
              <p className="text-sm text-slate-500">Review and manage incoming requests.</p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search tickets..."
                className="rounded-xl border border-slate-300 px-4 py-2 text-sm outline-none focus:border-blue-500"
              />
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="rounded-xl border border-slate-300 px-4 py-2 text-sm outline-none"
              >
                <option>All</option>
                <option>Open</option>
                <option>In Progress</option>
                <option>Resolved</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[750px] text-left text-sm">
              <thead className="bg-slate-50 text-slate-500">
                <tr>
                  <th className="p-4">Ticket ID</th>
                  <th className="p-4">User</th>
                  <th className="p-4">Subject</th>
                  <th className="p-4">Priority</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Action</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((ticket) => (
                  <tr key={ticket.id} className="border-t border-slate-100">
                    <td className="p-4 font-semibold">#{ticket.id}</td>
                    <td className="p-4">
                      <p className="font-semibold text-slate-800">{ticket.name}</p>
                      <p className="text-xs text-slate-500">{ticket.email}</p>
                    </td>
                    <td className="p-4">
                      <p className="font-medium">{ticket.subject}</p>
                      <p className="text-xs text-slate-500">{ticket.category}</p>
                    </td>
                    <td className="p-4">{ticket.priority}</td>
                    <td className="p-4">
                      <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold">
                        {ticket.status}
                      </span>
                    </td>
                    <td className="p-4">
                      <button
                        onClick={() => setSelected(ticket)}
                        className="rounded-lg bg-blue-600 px-3 py-2 text-xs font-semibold text-white hover:bg-blue-700"
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={6} className="p-8 text-center text-slate-500">
                      No tickets found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-xs text-slate-400">
            Demo data only. Tickets are not connected to a database yet.
          </p>
        </div>

        {selected && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div role="dialog" aria-modal="true" aria-label={`Ticket ${selected.id}`} className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold">Ticket #{selected.id}</h2>
                <button onClick={() => setSelected(null)} className="text-2xl text-slate-500">×</button>
              </div>

              <div className="mt-5 space-y-3 text-sm">
                <p><strong>User:</strong> {selected.name}</p>
                <p><strong>Email:</strong> {selected.email}</p>
                <p><strong>Subject:</strong> {selected.subject}</p>
                <p><strong>Category:</strong> {selected.category}</p>
                <p><strong>Priority:</strong> {selected.priority}</p>
                <div className="rounded-xl bg-slate-50 p-4">
                  <strong>Message</strong>
                  <p className="mt-2 text-slate-600">{selected.message}</p>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap gap-2">
                <button onClick={() => updateStatus(selected.id, "In Progress")} className="rounded-lg bg-amber-500 px-4 py-2 text-sm font-semibold text-white">
                  In Progress
                </button>
                <button onClick={() => updateStatus(selected.id, "Resolved")} className="rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white">
                  Resolve Ticket
                </button>
                <button onClick={() => setSelected(null)} className="rounded-lg border px-4 py-2 text-sm">
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
