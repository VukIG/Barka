import { useMemo, useState } from "react";
import { demandByRange, traffic, RANGE_LABELS, darkTooltip } from "../data/mockData";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Anchor, ArrowRight, Sparkles } from "lucide-react";

import Map from "../components/Map";

function BusinessDashboard() {
  const [range, setRange] = useState("Danas");
  const [activePort, setActivePort] = useState(
    traffic.find((p) => p.name === "Split") ?? traffic[0]
  );

  const data = useMemo(() => demandByRange[range], [range]);

  return (
    <div className="relative overflow-hidden bg-[#06141d] text-white selection:bg-[#bff2ed] selection:text-[#06141d]">
      <style>{`
        @keyframes fadeUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .fade-up { animation: fadeUp .6s ease-out both; }
      `}</style>

      {/* Soft background glows */}
      <div className="pointer-events-none absolute left-[-10%] top-[-20%] h-[50%] w-[50%] rounded-full bg-[#1e4e62] opacity-40 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-[-10%] right-[-10%] h-[40%] w-[40%] rounded-full bg-[#0d848a] opacity-20 blur-[100px]" />

      <div className="relative z-10 mx-auto max-w-5xl px-4 py-12">

        {/* Hero */}
        <section className="mb-12 max-w-3xl">
          <p className="mb-3 text-xs uppercase tracking-[0.2em] text-[#53d8fb]">
            Data platform for the Adriatic coast
          </p>
          <h2 className="text-4xl font-black leading-[1.1] tracking-tight sm:text-5xl">
            Turn boat traffic into{" "}
            <span className="bg-gradient-to-r from-[#53d8fb] to-[#ffbf69] bg-clip-text text-transparent">
              revenue
            </span>
          </h2>
          <p className="mt-5 max-w-xl text-base text-[#8dced2]">
            Live, GDPR-compliant signals on arrivals and demand — ready for
            restaurants, port authorities, and tourist agencies.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <button className="flex items-center gap-2 rounded-full bg-white px-6 py-3 font-bold text-[#06141d] transition-all hover:bg-[#e8f6f8]">
              Contact us <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </section>

        {/* Map */}
        <section className="fade-up mb-6">
          <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-2xl backdrop-blur-md">
            <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">
              <div>
                <p className="text-[10px] uppercase tracking-[0.16em] text-[#53d8fb]">
                  Live data
                </p>
                <h2 className="mt-1 text-xl font-bold tracking-[-0.02em]">
                  Boat traffic heatmap
                </h2>
              </div>
              <div className="flex items-center gap-3 text-xs text-[#c5dfe0]">
                <span className="flex items-center gap-1.5"><i className="h-2 w-2 rounded-full bg-[#53d8fb]" /> moderate</span>
                <span className="flex items-center gap-1.5"><i className="h-2 w-2 rounded-full bg-[#ffbf69]" /> high</span>
                <span className="flex items-center gap-1.5"><i className="h-2 w-2 rounded-full bg-[#ff735c]" /> peak</span>
              </div>
            </div>

            <div className="relative h-[500px] overflow-hidden bg-[#0b3141]">
              <div className="pointer-events-none absolute bottom-4 left-4 z-10 rounded-xl border border-white/15 bg-[#0c2834]/90 p-3.5 backdrop-blur">
                <p className="text-[10px] uppercase tracking-[.14em] text-[#8dced2]">
                  Selected port
                </p>
                <p className="mt-1 text-lg font-bold">{activePort.name}</p>
                <p className="mt-1 text-sm text-[#cfdfdf]">
                  <span className="font-semibold" style={{ color: activePort.color }}>
                    {activePort.boats} boats
                  </span>
                </p>
              </div>

              <Map ports={traffic} onPortSelect={setActivePort} />
            </div>
          </div>
        </section>

        {/* Demand chart */}
        <section className="fade-up mb-6 rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-md sm:p-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="text-[10px] uppercase tracking-[.15em] text-[#53d8fb]">
                Demand pulse
              </p>
              <h2 className="mt-1 text-xl font-bold tracking-[-.02em]">
                Guests heading for the islands
              </h2>
            </div>
            <div className="flex rounded-lg border border-white/10 bg-white/10 p-1">
              {Object.keys(demandByRange).map((item) => (
                <button
                  key={item}
                  onClick={() => setRange(item)}
                  className={`rounded-md px-4 py-2 text-xs font-bold transition-all ${
                    range === item
                      ? "bg-[#278c91] text-white shadow-lg"
                      : "text-[#8dced2] hover:bg-white/5 hover:text-white"
                  }`}
                >
                  {RANGE_LABELS[item] ?? item}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6 h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="fill-actual" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="#53d8fb" stopOpacity=".5" />
                    <stop offset="100%" stopColor="#53d8fb" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <CartesianGrid vertical={false} stroke="#ffffff" strokeOpacity={0.05} strokeDasharray="3 4" />
                <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fill: "#8dced2", fontSize: 12 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: "#8dced2", fontSize: 12 }} />
                <Tooltip contentStyle={darkTooltip} itemStyle={{ color: "#53d8fb" }} />
                <Area type="monotone" dataKey="forecast" stroke="#ffbf69" strokeDasharray="5 5" strokeWidth={2} fill="none" name="Forecast" />
                <Area type="monotone" dataKey="actual" stroke="#53d8fb" strokeWidth={3} fill="url(#fill-actual)" name="Actual" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </section>

        {/* Closing CTA */}
        <section className="mt-6 overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-8 text-center backdrop-blur-md sm:p-12">
          <h2 className="mx-auto max-w-2xl text-3xl font-black tracking-tight sm:text-4xl">
            Ready to turn traffic into revenue?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-[#8dced2]">
            Book a demo and see live signals for your coast.
          </p>
          <button className="mx-auto mt-7 flex items-center gap-2 rounded-full bg-gradient-to-r from-[#278c91] to-[#167078] px-8 py-3.5 font-bold shadow-[0_0_20px_rgba(39,140,145,0.4)] transition-all hover:from-[#30a7ad] hover:to-[#1a858f]">
            Contact us
          </button>
        </section>
      </div>
    </div>
  );
}

export default BusinessDashboard;