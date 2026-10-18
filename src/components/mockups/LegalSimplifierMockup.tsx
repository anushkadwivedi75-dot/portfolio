import { useState } from 'react';
import { FileCheck, Sparkles, AlertOctagon, Scale, Search, ShieldAlert, Cpu } from 'lucide-react';

interface ClauseSample {
  id: string;
  title: string;
  category: string;
  originalText: string;
  riskLevel: 'HIGH' | 'MEDIUM' | 'LOW';
  riskRationale: string;
  plainEnglishSummary: string;
  keyObligations: string[];
  hiddenLiabilities: string[];
  vectorSimilarity: string;
}

const sampleClauses: ClauseSample[] = [
  {
    id: 'indemnity',
    title: 'Indemnity & Unlimited Liability',
    category: 'Commercial SaaS Agreement',
    originalText:
      'Customer shall indemnify, defend, and hold harmless Provider and its affiliates against any third-party claims, liabilities, losses, damages, or costs (including uncapped legal fees) arising from any performance, software integration, or customer-provided dataset without limitation of statutory liability or monetary ceiling.',
    riskLevel: 'HIGH',
    riskRationale: 'Uncapped financial indemnity with zero liability ceiling for software integrations.',
    plainEnglishSummary:
      'If a third party sues the vendor over something related to your integration or data, you must pay all their legal fees and any damages without any spending limit or cap.',
    keyObligations: [
      'Customer covers 100% of provider legal defence costs.',
      'Includes indirect losses and third-party claims without monetary ceiling.'
    ],
    hiddenLiabilities: [
      'Missing reciprocal indemnity from provider.',
      'No liability cap (e.g., typically 12 months fees paid).'
    ],
    vectorSimilarity: '0.96 Cosine Match (Standard Tech Terms Corpus)'
  },
  {
    id: 'noncompete',
    title: 'Post-Termination Non-Compete',
    category: 'Consulting Agreement § 9.2',
    originalText:
      'For a duration of twenty-four (24) months following termination of this Agreement, Contractor shall not directly or indirectly engage in, consult for, or hold equity in any entity operating within the generative AI or spatial computing sectors in North America or India.',
    riskLevel: 'HIGH',
    riskRationale: 'Overly broad geographic scope (global/NA/IN) and excessive 24-month duration.',
    plainEnglishSummary:
      'You are forbidden from working for, starting, or advising any AI or spatial computing company for 2 full years after leaving, which severely restricts your professional employment.',
    keyObligations: [
      'Strict 2-year bar on consulting or employment in the entire AI sector.',
      'Applies globally across major technical jurisdictions.'
    ],
    hiddenLiabilities: [
      'May be legally unenforceable in California and India under Sec 27 Contract Act, yet creates immediate litigation risk.'
    ],
    vectorSimilarity: '0.91 Cosine Match (Employment Restrictions Corpus)'
  },
  {
    id: 'termination',
    title: 'Termination for Convenience',
    category: 'Master Service Agreement',
    originalText:
      'Provider may terminate this Agreement without cause at any time upon seven (7) days written notice. Customer shall have no right of termination for convenience and must satisfy all accrued milestones regardless of delivery state.',
    riskLevel: 'MEDIUM',
    riskRationale: 'Asymmetrical 7-day notice period favoring only the provider.',
    plainEnglishSummary:
      'The vendor can cancel the contract on just 7 days notice without any reason, but you cannot cancel and must continue paying even if deadlines are delayed.',
    keyObligations: [
      'Vendor needs only 7 days advance notice to exit.',
      'Client is locked in and obligated to pay scheduled milestones.'
    ],
    hiddenLiabilities: [
      'Project stranded risk if vendor cancels midway through implementation.'
    ],
    vectorSimilarity: '0.88 Cosine Match (Commercial MSA Corpus)'
  }
];

export default function LegalSimplifierMockup() {
  const [selectedClauseId, setSelectedClauseId] = useState<string>('indemnity');
  const activeClause = sampleClauses.find((c) => c.id === selectedClauseId) || sampleClauses[0];

  return (
    <div className="w-full rounded-xl bg-[#0d0e12] border border-white/[0.08] overflow-hidden text-xs shadow-2xl font-sans">
      {/* Top Application Bar */}
      <div className="bg-[#13141a] px-4 py-3 border-b border-white/[0.06] flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Scale className="w-4 h-4 text-violet-400" />
          <span className="font-semibold text-zinc-200 text-xs">Legal Simplifier AI Engine</span>
          <span className="text-[10px] bg-violet-500/10 text-violet-300 border border-violet-500/30 px-1.5 py-0.5 rounded flex items-center gap-1 font-mono">
            <Cpu className="w-3 h-3 text-violet-400" />
            Gemini & Vector RAG
          </span>
        </div>

        {/* Clause Selector Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto py-1">
          {sampleClauses.map((clause) => (
            <button
              key={clause.id}
              onClick={() => setSelectedClauseId(clause.id)}
              className={`px-2.5 py-1 rounded text-[11px] transition-all cursor-pointer whitespace-nowrap ${
                selectedClauseId === clause.id
                  ? 'bg-violet-600 text-white font-medium shadow-sm'
                  : 'bg-zinc-800/80 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-700/60'
              }`}
            >
              {clause.title}
            </button>
          ))}
        </div>
      </div>

      {/* Split-Screen Analysis Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[310px]">
        {/* Left: Original Legal Contract Excerpt */}
        <div className="lg:col-span-5 p-4 bg-[#0a0b0e] border-b lg:border-b-0 lg:border-r border-white/[0.06] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-[10px] text-zinc-500 font-mono mb-2">
              <span>SOURCE CONTRACT CLAUSE</span>
              <span className="text-zinc-400">{activeClause.category}</span>
            </div>
            <div className="p-3 rounded-lg bg-[#121319] border border-white/[0.05] text-zinc-300 font-serif text-[13px] leading-relaxed italic border-l-2 border-l-violet-500">
              "{activeClause.originalText}"
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-white/[0.04] flex items-center justify-between text-[10px] font-mono text-zinc-500">
            <div className="flex items-center gap-1.5">
              <Search className="w-3 h-3 text-violet-400" />
              <span>Vector Similarity:</span>
            </div>
            <span className="text-violet-300">{activeClause.vectorSimilarity}</span>
          </div>
        </div>

        {/* Right: Plain-Language AI Translation & Risk Classification */}
        <div className="lg:col-span-7 p-4 bg-[#0d0e12] flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            {/* Risk Badge Row */}
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">
                  Risk Classification
                </span>
                <span
                  className={`px-2 py-0.5 rounded text-[10px] font-bold font-mono tracking-wide flex items-center gap-1 ${
                    activeClause.riskLevel === 'HIGH'
                      ? 'bg-red-500/20 text-red-300 border border-red-500/40'
                      : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                  }`}
                >
                  <ShieldAlert className="w-3 h-3" />
                  {activeClause.riskLevel} EXPOSURE
                </span>
              </div>
              <span className="text-[10px] text-zinc-400 font-mono">
                Grounding Confidence: 99.2%
              </span>
            </div>

            {/* Plain English Translation Card */}
            <div className="p-3 rounded-lg bg-[#14151e] border border-violet-500/20">
              <div className="flex items-center gap-1.5 text-violet-300 text-[11px] font-semibold mb-1">
                <Sparkles className="w-3.5 h-3.5 text-violet-400" />
                <span>Plain-English Breakdown</span>
              </div>
              <p className="text-zinc-200 text-xs leading-relaxed">
                {activeClause.plainEnglishSummary}
              </p>
            </div>

            {/* Hidden Liabilities Bullet points */}
            <div>
              <div className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                <AlertOctagon className="w-3 h-3 text-red-400" />
                <span>Critical Red Flags & Hidden Liabilities</span>
              </div>
              <ul className="space-y-1">
                {activeClause.hiddenLiabilities.map((item, i) => (
                  <li key={i} className="text-[11px] text-zinc-300 flex items-start gap-1.5">
                    <span className="text-red-400 mt-0.5">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Action Recommendation */}
          <div className="pt-2 border-t border-white/[0.04] flex items-center justify-between text-[11px] text-zinc-400">
            <span className="flex items-center gap-1 text-emerald-400 font-medium">
              <FileCheck className="w-3.5 h-3.5" />
              Proposed Revision Ready
            </span>
            <span className="text-[10px] font-mono text-zinc-500">
              Next.js • Vector Embeddings
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
