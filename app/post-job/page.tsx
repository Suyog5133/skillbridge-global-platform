"use client";

import { useState } from "react";

export default function PostJobPage() {
  const [submitted, setSubmitted] = useState(false);

  const [form, setForm] = useState({
    title: "",
    company: "",
    category: "",
    type: "Full Time",
    workplace: "Remote",
    experience: "Fresher",
    location: "",
    country: "",
    salaryMin: "",
    salaryMax: "",
    currency: "USD",
    deadline: "",
    openings: "1",
    description: "",
    responsibilities: "",
    requirements: "",
    benefits: "",
    skills: "",
    applicationEmail: "",
  });

  function updateField(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) {
    setForm((previous) => ({
      ...previous,
      [e.target.name]: e.target.value,
    }));
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (
      form.salaryMin &&
      form.salaryMax &&
      Number(form.salaryMin) > Number(form.salaryMax)
    ) {
      alert("Maximum salary must be greater than minimum salary.");
      return;
    }

    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const inputClass =
    "w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100";

  const labelClass =
    "mb-2 block text-sm font-semibold text-slate-700";

  return (
    <main className="min-h-screen bg-slate-50 p-5 sm:p-8">
      <div className="mx-auto max-w-5xl">

        {/* Header */}
        <div className="mb-8">
          <p className="text-sm font-bold tracking-wider text-blue-600">
            SKILLBRIDGE GLOBAL
          </p>

          <h1 className="mt-2 text-3xl font-bold text-slate-900">
            Post a Job
          </h1>

          <p className="mt-2 text-slate-500">
            Find talented professionals and hire globally.
          </p>
        </div>

        {/* Success Message */}
        {submitted && (
          <div className="mb-6 rounded-xl border border-green-200 bg-green-50 p-4">
            <h3 className="font-bold text-green-700">
              Job details submitted successfully!
            </h3>

            <p className="mt-1 text-sm text-green-600">
              This is a demo submission. Your job has not been published or
              saved to a database.
            </p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Basic Details */}
          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900">
              1. Basic Job Information
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Add the main details of the job opportunity.
            </p>

            <div className="mt-6 grid gap-5 sm:grid-cols-2">

              <div className="sm:col-span-2">
                <label className={labelClass}>Job Title *</label>

                <input
                  required
                  name="title"
                  value={form.title}
                  onChange={updateField}
                  placeholder="e.g. Software Developer"
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>Company Name *</label>

                <input
                  required
                  name="company"
                  value={form.company}
                  onChange={updateField}
                  placeholder="Enter company name"
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>Job Category *</label>

                <select
                  required
                  name="category"
                  value={form.category}
                  onChange={updateField}
                  className={inputClass}
                >
                  <option value="">Select category</option>
                  <option>Software Development</option>
                  <option>Cybersecurity</option>
                  <option>Data Science & AI</option>
                  <option>Design & Creative</option>
                  <option>Marketing</option>
                  <option>Finance</option>
                  <option>Sales</option>
                  <option>Human Resources</option>
                  <option>Education</option>
                  <option>Other</option>
                </select>
              </div>

              <div>
                <label className={labelClass}>Employment Type *</label>

                <select
                  name="type"
                  value={form.type}
                  onChange={updateField}
                  className={inputClass}
                >
                  <option>Full Time</option>
                  <option>Part Time</option>
                  <option>Contract</option>
                  <option>Internship</option>
                  <option>Freelance</option>
                  <option>Temporary</option>
                </select>
              </div>

              <div>
                <label className={labelClass}>Workplace Type *</label>

                <select
                  name="workplace"
                  value={form.workplace}
                  onChange={updateField}
                  className={inputClass}
                >
                  <option>Remote</option>
                  <option>On-site</option>
                  <option>Hybrid</option>
                </select>
              </div>

              <div>
                <label className={labelClass}>Experience Level *</label>

                <select
                  name="experience"
                  value={form.experience}
                  onChange={updateField}
                  className={inputClass}
                >
                  <option>Fresher</option>
                  <option>Entry Level</option>
                  <option>1–3 Years</option>
                  <option>3–5 Years</option>
                  <option>5–10 Years</option>
                  <option>10+ Years</option>
                </select>
              </div>
            </div>
          </section>

          {/* Location */}
          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900">
              2. Job Location
            </h2>

            <div className="mt-5 grid gap-5 sm:grid-cols-2">

              <div>
                <label className={labelClass}>City / Region</label>

                <input
                  name="location"
                  value={form.location}
                  onChange={updateField}
                  placeholder="e.g. London, New York, Mumbai"
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>Country *</label>

                <input
                  required
                  name="country"
                  value={form.country}
                  onChange={updateField}
                  placeholder="Enter country"
                  className={inputClass}
                />
              </div>
            </div>

            <p className="mt-3 text-xs text-slate-500">
              For remote jobs, mention whether candidates can apply from
              anywhere or only selected countries in the job description.
            </p>
          </section>

          {/* Salary */}
          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900">
              3. Salary & Openings
            </h2>

            <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

              <div>
                <label className={labelClass}>Minimum Salary</label>

                <input
                  type="number"
                  min="0"
                  name="salaryMin"
                  value={form.salaryMin}
                  onChange={updateField}
                  placeholder="Minimum"
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>Maximum Salary</label>

                <input
                  type="number"
                  min="0"
                  name="salaryMax"
                  value={form.salaryMax}
                  onChange={updateField}
                  placeholder="Maximum"
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>Currency</label>

                <select
                  name="currency"
                  value={form.currency}
                  onChange={updateField}
                  className={inputClass}
                >
                  <option>USD</option>
                  <option>INR</option>
                  <option>EUR</option>
                  <option>GBP</option>
                  <option>CAD</option>
                  <option>AUD</option>
                  <option>SGD</option>
                </select>
              </div>

              <div>
                <label className={labelClass}>Number of Openings</label>

                <input
                  type="number"
                  min="1"
                  name="openings"
                  value={form.openings}
                  onChange={updateField}
                  className={inputClass}
                />
              </div>
            </div>

            <div className="mt-5 max-w-sm">
              <label className={labelClass}>
                Application Deadline
              </label>

              <input
                type="date"
                name="deadline"
                value={form.deadline}
                onChange={updateField}
                className={inputClass}
              />
            </div>
          </section>

          {/* Description */}
          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900">
              4. Job Description
            </h2>

            <div className="mt-5 space-y-5">

              <div>
                <label className={labelClass}>About the Job *</label>

                <textarea
                  required
                  rows={5}
                  name="description"
                  value={form.description}
                  onChange={updateField}
                  placeholder="Explain the role and what the selected candidate will do..."
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>Responsibilities</label>

                <textarea
                  rows={4}
                  name="responsibilities"
                  value={form.responsibilities}
                  onChange={updateField}
                  placeholder="List the main job responsibilities..."
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>Requirements</label>

                <textarea
                  rows={4}
                  name="requirements"
                  value={form.requirements}
                  onChange={updateField}
                  placeholder="Education, experience and qualifications..."
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>Benefits</label>

                <textarea
                  rows={3}
                  name="benefits"
                  value={form.benefits}
                  onChange={updateField}
                  placeholder="Insurance, paid leave, remote work, training..."
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>Required Skills</label>

                <input
                  name="skills"
                  value={form.skills}
                  onChange={updateField}
                  placeholder="React, Python, Cybersecurity, Communication..."
                  className={inputClass}
                />
              </div>
            </div>
          </section>

          {/* Application Details */}
          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900">
              5. Application Details
            </h2>

            <div className="mt-5">
              <label className={labelClass}>
                Application Contact Email *
              </label>

              <input
                required
                type="email"
                name="applicationEmail"
                value={form.applicationEmail}
                onChange={updateField}
                placeholder="careers@company.com"
                className={inputClass}
              />
            </div>
          </section>

          {/* Submit */}
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">

            <a
              href="/dashboard/company"
              className="font-semibold text-slate-600 hover:text-blue-600"
            >
              ← Back to Company Dashboard
            </a>

            <button
              type="submit"
              className="rounded-xl bg-blue-600 px-8 py-3 font-semibold text-white transition hover:bg-blue-700"
            >
              Preview & Submit Job
            </button>
          </div>
        </form>

        <p className="mt-6 text-center text-xs text-slate-400">
          Job posting demo · Real publishing, moderation and database storage
          will be connected later.
        </p>
      </div>
    </main>
  );
}