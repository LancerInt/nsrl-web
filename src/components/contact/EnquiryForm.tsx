"use client";

import { useId, useRef, useState } from "react";
import { AlertTriangle, CheckCircle2 } from "lucide-react";

import { cn } from "@/lib/utils";
import { contact } from "@/content/site";

type FieldName = "name" | "phone" | "email" | "company" | "message";
type Values = Record<FieldName, string>;
type Errors = Partial<Record<FieldName, string>>;
type Status = { kind: "idle" | "error" | "success"; message: string };

const EMPTY: Values = { name: "", phone: "", email: "", company: "", message: "" };
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function validate(values: Values): Errors {
  const errors: Errors = {};

  if (!values.name.trim()) {
    errors.name = "Enter your name so we know who is asking.";
  }

  if (!values.phone.trim()) {
    errors.phone = "Enter a number we can reach you on.";
  } else if (values.phone.replace(/\D/g, "").length < 7) {
    errors.phone = "That number looks too short — include the country or area code.";
  }

  if (!values.email.trim()) {
    errors.email = "Enter an email address for the written reply.";
  } else if (!EMAIL_PATTERN.test(values.email.trim())) {
    errors.email = "That address is missing something — check the @ and the domain.";
  }

  if (values.message.trim().length < 20) {
    errors.message = "Describe the study or programme briefly — a sentence or two is enough.";
  }

  return errors;
}

/**
 * The enquiry form.
 *
 * With no backend behind it, a validated submission composes a `mailto:` and
 * opens it fully drafted, so the enquiry reaches NSRL by the same route the
 * telephone and address on this page do — nothing is captured and dropped.
 */
export function EnquiryForm() {
  const id = useId();
  const [values, setValues] = useState<Values>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>({ kind: "idle", message: "" });

  const nameRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const companyRef = useRef<HTMLInputElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);

  const targets: Record<FieldName, React.RefObject<HTMLElement | null>> = {
    name: nameRef,
    phone: phoneRef,
    email: emailRef,
    company: companyRef,
    message: messageRef,
  };

  const set = (field: FieldName) => (value: string) => {
    setValues((previous) => ({ ...previous, [field]: value }));
    setErrors((previous) => {
      if (!previous[field]) return previous;
      const next = { ...previous };
      delete next[field];
      return next;
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextErrors = validate(values);
    setErrors(nextErrors);

    const invalid = Object.keys(nextErrors) as FieldName[];
    if (invalid.length > 0) {
      setStatus({
        kind: "error",
        message: `${invalid.length} ${
          invalid.length === 1 ? "field needs" : "fields need"
        } attention before this enquiry can be sent.`,
      });
      targets[invalid[0]].current?.focus();
      return;
    }

    /*
     * TODO(nsrl): replace this mailto hand-off with a real submission.
     * POST `values` to the enquiry endpoint here — e.g.
     * `await fetch("/api/enquiry", { method: "POST", body: JSON.stringify(values) })`
     * — and keep the mailto below as the fallback when that request fails, so
     * an enquiry is never lost to a downed endpoint.
     */
    const subject = `Enquiry — ${values.company.trim() || values.name.trim()}`;
    const body = [
      `Name: ${values.name.trim()}`,
      `Company: ${values.company.trim() || "—"}`,
      `Telephone: ${values.phone.trim()}`,
      `Email: ${values.email.trim()}`,
      "",
      values.message.trim(),
    ].join("\r\n");

    window.location.href = `mailto:${contact.email}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;

    setStatus({
      kind: "success",
      message: `Your enquiry is drafted and addressed to ${contact.email}. Send it from your mail application and it reaches us directly.`,
    });
  };

  const describedBy = (field: FieldName, hintId?: string) =>
    [errors[field] ? `${id}-${field}-error` : null, hintId].filter(Boolean).join(" ") || undefined;

  const control =
    "mt-3 w-full rounded-lg border bg-canvas px-4 py-3.5 text-body text-ink-950 outline-none transition-colors duration-400 [transition-timing-function:var(--ease-out-expo)] focus:border-signal-500";

  const border = (field: FieldName) =>
    errors[field] ? "border-signal-600" : "border-ink-900/15 hover:border-ink-900/30";

  const labelClass = "label-mono text-ink-700";

  return (
    <form
      noValidate
      onSubmit={handleSubmit}
      className="rounded-[var(--radius-card)] border border-ink-900/10 bg-canvas-raised p-[clamp(1.5rem,3.5vw,3rem)] shadow-[0_1px_2px_rgba(8,21,43,0.04),0_28px_56px_-40px_rgba(8,21,43,0.3)]"
    >
      <div className="grid gap-x-6 gap-y-7 sm:grid-cols-2">
        <div>
          <label htmlFor={`${id}-name`} className={labelClass}>
            Name
          </label>
          <input
            ref={nameRef}
            id={`${id}-name`}
            name="name"
            type="text"
            autoComplete="name"
            value={values.name}
            onChange={(event) => set("name")(event.target.value)}
            aria-invalid={errors.name ? true : undefined}
            aria-describedby={describedBy("name")}
            className={cn(control, border("name"))}
          />
          <FieldError id={`${id}-name-error`} message={errors.name} />
        </div>

        <div>
          <label htmlFor={`${id}-phone`} className={labelClass}>
            Telephone
          </label>
          <input
            ref={phoneRef}
            id={`${id}-phone`}
            name="phone"
            type="tel"
            autoComplete="tel"
            inputMode="tel"
            value={values.phone}
            onChange={(event) => set("phone")(event.target.value)}
            aria-invalid={errors.phone ? true : undefined}
            aria-describedby={describedBy("phone")}
            className={cn(control, border("phone"))}
          />
          <FieldError id={`${id}-phone-error`} message={errors.phone} />
        </div>

        <div>
          <label htmlFor={`${id}-email`} className={labelClass}>
            Email
          </label>
          <input
            ref={emailRef}
            id={`${id}-email`}
            name="email"
            type="email"
            autoComplete="email"
            inputMode="email"
            value={values.email}
            onChange={(event) => set("email")(event.target.value)}
            aria-invalid={errors.email ? true : undefined}
            aria-describedby={describedBy("email")}
            className={cn(control, border("email"))}
          />
          <FieldError id={`${id}-email-error`} message={errors.email} />
        </div>

        <div>
          <label htmlFor={`${id}-company`} className={labelClass}>
            Company
          </label>
          <input
            ref={companyRef}
            id={`${id}-company`}
            name="company"
            type="text"
            autoComplete="organization"
            value={values.company}
            onChange={(event) => set("company")(event.target.value)}
            aria-describedby={describedBy("company", `${id}-company-hint`)}
            className={cn(control, border("company"))}
          />
          <p id={`${id}-company-hint`} className="label-mono mt-2.5 text-neutral-500">
            Optional
          </p>
        </div>

        <div className="sm:col-span-2">
          <label htmlFor={`${id}-message`} className={labelClass}>
            What can we help with?
          </label>
          <textarea
            ref={messageRef}
            id={`${id}-message`}
            name="message"
            rows={6}
            value={values.message}
            onChange={(event) => set("message")(event.target.value)}
            aria-invalid={errors.message ? true : undefined}
            aria-describedby={describedBy("message", `${id}-message-hint`)}
            className={cn(control, "resize-y", border("message"))}
          />
          <p id={`${id}-message-hint`} className="label-mono mt-2.5 text-neutral-500">
            Test item, sector and the authority the dossier is going to, if you know them
          </p>
          <FieldError id={`${id}-message-error`} message={errors.message} />
        </div>
      </div>

      <div className="mt-7 flex flex-wrap items-center gap-x-8 gap-y-5 border-t border-ink-900/10 pt-8">
        <button
          type="submit"
          className="inline-flex items-center justify-center gap-3 rounded-[3px] bg-ink-900 px-6 py-3.5 font-sans text-[0.9375rem] font-medium text-white transition-colors duration-300 hover:bg-ink-700"
        >
          Send enquiry
        </button>
        <p className="label-mono text-neutral-500">Opens your mail application</p>
      </div>

      <div role="status" aria-live="polite" className="mt-7 empty:mt-0">
        {status.kind === "success" ? (
          <p className="flex items-start gap-3 border-l-2 border-signal-500 bg-signal-50 py-4 pl-5 pr-6 text-small text-ink-900">
            <CheckCircle2 aria-hidden className="mt-1 h-4 w-4 shrink-0 text-signal-600" />
            <span>{status.message}</span>
          </p>
        ) : null}
        {status.kind === "error" ? (
          <p className="flex items-start gap-3 border-l-2 border-signal-600 py-4 pl-5 pr-6 text-small text-signal-800">
            <AlertTriangle aria-hidden className="mt-1 h-4 w-4 shrink-0" />
            <span>{status.message}</span>
          </p>
        ) : null}
      </div>
    </form>
  );
}

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="mt-2.5 flex items-start gap-2 text-small text-signal-800">
      <AlertTriangle aria-hidden className="mt-1 h-3.5 w-3.5 shrink-0" />
      <span>{message}</span>
    </p>
  );
}
