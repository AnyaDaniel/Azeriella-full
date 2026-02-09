export type Category = "kids" | "adults";
export type Gender = "unisex" | "boys" | "girls" | "men" | "women";

export type Product = {
  id: string;
  slug: string;
  title: string;
  priceCents: number;
  currency: "CAD";
  gender: Gender;
  ageRange: "newborn" | "0-24m" | "2-8" | "9-17" | "adult";
  sizes: string[];
  category: Category;
  collection: string;
  tags: string[];
  image: string;
  description: string;
};

export type CartItem = {
  productId: string;
  slug: string;
  title: string;
  image: string;
  priceCents: number;
  currency: "CAD";
  size: string;
  qty: number;
};

export type Order = {
  id: string;
  createdAtISO: string;
  email: string;
  name: string;
  address: string;
  city: string;
  province: string;
  postalCode: string;
  items: CartItem[];
  subtotalCents: number;
  shippingCents: number;
  totalCents: number;
};
