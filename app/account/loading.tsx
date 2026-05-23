import { Skeleton } from "@/components/ui/skeleton";

export default function AccountLoading() {
  return (
    <section className="container grid gap-5 py-12 lg:grid-cols-[1fr_360px]">
      <div className="rounded-lg border border-border bg-white/78 p-5">
        <Skeleton className="h-6 w-40" />
        <div className="mt-6 space-y-4">
          <Skeleton className="h-11 w-full" />
          <Skeleton className="h-11 w-full" />
          <Skeleton className="h-28 w-full" />
        </div>
      </div>
      <div className="space-y-5">
        <Skeleton className="h-40 w-full" />
        <Skeleton className="h-40 w-full" />
      </div>
    </section>
  );
}
