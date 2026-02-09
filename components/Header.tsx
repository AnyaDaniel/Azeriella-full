"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { loadCart } from "@/lib/cart";

export default function Header() {
  const [count, setCount] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const update = () => {
      const items = loadCart();
      setCount(items.reduce((s, i) => s + i.qty, 0));
    };
    update();
    window.addEventListener("storage", update);
    return () => window.removeEventListener("storage", update);
  }, []);

  const badge = useMemo(() => (count > 99 ? "99+" : String(count)), [count]);

  return (
    <header className="border-b border-azriella-pink/20 bg-white/95 backdrop-blur sticky top-0 z-40 shadow-sm">
      <div className="mx-auto max-w-6xl px-4 py-4 flex items-center gap-4">
        <Link href="/" className="group">
          <Image 
            src="/images/azlogo.png" 
            alt="Azriella Logo" 
            width={120} 
            height={120} 
            className="transform group-hover:scale-105 transition-transform"
          />
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm font-semibold text-azriella-navy">
          <Link href="/shop?category=kids" className="hover:text-azriella-pink transition-colors">
            Kids
          </Link>
          <Link href="/shop?category=adults" className="hover:text-azriella-pink transition-colors">
            Adults
          </Link>
          <Link href="/shop" className="hover:text-azriella-pink transition-colors">
            Shop All
          </Link>
          <Link href="/about" className="hover:text-azriella-pink transition-colors">
            About
          </Link>
          <Link href="/contact" className="hover:text-azriella-pink transition-colors">
            Contact
          </Link>
        </nav>

        <div className="ml-auto flex items-center gap-4">
          <Link href="/shop" className="text-sm font-semibold text-azriella-navy hover:text-azriella-pink transition-colors">
            Search
          </Link>
          <Link href="/cart" className="relative text-sm font-semibold text-azriella-navy hover:text-azriella-pink transition-colors">
            Cart
            {mounted && (
              <span className="ml-2 inline-flex min-w-6 justify-center rounded-full bg-gradient-to-r from-azriella-pink to-azriella-navy text-white px-2 py-0.5 text-xs font-bold">
                {badge}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}
