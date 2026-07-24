export default function Pill({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap ${
        active ? "bg-green-600 text-white" : "bg-gray-100 text-gray-600"
      }`}
    >
      {label}
    </button>
  );
}
