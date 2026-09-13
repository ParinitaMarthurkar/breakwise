"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type User = {
  name: string;
  email: string;
};

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("breakwise-user");

    if (!savedUser) {
      router.replace("/");
      return;
    }

    setUser(JSON.parse(savedUser));
  }, [router]);

  if (!user) {
    return <main className="min-h-screen bg-[#F7F8FA]" />;
  }

  return (
    <main className="min-h-screen bg-[#F7F8FA]">
      <header className="flex h-20 items-center justify-between border-b border-slate-200 bg-white px-6 sm:px-10">
        <div className="flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-xl bg-blue-600 text-lg font-bold text-white">
            B
          </div>
          <div>
            <p className="font-bold tracking-tight text-slate-900">BREAKWISE</p>
            <p className="text-xs text-slate-500">Business resilience</p>
          </div>
        </div>

        <div className="grid h-10 w-10 place-items-center rounded-full bg-slate-900 text-sm font-bold text-white">
          {user.name.slice(0, 2).toUpperCase()}
        </div>
      </header>

      <section className="mx-auto flex min-h-[calc(100vh-80px)] max-w-5xl items-center justify-center px-6">
        <div className="w-full max-w-2xl text-center">
          <div className="mx-auto grid h-20 w-20 place-items-center rounded-3xl bg-blue-100 text-3xl font-bold text-blue-600">
            B
          </div>

          <p className="mt-8 text-sm font-semibold uppercase tracking-[0.18em] text-blue-600">
            Your resilience workspace
          </p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
            Welcome, {user.name}.
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-slate-500">
            Your dashboard is ready. Add your first business when you are ready
            to map dependencies and test possible disruptions.
          </p>

          <div className="mt-10 rounded-2xl border border-dashed border-slate-300 bg-white p-8">
            <p className="font-semibold text-slate-700">No businesses added yet</p>
            <p className="mt-2 text-sm text-slate-500">
              Your resilience overview will appear here.
            </p>
            <button
              disabled
              className="mt-6 cursor-not-allowed rounded-xl bg-slate-100 px-5 py-3 text-sm font-semibold text-slate-400"
            >
              + Create your first business
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}