"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const jobs = [
  {
    title: "Frontend Developer",
    company: "Tech Solutions",
    location: "Remote",
    type: "Full-Time",
    salary: "$40,000 - $60,000",
  },
  {
    title: "Cyber Security Analyst",
    company: "Global Security",
    location: "United States",
    type: "Full-Time",
    salary: "$50,000 - $75,000",
  },
  {
    title: "Junior Software Developer",
    company: "Digital Innovations",
    location: "Remote",
    type: "Entry-Level",
    salary: "$30,000 - $45,000",
  },
];

export default function CandidateDashboard() {
  const pathname = usePathname();

  const menu = [
    { label: "Overview", href: "/dashboard/candidate" },
    { label: "Find Jobs", href: "/jobs" },
    { label: "My Applications", href: "/applications" },
    { label: "Saved Jobs", href: "/saved" },
    { label: "My Profile", href: "/register/candidate" },
    { label: "Settings", href: "/settings" },
  ];

  return (
    <main className="min-h-screen bg-gray-100 md:flex">

      {/* Sidebar */}
      <aside className="bg-[#0B1F3A] p-4 text-white md:min-h-screen md:w-64 md:p-6">
        <h1 className="text-2xl font-bold">
          SkillBridge<span className="text-blue-400">Global</span>
        </h1>

        <p className="mb-8 mt-2 text-sm text-gray-400">
          Candidate Dashboard
        </p>

        <nav
          aria-label="Candidate dashboard navigation"
          className="flex gap-2 overflow-x-auto space-y-0 md:block md:space-y-2"
        >
          {menu.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              aria-current={pathname === item.href ? "page" : undefined}
              className={`block shrink-0 rounded-lg px-4 py-3 text-left text-sm font-medium transition md:w-full ${
                pathname === item.href
                  ? "bg-blue-600 text-white"
                  : "text-gray-300 hover:bg-white/10"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/"
          className="mt-10 block rounded-lg px-4 py-3 text-sm text-gray-300 hover:bg-white/10"
        >
          ← Back to Website
        </Link>

        <Link
          href="/login"
          className="mt-2 block rounded-lg px-4 py-3 text-sm text-red-300 hover:bg-white/10"
        >
          Sign In
        </Link>
      </aside>

      {/* Main Content */}
      <section className="flex-1 p-6 md:p-10">

        {/* Header */}
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold text-[#0B1F3A]">
              Welcome, Candidate!
            </h2>
            <p className="mt-2 text-gray-500">
              Manage your career and explore global opportunities.
            </p>
          </div>

          <Link
            href="/jobs"
            className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
          >
            + Explore Jobs
          </Link>
        </div>

        <p className="mb-6 rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm text-amber-800">
          Demo dashboard: profile metrics and activity are not connected to a user account.
        </p>

        {/* Statistics */}
        <div className="mb-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {[
            ["Total Applications", "0"],
            ["Saved Jobs", "0"],
            ["Profile Views", "0"],
            ["Interviews", "0"],
          ].map(([title, value]) => (
            <div
              key={title}
              className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
            >
              <p className="text-sm text-gray-500">{title}</p>
              <h3 className="mt-3 text-3xl font-bold text-[#0B1F3A]">
                {value}
              </h3>
            </div>
          ))}
        </div>

        {/* Profile Progress */}
        <div className="mb-8 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex flex-wrap justify-between gap-3">
            <div>
              <h3 className="text-xl font-bold text-[#0B1F3A]">
                Complete Your Profile
              </h3>
              <p className="mt-2 text-sm text-gray-500">
                Add your skills, education and resume to improve your profile.
              </p>
            </div>

            <span className="font-bold text-blue-600">25%</span>
          </div>

          <div className="mt-5 h-3 overflow-hidden rounded-full bg-gray-200">
            <div className="h-full w-1/4 rounded-full bg-blue-600" />
          </div>

          <Link
            href="/register/candidate"
            className="mt-5 inline-block font-semibold text-blue-600 hover:underline"
          >
            Complete Profile →
          </Link>
        </div>

        {/* Recommended Jobs */}
        <div className="mb-8 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <h3 className="text-xl font-bold text-[#0B1F3A]">
              Recommended Jobs
            </h3>

            <Link
              href="/jobs"
              className="font-semibold text-blue-600 hover:underline"
            >
              View All →
            </Link>
          </div>

          <div className="space-y-4">
            {jobs.map((job) => (
              <div
                key={job.title}
                className="flex flex-wrap items-center justify-between gap-4 rounded-lg border border-gray-200 p-5"
              >
                <div>
                  <h4 className="font-bold text-[#0B1F3A]">
                    {job.title}
                  </h4>
                  <p className="mt-1 text-sm text-gray-600">
                    {job.company}
                  </p>
                  <p className="mt-2 text-sm text-gray-500">
                    {job.location} · {job.type}
                  </p>
                  <p className="mt-2 text-sm font-semibold text-green-700">
                    {job.salary}
                  </p>
                </div>

                <Link
                  href="/jobs"
                  className="rounded-lg border border-blue-600 px-5 py-2 font-semibold text-blue-600 hover:bg-blue-600 hover:text-white"
                >
                  View Job
                </Link>
              </div>
            ))}
          </div>

          <p className="mt-5 text-xs text-gray-400">
            Sample job listings for UI preview only. These are not verified
            live vacancies.
          </p>
        </div>

        {/* Recent Activity */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <h3 className="mb-4 text-xl font-bold text-[#0B1F3A]">
            Recent Activity
          </h3>

          <div className="rounded-lg bg-gray-50 p-8 text-center">
            <p className="font-semibold text-gray-700">
              No recent activity
            </p>
            <p className="mt-2 text-sm text-gray-500">
              Your job applications and updates will appear here.
            </p>
          </div>
        </div>

        <p className="mt-8 text-center text-xs text-gray-400">
          SkillBridge Global © 2026. All rights reserved.
        </p>
      </section>
    </main>
  );
}
