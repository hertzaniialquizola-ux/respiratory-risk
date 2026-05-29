import Image from "next/image";
import Link from "next/link";
import HomeMapSection from "@/components/HomeMapSection";

const features = [
  {
    icon: "air",
    title: "City-Wide Air Quality Tracking",
    description:
      "View live AQI and PM10 levels across major Philippine cities. Monitor pollution trends to anticipate respiratory health impacts at the community level.",
  },
  {
    icon: "stethoscope",
    title: "Pediatric Risk Metrics",
    description:
      "Correlate environmental data with regional respiratory health outcomes. Identify vulnerable populations and allocate healthcare resources more efficiently.",
  },
  {
    icon: "description",
    title: "Policy Brief Generation",
    description:
      "Create printable advocacy briefs formatted for city council health committees. Translate complex data into clear, actionable policy recommendations.",
  },
] as const;

export default function HomePage() {
  return (
    <>
      <div className="fixed inset-0 z-[-1] opacity-10 pointer-events-none">
        <Image
          src="https://lh3.googleusercontent.com/aida-public/ADBb0ujWQ8Br0tLKQmkph-evZo0TIhRuw0B-rJR8YgQiY6ATTQKa1MW-gbR-cpn3WBvSESoIfOx7oGF17x8X32XymsIjQGQvMkfZU6veNs1OwxhkWfl0NAly9VE4IRPo9yvbDhSIUjPHNs-6N-4QhUExRDP4ZcerNIR98nGL-ycAEgZsUjjwbZAu_ZcwlDzOfEzI-sHFM6GwM7yeEsOtuMG3VQU85s7oyqWv-chJ7LtOFFEnST1ACvK7AofvyRBO"
          alt=""
          fill
          className="object-cover"
          priority
          unoptimized
        />
      </div>

      <main className="flex-grow">
        <section className="max-w-7xl mx-auto px-margin-mobile md:px-gutter py-margin-mobile md:py-margin-desktop grid grid-cols-1 md:grid-cols-2 gap-margin-mobile md:gap-margin-desktop items-center">
          <div className="flex flex-col gap-gutter">
            <h1 className="font-headline-lg-mobile md:font-headline-xl text-headline-lg-mobile md:text-headline-xl text-on-background">
              Data-Driven Respiratory Risk Assessment for Philippine Cities.
            </h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant">
              Equipping Local Government Units with air quality data and health
              risk metrics to drive evidence-based policy.
            </p>
            <div className="pt-sm">
              <Link
                href="/get-started"
                className="inline-flex bg-primary-container text-on-primary font-label-md text-label-md px-margin-desktop py-sm rounded-lg hover:opacity-90 active:scale-95 transition-all duration-200 shadow-md"
              >
                Get Started
              </Link>
            </div>
          </div>
          <HomeMapSection />
        </section>

        <section className="bg-surface-container/60 backdrop-blur-sm py-margin-mobile md:py-margin-desktop border-y border-outline-variant">
          <div className="max-w-7xl mx-auto px-margin-mobile md:px-gutter">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
              {features.map(({ icon, title, description }) => (
                <div
                  key={title}
                  className="bg-surface-container-lowest/80 p-gutter border border-outline-variant rounded-xl flex flex-col gap-sm shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="w-12 h-12 bg-primary-container rounded-lg flex items-center justify-center text-on-primary mb-sm">
                    <span className="material-symbols-outlined icon-fill">
                      {icon}
                    </span>
                  </div>
                  <h3 className="font-headline-md text-headline-md text-on-background">
                    {title}
                  </h3>
                  <p className="font-body-md text-body-md text-on-surface-variant">
                    {description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-margin-mobile md:px-gutter py-margin-mobile md:py-margin-desktop text-center flex flex-col items-center gap-gutter">
          <h2 className="font-headline-lg text-headline-lg text-on-background max-w-2xl mx-auto">
            Equip your LGU with institutional-grade health data.
          </h2>
          <Link
            href="/get-started"
            className="inline-flex bg-primary-container text-on-primary font-label-md text-label-md px-margin-desktop py-sm rounded-lg hover:opacity-90 active:scale-95 transition-all duration-200 shadow-md"
          >
            Get Started
          </Link>
        </section>
      </main>
    </>
  );
}
