import { ExternalLink, FlaskConical } from 'lucide-react';
import { ActiveSection } from '../types/math';

interface TopBarProps {
  activeSection: ActiveSection;
  onNavigate: (section: ActiveSection) => void;
  onQuickPractice: () => void;
}

const NAV_ITEMS: { id: ActiveSection; label: string }[] = [
  { id: ActiveSection.Percorso, label: 'Percorso' },
  { id: ActiveSection.Problemi, label: 'Problemi' },
  { id: ActiveSection.Laboratorio, label: 'Laboratorio' },
  { id: ActiveSection.Giochi, label: 'Giochi' },
  { id: ActiveSection.Missioni, label: 'Missioni' },
  { id: ActiveSection.Impostazioni, label: 'Impostazioni' },
];

export function TopBar({
  activeSection,
  onNavigate,
  onQuickPractice,
}: TopBarProps) {
  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur border-b border-slate-200">
      <div className="max-w-[1360px] mx-auto flex items-center justify-between gap-6 px-4 sm:px-6 lg:px-8 h-14">
        {/* Zone 1: Single text element wordmark */}
        <button
          type="button"
          onClick={() => onNavigate(ActiveSection.Percorso)}
          className="font-display text-lg font-bold tracking-tight text-slate-900 whitespace-nowrap shrink-0 cursor-pointer hover:text-sky-700 transition-colors"
        >
          LogicaMente
        </button>

        {/* Zone 2: Navigation links */}
        <nav
          aria-label="Navigazione principale"
          className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600"
        >
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onNavigate(item.id)}
                className={`py-1 whitespace-nowrap shrink-0 border-b-2 transition-colors cursor-pointer ${
                  isActive
                    ? 'border-sky-700 text-slate-900 font-semibold'
                    : 'border-transparent text-slate-600 hover:text-slate-900 hover:border-slate-300'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Actions (ScienzaLab link + Allenati Ora primary) */}
        <div className="flex items-center gap-2.5 shrink-0">
          <a
            href="https://scienzalab.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-lg transition-colors whitespace-nowrap shrink-0"
            title="Visita ScienzaLab: simulazioni ed esperimenti scientifici interattivi"
          >
            <FlaskConical className="w-4 h-4 text-emerald-700 shrink-0" />
            <span>ScienzaLab</span>
            <ExternalLink className="w-3 h-3 text-emerald-600/80 shrink-0" />
          </a>

          <button
            type="button"
            onClick={onQuickPractice}
            className="px-4 py-2 text-xs sm:text-sm font-semibold text-white bg-sky-700 rounded-lg hover:bg-sky-800 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Allenati Ora
          </button>
        </div>
      </div>

      {/* Navigazione compatta orizzontale per tablet piccoli e smartphone (entro cap 15% viewport) */}
      <nav
        aria-label="Navigazione mobile"
        className="md:hidden flex items-center gap-4 overflow-x-auto px-4 py-2 border-t border-slate-100 bg-slate-50/80 text-xs font-medium"
      >
        {NAV_ITEMS.map((item) => {
          const isActive = activeSection === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onNavigate(item.id)}
              className={`px-2.5 py-1 rounded-md whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                isActive
                  ? 'bg-white text-slate-900 font-semibold shadow-xs border border-slate-200'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {item.label}
            </button>
          );
        })}

        <a
          href="https://scienzalab.vercel.app/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-emerald-800 bg-emerald-50 border border-emerald-200 font-semibold whitespace-nowrap shrink-0"
        >
          <FlaskConical className="w-3.5 h-3.5 text-emerald-700" />
          <span>ScienzaLab</span>
        </a>
      </nav>
    </header>
  );
}
