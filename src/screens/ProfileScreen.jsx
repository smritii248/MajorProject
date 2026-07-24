import { User } from "lucide-react";

export default function ProfileScreen() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center gap-2 bg-[#FAF9F4]">
      <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center">
        <User size={26} className="text-green-600" />
      </div>
      <div className="font-extrabold text-sm">Your profile</div>
      <div className="text-xs text-gray-500">Coming soon</div>
    </div>
  );
}
