import { Skeleton } from "@/components/ui/skeleton";

export default function CheckoutLoading() {
  return (
    <section className="container grid gap-5 py-12 lg:grid-cols-[1fr_360px]">
      <Skeleton className="h-[520px] w-full" />
      <Skeleton className="h-80 w-full" />
    </section>
  );
}
