"use client";

import { useMemo, useState, type FormEvent } from "react";

type ProfileField = {
  id: number;
  name: string;
  fieldType: string;
  enabled: boolean;
  required: boolean;
  custom: boolean;
};

const initialFields: ProfileField[] = [
  { id: 1, name: "Full Name", fieldType: "Standard", enabled: true, required: true, custom: false },
  { id: 2, name: "Profile Photo", fieldType: "Standard", enabled: true, required: false, custom: false },
  { id: 3, name: "Email", fieldType: "Standard", enabled: true, required: true, custom: false },
  { id: 4, name: "Phone", fieldType: "Standard", enabled: true, required: false, custom: false },
  { id: 5, name: "Location", fieldType: "Standard", enabled: true, required: false, custom: false },
  { id: 6, name: "Professional Summary", fieldType: "Standard", enabled: true, required: false, custom: false },
  { id: 7, name: "Skills", fieldType: "Standard", enabled: true, required: false, custom: false },
  { id: 8, name: "Education", fieldType: "Standard", enabled: true, required: false, custom: false },
  { id: 9, name: "Experience", fieldType: "Standard", enabled: true, required: false, custom: false },
  { id: 10, name: "Certifications", fieldType: "Standard", enabled: true, required: false, custom: false },
  { id: 11, name: "Portfolio", fieldType: "Standard", enabled: true, required: false, custom: false },
  { id: 12, name: "Resume", fieldType: "Standard", enabled: true, required: false, custom: false },
];

export default function AdminProfileSettingsPage() {
  const [fields, setFields] = useState<ProfileField[]>(initialFields);
  const [search, setSearch] = useState("");
  const [customName, setCustomName] = useState("");
  const [customType, setCustomType] = useState("Text");
  const [formError, setFormError] = useState("");

  const filteredFields = useMemo(() => {
    const term = search.trim().toLowerCase();
    return fields.filter((field) => field.name.toLowerCase().includes(term));
  }, [fields, search]);
  const requiredCount = fields.filter((field) => field.required).length;
  const optionalCount = fields.length - requiredCount;

  function toggleField(id: number) {
    setFields((currentFields) =>
      currentFields.map((field) =>
        field.id === id ? { ...field, enabled: !field.enabled } : field
      )
    );
  }

  function setFieldRequired(id: number, required: boolean) {
    setFields((currentFields) =>
      currentFields.map((field) =>
        field.id === id ? { ...field, required } : field
      )
    );
  }

  function addCustomField(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const normalizedName = customName.trim();
    if (!normalizedName) {
      setFormError("Enter a name for the custom profile field.");
      return;
    }
    if (
      fields.some(
        (field) => field.name.toLowerCase() === normalizedName.toLowerCase()
      )
    ) {
      setFormError("A profile field with that name already exists.");
      return;
    }

    setFields((currentFields) => [
      ...currentFields,
      {
        id: Date.now(),
        name: normalizedName,
        fieldType: customType,
        enabled: true,
        required: false,
        custom: true,
      },
    ]);
    setCustomName("");
    setCustomType("Text");
    setFormError("");
  }

  function deleteCustomField(field: ProfileField) {
    if (
      window.confirm(
        `Are you sure you want to delete the custom field "${field.name}"?`
      )
    ) {
      setFields((currentFields) =>
        currentFields.filter((item) => item.id !== field.id)
      );
    }
  }

  return (
    <main className="min-h-screen bg-slate-50 p-4 md:p-8">
      <div className="mx-auto max-w-7xl space-y-6">
        <header>
          <p className="text-sm font-medium text-blue-600">
            Admin / Candidate Settings
          </p>
          <h1 className="mt-2 text-3xl font-bold text-slate-900">
            Candidate Profile Settings
          </h1>
          <p className="mt-2 text-slate-500">
            Configure the profile information candidates can provide.
          </p>
        </header>

        <section
          aria-label="Profile field summary"
          className="grid gap-4 sm:grid-cols-3"
        >
          <div className="rounded-xl border border-slate-200 bg-white p-5">
            <p className="text-sm text-slate-500">Total Fields</p>
            <p className="mt-2 text-3xl font-bold text-slate-900">
              {fields.length}
            </p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-5">
            <p className="text-sm text-slate-500">Required Fields</p>
            <p className="mt-2 text-3xl font-bold text-blue-600">
              {requiredCount}
            </p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-5">
            <p className="text-sm text-slate-500">Optional Fields</p>
            <p className="mt-2 text-3xl font-bold text-slate-700">
              {optionalCount}
            </p>
          </div>
        </section>

        <section className="rounded-xl border border-slate-200 bg-white p-6">
          <h2 className="text-lg font-bold text-slate-900">
            Add Custom Profile Field
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Create an additional field for candidate profiles.
          </p>
          <form
            onSubmit={addCustomField}
            className="mt-5 grid gap-4 md:grid-cols-[1fr_1fr_auto]"
          >
            <div>
              <label
                htmlFor="custom-field-name"
                className="mb-1.5 block text-sm font-medium text-slate-700"
              >
                Field Name
              </label>
              <input
                id="custom-field-name"
                value={customName}
                onChange={(event) => setCustomName(event.target.value)}
                placeholder="e.g. Languages"
                required
                className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>
            <div>
              <label
                htmlFor="custom-field-type"
                className="mb-1.5 block text-sm font-medium text-slate-700"
              >
                Field Type
              </label>
              <select
                id="custom-field-type"
                value={customType}
                onChange={(event) => setCustomType(event.target.value)}
                className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              >
                <option>Text</option>
                <option>Long text</option>
                <option>Number</option>
                <option>Date</option>
                <option>URL</option>
              </select>
            </div>
            <div className="flex items-end">
              <button
                type="submit"
                className="w-full rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 md:w-auto"
              >
                + Add Field
              </button>
            </div>
            {formError && (
              <p role="alert" className="text-sm text-red-600 md:col-span-3">
                {formError}
              </p>
            )}
          </form>
        </section>

        <section className="rounded-xl border border-slate-200 bg-white p-6">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Candidate Profile Fields
              </h2>
              <p className="text-sm text-slate-500">
                Enable fields and choose which ones candidates must complete.
              </p>
            </div>
            <label className="w-full md:max-w-sm">
              <span className="sr-only">Search profile fields</span>
              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search profile fields..."
                className="w-full rounded-lg border border-slate-300 px-4 py-2.5 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </label>
          </div>

          <div className="mt-5 overflow-x-auto">
            <table className="w-full min-w-[740px] text-left text-sm">
              <thead className="bg-slate-50 text-slate-500">
                <tr>
                  <th scope="col" className="p-3 font-medium">Profile Field</th>
                  <th scope="col" className="p-3 font-medium">Field Type</th>
                  <th scope="col" className="p-3 font-medium">Availability</th>
                  <th scope="col" className="p-3 font-medium">Requirement</th>
                  <th scope="col" className="p-3 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredFields.map((field) => (
                  <tr key={field.id} className="border-t border-slate-100">
                    <td className="p-3 font-semibold text-slate-800">
                      {field.name}
                    </td>
                    <td className="p-3 text-slate-500">
                      {field.fieldType}
                    </td>
                    <td className="p-3">
                      <button
                        type="button"
                        role="switch"
                        aria-checked={field.enabled}
                        aria-label={`${field.enabled ? "Disable" : "Enable"} ${field.name}`}
                        onClick={() => toggleField(field.id)}
                        className={`relative h-7 w-12 rounded-full transition focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                          field.enabled ? "bg-blue-600" : "bg-slate-300"
                        }`}
                      >
                        <span
                          className={`absolute top-1 h-5 w-5 rounded-full bg-white transition ${
                            field.enabled ? "left-6" : "left-1"
                          }`}
                        />
                      </button>
                      <span className="ml-2 text-xs text-slate-500">
                        {field.enabled ? "Enabled" : "Disabled"}
                      </span>
                    </td>
                    <td className="p-3">
                      <select
                        aria-label={`${field.name} requirement`}
                        value={field.required ? "required" : "optional"}
                        onChange={(event) =>
                          setFieldRequired(
                            field.id,
                            event.target.value === "required"
                          )
                        }
                        className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 outline-none focus:border-blue-500"
                      >
                        <option value="required">Required</option>
                        <option value="optional">Optional</option>
                      </select>
                    </td>
                    <td className="p-3">
                      {field.custom ? (
                        <button
                          type="button"
                          onClick={() => deleteCustomField(field)}
                          className="rounded-lg border border-red-200 px-3 py-1.5 text-xs font-medium text-red-600 transition hover:bg-red-50"
                        >
                          Delete
                        </button>
                      ) : (
                        <span className="text-xs text-slate-400">Standard field</span>
                      )}
                    </td>
                  </tr>
                ))}
                {filteredFields.length === 0 && (
                  <tr>
                    <td colSpan={5} className="p-10 text-center text-slate-500">
                      <p className="font-medium text-slate-700">
                        No profile fields found
                      </p>
                      <p className="mt-1 text-sm">
                        Try another search term or add a custom field.
                      </p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

        <p className="text-xs text-slate-400">
          Demo version: profile settings are temporary and stored only in this page state.
        </p>
      </div>
    </main>
  );
}
