import { useState } from 'react';
import { Activity, Radio, AlertTriangle, ShieldCheck, RefreshCw } from 'lucide-react';

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
    <div className="w-full rounded-xl bg-[#0d0e12] border border-white/[0.08] overflow-hidden text-xs shadow-2xl font-mono">
      {/* Telemetry Header */}
      <div className="bg-[#13141a] px-4 py-3 border-b border-white/[0.06] flex flex-wrap items-center justify-between gap-3 font-sans">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="font-semibold text-zinc-200 tracking-wide text-xs">
            AirSentinel Telemetry v1.4
          </span>
          <span className="text-[10px] bg-violet-500/10 text-violet-300 border border-violet-500/30 px-1.5 py-0.5 rounded">
            PostGIS Active
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsAnomalyActive(!isAnomalyActive)}
            className={`px-2.5 py-1 rounded text-[11px] font-mono transition-all flex items-center gap-1.5 cursor-pointer ${
              isAnomalyActive
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm'
                : 'bg-zinc-800 hover:bg-zinc-700 text-zinc-300 border border-zinc-700'
            }`}
          >
            <RefreshCw className={`w-3 h-3 ${isAnomalyActive ? 'animate-spin' : ''}`} />
            {isAnomalyActive ? 'Reset Anomaly' : 'Simulate Micro-Spike'}
          </button>
        </div>
      </div>

      {/* Main Grid: Spatial Map View & Sensor Analytics */}
      <div className="grid grid-cols-1 md:grid-cols-12 min-h-[290px]">
        {/* Left: Spatial Sensor Canvas (Simulated Radar / Map) */}
        <div className="md:col-span-7 p-4 bg-[#0a0b0e] relative border-b md:border-b-0 md:border-r border-white/[0.06] flex flex-col justify-between overflow-hidden">
          {/* Spatial Grid Backdrop */}
          <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none"></div>

          {/* Coordinate Watermark */}
          <div className="relative z-10 flex justify-between items-center text-[10px] text-zinc-500">
            <span>DJSCE SECTOR [19.1075° N, 72.8372° E]</span>
            <span className="text-violet-400 font-medium">ST_DWithin Radius: 300m</span>
          </div>

          {/* Radar / Spatial Canvas Area */}
          <div className="relative z-10 my-4 h-40 flex items-center justify-center">
            {/* 300m Spatial Radius Ring */}
            <div className="absolute w-36 h-36 rounded-full border border-dashed border-violet-500/30 bg-violet-500/[0.02] flex items-center justify-center">
              <span className="absolute -top-3 text-[9px] text-violet-400/80 bg-[#0a0b0e] px-1 border border-violet-500/20 rounded">
                300m Buffer
              </span>
            </div>

            {/* Official Station Marker */}
            <button
              onClick={() => setSelectedStation('official')}
              className={`absolute top-8 left-12 p-2 rounded-lg border transition-all text-left cursor-pointer group ${
                selectedStation === 'official'
                  ? 'bg-zinc-800 border-violet-400 text-white ring-1 ring-violet-500/40 shadow-lg'
                  : 'bg-zinc-900/90 border-zinc-700/80 text-zinc-300 hover:border-zinc-500'
              }`}
            >
              <div className="flex items-center gap-1.5">
                <Radio className="w-3.5 h-3.5 text-blue-400" />
                <span className="text-[10px] font-sans font-medium">CPCB Station 04</span>
              </div>
              <div className="text-[10px] text-zinc-400 mt-0.5">
                AQI: <span className="font-bold text-amber-400">{officialAqi}</span> ({offColor.label})
              </div>
            </button>

            {/* Spatial Divergence Connector Line */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              <line
                x1="32%"
                y1="32%"
                x2="65%"
                y2="65%"
                stroke={isDivergent ? '#f97316' : '#8b5cf6'}
                strokeWidth="1.5"
                strokeDasharray="4 3"
                className={isDivergent ? 'animate-pulse' : ''}
              />
            </svg>

            {/* Community Wearable Sensor Marker */}
            <button
              onClick={() => setSelectedStation('community')}
              className={`absolute bottom-6 right-10 p-2 rounded-lg border transition-all text-left cursor-pointer group ${
                selectedStation === 'community'
                  ? 'bg-zinc-800 border-violet-400 text-white ring-1 ring-violet-500/40 shadow-lg'
                  : 'bg-zinc-900/90 border-zinc-700/80 text-zinc-300 hover:border-zinc-500'
              }`}
            >
              <div className="flex items-center gap-1.5">
                <Activity className="w-3.5 h-3.5 text-violet-400" />
                <span className="text-[10px] font-sans font-medium">ESP32 Wearable Node</span>
              </div>
              <div className="text-[10px] text-zinc-400 mt-0.5">
                AQI: <span className={`font-bold ${commColor.text}`}>{communityAqi}</span> ({commColor.label})
              </div>
            </button>
          </div>

          {/* Spatial Distance & Divergence Footer */}
          <div className="relative z-10 pt-2 border-t border-white/[0.04] flex items-center justify-between text-[11px]">
            <div className="flex items-center gap-1.5 text-zinc-400">
              <span>Separation:</span>
              <span className="text-zinc-200 font-bold">184.2m</span>
              <span className="text-[9px] text-emerald-400 bg-emerald-500/10 px-1 rounded">&lt; 300m (Valid)</span>
            </div>
            <div className="flex items-center gap-1">
              <span>Δ AQI:</span>
              <span className={`font-bold ${isDivergent ? 'text-orange-400' : 'text-zinc-300'}`}>
                {divergence} pts
              </span>
            </div>
          </div>
        </div>

        {/* Right: Telemetry & Machine Learning Status */}
        <div className="md:col-span-5 p-4 bg-[#0d0e12] flex flex-col justify-between">
          <div className="space-y-3">
            <div>
              <div className="text-[10px] text-zinc-500 uppercase tracking-wider font-semibold">
                Isolation Forest Evaluator
              </div>
              <div className="mt-1 flex items-center gap-1.5">
                {isDivergent ? (
                  <div className="flex items-center gap-1.5 text-orange-400 font-medium">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    <span>DIVERGENCE ANOMALY DETECTED</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-1.5 text-emerald-400 font-medium">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>SYNCHRONIZED & NOMINAL</span>
                  </div>
                )}
              </div>
              <p className="text-[10px] text-zinc-400 mt-1 leading-relaxed">
                {isDivergent
                  ? 'Spatial divergence exceeds 25 AQI threshold within 300m radius. Telemetry flagged for local micro-climate validation.'
                  : 'Readings match official CPCB baseline within confidence bounds over rolling 48-hour window.'}
              </p>
            </div>

            {/* Metric Bars */}
            <div className="space-y-2 pt-2 border-t border-white/[0.06]">
              <div>
                <div className="flex justify-between text-[10px] text-zinc-400 mb-1">
                  <span>PM2.5 Concentration</span>
                  <span className="text-zinc-200 font-bold">{isAnomalyActive ? '138.4 µg/m³' : '62.1 µg/m³'}</span>
                </div>
                <div className="h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-500 ${isAnomalyActive ? 'w-4/5 bg-orange-500' : 'w-2/5 bg-amber-400'}`}
                  ></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[10px] text-zinc-400 mb-1">
                  <span>PM10 Particulate</span>
                  <span className="text-zinc-200 font-bold">{isAnomalyActive ? '210.8 µg/m³' : '114.5 µg/m³'}</span>
                </div>
                <div className="h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-500 ${isAnomalyActive ? 'w-3/4 bg-orange-500' : 'w-1/3 bg-amber-400'}`}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          {/* System Spec Footer */}
          <div className="mt-3 pt-2 border-t border-white/[0.06] flex items-center justify-between text-[10px] text-zinc-500">
            <span>FastAPI • PostgreSQL</span>
            <span className="text-violet-400">CPCB 6-Tier Compliant</span>
          </div>
        </div>
      </div>
    </div>
  );
}
