"use client";

import Link from "next/link";

const users = [
  { name: "Alex Morgan", email: "alex@example.com", role: "Candidate", status: "Active" },
  { name: "Priya Sharma", email: "priya@example.com", role: "Student", status: "Active" },
  { name: "Daniel Smith", email: "daniel@example.com", role: "Freelancer", status: "Pending" },
  { name: "GlobalTech Ltd.", email: "hr@globaltech.example", role: "Company", status: "Pending" },
];

const jobs = [
  { title: "Frontend Developer", company: "TechNova", category: "Full Time", status: "Published" },
  { title: "Cyber Security Intern", company: "SecureNet", category: "Internship", status: "Published" },
  { title: "UI/UX Designer", company: "Creative Studio", category: "Contract", status: "Under Review" },
];

export default function AdminDashboard() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-800">
      <div className="flex min-h-screen flex-col md:flex-row">
        <nav
          aria-label="Admin dashboard navigation"
          className="flex gap-2 overflow-x-auto border-b border-slate-200 bg-white p-3 md:hidden"
        >
          <Link href="/dashboard/admin" className="shrink-0 rounded-lg bg-blue-600 px-3 py-2 text-sm font-medium text-white">Overview</Link>
          <Link href="/admin/users" className="shrink-0 rounded-lg px-3 py-2 text-sm font-medium text-slate-700">Users</Link>
          <Link href="/admin/verification" className="shrink-0 rounded-lg px-3 py-2 text-sm font-medium text-slate-700">Verification</Link>
          <Link href="/admin/jobs" className="shrink-0 rounded-lg px-3 py-2 text-sm font-medium text-slate-700">Jobs</Link>
          <Link href="/admin/reports" className="shrink-0 rounded-lg px-3 py-2 text-sm font-medium text-slate-700">Reports</Link>
          <Link href="/admin/security" className="shrink-0 rounded-lg px-3 py-2 text-sm font-medium text-slate-700">Security</Link>
        </nav>


        {/* Sidebar */}
        <aside className="hidden w-64 flex-col bg-[#0B1F3A] p-6 text-white md:flex">
          <Link href="/" className="mb-10 text-2xl font-bold">
            SkillBridge<span className="text-blue-400"> Global</span>
          </Link>

          <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-slate-400">
            Administration
          </p>

          <nav className="space-y-2 text-sm">
            <Link href="/dashboard/admin" className="block rounded-lg bg-blue-600 px-4 py-3 font-medium">
              Overview
            </Link>
            <Link href="/dashboard/admin#users" className="block rounded-lg px-4 py-3 hover:bg-slate-700">
              Manage Users
            </Link>
            <Link href="/dashboard/admin#companies" className="block rounded-lg px-4 py-3 hover:bg-slate-700">
              Company Verification
            </Link>
            <Link href="/dashboard/admin#jobs" className="block rounded-lg px-4 py-3 hover:bg-slate-700">
              Manage Job Posts
            </Link>
            <Link href="/dashboard/admin#reports" className="block rounded-lg px-4 py-3 hover:bg-slate-700">
              Reports
            </Link>
            <Link href="/dashboard/admin#security" className="block rounded-lg px-4 py-3 hover:bg-slate-700">
              Security Overview
            </Link>
            <Link href="/contact" className="block rounded-lg px-4 py-3 hover:bg-slate-700">
              Support
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
              <p className="text-sm text-slate-500">Platform Administration</p>
              <h1 className="mt-1 text-2xl font-bold text-[#0B1F3A] md:text-3xl">
                Admin Dashboard
              </h1>
              <p className="mt-2 text-sm text-slate-500">
                Monitor and manage the SkillBridge Global platform.
              </p>
            </div>

            <span className="rounded-lg border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700">
              Admin Panel · Demo
            </span>
          </header>

          {/* Welcome Banner */}
          <div className="mb-7 rounded-2xl bg-gradient-to-r from-[#0B1F3A] to-blue-700 p-6 text-white md:p-8">
            <p className="text-sm text-blue-200">Platform Control Center</p>
            <h2 className="mt-2 text-2xl font-bold md:text-3xl">
              Manage your global career ecosystem.
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-blue-100">
              Monitor users, review companies, manage job listings and help
              maintain a safe and trusted hiring platform.
            </p>
          </div>

          {/* Statistics */}
          <div className="mb-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {[
              { label: "Total Users", value: "1,250", icon: "👥" },
              { label: "Registered Companies", value: "85", icon: "🏢" },
              { label: "Job Listings", value: "320", icon: "📢" },
              { label: "Pending Reviews", value: "18", icon: "⏳" },
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

          {/* User Management */}
          <div id="users" className="mb-8 scroll-mt-8">
            <div className="mb-4">
              <h2 className="text-xl font-bold text-[#0B1F3A]">User Management</h2>
              <p className="mt-1 text-sm text-slate-500">
                Sample registered accounts across different user roles.
              </p>
            </div>

            <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm">
              <table className="w-full min-w-[650px] text-left text-sm">
                <thead className="bg-slate-100 text-slate-500">
                  <tr>
                    <th className="px-5 py-4 font-semibold">Name</th>
                    <th className="px-5 py-4 font-semibold">Email</th>
                    <th className="px-5 py-4 font-semibold">Role</th>
                    <th className="px-5 py-4 font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.email} className="border-t border-slate-100">
                      <td className="px-5 py-4 font-semibold text-[#0B1F3A]">{user.name}</td>
                      <td className="px-5 py-4 text-slate-500">{user.email}</td>
                      <td className="px-5 py-4">{user.role}</td>
                      <td className="px-5 py-4">
                        <span className={`rounded-full px-3 py-1 text-xs font-medium ${
                          user.status === "Active"
                            ? "bg-green-50 text-green-700"
                            : "bg-amber-50 text-amber-700"
                        }`}>
                          {user.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Company Verification */}
          <div id="companies" className="mb-8 scroll-mt-8 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="font-bold text-[#0B1F3A]">Company Verification</h2>
            <p className="mt-2 text-sm leading-6 text-slate-500">
              Review company information and submitted verification documents
              before allowing organizations to use hiring features.
            </p>
            <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-lg bg-amber-50 p-4">
              <div>
                <p className="font-semibold text-amber-800">12 companies awaiting review</p>
                <p className="mt-1 text-xs text-amber-700">Sample review count</p>
              </div>
              <Link href="/register/company" className="rounded-lg border border-amber-300 px-4 py-2 text-sm font-semibold text-amber-800 hover:bg-amber-100">
                View Company Form
              </Link>
            </div>
          </div>

          {/* Job Management */}
          <div id="jobs" className="mb-8 scroll-mt-8">
            <div className="mb-4">
              <h2 className="text-xl font-bold text-[#0B1F3A]">Job Listing Management</h2>
              <p className="mt-1 text-sm text-slate-500">
                Sample listings requiring platform monitoring.
              </p>
            </div>

            <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm">
              <table className="w-full min-w-[600px] text-left text-sm">
                <thead className="bg-slate-100 text-slate-500">
                  <tr>
                    <th className="px-5 py-4 font-semibold">Job Title</th>
                    <th className="px-5 py-4 font-semibold">Company</th>
                    <th className="px-5 py-4 font-semibold">Category</th>
                    <th className="px-5 py-4 font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {jobs.map((job) => (
                    <tr key={job.title} className="border-t border-slate-100">
                      <td className="px-5 py-4 font-semibold text-[#0B1F3A]">{job.title}</td>
                      <td className="px-5 py-4 text-slate-500">{job.company}</td>
                      <td className="px-5 py-4">{job.category}</td>
                      <td className="px-5 py-4">
                        <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
                          {job.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Reports */}
          <div id="reports" className="mb-8 scroll-mt-8 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="font-bold text-[#0B1F3A]">Reports & Platform Safety</h2>
            <p className="mt-2 text-sm leading-6 text-slate-500">
              Review reported job posts, suspicious accounts, spam, fake
              companies and inappropriate user activity.
            </p>
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              <div className="rounded-lg bg-slate-50 p-4">
                <p className="text-2xl font-bold text-[#0B1F3A]">05</p>
                <p className="mt-1 text-xs text-slate-500">Reported Listings</p>
              </div>
              <div className="rounded-lg bg-slate-50 p-4">
                <p className="text-2xl font-bold text-[#0B1F3A]">03</p>
                <p className="mt-1 text-xs text-slate-500">Reported Accounts</p>
              </div>
              <div className="rounded-lg bg-slate-50 p-4">
                <p className="text-2xl font-bold text-[#0B1F3A]">10</p>
                <p className="mt-1 text-xs text-slate-500">Resolved Reports</p>
              </div>
            </div>
          </div>

          {/* Security */}
          <div id="security" className="scroll-mt-8 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="font-bold text-[#0B1F3A]">Security & Privacy</h2>
            <p className="mt-2 text-sm leading-6 text-slate-500">
              The platform will require secure authentication, role-based
              permissions, protected user data and privacy controls.
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link href="/privacy" className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium hover:bg-slate-50">
                Privacy Policy
              </Link>
              <Link href="/terms" className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium hover:bg-slate-50">
                Terms & Conditions
              </Link>
              <Link href="/cookies" className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium hover:bg-slate-50">
                Cookie Policy
              </Link>
            </div>
          </div>

          <p className="mt-8 text-center text-xs text-slate-400">
            SkillBridge Global · Admin Dashboard · Demo data only
          </p>
        </section>
      </div>
    </main>
  );
}