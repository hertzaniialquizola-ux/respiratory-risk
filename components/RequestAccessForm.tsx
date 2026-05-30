"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

type FormState =
  | { status: "idle" }
  | { status: "submitting" }
  | { status: "success"; email: string }
  | { status: "error" };

export default function RequestAccessForm() {
  const [formState, setFormState] = useState<FormState>({ status: "idle" });
  const [emailError, setEmailError] = useState<string | null>(null);

  if (formState.status === "success") {
    return (
      <div className="py-gutter text-center md:text-left">
        <p className="font-body-lg text-body-lg text-on-surface">
          Request received. We&apos;ll be in touch at{" "}
          <span className="font-semibold text-primary">{formState.email}</span>.
        </p>
      </div>
    );
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setEmailError(null);

    const form = e.currentTarget;
    const data = new FormData(form);
    const full_name = (data.get("fullName") as string).trim();
    const lgu_city = (data.get("lguCity") as string).trim();
    const email = (data.get("officialEmail") as string).trim();

    if (!email.endsWith(".gov.ph")) {
      setEmailError("Email must be an official .gov.ph address.");
      return;
    }

    setFormState({ status: "submitting" });

    const { error } = await supabase
      .from("access_requests")
      .insert({ full_name, lgu_city, email });

    if (error) {
      setFormState({ status: "error" });
    } else {
      setFormState({ status: "success", email });
    }
  }

  return (
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
          name="fullName"
          placeholder="e.g., Jane Doe"
          required
          type="text"
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
          name="lguCity"
          placeholder="e.g., City of Manila"
          required
          type="text"
        />
      </div>
      <div className="space-y-xs">
        <label
          className="block font-label-md text-label-md text-on-surface uppercase"
          htmlFor="officialEmail"
        >
          Official Email
        </label>
        <input
          className={`w-full h-12 px-gutter border rounded-lg bg-surface font-body-md text-body-md text-on-surface focus:ring-2 focus:ring-primary focus:border-primary transition-colors placeholder:text-on-surface-variant/50 ${
            emailError ? "border-error focus:ring-error" : "border-outline"
          }`}
          id="officialEmail"
          name="officialEmail"
          placeholder="name@city.gov.ph"
          required
          type="email"
        />
        {emailError ? (
          <p className="font-label-sm text-label-sm text-error mt-xs">
            {emailError}
          </p>
        ) : (
          <p className="font-label-sm text-label-sm text-on-surface-variant mt-xs">
            Please use your official government or institutional email address.
          </p>
        )}
      </div>

      {formState.status === "error" && (
        <p className="font-label-sm text-label-sm text-error">
          Something went wrong. Try again.
        </p>
      )}

      <div className="pt-gutter">
        <button
          type="submit"
          disabled={formState.status === "submitting"}
          className="w-full md:w-auto h-12 px-margin-desktop bg-primary text-on-primary font-label-md text-label-md rounded-lg flex items-center justify-center gap-sm hover:opacity-90 hover:scale-95 transition-all duration-200 uppercase shadow-md disabled:opacity-60 disabled:cursor-not-allowed disabled:scale-100"
        >
          {formState.status === "submitting" ? "Submitting…" : "Submit Request"}
          {formState.status !== "submitting" && (
            <span className="material-symbols-outlined">arrow_forward</span>
          )}
        </button>
      </div>
    </form>
  );
}
