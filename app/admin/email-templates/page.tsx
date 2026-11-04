"use client";

import { useState } from "react";

type Template = {
  id: number;
  name: string;
  subject: string;
  message: string;
  category: string;
  status: "Active" | "Inactive";
};

const initialTemplates: Template[] = [
  {
    id: 1,
    name: "Welcome Email",
    subject: "Welcome to SkillBridge Global!",
    message: "Hello {{name}}, welcome to SkillBridge Global. Start exploring global opportunities today.",
    category: "Account",
    status: "Active",
  },
  {
    id: 2,
    name: "Email Verification",
    subject: "Verify Your Email Address",
    message: "Hello {{name}}, please verify your email using this link: {{verification_link}}",
    category: "Security",
    status: "Active",
  },
  {
    id: 3,
    name: "Password Reset",
    subject: "Reset Your Password",
    message: "Hello {{name}}, use this link to reset your password: {{reset_link}}",
    category: "Security",
    status: "Active",
  },
  {
    id: 4,
    name: "Job Application Update",
    subject: "Your Application Status",
    message: "Hello {{name}}, your application for {{job_title}} has been updated.",
    category: "Jobs",
    status: "Inactive",
  },
  {
    id: 5,
    name: "Interview Invitation",
    subject: "You Have Been Invited for an Interview",
    message: "Hello {{name}}, you are invited to an interview for {{job_title}}. Details: {{interview_details}}",
    category: "Jobs",
    status: "Active",
  },
];

export default function AdminEmailTemplatesPage() {
  const [templates, setTemplates] = useState(initialTemplates);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [preview, setPreview] = useState<Template | null>(null);
  const [editingId, setEditingId] = useState<number | null>(null);

  const [name, setName] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [category, setCategory] = useState("Account");
  const [status, setStatus] = useState<Template["status"]>("Active");

  const filtered = templates.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  function resetForm() {
    setEditingId(null);
    setName("");
    setSubject("");
    setMessage("");
    setCategory("Account");
    setStatus("Active");
  }

  function createTemplate() {
    resetForm();
    setShowForm(true);
  }

  function editTemplate(item: Template) {
    setEditingId(item.id);
    setName(item.name);
    setSubject(item.subject);
    setMessage(item.message);
    setCategory(item.category);
    setStatus(item.status);
    setShowForm(true);
  }

  function saveTemplate() {
    if (!name.trim() || !subject.trim() || !message.trim()) {
      alert("Please fill all required fields.");
      return;
    }

    if (editingId !== null) {
      setTemplates((previous) =>
        previous.map((item) =>
          item.id === editingId
            ? { ...item, name, subject, message, category, status }
            : item
        )
      );
    } else {
      setTemplates((previous) => [
        {
          id: Date.now(),
          name,
          subject,
          message,
          category,
          status,
        },
        ...previous,
      ]);
    }

    setShowForm(false);
    resetForm();
  }

  function deleteTemplate(id: number) {
    if (confirm("Delete this email template?")) {
      setTemplates((previous) => previous.filter((item) => item.id !== id));
    }
  }

  function toggleStatus(id: number) {
    setTemplates((previous) =>
      previous.map((item) =>
        item.id === id
          ? {
              ...item,
              status: item.status === "Active" ? "Inactive" : "Active",
            }
          : item
      )
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 p-4 md:p-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <p className="text-sm font-bold text-blue-600">
              ADMIN / COMMUNICATION
            </p>
            <h1 className="mt-2 text-3xl font-bold text-slate-900">
              Email Templates
            </h1>
            <p className="mt-2 text-slate-500">
              Manage standard email templates for platform communication.
            </p>
            <p className="mt-4 rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm text-amber-800">
              Demo data only: edits are temporary and no emails are sent.
            </p>
          </div>

          <button
            onClick={createTemplate}
            className="rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700"
          >
            + Create Template
          </button>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {[
            ["Total Templates", templates.length],
            ["Active Templates", templates.filter((t) => t.status === "Active").length],
            ["Inactive Templates", templates.filter((t) => t.status === "Inactive").length],
          ].map(([label, value]) => (
            <div key={label} className="rounded-2xl border bg-white p-5 shadow-sm">
              <p className="text-sm text-slate-500">{label}</p>
              <h2 className="mt-2 text-3xl font-bold text-blue-600">{value}</h2>
            </div>
          ))}
        </div>

        <section className="mt-8 rounded-2xl border bg-white p-5 shadow-sm">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search email templates..."
            className="mb-6 w-full rounded-xl border px-4 py-3 outline-none focus:border-blue-500"
          />

          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px] text-left">
              <thead>
                <tr className="border-b bg-slate-50 text-sm text-slate-500">
                  <th className="p-4">Template Name</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Actions</th>
                </tr>
              </thead>

              <tbody>
                {filtered.map((item) => (
                  <tr key={item.id} className="border-b text-sm">
                    <td className="p-4 font-semibold text-slate-800">
                      {item.name}
                      <p className="mt-1 font-normal text-slate-400">
                        {item.subject}
                      </p>
                    </td>

                    <td className="p-4 text-slate-600">{item.category}</td>

                    <td className="p-4">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          item.status === "Active"
                            ? "bg-green-100 text-green-700"
                            : "bg-slate-100 text-slate-600"
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>

                    <td className="p-4">
                      <div className="flex flex-wrap gap-2">
                        <button
                          onClick={() => setPreview(item)}
                          className="rounded-lg bg-slate-100 px-3 py-2 text-xs font-semibold"
                        >
                          Preview
                        </button>

                        <button
                          onClick={() => editTemplate(item)}
                          className="rounded-lg bg-blue-50 px-3 py-2 text-xs font-semibold text-blue-700"
                        >
                          Edit
                        </button>

                        <button
                          onClick={() => toggleStatus(item.id)}
                          className="rounded-lg bg-amber-50 px-3 py-2 text-xs font-semibold text-amber-700"
                        >
                          Toggle
                        </button>

                        <button
                          onClick={() => deleteTemplate(item.id)}
                          className="rounded-lg bg-red-50 px-3 py-2 text-xs font-semibold text-red-600"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filtered.length === 0 && (
              <p className="py-10 text-center text-slate-500">
                No templates found.
              </p>
            )}
          </div>
        </section>

        {showForm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div role="dialog" aria-modal="true" aria-label={editingId !== null ? "Edit Template" : "Create Email Template"} className="max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-2xl bg-white p-6">
              <h2 className="mb-5 text-xl font-bold">
                {editingId !== null ? "Edit Template" : "Create Email Template"}
              </h2>

              <div className="space-y-4">
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Template name"
                  className="w-full rounded-xl border p-3"
                />

                <input
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="Email subject"
                  className="w-full rounded-xl border p-3"
                />

                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full rounded-xl border p-3"
                >
                  <option>Account</option>
                  <option>Security</option>
                  <option>Jobs</option>
                  <option>Company</option>
                  <option>Freelancing</option>
                  <option>General</option>
                </select>

                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={6}
                  placeholder="Write your email message..."
                  className="w-full rounded-xl border p-3"
                />

                <p className="text-xs text-slate-500">
                  Available placeholders: {"{{name}}"}, {"{{job_title}}"},{" "}
                  {"{{verification_link}}"}, {"{{reset_link}}"}.
                </p>

                <select
                  value={status}
                  onChange={(e) =>
                    setStatus(e.target.value as Template["status"])
                  }
                  className="w-full rounded-xl border p-3"
                >
                  <option>Active</option>
                  <option>Inactive</option>
                </select>

                <div className="flex gap-3">
                  <button
                    onClick={saveTemplate}
                    className="flex-1 rounded-xl bg-blue-600 p-3 font-semibold text-white"
                  >
                    Save Template
                  </button>
                  <button
                    onClick={() => setShowForm(false)}
                    className="rounded-xl border px-5"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {preview && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div role="dialog" aria-modal="true" aria-label="Email Preview" className="w-full max-w-xl rounded-2xl bg-white p-6 shadow-xl">
              <div className="flex justify-between">
                <h2 className="text-xl font-bold">Email Preview</h2>
                <button
                  onClick={() => setPreview(null)}
                  className="text-2xl text-slate-400"
                >
                  ×
                </button>
              </div>

              <div className="mt-5 rounded-xl border p-5">
                <p className="text-xs text-slate-400">SUBJECT</p>
                <h3 className="mt-2 font-bold">{preview.subject}</h3>
                <div className="my-5 border-t" />
                <p className="whitespace-pre-wrap text-sm leading-7 text-slate-600">
                  {preview.message}
                </p>
              </div>

              <button
                onClick={() => setPreview(null)}
                className="mt-5 w-full rounded-xl bg-blue-600 p-3 font-semibold text-white"
              >
                Close Preview
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}