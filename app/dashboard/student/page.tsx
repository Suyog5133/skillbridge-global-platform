"use client";

import Link from "next/link";

const opportunities = [
  {
    title: "Frontend Developer Intern",
    company: "TechNova Solutions",
    type: "Remote",
    duration: "3 Months",
    status: "Open",
  },
  {
    title: "Cyber Security Intern",
    company: "SecureNet Technologies",
    type: "Hybrid",
    duration: "6 Months",
    status: "Open",
  },
  {
    title: "Junior Software Developer",
    company: "GlobalSoft",
    type: "Remote",
    duration: "Full Time",
    status: "Open",
  },
];

export default function StudentDashboard() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-800">
      <div className="flex min-h-screen flex-col md:flex-row">
        <nav
          aria-label="Student dashboard navigation"
          className="flex gap-2 overflow-x-auto border-b border-slate-200 bg-white p-3 md:hidden"
        >
          <Link href="/dashboard/student" className="shrink-0 rounded-lg bg-blue-600 px-3 py-2 text-sm font-medium text-white">Overview</Link>
          <Link href="/internships" className="shrink-0 rounded-lg px-3 py-2 text-sm font-medium text-slate-700">Internships</Link>
          <Link href="/jobs" className="shrink-0 rounded-lg px-3 py-2 text-sm font-medium text-slate-700">Entry-Level Jobs</Link>
          <Link href="/freelance" className="shrink-0 rounded-lg px-3 py-2 text-sm font-medium text-slate-700">Freelance</Link>
          <Link href="/register/student" className="shrink-0 rounded-lg px-3 py-2 text-sm font-medium text-slate-700">My Profile</Link>
        </nav>

        {/* Sidebar */}
        <aside className="hidden w-64 flex-col bg-[#0B1F3A] p-6 text-white md:flex">
          <Link href="/" className="mb-10 text-2xl font-bold">
            SkillBridge<span className="text-blue-400"> Global</span>
          </Link>

          <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-slate-400">
            Student Menu
          </p>

          <nav className="space-y-2 text-sm">
            <Link href="/dashboard/student" className="block rounded-lg bg-blue-600 px-4 py-3 font-medium">
              Overview
            </Link>
            <Link href="/internships" className="block rounded-lg px-4 py-3 hover:bg-slate-700">
              Find Internships
            </Link>
            <Link href="/jobs" className="block rounded-lg px-4 py-3 hover:bg-slate-700">
              Entry-Level Jobs
            </Link>
            <Link href="/freelance" className="block rounded-lg px-4 py-3 hover:bg-slate-700">
              Freelance Projects
            </Link>
            <Link href="/talent" className="block rounded-lg px-4 py-3 hover:bg-slate-700">
              Explore Opportunities
            </Link>
            <Link href="/register/student" className="block rounded-lg px-4 py-3 hover:bg-slate-700">
              My Profile
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
          <header className="mb-8 flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-sm text-slate-500">Student Workspace</p>
              <h1 className="mt-1 text-2xl font-bold text-[#0B1F3A] md:text-3xl">
                Student Dashboard
              </h1>
              <p className="mt-2 text-sm text-slate-500">
                Discover internships, build skills and start your career.
              </p>
            </div>

            <Link
              href="/internships"
              className="rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700"
            >
              Explore Internships
            </Link>
          </header>

          {/* Welcome Card */}
          <div className="mb-7 rounded-2xl bg-gradient-to-r from-[#0B1F3A] to-blue-700 p-6 text-white md:p-8">
            <p className="text-sm text-blue-200">Welcome to SkillBridge Global</p>
            <h2 className="mt-2 text-2xl font-bold md:text-3xl">
              Your career journey starts here!
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-blue-100">
              Find global internship opportunities, connect with companies and
              develop the skills needed for your future career.
            </p>
            <Link
              href="/internships"
              className="mt-5 inline-block rounded-lg bg-white px-5 py-3 text-sm font-semibold text-blue-700 hover:bg-blue-50"
            >
              Find Opportunities
            </Link>
          </div>

          {/* Statistics */}
          <div className="mb-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {[
              { label: "Applications Sent", value: "08", icon: "📨" },
              { label: "Saved Opportunities", value: "12", icon: "🔖" },
              { label: "Profile Completion", value: "65%", icon: "👤" },
              { label: "Skills Added", value: "06", icon: "🎯" },
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

          {/* Profile Completion */}
          <div className="mb-8 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h3 className="font-bold text-[#0B1F3A]">Complete Your Student Profile</h3>
                <p className="mt-1 text-sm text-slate-500">
                  A complete profile can help companies understand your skills.
                </p>
              </div>
              <span className="font-bold text-blue-600">65%</span>
            </div>
            <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-100">
              <div className="h-full w-[65%] rounded-full bg-blue-600" />
            </div>
            <Link href="/register/student" className="mt-4 inline-block text-sm font-semibold text-blue-600 hover:underline">
              Update Profile →
            </Link>
          </div>

          {/* Opportunities */}
          <div className="mb-8">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="text-xl font-bold text-[#0B1F3A]">
                  Recommended Opportunities
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Explore sample opportunities for students.
                </p>
              </div>
              <Link href="/internships" className="text-sm font-semibold text-blue-600 hover:underline">
                View All →
              </Link>
            </div>

            <div className="grid gap-4 lg:grid-cols-3">
              {opportunities.map((item) => (
                <div key={item.title} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                  <div className="mb-4 flex items-center justify-between">
                    <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-green-700">
                      {item.status}
                    </span>
                    <span className="text-xs text-slate-400">{item.type}</span>
                  </div>
                  <h3 className="font-bold text-[#0B1F3A]">{item.title}</h3>
                  <p className="mt-2 text-sm text-slate-500">{item.company}</p>
                  <p className="mt-3 text-xs text-slate-500">
                    Duration: {item.duration}
                  </p>
                  <Link
                    href="/internships"
                    className="mt-5 block rounded-lg border border-blue-600 py-2.5 text-center text-sm font-semibold text-blue-600 hover:bg-blue-600 hover:text-white"
                  >
                    Explore Opportunity
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* Career Development */}
          <div className="grid gap-5 lg:grid-cols-2">
            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="font-bold text-[#0B1F3A]">Build Your Skills</h3>
              <p className="mt-2 text-sm leading-6 text-slate-500">
                Highlight your technical skills, certifications and projects to
                improve your career opportunities.
              </p>
              <Link href="/register/student" className="mt-4 inline-block text-sm font-semibold text-blue-600 hover:underline">
                Add Your Skills →
              </Link>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="font-bold text-[#0B1F3A]">Explore Global Careers</h3>
              <p className="mt-2 text-sm leading-6 text-slate-500">
                Discover opportunities from companies and organizations around
                the world.
              </p>
              <Link href="/jobs" className="mt-4 inline-block text-sm font-semibold text-blue-600 hover:underline">
                Explore Jobs →
              </Link>
            </div>
          </div>

          <p className="mt-8 text-center text-xs text-slate-400">
            SkillBridge Global · Student Dashboard · Demo data only
          </p>
        </section>
      </div>
    </main>
  );
}