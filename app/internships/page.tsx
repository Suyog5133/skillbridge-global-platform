"use client";

import Link from "next/link";
import { useState } from "react";

const categories = [
  "Software Development",
  "Cyber Security",
  "Data Science",
  "Web Development",
  "Graphic Design",
  "Digital Marketing",
  "Business",
  "Finance",
];

const internships = [
  {
    title: "Cyber Security Intern",
    company: "Global Technology",
    location: "Remote · Worldwide",
    category: "Cyber Security",
    duration: "3 Months",
    type: "Remote",
    stipend: "Paid",
    skills: ["Networking", "Linux", "Security Basics"],
  },
  {
    title: "Frontend Developer Intern",
    company: "Digital Solutions",
    location: "Remote · Worldwide",
    category: "Software Development",
    duration: "6 Months",
    type: "Remote",
    stipend: "Paid",
    skills: ["HTML", "CSS", "JavaScript", "React"],
  },
  {
    title: "Data Analyst Intern",
    company: "DataVision",
    location: "Hybrid · India",
    category: "Data Science",
    duration: "3 Months",
    type: "Hybrid",
    stipend: "Paid",
    skills: ["Python", "Excel", "SQL"],
  },
  {
    title: "Graphic Design Intern",
    company: "Creative Studio",
    location: "Remote · Worldwide",
    category: "Graphic Design",
    duration: "2 Months",
    type: "Remote",
    stipend: "Unpaid",
    skills: ["Canva", "Photoshop", "Design"],
  },
];

export default function InternshipsPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All Categories");
  const [workType, setWorkType] = useState("All Types");

  const filteredInternships = internships.filter((item) => {
    const searchText =
      `${item.title} ${item.company} ${item.category} ${item.skills.join(" ")}`.toLowerCase();

    const matchesSearch = searchText.includes(search.toLowerCase());
    const matchesCategory =
      category === "All Categories" || item.category === category;
    const matchesType =
      workType === "All Types" || item.type === workType;

    return matchesSearch && matchesCategory && matchesType;
  });

  return (
    <main className="min-h-screen bg-white text-slate-900">
      <nav className="border-b border-slate-200">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <Link href="/" className="text-2xl font-bold text-blue-950">
            SkillBridge Global
          </Link>

          <div className="hidden items-center gap-6 text-sm font-medium md:flex">
            <Link href="/" className="hover:text-blue-700">Home</Link>
            <Link href="/jobs" className="hover:text-blue-700">Find Jobs</Link>
            <Link href="/talent" className="hover:text-blue-700">Find Talent</Link>
            <Link href="/freelance" className="hover:text-blue-700">Freelance</Link>
            <Link href="/internships" className="text-blue-700">Internships</Link>
            <Link href="/login" className="hover:text-blue-700">Login</Link>
            <Link href="/register" className="rounded-lg bg-blue-950 px-5 py-3 text-white hover:bg-blue-800">
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      <section className="bg-slate-950 px-6 py-20 text-center text-white">
        <div className="mx-auto max-w-4xl">
          <p className="font-semibold text-blue-300">GLOBAL INTERNSHIP OPPORTUNITIES</p>

          <h1 className="mt-4 text-4xl font-bold leading-tight md:text-6xl">
            Start Your Career With Global Experience.
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-300">
            Discover internships, gain practical experience, develop your
            skills and connect with companies around the world.
          </p>

          <div className="mx-auto mt-10 flex max-w-3xl flex-col gap-3 rounded-xl bg-white p-3 md:flex-row">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search internships, companies or skills..."
              className="min-w-0 flex-1 rounded-lg px-4 py-3 text-slate-900 outline-none"
            />

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="rounded-lg border border-slate-200 px-4 py-3 text-slate-700 outline-none"
            >
              <option>All Categories</option>
              {categories.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>

            <button
              onClick={() => document.getElementById("opportunities")?.scrollIntoView({ behavior: "smooth" })}
              className="rounded-lg bg-blue-700 px-7 py-3 font-semibold text-white hover:bg-blue-800"
            >
              Search
            </button>
          </div>
          <p role="note" className="mx-auto mt-4 max-w-3xl rounded-lg border border-amber-200/50 bg-amber-950/40 p-3 text-sm text-amber-100">
            Demo listings only: these internship cards are examples, not active openings.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-14">
        <p className="font-semibold text-blue-700">EXPLORE CAREER PATHS</p>
        <h2 className="mt-2 text-3xl font-bold">Popular Internship Categories</h2>
        <p className="mt-3 text-slate-600">
          Find opportunities that match your education and interests.
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 md:grid-cols-4">
          {categories.map((item) => (
            <button
              key={item}
              onClick={() => {
                setCategory(item);
                document.getElementById("opportunities")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="rounded-xl border border-slate-200 p-5 text-left font-semibold transition hover:border-blue-700 hover:bg-blue-50"
            >
              {item}
              <span className="mt-2 block text-sm font-normal text-slate-500">
                Explore internships →
              </span>
            </button>
          ))}
        </div>
      </section>

      <section id="opportunities" className="bg-slate-50 px-6 py-16">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8">
            <p className="font-semibold text-blue-700">CAREER OPPORTUNITIES</p>
            <h2 className="mt-2 text-3xl font-bold">Featured Internships</h2>
            <p className="mt-3 text-slate-600">
              Explore opportunities to learn, work and grow.
            </p>
          </div>

          <div className="mb-8 flex flex-col gap-3 sm:flex-row">
            <select
              value={workType}
              onChange={(e) => setWorkType(e.target.value)}
              className="rounded-lg border border-slate-300 bg-white px-4 py-3"
            >
              <option>All Types</option>
              <option>Remote</option>
              <option>Hybrid</option>
              <option>On-site</option>
            </select>

            <button
              onClick={() => {
                setSearch("");
                setCategory("All Categories");
                setWorkType("All Types");
              }}
              className="rounded-lg border border-slate-300 px-5 py-3 text-sm font-semibold hover:bg-white"
            >
              Clear Filters
            </button>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {filteredInternships.map((item) => (
              <article key={item.title} className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
                <div className="flex flex-wrap justify-between gap-3">
                  <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                    {item.category}
                  </span>
                  <span className="text-sm text-slate-500">{item.location}</span>
                </div>

                <h3 className="mt-5 text-xl font-bold">{item.title}</h3>
                <p className="mt-2 font-medium text-slate-600">{item.company}</p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {item.skills.map((skill) => (
                    <span key={skill} className="rounded-md bg-slate-100 px-3 py-1 text-xs text-slate-700">
                      {skill}
                    </span>
                  ))}
                </div>

                <div className="mt-6 grid grid-cols-3 gap-3 border-t border-slate-100 pt-5">
                  <div>
                    <p className="text-xs text-slate-500">Duration</p>
                    <p className="mt-1 text-sm font-semibold">{item.duration}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">Work Type</p>
                    <p className="mt-1 text-sm font-semibold">{item.type}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">Stipend</p>
                    <p className="mt-1 text-sm font-semibold">{item.stipend}</p>
                  </div>
                </div>

                <Link
                  href="/register"
                  className="mt-6 inline-block rounded-lg bg-blue-950 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-800"
                >
                  Apply Now →
                </Link>
              </article>
            ))}
          </div>

          {filteredInternships.length === 0 && (
            <div className="rounded-xl bg-white p-10 text-center">
              <h3 className="text-xl font-bold">No internships found</h3>
              <p className="mt-2 text-slate-500">
                Try another keyword or filter.
              </p>
            </div>
          )}
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto max-w-5xl rounded-2xl bg-blue-950 px-8 py-12 text-center text-white">
          <h2 className="text-3xl font-bold">Ready to Start Your Career?</h2>
          <p className="mx-auto mt-4 max-w-2xl leading-7 text-blue-100">
            Create your profile, showcase your skills and discover internship
            opportunities from companies across the globe.
          </p>
          <Link
            href="/register"
            className="mt-7 inline-block rounded-lg bg-white px-7 py-3 font-semibold text-blue-950 hover:bg-blue-50"
          >
            Create Your Profile
          </Link>
        </div>
      </section>

      <footer className="bg-slate-950 px-6 py-10 text-center text-slate-400">
        <p className="text-xl font-bold text-white">SkillBridge Global</p>
        <p className="mt-3 text-sm">
          Connecting Students with Global Opportunities.
        </p>
        <div className="mt-5 flex flex-wrap justify-center gap-6 text-sm">
          <Link href="/" className="hover:text-white">Home</Link>
          <Link href="/jobs" className="hover:text-white">Jobs</Link>
          <Link href="/freelance" className="hover:text-white">Freelance</Link>
          <Link href="/internships" className="hover:text-white">Internships</Link>
          <Link href="/register" className="hover:text-white">Register</Link>
        </div>
        <p className="mt-8 text-xs">© 2026 SkillBridge Global. All rights reserved.</p>
      </footer>
    </main>
  );
}