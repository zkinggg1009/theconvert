import Link from "next/link";
import InformationPage, { InformationSection } from "@/components/InformationPage";
import { createInformationMetadata } from "@/lib/information-metadata";
import { supportEmail, supportName } from "@/lib/contact";

const description = "Contact TheConverT Support with questions, feedback, or reports about the site.";

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
      <InformationSection title={supportName}>
        <p>
          Email us at <a className="font-medium text-[var(--foreground)] underline underline-offset-4" href={`mailto:${supportEmail}`}>{supportEmail}</a>.
        </p>
      </InformationSection>

      <InformationSection title="Share feedback">
        <p>
          Use the feedback form to prepare a message about a bug, conversion issue, feature request, or suggestion.
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
