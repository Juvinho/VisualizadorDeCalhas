export default function LoadingBlocoPage() {
  return (
    <div className="space-y-5 animate-fade-in">
      <div className="h-9 w-28 animate-pulse rounded-md bg-surface-text/10" />
      <div className="space-y-2">
        <div className="h-8 w-48 animate-pulse rounded-md bg-surface-text/10" />
        <div className="h-5 w-80 max-w-full animate-pulse rounded-md bg-surface-text/10" />
      </div>
      <div className="grid gap-6 lg:grid-cols-12">
        <div className="h-[360px] animate-pulse rounded-xl bg-surface-text/10 lg:col-span-8" />
        <div className="space-y-4 lg:col-span-4">
          <div className="h-8 w-52 animate-pulse rounded-md bg-surface-text/10" />
          <div className="h-28 animate-pulse rounded-xl bg-surface-text/10" />
          <div className="h-28 animate-pulse rounded-xl bg-surface-text/10" />
          <div className="h-28 animate-pulse rounded-xl bg-surface-text/10" />
        </div>
      </div>
    </div>
  );
}
