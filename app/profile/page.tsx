"use client";

import { useState } from "react";
import Link from "next/link";

export default function ProfilePage() {
  const [saved, setSaved] = useState(false);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaved(true);
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <nav className="flex items-center justify-between border-b bg-white px-6 py-4">
        <Link href="/" className="text-xl font-bold text-blue-950">
          SkillBridge Global
        </Link>
        <Link href="/dashboard" className="text-sm font-semibold text-blue-700">
          Back to Dashboard
        </Link>
      </nav>

      <div className="mx-auto max-w-5xl px-5 py-10">
        <div className="mb-8">
          <p className="font-semibold text-blue-700">MY ACCOUNT</p>
          <h1 className="mt-2 text-3xl font-bold text-slate-900">
            My Professional Profile
          </h1>
          <p className="mt-2 text-slate-600">
            Create your profile and showcase your skills to the world.
          </p>
        </div>

        {saved && (
          <div className="mb-6 rounded-lg border border-green-200 bg-green-50 p-4 text-green-800">
            Profile form submitted successfully! This is a demo confirmation.
            Your information has not been saved to a database.
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-7">
          <section className="rounded-2xl border bg-white p-6 shadow-sm">
            <h2 className="mb-6 text-xl font-bold text-slate-900">
              Personal Information
            </h2>

            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium">Full Name *</label>
                <input required type="text" placeholder="Enter your full name" className="w-full rounded-lg border p-3 outline-none focus:border-blue-600" />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">Professional Title *</label>
                <input required type="text" placeholder="e.g. Software Developer" className="w-full rounded-lg border p-3 outline-none focus:border-blue-600" />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">Email Address *</label>
                <input required type="email" placeholder="Enter your email" className="w-full rounded-lg border p-3 outline-none focus:border-blue-600" />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">Phone Number</label>
                <input type="tel" placeholder="Enter phone number with country code" className="w-full rounded-lg border p-3 outline-none focus:border-blue-600" />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">Country *</label>
                <input required type="text" placeholder="Enter your country" className="w-full rounded-lg border p-3 outline-none focus:border-blue-600" />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">City</label>
                <input type="text" placeholder="Enter your city" className="w-full rounded-lg border p-3 outline-none focus:border-blue-600" />
              </div>
            </div>
          </section>

          <section className="rounded-2xl border bg-white p-6 shadow-sm">
            <h2 className="mb-6 text-xl font-bold text-slate-900">
              Professional Details
            </h2>

            <div className="space-y-5">
              <div>
                <label className="mb-2 block text-sm font-medium">About Me *</label>
                <textarea required rows={5} placeholder="Write about your education, experience, interests and career goals..." className="w-full rounded-lg border p-3 outline-none focus:border-blue-600" />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">Skills *</label>
                <input required type="text" placeholder="e.g. Java, Python, Cyber Security, React" className="w-full rounded-lg border p-3 outline-none focus:border-blue-600" />
                <p className="mt-2 text-xs text-slate-500">
                  Separate multiple skills using commas.
                </p>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium">Experience Level</label>
                  <select className="w-full rounded-lg border bg-white p-3">
                    <option value="">Select experience</option>
                    <option>Student</option>
                    <option>Fresher</option>
                    <option>0–2 Years</option>
                    <option>2–5 Years</option>
                    <option>5–10 Years</option>
                    <option>10+ Years</option>
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium">Employment Preference</label>
                  <select className="w-full rounded-lg border bg-white p-3">
                    <option>Full-time</option>
                    <option>Part-time</option>
                    <option>Remote</option>
                    <option>Freelance</option>
                    <option>Internship</option>
                    <option>Open to Opportunities</option>
                  </select>
                </div>
              </div>
            </div>
          </section>

          <section className="rounded-2xl border bg-white p-6 shadow-sm">
            <h2 className="mb-6 text-xl font-bold text-slate-900">
              Education & Portfolio
            </h2>

            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium">Highest Education</label>
                <input type="text" placeholder="e.g. Bachelor's Degree" className="w-full rounded-lg border p-3" />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">University / Institution</label>
                <input type="text" placeholder="Enter institution name" className="w-full rounded-lg border p-3" />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">LinkedIn Profile</label>
                <input type="url" placeholder="https://linkedin.com/in/..." className="w-full rounded-lg border p-3" />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">Portfolio / Website</label>
                <input type="url" placeholder="https://yourportfolio.com" className="w-full rounded-lg border p-3" />
              </div>

              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-medium">Upload Resume (PDF)</label>
                <input type="file" accept=".pdf" className="w-full rounded-lg border p-3" />
              </div>
            </div>
          </section>

          <div className="flex flex-wrap gap-4">
            <button type="submit" className="rounded-lg bg-blue-900 px-8 py-3 font-semibold text-white hover:bg-blue-800">
              Save Profile
            </button>
            <Link href="/dashboard" className="rounded-lg border bg-white px-8 py-3 font-semibold text-slate-700 hover:bg-slate-100">
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </main>
  );
}