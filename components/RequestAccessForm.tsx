"use client";

export default function RequestAccessForm() {
  const handleSubmit = () => {
    // Placeholder until Supabase auth / access requests are wired up.
  };

  return (
    <div className="space-y-gutter">
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
          className="w-full h-12 px-gutter border border-outline rounded-lg bg-surface font-body-md text-body-md text-on-surface focus:ring-2 focus:ring-primary focus:border-primary transition-colors placeholder:text-on-surface-variant/50"
          id="officialEmail"
          name="officialEmail"
          placeholder="name@city.gov.ph"
          required
          type="email"
        />
        <p className="font-label-sm text-label-sm text-on-surface-variant mt-xs">
          Please use your official government or institutional email address.
        </p>
      </div>
      <div className="pt-gutter">
        <button
          type="button"
          className="w-full md:w-auto h-12 px-margin-desktop bg-primary text-on-primary font-label-md text-label-md rounded-lg flex items-center justify-center gap-sm hover:opacity-90 hover:scale-95 transition-all duration-200 uppercase shadow-md"
          onClick={handleSubmit}
        >
          Submit Request
          <span className="material-symbols-outlined">arrow_forward</span>
        </button>
      </div>
    </div>
  );
}
