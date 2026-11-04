"use client";

import Link from "next/link";
import { useState } from "react";

const talentCategories = [
  {
    title: "Software Developers",
    description: "Frontend, Backend, Full Stack and Mobile Developers.",
    icon: "💻",
  },
  {
    title: "Cyber Security Experts",
    description: "Security Analysts, Ethical Hackers and Security Engineers.",
    icon: "🔐",
  },
  {
    title: "Data Professionals",
    description: "Data Analysts, Data Scientists and AI Specialists.",
    icon: "📊",
  },
  {
    title: "UI/UX Designers",
    description: "Creative designers for websites and digital products.",
    icon: "🎨",
  },
  {
    title: "Digital Marketers",
    description: "SEO, Social Media and Marketing Professionals.",
    icon: "📢",
  },
  {
    title: "Business Professionals",
    description: "Project Managers, Consultants and Business Analysts.",
    icon: "📈",
  },
];

export default function TalentPage() {
  const [searchInput, setSearchInput] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const filteredCategories = talentCategories.filter((category) =>
    `${category.title} ${category.description}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-slate-50">

      {/* Navigation */}
      <nav className="bg-white border-b border-slate-200 px-6 py-5">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

          <Link href="/" className="text-2xl font-bold text-blue-900">
            SkillBridge Global
          </Link>

          <div className="flex flex-wrap gap-3 text-sm font-medium text-slate-700 sm:gap-5">
            <Link href="/">Home</Link>
            <Link href="/jobs">Find Jobs</Link>
            <Link href="/register">Register</Link>
            <Link href="/login">Login</Link>
          </div>

        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-blue-950 text-white px-6 py-20 text-center">

        <p className="text-blue-300 font-semibold mb-4">
          GLOBAL TALENT NETWORK
        </p>

        <h1 className="text-4xl md:text-5xl font-bold">
          Find the Right Talent Worldwide
        </h1>

        <p className="max-w-2xl mx-auto mt-5 text-blue-100 text-lg">
          Connect with skilled professionals, discover exceptional talent
          and build your dream team with SkillBridge Global.
        </p>

        <form
          onSubmit={(event) => {
            event.preventDefault();
            setSearchTerm(searchInput.trim());
          }}
          className="mx-auto mt-10 flex max-w-3xl flex-col gap-3 rounded-xl bg-white p-3 sm:flex-row"
          role="search"
        >
          <label htmlFor="talent-category-search" className="sr-only">
            Search talent categories and skills
          </label>
          <input
            id="talent-category-search"
            type="search"
            value={searchInput}
            onChange={(event) => setSearchInput(event.target.value)}
            placeholder="Search talent categories or skills"
            className="min-w-0 flex-1 rounded-lg p-3 text-slate-900 outline-none"
          />
          <button
            type="submit"
            className="rounded-lg bg-blue-700 px-8 py-3 font-semibold text-white transition hover:bg-blue-800"
          >
            Search Categories
          </button>
        </form>
        <p className="mx-auto mt-3 max-w-3xl text-sm text-blue-100">
          Browse category previews only. Candidate profiles and location search are not connected.
        </p>
      </section>

      {/* Talent Categories */}
      <section className="max-w-7xl mx-auto px-6 py-16">

        <h2 className="text-3xl font-bold text-slate-900">
          Explore Talent by Category
        </h2>

        <p className="text-slate-600 mt-3">
          Discover professionals across different industries and skills.
        </p>
        {searchTerm && (
          <p className="mt-3 text-sm text-slate-600" role="status" aria-live="polite">
            {filteredCategories.length} categories matching &ldquo;{searchTerm}&rdquo;.
            {" "}
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">

          {filteredCategories.map((category) => (
            <div
              key={category.title}
              className="bg-white border border-slate-200 rounded-2xl p-7 hover:shadow-lg hover:border-blue-500 transition"
            >

              <div className="text-4xl mb-5">
                {category.icon}
              </div>

              <h3 className="text-xl font-bold text-slate-900">
                {category.title}
              </h3>

              <p className="text-slate-600 mt-3">
                {category.description}
              </p>

            </div>
          ))}

          {filteredCategories.length === 0 && (
            <p className="col-span-full rounded-xl border border-slate-200 bg-white p-8 text-center text-slate-600">
              No talent categories match your search. Try another skill or category.
            </p>
          )}

        </div>
      </section>

      {/* Company CTA */}
      <section className="bg-white border-y border-slate-200 px-6 py-16">

        <div className="max-w-5xl mx-auto text-center">

          <h2 className="text-3xl font-bold text-slate-900">
            Build Your Dream Team
          </h2>

          <p className="text-slate-600 mt-4">
            Create your company profile and start connecting with
            professionals from around the world.
          </p>

          <Link
            href="/register"
            className="inline-block mt-7 bg-blue-900 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-800 transition"
          >
            Register Your Company
          </Link>

        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 text-slate-300 text-center p-6">
        © 2026 SkillBridge Global. All rights reserved.
      </footer>

    </main>
  );
}