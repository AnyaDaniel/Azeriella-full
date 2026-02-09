import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="border-t border-azriella-pink/20 bg-gradient-to-b from-white to-azriella-navy/5 mt-20">
      <div className="mx-auto max-w-6xl px-4 py-12 grid gap-8 md:grid-cols-3">
        <div>
          <Image 
            src="/images/azlogo.png" 
            alt="Azriella Logo" 
            width={112} 
            height={112}
            className="mb-3"
          />
          <p className="text-sm text-neutral-600 mt-2">
            Vibrant African-inspired fashion for kids and families in Canada. Celebrating culture, creativity, and style.
          </p>
        </div>

        <div className="text-sm">
          <div className="font-bold mb-3 text-azriella-navy">Shop</div>
          <div className="grid gap-2 text-neutral-700">
            <Link href="/shop?category=kids" className="hover:text-azriella-pink transition-colors">Kids Collection</Link>
            <Link href="/shop?category=adults" className="hover:text-azriella-pink transition-colors">Adults Collection</Link>
            <Link href="/shop" className="hover:text-azriella-pink transition-colors">All Products</Link>
          </div>
        </div>

        <div className="text-sm">
          <div className="font-bold mb-3 text-azriella-navy">Support</div>
          <div className="grid gap-2 text-neutral-700">
            <Link href="/contact" className="hover:text-azriella-pink transition-colors">Contact Us</Link>
            <Link href="/about" className="hover:text-azriella-pink transition-colors">About Azriella</Link>
            <Link href="/admin" className="hover:text-azriella-pink transition-colors">Admin</Link>
          </div>
        </div>
      </div>
      <div className="text-xs text-neutral-500 border-t border-azriella-pink/20 py-4 text-center">
        © 2026 Azriella. All rights reserved. Made with 💗 in Canada.
      </div>
    </footer>
  );
}
