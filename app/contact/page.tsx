export default function Contact() {
  return (
    <div className="py-10 space-y-4 max-w-2xl">
      <h1 className="text-3xl font-black">Contact</h1>
      <p className="text-neutral-700">Questions about sizing, shipping, or custom sets? Send a message.</p>

      <form className="rounded-2xl border bg-white p-6 grid gap-3">
        <input className="rounded-xl border px-4 py-3 text-sm" placeholder="Your name" />
        <input className="rounded-xl border px-4 py-3 text-sm" placeholder="Email" />
        <textarea className="rounded-xl border px-4 py-3 text-sm" placeholder="Message" rows={5} />
        <button type="button" className="rounded-xl bg-black text-white px-5 py-3 font-black">
          Send (demo)
        </button>
      </form>
    </div>
  );
}
