"use client";

import { useState, useCallback } from "react";

// ─── Shared types ──────────────────────────────────────────────────────────────
export type CaptureVariant = "inline" | "banner" | "compact";

interface SubscribePayload {
  email: string;
  firstName?: string;
  preferences: string[];
}

type Status = "idle" | "loading" | "success" | "error";

const PREFERENCE_OPTIONS = [
  { id: "all",     label: "All new bonuses",       icon: "🔔" },
  { id: "us_only", label: "US exchanges only",      icon: "🇺🇸" },
  { id: "no_kyc",  label: "No-KYC exchanges",       icon: "🔒" },
  { id: "futures", label: "Futures & derivatives",  icon: "🚀" },
  { id: "staking", label: "Staking & yield",        icon: "🌾" },
];

// ─── Hook ─────────────────────────────────────────────────────────────────────
function useSubscribe() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  const subscribe = useCallback(async (payload: SubscribePayload) => {
    setStatus("loading");
    setError(null);
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!data.ok) throw new Error(data.error ?? "Subscription failed.");
      setStatus("success");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setStatus("error");
    }
  }, []);

  return { subscribe, status, error };
}

// ─── Success state ─────────────────────────────────────────────────────────────
function SuccessState({ compact = false }: { compact?: boolean }) {
  return (
    <div
      className={`flex items-center gap-3 ${
        compact ? "py-2" : "py-4"
      } animate-in fade-in duration-300`}
    >
      <div className="w-9 h-9 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
        <svg width="16" height="13" viewBox="0 0 16 13" fill="none">
          <path
            d="M1.5 7L5.5 11L14.5 1.5"
            stroke="#16a34a"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <div>
        <p className="text-sm font-semibold text-slate-900">You're in! 🎁</p>
        <p className="text-xs text-slate-400">Check your inbox for a welcome email.</p>
      </div>
    </div>
  );
}

// ─── Inline variant — full featured, shown mid-page ──────────────────────────
export function BonusAlertInline() {
  const { subscribe, status, error } = useSubscribe();
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [preferences, setPreferences] = useState<string[]>(["all"]);
  const [showPrefs, setShowPrefs] = useState(false);

  const togglePref = (id: string) => {
    if (id === "all") {
      setPreferences(["all"]);
      return;
    }
    setPreferences((prev) => {
      const without = prev.filter((p) => p !== "all");
      return without.includes(id)
        ? without.filter((p) => p !== id) || ["all"]
        : [...without, id];
    });
  };

  const handleSubmit = () => {
    if (!email) return;
    subscribe({ email, firstName: firstName || undefined, preferences });
  };

  if (status === "success") {
    return (
      <div className="card p-6">
        <SuccessState />
      </div>
    );
  }

  return (
    <div className="card p-6">
      {/* Header */}
      <div className="flex items-start gap-4 mb-5">
        <div className="w-10 h-10 rounded-xl bg-brand-50 border border-brand-100 flex items-center justify-center flex-shrink-0 text-lg">
          🔔
        </div>
        <div>
          <h3 className="font-bold text-slate-900 text-base mb-0.5">
            Get bonus alerts before they expire
          </h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            We email you the moment a new exchange bonus drops — verified,
            no spam, unsubscribe anytime.
          </p>
        </div>
      </div>

      {/* Social proof */}
      <div className="flex items-center gap-2 mb-5">
        <div className="flex -space-x-1.5">
          {["#F0B90B", "#0052FF", "#5741D9"].map((c) => (
            <div
              key={c}
              className="w-6 h-6 rounded-full border-2 border-white"
              style={{ background: c }}
            />
          ))}
        </div>
        <p className="text-xs text-slate-400">
          <span className="font-semibold text-slate-600">2,400+</span> traders already subscribed
        </p>
      </div>

      {/* Form */}
      <div className="grid gap-3 mb-4">
        <input
          type="text"
          placeholder="First name (optional)"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-400 focus:border-transparent"
        />
        <div className="flex gap-2">
          <input
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
            className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-400 focus:border-transparent"
            required
          />
          <button
            onClick={handleSubmit}
            disabled={!email || status === "loading"}
            className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all flex-shrink-0 ${
              email && status !== "loading"
                ? "bg-brand-500 text-white hover:bg-brand-600"
                : "bg-slate-100 text-slate-400 cursor-not-allowed"
            }`}
          >
            {status === "loading" ? "..." : "Alert me"}
          </button>
        </div>
      </div>

      {/* Preference picker toggle */}
      <button
        onClick={() => setShowPrefs((v) => !v)}
        className="text-xs text-brand-500 font-medium mb-3 flex items-center gap-1 hover:text-brand-600 transition-colors"
      >
        <span>{showPrefs ? "▾" : "▸"}</span>
        Customize what I get alerts for
      </button>

      {showPrefs && (
        <div className="grid grid-cols-2 gap-2 mb-4 animate-in fade-in duration-200">
          {PREFERENCE_OPTIONS.map((opt) => {
            const selected = preferences.includes(opt.id);
            return (
              <button
                key={opt.id}
                onClick={() => togglePref(opt.id)}
                className={`text-left flex items-center gap-2 px-3 py-2.5 rounded-xl text-xs font-medium border transition-all ${
                  selected
                    ? "border-brand-400 bg-brand-50 text-brand-700"
                    : "border-slate-200 text-slate-600 hover:border-slate-300"
                }`}
              >
                <span>{opt.icon}</span>
                <span>{opt.label}</span>
              </button>
            );
          })}
        </div>
      )}

      {error && (
        <p className="text-xs text-red-500 mb-3">{error}</p>
      )}

      <p className="text-xs text-slate-400">
        No spam. Unsubscribe in one click. We disclose affiliate links in every email.
      </p>
    </div>
  );
}

// ─── Compact variant — for sidebars and bonus page ────────────────────────────
export function BonusAlertCompact() {
  const { subscribe, status, error } = useSubscribe();
  const [email, setEmail] = useState("");

  const handleSubmit = () => {
    if (!email) return;
    subscribe({ email, preferences: ["all"] });
  };

  if (status === "success") return <SuccessState compact />;

  return (
    <div className="bg-brand-50 border border-brand-100 rounded-2xl p-5">
      <p className="text-sm font-bold text-slate-900 mb-1">
        🔔 Bonus alerts
      </p>
      <p className="text-xs text-slate-500 mb-3 leading-relaxed">
        Get notified the moment a new exchange bonus drops.
      </p>
      <div className="flex gap-2">
        <input
          type="email"
          placeholder="your@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
          className="flex-1 min-w-0 px-3 py-2 rounded-xl border border-brand-200 bg-white text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-400 focus:border-transparent"
        />
        <button
          onClick={handleSubmit}
          disabled={!email || status === "loading"}
          className="flex-shrink-0 px-4 py-2 rounded-xl bg-brand-500 text-white text-xs font-semibold hover:bg-brand-600 disabled:opacity-50 transition-colors"
        >
          {status === "loading" ? "…" : "Alert me"}
        </button>
      </div>
      {error && <p className="text-xs text-red-500 mt-2">{error}</p>}
    </div>
  );
}

// ─── Sticky banner — floats at bottom of screen ───────────────────────────────
export function BonusAlertBanner() {
  const { subscribe, status } = useSubscribe();
  const [email, setEmail] = useState("");
  const [dismissed, setDismissed] = useState(false);

  if (dismissed || status === "success") return null;

  const handleSubmit = () => {
    if (!email) return;
    subscribe({ email, preferences: ["all"] });
  };

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 animate-in slide-in-from-bottom-4 duration-400"
      style={{ boxShadow: "0 -4px 32px rgba(0,0,0,0.08)" }}
    >
      <div className="bg-slate-900 border-t border-slate-700 px-4 py-3">
        <div className="max-w-4xl mx-auto flex items-center gap-4 flex-wrap">
          <div className="flex items-center gap-2 flex-shrink-0">
            <span className="text-lg">🎁</span>
            <div>
              <p className="text-white text-sm font-semibold leading-tight">
                Get bonus alerts
              </p>
              <p className="text-slate-400 text-xs">
                New exchange offers, verified & instant
              </p>
            </div>
          </div>

          <div className="flex gap-2 flex-1 min-w-48">
            <input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
              className="flex-1 min-w-0 px-3 py-2 rounded-lg bg-slate-800 border border-slate-600 text-white text-sm placeholder:text-slate-500 focus:outline-none focus:border-brand-400"
            />
            <button
              onClick={handleSubmit}
              disabled={!email}
              className="flex-shrink-0 px-4 py-2 rounded-lg bg-brand-500 text-white text-sm font-semibold hover:bg-brand-600 disabled:opacity-50 transition-colors"
            >
              Alert me
            </button>
          </div>

          <button
            onClick={() => setDismissed(true)}
            className="flex-shrink-0 text-slate-500 hover:text-slate-300 transition-colors text-xl leading-none"
            aria-label="Dismiss"
          >
            ×
          </button>
        </div>
      </div>
    </div>
  );
}
