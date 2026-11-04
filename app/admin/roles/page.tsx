
"use client";

import { useState } from "react";

type AdminRole = {
  id: number;
  name: string;
  description: string;
  users: number;
  permissions: string[];
};

const initialRoles: AdminRole[] = [
  {
    id: 1,
    name: "Super Admin",
    description: "Full platform access and control",
    users: 1,
    permissions: ["Users", "Jobs", "Companies", "Payments", "Security", "Settings"],
  },
  {
    id: 2,
    name: "Moderator",
    description: "Manage jobs, reports and user content",
    users: 3,
    permissions: ["Users", "Jobs", "Reports"],
  },
  {
    id: 3,
    name: "Support Admin",
    description: "Manage customer support requests",
    users: 2,
    permissions: ["Users", "Support"],
  },
];

const allPermissions = [
  "Users",
  "Jobs",
  "Companies",
  "Payments",
  "Security",
  "Settings",
  "Reports",
  "Support",
  "Analytics",
];

export default function AdminRolesPage() {
  const [roles, setRoles] = useState(initialRoles);
  const [showForm, setShowForm] = useState(false);
  const [roleName, setRoleName] = useState("");
  const [description, setDescription] = useState("");
  const [permissions, setPermissions] = useState<string[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);

  function togglePermission(permission: string) {
    setPermissions((current) =>
      current.includes(permission)
        ? current.filter((item) => item !== permission)
        : [...current, permission]
    );
  }

  function saveRole() {
    if (!roleName.trim() || permissions.length === 0) {
      alert("Enter role name and select at least one permission.");
      return;
    }

    if (editingId !== null) {
      setRoles((current) =>
        current.map((role) =>
          role.id === editingId
            ? { ...role, name: roleName, description, permissions }
            : role
        )
      );
    } else {
      setRoles((current) => [
        ...current,
        {
          id: Date.now(),
          name: roleName,
          description,
          users: 0,
          permissions,
        },
      ]);
    }

    closeForm();
  }

  function editRole(role: AdminRole) {
    setEditingId(role.id);
    setRoleName(role.name);
    setDescription(role.description);
    setPermissions(role.permissions);
    setShowForm(true);
  }

  function closeForm() {
    setShowForm(false);
    setEditingId(null);
    setRoleName("");
    setDescription("");
    setPermissions([]);
  }

  function deleteRole(id: number) {
    const role = roles.find((item) => item.id === id);
    if (!role || role.name === "Super Admin") return;

    if (confirm("Are you sure you want to delete this role?")) {
      setRoles((current) => current.filter((item) => item.id !== id));
    }
  }

  return (
    <main className="min-h-screen bg-slate-50 p-4 md:p-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold text-blue-600">
              ADMIN PANEL / ACCESS CONTROL
            </p>
            <h1 className="mt-2 text-3xl font-bold text-slate-900">
              Roles & Permissions
            </h1>
            <p className="mt-2 text-slate-500">
              Manage administrator roles and platform access permissions.
            </p>
          </div>

          <button
            onClick={() => setShowForm(true)}
            className="rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700"
          >
            + Create New Role
          </button>
        </div>

        <div className="mb-6 grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border bg-white p-5">
            <p className="text-sm text-slate-500">Total Roles</p>
            <h2 className="mt-2 text-3xl font-bold">{roles.length}</h2>
          </div>
          <div className="rounded-2xl border bg-white p-5">
            <p className="text-sm text-slate-500">Assigned Admins</p>
            <h2 className="mt-2 text-3xl font-bold">
              {roles.reduce((sum, role) => sum + role.users, 0)}
            </h2>
          </div>
          <div className="rounded-2xl border bg-white p-5">
            <p className="text-sm text-slate-500">Available Permissions</p>
            <h2 className="mt-2 text-3xl font-bold">{allPermissions.length}</h2>
          </div>
        </div>

        <div className="grid gap-5 lg:grid-cols-2">
          {roles.map((role) => (
            <div
              key={role.id}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h2 className="text-xl font-bold text-slate-900">
                    {role.name}
                  </h2>
                  <p className="mt-1 text-sm text-slate-500">
                    {role.description}
                  </p>
                </div>
                <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                  {role.users} Admins
                </span>
              </div>

              <div className="mt-5">
                <p className="mb-3 text-sm font-semibold text-slate-700">
                  Permissions
                </p>
                <div className="flex flex-wrap gap-2">
                  {role.permissions.map((permission) => (
                    <span
                      key={permission}
                      className="rounded-lg bg-slate-100 px-3 py-2 text-xs font-medium text-slate-700"
                    >
                      {permission}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-6 flex gap-3 border-t pt-4">
                <button
                  onClick={() => editRole(role)}
                  className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
                >
                  Edit Role
                </button>
                <button
                  disabled={role.name === "Super Admin"}
                  onClick={() => deleteRole(role.id)}
                  className="rounded-lg border border-red-200 px-4 py-2 text-sm font-semibold text-red-600 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {showForm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/50 p-4">
            <div role="dialog" aria-modal="true" aria-label={editingId !== null ? "Edit Role" : "Create New Role"} className="my-8 w-full max-w-xl rounded-2xl bg-white p-6 shadow-xl">
              <div className="mb-5 flex items-center justify-between">
                <h2 className="text-xl font-bold">
                  {editingId !== null ? "Edit Role" : "Create New Role"}
                </h2>
                <button
                  onClick={closeForm}
                  className="text-2xl text-slate-500"
                >
                  ×
                </button>
              </div>

              <label className="mb-2 block text-sm font-semibold">
                Role Name
              </label>
              <input
                value={roleName}
                onChange={(e) => setRoleName(e.target.value)}
                placeholder="Example: Content Manager"
                className="mb-4 w-full rounded-xl border p-3 outline-none focus:border-blue-500"
              />

              <label className="mb-2 block text-sm font-semibold">
                Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe this role..."
                rows={3}
                className="mb-5 w-full rounded-xl border p-3 outline-none focus:border-blue-500"
              />

              <p className="mb-3 text-sm font-semibold">
                Select Permissions
              </p>

              <div className="grid grid-cols-2 gap-3">
                {allPermissions.map((permission) => (
                  <label
                    key={permission}
                    className="flex cursor-pointer items-center gap-2 rounded-lg border p-3 text-sm"
                  >
                    <input
                      type="checkbox"
                      checked={permissions.includes(permission)}
                      onChange={() => togglePermission(permission)}
                      className="h-4 w-4 accent-blue-600"
                    />
                    {permission}
                  </label>
                ))}
              </div>

              <div className="mt-6 flex justify-end gap-3">
                <button
                  onClick={closeForm}
                  className="rounded-xl border px-5 py-3 text-sm font-semibold"
                >
                  Cancel
                </button>
                <button
                  onClick={saveRole}
                  className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700"
                >
                  Save Role
                </button>
              </div>
            </div>
          </div>
        )}

        <p className="mt-6 text-xs text-slate-400">
          Demo only: role changes are stored in local page state. Real access
          control must be enforced by the backend before production.
        </p>
      </div>
    </main>
  );
}
