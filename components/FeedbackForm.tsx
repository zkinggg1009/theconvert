"use client";

import { useState, type FormEvent } from "react";
import { supportEmail } from "@/lib/contact";

const feedbackTypes = [
  "Bugs",
  "Conversion errors",
  "Feature requests",
  "Suggestions",
  "Other feedback",
];

const fieldClassName = "w-full rounded-xl border border-[var(--border)] bg-[var(--input)] px-3.5 py-3 text-sm text-[var(--foreground)] outline-none transition-colors focus:border-[var(--border-strong)] focus:ring-2 focus:ring-[var(--ring)]";

export default function FeedbackForm() {
  const [status, setStatus] = useState("");

  const submitFeedback = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const feedbackType = String(formData.get("type") ?? "Other feedback");
    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const message = String(formData.get("message") ?? "").trim();
    if (!message) {
      const messageField = event.currentTarget.elements.namedItem("message");
      if (messageField instanceof HTMLTextAreaElement) {
        messageField.setCustomValidity("Please enter a message.");
        messageField.reportValidity();
        messageField.addEventListener("input", () => messageField.setCustomValidity(""), { once: true });
      }
      return;
    }
    const body = [
      `Type: ${feedbackType}`,
      name ? `Name: ${name}` : "",
      email ? `Reply email: ${email}` : "",
      "",
      message,
    ].filter((line, index) => line !== "" || index === 3).join("\n");
    const subject = encodeURIComponent(`TheConverT feedback: ${feedbackType}`);
    window.location.href = `mailto:${supportEmail}?subject=${subject}&body=${encodeURIComponent(body)}`;
    setStatus("Your email app should open with the feedback ready to send.");
  };

  return (
    <form onSubmit={submitFeedback} className="space-y-4">
      <div>
        <label htmlFor="feedback-type" className="mb-1.5 block text-sm font-medium text-[var(--foreground)]">Feedback type</label>
        <select id="feedback-type" name="type" className={fieldClassName}>
          {feedbackTypes.map((type) => <option key={type}>{type}</option>)}
        </select>
      </div>
      <div>
        <label htmlFor="feedback-name" className="mb-1.5 block text-sm font-medium text-[var(--foreground)]">Name <span className="font-normal text-[var(--muted)]">(optional)</span></label>
        <input id="feedback-name" name="name" autoComplete="name" className={fieldClassName} />
      </div>
      <div>
        <label htmlFor="feedback-email" className="mb-1.5 block text-sm font-medium text-[var(--foreground)]">Email <span className="font-normal text-[var(--muted)]">(optional)</span></label>
        <input id="feedback-email" name="email" type="email" autoComplete="email" className={fieldClassName} />
      </div>
      <div>
        <label htmlFor="feedback-message" className="mb-1.5 block text-sm font-medium text-[var(--foreground)]">Message</label>
      <textarea id="feedback-message" name="message" required rows={6} className={`${fieldClassName} resize-y`} />
      </div>
      <button type="submit" className="min-h-11 rounded-full bg-[var(--foreground)] px-5 text-sm font-medium text-[var(--background)] transition-[transform,opacity] duration-150 hover:opacity-90 active:scale-[0.98] motion-reduce:transition-none">Continue to email</button>
      <p aria-live="polite" className="min-h-5 text-sm text-[var(--muted)]">{status}</p>
      <p className="text-xs leading-relaxed text-[var(--muted)]">This opens your email app; the message is sent only if you choose to send it.</p>
    </form>
  );
}
