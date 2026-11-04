"use client";

import { useState } from "react";

export default function CompanyRegisterPage() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <main className="min-h-screen bg-gray-50 px-6 py-14">
      <div className="mx-auto max-w-3xl">

        <div className="mb-8 text-center">
          <p className="font-semibold text-blue-600">
            SKILLBRIDGE GLOBAL
          </p>

          <h1 className="mt-3 text-3xl font-bold text-[#0B1F3A] md:text-4xl">
            Company Registration
          </h1>

          <p className="mt-3 text-gray-600">
            Register your company and connect with talented professionals worldwide.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm md:p-10"
        >

          {/* Company Information */}
          <section>
            <h2 className="mb-5 text-xl font-bold text-[#0B1F3A]">
              1. Company Information
            </h2>

            <div className="grid gap-5 md:grid-cols-2">
              <input
                required
                placeholder="Company Name"
                className="field"
              />

              <input
                required
                placeholder="Industry"
                className="field"
              />

              <input
                required
                type="email"
                placeholder="Official Company Email"
                className="field"
              />

              <input
                required
                type="tel"
                placeholder="Company Phone Number"
                className="field"
              />

              <input
                required
                placeholder="Country"
                className="field"
              />

              <input
                required
                placeholder="City"
                className="field"
              />

              <input
                type="url"
                placeholder="Company Website URL"
                className="field md:col-span-2"
              />
            </div>
          </section>

          {/* Recruiter Details */}
          <section>
            <h2 className="mb-5 text-xl font-bold text-[#0B1F3A]">
              2. Recruiter Information
            </h2>

            <div className="grid gap-5 md:grid-cols-2">
              <input
                required
                placeholder="Recruiter's Full Name"
                className="field"
              />

              <input
                required
                placeholder="Job Title / Designation"
                className="field"
              />

              <input
                required
                type="email"
                placeholder="Recruiter's Email"
                className="field"
              />

              <input
                type="tel"
                placeholder="Recruiter's Phone Number"
                className="field"
              />
            </div>
          </section>

          {/* Company Profile */}
          <section>
            <h2 className="mb-5 text-xl font-bold text-[#0B1F3A]">
              3. Company Profile
            </h2>

            <div className="space-y-5">
              <select required defaultValue="" className="field w-full">
                <option value="" disabled>
                  Company Size
                </option>
                <option>1–10 Employees</option>
                <option>11–50 Employees</option>
                <option>51–200 Employees</option>
                <option>201–500 Employees</option>
                <option>501–1000 Employees</option>
                <option>1000+ Employees</option>
              </select>

              <select required defaultValue="" className="field w-full">
                <option value="" disabled>
                  Company Type
                </option>
                <option>Startup</option>
                <option>Small Business</option>
                <option>Medium Enterprise</option>
                <option>Large Enterprise</option>
                <option>Agency</option>
                <option>Non-Profit Organization</option>
                <option>Other</option>
              </select>

              <textarea
                required
                placeholder="Describe your company, products, services and work culture"
                rows={5}
                className="field w-full"
              />
            </div>
          </section>

          {/* Hiring Requirements */}
          <section>
            <h2 className="mb-5 text-xl font-bold text-[#0B1F3A]">
              4. Hiring Requirements
            </h2>

            <div className="space-y-5">
              <select required defaultValue="" className="field w-full">
                <option value="" disabled>
                  What are you looking for?
                </option>
                <option>Experienced Professionals</option>
                <option>Freshers</option>
                <option>Students</option>
                <option>Freelancers</option>
                <option>Interns</option>
                <option>All Types of Talent</option>
              </select>

              <select required defaultValue="" className="field w-full">
                <option value="" disabled>
                  Preferred Hiring Type
                </option>
                <option>Full-Time</option>
                <option>Part-Time</option>
                <option>Internship</option>
                <option>Contract</option>
                <option>Freelance Projects</option>
                <option>Multiple Types</option>
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
                placeholder="Describe the skills and talent you are looking for"
                rows={4}
                className="field w-full"
              />
            </div>
          </section>

          {/* Verification */}
          <section>
            <h2 className="mb-5 text-xl font-bold text-[#0B1F3A]">
              5. Company Verification
            </h2>

            <div className="space-y-4">
              <input
                placeholder="Business Registration Number (Optional)"
                className="field w-full"
              />

              <label className="block text-sm font-medium text-gray-700">
                Company Logo (Optional)
                <input
                  type="file"
                  accept=".jpg,.jpeg,.png,.webp"
                  className="mt-2 block w-full rounded-lg border border-gray-300 p-3"
                />
              </label>

              <label className="block text-sm font-medium text-gray-700">
                Company Registration Document (Optional)
                <input
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  className="mt-2 block w-full rounded-lg border border-gray-300 p-3"
                />
              </label>

              <p className="text-sm text-gray-500">
                Verification documents will need to be securely uploaded
                and reviewed after backend verification is implemented.
              </p>
            </div>
          </section>

          {/* Agreement */}
          <label className="flex items-start gap-3 text-sm text-gray-600">
            <input
              type="checkbox"
              required
              className="mt-1"
            />

            <span>
              I confirm that the information provided is accurate and
              agree to the{" "}
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
            Create Company Profile
          </button>

          {submitted && (
            <p className="rounded-lg bg-yellow-50 p-4 text-center text-sm text-yellow-800">
              Demo only: Your company information has not been saved.
              Backend registration and company verification will be
              connected later.
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
