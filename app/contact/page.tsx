import Link from "next/link";
import InformationPage, { InformationSection } from "@/components/InformationPage";
import { createInformationMetadata } from "@/lib/information-metadata";

const description = "A straightforward place to find TheConverT contact information.";

export const metadata = createInformationMetadata({
  title: "Contact",
  description,
  path: "/contact",
});

export default function ContactPage() {
  return (
    <InformationPage
      section="Company"
      title="Contact"
      description={description}
    >
      <InformationSection title="Contact channel">
        <p>
          A public email address, phone number, or contact form is not currently
          available. We will add a direct channel here when one is ready.
        </p>
      </InformationSection>

      <InformationSection title="Share feedback">
        <p>
          The Feedback page explains what kind of product feedback is useful and
          whether a submission channel is available.
        </p>
        <p>
          <Link
            href="/feedback"
            className="font-medium text-[var(--foreground)] underline decoration-[var(--border-strong)] underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]"
          >
            Visit Feedback
          </Link>
        </p>
      </InformationSection>
    </InformationPage>
  );
}
