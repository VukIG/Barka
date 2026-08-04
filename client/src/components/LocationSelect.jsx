import { MapPin, ChevronDown } from "lucide-react";

function LocationSelect({
  label,
  value,
  placeholder,
  options,
  isOpen,
  onToggle,
  onSelect,
}) {
  return (
    <div className="relative">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        <MapPin className="w-4 h-4 inline mr-1" />
        {label}
      </label>

      <div
        onClick={onToggle}
        className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-900 cursor-pointer flex items-center justify-between"
      >
        <span className={value ? "" : "text-gray-400"}>
          {value || placeholder}
        </span>
        <ChevronDown
          className={`w-4 h-4 text-gray-500 transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </div>

      {isOpen && (
        <div className="absolute top-full left-0 z-20 mt-1 w-full max-h-60 overflow-auto bg-white border border-gray-300 rounded-lg shadow-lg">
          {options.map((option) => (
            <div
              key={option}
              onClick={() => onSelect(option)}
              className="px-4 py-2 hover:bg-blue-50 cursor-pointer"
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default LocationSelect;
