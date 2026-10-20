"use client";

import { useId, useRef, useState } from "react";
import { AlertTriangle, CheckCircle2, Paperclip } from "lucide-react";

import { cn } from "@/lib/utils";
import { contact } from "@/content/site";
import { departments } from "@/content/careers";

type FieldName = "name" | "email" | "department" | "message";
type Values = Record<FieldName, string>;
type Errors = Partial<Record<FieldName, string>>;
type Status = { kind: "idle" | "error" | "success"; message: string };

const EMPTY: Values = { name: "", email: "", department: "", message: "" };
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function validate(values: Values): Errors {
  const errors: Errors = {};

  if (!values.name.trim()) {
    errors.name = "Enter the name you want on the application.";
  }

  if (!values.email.trim()) {
    errors.email = "Enter an email address we can reply to.";
  } else if (!EMAIL_PATTERN.test(values.email.trim())) {
    errors.email = "That address is missing something — check the @ and the domain.";
  }

  if (!values.department) {
    errors.department = "Choose the department you are applying to.";
  }

  if (values.message.trim().length < 20) {
    errors.message = "Tell us a little about your background — a sentence or two is enough.";
  }

  return errors;
}

/**
 * The application form.
 *
 * There is no backend, so a validated submission composes a `mailto:` and hands
 * the visitor a fully drafted message. A file cannot ride along on a mailto,
 * which is why the form asks for the résumé to be attached to the draft rather
 * than rendering a file input that would silently drop it.
 */
export function ApplicationForm() {
  const id = useId();
  const [values, setValues] = useState<Values>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>({ kind: "idle", message: "" });

  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const departmentRef = useRef<HTMLSelectElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);

  const targets: Record<FieldName, React.RefObject<HTMLElement | null>> = {
    name: nameRef,
    email: emailRef,
    department: departmentRef,
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
        } attention before this application can be sent.`,
      });
      targets[invalid[0]].current?.focus();
      return;
    }

    /*
     * TODO(nsrl): replace this mailto hand-off with a real submission.
     * POST `values` (plus the résumé file, once a file input is reinstated
     * alongside it) to the careers endpoint here — e.g.
     * `await fetch("/api/careers", { method: "POST", body: formData })` — and
     * keep the mailto below as the failure fallback so an application is never
     * lost to a downed endpoint.
     */
    const subject = `Application — ${values.department} — ${values.name}`;
    const body = [
      `Name: ${values.name.trim()}`,
      `Email: ${values.email.trim()}`,
      `Department: ${values.department}`,
      "",
      values.message.trim(),
      "",
      "— Please attach your résumé to this email before sending it.",
    ].join("\r\n");

    window.location.href = `mailto:${contact.email}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;

    setStatus({
      kind: "success",
      message: `Your application is drafted and addressed to ${contact.email}. Attach your résumé to that email, then send it.`,
    });
  };

  const describedBy = (field: FieldName, hintId?: string) =>
    [errors[field] ? `${id}-${field}-error` : null, hintId].filter(Boolean).join(" ") || undefined;

  const fieldShell =
    "w-full border-b bg-transparent pb-3.5 pt-2 font-sans text-[1.0625rem] text-ink-950 outline-none transition-colors duration-500 [transition-timing-function:var(--ease-out-expo)] focus:border-ink-900";

  const border = (field: FieldName) =>
    errors[field] ? "border-ink-900" : "border-[var(--rule-strong)] hover:border-ink-900/50";

  return (
    <form
      noValidate
      onSubmit={handleSubmit}
      aria-describedby={`${id}-resume-note`}
      className="relative"
    >
      <p className="label-mono text-neutral-550">Application · four lines</p>

      <div className="mt-6 space-y-7">
        {/* 01 — Name */}
        <div>
          <div className="flex items-baseline gap-4">
            <span aria-hidden className="label-mono w-6 shrink-0 text-neutral-550">
              01
            </span>
            <label htmlFor={`${id}-name`} className="label-mono text-ink-700">
              Full name
            </label>
          </div>
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
            className={cn("mt-4", fieldShell, border("name"))}
          />
          <FieldError id={`${id}-name-error`} message={errors.name} />
        </div>

        {/* 02 — Email */}
        <div>
          <div className="flex items-baseline gap-4">
            <span aria-hidden className="label-mono w-6 shrink-0 text-neutral-550">
              02
            </span>
            <label htmlFor={`${id}-email`} className="label-mono text-ink-700">
              Email address
            </label>
          </div>
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
            className={cn("mt-4", fieldShell, border("email"))}
          />
          <FieldError id={`${id}-email-error`} message={errors.email} />
        </div>

        {/* 03 — Department */}
        <div>
          <div className="flex items-baseline gap-4">
            <span aria-hidden className="label-mono w-6 shrink-0 text-neutral-550">
              03
            </span>
            <label htmlFor={`${id}-department`} className="label-mono text-ink-700">
              Department
            </label>
          </div>
          <select
            ref={departmentRef}
            id={`${id}-department`}
            name="department"
            value={values.department}
            onChange={(event) => set("department")(event.target.value)}
            aria-invalid={errors.department ? true : undefined}
            aria-describedby={describedBy("department", `${id}-department-hint`)}
            className={cn("mt-4 appearance-none rounded-none", fieldShell, border("department"))}
          >
            <option value="">Select a department</option>
            {departments.map((department) => (
              <option key={department} value={department} className="text-ink-950">
                {department}
              </option>
            ))}
          </select>
          <p id={`${id}-department-hint`} className="label-mono mt-3 text-ink-300">
            {departments.length} departments accept applications
          </p>
          <FieldError id={`${id}-department-error`} message={errors.department} />
        </div>

        {/* 04 — Message */}
        <div>
          <div className="flex items-baseline gap-4">
            <span aria-hidden className="label-mono w-6 shrink-0 text-neutral-550">
              04
            </span>
            <label htmlFor={`${id}-message`} className="label-mono text-ink-700">
              Your background
            </label>
          </div>
          <textarea
            ref={messageRef}
            id={`${id}-message`}
            name="message"
            rows={5}
            value={values.message}
            onChange={(event) => set("message")(event.target.value)}
            aria-invalid={errors.message ? true : undefined}
            aria-describedby={describedBy("message")}
            className={cn("mt-4 resize-y", fieldShell, border("message"))}
          />
          <FieldError id={`${id}-message-error`} message={errors.message} />
        </div>
      </div>

      {/* Résumé instruction — the honest replacement for a file input. */}
      <p
        id={`${id}-resume-note`}
        className="mt-6 flex gap-4 border border-[var(--rule)] bg-canvas-sunken p-6 text-small text-neutral-600"
      >
        <Paperclip aria-hidden className="mt-1 h-4 w-4 shrink-0 text-ink-800" />
        <span>
          <span className="text-ink-900">Attach your résumé to the email that opens.</span> Submitting
          drafts a message in your own mail application with everything above already filled in —
          add the file there and send it. Nothing is uploaded from this page.
        </span>
      </p>

      <div className="mt-7 flex flex-wrap items-center gap-x-8 gap-y-5">
        {/* The same geometry as every other primary action on the site: one
            control height, one radius, one hover. The pill-and-green it used
            to be belonged to no other button here. */}
        <button
          type="submit"
          className="inline-flex h-[var(--control-h)] items-center justify-center gap-2 rounded-[var(--radius-control)] bg-white px-6 font-sans text-[0.9375rem] font-medium text-ink-950 transition-colors duration-200 ease-[var(--ease-out-quart)] hover:bg-ink-50"
        >
          Draft my application
        </button>
        <p className="label-mono text-neutral-550">Opens your mail application</p>
      </div>

      <div role="status" aria-live="polite" className="mt-6 empty:mt-0">
        {status.kind === "success" ? (
          <p className="flex items-start gap-3 border-l-2 border-signal-400 bg-white/[0.04] py-4 pl-5 pr-6 text-small text-neutral-600">
            <CheckCircle2 aria-hidden className="mt-1 h-4 w-4 shrink-0 text-ink-800" />
            <span>{status.message}</span>
          </p>
        ) : null}
        {status.kind === "error" ? (
          /* On the deep careers band, so the light end of the alert ramp:
             alert-700 on navy would not clear 4.5:1. */
          <p className="flex items-start gap-3 border-l-2 border-alert-500 bg-alert-500/10 py-4 pl-5 pr-6 text-small text-alert-200">
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
    <p id={id} className="mt-3 flex items-start gap-2 text-small text-alert-200">
      <AlertTriangle aria-hidden className="mt-1 h-3.5 w-3.5 shrink-0" />
      <span>{message}</span>
    </p>
  );
}
