import { NextResponse } from "next/server";
import type { Order } from "@/lib/types";
import { randomUUID } from "crypto";
import { getDb } from "@/lib/db";
import fs from "fs";
import path from "path";

const ordersPath = path.join(process.cwd(), "data", "orders.json");

function readOrders(): Order[] {
  try {
    const raw = fs.readFileSync(ordersPath, "utf8");
    return JSON.parse(raw) as Order[];
  } catch {
    return [];
  }
}

function writeOrders(orders: Order[]) {
  fs.writeFileSync(ordersPath, JSON.stringify(orders, null, 2), "utf8");
}

export async function POST(req: Request) {
  const body = (await req.json()) as Omit<Order, "id" | "createdAtISO">;
  const order: Order = {
    ...body,
    id: randomUUID(),
    createdAtISO: new Date().toISOString()
  };

  // Try to save to database first, fallback to JSON file
  if (process.env.MONGODB_URI) {
    try {
      const db = await getDb();
      await db.collection("orders").insertOne(order);
    } catch (error) {
      console.error("Database error, falling back to JSON:", error);
      const orders = readOrders();
      orders.unshift(order);
      writeOrders(orders);
    }
  } else {
    const orders = readOrders();
    orders.unshift(order);
    writeOrders(orders);
  }

  return NextResponse.json({ ok: true, orderId: order.id });
}
