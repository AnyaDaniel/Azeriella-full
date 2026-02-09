import Link from "next/link";

export default function OrderSuccess({ searchParams }: any) {
  const orderId = searchParams?.orderId ?? "";
  return (
    <div className="py-16">
      <div className="rounded-3xl border bg-white p-10 text-center space-y-3">
        <div className="text-3xl font-black">Order placed 🎉</div>
        <div className="text-neutral-600">Thanks for shopping Afriqa.</div>
        {orderId && <div className="font-mono text-sm">Order ID: {orderId}</div>}
        <div className="pt-4 flex justify-center gap-3">
          <Link href="/shop" className="rounded-xl bg-black text-white px-5 py-3 font-black">Continue shopping</Link>
          <Link href="/" className="rounded-xl border px-5 py-3 font-black">Home</Link>
        </div>
      </div>
    </div>
  );
}
