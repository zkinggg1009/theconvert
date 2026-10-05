import InformationPage, { InformationSection } from "@/components/InformationPage";
import { createInformationMetadata } from "@/lib/information-metadata";

const description =
  "A plain-language summary of data handling in the current TheConverT website.";

export const metadata = createInformationMetadata({
  title: "Privacy Policy",
  description,
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <InformationPage
      section="Legal"
      title="Privacy Policy"
      description={description}
    >
      <InformationSection title="Current site behavior">
        <p>
          The site does not provide user accounts. The Feedback form prepares a
          message in your email app; information is sent only if you choose to
          send that email. Your light or dark theme preference is stored in
          local browser storage.
        </p>
      </InformationSection>

      <InformationSection title="Currency requests">
        <p>
          When you choose a currency pair, the selected currency codes are sent
          to TheConverT&apos;s rate endpoint to retrieve rate data from
          Frankfurter. The amount you enter is calculated in your browser and
          is not included in that rate request.
        </p>
      </InformationSection>

      <InformationSection title="Analytics and service providers">
        <p>
          The site includes Vercel Analytics for site usage measurement. Vercel
          and Frankfurter operate their own services and publish their own data
          practices; consult their current privacy information for details.
        </p>
      </InformationSection>

      <InformationSection title="Updates">
        <p>
          This summary may change as the site gains features or service
          providers. The page should be reviewed whenever those details change.
        </p>
      </InformationSection>
    </InformationPage>
  );
}
