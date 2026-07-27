import { Camera, Upload, Package, Bell, Leaf } from "lucide-react";
import StatCard from "../components/StatCard";

export default function HomeScreen({ goReport }) {
  return (
    <div className="flex-1 overflow-y-auto bg-[#FAF9F4] px-5">
      {/* Header */}
      <div className="flex items-center justify-between pt-2 pb-4">
        <div className="flex items-center gap-1.5">
          <Leaf size={18} className="text-green-600" />
          <span className="font-extrabold text-base">EcoThread</span>
        </div>
        <Bell size={18} className="text-gray-400" />
      </div>

      {/* Title */}
      <h1 className="text-lg font-extrabold mb-1">Assess a garment</h1>
      <p className="text-sm text-gray-500 mb-4">
        Take or upload a photo to get a condition report
      </p>

      {/* Photo box */}
      <button
        onClick={goReport}
        className="w-full h-36 rounded-2xl border-2 border-dashed border-green-300 bg-green-50 flex flex-col items-center justify-center gap-2 mb-3"
      >
        <Camera size={26} className="text-green-600" />
        <div className="text-center">
          <div className="text-sm font-bold">Take a photo</div>
          <div className="text-xs text-gray-500">or tap below to upload</div>
        </div>
      </button>

      {/* Buttons */}
      <button
        onClick={goReport}
        className="w-full flex items-center justify-center gap-2 rounded-2xl border border-gray-200 py-3 mb-2.5 font-bold text-sm"
      >
        <Upload size={16} /> Upload from gallery
      </button>

      <button className="w-full flex items-center justify-center gap-2 rounded-2xl border border-gray-200 py-3 mb-6 font-bold text-sm">
        <Package size={16} /> Batch import
      </button>

      {/* Impact stats */}
      <div className="font-extrabold text-sm mb-2.5">Your impact so far</div>
      <div className="grid grid-cols-3 gap-2.5 mb-4">
        <StatCard value="4.2kg" label="CO2 saved" color="green" />
        <StatCard value="310L" label="Water saved" color="blue" />
        <StatCard value="3" label="Items reused" color="orange" />
      </div>
    </div>
  );
}
