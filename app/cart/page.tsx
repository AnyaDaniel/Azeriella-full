"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { formatMoney } from "@/lib/money";
import { loadCart, removeItem, saveCart, subtotalCents, updateQty } from "@/lib/cart";
import type { CartItem } from "@/lib/types";

export default function CartPage() {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => setItems(loadCart()), []);

  const subtotal = useMemo(() => subtotalCents(items), [items]);

  const setQty = (it: CartItem, qty: number) => {
    const next = updateQty(items, it.productId, it.size, qty);
    setItems(next);
    saveCart(next);
    window.dispatchEvent(new Event("storage"));
  };

  const remove = (it: CartItem) => {
    const next = removeItem(items, it.productId, it.size);
    setItems(next);
    saveCart(next);
    window.dispatchEvent(new Event("storage"));
  };

  return (
    <div className="py-10 space-y-6">
      <h1 className="text-3xl font-black">Cart</h1>

      {items.length === 0 ? (
        <div className="rounded-2xl border bg-white p-6">
          <div className="font-bold">Your cart is empty.</div>
          <Link href="/shop" className="inline-block mt-3 rounded-xl bg-black text-white px-5 py-3 font-bold">
            Start shopping
          </Link>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-[1fr_360px]">
          <div className="space-y-3">
            {items.map((it) => (
              <div key={`${it.productId}_${it.size}`} className="rounded-2xl border bg-white p-4 flex gap-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={it.image} alt={it.title} className="h-24 w-20 object-cover rounded-xl bg-neutral-100" />
                <div className="flex-1">
                  <div className="font-black">{it.title}</div>
                  <div className="text-sm text-neutral-600">Size: {it.size}</div>
                  <div className="text-sm font-black mt-1">{formatMoney(it.priceCents, it.currency)}</div>

                  <div className="mt-3 flex items-center gap-3">
                    <input
                      type="number"
                      min={1}
                      value={it.qty}
                      onChange={(e) => setQty(it, Math.max(1, Number(e.target.value) || 1))}
                      className="w-20 rounded-xl border px-3 py-2 text-sm"
                    />
                    <button onClick={() => remove(it)} className="text-sm font-bold underline" type="button">
                      Remove
                    </button>
                  </div>
                </div>

                <div className="font-black">
                  {formatMoney(it.priceCents * it.qty, it.currency)}
                </div>
              </div>
            ))}
          </div>

          <div className="rounded-2xl border bg-white p-6 h-fit space-y-3">
            <div className="text-lg font-black">Summary</div>
            <div className="flex justify-between text-sm">
              <span className="text-neutral-600 font-semibold">Subtotal</span>
              <span className="font-black">{formatMoney(subtotal, "CAD")}</span>
            </div>
            <div className="text-xs text-neutral-500">
              Shipping is calculated at checkout.
            </div>
            <Link href="/checkout" className="block text-center rounded-xl bg-black text-white px-5 py-3 font-black">
              Go to checkout
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
