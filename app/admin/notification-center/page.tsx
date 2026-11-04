
"use client";

import { useState } from "react";

type Announcement = {
  id: number;
  title: string;
  message: string;
  audience: string;
  priority: string;
  status: string;
  date: string;
};

export default function NotificationCenterPage() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([
    {
      id: 1,
      title: "Welcome to SkillBridge Global",
      message: "Discover jobs, internships and freelance opportunities worldwide.",
      audience: "Everyone",
      priority: "Normal",
      status: "Published",
      date: "04 Nov 2026",
    },
    {
      id: 2,
      title: "New Internship Opportunities",
      message: "Explore new internship opportunities from international companies.",
      audience: "Students",
      priority: "High",
      status: "Published",
      date: "03 Nov 2026",
    },
  ]);

  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [audience, setAudience] = useState("Everyone");
  const [priority, setPriority] = useState("Normal");
  const [notice, setNotice] = useState("");

  const publishAnnouncement = () => {
    if (!title.trim() || !message.trim()) {
      setNotice("Please enter both title and message.");
      return;
    }

    const newAnnouncement: Announcement = {
      id: Date.now(),
      title: title.trim(),
      message: message.trim(),
      audience,
      priority,
      status: "Published",
      date: new Date().toLocaleDateString(),
    };

    setAnnouncements((current) => [newAnnouncement, ...current]);
    setTitle("");
    setMessage("");
    setNotice("Demo announcement published successfully.");
  };

  const deleteAnnouncement = (id: number) => {
    const announcement = announcements.find((item) => item.id === id);
    if (
      !announcement ||
      !window.confirm(`Delete the "${announcement.title}" announcement from the demo list?`)
    ) {
      return;
    }

    setAnnouncements((current) =>
      current.filter((item) => item.id !== id)
    );
    setNotice("Announcement removed from the demo list.");
  };

  const toggleStatus = (id: number) => {
    setAnnouncements((current) =>
      current.map((item) =>
        item.id === id
          ? {
              ...item,
              status: item.status === "Published" ? "Draft" : "Published",
            }
          : item
      )
    );
  };

  return (
    <main className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl">
        <p className="text-sm font-semibold text-blue-600">
          ADMINISTRATION / NOTIFICATION CENTER
        </p>

        <h1 className="mt-2 text-3xl font-bold text-slate-900">
          Global Announcements & Notifications
        </h1>

        <p className="mt-2 text-slate-500">
          Create and manage platform-wide announcements.
        </p>

        {notice && (
          <div className="mt-5 rounded-xl border border-blue-200 bg-blue-50 p-4 text-sm text-blue-700">
            {notice}
          </div>
        )}

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">Total Announcements</p>
            <h2 className="mt-2 text-3xl font-bold">{announcements.length}</h2>
          </div>

          <div className="rounded-2xl bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">Published</p>
            <h2 className="mt-2 text-3xl font-bold text-green-600">
              {announcements.filter((a) => a.status === "Published").length}
            </h2>
          </div>

          <div className="rounded-2xl bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">Drafts</p>
            <h2 className="mt-2 text-3xl font-bold text-orange-600">
              {announcements.filter((a) => a.status === "Draft").length}
            </h2>
          </div>
        </div>

        <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-bold text-slate-900">
            Create Announcement
          </h2>

          <div className="mt-5 grid gap-5 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Announcement Title
              </label>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter announcement title"
                className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Target Audience
              </label>
              <select
                value={audience}
                onChange={(e) => setAudience(e.target.value)}
                className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm"
              >
                <option>Everyone</option>
                <option>Candidates</option>
                <option>Students</option>
                <option>Freelancers</option>
                <option>Companies</option>
                <option>Admins</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Priority
              </label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm"
              >
                <option>Normal</option>
                <option>High</option>
                <option>Urgent</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Message
              </label>
              <textarea
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Write your announcement..."
                className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm"
              />
            </div>
          </div>

          <button
            onClick={publishAnnouncement}
            className="mt-5 rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-700"
          >
            Publish Announcement
          </button>
        </section>

        <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-bold text-slate-900">
            Announcement History
          </h2>

          <div className="mt-5 space-y-4">
            {announcements.map((item) => (
              <article
                key={item.id}
                className="rounded-xl border border-slate-200 p-5"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h3 className="font-bold text-slate-900">{item.title}</h3>
                    <p className="mt-2 text-sm text-slate-600">
                      {item.message}
                    </p>
                  </div>

                  <span className={`rounded-full px-3 py-1 text-xs font-semibold ${
                    item.status === "Published"
                      ? "bg-green-100 text-green-700"
                      : "bg-orange-100 text-orange-700"
                  }`}>
                    {item.status}
                  </span>
                </div>

                <div className="mt-4 flex flex-wrap gap-3 text-xs text-slate-500">
                  <span>Audience: {item.audience}</span>
                  <span>Priority: {item.priority}</span>
                  <span>Date: {item.date}</span>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  <button
                    onClick={() => toggleStatus(item.id)}
                    className="rounded-lg bg-blue-50 px-4 py-2 text-xs font-semibold text-blue-700"
                  >
                    {item.status === "Published" ? "Move to Draft" : "Publish"}
                  </button>

                  <button
                    onClick={() => deleteAnnouncement(item.id)}
                    className="rounded-lg bg-red-50 px-4 py-2 text-xs font-semibold text-red-600"
                  >
                    Delete
                  </button>
                </div>
              </article>
            ))}

            {announcements.length === 0 && (
              <p className="py-8 text-center text-sm text-slate-500">
                No announcements available.
              </p>
            )}
          </div>
        </section>

        <div className="mt-6 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
          Demo only: Announcements are stored in temporary page state. Real
          notifications require database storage, user targeting and a secure
          notification delivery service.
        </div>
      </div>
    </main>
  );
}
