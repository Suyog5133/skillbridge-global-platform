"use client";

import { useMemo, useState, type FormEvent } from "react";

type WorkflowStage = {
  id: number;
  name: string;
  description: string;
  active: boolean;
};

const initialStages: WorkflowStage[] = [
  { id: 1, name: "Applied", description: "Application received from the candidate.", active: true },
  { id: 2, name: "Resume Screening", description: "Review the candidate's resume and qualifications.", active: true },
  { id: 3, name: "Shortlisted", description: "Candidate selected to continue in the process.", active: true },
  { id: 4, name: "Assessment", description: "Candidate completes a role-related assessment.", active: true },
  { id: 5, name: "Interview", description: "Candidate participates in one or more interviews.", active: true },
  { id: 6, name: "Final Review", description: "Hiring team completes its final evaluation.", active: true },
  { id: 7, name: "Selected", description: "Candidate selected for an offer.", active: true },
  { id: 8, name: "Offer Sent", description: "Employment offer sent to the candidate.", active: true },
  { id: 9, name: "Hired", description: "Candidate accepted and joined the organization.", active: true },
  { id: 10, name: "Rejected", description: "Candidate will not continue in the workflow.", active: true },
];

export default function AdminApplicationWorkflowPage() {
  const [stages, setStages] = useState<WorkflowStage[]>(initialStages);
  const [newName, setNewName] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [search, setSearch] = useState("");
  const [formError, setFormError] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editName, setEditName] = useState("");
  const [editDescription, setEditDescription] = useState("");

  const searchTerm = search.trim().toLowerCase();
  const visibleStages = useMemo(
    () =>
      stages
        .map((stage, index) => ({ stage, index }))
        .filter(
          ({ stage }) =>
            stage.name.toLowerCase().includes(searchTerm) ||
            stage.description.toLowerCase().includes(searchTerm)
        ),
    [stages, searchTerm]
  );
  const activeCount = stages.filter((stage) => stage.active).length;

  function addStage(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmedName = newName.trim();
    if (!trimmedName) {
      setFormError("Enter a name for the workflow stage.");
      return;
    }
    if (
      stages.some((stage) => stage.name.toLowerCase() === trimmedName.toLowerCase())
    ) {
      setFormError("A workflow stage with that name already exists.");
      return;
    }
    setStages((currentStages) => [
      ...currentStages,
      {
        id: Date.now(),
        name: trimmedName,
        description: newDescription.trim() || "No description added",
        active: true,
      },
    ]);
    setNewName("");
    setNewDescription("");
    setFormError("");
  }

  function beginEdit(stage: WorkflowStage) {
    setEditingId(stage.id);
    setEditName(stage.name);
    setEditDescription(stage.description);
  }

  function saveEdit(id: number) {
    const trimmedName = editName.trim();
    if (!trimmedName) {
      setFormError("Stage name cannot be empty.");
      return;
    }
    if (
      stages.some(
        (stage) =>
          stage.id !== id && stage.name.toLowerCase() === trimmedName.toLowerCase()
      )
    ) {
      setFormError("A workflow stage with that name already exists.");
      return;
    }
    setStages((currentStages) =>
      currentStages.map((stage) =>
        stage.id === id
          ? {
              ...stage,
              name: trimmedName,
              description: editDescription.trim() || "No description added",
            }
          : stage
      )
    );
    setEditingId(null);
    setFormError("");
  }

  function moveStage(id: number, direction: -1 | 1) {
    setStages((currentStages) => {
      const currentIndex = currentStages.findIndex((stage) => stage.id === id);
      const nextIndex = currentIndex + direction;
      if (currentIndex < 0 || nextIndex < 0 || nextIndex >= currentStages.length) {
        return currentStages;
      }
      const reordered = [...currentStages];
      [reordered[currentIndex], reordered[nextIndex]] = [
        reordered[nextIndex],
        reordered[currentIndex],
      ];
      return reordered;
    });
  }

  function toggleStage(id: number) {
    setStages((currentStages) =>
      currentStages.map((stage) =>
        stage.id === id ? { ...stage, active: !stage.active } : stage
      )
    );
  }

  function deleteStage(stage: WorkflowStage) {
    if (window.confirm(`Are you sure you want to delete "${stage.name}"?`)) {
      setStages((currentStages) =>
        currentStages.filter((item) => item.id !== stage.id)
      );
      if (editingId === stage.id) setEditingId(null);
    }
  }

  return (
    <main className="min-h-screen bg-slate-50 p-4 md:p-8">
      <div className="mx-auto max-w-6xl space-y-6">
        <header>
          <p className="text-sm font-medium text-blue-600">
            Admin / Hiring Settings
          </p>
          <h1 className="mt-2 text-3xl font-bold text-slate-900">
            Application Workflow Management
          </h1>
          <p className="mt-2 text-slate-500">
            Configure and order the stages candidates move through during hiring.
          </p>
        </header>

        <section aria-label="Workflow summary" className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-xl border border-slate-200 bg-white p-5">
            <p className="text-sm text-slate-500">Total Stages</p>
            <p className="mt-2 text-3xl font-bold text-slate-900">{stages.length}</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-5">
            <p className="text-sm text-slate-500">Active Stages</p>
            <p className="mt-2 text-3xl font-bold text-green-600">{activeCount}</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-5">
            <p className="text-sm text-slate-500">Inactive Stages</p>
            <p className="mt-2 text-3xl font-bold text-red-500">
              {stages.length - activeCount}
            </p>
          </div>
        </section>

        <section className="rounded-xl border border-slate-200 bg-white p-6">
          <h2 className="text-lg font-bold text-slate-900">Add Workflow Stage</h2>
          <p className="mt-1 text-sm text-slate-500">
            Add an additional step to the hiring workflow.
          </p>
          <form onSubmit={addStage} className="mt-5 grid gap-4 md:grid-cols-2">
            <div>
              <label htmlFor="stage-name" className="mb-1.5 block text-sm font-medium text-slate-700">
                Stage Name
              </label>
              <input
                id="stage-name"
                value={newName}
                onChange={(event) => setNewName(event.target.value)}
                placeholder="e.g. Reference Check"
                required
                className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>
            <div>
              <label htmlFor="stage-description" className="mb-1.5 block text-sm font-medium text-slate-700">
                Description
              </label>
              <input
                id="stage-description"
                value={newDescription}
                onChange={(event) => setNewDescription(event.target.value)}
                placeholder="Describe this workflow step"
                className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>
            {formError && (
              <p role="alert" className="text-sm text-red-600 md:col-span-2">
                {formError}
              </p>
            )}
            <div className="md:col-span-2">
              <button type="submit" className="rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                + Add Stage
              </button>
            </div>
          </form>
        </section>

        <section className="rounded-xl border border-slate-200 bg-white p-6">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
            <div>
              <h2 className="text-lg font-bold text-slate-900">Hiring Workflow</h2>
              <p className="text-sm text-slate-500">
                Use the arrows to change stage order. Inactive stages remain in this workflow configuration.
              </p>
            </div>
            <label className="w-full md:max-w-sm">
              <span className="sr-only">Search workflow stages</span>
              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search stages..."
                className="w-full rounded-lg border border-slate-300 px-4 py-2.5 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </label>
          </div>

          <ol className="mt-6 space-y-4">
            {visibleStages.map(({ stage, index }) => (
              <li key={stage.id} className="relative flex gap-4 sm:gap-5">
                <div className="flex w-10 shrink-0 flex-col items-center">
                  <span className={`z-10 flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold ${
                    stage.active ? "bg-blue-100 text-blue-700" : "bg-slate-100 text-slate-500"
                  }`}>
                    {index + 1}
                  </span>
                  {index < stages.length - 1 && (
                    <span aria-hidden="true" className="absolute left-[19px] top-10 h-[calc(100%+1rem)] w-0.5 bg-slate-200" />
                  )}
                </div>
                <div className="min-w-0 flex-1 rounded-xl border border-slate-200 bg-white p-4 sm:p-5">
                  {editingId === stage.id ? (
                    <div className="space-y-3">
                      <label className="block">
                        <span className="mb-1 block text-xs font-medium text-slate-600">Stage name</span>
                        <input
                          value={editName}
                          onChange={(event) => setEditName(event.target.value)}
                          className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-blue-500"
                        />
                      </label>
                      <label className="block">
                        <span className="mb-1 block text-xs font-medium text-slate-600">Description</span>
                        <textarea
                          rows={2}
                          value={editDescription}
                          onChange={(event) => setEditDescription(event.target.value)}
                          className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-blue-500"
                        />
                      </label>
                      {formError && <p role="alert" className="text-sm text-red-600">{formError}</p>}
                      <div className="flex flex-wrap gap-2">
                        <button type="button" onClick={() => saveEdit(stage.id)} className="rounded-lg bg-blue-600 px-3 py-2 text-xs font-semibold text-white hover:bg-blue-700">Save</button>
                        <button type="button" onClick={() => { setEditingId(null); setFormError(""); }} className="rounded-lg border border-slate-300 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50">Cancel</button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
                        <div>
                          <div className="flex flex-wrap items-center gap-2">
                            <h3 className="font-semibold text-slate-900">{stage.name}</h3>
                            <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${stage.active ? "bg-green-100 text-green-700" : "bg-slate-100 text-slate-600"}`}>
                              {stage.active ? "Active" : "Inactive"}
                            </span>
                          </div>
                          <p className="mt-1 text-sm text-slate-500">{stage.description}</p>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          <button type="button" disabled={index === 0} onClick={() => moveStage(stage.id, -1)} aria-label={`Move ${stage.name} up`} className="rounded-lg border border-slate-300 px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40">Move Up</button>
                          <button type="button" disabled={index === stages.length - 1} onClick={() => moveStage(stage.id, 1)} aria-label={`Move ${stage.name} down`} className="rounded-lg border border-slate-300 px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40">Move Down</button>
                          <button type="button" onClick={() => beginEdit(stage)} className="rounded-lg border border-blue-200 px-3 py-1.5 text-xs font-medium text-blue-700 hover:bg-blue-50">Edit</button>
                          <button type="button" onClick={() => toggleStage(stage.id)} className="rounded-lg border border-slate-300 px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50">{stage.active ? "Disable" : "Enable"}</button>
                          <button type="button" onClick={() => deleteStage(stage)} className="rounded-lg border border-red-200 px-3 py-1.5 text-xs font-medium text-red-600 hover:bg-red-50">Delete</button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </li>
            ))}
            {visibleStages.length === 0 && (
              <li className="rounded-lg border border-dashed border-slate-300 p-10 text-center text-slate-500">
                <p className="font-medium text-slate-700">No workflow stages found</p>
                <p className="mt-1 text-sm">Try another search term or add a stage.</p>
              </li>
            )}
          </ol>
        </section>

        <p className="text-xs text-slate-400">
          Demo version: workflow changes are temporary and stored only in this page state.
        </p>
      </div>
    </main>
  );
}
