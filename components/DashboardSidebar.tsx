import Link from "next/link";

type DashboardSidebarProps = {
  role: string;
};

const navigation = [
  { label: "Overview", path: "" , icon: "📊" },
  { label: "My Profile", path: "/profile", icon: "👤" },
  { label: "Find Jobs", path: "/jobs", icon: "💼" },
  { label: "Internships", path: "/internships", icon: "🎓" },
  { label: "Freelance Projects", path: "/freelance", icon: "💻" },
  { label: "Find Talent", path: "/talent", icon: "🌍" },
  { label: "Applications", path: "/applications", icon: "📄" },
  { label: "Messages", path: "/messages", icon: "💬" },
  { label: "Notifications", path: "/notifications", icon: "🔔" },
  { label: "Settings", path: "/settings", icon: "⚙️" },
];

export default function DashboardSidebar({
  role,
}: DashboardSidebarProps) {
  const dashboardPath = `/dashboard/${role}`;

  return (
    <aside className="flex min-h-screen w-64 shrink-0 flex-col bg-slate-950 p-5 text-white">
      <Link href="/" className="mb-8 text-2xl font-bold">
        SkillBridge <span className="text-blue-400">Global</span>
      </Link>

      <div className="mb-6 rounded-xl bg-slate-800 p-4">
        <p className="text-xs uppercase tracking-wider text-slate-400">
          Dashboard
        </p>
        <p className="mt-2 text-lg font-semibold capitalize">
          {role}
        </p>
      </div>

      <nav className="flex-1 space-y-2">
        {navigation.map((item) => (
          <Link
            key={item.label}
            href={item.path === "" ? dashboardPath : item.path}
            className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm text-slate-300 transition hover:bg-blue-700 hover:text-white"
          >
            <span>{item.icon}</span>
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="mt-8 border-t border-slate-700 pt-5">
        <Link
          href="/"
          className="block rounded-lg px-4 py-3 text-sm text-slate-300 hover:bg-red-600 hover:text-white"
        >
          ↩ Back to Website
        </Link>
      </div>
    </aside>
  );
}