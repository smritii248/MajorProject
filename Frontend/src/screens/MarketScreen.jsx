import { useState } from "react";
import { Search, Plus } from "lucide-react";
import Pill from "../components/Pill";

const ITEMS = [
  { name: "Cotton Kurta", tag: "Reusable", price: "Rs. 350", color: "green", icon: "👘" },
  { name: "Denim Trousers", tag: "Repairable", price: "Rs. 180", color: "orange", icon: "👖" },
  { name: "Woollen Shawl", tag: "Reusable", price: "Free · Donate", color: "green", icon: "🧣" },
];

export default function MarketScreen() {
  const [filter, setFilter] = useState("All");

  return (
    <div className="flex-1 overflow-y-auto bg-[#FAF9F4] px-5">
      {/* Header */}
      <div className="flex items-center justify-between pt-2 pb-3">
        <span className="font-extrabold text-lg">Marketplace</span>
        <Search size={18} className="text-gray-400" />
      </div>

      {/* Search bar */}
      <div className="flex items-center gap-2 rounded-xl border border-gray-200 px-3.5 py-2.5 mb-3.5">
        <Search size={15} className="text-gray-400" />
        <span className="text-sm text-gray-400">Search items...</span>
      </div>

      {/* Filters */}
      <div className="flex gap-2 mb-4 overflow-x-auto">
        {["All", "Shirts", "Jackets", "Trousers"].map((f) => (
          <Pill key={f} label={f} active={filter === f} onClick={() => setFilter(f)} />
        ))}
      </div>

      <div className="font-extrabold text-sm mb-2.5">Near you in Kathmandu</div>

      {/* Items */}
      <div className="flex flex-col gap-2.5 mb-4">
        {ITEMS.map((it) => (
          <div
            key={it.name}
            className="flex items-center justify-between rounded-2xl border border-gray-200 px-3.5 py-3"
          >
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-green-50 flex items-center justify-center text-lg">
                {it.icon}
              </div>
              <div>
                <div className="text-sm font-bold">{it.name}</div>
                <span
                  className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                    it.color === "orange" ? "bg-orange-100 text-orange-700" : "bg-green-100 text-green-700"
                  }`}
                >
                  AI verified · {it.tag}
                </span>
              </div>
            </div>
            <span className="text-sm font-extrabold">{it.price}</span>
          </div>
        ))}
      </div>

      <button className="w-full flex items-center justify-center gap-2 rounded-2xl py-3 font-extrabold text-sm border-2 border-dashed border-green-300 bg-green-50 text-green-800 mb-2">
        <Plus size={16} /> List your item
      </button>
    </div>
  );
}
