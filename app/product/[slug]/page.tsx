"use client";

import { useMemo, useState } from "react";
import { getAllProducts } from "@/lib/products";
import { formatMoney } from "@/lib/money";
import Quantity from "@/components/Quantity";
import { addToCart, loadCart, saveCart } from "@/lib/cart";

export default function ProductPage({ params }: { params: { slug: string } }) {
  const product = useMemo(
    () => getAllProducts().find(p => p.slug === params.slug),
    [params.slug]
  );

  const [size, setSize] = useState(product?.sizes?.[0] ?? "");
  const [qty, setQty] = useState(1);
  const [msg, setMsg] = useState("");

  if (!product) return <div className="py-10">Product not found.</div>;

  const onAdd = () => {
    const items = loadCart();
    const next = addToCart(items, product, size, qty);
    saveCart(next);
    // Trigger Header badge update in same tab
    window.dispatchEvent(new Event("storage"));
    setMsg("Added to cart ✅");
    setTimeout(() => setMsg(""), 1200);
  };

  return (
    <div className="py-10 grid gap-8 md:grid-cols-2">
      <div className="rounded-3xl border bg-white overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={product.image} alt={product.title} className="w-full h-full object-cover aspect-[4/5]" />
      </div>

      <div className="space-y-4">
        <div className="text-xs font-bold text-neutral-500">{product.collection} • {product.category.toUpperCase()}</div>
        <h1 className="text-3xl font-black">{product.title}</h1>
        <div className="text-2xl font-black">{formatMoney(product.priceCents, product.currency)}</div>
        <p className="text-neutral-600">{product.description}</p>

        <div className="space-y-2">
          <div className="text-sm font-bold">Size</div>
          <div className="flex flex-wrap gap-2">
            {product.sizes.map(s => (
              <button
                key={s}
                onClick={() => setSize(s)}
                className={`rounded-full px-3 py-1 text-sm font-semibold border ${size === s ? "bg-black text-white" : "bg-white"}`}
                type="button"
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Quantity value={qty} onChange={setQty} />
          <button onClick={onAdd} className="rounded-xl bg-black text-white px-5 py-3 font-black" type="button">
            Add to cart
          </button>
        </div>

        {msg && <div className="text-sm font-bold">{msg}</div>}
      </div>
    </div>
  );
}
