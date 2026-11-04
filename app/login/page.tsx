"use client";

import Link from "next/link";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    alert("Authentication is not connected yet.");
  }

  return (
    <main className="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg border border-slate-200">
        <Link href="/" className="text-2xl font-bold text-blue-900">
          SkillBridge Global
        </Link>

        <h1 className="text-3xl font-bold text-slate-900 mt-8">
          Welcome Back
        </h1>

        <p className="text-slate-500 mt-2 mb-8">
          Login to continue your global career journey.
        </p>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold mb-2">
              Email Address
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full border border-slate-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">
              Password
            </label>
            <input
              type="password"
              required
              minLength={8}
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full border border-slate-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-900 text-white font-semibold py-3 rounded-lg hover:bg-blue-800 transition"
          >
            Login
          </button>
        </form>

        <p className="text-center text-sm text-slate-600 mt-6">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="text-blue-700 font-semibold">
            Create Account
          </Link>
        </p>

        <Link
          href="/"
          className="block text-center text-sm text-slate-500 mt-5 hover:text-blue-700"
        >
          ← Back to Home
        </Link>
      </div>
    </main>
  );
}