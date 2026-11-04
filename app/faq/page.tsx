"use client";

import { useState } from "react";

const faqData = [
  {
    category: "General",
    questions: [
      {
        q: "What is SkillBridge Global?",
        a: "SkillBridge Global is a planned worldwide career and hiring platform designed to connect candidates, students, freelancers, and companies.",
      },
      {
        q: "Is SkillBridge Global available worldwide?",
        a: "Our goal is to support users and companies from different countries around the world.",
      },
      {
        q: "Is registration free?",
        a: "Our initial registration is planned to be free. Any future paid features or services will have clearly displayed pricing.",
      },
    ],
  },
  {
    category: "Candidates & Students",
    questions: [
      {
        q: "How can I create an account?",
        a: "Visit the Register page, select your account type, and complete the registration process when account registration becomes available.",
      },
      {
        q: "Can students apply for internships?",
        a: "Yes. The platform is designed to help students discover internships, entry-level jobs, and career opportunities.",
      },
      {
        q: "Can I upload my resume?",
        a: "Resume upload is a planned feature that will help candidates present their qualifications and experience to companies.",
      },
    ],
  },
  {
    category: "Freelancers",
    questions: [
      {
        q: "Can freelancers find projects?",
        a: "Yes. SkillBridge Global aims to connect freelancers with clients looking for different skills and professional services.",
      },
      {
        q: "Can I show my portfolio?",
        a: "A portfolio feature is planned so freelancers can showcase their skills, previous work, and experience.",
      },
    ],
  },
  {
    category: "Companies",
    questions: [
      {
        q: "How can companies hire candidates?",
        a: "Companies will be able to create company profiles, publish opportunities, and discover suitable candidates as hiring features become available.",
      },
      {
        q: "Can international companies join?",
        a: "Yes. Our vision is to support companies and hiring opportunities across different countries.",
      },
      {
        q: "Can companies post internships?",
        a: "Yes. Internship and entry-level opportunity listings are part of the platform's planned features.",
      },
    ],
  },
  {
    category: "Security & Privacy",
    questions: [
      {
        q: "How will my personal information be protected?",
        a: "We intend to use reasonable security measures and handle personal information according to our Privacy Policy and applicable laws.",
      },
      {
        q: "Can I request deletion of my account?",
        a: "Account deletion and personal data requests are planned to be handled through an appropriate support process, subject to applicable laws.",
      },
    ],
  },
];

export default function FAQPage() {
  const [activeCategory, setActiveCategory] = useState("General");
  const [openQuestion, setOpenQuestion] = useState<number | null>(0);

  const selectedCategory = faqData.find(
    (item) => item.category === activeCategory
  );

  return (
    <main className="min-h-screen bg-gray-50">
      <section className="bg-[#0B1F3A] px-6 py-20 text-center text-white">
        <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-blue-300">
          Help Center
        </p>

        <h1 className="text-4xl font-bold md:text-5xl">
          Frequently Asked Questions
        </h1>

        <p className="mx-auto mt-5 max-w-2xl text-gray-300">
          Find answers about accounts, jobs, internships, freelance projects,
          companies, and platform security.
        </p>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-16">
        <div className="mb-10 flex flex-wrap justify-center gap-3">
          {faqData.map((item) => (
            <button
              key={item.category}
              onClick={() => {
                setActiveCategory(item.category);
                setOpenQuestion(null);
              }}
              className={`rounded-full px-5 py-3 text-sm font-semibold transition ${
                activeCategory === item.category
                  ? "bg-blue-600 text-white"
                  : "border border-gray-200 bg-white text-gray-700 hover:border-blue-500 hover:text-blue-600"
              }`}
            >
              {item.category}
            </button>
          ))}
        </div>

        <div className="space-y-4">
          <h2 className="mb-6 text-2xl font-bold text-[#0B1F3A]">
            {activeCategory} Questions
          </h2>

          {selectedCategory?.questions.map((item, index) => (
            <div
              key={item.q}
              className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm"
            >
              <button
                onClick={() =>
                  setOpenQuestion(openQuestion === index ? null : index)
                }
                className="flex w-full items-center justify-between gap-4 p-5 text-left"
              >
                <span className="font-semibold text-[#0B1F3A]">
                  {item.q}
                </span>

                <span className="text-2xl text-blue-600">
                  {openQuestion === index ? "−" : "+"}
                </span>
              </button>

              {openQuestion === index && (
                <div className="border-t border-gray-100 px-5 py-4 leading-7 text-gray-600">
                  {item.a}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-16 rounded-2xl bg-blue-50 p-8 text-center">
          <h2 className="text-2xl font-bold text-[#0B1F3A]">
            Still Have Questions?
          </h2>

          <p className="mt-3 text-gray-600">
            Our team will be happy to hear from you.
          </p>

          <a
            href="/contact"
            className="mt-6 inline-block rounded-lg bg-blue-600 px-7 py-3 font-semibold text-white hover:bg-blue-700"
          >
            Contact Us
          </a>
        </div>
      </section>
    </main>
  );
}
