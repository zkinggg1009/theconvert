import InformationPage, { InformationSection } from "@/components/InformationPage";
import { createInformationMetadata } from "@/lib/information-metadata";

const description =
  "TheConverT brings simple unit and currency conversion tools together for everyday use.";

export const metadata = createInformationMetadata({
  title: "About TheConverT",
  description,
  path: "/about",
});

export default function AboutPage() {
  return (
    <InformationPage
      section="Company"
      title="About TheConverT"
      description={description}
    >
      <InformationSection title="What TheConverT is">
        <p>
          TheConverT is a collection of unit and currency tools for everyday
          conversions. Choose a product, enter a value, and get a clear result.
        </p>
      </InformationSection>

      <InformationSection title="Why it exists">
        <p>
          Common conversions should not require a complicated workflow. TheConverT
          keeps the experience focused on the value, the units, and the answer.
        </p>
        <p>
          The product is guided by a simple idea: make everyday conversion
          simple, precise, and fast.
        </p>
      </InformationSection>
    </InformationPage>
  );
}
