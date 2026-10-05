import InformationPage, { InformationSection } from "@/components/InformationPage";
import { createInformationMetadata } from "@/lib/information-metadata";
import FeedbackForm from "@/components/FeedbackForm";

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

      <InformationSection title="Send feedback">
        <p>Choose a topic and describe what happened or what you would like to see.</p>
        <FeedbackForm />
      </InformationSection>
    </InformationPage>
  );
}
