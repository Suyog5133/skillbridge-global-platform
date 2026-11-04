"use client";

import Link from "next/link";

const applicants = [
  {
    name: "Alex Morgan",
    role: "Frontend Developer",
    location: "United States",
    experience: "2 Years Experience",
    status: "New Application",
  },
  {
    name: "Priya Sharma",
    role: "Cyber Security Analyst",
    location: "India",
    experience: "Fresher",
    status: "Under Review",
  },
  {
    name: "Daniel Smith",
    role: "UI/UX Designer",
    location: "United Kingdom",
    experience: "3 Years Experience",
    status: "Shortlisted",
  },
];

const jobPosts = [
  {
    title: "Frontend Developer",
    type: "Full Time",
    location: "Remote / Worldwide",
    applications: 45,
    status: "Active",
  },
  {
    title: "Cyber Security Intern",
    type: "Internship",
    location: "Hybrid",
    applications: 28,
    status: "Active",
  },
  {
    title: "UI/UX Designer",
    type: "Contract",
    location: "Remote",
    applications: 16,
    status: "Active",
  },
];

export default function CompanyDashboard() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-800">
      <div className="flex min-h-screen flex-col md:flex-row">
        <nav
          aria-label="Company dashboard navigation"
          className="flex gap-2 overflow-x-auto border-b border-slate-200 bg-white p-3 md:hidden"
        >
          <Link href="/dashboard/company" className="shrink-0 rounded-lg bg-blue-600 px-3 py-2 text-sm font-medium text-white">Overview</Link>
          <Link href="/manage-jobs" className="shrink-0 rounded-lg px-3 py-2 text-sm font-medium text-slate-700">Manage Jobs</Link>
          <Link href="/manage-applicants" className="shrink-0 rounded-lg px-3 py-2 text-sm font-medium text-slate-700">Applications</Link>
          <Link href="/talent" className="shrink-0 rounded-lg px-3 py-2 text-sm font-medium text-slate-700">Find Talent</Link>
          <Link href="/company-profile" className="shrink-0 rounded-lg px-3 py-2 text-sm font-medium text-slate-700">Company Profile</Link>
        </nav>

        {/* Sidebar */}
        <aside className="hidden w-64 flex-col bg-[#0B1F3A] p-6 text-white md:flex">
          <Link href="/" className="mb-10 text-2xl font-bold">
            SkillBridge<span className="text-blue-400"> Global</span>
          </Link>

          <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-slate-400">
            Company Menu
          </p>

          <nav className="space-y-2 text-sm">
            <Link href="/dashboard/company" className="block rounded-lg bg-blue-600 px-4 py-3 font-medium">
              Overview
            </Link>
            <Link href="/manage-jobs" className="block rounded-lg px-4 py-3 hover:bg-slate-700">
              Manage Job Posts
            </Link>
            <Link href="/talent" className="block rounded-lg px-4 py-3 hover:bg-slate-700">
              Find Talent
            </Link>
            <Link href="/manage-applicants" className="block rounded-lg px-4 py-3 hover:bg-slate-700">
              Applications
            </Link>
            <Link href="/talent" className="block rounded-lg px-4 py-3 hover:bg-slate-700">
              Shortlisted Candidates
            </Link>
            <Link href="/company-profile" className="block rounded-lg px-4 py-3 hover:bg-slate-700">
              Company Profile
            </Link>
            <Link href="/contact" className="block rounded-lg px-4 py-3 hover:bg-slate-700">
              Help & Support
            </Link>
          </nav>

          <div className="mt-auto border-t border-slate-700 pt-5">
            <Link href="/login" className="block rounded-lg px-4 py-3 text-sm text-slate-300 hover:bg-slate-700">
              Sign In
            </Link>
            <Link href="/" className="block rounded-lg px-4 py-3 text-sm text-slate-300 hover:bg-slate-700">
              Back to Website
            </Link>
          </div>
        </aside>

        {/* Main Content */}
        <section className="min-w-0 flex-1 p-5 md:p-8">

          {/* Header */}
          <header className="mb-8 flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-sm text-slate-500">Employer Workspace</p>
              <h1 className="mt-1 text-2xl font-bold text-[#0B1F3A] md:text-3xl">
                Company Dashboard
              </h1>
              <p className="mt-2 text-sm text-slate-500">
                Manage hiring, discover talent and grow your team globally.
              </p>
            </div>

            <Link
              href="/post-job"
              className="rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700"
            >
              + Post a Job
            </Link>
          </header>

          {/* Welcome Banner */}
          <div className="mb-7 rounded-2xl bg-gradient-to-r from-[#0B1F3A] to-blue-700 p-6 text-white md:p-8">
            <p className="text-sm text-blue-200">Employer Workspace</p>
            <h2 className="mt-2 text-2xl font-bold md:text-3xl">
              Find the right talent. Build the future.
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-blue-100">
              Connect with skilled professionals, students and freelancers
              from around the world through SkillBridge Global.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link
                href="/post-job"
                className="rounded-lg bg-white px-5 py-3 text-sm font-semibold text-blue-700 hover:bg-blue-50"
              >
                Post a Job
              </Link>
              <Link
                href="/talent"
                className="rounded-lg border border-white/40 px-5 py-3 text-sm font-semibold text-white hover:bg-white/10"
              >
                Find Candidates
              </Link>
            </div>
          </div>

          {/* Statistics */}
          <div className="mb-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {[
              { label: "Active Job Posts", value: "08", icon: "📢" },
              { label: "Total Applications", value: "156", icon: "📨" },
              { label: "Shortlisted", value: "24", icon: "⭐" },
              { label: "Interviews", value: "12", icon: "🤝" },
            ].map((item) => (
              <div key={item.label} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-slate-500">{item.label}</p>
                  <span className="text-2xl">{item.icon}</span>
                </div>
                <h3 className="mt-3 text-3xl font-bold text-[#0B1F3A]">
                  {item.value}
                </h3>
                <p className="mt-2 text-xs text-slate-400">Sample dashboard data</p>
              </div>
            ))}
          </div>

          {/* Job Posts */}
          <div className="mb-8">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="text-xl font-bold text-[#0B1F3A]">
                  Your Job Posts
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Overview of sample job listings and applications.
                </p>
              </div>
              <Link href="/manage-jobs" className="text-sm font-semibold text-blue-600 hover:underline">
                View All →
              </Link>
            </div>

            <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm">
              <table className="w-full min-w-[650px] text-left text-sm">
                <thead className="bg-slate-100 text-slate-500">
                  <tr>
                    <th className="px-5 py-4 font-semibold">Job Title</th>
                    <th className="px-5 py-4 font-semibold">Type</th>
                    <th className="px-5 py-4 font-semibold">Location</th>
                    <th className="px-5 py-4 font-semibold">Applications</th>
                    <th className="px-5 py-4 font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {jobPosts.map((job) => (
                    <tr key={job.title} className="border-t border-slate-100">
                      <td className="px-5 py-4 font-semibold text-[#0B1F3A]">{job.title}</td>
                      <td className="px-5 py-4 text-slate-500">{job.type}</td>
                      <td className="px-5 py-4 text-slate-500">{job.location}</td>
                      <td className="px-5 py-4 font-semibold">{job.applications}</td>
                      <td className="px-5 py-4">
                        <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-green-700">
                          {job.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Recent Applicants */}
          <div className="mb-8">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="text-xl font-bold text-[#0B1F3A]">
                  Recent Applicants
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Sample candidate applications for your review.
                </p>
              </div>
              <Link href="/talent" className="text-sm font-semibold text-blue-600 hover:underline">
                Explore Talent →
              </Link>
            </div>

            <div className="space-y-3">
              {applicants.map((person) => (
                <div
                  key={person.name}
                  className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 font-bold text-blue-700">
                      {person.name.split(" ").map((part) => part[0]).join("")}
                    </div>
                    <div>
                      <h3 className="font-bold text-[#0B1F3A]">{person.name}</h3>
                      <p className="text-sm text-slate-500">{person.role}</p>
                      <p className="mt-1 text-xs text-slate-400">
                        {person.location} · {person.experience}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
                      {person.status}
                    </span>
                    <Link
                      href="/talent"
                      className="rounded-lg border border-blue-600 px-4 py-2 text-sm font-semibold text-blue-600 hover:bg-blue-600 hover:text-white"
                    >
                      View Profile
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Hiring Tools */}
          <div className="grid gap-5 lg:grid-cols-2">
            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="font-bold text-[#0B1F3A]">Discover Global Talent</h3>
              <p className="mt-2 text-sm leading-6 text-slate-500">
                Search for students, freelancers and experienced professionals
                with the skills your company needs.
              </p>
              <Link href="/talent" className="mt-4 inline-block text-sm font-semibold text-blue-600 hover:underline">
                Find Talent →
              </Link>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="font-bold text-[#0B1F3A]">Manage Company Profile</h3>
              <p className="mt-2 text-sm leading-6 text-slate-500">
                Present your organization, hiring requirements and company
                information to potential candidates.
              </p>
              <Link href="/register/company" className="mt-4 inline-block text-sm font-semibold text-blue-600 hover:underline">
                Update Company Profile →
              </Link>
            </div>
          </div>

          <p className="mt-8 text-center text-xs text-slate-400">
            SkillBridge Global · Company Dashboard · Demo data only
          </p>
        </section>
      </div>
    </main>
  );
}