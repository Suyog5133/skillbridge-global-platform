"use client";

import { useState } from "react";

type Job = {
  id: number;
  title: string;
  company: string;
  location: string;
  type: string;
  posted: string;
  status: "Pending" | "Approved" | "Rejected" | "Reported";
  reason?: string;
};

const initialJobs: Job[] = [
  {
    id: 1,
    title: "Frontend Developer",
    company: "TechNova Solutions",
    location: "India / Remote",
    type: "Full-time",
    posted: "2 hours ago",
    status: "Pending",
  },
  {
    id: 2,
    title: "Cyber Security Intern",
    company: "SecureTech",
    location: "United States",
    type: "Internship",
    posted: "5 hours ago",
    status: "Reported",
    reason: "Suspicious company details",
  },
  {
    id: 3,
    title: "UI/UX Designer",
    company: "Creative Labs",
    location: "United Kingdom",
    type: "Contract",
    posted: "Yesterday",
    status: "Approved",
  },
  {
    id: 4,
    title: "Data Entry Executive",
    company: "Global Services",
    location: "Remote",
    type: "Part-time",
    posted: "Yesterday",
    status: "Rejected",
    reason: "Incomplete job information",
  },
  {
    id: 5,
    title: "Python Developer",
    company: "CodeWorld",
    location: "Canada",
    type: "Full-time",
    posted: "2 days ago",
    status: "Pending",
  },
];

export default function AdminJobsPage() {
  const [jobs, setJobs] = useState<Job[]>(initialJobs);
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  const updateStatus = (id: number, status: Job["status"]) => {
    setJobs((current) =>
      current.map((job) =>
        job.id === id ? { ...job, status } : job
      )
    );

    setSelectedJob(null);
  };

  const deleteJob = (id: number) => {
    if (confirm("Are you sure you want to remove this job listing?")) {
      setJobs((current) => current.filter((job) => job.id !== id));
      setSelectedJob(null);
    }
  };

  const filteredJobs = jobs.filter((job) => {
    const matchesFilter = filter === "All" || job.status === filter;

    const matchesSearch =
      job.title.toLowerCase().includes(search.toLowerCase()) ||
      job.company.toLowerCase().includes(search.toLowerCase()) ||
      job.location.toLowerCase().includes(search.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  const counts = {
    total: jobs.length,
    pending: jobs.filter((j) => j.status === "Pending").length,
    approved: jobs.filter((j) => j.status === "Approved").length,
    reported: jobs.filter((j) => j.status === "Reported").length,
    rejected: jobs.filter((j) => j.status === "Rejected").length,
  };

  const statusStyle = (status: Job["status"]) => {
    switch (status) {
      case "Approved":
        return "bg-green-100 text-green-700";
      case "Rejected":
        return "bg-red-100 text-red-700";
      case "Reported":
        return "bg-orange-100 text-orange-700";
      default:
        return "bg-yellow-100 text-yellow-700";
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 p-4 md:p-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <p className="mb-2 text-sm font-semibold text-blue-600">
              ADMIN CONTROL PANEL
            </p>
            <h1 className="text-3xl font-bold text-slate-900">
              Job Moderation
            </h1>
            <p className="mt-2 text-slate-500">
              Review job listings and maintain a safe hiring platform.
            </p>
            <p className="mt-4 rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm text-amber-800">
              Demo data only: job actions are temporary and do not affect live listings.
            </p>
          </div>

          <a
            href="/dashboard/admin"
            className="w-fit rounded-lg border border-slate-200 bg-white px-5 py-3 font-semibold text-slate-700 hover:bg-slate-100"
          >
            ← Back to Dashboard
          </a>
        </div>

        {/* Statistics */}
        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {[
            { label: "Total Jobs", value: counts.total, color: "text-blue-600" },
            { label: "Pending Review", value: counts.pending, color: "text-yellow-600" },
            { label: "Approved", value: counts.approved, color: "text-green-600" },
            { label: "Reported", value: counts.reported, color: "text-orange-600" },
            { label: "Rejected", value: counts.rejected, color: "text-red-600" },
          ].map((item) => (
            <div
              key={item.label}
              className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <p className="text-sm text-slate-500">{item.label}</p>
              <h2 className={`mt-2 text-3xl font-bold ${item.color}`}>
                {item.value}
              </h2>
            </div>
          ))}
        </div>

        {/* Search and filters */}
        <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="text-xl font-bold text-slate-900">
                Manage Job Listings
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Check job details and take moderation actions.
              </p>
            </div>

            <input
              type="text"
              placeholder="Search job, company or location..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500 lg:max-w-sm"
            />
          </div>

          <div className="mb-6 flex flex-wrap gap-2">
            {["All", "Pending", "Approved", "Reported", "Rejected"].map(
              (item) => (
                <button
                  key={item}
                  onClick={() => setFilter(item)}
                  className={`rounded-lg px-4 py-2 text-sm font-semibold ${
                    filter === item
                      ? "bg-blue-600 text-white"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {item}
                </button>
              )
            )}
          </div>

          {/* Job table */}
          <div className="overflow-x-auto">
            <table className="w-full min-w-[850px] text-left">
              <thead>
                <tr className="border-b bg-slate-50 text-sm text-slate-500">
                  <th className="p-4">Job Details</th>
                  <th className="p-4">Location</th>
                  <th className="p-4">Posted</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Action</th>
                </tr>
              </thead>

              <tbody>
                {filteredJobs.map((job) => (
                  <tr
                    key={job.id}
                    className="border-b last:border-0 hover:bg-slate-50"
                  >
                    <td className="p-4">
                      <p className="font-semibold text-slate-900">
                        {job.title}
                      </p>
                      <p className="mt-1 text-sm text-slate-500">
                        {job.company} · {job.type}
                      </p>
                    </td>

                    <td className="p-4 text-sm text-slate-600">
                      {job.location}
                    </td>

                    <td className="p-4 text-sm text-slate-600">
                      {job.posted}
                    </td>

                    <td className="p-4">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${statusStyle(
                          job.status
                        )}`}
                      >
                        {job.status}
                      </span>
                    </td>

                    <td className="p-4">
                      <button
                        onClick={() => setSelectedJob(job)}
                        className="rounded-lg bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700 hover:bg-blue-100"
                      >
                        Review
                      </button>
                    </td>
                  </tr>
                ))}

                {filteredJobs.length === 0 && (
                  <tr>
                    <td
                      colSpan={5}
                      className="p-10 text-center text-slate-500"
                    >
                      No job listings found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

        {/* Review modal */}
        {selectedJob && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div role="dialog" aria-modal="true" aria-label="Review Job Listing" className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl">
              <div className="mb-5 flex items-center justify-between">
                <h2 className="text-xl font-bold text-slate-900">
                  Review Job Listing
                </h2>
                <button
                  onClick={() => setSelectedJob(null)}
                  className="text-2xl text-slate-400 hover:text-slate-700"
                  aria-label="Close"
                >
                  ×
                </button>
              </div>

              <div className="space-y-3 rounded-xl bg-slate-50 p-4">
                <div>
                  <p className="text-xs text-slate-500">Job Title</p>
                  <p className="font-semibold text-slate-900">
                    {selectedJob.title}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-slate-500">Company</p>
                  <p className="font-semibold text-slate-900">
                    {selectedJob.company}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-slate-500">Location</p>
                  <p className="font-semibold text-slate-900">
                    {selectedJob.location}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-slate-500">Job Type</p>
                  <p className="font-semibold text-slate-900">
                    {selectedJob.type}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-slate-500">Current Status</p>
                  <span
                    className={`mt-1 inline-block rounded-full px-3 py-1 text-xs font-semibold ${statusStyle(
                      selectedJob.status
                    )}`}
                  >
                    {selectedJob.status}
                  </span>
                </div>

                {selectedJob.reason && (
                  <div>
                    <p className="text-xs text-slate-500">Report / Review Reason</p>
                    <p className="font-medium text-orange-700">
                      {selectedJob.reason}
                    </p>
                  </div>
                )}
              </div>

              <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                <button
                  onClick={() => updateStatus(selectedJob.id, "Approved")}
                  className="rounded-lg bg-green-600 px-4 py-3 font-semibold text-white hover:bg-green-700"
                >
                  Approve Job
                </button>

                <button
                  onClick={() => updateStatus(selectedJob.id, "Rejected")}
                  className="rounded-lg bg-orange-500 px-4 py-3 font-semibold text-white hover:bg-orange-600"
                >
                  Reject Job
                </button>

                <button
                  onClick={() => deleteJob(selectedJob.id)}
                  className="rounded-lg border border-red-200 px-4 py-3 font-semibold text-red-600 hover:bg-red-50"
                >
                  Remove Listing
                </button>

                <button
                  onClick={() => setSelectedJob(null)}
                  className="rounded-lg border border-slate-200 px-4 py-3 font-semibold text-slate-600 hover:bg-slate-50"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        <p className="mt-5 text-center text-xs text-slate-400">
          SkillBridge Global · Admin Job Moderation
        </p>
      </div>
    </main>
  );
}