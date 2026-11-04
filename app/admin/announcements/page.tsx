"use client";

import { useState } from "react";

export default function AdminAnnouncementsPage() {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [announcements, setAnnouncements] = useState([
    {
      id: 1,
      title: "Welcome to SkillBridge Global",
      message: "Explore global career opportunities.",
      status: "Published",
    },
    {
      id: 2,
      title: "Complete Your Profile",
      message: "Update your profile to improve your chances.",
      status: "Draft",
    },
  ]);

  function addAnnouncement() {
    if (!title.trim() || !message.trim()) {
      alert("Please enter title and message.");
      return;
    }

    setAnnouncements((previous) => [
      ...previous,
      {
        id: Date.now(),
        title,
        message,
        status: "Published",
      },
    ]);

    setTitle("");
    setMessage("");
  }

  function deleteAnnouncement(id: number) {
    const announcement = announcements.find((item) => item.id === id);
    if (!announcement || !window.confirm(`Delete announcement "${announcement.title}"?`)) {
      return;
    }
    setAnnouncements((previous) =>
      previous.filter((item) => item.id !== id)
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 p-6 md:p-10">
      <div className="mx-auto max-w-6xl">
        <p className="text-sm font-bold text-blue-600">
          ADMIN / COMMUNICATION
        </p>

        <h1 className="mt-2 text-3xl font-bold text-slate-900">
          Platform Announcements
        </h1>

        <p className="mt-2 text-slate-500">
          Manage announcements for SkillBridge Global users.
        </p>

        <p className="mt-4 rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm text-amber-800">
          Demo data only: announcements are temporary and are not sent to users.
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {[
            ["Total", announcements.length],
            ["Published", announcements.filter((a) => a.status === "Published").length],
            ["Drafts", announcements.filter((a) => a.status === "Draft").length],
          ].map(([label, value]) => (
            <div key={label} className="rounded-2xl border bg-white p-6 shadow-sm">
              <p className="text-slate-500">{label}</p>
              <h2 className="mt-2 text-3xl font-bold text-blue-600">
                {value}
              </h2>
            </div>
          ))}
        </div>

        <section className="mt-8 rounded-2xl border bg-white p-6 shadow-sm">
          <h2 className="mb-5 text-xl font-bold">Create Announcement</h2>

          <div className="space-y-4">
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Announcement title"
              className="w-full rounded-xl border p-3"
            />

            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Write announcement message"
              rows={4}
              className="w-full rounded-xl border p-3"
            />

            <button
              onClick={addAnnouncement}
              className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
            >
              + Publish Announcement
            </button>
          </div>
        </section>

        <section className="mt-8 rounded-2xl border bg-white p-6 shadow-sm">
          <h2 className="mb-5 text-xl font-bold">All Announcements</h2>

          <div className="space-y-4">
            {announcements.map((item) => (
              <div
                key={item.id}
                className="flex flex-col justify-between gap-4 rounded-xl border p-5 sm:flex-row sm:items-center"
              >
                <div>
                  <h3 className="font-bold text-slate-900">{item.title}</h3>
                  <p className="mt-2 text-sm text-slate-600">{item.message}</p>
                  <span className="mt-3 inline-block rounded-full bg-green-100 px-3 py-1 text-xs text-green-700">
                    {item.status}
                  </span>
                </div>

                <button
                  onClick={() => deleteAnnouncement(item.id)}
                  className="rounded-lg bg-red-50 px-4 py-2 text-sm font-semibold text-red-600"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}