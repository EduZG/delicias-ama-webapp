import { clsx } from "clsx";

type ToastProps = {
  message?: string;
  type?: "success" | "error" | "info";
};

export function Toast({ message, type = "info" }: ToastProps) {
  if (!message) {
    return null;
  }

  return (
    <div className="container pt-4">
      <div
        className={clsx(
          "rounded-md border px-4 py-3 text-sm font-medium shadow-sm",
          type === "success" &&
            "border-green-200 bg-green-50 text-green-800",
          type === "error" && "border-red-200 bg-red-50 text-red-800",
          type === "info" && "border-border bg-white text-ink-700",
        )}
      >
        {message}
      </div>
    </div>
  );
}
