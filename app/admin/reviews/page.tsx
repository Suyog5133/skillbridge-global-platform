"use client";

import { useState } from "react";

type ReviewKind = "Candidate" | "Freelancer" | "Company";
type ReviewStatus = "Pending" | "Published" | "Reported" | "Removed";
type Review = {
  id: number;
  reviewer: string;
  reviewerRole: string;
  subject: string;
  subjectKind: ReviewKind;
  rating: number;
  comment: string;
  date: string;
  status: ReviewStatus;
  reportReason?: string;
};

const initialReviews: Review[] = [
  { id: 17001, reviewer: "Aarav Sharma", reviewerRole: "Candidate", subject: "TechNova Solutions", subjectKind: "Company", rating: 5, comment: "Clear communication throughout the hiring process and a welcoming team.", date: "Nov 03, 2026", status: "Pending" },
  { id: 17002, reviewer: "Sofia Martin", reviewerRole: "Client", subject: "Priya Sharma", subjectKind: "Freelancer", rating: 5, comment: "Excellent visual design work and thoughtful iteration at every stage.", date: "Nov 02, 2026", status: "Published" },
  { id: 17003, reviewer: "Northstar Health", reviewerRole: "Company", subject: "Noah Williams", subjectKind: "Candidate", rating: 2, comment: "The candidate missed a scheduled call and did not follow up.", date: "Nov 01, 2026", status: "Reported", reportReason: "Possible inaccurate claim" },
  { id: 17004, reviewer: "Amara Okafor", reviewerRole: "Candidate", subject: "Meridian Finance Group", subjectKind: "Company", rating: 4, comment: "The interview process was structured and the team was helpful.", date: "Oct 30, 2026", status: "Published" },
  { id: 17005, reviewer: "Greenfield Learning", reviewerRole: "Client", subject: "Daniel Smith", subjectKind: "Freelancer", rating: 3, comment: "Project was delivered, with some additional revisions needed.", date: "Oct 28, 2026", status: "Pending" },
  { id: 17006, reviewer: "Maya Patel", reviewerRole: "Candidate", subject: "Atelier Creative", subjectKind: "Company", rating: 1, comment: "The listed role details changed during the interview process.", date: "Oct 25, 2026", status: "Reported", reportReason: "Review contains disputed details" },
];

const reviewStatuses: ReviewStatus[] = ["Pending", "Published", "Reported", "Removed"];

function reviewBadge(status: ReviewStatus) {
  if (status === "Published") return "bg-green-100 text-green-700";
  if (status === "Reported") return "bg-red-100 text-red-700";
  if (status === "Pending") return "bg-orange-100 text-orange-700";
  return "bg-slate-100 text-slate-600";
}

export default function AdminReviewsPage() {
  const [reviews, setReviews] = useState(initialReviews);
  const [search, setSearch] = useState("");
  const [kind, setKind] = useState("All");
  const [status, setStatus] = useState("All");
  const [page, setPage] = useState(1);
  const pageSize = 5;
  const filtered = reviews.filter((review) => {
    const term = search.trim().toLowerCase();
    return (!term || [review.reviewer, review.subject, review.comment].some((value) => value.toLowerCase().includes(term))) &&
      (kind === "All" || review.subjectKind === kind) &&
      (status === "All" || review.status === status);
  });
  const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize));
  const currentPage = Math.min(page, pageCount);
  const visible = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  function updateReview(review: Review, next: ReviewStatus) {
    if (next === "Removed" && !window.confirm(`Remove this review of ${review.subject}?`)) return;
    setReviews((items) => items.map((item) => item.id === review.id ? { ...item, status: next } : item));
  }

  return (
    <main className="min-h-screen bg-slate-50 p-4 md:p-8"><div className="mx-auto max-w-7xl space-y-6">
      <header><p className="text-sm font-bold text-blue-600">SKILLBRIDGE GLOBAL · ADMIN PANEL</p><h1 className="mt-2 text-3xl font-bold text-slate-900">Reviews & Ratings Management</h1><p className="mt-2 text-slate-500">Moderate candidate, freelancer, and company reviews to support a trusted community.</p></header>
      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4" aria-label="Review summary">
        {[
          ["Total Reviews", reviews.length, "text-slate-900"],
          ["Pending Approval", reviews.filter((item) => item.status === "Pending").length, "text-orange-500"],
          ["Reported", reviews.filter((item) => item.status === "Reported").length, "text-red-600"],
          ["Published", reviews.filter((item) => item.status === "Published").length, "text-green-600"],
        ].map(([label, count, color]) => <div key={label} className="rounded-xl border border-slate-200 bg-white p-5"><p className="text-sm text-slate-500">{label}</p><p className={`mt-2 text-3xl font-bold ${color}`}>{count}</p></div>)}
      </section>
      <section className="rounded-xl border border-slate-200 bg-white p-5 md:p-6">
        <div><h2 className="text-lg font-bold text-slate-900">Community Reviews</h2><p className="mt-1 text-sm text-slate-500">Search reviews and filter by the profile type being reviewed or moderation status.</p></div>
        <div className="mt-5 grid gap-3 md:grid-cols-3">
          <input value={search} onChange={(event) => { setSearch(event.target.value); setPage(1); }} placeholder="Search reviewer, subject or comment..." className="rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500" />
          <select value={kind} onChange={(event) => { setKind(event.target.value); setPage(1); }} className="rounded-lg border border-slate-300 bg-white px-4 py-3"><option value="All">All review types</option><option>Candidate</option><option>Freelancer</option><option>Company</option></select>
          <select value={status} onChange={(event) => { setStatus(event.target.value); setPage(1); }} className="rounded-lg border border-slate-300 bg-white px-4 py-3"><option value="All">All moderation statuses</option>{reviewStatuses.map((item) => <option key={item}>{item}</option>)}</select>
        </div>
        <div className="mt-5 overflow-x-auto"><table className="w-full min-w-[980px] text-left text-sm"><thead className="bg-slate-50 text-slate-500"><tr><th className="p-3 font-medium">Reviewer</th><th className="p-3 font-medium">Reviewed Profile</th><th className="p-3 font-medium">Rating</th><th className="p-3 font-medium">Review</th><th className="p-3 font-medium">Date</th><th className="p-3 font-medium">Status / Report</th><th className="p-3 font-medium">Actions</th></tr></thead><tbody>
          {visible.map((review) => <tr key={review.id} className="border-t border-slate-100 align-top"><td className="p-3"><p className="font-semibold text-slate-900">{review.reviewer}</p><p className="text-xs text-slate-500">{review.reviewerRole}</p></td><td className="p-3"><p className="font-medium text-slate-700">{review.subject}</p><p className="text-xs text-slate-500">{review.subjectKind}</p></td><td className="p-3"><span className="text-amber-500" aria-label={`${review.rating} out of 5 stars`}>{"★".repeat(review.rating)}<span className="text-slate-300">{"★".repeat(5 - review.rating)}</span></span><p className="text-xs text-slate-500">{review.rating}/5</p></td><td className="max-w-sm p-3 text-slate-600">{review.comment}</td><td className="p-3 text-slate-500">{review.date}</td><td className="p-3"><span className={`rounded-full px-3 py-1 text-xs font-semibold ${reviewBadge(review.status)}`}>{review.status}</span>{review.reportReason && <p className="mt-2 max-w-44 text-xs text-red-600">{review.reportReason}</p>}</td><td className="p-3"><div className="flex flex-col items-start gap-2">{review.status !== "Published" && review.status !== "Removed" && <button onClick={() => updateReview(review, "Published")} className="rounded-lg bg-green-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-green-700">Approve</button>}{review.status === "Reported" && <button onClick={() => updateReview(review, "Pending")} className="rounded-lg border border-slate-300 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50">Clear Report</button>}{review.status !== "Removed" && <button onClick={() => updateReview(review, "Removed")} className="rounded-lg border border-red-200 px-3 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-50">Remove</button>}</div></td></tr>)}
        </tbody></table></div>
        {visible.length === 0 && <p className="py-10 text-center text-sm text-slate-500">No reviews match your search and filters.</p>}
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-4"><p className="text-sm text-slate-500">Showing {filtered.length === 0 ? 0 : (currentPage - 1) * pageSize + 1}–{Math.min(currentPage * pageSize, filtered.length)} of {filtered.length}</p><div className="flex items-center gap-2"><button disabled={currentPage === 1} onClick={() => setPage(currentPage - 1)} className="rounded-lg border px-3 py-2 text-sm disabled:opacity-40">Previous</button><span className="text-sm text-slate-500">Page {currentPage} of {pageCount}</span><button disabled={currentPage === pageCount} onClick={() => setPage(currentPage + 1)} className="rounded-lg border px-3 py-2 text-sm disabled:opacity-40">Next</button></div></div>
      </section>
      <p className="text-center text-xs text-slate-400">Demo review data only. Review moderation changes are not persisted to a backend.</p>
    </div></main>
  );
}
