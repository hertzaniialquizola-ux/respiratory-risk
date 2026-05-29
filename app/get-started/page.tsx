import RequestAccessForm from "@/components/RequestAccessForm";

export const metadata = {
  title: "Get Started - Respiratory Risk Assessment",
};

const BACKGROUND_IMAGE =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDMj-53A10tXdEvshp9eo-BtltDw5QaK7Z87Fq3VVbNJFJiq0Ny6esPH3P9ODHF6vOKsBTmHBl0BWWZXdvsco-w0MvRtyAIiM158AUCpiY_e2HqE_fe2yjPNNMRZkc0XU-Ym76OA-X5ubkO1STKamcDG7mGsjoX1creQtdSKcH32-aU4Mex5GueuVfhxcKncz-iFpEwU_Nq1wbqb7yHGVHmD0FnFjD3VtgD2tM7BweFJQEzihteKpKmgQrNs0TtldMj6ylxVOE-_i4D";

export default function GetStartedPage() {
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

          <div className="bg-surface-container border border-outline-variant rounded-lg p-gutter mb-margin-desktop flex items-start gap-gutter">
            <span className="material-symbols-outlined text-on-surface-variant mt-[2px]">
              info
            </span>
            <p className="font-body-md text-body-md text-on-surface-variant">
              The Respiratory Risk Assessment Tool is provided as a single-file
              HTML dashboard for local deployment and institutional use.
            </p>
          </div>

          <RequestAccessForm />
        </div>
      </div>
    </main>
  );
}
