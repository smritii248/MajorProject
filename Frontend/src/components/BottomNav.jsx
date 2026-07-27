import { Home, ScanLine, ShoppingBag, User } from "lucide-react";

const TABS = [
  { key: "home", label: "Home", icon: Home },
  { key: "scan", label: "Scan", icon: ScanLine },
  { key: "market", label: "Market", icon: ShoppingBag },
  { key: "profile", label: "Profile", icon: User },
];

export default function BottomNav({ active, onChange }) {
  return (
    <div className="flex justify-between px-7 pt-2 pb-6 border-t border-gray-200 bg-white">
      {TABS.map((tab) => {
        const Icon = tab.icon;
        const isActive = active === tab.key;
        return (
          <button
            key={tab.key}
            onClick={() => onChange(tab.key)}
            className={`flex flex-col items-center gap-1 flex-1 ${
              isActive ? "text-green-600 font-bold" : "text-gray-400"
            }`}
          >
            <Icon size={20} />
            <span className="text-[10px]">{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
}
