"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { QuoteCalculator } from "@/components/QuoteCalculator";
import type { ServiceSlug } from "@/lib/services";
import { getService } from "@/lib/services";
import { DEFAULT_PRICING_CONFIG, type PricingConfig } from "@/lib/pricing";

function CalculatorFromQuery({ config }: { config: PricingConfig }) {
  const searchParams = useSearchParams();
  const raw = searchParams.get("service") ?? "residential";
  const service = getService(raw);
  const defaultService = (service?.slug ?? "residential") as ServiceSlug;

  return <QuoteCalculator defaultService={defaultService} config={config} />;
}

export function QuoteWithServiceParam({
  config = DEFAULT_PRICING_CONFIG,
}: {
  config?: PricingConfig;
}) {
  return (
    <Suspense
      fallback={
        <div className="rounded-2xl bg-white p-12 text-center text-[var(--muted-fg)]">
          Loading calculator…
        </div>
      }
    >
      <CalculatorFromQuery config={config} />
    </Suspense>
  );
}
