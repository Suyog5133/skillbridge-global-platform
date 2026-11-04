
"use client";

import { useState } from "react";

export default function FeedbackPage() {
  const [status, setStatus] = useState("All");

  const [items, setItems] = useState([
    {
      id: 1,
      name: "Alex Johnson",
      role: "Candidate",
      subject: "Job Search Experience",
      message: "Please add more job location filters.",
      rating: 5,
      status: "New",
    },
    {
      id: 2,
      name: "Sarah Miller",
      role: "Freelancer",
      subject: "Project Applications",
      message: "Please add proposal tracking.",
      rating: 4,
      status: "Reviewed",
    },
    {
      id: 3,
      name: "David Smith",
      role: "Company",
      subject: "Hiring Dashboard",
      message: "Advanced candidate filters would help.",
      rating: 3,
      status: "In Progress",
    },
    {
      id: 4,
      name: "Emma Wilson",
      role: "Student",
      subject: "Internship Opportunities",
      message: "Please add more international internships.",
      rating: 5,
      status: "Resolved",
    },
  ]);

  const filteredItems =
    status === "All"
      ? items
      : items.filter((item) => item.status === status);

  return (
    <main className="min-h-screen bg-slate-50 p-6">
      <div className="mx-auto max-w-7xl">
        <p className="text-sm font-semibold text-blue-600">
          ADMINISTRATION / FEEDBACK
        </p>

        <h1 className="mt-2 text-3xl font-bold text-slate-900">
          User Feedback & Suggestions
        </h1>

        <p className="mt-2 text-slate-500">
          Manage feedback received from platform users.
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-xl bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">Total Feedback</p>
            <h2 className="mt-2 text-3xl font-bold">{items.length}</h2>
          </div>

          <div className="rounded-xl bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">New</p>
            <h2 className="mt-2 text-3xl font-bold text-blue-600">
              {items.filter((i) => i.status === "New").length}
            </h2>
          </div>

          <div className="rounded-xl bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">In Progress</p>
            <h2 className="mt-2 text-3xl font-bold text-orange-600">
              {items.filter((i) => i.status === "In Progress").length}
            </h2>
          </div>

          <div className="rounded-xl bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">Resolved</p>
            <h2 className="mt-2 text-3xl font-bold text-green-600">
              {items.filter((i) => i.status === "Resolved").length}
            </h2>
          </div>
        </div>

        <div className="mt-8 rounded-xl bg-white p-5 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <h2 className="text-lg font-bold">Feedback Records</h2>

            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="rounded-lg border border-slate-300 bg-white px-4 py-2"
            >
              <option>All</option>
              <option>New</option>
              <option>Reviewed</option>
              <option>In Progress</option>
              <option>Resolved</option>
            </select>
          </div>

          <div className="mt-5 space-y-4">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="rounded-xl border border-slate-200 p-5"
              >
                <div className="flex flex-wrap justify-between gap-3">
                  <div>
                    <h3 className="font-bold text-slate-900">
                      {item.subject}
                    </h3>
                    <p className="mt-1 text-sm text-slate-500">
                      {item.name} · {item.role}
                    </p>
                  </div>

                  <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                    {item.status}
                  </span>
                </div>

                <p className="mt-4 text-sm text-slate-600">
                  {item.message}
                </p>

                <p className="mt-3 text-sm text-yellow-600">
                  Rating: {"★".repeat(item.rating)}
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  <button
                    onClick={() =>
                      setItems((current) =>
                        current.map((i) =>
                          i.id === item.id
                            ? { ...i, status: "Resolved" }
                            : i
                        )
                      )
                    }
                    className="rounded-lg bg-green-600 px-4 py-2 text-xs font-semibold text-white"
                  >
                    Mark Resolved
                  </button>

                  <button
                    onClick={() =>
                      setItems((current) =>
                        current.filter((i) => i.id !== item.id)
                      )
                    }
                    className="rounded-lg bg-red-50 px-4 py-2 text-xs font-semibold text-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}

            {filteredItems.length === 0 && (
              <p className="py-8 text-center text-slate-500">
                No feedback records found.
              </p>
            )}
          </div>
        </div>

        <p className="mt-6 rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
          Demo page only. Feedback data is not connected to a database yet.
        </p>
      </div>
    </main>
  );
}
