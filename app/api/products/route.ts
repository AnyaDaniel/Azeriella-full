import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { isAuthenticated } from "@/lib/auth";
import type { Product } from "@/lib/types";

// Fallback to JSON file if database is not configured
let useFallback = false;

async function getProducts(): Promise<Product[]> {
  if (useFallback || !process.env.MONGODB_URI) {
    const products = await import("@/data/products.json");
    return products.default as Product[];
  }

  try {
    const db = await getDb();
    const products = await db.collection<Product>("products").find({}).toArray();
    return products.map(p => ({ ...p, _id: undefined } as any));
  } catch (error) {
    console.error("Database error, falling back to JSON:", error);
    useFallback = true;
    const products = await import("@/data/products.json");
    return products.default as Product[];
  }
}

export async function GET() {
  try {
    const products = await getProducts();
    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const authenticated = await isAuthenticated();
    if (!authenticated) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const product: Product = await req.json();
    
    if (!process.env.MONGODB_URI) {
      return NextResponse.json({ error: "Database not configured" }, { status: 500 });
    }

    const db = await getDb();
    const result = await db.collection("products").insertOne(product);
    
    return NextResponse.json({ success: true, id: result.insertedId });
  } catch (error) {
    console.error("Error creating product:", error);
    return NextResponse.json({ error: "Failed to create product" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const authenticated = await isAuthenticated();
    if (!authenticated) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const product: Product = await req.json();
    
    if (!process.env.MONGODB_URI) {
      return NextResponse.json({ error: "Database not configured" }, { status: 500 });
    }

    const db = await getDb();
    const result = await db.collection("products").updateOne(
      { id: product.id },
      { $set: product },
      { upsert: true }
    );
    
    return NextResponse.json({ success: true, modified: result.modifiedCount });
  } catch (error) {
    console.error("Error updating product:", error);
    return NextResponse.json({ error: "Failed to update product" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const authenticated = await isAuthenticated();
    if (!authenticated) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    
    if (!id) {
      return NextResponse.json({ error: "Product ID required" }, { status: 400 });
    }
    
    if (!process.env.MONGODB_URI) {
      return NextResponse.json({ error: "Database not configured" }, { status: 500 });
    }

    const db = await getDb();
    const result = await db.collection("products").deleteOne({ id });
    
    return NextResponse.json({ success: true, deleted: result.deletedCount });
  } catch (error) {
    console.error("Error deleting product:", error);
    return NextResponse.json({ error: "Failed to delete product" }, { status: 500 });
  }
}
