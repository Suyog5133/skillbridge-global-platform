"use client";

import { useState } from "react";

function Toggle({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onChange}
      aria-label={label}
      className={`relative h-6 w-11 rounded-full transition ${
        checked ? "bg-blue-600" : "bg-slate-300"
      }`}
      aria-pressed={checked}
    >
      <span
        className={`absolute top-1 h-4 w-4 rounded-full bg-white transition ${
          checked ? "left-6" : "left-1"
        }`}
      />
    </button>
  );
}

export default function SettingsPage() {
  const [profileVisibility, setProfileVisibility] = useState(true);
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [jobAlerts, setJobAlerts] = useState(true);
  const [messageAlerts, setMessageAlerts] = useState(true);
  const [twoFactor, setTwoFactor] = useState(false);
  const [saved, setSaved] = useState(false);

  function saveSettings() {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }

  return (
    <main className="min-h-screen bg-slate-50 p-5 sm:p-8">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8">
          <p className="text-sm font-bold tracking-wider text-blue-600">
            SKILLBRIDGE GLOBAL
          </p>
          <h1 className="mt-2 text-3xl font-bold text-slate-900">
            Account Settings
          </h1>
          <p className="mt-2 text-slate-500">
            Manage your account, privacy, security and notifications.
          </p>
        </div>

        {/* Account Information */}
        <section className="mb-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900">
            Account Information
          </h2>
          <p className="mb-6 mt-1 text-sm text-slate-500">
            Your basic account details.
          </p>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Full Name
              </label>
              <input
                type="text"
                defaultValue="Your Name"
                aria-label="Full Name"
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Email Address
              </label>
              <input
                type="email"
                defaultValue="your@email.com"
                aria-label="Email Address"
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Phone Number
              </label>
              <input
                type="tel"
                placeholder="Enter phone number"
                aria-label="Phone Number"
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Account Type
              </label>
              <select
                aria-label="Account Type"
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-blue-500"
              >
                <option>Candidate</option>
                <option>Student</option>
                <option>Freelancer</option>
                <option>Company</option>
              </select>
            </div>
          </div>
        </section>

        {/* Privacy Settings */}
        <section className="mb-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900">
            Privacy Settings
          </h2>
          <p className="mb-6 mt-1 text-sm text-slate-500">
            Control how other users see your profile.
          </p>

          <div className="flex items-center justify-between gap-4 border-b border-slate-100 py-4">
            <div>
              <h3 className="font-semibold text-slate-800">
                Profile Visibility
              </h3>
              <p className="mt-1 text-sm text-slate-500">
                Allow companies to discover your profile.
              </p>
            </div>
            <Toggle
              label="Profile Visibility"
              checked={profileVisibility}
              onChange={() => setProfileVisibility(!profileVisibility)}
            />
          </div>

          <div className="flex items-center justify-between gap-4 py-4">
            <div>
              <h3 className="font-semibold text-slate-800">
                Two-Factor Authentication
              </h3>
              <p className="mt-1 text-sm text-slate-500">
                Add an extra security step when signing in.
              </p>
            </div>
            <Toggle
              label="Two-Factor Authentication"
              checked={twoFactor}
              onChange={() => setTwoFactor(!twoFactor)}
            />
          </div>
        </section>

        {/* Notification Settings */}
        <section className="mb-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900">
            Notification Preferences
          </h2>
          <p className="mb-6 mt-1 text-sm text-slate-500">
            Choose which updates you want to receive.
          </p>

          {[
            {
              title: "Email Notifications",
              description: "Receive important updates through email.",
              value: emailAlerts,
              change: () => setEmailAlerts(!emailAlerts),
            },
            {
              title: "Job Recommendations",
              description: "Get alerts about jobs matching your skills.",
              value: jobAlerts,
              change: () => setJobAlerts(!jobAlerts),
            },
            {
              title: "Message Notifications",
              description: "Get notified when someone sends you a message.",
              value: messageAlerts,
              change: () => setMessageAlerts(!messageAlerts),
            },
          ].map((item) => (
            <div
              key={item.title}
              className="flex items-center justify-between gap-4 border-b border-slate-100 py-4 last:border-0"
            >
              <div>
                <h3 className="font-semibold text-slate-800">
                  {item.title}
                </h3>
                <p className="mt-1 text-sm text-slate-500">
                  {item.description}
                </p>
              </div>
              <Toggle
                label={item.title}
                checked={item.value}
                onChange={item.change}
              />
            </div>
          ))}
        </section>

        {/* Password and Account */}
        <section className="mb-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900">
            Password & Account
          </h2>

          <div className="mt-5 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <h3 className="font-semibold text-slate-800">
                Change Password
              </h3>
              <p className="mt-1 text-sm text-slate-500">
                Update your password regularly to protect your account.
              </p>
            </div>
            <button
              type="button"
              onClick={() =>
                alert("Password change will be available after authentication is connected.")
              }
              className="rounded-xl border border-blue-600 px-5 py-2.5 font-semibold text-blue-600 hover:bg-blue-50"
            >
              Change Password
            </button>
          </div>

          <div className="mt-6 flex flex-col justify-between gap-4 border-t border-slate-100 pt-6 sm:flex-row sm:items-center">
            <div>
              <h3 className="font-semibold text-red-600">
                Delete Account
              </h3>
              <p className="mt-1 text-sm text-slate-500">
                Permanently delete your account and associated information.
              </p>
            </div>
            <button
              type="button"
              onClick={() =>
                alert("Account deletion will be available after backend implementation.")
              }
              className="rounded-xl border border-red-300 px-5 py-2.5 font-semibold text-red-600 hover:bg-red-50"
            >
              Delete Account
            </button>
          </div>
        </section>

        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          {saved && (
            <p className="text-sm font-semibold text-green-600">
              Settings saved successfully! (Demo only)
            </p>
          )}

          <button
            onClick={saveSettings}
            className="rounded-xl bg-blue-600 px-8 py-3 font-semibold text-white transition hover:bg-blue-700"
          >
            Save Settings
          </button>
        </div>

        <p className="mt-6 text-center text-xs text-slate-400">
          Settings demo · Changes are not stored permanently yet.
        </p>
      </div>
    </main>
  );
}