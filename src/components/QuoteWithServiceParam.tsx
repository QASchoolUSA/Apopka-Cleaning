"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { QuoteCalculator } from "@/components/QuoteCalculator";
import type { ServiceSlug } from "@/lib/services";
import { getService } from "@/lib/services";

function CalculatorFromQuery() {
  const searchParams = useSearchParams();
  const raw = searchParams.get("service") ?? "residential";
  const service = getService(raw);
  const defaultService = (service?.slug ?? "residential") as ServiceSlug;

  return <QuoteCalculator defaultService={defaultService} />;
}

export function QuoteWithServiceParam() {
  return (
    <Suspense
      fallback={
        <div className="rounded-2xl bg-white p-12 text-center text-[var(--muted-fg)]">
          Loading calculator…
        </div>
      }
    >
      <CalculatorFromQuery />
    </Suspense>
  );
}
