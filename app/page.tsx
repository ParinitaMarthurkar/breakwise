"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!name.trim() || !email.trim()) return;

    localStorage.setItem(
      "breakwise-user",
      JSON.stringify({ name: name.trim(), email: email.trim() })
    );

    router.push("/dashboard");
  }

  return (
    <main className="min-h-screen bg-[#F7F8FA] p-5 sm:p-8">
      <div className="mx-auto grid min-h-[calc(100vh-40px)] max-w-6xl overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl shadow-slate-200/50 lg:grid-cols-2">
        <section className="hidden bg-blue-600 p-12 text-white lg:flex lg:flex-col">
          <div className="flex items-center gap-3">
            <div className="grid h-11 w-11 place-items-center rounded-xl bg-white/15 text-xl font-bold">
              B
            </div>
            <span className="text-xl font-bold tracking-tight">BREAKWISE</span>
          </div>

          <div className="my-auto">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-blue-100">
              Business resilience
            </p>
            <h1 className="max-w-md text-5xl font-bold leading-tight">
              Prepare for disruption before it happens.
            </h1>
            <p className="mt-6 max-w-md text-lg leading-8 text-blue-100">
              Map critical dependencies, test failures, and strengthen your
              business continuity.
            </p>
          </div>

          <p className="text-sm text-blue-200">© 2026 BREAKWISE</p>
        </section>

        <section className="flex items-center justify-center p-7 sm:p-12">
          <div className="w-full max-w-sm">
            <div className="mb-10 lg:hidden">
              <div className="mb-4 grid h-11 w-11 place-items-center rounded-xl bg-blue-600 text-xl font-bold text-white">
                B
              </div>
              <p className="text-xl font-bold">BREAKWISE</p>
            </div>

            <p className="text-sm font-semibold text-blue-600">
              WELCOME TO BREAKWISE
            </p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
              Sign in to your workspace
            </h2>
            <p className="mt-3 text-sm leading-6 text-slate-500">
              Start building a more resilient business today.
            </p>

            <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-slate-700">
                  Your name
                </span>
                <input
                  type="text"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                  required
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-slate-700">
                  Email address
                </span>
                <input
                  type="email"
                  placeholder="you@company.com"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                  required
                />
              </label>

              <button
                type="submit"
                className="w-full rounded-xl bg-blue-600 px-4 py-3.5 text-sm font-semibold text-white transition hover:bg-blue-700"
              >
                Continue to dashboard
              </button>
            </form>

            <p className="mt-6 text-center text-xs leading-5 text-slate-400">
              Demo login — no password required yet.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}