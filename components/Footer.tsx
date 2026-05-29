import Link from "next/link";

const footerLinks = [
  { href: "#", label: "Privacy Policy" },
  { href: "#", label: "Terms of Service" },
  { href: "#", label: "Accessibility" },
  { href: "#", label: "Contact Bureau" },
] as const;

export default function Footer() {
  return (
    <footer className="bg-surface-container-highest w-full border-t border-outline-variant mt-auto rounded-t-xl">
      <div className="flex flex-col md:flex-row justify-between items-center w-full px-margin-mobile md:px-margin-desktop py-xl gap-gutter max-w-7xl mx-auto">
        <div className="font-headline-md text-headline-md text-on-surface text-center md:text-left">
          Respiratory Risk Assessment
        </div>
        <div className="flex flex-wrap gap-gutter justify-center font-label-md text-label-md">
          {footerLinks.map(({ href, label }) => (
            <Link
              key={label}
              href={href}
              className="text-on-surface-variant hover:text-primary transition-colors duration-200"
            >
              {label}
            </Link>
          ))}
        </div>
        <p className="font-label-sm text-label-sm text-on-surface-variant text-center md:text-right">
          © 2024 Respiratory Risk Assessment. Official LGU Environmental Health
          Resource.
        </p>
      </div>
    </footer>
  );
}
