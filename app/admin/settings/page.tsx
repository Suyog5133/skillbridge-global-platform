"use client";

import { useState } from "react";

type SettingKey =
  | "registration"
  | "maintenance"
  | "emailNotifications"
  | "candidateRegistration"
  | "companyRegistration"
  | "studentRegistration"
  | "freelancerRegistration"
  | "twoFactor"
  | "profileVerification"
  | "jobApproval"
  | "messageModeration";

type SettingsState = Record<SettingKey, boolean>;

function SettingToggle({
  title,
  description,
  settingKey,
  settings,
  toggle,
}: {
  title: string;
  description: string;
  settingKey: SettingKey;
  settings: SettingsState;
  toggle: (key: SettingKey) => void;
}) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-slate-100 py-5 last:border-0">
      <div>
        <h3 className="font-semibold text-slate-800">{title}</h3>
        <p className="mt-1 text-sm text-slate-500">{description}</p>
      </div>

      <button
        type="button"
        onClick={() => toggle(settingKey)}
        aria-label={title}
        aria-pressed={settings[settingKey]}
        className={`relative h-7 w-12 shrink-0 rounded-full transition ${
          settings[settingKey] ? "bg-blue-600" : "bg-slate-300"
        }`}
      >
        <span
          className={`absolute top-1 h-5 w-5 rounded-full bg-white transition ${
            settings[settingKey] ? "left-6" : "left-1"
          }`}
        />
      </button>
    </div>
  );
}

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<SettingsState>({
    registration: true,
    maintenance: false,
    emailNotifications: true,
    candidateRegistration: true,
    companyRegistration: true,
    studentRegistration: true,
    freelancerRegistration: true,
    twoFactor: true,
    profileVerification: true,
    jobApproval: true,
    messageModeration: true,
  });

  const [platformName, setPlatformName] = useState("SkillBridge Global");
  const [supportEmail, setSupportEmail] = useState("support@skillbridgeglobal.com");
  const [sessionTimeout, setSessionTimeout] = useState("30");
  const [message, setMessage] = useState("");

  const toggle = (key: keyof typeof settings) => {
    setSettings((previous) => ({
      ...previous,
      [key]: !previous[key],
    }));
  };

  const handleSave = () => {
    setMessage("Settings saved in this demo session successfully!");
  };

  return (
    <main className="min-h-screen bg-slate-50 p-4 md:p-8">
      <div className="mx-auto max-w-6xl">

        {/* Header */}
        <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <p className="text-sm font-bold text-blue-600">
              ADMIN CONTROL PANEL
            </p>
            <h1 className="mt-2 text-3xl font-bold text-slate-900">
              Platform Settings
            </h1>
            <p className="mt-2 text-slate-500">
              Manage global platform configuration and security preferences.
            </p>
          </div>

          <a
            href="/dashboard/admin"
            className="w-fit rounded-lg border bg-white px-5 py-3 font-semibold text-slate-700"
          >
            ← Dashboard
          </a>
        </div>

        {/* Warning */}
        <div className="mb-8 rounded-xl border border-orange-200 bg-orange-50 p-5">
          <h3 className="font-bold text-orange-800">
            Demo Configuration
          </h3>
          <p className="mt-1 text-sm text-orange-700">
            These settings currently work only in the browser session.
            They do not change real platform access or security.
          </p>
        </div>

        {/* General Settings */}
        <section className="mb-6 rounded-2xl border bg-white p-6 shadow-sm">
          <h2 className="mb-6 text-xl font-bold text-slate-900">
            General Settings
          </h2>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Platform Name
              </label>
              <input
                value={platformName}
                onChange={(e) => setPlatformName(e.target.value)}
                className="w-full rounded-lg border px-4 py-3 outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Support Email
              </label>
              <input
                type="email"
                value={supportEmail}
                onChange={(e) => setSupportEmail(e.target.value)}
                className="w-full rounded-lg border px-4 py-3 outline-none focus:border-blue-500"
              />
            </div>
          </div>
        </section>

        {/* Registration */}
        <section className="mb-6 rounded-2xl border bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900">
            Registration Controls
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Choose which account types are enabled.
          </p>

          <SettingToggle
            title="Allow New Registrations"
            description="Enable or disable new account registration."
            settingKey="registration"
            settings={settings}
            toggle={toggle}
          />

          <SettingToggle
            title="Candidate Registration"
            description="Allow job seekers to create accounts."
            settingKey="candidateRegistration"
            settings={settings}
            toggle={toggle}
          />

          <SettingToggle
            title="Student Registration"
            description="Allow students to register."
            settingKey="studentRegistration"
            settings={settings}
            toggle={toggle}
          />

          <SettingToggle
            title="Freelancer Registration"
            description="Allow freelancers to join the platform."
            settingKey="freelancerRegistration"
            settings={settings}
            toggle={toggle}
          />

          <SettingToggle
            title="Company Registration"
            description="Allow companies to create employer accounts."
            settingKey="companyRegistration"
            settings={settings}
            toggle={toggle}
          />
        </section>

        {/* Platform Controls */}
        <section className="mb-6 rounded-2xl border bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900">
            Platform Controls
          </h2>

          <SettingToggle
            title="Maintenance Mode"
            description="Show a maintenance notice when this feature is implemented."
            settingKey="maintenance"
            settings={settings}
            toggle={toggle}
          />

          <SettingToggle
            title="Email Notifications"
            description="Enable platform email notifications."
            settingKey="emailNotifications"
            settings={settings}
            toggle={toggle}
          />
        </section>

        {/* Security */}
        <section className="mb-6 rounded-2xl border bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900">
            Security & Privacy
          </h2>

          <SettingToggle
            title="Two-Factor Authentication"
            description="Require an additional verification step when implemented."
            settingKey="twoFactor"
            settings={settings}
            toggle={toggle}
          />

          <SettingToggle
            title="Company Profile Verification"
            description="Require company verification before approval."
            settingKey="profileVerification"
            settings={settings}
            toggle={toggle}
          />

          <SettingToggle
            title="Job Listing Approval"
            description="Require admin review before publishing jobs."
            settingKey="jobApproval"
            settings={settings}
            toggle={toggle}
          />

          <SettingToggle
            title="Message Moderation"
            description="Enable message safety checks when implemented."
            settingKey="messageModeration"
            settings={settings}
            toggle={toggle}
          />

          <div className="mt-5">
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Session Timeout
            </label>

            <select
              value={sessionTimeout}
              onChange={(e) => setSessionTimeout(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 md:max-w-sm"
            >
              <option value="15">15 Minutes</option>
              <option value="30">30 Minutes</option>
              <option value="60">1 Hour</option>
              <option value="120">2 Hours</option>
            </select>
          </div>
        </section>

        {/* Save */}
        <div className="flex flex-col items-start justify-between gap-4 rounded-2xl border bg-white p-6 shadow-sm md:flex-row md:items-center">
          <div>
            <h3 className="font-bold text-slate-900">
              Save Platform Configuration
            </h3>
            <p className="mt-1 text-sm text-slate-500">
              Save your current demo settings.
            </p>
          </div>

          <button
            onClick={handleSave}
            className="rounded-lg bg-blue-600 px-7 py-3 font-semibold text-white hover:bg-blue-700"
          >
            Save Settings
          </button>
        </div>

        {message && (
          <p className="mt-4 rounded-lg bg-green-50 p-4 text-sm font-semibold text-green-700">
            {message}
          </p>
        )}

        <p className="mt-8 text-center text-xs text-slate-400">
          SkillBridge Global · Admin Platform Configuration
        </p>
      </div>
    </main>
  );
}