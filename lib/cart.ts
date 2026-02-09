import type { CartItem, Product } from "./types";

const KEY = "afriqa_cart_v1";

export function loadCart(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as CartItem[]) : [];
  } catch {
    return [];
  }
}

export function saveCart(items: CartItem[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(KEY, JSON.stringify(items));
}

export function addToCart(
  items: CartItem[],
  product: Product,
  size: string,
  qty: number
): CartItem[] {
  const idx = items.findIndex(i => i.productId === product.id && i.size === size);
  if (idx >= 0) {
    const copy = [...items];
    copy[idx] = { ...copy[idx], qty: copy[idx].qty + qty };
    return copy;
  }
  return [
    ...items,
    {
      productId: product.id,
      slug: product.slug,
      title: product.title,
      image: product.image,
      priceCents: product.priceCents,
      currency: product.currency,
      size,
      qty
    }
  ];
}

export function updateQty(items: CartItem[], productId: string, size: string, qty: number) {
  return items
    .map(i => (i.productId === productId && i.size === size ? { ...i, qty } : i))
    .filter(i => i.qty > 0);
}

export function removeItem(items: CartItem[], productId: string, size: string) {
  return items.filter(i => !(i.productId === productId && i.size === size));
}

export function subtotalCents(items: CartItem[]) {
  return items.reduce((sum, i) => sum + i.priceCents * i.qty, 0);
}
