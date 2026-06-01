/**
 * TSEIncentiveTracker.tsx
 * UI unchanged — logic fix: reads from Railway API via IncentiveApiService
 * instead of localStorage. Falls back to localStorage if API fails.
 *
 * Changes from original:
 * 1. Reads logged-in employee ID from cc360_session (not hardcoded)
 * 2. Loads incentive records from GET /api/v1/incentives/me on mount
 * 3. Passes API records to SubscriptionIncentiveTracker via apiRecords prop
 * 4. Falls back silently to localStorage if API unreachable
 */

import { useState, useEffect } from "react";
import { IncentivePayoutLedger } from "../incentives/IncentivePayoutLedger";
import { SubscriptionIncentiveTracker } from "../incentives/SubscriptionIncentiveTracker";
import { IncentiveApiService } from "../../services/IncentiveApiService";

// ── Read logged-in employee from session ──────────────────────────────────────
function getSession(): { employeeId: string; employeeName: string; role: string } | null {
  try {
    const s = localStorage.getItem("cc360_session");
    if (s) return JSON.parse(s);
    return null;
  } catch { return null; }
}

interface TSEIncentiveTrackerProps {
  tseId?: string;
  name?: string;
}

export function TSEIncentiveTracker({ tseId, name }: TSEIncentiveTrackerProps) {
  const session = getSession();

  // Use session employee ID first, then prop, then fallback
  const id   = session?.employeeId || tseId || "EDB-TSE-SUR1";
  const role = (session?.role || "TSE") as any;
  const empName = session?.employeeName || name;

  const [tab, setTab] = useState<"overview" | "ledger">("overview");
  const [apiRecords, setApiRecords] = useState<any[] | null>(null);
  const [loading, setLoading] = useState(true);

  // ── Load from API on mount ─────────────────────────────────────────────────
  useEffect(() => {
    let cancelled = false;

    // Process overdue tranches first (marks due ones as PAID)
    IncentiveApiService.processOverdue().catch(() => {});

    // Load records for this employee
    IncentiveApiService.getForMe()
      .then(records => {
        if (cancelled) return;
        if (records.length > 0) {
          setApiRecords(IncentiveApiService.toV6Format(records));
        }
        // If API returns empty, apiRecords stays null → SubscriptionIncentiveTracker
        // falls back to its localStorage source (incentiveStructureV6)
      })
      .catch(() => {
        // Silent fallback — component uses localStorage via incentiveStructureV6
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => { cancelled = true; };
  }, [id]);

  return (
    <div className="space-y-4">
      {/* Tab selector — unchanged from original */}
      <div className="flex gap-2 bg-gray-100 p-1 rounded-lg w-fit">
        {(["overview", "ledger"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${
              tab === t
                ? "bg-white shadow text-gray-900"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {t === "overview" ? "Overview" : "📊 Payout Ledger"}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-12 text-gray-400 text-sm">
          Loading incentive data…
        </div>
      ) : tab === "ledger" ? (
        <IncentivePayoutLedger employeeId={id} role={role} />
      ) : (
        <SubscriptionIncentiveTracker
          employeeId={id}
          role={role}
          employeeName={empName}
          // apiRecords prop: if provided, SubscriptionIncentiveTracker uses these
          // instead of loading from localStorage via incentiveStructureV6
          // NOTE: SubscriptionIncentiveTracker will need the apiRecords prop added
          // (see note below) — until then it falls back to its own localStorage load
          apiRecords={apiRecords ?? undefined}
        />
      )}
    </div>
  );
}
