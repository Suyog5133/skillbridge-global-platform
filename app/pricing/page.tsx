"use client";

import { useState } from "react";

const plans = [
  {
    name: "Free",
    subtitle: "For students and beginners",
    monthly: 0,
    yearly: 0,
    color: "border-slate-200",
    button: "Get Started",
    features: [
      "Create a professional profile",
      "Browse global job opportunities",
      "Apply for available jobs",
      "Explore internships",
      "Basic profile visibility",
      "Save jobs and opportunities",
    ],
    unavailable: [
      "Advanced profile analytics",
      "Priority support",
      "Advanced talent search",
    ],
  },
  {
    name: "Pro",
    subtitle: "For active job seekers",
    monthly: 499,
    yearly: 4990,
    color: "border-blue-500",
    button: "Choose Pro",
    popular: true,
    features: [
      "Everything in Free",
      "Enhanced profile visibility",
      "Advanced job recommendations",
      "Application tracking",
      "Profile performance insights",
      "Priority support",
      "Professional profile badge",
    ],
    unavailable: [],
  },
  {
    name: "Freelancer",
    subtitle: "For independent professionals",
    monthly: 799,
    yearly: 7990,
    color: "border-purple-400",
    button: "Choose Freelancer",
    features: [
      "Everything in Free",
      "Create a freelancer portfolio",
      "Showcase professional services",
      "Receive project inquiries",
      "Advanced profile visibility",
      "Freelance project management",
      "Priority support",
    ],
    unavailable: [],
  },
  {
    name: "Company",
    subtitle: "For businesses and recruiters",
    monthly: 1999,
    yearly: 19990,
    color: "border-slate-200",
    button: "Choose Company",
    features: [
      "Company profile",
      "Post job opportunities",
      "Manage job applications",
      "Search candidate profiles",
      "Shortlist potential employees",
      "Hiring dashboard",
      "Recruitment insights",
    ],
    unavailable: [],
  },
];

const faqs = [
  {
    question: "Can I use SkillBridge Global for free?",
    answer:
      "Yes. The Free plan is designed for users who want to create a profile, explore opportunities and use basic platform features.",
  },
  {
    question: "Can I change my plan later?",
    answer:
      "Yes. Users will be able to upgrade or change their subscription according to the available plans and billing conditions.",
  },
  {
    question: "Are payments available worldwide?",
    answer:
      "International payment support is planned. Available payment methods and currencies will depend on the supported countries and payment providers.",
  },
  {
    question: "Can companies post jobs?",
    answer:
      "Company accounts will have access to job posting and recruitment tools. The number of posts and advanced features may depend on the selected plan.",
  },
  {
    question: "Can I cancel my subscription?",
    answer:
      "Paid subscriptions will include cancellation options according to the final billing and refund policy.",
  },
];

export default function PricingPage() {
  const [billing, setBilling] = useState<"monthly" | "yearly">("monthly");
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  function getPrice(plan: (typeof plans)[number]) {
    return billing === "monthly" ? plan.monthly : plan.yearly;
  }

  function formatPrice(amount: number) {
    return amount.toLocaleString("en-IN");
  }

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Header */}
      <section className="bg-white px-5 py-16 text-center md:py-20">
        <p className="text-sm font-bold uppercase tracking-widest text-blue-600">
          SkillBridge Global Membership
        </p>

        <h1 className="mx-auto mt-4 max-w-3xl text-4xl font-extrabold text-slate-900 md:text-5xl">
          Plans That Grow With Your Career
        </h1>

        <p className="mx-auto mt-5 max-w-2xl leading-7 text-slate-500">
          Whether you are a student, job seeker, freelancer or company,
          choose the membership that fits your goals.
        </p>

        {/* Billing Toggle */}
        <div className="mt-8 inline-flex items-center gap-2 rounded-xl bg-slate-100 p-1">
          <button
            onClick={() => setBilling("monthly")}
            className={`rounded-lg px-5 py-2.5 text-sm font-semibold transition ${
              billing === "monthly"
                ? "bg-white text-blue-700 shadow"
                : "text-slate-500"
            }`}
          >
            Monthly
          </button>

          <button
            onClick={() => setBilling("yearly")}
            className={`rounded-lg px-5 py-2.5 text-sm font-semibold transition ${
              billing === "yearly"
                ? "bg-white text-blue-700 shadow"
                : "text-slate-500"
            }`}
          >
            Yearly
            <span className="ml-2 text-xs text-green-600">
              Save up to 17%
            </span>
          </button>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="mx-auto max-w-7xl px-5 py-12">
        <div className="grid items-stretch gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative flex flex-col rounded-2xl border-2 ${plan.color} bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg`}
            >
              {plan.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-blue-600 px-4 py-1 text-xs font-bold text-white">
                  MOST POPULAR
                </span>
              )}

              <div className="border-b border-slate-100 pb-6">
                <h2 className="text-xl font-bold text-slate-900">
                  {plan.name}
                </h2>

                <p className="mt-2 min-h-10 text-sm text-slate-500">
                  {plan.subtitle}
                </p>

                <div className="mt-5 flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold text-slate-900">
                    {getPrice(plan) === 0
                      ? "Free"
                      : `₹${formatPrice(getPrice(plan))}`}
                  </span>

                  {getPrice(plan) !== 0 && (
                    <span className="text-sm text-slate-500">
                      /{billing === "monthly" ? "month" : "year"}
                    </span>
                  )}
                </div>

                {billing === "yearly" && getPrice(plan) !== 0 && (
                  <p className="mt-2 text-xs text-green-600">
                    Billed annually
                  </p>
                )}
              </div>

              <div className="flex-1 py-6">
                <p className="mb-4 text-sm font-bold text-slate-800">
                  What&apos;s included
                </p>

                <ul className="space-y-3">
                  {plan.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex gap-2 text-sm text-slate-600"
                    >
                      <span className="font-bold text-green-500">✓</span>
                      {feature}
                    </li>
                  ))}

                  {plan.unavailable.map((feature) => (
                    <li
                      key={feature}
                      className="flex gap-2 text-sm text-slate-400"
                    >
                      <span>—</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <a
                href="/register"
                className={`mt-4 block rounded-xl px-5 py-3 text-center text-sm font-bold transition ${
                  plan.popular
                    ? "bg-blue-600 text-white hover:bg-blue-700"
                    : "border border-slate-200 text-slate-800 hover:bg-slate-50"
                }`}
              >
                {plan.button}
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Benefits */}
      <section className="bg-white px-5 py-16">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-slate-900">
              Why Choose SkillBridge Global?
            </h2>

            <p className="mt-3 text-slate-500">
              One platform for global career and hiring opportunities.
            </p>
          </div>

          <div className="mt-10 grid gap-8 md:grid-cols-3">
            {[
              {
                icon: "🌍",
                title: "Global Opportunities",
                description:
                  "Explore career opportunities across different countries and industries.",
              },
              {
                icon: "🚀",
                title: "Career Growth",
                description:
                  "Build your professional profile and discover opportunities that match your skills.",
              },
              {
                icon: "🤝",
                title: "Professional Connections",
                description:
                  "Connect candidates, freelancers and companies in one ecosystem.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-2xl bg-slate-50 p-7 text-center"
              >
                <div className="text-4xl">{item.icon}</div>

                <h3 className="mt-4 font-bold text-slate-900">
                  {item.title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-4xl px-5 py-16">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold text-slate-900">
            Membership FAQs
          </h2>

          <p className="mt-3 text-slate-500">
            Questions about our plans and memberships.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <div
              key={faq.question}
              className="rounded-xl border border-slate-200 bg-white p-5"
            >
              <button
                onClick={() =>
                  setOpenFaq(openFaq === index ? null : index)
                }
                className="flex w-full items-center justify-between gap-4 text-left font-semibold text-slate-900"
              >
                {faq.question}

                <span className="text-xl text-blue-600">
                  {openFaq === index ? "−" : "+"}
                </span>
              </button>

              {openFaq === index && (
                <p className="mt-4 text-sm leading-7 text-slate-500">
                  {faq.answer}
                </p>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-blue-700 px-5 py-16 text-center text-white">
        <h2 className="text-3xl font-bold">
          Start Building Your Future Today
        </h2>

        <p className="mx-auto mt-4 max-w-xl text-blue-100">
          Join SkillBridge Global and explore a world of professional
          opportunities.
        </p>

        <a
          href="/register"
          className="mt-7 inline-block rounded-xl bg-white px-8 py-3 font-bold text-blue-700 transition hover:bg-blue-50"
        >
          Create Free Account
        </a>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 px-5 py-7 text-center text-sm text-slate-400">
        © 2026 SkillBridge Global. All rights reserved.
      </footer>
    </main>
  );
}