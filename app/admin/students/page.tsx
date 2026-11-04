
"use client";

import { useState } from "react";

type Student = {
  id: number;
  name: string;
  email: string;
  university: string;
  degree: string;
  country: string;
  graduationYear: string;
  status: "Active" | "Pending" | "Suspended";
};

export default function AdminStudentsPage() {
  const [students, setStudents] = useState<Student[]>([
    {
      id: 1,
      name: "Rahul Sharma",
      email: "rahul@example.com",
      university: "Sanjivani University",
      degree: "B.Tech Cyber Security",
      country: "India",
      graduationYear: "2027",
      status: "Active",
    },
    {
      id: 2,
      name: "Emma Wilson",
      email: "emma@example.com",
      university: "University of London",
      degree: "Computer Science",
      country: "United Kingdom",
      graduationYear: "2026",
      status: "Pending",
    },
    {
      id: 3,
      name: "David Johnson",
      email: "david@example.com",
      university: "MIT",
      degree: "Software Engineering",
      country: "United States",
      graduationYear: "2028",
      status: "Active",
    },
    {
      id: 4,
      name: "Aisha Khan",
      email: "aisha@example.com",
      university: "University of Dubai",
      degree: "Business Administration",
      country: "UAE",
      graduationYear: "2027",
      status: "Suspended",
    },
    {
      id: 5,
      name: "Priya Patil",
      email: "priya@example.com",
      university: "Pune University",
      degree: "Information Technology",
      country: "India",
      graduationYear: "2026",
      status: "Active",
    },
  ]);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [countryFilter, setCountryFilter] = useState("All");
  const [selected, setSelected] = useState<Student | null>(null);
  const [page, setPage] = useState(1);
  const pageSize = 4;

  const filtered = students.filter((student) => {
    const searchText = search.toLowerCase();

    const matchesSearch =
      student.name.toLowerCase().includes(searchText) ||
      student.email.toLowerCase().includes(searchText) ||
      student.university.toLowerCase().includes(searchText) ||
      student.degree.toLowerCase().includes(searchText);

    const matchesStatus =
      statusFilter === "All" || student.status === statusFilter;

    const matchesCountry =
      countryFilter === "All" || student.country === countryFilter;

    return matchesSearch && matchesStatus && matchesCountry;
  });
  const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize));
  const currentPage = Math.min(page, pageCount);
  const pageStudents = filtered.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const active = students.filter((s) => s.status === "Active").length;
  const pending = students.filter((s) => s.status === "Pending").length;
  const suspended = students.filter((s) => s.status === "Suspended").length;

  function updateStatus(id: number, status: Student["status"]) {
    setStudents((current) =>
      current.map((student) =>
        student.id === id ? { ...student, status } : student
      )
    );
    setSelected(null);
  }

  function deleteStudent(id: number) {
    if (confirm("Are you sure you want to delete this student?")) {
      setStudents((current) => current.filter((student) => student.id !== id));
      setSelected(null);
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8">
      <div className="mx-auto max-w-7xl space-y-6">

        <div>
          <p className="text-sm font-medium text-blue-600">
            Admin / User Management
          </p>
          <h1 className="mt-2 text-3xl font-bold text-slate-900">
            Student Management
          </h1>
          <p className="mt-2 text-slate-500">
            Manage student accounts, universities and education information worldwide.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard title="Total Students" value={students.length} />
          <StatCard title="Active Students" value={active} color="text-green-600" />
          <StatCard title="Pending Verification" value={pending} color="text-amber-600" />
          <StatCard title="Suspended Students" value={suspended} color="text-red-600" />
        </div>

        <div className="rounded-xl border bg-white p-5">
          <h2 className="mb-4 text-lg font-bold text-slate-900">
            Search and Filter Students
          </h2>

          <div className="grid gap-3 md:grid-cols-3">
            <input
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              placeholder="Search name, email, university..."
              className="rounded-lg border px-4 py-3 outline-none focus:border-blue-500"
            />

            <select
              value={countryFilter}
              onChange={(e) => {
                setCountryFilter(e.target.value);
                setPage(1);
              }}
              className="rounded-lg border px-4 py-3 outline-none"
            >
              <option value="All">All Countries</option>
              <option value="India">India</option>
              <option value="United States">United States</option>
              <option value="United Kingdom">United Kingdom</option>
              <option value="UAE">UAE</option>
            </select>

            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setPage(1);
              }}
              className="rounded-lg border px-4 py-3 outline-none"
            >
              <option value="All">All Statuses</option>
              <option value="Active">Active</option>
              <option value="Pending">Pending</option>
              <option value="Suspended">Suspended</option>
            </select>
          </div>
        </div>

        <div className="rounded-xl border bg-white p-5">
          <div className="mb-5">
            <h2 className="text-lg font-bold text-slate-900">
              Registered Students
            </h2>
            <p className="text-sm text-slate-500">
              Review and manage student accounts.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[950px] text-left text-sm">
              <thead className="bg-slate-50 text-slate-500">
                <tr>
                  <th className="p-4">Student</th>
                  <th className="p-4">University</th>
                  <th className="p-4">Degree</th>
                  <th className="p-4">Country</th>
                  <th className="p-4">Graduation</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Action</th>
                </tr>
              </thead>

              <tbody>
                {pageStudents.map((student) => (
                  <tr key={student.id} className="border-t hover:bg-slate-50">
                    <td className="p-4">
                      <p className="font-semibold text-slate-800">
                        {student.name}
                      </p>
                      <p className="text-xs text-slate-500">
                        {student.email}
                      </p>
                    </td>

                    <td className="p-4">{student.university}</td>
                    <td className="p-4">{student.degree}</td>
                    <td className="p-4">{student.country}</td>
                    <td className="p-4">{student.graduationYear}</td>

                    <td className="p-4">
                      <StatusBadge status={student.status} />
                    </td>

                    <td className="p-4">
                      <button
                        onClick={() => setSelected(student)}
                        className="rounded-lg border px-3 py-2 text-xs font-semibold text-blue-600 hover:bg-blue-50"
                      >
                        Manage
                      </button>
                    </td>
                  </tr>
                ))}

                {pageStudents.length === 0 && (
                  <tr>
                    <td colSpan={7} className="p-8 text-center text-slate-500">
                      No students found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm text-slate-500">
              Showing {filtered.length === 0 ? 0 : (currentPage - 1) * pageSize + 1}–
              {Math.min(currentPage * pageSize, filtered.length)} of {filtered.length} students
            </p>
            <div className="flex gap-2">
              <button
                type="button"
                disabled={currentPage === 1}
                onClick={() => setPage(currentPage - 1)}
                className="rounded-lg border px-3 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-40"
              >
                Previous
              </button>
              <span className="px-2 py-2 text-sm text-slate-500">
                Page {currentPage} of {pageCount}
              </span>
              <button
                type="button"
                disabled={currentPage === pageCount}
                onClick={() => setPage(currentPage + 1)}
                className="rounded-lg border px-3 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-40"
              >
                Next
              </button>
            </div>
          </div>
        </div>

        {selected && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
            <div role="dialog" aria-modal="true" aria-label="Student Details" className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold">Student Details</h2>
                <button
                  onClick={() => setSelected(null)}
                  className="text-xl text-slate-500"
                >
                  ✕
                </button>
              </div>

              <div className="mt-5 space-y-3 text-sm">
                <p><strong>Name:</strong> {selected.name}</p>
                <p><strong>Email:</strong> {selected.email}</p>
                <p><strong>University:</strong> {selected.university}</p>
                <p><strong>Degree:</strong> {selected.degree}</p>
                <p><strong>Country:</strong> {selected.country}</p>
                <p><strong>Graduation Year:</strong> {selected.graduationYear}</p>
                <p><strong>Status:</strong> {selected.status}</p>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <button
                  onClick={() => updateStatus(selected.id, "Active")}
                  className="rounded-lg bg-green-600 px-3 py-2 text-sm font-semibold text-white"
                >
                  Verify / Activate
                </button>

                <button
                  onClick={() => updateStatus(selected.id, "Pending")}
                  className="rounded-lg bg-amber-500 px-3 py-2 text-sm font-semibold text-white"
                >
                  Set Pending
                </button>

                <button
                  onClick={() => updateStatus(selected.id, "Suspended")}
                  className="rounded-lg bg-red-600 px-3 py-2 text-sm font-semibold text-white"
                >
                  Suspend
                </button>

                <button
                  onClick={() => deleteStudent(selected.id)}
                  className="rounded-lg border border-red-200 px-3 py-2 text-sm font-semibold text-red-600"
                >
                  Delete Student
                </button>
              </div>
            </div>
          </div>
        )}

        <p className="text-xs text-slate-400">
          Demo data only. Changes are temporary and are not saved to a database.
        </p>
      </div>
    </div>
  );
}

function StatCard({
  title,
  value,
  color = "text-slate-900",
}: {
  title: string;
  value: number;
  color?: string;
}) {
  return (
    <div className="rounded-xl border bg-white p-5">
      <p className="text-sm text-slate-500">{title}</p>
      <h2 className={`mt-2 text-3xl font-bold ${color}`}>{value}</h2>
    </div>
  );
}

function StatusBadge({ status }: { status: Student["status"] }) {
  const styles = {
    Active: "bg-green-100 text-green-700",
    Pending: "bg-amber-100 text-amber-700",
    Suspended: "bg-red-100 text-red-700",
  };

  return (
    <span className={`rounded-full px-3 py-1 text-xs font-semibold ${styles[status]}`}>
      {status}
    </span>
  );
}
