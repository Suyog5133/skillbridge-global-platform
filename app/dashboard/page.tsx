"use client";

import Link from "next/link";

const dashboards = [
  { name: "Admin Dashboard", description: "Manage users, companies, jobs and platform activities.", path: "/dashboard/admin", icon: "🛡️" },
  { name: "Candidate Dashboard", description: "Manage your profile, applications and job opportunities.", path: "/dashboard/candidate", icon: "👤" },
  { name: "Company Dashboard", description: "Post jobs, manage applicants and find talent.", path: "/dashboard/company", icon: "🏢" },
  { name: "Freelancer Dashboard", description: "Explore projects, manage proposals and grow your career.", path: "/dashboard/freelancer", icon: "💻" },
  { name: "Student Dashboard", description: "Find internships, opportunities and career resources.", path: "/dashboard/student", icon: "🎓" },
  { name: "Talent Discovery", description: "Explore professionals and talent categories.", path: "/talent", icon: "🌍" },
];

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-slate-50 px-6 py-12">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-bold text-slate-900">
            SkillBridge Global
          </h1>
          <p className="mt-3 text-slate-600">
            Select your dashboard to continue
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {dashboards.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="mb-4 text-4xl">{item.icon}</div>
              <h2 className="text-xl font-bold text-slate-900">
                {item.name}
              </h2>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                {item.description}
              </p>
              <div className="mt-6 font-semibold text-blue-700">
                Open Dashboard →
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}