import { useState } from 'react';
import { soundManager } from '../utils/soundEffects';

export default function SoundDock() {
  const [isOn, setIsOn] = useState(soundManager.enabled);

  const handleToggle = () => {
    const next = soundManager.toggle();
    setIsOn(next);
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 print:hidden select-none">
      <button
        onClick={handleToggle}
        type="button"
        className={`group flex items-center gap-2.5 px-3.5 py-2 rounded-full border transition-all duration-300 backdrop-blur-md text-xs font-mono shadow-lg cursor-pointer ${
          isOn
            ? 'bg-violet-950/80 dark:bg-violet-950/80 border-violet-500/50 text-violet-200 shadow-violet-950/30'
            : 'bg-white/90 dark:bg-zinc-900/90 border-zinc-300 dark:border-white/[0.08] text-zinc-600 dark:text-zinc-400 hover:border-violet-400/40 hover:text-zinc-900 dark:hover:text-zinc-200'
        }`}
        title={isOn ? 'Click to disable tactile sound effects' : 'Click to enable tactile sound effects'}
        aria-label={isOn ? 'Turn UI sound off' : 'Turn UI sound on'}
      >
        {/* Animated Equalizer Bars */}
        <span className="flex items-end gap-0.5 h-3">
          <i
            className={`w-[2.5px] rounded-full transition-all ${
              isOn
                ? 'bg-violet-400 h-3 animate-pulse'
                : 'bg-zinc-400 dark:bg-zinc-600 h-1 group-hover:h-2'
            }`}
          />
          <i
            className={`w-[2.5px] rounded-full transition-all ${
              isOn
                ? 'bg-violet-400 h-2 animate-bounce'
                : 'bg-zinc-400 dark:bg-zinc-600 h-1.5'
            }`}
            style={{ animationDelay: '150ms' }}
          />
          <i
            className={`w-[2.5px] rounded-full transition-all ${
              isOn
                ? 'bg-violet-400 h-3 animate-pulse'
                : 'bg-zinc-400 dark:bg-zinc-600 h-1'
            }`}
            style={{ animationDelay: '300ms' }}
          />
          <i
            className={`w-[2.5px] rounded-full transition-all ${
              isOn
                ? 'bg-violet-400 h-2 animate-bounce'
                : 'bg-zinc-400 dark:bg-zinc-600 h-2 group-hover:h-1'
            }`}
            style={{ animationDelay: '450ms' }}
          />
        </span>

        <span className="tracking-wider text-[11px] font-semibold uppercase">
          sound {isOn ? 'on' : 'off'}
        </span>
      </button>
    </div>
  );
}

