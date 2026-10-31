import { useState } from 'react';
import {
  ShieldAlert,
  Flame,
  Cpu,
  Lock,
  RefreshCw,
  CheckCircle2
} from 'lucide-react';

interface SecurityIncident {
  id: string;
  title: string;
  severity: 'CRITICAL' | 'HIGH' | 'MEDIUM';
  targetAsset: string;
  mitreTactic: string;
  techniqueId: string;
  riskScore: number;
  timeAgo: string;
  analystSummary: string;
  explainableFeatures: { feature: string; weight: number; polarity: '+' | '-' }[];
  recommendedPlaybook: string;
}

const incidentCatalog: SecurityIncident[] = [
  {
    id: 'inc-9402',
    title: 'Suspicious Kerberoasting & SPN Request Burst',
    severity: 'CRITICAL',
    targetAsset: 'dc01.corp.internal (Domain Controller)',
    mitreTactic: 'Credential Access',
    techniqueId: 'T1558.003',
    riskScore: 94.2,
    timeAgo: '1m ago',
    analystSummary:
      'High-velocity Kerberos TGS requests requesting RC4-encrypted service tickets for privileged database service accounts, indicative of automated offline password cracking.',
    explainableFeatures: [
      { feature: 'RC4 Ticket Encryption Downgrade Request', weight: 42, polarity: '+' },
      { feature: 'Abnormal Service Account Request Velocity', weight: 28, polarity: '+' },
      { feature: 'Originating Host: Untrusted Workstation (WS-409)', weight: 18, polarity: '+' },
      { feature: 'Service Account Privileges (Domain Admin)', weight: 12, polarity: '+' }
    ],
    recommendedPlaybook: 'Isolate Originating Host WS-409 & Rotate Kerberos Krbtgt Ticket'
  },
  {
    id: 'inc-9403',
    title: 'Anomalous Lateral Movement via PsExec',
    severity: 'HIGH',
    targetAsset: 'app-db-cluster-node2 (PostgreSQL)',
    mitreTactic: 'Lateral Movement',
    techniqueId: 'T1570',
    riskScore: 82.5,
    timeAgo: '6m ago',
    analystSummary:
      'Service control manager (services.exe) spawned an ephemeral binary over SMB named pipe IPC$, executing commands under SYSTEM context on production database host.',
    explainableFeatures: [
      { feature: 'Administrative Share Admin$ Connection from Unknown Subnet', weight: 36, polarity: '+' },
      { feature: 'Child Process Invocation: cmd.exe /c whoami', weight: 26, polarity: '+' },
      { feature: 'Off-Hours Workstation-to-Server Authentication', weight: 20, polarity: '+' }
    ],
    recommendedPlaybook: 'Block Inter-VLAN SMB Traffic & Revoke Compromised Session Token'
  },
  {
    id: 'inc-9404',
    title: 'Outbound Encrypted Beaconing to Low-Reputation IP',
    severity: 'MEDIUM',
    targetAsset: 'gw-ingress-proxy.prod',
    mitreTactic: 'Command & Control',
    techniqueId: 'T1071.001',
    riskScore: 68.0,
    timeAgo: '18m ago',
    analystSummary:
      'Periodic 30-second heartbeat beaconing observed over non-standard TLS port with strict jitter minimization, characteristic of automated C2 agent polling.',
    explainableFeatures: [
      { feature: 'Strict Temporal Jitter Periodicity (< 2% variance)', weight: 34, polarity: '+' },
      { feature: 'Newly Registered Domain (< 7 days old)', weight: 24, polarity: '+' },
      { feature: 'Self-Signed Untrusted Root CA Certificate', weight: 19, polarity: '+' }
    ],
    recommendedPlaybook: 'Sinkhole C2 Domain at DNS Gateway & Collect Memory Dump'
  }
];

export default function SATSAMockup() {
  const [selectedIncident, setSelectedIncident] = useState<SecurityIncident>(incidentCatalog[0]);
  const [isSimulatingStream, setIsSimulatingStream] = useState(false);
  const [containmentExecuted, setContainmentExecuted] = useState(false);

  const handleExecutePlaybook = () => {
    setContainmentExecuted(true);
    setTimeout(() => setContainmentExecuted(false), 3500);
  };

  const handleSimulateNewAlert = () => {
    setIsSimulatingStream(true);
    setTimeout(() => {
      setIsSimulatingStream(false);
      // rotate selected incident
      const nextIdx = (incidentCatalog.findIndex((i) => i.id === selectedIncident.id) + 1) % incidentCatalog.length;
      setSelectedIncident(incidentCatalog[nextIdx]);
    }, 600);
  };

  const getSeverityBadge = (sev: SecurityIncident['severity']) => {
    switch (sev) {
      case 'CRITICAL':
        return 'bg-rose-500/15 text-rose-300 border-rose-500/30';
      case 'HIGH':
        return 'bg-amber-500/15 text-amber-300 border-amber-500/30';
      case 'MEDIUM':
        return 'bg-violet-500/15 text-violet-300 border-violet-500/30';
    }
  };

  return (
    <div className="w-full rounded-2xl bg-[#090a10] border border-zinc-300/80 dark:border-white/[0.09] overflow-hidden text-xs shadow-2xl font-mono text-zinc-200">
      {/* Top Application Bar */}
      <div className="bg-[#101119] px-4 py-3 border-b border-white/[0.06] flex flex-wrap items-center justify-between gap-3 font-sans">
        <div className="flex items-center gap-3">
          {/* Subtle Window Dots */}
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-zinc-700"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-zinc-700"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-zinc-700"></span>
          </div>

          <div className="flex items-center gap-2 pl-2 border-l border-white/[0.08]">
            <ShieldAlert className="w-4 h-4 text-violet-400" />
            <span className="font-semibold text-zinc-100 tracking-wide text-xs">
              SAT-SA Supervisory SOC Console
            </span>
            <span className="text-[10px] bg-violet-500/15 text-violet-300 border border-violet-500/25 px-2 py-0.5 rounded font-mono hidden sm:inline-block">
              MITRE ATT&amp;CK v14
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 font-mono">
          <div className="flex items-center gap-1.5 text-[10px] text-zinc-400 bg-zinc-900 px-2.5 py-1 rounded border border-white/[0.06]">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>SIEM Stream: 12.4k EPS</span>
          </div>

          <button
            onClick={handleSimulateNewAlert}
            className="px-3 py-1 rounded text-[11px] font-mono transition-all flex items-center gap-1.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700 cursor-pointer"
          >
            <RefreshCw className={`w-3 h-3 ${isSimulatingStream ? 'animate-spin text-violet-400' : ''}`} />
            <span>Cycle Alert</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Incident Stream (Left) + Explainable Analysis Drawer (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[380px]">
        {/* Left Column: Triage Stream (5 cols) */}
        <div className="lg:col-span-5 p-4 bg-[#08090e] border-b lg:border-b-0 lg:border-r border-white/[0.06] flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between text-[11px] text-zinc-400 pb-2 border-b border-white/[0.06]">
              <span className="uppercase tracking-wider font-semibold flex items-center gap-1.5">
                <Flame className="w-3.5 h-3.5 text-rose-400" />
                Correlated Incidents
              </span>
              <span className="font-mono text-violet-400 font-bold">3 Active Clusters</span>
            </div>

            <div className="space-y-2">
              {incidentCatalog.map((incident) => {
                const isSelected = selectedIncident.id === incident.id;
                return (
                  <button
                    key={incident.id}
                    onClick={() => setSelectedIncident(incident)}
                    className={`w-full text-left p-3 rounded-xl border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-zinc-900/90 border-violet-500/50 shadow-lg shadow-violet-950/20 ring-1 ring-violet-500/30'
                        : 'bg-[#101119]/60 border-white/[0.04] hover:bg-zinc-900/40 hover:border-zinc-700'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className={`text-[10px] px-2 py-0.5 rounded font-mono border ${getSeverityBadge(incident.severity)}`}>
                        {incident.severity}
                      </span>
                      <span className="text-[10px] text-zinc-500 font-mono">{incident.timeAgo}</span>
                    </div>

                    <div className="text-xs font-semibold text-zinc-200 font-sans line-clamp-1">
                      {incident.title}
                    </div>

                    <div className="mt-1 flex items-center justify-between text-[10px] text-zinc-400 font-mono">
                      <span className="truncate max-w-[160px]">{incident.targetAsset}</span>
                      <span className="text-violet-300 font-bold">Risk {incident.riskScore}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between text-[10px] text-zinc-500">
            <span>Causal Graph Clustering: Active</span>
            <span className="text-emerald-400 flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" /> 0 Uncorrelated Spikes
            </span>
          </div>
        </div>

        {/* Right Column: Explainable AI Attribution & Investigation (7 cols) */}
        <div className="lg:col-span-7 p-5 bg-[#0b0c13] flex flex-col justify-between space-y-4">
          <div className="space-y-4">
            {/* Incident Header & Meta */}
            <div className="flex flex-wrap items-start justify-between gap-3 border-b border-white/[0.06] pb-3">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-mono text-zinc-500">{selectedIncident.id}</span>
                  <span className="text-zinc-600">•</span>
                  <span className="text-xs font-mono text-violet-400 font-semibold">
                    {selectedIncident.mitreTactic} ({selectedIncident.techniqueId})
                  </span>
                </div>
                <h4 className="text-sm sm:text-base font-bold text-zinc-100 font-sans">
                  {selectedIncident.title}
                </h4>
              </div>

              <div className="text-right">
                <div className="text-xs font-mono text-zinc-400">Composite Risk</div>
                <div className="text-lg font-bold text-rose-400 font-mono">
                  {selectedIncident.riskScore}
                  <span className="text-xs text-zinc-500"> / 100</span>
                </div>
              </div>
            </div>

            {/* Analyst Context Rationale */}
            <div className="p-3 rounded-xl bg-zinc-900/60 border border-white/[0.05] text-[11px] text-zinc-300 leading-relaxed font-sans">
              <span className="font-semibold text-zinc-200 block mb-1">Executive Triage Summary:</span>
              {selectedIncident.analystSummary}
            </div>

            {/* Explainable Attribution (SHAP-style Feature Weights) */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-[11px]">
                <span className="font-semibold text-zinc-300 font-sans flex items-center gap-1.5">
                  <Cpu className="w-3.5 h-3.5 text-violet-400" />
                  Explainable Risk Attribution (Feature Impact Weights)
                </span>
                <span className="text-zinc-500 text-[10px]">SHAP Normalized</span>
              </div>

              <div className="space-y-2 font-mono">
                {selectedIncident.explainableFeatures.map((feat, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex items-center justify-between text-[10px] text-zinc-300">
                      <span className="truncate pr-2 font-sans">{feat.feature}</span>
                      <span className="text-violet-300 font-bold shrink-0">+{feat.weight}%</span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-zinc-800 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-violet-500 to-rose-400 transition-all duration-500"
                        style={{ width: `${feat.weight * 2}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

            {/* Recommended Automated Containment Playbook */}
            <div className="pt-3 border-t border-white/[0.06] flex flex-wrap items-center justify-between gap-3">
              <div className="text-[11px] font-sans max-w-sm">
                <span className="text-zinc-400 text-[10px] block uppercase font-mono">Recommended Playbook:</span>
                <span className="text-zinc-200 font-medium text-xs line-clamp-1">{selectedIncident.recommendedPlaybook}</span>
              </div>

              <button
                onClick={handleExecutePlaybook}
                disabled={containmentExecuted}
                className={`px-4 py-2 rounded-lg text-xs font-semibold font-sans transition-all flex items-center gap-2 cursor-pointer ${
                  containmentExecuted
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm'
                    : 'bg-violet-600 hover:bg-violet-500 text-white shadow-md shadow-violet-900/30 hover:scale-[1.02]'
                }`}
              >
                {containmentExecuted ? (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Playbook Executed</span>
                  </>
                ) : (
                  <>
                    <Lock className="w-3.5 h-3.5" />
                    <span>Execute Containment</span>
                  </>
                )}
              </button>
            </div>
        </div>
      </div>
    </div>
  );
}
