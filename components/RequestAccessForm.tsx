"use client";

import { useState, type FormEvent } from "react";
import { supabase } from "@/lib/supabase";

type Status = "idle" | "submitting" | "success" | "error";

export default function RequestAccessForm() {
  const [fullName, setFullName] = useState("");
  const [lguCity, setLguCity] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage("");

    if (!email.trim().toLowerCase().endsWith(".gov.ph")) {
      setStatus("error");
      setErrorMessage(
        "Please use an official .gov.ph email address to request access.",
      );
      return;
    }

    setStatus("submitting");

    if (!supabase) {
      setStatus("error");
      setErrorMessage(
        "The request service is unavailable right now. Please try again later.",
      );
      return;
    }

    try {
      const { error } = await supabase.from("access_requests").insert({
        full_name: fullName.trim(),
        lgu_city: lguCity.trim(),
        email: email.trim(),
      });

      if (error) {
        setStatus("error");
        setErrorMessage(
          "We couldn't submit your request. Please try again in a moment.",
        );
        return;
      }

      setStatus("success");
    } catch {
      setStatus("error");
      setErrorMessage(
        "We couldn't submit your request. Please try again in a moment.",
      );
    }
  }

  if (status === "success") {
    return (
      <div className="bg-surface-container border border-outline-variant rounded-lg p-gutter flex items-start gap-gutter">
        <span className="material-symbols-outlined text-primary mt-[2px]">
          check_circle
        </span>
        <div className="space-y-xs">
          <p className="font-label-md text-label-md text-on-surface uppercase">
            Request Received
          </p>
          <p className="font-body-md text-body-md text-on-surface-variant">
            Thank you. Your access request has been submitted and our team will
            review it shortly. You'll be contacted at your official email
            address.
          </p>
        </div>
      </div>
    );
  }

  return (
    <form className="space-y-gutter" onSubmit={handleSubmit}>
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
          value={fullName}
          onChange={(event) => setFullName(event.target.value)}
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
          value={lguCity}
          onChange={(event) => setLguCity(event.target.value)}
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
          className="w-full h-12 px-gutter border border-outline rounded-lg bg-surface font-body-md text-body-md text-on-surface focus:ring-2 focus:ring-primary focus:border-primary transition-colors placeholder:text-on-surface-variant/50"
          id="officialEmail"
          name="officialEmail"
          placeholder="name@city.gov.ph"
          required
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <p className="font-label-sm text-label-sm text-on-surface-variant mt-xs">
          Please use your official government or institutional email address.
        </p>
      </div>
      {status === "error" && errorMessage && (
        <div className="bg-error-container border border-error rounded-lg p-gutter flex items-start gap-sm">
          <span className="material-symbols-outlined text-error mt-[2px]">
            error
          </span>
          <p className="font-body-md text-body-md text-on-error-container">
            {errorMessage}
          </p>
        </div>
      )}
      <div className="pt-gutter">
        <button
          type="submit"
          disabled={status === "submitting"}
          className="w-full md:w-auto h-12 px-margin-desktop bg-primary text-on-primary font-label-md text-label-md rounded-lg flex items-center justify-center gap-sm hover:opacity-90 hover:scale-95 transition-all duration-200 uppercase shadow-md disabled:opacity-60 disabled:hover:scale-100 disabled:cursor-not-allowed"
        >
          {status === "submitting" ? "Submitting…" : "Submit Request"}
          <span className="material-symbols-outlined">arrow_forward</span>
        </button>
      </div>
    </form>
  );
}
