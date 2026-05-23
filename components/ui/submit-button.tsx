"use client";

import { useFormStatus } from "react-dom";
import { Loader2 } from "lucide-react";
import type { ReactNode } from "react";
import { Button } from "@/components/ui/button";

type SubmitButtonProps = {
  children: ReactNode;
  loadingLabel?: string;
};

export function SubmitButton({
  children,
  loadingLabel = "Procesando...",
}: SubmitButtonProps) {
  const { pending } = useFormStatus();

  return (
    <Button className="w-full" disabled={pending} type="submit">
      {pending ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
      {pending ? loadingLabel : children}
    </Button>
  );
}
