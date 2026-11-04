"use client";

import { useMemo, useState } from "react";

type ApplicantStatus =
  | "Pending"
  | "Shortlisted"
  | "Interview"
  | "Rejected"
  | "Hired";

type Applicant = {
  id: number;
  name: string;
  email: string;
  role: string;
  job: string;
  experience: string;
  applied: string;
  skills: string[];
  status: ApplicantStatus;
};

const initialApplicants: Applicant[] = [
  {
    id: 1,
    name: "Alex Morgan",
    email: "alex.morgan@example.com",
    role: "Frontend Developer",
    job: "Frontend Developer",
    experience: "3 Years",
    applied: "Nov 02, 2026",
    skills: ["React", "TypeScript", "CSS"],
    status: "Pending",
  },
  {
    id: 2,
    name: "Priya Sharma",
    email: "priya.sharma@example.com",
    role: "Cybersecurity Analyst",
    job: "Cybersecurity Analyst",
    experience: "2 Years",
    applied: "Nov 01, 2026",
    skills: ["Network Security", "Linux", "Python"],
    status: "Shortlisted",
  },
  {
    id: 3,
    name: "Daniel Smith",
    email: "daniel.smith@example.com",
    role: "UI/UX Designer",
    job: "UI/UX Design Intern",
    experience: "Fresher",
    applied: "Oct 30, 2026",
    skills: ["Figma", "Wireframing", "UI Design"],
    status: "Interview",
  },
  {
    id: 4,
    name: "Sneha Patil",
    email: "sneha.patil@example.com",
    role: "Python Developer",
    job: "Python Developer",
    experience: "4 Years",
    applied: "Oct 29, 2026",
    skills: ["Python", "Django", "SQL"],
    status: "Hired",
  },
  {
    id: 5,
    name: "Michael Brown",
    email: "michael.brown@example.com",
    role: "Digital Marketing Executive",
    job: "Digital Marketing Executive",
    experience: "1 Year",
    applied: "Oct 28, 2026",
    skills: ["SEO", "Marketing", "Analytics"],
    status: "Rejected",
  },
  {
    id: 6,
    name: "Aarav Deshmukh",
    email: "aarav.deshmukh@example.com",
    role: "Frontend Developer",
    job: "Frontend Developer",
    experience: "1 Year",
    applied: "Oct 27, 2026",
    skills: ["JavaScript", "React", "HTML"],
    status: "Pending",
  },
];

const statusStyles: Record<ApplicantStatus, string> = {
  Pending: "bg-yellow-100 text-yellow-700",
  Shortlisted: "bg-blue-100 text-blue-700",
  Interview: "bg-purple-100 text-purple-700",
  Rejected: "bg-red-100 text-red-700",
  Hired: "bg-green-100 text-green-700",
};

export default function ManageApplicantsPage() {
  const [applicants, setApplicants] = useState<Applicant[]>(
    initialApplicants
  );
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [selected, setSelected] = useState<Applicant | null>(null);
  const [message, setMessage] = useState("");

  const counts = {
    All: applicants.length,
    Pending: applicants.filter((a) => a.status === "Pending").length,
    Shortlisted: applicants.filter((a) => a.status === "Shortlisted").length,
    Interview: applicants.filter((a) => a.status === "Interview").length,
    Hired: applicants.filter((a) => a.status === "Hired").length,
    Rejected: applicants.filter((a) => a.status === "Rejected").length,
  };

  const filteredApplicants = useMemo(() => {
    return applicants.filter((applicant) => {
      const searchText = search.toLowerCase();

      const matchesSearch =
        applicant.name.toLowerCase().includes(searchText) ||
        applicant.email.toLowerCase().includes(searchText) ||
        applicant.job.toLowerCase().includes(searchText) ||
        applicant.skills.some((skill) =>
          skill.toLowerCase().includes(searchText)
        );

      const matchesFilter =
        filter === "All" || applicant.status === filter;

      return matchesSearch && matchesFilter;
    });
  }, [applicants, search, filter]);

  function updateStatus(id: number, status: ApplicantStatus) {
    setApplicants((previous) =>
      previous.map((applicant) =>
        applicant.id === id ? { ...applicant, status } : applicant
      )
    );

    setSelected((previous) =>
      previous?.id === id ? { ...previous, status } : previous
    );

    setMessage(`Applicant status changed to ${status}.`);
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
              Manage Applicants
            </h1>

            <p className="mt-2 text-slate-500">
              Review applications and manage your hiring process.
            </p>
          </div>

          <a
            href="/dashboard/company"
            className="rounded-xl border border-slate-300 bg-white px-5 py-3 text-center font-semibold text-slate-700 hover:bg-slate-100"
          >
            ← Company Dashboard
          </a>
        </div>

        {/* Message */}
        {message && (
          <div className="mt-6 rounded-xl border border-green-200 bg-green-50 p-4 text-sm font-semibold text-green-700">
            {message}
          </div>
        )}

        {/* Statistics */}
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {[
            { label: "Total Applicants", value: counts.All },
            { label: "Pending", value: counts.Pending },
            { label: "Shortlisted", value: counts.Shortlisted },
            { label: "Interviews", value: counts.Interview },
            { label: "Hired", value: counts.Hired },
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

        {/* Applicants Table */}
        <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">

          <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
            <div>
              <h2 className="text-xl font-bold text-slate-900">
                All Applications
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Search and review candidate applications.
              </p>
            </div>

            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search name, email, job or skill..."
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500 lg:max-w-sm"
            />
          </div>

          {/* Filters */}
          <div className="mt-6 flex flex-wrap gap-2">
            {[
              "All",
              "Pending",
              "Shortlisted",
              "Interview",
              "Hired",
              "Rejected",
            ].map((status) => (
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

          <div className="mt-6 overflow-x-auto">
            <table className="w-full min-w-[900px] text-left">
              <thead>
                <tr className="border-b border-slate-200 text-sm text-slate-500">
                  <th className="px-4 py-4">Candidate</th>
                  <th className="px-4 py-4">Applied For</th>
                  <th className="px-4 py-4">Experience</th>
                  <th className="px-4 py-4">Applied Date</th>
                  <th className="px-4 py-4">Status</th>
                  <th className="px-4 py-4">Action</th>
                </tr>
              </thead>

              <tbody>
                {filteredApplicants.map((applicant) => (
                  <tr
                    key={applicant.id}
                    className="border-b border-slate-100 hover:bg-slate-50"
                  >
                    <td className="px-4 py-5">
                      <p className="font-bold text-slate-900">
                        {applicant.name}
                      </p>
                      <p className="mt-1 text-xs text-slate-500">
                        {applicant.email}
                      </p>
                    </td>

                    <td className="px-4 py-5 text-sm text-slate-700">
                      {applicant.job}
                    </td>

                    <td className="px-4 py-5 text-sm text-slate-600">
                      {applicant.experience}
                    </td>

                    <td className="px-4 py-5 text-sm text-slate-600">
                      {applicant.applied}
                    </td>

                    <td className="px-4 py-5">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-bold ${statusStyles[applicant.status]}`}
                      >
                        {applicant.status}
                      </span>
                    </td>

                    <td className="px-4 py-5">
                      <button
                        onClick={() => setSelected(applicant)}
                        className="rounded-lg bg-blue-50 px-4 py-2 text-xs font-bold text-blue-700 hover:bg-blue-100"
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filteredApplicants.length === 0 && (
              <div className="py-12 text-center text-slate-500">
                No applicants found.
              </div>
            )}
          </div>
        </section>

        <p className="mt-6 text-center text-xs text-slate-400">
          Demo applicant data only. Real applications and candidate records
          will be connected to the database later.
        </p>
      </div>

      {/* Applicant Details Modal */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-900/50 p-4">
          <div role="dialog" aria-modal="true" aria-label="Applicant Details" className="my-8 w-full max-w-xl rounded-2xl bg-white p-6 shadow-xl">

            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-slate-900">
                Applicant Details
              </h2>

              <button
                onClick={() => setSelected(null)}
                className="text-2xl text-slate-400 hover:text-slate-700"
                aria-label="Close"
              >
                ×
              </button>
            </div>

            <div className="mt-6">
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-100 text-xl font-bold text-blue-700">
                  {selected.name.charAt(0)}
                </div>

                <div>
                  <h3 className="text-lg font-bold text-slate-900">
                    {selected.name}
                  </h3>
                  <p className="text-sm text-slate-500">
                    {selected.email}
                  </p>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-4">
                <div className="rounded-xl bg-slate-50 p-4">
                  <p className="text-xs text-slate-500">Applied Position</p>
                  <p className="mt-1 font-semibold text-slate-800">
                    {selected.job}
                  </p>
                </div>

                <div className="rounded-xl bg-slate-50 p-4">
                  <p className="text-xs text-slate-500">Experience</p>
                  <p className="mt-1 font-semibold text-slate-800">
                    {selected.experience}
                  </p>
                </div>
              </div>

              <div className="mt-5">
                <p className="text-sm font-bold text-slate-800">
                  Skills
                </p>

                <div className="mt-3 flex flex-wrap gap-2">
                  {selected.skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full bg-blue-50 px-3 py-2 text-xs font-semibold text-blue-700"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-5">
                <p className="text-sm font-bold text-slate-800">
                  Application Status
                </p>

                <span
                  className={`mt-2 inline-block rounded-full px-3 py-1 text-xs font-bold ${statusStyles[selected.status]}`}
                >
                  {selected.status}
                </span>
              </div>

              <div className="mt-6">
                <label className="mb-2 block text-sm font-bold text-slate-800">
                  Update Applicant Status
                </label>

                <select
                  value={selected.status}
                  onChange={(e) =>
                    updateStatus(
                      selected.id,
                      e.target.value as ApplicantStatus
                    )
                  }
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
                >
                  <option value="Pending">Pending</option>
                  <option value="Shortlisted">Shortlisted</option>
                  <option value="Interview">Interview</option>
                  <option value="Hired">Hired</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </div>

              <button
                onClick={() => setSelected(null)}
                className="mt-6 w-full rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}