"use client";

import { useEffect, useMemo, useState, use } from "react";
import ProductCard from "@/components/ProductCard";
import FiltersBar from "@/components/FiltersBar";
import type { Product } from "@/lib/types";

export default function ShopPage({ searchParams }: { searchParams: Promise<{ category?: string; ageRange?: string }> }) {
  const params = use(searchParams);
  const initialCategory = params?.category ?? "all";
  const initialAgeRange = params?.ageRange ?? "all";

  const [all, setAll] = useState<Product[]>([]);
  const [q, setQ] = useState("");
  const [category, setCategory] = useState(initialCategory);
  const [ageRange, setAgeRange] = useState(initialAgeRange);

  useEffect(() => {
    fetch("/api/products").then(r => r.json()).then(setAll);
  }, []);

  const filtered = useMemo(() => {
    return all.filter(p => {
      const matchQ =
        q.trim().length === 0 ||
        (p.title + " " + p.description + " " + p.collection + " " + p.tags.join(" "))
          .toLowerCase()
          .includes(q.toLowerCase());

      const matchCategory = category === "all" || p.category === category;
      const matchAge = ageRange === "all" || p.ageRange === ageRange;

      return matchQ && matchCategory && matchAge;
    });
  }, [all, q, category, ageRange]);

  return (
    <div className="py-10 space-y-8">
      <div className="text-center space-y-3">
        <h1 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-azriella-pink to-azriella-navy bg-clip-text text-transparent">
          Shop Collection
        </h1>
        <p className="text-neutral-600 max-w-2xl mx-auto">
          Discover vibrant African-inspired fashion for kids and families. Bold prints, premium quality, and styles that celebrate culture.
        </p>
      </div>

      <FiltersBar q={q} category={category} ageRange={ageRange} setQ={setQ} setCategory={setCategory} setAgeRange={setAgeRange} />

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map(p => <ProductCard key={p.id} p={p} />)}
      </div>
      
      {filtered.length === 0 && (
        <div className="text-center py-20">
          <div className="text-6xl mb-4">🔍</div>
          <p className="text-neutral-600 font-semibold">No products found. Try adjusting your filters.</p>
        </div>
      )}
    </div>
  );
}
