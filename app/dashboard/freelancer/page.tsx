"use client";

import Link from "next/link";

const projects = [
  {
    title: "Website UI Design",
    client: "Creative Studio",
    budget: "$250",
    type: "Fixed Price",
    status: "Open",
  },
  {
    title: "Cyber Security Website Audit",
    client: "SecureTech",
    budget: "$400",
    type: "Fixed Price",
    status: "Open",
  },
  {
    title: "Social Media Graphics",
    client: "Digital Growth Agency",
    budget: "$150",
    type: "Fixed Price",
    status: "Open",
  },
];

export default function FreelancerDashboard() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-800">
      <div className="flex min-h-screen flex-col md:flex-row">
        <nav
          aria-label="Freelancer dashboard navigation"
          className="flex gap-2 overflow-x-auto border-b border-slate-200 bg-white p-3 md:hidden"
        >
          <Link href="/dashboard/freelancer" className="shrink-0 rounded-lg bg-blue-600 px-3 py-2 text-sm font-medium text-white">Overview</Link>
          <Link href="/freelance" className="shrink-0 rounded-lg px-3 py-2 text-sm font-medium text-slate-700">Find Projects</Link>
          <Link href="/applications" className="shrink-0 rounded-lg px-3 py-2 text-sm font-medium text-slate-700">My Proposals</Link>
          <Link href="/register/freelancer" className="shrink-0 rounded-lg px-3 py-2 text-sm font-medium text-slate-700">My Profile</Link>
        </nav>


        {/* Sidebar */}
        <aside className="hidden w-64 flex-col bg-[#0B1F3A] p-6 text-white md:flex">
          <Link href="/" className="mb-10 text-2xl font-bold">
            SkillBridge<span className="text-blue-400"> Global</span>
          </Link>

          <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-slate-400">
            Freelancer Menu
          </p>

          <nav className="space-y-2 text-sm">
            <Link href="/dashboard/freelancer" className="block rounded-lg bg-blue-600 px-4 py-3 font-medium">
              Overview
            </Link>
            <Link href="/freelance" className="block rounded-lg px-4 py-3 hover:bg-slate-700">
              Find Projects
            </Link>
            <Link href="/applications" className="block rounded-lg px-4 py-3 hover:bg-slate-700">
              My Proposals
            </Link>
            <Link href="/register/freelancer" className="block rounded-lg px-4 py-3 hover:bg-slate-700">
              My Portfolio
            </Link>
            <Link href="/register/freelancer" className="block rounded-lg px-4 py-3 hover:bg-slate-700">
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

          {/* Header */}
          <header className="mb-8 flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-sm text-slate-500">Freelancer Workspace</p>
              <h1 className="mt-1 text-2xl font-bold text-[#0B1F3A] md:text-3xl">
                Freelancer Dashboard
              </h1>
              <p className="mt-2 text-sm text-slate-500">
                Find clients, manage projects and grow your freelance career.
              </p>
            </div>

            <Link
              href="/freelance"
              className="rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700"
            >
              Find Projects
            </Link>
          </header>

          {/* Welcome Banner */}
          <div className="mb-7 rounded-2xl bg-gradient-to-r from-[#0B1F3A] to-blue-700 p-6 text-white md:p-8">
            <p className="text-sm text-blue-200">Welcome to SkillBridge Global</p>
            <h2 className="mt-2 text-2xl font-bold md:text-3xl">
              Turn your skills into opportunities!
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-blue-100">
              Connect with clients around the world, discover projects and
              showcase your professional work.
            </p>
            <Link
              href="/freelance"
              className="mt-5 inline-block rounded-lg bg-white px-5 py-3 text-sm font-semibold text-blue-700 hover:bg-blue-50"
            >
              Explore Projects
            </Link>
          </div>

          {/* Statistics */}
          <div className="mb-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {[
              { label: "Active Projects", value: "03", icon: "📁" },
              { label: "Proposals Sent", value: "12", icon: "📨" },
              { label: "Total Earnings", value: "$850", icon: "💰" },
              { label: "Profile Views", value: "48", icon: "👁️" },
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
                <h3 className="font-bold text-[#0B1F3A]">Complete Your Freelancer Profile</h3>
                <p className="mt-1 text-sm text-slate-500">
                  Showcase your skills and experience to attract more clients.
                </p>
              </div>
              <span className="font-bold text-blue-600">70%</span>
            </div>

            <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-100">
              <div className="h-full w-[70%] rounded-full bg-blue-600" />
            </div>

            <Link href="/register/freelancer" className="mt-4 inline-block text-sm font-semibold text-blue-600 hover:underline">
              Update Profile →
            </Link>
          </div>

          {/* Recommended Projects */}
          <div className="mb-8">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="text-xl font-bold text-[#0B1F3A]">
                  Recommended Projects
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Sample freelance projects you can explore.
                </p>
              </div>

              <Link href="/freelance" className="text-sm font-semibold text-blue-600 hover:underline">
                View All →
              </Link>
            </div>

            <div className="grid gap-4 lg:grid-cols-3">
              {projects.map((project) => (
                <div key={project.title} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                  <div className="mb-4 flex items-center justify-between">
                    <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-green-700">
                      {project.status}
                    </span>
                    <span className="text-xs text-slate-400">{project.type}</span>
                  </div>

                  <h3 className="font-bold text-[#0B1F3A]">{project.title}</h3>
                  <p className="mt-2 text-sm text-slate-500">{project.client}</p>

                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-sm text-slate-500">Project Budget</span>
                    <span className="font-bold text-[#0B1F3A]">{project.budget}</span>
                  </div>

                  <Link
                    href="/freelance"
                    className="mt-5 block rounded-lg border border-blue-600 py-2.5 text-center text-sm font-semibold text-blue-600 hover:bg-blue-600 hover:text-white"
                  >
                    View Project
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* Freelancer Tools */}
          <div className="grid gap-5 lg:grid-cols-2">
            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="font-bold text-[#0B1F3A]">Build Your Portfolio</h3>
              <p className="mt-2 text-sm leading-6 text-slate-500">
                Add your best work, completed projects and professional skills
                to build trust with potential clients.
              </p>
              <Link href="/register/freelancer" className="mt-4 inline-block text-sm font-semibold text-blue-600 hover:underline">
                Manage Portfolio →
              </Link>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="font-bold text-[#0B1F3A]">Find Global Clients</h3>
              <p className="mt-2 text-sm leading-6 text-slate-500">
                Discover freelance projects and connect with businesses from
                different countries.
              </p>
              <Link href="/freelance" className="mt-4 inline-block text-sm font-semibold text-blue-600 hover:underline">
                Explore Projects →
              </Link>
            </div>
          </div>

          <p className="mt-8 text-center text-xs text-slate-400">
            SkillBridge Global · Freelancer Dashboard · Demo data only
          </p>
        </section>
      </div>
    </main>
  );
}