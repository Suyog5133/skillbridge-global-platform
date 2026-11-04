
"use client";

import { useState } from "react";

const initialDocuments = [
  { id: 1, name: "Privacy Policy", category: "Data Privacy", version: "1.0", status: "Published", updated: "04 Nov 2026" },
  { id: 2, name: "Terms & Conditions", category: "Legal", version: "1.0", status: "Published", updated: "04 Nov 2026" },
  { id: 3, name: "Cookie Policy", category: "Data Privacy", version: "1.0", status: "Published", updated: "04 Nov 2026" },
  { id: 4, name: "GDPR Compliance Policy", category: "Compliance", version: "Draft", status: "Draft", updated: "04 Nov 2026" },
  { id: 5, name: "Data Retention Policy", category: "Data Privacy", version: "Draft", status: "Under Review", updated: "04 Nov 2026" },
];

export default function CompliancePage() {
  const [documents, setDocuments] = useState(initialDocuments);
  const [selected, setSelected] = useState("All");
  const [newName, setNewName] = useState("");
  const [newCategory, setNewCategory] = useState("Legal");
  const [notice, setNotice] = useState("");

  const filtered = documents.filter(
    (doc) => selected === "All" || doc.category === selected
  );

  const addDocument = () => {
    if (!newName.trim()) {
      setNotice("Please enter a document name.");
      return;
    }

    setDocuments((current) => [
      ...current,
      {
        id: Date.now(),
        name: newName.trim(),
        category: newCategory,
        version: "Draft",
        status: "Draft",
        updated: new Date().toLocaleDateString(),
      },
    ]);

    setNewName("");
    setNotice("Demo document added successfully.");
  };

  const updateStatus = (id: number) => {
    setDocuments((current) =>
      current.map((doc) =>
        doc.id === id
          ? {
              ...doc,
              status: doc.status === "Published" ? "Draft" : "Published",
              version: doc.status === "Published" ? "Draft" : "1.1",
              updated: new Date().toLocaleDateString(),
            }
          : doc
      )
    );
    setNotice("Demo document status updated.");
  };

  return (
    <main className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl">
        <p className="text-sm font-semibold text-blue-600">
          ADMINISTRATION / COMPLIANCE
        </p>

        <h1 className="mt-2 text-3xl font-bold text-slate-900">
          Legal & Compliance Management
        </h1>

        <p className="mt-2 text-slate-500">
          Manage legal documents, privacy policies and compliance records.
        </p>

        {notice && (
          <div className="mt-5 rounded-xl border border-blue-200 bg-blue-50 p-4 text-sm text-blue-700">
            {notice}
          </div>
        )}

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: "Legal Documents", value: documents.length },
            { label: "Published", value: documents.filter(d => d.status === "Published").length },
            { label: "Drafts", value: documents.filter(d => d.status === "Draft").length },
            { label: "Under Review", value: documents.filter(d => d.status === "Under Review").length },
          ].map((item) => (
            <div key={item.label} className="rounded-2xl bg-white p-5 shadow-sm">
              <p className="text-sm text-slate-500">{item.label}</p>
              <h2 className="mt-2 text-3xl font-bold text-slate-900">{item.value}</h2>
            </div>
          ))}
        </div>

        <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-bold text-slate-900">
            Add Legal Document
          </h2>

          <div className="mt-5 grid gap-4 md:grid-cols-3">
            <input
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder="Document name"
              className="rounded-lg border border-slate-300 px-4 py-3 text-sm"
            />

            <select
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              className="rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm"
            >
              <option>Legal</option>
              <option>Data Privacy</option>
              <option>Compliance</option>
              <option>Security</option>
            </select>

            <button
              onClick={addDocument}
              className="rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700"
            >
              Add Document
            </button>
          </div>
        </section>

        <section className="mt-8 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-lg font-bold text-slate-900">
              Legal Documents
            </h2>

            <select
              value={selected}
              onChange={(e) => setSelected(e.target.value)}
              className="rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm"
            >
              <option>All</option>
              <option>Legal</option>
              <option>Data Privacy</option>
              <option>Compliance</option>
              <option>Security</option>
            </select>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px] text-left text-sm">
              <thead className="bg-slate-50 text-slate-500">
                <tr>
                  <th className="p-4">Document</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Version</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Last Updated</th>
                  <th className="p-4">Action</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {filtered.map((doc) => (
                  <tr key={doc.id}>
                    <td className="p-4 font-semibold text-slate-900">{doc.name}</td>
                    <td className="p-4 text-slate-600">{doc.category}</td>
                    <td className="p-4 text-slate-600">{doc.version}</td>
                    <td className="p-4">
                      <span className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        doc.status === "Published"
                          ? "bg-green-100 text-green-700"
                          : doc.status === "Draft"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-blue-100 text-blue-700"
                      }`}>
                        {doc.status}
                      </span>
                    </td>
                    <td className="p-4 text-slate-500">{doc.updated}</td>
                    <td className="p-4">
                      <button
                        onClick={() => updateStatus(doc.id)}
                        className="font-semibold text-blue-600 hover:underline"
                      >
                        {doc.status === "Published" ? "Unpublish" : "Publish"}
                      </button>
                    </td>
                  </tr>
                ))}

                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={6} className="p-8 text-center text-slate-500">
                      No documents found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

        <section className="mt-8 grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <h3 className="font-bold text-slate-900">Global Privacy Areas</h3>
            <ul className="mt-4 space-y-3 text-sm text-slate-600">
              <li>• GDPR – European Union</li>
              <li>• Digital Personal Data Protection Act – India</li>
              <li>• CCPA/CPRA – California, USA</li>
              <li>• Other applicable local privacy laws</li>
            </ul>
          </div>

          <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5">
            <h3 className="font-bold text-amber-900">Compliance Reminder</h3>
            <p className="mt-3 text-sm leading-6 text-amber-800">
              These are administrative demo controls, not proof of legal
              compliance. Before launch, have qualified legal professionals
              review applicable laws, consent flows, data retention, user
              rights and cross-border data transfers.
            </p>
          </div>
        </section>

        <p className="mt-6 text-xs text-slate-400">
          Demo only: Changes are temporary and are not saved to a database.
        </p>
      </div>
    </main>
  );
}
