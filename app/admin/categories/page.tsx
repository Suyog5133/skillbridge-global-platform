
"use client";

import { useState } from "react";

type Category = {
  id: number;
  name: string;
  skills: string[];
  status: boolean;
};

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([
    { id: 1, name: "Web Development", skills: ["React", "Next.js", "HTML", "CSS"], status: true },
    { id: 2, name: "Cyber Security", skills: ["Ethical Hacking", "Network Security", "Penetration Testing"], status: true },
    { id: 3, name: "Data Science", skills: ["Python", "Machine Learning", "SQL"], status: true },
    { id: 4, name: "Graphic Design", skills: ["Photoshop", "Canva", "Illustrator"], status: true },
    { id: 5, name: "Digital Marketing", skills: ["SEO", "Social Media", "Google Ads"], status: false },
    { id: 6, name: "Mobile Development", skills: ["Android", "Flutter", "React Native"], status: true },
  ]);

  const [name, setName] = useState("");
  const [skills, setSkills] = useState("");
  const [search, setSearch] = useState("");

  const filtered = categories.filter((c) =>
    `${c.name} ${c.skills.join(" ")}`.toLowerCase().includes(search.toLowerCase())
  );

  function addCategory(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) return;

    setCategories([...categories, {
      id: Date.now(),
      name: name.trim(),
      skills: skills.split(",").map((s) => s.trim()).filter(Boolean),
      status: true,
    }]);

    setName("");
    setSkills("");
  }

  function toggleStatus(id: number) {
    setCategories(categories.map((c) =>
      c.id === id ? { ...c, status: !c.status } : c
    ));
  }

  function deleteCategory(id: number) {
    const category = categories.find((item) => item.id === id);
    if (!category || !window.confirm(`Delete category "${category.name}"?`)) {
      return;
    }
    setCategories(categories.filter((c) => c.id !== id));
  }

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8">
      <div className="mx-auto max-w-7xl space-y-7">

        <div>
          <p className="text-sm font-semibold text-blue-600">ADMIN / PLATFORM MANAGEMENT</p>
          <h1 className="mt-2 text-3xl font-bold text-slate-900">
            Job Categories & Skills
          </h1>
          <p className="mt-2 text-slate-500">
            Manage global job categories and professional skills.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-xl border bg-white p-5">
            <p className="text-sm text-slate-500">Total Categories</p>
            <h2 className="mt-2 text-3xl font-bold">{categories.length}</h2>
          </div>
          <div className="rounded-xl border bg-white p-5">
            <p className="text-sm text-slate-500">Active Categories</p>
            <h2 className="mt-2 text-3xl font-bold text-green-600">
              {categories.filter((c) => c.status).length}
            </h2>
          </div>
          <div className="rounded-xl border bg-white p-5">
            <p className="text-sm text-slate-500">Total Skills</p>
            <h2 className="mt-2 text-3xl font-bold text-blue-600">
              {categories.reduce((sum, c) => sum + c.skills.length, 0)}
            </h2>
          </div>
        </div>

        <section className="rounded-xl border bg-white p-6">
          <h2 className="mb-5 text-xl font-bold">Add New Category</h2>

          <form onSubmit={addCategory} className="space-y-4">
            <input
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Category name (e.g. Artificial Intelligence)"
              className="w-full rounded-lg border p-3"
            />

            <textarea
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
              placeholder="Skills separated by commas (e.g. Python, AI, Deep Learning)"
              className="w-full rounded-lg border p-3"
              rows={3}
            />

            <button className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700">
              + Add Category
            </button>
          </form>
        </section>

        <section className="rounded-xl border bg-white p-6">
          <div className="mb-5 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
            <h2 className="text-xl font-bold">Manage Categories</h2>

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search categories or skills..."
              className="rounded-lg border p-3 sm:w-80"
            />
          </div>

          <div className="space-y-4">
            {filtered.map((c) => (
              <div key={c.id} className="rounded-xl border p-5">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <h3 className="text-lg font-bold">{c.name}</h3>
                    <p className="mt-1 text-sm text-slate-500">
                      {c.skills.length} skills
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      c.status
                        ? "bg-green-100 text-green-700"
                        : "bg-slate-100 text-slate-500"
                    }`}>
                      {c.status ? "Active" : "Inactive"}
                    </span>

                    <button
                      onClick={() => toggleStatus(c.id)}
                      className="rounded-lg border px-3 py-2 text-sm hover:bg-slate-100"
                    >
                      {c.status ? "Disable" : "Enable"}
                    </button>

                    <button
                      onClick={() => deleteCategory(c.id)}
                      className="rounded-lg border border-red-200 px-3 py-2 text-sm text-red-600 hover:bg-red-50"
                    >
                      Delete
                    </button>
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  {c.skills.map((skill, index) => (
                    <span
                      key={`${c.id}-${index}`}
                      className="rounded-full bg-blue-50 px-3 py-1 text-sm text-blue-700"
                    >
                      {skill}
                    </span>
                  ))}
                  {c.skills.length === 0 && (
                    <p className="text-sm text-slate-400">No skills added.</p>
                  )}
                </div>
              </div>
            ))}

            {filtered.length === 0 && (
              <p className="py-8 text-center text-slate-500">
                No categories found.
              </p>
            )}
          </div>
        </section>

        <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
          <strong>Note:</strong> This is a frontend demo. Categories and skills
          currently remain in local page state. Database integration will come later.
        </div>

      </div>
    </div>
  );
}
