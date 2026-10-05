import InformationPage, { InformationSection } from "@/components/InformationPage";
import { createInformationMetadata } from "@/lib/information-metadata";

const description =
  "Plain-language terms for using TheConverT conversion tools.";

export const metadata = createInformationMetadata({
  title: "Terms of Use",
  description,
  path: "/terms",
});

export default function TermsPage() {
  return (
    <InformationPage
      section="Legal"
      title="Terms of Use"
      description={description}
    >
      <InformationSection title="Using the converters">
        <p>
          TheConverT provides unit and currency conversions for general
          informational use. Check results independently before relying on them
          for important decisions or transactions.
        </p>
      </InformationSection>

      <InformationSection title="Currency information">
        <p>
          Currency results use the latest available reference rate returned by
          Frankfurter. The displayed date identifies that rate record. Rates
          are not real-time trading prices and may differ from rates offered by
          a provider when you make a transaction.
        </p>
      </InformationSection>

      <InformationSection title="Availability and changes">
        <p>
          Conversion tools and external rate data may change or be temporarily
          unavailable. TheConverT may update these tools and these terms as the
          product evolves.
        </p>
      </InformationSection>
    </InformationPage>
  );
}
