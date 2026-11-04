"use client";

import { useMemo, useState } from "react";

type ContentItem = {
  id: number;
  title: string;
  type: string;
  category: string;
  status: "Published" | "Draft" | "Archived";
  updated: string;
};

const initialContent: ContentItem[] = [
  {
    id: 1,
    title: "Welcome to SkillBridge Global",
    type: "Announcement",
    category: "Platform",
    status: "Published",
    updated: "04 Nov 2026",
  },
  {
    id: 2,
    title: "How to create a candidate profile",
    type: "FAQ",
    category: "Candidates",
    status: "Published",
    updated: "03 Nov 2026",
  },
  {
    id: 3,
    title: "Company verification guidelines",
    type: "Help Article",
    category: "Companies",
    status: "Draft",
    updated: "02 Nov 2026",
  },
  {
    id: 4,
    title: "Global hiring platform banner",
    type: "Banner",
    category: "Homepage",
    status: "Published",
    updated: "01 Nov 2026",
  },
  {
    id: 5,
    title: "Freelancer payment guidelines",
    type: "Help Article",
    category: "Freelancers",
    status: "Archived",
    updated: "28 Oct 2026",
  },
];

export default function AdminContentPage() {
  const [items, setItems] = useState(initialContent);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [title, setTitle] = useState("");
  const [type, setType] = useState("Announcement");
  const [category, setCategory] = useState("Platform");
  const [status, setStatus] = useState<ContentItem["status"]>("Draft");

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const matchesSearch =
        item.title.toLowerCase().includes(search.toLowerCase()) ||
        item.category.toLowerCase().includes(search.toLowerCase());

      const matchesFilter = filter === "All" || item.status === filter;

      return matchesSearch && matchesFilter;
    });
  }, [items, search, filter]);

  const published = items.filter((item) => item.status === "Published").length;
  const drafts = items.filter((item) => item.status === "Draft").length;
  const archived = items.filter((item) => item.status === "Archived").length;

  function openNewForm() {
    setEditingId(null);
    setTitle("");
    setType("Announcement");
    setCategory("Platform");
    setStatus("Draft");
    setShowForm(true);
  }

  function openEditForm(item: ContentItem) {
    setEditingId(item.id);
    setTitle(item.title);
    setType(item.type);
    setCategory(item.category);
    setStatus(item.status);
    setShowForm(true);
  }

  function saveContent() {
    if (!title.trim()) {
      alert("Please enter a content title.");
      return;
    }

    if (editingId !== null) {
      setItems((previous) =>
        previous.map((item) =>
          item.id === editingId
            ? { ...item, title, type, category, status, updated: "04 Nov 2026" }
            : item
        )
      );
    } else {
      setItems((previous) => [
        {
          id: Date.now(),
          title,
          type,
          category,
          status,
          updated: "04 Nov 2026",
        },
        ...previous,
      ]);
    }

    setShowForm(false);
  }

  function deleteContent(id: number) {
    if (confirm("Are you sure you want to delete this content?")) {
      setItems((previous) => previous.filter((item) => item.id !== id));
    }
  }

  function changeStatus(id: number, newStatus: ContentItem["status"]) {
    setItems((previous) =>
      previous.map((item) =>
        item.id === id ? { ...item, status: newStatus } : item
      )
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 p-4 md:p-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <p className="text-sm font-semibold text-blue-600">
              ADMINISTRATION / CONTENT
            </p>
            <h1 className="mt-2 text-3xl font-bold text-slate-900">
              Content Management
            </h1>
            <p className="mt-2 text-slate-500">
              Manage announcements, FAQs, banners and platform information.
            </p>
            <p className="mt-4 rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm text-amber-800">
              Demo data only: content changes are temporary and are not published live.
            </p>
          </div>

          <button
            onClick={openNewForm}
            className="rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700"
          >
            + Create Content
          </button>
        </div>

        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: "Total Content", value: items.length, color: "text-blue-600" },
            { label: "Published", value: published, color: "text-green-600" },
            { label: "Drafts", value: drafts, color: "text-amber-600" },
            { label: "Archived", value: archived, color: "text-slate-600" },
          ].map((stat) => (
            <div key={stat.label} className="rounded-2xl border bg-white p-5 shadow-sm">
              <p className="text-sm text-slate-500">{stat.label}</p>
              <h2 className={`mt-3 text-3xl font-bold ${stat.color}`}>
                {stat.value}
              </h2>
            </div>
          ))}
        </div>

        <section className="rounded-2xl border bg-white p-5 shadow-sm">
          <div className="mb-6 flex flex-col gap-3 md:flex-row">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search content..."
              className="flex-1 rounded-xl border px-4 py-3 outline-none focus:border-blue-500"
            />

            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="rounded-xl border px-4 py-3 outline-none"
            >
              <option>All</option>
              <option>Published</option>
              <option>Draft</option>
              <option>Archived</option>
            </select>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[750px] text-left">
              <thead>
                <tr className="border-b bg-slate-50 text-sm text-slate-500">
                  <th className="p-4">Content Title</th>
                  <th className="p-4">Type</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Last Updated</th>
                  <th className="p-4">Actions</th>
                </tr>
              </thead>

              <tbody>
                {filteredItems.map((item) => (
                  <tr key={item.id} className="border-b text-sm">
                    <td className="p-4 font-semibold text-slate-800">
                      {item.title}
                    </td>
                    <td className="p-4 text-slate-600">{item.type}</td>
                    <td className="p-4 text-slate-600">{item.category}</td>
                    <td className="p-4">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          item.status === "Published"
                            ? "bg-green-100 text-green-700"
                            : item.status === "Draft"
                            ? "bg-amber-100 text-amber-700"
                            : "bg-slate-100 text-slate-600"
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td className="p-4 text-slate-500">{item.updated}</td>
                    <td className="p-4">
                      <div className="flex flex-wrap gap-2">
                        <button
                          onClick={() => openEditForm(item)}
                          className="rounded-lg bg-blue-50 px-3 py-2 text-xs font-semibold text-blue-700"
                        >
                          Edit
                        </button>

                        <select
                          value={item.status}
                          onChange={(e) =>
                            changeStatus(
                              item.id,
                              e.target.value as ContentItem["status"]
                            )
                          }
                          className="rounded-lg border px-2 py-2 text-xs"
                        >
                          <option>Published</option>
                          <option>Draft</option>
                          <option>Archived</option>
                        </select>

                        <button
                          onClick={() => deleteContent(item.id)}
                          className="rounded-lg bg-red-50 px-3 py-2 text-xs font-semibold text-red-600"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

                {filteredItems.length === 0 && (
                  <tr>
                    <td colSpan={6} className="p-10 text-center text-slate-500">
                      No content found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

        {showForm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div role="dialog" aria-modal="true" aria-label={editingId !== null ? "Edit Content" : "Create Content"} className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl">
              <div className="mb-5 flex items-center justify-between">
                <h2 className="text-xl font-bold text-slate-900">
                  {editingId !== null ? "Edit Content" : "Create Content"}
                </h2>
                <button
                  onClick={() => setShowForm(false)}
                  className="text-2xl text-slate-400"
                >
                  ×
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="mb-2 block text-sm font-semibold">
                    Content Title
                  </label>
                  <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter content title"
                    className="w-full rounded-xl border px-4 py-3"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold">
                    Content Type
                  </label>
                  <select
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    className="w-full rounded-xl border px-4 py-3"
                  >
                    <option>Announcement</option>
                    <option>FAQ</option>
                    <option>Help Article</option>
                    <option>Banner</option>
                    <option>Page</option>
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold">
                    Category
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full rounded-xl border px-4 py-3"
                  >
                    <option>Platform</option>
                    <option>Candidates</option>
                    <option>Students</option>
                    <option>Freelancers</option>
                    <option>Companies</option>
                    <option>Homepage</option>
                    <option>Security</option>
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold">
                    Status
                  </label>
                  <select
                    value={status}
                    onChange={(e) =>
                      setStatus(e.target.value as ContentItem["status"])
                    }
                    className="w-full rounded-xl border px-4 py-3"
                  >
                    <option>Draft</option>
                    <option>Published</option>
                    <option>Archived</option>
                  </select>
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    onClick={saveContent}
                    className="flex-1 rounded-xl bg-blue-600 px-4 py-3 font-semibold text-white hover:bg-blue-700"
                  >
                    Save Content
                  </button>
                  <button
                    onClick={() => setShowForm(false)}
                    className="rounded-xl border px-5 py-3 font-semibold text-slate-600"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}