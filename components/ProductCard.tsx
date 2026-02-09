import Link from "next/link";
import type { Product } from "@/lib/types";
import { formatMoney } from "@/lib/money";

export default function ProductCard({ p }: { p: Product }) {
  return (
    <Link href={`/product/${p.slug}`} className="group rounded-2xl border-2 border-azriella-pink/20 bg-white overflow-hidden hover:shadow-xl hover:border-azriella-pink transition-all transform hover:-translate-y-1">
      <div className="aspect-[4/5] bg-gradient-to-br from-azriella-pink/10 to-azriella-navy/10 relative overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={p.image} alt={p.title} className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300" />
      </div>
      <div className="p-4">
        <div className="text-xs text-azriella-pink font-bold uppercase tracking-wide">{p.collection} • {p.category}</div>
        <div className="mt-2 font-black leading-tight text-azriella-navy group-hover:text-azriella-pink transition-colors">{p.title}</div>
        <div className="mt-2 font-black text-lg bg-gradient-to-r from-azriella-pink to-azriella-navy bg-clip-text text-transparent">{formatMoney(p.priceCents, p.currency)}</div>
        <div className="mt-2 text-xs text-neutral-600">Sizes: {p.sizes.slice(0, 4).join(", ")}{p.sizes.length > 4 ? "…" : ""}</div>
      </div>
    </Link>
  );
}
