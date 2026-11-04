"use client";

import Link from "next/link";
import { useState } from "react";

const categories = [
  "Web Development",
  "Mobile App Development",
  "Cyber Security",
  "Graphic Design",
  "UI/UX Design",
  "Content Writing",
  "Digital Marketing",
  "Data Science",
];

const projects = [
  {
    title: "Build a Modern Business Website",
    category: "Web Development",
    budget: "$300 - $600",
    type: "Fixed Price",
    level: "Intermediate",
    description:
      "Looking for a developer to create a modern, responsive business website.",
    skills: ["HTML", "CSS", "JavaScript", "React"],
  },
  {
    title: "Cyber Security Website Assessment",
    category: "Cyber Security",
    budget: "$200 - $450",
    type: "Fixed Price",
    level: "Expert",
    description:
      "Need a security professional to review website security and identify vulnerabilities.",
    skills: ["Cyber Security", "Security Testing", "Networking"],
  },
  {
    title: "Create Social Media Graphics",
    category: "Graphic Design",
    budget: "$100 - $250",
    type: "Fixed Price",
    level: "Beginner",
    description:
      "Looking for a creative designer to create social media posts for a growing brand.",
    skills: ["Canva", "Photoshop", "Graphic Design"],
  },
  {
    title: "Develop a Mobile Application",
    category: "Mobile App Development",
    budget: "$500 - $1,000",
    type: "Fixed Price",
    level: "Intermediate",
    description:
      "Looking for a mobile developer to build a simple and user-friendly application.",
    skills: ["React Native", "JavaScript", "API"],
  },
];

export default function FreelancePage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All Categories");

  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.title.toLowerCase().includes(search.toLowerCase()) ||
      project.description.toLowerCase().includes(search.toLowerCase()) ||
      project.skills.some((skill) =>
        skill.toLowerCase().includes(search.toLowerCase())
      );

    const matchesCategory =
      category === "All Categories" || project.category === category;

    return matchesSearch && matchesCategory;
  });

  return (
    <main className="min-h-screen bg-white text-slate-900">
      <nav className="border-b border-slate-200">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <Link href="/" className="text-2xl font-bold text-blue-900">
            SkillBridge Global
          </Link>

          <div className="hidden items-center gap-7 text-sm font-medium md:flex">
            <Link href="/" className="hover:text-blue-700">Home</Link>
            <Link href="/jobs" className="hover:text-blue-700">Find Jobs</Link>
            <Link href="/talent" className="hover:text-blue-700">Find Talent</Link>
            <Link href="/freelance" className="text-blue-700">Freelance</Link>
            <Link href="/login" className="hover:text-blue-700">Login</Link>
            <Link
              href="/register"
              className="rounded-lg bg-blue-900 px-5 py-3 text-white hover:bg-blue-800"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      <section className="bg-slate-950 px-6 py-20 text-center text-white">
        <div className="mx-auto max-w-4xl">
          <p className="mb-4 font-semibold text-blue-300">
            GLOBAL FREELANCE MARKETPLACE
          </p>

          <h1 className="text-4xl font-bold leading-tight md:text-6xl">
            Find Projects. Work Globally. Earn Without Limits.
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-300">
            Discover freelance opportunities from companies and clients around
            the world. Connect your skills with meaningful projects.
          </p>

          <div className="mx-auto mt-10 flex max-w-3xl flex-col gap-3 rounded-xl bg-white p-3 md:flex-row">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search projects or skills..."
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
              onClick={() =>
                document.getElementById("projects")?.scrollIntoView({
                  behavior: "smooth",
                })
              }
              className="rounded-lg bg-blue-700 px-7 py-3 font-semibold text-white hover:bg-blue-800"
            >
              Find Projects
            </button>
          </div>
          <p role="note" className="mx-auto mt-4 max-w-3xl rounded-lg border border-amber-200/50 bg-amber-950/40 p-3 text-sm text-amber-100">
            Demo listings only: these project cards are examples, not active client projects.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="mb-10">
          <p className="font-semibold text-blue-700">EXPLORE OPPORTUNITIES</p>
          <h2 className="mt-2 text-3xl font-bold">Popular Project Categories</h2>
          <p className="mt-3 text-slate-600">
            Explore projects that match your skills and interests.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
          {categories.map((item) => (
            <button
              key={item}
              onClick={() => {
                setCategory(item);
                document.getElementById("projects")?.scrollIntoView({
                  behavior: "smooth",
                });
              }}
              className="rounded-xl border border-slate-200 p-5 text-left font-semibold transition hover:border-blue-700 hover:bg-blue-50"
            >
              {item}
              <span className="mt-2 block text-sm font-normal text-slate-500">
                Explore projects →
              </span>
            </button>
          ))}
        </div>
      </section>

      <section id="projects" className="bg-slate-50 px-6 py-16">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="font-semibold text-blue-700">LATEST OPPORTUNITIES</p>
              <h2 className="mt-2 text-3xl font-bold">Featured Projects</h2>
              <p className="mt-3 text-slate-600">
                Discover projects that could be your next opportunity.
              </p>
            </div>

            <button
              onClick={() => {
                setSearch("");
                setCategory("All Categories");
              }}
              className="text-sm font-semibold text-blue-700 hover:underline"
            >
              Clear Filters
            </button>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {filteredProjects.map((project) => (
              <article
                key={project.title}
                className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm"
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                    {project.category}
                  </span>
                  <span className="text-sm text-slate-500">
                    {project.type}
                  </span>
                </div>

                <h3 className="mt-5 text-xl font-bold">{project.title}</h3>

                <p className="mt-3 leading-7 text-slate-600">
                  {project.description}
                </p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {project.skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-md bg-slate-100 px-3 py-1 text-xs text-slate-700"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-5">
                  <div>
                    <p className="text-xs text-slate-500">Project Budget</p>
                    <p className="mt-1 font-bold text-slate-900">
                      {project.budget}
                    </p>
                    <p className="mt-1 text-xs text-slate-500">
                      {project.level} Level
                    </p>
                  </div>

                  <Link
                    href="/register"
                    className="rounded-lg bg-blue-900 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-800"
                  >
                    Apply Now
                  </Link>
                </div>
              </article>
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div className="rounded-xl bg-white p-10 text-center">
              <h3 className="text-xl font-bold">No projects found</h3>
              <p className="mt-2 text-slate-500">
                Try another keyword or category.
              </p>
            </div>
          )}
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-2">
          <div className="rounded-2xl bg-blue-950 p-9 text-white">
            <h2 className="text-2xl font-bold">For Freelancers</h2>
            <p className="mt-4 leading-7 text-blue-100">
              Showcase your skills, discover global projects and connect with
              clients looking for your expertise.
            </p>
            <Link
              href="/register"
              className="mt-7 inline-block rounded-lg bg-white px-6 py-3 font-semibold text-blue-950 hover:bg-blue-50"
            >
              Join as Freelancer
            </Link>
          </div>

          <div className="rounded-2xl bg-slate-100 p-9">
            <h2 className="text-2xl font-bold">For Companies & Clients</h2>
            <p className="mt-4 leading-7 text-slate-600">
              Find skilled professionals, publish projects and connect with
              talented people from around the world.
            </p>
            <Link
              href="/register"
              className="mt-7 inline-block rounded-lg bg-blue-900 px-6 py-3 font-semibold text-white hover:bg-blue-800"
            >
              Hire Freelancers
            </Link>
          </div>
        </div>
      </section>

      <footer className="bg-slate-950 px-6 py-10 text-center text-slate-400">
        <p className="text-xl font-bold text-white">SkillBridge Global</p>
        <p className="mt-3 text-sm">
          Connecting Global Talent with Global Opportunities.
        </p>
        <div className="mt-5 flex flex-wrap justify-center gap-6 text-sm">
          <Link href="/" className="hover:text-white">Home</Link>
          <Link href="/jobs" className="hover:text-white">Find Jobs</Link>
          <Link href="/talent" className="hover:text-white">Find Talent</Link>
          <Link href="/register" className="hover:text-white">Register</Link>
          <Link href="/login" className="hover:text-white">Login</Link>
        </div>
        <p className="mt-8 text-xs">
          © 2026 SkillBridge Global. All rights reserved.
        </p>
      </footer>
    </main>
  );
}