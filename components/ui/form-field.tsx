import { clsx } from "clsx";
import type { InputHTMLAttributes, TextareaHTMLAttributes } from "react";

type BaseFieldProps = {
  error?: string;
  label: string;
};

type InputFieldProps = BaseFieldProps &
  InputHTMLAttributes<HTMLInputElement> & {
    as?: "input";
  };

type TextareaFieldProps = BaseFieldProps &
  TextareaHTMLAttributes<HTMLTextAreaElement> & {
    as: "textarea";
  };

type FormFieldProps = InputFieldProps | TextareaFieldProps;

const fieldClassName =
  "w-full rounded-md border border-border bg-white px-3 text-sm outline-none transition placeholder:text-muted/70 focus:border-brand-500 disabled:bg-muted/10 disabled:text-muted";

export function FormField(props: FormFieldProps) {
  const id =
    props.id ?? (typeof props.name === "string" ? props.name : undefined);

  if (props.as === "textarea") {
    const { as: _as, className, error, label, ...textareaProps } = props;

    return (
      <label className="space-y-2 text-sm font-medium text-ink-700" htmlFor={id}>
        {label}
        <textarea
          {...textareaProps}
          className={clsx(fieldClassName, "min-h-28 py-3", className)}
          id={id}
        />
        {error ? (
          <p className="text-sm font-medium text-red-700">{error}</p>
        ) : null}
      </label>
    );
  }

  const { as: _as, className, error, label, ...inputProps } = props;

  return (
    <label className="space-y-2 text-sm font-medium text-ink-700" htmlFor={id}>
      {label}
      <input
        {...inputProps}
        className={clsx(fieldClassName, "h-11", className)}
        id={id}
      />
      {error ? <p className="text-sm font-medium text-red-700">{error}</p> : null}
    </label>
  );
}
