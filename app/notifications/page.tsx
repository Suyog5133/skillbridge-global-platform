"use client";

import { useState } from "react";

type Notification = {
  id: number;
  title: string;
  description: string;
  time: string;
  category: "Application" | "Message" | "Job" | "System";
  read: boolean;
  icon: string;
};

const initialNotifications: Notification[] = [
  {
    id: 1,
    title: "Application Shortlisted",
    description: "Your application for Frontend Developer at Google has been shortlisted.",
    time: "10 minutes ago",
    category: "Application",
    read: false,
    icon: "⭐",
  },
  {
    id: 2,
    title: "New Message",
    description: "Sarah Johnson from Google sent you a message.",
    time: "30 minutes ago",
    category: "Message",
    read: false,
    icon: "💬",
  },
  {
    id: 3,
    title: "New Job Opportunity",
    description: "A new Cyber Security Analyst position matches your skills.",
    time: "2 hours ago",
    category: "Job",
    read: false,
    icon: "💼",
  },
  {
    id: 4,
    title: "Application Received",
    description: "Your application for Software Engineer Intern was received.",
    time: "Yesterday",
    category: "Application",
    read: true,
    icon: "📄",
  },
  {
    id: 5,
    title: "Profile Reminder",
    description: "Complete your profile to improve your hiring opportunities.",
    time: "Yesterday",
    category: "System",
    read: true,
    icon: "👤",
  },
  {
    id: 6,
    title: "Welcome to SkillBridge Global",
    description: "Explore global jobs, internships and freelance opportunities.",
    time: "2 days ago",
    category: "System",
    read: true,
    icon: "🌍",
  },
];

const filters = ["All", "Unread", "Application", "Message", "Job", "System"];

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(initialNotifications);
  const [activeFilter, setActiveFilter] = useState("All");

  const unreadCount = notifications.filter((n) => !n.read).length;

  const filteredNotifications = notifications.filter((notification) => {
    if (activeFilter === "Unread") return !notification.read;
    if (activeFilter === "All") return true;
    return notification.category === activeFilter;
  });

  function markAsRead(id: number) {
    setNotifications((previous) =>
      previous.map((notification) =>
        notification.id === id
          ? { ...notification, read: true }
          : notification
      )
    );
  }

  function markAllAsRead() {
    setNotifications((previous) =>
      previous.map((notification) => ({ ...notification, read: true }))
    );
  }

  function deleteNotification(id: number) {
    const notification = notifications.find((item) => item.id === id);
    if (
      !notification ||
      !window.confirm(`Delete the notification "${notification.title}"?`)
    ) {
      return;
    }
    setNotifications((previous) =>
      previous.filter((notification) => notification.id !== id)
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 p-5 sm:p-8">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <p className="mb-2 text-sm font-bold tracking-wider text-blue-600">
              SKILLBRIDGE GLOBAL
            </p>
            <h1 className="text-3xl font-bold text-slate-900">
              Notifications
            </h1>
            <p className="mt-2 text-slate-500">
              Stay updated with your applications, messages and opportunities.
            </p>
          </div>

          <button
            onClick={markAllAsRead}
            disabled={unreadCount === 0}
            className="rounded-xl border border-blue-600 px-5 py-3 font-semibold text-blue-600 transition hover:bg-blue-50 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Mark all as read
          </button>
        </div>

        <div className="mb-7 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">Total Notifications</p>
            <h2 className="mt-2 text-3xl font-bold text-slate-900">
              {notifications.length}
            </h2>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">Unread Notifications</p>
            <h2 className="mt-2 text-3xl font-bold text-blue-600">
              {unreadCount}
            </h2>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">Read Notifications</p>
            <h2 className="mt-2 text-3xl font-bold text-green-600">
              {notifications.length - unreadCount}
            </h2>
          </div>
        </div>

        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 p-5 sm:p-6">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  Recent Activity
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  You have {unreadCount} unread notifications.
                </p>
              </div>
              <span className="rounded-full bg-blue-50 px-3 py-1 text-sm font-semibold text-blue-700">
                {unreadCount} New
              </span>
            </div>

            <div className="flex flex-wrap gap-2">
              {filters.map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                    activeFilter === filter
                      ? "bg-blue-600 text-white"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          <div>
            {filteredNotifications.map((notification) => (
              <div
                key={notification.id}
                className={`flex flex-col gap-4 border-b border-slate-100 p-5 transition hover:bg-slate-50 sm:flex-row sm:items-start ${
                  !notification.read ? "bg-blue-50/40" : "bg-white"
                }`}
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-2xl">
                  {notification.icon}
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-bold text-slate-900">
                      {notification.title}
                    </h3>

                    {!notification.read && (
                      <span className="h-2 w-2 rounded-full bg-blue-600" />
                    )}

                    <span className="rounded-full bg-slate-100 px-2 py-1 text-xs text-slate-600">
                      {notification.category}
                    </span>
                  </div>

                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    {notification.description}
                  </p>

                  <p className="mt-2 text-xs text-slate-400">
                    {notification.time}
                  </p>
                </div>

                <div className="flex shrink-0 items-center gap-3">
                  {!notification.read && (
                    <button
                      onClick={() => markAsRead(notification.id)}
                      className="text-sm font-semibold text-blue-600 hover:text-blue-800"
                    >
                      Mark read
                    </button>
                  )}

                  <button
                    onClick={() => deleteNotification(notification.id)}
                    className="text-sm font-semibold text-red-500 hover:text-red-700"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}

            {filteredNotifications.length === 0 && (
              <div className="p-12 text-center">
                <div className="mb-3 text-4xl">🔔</div>
                <h3 className="font-bold text-slate-800">
                  No notifications found
                </h3>
                <p className="mt-2 text-sm text-slate-500">
                  There are no notifications in this category.
                </p>
              </div>
            )}
          </div>
        </section>

        <p className="mt-5 text-center text-xs text-slate-400">
          Demo notifications · Real notifications will be connected to the backend.
        </p>
      </div>
    </main>
  );
}