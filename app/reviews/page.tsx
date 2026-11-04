"use client";

import { useMemo, useState } from "react";

type Review = {
  id: number;
  name: string;
  role: string;
  company: string;
  rating: number;
  date: string;
  comment: string;
  status: "Published" | "Pending";
};

const initialReviews: Review[] = [
  {
    id: 1,
    name: "Rahul Sharma",
    role: "Frontend Developer",
    company: "TechNova Solutions",
    rating: 5,
    date: "Oct 28, 2026",
    comment:
      "Excellent experience working with the team. Communication was clear and the project was completed on time.",
    status: "Published",
  },
  {
    id: 2,
    name: "Priya Patel",
    role: "UI/UX Designer",
    company: "Creative Labs",
    rating: 4,
    date: "Oct 24, 2026",
    comment:
      "A good professional experience with a supportive team and clear project requirements.",
    status: "Published",
  },
  {
    id: 3,
    name: "Amit Verma",
    role: "Backend Developer",
    company: "Global Systems",
    rating: 5,
    date: "Oct 20, 2026",
    comment:
      "Great collaboration and a very smooth hiring process.",
    status: "Pending",
  },
];

export default function ReviewsPage() {
  const [reviews, setReviews] = useState(initialReviews);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [showForm, setShowForm] = useState(false);
  const [rating, setRating] = useState(5);
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [comment, setComment] = useState("");

  const filteredReviews = useMemo(() => {
    return reviews.filter((review) => {
      const matchesSearch =
        review.name.toLowerCase().includes(search.toLowerCase()) ||
        review.company.toLowerCase().includes(search.toLowerCase()) ||
        review.role.toLowerCase().includes(search.toLowerCase());

      const matchesFilter =
        filter === "All" || review.status === filter;

      return matchesSearch && matchesFilter;
    });
  }, [reviews, search, filter]);

  const publishedReviews = reviews.filter(
    (review) => review.status === "Published"
  );

  const averageRating =
    publishedReviews.length > 0
      ? (
          publishedReviews.reduce(
            (total, review) => total + review.rating,
            0
          ) / publishedReviews.length
        ).toFixed(1)
      : "0.0";

  function submitReview(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const newReview: Review = {
      id: Date.now(),
      name,
      role: "Platform User",
      company,
      rating,
      date: new Date().toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      }),
      comment,
      status: "Pending",
    };

    setReviews((previous) => [newReview, ...previous]);
    setName("");
    setCompany("");
    setComment("");
    setRating(5);
    setShowForm(false);
  }

  function updateStatus(id: number) {
    setReviews((previous) =>
      previous.map((review) =>
        review.id === id
          ? {
              ...review,
              status:
                review.status === "Published"
                  ? "Pending"
                  : "Published",
            }
          : review
      )
    );
  }

  function deleteReview(id: number) {
    const review = reviews.find((item) => item.id === id);
    if (
      !review ||
      !window.confirm("Remove this review from the demo list?")
    ) {
      return;
    }
    setReviews((previous) =>
      previous.filter((review) => review.id !== id)
    );
  }

  function renderStars(value: number) {
    return (
      <span className="text-lg tracking-wide text-amber-400">
        {"★".repeat(value)}
        <span className="text-slate-200">
          {"★".repeat(5 - value)}
        </span>
      </span>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 p-5 md:p-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <p className="mb-2 text-sm font-semibold text-blue-600">
              SKILLBRIDGE GLOBAL
            </p>
            <h1 className="text-3xl font-bold text-slate-900">
              Reviews & Ratings
            </h1>
            <p className="mt-2 text-slate-500">
              Build trust through genuine professional feedback.
            </p>
            <p className="mt-4 rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm text-amber-800">
              Demo data only: these sample reviews are not real user feedback.
            </p>
          </div>

          <button
            onClick={() => setShowForm(true)}
            className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
          >
            + Write a Review
          </button>
        </div>

        {/* Statistics */}
        <div className="mb-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
            <p className="text-sm text-slate-500">Average Rating</p>
            <h2 className="mt-2 text-3xl font-bold text-slate-900">
              {averageRating} / 5
            </h2>
            <div className="mt-1">{renderStars(Math.round(Number(averageRating)))}</div>
          </div>

          <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
            <p className="text-sm text-slate-500">Total Reviews</p>
            <h2 className="mt-2 text-3xl font-bold text-slate-900">
              {reviews.length}
            </h2>
            <p className="mt-2 text-sm text-slate-400">
              All submitted feedback
            </p>
          </div>

          <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
            <p className="text-sm text-slate-500">Published Reviews</p>
            <h2 className="mt-2 text-3xl font-bold text-green-600">
              {publishedReviews.length}
            </h2>
            <p className="mt-2 text-sm text-slate-400">
              Visible feedback
            </p>
          </div>

          <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
            <p className="text-sm text-slate-500">Pending Reviews</p>
            <h2 className="mt-2 text-3xl font-bold text-orange-500">
              {reviews.length - publishedReviews.length}
            </h2>
            <p className="mt-2 text-sm text-slate-400">
              Awaiting approval
            </p>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="mb-6 flex flex-col gap-4 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm md:flex-row">
          <input
            type="text"
            placeholder="Search by name, role or company..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500"
          />

          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500"
          >
            <option value="All">All Reviews</option>
            <option value="Published">Published</option>
            <option value="Pending">Pending</option>
          </select>
        </div>

        {/* Reviews */}
        <div className="space-y-4">
          {filteredReviews.map((review) => (
            <div
              key={review.id}
              className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm"
            >
              <div className="flex flex-col justify-between gap-4 sm:flex-row">
                <div className="flex gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-blue-100 text-lg font-bold text-blue-700">
                    {review.name.charAt(0).toUpperCase()}
                  </div>

                  <div>
                    <h3 className="font-bold text-slate-900">
                      {review.name}
                    </h3>
                    <p className="text-sm text-slate-500">
                      {review.role} · {review.company}
                    </p>
                    <div className="mt-1">
                      {renderStars(review.rating)}
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      review.status === "Published"
                        ? "bg-green-100 text-green-700"
                        : "bg-orange-100 text-orange-700"
                    }`}
                  >
                    {review.status}
                  </span>

                  <span className="text-sm text-slate-400">
                    {review.date}
                  </span>
                </div>
              </div>

              <p className="mt-5 leading-7 text-slate-600">
                {review.comment}
              </p>

              <div className="mt-5 flex flex-wrap gap-3 border-t border-slate-100 pt-4">
                <button
                  onClick={() => updateStatus(review.id)}
                  className="rounded-lg border border-blue-200 px-4 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50"
                >
                  {review.status === "Published"
                    ? "Move to Pending"
                    : "Publish Review"}
                </button>

                <button
                  onClick={() => deleteReview(review.id)}
                  className="rounded-lg border border-red-200 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}

          {filteredReviews.length === 0 && (
            <div className="rounded-2xl bg-white p-12 text-center shadow-sm">
              <div className="mb-3 text-4xl">⭐</div>
              <h3 className="font-bold text-slate-800">
                No reviews found
              </h3>
              <p className="mt-2 text-sm text-slate-500">
                Try another search or filter.
              </p>
            </div>
          )}
        </div>

        {/* Write Review Modal */}
        {showForm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4">
            <div role="dialog" aria-modal="true" aria-label="Write a Review" className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white p-6 shadow-xl">
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-xl font-bold text-slate-900">
                  Write a Review
                </h2>
                <button
                  onClick={() => setShowForm(false)}
                  className="text-2xl text-slate-400 hover:text-slate-700"
                >
                  ×
                </button>
              </div>

              <form onSubmit={submitReview} className="space-y-4">
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Your Name
                  </label>
                  <input
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Company or Organization
                  </label>
                  <input
                    required
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="Enter company name"
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Your Rating
                  </label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        className={`text-3xl ${
                          star <= rating
                            ? "text-amber-400"
                            : "text-slate-200"
                        }`}
                      >
                        ★
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Your Feedback
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Share your professional experience..."
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full rounded-xl bg-blue-600 py-3 font-semibold text-white hover:bg-blue-700"
                >
                  Submit Review
                </button>
              </form>
            </div>
          </div>
        )}

        <p className="mt-8 text-center text-xs text-slate-400">
          SkillBridge Global · Reviews & Ratings
        </p>
      </div>
    </main>
  );
}