"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import type { Product, Order } from "@/lib/types";

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState<"products" | "orders">("products");
  
  // Products state
  const [products, setProducts] = useState<Product[]>([]);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [showProductForm, setShowProductForm] = useState(false);
  
  // Orders state
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const res = await fetch("/api/orders");
      setAuthenticated(res.ok);
      if (res.ok) {
        loadData();
      }
    } catch {
      setAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      
      if (res.ok) {
        setAuthenticated(true);
        loadData();
      } else {
        setError("Invalid credentials");
      }
    } catch {
      setError("Login failed");
    }
  };

  const handleLogout = async () => {
    await fetch("/api/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "logout" }),
    });
    setAuthenticated(false);
  };

  const loadData = async () => {
    try {
      const [productsRes, ordersRes] = await Promise.all([
        fetch("/api/products"),
        fetch("/api/orders"),
      ]);
      
      if (productsRes.ok) setProducts(await productsRes.json());
      if (ordersRes.ok) setOrders(await ordersRes.json());
    } catch (error) {
      console.error("Failed to load data:", error);
    }
  };

  const handleSaveProduct = async (product: Product) => {
    try {
      const method = editingProduct ? "PUT" : "POST";
      const res = await fetch("/api/products", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product),
      });
      
      if (res.ok) {
        await loadData();
        setShowProductForm(false);
        setEditingProduct(null);
      }
    } catch (error) {
      console.error("Failed to save product:", error);
    }
  };

  const handleDeleteProduct = async (id: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    
    try {
      const res = await fetch(`/api/products?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        await loadData();
      }
    } catch (error) {
      console.error("Failed to delete product:", error);
    }
  };

  if (loading) {
    return (
      <div className="py-20 text-center">
        <div className="text-4xl mb-4">⏳</div>
        <p className="text-neutral-600 font-semibold">Loading...</p>
      </div>
    );
  }

  if (!authenticated) {
    return (
      <div className="py-20 max-w-md mx-auto">
        <div className="rounded-2xl border-2 border-azriella-pink/20 bg-white p-8 shadow-lg">
          <div className="text-center mb-6">
            <Image 
              src="/images/azlogo.png" 
              alt="Azriella Logo" 
              width={144} 
              height={144}
              className="mx-auto mb-4 rounded-2xl"
            />
            <h1 className="text-3xl font-black text-azriella-navy">Admin Login</h1>
            <p className="text-neutral-600 mt-2">Azriella Store Dashboard</p>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-azriella-navy mb-2">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full rounded-xl border-2 border-azriella-navy/20 px-4 py-3 outline-none focus:ring-2 focus:ring-azriella-pink focus:border-azriella-pink"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-bold text-azriella-navy mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border-2 border-azriella-navy/20 px-4 py-3 outline-none focus:ring-2 focus:ring-azriella-pink focus:border-azriella-pink"
                required
              />
            </div>
            
            {error && (
              <div className="text-sm text-red-600 bg-red-50 px-4 py-2 rounded-lg">
                {error}
              </div>
            )}
            
            <button
              type="submit"
              className="w-full rounded-xl bg-gradient-to-r from-azriella-pink to-azriella-navy text-white px-6 py-3 font-bold hover:shadow-lg transition-all"
            >
              Login
            </button>
          </form>
          
          <div className="mt-6 text-xs text-neutral-500 text-center">
            Default: admin / azriella-admin-2026<br />
            (Change in production via environment variables)
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-10 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-black bg-gradient-to-r from-azriella-pink to-azriella-navy bg-clip-text text-transparent">
            Admin Dashboard
          </h1>
          <p className="text-neutral-600 mt-1">Manage your Azriella store</p>
        </div>
        
        <button
          onClick={handleLogout}
          className="rounded-xl border-2 border-azriella-navy text-azriella-navy px-5 py-2 font-bold hover:bg-azriella-navy hover:text-white transition-all"
        >
          Logout
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b-2 border-azriella-pink/20">
        <button
          onClick={() => setActiveTab("products")}
          className={`px-6 py-3 font-bold transition-all ${
            activeTab === "products"
              ? "border-b-4 border-azriella-pink text-azriella-pink"
              : "text-neutral-600 hover:text-azriella-navy"
          }`}
        >
          Products ({products.length})
        </button>
        <button
          onClick={() => setActiveTab("orders")}
          className={`px-6 py-3 font-bold transition-all ${
            activeTab === "orders"
              ? "border-b-4 border-azriella-pink text-azriella-pink"
              : "text-neutral-600 hover:text-azriella-navy"
          }`}
        >
          Orders ({orders.length})
        </button>
      </div>

      {activeTab === "products" && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-black text-azriella-navy">Products</h2>
            <button
              onClick={() => {
                setEditingProduct(null);
                setShowProductForm(true);
              }}
              className="rounded-xl bg-gradient-to-r from-azriella-pink to-azriella-navy text-white px-6 py-3 font-bold hover:shadow-lg transition-all"
            >
              + Add Product
            </button>
          </div>

          {showProductForm && (
            <ProductForm
              product={editingProduct}
              onSave={handleSaveProduct}
              onCancel={() => {
                setShowProductForm(false);
                setEditingProduct(null);
              }}
            />
          )}

          <div className="grid gap-4">
            {products.map((product) => (
              <div
                key={product.id}
                className="rounded-2xl border-2 border-azriella-pink/20 bg-white p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex gap-6">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-24 h-24 rounded-xl object-cover bg-neutral-100"
                  />
                  
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-black text-azriella-navy text-lg">{product.title}</h3>
                        <p className="text-sm text-azriella-pink font-bold uppercase mt-1">
                          {product.collection} • {product.category}
                        </p>
                        <p className="text-neutral-600 text-sm mt-2">{product.description}</p>
                      </div>
                      
                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            setEditingProduct(product);
                            setShowProductForm(true);
                          }}
                          className="rounded-lg border-2 border-azriella-navy text-azriella-navy px-4 py-2 text-sm font-bold hover:bg-azriella-navy hover:text-white transition-all"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteProduct(product.id)}
                          className="rounded-lg border-2 border-red-500 text-red-500 px-4 py-2 text-sm font-bold hover:bg-red-500 hover:text-white transition-all"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                    
                    <div className="mt-4 flex gap-4 text-sm">
                      <span className="font-bold">${(product.priceCents / 100).toFixed(2)} {product.currency}</span>
                      <span className="text-neutral-600">Sizes: {product.sizes.join(", ")}</span>
                      <span className="text-neutral-600">Age: {product.ageRange}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === "orders" && (
        <div className="space-y-6">
          <h2 className="text-2xl font-black text-azriella-navy">Orders</h2>
          
          <div className="grid gap-4">
            {orders.map((order) => (
              <div
                key={order.id}
                className="rounded-2xl border-2 border-azriella-pink/20 bg-white p-6"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-black text-azriella-navy">Order #{order.id.slice(0, 8)}</h3>
                    <p className="text-sm text-neutral-600 mt-1">
                      {new Date(order.createdAtISO).toLocaleString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-black bg-gradient-to-r from-azriella-pink to-azriella-navy bg-clip-text text-transparent">
                      ${(order.totalCents / 100).toFixed(2)}
                    </div>
                  </div>
                </div>
                
                <div className="border-t border-azriella-pink/20 pt-4 mt-4">
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="font-bold text-azriella-navy">Customer</div>
                      <div className="text-neutral-600 mt-1">
                        {order.name}<br />
                        {order.email}
                      </div>
                    </div>
                    
                    <div>
                      <div className="font-bold text-azriella-navy">Shipping Address</div>
                      <div className="text-neutral-600 mt-1">
                        {order.address}<br />
                        {order.city}, {order.province} {order.postalCode}
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <div className="font-bold text-azriella-navy mb-2">Items ({order.items.length})</div>
                    <div className="space-y-2">
                      {order.items.map((item, idx) => (
                        <div key={idx} className="flex justify-between text-sm">
                          <span>{item.title} (Size: {item.size}) × {item.qty}</span>
                          <span className="font-bold">${(item.priceCents * item.qty / 100).toFixed(2)}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function ProductForm({
  product,
  onSave,
  onCancel,
}: {
  product: Product | null;
  onSave: (product: Product) => void;
  onCancel: () => void;
}) {
  const [formData, setFormData] = useState<Product>(
    product || {
      id: `p_${Date.now()}`,
      slug: "",
      title: "",
      priceCents: 0,
      currency: "CAD",
      gender: "unisex",
      ageRange: "2-8",
      sizes: [],
      category: "kids",
      collection: "Ankara",
      tags: [],
      image: "/images/placeholder.jpg",
      description: "",
    }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="rounded-2xl border-2 border-azriella-pink/20 bg-white p-6 shadow-lg">
      <h3 className="text-2xl font-black text-azriella-navy mb-6">
        {product ? "Edit Product" : "Add New Product"}
      </h3>
      
      <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-bold text-azriella-navy mb-2">Product ID</label>
          <input
            type="text"
            value={formData.id}
            onChange={(e) => setFormData({ ...formData, id: e.target.value })}
            className="w-full rounded-xl border-2 border-azriella-navy/20 px-4 py-2 text-sm"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-bold text-azriella-navy mb-2">Slug</label>
          <input
            type="text"
            value={formData.slug}
            onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
            className="w-full rounded-xl border-2 border-azriella-navy/20 px-4 py-2 text-sm"
            required
          />
        </div>
        
        <div className="md:col-span-2">
          <label className="block text-sm font-bold text-azriella-navy mb-2">Title</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full rounded-xl border-2 border-azriella-navy/20 px-4 py-2 text-sm"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-bold text-azriella-navy mb-2">Price (cents)</label>
          <input
            type="number"
            value={formData.priceCents}
            onChange={(e) => setFormData({ ...formData, priceCents: parseInt(e.target.value) })}
            className="w-full rounded-xl border-2 border-azriella-navy/20 px-4 py-2 text-sm"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-bold text-azriella-navy mb-2">Category</label>
          <select
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
            className="w-full rounded-xl border-2 border-azriella-navy/20 px-4 py-2 text-sm"
          >
            <option value="kids">Kids</option>
            <option value="adults">Adults</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-bold text-azriella-navy mb-2">Age Range</label>
          <select
            value={formData.ageRange}
            onChange={(e) => setFormData({ ...formData, ageRange: e.target.value as any })}
            className="w-full rounded-xl border-2 border-azriella-navy/20 px-4 py-2 text-sm"
          >
            <option value="newborn">Newborn</option>
            <option value="0-24m">0-24m</option>
            <option value="2-8">2-8</option>
            <option value="9-14">9-14</option>
            <option value="adult">Adult</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-bold text-azriella-navy mb-2">Collection</label>
          <input
            type="text"
            value={formData.collection}
            onChange={(e) => setFormData({ ...formData, collection: e.target.value })}
            className="w-full rounded-xl border-2 border-azriella-navy/20 px-4 py-2 text-sm"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-bold text-azriella-navy mb-2">Sizes (comma-separated)</label>
          <input
            type="text"
            value={formData.sizes.join(", ")}
            onChange={(e) => setFormData({ ...formData, sizes: e.target.value.split(",").map(s => s.trim()) })}
            className="w-full rounded-xl border-2 border-azriella-navy/20 px-4 py-2 text-sm"
            placeholder="2T, 3T, 4T, 5"
            required
          />
        </div>
        
        <div className="md:col-span-2">
          <label className="block text-sm font-bold text-azriella-navy mb-2">Image URL</label>
          <input
            type="text"
            value={formData.image}
            onChange={(e) => setFormData({ ...formData, image: e.target.value })}
            className="w-full rounded-xl border-2 border-azriella-navy/20 px-4 py-2 text-sm"
            required
          />
        </div>
        
        <div className="md:col-span-2">
          <label className="block text-sm font-bold text-azriella-navy mb-2">Description</label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full rounded-xl border-2 border-azriella-navy/20 px-4 py-2 text-sm"
            rows={3}
            required
          />
        </div>
        
        <div className="md:col-span-2 flex gap-3 justify-end">
          <button
            type="button"
            onClick={onCancel}
            className="rounded-xl border-2 border-neutral-300 text-neutral-700 px-6 py-3 font-bold hover:bg-neutral-100 transition-all"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-xl bg-gradient-to-r from-azriella-pink to-azriella-navy text-white px-6 py-3 font-bold hover:shadow-lg transition-all"
          >
            Save Product
          </button>
        </div>
      </form>
    </div>
  );
}
