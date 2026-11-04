"use client";

import Link from "next/link";
import { useState } from "react";

const categories = [
  { icon: "💻", title: "Software Developers", description: "Frontend, Backend, Full Stack and Mobile Developers." },
  { icon: "🔐", title: "Cyber Security Experts", description: "Security Analysts, Ethical Hackers and Security Engineers." },
  { icon: "📊", title: "Data Professionals", description: "Data Analysts, Data Scientists and AI Specialists." },
  { icon: "🎨", title: "UI/UX Designers", description: "Creative designers for websites and digital products." },
  { icon: "📢", title: "Digital Marketers", description: "SEO, Social Media and Marketing Professionals." },
  { icon: "📈", title: "Business Professionals", description: "Project Managers, Consultants and Business Analysts." },
];

export default function TalentPage() {
  const [searchInput, setSearchInput] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const filteredCategories = categories.filter((category) =>
    `${category.title} ${category.description}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-slate-50">
      <nav className="flex flex-wrap items-center justify-between gap-4 border-b bg-white px-6 py-5">
        <Link href="/" className="text-2xl font-bold text-blue-950">
          SkillBridge Global
        </Link>
        <div className="flex flex-wrap gap-5 text-sm font-medium text-slate-700">
          <Link href="/">Home</Link>
          <Link href="/jobs">Find Jobs</Link>
          <Link href="/freelance">Freelance</Link>
          <Link href="/companies">Companies</Link>
          <Link href="/login">Login</Link>
        </div>
      </nav>

      <section className="bg-blue-950 px-6 py-20 text-center text-white">
        <p className="mb-4 font-semibold tracking-widest text-blue-300">
          GLOBAL TALENT NETWORK
        </p>
        <h1 className="text-4xl font-bold md:text-5xl">
          Find the Right Talent Worldwide
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-lg text-blue-100">
          Discover skilled professionals, connect with exceptional people
          and build your team across borders.
        </p>

        <form
          onSubmit={(event) => {
            event.preventDefault();
            setSearchTerm(searchInput.trim());
          }}
          role="search"
          className="mx-auto mt-10 flex max-w-4xl flex-col gap-3 rounded-xl bg-white p-3 md:flex-row"
        >
          <input
            aria-label="Search talent categories and skills"
            type="search"
            value={searchInput}
            onChange={(event) => setSearchInput(event.target.value)}
            placeholder="Search talent categories or skills"
            className="min-w-0 flex-1 rounded-lg border p-3 text-slate-900 outline-none"
          />
          <button
            type="submit"
            className="rounded-lg bg-blue-700 px-8 py-3 font-semibold text-white hover:bg-blue-800"
          >
            Search Categories
          </button>
        </form>
        <p className="mt-4 text-sm text-blue-200">
          Browse category previews only. Candidate profiles and location search are not connected.
        </p>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16">
        <h2 className="text-3xl font-bold text-slate-900">
          Explore Talent by Category
        </h2>
        <p className="mt-3 text-slate-600">
          Discover professionals across different industries and skills.
        </p>
        {searchTerm && (
          <p className="mt-3 text-sm text-slate-600" role="status" aria-live="polite">
            {filteredCategories.length}{" "}
            {filteredCategories.length === 1 ? "category" : "categories"} matching
            {" "}&ldquo;{searchTerm}&rdquo;.{" "}
            <button
              type="button"
              onClick={() => {
                setSearchInput("");
                setSearchTerm("");
              }}
              className="font-semibold text-blue-700 underline"
            >
              Clear search
            </button>
          </p>
        )}

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredCategories.map((category) => (
            <div key={category.title} className="rounded-2xl border bg-white p-7 transition hover:border-blue-500 hover:shadow-lg">
              <div className="mb-5 text-4xl">{category.icon}</div>
              <h3 className="text-xl font-bold text-slate-900">
                {category.title}
              </h3>
              <p className="mt-3 text-slate-600">{category.description}</p>
            </div>
          ))}
          {filteredCategories.length === 0 && (
            <p className="col-span-full rounded-xl border border-slate-200 bg-white p-8 text-center text-slate-600">
              No talent categories match your search. Try another skill or category.
            </p>
          )}
        </div>
      </section>

      <section className="border-y bg-white px-6 py-16 text-center">
        <h2 className="text-3xl font-bold text-slate-900">
          Ready to Hire Global Talent?
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-slate-600">
          Create your company profile and prepare to connect with professionals
          from around the world.
        </p>
        <Link href="/register/company" className="mt-7 inline-block rounded-lg bg-blue-900 px-8 py-3 font-semibold text-white hover:bg-blue-800">
          Register Your Company
        </Link>
      </section>

      <footer className="bg-slate-950 p-6 text-center text-slate-300">
        © 2026 SkillBridge Global. All rights reserved.
      </footer>
    </main>
  );
}