"use client";

import { useState } from "react";

const monthlyData = [
  { month: "May", users: 35, jobs: 20 },
  { month: "Jun", users: 48, jobs: 28 },
  { month: "Jul", users: 65, jobs: 40 },
  { month: "Aug", users: 80, jobs: 55 },
  { month: "Sep", users: 95, jobs: 68 },
  { month: "Oct", users: 120, jobs: 85 },
];

const countries = [
  { name: "India", users: 1250, percent: 85 },
  { name: "United States", users: 850, percent: 68 },
  { name: "United Kingdom", users: 620, percent: 52 },
  { name: "Canada", users: 480, percent: 40 },
  { name: "Australia", users: 350, percent: 30 },
  { name: "Germany", users: 270, percent: 23 },
];

const activities = [
  {
    title: "New company registered",
    description: "TechNova Solutions joined SkillBridge Global.",
    time: "10 minutes ago",
    color: "bg-blue-500",
  },
  {
    title: "New job published",
    description: "Frontend Developer job was submitted.",
    time: "35 minutes ago",
    color: "bg-green-500",
  },
  {
    title: "New candidate registered",
    description: "A new candidate created a profile.",
    time: "1 hour ago",
    color: "bg-purple-500",
  },
  {
    title: "Job application received",
    description: "A candidate applied for a remote position.",
    time: "2 hours ago",
    color: "bg-orange-500",
  },
];

export default function AdminAnalyticsPage() {
  const [period, setPeriod] = useState("6 Months");

  const stats = [
    {
      title: "Total Users",
      value: "4,820",
      change: "+18.5%",
      icon: "👥",
      color: "bg-blue-50 text-blue-600",
    },
    {
      title: "Registered Companies",
      value: "1,240",
      change: "+12.8%",
      icon: "🏢",
      color: "bg-purple-50 text-purple-600",
    },
    {
      title: "Active Jobs",
      value: "2,650",
      change: "+15.2%",
      icon: "💼",
      color: "bg-green-50 text-green-600",
    },
    {
      title: "Applications",
      value: "8,940",
      change: "+24.6%",
      icon: "📄",
      color: "bg-orange-50 text-orange-600",
    },
  ];

  const userTypes = [
    { name: "Candidates", count: 2150, percent: 45, color: "bg-blue-600" },
    { name: "Students", count: 1450, percent: 30, color: "bg-purple-600" },
    { name: "Freelancers", count: 850, percent: 18, color: "bg-green-600" },
    { name: "Companies", count: 370, percent: 7, color: "bg-orange-500" },
  ];

  return (
    <main className="min-h-screen bg-slate-50 p-4 md:p-8">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <p className="text-sm font-bold text-blue-600">
              ADMIN CONTROL PANEL
            </p>

            <h1 className="mt-2 text-3xl font-bold text-slate-900">
              Platform Analytics
            </h1>

            <p className="mt-2 text-slate-500">
              Monitor worldwide platform performance and growth.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <select
              value={period}
              onChange={(e) => setPeriod(e.target.value)}
              className="rounded-lg border bg-white px-4 py-3 text-sm font-semibold text-slate-700"
            >
              <option>6 Months</option>
              <option>12 Months</option>
              <option>This Year</option>
            </select>

            <a
              href="/dashboard/admin"
              className="rounded-lg border bg-white px-5 py-3 font-semibold text-slate-700"
            >
              ← Dashboard
            </a>
          </div>
        </div>

        {/* Statistics */}
        <div className="mb-8 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.title}
              className="rounded-2xl border bg-white p-6 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500">{stat.title}</p>
                  <h2 className="mt-3 text-3xl font-bold text-slate-900">
                    {stat.value}
                  </h2>
                </div>

                <div className={`rounded-xl p-4 text-2xl ${stat.color}`}>
                  {stat.icon}
                </div>
              </div>

              <p className="mt-4 text-sm font-semibold text-green-600">
                {stat.change} <span className="font-normal text-slate-400">growth (demo)</span>
              </p>
            </div>
          ))}
        </div>

        {/* Growth Chart */}
        <div className="mb-8 grid grid-cols-1 gap-6 lg:grid-cols-3">

          <section className="rounded-2xl border bg-white p-6 shadow-sm lg:col-span-2">
            <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  Platform Growth
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Monthly user and job growth overview
                </p>
              </div>

              <div className="flex gap-4 text-sm">
                <span className="flex items-center gap-2 text-slate-600">
                  <span className="h-3 w-3 rounded-full bg-blue-600" />
                  Users
                </span>

                <span className="flex items-center gap-2 text-slate-600">
                  <span className="h-3 w-3 rounded-full bg-green-500" />
                  Jobs
                </span>
              </div>
            </div>

            <div className="flex h-64 items-end justify-around gap-3 border-b border-slate-200 px-2">
              {monthlyData.map((item) => (
                <div
                  key={item.month}
                  className="flex h-full flex-1 items-end justify-center gap-1"
                >
                  <div
                    title={`Users: ${item.users}`}
                    style={{ height: `${(item.users / 130) * 100}%` }}
                    className="w-5 rounded-t-md bg-blue-600 sm:w-8"
                  />

                  <div
                    title={`Jobs: ${item.jobs}`}
                    style={{ height: `${(item.jobs / 130) * 100}%` }}
                    className="w-5 rounded-t-md bg-green-500 sm:w-8"
                  />
                </div>
              ))}
            </div>

            <div className="mt-3 flex justify-around text-xs font-medium text-slate-500">
              {monthlyData.map((item) => (
                <span key={item.month}>{item.month}</span>
              ))}
            </div>
          </section>

          {/* User Distribution */}
          <section className="rounded-2xl border bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900">
              User Distribution
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Registered account types
            </p>

            <div className="mt-7 space-y-6">
              {userTypes.map((user) => (
                <div key={user.name}>
                  <div className="mb-2 flex justify-between text-sm">
                    <span className="font-semibold text-slate-700">
                      {user.name}
                    </span>

                    <span className="text-slate-500">
                      {user.count.toLocaleString("en-IN")}
                    </span>
                  </div>

                  <div className="h-3 overflow-hidden rounded-full bg-slate-100">
                    <div
                      className={`h-full rounded-full ${user.color}`}
                      style={{ width: `${user.percent}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Global Users */}
        <section className="mb-8 rounded-2xl border bg-white p-6 shadow-sm">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-slate-900">
              Global User Distribution
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Sample user registrations by country.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {countries.map((country) => (
              <div key={country.name}>
                <div className="mb-2 flex justify-between">
                  <span className="font-semibold text-slate-700">
                    {country.name}
                  </span>

                  <span className="text-sm text-slate-500">
                    {country.users.toLocaleString("en-IN")} users
                  </span>
                </div>

                <div className="h-3 overflow-hidden rounded-full bg-slate-100">
                  <div
                    className="h-full rounded-full bg-blue-600"
                    style={{ width: `${country.percent}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Recent Activity */}
        <section className="rounded-2xl border bg-white p-6 shadow-sm">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-slate-900">
              Recent Platform Activity
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Latest platform events (sample data).
            </p>
          </div>

          <div className="space-y-6">
            {activities.map((activity, index) => (
              <div key={index} className="flex gap-4">
                <div
                  className={`mt-1 h-3 w-3 shrink-0 rounded-full ${activity.color}`}
                />

                <div className="flex-1">
                  <h3 className="font-semibold text-slate-800">
                    {activity.title}
                  </h3>

                  <p className="mt-1 text-sm text-slate-500">
                    {activity.description}
                  </p>

                  <p className="mt-1 text-xs text-slate-400">
                    {activity.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <p className="mt-8 text-center text-xs text-slate-400">
          SkillBridge Global · Admin Analytics Dashboard
        </p>
      </div>
    </main>
  );
}