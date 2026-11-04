
"use client";

import { useState } from "react";

export default function FreelancerRegisterPage() {
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
            Freelancer Registration
          </h1>

          <p className="mt-3 text-gray-600">
            Showcase your skills and connect with clients worldwide.
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
              2. Professional Profile
            </h2>

            <div className="space-y-5">
              <input
                required
                placeholder="Professional Title (e.g. Web Developer)"
                className="field w-full"
              />

              <select required defaultValue="" className="field w-full">
                <option value="" disabled>
                  Experience Level
                </option>
                <option>Beginner</option>
                <option>Less than 1 year</option>
                <option>1–3 years</option>
                <option>3–5 years</option>
                <option>5+ years</option>
              </select>

              <input
                required
                placeholder="Your Skills (e.g. Design, Programming, Marketing)"
                className="field w-full"
              />

              <textarea
                required
                placeholder="Describe your experience and professional skills"
                rows={4}
                className="field w-full"
              />
            </div>
          </section>

          <section>
            <h2 className="mb-5 text-xl font-bold text-[#0B1F3A]">
              3. Services & Work Preferences
            </h2>

            <div className="grid gap-5 md:grid-cols-2">
              <select required defaultValue="" className="field">
                <option value="" disabled>
                  Main Service Category
                </option>
                <option>Web Development</option>
                <option>App Development</option>
                <option>Graphic Design</option>
                <option>Digital Marketing</option>
                <option>Content Writing</option>
                <option>Cyber Security</option>
                <option>Data Entry</option>
                <option>Other</option>
              </select>

              <select required defaultValue="" className="field">
                <option value="" disabled>
                  Preferred Work Mode
                </option>
                <option>Remote</option>
                <option>On-Site</option>
                <option>Hybrid</option>
                <option>Any</option>
              </select>

              <select defaultValue="" className="field">
                <option value="" disabled>
                  Availability
                </option>
                <option>Full-Time</option>
                <option>Part-Time</option>
                <option>Project-Based</option>
                <option>Flexible</option>
              </select>

              <input
                type="number"
                min="0"
                placeholder="Expected Hourly Rate (Optional)"
                className="field"
              />
            </div>
          </section>

          <section>
            <h2 className="mb-5 text-xl font-bold text-[#0B1F3A]">
              4. Portfolio & Links
            </h2>

            <div className="space-y-5">
              <input
                type="url"
                placeholder="Portfolio Website URL"
                className="field w-full"
              />

              <input
                type="url"
                placeholder="LinkedIn Profile URL"
                className="field w-full"
              />

              <input
                type="url"
                placeholder="GitHub / Behance / Other Profile URL"
                className="field w-full"
              />

              <label className="block text-sm font-medium text-gray-700">
                Upload Portfolio or Work Sample (Optional)
                <input
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  className="mt-2 block w-full rounded-lg border border-gray-300 p-3"
                />
              </label>
            </div>
          </section>

          <section>
            <h2 className="mb-5 text-xl font-bold text-[#0B1F3A]">
              5. Payment Preferences
            </h2>

            <div className="grid gap-5 md:grid-cols-2">
              <select required defaultValue="" className="field">
                <option value="" disabled>
                  Preferred Payment Currency
                </option>
                <option>USD</option>
                <option>INR</option>
                <option>EUR</option>
                <option>GBP</option>
                <option>Other</option>
              </select>

              <select defaultValue="" className="field">
                <option value="" disabled>
                  Payment Preference
                </option>
                <option>Per Project</option>
                <option>Hourly</option>
                <option>Fixed Price</option>
                <option>Negotiable</option>
              </select>
            </div>

            <p className="mt-3 text-sm text-gray-500">
              Do not enter bank account details or card information here.
            </p>
          </section>

          <label className="flex items-start gap-3 text-sm text-gray-600">
            <input type="checkbox" required className="mt-1" />
            <span>
              I confirm that my information is accurate and agree to the{" "}
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
            Create Freelancer Profile
          </button>

          {submitted && (
            <p className="rounded-lg bg-yellow-50 p-4 text-center text-sm text-yellow-800">
              Demo only: Your information has not been saved. Secure account
              registration and database storage will be connected later.
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
