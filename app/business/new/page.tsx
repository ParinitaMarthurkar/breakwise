"use client";

import { FormEvent, useRef, useState } from "react";
import { useRouter } from "next/navigation";

type UploadedFile = {
  name: string;
  size: number;
  type: string;
};

export default function CreateBusinessPage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [businessName, setBusinessName] = useState("");
  const [industry, setIndustry] = useState("");
  const [files, setFiles] = useState<UploadedFile[]>([]);

  function handleFiles(selectedFiles: FileList | null) {
    if (!selectedFiles) return;

    const newFiles = Array.from(selectedFiles).map((file) => ({
      name: file.name,
      size: file.size,
      type: file.type,
    }));

    setFiles((currentFiles) => [...currentFiles, ...newFiles].slice(0, 5));
  }

  function removeFile(fileName: string) {
    setFiles((currentFiles) =>
      currentFiles.filter((file) => file.name !== fileName)
    );
  }

  function createBusiness(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!businessName.trim()) return;

    localStorage.setItem(
      "breakwise-business",
      JSON.stringify({
        name: businessName.trim(),
        industry: industry.trim() || "Not specified",
        files,
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
            Add basic details and any documents that help describe your business.
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

            <div>
              <div className="mb-2 flex items-center justify-between">
                <span className="text-sm font-semibold text-slate-700">
                  Upload business files
                </span>
                <span className="text-xs text-slate-400">Optional · up to 5 files</span>
              </div>

              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept=".pdf,.doc,.docx,.csv,.xls,.xlsx,.png,.jpg,.jpeg"
                className="hidden"
                onChange={(event) => handleFiles(event.target.files)}
              />

              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="flex w-full flex-col items-center rounded-2xl border-2 border-dashed border-blue-200 bg-blue-50/50 px-6 py-8 text-center transition hover:border-blue-400 hover:bg-blue-50"
              >
                <span className="text-2xl text-blue-600">↑</span>
                <span className="mt-2 text-sm font-semibold text-blue-700">
                  Choose files from your computer
                </span>
                <span className="mt-1 text-xs text-slate-500">
                  PDF, DOCX, CSV, XLSX, PNG, or JPG
                </span>
              </button>

              {files.length > 0 && (
                <div className="mt-4 space-y-2">
                  {files.map((file) => (
                    <div
                      key={file.name}
                      className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-4 py-3"
                    >
                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-slate-700">
                          {file.name}
                        </p>
                        <p className="text-xs text-slate-400">
                          {(file.size / 1024).toFixed(1)} KB
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={() => removeFile(file.name)}
                        className="ml-4 text-sm font-semibold text-rose-500 hover:text-rose-700"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

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