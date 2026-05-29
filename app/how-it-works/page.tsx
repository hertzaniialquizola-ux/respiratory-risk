import Image from "next/image";

export const metadata = {
  title: "How It Works - Respiratory Risk Assessment",
};

export default function HowItWorksPage() {
  return (
    <main className="flex-grow max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop py-margin-mobile md:py-margin-desktop w-full flex flex-col gap-margin-mobile md:gap-margin-desktop relative z-10">
      <header className="mb-gutter">
        <h1 className="font-headline-lg-mobile md:font-headline-xl text-headline-lg-mobile md:text-headline-xl text-primary mb-sm">
          Methodology &amp; Operations
        </h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant max-w-3xl mt-gutter">
          Understanding the analytical framework behind our respiratory risk
          correlation. This dashboard integrates environmental monitoring with
          public health records to provide actionable insights for municipal
          health committees.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
        <section className="md:col-span-12 border border-outline-variant bg-surface-container-low rounded-xl p-gutter flex flex-col md:flex-row gap-gutter items-center">
          <div className="flex-1 order-2 md:order-1">
            <div className="flex items-center gap-sm mb-gutter">
              <span className="material-symbols-outlined text-secondary text-3xl">
                database
              </span>
              <h2 className="font-headline-md text-headline-md text-primary">
                Data Integration Framework
              </h2>
            </div>
            <p className="font-body-md text-body-md text-on-surface mb-gutter">
              The core function of the assessment tool is the synchronized
              tracking of environmental and epidemiological data streams.
            </p>
            <ul className="flex flex-col gap-gutter mt-gutter">
              <li className="flex items-start gap-sm">
                <span className="material-symbols-outlined text-secondary mt-1">
                  air
                </span>
                <div>
                  <h3 className="font-label-md text-label-md text-primary">
                    Environmental Monitoring
                  </h3>
                  <p className="font-label-sm text-label-sm text-on-surface-variant mt-1">
                    Continuous ingestion of Air Quality Index (AQI) and PM10
                    particulate matter readings from official municipal sensors.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-sm">
                <span className="material-symbols-outlined text-secondary mt-1">
                  medical_services
                </span>
                <div>
                  <h3 className="font-label-md text-label-md text-primary">
                    Health Data Correlation
                  </h3>
                  <p className="font-label-sm text-label-sm text-on-surface-variant mt-1">
                    Secure cross-referencing with anonymized pediatric
                    respiratory admission rates from partner regional hospitals.
                  </p>
                </div>
              </li>
            </ul>
          </div>
          <div className="flex-1 order-1 md:order-2 w-full h-64 bg-surface border border-outline-variant rounded-lg overflow-hidden relative">
            <Image
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAkPZMDF2fnNaP4NGoedRf73N8ycpqI3bUyHP8_d_Wo5T97GQZKwbUOZX4nvYSjhhEXbtVLFCSu4BK3cPcnZidXjNaE-DFVGPB-RSyh7xdYMXuqLx6KIy3Lom-NWVi64IfLbfj4f6u1f5IPZKyfJeHIQaRWGx-j8EiSofDqdSP7DxPzV-i4srBrs-vHKW3BO7W8shYnYLvwg6aW9p6ukJFxcjS_6q1gD5tiNIPm6kLaX1hNlIAyBkzFu7ev7nLTDx3Ep83_C8q97xeb"
              alt="Data integration dashboard showing charts and graphs"
              fill
              className="object-cover opacity-80 mix-blend-luminosity"
              unoptimized
            />
          </div>
        </section>

        <section className="md:col-span-6 border border-outline-variant bg-surface-container-low rounded-xl p-gutter flex flex-col">
          <div className="flex items-center gap-sm mb-gutter">
            <span className="material-symbols-outlined text-secondary text-3xl">
              location_city
            </span>
            <h2 className="font-headline-md text-headline-md text-primary">
              Municipal Context Switching
            </h2>
          </div>
          <p className="font-body-md text-body-md text-on-surface mb-margin-desktop flex-grow">
            The interface is structured to allow administrative users to
            transition seamlessly between regional datasets, facilitating
            comparative risk assessments across different Philippine cities.
          </p>
          <div className="bg-surface-container border border-outline-variant rounded-lg p-gutter">
            <h3 className="font-label-md text-label-md text-on-surface-variant mb-sm uppercase">
              Regional Selection Interface
            </h3>
            <div className="flex gap-sm flex-wrap mt-sm">
              <div className="px-lg py-sm bg-surface-container-lowest border border-secondary text-secondary rounded-full font-label-md text-label-md flex items-center gap-1">
                <span className="material-symbols-outlined text-[18px]">
                  check_circle
                </span>
                Quezon City
              </div>
              <div className="px-lg py-sm bg-surface-container-lowest border border-outline-variant text-on-surface-variant rounded-full font-label-md text-label-md">
                Makati City
              </div>
              <div className="px-lg py-sm bg-surface-container-lowest border border-outline-variant text-on-surface-variant rounded-full font-label-md text-label-md">
                Cebu City
              </div>
            </div>
          </div>
        </section>

        <section className="md:col-span-6 border border-outline-variant bg-surface-container-low rounded-xl p-gutter flex flex-col">
          <div className="flex items-center gap-sm mb-gutter">
            <span className="material-symbols-outlined text-secondary text-3xl">
              description
            </span>
            <h2 className="font-headline-md text-headline-md text-primary">
              Advocacy Brief Generation
            </h2>
          </div>
          <p className="font-body-md text-body-md text-on-surface mb-margin-desktop flex-grow">
            Transform complex correlated data into structured, printable reports
            designed specifically for city council health committees to support
            evidence-based policy making.
          </p>
          <button
            type="button"
            className="w-full bg-primary text-on-primary font-label-md text-label-md py-lg rounded-full flex items-center justify-center gap-sm hover:bg-primary-container hover:text-on-primary-container transition-colors mt-auto"
          >
            <span className="material-symbols-outlined">download</span>
            Generate Committee Report
          </button>
        </section>
      </div>
    </main>
  );
}
