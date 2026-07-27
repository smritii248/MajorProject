const COLORS = {
  green: "bg-green-100 text-green-700",
  blue: "bg-blue-100 text-blue-700",
  orange: "bg-orange-100 text-orange-700",
  purple: "bg-purple-100 text-purple-700",
};

export default function StatCard({ value, label, color = "green" }) {
  return (
    <div className={`rounded-xl py-3 flex flex-col items-center ${COLORS[color]}`}>
      <div className="text-base font-extrabold">{value}</div>
      <div className="text-[10px] text-center leading-tight mt-0.5">{label}</div>
    </div>
  );
}
