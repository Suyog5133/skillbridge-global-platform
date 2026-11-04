"use client";

import { useMemo, useState } from "react";

type InterviewStatus = "Scheduled" | "Completed" | "Cancelled";

type Interview = {
  id: number;
  candidate: string;
  email: string;
  position: string;
  date: string;
  time: string;
  duration: string;
  type: string;
  meetingLink: string;
  interviewer: string;
  status: InterviewStatus;
};

const initialInterviews: Interview[] = [
  {
    id: 1,
    candidate: "Alex Morgan",
    email: "alex.morgan@example.com",
    position: "Frontend Developer",
    date: "2026-11-05",
    time: "10:00",
    duration: "30 Minutes",
    type: "Online",
    meetingLink: "https://meet.google.com/",
    interviewer: "HR Manager",
    status: "Scheduled",
  },
  {
    id: 2,
    candidate: "Priya Sharma",
    email: "priya.sharma@example.com",
    position: "Cybersecurity Analyst",
    date: "2026-11-06",
    time: "14:00",
    duration: "45 Minutes",
    type: "Online",
    meetingLink: "https://meet.google.com/",
    interviewer: "Security Team",
    status: "Scheduled",
  },
  {
    id: 3,
    candidate: "Daniel Smith",
    email: "daniel.smith@example.com",
    position: "UI/UX Designer",
    date: "2026-10-28",
    time: "11:30",
    duration: "30 Minutes",
    type: "Online",
    meetingLink: "https://meet.google.com/",
    interviewer: "Design Lead",
    status: "Completed",
  },
];

const statusStyles: Record<InterviewStatus, string> = {
  Scheduled: "bg-blue-100 text-blue-700",
  Completed: "bg-green-100 text-green-700",
  Cancelled: "bg-red-100 text-red-700",
};

const emptyForm = {
  candidate: "",
  email: "",
  position: "",
  date: "",
  time: "",
  duration: "30 Minutes",
  type: "Online",
  meetingLink: "",
  interviewer: "",
};

export default function InterviewsPage() {
  const [interviews, setInterviews] =
    useState<Interview[]>(initialInterviews);

  const [form, setForm] = useState(emptyForm);
  const [showForm, setShowForm] = useState(false);
  const [selected, setSelected] = useState<Interview | null>(null);
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [message, setMessage] = useState("");

  const counts = {
    All: interviews.length,
    Scheduled: interviews.filter((i) => i.status === "Scheduled").length,
    Completed: interviews.filter((i) => i.status === "Completed").length,
    Cancelled: interviews.filter((i) => i.status === "Cancelled").length,
  };

  const filteredInterviews = useMemo(() => {
    return interviews.filter((interview) => {
      const searchText = search.toLowerCase();

      const matchesSearch =
        interview.candidate.toLowerCase().includes(searchText) ||
        interview.position.toLowerCase().includes(searchText) ||
        interview.email.toLowerCase().includes(searchText);

      const matchesFilter =
        filter === "All" || interview.status === filter;

      return matchesSearch && matchesFilter;
    });
  }, [interviews, search, filter]);

  function updateField(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    setForm((previous) => ({
      ...previous,
      [e.target.name]: e.target.value,
    }));
  }

  function showMessage(text: string) {
    setMessage(text);
    setTimeout(() => setMessage(""), 3000);
  }

  function scheduleInterview(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const newInterview: Interview = {
      id: Date.now(),
      ...form,
      status: "Scheduled",
    };

    setInterviews((previous) => [newInterview, ...previous]);
    setForm(emptyForm);
    setShowForm(false);

    showMessage("Interview scheduled successfully in this demo.");
  }

  function updateStatus(id: number, status: InterviewStatus) {
    setInterviews((previous) =>
      previous.map((interview) =>
        interview.id === id
          ? { ...interview, status }
          : interview
      )
    );

    setSelected((previous) =>
      previous?.id === id
        ? { ...previous, status }
        : previous
    );

    showMessage(`Interview marked as ${status}.`);
  }

  function deleteInterview(id: number) {
    if (!window.confirm("Delete this interview?")) return;

    setInterviews((previous) =>
      previous.filter((interview) => interview.id !== id)
    );

    setSelected(null);
    showMessage("Interview deleted from this demo.");
  }

  return (
    <main className="min-h-screen bg-slate-50 p-5 sm:p-8">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <p className="text-sm font-bold tracking-wider text-blue-600">
              SKILLBRIDGE GLOBAL
            </p>

            <h1 className="mt-2 text-3xl font-bold text-slate-900">
              Interview Scheduling
            </h1>

            <p className="mt-2 text-slate-500">
              Schedule and manage candidate interviews.
            </p>
          </div>

          <button
            onClick={() => setShowForm(true)}
            className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
          >
            + Schedule Interview
          </button>
        </div>

        {/* Message */}
        {message && (
          <div className="mt-6 rounded-xl border border-green-200 bg-green-50 p-4 text-sm font-semibold text-green-700">
            {message}
          </div>
        )}

        {/* Statistics */}
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {[
            { label: "Total Interviews", value: counts.All },
            { label: "Scheduled", value: counts.Scheduled },
            { label: "Completed", value: counts.Completed },
            { label: "Cancelled", value: counts.Cancelled },
          ].map((item) => (
            <div
              key={item.label}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <p className="text-sm text-slate-500">{item.label}</p>
              <h2 className="mt-2 text-3xl font-bold text-slate-900">
                {item.value}
              </h2>
            </div>
          ))}
        </div>

        {/* Interviews */}
        <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <h2 className="text-xl font-bold text-slate-900">
                All Interviews
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Review upcoming and previous interviews.
              </p>
            </div>

            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search candidate or position..."
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500 sm:max-w-sm"
            />
          </div>

          {/* Filters */}
          <div className="mt-6 flex flex-wrap gap-2">
            {["All", "Scheduled", "Completed", "Cancelled"].map((status) => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`rounded-full px-4 py-2 text-sm font-semibold ${
                  filter === status
                    ? "bg-blue-600 text-white"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {status} ({counts[status as keyof typeof counts]})
              </button>
            ))}
          </div>

          {/* Interview Cards */}
          <div className="mt-6 grid gap-4 lg:grid-cols-2">
            {filteredInterviews.map((interview) => (
              <div
                key={interview.id}
                className="rounded-2xl border border-slate-200 p-5 transition hover:border-blue-300 hover:shadow-sm"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-bold text-slate-900">
                      {interview.candidate}
                    </h3>
                    <p className="mt-1 text-sm text-slate-500">
                      {interview.email}
                    </p>
                  </div>

                  <span
                    className={`rounded-full px-3 py-1 text-xs font-bold ${statusStyles[interview.status]}`}
                  >
                    {interview.status}
                  </span>
                </div>

                <div className="mt-5 space-y-3 text-sm">
                  <p>
                    <span className="font-semibold text-slate-700">
                      Position:{" "}
                    </span>
                    <span className="text-slate-600">
                      {interview.position}
                    </span>
                  </p>

                  <p>
                    <span className="font-semibold text-slate-700">
                      Date:{" "}
                    </span>
                    <span className="text-slate-600">
                      {interview.date}
                    </span>
                  </p>

                  <p>
                    <span className="font-semibold text-slate-700">
                      Time:{" "}
                    </span>
                    <span className="text-slate-600">
                      {interview.time}
                    </span>
                  </p>

                  <p>
                    <span className="font-semibold text-slate-700">
                      Duration:{" "}
                    </span>
                    <span className="text-slate-600">
                      {interview.duration}
                    </span>
                  </p>

                  <p>
                    <span className="font-semibold text-slate-700">
                      Interviewer:{" "}
                    </span>
                    <span className="text-slate-600">
                      {interview.interviewer}
                    </span>
                  </p>
                </div>

                <div className="mt-5 flex flex-wrap gap-2">
                  <button
                    onClick={() => setSelected(interview)}
                    className="rounded-lg bg-blue-50 px-4 py-2 text-xs font-bold text-blue-700 hover:bg-blue-100"
                  >
                    View Details
                  </button>

                  {interview.status === "Scheduled" && (
                    <button
                      onClick={() =>
                        updateStatus(interview.id, "Completed")
                      }
                      className="rounded-lg bg-green-50 px-4 py-2 text-xs font-bold text-green-700 hover:bg-green-100"
                    >
                      Mark Completed
                    </button>
                  )}

                  {interview.status === "Scheduled" && (
                    <button
                      onClick={() =>
                        updateStatus(interview.id, "Cancelled")
                      }
                      className="rounded-lg bg-red-50 px-4 py-2 text-xs font-bold text-red-700 hover:bg-red-100"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </div>
            ))}

            {filteredInterviews.length === 0 && (
              <div className="py-12 text-center text-slate-500 lg:col-span-2">
                No interviews found.
              </div>
            )}
          </div>
        </section>

        <p className="mt-6 text-center text-xs text-slate-400">
          Demo only. Real calendar invitations, email notifications and
          video meeting integration will be connected later.
        </p>
      </div>

      {/* Schedule Interview Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-900/50 p-4">
          <div role="dialog" aria-modal="true" aria-label="Schedule New Interview" className="my-8 w-full max-w-2xl rounded-2xl bg-white p-6 shadow-xl">

            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-slate-900">
                Schedule New Interview
              </h2>

              <button
                onClick={() => setShowForm(false)}
                className="text-2xl text-slate-400 hover:text-slate-700"
                aria-label="Close"
              >
                ×
              </button>
            </div>

            <form onSubmit={scheduleInterview} className="mt-6 space-y-4">

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Candidate Name *
                  </label>
                  <input
                    required
                    name="candidate"
                    value={form.candidate}
                    onChange={updateField}
                    placeholder="Enter candidate name"
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Candidate Email *
                  </label>
                  <input
                    required
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={updateField}
                    placeholder="candidate@example.com"
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Job Position *
                  </label>
                  <input
                    required
                    name="position"
                    value={form.position}
                    onChange={updateField}
                    placeholder="e.g. Software Developer"
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Interview Date *
                  </label>
                  <input
                    required
                    type="date"
                    name="date"
                    value={form.date}
                    onChange={updateField}
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Interview Time *
                  </label>
                  <input
                    required
                    type="time"
                    name="time"
                    value={form.time}
                    onChange={updateField}
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Duration
                  </label>
                  <select
                    name="duration"
                    value={form.duration}
                    onChange={updateField}
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
                  >
                    <option>15 Minutes</option>
                    <option>30 Minutes</option>
                    <option>45 Minutes</option>
                    <option>60 Minutes</option>
                    <option>90 Minutes</option>
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Interview Type
                  </label>
                  <select
                    name="type"
                    value={form.type}
                    onChange={updateField}
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
                  >
                    <option>Online</option>
                    <option>In-person</option>
                    <option>Phone</option>
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Interviewer
                  </label>
                  <input
                    name="interviewer"
                    value={form.interviewer}
                    onChange={updateField}
                    placeholder="Enter interviewer name"
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Meeting Link
                  </label>
                  <input
                    type="url"
                    name="meetingLink"
                    value={form.meetingLink}
                    onChange={updateField}
                    placeholder="https://meet.google.com/..."
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="flex flex-col-reverse justify-end gap-3 pt-4 sm:flex-row">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="rounded-xl border border-slate-300 px-5 py-3 font-semibold text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
                >
                  Schedule Interview
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Interview Details Modal */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4">
          <div role="dialog" aria-modal="true" aria-label="Interview Details" className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl">

            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-slate-900">
                Interview Details
              </h2>

              <button
                onClick={() => setSelected(null)}
                className="text-2xl text-slate-400 hover:text-slate-700"
                aria-label="Close"
              >
                ×
              </button>
            </div>

            <div className="mt-5 space-y-3 text-sm text-slate-600">
              <p><strong>Candidate:</strong> {selected.candidate}</p>
              <p><strong>Email:</strong> {selected.email}</p>
              <p><strong>Position:</strong> {selected.position}</p>
              <p><strong>Date:</strong> {selected.date}</p>
              <p><strong>Time:</strong> {selected.time}</p>
              <p><strong>Duration:</strong> {selected.duration}</p>
              <p><strong>Type:</strong> {selected.type}</p>
              <p><strong>Interviewer:</strong> {selected.interviewer || "Not specified"}</p>
              <p><strong>Status:</strong> {selected.status}</p>
            </div>

            {selected.meetingLink && (
              <a
                href={selected.meetingLink}
                target="_blank"
                rel="noreferrer"
                className="mt-5 block rounded-xl bg-blue-50 p-3 text-center font-semibold text-blue-700 hover:bg-blue-100"
              >
                Open Meeting Link ↗
              </a>
            )}

            <button
              onClick={() => deleteInterview(selected.id)}
              className="mt-5 w-full rounded-xl border border-red-200 px-5 py-3 font-semibold text-red-600 hover:bg-red-50"
            >
              Delete Interview
            </button>

            <button
              onClick={() => setSelected(null)}
              className="mt-3 w-full rounded-xl bg-slate-100 px-5 py-3 font-semibold text-slate-700 hover:bg-slate-200"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </main>
  );
}