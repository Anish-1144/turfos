import type { ReactNode } from "react";

/** Outer glass frame + inner white surface — matches hero booking card. */
export function BookingPanel({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-2xl border border-white/20 bg-white/10 p-1 shadow-2xl backdrop-blur-xl sm:p-1.5 ${className}`}
    >
      <div className="rounded-xl bg-white p-5 sm:p-6 md:p-8">{children}</div>
    </div>
  );
}

export function BookingEyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="font-dm text-xs font-semibold uppercase tracking-widest text-[#A8E040]">
      {children}
    </p>
  );
}

export function BookingTitle({ children }: { children: ReactNode }) {
  return (
    <h1 className="mt-2 font-syne text-2xl font-bold leading-tight text-white sm:text-3xl md:text-[40px]">
      {children}
    </h1>
  );
}

export function BookingLead({ children }: { children: ReactNode }) {
  return (
    <p className="mt-2 max-w-xl font-dm text-sm leading-relaxed text-white/70">
      {children}
    </p>
  );
}

export function BookingMetaRow({ children }: { children: ReactNode }) {
  return (
    <div className="mt-3 flex flex-wrap items-center gap-2 font-dm text-xs text-white/55 sm:text-sm">
      {children}
    </div>
  );
}
