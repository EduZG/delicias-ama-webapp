import { Skeleton } from "@/components/ui/skeleton";

export default function OrdersLoading() {
  return (
    <section className="container space-y-3 py-12">
      <Skeleton className="h-20 w-full" />
      <Skeleton className="h-20 w-full" />
      <Skeleton className="h-20 w-full" />
    </section>
  );
}
