"use client";

export default function Quantity({
  value,
  onChange,
}: {
  value: number;
  onChange: (v: number) => void;
}) {
  return (
    <div className="inline-flex items-center rounded-xl border overflow-hidden">
      <button className="px-3 py-2 font-black" onClick={() => onChange(Math.max(1, value - 1))} type="button">−</button>
      <div className="px-4 py-2 text-sm font-bold">{value}</div>
      <button className="px-3 py-2 font-black" onClick={() => onChange(value + 1)} type="button">+</button>
    </div>
  );
}
