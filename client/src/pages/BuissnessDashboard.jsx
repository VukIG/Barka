import { useState } from "react";
import { traffic } from "../data/mockData";
import Map from "../components/Map";

function BusinessDashboard() {
  const [activePort, setActivePort] = useState(
    traffic.find((p) => p.name === "Split") ?? traffic[0],
  );

  return (
    <div className="relative h-screen w-full overflow-hidden bg-[#06141d] text-white selection:bg-[#bff2ed] selection:text-[#06141d]">
      <style>{`
        @keyframes fadeUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .fade-up { animation: fadeUp .6s ease-out both; }
      `}</style>

      {/* Map fills the entire screen as the background */}
      <div className="absolute inset-0">
        <Map ports={traffic} onPortSelect={setActivePort} />
      </div>

      {/* Everything below is overlay-only, pointer-events-none as a group so
          drags/clicks pass through to the map underneath; only re-enable
          pointer events on something if it needs to be clickable itself. */}
      <div className="pointer-events-none absolute inset-0 z-10">
        {/* Corner gradient just behind the header so it stays legible, without
            washing out the rest of the map */}
        <div className="absolute left-0 top-0 h-[28rem] w-full max-w-2xl bg-gradient-to-br from-[#06141d]/90 via-[#06141d]/45 to-transparent" />

        {/* Header, top-left corner, bigger */}
        <div className="fade-up absolute left-6 top-6 max-w-2xl sm:left-10 sm:top-10">
          <h1 className="text-6xl font-black leading-[1.02] tracking-tight sm:text-8xl">
            Turn boat traffic into{" "}
            <span className="bg-gradient-to-r from-[#53d8fb] to-[#ffbf69] bg-clip-text text-transparent">
              revenue
            </span>
          </h1>
          <p className="mt-6 max-w-xl text-xl text-[#8dced2]">
            Live, GDPR-compliant signals on arrivals and demand. Ready for
            restaurants, port authorities, and tourist agencies.
          </p>
        </div>

        {/* Selected port readout */}
        <div className="absolute bottom-20 left-6 rounded-xl border border-white/15 bg-[#0c2834]/90 p-4 backdrop-blur">
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

        {/* Heatmap legend */}
        <div className="absolute top-6 right-6 flex items-center gap-3 rounded-full border border-white/10 bg-[#0c2834]/80 px-4 py-2 text-xs text-[#c5dfe0] backdrop-blur">
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
    </div>
  );
}

export default BusinessDashboard;
