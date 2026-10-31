import { useState } from 'react';
import { Activity, Radio, AlertTriangle, ShieldCheck, RefreshCw, Cpu, Wifi } from 'lucide-react';

export default function AirSentinelMockup() {
  const [isAnomalyActive, setIsAnomalyActive] = useState(false);
  const [selectedStation, setSelectedStation] = useState<'community' | 'official'>('community');

  // CPCB AQI Calculation details
  const officialAqi = 142; // Moderate (Amber)
  const communityAqi = isAnomalyActive ? 284 : 158; // Anomaly: Poor (Orange) vs normal Moderate
  const divergence = Math.abs(communityAqi - officialAqi);
  const isDivergent = divergence > 25;

  const getAqiColor = (aqi: number) => {
    if (aqi <= 50) return { bg: 'bg-emerald-500/10', border: 'border-emerald-500/40', text: 'text-emerald-400', label: 'Good' };
    if (aqi <= 100) return { bg: 'bg-green-500/10', border: 'border-green-500/40', text: 'text-green-400', label: 'Satisfactory' };
    if (aqi <= 200) return { bg: 'bg-amber-500/10', border: 'border-amber-500/40', text: 'text-amber-400', label: 'Moderate' };
    if (aqi <= 300) return { bg: 'bg-orange-500/10', border: 'border-orange-500/40', text: 'text-orange-400', label: 'Poor' };
    if (aqi <= 400) return { bg: 'bg-red-500/10', border: 'border-red-500/40', text: 'text-red-400', label: 'Very Poor' };
    return { bg: 'bg-purple-500/10', border: 'border-purple-500/40', text: 'text-purple-400', label: 'Severe' };
  };

  const commColor = getAqiColor(communityAqi);
  const offColor = getAqiColor(officialAqi);

  return (
    <div className="w-full rounded-2xl bg-[#090a0f] border border-zinc-300/80 dark:border-white/[0.09] overflow-hidden text-xs shadow-2xl font-mono">
      {/* Sleek Workstation Window Header */}
      <div className="bg-[#101118] px-4 py-3 border-b border-white/[0.06] flex flex-wrap items-center justify-between gap-3 font-sans">
        <div className="flex items-center gap-3">
          {/* Subtle Window Dots */}
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-zinc-700"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-zinc-700"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-zinc-700"></span>
          </div>

          <div className="flex items-center gap-2 pl-2 border-l border-white/[0.08]">
            <span className="font-semibold text-zinc-200 tracking-wide text-xs">
              AirSentinel Live Spatial Telemetry
            </span>
            <span className="text-[10px] bg-violet-500/10 text-violet-300 border border-violet-500/25 px-2 py-0.5 rounded font-mono">
              PostGIS ST_DWithin: 300m
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 font-mono">
          <div className="flex items-center gap-1.5 text-[10px] text-zinc-400 bg-zinc-900 px-2.5 py-1 rounded border border-white/[0.06]">
            <Wifi className="w-3 h-3 text-emerald-400" />
            <span>ESP32 BLE GATT 1Hz</span>
          </div>

          <button
            onClick={() => setIsAnomalyActive(!isAnomalyActive)}
            className={`px-3 py-1 rounded text-[11px] font-mono transition-all flex items-center gap-1.5 cursor-pointer ${
              isAnomalyActive
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm'
                : 'bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700'
            }`}
          >
            <RefreshCw className={`w-3 h-3 ${isAnomalyActive ? 'animate-spin' : ''}`} />
            {isAnomalyActive ? 'Reset Baseline' : 'Simulate Micro-Spike'}
          </button>
        </div>
      </div>

      {/* Main Grid: Spatial Map View & Sensor Analytics */}
      <div className="grid grid-cols-1 md:grid-cols-12 min-h-[300px]">
        {/* Left: Spatial Radar & Station Network */}
        <div className="md:col-span-7 p-5 bg-[#08090d] relative border-b md:border-b-0 md:border-r border-white/[0.06] flex flex-col justify-between overflow-hidden">
          {/* Spatial Grid Backdrop */}
          <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none"></div>

          {/* Coordinate Header */}
          <div className="relative z-10 flex justify-between items-center text-[10px] text-zinc-500">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-violet-400"></span>
              SECTOR: 19.1075° N, 72.8372° E (DJSCE Mumbai)
            </span>
            <span className="text-violet-400 font-medium">PostGIS Geography Index</span>
          </div>

          {/* Radar / Spatial Canvas Area */}
          <div className="relative z-10 my-4 h-44 flex items-center justify-center">
            {/* 300m Spatial Radius Ring with subtle radial glow */}
            <div className="absolute w-40 h-40 rounded-full border border-dashed border-violet-500/40 bg-violet-500/[0.03] flex items-center justify-center">
              <span className="absolute -top-3 text-[9px] text-violet-300 bg-[#08090d] px-2 py-0.5 border border-violet-500/20 rounded-full font-mono">
                300m Validation Buffer
              </span>
            </div>

            {/* Official Station Marker */}
            <button
              onClick={() => setSelectedStation('official')}
              className={`absolute top-6 left-10 p-2.5 rounded-xl border transition-all text-left cursor-pointer group backdrop-blur-md ${
                selectedStation === 'official'
                  ? 'bg-zinc-900 border-violet-400 text-white ring-1 ring-violet-500/40 shadow-xl'
                  : 'bg-[#101118]/90 border-zinc-800 text-zinc-300 hover:border-zinc-600'
              }`}
            >
              <div className="flex items-center gap-1.5">
                <Radio className="w-3.5 h-3.5 text-blue-400" />
                <span className="text-[11px] font-sans font-medium text-zinc-200">Official CPCB Ground</span>
              </div>
              <div className="text-[10px] text-zinc-400 mt-1">
                AQI: <span className="font-bold text-amber-400 font-mono">{officialAqi}</span> ({offColor.label})
              </div>
            </button>

            {/* Spatial Divergence Connector Line */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              <line
                x1="28%"
                y1="28%"
                x2="72%"
                y2="72%"
                stroke={isDivergent ? '#f97316' : '#8b5cf6'}
                strokeWidth="1.8"
                strokeDasharray="4 4"
                className={isDivergent ? 'animate-pulse' : ''}
              />
            </svg>

            {/* Community Wearable Sensor Marker */}
            <button
              onClick={() => setSelectedStation('community')}
              className={`absolute bottom-6 right-8 p-2.5 rounded-xl border transition-all text-left cursor-pointer group backdrop-blur-md ${
                selectedStation === 'community'
                  ? 'bg-zinc-900 border-violet-400 text-white ring-1 ring-violet-500/40 shadow-xl'
                  : 'bg-[#101118]/90 border-zinc-800 text-zinc-300 hover:border-zinc-600'
              }`}
            >
              <div className="flex items-center gap-1.5">
                <Activity className="w-3.5 h-3.5 text-violet-400" />
                <span className="text-[11px] font-sans font-medium text-zinc-200">ESP32 Wearable Node</span>
              </div>
              <div className="text-[10px] text-zinc-400 mt-1">
                AQI: <span className={`font-bold font-mono ${commColor.text}`}>{communityAqi}</span> ({commColor.label})
              </div>
            </button>
          </div>

          {/* Spatial Distance & Divergence Footer */}
          <div className="relative z-10 pt-3 border-t border-white/[0.05] flex items-center justify-between text-[11px]">
            <div className="flex items-center gap-1.5 text-zinc-400">
              <span>Euclidean Separation:</span>
              <span className="text-zinc-100 font-bold font-mono">184.2m</span>
              <span className="text-[9px] text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">
                &lt; 300m (Validated)
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-zinc-500">Divergence:</span>
              <span className={`font-bold font-mono ${isDivergent ? 'text-orange-400' : 'text-zinc-200'}`}>
                Δ {divergence} pts
              </span>
            </div>
          </div>
        </div>

        {/* Right: Isolation Forest ML & Sensor Channels */}
        <div className="md:col-span-5 p-5 bg-[#0b0c12] flex flex-col justify-between space-y-4">
          <div className="space-y-4">
            <div>
              <div className="text-[10px] text-zinc-500 uppercase tracking-wider font-semibold flex items-center justify-between">
                <span>Machine Learning Evaluation</span>
                <span className="text-violet-400 flex items-center gap-1">
                  <Cpu className="w-3 h-3" /> scikit-learn
                </span>
              </div>

              <div className="mt-2 flex items-center gap-2">
                {isDivergent ? (
                  <div className="flex items-center gap-1.5 text-orange-400 font-semibold text-xs bg-orange-500/10 px-2.5 py-1 rounded-md border border-orange-500/20">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    <span>SPATIAL DIVERGENCE ANOMALY</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-1.5 text-emerald-400 font-semibold text-xs bg-emerald-500/10 px-2.5 py-1 rounded-md border border-emerald-500/20">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>ROLLING 48H BASELINE NOMINAL</span>
                  </div>
                )}
              </div>

              <p className="text-[11px] text-zinc-400 mt-2 leading-relaxed font-sans">
                {isDivergent
                  ? 'Spatial divergence exceeds the 25 AQI threshold within 300m radius. Telemetry flagged for local micro-climate validation.'
                  : 'Sensors align with official CPCB baseline within 95% confidence bounds over rolling 48-hour window.'}
              </p>
            </div>

            {/* Metric Bars */}
            <div className="space-y-3 pt-3 border-t border-white/[0.06]">
              <div>
                <div className="flex justify-between text-[11px] text-zinc-400 mb-1 font-mono">
                  <span>PM2.5 Concentration</span>
                  <span className="text-zinc-100 font-bold">{isAnomalyActive ? '138.4 µg/m³' : '62.1 µg/m³'}</span>
                </div>
                <div className="h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-500 rounded-full ${isAnomalyActive ? 'w-4/5 bg-orange-500' : 'w-2/5 bg-amber-400'}`}
                  ></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[11px] text-zinc-400 mb-1 font-mono">
                  <span>PM10 Particulate</span>
                  <span className="text-zinc-100 font-bold">{isAnomalyActive ? '210.8 µg/m³' : '114.5 µg/m³'}</span>
                </div>
                <div className="h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-500 rounded-full ${isAnomalyActive ? 'w-3/4 bg-orange-500' : 'w-1/3 bg-amber-400'}`}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          {/* System Spec Footer */}
          <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between text-[10px] text-zinc-500">
            <span>FastAPI • PostgreSQL • PostGIS</span>
            <span className="text-violet-400">India CPCB 6-Category Standard</span>
          </div>
        </div>
      </div>
    </div>
  );
}
