// Loading state for /generate — mirrors the two-column workbench layout
// (config rail on the left, output workspace on the right on lg+) so the
// page doesn't flash a different structure while the route segment loads.

export default function GenerateLoading() {
  return (
    <div
      className="animate-pulse lg:grid lg:grid-cols-[minmax(340px,430px)_minmax(0,1fr)] xl:grid-cols-[minmax(380px,470px)_minmax(0,1fr)] lg:gap-6 items-start"
      aria-hidden="true"
    >
      {/* Config rail skeleton */}
      <div className="bg-[#151821] border border-white/[0.06] rounded-2xl p-6 mb-8 lg:mb-0 space-y-6">
        {[0, 1, 2].map((group) => (
          <div key={group} className="space-y-2.5">
            <div className="h-2.5 w-28 rounded bg-white/[0.06]" />
            <div className="flex gap-2">
              <div className="h-9 w-24 rounded-xl bg-white/[0.04]" />
              <div className="h-9 w-24 rounded-xl bg-white/[0.04]" />
            </div>
          </div>
        ))}
        <div className="space-y-2.5">
          <div className="h-2.5 w-28 rounded bg-white/[0.06]" />
          <div className="h-11 w-full rounded-xl bg-white/[0.04]" />
        </div>
        <div className="h-14 w-full rounded-xl bg-[#00e5a0]/[0.08]" />
      </div>

      {/* Workspace skeleton */}
      <div className="rounded-2xl border border-dashed border-white/[0.09] bg-white/[0.015] lg:min-h-[540px] flex flex-col items-center justify-center gap-4 py-14">
        <div className="w-14 h-14 rounded-2xl bg-white/[0.05]" />
        <div className="h-3 w-56 max-w-full rounded bg-white/[0.05]" />
        <div className="h-2.5 w-72 max-w-full rounded bg-white/[0.03]" />
      </div>
    </div>
  );
}
