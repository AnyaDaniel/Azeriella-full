import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { isAuthenticated } from "@/lib/auth";
import type { Order } from "@/lib/types";

// Fallback to JSON file if database is not configured
let useFallback = false;

async function getOrders(): Promise<Order[]> {
  if (useFallback || !process.env.MONGODB_URI) {
    const orders = await import("@/data/orders.json");
    return orders.default as Order[];
  }

  try {
    const db = await getDb();
    const orders = await db.collection<Order>("orders").find({}).sort({ createdAtISO: -1 }).toArray();
    return orders.map(o => ({ ...o, _id: undefined } as any));
  } catch (error) {
    console.error("Database error, falling back to JSON:", error);
    useFallback = true;
    const orders = await import("@/data/orders.json");
    return orders.default as Order[];
  }
}

export async function GET() {
  try {
    const authenticated = await isAuthenticated();
    if (!authenticated) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const orders = await getOrders();
    return NextResponse.json(orders);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 });
  }
}
