"use client";

import { useState } from "react";

export default function CompanyProfilePage() {
  const [saved, setSaved] = useState(false);
  const [logoName, setLogoName] = useState("");
  const [coverName, setCoverName] = useState("");

  const [form, setForm] = useState({
    companyName: "",
    website: "",
    industry: "",
    location: "",
    companySize: "",
    founded: "",
    email: "",
    phone: "",
    about: "",
    mission: "",
    hiringNeeds: "",
    linkedin: "",
  });

  function updateField(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSaved(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <main className="min-h-screen bg-slate-50 p-5 sm:p-8">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8">
          <p className="text-sm font-bold tracking-wider text-blue-600">
            SKILLBRIDGE GLOBAL
          </p>
          <h1 className="mt-2 text-3xl font-bold text-slate-900">
            Company Profile
          </h1>
          <p className="mt-2 text-slate-500">
            Build your company presence and connect with global talent.
          </p>
        </div>

        {saved && (
          <div className="mb-6 rounded-xl border border-green-200 bg-green-50 p-4 text-sm font-semibold text-green-700">
            Company profile submitted successfully! (Demo only – not stored permanently.)
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Company Branding */}
          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900">
              Company Branding
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Add your company logo and cover image.
            </p>

            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Company Logo
                </label>
                <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-300 p-7 text-center hover:border-blue-500">
                  <span className="text-3xl">🏢</span>
                  <span className="mt-2 text-sm font-semibold text-blue-600">
                    Upload Logo
                  </span>
                  <span className="mt-1 text-xs text-slate-400">
                    PNG, JPG or SVG
                  </span>
                  <input
                    type="file"
                    accept="image/png,image/jpeg,image/svg+xml"
                    className="hidden"
                    onChange={(e) =>
                      setLogoName(e.target.files?.[0]?.name || "")
                    }
                  />
                  {logoName && (
                    <span className="mt-2 text-xs text-green-600">
                      {logoName}
                    </span>
                  )}
                </label>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Company Cover Image
                </label>
                <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-300 p-7 text-center hover:border-blue-500">
                  <span className="text-3xl">🖼️</span>
                  <span className="mt-2 text-sm font-semibold text-blue-600">
                    Upload Cover
                  </span>
                  <span className="mt-1 text-xs text-slate-400">
                    JPG or PNG
                  </span>
                  <input
                    type="file"
                    accept="image/png,image/jpeg"
                    className="hidden"
                    onChange={(e) =>
                      setCoverName(e.target.files?.[0]?.name || "")
                    }
                  />
                  {coverName && (
                    <span className="mt-2 text-xs text-green-600">
                      {coverName}
                    </span>
                  )}
                </label>
              </div>
            </div>
          </section>

          {/* Basic Information */}
          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900">
              Basic Information
            </h2>

            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              {[
                { label: "Company Name", name: "companyName", placeholder: "Enter company name" },
                { label: "Website", name: "website", placeholder: "https://example.com" },
                { label: "Location / Country", name: "location", placeholder: "City, Country" },
                { label: "Founded Year", name: "founded", placeholder: "e.g. 2020" },
                { label: "Contact Email", name: "email", placeholder: "company@example.com" },
                { label: "Contact Phone", name: "phone", placeholder: "Enter phone number" },
                { label: "LinkedIn URL", name: "linkedin", placeholder: "LinkedIn company page" },
              ].map((field) => (
                <div key={field.name}>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    {field.label}
                  </label>
                  <input
                    name={field.name}
                    value={form[field.name as keyof typeof form]}
                    onChange={updateField}
                    placeholder={field.placeholder}
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
                  />
                </div>
              ))}

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Industry
                </label>
                <select
                  name="industry"
                  value={form.industry}
                  onChange={updateField}
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-blue-500"
                >
                  <option value="">Select industry</option>
                  <option>Information Technology</option>
                  <option>Cybersecurity</option>
                  <option>Finance</option>
                  <option>Healthcare</option>
                  <option>Education</option>
                  <option>Manufacturing</option>
                  <option>Marketing</option>
                  <option>Other</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Company Size
                </label>
                <select
                  name="companySize"
                  value={form.companySize}
                  onChange={updateField}
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-blue-500"
                >
                  <option value="">Select company size</option>
                  <option>1–10 employees</option>
                  <option>11–50 employees</option>
                  <option>51–200 employees</option>
                  <option>201–500 employees</option>
                  <option>501–1000 employees</option>
                  <option>1000+ employees</option>
                </select>
              </div>
            </div>
          </section>

          {/* About Company */}
          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900">
              About Your Company
            </h2>

            <div className="mt-5 space-y-5">
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Company Description
                </label>
                <textarea
                  name="about"
                  value={form.about}
                  onChange={updateField}
                  rows={5}
                  placeholder="Tell candidates about your company, products and services..."
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Mission & Vision
                </label>
                <textarea
                  name="mission"
                  value={form.mission}
                  onChange={updateField}
                  rows={3}
                  placeholder="Describe your company's mission and vision..."
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
                />
              </div>
            </div>
          </section>

          {/* Hiring Information */}
          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900">
              Hiring Information
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Tell candidates what kind of talent your company needs.
            </p>

            <div className="mt-5">
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Current Hiring Requirements
              </label>
              <textarea
                name="hiringNeeds"
                value={form.hiringNeeds}
                onChange={updateField}
                rows={4}
                placeholder="Example: Software Developers, Cybersecurity Analysts, Designers..."
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
              />
            </div>
          </section>

          {/* Actions */}
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <a
              href="/dashboard/company"
              className="text-sm font-semibold text-slate-600 hover:text-blue-600"
            >
              ← Back to Company Dashboard
            </a>

            <button
              type="submit"
              className="rounded-xl bg-blue-600 px-8 py-3 font-semibold text-white transition hover:bg-blue-700"
            >
              Save Company Profile
            </button>
          </div>
        </form>

        <p className="mt-6 text-center text-xs text-slate-400">
          Company profile demo · Real profile storage and verification will be connected to the backend.
        </p>
      </div>
    </main>
  );
}