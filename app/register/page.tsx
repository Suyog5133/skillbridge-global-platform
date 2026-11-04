import Link from "next/link";

const roles = [
  {
    title: "Candidate",
    description: "Find full-time and part-time job opportunities worldwide.",
    icon: "👨‍💻",
    link: "/register/candidate",
  },
  {
    title: "Student",
    description: "Discover internships, training and entry-level jobs.",
    icon: "🎓",
    link: "/register/student",
  },
  {
    title: "Freelancer",
    description: "Find freelance projects and work with global clients.",
    icon: "💼",
    link: "/register/freelancer",
  },
  {
    title: "Company",
    description: "Hire skilled professionals and discover global talent.",
    icon: "🏢",
    link: "/register/company",
  },
];

export default function RegisterPage() {
  return (
    <main className="min-h-screen bg-slate-50 px-4 py-12">
      <div className="max-w-5xl mx-auto">

        <div className="text-center mb-12">
          <Link href="/" className="text-2xl font-bold text-blue-900">
            SkillBridge Global
          </Link>

          <h1 className="text-4xl font-bold text-slate-900 mt-8">
            Create Your Account
          </h1>

          <p className="text-slate-600 mt-3">
            Choose how you want to use SkillBridge Global.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {roles.map((role) => (
            <Link
              href={role.link}
              key={role.title}
              className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm hover:shadow-lg hover:border-blue-500 transition"
            >
              <div className="text-4xl mb-5">{role.icon}</div>

              <h2 className="text-2xl font-bold text-slate-900">
                {role.title}
              </h2>

              <p className="text-slate-600 mt-3">
                {role.description}
              </p>

              <div className="mt-6 text-blue-700 font-semibold">
                Register as {role.title} →
              </div>
            </Link>
          ))}
        </div>

        <p className="text-center text-slate-600 mt-10">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-700 font-semibold">
            Login
          </Link>
        </p>

        <Link
          href="/"
          className="block text-center text-slate-500 mt-5 hover:text-blue-700"
        >
          ← Back to Home
        </Link>

      </div>
    </main>
  );
}