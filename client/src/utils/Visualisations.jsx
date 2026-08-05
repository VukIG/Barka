import {
  Anchor,
  ArrowRight,
  Sparkles,
  Utensils,
  CalendarClock,
  Target,
  Landmark,
} from "lucide-react";

export function BarsViz({
  data,
  peakIndex,
  accent = "#ffbf69",
  base = "#2b6b7a",
}) {
  const max = Math.max(...data.map((d) => d.value));
  return (
    <svg viewBox="0 0 200 72" className="w-full">
      {data.map((d, i) => {
        const h = (d.value / max) * 52;
        const x = 8 + i * (184 / data.length);
        const w = 184 / data.length - 6;
        return (
          <g key={d.label}>
            <rect
              x={x}
              y={60 - h}
              width={w}
              height={h}
              rx="2"
              fill={i === peakIndex ? accent : base}
              className="viz-grow"
              style={{
                transformOrigin: `${x + w / 2}px 60px`,
                animationDelay: `${i * 60}ms`,
              }}
            />
            <text
              x={x + w / 2}
              y={70}
              fontSize="6"
              textAnchor="middle"
              fill="#6f9aa2"
            >
              {d.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

export function RankViz({ data, accent = "#53d8fb" }) {
  const max = Math.max(...data.map((d) => d.value));
  return (
    <div className="space-y-2.5">
      {data.map((d, i) => (
        <div key={d.label} className="flex items-center gap-3">
          <span className="w-24 shrink-0 text-[11px] text-[#a9cdd2]">
            {d.label}
          </span>
          <div className="h-2 flex-1 overflow-hidden rounded-full bg-white/5">
            <div
              className="viz-grow-x h-full rounded-full"
              style={{
                width: `${(d.value / max) * 100}%`,
                background: `linear-gradient(90deg, ${accent}, #ffbf69)`,
                animationDelay: `${i * 80}ms`,
              }}
            />
          </div>
          <span className="w-8 shrink-0 text-right text-[11px] font-semibold text-white/90">
            {d.value}
          </span>
        </div>
      ))}
    </div>
  );
}

export function DonutViz({ segments }) {
  const total = segments.reduce((s, x) => s + x.value, 0);
  let offset = 0;
  const R = 26,
    C = 2 * Math.PI * R;
  return (
    <div className="flex items-center gap-4">
      <svg viewBox="0 0 72 72" className="h-24 w-24 -rotate-90">
        {segments.map((s) => {
          const len = (s.value / total) * C;
          const seg = (
            <circle
              key={s.label}
              cx="36"
              cy="36"
              r={R}
              fill="none"
              stroke={s.color}
              strokeWidth="9"
              strokeDasharray={`${len} ${C - len}`}
              strokeDashoffset={-offset}
            />
          );
          offset += len;
          return seg;
        })}
      </svg>
      <ul className="space-y-1.5 text-[11px]">
        {segments.map((s) => (
          <li key={s.label} className="flex items-center gap-2 text-[#c5dfe0]">
            <i
              className="h-2 w-2 rounded-full"
              style={{ background: s.color }}
            />
            {s.label}
            <span className="font-semibold text-white/90">{s.value}%</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function GaugeViz({ value, label }) {
  const R = 40,
    C = Math.PI * R; // half circle
  const filled = (value / 100) * C;
  return (
    <div className="flex flex-col items-center">
      <svg viewBox="0 0 100 56" className="w-36">
        <path
          d="M10 50 A40 40 0 0 1 90 50"
          fill="none"
          stroke="#173a45"
          strokeWidth="8"
          strokeLinecap="round"
        />
        <path
          d="M10 50 A40 40 0 0 1 90 50"
          fill="none"
          stroke="#ff735c"
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={`${filled} ${C}`}
        />
        <text
          x="50"
          y="46"
          textAnchor="middle"
          fontSize="16"
          fontWeight="800"
          fill="#fff"
        >
          {value}%
        </text>
      </svg>
      <span className="text-[11px] text-[#8dced2]">{label}</span>
    </div>
  );
}
