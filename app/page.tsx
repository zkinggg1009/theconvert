import Link from "next/link";
import Header from "@/components/Header";

const products = [
  {
    href: "/units",
    title: "Unit Converter",
    description: "Convert everyday units simply and precisely.",
    icon: "units",
    accent: "text-indigo-600 dark:text-indigo-300",
    glow: "radial-gradient(ellipse 58% 58% at 100% 0%, rgba(91, 103, 190, 0.075), transparent 100%)",
  },
  {
    href: "/currency",
    title: "Currency",
    description: "Convert currencies using the latest available exchange rates.",
    icon: "currency",
    accent: "text-emerald-700 dark:text-emerald-300",
    glow: "radial-gradient(ellipse 58% 58% at 100% 0%, rgba(48, 143, 124, 0.075), transparent 100%)",
  },
];

export default function Home() {
  return (
    <div
      className="min-h-screen bg-[var(--background)] text-[var(--foreground)]"
      style={{
        backgroundImage:
          "radial-gradient(ellipse 90% 46% at 50% 0%, color-mix(in srgb, var(--surface) 82%, transparent), transparent)",
      }}
    >
      <div className="mx-auto flex min-h-screen max-w-5xl flex-col px-4 sm:px-6 lg:px-8">
        <Header brandVariant="home" />

        <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col justify-center py-10 sm:py-14">
          <section className="mb-10 text-center sm:mb-14">
            <p className="text-[1.35rem] font-semibold leading-[1.22] tracking-[-0.035em] text-[var(--foreground)] text-balance sm:text-[1.8rem] sm:leading-[1.16] sm:tracking-[-0.04em]">
              Tools for everyday conversion.
            </p>
          </section>

          <section aria-labelledby="products-heading">
            <div className="mb-5 flex items-center gap-4 sm:mb-7">
              <h2
                id="products-heading"
                className="text-[1.1rem] font-semibold leading-[1.35] tracking-[-0.02em] text-[var(--foreground)] sm:text-xl"
              >
                Our Products
              </h2>
              <div
                aria-hidden="true"
                className="h-px flex-1 bg-[var(--border)]"
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {products.map((product) => (
                <Link
                  key={product.href}
                  href={product.href}
                  className="group relative isolate flex min-h-60 flex-col overflow-hidden rounded-[1.35rem] border border-[var(--border)] bg-[var(--surface)] p-6 shadow-[0_12px_34px_rgba(29,29,31,0.035)] transition-[transform,border-color,box-shadow,background-color] duration-200 ease-out hover:-translate-y-1 hover:border-[var(--border-strong)] hover:bg-[var(--panel)] hover:shadow-[0_20px_44px_rgba(29,29,31,0.075)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)] sm:min-h-64 sm:p-8"
                >
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0"
                    style={{ backgroundImage: product.glow }}
                  />

                  <div
                    aria-hidden="true"
                    className={`relative flex size-12 items-center justify-center rounded-2xl border border-[var(--border)] bg-[var(--panel)] shadow-sm ${product.accent}`}
                  >
                    {product.icon === "units" ? (
                      <svg
                        className="h-5 w-5"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.7"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M4 8h15m0 0-3-3m3 3-3 3M20 16H5m0 0 3 3m-3-3 3-3" />
                      </svg>
                    ) : (
                      <svg
                        className="h-5 w-5"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.7"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M12 3v18M16 7.5C16 6.1 14.2 5 12 5S8 6.1 8 7.5 9.8 10 12 10s4 1.1 4 2.5-1.8 2.5-4 2.5-4-1.1-4-2.5" />
                      </svg>
                    )}
                  </div>

                  <div className="relative mt-auto pt-9">
                    <h3 className="text-[1.4rem] font-semibold leading-[1.2] tracking-[-0.025em] text-[var(--foreground)] sm:text-2xl">
                      {product.title}
                    </h3>
                    <p className="mt-2 max-w-sm text-[0.9rem] leading-[1.6] tracking-[0.005em] text-[var(--muted)] sm:text-[0.95rem]">
                      {product.description}
                    </p>
                    <span className="mt-7 inline-flex items-center gap-2 text-[0.85rem] font-semibold leading-[1.4] tracking-[0.015em] text-[var(--foreground)]">
                      Explore
                      <span
                        aria-hidden="true"
                        className="transition-transform duration-200 group-hover:translate-x-1"
                      >
                        →
                      </span>
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        </main>

        <footer className="mt-auto px-2 pt-3 pb-2 text-center text-xs leading-relaxed text-[var(--muted)]">
          © 2026 TheConverT · Built by King Tai · Privacy · Terms · Contact
        </footer>
      </div>
    </div>
  );
}
