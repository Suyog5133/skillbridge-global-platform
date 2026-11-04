"use client";

import { useState } from "react";

type InterviewStatus = "Scheduled" | "Completed" | "Cancelled";
type Interview = {
  id: number;
  candidate: string;
  email: string;
  company: string;
  role: string;
  interviewer: string;
  date: string;
  time: string;
  meetingLink: string;
  status: InterviewStatus;
  format: string;
};

const initialInterviews: Interview[] = [
  { id: 15001, candidate: "Aarav Sharma", email: "aarav.sharma@example.com", company: "TechNova Solutions", role: "Senior Frontend Engineer", interviewer: "Elena Torres", date: "2026-11-08", time: "10:00", meetingLink: "https://meet.example.com/tn-15001", status: "Scheduled", format: "Video" },
  { id: 15002, candidate: "Sofia Martin", email: "sofia.martin@example.com", company: "Northstar Health", role: "Product Designer", interviewer: "James Wilson", date: "2026-11-09", time: "14:30", meetingLink: "https://meet.example.com/nh-15002", status: "Scheduled", format: "Video" },
  { id: 15003, candidate: "Noah Williams", email: "noah.williams@example.com", company: "Meridian Finance Group", role: "Data Analyst", interviewer: "Priya Menon", date: "2026-11-10", time: "09:00", meetingLink: "https://meet.example.com/mf-15003", status: "Scheduled", format: "Video" },
  { id: 15004, candidate: "Amara Okafor", email: "amara.okafor@example.com", company: "Atelier Creative", role: "Marketing Manager", interviewer: "Lucas Bernard", date: "2026-11-02", time: "11:00", meetingLink: "https://meet.example.com/ac-15004", status: "Completed", format: "Video" },
  { id: 15005, candidate: "Liam Chen", email: "liam.chen@example.com", company: "LogiFlow Systems", role: "Android Developer", interviewer: "Mia Schneider", date: "2026-11-06", time: "16:00", meetingLink: "https://meet.example.com/lf-15005", status: "Cancelled", format: "Video" },
];

const statusClass: Record<InterviewStatus, string> = {
  Scheduled: "bg-blue-100 text-blue-700",
  Completed: "bg-green-100 text-green-700",
  Cancelled: "bg-slate-100 text-slate-600",
};

function displayDate(date: string) {
  if (!date) return "Not scheduled";
  return new Date(`${date}T00:00:00`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function AdminInterviewManagementPage() {
  const [interviews, setInterviews] = useState(initialInterviews);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [selected, setSelected] = useState<Interview | null>(null);
  const [schedule, setSchedule] = useState({ date: "", time: "", meetingLink: "" });
  const filtered = interviews.filter((interview) => {
    const term = search.trim().toLowerCase();
    return (!term || [interview.candidate, interview.email, interview.company, interview.role, interview.interviewer].some((value) => value.toLowerCase().includes(term))) &&
      (filter === "All" || interview.status === filter);
  });

  function openSchedule(interview: Interview) {
    setSelected(interview);
    setSchedule({
      date: interview.date,
      time: interview.time,
      meetingLink: interview.meetingLink,
    });
  }

  function saveSchedule() {
    if (!selected || !schedule.date || !schedule.time || !schedule.meetingLink.trim()) return;
    const updated = {
      ...selected,
      date: schedule.date,
      time: schedule.time,
      meetingLink: schedule.meetingLink.trim(),
      status: "Scheduled" as const,
    };
    setInterviews((items) => items.map((item) => item.id === selected.id ? updated : item));
    setSelected(null);
  }

  function cancelInterview(interview: Interview) {
    if (!window.confirm(`Cancel the interview for ${interview.candidate}?`)) return;
    const updated = { ...interview, status: "Cancelled" as const };
    setInterviews((items) => items.map((item) => item.id === interview.id ? updated : item));
    setSelected(updated);
  }

  return (
    <main className="min-h-screen bg-slate-50 p-4 md:p-8">
      <div className="mx-auto max-w-7xl space-y-6">
        <header>
          <p className="text-sm font-bold text-blue-600">SKILLBRIDGE GLOBAL · ADMIN PANEL</p>
          <h1 className="mt-2 text-3xl font-bold text-slate-900">Interview Management</h1>
          <p className="mt-2 text-slate-500">Coordinate interview schedules between candidates, companies, and hiring teams.</p>
        </header>
        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4" aria-label="Interview summary">
          {[
            ["Total Interviews", interviews.length, "text-slate-900"],
            ["Scheduled", interviews.filter((item) => item.status === "Scheduled").length, "text-blue-600"],
            ["Completed", interviews.filter((item) => item.status === "Completed").length, "text-green-600"],
            ["Cancelled", interviews.filter((item) => item.status === "Cancelled").length, "text-slate-600"],
          ].map(([label, count, color]) => <div key={label} className="rounded-xl border border-slate-200 bg-white p-5"><p className="text-sm text-slate-500">{label}</p><p className={`mt-2 text-3xl font-bold ${color}`}>{count}</p></div>)}
        </section>
        <section className="rounded-xl border border-slate-200 bg-white p-5 md:p-6">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
            <div><h2 className="text-lg font-bold text-slate-900">Interview Schedule</h2><p className="mt-1 text-sm text-slate-500">Manage candidate meetings and scheduling details.</p></div>
            <div className="grid gap-3 sm:grid-cols-2">
              <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search candidate, company, role..." className="rounded-lg border border-slate-300 px-4 py-2.5 outline-none focus:border-blue-500" />
              <select value={filter} onChange={(event) => setFilter(event.target.value)} className="rounded-lg border border-slate-300 bg-white px-4 py-2.5"><option>All</option><option>Scheduled</option><option>Completed</option><option>Cancelled</option></select>
            </div>
          </div>
          <div className="mt-5 overflow-x-auto"><table className="w-full min-w-[1050px] text-left text-sm">
            <thead className="bg-slate-50 text-slate-500"><tr><th className="p-3 font-medium">Candidate</th><th className="p-3 font-medium">Company / Role</th><th className="p-3 font-medium">Interviewer</th><th className="p-3 font-medium">Date & Time</th><th className="p-3 font-medium">Meeting Link</th><th className="p-3 font-medium">Status</th><th className="p-3 font-medium">Actions</th></tr></thead>
            <tbody>{filtered.map((interview) => <tr key={interview.id} className="border-t border-slate-100">
              <td className="p-3"><p className="font-semibold text-slate-900">{interview.candidate}</p><p className="text-xs text-slate-500">{interview.email}</p></td>
              <td className="p-3"><p className="font-medium text-slate-700">{interview.company}</p><p className="text-xs text-slate-500">{interview.role}</p></td>
              <td className="p-3 text-slate-600">{interview.interviewer}</td><td className="p-3 text-slate-600">{displayDate(interview.date)}<p className="text-xs text-slate-500">{interview.time} UTC</p></td>
              <td className="p-3"><a href={interview.meetingLink} target="_blank" rel="noreferrer" className="text-blue-700 hover:underline">Open meeting</a></td>
              <td className="p-3"><span className={`rounded-full px-3 py-1 text-xs font-semibold ${statusClass[interview.status]}`}>{interview.status}</span></td>
              <td className="p-3"><div className="flex gap-2"><button onClick={() => openSchedule(interview)} className="rounded-lg border border-blue-200 px-3 py-2 text-xs font-semibold text-blue-700 hover:bg-blue-50">{interview.status === "Scheduled" ? "Reschedule" : "Schedule"}</button>{interview.status === "Scheduled" && <button onClick={() => cancelInterview(interview)} className="rounded-lg border border-red-200 px-3 py-2 text-xs font-semibold text-red-600 hover:bg-red-50">Cancel</button>}</div></td>
            </tr>)}</tbody>
          </table></div>
          {filtered.length === 0 && <p className="py-10 text-center text-sm text-slate-500">No interviews match your search or filter.</p>}
        </section>
        {selected && <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4">
          <section role="dialog" aria-modal="true" aria-labelledby="interview-dialog-title" className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl">
            <div className="flex items-start justify-between"><div><h2 id="interview-dialog-title" className="text-xl font-bold text-slate-900">{selected.status === "Scheduled" ? "Reschedule Interview" : "Schedule Interview"}</h2><p className="mt-1 text-sm text-slate-500">{selected.candidate} · {selected.role}</p></div><button aria-label="Close dialog" onClick={() => setSelected(null)} className="text-2xl text-slate-400">×</button></div>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <label className="text-sm font-medium text-slate-700">Date<input type="date" value={schedule.date} onChange={(event) => setSchedule({ ...schedule, date: event.target.value })} className="mt-1.5 w-full rounded-lg border border-slate-300 px-3 py-2.5" required /></label>
              <label className="text-sm font-medium text-slate-700">Time (UTC)<input type="time" value={schedule.time} onChange={(event) => setSchedule({ ...schedule, time: event.target.value })} className="mt-1.5 w-full rounded-lg border border-slate-300 px-3 py-2.5" required /></label>
              <label className="text-sm font-medium text-slate-700 sm:col-span-2">Meeting Link<input type="url" required value={schedule.meetingLink} onChange={(event) => setSchedule({ ...schedule, meetingLink: event.target.value })} placeholder="https://meet.example.com/..." className="mt-1.5 w-full rounded-lg border border-slate-300 px-3 py-2.5" /></label>
            </div>
            <div className="mt-6 flex justify-end gap-2"><button onClick={() => setSelected(null)} className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700">Close</button><button disabled={!schedule.date || !schedule.time || !schedule.meetingLink.trim()} onClick={saveSchedule} className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-40">Save Schedule</button></div>
          </section>
        </div>}
        <p className="text-center text-xs text-slate-400">Demo interview records only. Schedule changes are not sent to candidates or connected to a calendar.</p>
      </div>
    </main>
  );
}
