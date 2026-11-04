
"use client";

import { useState } from "react";

export default function StudentRegisterPage() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <main className="min-h-screen bg-gray-50 px-6 py-14">
      <div className="mx-auto max-w-3xl">
        <div className="mb-8 text-center">
          <p className="font-semibold text-blue-600">SKILLBRIDGE GLOBAL</p>

          <h1 className="mt-3 text-3xl font-bold text-[#0B1F3A] md:text-4xl">
            Student Registration
          </h1>

          <p className="mt-3 text-gray-600">
            Build your student profile and discover global opportunities.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm md:p-10"
        >
          <section>
            <h2 className="mb-5 text-xl font-bold text-[#0B1F3A]">
              1. Personal Information
            </h2>

            <div className="grid gap-5 md:grid-cols-2">
              <input required placeholder="First Name" className="field" />
              <input required placeholder="Last Name" className="field" />

              <input
                required
                type="email"
                placeholder="Email Address"
                className="field"
              />

              <input
                required
                type="tel"
                placeholder="Phone Number"
                className="field"
              />

              <input required placeholder="Country" className="field" />
              <input placeholder="City" className="field" />
            </div>
          </section>

          <section>
            <h2 className="mb-5 text-xl font-bold text-[#0B1F3A]">
              2. Education Details
            </h2>

            <div className="grid gap-5 md:grid-cols-2">
              <input
                required
                placeholder="College / University Name"
                className="field"
              />

              <input
                required
                placeholder="Degree / Course"
                className="field"
              />

              <input
                required
                placeholder="Branch / Specialization"
                className="field"
              />

              <select required defaultValue="" className="field">
                <option value="" disabled>
                  Current Study Year
                </option>
                <option>First Year</option>
                <option>Second Year</option>
                <option>Third Year</option>
                <option>Final Year</option>
                <option>Postgraduate</option>
                <option>Other</option>
              </select>

              <input
                type="number"
                placeholder="Expected Graduation Year"
                min="2026"
                max="2040"
                className="field"
              />

              <input
                placeholder="CGPA / Percentage (Optional)"
                className="field"
              />
            </div>
          </section>

          <section>
            <h2 className="mb-5 text-xl font-bold text-[#0B1F3A]">
              3. Skills & Interests
            </h2>

            <div className="space-y-5">
              <input
                required
                placeholder="Your Skills (e.g. Java, Python, Cyber Security)"
                className="field w-full"
              />

              <select required defaultValue="" className="field w-full">
                <option value="" disabled>
                  Preferred Opportunity
                </option>
                <option>Internship</option>
                <option>Part-Time Job</option>
                <option>Full-Time Job</option>
                <option>Freelance Projects</option>
                <option>All Opportunities</option>
              </select>

              <select defaultValue="" className="field w-full">
                <option value="" disabled>
                  Preferred Work Mode
                </option>
                <option>Remote</option>
                <option>On-Site</option>
                <option>Hybrid</option>
                <option>Any</option>
              </select>

              <textarea
                placeholder="Tell us about your interests and career goals"
                rows={4}
                className="field w-full"
              />
            </div>
          </section>

          <section>
            <h2 className="mb-5 text-xl font-bold text-[#0B1F3A]">
              4. Resume & Portfolio
            </h2>

            <div className="space-y-5">
              <label className="block text-sm font-medium text-gray-700">
                Upload Resume (PDF)
                <input
                  type="file"
                  accept=".pdf"
                  className="mt-2 block w-full rounded-lg border border-gray-300 p-3"
                />
              </label>

              <input
                placeholder="LinkedIn Profile URL (Optional)"
                className="field w-full"
              />

              <input
                placeholder="GitHub / Portfolio URL (Optional)"
                className="field w-full"
              />
            </div>
          </section>

          <label className="flex items-start gap-3 text-sm text-gray-600">
            <input type="checkbox" required className="mt-1" />
            <span>
              I confirm that the information provided is accurate and agree
              to the{" "}
              <a href="/terms" className="text-blue-600 underline">
                Terms & Conditions
              </a>{" "}
              and{" "}
              <a href="/privacy" className="text-blue-600 underline">
                Privacy Policy
              </a>.
            </span>
          </label>

          <button
            type="submit"
            className="w-full rounded-lg bg-blue-600 py-4 font-bold text-white transition hover:bg-blue-700"
          >
            Create Student Profile
          </button>

          {submitted && (
            <p className="rounded-lg bg-yellow-50 p-4 text-center text-sm text-yellow-800">
              Demo only: Your information has not been saved. Account
              registration and secure database storage will be connected later.
            </p>
          )}

          <p className="text-center text-sm text-gray-500">
            Already have an account?{" "}
            <a
              href="/login"
              className="font-semibold text-blue-600 hover:underline"
            >
              Login
            </a>
          </p>
        </form>
      </div>

      <style jsx>{`
        .field {
          width: 100%;
          border: 1px solid #d1d5db;
          border-radius: 8px;
          padding: 12px 14px;
          outline: none;
          background: white;
        }

        .field:focus {
          border-color: #2563eb;
          box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.12);
        }
      `}</style>
    </main>
  );
}
