const COLORS = {
  green: "bg-green-100 text-green-700",
  orange: "bg-orange-100 text-orange-700",
  blue: "bg-blue-100 text-blue-700",
};

export default function Tag({ label, color = "green" }) {
  return (
    <span className={`px-2.5 py-1 rounded text-xs font-bold ${COLORS[color]}`}>
      {label}
    </span>
  );
}
