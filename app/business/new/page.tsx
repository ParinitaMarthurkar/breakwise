"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateBusinessPage() {
  const router = useRouter();
  const [businessName, setBusinessName] = useState("");
  const [industry, setIndustry] = useState("");

  function createBusiness(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!businessName.trim()) return;

    localStorage.setItem(
      "breakwise-business",
      JSON.stringify({
        name: businessName.trim(),
        industry: industry.trim() || "Not specified",
      })
    );

    router.push("/dashboard");
  }

  return (
    <main className="min-h-screen bg-[#F7F8FA] px-6 py-10 sm:px-10">
      <div className="mx-auto max-w-2xl">
        <button
          onClick={() => router.push("/dashboard")}
          className="mb-8 text-sm font-semibold text-slate-500 hover:text-blue-600"
        >
          ← Back to dashboard
        </button>

        <section className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm sm:p-10">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-600">
            Step 1 of 3
          </p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900">
            Create your business
          </h1>
          <p className="mt-3 text-slate-500">
            Start with the basic details. We will add dependencies next.
          </p>

          <form className="mt-8 space-y-6" onSubmit={createBusiness}>
            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-slate-700">
                Business name
              </span>
              <input
                value={businessName}
                onChange={(event) => setBusinessName(event.target.value)}
                placeholder="Example: Acme Store"
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                required
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-slate-700">
                Industry
              </span>
              <input
                value={industry}
                onChange={(event) => setIndustry(event.target.value)}
                placeholder="Example: E-commerce"
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              />
            </label>

            <button
              type="submit"
              className="w-full rounded-xl bg-blue-600 px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              Create business
            </button>
          </form>
        </section>
      </div>
    </main>
  );
}