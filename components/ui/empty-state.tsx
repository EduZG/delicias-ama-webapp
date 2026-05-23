import type { ReactNode } from "react";
import { Card } from "@/components/ui/card";

type EmptyStateProps = {
  title: string;
  description: string;
  action?: ReactNode;
};

export function EmptyState({ action, description, title }: EmptyStateProps) {
  return (
    <Card className="flex min-h-52 flex-col items-start justify-center gap-4">
      <div>
        <h2 className="text-lg font-semibold text-ink-900">{title}</h2>
        <p className="mt-2 max-w-xl text-sm leading-6 text-muted">
          {description}
        </p>
      </div>
      {action}
    </Card>
  );
}
