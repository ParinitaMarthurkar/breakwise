"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type User = { name: string; email: string };
type Business = { name: string; industry: string };

type View =
  | "Dashboard"
  | "Businesses"
  | "Dependency Maps"
  | "Scenarios"
  | "Recovery Plans"
  | "Profile";

const navItems: View[] = [
  "Dashboard",
  "Businesses",
  "Dependency Maps",
  "Scenarios",
  "Recovery Plans",
  "Profile",
];

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [business, setBusiness] = useState<Business | null>(null);
  const [activeView, setActiveView] = useState<View>("Dashboard");
  const [simulationRun, setSimulationRun] = useState(false);
  const [fixApplied, setFixApplied] = useState(false);

  useEffect(() => {
    const savedUser = localStorage.getItem("breakwise-user");
    const savedBusiness = localStorage.getItem("breakwise-business");

    if (!savedUser) {
      router.replace("/");
      return;
    }

    setUser(JSON.parse(savedUser));

    if (savedBusiness) {
      setBusiness(JSON.parse(savedBusiness));
    }
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
          <div className="mb-9 flex items-center gap-3 px-2">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-blue-600 text-lg font-bold text-white">
              B
            </div>
            <div>
              <p className="text-lg font-bold tracking-tight">BREAKWISE</p>
              <p className="text-xs text-slate-500">Business resilience</p>
            </div>
          </div>

          <nav className="space-y-1">
            {navItems.map((item) => (
              <button
                key={item}
                onClick={() => setActiveView(item)}
                className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-medium transition ${
                  activeView === item
                    ? "bg-blue-50 text-blue-700"
                    : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                <span>
                  {item === "Dashboard" && "▦"}
                  {item === "Businesses" && "▣"}
                  {item === "Dependency Maps" && "⌘"}
                  {item === "Scenarios" && "◌"}
                  {item === "Recovery Plans" && "✓"}
                  {item === "Profile" && "●"}
                </span>
                {item}
              </button>
            ))}
          </nav>

          <div className="mt-auto rounded-2xl bg-blue-50 p-4">
            <p className="text-sm font-semibold">Resilience starts here</p>
            <p className="mt-1 text-xs leading-5 text-slate-500">
              Add a business, map dependencies, then test failures safely.
            </p>
          </div>
        </aside>

        <section className="min-w-0 flex-1">
          <header className="flex h-20 items-center justify-between border-b border-slate-200 bg-white px-6 sm:px-10">
            <div>
              <p className="text-sm text-slate-500">Your resilience workspace</p>
              <p className="font-semibold">{activeView}</p>
            </div>

            <div className="flex items-center gap-3">
              <div className="hidden text-right sm:block">
                <p className="text-sm font-semibold">{user.name}</p>
                <p className="text-xs text-slate-500">{user.email}</p>
              </div>
              <button
                onClick={() => setActiveView("Profile")}
                className="grid h-10 w-10 place-items-center rounded-full bg-slate-900 text-sm font-bold text-white"
              >
                {initials}
              </button>
            </div>
          </header>

          <div className="mx-auto max-w-6xl px-6 py-10 sm:px-10">
            {activeView === "Dashboard" && (
              <DashboardView
                user={user}
                business={business}
                onCreate={() => router.push("/business/new")}
                onOpenBusinesses={() => setActiveView("Businesses")}
                onOpenMap={() => setActiveView("Dependency Maps")}
                onOpenScenarios={() => setActiveView("Scenarios")}
              />
            )}

            {activeView === "Businesses" && (
              <BusinessesView
                business={business}
                onCreate={() => router.push("/business/new")}
                onOpenMap={() => setActiveView("Dependency Maps")}
                onOpenScenarios={() => setActiveView("Scenarios")}
              />
            )}

            {activeView === "Dependency Maps" && <MapView business={business} />}

            {activeView === "Scenarios" && (
              <ScenariosView
                business={business}
                simulationRun={simulationRun}
                fixApplied={fixApplied}
                onRun={() => setSimulationRun(true)}
                onFix={() => setFixApplied(true)}
              />
            )}

            {activeView === "Recovery Plans" && (
              <RecoveryPlansView business={business} fixApplied={fixApplied} />
            )}

            {activeView === "Profile" && (
              <ProfileView user={user} fixApplied={fixApplied} onSignOut={signOut} />
            )}
          </div>
        </section>
      </div>
    </main>
  );
}

function DashboardView({
  user,
  business,
  onCreate,
  onOpenBusinesses,
  onOpenMap,
  onOpenScenarios,
}: {
  user: User;
  business: Business | null;
  onCreate: () => void;
  onOpenBusinesses: () => void;
  onOpenMap: () => void;
  onOpenScenarios: () => void;
}) {
  return (
    <>
      <section className="rounded-3xl bg-gradient-to-br from-blue-600 to-blue-700 px-7 py-9 text-white sm:px-10">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-100">
          Welcome back
        </p>
        <h1 className="mt-3 text-3xl font-bold sm:text-4xl">Hi, {user.name}.</h1>
        <p className="mt-3 max-w-xl text-blue-100">
          Build a stronger business by understanding what could fail before it does.
        </p>
      </section>

      {!business ? (
        <section className="mt-8 rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center">
          <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-blue-50 text-2xl font-bold text-blue-600">
            +
          </div>
          <h2 className="mt-5 text-xl font-bold">Your dashboard is empty</h2>
          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
            Create your first business to start mapping dependencies and preparing recovery plans.
          </p>
          <button onClick={onCreate} className="mt-6 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700">
            + Create your first business
          </button>
        </section>
      ) : (
        <section className="mt-8 grid gap-5 lg:grid-cols-3">
          <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-2">
            <p className="text-xs font-semibold uppercase tracking-wider text-blue-600">
              Your business
            </p>
            <h2 className="mt-2 text-2xl font-bold">{business.name}</h2>
            <p className="mt-1 text-sm text-slate-500">{business.industry}</p>

            <div className="mt-6 flex flex-wrap gap-3">
              <button onClick={onOpenBusinesses} className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold hover:bg-slate-50">
                Open business
              </button>
              <button onClick={onOpenMap} className="rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700">
                View dependency map
              </button>
              <button onClick={onOpenScenarios} className="rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-slate-700">
                Run what-if scenario
              </button>
            </div>
          </article>

          <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Current status
            </p>
            <p className="mt-5 text-lg font-bold">Ready for mapping</p>
            <p className="mt-2 text-sm leading-6 text-slate-500">
              Add dependencies next to calculate risks and resilience.
            </p>
          </article>
        </section>
      )}
    </>
  );
}

function BusinessesView({
  business,
  onCreate,
  onOpenMap,
  onOpenScenarios,
}: {
  business: Business | null;
  onCreate: () => void;
  onOpenMap: () => void;
  onOpenScenarios: () => void;
}) {
  return (
    <>
      <div className="flex items-end justify-between">
        <div>
          <p className="text-sm font-semibold text-blue-600">YOUR BUSINESSES</p>
          <h1 className="mt-2 text-3xl font-bold">Business workspace</h1>
        </div>
        <button onClick={onCreate} className="rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white">
          + Create business
        </button>
      </div>

      {!business ? (
        <p className="mt-8 rounded-2xl bg-white p-8 text-slate-500">No businesses created yet.</p>
      ) : (
        <article className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold">{business.name}</h2>
          <p className="mt-1 text-sm text-slate-500">{business.industry}</p>
          <div className="mt-6 flex gap-3">
            <button onClick={onOpenMap} className="rounded-xl bg-blue-50 px-4 py-2.5 text-sm font-semibold text-blue-700">
              Dependency map
            </button>
            <button onClick={onOpenScenarios} className="rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white">
              Test a scenario
            </button>
          </div>
        </article>
      )}
    </>
  );
}

function MapView({ business }: { business: Business | null }) {
  if (!business) return <Empty title="No dependency map yet" text="Create a business first, then add its dependencies." />;

  const nodes = ["Payment Provider", "Payment System", "Checkout", "Orders", "Revenue"];

  return (
    <>
      <p className="text-sm font-semibold text-blue-600">DEPENDENCY MAP</p>
      <h1 className="mt-2 text-3xl font-bold">{business.name}</h1>
      <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-7">
        <p className="mb-7 text-sm text-slate-500">Mock dependency map — nodes will become editable next.</p>
        <div className="flex flex-col items-center gap-2">
          {nodes.map((node, index) => (
            <div key={node} className="flex flex-col items-center">
              <div className="rounded-xl border border-blue-200 bg-blue-50 px-6 py-3 text-sm font-semibold text-blue-800">
                {node}
              </div>
              {index < nodes.length - 1 && <span className="py-1 text-xl text-slate-400">↓</span>}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

function ScenariosView({
  business,
  simulationRun,
  fixApplied,
  onRun,
  onFix,
}: {
  business: Business | null;
  simulationRun: boolean;
  fixApplied: boolean;
  onRun: () => void;
  onFix: () => void;
}) {
  if (!business) return <Empty title="No scenario available yet" text="Create a business first." />;

  return (
    <>
      <p className="text-sm font-semibold text-blue-600">WHAT IF...?</p>
      <h1 className="mt-2 text-3xl font-bold">Test a possible failure</h1>

      <article className="mt-8 max-w-2xl rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
        <p className="text-sm font-semibold text-rose-600">PAYMENT PROVIDER FAILURE</p>
        <h2 className="mt-2 text-xl font-bold">Payment Provider becomes unavailable</h2>
        <p className="mt-3 text-sm leading-6 text-slate-500">
          Payment processing may stop, affecting checkout, orders, and revenue.
        </p>

        {!simulationRun ? (
          <button onClick={onRun} className="mt-6 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white">
            Run simulation
          </button>
        ) : (
          <div className="mt-6 rounded-xl bg-rose-50 p-5">
            <p className="font-bold text-rose-700">Simulation result: HIGH impact</p>
            <p className="mt-2 text-sm text-slate-600">
              Affected: Payment System → Checkout → Orders → Revenue
            </p>

            {!fixApplied ? (
              <button onClick={onFix} className="mt-5 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white">
                Apply fix: Add backup payment processor
              </button>
            ) : (
              <p className="mt-5 font-semibold text-emerald-700">
                ✓ Fix applied — Recovery plan published.
              </p>
            )}
          </div>
        )}
      </article>
    </>
  );
}

function RecoveryPlansView({
  business,
  fixApplied,
}: {
  business: Business | null;
  fixApplied: boolean;
}) {
  if (!business || !fixApplied) {
    return <Empty title="No recovery plans published yet" text="Run a scenario and apply a recovery action to publish one." />;
  }

  return (
    <article className="max-w-2xl rounded-2xl border border-emerald-200 bg-white p-7 shadow-sm">
      <p className="text-sm font-semibold text-emerald-600">PUBLISHED RECOVERY PLAN</p>
      <h1 className="mt-2 text-2xl font-bold">Payment Failure Recovery Plan</h1>
      <p className="mt-3 text-sm text-slate-500">
        Backup Payment Processor added for {business.name}.
      </p>
      <p className="mt-5 text-sm font-semibold text-emerald-700">✓ Published successfully</p>
    </article>
  );
}

function ProfileView({
  user,
  fixApplied,
  onSignOut,
}: {
  user: User;
  fixApplied: boolean;
  onSignOut: () => void;
}) {
  return (
    <article className="max-w-2xl rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <p className="text-sm font-semibold text-blue-600">YOUR PROFILE</p>
      <h1 className="mt-2 text-2xl font-bold">{user.name}</h1>
      <p className="mt-1 text-slate-500">{user.email}</p>

      <div className="mt-7 rounded-xl bg-slate-50 p-5">
        <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
          Recovery plan status
        </p>
        <p className="mt-2 font-semibold">
          {fixApplied ? "1 recovery plan published" : "No recovery plans published"}
        </p>
      </div>

      <button onClick={onSignOut} className="mt-7 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-rose-600">
        Sign out
      </button>
    </article>
  );
}

function Empty({ title, text }: { title: string; text: string }) {
  return (
    <section className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center">
      <h1 className="text-2xl font-bold">{title}</h1>
      <p className="mt-3 text-slate-500">{text}</p>
    </section>
  );
}