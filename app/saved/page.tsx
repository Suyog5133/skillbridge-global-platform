"use client";

import { useMemo, useState } from "react";

type SavedJob = {
  id: number;
  title: string;
  company: string;
  location: string;
  type: string;
  salary: string;
  category: string;
  savedDate: string;
};

type Candidate = {
  id: number;
  name: string;
  role: string;
  location: string;
  experience: string;
  skills: string[];
  availability: string;
};

const initialJobs: SavedJob[] = [
  {
    id: 1,
    title: "Frontend Developer",
    company: "TechNova Solutions",
    location: "Remote - Worldwide",
    type: "Full Time",
    salary: "$60,000 - $85,000",
    category: "Technology",
    savedDate: "Nov 02, 2026",
  },
  {
    id: 2,
    title: "Cybersecurity Analyst",
    company: "SecureNet Global",
    location: "India",
    type: "Full Time",
    salary: "₹5 - 8 LPA",
    category: "Cybersecurity",
    savedDate: "Nov 01, 2026",
  },
  {
    id: 3,
    title: "UI/UX Design Intern",
    company: "Creative Studio",
    location: "Remote",
    type: "Internship",
    salary: "Paid Internship",
    category: "Design",
    savedDate: "Oct 29, 2026",
  },
  {
    id: 4,
    title: "Python Developer",
    company: "CodeWorks",
    location: "United States",
    type: "Contract",
    salary: "$40 - $60 / hour",
    category: "Development",
    savedDate: "Oct 25, 2026",
  },
];

const initialCandidates: Candidate[] = [
  {
    id: 1,
    name: "Alex Morgan",
    role: "Frontend Developer",
    location: "United Kingdom",
    experience: "3 Years",
    skills: ["React", "TypeScript", "Next.js"],
    availability: "Available",
  },
  {
    id: 2,
    name: "Priya Sharma",
    role: "Cybersecurity Analyst",
    location: "India",
    experience: "2 Years",
    skills: ["Network Security", "Linux", "Python"],
    availability: "Available",
  },
  {
    id: 3,
    name: "Daniel Smith",
    role: "UI/UX Designer",
    location: "United States",
    experience: "4 Years",
    skills: ["Figma", "UI Design", "Prototyping"],
    availability: "Currently Working",
  },
];

export default function SavedPage() {
  const [activeTab, setActiveTab] = useState<"jobs" | "candidates">("jobs");

  const [jobs, setJobs] = useState<SavedJob[]>(initialJobs);
  const [candidates, setCandidates] =
    useState<Candidate[]>(initialCandidates);

  const [search, setSearch] = useState("");
  const [message, setMessage] = useState("");

  const filteredJobs = useMemo(() => {
    const text = search.toLowerCase();

    return jobs.filter(
      (job) =>
        job.title.toLowerCase().includes(text) ||
        job.company.toLowerCase().includes(text) ||
        job.location.toLowerCase().includes(text) ||
        job.category.toLowerCase().includes(text)
    );
  }, [jobs, search]);

  const filteredCandidates = useMemo(() => {
    const text = search.toLowerCase();

    return candidates.filter(
      (candidate) =>
        candidate.name.toLowerCase().includes(text) ||
        candidate.role.toLowerCase().includes(text) ||
        candidate.location.toLowerCase().includes(text) ||
        candidate.skills.some((skill) =>
          skill.toLowerCase().includes(text)
        )
    );
  }, [candidates, search]);

  function showMessage(text: string) {
    setMessage(text);
    setTimeout(() => setMessage(""), 2500);
  }

  function removeJob(id: number) {
    setJobs((previous) => previous.filter((job) => job.id !== id));
    showMessage("Job removed from saved list.");
  }

  function removeCandidate(id: number) {
    setCandidates((previous) =>
      previous.filter((candidate) => candidate.id !== id)
    );

    showMessage("Candidate removed from shortlist.");
  }

  return (
    <main className="min-h-screen bg-slate-50 p-5 sm:p-8">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div>
          <p className="text-sm font-bold tracking-wider text-blue-600">
            SKILLBRIDGE GLOBAL
          </p>

          <h1 className="mt-2 text-3xl font-bold text-slate-900">
            Saved Items
          </h1>

          <p className="mt-2 text-slate-500">
            Keep track of interesting opportunities and talented professionals.
          </p>
        </div>

        {/* Notification */}
        {message && (
          <div className="mt-6 rounded-xl border border-green-200 bg-green-50 p-4 text-sm font-semibold text-green-700">
            {message}
          </div>
        )}

        {/* Statistics */}
        <div className="mt-8 grid grid-cols-2 gap-4">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">Saved Jobs</p>
            <h2 className="mt-2 text-3xl font-bold text-slate-900">
              {jobs.length}
            </h2>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">Shortlisted Candidates</p>
            <h2 className="mt-2 text-3xl font-bold text-slate-900">
              {candidates.length}
            </h2>
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-8 flex flex-wrap gap-3">
          <button
            onClick={() => {
              setActiveTab("jobs");
              setSearch("");
            }}
            className={`rounded-xl px-5 py-3 font-semibold ${
              activeTab === "jobs"
                ? "bg-blue-600 text-white"
                : "border border-slate-300 bg-white text-slate-600"
            }`}
          >
            Saved Jobs ({jobs.length})
          </button>

          <button
            onClick={() => {
              setActiveTab("candidates");
              setSearch("");
            }}
            className={`rounded-xl px-5 py-3 font-semibold ${
              activeTab === "candidates"
                ? "bg-blue-600 text-white"
                : "border border-slate-300 bg-white text-slate-600"
            }`}
          >
            Shortlisted Candidates ({candidates.length})
          </button>
        </div>

        {/* Search */}
        <div className="mt-6">
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={
              activeTab === "jobs"
                ? "Search saved jobs..."
                : "Search shortlisted candidates..."
            }
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-blue-500"
          />
        </div>

        {/* Saved Jobs */}
        {activeTab === "jobs" && (
          <section className="mt-6">
            <div className="mb-4">
              <h2 className="text-xl font-bold text-slate-900">
                Your Saved Jobs
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Opportunities you may want to apply for.
              </p>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              {filteredJobs.map((job) => (
                <article
                  key={job.id}
                  className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                        {job.category}
                      </span>

                      <h3 className="mt-4 text-lg font-bold text-slate-900">
                        {job.title}
                      </h3>

                      <p className="mt-1 text-sm font-medium text-slate-600">
                        {job.company}
                      </p>
                    </div>

                    <button
                      onClick={() => removeJob(job.id)}
                      className="text-sm font-semibold text-red-500 hover:text-red-700"
                    >
                      Remove
                    </button>
                  </div>

                  <div className="mt-5 space-y-2 text-sm text-slate-600">
                    <p>📍 {job.location}</p>
                    <p>💼 {job.type}</p>
                    <p>💰 {job.salary}</p>
                    <p>📅 Saved on {job.savedDate}</p>
                  </div>

                  <div className="mt-6 flex gap-3">
                    <a
                      href="/jobs"
                      className="flex-1 rounded-xl bg-blue-600 px-4 py-3 text-center text-sm font-semibold text-white hover:bg-blue-700"
                    >
                      Explore Jobs
                    </a>

                    <button
                      onClick={() => removeJob(job.id)}
                      className="rounded-xl border border-slate-300 px-4 py-3 text-sm font-semibold text-slate-600 hover:bg-slate-50"
                    >
                      Unsave
                    </button>
                  </div>
                </article>
              ))}

              {filteredJobs.length === 0 && (
                <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center md:col-span-2">
                  <h3 className="font-bold text-slate-800">
                    No saved jobs found
                  </h3>
                  <p className="mt-2 text-sm text-slate-500">
                    Search another term or explore available jobs.
                  </p>
                  <a
                    href="/jobs"
                    className="mt-4 inline-block rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white"
                  >
                    Find Jobs
                  </a>
                </div>
              )}
            </div>
          </section>
        )}

        {/* Shortlisted Candidates */}
        {activeTab === "candidates" && (
          <section className="mt-6">
            <div className="mb-4">
              <h2 className="text-xl font-bold text-slate-900">
                Shortlisted Candidates
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Professionals you have shortlisted for hiring.
              </p>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              {filteredCandidates.map((candidate) => (
                <article
                  key={candidate.id}
                  className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-lg font-bold text-blue-700">
                        {candidate.name.charAt(0)}
                      </div>

                      <div>
                        <h3 className="font-bold text-slate-900">
                          {candidate.name}
                        </h3>
                        <p className="text-sm text-slate-500">
                          {candidate.role}
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => removeCandidate(candidate.id)}
                      className="text-sm font-semibold text-red-500 hover:text-red-700"
                    >
                      Remove
                    </button>
                  </div>

                  <div className="mt-5 space-y-2 text-sm text-slate-600">
                    <p>📍 {candidate.location}</p>
                    <p>💼 {candidate.experience} Experience</p>

                    <p>
                      Availability:{" "}
                      <span className="font-semibold text-green-600">
                        {candidate.availability}
                      </span>
                    </p>
                  </div>

                  <div className="mt-4">
                    <p className="text-sm font-semibold text-slate-700">
                      Skills
                    </p>

                    <div className="mt-2 flex flex-wrap gap-2">
                      {candidate.skills.map((skill) => (
                        <span
                          key={skill}
                          className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6 flex gap-3">
                    <a
                      href="/messages"
                      className="flex-1 rounded-xl bg-blue-600 px-4 py-3 text-center text-sm font-semibold text-white hover:bg-blue-700"
                    >
                      Message
                    </a>

                    <button
                      onClick={() => removeCandidate(candidate.id)}
                      className="rounded-xl border border-slate-300 px-4 py-3 text-sm font-semibold text-slate-600 hover:bg-slate-50"
                    >
                      Remove
                    </button>
                  </div>
                </article>
              ))}

              {filteredCandidates.length === 0 && (
                <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center md:col-span-2">
                  <h3 className="font-bold text-slate-800">
                    No shortlisted candidates found
                  </h3>
                  <p className="mt-2 text-sm text-slate-500">
                    Search another term or explore talent.
                  </p>
                  <a
                    href="/talent"
                    className="mt-4 inline-block rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white"
                  >
                    Find Talent
                  </a>
                </div>
              )}
            </div>
          </section>
        )}

        <p className="mt-8 text-center text-xs text-slate-400">
          Demo data only. Saved jobs and shortlisted candidates will be
          connected to user accounts and database later.
        </p>
      </div>
    </main>
  );
}