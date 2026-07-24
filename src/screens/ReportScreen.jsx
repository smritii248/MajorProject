import { ArrowLeft, Share2 } from "lucide-react";
import Tag from "../components/Tag";
import StatCard from "../components/StatCard";

export default function ReportScreen({ goBack, goPlaces }) {
  return (
    <div className="flex-1 overflow-y-auto bg-[#FAF9F4] px-5">
      {/* Header */}
      <div className="flex items-center justify-between pt-2 pb-3">
        <button onClick={goBack}>
          <ArrowLeft size={20} />
        </button>
        <span className="font-extrabold text-sm">Garment report</span>
        <Share2 size={18} className="text-gray-400" />
      </div>

      {/* Condition banner */}
      <div className="rounded-2xl bg-green-100 px-4 py-3 flex items-center justify-between mb-4">
        <div>
          <div className="font-extrabold text-sm text-green-800">Good condition</div>
          <div className="text-xs text-green-700">Suitable for resale</div>
        </div>
        <span className="px-3 py-1.5 rounded-full text-xs font-extrabold bg-green-600 text-white">
          Reusable
        </span>
      </div>

      {/* Defects */}
      <div className="text-xs font-extrabold text-gray-500 mb-2">DEFECTS DETECTED</div>
      <div className="flex gap-2 mb-5">
        <Tag label="Minor fading" color="orange" />
        <Tag label="No tears" color="green" />
        <Tag label="No stains" color="green" />
      </div>

      {/* Details table */}
      <div className="text-xs font-extrabold text-gray-500 mb-2">GARMENT DETAILS</div>
      <div className="rounded-2xl border border-gray-200 mb-5 divide-y divide-gray-200">
        <Row label="Type" value="Denim jacket" />
        <Row label="Fabric" value="Cotton blend" />
        <Row label="Colour" value="Indigo blue" />
        <Row label="Confidence" value="94%" />
      </div>

      {/* Impact */}
      <div className="text-xs font-extrabold text-gray-500 mb-2">ENVIRONMENTAL IMPACT</div>
      <div className="grid grid-cols-3 gap-2.5 mb-6">
        <StatCard value="2.1kg" label="CO2 saved" color="green" />
        <StatCard value="180L" label="Water saved" color="blue" />
        <StatCard value="0.4kg" label="Waste diverted" color="purple" />
      </div>

      {/* Actions */}
      <div className="flex gap-3 pb-2">
        <button
          onClick={goPlaces}
          className="flex-1 rounded-2xl py-3 font-extrabold text-sm bg-green-600 text-white"
        >
          Sell it
        </button>
        <button
          onClick={goPlaces}
          className="flex-1 rounded-2xl py-3 font-extrabold text-sm border border-gray-200"
        >
          Donate
        </button>
      </div>
    </div>
  );
}

function Row({ label, value }) {
  return (
    <div className="flex items-center justify-between px-4 py-3">
      <span className="text-sm text-gray-500">{label}</span>
      <span className="text-sm font-bold">{value}</span>
    </div>
  );
}
