"use client";

import { useMemo } from "react";

type Props = {
  q: string;
  category: string;
  ageRange: string;
  setQ: (v: string) => void;
  setCategory: (v: string) => void;
  setAgeRange: (v: string) => void;
};

export default function FiltersBar(props: Props) {
  const categories = useMemo(() => ["all", "kids", "adults"], []);
  const ages = useMemo(() => ["all", "newborn", "0-24m", "2-8", "9-14", "adult"], []);

  return (
    <div className="grid gap-4 md:grid-cols-3 p-6 rounded-2xl border-2 border-azriella-pink/20 bg-white shadow-sm">
      <input
        value={props.q}
        onChange={(e) => props.setQ(e.target.value)}
        placeholder="Search products..."
        className="w-full rounded-xl border-2 border-azriella-navy/20 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-azriella-pink focus:border-azriella-pink transition-all"
      />

      <select
        value={props.category}
        onChange={(e) => props.setCategory(e.target.value)}
        className="w-full rounded-xl border-2 border-azriella-navy/20 px-4 py-3 text-sm font-semibold text-azriella-navy focus:ring-2 focus:ring-azriella-pink focus:border-azriella-pink outline-none transition-all"
      >
        {categories.map(c => <option key={c} value={c}>{c.toUpperCase()}</option>)}
      </select>

      <select
        value={props.ageRange}
        onChange={(e) => props.setAgeRange(e.target.value)}
        className="w-full rounded-xl border-2 border-azriella-navy/20 px-4 py-3 text-sm font-semibold text-azriella-navy focus:ring-2 focus:ring-azriella-pink focus:border-azriella-pink outline-none transition-all"
      >
        {ages.map(a => <option key={a} value={a}>{a.toUpperCase()}</option>)}
      </select>
    </div>
  );
}
