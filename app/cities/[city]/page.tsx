type CityPageProps = {
  params: Promise<{ city: string }>;
};

export default async function CityPage({ params }: CityPageProps) {
  const { city } = await params;
  const cityName = decodeURIComponent(city).replace(/-/g, " ");

  return (
    <main className="flex-grow max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop py-margin-mobile md:py-margin-desktop">
      <h1 className="font-headline-lg text-headline-lg text-primary capitalize">
        {cityName}
      </h1>
      <p className="font-body-md text-body-md text-on-surface-variant mt-gutter">
        City risk dashboard coming soon — PM10, cases, 7-day lag correlation,
        and risk score.
      </p>
    </main>
  );
}
