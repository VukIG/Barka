import { useMemo, useState } from "react";
import {
  demandByRange,
  traffic,
  RANGE_LABELS,
  darkTooltip,
} from "../data/mockData";
import { Anchor, ArrowRight, Sparkles, Utensils, CalendarClock, Target, Landmark } from "lucide-react";
import Map from "../components/Map";
import {RankViz,BarsViz, DonutViz, GaugeViz} from "../utils/Visualisations"

function BusinessDashboard() {
  const [range, setRange] = useState("Danas");
  const [activePort, setActivePort] = useState(
    traffic.find((p) => p.name === "Split") ?? traffic[0],
  );

  const data = useMemo(() => demandByRange[range], [range]);

  return (
    <div className="relative overflow-hidden bg-[#06141d] text-white selection:bg-[#bff2ed] selection:text-[#06141d]">
      <style>{`
        @keyframes fadeUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .fade-up { animation: fadeUp .6s ease-out both; }
        @keyframes vizGrow { from { transform: scaleY(0); } to { transform: scaleY(1); } }
      @keyframes vizGrowX { from { width: 0; } }
      .viz-grow { animation: vizGrow .7s ease-out both; }
      .viz-grow-x { animation: vizGrowX .8s ease-out both; }
      `}</style>

      {/* Soft background glows */}
      <div className="pointer-events-none absolute left-[-10%] top-[-20%] h-[50%] w-[50%] rounded-full bg-[#1e4e62] opacity-40 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-[-10%] right-[-10%] h-[40%] w-[40%] rounded-full bg-[#0d848a] opacity-20 blur-[100px]" />

      <div className="relative z-10 mx-auto max-w-5xl px-4 py-12">
        {/* Hero */}
        <section className="mb-12 max-w-3xl">
        
          <h2 className="text-4xl font-black leading-[1.1] tracking-tight sm:text-5xl">
            Turn boat traffic into{" "}
            <span className="bg-gradient-to-r from-[#53d8fb] to-[#ffbf69] bg-clip-text text-transparent">
              revenue
            </span>
          </h2>
          <p className="mt-5 max-w-xl text-base text-[#8dced2]">
            Live, GDPR-compliant signals on arrivals and demand. Ready for
            restaurants, port authorities, and tourist agencies.
          </p>
          
        </section>


      {/* Who it's for */}
<section className="fade-up mb-6">

  <div className="mt-8 grid gap-5 md:grid-cols-2">
    {/* Restaurants */}
    <article className="group rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-md transition-colors hover:border-[#53d8fb]/40">
      <div className="flex items-center gap-3">
        <span className="grid h-10 w-10 place-items-center rounded-xl bg-[#53d8fb]/10 text-[#53d8fb]">
          <Utensils className="h-5 w-5" />
        </span>
        <h3 className="text-lg font-bold">Restaurants</h3>
      </div>
      <p className="mt-3 text-sm text-[#8dced2]">
        Know when the crowds land. See arrival surges near your tables and push an offer the moment boats dock.
      </p>
      <div className="mt-5">
        <p className="mb-2 text-[10px] uppercase tracking-[0.14em] text-[#6f9aa2]">Arrivals by hour</p>
        <BarsViz
          peakIndex={4}
          data={[
            { label: "10", value: 22 }, { label: "12", value: 40 },
            { label: "14", value: 33 }, { label: "16", value: 48 },
            { label: "18", value: 68 }, { label: "20", value: 54 },
          ]}
        />
      </div>
    </article>

    {/* Tourist agencies */}
    <article className="group rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-md transition-colors hover:border-[#53d8fb]/40">
      <div className="flex items-center gap-3">
        <span className="grid h-10 w-10 place-items-center rounded-xl bg-[#ffbf69]/10 text-[#ffbf69]">
          <CalendarClock className="h-5 w-5" />
        </span>
        <h3 className="text-lg font-bold">Tourist agencies</h3>
      </div>
      <p className="mt-3 text-sm text-[#8dced2]">
        Schedule smarter than the competition. Build efficient timetables and see which routes are heating up.
      </p>
      <div className="mt-5">
        <p className="mb-2 text-[10px] uppercase tracking-[0.14em] text-[#6f9aa2]">Top routes by demand</p>
        <RankViz
          data={[
            { label: "Split → Hvar", value: 92 },
            { label: "Dubrovnik → Kotor", value: 74 },
            { label: "Zadar → Pag", value: 58 },
            { label: "Pula → Rovinj", value: 41 },
          ]}
        />
      </div>
    </article>

    {/* Tech companies */}
    <article className="group rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-md transition-colors hover:border-[#53d8fb]/40">
      <div className="flex items-center gap-3">
        <span className="grid h-10 w-10 place-items-center rounded-xl bg-[#a78bfa]/10 text-[#a78bfa]">
          <Target className="h-5 w-5" />
        </span>
        <h3 className="text-lg font-bold">Tech &amp; ad platforms</h3>
      </div>
      <p className="mt-3 text-sm text-[#8dced2]">
        Ads that read the tide. Feed live visitor signals into your stack for sharper, GDPR-safe personalization.
      </p>
      <div className="mt-5">
        <p className="mb-2 text-[10px] uppercase tracking-[0.14em] text-[#6f9aa2]">Visitor segments</p>
        <DonutViz
          segments={[
            { label: "Day-trippers", value: 44, color: "#53d8fb" },
            { label: "Overnight", value: 33, color: "#ffbf69" },
            { label: "Luxury charter", value: 23, color: "#ff735c" },
          ]}
        />
      </div>
    </article>

      {/* Government / port authorities */}
      <article className="group rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-md transition-colors hover:border-[#53d8fb]/40">
        <div className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-[#ff735c]/10 text-[#ff735c]">
            <Landmark className="h-5 w-5" />
          </span>
          <h3 className="text-lg font-bold">Government &amp; port authorities</h3>
        </div>
        <p className="mt-3 text-sm text-[#8dced2]">
          Oversee the coast in real time. Track congestion, cross-border flows, and capacity from one live view.
        </p>
        <div className="mt-5 flex items-center justify-between gap-4">
          <GaugeViz value={78} label="Peak port capacity" />
          <div className="text-right">
            <p className="text-2xl font-black text-white">1,240</p>
            <p className="text-[11px] text-[#8dced2]">cross-border trips / week</p>
          </div>
        </div>
      </article>
    </div>
  </section>
  
        {/* Map */}
        <section className="fade-up mb-6">
         <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-2xl backdrop-blur-md">
            <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">
              <div>
                <h2 className="mt-1 text-xl font-bold tracking-[-0.02em]">
                  Boat traffic heatmap
                </h2>
              </div>
              <div className="flex items-center gap-3 text-xs text-[#c5dfe0]">
                <span className="flex items-center gap-1.5">
                  <i className="h-2 w-2 rounded-full bg-[#53d8fb]" /> moderate
                </span>
                <span className="flex items-center gap-1.5">
                  <i className="h-2 w-2 rounded-full bg-[#ffbf69]" /> high
                </span>
                <span className="flex items-center gap-1.5">
                  <i className="h-2 w-2 rounded-full bg-[#ff735c]" /> peak
                </span>
              </div>
            </div>
            <div className="relative h-[500px] overflow-hidden bg-[#0b3141]">
              <div className="pointer-events-none absolute bottom-4 left-4 z-10 rounded-xl border border-white/15 bg-[#0c2834]/90 p-3.5 backdrop-blur">
                <p className="text-[10px] uppercase tracking-[.14em] text-[#8dced2]">
                  Selected port
                </p>
                <p className="mt-1 text-lg font-bold">{activePort.name}</p>
                <p className="mt-1 text-sm text-[#cfdfdf]">
                  <span
                    className="font-semibold"
                    style={{ color: activePort.color }}
                  >
                    {activePort.boats} boats
                  </span>
                </p>
              </div>
              <Map ports={traffic} onPortSelect={setActivePort} />

            </div>
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
import { format } from "maplibre-gl";

export default BusinessDashboard;
