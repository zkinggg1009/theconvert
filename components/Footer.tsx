import Link from "next/link";

const footerLinks = [
  { href: "/feedback", label: "Feedback" },
  { href: "/contact", label: "Contact" },
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
];

export default function Footer({ className = "" }: { className?: string }) {
  return (
    <footer className={`mt-auto px-2 pt-3 pb-2 text-center text-xs leading-relaxed text-[var(--muted)] ${className}`}>
      <span>© 2026 TheConverT · Built by King Tai · </span>
      <nav aria-label="Footer navigation" className="inline-flex flex-wrap justify-center gap-x-2">
        {footerLinks.map((link, index) => (
          <span key={link.href}>
            {index > 0 && <span aria-hidden="true">· </span>}
            <Link className="underline decoration-transparent underline-offset-2 transition-colors hover:text-[var(--foreground)] hover:decoration-current" href={link.href}>
              {link.label}
            </Link>
          </span>
        ))}
      </nav>
    </footer>
  );
}
