import InformationPage, { InformationSection } from "@/components/InformationPage";
import { createInformationMetadata } from "@/lib/information-metadata";

const description = "Make everyday conversion simple, precise, and fast.";

export const metadata = createInformationMetadata({
  title: "Our Mission",
  description,
  path: "/mission",
});

export default function MissionPage() {
  return (
    <InformationPage
      section="Company"
      title="Our Mission"
      description={description}
    >
      <InformationSection title="Simple by design">
        <p>
          A conversion should take only the steps it needs. TheConverT keeps
          controls clear and results easy to read across its products.
        </p>
      </InformationSection>

      <InformationSection title="Precise, with context">
        <p>
          Unit tools use their defined conversion formulas. Currency results
          show the rate date and are clearly presented as reference rates, not
          real-time trading prices.
        </p>
      </InformationSection>

      <InformationSection title="Fast to use">
        <p>
          The goal is a focused experience that helps people move from a value to
          an answer without unnecessary steps.
        </p>
      </InformationSection>
    </InformationPage>
  );
}
