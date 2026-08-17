import { useTranslation } from "react-i18next";

const LANGUAGES = [
  { code: "en", label: "EN" },
  { code: "hr", label: "HR" },
];

function LanguageSwitcher() {
  const { i18n } = useTranslation();

  return (
    <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden text-sm">
      {LANGUAGES.map(({ code, label }) => (
        <button
          key={code}
          type="button"
          onClick={() => i18n.changeLanguage(code)}
          className={`px-3 py-1.5 transition-colors ${
            i18n.resolvedLanguage === code
              ? "bg-blue-600 text-white"
              : "text-gray-600 hover:bg-gray-50"
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}

export default LanguageSwitcher;
