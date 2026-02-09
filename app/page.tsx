import Link from "next/link";
import { getAllProducts } from "@/lib/products";
import ProductCard from "@/components/ProductCard";

export default function HomePage() {
  const products = getAllProducts();
  const featured = products.slice(0, 4);

  return (
    <div className="py-10 space-y-16">
      {/* Hero Section */}
      <section className="rounded-3xl border-2 border-azriella-pink/20 bg-gradient-to-br from-white via-azriella-pink/5 to-azriella-navy/5 p-8 md:p-12 shadow-xl">
        <div className="grid gap-8 md:grid-cols-2 md:items-center">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold text-azriella-navy bg-azriella-pink/10 px-3 py-1 rounded-full">
              🇨🇦 CANADA • KIDS-FIRST • AFRICAN PRINTS
            </div>
            <h1 className="mt-4 text-4xl md:text-6xl font-black leading-tight">
              <span className="bg-gradient-to-r from-azriella-pink to-azriella-navy bg-clip-text text-transparent">
                Bright African-inspired
              </span>
              <br />
              <span className="text-azriella-navy">fashion for the whole family</span>
            </h1>
            <p className="mt-5 text-lg text-neutral-700">
              Discover vibrant prints, comfortable fits, and matching styles that celebrate culture and creativity.
            </p>
            <div className="mt-8 flex gap-4">
              <Link 
                href="/shop?category=kids" 
                className="rounded-xl bg-gradient-to-r from-azriella-pink to-azriella-pink-dark text-white px-6 py-3 font-bold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
              >
                Shop Kids
              </Link>
              <Link 
                href="/shop?category=adults" 
                className="rounded-xl border-2 border-azriella-navy text-azriella-navy px-6 py-3 font-bold hover:bg-azriella-navy hover:text-white transition-all"
              >
                Shop Adults
              </Link>
            </div>
          </div>

          <div className="rounded-2xl bg-gradient-to-br from-azriella-pink/20 to-azriella-navy/20 aspect-[4/3] flex items-center justify-center border-2 border-azriella-pink/30">
            <div className="text-center p-6">
              <div className="text-6xl mb-4">✨</div>
              <p className="text-azriella-navy font-bold">Hero Banner</p>
              <p className="text-sm text-neutral-600">Showcase your beautiful collection</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="space-y-6">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-3xl font-black text-azriella-navy">Featured Collection</h2>
            <p className="text-neutral-600 mt-1">Handpicked styles your family will love</p>
          </div>
          <Link href="/shop" className="text-sm font-bold text-azriella-pink hover:text-azriella-pink-dark transition-colors underline">
            View all →
          </Link>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map(p => <ProductCard key={p.id} p={p} />)}
        </div>
      </section>

      {/* Features Grid */}
      <section className="grid gap-5 md:grid-cols-3">
        <div className="rounded-2xl border-2 border-azriella-pink/20 bg-white p-6 hover:shadow-lg transition-shadow">
          <div className="text-3xl mb-3">👶</div>
          <div className="font-black text-azriella-navy text-lg">Kids by Age</div>
          <p className="text-sm text-neutral-600 mt-2">Shop newborn, 2–8, and 9–14 easily.</p>
          <div className="mt-4 flex flex-wrap gap-2">
            <Link className="rounded-full border-2 border-azriella-pink/30 px-3 py-1 text-sm font-semibold text-azriella-navy hover:bg-azriella-pink hover:text-white hover:border-azriella-pink transition-all" href="/shop?category=kids&ageRange=2-8">2–8Y</Link>
            <Link className="rounded-full border-2 border-azriella-pink/30 px-3 py-1 text-sm font-semibold text-azriella-navy hover:bg-azriella-pink hover:text-white hover:border-azriella-pink transition-all" href="/shop?category=kids&ageRange=9-14">9–14Y</Link>
          </div>
        </div>
        <div className="rounded-2xl border-2 border-azriella-navy/20 bg-white p-6 hover:shadow-lg transition-shadow">
          <div className="text-3xl mb-3">🎨</div>
          <div className="font-black text-azriella-navy text-lg">African Prints</div>
          <p className="text-sm text-neutral-600 mt-2">Ankara, Dashiki, Kente-inspired designs that pop.</p>
        </div>
        <div className="rounded-2xl border-2 border-azriella-pink/20 bg-white p-6 hover:shadow-lg transition-shadow">
          <div className="text-3xl mb-3">⚡</div>
          <div className="font-black text-azriella-navy text-lg">Fast Checkout</div>
          <p className="text-sm text-neutral-600 mt-2">Simple, secure, and speedy checkout experience.</p>
        </div>
      </section>
    </div>
  );
}
