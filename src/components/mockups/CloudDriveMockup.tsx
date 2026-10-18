import { useState } from 'react';
import {
  Folder,
  FileCode,
  FileSpreadsheet,
  FileText,
  UploadCloud,
  CheckCircle2,
  HardDrive,
  UserCheck,
  ChevronRight
} from 'lucide-react';

export default function CloudDriveMockup() {
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<'all' | 'folders' | 'files'>('all');

  const files = [
    { name: 'spatial_dwithin_pipeline.py', type: 'code', size: '24.8 KB', updated: '2 hours ago', icon: FileCode, color: 'text-violet-400' },
    { name: 'cpcb_station_readings_2026.csv', type: 'sheet', size: '3.4 MB', updated: 'Yesterday', icon: FileSpreadsheet, color: 'text-emerald-400' },
    { name: 'isolation_forest_specs.pdf', type: 'doc', size: '1.2 MB', updated: '3 days ago', icon: FileText, color: 'text-red-400' },
  ];

  const folders = [
    { name: 'AQI_Sensor_Telemetry', items: '18 items', size: '142 MB' },
    { name: 'Legal_Contract_Corpus', items: '34 items', size: '280 MB' },
    { name: 'Firebase_Auth_Configs', items: '6 items', size: '12 MB' },
  ];

  const handleSimulateUpload = () => {
    if (uploadProgress !== null) return;
    setUploadProgress(10);
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev === null) return 10;
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setUploadProgress(null), 3000);
          return 100;
        }
        return prev + 25;
      });
    }, 400);
  };

  return (
    <div className="w-full rounded-xl bg-[#0d0e12] border border-white/[0.08] overflow-hidden text-xs shadow-2xl font-sans">
      {/* Top Application Bar */}
      <div className="bg-[#13141a] px-4 py-3 border-b border-white/[0.06] flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <HardDrive className="w-4 h-4 text-violet-400" />
          <span className="font-semibold text-zinc-200 text-xs">CloudDrive Distributed Storage</span>
          <span className="hidden sm:inline-block text-[10px] bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded-full">
            OAuth 2.0 Synchronized
          </span>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-zinc-400 text-[11px] bg-zinc-800/80 px-2.5 py-1 rounded-md border border-zinc-700/60">
            <UserCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span className="truncate max-w-[130px]">anushka@djsce.edu</span>
          </div>

          <button
            onClick={handleSimulateUpload}
            disabled={uploadProgress !== null}
            className={`px-3 py-1 rounded text-[11px] font-medium flex items-center gap-1.5 transition-all cursor-pointer ${
              uploadProgress !== null
                ? 'bg-zinc-800 text-zinc-400 cursor-not-allowed border border-zinc-700'
                : 'bg-violet-600 hover:bg-violet-500 text-white shadow-sm'
            }`}
          >
            <UploadCloud className="w-3.5 h-3.5" />
            {uploadProgress !== null ? 'Uploading...' : 'Simulate Chunked Upload'}
          </button>
        </div>
      </div>

      {/* Directory Breadcrumbs & Storage Summary */}
      <div className="px-4 py-2.5 bg-[#101116] border-b border-white/[0.04] flex flex-wrap items-center justify-between gap-2 text-[11px]">
        <div className="flex items-center gap-1.5 text-zinc-400">
          <span className="hover:text-zinc-200 cursor-pointer">Storage Bucket</span>
          <ChevronRight className="w-3 h-3 text-zinc-600" />
          <span className="hover:text-zinc-200 cursor-pointer">Production_Data</span>
          <ChevronRight className="w-3 h-3 text-zinc-600" />
          <span className="text-violet-300 font-medium">Research_Corpus</span>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1 text-[11px]">
          {(['all', 'folders', 'files'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-2 py-0.5 rounded capitalize transition-colors cursor-pointer ${
                activeTab === tab
                  ? 'bg-zinc-800 text-zinc-100 font-medium'
                  : 'text-zinc-500 hover:text-zinc-300'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Active Upload Bar (Simulated Resumable Queue) */}
      {uploadProgress !== null && (
        <div className="bg-violet-950/40 border-b border-violet-500/20 px-4 py-2 flex items-center justify-between text-[11px] transition-all">
          <div className="flex items-center gap-2">
            {uploadProgress === 100 ? (
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            ) : (
              <UploadCloud className="w-3.5 h-3.5 text-violet-400 animate-bounce" />
            )}
            <span className="text-zinc-200 font-mono">
              {uploadProgress === 100 ? 'Sync Complete: ' : 'Uploading Chunk: '}
              sensor_packet_stream_batch_09.parquet
            </span>
          </div>

          <div className="flex items-center gap-3 w-48 font-mono text-[10px]">
            <div className="h-1.5 flex-1 bg-zinc-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-violet-400 transition-all duration-300 rounded-full"
                style={{ width: `${uploadProgress}%` }}
              ></div>
            </div>
            <span className="text-violet-300 font-bold">{uploadProgress}%</span>
          </div>
        </div>
      )}

      {/* Workspace Area: Folders & Files */}
      <div className="p-4 space-y-4 min-h-[220px]">
        {/* Folders Row */}
        {(activeTab === 'all' || activeTab === 'folders') && (
          <div>
            <div className="text-[10px] text-zinc-500 uppercase tracking-wider font-semibold mb-2">
              Nested Directories (Deterministic Hierarchy)
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {folders.map((folder, i) => (
                <div
                  key={i}
                  className="p-2.5 rounded-lg bg-[#14151b] border border-white/[0.05] hover:border-violet-500/40 hover:bg-[#181922] transition-all cursor-pointer flex items-center justify-between group"
                >
                  <div className="flex items-center gap-2.5">
                    <Folder className="w-4 h-4 text-violet-400 group-hover:scale-110 transition-transform" />
                    <div>
                      <div className="font-medium text-zinc-200 text-[11px] group-hover:text-violet-200">
                        {folder.name}
                      </div>
                      <div className="text-[10px] text-zinc-500">{folder.items}</div>
                    </div>
                  </div>
                  <span className="text-[10px] text-zinc-500 font-mono">{folder.size}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Files Row */}
        {(activeTab === 'all' || activeTab === 'files') && (
          <div>
            <div className="text-[10px] text-zinc-500 uppercase tracking-wider font-semibold mb-2">
              Cloud Synchronized Files
            </div>
            <div className="divide-y divide-white/[0.04] bg-[#121319] rounded-lg border border-white/[0.05] overflow-hidden">
              {files.map((file, i) => {
                const IconComponent = file.icon;
                return (
                  <div
                    key={i}
                    className="p-2.5 flex items-center justify-between hover:bg-zinc-800/40 transition-colors"
                  >
                    <div className="flex items-center gap-2.5">
                      <IconComponent className={`w-4 h-4 ${file.color}`} />
                      <span className="font-mono text-zinc-300 text-[11px]">{file.name}</span>
                    </div>
                    <div className="flex items-center gap-4 text-[10px] text-zinc-500 font-mono">
                      <span>{file.size}</span>
                      <span className="hidden sm:inline">{file.updated}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Storage Footer Status */}
      <div className="bg-[#101116] px-4 py-2 border-t border-white/[0.06] flex items-center justify-between text-[10px] text-zinc-500 font-mono">
        <div className="flex items-center gap-2">
          <span>Bucket Quota:</span>
          <span className="text-zinc-300 font-bold">18.4 GB</span>
          <span>of 50.0 GB</span>
        </div>
        <span className="text-emerald-400">AES-256 Encrypted</span>
      </div>
    </div>
  );
}
