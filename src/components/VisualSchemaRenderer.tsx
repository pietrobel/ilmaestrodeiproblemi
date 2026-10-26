import type { LessonVisualSpec, ProblemVisualSchema } from '../types/math';

interface ProblemVisualProps {
  schema: ProblemVisualSchema;
  revealValues?: boolean;
}

export function ProblemVisualDiagram({
  schema,
  revealValues = false,
}: ProblemVisualProps) {
  const { type, title, parts, totalLabel } = schema;

  if (type === 'pythagoras') {
    return (
      <div className="bg-white border border-slate-200 rounded-xl p-5">
        <p className="text-xs font-medium text-slate-500 mb-3">{title}</p>
        <svg
          viewBox="0 0 360 175"
          className="w-full h-auto max-h-48"
          role="img"
          aria-label={title}
        >
          {/* Griglia leggera */}
          <rect x="0" y="0" width="360" height="175" fill="#F8FAFC" rx="8" />
          {/* Triangolo rettangolo */}
          <polygon
            points="70,140 250,140 70,35"
            fill="#E0F2FE"
            stroke="#0369A1"
            strokeWidth="2.5"
          />
          {/* Simbolo angolo retto 90° */}
          <polyline
            points="70,124 86,124 86,140"
            fill="none"
            stroke="#0369A1"
            strokeWidth="2"
          />
          <text x="92" y="134" fontSize="11" fill="#0369A1" fontFamily="IBM Plex Mono">
            90°
          </text>
          {/* Etichette */}
          <text x="155" y="160" textAnchor="middle" fontSize="12" fontWeight="600" fill="#0F172A">
            {parts[0] ? `${parts[0].label}: ${parts[0].value}` : 'Cateto b'}
          </text>
          <text x="58" y="92" textAnchor="end" fontSize="12" fontWeight="600" fill="#0F172A">
            {parts[1] ? `${parts[1].value}` : 'a'}
          </text>
          <text x="175" y="80" textAnchor="start" fontSize="12" fontWeight="700" fill="#0369A1">
            {parts[2] ? `${parts[2].label}: ${parts[2].value}` : 'Ipotenusa c'}
          </text>
        </svg>
      </div>
    );
  }

  if (type === 'geometry') {
    return (
      <div className="bg-white border border-slate-200 rounded-xl p-5">
        <p className="text-xs font-medium text-slate-500 mb-3">{title}</p>
        <svg
          viewBox="0 0 360 165"
          className="w-full h-auto max-h-44"
          role="img"
          aria-label={title}
        >
          <rect x="0" y="0" width="360" height="165" fill="#F8FAFC" rx="8" />
          <rect
            x="75"
            y="28"
            width="210"
            height="100"
            fill="#E0F2FE"
            stroke="#0369A1"
            strokeWidth="2.5"
            rx="3"
          />
          {/* Altezza tratteggiata */}
          <line
            x1="285"
            y1="28"
            x2="285"
            y2="128"
            stroke="#0284C7"
            strokeWidth="2"
          />
          <text x="180" y="148" textAnchor="middle" fontSize="12" fontWeight="600" fill="#0F172A">
            {parts[0] ? `${parts[0].label}: ${parts[0].value}` : ''}
          </text>
          <text x="296" y="82" textAnchor="start" fontSize="12" fontWeight="600" fill="#0F172A">
            {parts[1] ? `${parts[1].value}` : ''}
          </text>
          {parts[2] && (
            <text x="180" y="82" textAnchor="middle" fontSize="13" fontWeight="700" fill="#0369A1">
              {parts[2].label}: {parts[2].value}
            </text>
          )}
        </svg>
      </div>
    );
  }

  if (type === 'cylinder') {
    return (
      <div className="bg-white border border-slate-200 rounded-xl p-5">
        <p className="text-xs font-medium text-slate-500 mb-3">{title}</p>
        <svg
          viewBox="0 0 360 175"
          className="w-full h-auto max-h-48"
          role="img"
          aria-label={title}
        >
          <rect x="0" y="0" width="360" height="175" fill="#F8FAFC" rx="8" />
          {/* Corpo cilindro */}
          <path
            d="M115,42 L115,132 A65,18 0 0,0 245,132 L245,42 Z"
            fill="#E0F2FE"
            stroke="#0369A1"
            strokeWidth="2"
          />
          {/* Ellisse superiore */}
          <ellipse
            cx="180"
            cy="42"
            rx="65"
            ry="18"
            fill="#BAE6FD"
            stroke="#0369A1"
            strokeWidth="2"
          />
          {/* Raggio tratteggiato */}
          <line
            x1="180"
            y1="42"
            x2="245"
            y2="42"
            stroke="#0F172A"
            strokeDasharray="4 3"
            strokeWidth="2"
          />
          <circle cx="180" cy="42" r="3" fill="#0F172A" />
          <text x="212" y="36" textAnchor="middle" fontSize="11" fontWeight="600" fill="#0F172A">
            {parts[0] ? `${parts[0].label}: ${parts[0].value}` : 'r'}
          </text>
          <text x="256" y="92" textAnchor="start" fontSize="12" fontWeight="600" fill="#0F172A">
            {parts[1] ? `${parts[1].label}: ${parts[1].value}` : 'h'}
          </text>
          {parts[2] && (
            <text x="180" y="102" textAnchor="middle" fontSize="12" fontWeight="700" fill="#0369A1">
              {parts[2].label}: {parts[2].value}
            </text>
          )}
        </svg>
      </div>
    );
  }

  if (type === 'equation') {
    return (
      <div className="bg-white border border-slate-200 rounded-xl p-5">
        <p className="text-xs font-medium text-slate-500 mb-3">{title}</p>
        <svg
          viewBox="0 0 360 155"
          className="w-full h-auto max-h-44"
          role="img"
          aria-label={title}
        >
          <rect x="0" y="0" width="360" height="155" fill="#F8FAFC" rx="8" />
          {/* Fulcro centrale bilancia */}
          <polygon points="180,108 162,140 198,140" fill="#475569" />
          {/* Asta in equilibrio */}
          <line x1="65" y1="108" x2="295" y2="108" stroke="#334155" strokeWidth="4" />
          {/* Piatto sinistro */}
          <rect x="40" y="56" width="115" height="44" rx="6" fill="#E0F2FE" stroke="#0284C7" strokeWidth="2" />
          <text x="97" y="75" textAnchor="middle" fontSize="11" fill="#334155">
            {parts[0]?.label ?? '1° membro'}
          </text>
          <text x="97" y="92" textAnchor="middle" fontSize="13" fontWeight="700" fill="#0F172A" fontFamily="IBM Plex Mono">
            {parts[0]?.value ?? 'x'}
          </text>
          {/* Segno = */}
          <text x="180" y="85" textAnchor="middle" fontSize="18" fontWeight="700" fill="#0369A1">
            =
          </text>
          {/* Piatto destro */}
          <rect x="205" y="56" width="115" height="44" rx="6" fill="#F1F5F9" stroke="#64748B" strokeWidth="2" />
          <text x="262" y="75" textAnchor="middle" fontSize="11" fill="#334155">
            {parts[1]?.label ?? '2° membro'}
          </text>
          <text x="262" y="92" textAnchor="middle" fontSize="13" fontWeight="700" fill="#0F172A" fontFamily="IBM Plex Mono">
            {totalLabel ?? parts[1]?.value ?? ''}
          </text>
        </svg>
      </div>
    );
  }

  // Default: Modello a Barre / Segmenti / Frazioni proporzionate
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5">
      <div className="flex items-center justify-between gap-4 mb-3">
        <p className="text-xs font-medium text-slate-500">{title}</p>
        {totalLabel && (
          <span className="text-xs font-mono font-semibold text-slate-700 tabular-nums">
            {totalLabel}
          </span>
        )}
      </div>

      {type === 'bar-diff' || type === 'segments' ? (
        <div className="space-y-2.5">
          {parts.map((part, idx) => {
            const widthClass =
              idx === 0
                ? 'w-3/5'
                : idx === 1
                ? 'w-full'
                : 'w-4/5';
            return (
              <div key={`${part.label}-${idx}`} className="flex items-center gap-3">
                <span className="w-28 text-xs font-medium text-slate-600 truncate shrink-0">
                  {part.label}
                </span>
                <div className="flex-1 bg-slate-100 rounded-md p-1">
                  <div
                    className={`${widthClass} px-3 py-2 rounded text-xs font-mono font-semibold tabular-nums flex items-center justify-between ${
                      part.highlight
                        ? 'bg-sky-700 text-white'
                        : 'bg-sky-100 text-sky-950 border border-sky-200'
                    }`}
                  >
                    <span>{part.label}</span>
                    <span>{revealValues ? part.value : part.value}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="flex flex-col sm:flex-row items-stretch gap-1.5 bg-slate-100 p-2 rounded-lg">
          {parts.map((part, idx) => (
            <div
              key={`${part.label}-${idx}`}
              className={`flex-1 min-w-[70px] rounded-md px-3 py-2.5 text-center transition-colors ${
                part.highlight
                  ? 'bg-sky-700 text-white'
                  : 'bg-white text-slate-900 border border-slate-200'
              }`}
            >
              <div
                className={`text-[11px] truncate ${
                  part.highlight ? 'text-sky-100' : 'text-slate-500'
                }`}
              >
                {part.label}
              </div>
              <div className="font-mono text-sm font-semibold mt-0.5 tabular-nums">
                {part.value}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export function LessonVisualDiagram({ spec }: { spec: LessonVisualSpec }) {
  // Mappa un LessonVisualSpec in un ProblemVisualSchema coerente per il rendering didattico
  const mappedType: ProblemVisualSchema['type'] =
    spec.kind === 'pythagoras'
      ? 'pythagoras'
      : spec.kind === 'geometry-rect'
      ? 'geometry'
      : spec.kind === 'solid-cylinder'
      ? 'cylinder'
      : spec.kind === 'equation-balance'
      ? 'equation'
      : spec.kind === 'bar-comparison' || spec.kind === 'segments-sum-diff'
      ? 'segments'
      : 'bar-total';

  const parts = spec.labels.map((lbl, idx) => ({
    label: lbl,
    value: spec.values[idx] !== undefined ? spec.values[idx] : '',
    highlight: idx === spec.labels.length - 1,
  }));

  return (
    <ProblemVisualDiagram
      schema={{
        type: mappedType,
        title: spec.caption,
        parts,
      }}
    />
  );
}
