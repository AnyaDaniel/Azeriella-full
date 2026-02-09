"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { loadCart, saveCart, subtotalCents } from "@/lib/cart";
import { formatMoney } from "@/lib/money";
import type { CartItem } from "@/lib/types";

export default function CheckoutPage() {
  const router = useRouter();
  const [items, setItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [province, setProvince] = useState("ON");
  const [postalCode, setPostalCode] = useState("");

  useEffect(() => setItems(loadCart()), []);
  const subtotal = useMemo(() => subtotalCents(items), [items]);
  const shipping = subtotal > 12000 ? 0 : 1200; // demo rule
  const total = subtotal + shipping;

  const submit = async () => {
    if (!items.length) return;
    setLoading(true);

    const res = await fetch("/api/order", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        name,
        email,
        address,
        city,
        province,
        postalCode,
        items,
        subtotalCents: subtotal,
        shippingCents: shipping,
        totalCents: total
      })
    });

    const json = await res.json();
    setLoading(false);

    if (json?.ok) {
      saveCart([]);
      window.dispatchEvent(new Event("storage"));
      router.push(`/order-success?orderId=${encodeURIComponent(json.orderId)}`);
    }
  };

  return (
    <div className="py-10 grid gap-6 md:grid-cols-[1fr_360px]">
      <div className="space-y-4">
        <h1 className="text-3xl font-black">Checkout</h1>

        <div className="rounded-2xl border bg-white p-6 grid gap-3">
          <div className="font-black">Customer</div>
          <input className="rounded-xl border px-4 py-3 text-sm" placeholder="Full name" value={name} onChange={(e)=>setName(e.target.value)} />
          <input className="rounded-xl border px-4 py-3 text-sm" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} />
        </div>

        <div className="rounded-2xl border bg-white p-6 grid gap-3">
          <div className="font-black">Shipping Address (Canada)</div>
          <input className="rounded-xl border px-4 py-3 text-sm" placeholder="Address" value={address} onChange={(e)=>setAddress(e.target.value)} />
          <div className="grid gap-3 md:grid-cols-2">
            <input className="rounded-xl border px-4 py-3 text-sm" placeholder="City" value={city} onChange={(e)=>setCity(e.target.value)} />
            <select className="rounded-xl border px-4 py-3 text-sm" value={province} onChange={(e)=>setProvince(e.target.value)}>
              {["BC","AB","SK","MB","ON","QC","NB","NS","PE","NL","NT","NU","YT"].map(p => <option key={p} value={p}>{p}</option>)}
            </select>
          </div>
          <input className="rounded-xl border px-4 py-3 text-sm" placeholder="Postal code" value={postalCode} onChange={(e)=>setPostalCode(e.target.value)} />
        </div>

        <button
          disabled={loading || items.length === 0}
          onClick={submit}
          className="rounded-xl bg-black text-white px-5 py-3 font-black disabled:opacity-50"
        >
          {loading ? "Placing order..." : "Place order"}
        </button>
      </div>

      <div className="rounded-2xl border bg-white p-6 h-fit space-y-3">
        <div className="text-lg font-black">Order Summary</div>
        <div className="text-sm text-neutral-600">{items.length} item(s)</div>

        <div className="border-t pt-3 space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-neutral-600 font-semibold">Subtotal</span>
            <span className="font-black">{formatMoney(subtotal, "CAD")}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-neutral-600 font-semibold">Shipping</span>
            <span className="font-black">{shipping === 0 ? "Free" : formatMoney(shipping, "CAD")}</span>
          </div>
          <div className="border-t pt-3 flex justify-between">
            <span className="font-black">Total</span>
            <span className="font-black">{formatMoney(total, "CAD")}</span>
          </div>
          <div className="text-xs text-neutral-500">Free shipping over $120 CAD (demo rule).</div>
        </div>
      </div>
    </div>
  );
}
