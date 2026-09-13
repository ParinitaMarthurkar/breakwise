"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type User = {
  name: string;
  email: string;
};

const navigation = [
  { icon: "▦", label: "Dashboard", active: true },
  { icon: "▣", label: "Businesses" },
  { icon: "⌘", label: "Dependency Maps" },
  { icon: "◌", label: "Scenarios" },
  { icon: "✓", label: "Recovery Plans" },
];

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [profileOpen, setProfileOpen] = useState(false);

  useEffect(() => {
    const savedUser = localStorage.getItem("breakwise-user");

    if (!savedUser) {
      router.replace("/");
      return;
    }

    setUser(JSON.parse(savedUser));
  }, [router]);

  function signOut() {
    localStorage.removeItem("breakwise-user");
    router.push("/");
  }

  if (!user) {
    return <main className="min-h-screen bg-[#F7F8FA]" />;
  }

  const initials = user.name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <main className="min-h-screen bg-[#F7F8FA] text-slate-900">
      <div className="flex min-h-screen">
        <aside className="hidden w-64 flex-col border-r border-slate-200 bg-white px-4 py-6 lg:flex">
          <div className="mb-10 flex items-center gap-3 px-2">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-blue-600 text-lg font-bold text-white">
              B
            </div>
            <div>
              <p className="text-lg font-bold tracking-tight">BREAKWISE</p>
              <p className="text-xs text-slate-500">Business resilience</p>
            </div>
          </div>

          <nav className="space-y-1">
            {navigation.map((item) => (
              <button
                key={item.label}
                className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-medium transition ${
                  item.active
                    ? "bg-blue-50 text-blue-700"
                    : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                <span className="w-5 text-center text-base">{item.icon}</span>
                {item.label}
              </button>
            ))}
          </nav>

          <div className="mt-auto rounded-2xl bg-blue-50 p-4">
            <p className="text-sm font-semibold text-slate-800">
              Your workspace is ready
            </p>
            <p className="mt-1 text-xs leading-5 text-slate-500">
              Add a business to begin mapping its resilience.
            </p>
          </div>
        </aside>

        <section className="min-w-0 flex-1">
          <header className="flex h-20 items-center justify-between border-b border-slate-200 bg-white px-6 sm:px-10">
            <div className="flex items-center gap-3 lg:hidden">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-blue-600 text-lg font-bold text-white">
                B
              </div>
              <p className="font-bold">BREAKWISE</p>
            </div>

            <div className="hidden lg:block">
              <p className="text-sm text-slate-500">Your resilience workspace</p>
              <p className="font-semibold">Dashboard</p>
            </div>

            <div className="relative">
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center gap-3 rounded-xl p-1.5 transition hover:bg-slate-50"
              >
                <div className="hidden text-right sm:block">
                  <p className="text-sm font-semibold">{user.name}</p>
                  <p className="text-xs text-slate-500">{user.email}</p>
                </div>
                <div className="grid h-10 w-10 place-items-center rounded-full bg-slate-900 text-sm font-bold text-white">
                  {initials}
                </div>
              </button>

              {profileOpen && (
                <div className="absolute right-0 top-14 z-10 w-72 rounded-2xl border border-slate-200 bg-white p-4 shadow-xl">
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Your profile
                  </p>

                  <div className="mt-4 flex items-center gap-3 border-b border-slate-100 pb-4">
                    <div className="grid h-11 w-11 place-items-center rounded-full bg-blue-100 font-bold text-blue-700">
                      {initials}
                    </div>
                    <div className="min-w-0">
                      <p className="truncate font-semibold">{user.name}</p>
                      <p className="truncate text-sm text-slate-500">{user.email}</p>
                    </div>
                  </div>

                  <div className="mt-4 rounded-xl bg-emerald-50 p-3">
                    <p className="text-xs font-semibold text-emerald-700">
                      RECOVERY PLAN STATUS
                    </p>
                    <p className="mt-1 text-sm font-semibold text-slate-800">
                      No recovery plans published
                    </p>
                    <p className="mt-1 text-xs text-slate-500">
                      Plans you publish will appear here.
                    </p>
                  </div>

                  <button
                    onClick={signOut}
                    className="mt-4 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 hover:text-rose-600"
                  >
                    Sign out
                  </button>
                </div>
              )}
            </div>
          </header>

          <div className="mx-auto max-w-6xl px-6 py-10 sm:px-10">
            <section className="rounded-3xl bg-gradient-to-br from-blue-600 to-blue-700 px-7 py-9 text-white sm:px-10">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-100">
                Welcome back
              </p>
              <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
                Hi, {user.name}.
              </h1>
              <p className="mt-3 max-w-xl text-sm leading-6 text-blue-100 sm:text-base">
                Build a stronger, more resilient business by understanding what
                could fail before it does.
              </p>
            </section>

            <section className="mt-8 grid gap-5 lg:grid-cols-3">
              <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-2">
                <div className="grid h-12 w-12 place-items-center rounded-xl bg-blue-50 text-xl font-bold text-blue-600">
                  +
                </div>
                <h2 className="mt-5 text-xl font-bold">Your dashboard is empty</h2>
                <p className="mt-2 max-w-lg text-sm leading-6 text-slate-500">
                  You have not added a business yet. When you do, your
                  dependencies, scenarios, risks, and resilience overview will
                  appear here.
                </p>

                <button
                  disabled
                  className="mt-6 cursor-not-allowed rounded-xl bg-slate-100 px-5 py-3 text-sm font-semibold text-slate-400"
                >
                  + Create your first business
                </button>
                <p className="mt-3 text-xs text-slate-400">
                  Available in the next step.
                </p>
              </article>

              <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Recovery plans
                </p>
                <div className="mt-5 grid h-12 w-12 place-items-center rounded-xl bg-amber-50 text-xl text-amber-600">
                  !
                </div>
                <h2 className="mt-5 font-bold">Nothing published yet</h2>
                <p className="mt-2 text-sm leading-6 text-slate-500">
                  Recovery plans will be created after you run and resolve a
                  failure scenario.
                </p>
              </article>
            </section>

            <section className="mt-8">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Coming soon
              </p>

              <div className="mt-4 grid gap-4 sm:grid-cols-3">
                {[
                  ["Businesses", "Add and manage your operations"],
                  ["Dependency maps", "See what each system relies on"],
                  ["What-if scenarios", "Test failures safely"],
                ].map(([title, description]) => (
                  <article
                    key={title}
                    className="rounded-2xl border border-slate-200 bg-white p-5 opacity-65"
                  >
                    <div className="h-2 w-14 rounded-full bg-slate-200" />
                    <h3 className="mt-5 font-bold">{title}</h3>
                    <p className="mt-2 text-sm text-slate-500">{description}</p>
                  </article>
                ))}
              </div>
            </section>
          </div>
        </section>
      </div>
    </main>
  );
}