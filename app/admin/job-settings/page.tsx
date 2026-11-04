"use client";

import { useState, type FormEvent } from "react";

type JobPostingSettings = {
  requireCompanyVerification: boolean;
  requireAdminApproval: boolean;
  allowPublishedJobEdits: boolean;
  allowCompaniesToCloseJobs: boolean;
  enableAutomaticExpiration: boolean;
  defaultListingDuration: string;
  listingDurationUnit: "days" | "weeks" | "months";
  maximumFreeJobPostings: string;
  enableFeaturedListings: boolean;
  enableRemoteJobs: boolean;
  enableInternationalJobs: boolean;
};

const initialSettings: JobPostingSettings = {
  requireCompanyVerification: true,
  requireAdminApproval: true,
  allowPublishedJobEdits: true,
  allowCompaniesToCloseJobs: true,
  enableAutomaticExpiration: true,
  defaultListingDuration: "30",
  listingDurationUnit: "days",
  maximumFreeJobPostings: "3",
  enableFeaturedListings: true,
  enableRemoteJobs: true,
  enableInternationalJobs: true,
};

const toggleOptions = [
  {
    key: "requireCompanyVerification",
    title: "Require company verification before posting",
    description: "Only verified company accounts can submit job listings.",
  },
  {
    key: "requireAdminApproval",
    title: "Enable job approval by admin",
    description: "Hold new listings for administrator review before publishing.",
  },
  {
    key: "allowPublishedJobEdits",
    title: "Allow companies to edit published jobs",
    description: "Let employers update their published job listing details.",
  },
  {
    key: "allowCompaniesToCloseJobs",
    title: "Allow companies to close job listings",
    description: "Let employers close listings when a role is no longer available.",
  },
  {
    key: "enableAutomaticExpiration",
    title: "Enable automatic job expiration",
    description: "Automatically expire listings after the configured duration.",
  },
  {
    key: "enableFeaturedListings",
    title: "Enable featured job listings",
    description: "Allow eligible jobs to be highlighted as featured listings.",
  },
  {
    key: "enableRemoteJobs",
    title: "Enable remote job postings",
    description: "Allow companies to publish remote opportunities.",
  },
  {
    key: "enableInternationalJobs",
    title: "Enable international job postings",
    description: "Allow companies to advertise roles across country borders.",
  },
] as const;

type ToggleKey = (typeof toggleOptions)[number]["key"];
type DurationUnit = JobPostingSettings["listingDurationUnit"];

const durationUnits: DurationUnit[] = ["days", "weeks", "months"];

function isDurationUnit(value: string): value is DurationUnit {
  return durationUnits.some((unit) => unit === value);
}

export default function AdminJobSettingsPage() {
  const [settings, setSettings] = useState<JobPostingSettings>(initialSettings);
  const [message, setMessage] = useState("");

  function toggleSetting(key: ToggleKey) {
    setSettings((currentSettings) => ({
      ...currentSettings,
      [key]: !currentSettings[key],
    }));
    setMessage("");
  }

  function updateNumberSetting(
    key: "defaultListingDuration" | "maximumFreeJobPostings",
    value: string
  ) {
    setSettings((currentSettings) => ({
      ...currentSettings,
      [key]: value,
    }));
    setMessage("");
  }

  function saveSettings(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("Job posting settings saved for this demo session.");
  }

  return (
    <main className="min-h-screen bg-slate-50 p-4 md:p-8">
      <div className="mx-auto max-w-5xl space-y-6">
        <header>
          <p className="text-sm font-medium text-blue-600">
            Admin / Job Settings
          </p>
          <h1 className="mt-2 text-3xl font-bold text-slate-900">
            Job Posting Settings
          </h1>
          <p className="mt-2 text-slate-500">
            Configure how companies create, manage, and publish job listings.
          </p>
        </header>

        <div className="rounded-xl border border-blue-200 bg-blue-50 p-5">
          <h2 className="font-semibold text-blue-900">Demo Configuration</h2>
          <p className="mt-1 text-sm text-blue-800">
            These settings are stored only in this page&apos;s state. Saving does
            not update platform behavior or a database.
          </p>
        </div>

        <form onSubmit={saveSettings} className="space-y-6">
          <section className="rounded-xl border border-slate-200 bg-white p-6">
            <h2 className="text-lg font-bold text-slate-900">
              Posting Permissions
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Control who can publish and manage job listings.
            </p>
            <div className="mt-3 divide-y divide-slate-100">
              {toggleOptions.slice(0, 4).map((option) => {
                const enabled = settings[option.key];
                return (
                  <div
                    key={option.key}
                    className="flex items-center justify-between gap-5 py-5"
                  >
                    <div>
                      <h3 className="font-semibold text-slate-800">
                        {option.title}
                      </h3>
                      <p className="mt-1 text-sm text-slate-500">
                        {option.description}
                      </p>
                    </div>
                    <button
                      type="button"
                      role="switch"
                      aria-checked={enabled}
                      aria-label={option.title}
                      onClick={() => toggleSetting(option.key)}
                      className={`relative h-7 w-12 shrink-0 rounded-full transition focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                        enabled ? "bg-blue-600" : "bg-slate-300"
                      }`}
                    >
                      <span
                        className={`absolute top-1 h-5 w-5 rounded-full bg-white transition ${
                          enabled ? "left-6" : "left-1"
                        }`}
                      />
                    </button>
                  </div>
                );
              })}
            </div>
          </section>

          <section className="rounded-xl border border-slate-200 bg-white p-6">
            <h2 className="text-lg font-bold text-slate-900">
              Listing Duration & Limits
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Set the default lifetime and free posting allowance.
            </p>
            <div className="mt-5 grid gap-5 md:grid-cols-2">
              <div>
                <label
                  htmlFor="listing-duration"
                  className="mb-1.5 block text-sm font-medium text-slate-700"
                >
                  Default Job Listing Duration
                </label>
                <div className="flex gap-3">
                  <input
                    id="listing-duration"
                    type="number"
                    min="1"
                    max="365"
                    required
                    value={settings.defaultListingDuration}
                    onChange={(event) =>
                      updateNumberSetting(
                        "defaultListingDuration",
                        event.target.value
                      )
                    }
                    className="min-w-0 flex-1 rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                  <select
                    aria-label="Listing duration unit"
                    value={settings.listingDurationUnit}
                    onChange={(event) => {
                      const unit = event.target.value;
                      if (!isDurationUnit(unit)) return;
                      setSettings((currentSettings) => ({
                        ...currentSettings,
                        listingDurationUnit: unit,
                      }));
                      setMessage("");
                    }}
                    className="rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  >
                    <option value="days">Days</option>
                    <option value="weeks">Weeks</option>
                    <option value="months">Months</option>
                  </select>
                </div>
                <p className="mt-1.5 text-xs text-slate-500">
                  Choose a duration between 1 and 365.
                </p>
              </div>
              <div>
                <label
                  htmlFor="free-job-postings"
                  className="mb-1.5 block text-sm font-medium text-slate-700"
                >
                  Maximum Number of Free Job Postings
                </label>
                <input
                  id="free-job-postings"
                  type="number"
                  min="0"
                  max="1000"
                  required
                  value={settings.maximumFreeJobPostings}
                  onChange={(event) =>
                    updateNumberSetting(
                      "maximumFreeJobPostings",
                      event.target.value
                    )
                  }
                  className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
                <p className="mt-1.5 text-xs text-slate-500">
                  Set to 0 to disable free job postings.
                </p>
              </div>
            </div>
            <div className="mt-3 divide-y divide-slate-100">
              {toggleOptions.slice(4, 5).map((option) => {
                const enabled = settings[option.key];
                return (
                  <div
                    key={option.key}
                    className="flex items-center justify-between gap-5 py-5"
                  >
                    <div>
                      <h3 className="font-semibold text-slate-800">
                        {option.title}
                      </h3>
                      <p className="mt-1 text-sm text-slate-500">
                        {option.description}
                      </p>
                    </div>
                    <button
                      type="button"
                      role="switch"
                      aria-checked={enabled}
                      aria-label={option.title}
                      onClick={() => toggleSetting(option.key)}
                      className={`relative h-7 w-12 shrink-0 rounded-full transition focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                        enabled ? "bg-blue-600" : "bg-slate-300"
                      }`}
                    >
                      <span
                        className={`absolute top-1 h-5 w-5 rounded-full bg-white transition ${
                          enabled ? "left-6" : "left-1"
                        }`}
                      />
                    </button>
                  </div>
                );
              })}
            </div>
          </section>

          <section className="rounded-xl border border-slate-200 bg-white p-6">
            <h2 className="text-lg font-bold text-slate-900">
              Listing Availability
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Choose which types of job opportunities companies can post.
            </p>
            <div className="mt-3 divide-y divide-slate-100">
              {toggleOptions.slice(5).map((option) => {
                const enabled = settings[option.key];
                return (
                  <div
                    key={option.key}
                    className="flex items-center justify-between gap-5 py-5"
                  >
                    <div>
                      <h3 className="font-semibold text-slate-800">
                        {option.title}
                      </h3>
                      <p className="mt-1 text-sm text-slate-500">
                        {option.description}
                      </p>
                    </div>
                    <button
                      type="button"
                      role="switch"
                      aria-checked={enabled}
                      aria-label={option.title}
                      onClick={() => toggleSetting(option.key)}
                      className={`relative h-7 w-12 shrink-0 rounded-full transition focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                        enabled ? "bg-blue-600" : "bg-slate-300"
                      }`}
                    >
                      <span
                        className={`absolute top-1 h-5 w-5 rounded-full bg-white transition ${
                          enabled ? "left-6" : "left-1"
                        }`}
                      />
                    </button>
                  </div>
                );
              })}
            </div>
          </section>

          <div className="flex flex-col items-start justify-between gap-4 rounded-xl border border-slate-200 bg-white p-6 sm:flex-row sm:items-center">
            <div>
              <h2 className="font-bold text-slate-900">Save Job Settings</h2>
              <p className="mt-1 text-sm text-slate-500">
                Save your changes for this demo session.
              </p>
            </div>
            <button
              type="submit"
              className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Save Settings
            </button>
          </div>

          {message && (
            <p
              role="status"
              className="rounded-lg border border-green-200 bg-green-50 p-4 text-sm font-semibold text-green-700"
            >
              {message}
            </p>
          )}
        </form>

        <p className="text-center text-xs text-slate-400">
          SkillBridge Global · Job Posting Configuration
        </p>
      </div>
    </main>
  );
}
