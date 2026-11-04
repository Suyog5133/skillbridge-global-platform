"use client";

import { useMemo, useState } from "react";

type JobStatus = "Active" | "Paused" | "Closed" | "Draft";

type Job = {
  id: number;
  title: string;
  department: string;
  location: string;
  type: string;
  applicants: number;
  posted: string;
  status: JobStatus;
};

const initialJobs: Job[] = [
  {
    id: 1,
    title: "Frontend Developer",
    department: "Engineering",
    location: "Remote - Worldwide",
    type: "Full Time",
    applicants: 42,
    posted: "Nov 01, 2026",
    status: "Active",
  },
  {
    id: 2,
    title: "Cybersecurity Analyst",
    department: "Security",
    location: "India",
    type: "Full Time",
    applicants: 28,
    posted: "Oct 29, 2026",
    status: "Active",
  },
  {
    id: 3,
    title: "UI/UX Design Intern",
    department: "Design",
    location: "Remote",
    type: "Internship",
    applicants: 16,
    posted: "Oct 25, 2026",
    status: "Paused",
  },
  {
    id: 4,
    title: "Python Developer",
    department: "Technology",
    location: "United States",
    type: "Contract",
    applicants: 35,
    posted: "Oct 20, 2026",
    status: "Closed",
  },
  {
    id: 5,
    title: "Digital Marketing Executive",
    department: "Marketing",
    location: "Hybrid - UK",
    type: "Part Time",
    applicants: 0,
    posted: "Oct 18, 2026",
    status: "Draft",
  },
];

const statusStyles: Record<JobStatus, string> = {
  Active: "bg-green-100 text-green-700",
  Paused: "bg-yellow-100 text-yellow-700",
  Closed: "bg-red-100 text-red-700",
  Draft: "bg-slate-100 text-slate-600",
};

export default function ManageJobsPage() {
  const [jobs, setJobs] = useState<Job[]>(initialJobs);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editLocation, setEditLocation] = useState("");
  const [message, setMessage] = useState("");

  const counts = {
    All: jobs.length,
    Active: jobs.filter((job) => job.status === "Active").length,
    Paused: jobs.filter((job) => job.status === "Paused").length,
    Closed: jobs.filter((job) => job.status === "Closed").length,
    Draft: jobs.filter((job) => job.status === "Draft").length,
  };

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const matchesSearch =
        job.title.toLowerCase().includes(search.toLowerCase()) ||
        job.department.toLowerCase().includes(search.toLowerCase()) ||
        job.location.toLowerCase().includes(search.toLowerCase());

      const matchesStatus =
        filter === "All" || job.status === filter;

      return matchesSearch && matchesStatus;
    });
  }, [jobs, search, filter]);

  function updateStatus(id: number, status: JobStatus) {
    setJobs((previous) =>
      previous.map((job) =>
        job.id === id ? { ...job, status } : job
      )
    );

    setMessage(`Job status updated to ${status}.`);
    setTimeout(() => setMessage(""), 2500);
  }

  function openEdit(job: Job) {
    setSelectedJob(job);
    setEditTitle(job.title);
    setEditLocation(job.location);
  }

  function saveEdit() {
    if (!selectedJob || !editTitle.trim()) return;

    setJobs((previous) =>
      previous.map((job) =>
        job.id === selectedJob.id
          ? {
              ...job,
              title: editTitle.trim(),
              location: editLocation.trim(),
            }
          : job
      )
    );

    setSelectedJob(null);
    setMessage("Job details updated successfully.");
    setTimeout(() => setMessage(""), 2500);
  }

  function deleteJob(id: number) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this job?"
    );

    if (!confirmed) return;

    setJobs((previous) => previous.filter((job) => job.id !== id));
    setMessage("Job removed from this demo list.");
    setTimeout(() => setMessage(""), 2500);
  }

  return (
    <main className="min-h-screen bg-slate-50 p-5 sm:p-8">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <p className="text-sm font-bold tracking-wider text-blue-600">
              SKILLBRIDGE GLOBAL
            </p>

            <h1 className="mt-2 text-3xl font-bold text-slate-900">
              Manage Jobs
            </h1>

            <p className="mt-2 text-slate-500">
              Manage your job postings and track applicants.
            </p>
          </div>

          <a
            href="/post-job"
            className="rounded-xl bg-blue-600 px-6 py-3 text-center font-semibold text-white hover:bg-blue-700"
          >
            + Post New Job
          </a>
        </div>

        {/* Notification */}
        {message && (
          <div className="mt-6 rounded-xl border border-green-200 bg-green-50 p-4 text-sm font-medium text-green-700">
            {message}
          </div>
        )}

        {/* Statistics */}
        <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-5">
          {[
            { label: "Total Jobs", value: counts.All },
            { label: "Active", value: counts.Active },
            { label: "Paused", value: counts.Paused },
            { label: "Closed", value: counts.Closed },
            { label: "Drafts", value: counts.Draft },
          ].map((item) => (
            <div
              key={item.label}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <p className="text-sm text-slate-500">{item.label}</p>
              <h2 className="mt-2 text-3xl font-bold text-slate-900">
                {item.value}
              </h2>
            </div>
          ))}
        </div>

        {/* Job Management */}
        <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">

          <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
            <div>
              <h2 className="text-xl font-bold text-slate-900">
                Your Job Listings
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Search, edit and manage your job posts.
              </p>
            </div>

            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search job title, department or location..."
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500 lg:max-w-sm"
            />
          </div>

          {/* Filters */}
          <div className="mt-6 flex flex-wrap gap-2">
            {["All", "Active", "Paused", "Closed", "Draft"].map((status) => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                  filter === status
                    ? "bg-blue-600 text-white"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {status} ({counts[status as keyof typeof counts]})
              </button>
            ))}
          </div>

          {/* Table */}
          <div className="mt-6 overflow-x-auto">
            <table className="w-full min-w-[850px] text-left">
              <thead>
                <tr className="border-b border-slate-200 text-sm text-slate-500">
                  <th className="px-4 py-4 font-semibold">Job Details</th>
                  <th className="px-4 py-4 font-semibold">Location</th>
                  <th className="px-4 py-4 font-semibold">Applicants</th>
                  <th className="px-4 py-4 font-semibold">Posted Date</th>
                  <th className="px-4 py-4 font-semibold">Status</th>
                  <th className="px-4 py-4 font-semibold">Actions</th>
                </tr>
              </thead>

              <tbody>
                {filteredJobs.map((job) => (
                  <tr
                    key={job.id}
                    className="border-b border-slate-100 hover:bg-slate-50"
                  >
                    <td className="px-4 py-5">
                      <p className="font-bold text-slate-900">
                        {job.title}
                      </p>
                      <p className="mt-1 text-xs text-slate-500">
                        {job.department} · {job.type}
                      </p>
                    </td>

                    <td className="px-4 py-5 text-sm text-slate-600">
                      {job.location}
                    </td>

                    <td className="px-4 py-5">
                      <span className="font-bold text-slate-900">
                        {job.applicants}
                      </span>
                      <p className="text-xs text-slate-500">Applications</p>
                    </td>

                    <td className="px-4 py-5 text-sm text-slate-600">
                      {job.posted}
                    </td>

                    <td className="px-4 py-5">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-bold ${statusStyles[job.status]}`}
                      >
                        {job.status}
                      </span>
                    </td>

                    <td className="px-4 py-5">
                      <div className="flex flex-wrap gap-2">
                        <button
                          onClick={() => openEdit(job)}
                          className="rounded-lg border border-slate-300 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100"
                        >
                          Edit
                        </button>

                        {job.status === "Active" && (
                          <button
                            onClick={() => updateStatus(job.id, "Paused")}
                            className="rounded-lg bg-yellow-50 px-3 py-2 text-xs font-semibold text-yellow-700 hover:bg-yellow-100"
                          >
                            Pause
                          </button>
                        )}

                        {job.status === "Paused" && (
                          <button
                            onClick={() => updateStatus(job.id, "Active")}
                            className="rounded-lg bg-green-50 px-3 py-2 text-xs font-semibold text-green-700 hover:bg-green-100"
                          >
                            Activate
                          </button>
                        )}

                        {(job.status === "Active" ||
                          job.status === "Paused") && (
                          <button
                            onClick={() => updateStatus(job.id, "Closed")}
                            className="rounded-lg bg-red-50 px-3 py-2 text-xs font-semibold text-red-700 hover:bg-red-100"
                          >
                            Close
                          </button>
                        )}

                        <button
                          onClick={() => deleteJob(job.id)}
                          className="rounded-lg border border-red-200 px-3 py-2 text-xs font-semibold text-red-600 hover:bg-red-50"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filteredJobs.length === 0 && (
              <div className="py-12 text-center">
                <p className="font-semibold text-slate-700">
                  No jobs found.
                </p>
                <p className="mt-1 text-sm text-slate-500">
                  Try another search or filter.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Footer Note */}
        <p className="mt-6 text-center text-xs text-slate-400">
          Demo data only. Job changes are stored temporarily in page state.
          Backend, database and real applicant tracking will be connected later.
        </p>
      </div>

      {/* Edit Modal */}
      {selectedJob && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4">
          <div role="dialog" aria-modal="true" aria-label="Edit Job" className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-slate-900">
                Edit Job
              </h2>

              <button
                onClick={() => setSelectedJob(null)}
                className="text-2xl text-slate-400 hover:text-slate-700"
                aria-label="Close"
              >
                ×
              </button>
            </div>

            <div className="mt-6 space-y-4">
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Job Title
                </label>

                <input
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Location
                </label>

                <input
                  value={editLocation}
                  onChange={(e) => setEditLocation(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
                />
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setSelectedJob(null)}
                className="rounded-xl border border-slate-300 px-5 py-3 font-semibold text-slate-600 hover:bg-slate-50"
              >
                Cancel
              </button>

              <button
                onClick={saveEdit}
                className="rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}