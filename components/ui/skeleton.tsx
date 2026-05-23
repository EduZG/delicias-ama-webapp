import { clsx } from "clsx";

type SkeletonProps = {
  className?: string;
};

export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={clsx(
        "animate-pulse rounded-md bg-[linear-gradient(90deg,#f2e7d6,#fff8ed,#f2e7d6)] bg-[length:200%_100%]",
        className,
      )}
    />
  );
}
