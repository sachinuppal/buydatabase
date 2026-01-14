"use client";

import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    MapPin,
    Users,
    Layers,
    Activity,
    Database,
    Sparkles,
    Target,
    ArrowRight,
    Filter
} from "lucide-react";

type PillKey = "geo" | "role" | "industry" | "intent";

const PILL_META: Record<
    PillKey,
    { label: string; Icon: React.ComponentType<any>; accentClass: string; example: string }
> = {
    geo: { label: "Location & Geography", Icon: MapPin, accentClass: "bg-blue-50 text-blue-700 border-blue-200", example: "Bangalore • Mumbai • NCR" },
    role: { label: "Role & Seniority", Icon: Users, accentClass: "bg-indigo-50 text-indigo-700 border-indigo-200", example: "Founders • HR Managers • CTOs" },
    industry: { label: "Industry & Verticals", Icon: Layers, accentClass: "bg-emerald-50 text-emerald-700 border-emerald-200", example: "SaaS • Fintech • Healthcare" },
    intent: { label: "Company Stage & Intent", Icon: Activity, accentClass: "bg-amber-50 text-amber-800 border-amber-200", example: "Seed Stage • Hiring • Expanding" },
};

function makeRawLines(seed = 0) {
    const roles = ["Manager", "Director", "Head", "VP", "Founder", "Analyst"];
    const depts = ["HR", "Sales", "Marketing", "Finance", "Ops", "IT"];
    const cities = ["Mumbai", "Bangalore", "Delhi", "Hyderabad", "Pune", "Chennai"];
    const inds = ["SaaS", "Fintech", "Edtech", "Logistics", "Healthcare", "Retail"];

    // deterministic-ish shuffle without deps
    const arr: string[] = [];
    for (let i = 0; i < 8; i++) {
        const r = roles[(i + seed) % roles.length];
        const d = depts[(i * 2 + seed) % depts.length];
        const c = cities[(i * 3 + seed) % cities.length];
        const ind = inds[(i * 5 + seed) % inds.length];
        arr.push(`${r} • ${d} • ${ind} • ${c}`);
    }
    return arr;
}

export default function AudienceAltGraphic() {
    const [active, setActive] = useState<PillKey>("geo");
    const [mode, setMode] = useState<"raw" | "segmented">("segmented");
    const [isAutoPlay, setIsAutoPlay] = useState(true);

    // Reduced lines for cleaner UI
    const rawLines = useMemo(() => makeRawLines(3), []);
    const activeMeta = PILL_META[active];

    // Auto-loop effect
    React.useEffect(() => {
        if (!isAutoPlay || mode === 'raw') return;

        const interval = setInterval(() => {
            setActive(prev => {
                const keys = Object.keys(PILL_META) as PillKey[];
                const currentIndex = keys.indexOf(prev);
                const nextIndex = (currentIndex + 1) % keys.length;
                return keys[nextIndex];
            });
        }, 3000); // Change every 3 seconds

        return () => clearInterval(interval);
    }, [isAutoPlay, mode]);

    const onPill = (k: PillKey) => {
        setIsAutoPlay(false); // Stop loop on user interaction
        setActive(k);
        setMode("segmented");
    };

    const handleModeChange = (newMode: "raw" | "segmented") => {
        setIsAutoPlay(false); // Stop loop on user interaction
        setMode(newMode);
    };

    return (
        <div className="w-full">
            <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
                {/* soft animated background */}
                <motion.div
                    className="pointer-events-none absolute inset-0"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                >
                    <motion.div
                        className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-slate-100"
                        animate={{ x: [0, 40, 0], y: [0, 30, 0] }}
                        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                    />
                    <motion.div
                        className="absolute -right-24 top-20 h-80 w-80 rounded-full bg-slate-100"
                        animate={{ x: [0, -30, 0], y: [0, 25, 0] }}
                        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
                    />
                    <motion.div
                        className="absolute bottom-[-120px] left-1/3 h-96 w-96 rounded-full bg-slate-50"
                        animate={{ y: [0, -30, 0] }}
                        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
                    />
                </motion.div>

                <div className="relative grid gap-12 p-6 md:grid-cols-2 md:p-12 items-center">
                    {/* LEFT: copy + pills */}
                    <div className="flex flex-col justify-center">
                        <div className="inline-flex w-fit items-center gap-2 rounded-full border border-slate-200 bg-white/70 px-3 py-1 text-xs font-semibold text-slate-700 backdrop-blur mb-6">
                            <Sparkles className="h-3.5 w-3.5 text-primary" />
                            A modern alternative to buying raw lists
                        </div>

                        <h2 className="text-3xl font-heading font-bold tracking-tight text-slate-900 md:text-4xl mb-4">
                            Discover who your buyers actually are.
                        </h2>

                        <p className="text-muted-foreground leading-relaxed mb-8">
                            BuyDatabase.ai is not a “bulk data seller”. We help you segment audiences by{" "}
                            <strong className="text-foreground">real business relevance</strong>, so you can plan outreach and
                            campaigns that land with the right people.
                        </p>

                        {/* Pills */}
                        <div className="grid gap-3">
                            {(Object.keys(PILL_META) as PillKey[]).map((k) => {
                                const { Icon, label } = PILL_META[k];
                                const isActive = k === active;

                                return (
                                    <button
                                        key={k}
                                        onClick={() => onPill(k)}
                                        className={[
                                            "group flex items-center justify-between rounded-xl border px-4 py-3 text-left transition-all duration-200",
                                            "bg-white/60 backdrop-blur hover:bg-white",
                                            isActive ? "border-primary/50 shadow-md ring-1 ring-primary/10 bg-white" : "border-transparent hover:border-slate-200",
                                        ].join(" ")}
                                        aria-pressed={isActive}
                                    >
                                        <div className="flex items-center gap-3">
                                            <span className={`grid h-8 w-8 place-items-center rounded-lg border transition-colors ${isActive ? 'bg-primary/10 border-primary/20 text-primary' : 'bg-white border-slate-200 text-slate-500'}`}>
                                                <Icon className="h-4 w-4" />
                                            </span>
                                            <div className={`text-sm font-semibold transition-colors ${isActive ? 'text-foreground' : 'text-muted-foreground'}`}>{label}</div>
                                        </div>

                                        <motion.span
                                            className="text-primary"
                                            animate={{ x: isActive ? 0 : -5, opacity: isActive ? 1 : 0 }}
                                        >
                                            <ArrowRight className="h-4 w-4" />
                                        </motion.span>
                                    </button>
                                );
                            })}
                        </div>

                        {/* Toggle */}
                        <div className="mt-8 flex flex-wrap items-center gap-2">
                            <button
                                onClick={() => handleModeChange("raw")}
                                className={[
                                    "rounded-full border px-4 py-1.5 text-xs font-medium transition-all",
                                    mode === "raw"
                                        ? "border-slate-800 bg-slate-800 text-white shadow-md transform scale-105"
                                        : "border-slate-200 bg-white text-slate-600 hover:border-slate-300",
                                ].join(" ")}
                            >
                                Show “Raw List” problem
                            </button>

                            <button
                                onClick={() => handleModeChange("segmented")}
                                className={[
                                    "rounded-full border px-4 py-1.5 text-xs font-medium transition-all",
                                    mode === "segmented"
                                        ? "border-primary bg-primary text-primary-foreground shadow-md transform scale-105"
                                        : "border-slate-200 bg-white text-slate-600 hover:border-slate-300",
                                ].join(" ")}
                            >
                                Show “Segmented” solution
                            </button>
                        </div>
                    </div>

                    {/* RIGHT: animated graphic */}
                    <div className="relative">
                        <div className="relative rounded-3xl border border-slate-200 bg-slate-50/50 p-6 backdrop-blur-sm shadow-inner min-h-[400px] flex flex-col">
                            {/* Header row */}
                            <div className="flex items-center justify-between gap-3 mb-6">
                                <div className="flex items-center gap-3">
                                    <div className="grid h-10 w-10 place-items-center rounded-xl bg-white border shadow-sm text-primary">
                                        <Database className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <div className="text-sm font-bold text-slate-900">Audience Intelligence</div>
                                        <div className="text-xs text-slate-500 font-medium">Turn noise → segments</div>
                                    </div>
                                </div>

                                <AnimatePresence mode="wait">
                                    {mode === 'segmented' && (
                                        <motion.div
                                            key={active}
                                            initial={{ opacity: 0, x: 10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -10 }}
                                            className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-bold ${activeMeta.accentClass.replace('bg-', 'bg-opacity-50 ')}`}
                                        >
                                            <activeMeta.Icon className="h-3.5 w-3.5" />
                                            <span>{activeMeta.label}</span>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            {/* Body */}
                            <div className="relative flex-1">
                                <AnimatePresence mode="wait">
                                    {mode === "raw" ? (
                                        <motion.div
                                            key="raw"
                                            initial={{ opacity: 0, scale: 0.95 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
                                            transition={{ duration: 0.3 }}
                                            className="absolute inset-0"
                                        >
                                            <div className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden h-full flex flex-col">
                                                <div className="bg-slate-50 border-b px-4 py-2 flex items-center gap-2">
                                                    <div className="flex gap-1.5">
                                                        <div className="w-2.5 h-2.5 rounded-full bg-red-400/50"></div>
                                                        <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/50"></div>
                                                        <div className="w-2.5 h-2.5 rounded-full bg-green-400/50"></div>
                                                    </div>
                                                    <div className="w-px h-4 bg-slate-200 mx-2"></div>
                                                    <span className="text-[10px] font-mono text-slate-400">raw_data.csv</span>
                                                </div>
                                                <div className="p-4 font-mono text-[10px] text-slate-400 space-y-3 overflow-hidden">
                                                    {rawLines.map((line, i) => (
                                                        <motion.div
                                                            key={i}
                                                            initial={{ opacity: 0, x: -10 }}
                                                            animate={{ opacity: 1, x: 0 }}
                                                            transition={{ delay: i * 0.05 }}
                                                            className="border-b border-dashed border-slate-100 pb-1 whitespace-nowrap"
                                                        >
                                                            {line}
                                                        </motion.div>
                                                    ))}
                                                    <div className="text-center pt-4 text-slate-400 italic">
                                                        ... thousands more mix-matched rows ...
                                                    </div>
                                                </div>

                                                {/* Overlay showing confusion */}
                                                <div className="absolute inset-0 flex items-center justify-center bg-white/10 backdrop-blur-[1px]">
                                                    <motion.div
                                                        initial={{ scale: 0.8, opacity: 0 }}
                                                        animate={{ scale: 1, opacity: 1 }}
                                                        transition={{ delay: 0.5 }}
                                                        className="bg-slate-900 text-white px-4 py-2 rounded-full text-xs font-medium shadow-xl flex items-center gap-2"
                                                    >
                                                        <Filter className="h-3.5 w-3.5" />
                                                        Hard to target
                                                    </motion.div>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ) : (
                                        <motion.div
                                            key="segmented"
                                            initial={{ opacity: 0, scale: 0.95 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
                                            transition={{ duration: 0.3 }}
                                            className="absolute inset-0 grid grid-rows-[auto_1fr_auto] gap-4"
                                        >
                                            {/* Segment Card 1 */}
                                            <motion.div
                                                initial={{ y: 20, opacity: 0 }}
                                                animate={{ y: 0, opacity: 1 }}
                                                transition={{ delay: 0.1 }}
                                                className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm relative overflow-hidden group"
                                            >
                                                <div className={`absolute left-0 top-0 bottom-0 w-1 ${activeMeta.accentClass.split(' ')[0].replace('bg-', 'bg-')}`} />
                                                <div className="flex justify-between items-start mb-2">
                                                    <div className="flex items-center gap-2">
                                                        <div className={`p-1.5 rounded-lg ${activeMeta.accentClass.split(' ')[0].replace('bg-', 'bg-opacity-20 bg-')}`}>
                                                            <activeMeta.Icon className={`h-4 w-4 ${activeMeta.accentClass.split(' ')[1]}`} />
                                                        </div>
                                                        <span className="font-bold text-sm text-slate-800">{activeMeta.label}</span>
                                                    </div>
                                                    <span className="text-[10px] font-mono bg-slate-100 px-2 py-1 rounded text-slate-500">Verified</span>
                                                </div>
                                                <div className="space-y-2">
                                                    <div className="h-2 w-3/4 bg-slate-100 rounded-full"></div>
                                                    <div className="h-2 w-1/2 bg-slate-100 rounded-full"></div>
                                                </div>
                                                <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground bg-slate-50 p-2 rounded border border-slate-100">
                                                    <Target className="h-3 w-3" />
                                                    <span>Example: <strong>{activeMeta.example}</strong></span>
                                                </div>
                                            </motion.div>

                                            {/* Segment Card 2 (Bottom) */}
                                            <motion.div
                                                initial={{ y: 20, opacity: 0 }}
                                                animate={{ y: 0, opacity: 1 }}
                                                transition={{ delay: 0.2 }}
                                                className="bg-white/60 rounded-xl border border-dashed border-slate-300 p-4 flex items-center justify-center text-center"
                                            >
                                                <div>
                                                    <div className="mx-auto w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 mb-2">
                                                        <Sparkles className="h-4 w-4" />
                                                    </div>
                                                    <p className="text-xs text-slate-500 font-medium">Ready for Activation</p>
                                                    <p className="text-[10px] text-slate-400">Export to CSV or CRM</p>
                                                </div>
                                            </motion.div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
