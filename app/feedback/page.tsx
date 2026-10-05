import InformationPage, { InformationSection } from "@/components/InformationPage";
import { createInformationMetadata } from "@/lib/information-metadata";

const description =
  "Ideas and issue reports help keep TheConverT clear and useful.";

export const metadata = createInformationMetadata({
  title: "Feedback",
  description,
  path: "/feedback",
});

export default function FeedbackPage() {
  return (
    <InformationPage
      section="Information"
      title="Feedback"
      description={description}
    >
      <InformationSection title="What is useful to share">
        <ul className="list-disc space-y-2 pl-5">
          <li>Bugs or usability issues</li>
          <li>Conversions that appear incorrect</li>
          <li>Suggestions for improving the tools</li>
        </ul>
      </InformationSection>

      <InformationSection title="Sending feedback">
        <p>
          TheConverT does not currently have a feedback form or published
          submission address. This page does not send or store messages; a
          working feedback channel will be added here when available.
        </p>
      </InformationSection>
    </InformationPage>
  );
}
