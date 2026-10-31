import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { soundManager } from '../utils/soundEffects';

export default function DesignEngineeringHUD() {
  const [zoomLevel, setZoomLevel] = useState(1);
  const [activeNode, setActiveNode] = useState<string>('spatial');

  const nodes = [
    {
      id: 'edge',
      title: '01. Edge BLE GATT',
      sub: 'ESP32 Telemetry',
      x: '10%',
      y: '30%',
      color: 'border-emerald-500/40 text-emerald-400 bg-emerald-500/10',
      detail: 'Broadcasts 1Hz binary packets containing PM2.5, PM10, Temp & Humidity via BLE GATT services.'
    },
    {
      id: 'stream',
      title: '02. FastAPI Gateway',
      sub: 'Async Batch Ingestion',
      x: '38%',
      y: '18%',
      color: 'border-violet-500/40 text-violet-400 bg-violet-500/10',
      detail: 'High-throughput Pydantic v2 validation pipeline handling burst telemetry with sub-millisecond latencies.'
    },
    {
      id: 'spatial',
      title: '03. PostGIS ST_DWithin',
      sub: 'Spatial Divergence 300m',
      x: '66%',
      y: '45%',
      color: 'border-violet-400 text-violet-300 bg-violet-600/20 ring-1 ring-violet-500/40',
      detail: 'Calculates spatial geography distance between community personal wearables and CPCB ground stations.'
    },
    {
      id: 'ml',
      title: '04. Isolation Forest',
      sub: 'Unsupervised ML Anomaly',
      x: '42%',
      y: '70%',
      color: 'border-amber-500/40 text-amber-300 bg-amber-500/10',
      detail: 'Detects multi-variate environmental spikes vs hardware sensor drift over rolling 48-hour windows.'
    }
  ];

  const handleZoomIn = () => {
    soundManager.playPop();
    setZoomLevel((prev) => Math.min(1.4, Math.round((prev + 0.15) * 100) / 100));
  };

  const handleZoomOut = () => {
    soundManager.playPop();
    setZoomLevel((prev) => Math.max(0.7, Math.round((prev - 0.15) * 100) / 100));
  };

  const handleFit = () => {
    soundManager.playClick();
    setZoomLevel(1);
  };

  const activeNodeData = nodes.find((n) => n.id === activeNode) || nodes[2];

  return (
    <div className="pt-8">
      <div className="p-6 sm:p-8 rounded-3xl bg-zinc-950 text-zinc-100 border border-zinc-800 shadow-2xl relative overflow-hidden font-mono">
        {/* Subtle architectural grid */}
        <div className="absolute inset-0 bg-grid-pattern opacity-25 pointer-events-none"></div>

        {/* HUD Top Bar */}
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 border-b border-white/[0.08] pb-4 font-sans">
          <div className="flex items-center gap-3">
            <div className="w-2.5 h-2.5 rounded-full bg-violet-400 animate-pulse"></div>
            <div>
              <h4 className="text-sm sm:text-base font-bold text-zinc-100">
                Interactive Systems Architecture Canvas
              </h4>
              <p className="text-[11px] text-zinc-400 font-mono">
                Live spatial pipeline telemetry graph • Click nodes to inspect layers
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 font-mono text-xs">
            <span className="text-[10px] bg-violet-500/15 text-violet-300 border border-violet-500/30 px-2.5 py-1 rounded-full">
              Multiplayer Spatial HUD
            </span>
          </div>
        </div>

        {/* Canvas Visual Stage with Collaborative Cursor */}
        <div className="relative z-10 my-6 h-72 sm:h-80 w-full rounded-2xl bg-[#08090d] border border-white/[0.06] overflow-hidden flex items-center justify-center">
          {/* Zoomable Container */}
          <div
            className="w-full h-full relative transition-transform duration-300 ease-out"
            style={{ transform: `scale(${zoomLevel})` }}
          >
            {/* SVG Connecting Spline Lines */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none stroke-violet-500/30">
              <line x1="22%" y1="36%" x2="44%" y2="28%" strokeWidth="1.5" strokeDasharray="4 4" />
              <line x1="52%" y1="28%" x2="70%" y2="50%" strokeWidth="1.5" />
              <line x1="70%" y1="58%" x2="55%" y2="76%" strokeWidth="1.5" strokeDasharray="4 4" />
              <line x1="42%" y1="76%" x2="22%" y2="44%" strokeWidth="1.5" />
            </svg>

            {/* Nodes */}
            {nodes.map((node) => {
              const isSelected = activeNode === node.id;
              return (
                <button
                  key={node.id}
                  onClick={() => {
                    soundManager.playClick();
                    setActiveNode(node.id);
                  }}
                  className={`absolute p-3 rounded-xl border text-left transition-all duration-200 cursor-pointer backdrop-blur-md shadow-lg ${
                    isSelected
                      ? 'bg-zinc-900 border-violet-400 text-white ring-2 ring-violet-500/40 z-20 scale-105'
                      : 'bg-zinc-900/80 border-white/[0.08] text-zinc-300 hover:border-zinc-500 z-10'
                  }`}
                  style={{ left: node.x, top: node.y }}
                >
                  <div className="text-[10px] font-bold uppercase tracking-wider text-violet-400">
                    {node.title}
                  </div>
                  <div className="text-xs font-semibold text-zinc-100 font-sans mt-0.5">
                    {node.sub}
                  </div>
                </button>
              );
            })}

            {/* Samay-style Collaborative Figma Cursor with Animated Floating Movement */}
            <div
              className="absolute pointer-events-none z-30 transition-all duration-1000 ease-in-out flex items-start"
              style={{
                left: activeNode === 'spatial' ? '68%' : activeNode === 'edge' ? '18%' : activeNode === 'stream' ? '46%' : '48%',
                top: activeNode === 'spatial' ? '56%' : activeNode === 'edge' ? '42%' : activeNode === 'stream' ? '30%' : '80%'
              }}
            >
              {/* Figma-style Orange SVG Pointer */}
              <svg viewBox="0 0 24 24" width="20" height="20" className="drop-shadow-md">
                <path
                  d="M4 3l16 7-7 2-3 7z"
                  fill="#7c3aed"
                  stroke="#ffffff"
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="bg-violet-600 text-white text-[10px] font-mono font-bold px-2 py-0.5 rounded-full ml-1 mt-3 shadow-md whitespace-nowrap">
                Anushka (Lead Dev)
              </span>
            </div>
          </div>

          {/* Samay-style Canvas Zoom Dock (Bottom Right) */}
          <div className="absolute bottom-3 right-3 z-30 flex items-center gap-1.5 p-1 rounded-xl bg-zinc-900/90 border border-white/[0.1] text-xs font-mono backdrop-blur-md shadow-md">
            <button
              onClick={handleZoomOut}
              className="w-6 h-6 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 flex items-center justify-center transition-colors cursor-pointer"
              title="Zoom out"
            >
              <Minus className="w-3 h-3" />
            </button>
            <span className="px-2 text-[11px] text-zinc-300">
              {Math.round(zoomLevel * 100)}%
            </span>
            <button
              onClick={handleZoomIn}
              className="w-6 h-6 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 flex items-center justify-center transition-colors cursor-pointer"
              title="Zoom in"
            >
              <Plus className="w-3 h-3" />
            </button>
            <button
              onClick={handleFit}
              className="px-2 py-0.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-[10px] text-violet-300 uppercase tracking-wider font-semibold transition-colors cursor-pointer"
              title="Reset view"
            >
              fit
            </button>
          </div>
        </div>

        {/* Selected Layer Context Inspector */}
        <div className="relative z-10 p-4 rounded-2xl bg-zinc-900/80 border border-white/[0.06] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
          <div className="space-y-1">
            <span className="text-[10px] uppercase tracking-wider text-violet-400 font-bold block">
              Active Inspector: {activeNodeData.title}
            </span>
            <p className="text-zinc-300 font-sans font-light leading-relaxed text-xs">
              {activeNodeData.detail}
            </p>
          </div>

          <span className="text-[10px] text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded font-mono shrink-0">
            Node Operational
          </span>
        </div>
      </div>
    </div>
  );
}
