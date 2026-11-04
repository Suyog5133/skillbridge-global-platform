"use client";

import { useState } from "react";

type Report = {
  id: number;
  type: string;
  target: string;
  reason: string;
  date: string;
  status: string;
};

const initialReports: Report[] = [
  {
    id: 1001,
    type: "Fake Job",
    target: "Unknown Company",
    reason: "Suspicious job posting",
    date: "Nov 01, 2026",
    status: "Under Review",
  },
  {
    id: 1002,
    type: "Fake Company",
    target: "ABC Global Ltd",
    reason: "Company verification concern",
    date: "Oct 28, 2026",
    status: "Resolved",
  },
];

const safetyTips = [
  {
    icon: "🔐",
    title: "Protect Your Account",
    description:
      "Use a strong password and never share your login credentials.",
  },
  {
    icon: "💳",
    title: "Avoid Payment Scams",
    description:
      "Be careful if someone asks you to pay money to get a job or interview.",
  },
  {
    icon: "🏢",
    title: "Verify Companies",
    description:
      "Check company details, official websites and verification information.",
  },
  {
    icon: "🔗",
    title: "Check Suspicious Links",
    description:
      "Do not open unknown links or download suspicious files from strangers.",
  },
  {
    icon: "📄",
    title: "Protect Personal Information",
    description:
      "Share sensitive personal documents only when necessary and with trusted parties.",
  },
  {
    icon: "🚨",
    title: "Report Suspicious Activity",
    description:
      "Report fake profiles, fraudulent job posts and inappropriate behaviour.",
  },
];

export default function SafetyPage() {
  const [reports, setReports] = useState(initialReports);
  const [reportType, setReportType] = useState("Fake Job");
  const [target, setTarget] = useState("");
  const [reason, setReason] = useState("");
  const [details, setDetails] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [success, setSuccess] = useState("");

  function submitReport(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const newReport: Report = {
      id: Date.now(),
      type: reportType,
      target,
      reason,
      date: new Date().toLocaleDateString("en-IN"),
      status: "Submitted",
    };

    setReports((previous) => [newReport, ...previous]);

    setTarget("");
    setReason("");
    setDetails("");
    setPriority("Medium");

    setSuccess(
      "Your report has been submitted successfully. Our safety team can review it."
    );
  }

  const pendingReports = reports.filter(
    (report) =>
      report.status === "Submitted" ||
      report.status === "Under Review"
  ).length;

  const resolvedReports = reports.filter(
    (report) => report.status === "Resolved"
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
            Trust & Safety Center
          </h1>

          <p className="mt-2 text-slate-500">
            Your safety matters. Report suspicious activity and
            help us maintain a trusted global professional community.
          </p>
        </div>

        {/* Hero */}
        <section className="mb-8 rounded-3xl bg-gradient-to-r from-slate-900 to-blue-950 p-8 text-white md:p-12">
          <div className="max-w-3xl">
            <div className="mb-4 inline-flex rounded-full bg-white/10 px-4 py-2 text-sm">
              🛡️ Safe Hiring. Trusted Opportunities.
            </div>

            <h2 className="text-3xl font-bold md:text-4xl">
              Your Trust. Our Responsibility.
            </h2>

            <p className="mt-4 leading-7 text-slate-300">
              SkillBridge Global aims to create a safer environment
              for candidates, students, freelancers and companies
              around the world.
            </p>

            <a
              href="#report"
              className="mt-7 inline-block rounded-xl bg-red-500 px-6 py-3 font-semibold text-white hover:bg-red-600"
            >
              🚨 Report an Issue
            </a>
          </div>
        </section>

        {/* Statistics */}
        <div className="mb-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
            <p className="text-sm text-slate-500">
              Total Reports
            </p>
            <h3 className="mt-2 text-3xl font-bold text-slate-900">
              {reports.length}
            </h3>
          </div>

          <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
            <p className="text-sm text-slate-500">
              Pending / Under Review
            </p>
            <h3 className="mt-2 text-3xl font-bold text-orange-500">
              {pendingReports}
            </h3>
          </div>

          <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
            <p className="text-sm text-slate-500">
              Resolved Reports
            </p>
            <h3 className="mt-2 text-3xl font-bold text-green-600">
              {resolvedReports}
            </h3>
          </div>
        </div>

        {/* Safety Tips */}
        <section className="mb-10">
          <div className="mb-5">
            <h2 className="text-2xl font-bold text-slate-900">
              Stay Safe on SkillBridge
            </h2>
            <p className="mt-2 text-slate-500">
              Follow these important safety practices.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {safetyTips.map((tip) => (
              <div
                key={tip.title}
                className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <div className="mb-4 text-3xl">
                  {tip.icon}
                </div>

                <h3 className="font-bold text-slate-900">
                  {tip.title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  {tip.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Report Form */}
        <section
          id="report"
          className="mb-10 grid gap-8 lg:grid-cols-5"
        >
          <div className="lg:col-span-3">
            <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm md:p-8">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-slate-900">
                  Report Suspicious Activity
                </h2>

                <p className="mt-2 text-sm text-slate-500">
                  Provide accurate information so the safety team
                  can investigate the issue.
                </p>
              </div>

              {success && (
                <div className="mb-5 rounded-xl border border-green-200 bg-green-50 p-4 text-sm text-green-700">
                  {success}
                </div>
              )}

              <form onSubmit={submitReport} className="space-y-5">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    What do you want to report?
                  </label>

                  <select
                    value={reportType}
                    onChange={(e) => setReportType(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500"
                  >
                    <option>Fake Job</option>
                    <option>Fake Company</option>
                    <option>Fake Candidate</option>
                    <option>Fraud or Scam</option>
                    <option>Harassment</option>
                    <option>Inappropriate Content</option>
                    <option>Suspicious Message</option>
                    <option>Account Security</option>
                    <option>Other</option>
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Name or Link of Reported User / Company / Job
                  </label>

                  <input
                    required
                    value={target}
                    onChange={(e) => setTarget(e.target.value)}
                    placeholder="Enter name or relevant link"
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Reason for Reporting
                  </label>

                  <input
                    required
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    placeholder="Briefly explain the issue"
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
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
                    <option>Urgent</option>
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Additional Details
                  </label>

                  <textarea
                    required
                    rows={5}
                    value={details}
                    onChange={(e) => setDetails(e.target.value)}
                    placeholder="Explain what happened and provide relevant details..."
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500"
                  />
                </div>

                <div className="rounded-xl bg-amber-50 p-4 text-sm leading-6 text-amber-800">
                  Please do not include passwords, banking details
                  or unnecessary sensitive personal information.
                  Submit only genuine reports.
                </div>

                <button
                  type="submit"
                  className="w-full rounded-xl bg-red-600 py-3 font-semibold text-white transition hover:bg-red-700"
                >
                  Submit Safety Report
                </button>
              </form>
            </div>
          </div>

          {/* Information */}
          <div className="space-y-5 lg:col-span-2">
            <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
              <div className="mb-4 text-3xl">🔍</div>

              <h3 className="text-lg font-bold text-slate-900">
                What Happens After Reporting?
              </h3>

              <div className="mt-5 space-y-5">
                {[
                  ["01", "Report Submitted", "Your report is received."],
                  ["02", "Investigation", "The safety team reviews the information."],
                  ["03", "Action Taken", "Appropriate action may be taken after review."],
                ].map((step) => (
                  <div key={step[0]} className="flex gap-4">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-700">
                      {step[0]}
                    </div>

                    <div>
                      <h4 className="font-semibold text-slate-800">
                        {step[1]}
                      </h4>
                      <p className="mt-1 text-sm text-slate-500">
                        {step[2]}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl bg-red-50 p-6">
              <div className="text-3xl">🚨</div>

              <h3 className="mt-3 font-bold text-red-900">
                Immediate Danger?
              </h3>

              <p className="mt-2 text-sm leading-6 text-red-800">
                If you face an immediate physical threat or criminal
                emergency, contact your local emergency services.
                Do not rely on this platform report form for emergency help.
              </p>
            </div>

            <div className="rounded-2xl bg-blue-50 p-6">
              <div className="text-3xl">🤝</div>

              <h3 className="mt-3 font-bold text-blue-900">
                Need More Assistance?
              </h3>

              <p className="mt-2 text-sm text-blue-800">
                Visit our Help & Support page for general platform
                questions and assistance.
              </p>

              <a
                href="/support"
                className="mt-4 inline-block font-semibold text-blue-700 hover:underline"
              >
                Visit Help & Support →
              </a>
            </div>
          </div>
        </section>

        {/* Report History */}
        <section>
          <h2 className="mb-5 text-2xl font-bold text-slate-900">
            Report History
          </h2>

          <div className="overflow-x-auto rounded-2xl border border-slate-100 bg-white shadow-sm">
            <table className="w-full min-w-[750px] text-left">
              <thead className="bg-slate-50 text-sm text-slate-500">
                <tr>
                  <th className="p-5">Report ID</th>
                  <th className="p-5">Report Type</th>
                  <th className="p-5">Reported Target</th>
                  <th className="p-5">Reason</th>
                  <th className="p-5">Date</th>
                  <th className="p-5">Status</th>
                </tr>
              </thead>

              <tbody>
                {reports.map((report) => (
                  <tr
                    key={report.id}
                    className="border-t border-slate-100 text-sm"
                  >
                    <td className="p-5 font-semibold text-blue-600">
                      #{report.id}
                    </td>

                    <td className="p-5 text-slate-700">
                      {report.type}
                    </td>

                    <td className="p-5 text-slate-700">
                      {report.target}
                    </td>

                    <td className="p-5 text-slate-600">
                      {report.reason}
                    </td>

                    <td className="p-5 text-slate-500">
                      {report.date}
                    </td>

                    <td className="p-5">
                      <span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold text-orange-700">
                        {report.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <footer className="mt-10 border-t border-slate-200 py-6 text-center text-sm text-slate-400">
          SkillBridge Global · Building a Safer Global Career Community
        </footer>
      </div>
    </main>
  );
}