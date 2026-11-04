"use client";

import Link from "next/link";
import { useState } from "react";

const jobCategories = [
  "Technology",
  "Cyber Security",
  "Software Development",
  "Data Science",
  "Marketing",
  "Design",
  "Finance",
  "Engineering",
];

export default function JobsPage() {
  const [jobTitle, setJobTitle] = useState("");
  const [location, setLocation] = useState("");
  const [searchMessage, setSearchMessage] = useState("");

  function handleSearch(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSearchMessage(
      jobTitle.trim() || location.trim()
        ? "Live job search is not connected yet. No listings were queried."
        : "Enter a job title or location to search."
    );
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <nav className="bg-white border-b border-slate-200 px-6 py-5">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-blue-900">
            SkillBridge Global
          </Link>
          <div className="flex gap-6 text-sm font-medium text-slate-700">
            <Link href="/">Home</Link>
            <Link href="/register">Register</Link>
            <Link href="/login">Login</Link>
          </div>
        </div>
      </nav>

      <section className="bg-blue-950 text-white px-6 py-20 text-center">
        <h1 className="text-4xl md:text-5xl font-bold">
          Find Your Next Opportunity
        </h1>
        <p className="mt-5 text-blue-100 text-lg">
          Discover jobs and build your career with opportunities around the world.
        </p>

        <form
          onSubmit={handleSearch}
          className="max-w-3xl mx-auto mt-10 bg-white rounded-xl p-3 flex flex-col md:flex-row gap-3"
        >
          <input
            type="text"
            aria-label="Job title or keyword"
            value={jobTitle}
            onChange={(event) => setJobTitle(event.target.value)}
            placeholder="Job title or keyword"
            className="flex-1 p-3 text-slate-900 outline-none"
          />
          <input
            type="text"
            aria-label="Country or location"
            value={location}
            onChange={(event) => setLocation(event.target.value)}
            placeholder="Country or location"
            className="flex-1 p-3 text-slate-900 outline-none"
          />
          <button type="submit" className="bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold">
            Search Jobs
          </button>
        </form>
        {searchMessage && (
          <p role="status" aria-live="polite" className="mx-auto mt-4 max-w-3xl text-sm text-blue-100">
            {searchMessage}
          </p>
        )}
      </section>

      <section className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-slate-900">
          Explore Job Categories
        </h2>
        <p className="text-slate-600 mt-3">
          Explore opportunities across different industries.
        </p>
        <p className="mt-4 rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm text-amber-900">
          Job search is a preview only. Live job listings are not connected yet.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mt-8">
          {jobCategories.map((category) => (
            <div
              key={category}
              className="bg-white border border-slate-200 p-6 rounded-xl hover:border-blue-600 transition"
            >
              <h3 className="font-semibold text-slate-800">{category}</h3>
              <p className="text-sm text-slate-500 mt-2">
                Explore opportunities →
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 pb-16">
        <div className="bg-white border border-slate-200 rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold text-slate-900">
            Looking for your next career opportunity?
          </h2>
          <p className="text-slate-600 mt-3">
            Create your profile and get ready to connect with global employers.
          </p>
          <Link
            href="/register"
            className="inline-block mt-6 bg-blue-900 text-white px-7 py-3 rounded-lg font-semibold hover:bg-blue-800"
          >
            Get Started
          </Link>
        </div>
      </section>

      <footer className="bg-slate-950 text-slate-300 text-center p-6">
        © 2026 SkillBridge Global. All rights reserved.
      </footer>
    </main>
  );
}