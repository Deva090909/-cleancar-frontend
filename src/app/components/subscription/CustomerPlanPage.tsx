// CustomerPlanPage.tsx — Redesigned 2026
// Premium Amazon/Jio-style checkout with live cost panel
// Preserves ALL business logic, state, contexts from original

import React, { useState, useEffect, useMemo, useCallback, useRef } from "react";
import { useFinance } from "../../contexts/FinanceContext";
import { useCustomers } from "../../contexts/AppProvider";
import { useCustomerSubscriptions } from "../../contexts/AppProvider";
import { useCity } from "../../contexts/CityContext";

// ─── CONFIG TYPES (unchanged from original) ───────────────────────────────────
export interface PlanPageConfig {
  brand: { name: string; tagline: string; phone: string; whatsappNumber: string };
  hero: { badge: string; headline: string; headlineAccent: string; subheadline: string };
  trustItems: string[];
  trustStrip: string[];
  vehicleCategories: VehicleCategoryConfig[];
  carModelMap: Record<string, string>;
  serviceablePincodes: { code: string; label: string }[];
  monthlyPlans: MonthlyPlanConfig[];
  packs: PackConfig[];
  commitments: CommitmentConfig[];
  addons: AddonConfig[];
  timeSlots: string[];
  postPaymentSteps: string[];
  comboBundles?: any[];
}
export interface VehicleCategoryConfig { id: string; label: string; icon: string; }
export interface MonthlyPlanConfig { id: string; name: string; icon: string; tagline: string; popular?: boolean; features: { text: string; included: boolean }[]; prices: Record<string, number>; }
export interface PackConfig { id: string; name: string; icon: string; price?: number; perLabel?: string; discount?: string; prices?: any; description?: string; validityDays?: number; perVisitLabel?: string; }
export interface CommitmentConfig { id: string; term: string; discountLabel: string; perk: string; highlight?: "best" | "great"; }
export interface AddonConfig { id: string; name: string; price: number; unit: string; description: string; prices?: Record<string,number>; }

export const DEFAULT_CONFIG: PlanPageConfig = {
  brand: { name: "249 Carwashing", tagline: "Daily car wash at your doorstep", phone: "+91 82387 05601", whatsappNumber: "918238705601" },
  hero: { badge: "🚗 Surat's #1 Daily Car Wash Service", headline: "Your car, clean", headlineAccent: "every single day.", subheadline: "Professional doorstep car wash — before you wake up, after every drive. Photos after every wash on WhatsApp." },
  trustItems: ["📸 Before & after photos every wash","🔄 Free re-wash within 24h","🏠 We come to you","📞 Cancel anytime"],
  trustStrip: ["🔒 Razorpay secured payments","📸 Before & after photos every wash","🔄 Free re-wash within 24 hours","📞 7-day cancellation — no questions asked","🏠 We come to you — home, office, society"],
  vehicleCategories: [
    { id: "hatchback", label: "Hatchback / Compact Sedan", icon: "🚗" },
    { id: "suv",       label: "SUV / Sedan / MUV",         icon: "🚙" },
    { id: "luxury",    label: "Luxury / Large SUV",         icon: "🏎️" },
  ],
  carModelMap: {
    swift:"hatchback",baleno:"hatchback",i20:"hatchback",tiago:"hatchback",dzire:"hatchback",alto:"hatchback",wagon:"hatchback",figo:"hatchback",polo:"hatchback",jazz:"hatchback",amaze:"hatchback",tigor:"hatchback",
    creta:"suv",innova:"suv",ertiga:"suv",thar:"suv",xuv300:"suv",seltos:"suv",venue:"suv",nexon:"suv",ecosport:"suv",city:"suv",ciaz:"suv",verna:"suv",brezza:"suv",kushaq:"suv",slavia:"suv",
    fortuner:"luxury",xuv700:"luxury",meridian:"luxury",scorpio:"luxury",endeavour:"luxury",harrier:"luxury",safari:"luxury",gloster:"luxury",hilux:"luxury",crysta:"luxury",
  },
  serviceablePincodes: [
    { code:"395007",label:"Vesu / Pal" },{ code:"395005",label:"Piplod / Citylight" },
    { code:"395009",label:"Adajan" },{ code:"395010",label:"Bhatar / Katargam" },
    { code:"395004",label:"Varachha" },{ code:"395006",label:"Udhna / Sagrampura" },
    { code:"395003",label:"Athwa / Ring Road" },{ code:"395001",label:"Nanpura / Ghod Dod" },
    { code:"395002",label:"Rander / Jahangirpura" },{ code:"394510",label:"Althan / Dumas Road" },
  ],
  monthlyPlans: [
    { id:"water", name:"Express Wash", icon:"✨", tagline:"Chamakti Subah — your car, clean every morning", popular:false,
      features:[{text:"Exterior rinse + wipe",included:true},{text:"Tyre & rim wipe",included:true},{text:"Wiper fluid top-up",included:true},{text:"Before & after photo",included:true},{text:"Shampoo",included:false},{text:"Interior",included:false}],
      prices:{ hatchback:1249, suv:1499, luxury:1999 } },
    { id:"shampoo", name:"Smart Wash", icon:"🧴", tagline:"Naya Jaisa — full shampoo wash, every single day", popular:true,
      features:[{text:"Full shampoo exterior wash",included:true},{text:"Tyre & rim scrub",included:true},{text:"Wiper fluid top-up",included:true},{text:"Before & after photo",included:true},{text:"Interior basic wipe",included:true},{text:"Wax polish",included:false}],
      prices:{ hatchback:1599, suv:1999, luxury:2699 } },
    { id:"wax", name:"Elite Wash", icon:"🏆", tagline:"Showroom Wala Feel — premium daily care", popular:false,
      features:[{text:"Shampoo wash",included:true},{text:"Hand wax polish",included:true},{text:"Interior deep wipe",included:true},{text:"Before & after photo",included:true},{text:"Priority time slot",included:true},{text:"Monthly tyre dressing",included:true}],
      prices:{ hatchback:1999, suv:2499, luxury:3499 } },
  ],
  packs: [
    { id:"onetime", name:"One-Time Visit", icon:"1️⃣", description:"Single visit — Water Wash, Shampoo, or Shampoo+Wax", prices:{ waterWash:{hatchback:199,suv:299,luxury:399}, shampoo:{hatchback:299,suv:349,luxury:499}, shampooWax:{hatchback:399,suv:499,luxury:699} }, discount:"Standard rate", validityDays:null as any },
    { id:"pack2", name:"Pack of 2", icon:"🔁", description:"Pre-buy 2 visits — 8% saving. Use within 20 days.", prices:{ waterWash:{hatchback:370,suv:550,luxury:730}, shampoo:{hatchback:550,suv:640,luxury:920}, shampooWax:{hatchback:730,suv:920,luxury:1290} }, discount:"8% off", validityDays:20 },
    { id:"pack4", name:"Pack of 4", icon:"📅", description:"Pre-buy 4 visits — 15% saving. Use within 30 days.", prices:{ waterWash:{hatchback:680,suv:1020,luxury:1360}, shampoo:{hatchback:1020,suv:1180,luxury:1700}, shampooWax:{hatchback:1360,suv:1700,luxury:2380} }, discount:"15% off", validityDays:30 },
  ],
  commitments: [
    { id:"monthly",  term:"Month to Month", discountLabel:"No lock-in",  perk:"Cancel anytime. 7 days' notice." },
    { id:"3month",   term:"3 Months",       discountLabel:"5% off",      perk:"On renewal. ₹225 saving on Hatchback Shampoo." },
    { id:"6month",   term:"6 Months",       discountLabel:"10% off",     perk:"Renewal + free interior vacuum every month.", highlight:"great" },
    { id:"12month",  term:"12 Months",      discountLabel:"18% off",     perk:"Renewal + vacuum + tyre dressing monthly + priority slots.", highlight:"best" },
  ],
  comboBundles: [
    { id:"andar-se-sundar", name:"Andar Se Sundar", addonIds:["vacuum","dashboard"], prices:{hatchback:299,suv:399,luxury:549}, savings:{hatchback:49,suv:49,luxury:49} },
    { id:"showroom-shine",  name:"Showroom Shine Pack", addonIds:["waxpolish","vacuum","dashboard"], prices:{hatchback:849,suv:1099,luxury:1399}, savings:{hatchback:198,suv:248,luxury:348} },
  ],
  addons: [
    { id:"vacuum",    name:"Interior Deep Vacuum",        price:199, unit:"per visit", prices:{hatchback:199,suv:249,luxury:349}, description:"Seats, mats, footwells, boot area. Before+after photo." },
    { id:"dashboard", name:"Dashboard & Console Detail",  price:149, unit:"per visit", prices:{hatchback:149,suv:199,luxury:249}, description:"Dashboard, console, door pads cleaned & polished." },
    { id:"tyre",      name:"Tyre Dressing (all 4)",       price:99,  unit:"per visit", prices:{hatchback:99,suv:149,luxury:199},  description:"Shampoo + shine protect on all 4 tyres & mudguards." },
    { id:"waxpolish", name:"Full Hand Wax Polish",        price:199, unit:"per visit", prices:{hatchback:199,suv:249,luxury:399}, description:"Full body panel-by-panel wax. Outer body only." },
    { id:"underbody", name:"Underbody Wash",              price:199, unit:"per visit", prices:{hatchback:199,suv:249,luxury:349}, description:"Pressure wash — removes mud, grime, road salt." },
    { id:"enginebay", name:"Engine Bay Wipe-Down",        price:99,  unit:"per visit", prices:{hatchback:99,suv:149,luxury:199},  description:"Dry blow only — no water. Removes dust safely." },
    { id:"fragrance", name:"Car Fragrance",               price:49,  unit:"per visit", prices:{hatchback:49,suv:49,luxury:49},    description:"Fresh interior fragrance spray. ₹49 all vehicles." },
  ],
  timeSlots: ["Early morning (5am – 7am)","Morning (7am – 9am)","Late morning (9am – 11am)","Afternoon (11am – 1pm)","Evening (5pm – 7pm)"],
  postPaymentSteps: ["Receipt sent to your WhatsApp immediately","Confirmation call within 1 working day","Service activates within 2 working days","Before & after photos after every wash"],
};

function loadConfig(): PlanPageConfig {
  try { const raw = localStorage.getItem("cleancar_plan_page_config"); if (raw) return { ...DEFAULT_CONFIG, ...JSON.parse(raw) }; } catch {}
  return DEFAULT_CONFIG;
}

const inr = (n: number) => "₹" + n.toLocaleString("en-IN");

// ─── STYLES ───────────────────────────────────────────────────────────────────
const S = {
  // Palette — matches 24/9 brand: deep navy + sky blue + clean white
  navy:   "#0B1F3A",
  blue:   "#1B6FD8",
  blueL:  "#EBF3FF",
  green:  "#0A8A5A",
  greenL: "#E6F8F1",
  amber:  "#D97706",
  amberL: "#FEF3C7",
  gray:   "#64748B",
  border: "#E2E8F0",
  bg:     "#F7F9FC",
  white:  "#FFFFFF",
};

// ─── STEP INDICATOR ───────────────────────────────────────────────────────────
const STEP_LABELS = ["Car","Area","Plan","Add-ons","Details","Review"];
function StepBar({ step, goTo }: { step: number; goTo: (n: number) => void }) {
  return (
    <div style={{ display:"flex", alignItems:"center", padding:"0 4px", gap:2, overflowX:"auto" }}>
      {STEP_LABELS.map((label, i) => {
        const n = i + 1;
        const done = n < step;
        const active = n === step;
        return (
          <React.Fragment key={n}>
            <button
              onClick={() => done && goTo(n)}
              style={{
                display:"flex", alignItems:"center", gap:6, padding:"6px 10px",
                background:"none", border:"none", cursor: done ? "pointer" : "default",
                borderRadius:6, transition:"background 0.15s",
                backgroundColor: active ? S.blueL : "transparent",
              }}
            >
              <div style={{
                width:22, height:22, borderRadius:"50%", flexShrink:0,
                display:"flex", alignItems:"center", justifyContent:"center",
                fontSize:11, fontWeight:700,
                background: done ? S.green : active ? S.blue : S.border,
                color: (done || active) ? S.white : S.gray,
              }}>
                {done ? "✓" : n}
              </div>
              <span style={{
                fontSize:12, fontWeight: active ? 700 : 500, whiteSpace:"nowrap",
                color: active ? S.navy : done ? S.green : S.gray,
              }}>{label}</span>
            </button>
            {i < STEP_LABELS.length - 1 && (
              <div style={{ flex:1, height:1, minWidth:8, background: n < step ? S.green : S.border }} />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}

// ─── LIVE COST PANEL ─────────────────────────────────────────────────────────
function CostPanel({
  step, activeCat, vehicleCategories, selectedPlan, planMode, selectedPack,
  planPrice, packPrice, addons, addonTotal, total, commitment, commitments,
  cfg, vehicleCat, basePrice,
}: any) {
  const hasSelection = activeCat || selectedPlan || addons.length > 0;
  const planObj = cfg.monthlyPlans.find((p: any) => p.id === selectedPlan);
  const catLabel = vehicleCategories.find((c: any) => c.id === activeCat)?.label;
  const catIcon  = vehicleCategories.find((c: any) => c.id === activeCat)?.icon || "🚗";
  const commitObj = commitments.find((c: any) => c.id === commitment);

  const discountPct = commitment === "3month" ? 5 : commitment === "6month" ? 10 : commitment === "12month" ? 18 : 0;
  const discountAmt = planMode === "monthly" ? Math.round(planPrice * discountPct / 100) : 0;
  const finalTotal = total - discountAmt;

  return (
    <div style={{
      background:S.white, border:`1px solid ${S.border}`, borderRadius:16,
      overflow:"hidden", position:"sticky", top:80,
      boxShadow:"0 4px 24px rgba(11,31,58,0.08)",
    }}>
      {/* Header */}
      <div style={{ background:S.navy, padding:"16px 20px" }}>
        <div style={{ fontSize:11, color:"rgba(255,255,255,0.6)", letterSpacing:1, textTransform:"uppercase", marginBottom:4 }}>Order Summary</div>
        <div style={{ fontSize:28, fontWeight:800, color:S.white, fontFamily:"Georgia,serif" }}>
          {inr(finalTotal > 0 ? finalTotal : 0)}
          {planMode === "monthly" && <span style={{ fontSize:13, fontWeight:400, opacity:0.7 }}>/month</span>}
        </div>
        {discountAmt > 0 && (
          <div style={{ fontSize:12, color:"#86EFAC", marginTop:4 }}>
            🎉 Saving {inr(discountAmt)} with {commitObj?.term}
          </div>
        )}
      </div>

      <div style={{ padding:"16px 20px" }}>
        {!hasSelection && step < 3 && (
          <div style={{ textAlign:"center", padding:"24px 0", color:S.gray, fontSize:13 }}>
            <div style={{ fontSize:32, marginBottom:8 }}>🛒</div>
            <div>Your selections will appear here</div>
          </div>
        )}

        {/* Vehicle */}
        {activeCat && (
          <div style={{ marginBottom:12 }}>
            <div style={{ fontSize:11, color:S.gray, marginBottom:4, textTransform:"uppercase", letterSpacing:0.5 }}>Vehicle</div>
            <div style={{ display:"flex", alignItems:"center", gap:8 }}>
              <span style={{ fontSize:18 }}>{catIcon}</span>
              <span style={{ fontSize:13, color:S.navy, fontWeight:600 }}>{catLabel}</span>
            </div>
          </div>
        )}

        {/* Plan */}
        {planMode === "monthly" && selectedPlan && planPrice > 0 && (
          <div style={{ marginBottom:12 }}>
            <div style={{ fontSize:11, color:S.gray, marginBottom:4, textTransform:"uppercase", letterSpacing:0.5 }}>Plan</div>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
              <span style={{ fontSize:13, color:S.navy, fontWeight:600 }}>{planObj?.name}</span>
              <span style={{ fontSize:13, color:S.navy, fontWeight:700 }}>{inr(planPrice)}</span>
            </div>
            <div style={{ fontSize:11, color:S.gray }}>~₹{Math.round(planPrice/30)}/wash · 30 washes</div>
          </div>
        )}

        {/* Pack */}
        {planMode === "pack" && selectedPack && packPrice > 0 && (
          <div style={{ marginBottom:12 }}>
            <div style={{ fontSize:11, color:S.gray, marginBottom:4, textTransform:"uppercase", letterSpacing:0.5 }}>Pack</div>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
              <span style={{ fontSize:13, color:S.navy, fontWeight:600 }}>
                {cfg.packs.find((p: any) => p.id === selectedPack)?.name}
              </span>
              <span style={{ fontSize:13, color:S.navy, fontWeight:700 }}>{inr(packPrice)}</span>
            </div>
          </div>
        )}

        {/* Commitment */}
        {planMode === "monthly" && commitment !== "monthly" && (
          <div style={{ marginBottom:12 }}>
            <div style={{ fontSize:11, color:S.gray, marginBottom:4, textTransform:"uppercase", letterSpacing:0.5 }}>Commitment</div>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
              <span style={{ fontSize:13, color:S.navy }}>{commitObj?.term}</span>
              <span style={{ fontSize:12, color:S.green, fontWeight:600 }}>{commitObj?.discountLabel}</span>
            </div>
          </div>
        )}

        {/* Add-ons */}
        {addons.length > 0 && (
          <div style={{ marginBottom:12 }}>
            <div style={{ fontSize:11, color:S.gray, marginBottom:6, textTransform:"uppercase", letterSpacing:0.5 }}>Add-ons</div>
            {addons.map((id: string) => {
              const a = cfg.addons.find((x: any) => x.id === id);
              const p = a?.prices?.[vehicleCat] ?? a?.price ?? 0;
              return (
                <div key={id} style={{ display:"flex", justifyContent:"space-between", fontSize:12, marginBottom:4 }}>
                  <span style={{ color:S.gray }}>+ {a?.name}</span>
                  <span style={{ color:S.navy, fontWeight:600 }}>{inr(p)}</span>
                </div>
              );
            })}
          </div>
        )}

        {/* Divider + Total */}
        {(planPrice > 0 || packPrice > 0) && (
          <>
            <div style={{ borderTop:`1px dashed ${S.border}`, margin:"12px 0" }} />
            <div style={{ display:"flex", justifyContent:"space-between", marginBottom:4 }}>
              <span style={{ fontSize:13, color:S.gray }}>Subtotal</span>
              <span style={{ fontSize:13, color:S.navy, fontWeight:600 }}>{inr(total)}</span>
            </div>
            {discountAmt > 0 && (
              <div style={{ display:"flex", justifyContent:"space-between", marginBottom:4 }}>
                <span style={{ fontSize:13, color:S.green }}>Commitment discount</span>
                <span style={{ fontSize:13, color:S.green, fontWeight:600 }}>−{inr(discountAmt)}</span>
              </div>
            )}
            <div style={{ display:"flex", justifyContent:"space-between", marginBottom:4 }}>
              <span style={{ fontSize:12, color:S.gray }}>GST (18%)</span>
              <span style={{ fontSize:12, color:S.gray }}>{inr(Math.round(finalTotal * 0.18))}</span>
            </div>
            <div style={{ display:"flex", justifyContent:"space-between", marginTop:8, paddingTop:8, borderTop:`2px solid ${S.navy}` }}>
              <span style={{ fontSize:15, color:S.navy, fontWeight:700 }}>Grand Total</span>
              <span style={{ fontSize:15, color:S.navy, fontWeight:800 }}>{inr(Math.round(finalTotal * 1.18))}</span>
            </div>
          </>
        )}
      </div>

      {/* Trust signals */}
      <div style={{ borderTop:`1px solid ${S.border}`, padding:"12px 20px", background:S.bg }}>
        {["🔒 Razorpay secured payment","📸 Before & after photos every wash","🔄 Free re-wash within 24 hours"].map(t => (
          <div key={t} style={{ fontSize:11, color:S.gray, marginBottom:4 }}>{t}</div>
        ))}
      </div>
    </div>
  );
}

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────
export function CustomerPlanPage() {
  const [cfg, setCfg] = useState<PlanPageConfig>(loadConfig);
  const [step, setStep] = useState(1);

  // Step 1
  const [carModel, setCarModel] = useState("");
  const [detectedCat, setDetectedCat] = useState<string | null>(null);
  const [catConfirmed, setCatConfirmed] = useState(false);

  // Step 2
  const [pincode, setPincode] = useState("");
  const [pincodeStatus, setPincodeStatus] = useState<"ok"|"waitlist"|null>(null);

  // Step 3
  const [planMode, setPlanMode] = useState<"monthly"|"pack">("monthly");
  const [selectedPlan, setSelectedPlan] = useState<string|null>(null);
  const [selectedPack, setSelectedPack] = useState<string|null>(null);
  const [commitment, setCommitment] = useState("monthly");

  // Step 4
  const [addons, setAddons] = useState<string[]>([]);
  const [addonFreq, setAddonFreq] = useState<Record<string,string>>({});
  const [bundleFreq, setBundleFreq] = useState<Record<string,string>>({});
  const _washRef = useRef<string>("shampoo");
  const [, _forceWashRender] = useState(0);
  const setSelectedWashType = useCallback((v: string) => { _washRef.current = v; _forceWashRender(n => n+1); }, []);

  // Step 5
  const [custName, setCustName]       = useState("");
  const [custMobile, setCustMobile]   = useState("");
  const [custEmail, setCustEmail]     = useState("");
  const [custReg, setCustReg]         = useState("");
  const [custAddress, setCustAddress] = useState("");
  const [prefTime, setPrefTime]       = useState("");
  const [oneTimeDate, setOneTimeDate] = useState("");
  const [oneTimeHour, setOneTimeHour] = useState("");
  const [parking, setParking]         = useState<"dedicated"|"random">("dedicated");
  const [notifyPref, setNotifyPref]   = useState<"whatsapp"|"email"|"both">("whatsapp");

  // Step 6
  const [consentTerms, setConsentTerms]   = useState(false);
  const [consentRefund, setConsentRefund] = useState(false);
  const [consentCancel, setConsentCancel] = useState(false);
  const [showTnC, setShowTnC]             = useState<"terms"|"refund"|"cancel"|null>(null);

  // Submit
  const [isProcessing, setIsProcessing]       = useState(false);
  const [invoiceNumber, setInvoiceNumber]     = useState("");
  const [generatedInvoice, setGeneratedInvoice] = useState<any>(null);

  const { recordRevenue } = useFinance();
  const { addCustomer, customers } = useCustomers();
  const { createSubscription } = useCustomerSubscriptions();
  const { city } = useCity();

  useEffect(() => {
    const onStorage = () => setCfg(loadConfig());
    window.addEventListener("storage", onStorage);
    window.addEventListener("planConfigUpdated", onStorage);
    return () => { window.removeEventListener("storage", onStorage); window.removeEventListener("planConfigUpdated", onStorage); };
  }, []);

  useEffect(() => {
    if (carModel.trim().length < 2) { setDetectedCat(null); setCatConfirmed(false); return; }
    const val = carModel.toLowerCase().trim();
    let found: string|null = null;
    for (const [kw, cat] of Object.entries(cfg.carModelMap)) { if (val.includes(kw)) { found = cat; break; } }
    setDetectedCat(found || (carModel.trim().length >= 3 ? "hatchback" : null));
    setCatConfirmed(false);
  }, [carModel, cfg.carModelMap]);

  useEffect(() => {
    if (pincode.length !== 6) { setPincodeStatus(null); return; }
    setPincodeStatus(cfg.serviceablePincodes.some(p => p.code === pincode) ? "ok" : "waitlist");
  }, [pincode, cfg.serviceablePincodes]);

  const activeCat  = detectedCat;
  const catLabel   = cfg.vehicleCategories.find(c => c.id === activeCat)?.label || "";
  const vehicleCat = (() => {
    const cat = (activeCat||"").toLowerCase();
    if (cat.includes("luxury")||cat.includes("lux")) return "luxury";
    if (cat.includes("suv")||cat.includes("muv")||cat.includes("sedan")) return "suv";
    return "hatchback";
  })();

  const getAddonPrice = (id: string): number => {
    const a = cfg.addons.find(a => a.id === id); if (!a) return 0;
    const p = (a as any).prices; return p ? (p[vehicleCat] ?? a.price) : a.price;
  };

  const planPrice = useMemo(() => {
    if (!selectedPlan || !activeCat) return 0;
    return cfg.monthlyPlans.find(p => p.id === selectedPlan)?.prices[activeCat] ?? 0;
  }, [selectedPlan, activeCat, cfg.monthlyPlans]);

  const packPrice = useMemo(() => {
    const p = cfg.packs.find(p => p.id === selectedPack); if (!p) return 0;
    const nested = (p as any).prices;
    if (nested) {
      const washObj = nested[_washRef.current] ?? nested.shampoo ?? nested.waterWash ?? Object.values(nested)[0];
      if (washObj && typeof washObj === "object") {
        const _cat = vehicleCat;
        const catPrice = (washObj as any)[_cat] ?? (washObj as any).hatchback ?? 0;
        return typeof catPrice === "number" ? catPrice : 0;
      }
    }
    return typeof (p as any).price === "number" ? (p as any).price : 0;
  }, [selectedPack, _washRef.current, cfg.packs, activeCat]);

  const addonTotal = useMemo(() => {
    const indiv = addons.reduce((s, id) => {
      const inBundle = (cfg as any).comboBundles?.some((b: any) => b.addonIds.includes(id) && b.addonIds.every((bid: string) => addons.includes(bid)));
      if (inBundle) return s;
      const freq = addonFreq[id] ? parseInt(addonFreq[id]) : 1;
      return s + getAddonPrice(id) * (isNaN(freq) ? 1 : freq);
    }, 0);
    const bundleTotals = ((cfg as any).comboBundles||[]).reduce((s: number, b: any) => {
      const allSel = b.addonIds.every((id: string) => addons.includes(id));
      if (!allSel) return s;
      const bPrice = b.prices?.[vehicleCat] ?? b.prices?.hatchback ?? 0;
      const freq = bundleFreq[b.id] ? parseInt(bundleFreq[b.id]) : 1;
      return s + bPrice * (isNaN(freq) ? 1 : freq);
    }, 0);
    return indiv + bundleTotals;
  }, [addons, addonFreq, bundleFreq, cfg.addons, selectedPlan, activeCat]);

  const basePrice = planMode === "monthly" ? planPrice : packPrice;
  const total     = basePrice + addonTotal;
  const isOneTime = planMode === "pack" && selectedPack === "onetime";

  const discountPct = commitment === "3month" ? 5 : commitment === "6month" ? 10 : commitment === "12month" ? 18 : 0;
  const discountAmt = planMode === "monthly" ? Math.round(planPrice * discountPct / 100) : 0;
  const finalTotal  = total - discountAmt;

  const step1Ok = !!activeCat && carModel.trim().length >= 2;
  const step2Ok = pincodeStatus !== null;
  const step3Ok = planMode === "monthly" ? !!selectedPlan : !!selectedPack;
  const step5Ok = custName && custMobile && custAddress && (isOneTime ? (oneTimeDate && oneTimeHour) : !!prefTime);
  const step6Ok = consentTerms && consentRefund && consentCancel;

  const PUBLIC_HOLIDAYS: string[] = useMemo(() => {
    try { const s = localStorage.getItem("cleancar_public_holidays"); if (s) return JSON.parse(s); } catch {}
    return ["2026-01-26","2026-03-25","2026-04-06","2026-04-14","2026-04-15","2026-05-01","2026-08-15","2026-10-02","2026-10-20","2026-11-01","2026-12-25"];
  }, []);
  const isHoliday = (d: Date) => d.getDay() === 0 || PUBLIC_HOLIDAYS.includes(d.toISOString().slice(0,10));
  const nextWorkingDay = (from: Date): Date => { const d = new Date(from); d.setDate(d.getDate()+1); while(isHoliday(d)) d.setDate(d.getDate()+1); return d; };
  const nowCutoffInfo = () => { const n=new Date(),h=n.getHours(),m=n.getMinutes(),t=h*60+m; if(isHoliday(n)||t>=18*60+30) return{nextOnly:true,nwdMinHour:13}; if(t>=16*60) return{nextOnly:true,nwdMinHour:18}; return{nextOnly:false,nwdMinHour:13}; };
  const minOneTimeDate = useMemo(() => { const{nextOnly}=nowCutoffInfo(); return nextOnly?nextWorkingDay(new Date()).toISOString().slice(0,10):new Date().toISOString().slice(0,10); }, [PUBLIC_HOLIDAYS]);
  const getOneTimeSlots = (dateStr: string): string[] => {
    if(!dateStr) return [];
    const now=new Date(),nowHour=now.getHours(),todayStr=now.toISOString().slice(0,10),isToday=dateStr===todayStr;
    const slots: string[] = [];
    for(let h=5;h<=21;h++){
      const padH=String(h).padStart(2,"0")+":00";
      if(isToday){ if(nowHour<10){if(h>=12)slots.push(padH);} else if(nowHour<16){if(h>=nowHour+4)slots.push(padH);} }
      else{const{nextOnly,nwdMinHour}=nowCutoffInfo();const nwdStr=nextWorkingDay(now).toISOString().slice(0,10);if(nextOnly&&dateStr===nwdStr){if(h>=nwdMinHour)slots.push(padH);}else{slots.push(padH);}}
    }
    return slots;
  };
  const handleOneTimeDateChange = (dateStr: string) => {
    setOneTimeDate(dateStr);
    const{nextOnly,nwdMinHour}=nowCutoffInfo(),nwdStr=nextWorkingDay(new Date()).toISOString().slice(0,10);
    if(nextOnly&&dateStr===nwdStr){setOneTimeHour(`${String(nwdMinHour).padStart(2,"0")}:00`);}else{setOneTimeHour("");}
  };

  const scrollTopRef = useRef<HTMLDivElement>(null);
  const goTo = useCallback((n: number) => {
    setStep(n);
    setTimeout(() => scrollTopRef.current?.scrollIntoView({ behavior:"smooth", block:"start" }), 50);
  }, []);

  const handleSubmit = async () => {
    setIsProcessing(true);
    try {
      const now = new Date();
      const invNum = `INV-${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,"0")}-${Date.now().toString().slice(-6)}`;
      setInvoiceNumber(invNum);
      const nameParts = custName.trim().split(" "), firstName = nameParts[0]||custName, lastName = nameParts.slice(1).join(" ")||"—";
      const existing = customers.find(c => c.phone===custMobile||(custEmail&&c.email===custEmail));
      let customerId: string;
      if (existing) { customerId = existing.customerId; }
      else {
        const newCust = addCustomer({ firstName, lastName, email:custEmail||"", phone:custMobile, address:{ line1:custAddress, area:cfg.serviceablePincodes.find(p=>p.code===pincode)?.label||pincode, city:"Surat", pinCode:pincode }, vehicleDetails:activeCat?{category:activeCat,brand:carModel.split(" ")[0]||carModel,color:"",registrationNumber:custReg.toUpperCase()}:undefined, leadSource:"Website — Buy Page", status:"Active", tags:["web-signup"] });
        customerId = newCust.customerId;
      }
      const planObj = cfg.monthlyPlans.find(p=>p.id===selectedPlan), packObj = cfg.packs.find(p=>p.id===selectedPack);
      const renewalDate = new Date(now); renewalDate.setMonth(renewalDate.getMonth()+1);
      const sub = createSubscription({ customerId, packageType:selectedPlan==="wax"?"Premium":selectedPlan==="shampoo"?"Standard":"Basic", packageName:planMode==="monthly"?(planObj?.name||selectedPlan||"Plan"):(packObj?.name||selectedPack||"Pack"), frequency:isOneTime?"One-Time":selectedPack==="pack2"?"Pack of 2":selectedPack==="pack4"?"Pack of 4":"One-time", status:"Active", startDate:now.toISOString().split("T")[0], renewalDate:renewalDate.toISOString().split("T")[0], pricing:{ basePrice, discount:discountAmt, finalPrice:finalTotal, currency:"INR" }, serviceDetails:{ vehicleType:activeCat||"hatchback", addOns:addons, preferredTimeSlot:isOneTime?`${oneTimeDate} ${oneTimeHour}`:prefTime }, billingCycle:"Monthly", paymentStatus:"Paid" });
      recordRevenue({ customerId, subscriptionId:sub.subscriptionId, type:planMode==="monthly"?"Subscription":"One-Time", amount:finalTotal, receivedDate:now.toISOString().split("T")[0], paymentMethod:"UPI", invoiceNumber:invNum, status:"Received", cityId:city||"CITY-SURAT" });
      const invoice = {
        invoiceNumber:invNum, invoiceDate:now.toLocaleDateString("en-IN",{day:"2-digit",month:"long",year:"numeric"}),
        customerName:custName, customerPhone:custMobile, customerEmail:custEmail, vehicleReg:custReg, address:custAddress, pincode,
        items:[...(planMode==="monthly"?[{name:`${planObj?.name||selectedPlan} — Monthly Subscription (${catLabel})`,qty:1,rate:planPrice,amount:planPrice}]:[{name:`${packObj?.name||selectedPack} Pack`,qty:1,rate:packPrice,amount:packPrice}]), ...addons.map(id=>{const a=cfg.addons.find(x=>x.id===id);return{name:a?.name||id,qty:1,rate:a?.price||0,amount:a?.price||0};})],
        subtotal:finalTotal, cgst:parseFloat((finalTotal*0.09).toFixed(2)), sgst:parseFloat((finalTotal*0.09).toFixed(2)), grandTotal:parseFloat((finalTotal*1.18).toFixed(2)),
        paymentMethod:"Razorpay (UPI/Card/NetBanking)", subscriptionId:sub.subscriptionId, customerId, notifyPref, commitment:planMode==="monthly"?(cfg.commitments.find(c=>c.id===commitment)?.term||commitment):"N/A",
      };
      setGeneratedInvoice(invoice);
      try { const stored=JSON.parse(localStorage.getItem("cleancar_web_invoices")||"[]"); stored.unshift({...invoice,createdAt:now.toISOString(),status:"PAID"}); localStorage.setItem("cleancar_web_invoices",JSON.stringify(stored.slice(0,500))); } catch(_){}
      const waMsg = encodeURIComponent(`Hi ${firstName}! 🎉\n\nYour ${invoice.items[0].name} is confirmed!\n\nInvoice: ${invNum}\nAmount Paid: ₹${(invoice?.grandTotal??0).toLocaleString("en-IN")} (incl. GST)\n\nService starts within 2 working days. Your washer will send before & after photos after every wash.\n\nThank you for choosing ${cfg.brand.name}! 🚗✨`);
      if (notifyPref==="whatsapp"||notifyPref==="both") { (window as any)._pendingWAInvoice=`https://wa.me/${cfg.brand.whatsappNumber}?text=${waMsg}`; }
      setIsProcessing(false);
      goTo(7);
    } catch(err) { setIsProcessing(false); alert("Something went wrong. Please try again."); }
  };

  // ── SUCCESS PAGE ─────────────────────────────────────────────────────────
  if (step === 7) {
    const inv = generatedInvoice;
    const waMsg = encodeURIComponent(`Hi! Sharing my invoice ${inv?.invoiceNumber} from ${cfg.brand.name}. Please confirm my subscription.`);
    return (
      <div style={{ minHeight:"100vh", background:S.bg, display:"flex", alignItems:"center", justifyContent:"center", padding:"40px 20px", fontFamily:"'Nunito',sans-serif" }}>
        <div style={{ maxWidth:520, width:"100%", textAlign:"center" }}>
          <div style={{ width:80, height:80, borderRadius:"50%", background:S.greenL, display:"flex", alignItems:"center", justifyContent:"center", fontSize:40, margin:"0 auto 24px" }}>🎉</div>
          <h1 style={{ fontSize:28, fontWeight:800, color:S.navy, marginBottom:8 }}>You're all set!</h1>
          <p style={{ color:S.gray, marginBottom:32 }}>Invoice <strong>{inv?.invoiceNumber}</strong> — ₹{inv?.grandTotal?.toLocaleString("en-IN")} incl. GST</p>
          {cfg.postPaymentSteps.map((step: string, i: number) => (
            <div key={i} style={{ display:"flex", alignItems:"center", gap:12, background:S.white, border:`1px solid ${S.border}`, borderRadius:10, padding:"12px 16px", marginBottom:8, textAlign:"left" }}>
              <div style={{ width:28, height:28, borderRadius:"50%", background:S.blueL, color:S.blue, fontWeight:700, fontSize:13, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>{i+1}</div>
              <span style={{ fontSize:14, color:S.navy }}>{step}</span>
            </div>
          ))}
          <div style={{ display:"flex", gap:12, marginTop:28, flexWrap:"wrap", justifyContent:"center" }}>
            <a href={`https://wa.me/${cfg.brand.whatsappNumber}?text=${waMsg}`} target="_blank" rel="noreferrer"
              style={{ padding:"12px 24px", background:"#25D366", color:S.white, borderRadius:50, fontWeight:700, fontSize:14, textDecoration:"none", display:"inline-flex", alignItems:"center", gap:8 }}>
              📲 Share on WhatsApp
            </a>
            <button onClick={() => { setStep(1); setCarModel(""); setDetectedCat(null); setSelectedPlan(null); setAddons([]); setGeneratedInvoice(null); }}
              style={{ padding:"12px 24px", background:S.navy, color:S.white, borderRadius:50, fontWeight:700, fontSize:14, border:"none", cursor:"pointer" }}>
              Buy Another Plan
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── BTN ────────────────────────────────────────────────────────────────────
  const Btn = ({ label, onClick, disabled, secondary }: { label: string; onClick: () => void; disabled?: boolean; secondary?: boolean }) => (
    <button onClick={onClick} disabled={disabled}
      style={{ padding:"13px 32px", background:disabled?S.border:secondary?S.white:S.navy, color:disabled?S.gray:secondary?S.navy:S.white, border:secondary?`2px solid ${S.border}`:"none", borderRadius:50, fontWeight:700, fontSize:15, cursor:disabled?"not-allowed":"pointer", transition:"all 0.2s", fontFamily:"'Nunito',sans-serif", boxShadow:(!disabled&&!secondary)?"0 4px 14px rgba(11,31,58,0.2)":"none" }}>
      {label}
    </button>
  );

  const Card = ({ selected, onClick, children, highlight }: { selected?: boolean; onClick?: () => void; children: React.ReactNode; highlight?: boolean }) => (
    <div onClick={onClick}
      style={{ border:`2px solid ${selected?S.blue:highlight?S.amber:S.border}`, borderRadius:14, padding:"16px 18px", cursor:onClick?"pointer":"default", background:selected?S.blueL:S.white, transition:"all 0.15s", boxShadow:selected?"0 0 0 4px rgba(27,111,216,0.12)":"0 1px 4px rgba(0,0,0,0.04)", position:"relative" }}>
      {children}
    </div>
  );

  // ── LAYOUT ────────────────────────────────────────────────────────────────
  return (
    <div ref={scrollTopRef} style={{ minHeight:"100vh", background:S.bg, fontFamily:"'Nunito',sans-serif" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700;800;900&display=swap'); * { box-sizing: border-box; } input:focus, textarea:focus, select:focus { outline: 2px solid #1B6FD8 !important; outline-offset: 2px; } input[type=radio] { accent-color: #1B6FD8; } input[type=checkbox] { accent-color: #1B6FD8; }`}</style>

      {/* Top bar */}
      <div style={{ background:S.navy, padding:"12px 24px", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
        <div>
          <div style={{ fontSize:18, fontWeight:800, color:S.white, letterSpacing:"-0.3px" }}>249 Carwashing</div>
          <div style={{ fontSize:11, color:"rgba(255,255,255,0.5)" }}>Secure Checkout</div>
        </div>
        <div style={{ display:"flex", gap:16, alignItems:"center" }}>
          <span style={{ fontSize:12, color:"rgba(255,255,255,0.7)" }}>🔒 Secured by Razorpay</span>
          <a href={`tel:${cfg.brand.phone}`} style={{ fontSize:13, color:"#93C5FD", textDecoration:"none", fontWeight:600 }}>{cfg.brand.phone}</a>
        </div>
      </div>

      {/* Steps bar */}
      <div style={{ background:S.white, borderBottom:`1px solid ${S.border}`, padding:"0 24px", position:"sticky", top:0, zIndex:100, boxShadow:"0 2px 8px rgba(0,0,0,0.06)" }}>
        <div style={{ maxWidth:1100, margin:"0 auto", padding:"10px 0" }}>
          <StepBar step={step} goTo={goTo} />
        </div>
      </div>

      {/* Body: left (form) + right (cost panel) */}
      <div style={{ maxWidth:1100, margin:"0 auto", padding:"28px 20px", display:"grid", gridTemplateColumns:"1fr 360px", gap:28, alignItems:"start" }}>

        {/* ── STEP CONTENT ───────────────────────────────────────────────── */}
        <div>

          {/* ── STEP 1: Your Car ─────────────────────────────────────────── */}
          {step === 1 && (
            <div>
              <div style={{ marginBottom:24 }}>
                <div style={{ fontSize:11, color:S.blue, fontWeight:700, letterSpacing:1, textTransform:"uppercase", marginBottom:6 }}>Step 1 of 6</div>
                <h2 style={{ fontSize:26, fontWeight:800, color:S.navy, margin:"0 0 8px" }}>Tell us about your car</h2>
                <p style={{ color:S.gray, fontSize:14, margin:0 }}>We'll automatically detect your vehicle type from the model name.</p>
              </div>

              {/* Model input */}
              <div style={{ marginBottom:20 }}>
                <label style={{ display:"block", fontSize:13, fontWeight:700, color:S.navy, marginBottom:8 }}>Car model or name</label>
                <input
                  value={carModel} onChange={e => setCarModel(e.target.value)}
                  placeholder="e.g. Swift, Creta, Innova…"
                  style={{ width:"100%", padding:"14px 16px", border:`2px solid ${detectedCat?S.blue:S.border}`, borderRadius:10, fontSize:15, fontFamily:"'Nunito',sans-serif", background:S.white, color:S.navy }}
                />
                {detectedCat && (
                  <div style={{ marginTop:10, padding:"10px 14px", background:S.blueL, borderRadius:8, display:"flex", alignItems:"center", gap:10 }}>
                    <span style={{ fontSize:20 }}>{cfg.vehicleCategories.find(c => c.id === detectedCat)?.icon}</span>
                    <div>
                      <div style={{ fontSize:13, fontWeight:700, color:S.navy }}>Detected: {cfg.vehicleCategories.find(c => c.id === detectedCat)?.label}</div>
                      <div style={{ fontSize:12, color:S.gray }}>Not right? Select manually below.</div>
                    </div>
                  </div>
                )}
              </div>

              {/* Manual vehicle cards */}
              <div style={{ marginBottom:24 }}>
                <div style={{ fontSize:13, fontWeight:700, color:S.navy, marginBottom:12 }}>Select vehicle type</div>
                <div style={{ display:"grid", gridTemplateColumns:"repeat(3, 1fr)", gap:12 }}>
                  {cfg.vehicleCategories.map(cat => (
                    <Card key={cat.id} selected={activeCat === cat.id}
                      onClick={() => { setDetectedCat(cat.id); setCatConfirmed(true); setCarModel(prev => prev || cat.label); }}>
                      <div style={{ textAlign:"center" }}>
                        <div style={{ fontSize:36, marginBottom:8 }}>{cat.icon}</div>
                        <div style={{ fontSize:13, fontWeight:700, color:S.navy }}>{cat.label}</div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Price preview */}
              {activeCat && (
                <div style={{ background:S.greenL, border:`1px solid ${S.green}20`, borderRadius:10, padding:"12px 16px", marginBottom:24 }}>
                  <div style={{ fontSize:13, fontWeight:700, color:S.green, marginBottom:8 }}>💡 Plans available for your vehicle</div>
                  <div style={{ display:"flex", gap:16 }}>
                    {cfg.monthlyPlans.map(p => (
                      <div key={p.id} style={{ textAlign:"center" }}>
                        <div style={{ fontSize:12, color:S.gray }}>{p.icon} {p.name}</div>
                        <div style={{ fontSize:16, fontWeight:800, color:S.navy }}>{inr(p.prices[activeCat])}</div>
                        <div style={{ fontSize:11, color:S.gray }}>/month</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div style={{ display:"flex", justifyContent:"flex-end" }}>
                <Btn label="Continue → Area" onClick={() => goTo(2)} disabled={!step1Ok} />
              </div>
            </div>
          )}

          {/* ── STEP 2: Your Area ────────────────────────────────────────── */}
          {step === 2 && (
            <div>
              <div style={{ marginBottom:24 }}>
                <div style={{ fontSize:11, color:S.blue, fontWeight:700, letterSpacing:1, textTransform:"uppercase", marginBottom:6 }}>Step 2 of 6</div>
                <h2 style={{ fontSize:26, fontWeight:800, color:S.navy, margin:"0 0 8px" }}>Check your area</h2>
                <p style={{ color:S.gray, fontSize:14, margin:0 }}>Enter your 6-digit pincode to check serviceability.</p>
              </div>

              <div style={{ marginBottom:20 }}>
                <label style={{ display:"block", fontSize:13, fontWeight:700, color:S.navy, marginBottom:8 }}>Pincode</label>
                <input
                  value={pincode} onChange={e => setPincode(e.target.value.replace(/\D/g,"").slice(0,6))}
                  placeholder="e.g. 395007"
                  style={{ width:"100%", maxWidth:280, padding:"14px 16px", border:`2px solid ${pincodeStatus==="ok"?S.green:pincodeStatus==="waitlist"?"#EF4444":S.border}`, borderRadius:10, fontSize:18, fontWeight:700, letterSpacing:4, fontFamily:"'Nunito',sans-serif", color:S.navy }}
                />
                {pincodeStatus === "ok" && (
                  <div style={{ marginTop:10, padding:"10px 14px", background:S.greenL, borderRadius:8, display:"inline-flex", alignItems:"center", gap:8 }}>
                    <span style={{ color:S.green, fontSize:18 }}>✅</span>
                    <div>
                      <div style={{ fontSize:13, fontWeight:700, color:S.green }}>Great news — we serve your area!</div>
                      <div style={{ fontSize:12, color:S.gray }}>{cfg.serviceablePincodes.find(p => p.code === pincode)?.label}</div>
                    </div>
                  </div>
                )}
                {pincodeStatus === "waitlist" && (
                  <div style={{ marginTop:10, padding:"10px 14px", background:"#FEF2F2", borderRadius:8, display:"inline-flex", alignItems:"center", gap:8 }}>
                    <span style={{ fontSize:18 }}>⏳</span>
                    <div>
                      <div style={{ fontSize:13, fontWeight:700, color:"#DC2626" }}>Not yet in your area</div>
                      <div style={{ fontSize:12, color:S.gray }}>We'll add you to the waitlist and notify you.</div>
                    </div>
                  </div>
                )}
              </div>

              {/* Serviceable pincodes list */}
              <div style={{ marginBottom:28 }}>
                <div style={{ fontSize:13, color:S.gray, marginBottom:10 }}>Currently serving these areas in Surat:</div>
                <div style={{ display:"flex", flexWrap:"wrap", gap:8 }}>
                  {cfg.serviceablePincodes.map(p => (
                    <button key={p.code} onClick={() => setPincode(p.code)}
                      style={{ padding:"6px 12px", borderRadius:20, border:`1px solid ${pincode===p.code?S.blue:S.border}`, background:pincode===p.code?S.blueL:S.white, color:pincode===p.code?S.blue:S.navy, fontSize:12, fontWeight:600, cursor:"pointer", fontFamily:"'Nunito',sans-serif" }}>
                      {p.label} · {p.code}
                    </button>
                  ))}
                </div>
              </div>

              <div style={{ display:"flex", justifyContent:"space-between" }}>
                <Btn label="← Back" onClick={() => goTo(1)} secondary />
                <Btn label="Continue → Plan" onClick={() => goTo(3)} disabled={!step2Ok} />
              </div>
            </div>
          )}

          {/* ── STEP 3: Choose Plan ──────────────────────────────────────── */}
          {step === 3 && (
            <div>
              <div style={{ marginBottom:24 }}>
                <div style={{ fontSize:11, color:S.blue, fontWeight:700, letterSpacing:1, textTransform:"uppercase", marginBottom:6 }}>Step 3 of 6</div>
                <h2 style={{ fontSize:26, fontWeight:800, color:S.navy, margin:"0 0 8px" }}>Choose your plan</h2>
                <p style={{ color:S.gray, fontSize:14, margin:0 }}>Monthly subscription or a visit pack — you decide.</p>
              </div>

              {/* Monthly / Pack toggle */}
              <div style={{ display:"inline-flex", background:"#F1F5F9", borderRadius:50, padding:4, marginBottom:24, gap:4 }}>
                {(["monthly","pack"] as const).map(m => (
                  <button key={m} onClick={() => setPlanMode(m)}
                    style={{ padding:"8px 24px", borderRadius:50, border:"none", background:planMode===m?S.white:"none", color:planMode===m?S.navy:S.gray, fontWeight:planMode===m?700:500, fontSize:14, cursor:"pointer", fontFamily:"'Nunito',sans-serif", boxShadow:planMode===m?"0 2px 8px rgba(0,0,0,0.1)":"none", transition:"all 0.2s" }}>
                    {m === "monthly" ? "🔄 Monthly" : "📦 Visit Pack"}
                  </button>
                ))}
              </div>

              {/* Monthly plans */}
              {planMode === "monthly" && (
                <>
                  <div style={{ display:"grid", gridTemplateColumns:"repeat(3, 1fr)", gap:14, marginBottom:24 }}>
                    {cfg.monthlyPlans.map(plan => {
                      const price = plan.prices[activeCat||"hatchback"] || 0;
                      const perWashCost = Math.round(price / 30);
                      return (
                        <Card key={plan.id} selected={selectedPlan===plan.id} onClick={() => setSelectedPlan(plan.id)}>
                          {plan.popular && <div style={{ position:"absolute", top:-10, left:"50%", transform:"translateX(-50%)", background:"linear-gradient(135deg,#F59E0B,#EF4444)", color:S.white, fontSize:10, fontWeight:800, padding:"3px 12px", borderRadius:20, letterSpacing:0.5, whiteSpace:"nowrap" }}>MOST POPULAR</div>}
                          <div style={{ textAlign:"center", paddingTop: plan.popular?8:0 }}>
                            <div style={{ fontSize:28, marginBottom:6 }}>{plan.icon}</div>
                            <div style={{ fontSize:16, fontWeight:800, color:S.navy, marginBottom:4 }}>{plan.name}</div>
                            <div style={{ fontSize:22, fontWeight:800, color:selectedPlan===plan.id?S.blue:S.navy, marginBottom:2 }}>{inr(price)}</div>
                            <div style={{ fontSize:11, color:S.gray, marginBottom:12 }}>₹{perWashCost}/wash · 30 washes</div>
                            <div style={{ textAlign:"left" }}>
                              {plan.features.slice(0,4).map((f, i) => (
                                <div key={i} style={{ display:"flex", alignItems:"center", gap:6, marginBottom:4 }}>
                                  <span style={{ fontSize:11, color:f.included?S.green:"#CBD5E1", fontWeight:700 }}>{f.included?"✓":"✗"}</span>
                                  <span style={{ fontSize:11, color:f.included?S.navy:S.gray }}>{f.text}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </Card>
                      );
                    })}
                  </div>

                  {/* Commitment */}
                  <div style={{ marginBottom:24 }}>
                    <div style={{ fontSize:14, fontWeight:700, color:S.navy, marginBottom:12 }}>How long do you want to commit?</div>
                    <div style={{ display:"grid", gridTemplateColumns:"repeat(2,1fr)", gap:10 }}>
                      {cfg.commitments.map(c => (
                        <Card key={c.id} selected={commitment===c.id} onClick={() => setCommitment(c.id)} highlight={c.highlight==="best"}>
                          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start" }}>
                            <div>
                              <div style={{ fontSize:14, fontWeight:700, color:S.navy }}>{c.term}</div>
                              <div style={{ fontSize:11, color:S.gray, marginTop:2 }}>{c.perk}</div>
                            </div>
                            <div style={{ flexShrink:0, marginLeft:8 }}>
                              <span style={{ fontSize:12, fontWeight:700, color:c.highlight?"#D97706":S.blue, background:c.highlight?S.amberL:S.blueL, padding:"3px 8px", borderRadius:12 }}>
                                {c.discountLabel}
                              </span>
                            </div>
                          </div>
                          {c.highlight === "best" && <div style={{ fontSize:10, color:S.amber, fontWeight:700, marginTop:6 }}>⭐ BEST VALUE</div>}
                        </Card>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {/* Pack mode */}
              {planMode === "pack" && (
                <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:14, marginBottom:24 }}>
                  {cfg.packs.map(pack => {
                    const nested = (pack as any).prices;
                    let dispPrice = 0;
                    if (nested) {
                      const washObj = nested.shampoo ?? nested.waterWash ?? Object.values(nested)[0];
                      if (washObj && typeof washObj === "object") dispPrice = (washObj as any)[vehicleCat] ?? (washObj as any).hatchback ?? 0;
                    }
                    if (!dispPrice && typeof (pack as any).price === "number") dispPrice = (pack as any).price;
                    return (
                      <Card key={pack.id} selected={selectedPack===pack.id} onClick={() => setSelectedPack(pack.id)}>
                        <div style={{ textAlign:"center" }}>
                          <div style={{ fontSize:28, marginBottom:6 }}>{pack.icon}</div>
                          <div style={{ fontSize:15, fontWeight:800, color:S.navy, marginBottom:4 }}>{pack.name}</div>
                          {dispPrice > 0 && <div style={{ fontSize:20, fontWeight:800, color:S.blue, marginBottom:4 }}>{inr(dispPrice)}</div>}
                          {(pack as any).discount && <span style={{ fontSize:11, color:S.green, fontWeight:700, background:S.greenL, padding:"2px 8px", borderRadius:10 }}>{(pack as any).discount}</span>}
                          <div style={{ fontSize:11, color:S.gray, marginTop:8 }}>{(pack as any).description}</div>
                        </div>
                      </Card>
                    );
                  })}
                </div>
              )}

              {/* Pack wash type */}
              {planMode === "pack" && selectedPack && selectedPack !== "onetime" && (
                <div style={{ marginBottom:24, padding:"16px", background:S.blueL, borderRadius:12 }}>
                  <div style={{ fontSize:13, fontWeight:700, color:S.navy, marginBottom:10 }}>Select wash type for your pack</div>
                  <div style={{ display:"flex", gap:10 }}>
                    {[["waterWash","Water Wash","💧"],["shampoo","Shampoo","🧴"],["shampooWax","Shampoo + Wax","✨"]].map(([id,name,icon]) => (
                      <button key={id} onClick={() => setSelectedWashType(id as string)}
                        style={{ flex:1, padding:"10px 8px", borderRadius:8, border:`2px solid ${_washRef.current===id?S.blue:S.border}`, background:_washRef.current===id?S.white:S.blueL, color:S.navy, fontWeight:600, fontSize:12, cursor:"pointer", fontFamily:"'Nunito',sans-serif", transition:"all 0.15s" }}>
                        <div>{icon}</div>
                        <div>{name}</div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div style={{ display:"flex", justifyContent:"space-between" }}>
                <Btn label="← Back" onClick={() => goTo(2)} secondary />
                <Btn label="Continue → Add-ons" onClick={() => goTo(4)} disabled={!step3Ok} />
              </div>
            </div>
          )}

          {/* ── STEP 4: Add-ons ──────────────────────────────────────────── */}
          {step === 4 && (
            <div>
              <div style={{ marginBottom:24 }}>
                <div style={{ fontSize:11, color:S.blue, fontWeight:700, letterSpacing:1, textTransform:"uppercase", marginBottom:6 }}>Step 4 of 6</div>
                <h2 style={{ fontSize:26, fontWeight:800, color:S.navy, margin:"0 0 8px" }}>Enhance your wash</h2>
                <p style={{ color:S.gray, fontSize:14, margin:0 }}>Optional add-ons billed per visit alongside your plan.</p>
              </div>

              {/* Combo bundles */}
              {(cfg as any).comboBundles && (
                <div style={{ marginBottom:24 }}>
                  <div style={{ fontSize:13, fontWeight:700, color:S.navy, marginBottom:12 }}>🔥 Popular Combos (Save more)</div>
                  <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
                    {((cfg as any).comboBundles||[]).map((b: any) => {
                      const allSelected = b.addonIds.every((id: string) => addons.includes(id));
                      const bundlePrice = b.prices?.[vehicleCat] ?? b.prices?.hatchback ?? 0;
                      const savings = b.savings?.[vehicleCat] ?? b.savings?.hatchback ?? 0;
                      return (
                        <Card key={b.id} selected={allSelected} highlight onClick={() => {
                          if (allSelected) {
                            setAddons(prev => prev.filter(id => !b.addonIds.includes(id)));
                          } else {
                            setAddons(prev => [...new Set([...prev, ...b.addonIds])]);
                          }
                        }}>
                          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start" }}>
                            <div>
                              <div style={{ fontSize:13, fontWeight:700, color:S.navy }}>{b.name}</div>
                              <div style={{ fontSize:11, color:S.gray, marginTop:2 }}>{b.addonIds.join(" + ")}</div>
                            </div>
                            <div style={{ textAlign:"right" }}>
                              <div style={{ fontSize:16, fontWeight:800, color:S.amber }}>{inr(bundlePrice)}</div>
                              <div style={{ fontSize:11, color:S.green }}>Save {inr(savings)}</div>
                            </div>
                          </div>
                        </Card>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Individual addons */}
              <div style={{ marginBottom:24 }}>
                <div style={{ fontSize:13, fontWeight:700, color:S.navy, marginBottom:12 }}>Individual add-ons</div>
                <div style={{ display:"grid", gap:10 }}>
                  {cfg.addons.map(addon => {
                    const price = addon.prices?.[vehicleCat] ?? addon.price;
                    const selected = addons.includes(addon.id);
                    return (
                      <div key={addon.id}
                        onClick={() => setAddons(prev => prev.includes(addon.id) ? prev.filter(a => a!==addon.id) : [...prev, addon.id])}
                        style={{ display:"flex", alignItems:"center", gap:14, padding:"14px 16px", border:`2px solid ${selected?S.blue:S.border}`, borderRadius:12, cursor:"pointer", background:selected?S.blueL:S.white, transition:"all 0.15s" }}>
                        <div style={{ width:22, height:22, borderRadius:4, border:`2px solid ${selected?S.blue:S.border}`, background:selected?S.blue:"transparent", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, color:S.white, fontSize:14, fontWeight:700 }}>
                          {selected && "✓"}
                        </div>
                        <div style={{ flex:1 }}>
                          <div style={{ fontSize:14, fontWeight:700, color:S.navy }}>{addon.name}</div>
                          <div style={{ fontSize:11, color:S.gray }}>{addon.description}</div>
                          <div style={{ fontSize:11, color:S.gray, marginTop:2 }}>{addon.unit}</div>
                        </div>
                        <div style={{ fontSize:16, fontWeight:800, color:selected?S.blue:S.navy, flexShrink:0 }}>{inr(price)}</div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {addons.length === 0 && (
                <div style={{ padding:"12px 16px", background:S.bg, borderRadius:8, fontSize:13, color:S.gray, marginBottom:24 }}>
                  No add-ons selected — you can always upgrade later.
                </div>
              )}

              <div style={{ display:"flex", justifyContent:"space-between" }}>
                <Btn label="← Back" onClick={() => goTo(3)} secondary />
                <Btn label="Continue → Details" onClick={() => goTo(5)} />
              </div>
            </div>
          )}

          {/* ── STEP 5: Your Details ─────────────────────────────────────── */}
          {step === 5 && (
            <div>
              <div style={{ marginBottom:24 }}>
                <div style={{ fontSize:11, color:S.blue, fontWeight:700, letterSpacing:1, textTransform:"uppercase", marginBottom:6 }}>Step 5 of 6</div>
                <h2 style={{ fontSize:26, fontWeight:800, color:S.navy, margin:"0 0 8px" }}>Your details</h2>
                <p style={{ color:S.gray, fontSize:14, margin:0 }}>We'll use this to confirm your booking and send updates.</p>
              </div>

              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16, marginBottom:16 }}>
                {[
                  { label:"Full name *", value:custName, onChange:setCustName, placeholder:"e.g. Rajesh Patel" },
                  { label:"Mobile number *", value:custMobile, onChange:setCustMobile, placeholder:"10-digit number", type:"tel" },
                  { label:"Email", value:custEmail, onChange:setCustEmail, placeholder:"Optional — for digital invoice", type:"email" },
                  { label:"Vehicle registration", value:custReg, onChange:setCustReg, placeholder:"e.g. GJ05AB1234" },
                ].map(({label,value,onChange,placeholder,type}) => (
                  <div key={label}>
                    <label style={{ display:"block", fontSize:12, fontWeight:700, color:S.navy, marginBottom:6 }}>{label}</label>
                    <input value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} type={type||"text"}
                      style={{ width:"100%", padding:"12px 14px", border:`1.5px solid ${S.border}`, borderRadius:9, fontSize:14, fontFamily:"'Nunito',sans-serif", color:S.navy, background:S.white }} />
                  </div>
                ))}
              </div>

              <div style={{ marginBottom:16 }}>
                <label style={{ display:"block", fontSize:12, fontWeight:700, color:S.navy, marginBottom:6 }}>Home / Office address *</label>
                <textarea value={custAddress} onChange={e => setCustAddress(e.target.value)} placeholder="Building, street, landmark…" rows={2}
                  style={{ width:"100%", padding:"12px 14px", border:`1.5px solid ${S.border}`, borderRadius:9, fontSize:14, fontFamily:"'Nunito',sans-serif", color:S.navy, resize:"vertical" }} />
              </div>

              <div style={{ marginBottom:16 }}>
                <label style={{ display:"block", fontSize:12, fontWeight:700, color:S.navy, marginBottom:6 }}>Parking type</label>
                <div style={{ display:"flex", gap:10 }}>
                  {[["dedicated","Dedicated spot"],["random","Shared/visitor parking"]].map(([val,lbl]) => (
                    <button key={val} onClick={() => setParking(val as any)}
                      style={{ flex:1, padding:"10px", borderRadius:8, border:`2px solid ${parking===val?S.blue:S.border}`, background:parking===val?S.blueL:S.white, color:S.navy, fontWeight:600, fontSize:13, cursor:"pointer", fontFamily:"'Nunito',sans-serif" }}>
                      {lbl}
                    </button>
                  ))}
                </div>
              </div>

              {/* Time preference */}
              {!isOneTime ? (
                <div style={{ marginBottom:16 }}>
                  <label style={{ display:"block", fontSize:12, fontWeight:700, color:S.navy, marginBottom:6 }}>Preferred wash time *</label>
                  <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8 }}>
                    {cfg.timeSlots.map(slot => (
                      <button key={slot} onClick={() => setPrefTime(slot)}
                        style={{ padding:"10px 12px", borderRadius:8, border:`2px solid ${prefTime===slot?S.blue:S.border}`, background:prefTime===slot?S.blueL:S.white, color:S.navy, fontWeight:600, fontSize:12, cursor:"pointer", fontFamily:"'Nunito',sans-serif", textAlign:"left" }}>
                        {prefTime===slot?"✓ ":""}{slot}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16, marginBottom:16 }}>
                  <div>
                    <label style={{ display:"block", fontSize:12, fontWeight:700, color:S.navy, marginBottom:6 }}>Date *</label>
                    <input type="date" min={minOneTimeDate} value={oneTimeDate} onChange={e => handleOneTimeDateChange(e.target.value)}
                      style={{ width:"100%", padding:"12px 14px", border:`1.5px solid ${S.border}`, borderRadius:9, fontSize:14, fontFamily:"'Nunito',sans-serif", color:S.navy }} />
                  </div>
                  <div>
                    <label style={{ display:"block", fontSize:12, fontWeight:700, color:S.navy, marginBottom:6 }}>Time slot *</label>
                    <select value={oneTimeHour} onChange={e => setOneTimeHour(e.target.value)}
                      style={{ width:"100%", padding:"12px 14px", border:`1.5px solid ${S.border}`, borderRadius:9, fontSize:14, fontFamily:"'Nunito',sans-serif", color:S.navy }}>
                      <option value="">Select time</option>
                      {getOneTimeSlots(oneTimeDate).map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                </div>
              )}

              <div style={{ marginBottom:24 }}>
                <label style={{ display:"block", fontSize:12, fontWeight:700, color:S.navy, marginBottom:6 }}>How should we reach you?</label>
                <div style={{ display:"flex", gap:10 }}>
                  {[["whatsapp","📲 WhatsApp"],["email","📧 Email"],["both","Both"]].map(([val,lbl]) => (
                    <button key={val} onClick={() => setNotifyPref(val as any)}
                      style={{ flex:1, padding:"10px", borderRadius:8, border:`2px solid ${notifyPref===val?S.blue:S.border}`, background:notifyPref===val?S.blueL:S.white, color:S.navy, fontWeight:600, fontSize:12, cursor:"pointer", fontFamily:"'Nunito',sans-serif" }}>
                      {lbl}
                    </button>
                  ))}
                </div>
              </div>

              <div style={{ display:"flex", justifyContent:"space-between" }}>
                <Btn label="← Back" onClick={() => goTo(4)} secondary />
                <Btn label="Continue → Review" onClick={() => goTo(6)} disabled={!step5Ok} />
              </div>
            </div>
          )}

          {/* ── STEP 6: Review & T&C ─────────────────────────────────────── */}
          {step === 6 && (
            <div>
              <div style={{ marginBottom:24 }}>
                <div style={{ fontSize:11, color:S.blue, fontWeight:700, letterSpacing:1, textTransform:"uppercase", marginBottom:6 }}>Step 6 of 6</div>
                <h2 style={{ fontSize:26, fontWeight:800, color:S.navy, margin:"0 0 8px" }}>Review your order</h2>
                <p style={{ color:S.gray, fontSize:14, margin:0 }}>Confirm the details below before paying.</p>
              </div>

              {/* Summary card */}
              <div style={{ background:S.white, border:`1.5px solid ${S.border}`, borderRadius:14, overflow:"hidden", marginBottom:20 }}>
                {[
                  ["Vehicle", `${cfg.vehicleCategories.find(c=>c.id===activeCat)?.icon} ${catLabel}`],
                  ["Area", `${cfg.serviceablePincodes.find(p=>p.code===pincode)?.label} — ${pincode}`],
                  ["Plan", selectedPlan ? `${cfg.monthlyPlans.find(p=>p.id===selectedPlan)?.name} / month — ${inr(planPrice)}` : `${cfg.packs.find(p=>p.id===selectedPack)?.name} — ${inr(packPrice)}`],
                  ...(addons.length > 0 ? [["Add-ons", addons.map(id => cfg.addons.find(a=>a.id===id)?.name).join(", ")]] : []),
                  ["Name", custName],
                  ["Mobile", custMobile],
                  ["Address", `${custAddress}, ${pincode}`],
                  ["Service time", isOneTime ? `${oneTimeDate} ${oneTimeHour}` : prefTime],
                ].map(([label, value]) => (
                  <div key={label} style={{ display:"flex", gap:16, padding:"10px 16px", borderBottom:`1px solid ${S.border}` }}>
                    <span style={{ fontSize:12, color:S.gray, width:90, flexShrink:0 }}>{label}</span>
                    <span style={{ fontSize:13, color:S.navy, fontWeight:600 }}>{value}</span>
                  </div>
                ))}
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"14px 16px", background:S.navy }}>
                  <span style={{ fontSize:14, color:S.white, fontWeight:700 }}>Total payable</span>
                  <div style={{ textAlign:"right" }}>
                    <div style={{ fontSize:22, color:S.white, fontWeight:800 }}>{inr(Math.round(finalTotal * 1.18))}</div>
                    <div style={{ fontSize:11, color:"rgba(255,255,255,0.6)" }}>incl. 18% GST · {inr(finalTotal)} + {inr(Math.round(finalTotal*0.18))} tax</div>
                  </div>
                </div>
              </div>

              {/* T&C checkboxes */}
              <div style={{ marginBottom:24 }}>
                <div style={{ fontSize:14, fontWeight:700, color:S.navy, marginBottom:12 }}>Please confirm</div>
                {[
                  [consentTerms, setConsentTerms, "I have read and accept the ", "Terms & Conditions", "terms" as const],
                  [consentRefund, setConsentRefund, "I have read and accept the ", "Refund Policy", "refund" as const],
                  [consentCancel, setConsentCancel, "I have read and accept the ", "Cancellation Policy", "cancel" as const],
                ].map(([val, setter, pre, linkText, key]: any) => (
                  <div key={key} style={{ display:"flex", alignItems:"flex-start", gap:10, marginBottom:12, padding:"12px 14px", background:val?S.greenL:S.bg, borderRadius:8, border:`1px solid ${val?S.green:S.border}` }}>
                    <input type="checkbox" checked={val} onChange={e => setter(e.target.checked)} style={{ marginTop:2, flexShrink:0 }} />
                    <span style={{ fontSize:13, color:S.navy }}>
                      {pre}
                      <button onClick={() => setShowTnC(key)} style={{ color:S.blue, fontWeight:700, background:"none", border:"none", cursor:"pointer", fontSize:13, fontFamily:"'Nunito',sans-serif", padding:0, textDecoration:"underline" }}>
                        {linkText}
                      </button>
                    </span>
                  </div>
                ))}
              </div>

              {/* T&C Modal */}
              {showTnC && (
                <div style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.5)", zIndex:9999, display:"flex", alignItems:"center", justifyContent:"center", padding:20 }}
                  onClick={() => setShowTnC(null)}>
                  <div style={{ background:S.white, borderRadius:16, padding:28, maxWidth:520, width:"100%", maxHeight:"80vh", overflow:"auto" }}
                    onClick={e => e.stopPropagation()}>
                    <h3 style={{ marginTop:0, color:S.navy }}>{showTnC==="terms"?"Terms & Conditions":showTnC==="refund"?"Refund Policy":"Cancellation Policy"}</h3>
                    <p style={{ color:S.gray, fontSize:13, lineHeight:1.6 }}>
                      {showTnC==="terms" && "By subscribing to 249 Carwashing services, you agree to our service standards, data usage, and payment terms. Service subject to availability in your area."}
                      {showTnC==="refund" && "Refunds are processed within 7 working days for cancelled subscriptions. Pro-rated refunds apply based on services rendered."}
                      {showTnC==="cancel" && "You may cancel your subscription with 7 days' notice. No cancellation fee for month-to-month plans. Lock-in plans may have different terms."}
                    </p>
                    <button onClick={() => setShowTnC(null)}
                      style={{ padding:"10px 24px", background:S.navy, color:S.white, border:"none", borderRadius:50, fontWeight:700, cursor:"pointer", fontFamily:"'Nunito',sans-serif" }}>
                      Close
                    </button>
                  </div>
                </div>
              )}

              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                <Btn label="← Back" onClick={() => goTo(5)} secondary />
                <button onClick={handleSubmit} disabled={!step6Ok || isProcessing}
                  style={{ padding:"14px 40px", background:(!step6Ok||isProcessing)?S.gray:"linear-gradient(135deg, #1B6FD8, #0B4DA4)", color:S.white, border:"none", borderRadius:50, fontWeight:800, fontSize:16, cursor:(!step6Ok||isProcessing)?"not-allowed":"pointer", fontFamily:"'Nunito',sans-serif", boxShadow:(!step6Ok||isProcessing)?"none":"0 6px 20px rgba(27,111,216,0.4)", transition:"all 0.2s", display:"flex", alignItems:"center", gap:10 }}>
                  {isProcessing ? (
                    <><div style={{ width:16, height:16, border:"2px solid rgba(255,255,255,0.4)", borderTopColor:S.white, borderRadius:"50%", animation:"spin 0.8s linear infinite" }} /> Processing…</>
                  ) : (
                    <>🔒 Pay {inr(Math.round(finalTotal * 1.18))} Securely</>
                  )}
                </button>
              </div>

              <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
            </div>
          )}
        </div>

        {/* ── RIGHT PANEL: Live Cost ───────────────────────────────────────────── */}
        <div>
          <CostPanel
            step={step} activeCat={activeCat} vehicleCategories={cfg.vehicleCategories}
            selectedPlan={selectedPlan} planMode={planMode} selectedPack={selectedPack}
            planPrice={planPrice} packPrice={packPrice} addons={addons} addonTotal={addonTotal}
            total={total} commitment={commitment} commitments={cfg.commitments}
            cfg={cfg} vehicleCat={vehicleCat} basePrice={basePrice}
          />
        </div>
      </div>

      {/* Mobile: cost summary bar at bottom (shows when content selected) */}
      <style>{`
        @media (max-width: 768px) {
          .grid-cols-buy { grid-template-columns: 1fr !important; }
          .cost-panel-sticky { display: none !important; }
        }
      `}</style>
    </div>
  );
}
