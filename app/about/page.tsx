import Link from "next/link";

const values = [
  {
    number: "01",
    title: "Global Opportunities",
    description:
      "We believe talent should have access to opportunities regardless of country or location.",
  },
  {
    number: "02",
    title: "Equal Access",
    description:
      "We aim to create opportunities for students, freshers, professionals and freelancers.",
  },
  {
    number: "03",
    title: "Trust & Security",
    description:
      "We are committed to building a platform that respects user privacy, data protection and transparency.",
  },
  {
    number: "04",
    title: "Growth & Innovation",
    description:
      "We want to use technology to make discovering opportunities and hiring talent easier.",
  },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      <nav className="border-b border-slate-200">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <Link href="/" className="text-2xl font-bold text-blue-950">
            SkillBridge Global
          </Link>

          <div className="hidden items-center gap-6 text-sm font-medium md:flex">
            <Link href="/" className="hover:text-blue-700">Home</Link>
            <Link href="/jobs" className="hover:text-blue-700">Find Jobs</Link>
            <Link href="/talent" className="hover:text-blue-700">Find Talent</Link>
            <Link href="/freelance" className="hover:text-blue-700">Freelance</Link>
            <Link href="/internships" className="hover:text-blue-700">Internships</Link>
            <Link href="/companies" className="hover:text-blue-700">For Companies</Link>
            <Link href="/login" className="hover:text-blue-700">Login</Link>
          </div>
        </div>
      </nav>

      <section className="bg-slate-950 px-6 py-24 text-center text-white">
        <div className="mx-auto max-w-4xl">
          <p className="font-semibold tracking-widest text-blue-300">
            ABOUT SKILLBRIDGE GLOBAL
          </p>

          <h1 className="mt-5 text-4xl font-bold leading-tight md:text-6xl">
            Connecting Talent With Opportunities Worldwide.
          </h1>

          <p className="mx-auto mt-7 max-w-3xl text-lg leading-8 text-slate-300">
            SkillBridge Global is a platform concept designed to connect
            candidates, students, freelancers and companies through a single
            global career and hiring ecosystem.
          </p>

          <Link
            href="/register"
            className="mt-9 inline-block rounded-lg bg-blue-600 px-8 py-4 font-semibold text-white hover:bg-blue-700"
          >
            Join Our Platform
          </Link>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-12 px-6 py-20 md:grid-cols-2 md:items-center">
        <div>
          <p className="font-semibold text-blue-700">WHO WE ARE</p>

          <h2 className="mt-3 text-3xl font-bold md:text-4xl">
            One Platform for Global Career Opportunities
          </h2>

          <p className="mt-6 leading-8 text-slate-600">
            SkillBridge Global aims to bring different parts of the
            professional world together. Instead of using separate platforms
            for jobs, internships, freelance projects and talent hiring, users
            will be able to explore these opportunities in one place.
          </p>

          <p className="mt-4 leading-8 text-slate-600">
            Our goal is to make it easier for people to showcase their skills,
            discover opportunities and connect with organizations across
            international markets.
          </p>
        </div>

        <div className="rounded-2xl bg-slate-100 p-9">
          <p className="text-sm font-semibold text-blue-700">
            OUR PURPOSE
          </p>

          <h3 className="mt-4 text-3xl font-bold text-blue-950">
            Connecting People. Creating Possibilities.
          </h3>

          <p className="mt-5 leading-8 text-slate-600">
            We want to reduce the gap between skills and opportunities by
            making talent discovery and hiring more accessible.
          </p>

          <div className="mt-8 border-t border-slate-300 pt-6">
            <p className="font-semibold text-slate-900">
              Students · Candidates · Freelancers · Companies
            </p>
            <p className="mt-2 text-sm text-slate-500">
              A connected global ecosystem.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 px-6 py-20">
        <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-2">
          <div className="rounded-2xl bg-white p-9 shadow-sm">
            <p className="font-semibold text-blue-700">OUR MISSION</p>
            <h2 className="mt-4 text-3xl font-bold">Make Opportunities Accessible</h2>
            <p className="mt-5 leading-8 text-slate-600">
              Our mission is to build an accessible global platform where
              people can discover jobs, internships and freelance projects,
              while companies can find and connect with suitable talent.
            </p>
          </div>

          <div className="rounded-2xl bg-blue-950 p-9 text-white shadow-sm">
            <p className="font-semibold text-blue-300">OUR VISION</p>
            <h2 className="mt-4 text-3xl font-bold">A World Without Career Boundaries</h2>
            <p className="mt-5 leading-8 text-blue-100">
              Our vision is to create a trusted global ecosystem where skills,
              talent and opportunities can connect beyond geographical
              boundaries.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="text-center">
          <p className="font-semibold text-blue-700">WHAT WE BELIEVE IN</p>
          <h2 className="mt-3 text-3xl font-bold md:text-4xl">
            Our Core Values
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-slate-600">
            The principles that guide the way we want to build SkillBridge
            Global.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((value) => (
            <div
              key={value.number}
              className="rounded-2xl border border-slate-200 p-7 transition hover:border-blue-300 hover:shadow-lg"
            >
              <span className="text-3xl font-bold text-blue-700">
                {value.number}
              </span>
              <h3 className="mt-6 text-xl font-bold">{value.title}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-slate-950 px-6 py-20 text-center text-white">
        <div className="mx-auto max-w-3xl">
          <p className="font-semibold text-blue-300">BE PART OF THE JOURNEY</p>
          <h2 className="mt-4 text-3xl font-bold md:text-4xl">
            Your Skills Can Take You Anywhere.
          </h2>
          <p className="mt-5 leading-8 text-slate-300">
            Whether you are a student, professional, freelancer or company,
            SkillBridge Global aims to help you discover new possibilities.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/register"
              className="rounded-lg bg-blue-600 px-7 py-4 font-semibold hover:bg-blue-700"
            >
              Create Account
            </Link>

            <Link
              href="/contact"
              className="rounded-lg border border-slate-500 px-7 py-4 font-semibold hover:bg-slate-800"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      <footer className="bg-slate-950 px-6 py-8 text-center text-slate-400">
        <p className="text-xl font-bold text-white">SkillBridge Global</p>
        <p className="mt-3 text-sm">
          Connecting Global Talent with Global Opportunities.
        </p>

        <div className="mt-5 flex flex-wrap justify-center gap-6 text-sm">
          <Link href="/" className="hover:text-white">Home</Link>
          <Link href="/about" className="hover:text-white">About Us</Link>
          <Link href="/jobs" className="hover:text-white">Find Jobs</Link>
          <Link href="/companies" className="hover:text-white">Companies</Link>
          <Link href="/contact" className="hover:text-white">Contact</Link>
        </div>

        <p className="mt-8 text-xs">
          © 2026 SkillBridge Global. All rights reserved.
        </p>
      </footer>
    </main>
  );
}