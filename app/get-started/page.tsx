"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

const BACKGROUND_IMAGE =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDMj-53A10tXdEvshp9eo-BtltDw5QaK7Z87Fq3VVbNJFJiq0Ny6esPH3P9ODHF6vOKsBTmHBl0BWWZXdvsco-w0MvRtyAIiM158AUCpiY_e2HqE_fe2yjPNNMRZkc0XU-Ym76OA-X5ubkO1STKamcDG7mGsjoX1creQtdSKcH32-aU4Mex5GueuVfhxcKncz-iFpEwU_Nq1wbqb7yHGVHmD0FnFjD3VtgD2tM7BweFJQEzihteKpKmgQrNs0TtldMj6ylxVOE-_i4D";

type Status = "idle" | "submitting" | "success" | "error";

export default function GetStartedPage() {
  const [fullName, setFullName] = useState("");
  const [lguCity, setLguCity] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrorMessage("");

    if (!email.endsWith(".gov.ph")) {
      setErrorMessage("Please use an official .gov.ph email address");
      return;
    }

    setStatus("submitting");

    const { error } = await supabase
      .from("access_requests")
      .insert({ full_name: fullName, lgu_city: lguCity, email });

    if (error) {
      setStatus("error");
      setErrorMessage("Something went wrong. Please try again.");
    } else {
      setStatus("success");
    }
  }

  return (
    <main
      className="flex-grow flex flex-col justify-center py-margin-mobile md:py-margin-desktop px-margin-mobile md:px-gutter bg-cover bg-center bg-fixed"
      style={{ backgroundImage: `url('${BACKGROUND_IMAGE}')` }}
    >
      <div className="max-w-2xl mx-auto w-full">
        <div className="bg-surface/95 backdrop-blur-lg border border-outline-variant rounded-xl p-gutter md:p-margin-desktop shadow-lg">
          <div className="mb-margin-desktop text-center md:text-left border-b border-outline-variant pb-gutter">
            <h1 className="font-headline-xl text-headline-lg-mobile md:text-headline-xl mb-sm text-primary">
              Request Access
            </h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant">
              Request Access for your LGU.
            </p>
          </div>

          {status === "success" ? (
            <p className="font-body-lg text-body-lg text-on-surface">
              Request received. We will be in touch at{" "}
              <span className="font-semibold text-primary">{email}</span>.
            </p>
          ) : (
            <form className="space-y-gutter" onSubmit={handleSubmit} noValidate>
              <div className="space-y-xs">
                <label
                  className="block font-label-md text-label-md text-on-surface uppercase"
                  htmlFor="fullName"
                >
                  Full Name
                </label>
                <input
                  className="w-full h-12 px-gutter border border-outline rounded-lg bg-surface font-body-md text-body-md text-on-surface focus:ring-2 focus:ring-primary focus:border-primary transition-colors placeholder:text-on-surface-variant/50"
                  id="fullName"
                  placeholder="e.g., Jane Doe"
                  required
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </div>

              <div className="space-y-xs">
                <label
                  className="block font-label-md text-label-md text-on-surface uppercase"
                  htmlFor="lguCity"
                >
                  LGU / City
                </label>
                <input
                  className="w-full h-12 px-gutter border border-outline rounded-lg bg-surface font-body-md text-body-md text-on-surface focus:ring-2 focus:ring-primary focus:border-primary transition-colors placeholder:text-on-surface-variant/50"
                  id="lguCity"
                  placeholder="e.g., City of Manila"
                  required
                  type="text"
                  value={lguCity}
                  onChange={(e) => setLguCity(e.target.value)}
                />
              </div>

              <div className="space-y-xs">
                <label
                  className="block font-label-md text-label-md text-on-surface uppercase"
                  htmlFor="email"
                >
                  Official Email
                </label>
                <input
                  className="w-full h-12 px-gutter border border-outline rounded-lg bg-surface font-body-md text-body-md text-on-surface focus:ring-2 focus:ring-primary focus:border-primary transition-colors placeholder:text-on-surface-variant/50"
                  id="email"
                  placeholder="name@city.gov.ph"
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <p className="font-label-sm text-label-sm text-on-surface-variant mt-xs">
                  Please use your official government or institutional email
                  address.
                </p>
              </div>

              {errorMessage && (
                <p className="font-label-sm text-label-sm text-error">
                  {errorMessage}
                </p>
              )}

              <div className="pt-gutter">
                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="w-full md:w-auto h-12 px-margin-desktop bg-primary text-on-primary font-label-md text-label-md rounded-lg flex items-center justify-center gap-sm hover:opacity-90 hover:scale-95 transition-all duration-200 uppercase shadow-md disabled:opacity-60 disabled:cursor-not-allowed disabled:scale-100"
                >
                  {status === "submitting" ? "Submitting…" : "Submit Request"}
                  {status !== "submitting" && (
                    <span className="material-symbols-outlined">
                      arrow_forward
                    </span>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </main>
  );
}
