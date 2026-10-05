import InformationPage, { InformationSection } from "@/components/InformationPage";
import { createInformationMetadata } from "@/lib/information-metadata";

const description =
  "A short guide to converting units and currencies with TheConverT.";

export const metadata = createInformationMetadata({
  title: "How It Works",
  description,
  path: "/how-it-works",
});

export default function HowItWorksPage() {
  return (
    <InformationPage
      section="Information"
      title="How It Works"
      description={description}
    >
      <InformationSection title="Unit conversions">
        <ol className="list-decimal space-y-2 pl-5">
          <li>Choose a conversion category, such as length or temperature.</li>
          <li>Enter a value and choose the units to convert from and to.</li>
          <li>Read the converted result and adjust precision if needed.</li>
        </ol>
      </InformationSection>

      <InformationSection title="Currency conversions">
        <ol className="list-decimal space-y-2 pl-5">
          <li>Enter an amount and select the two currencies.</li>
          <li>The result is calculated from the rate returned for that pair.</li>
          <li>Check the displayed rate date before using the result.</li>
        </ol>
        <p>
          Currency rates are the latest available from Frankfurter. They are
          reference rates, not live or real-time trading prices.
        </p>
      </InformationSection>
    </InformationPage>
  );
}
