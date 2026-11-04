"use client";

import Link from "next/link";
import { useState } from "react";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    role: "",
    subject: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <main className="min-h-screen bg-white text-slate-900">
      <nav className="border-b border-slate-200">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <Link href="/" className="text-2xl font-bold text-blue-950">
            SkillBridge Global
          </Link>

          <div className="hidden items-center gap-6 text-sm font-medium md:flex">
            <Link href="/" className="hover:text-blue-700">Home</Link>
            <Link href="/about" className="hover:text-blue-700">About Us</Link>
            <Link href="/jobs" className="hover:text-blue-700">Find Jobs</Link>
            <Link href="/talent" className="hover:text-blue-700">Find Talent</Link>
            <Link href="/companies" className="hover:text-blue-700">Companies</Link>
            <Link href="/login" className="hover:text-blue-700">Login</Link>
          </div>
        </div>
      </nav>

      <section className="bg-slate-950 px-6 py-20 text-center text-white">
        <div className="mx-auto max-w-3xl">
          <p className="font-semibold tracking-widest text-blue-300">
            WE ARE HERE TO HELP
          </p>

          <h1 className="mt-5 text-4xl font-bold md:text-6xl">
            Let&apos;s Start a Conversation.
          </h1>

          <p className="mt-6 text-lg leading-8 text-slate-300">
            Have a question, suggestion or business inquiry? Get in touch with
            the SkillBridge Global team.
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-12 px-6 py-16 lg:grid-cols-3">
        <div className="lg:col-span-1">
          <p className="font-semibold text-blue-700">CONTACT INFORMATION</p>

          <h2 className="mt-3 text-3xl font-bold">
            How Can We Help You?
          </h2>

          <p className="mt-4 leading-7 text-slate-600">
            Choose the right category and send us your question. Our contact
            form is designed for candidates, students, freelancers and companies.
          </p>

          <div className="mt-9 space-y-5">
            <div className="rounded-xl border border-slate-200 p-5">
              <h3 className="font-bold">General Support</h3>
              <p className="mt-2 text-sm text-slate-600">
                Questions about the platform and its features.
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 p-5">
              <h3 className="font-bold">Business Inquiries</h3>
              <p className="mt-2 text-sm text-slate-600">
                Company partnerships, hiring and collaboration.
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 p-5">
              <h3 className="font-bold">Technical Support</h3>
              <p className="mt-2 text-sm text-slate-600">
                Help with accounts, access and technical issues.
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 p-5">
              <h3 className="font-bold">Privacy & Security</h3>
              <p className="mt-2 text-sm text-slate-600">
                Questions about privacy, security and personal data.
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 p-7 shadow-sm lg:col-span-2 md:p-9">
          <h2 className="text-2xl font-bold">Send Us a Message</h2>

          <p className="mt-2 text-sm text-slate-600">
            Fill in the form below with your details.
          </p>

          {submitted ? (
            <div className="mt-8 rounded-xl border border-green-200 bg-green-50 p-6">
              <h3 className="text-xl font-bold text-green-800">
                Thank you for contacting us!
              </h3>
              <p className="mt-2 text-green-700">
                Your form has been submitted in this demo. Message delivery
                will be enabled when we connect the backend.
              </p>

              <button
                onClick={() => {
                  setSubmitted(false);
                  setForm({
                    name: "",
                    email: "",
                    role: "",
                    subject: "",
                    message: "",
                  });
                }}
                className="mt-5 rounded-lg bg-green-700 px-5 py-3 text-sm font-semibold text-white hover:bg-green-800"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-semibold">
                    Full Name
                  </label>
                  <input
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Enter your full name"
                    className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-700"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold">
                    Email Address
                  </label>
                  <input
                    required
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="Enter your email"
                    className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-700"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold">
                  I am a
                </label>
                <select
                  required
                  value={form.role}
                  onChange={(e) => setForm({ ...form, role: e.target.value })}
                  className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 outline-none focus:border-blue-700"
                >
                  <option value="">Select your category</option>
                  <option value="Candidate">Candidate</option>
                  <option value="Student">Student</option>
                  <option value="Freelancer">Freelancer</option>
                  <option value="Company">Company / Employer</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold">
                  Subject
                </label>
                <input
                  required
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  placeholder="What is your message about?"
                  className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-700"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold">
                  Your Message
                </label>
                <textarea
                  required
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Write your message here..."
                  className="w-full resize-y rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-700"
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-lg bg-blue-950 px-7 py-4 font-semibold text-white hover:bg-blue-800"
              >
                Submit Message →
              </button>

              <p className="text-xs leading-5 text-slate-500">
                By submitting this form, you agree that your information may
                be used to respond to your inquiry. Our full privacy policy
                will explain how personal data is handled.
              </p>
            </form>
          )}
        </div>
      </section>

      <section className="bg-slate-50 px-6 py-16">
        <div className="mx-auto max-w-5xl">
          <div className="text-center">
            <p className="font-semibold text-blue-700">HELP CENTER</p>
            <h2 className="mt-3 text-3xl font-bold">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="mt-10 space-y-4">
            {[
              {
                q: "Who can join SkillBridge Global?",
                a: "Candidates, students, freelancers and companies can create accounts on the platform.",
              },
              {
                q: "Can companies hire people internationally?",
                a: "The platform is being designed to support global talent discovery and international hiring.",
              },
              {
                q: "Can students find internships?",
                a: "Yes. Internship discovery for students and fresh graduates is one of the planned platform features.",
              },
              {
                q: "How can I report a security or privacy concern?",
                a: "You can select Privacy & Security in the contact form and describe your concern.",
              },
            ].map((item) => (
              <details
                key={item.q}
                className="group rounded-xl border border-slate-200 bg-white p-6"
              >
                <summary className="cursor-pointer list-none font-semibold">
                  {item.q}
                  <span className="float-right text-blue-700 group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-4 leading-7 text-slate-600">{item.a}</p>
              </details>
            ))}
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
          <Link href="/about" className="hover:text-white">About Us</Link>
          <Link href="/jobs" className="hover:text-white">Find Jobs</Link>
          <Link href="/companies" className="hover:text-white">Companies</Link>
          <Link href="/contact" className="hover:text-white">Contact Us</Link>
        </div>

        <p className="mt-8 text-xs">
          © 2026 SkillBridge Global. All rights reserved.
        </p>
      </footer>
    </main>
  );
}