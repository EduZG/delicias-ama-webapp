type PageHeaderProps = {
  eyebrow?: string;
  title: string;
  description: string;
};

export function PageHeader({ description, eyebrow, title }: PageHeaderProps) {
  return (
    <section className="container py-8 sm:py-12">
      <div className="max-w-3xl space-y-3">
        {eyebrow ? (
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-brand-700">
            {eyebrow}
          </p>
        ) : null}
        <h1 className="text-3xl font-semibold text-ink-900 sm:text-4xl">
          {title}
        </h1>
        <p className="text-base leading-7 text-muted">{description}</p>
      </div>
    </section>
  );
}
