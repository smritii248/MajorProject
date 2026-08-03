import { useEffect, useState } from "react";
import { User, Mail, LogOut, Leaf, Droplets, Recycle, Shirt } from "lucide-react";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

export default function ProfileScreen({ user, onLogout }) {
  const [listings, setListings] = useState([]);
  const [loadingListings, setLoadingListings] = useState(true);

  const stats = {
    co2SavedKg: 4.2,
    waterSavedL: 310,
    itemsReused: 3,
  };

  useEffect(() => {
    if (!user?.id) return;
    fetch(`${API_BASE}/my-listings?user_id=${user.id}`)
      .then((res) => res.json())
      .then((data) => setListings(data))
      .catch(() => setListings([]))
      .finally(() => setLoadingListings(false));
  }, [user]);

  async function handleMarkSold(listingId) {
    try {
      await fetch(`${API_BASE}/listings/${listingId}/mark-sold`, { method: "PATCH" });
      setListings((prev) =>
        prev.map((l) => (l.id === listingId ? { ...l, status: "sold" } : l))
      );
    } catch (err) {
      console.error("Failed to mark as sold", err);
    }
  }

  const activeListings = listings.filter((l) => l.status === "active");
  const soldListings = listings.filter((l) => l.status === "sold");

  return (
    <div className="flex-1 overflow-y-auto bg-[#FAF9F4] px-5">
      <div className="flex flex-col items-center pt-6 pb-5">
        <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center mb-3">
          <User size={26} className="text-green-600" />
        </div>
        <div className="font-extrabold text-base">{user?.name || "EcoThread user"}</div>
        <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
          <Mail size={12} />
          <span>{user?.email}</span>
        </div>
      </div>

      <div className="text-xs font-extrabold text-gray-500 mb-2">YOUR IMPACT SO FAR</div>
      <div className="grid grid-cols-3 gap-2.5 mb-6">
        <StatBlock icon={<Leaf size={16} className="text-green-600" />} value={`${stats.co2SavedKg}kg`} label="CO2 saved" />
        <StatBlock icon={<Droplets size={16} className="text-blue-600" />} value={`${stats.waterSavedL}L`} label="Water saved" />
        <StatBlock icon={<Recycle size={16} className="text-purple-600" />} value={stats.itemsReused} label="Items reused" />
      </div>

      {/* My Listings */}
      <div className="text-xs font-extrabold text-gray-500 mb-2">MY LISTINGS</div>
      {loadingListings ? (
        <div className="text-xs text-gray-400 mb-6">Loading your listings...</div>
      ) : listings.length === 0 ? (
        <div className="text-xs text-gray-400 mb-6">You haven't listed any items yet.</div>
      ) : (
        <>
          {activeListings.length > 0 && (
            <div className="mb-3">
              <div className="text-[10px] font-bold text-gray-400 mb-1.5">FOR SALE</div>
              {activeListings.map((item) => (
                <ListingRow key={item.id} item={item} onMarkSold={() => handleMarkSold(item.id)} />
              ))}
            </div>
          )}
          {soldListings.length > 0 && (
            <div className="mb-6">
              <div className="text-[10px] font-bold text-gray-400 mb-1.5">SOLD</div>
              {soldListings.map((item) => (
                <ListingRow key={item.id} item={item} sold />
              ))}
            </div>
          )}
        </>
      )}

      <div className="text-xs font-extrabold text-gray-500 mb-2">ACCOUNT</div>
      <div className="rounded-2xl border border-gray-200 mb-6 divide-y divide-gray-200">
        <Row label="Name" value={user?.name} />
        <Row label="Email" value={user?.email} />
      </div>

      <button
        onClick={onLogout}
        className="w-full flex items-center justify-center gap-2 rounded-2xl border border-red-200 text-red-500 py-3 font-bold text-sm mb-6"
      >
        <LogOut size={16} />
        Log out
      </button>
    </div>
  );
}

function ListingRow({ item, onMarkSold, sold }) {
  return (
    <div className={`flex items-center justify-between rounded-2xl border px-3 py-2.5 mb-2 ${sold ? "border-gray-100 bg-gray-50 opacity-60" : "border-gray-200"}`}>
      <div className="flex items-center gap-2.5">
        <div className="w-9 h-9 rounded-xl bg-green-50 flex items-center justify-center shrink-0">
          <Shirt size={16} className="text-green-600" />
        </div>
        <div>
          <div className="text-xs font-bold capitalize">{item.garment_type} · {item.fabric_type}</div>
          <div className="text-[10px] text-gray-500">
            {item.action === "Donate" ? "Free · Donate" : `Rs. ${item.price}`}
          </div>
        </div>
      </div>
      {!sold && onMarkSold && (
        <button
          onClick={onMarkSold}
          className="text-[10px] font-bold text-green-600 border border-green-200 rounded-full px-2.5 py-1"
        >
          Mark as sold
        </button>
      )}
      {sold && <span className="text-[10px] font-bold text-gray-400">Sold</span>}
    </div>
  );
}

function StatBlock({ icon, value, label }) {
  return (
    <div className="rounded-2xl border border-gray-200 py-3 flex flex-col items-center gap-1">
      {icon}
      <span className="font-extrabold text-sm">{value}</span>
      <span className="text-[10px] text-gray-500">{label}</span>
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