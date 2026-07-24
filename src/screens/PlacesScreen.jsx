import { useState } from "react";
import { ArrowLeft, SlidersHorizontal, MapPin, Navigation } from "lucide-react";
import Pill from "../components/Pill";
import Tag from "../components/Tag";

const PLACES = [
  { name: "Ason Thrift Store", dist: "0.8 km", status: "Open now", tag: "Sell", color: "blue" },
  { name: "Nepal Red Cross", dist: "1.2 km", status: "Open now", tag: "Donate", color: "green" },
  { name: "Kathmandu Textiles", dist: "2.1 km", status: "Closes 5pm", tag: "Recycle", color: "orange" },
];

export default function PlacesScreen({ goBack }) {
  const [filter, setFilter] = useState("All");

  return (
    <div className="flex-1 overflow-y-auto bg-[#FAF9F4] px-5">
      {/* Header */}
      <div className="flex items-center justify-between pt-2 pb-3">
        <button onClick={goBack}>
          <ArrowLeft size={20} />
        </button>
        <span className="font-extrabold text-sm">Nearby places</span>
        <SlidersHorizontal size={18} className="text-gray-400" />
      </div>

      {/* Filters */}
      <div className="flex gap-2 mb-4 overflow-x-auto">
        {["All", "Donate", "Sell", "Recycle"].map((f) => (
          <Pill key={f} label={f} active={filter === f} onClick={() => setFilter(f)} />
        ))}
      </div>

      {/* Simple map placeholder */}
      <div className="h-32 rounded-2xl bg-green-50 flex items-center justify-center mb-4 text-sm text-gray-500">
        📍 Kathmandu Valley
      </div>

      {/* List */}
      <div className="font-extrabold text-sm mb-2.5">3 places near you</div>
      <div className="flex flex-col gap-2.5 mb-4">
        {PLACES.map((p) => (
          <div
            key={p.name}
            className="flex items-center justify-between rounded-2xl border border-gray-200 px-3.5 py-3"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-green-50 flex items-center justify-center">
                <MapPin size={16} className="text-green-600" />
              </div>
              <div>
                <div className="text-sm font-bold">{p.name}</div>
                <div className="text-xs text-gray-500">
                  {p.dist} · {p.status}
                </div>
              </div>
            </div>
            <Tag label={p.tag} color={p.color} />
          </div>
        ))}
      </div>

      <button className="w-full flex items-center justify-center gap-2 rounded-2xl py-3 font-extrabold text-sm bg-black text-white mb-2">
        <Navigation size={15} /> Get directions
      </button>
    </div>
  );
}
