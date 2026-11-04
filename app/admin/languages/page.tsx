
"use client";

import { useState } from "react";

type Language = {
  id: number;
  name: string;
  nativeName: string;
  code: string;
  status: "Active" | "Inactive";
  default: boolean;
};

const initialLanguages: Language[] = [
  { id: 1, name: "English", nativeName: "English", code: "en", status: "Active", default: true },
  { id: 2, name: "Hindi", nativeName: "हिन्दी", code: "hi", status: "Active", default: false },
  { id: 3, name: "Marathi", nativeName: "मराठी", code: "mr", status: "Active", default: false },
  { id: 4, name: "Spanish", nativeName: "Español", code: "es", status: "Active", default: false },
  { id: 5, name: "French", nativeName: "Français", code: "fr", status: "Inactive", default: false },
  { id: 6, name: "German", nativeName: "Deutsch", code: "de", status: "Inactive", default: false },
  { id: 7, name: "Japanese", nativeName: "日本語", code: "ja", status: "Inactive", default: false },
];

export default function AdminLanguagesPage() {
  const [languages, setLanguages] = useState(initialLanguages);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [nativeName, setNativeName] = useState("");
  const [code, setCode] = useState("");

  const filtered = languages.filter((language) =>
    `${language.name} ${language.nativeName} ${language.code}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  function addLanguage() {
    if (!name.trim() || !nativeName.trim() || !code.trim()) {
      alert("Please complete all fields.");
      return;
    }

    if (languages.some((item) => item.code.toLowerCase() === code.trim().toLowerCase())) {
      alert("Language code already exists.");
      return;
    }

    setLanguages((current) => [
      ...current,
      {
        id: Date.now(),
        name: name.trim(),
        nativeName: nativeName.trim(),
        code: code.trim().toLowerCase(),
        status: "Inactive",
        default: false,
      },
    ]);

    setName("");
    setNativeName("");
    setCode("");
    setShowForm(false);
  }

  function toggleStatus(id: number) {
    setLanguages((current) =>
      current.map((item) =>
        item.id === id && !item.default
          ? { ...item, status: item.status === "Active" ? "Inactive" : "Active" }
          : item
      )
    );
  }

  function setDefault(id: number) {
    const selected = languages.find((item) => item.id === id);
    if (!selected || selected.status !== "Active") {
      alert("Activate this language before setting it as default.");
      return;
    }

    setLanguages((current) =>
      current.map((item) => ({ ...item, default: item.id === id }))
    );
  }

  const activeCount = languages.filter((item) => item.status === "Active").length;

  return (
    <main className="min-h-screen bg-slate-50 p-4 md:p-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold text-blue-600">ADMIN PANEL / GLOBAL SETTINGS</p>
            <h1 className="mt-2 text-3xl font-bold text-slate-900">
              Languages & Localization
            </h1>
            <p className="mt-2 text-slate-500">
              Manage supported languages for users around the world.
            </p>
          </div>

          <button
            onClick={() => setShowForm(true)}
            className="rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700"
          >
            + Add Language
          </button>
        </div>

        <div className="mb-6 grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border bg-white p-5">
            <p className="text-sm text-slate-500">Total Languages</p>
            <h2 className="mt-2 text-3xl font-bold">{languages.length}</h2>
          </div>
          <div className="rounded-2xl border bg-white p-5">
            <p className="text-sm text-slate-500">Active Languages</p>
            <h2 className="mt-2 text-3xl font-bold text-green-600">{activeCount}</h2>
          </div>
          <div className="rounded-2xl border bg-white p-5">
            <p className="text-sm text-slate-500">Default Language</p>
            <h2 className="mt-2 text-2xl font-bold">
              {languages.find((item) => item.default)?.name || "Not set"}
            </h2>
          </div>
        </div>

        <div className="rounded-2xl border bg-white p-5 shadow-sm">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search languages..."
            className="mb-5 w-full rounded-xl border p-3 outline-none focus:border-blue-500 sm:max-w-md"
          />

          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px] text-left text-sm">
              <thead className="bg-slate-50 text-slate-500">
                <tr>
                  <th className="p-4">Language</th>
                  <th className="p-4">Native Name</th>
                  <th className="p-4">Code</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Default</th>
                  <th className="p-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((language) => (
                  <tr key={language.id} className="border-t">
                    <td className="p-4 font-semibold">{language.name}</td>
                    <td className="p-4">{language.nativeName}</td>
                    <td className="p-4">{language.code}</td>
                    <td className="p-4">
                      <span className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        language.status === "Active"
                          ? "bg-green-100 text-green-700"
                          : "bg-slate-100 text-slate-600"
                      }`}>
                        {language.status}
                      </span>
                    </td>
                    <td className="p-4">
                      {language.default ? (
                        <span className="font-semibold text-blue-600">Default</span>
                      ) : (
                        <button
                          onClick={() => setDefault(language.id)}
                          className="text-blue-600 hover:underline"
                        >
                          Set Default
                        </button>
                      )}
                    </td>
                    <td className="p-4">
                      <button
                        disabled={language.default}
                        onClick={() => toggleStatus(language.id)}
                        className="rounded-lg border px-3 py-2 text-xs font-semibold disabled:opacity-40"
                      >
                        {language.status === "Active" ? "Deactivate" : "Activate"}
                      </button>
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={6} className="p-8 text-center text-slate-500">
                      No languages found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <p className="mt-4 text-xs text-slate-400">
            Demo only. Activating a language does not yet translate the website.
          </p>
        </div>

        {showForm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div role="dialog" aria-modal="true" aria-label="Add New Language" className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl">
              <h2 className="mb-5 text-xl font-bold">Add New Language</h2>

              <div className="space-y-4">
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Language name (e.g. Arabic)"
                  className="w-full rounded-xl border p-3"
                />
                <input
                  value={nativeName}
                  onChange={(e) => setNativeName(e.target.value)}
                  placeholder="Native name"
                  className="w-full rounded-xl border p-3"
                />
                <input
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder="Language code (e.g. ar)"
                  maxLength={5}
                  className="w-full rounded-xl border p-3"
                />
              </div>

              <div className="mt-6 flex justify-end gap-3">
                <button
                  onClick={() => setShowForm(false)}
                  className="rounded-xl border px-5 py-3"
                >
                  Cancel
                </button>
                <button
                  onClick={addLanguage}
                  className="rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white"
                >
                  Save Language
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
