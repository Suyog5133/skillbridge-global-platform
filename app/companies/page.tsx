import Link from "next/link";

const benefits = [
  {
    number: "01",
    title: "Find Global Talent",
    description:
      "Discover skilled candidates, students and freelancers from different countries.",
  },
  {
    number: "02",
    title: "Post Jobs & Internships",
    description:
      "Publish job openings, remote opportunities and internship programs.",
  },
  {
    number: "03",
    title: "Hire the Right People",
    description:
      "Explore candidate profiles, review applications and connect with suitable talent.",
  },
  {
    number: "04",
    title: "Build Your Team",
    description:
      "Connect with professionals and grow your organization with global talent.",
  },
];

const services = [
  {
    title: "Full-Time Hiring",
    description: "Find qualified professionals for permanent positions.",
    icon: "01",
  },
  {
    title: "Internship Programs",
    description: "Discover students and fresh graduates with potential.",
    icon: "02",
  },
  {
    title: "Freelance Projects",
    description: "Hire independent professionals for short-term projects.",
    icon: "03",
  },
  {
    title: "Remote Hiring",
    description: "Connect with skilled people regardless of location.",
    icon: "04",
  },
];

export default function CompaniesPage() {
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
            <Link href="/login" className="hover:text-blue-700">Login</Link>
            <Link
              href="/register"
              className="rounded-lg bg-blue-950 px-5 py-3 text-white hover:bg-blue-800"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      <section className="bg-slate-950 px-6 py-24 text-white">
        <div className="mx-auto grid max-w-7xl items-center gap-12 md:grid-cols-2">
          <div>
            <p className="font-semibold tracking-wider text-blue-300">
              FOR COMPANIES & EMPLOYERS
            </p>

            <h1 className="mt-5 text-4xl font-bold leading-tight md:text-6xl">
              Build Your Team With Global Talent.
            </h1>

            <p className="mt-6 text-lg leading-8 text-slate-300">
              Find skilled professionals, connect with emerging talent and
              hire the right people from anywhere in the world.
            </p>

            <div className="mt-9 flex flex-wrap gap-4">
              <Link
                href="/register"
                className="rounded-lg bg-blue-600 px-7 py-4 font-semibold text-white hover:bg-blue-700"
              >
                Register Your Company
              </Link>

              <Link
                href="/talent"
                className="rounded-lg border border-slate-500 px-7 py-4 font-semibold text-white hover:bg-slate-800"
              >
                Explore Talent
              </Link>
            </div>

            <p className="mt-5 text-sm text-slate-400">
              Connect · Discover · Hire · Grow
            </p>
          </div>

          <div className="rounded-2xl border border-slate-700 bg-slate-900 p-8 shadow-xl">
            <p className="text-sm font-semibold text-blue-300">
              SKILLBRIDGE GLOBAL
            </p>
            <h2 className="mt-4 text-3xl font-bold">
              One Platform. Global Opportunities.
            </h2>
            <p className="mt-4 leading-7 text-slate-300">
              A platform designed to connect companies with candidates,
              students and freelancers across international markets.
            </p>

            <div className="mt-8 grid grid-cols-2 gap-4">
              <div className="rounded-xl bg-slate-800 p-5">
                <p className="text-2xl font-bold text-white">Global</p>
                <p className="mt-2 text-sm text-slate-400">Talent Network</p>
              </div>
              <div className="rounded-xl bg-slate-800 p-5">
                <p className="text-2xl font-bold text-white">Multiple</p>
                <p className="mt-2 text-sm text-slate-400">Hiring Options</p>
              </div>
              <div className="rounded-xl bg-slate-800 p-5">
                <p className="text-2xl font-bold text-white">One</p>
                <p className="mt-2 text-sm text-slate-400">Connected Platform</p>
              </div>
              <div className="rounded-xl bg-slate-800 p-5">
                <p className="text-2xl font-bold text-white">Worldwide</p>
                <p className="mt-2 text-sm text-slate-400">Opportunities</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="max-w-2xl">
          <p className="font-semibold text-blue-700">WHY SKILLBRIDGE GLOBAL?</p>
          <h2 className="mt-3 text-3xl font-bold md:text-4xl">
            Everything Your Company Needs to Find Talent
          </h2>
          <p className="mt-4 leading-7 text-slate-600">
            Simplify your hiring process and connect with people who have the
            skills your organization needs.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((item) => (
            <div
              key={item.number}
              className="rounded-2xl border border-slate-200 p-7 transition hover:-translate-y-1 hover:border-blue-300 hover:shadow-lg"
            >
              <span className="text-3xl font-bold text-blue-700">
                {item.number}
              </span>
              <h3 className="mt-6 text-xl font-bold">{item.title}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-slate-50 px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <p className="font-semibold text-blue-700">HIRING SOLUTIONS</p>
            <h2 className="mt-3 text-3xl font-bold">
              Hire the Way That Works for You
            </h2>
            <p className="mt-4 text-slate-600">
              Different hiring options for different business needs.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((service) => (
              <div
                key={service.icon}
                className="rounded-2xl bg-white p-7 shadow-sm"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 font-bold text-blue-700">
                  {service.icon}
                </div>
                <h3 className="mt-5 text-xl font-bold">{service.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto max-w-5xl rounded-2xl bg-blue-950 px-8 py-14 text-center text-white">
          <p className="font-semibold text-blue-300">START HIRING GLOBALLY</p>
          <h2 className="mt-4 text-3xl font-bold md:text-4xl">
            Find the Right Talent for Your Next Big Idea.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl leading-7 text-blue-100">
            Join SkillBridge Global and connect your company with skilled
            professionals, students and freelancers.
          </p>
          <Link
            href="/register"
            className="mt-8 inline-block rounded-lg bg-white px-8 py-4 font-semibold text-blue-950 hover:bg-blue-50"
          >
            Get Started as a Company
          </Link>
        </div>
      </section>

      <footer className="bg-slate-950 px-6 py-10 text-center text-slate-400">
        <p className="text-xl font-bold text-white">SkillBridge Global</p>
        <p className="mt-3 text-sm">
          Connecting Global Talent with Global Opportunities.
        </p>

        <div className="mt-6 flex flex-wrap justify-center gap-6 text-sm">
          <Link href="/" className="hover:text-white">Home</Link>
          <Link href="/jobs" className="hover:text-white">Find Jobs</Link>
          <Link href="/talent" className="hover:text-white">Find Talent</Link>
          <Link href="/freelance" className="hover:text-white">Freelance</Link>
          <Link href="/internships" className="hover:text-white">Internships</Link>
          <Link href="/login" className="hover:text-white">Login</Link>
        </div>

        <p className="mt-8 text-xs">
          © 2026 SkillBridge Global. All rights reserved.
        </p>
      </footer>
    </main>
  );
}