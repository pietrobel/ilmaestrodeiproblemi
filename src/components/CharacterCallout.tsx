import { Sparkles, HelpCircle, CheckCircle, AlertTriangle } from 'lucide-react';
import type { CharacterMascot } from '../types/math';
import { SafeImage } from './SafeImage';

interface CharacterCalloutProps {
  mascot: CharacterMascot;
  message?: string;
  variant?: 'info' | 'hint' | 'success' | 'warning';
  title?: string;
  onNextTip?: () => void;
  compact?: boolean;
}

export function CharacterCallout({
  mascot,
  message,
  variant = 'info',
  title,
  onNextTip,
  compact = false,
}: CharacterCalloutProps) {
  const displayMessage = message || mascot.tips[0];

  // Icone SVG stilizzate per i personaggi
  const renderMascotAvatar = () => {
    switch (mascot.id) {
      case 'maestro':
        return (
          <div
            className="w-12 h-12 rounded-full overflow-hidden shrink-0 shadow-xs border-2 border-sky-600 select-none bg-sky-100"
            title="Il Maestro dei Problemi"
          >
            <SafeImage
              imageKey="maestro"
              alt="Il Maestro dei Problemi"
              fallbackTitle="Maestro"
              className="w-full h-full object-cover"
            />
          </div>
        );
      case 'pico':
        return (
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center text-white shrink-0 shadow-xs text-xl font-bold select-none"
            style={{ backgroundColor: mascot.accentColor }}
            title="Pico la Civetta Detective"
          >
            🦉
          </div>
        );
      case 'leo':
        return (
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center text-white shrink-0 shadow-xs text-xl font-bold select-none"
            style={{ backgroundColor: mascot.accentColor }}
            title="Leo il Castoro Costruttore"
          >
            🦫
          </div>
        );
      case 'zoe':
        return (
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center text-white shrink-0 shadow-xs text-xl font-bold select-none"
            style={{ backgroundColor: mascot.accentColor }}
            title="Zoe la Volpe Esploratrice"
          >
            🦊
          </div>
        );
      case 'archi':
        return (
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center text-white shrink-0 shadow-xs text-xl font-bold select-none"
            style={{ backgroundColor: mascot.accentColor }}
            title="Prof. Archimede"
          >
            🐱‍🎓
          </div>
        );
      case 'maya':
      default:
        return (
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center text-white shrink-0 shadow-xs text-xl font-bold select-none"
            style={{ backgroundColor: mascot.accentColor }}
            title="Maya l'Analista"
          >
            🐆
          </div>
        );
    }
  };

  const getVariantStyles = () => {
    switch (variant) {
      case 'hint':
        return {
          bg: 'bg-amber-50/80 border-amber-200',
          text: 'text-amber-950',
          tag: 'bg-amber-100 text-amber-800',
          icon: <HelpCircle className="w-4 h-4 text-amber-600 shrink-0" />,
        };
      case 'success':
        return {
          bg: 'bg-emerald-50/80 border-emerald-200',
          text: 'text-emerald-950',
          tag: 'bg-emerald-100 text-emerald-800',
          icon: <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />,
        };
      case 'warning':
        return {
          bg: 'bg-rose-50/80 border-rose-200',
          text: 'text-rose-950',
          tag: 'bg-rose-100 text-rose-800',
          icon: <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />,
        };
      case 'info':
      default:
        return {
          bg: 'bg-sky-50/80 border-sky-200',
          text: 'text-sky-950',
          tag: 'bg-sky-100 text-sky-800',
          icon: <Sparkles className="w-4 h-4 text-sky-600 shrink-0" />,
        };
    }
  };

  const styles = getVariantStyles();

  if (compact) {
    return (
      <div
        className={`flex items-center gap-3 p-3 rounded-lg border ${styles.bg} text-xs transition-colors`}
      >
        <div className="shrink-0 scale-90 -my-1">{renderMascotAvatar()}</div>
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-slate-900 truncate">
            {mascot.name}{' '}
            <span className="font-normal text-slate-500">({mascot.species})</span>
          </p>
          <p className={`${styles.text} text-xs mt-0.5 leading-snug`}>{displayMessage}</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`relative p-4 sm:p-5 rounded-xl border ${styles.bg} shadow-xs flex flex-col sm:flex-row items-start sm:items-center gap-4 transition-all`}
    >
      <div className="flex items-center gap-3 shrink-0">
        {renderMascotAvatar()}
        <div className="sm:hidden">
          <p className="text-sm font-bold text-slate-900">{mascot.name}</p>
          <p className="text-xs text-slate-500">{mascot.role}</p>
        </div>
      </div>

      <div className="flex-1 min-w-0 space-y-1">
        <div className="hidden sm:flex items-center gap-2">
          {styles.icon}
          <span className="font-display text-sm font-bold text-slate-900">
            {title || mascot.name}
          </span>
          <span className="text-xs text-slate-500">· {mascot.role}</span>
          <span
            className="text-[11px] font-medium px-2 py-0.5 rounded-full"
            style={{
              backgroundColor: `${mascot.accentColor}18`,
              color: mascot.accentColor,
            }}
          >
            {mascot.badgeTitle}
          </span>
        </div>

        <p className={`text-xs sm:text-sm ${styles.text} leading-relaxed`}>
          «{displayMessage}»
        </p>
      </div>

      {onNextTip && (
        <button
          type="button"
          onClick={onNextTip}
          className="self-end sm:self-center px-3 py-1.5 text-xs font-semibold rounded-lg bg-white border border-slate-200 hover:border-slate-300 text-slate-700 shadow-2xs hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
        >
          Un altro consiglio
        </button>
      )}
    </div>
  );
}
