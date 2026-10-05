import InformationPage, { InformationSection } from "@/components/InformationPage";
import { createInformationMetadata } from "@/lib/information-metadata";

const description =
  "Answers about TheConverT unit and currency conversion tools.";

const faqs = [
  {
    question: "What is TheConverT?",
    answer:
      "TheConverT is a collection of simple tools for everyday unit and currency conversions.",
  },
  {
    question: "Are currency rates live?",
    answer:
      "No. The currency converter uses the latest available reference rates from Frankfurter and displays the date returned for the selected pair.",
  },
  {
    question: "How often are exchange rates updated?",
    answer:
      "TheConverT requests the latest available rate record and shows its date. The source does not guarantee a fixed update schedule for every currency pair.",
  },
  {
    question: "Which units are supported?",
    answer:
      "The Unit Converter currently includes length, weight, temperature, area, volume, time, speed, pressure, energy, and power.",
  },
  {
    question: "Is TheConverT free?",
    answer:
      "The current converters are available without an account or payment.",
  },
];

export const metadata = createInformationMetadata({
  title: "FAQ",
  description,
  path: "/faq",
});

export default function FAQPage() {
  return (
    <InformationPage section="Information" title="FAQ" description={description}>
      <InformationSection title="Common questions">
        <div className="divide-y divide-[var(--border)]">
          {faqs.map(({ question, answer }) => (
            <details key={question} className="group py-3 first:pt-0">
              <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-4 font-medium text-[var(--foreground)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]">
                {question}
                <span
                  aria-hidden="true"
                  className="text-lg font-normal text-[var(--muted)] transition-transform group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <p className="pb-2 pr-8">{answer}</p>
            </details>
          ))}
        </div>
      </InformationSection>
    </InformationPage>
  );
}
