/**
 * PlanSyncService — drop-in replacement layer between AdminPlanManagement and DataService
 *
 * HOW IT WORKS:
 * 1. Reads: tries API first, falls back to localStorage (DataService)
 * 2. Writes: writes to localStorage immediately (instant UI), then syncs to API in background
 * 3. On next load: API data overrides localStorage so all devices see the same data
 *
 * USAGE IN AdminPlanManagement.tsx:
 * Replace these imports:
 *   import { DataService } from "../../services/DataService";
 * With:
 *   import { PlanSyncService as DataService } from "../../services/PlanSyncService";
 *
 * That's it. The rest of AdminPlanManagement code stays exactly the same.
 * PlanSyncService has the same get/setAll/insert/update/delete API as DataService.
 */

import { DataService } from "./DataService";
import { PlanApiService } from "./PlanApiService";
import type { ApiPlanTier, ApiPlanAddon } from "./PlanApiService";

// ── Type mapping helpers ──────────────────────────────────────────────────────

function apiTierToLocal(t: ApiPlanTier): any {
  return {
    id: t.id,
    name: t.name,
    displayName: t.displayName,
    vehicleCategory: t.vehicleCategory,
    baseMonthlyPrice: t.baseMonthlyPrice,
    costPerWash: t.costPerWash,
    sortOrder: t.sortOrder,
    isActive: t.isActive,
    washesPerMonth: 26,
    // Keep any extra fields as-is
  };
}

function localTierToApi(t: any): Omit<ApiPlanTier, "createdAt" | "updatedAt"> {
  return {
    id: t.id,
    name: t.name,
    displayName: t.displayName,
    vehicleCategory: t.vehicleCategory,
    baseMonthlyPrice: Number(t.baseMonthlyPrice),
    costPerWash: Number(t.costPerWash),
    sortOrder: Number(t.sortOrder) || 0,
    isActive: t.isActive !== false,
  };
}

function apiAddonToLocal(a: ApiPlanAddon): any {
  return {
    id: a.id,
    name: a.name,
    description: a.description,
    category: a.category,
    hatchbackPrice: a.hatchbackPrice,
    suvPrice: a.suvPrice,
    luxuryPrice: a.luxuryPrice,
    isActive: a.isActive,
    price: a.hatchbackPrice, // subscriptionPlansService uses "price"
    billingType: "PER_MONTH",
  };
}

function localAddonToApi(a: any): any {
  return {
    id: a.id,
    name: a.name,
    description: a.description || "",
    category: a.category || "Cleaning",
    hatchbackPrice: Number(a.hatchbackPrice || a.price || 0),
    suvPrice: Number(a.suvPrice || a.price || 0),
    luxuryPrice: Number(a.luxuryPrice || a.price || 0),
    isActive: a.isActive !== false,
  };
}

// ── PlanSyncService ───────────────────────────────────────────────────────────

class PlanSyncServiceClass {
  private syncInProgress = false;

  /**
   * get() — same signature as DataService.get()
   * For PLAN_TIERS and PLAN_ADDONS: loads from API on first call, caches locally.
   * For everything else: delegates to DataService.
   */
  get<T>(entityType: string, cityId?: string): T[] {
    // For non-plan entities, pass through to DataService
    if (entityType !== "PLAN_TIERS" && entityType !== "PLAN_ADDONS") {
      return DataService.get<T>(entityType as any, cityId);
    }

    // Return localStorage immediately (always fast)
    const local = DataService.get<T>(entityType as any, cityId);

    // Kick off background API load to refresh localStorage
    this.refreshFromApi(entityType).catch(() => {});

    return local;
  }

  /**
   * setAll() — same signature as DataService.setAll()
   * Writes to localStorage first, then syncs to API in background.
   */
  setAll<T>(entityType: string, records: T[], cityId?: string): void {
    // Always write to localStorage immediately
    DataService.setAll<T>(entityType as any, records, cityId);

    // Sync plan data to API in background
    if (entityType === "PLAN_TIERS") {
      this.syncTiersToApi(records as any[]).catch((e) =>
        console.warn("[PlanSyncService] Background sync of tiers failed:", e)
      );
    } else if (entityType === "PLAN_ADDONS") {
      this.syncAddonsToApi(records as any[]).catch((e) =>
        console.warn("[PlanSyncService] Background sync of addons failed:", e)
      );
    }
  }

  /**
   * insert() — same as DataService.insert()
   */
  insert<T>(entityType: string, record: T | T[], cityId?: string): void {
    DataService.insert<T>(entityType as any, record, cityId);

    if (entityType === "PLAN_TIERS" || entityType === "PLAN_ADDONS") {
      const records = Array.isArray(record) ? record : [record];
      if (entityType === "PLAN_TIERS") {
        records.forEach((r) => PlanApiService.upsertTier(localTierToApi(r)).catch(() => {}));
      } else {
        records.forEach((r) => PlanApiService.upsertAddon(localAddonToApi(r)).catch(() => {}));
      }
    }
  }

  /**
   * update() — same as DataService.update()
   */
  update<T extends Record<string, any>>(
    entityType: string,
    id: string,
    updates: Partial<T>,
    idField = "id",
    cityId?: string
  ): void {
    DataService.update<T>(entityType as any, id, updates, idField, cityId);

    if (entityType === "PLAN_TIERS" || entityType === "PLAN_ADDONS") {
      const all = DataService.get<T>(entityType as any, cityId);
      const updated = all.find((r) => r[idField] === id);
      if (updated) {
        if (entityType === "PLAN_TIERS") PlanApiService.upsertTier(localTierToApi(updated)).catch(() => {});
        else PlanApiService.upsertAddon(localAddonToApi(updated)).catch(() => {});
      }
    }
  }

  /**
   * delete() — same as DataService.delete()
   */
  delete<T extends Record<string, any>>(
    entityType: string,
    id: string,
    idField = "id",
    cityId?: string
  ): void {
    DataService.delete<T>(entityType as any, id, idField, cityId);
    // Note: backend doesn't have a delete endpoint for plans
    // Plans are deactivated via upsert with isActive:false
    if (entityType === "PLAN_TIERS") {
      PlanApiService.upsertTier({ id, name: "", vehicleCategory: "", displayName: "", baseMonthlyPrice: 0, costPerWash: 0, sortOrder: 0, isActive: false }).catch(() => {});
    }
  }

  // ── Passthrough methods for non-plan entities ─────────────────────────────

  query<T>(entityType: string, filterFn: (r: T) => boolean, cityId?: string): T[] {
    return DataService.query<T>(entityType as any, filterFn, cityId);
  }

  count(entityType: string, cityId?: string): number {
    return DataService.count(entityType as any, cityId);
  }

  exists<T extends Record<string, any>>(entityType: string, id: string, idField = "id", cityId?: string): boolean {
    return DataService.exists<T>(entityType as any, id, idField, cityId);
  }

  // ── Background sync helpers ───────────────────────────────────────────────

  private async refreshFromApi(entityType: string): Promise<void> {
    if (this.syncInProgress) return;
    this.syncInProgress = true;
    try {
      if (entityType === "PLAN_TIERS") {
        const apiTiers = await PlanApiService.getTiers();
        if (apiTiers.length > 0) {
          const mapped = apiTiers.map(apiTierToLocal);
          DataService.setAll("PLAN_TIERS", mapped);
        }
      } else if (entityType === "PLAN_ADDONS") {
        const apiAddons = await PlanApiService.getAddons();
        if (apiAddons.length > 0) {
          const mapped = apiAddons.map(apiAddonToLocal);
          DataService.setAll("PLAN_ADDONS", mapped);
        }
      }
    } catch (e) {
      console.warn("[PlanSyncService] refreshFromApi failed:", e);
    } finally {
      this.syncInProgress = false;
    }
  }

  private async syncTiersToApi(tiers: any[]): Promise<void> {
    for (const tier of tiers) {
      await PlanApiService.upsertTier(localTierToApi(tier));
    }
    PlanApiService.invalidateCache();
  }

  private async syncAddonsToApi(addons: any[]): Promise<void> {
    for (const addon of addons) {
      await PlanApiService.upsertAddon(localAddonToApi(addon));
    }
    PlanApiService.invalidateCache();
  }

  /**
   * loadFromApi() — call once at app startup to warm localStorage from API
   * Add to your App.tsx or AppProvider.tsx useEffect
   *
   * Example:
   *   useEffect(() => { PlanSyncService.loadFromApi(); }, []);
   */
  async loadFromApi(): Promise<{ tiers: number; addons: number }> {
    let tierCount = 0;
    let addonCount = 0;
    try {
      const [tiers, addons] = await Promise.all([
        PlanApiService.getTiers(),
        PlanApiService.getAddons(),
      ]);
      if (tiers.length > 0) {
        DataService.setAll("PLAN_TIERS", tiers.map(apiTierToLocal));
        tierCount = tiers.length;
      }
      if (addons.length > 0) {
        DataService.setAll("PLAN_ADDONS", addons.map(apiAddonToLocal));
        addonCount = addons.length;
      }
      console.log(`[PlanSyncService] Loaded ${tierCount} tiers and ${addonCount} addons from API`);
    } catch (e) {
      console.warn("[PlanSyncService] loadFromApi failed — using cached data:", e);
    }
    return { tiers: tierCount, addons: addonCount };
  }
}

export const PlanSyncService = new PlanSyncServiceClass();
