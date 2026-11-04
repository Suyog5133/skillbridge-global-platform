
"use client";

import { useState } from "react";

export default function SEOPage() {
  const [settings, setSettings] = useState({
    siteTitle: "SkillBridge Global | Jobs, Internships & Freelance Projects",
    description:
      "Connect with global companies, discover jobs, internships and freelance opportunities.",
    keywords:
      "global jobs, internships, freelance projects, hiring, careers",
    canonical: "https://www.skillbridgeglobal.com",
    robots: "index, follow",
    sitemap: "https://www.skillbridgeglobal.com/sitemap.xml",
  });

  const [saved, setSaved] = useState(false);

  const update = (field: string, value: string) => {
    setSettings((current) => ({ ...current, [field]: value }));
    setSaved(false);
  };

  const handleSave = () => {
    setSaved(true);
  };

  return (
    <main className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-6xl">
        <p className="text-sm font-semibold text-blue-600">
          ADMINISTRATION / SEO
        </p>
        <h1 className="mt-2 text-3xl font-bold text-slate-900">
          SEO Management
        </h1>
        <p className="mt-2 text-slate-500">
          Manage search engine settings and website visibility.
        </p>

        {saved && (
          <div className="mt-6 rounded-xl border border-green-200 bg-green-50 p-4 text-sm text-green-700">
            Demo settings saved successfully.
          </div>
        )}

        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          <section className="space-y-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-2">
            <h2 className="text-lg font-bold text-slate-900">
              Search Engine Settings
            </h2>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Website Title
              </label>
              <input
                value={settings.siteTitle}
                onChange={(e) => update("siteTitle", e.target.value)}
                className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Meta Description
              </label>
              <textarea
                rows={4}
                value={settings.description}
                onChange={(e) => update("description", e.target.value)}
                className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none focus:border-blue-500"
              />
              <p className="mt-1 text-xs text-slate-400">
                {settings.description.length} characters
              </p>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                SEO Keywords
              </label>
              <input
                value={settings.keywords}
                onChange={(e) => update("keywords", e.target.value)}
                className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Canonical Website URL
              </label>
              <input
                value={settings.canonical}
                onChange={(e) => update("canonical", e.target.value)}
                className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Robots Directive
              </label>
              <select
                value={settings.robots}
                onChange={(e) => update("robots", e.target.value)}
                className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500"
              >
                <option value="index, follow">Index, Follow</option>
                <option value="noindex, follow">No Index, Follow</option>
                <option value="noindex, nofollow">No Index, No Follow</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Sitemap URL
              </label>
              <input
                value={settings.sitemap}
                onChange={(e) => update("sitemap", e.target.value)}
                className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none focus:border-blue-500"
              />
            </div>

            <button
              onClick={handleSave}
              className="rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-700"
            >
              Save SEO Settings
            </button>
          </section>

          <aside className="space-y-5">
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <h2 className="font-bold text-slate-900">SEO Checklist</h2>
              {[
                "Unique page titles",
                "Meta descriptions",
                "Mobile-friendly pages",
                "XML sitemap",
                "Robots.txt",
                "HTTPS security",
              ].map((item) => (
                <div
                  key={item}
                  className="mt-4 flex items-center gap-2 text-sm text-slate-600"
                >
                  <span className="text-blue-600">●</span>
                  {item}
                </div>
              ))}
            </div>

            <div className="rounded-2xl border border-blue-100 bg-blue-50 p-5">
              <h3 className="font-bold text-blue-900">
                Search Engine Preview
              </h3>
              <p className="mt-3 text-lg text-blue-700">
                {settings.siteTitle}
              </p>
              <p className="mt-2 break-all text-xs text-green-700">
                {settings.canonical}
              </p>
              <p className="mt-2 text-sm text-slate-600">
                {settings.description}
              </p>
            </div>
          </aside>
        </div>

        <div className="mt-6 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
          Demo only: These settings are stored in page state and are not
          published to search engines. Real SEO configuration requires backend
          storage and Next.js metadata, sitemap and robots implementation.
        </div>
      </div>
    </main>
  );
}
