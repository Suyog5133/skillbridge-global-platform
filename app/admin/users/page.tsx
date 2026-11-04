"use client";

import { useMemo, useState } from "react";

type User = {
  id: number;
  name: string;
  email: string;
  role: string;
  country: string;
  joined: string;
  status: "Active" | "Suspended" | "Pending";
  verified: boolean;
};

const initialUsers: User[] = [
  {
    id: 1001,
    name: "Rahul Sharma",
    email: "rahul@example.com",
    role: "Candidate",
    country: "India",
    joined: "Nov 01, 2026",
    status: "Active",
    verified: true,
  },
  {
    id: 1002,
    name: "Sarah Johnson",
    email: "sarah@example.com",
    role: "Freelancer",
    country: "United States",
    joined: "Oct 29, 2026",
    status: "Active",
    verified: true,
  },
  {
    id: 1003,
    name: "Amit Patel",
    email: "amit@example.com",
    role: "Student",
    country: "India",
    joined: "Oct 27, 2026",
    status: "Pending",
    verified: false,
  },
  {
    id: 1004,
    name: "TechNova Solutions",
    email: "hr@technova.example",
    role: "Company",
    country: "United Kingdom",
    joined: "Oct 25, 2026",
    status: "Active",
    verified: false,
  },
  {
    id: 1005,
    name: "Daniel Smith",
    email: "daniel@example.com",
    role: "Candidate",
    country: "Canada",
    joined: "Oct 22, 2026",
    status: "Suspended",
    verified: false,
  },
  {
    id: 1006,
    name: "Priya Desai",
    email: "priya@example.com",
    role: "Freelancer",
    country: "India",
    joined: "Oct 20, 2026",
    status: "Active",
    verified: true,
  },
];

export default function AdminUsersPage() {
  const [users, setUsers] = useState(initialUsers);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const query = search.toLowerCase();

      const matchesSearch =
        user.name.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query) ||
        user.country.toLowerCase().includes(query);

      const matchesRole =
        roleFilter === "All" || user.role === roleFilter;

      const matchesStatus =
        statusFilter === "All" || user.status === statusFilter;

      return matchesSearch && matchesRole && matchesStatus;
    });
  }, [users, search, roleFilter, statusFilter]);

  const activeCount = users.filter(
    (user) => user.status === "Active"
  ).length;

  const pendingCount = users.filter(
    (user) => user.status === "Pending"
  ).length;

  const suspendedCount = users.filter(
    (user) => user.status === "Suspended"
  ).length;

  const verifiedCount = users.filter(
    (user) => user.verified
  ).length;

  function changeStatus(id: number) {
    setUsers((previous) =>
      previous.map((user) => {
        if (user.id !== id) return user;

        const nextStatus =
          user.status === "Active" ? "Suspended" : "Active";

        return { ...user, status: nextStatus };
      })
    );

    setSelectedUser(null);
  }

  function toggleVerification(id: number) {
    setUsers((previous) =>
      previous.map((user) =>
        user.id === id
          ? { ...user, verified: !user.verified }
          : user
      )
    );

    setSelectedUser(null);
  }

  function deleteUser(id: number) {
    const confirmed = window.confirm(
      "Are you sure you want to remove this user from the demo list?"
    );

    if (!confirmed) return;

    setUsers((previous) =>
      previous.filter((user) => user.id !== id)
    );

    setSelectedUser(null);
  }

  function statusStyle(status: User["status"]) {
    if (status === "Active") {
      return "bg-green-100 text-green-700";
    }

    if (status === "Pending") {
      return "bg-orange-100 text-orange-700";
    }

    return "bg-red-100 text-red-700";
  }

  return (
    <main className="min-h-screen bg-slate-50 p-5 md:p-8">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <p className="mb-2 text-sm font-bold text-blue-600">
              SKILLBRIDGE GLOBAL · ADMIN PANEL
            </p>

            <h1 className="text-3xl font-bold text-slate-900">
              User Management
            </h1>

            <p className="mt-2 text-slate-500">
              Manage registered users across the global platform.
            </p>
            <p className="mt-4 rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm text-amber-800">
              Demo data only: user records and account actions are temporary.
            </p>
          </div>

          <div className="rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white">
            Administrator
          </div>
        </div>

        {/* Statistics */}
        <div className="mb-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
            <p className="text-sm text-slate-500">Total Users</p>
            <h2 className="mt-2 text-3xl font-bold text-slate-900">
              {users.length}
            </h2>
          </div>

          <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
            <p className="text-sm text-slate-500">Active Users</p>
            <h2 className="mt-2 text-3xl font-bold text-green-600">
              {activeCount}
            </h2>
          </div>

          <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
            <p className="text-sm text-slate-500">Pending Users</p>
            <h2 className="mt-2 text-3xl font-bold text-orange-500">
              {pendingCount}
            </h2>
          </div>

          <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
            <p className="text-sm text-slate-500">Verified Users</p>
            <h2 className="mt-2 text-3xl font-bold text-blue-600">
              {verifiedCount}
            </h2>
          </div>
        </div>

        {/* User Management */}
        <section className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm md:p-7">
          <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-center">
            <div>
              <h2 className="text-xl font-bold text-slate-900">
                All Registered Users
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Search, filter and manage user accounts.
              </p>
            </div>

            <span className="text-sm text-slate-500">
              Suspended accounts:{" "}
              <strong className="text-red-600">
                {suspendedCount}
              </strong>
            </span>
          </div>

          {/* Filters */}
          <div className="mb-6 grid gap-3 md:grid-cols-3">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search name, email or country..."
              className="rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500"
            />

            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500"
            >
              <option value="All">All Roles</option>
              <option value="Candidate">Candidate</option>
              <option value="Student">Student</option>
              <option value="Freelancer">Freelancer</option>
              <option value="Company">Company</option>
            </select>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500"
            >
              <option value="All">All Statuses</option>
              <option value="Active">Active</option>
              <option value="Pending">Pending</option>
              <option value="Suspended">Suspended</option>
            </select>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px] text-left">
              <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="rounded-l-xl p-4">User</th>
                  <th className="p-4">Role</th>
                  <th className="p-4">Country</th>
                  <th className="p-4">Joined</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Verification</th>
                  <th className="rounded-r-xl p-4">Action</th>
                </tr>
              </thead>

              <tbody>
                {filteredUsers.map((user) => (
                  <tr
                    key={user.id}
                    className="border-b border-slate-100 text-sm last:border-0"
                  >
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 font-bold text-blue-700">
                          {user.name.charAt(0)}
                        </div>

                        <div>
                          <p className="font-semibold text-slate-900">
                            {user.name}
                          </p>
                          <p className="text-xs text-slate-500">
                            {user.email}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="p-4 text-slate-600">
                      {user.role}
                    </td>

                    <td className="p-4 text-slate-600">
                      {user.country}
                    </td>

                    <td className="p-4 text-slate-500">
                      {user.joined}
                    </td>

                    <td className="p-4">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${statusStyle(user.status)}`}
                      >
                        {user.status}
                      </span>
                    </td>

                    <td className="p-4">
                      {user.verified ? (
                        <span className="font-semibold text-green-600">
                          ✓ Verified
                        </span>
                      ) : (
                        <span className="text-slate-400">
                          Not verified
                        </span>
                      )}
                    </td>

                    <td className="p-4">
                      <button
                        onClick={() => setSelectedUser(user)}
                        className="rounded-lg border border-blue-200 px-3 py-2 font-medium text-blue-600 hover:bg-blue-50"
                      >
                        Manage
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredUsers.length === 0 && (
            <div className="py-12 text-center">
              <p className="font-semibold text-slate-700">
                No users found
              </p>
              <p className="mt-2 text-sm text-slate-500">
                Try changing your search or filters.
              </p>
            </div>
          )}
        </section>

        {/* User Details Modal */}
        {selectedUser && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4">
            <div role="dialog" aria-modal="true" aria-label="Manage User" className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl">
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-xl font-bold text-slate-900">
                  Manage User
                </h2>

                <button
                  onClick={() => setSelectedUser(null)}
                  className="text-2xl text-slate-400 hover:text-slate-700"
                >
                  ×
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <p className="text-xs text-slate-400">User ID</p>
                  <p className="font-semibold text-slate-800">
                    #{selectedUser.id}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-slate-400">Name</p>
                  <p className="font-semibold text-slate-800">
                    {selectedUser.name}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-slate-400">Email</p>
                  <p className="font-semibold text-slate-800">
                    {selectedUser.email}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-slate-400">Role and Country</p>
                  <p className="font-semibold text-slate-800">
                    {selectedUser.role} · {selectedUser.country}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-slate-400">Account Status</p>
                  <span
                    className={`mt-1 inline-block rounded-full px-3 py-1 text-xs font-semibold ${statusStyle(selectedUser.status)}`}
                  >
                    {selectedUser.status}
                  </span>
                </div>

                <div className="border-t border-slate-100 pt-5">
                  <button
                    onClick={() => toggleVerification(selectedUser.id)}
                    className="mb-3 w-full rounded-xl border border-blue-200 py-3 font-semibold text-blue-700 hover:bg-blue-50"
                  >
                    {selectedUser.verified
                      ? "Remove Verification"
                      : "Mark as Verified"}
                  </button>

                  <button
                    onClick={() => changeStatus(selectedUser.id)}
                    className="mb-3 w-full rounded-xl bg-orange-500 py-3 font-semibold text-white hover:bg-orange-600"
                  >
                    {selectedUser.status === "Active"
                      ? "Suspend Account"
                      : "Activate Account"}
                  </button>

                  <button
                    onClick={() => deleteUser(selectedUser.id)}
                    className="w-full rounded-xl border border-red-200 py-3 font-semibold text-red-600 hover:bg-red-50"
                  >
                    Remove User from Demo
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        <p className="mt-8 text-center text-xs text-slate-400">
          SkillBridge Global · Admin User Management
        </p>
      </div>
    </main>
  );
}