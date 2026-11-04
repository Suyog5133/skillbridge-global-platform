"use client";

import { useState } from "react";

type Ticket = {
  id: number;
  subject: string;
  category: string;
  priority: string;
  date: string;
  status: string;
};

const initialTickets: Ticket[] = [
  {
    id: 1001,
    subject: "Unable to update profile",
    category: "Account",
    priority: "Medium",
    date: "Nov 01, 2026",
    status: "In Progress",
  },
  {
    id: 1002,
    subject: "Company verification query",
    category: "Verification",
    priority: "High",
    date: "Oct 29, 2026",
    status: "Resolved",
  },
];

const helpArticles = [
  {
    category: "Account",
    question: "How do I create a SkillBridge Global account?",
    answer:
      "Open the Register page, select your account type, enter your details and complete the registration process.",
  },
  {
    category: "Jobs",
    question: "How can I apply for a job?",
    answer:
      "Visit Find Jobs, search for a suitable opportunity, open its details and select Apply Now.",
  },
  {
    category: "Company",
    question: "How can my company hire candidates?",
    answer:
      "Create a Company account, complete your company profile and use the job posting and talent search features.",
  },
  {
    category: "Security",
    question: "How can I protect my account?",
    answer:
      "Use a strong password, never share your login details and enable two-factor authentication when available.",
  },
];

export default function SupportPage() {
  const [tickets, setTickets] = useState(initialTickets);
  const [category, setCategory] = useState("Account");
  const [priority, setPriority] = useState("Medium");
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [activeArticle, setActiveArticle] = useState<number | null>(null);
  const [search, setSearch] = useState("");
  const [message, setMessage] = useState("");

  const filteredArticles = helpArticles.filter((article) => {
    const query = search.toLowerCase();

    return (
      article.question.toLowerCase().includes(query) ||
      article.category.toLowerCase().includes(query) ||
      article.answer.toLowerCase().includes(query)
    );
  });

  function submitTicket(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const newTicket: Ticket = {
      id: Date.now(),
      subject,
      category,
      priority,
      date: new Date().toLocaleDateString("en-IN"),
      status: "Open",
    };

    setTickets((previous) => [newTicket, ...previous]);
    setSubject("");
    setDescription("");
    setMessage("Your support request has been submitted successfully.");
  }

  const openTickets = tickets.filter(
    (ticket) => ticket.status === "Open"
  ).length;

  const inProgressTickets = tickets.filter(
    (ticket) => ticket.status === "In Progress"
  ).length;

  const resolvedTickets = tickets.filter(
    (ticket) => ticket.status === "Resolved"
  ).length;

  return (
    <main className="min-h-screen bg-slate-50 p-5 md:p-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <p className="mb-2 text-sm font-semibold text-blue-600">
            SKILLBRIDGE GLOBAL
          </p>

          <h1 className="text-3xl font-bold text-slate-900">
            Help & Support
          </h1>

          <p className="mt-2 text-slate-500">
            We are here to help you with your questions and problems.
          </p>
        </div>

        {/* Hero */}
        <section className="mb-8 rounded-3xl bg-gradient-to-r from-blue-700 to-indigo-800 p-8 text-white md:p-12">
          <div className="max-w-2xl">
            <span className="rounded-full bg-white/15 px-4 py-2 text-sm">
              SkillBridge Global Support
            </span>

            <h2 className="mt-6 text-3xl font-bold md:text-4xl">
              How can we help you today?
            </h2>

            <p className="mt-4 leading-7 text-blue-100">
              Find answers, report issues and get assistance with your
              account, jobs, hiring and platform experience.
            </p>

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search help articles..."
              className="mt-7 w-full rounded-xl border border-white/20 bg-white px-5 py-4 text-slate-900 outline-none"
            />
          </div>
        </section>

        {/* Support Statistics */}
        <div className="mb-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
            <p className="text-sm text-slate-500">Total Requests</p>
            <h3 className="mt-2 text-3xl font-bold text-slate-900">
              {tickets.length}
            </h3>
          </div>

          <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
            <p className="text-sm text-slate-500">Open Requests</p>
            <h3 className="mt-2 text-3xl font-bold text-blue-600">
              {openTickets}
            </h3>
          </div>

          <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
            <p className="text-sm text-slate-500">In Progress</p>
            <h3 className="mt-2 text-3xl font-bold text-orange-500">
              {inProgressTickets}
            </h3>
          </div>

          <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
            <p className="text-sm text-slate-500">Resolved</p>
            <h3 className="mt-2 text-3xl font-bold text-green-600">
              {resolvedTickets}
            </h3>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Help Articles */}
          <section className="lg:col-span-2">
            <div className="mb-5">
              <h2 className="text-xl font-bold text-slate-900">
                Frequently Asked Questions
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Find quick answers to common questions.
              </p>
            </div>

            <div className="space-y-3">
              {filteredArticles.map((article) => {
                const index = helpArticles.indexOf(article);

                return (
                  <div
                    key={article.question}
                    className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm"
                  >
                    <button
                      onClick={() =>
                        setActiveArticle(
                          activeArticle === index ? null : index
                        )
                      }
                      className="flex w-full items-center justify-between gap-4 text-left"
                    >
                      <div>
                        <span className="text-xs font-semibold text-blue-600">
                          {article.category}
                        </span>

                        <h3 className="mt-1 font-semibold text-slate-900">
                          {article.question}
                        </h3>
                      </div>

                      <span className="text-xl text-slate-400">
                        {activeArticle === index ? "−" : "+"}
                      </span>
                    </button>

                    {activeArticle === index && (
                      <p className="mt-4 border-t border-slate-100 pt-4 text-sm leading-7 text-slate-600">
                        {article.answer}
                      </p>
                    )}
                  </div>
                );
              })}

              {filteredArticles.length === 0 && (
                <div className="rounded-2xl bg-white p-8 text-center text-slate-500">
                  No help articles found.
                </div>
              )}
            </div>
          </section>

          {/* Create Support Ticket */}
          <section>
            <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-bold text-slate-900">
                Contact Support
              </h2>

              <p className="mt-2 text-sm text-slate-500">
                Submit your issue and our support team can review it.
              </p>

              {message && (
                <div className="mt-4 rounded-xl bg-green-50 p-3 text-sm text-green-700">
                  {message}
                </div>
              )}

              <form onSubmit={submitTicket} className="mt-6 space-y-4">
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Issue Category
                  </label>

                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500"
                  >
                    <option>Account</option>
                    <option>Jobs</option>
                    <option>Company</option>
                    <option>Payments</option>
                    <option>Verification</option>
                    <option>Security</option>
                    <option>Technical Issue</option>
                    <option>Other</option>
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Priority
                  </label>

                  <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500"
                  >
                    <option>Low</option>
                    <option>Medium</option>
                    <option>High</option>
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Subject
                  </label>

                  <input
                    required
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="Enter issue subject"
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Description
                  </label>

                  <textarea
                    required
                    rows={4}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Explain your issue..."
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full rounded-xl bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700"
                >
                  Submit Request
                </button>
              </form>
            </div>
          </section>
        </div>

        {/* Support Tickets */}
        <section className="mt-10">
          <div className="mb-5">
            <h2 className="text-xl font-bold text-slate-900">
              My Support Requests
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Track your submitted support requests.
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-100 bg-white shadow-sm">
            <table className="w-full min-w-[700px] text-left">
              <thead className="bg-slate-50 text-sm text-slate-500">
                <tr>
                  <th className="p-5">Ticket ID</th>
                  <th className="p-5">Subject</th>
                  <th className="p-5">Category</th>
                  <th className="p-5">Priority</th>
                  <th className="p-5">Date</th>
                  <th className="p-5">Status</th>
                </tr>
              </thead>

              <tbody>
                {tickets.map((ticket) => (
                  <tr
                    key={ticket.id}
                    className="border-t border-slate-100 text-sm"
                  >
                    <td className="p-5 font-medium text-blue-600">
                      #{ticket.id}
                    </td>

                    <td className="p-5 font-medium text-slate-800">
                      {ticket.subject}
                    </td>

                    <td className="p-5 text-slate-600">
                      {ticket.category}
                    </td>

                    <td className="p-5 text-slate-600">
                      {ticket.priority}
                    </td>

                    <td className="p-5 text-slate-500">
                      {ticket.date}
                    </td>

                    <td className="p-5">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          ticket.status === "Resolved"
                            ? "bg-green-100 text-green-700"
                            : ticket.status === "In Progress"
                            ? "bg-orange-100 text-orange-700"
                            : "bg-blue-100 text-blue-700"
                        }`}
                      >
                        {ticket.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Footer */}
        <div className="mt-10 rounded-2xl bg-slate-900 p-8 text-center text-white">
          <h2 className="text-xl font-bold">
            Still need help?
          </h2>

          <p className="mt-2 text-sm text-slate-300">
            We want to make your SkillBridge Global experience better.
          </p>

          <p className="mt-4 text-sm text-blue-300">
            Support Email: support@skillbridgeglobal.com
          </p>

          <p className="mt-5 text-xs text-slate-500">
            SkillBridge Global · Global Opportunities, One Platform
          </p>
        </div>
      </div>
    </main>
  );
}