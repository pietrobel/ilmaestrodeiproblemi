import { useState } from 'react';
import {
  CheckCircle2,
  Monitor,
  Search,
  Trash2,
  LayoutGrid,
  FlaskConical,
  ExternalLink,
} from 'lucide-react';
import { GRADE_PROFILES, getGradeProfile } from '../data/grades';
import { getMissionsByGrade } from '../data/missions';
import { getProblemsByGrade } from '../data/problemGenerator';
import { getUnitsByGrade } from '../data/units';
import {
  AutonomyMode,
  type AppSettings,
  type GradeId,
  type GradeProgress,
} from '../types/math';
import { CHARACTERS, getMascotsForGrade } from '../data/characters';
import { SafeImage } from './SafeImage';

interface SettingsSectionProps {
  currentGradeId: GradeId;
  settings: AppSettings;
  progressByGrade: Record<GradeId, GradeProgress>;
  onSelectGrade: (gradeId: GradeId | null) => void;
  onUpdateSettings: (patch: Partial<AppSettings>) => void;
  onResetCurrentGrade: () => void;
}

export function SettingsSection({
  currentGradeId,
  settings,
  progressByGrade,
  onSelectGrade,
  onUpdateSettings,
  onResetCurrentGrade,
}: SettingsSectionProps) {
  const currentProfile = getGradeProfile(currentGradeId);
  const [glossaryQuery, setGlossaryQuery] = useState('');
  const [confirmReset, setConfirmReset] = useState(false);

  const filteredGlossary = currentProfile.glossary.filter(
    (g) =>
      g.term.toLowerCase().includes(glossaryQuery.toLowerCase()) ||
      g.definition.toLowerCase().includes(glossaryQuery.toLowerCase())
  );

  return (
    <div className="space-y-8">
      {/* 1. Cambio Classe senza perdita di progressi */}
      <section className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-5 border-b border-slate-100">
          <div>
            <h1 className="font-display text-2xl font-bold text-slate-900">
              Impostazioni, Classe e Glossario
            </h1>
            <p className="text-sm text-slate-600 mt-1">
              Puoi cambiare classe in qualsiasi momento: tutti i progressi registrati in ciascuna classe restano salvati sul dispositivo.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 self-start sm:self-auto">
            <a
              href="https://scienzalab.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs sm:text-sm font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              title="Apri ScienzaLab in una nuova scheda"
            >
              <FlaskConical className="w-4 h-4 text-emerald-700 shrink-0" />
              <span>Visita ScienzaLab</span>
              <ExternalLink className="w-3.5 h-3.5 text-emerald-600/70 shrink-0" />
            </a>

            <button
              type="button"
              onClick={() => onSelectGrade(null)}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <LayoutGrid className="w-4 h-4 shrink-0" />
              <span>Schermata Iniziale Classi</span>
            </button>
          </div>
        </div>

        <div>
          <h2 className="font-display text-lg font-bold text-slate-900 mb-3">
            Seleziona la classe attiva (5 classi del percorso)
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {GRADE_PROFILES.map((grade) => {
              const isSelected = grade.id === currentGradeId;
              const prog = progressByGrade[grade.id];
              const solvedCount =
                (prog?.solvedProblemIds.length ?? 0) +
                (prog?.solvedGeneratedCount ?? 0);

              return (
                <button
                  key={grade.id}
                  type="button"
                  onClick={() => {
                    onSelectGrade(grade.id);
                    setConfirmReset(false);
                  }}
                  className={`text-left p-4 rounded-xl border transition-colors cursor-pointer flex flex-col justify-between gap-3 ${
                    isSelected
                      ? 'bg-sky-50 border-sky-600 text-slate-900'
                      : 'bg-white border-slate-200 hover:border-sky-400 text-slate-800'
                  }`}
                >
                  <div>
                    <p className="text-xs text-slate-500 tabular-nums mb-1">
                      0{grade.order} · {grade.schoolCycle}
                    </p>
                    <p className="font-display text-base font-bold leading-snug">
                      {grade.buttonLabel}
                    </p>
                  </div>
                  <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-200/70 tabular-nums">
                    <span className="text-slate-600">{solvedCount} risolti</span>
                    {isSelected && (
                      <span className="inline-flex items-center gap-1 font-semibold text-sky-800">
                        <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                        <span>Attiva</span>
                      </span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* 2. Scelta del Personaggio Guida & Nota sul Curricolo */}
      <section className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 space-y-5">
        <div>
          <h2 className="font-display text-lg font-bold text-slate-900">
            Scegli il tuo Personaggio Guida
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Ogni compagno di logica ha una specialità e un linguaggio calibrato per sostenere e motivare gli alunni:
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {CHARACTERS.map((char) => {
            const isSelected =
              settings.selectedMascotId === char.id ||
              (!settings.selectedMascotId &&
                getMascotsForGrade(currentGradeId)[0]?.id === char.id);
            const isNativeForGrade = char.gradeIds.includes(currentGradeId);

            return (
              <button
                key={char.id}
                type="button"
                onClick={() => onUpdateSettings({ selectedMascotId: char.id })}
                className={`text-left p-3.5 rounded-xl border-2 transition-all cursor-pointer flex flex-col justify-between gap-3 ${
                  isSelected
                    ? 'border-sky-600 bg-sky-50/70 shadow-xs'
                    : 'border-slate-200 hover:border-slate-300 bg-white'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-2xl flex items-center">
                      {char.id === 'maestro' && (
                        <span className="w-8 h-8 rounded-full overflow-hidden border border-sky-400 inline-block shrink-0 shadow-2xs">
                          <SafeImage imageKey="maestro" alt="Maestro" className="w-full h-full object-cover" />
                        </span>
                      )}
                      {char.id === 'pico' && '🦉'}
                      {char.id === 'leo' && '🦫'}
                      {char.id === 'zoe' && '🦊'}
                      {char.id === 'archi' && '🐱‍🎓'}
                      {char.id === 'maya' && '🐆'}
                    </span>
                    {isSelected && (
                      <span className="text-[10px] font-bold text-sky-800 bg-sky-100 px-1.5 py-0.5 rounded-full">
                        Attivo
                      </span>
                    )}
                  </div>
                  <p className="font-display text-sm font-bold text-slate-900">{char.name}</p>
                  <p className="text-xs text-slate-500 font-medium">{char.species}</p>
                  <p className="text-xs text-slate-600 mt-2 line-clamp-2">«{char.catchphrase}»</p>
                </div>

                <div className="pt-2 border-t border-slate-100 text-[11px] text-slate-500">
                  {isNativeForGrade ? (
                    <span className="text-emerald-700 font-semibold">Consigliato per la tua classe</span>
                  ) : (
                    <span>Disponibile</span>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Nota didattica chiarificatrice sul Teorema di Pitagora richiesta dall'utente */}
        <div className="p-4 rounded-xl bg-amber-50/80 border border-amber-200 text-xs sm:text-sm text-amber-950 space-y-1.5 leading-relaxed">
          <p className="font-bold flex items-center gap-1.5 text-amber-900">
            <span>📐 Nota didattica sul Teorema di Pitagora:</span>
          </p>
          <p>
            Il <strong>Teorema di Pitagora</strong> (cateti, ipotenusa, somme dei quadrati e radici quadrate: <em>c = √(a² + b²)</em>) è collocato rigorosamente a partire dalla <strong>Seconda Media</strong>, nel pieno rispetto delle Indicazioni Nazionali.
          </p>
          <p>
            Nelle classi <strong>4ª e 5ª primaria</strong> gli alunni lavorano unicamente sul perimetro (il recinto/contorno) e sull’area delle figure piane (base × altezza, triangolo come metà rettangolo : 2), senza calcoli con radici o formule algebriche premature.
          </p>
        </div>
      </section>

      {/* 3. Accessibilità LIM, Tablet e Livello di Autonomia */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-6 bg-white border border-slate-200 rounded-xl p-6 space-y-6">
          <div className="flex items-center gap-2.5 pb-4 border-b border-slate-100">
            <Monitor className="w-5 h-5 text-sky-700 shrink-0" />
            <h2 className="font-display text-lg font-bold text-slate-900">
              Adattamento per LIM, Tablet e Autonomia
            </h2>
          </div>

          {/* Toggle Modalità LIM */}
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-slate-900">
                Modalità LIM / Schermo Grande
              </p>
              <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                Ingrandisce i caratteri e la spaziatura per la proiezione in aula sulla Lavagna Interattiva Multimediale.
              </p>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={settings.limMode}
              onClick={() => onUpdateSettings({ limMode: !settings.limMode })}
              className={`px-4 py-2 text-xs font-semibold rounded-lg border transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                settings.limMode
                  ? 'bg-sky-700 text-white border-sky-700'
                  : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200'
              }`}
            >
              {settings.limMode ? 'Attiva' : 'Disattivata'}
            </button>
          </div>

          {/* Toggle Tastierino Touch */}
          <div className="flex items-start justify-between gap-4 pt-4 border-t border-slate-100">
            <div>
              <p className="text-sm font-semibold text-slate-900">
                Tastierino numerico LIM / Tablet sempre aperto
              </p>
              <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                Mostra automaticamente i pulsanti numerici a schermo senza usare la tastiera fisica.
              </p>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={settings.showTouchKeypad}
              onClick={() =>
                onUpdateSettings({ showTouchKeypad: !settings.showTouchKeypad })
              }
              className={`px-4 py-2 text-xs font-semibold rounded-lg border transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                settings.showTouchKeypad
                  ? 'bg-sky-700 text-white border-sky-700'
                  : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200'
              }`}
            >
              {settings.showTouchKeypad ? 'Sempre visibile' : 'Su richiesta'}
            </button>
          </div>

          {/* Scelta Livello di Autonomia */}
          <div className="pt-4 border-t border-slate-100 space-y-2.5">
            <p className="text-sm font-semibold text-slate-900">
              Livello di guida nella risoluzione dei problemi
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {(
                [
                  { id: AutonomyMode.Adattivo, label: 'Adattivo per classe' },
                  { id: AutonomyMode.Guidato, label: 'Sempre guidato' },
                  { id: AutonomyMode.Autonomo, label: 'Sempre autonomo' },
                ] as const
              ).map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => onUpdateSettings({ autonomyMode: opt.id })}
                  className={`px-3 py-2.5 text-xs font-semibold rounded-lg border transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    settings.autonomyMode === opt.id
                      ? 'bg-sky-700 text-white border-sky-700'
                      : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Azzeramento controllato della classe corrente */}
          <div className="pt-5 border-t border-slate-100 space-y-3">
            <p className="text-xs font-semibold text-slate-500">
              Gestione progressi di «{currentProfile.buttonLabel}»
            </p>
            {!confirmReset ? (
              <button
                type="button"
                onClick={() => setConfirmReset(true)}
                className="inline-flex items-center gap-2 px-4 py-2 text-xs font-medium text-rose-800 bg-rose-50 hover:bg-rose-100 border border-rose-200 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5 shrink-0" />
                <span>Azzera solo i progressi di questa classe</span>
              </button>
            ) : (
              <div className="p-3.5 rounded-lg bg-rose-50 border border-rose-200 flex flex-wrap items-center justify-between gap-3">
                <span className="text-xs text-rose-950 font-medium">
                  Confermi l’azzeramento di {currentProfile.buttonLabel}? Le altre classi non verranno toccate.
                </span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      onResetCurrentGrade();
                      setConfirmReset(false);
                    }}
                    className="px-3 py-1.5 text-xs font-semibold text-white bg-rose-700 hover:bg-rose-800 rounded-md whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    Conferma
                  </button>
                  <button
                    type="button"
                    onClick={() => setConfirmReset(false)}
                    className="px-3 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-300 rounded-md whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    Annulla
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Glossario Matematico adattato alla Classe Attiva */}
        <div className="lg:col-span-6 bg-white border border-slate-200 rounded-xl p-6 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
            <div>
              <h2 className="font-display text-lg font-bold text-slate-900">
                Vocabolario matematico · {currentProfile.shortName}
              </h2>
              <p className="text-xs text-slate-500">
                Termini chiave spiegati con linguaggio calibrato sulla tua classe
              </p>
            </div>
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={glossaryQuery}
                onChange={(e) => setGlossaryQuery(e.target.value)}
                placeholder="Cerca termine..."
                aria-label="Cerca nel vocabolario matematico"
                className="pl-9 pr-3 py-1.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-lg text-slate-800 w-full sm:w-48"
              />
            </div>
          </div>

          <div className="space-y-3">
            {filteredGlossary.length > 0 ? (
              filteredGlossary.map((item) => (
                <div
                  key={item.term}
                  className="p-3.5 rounded-lg bg-slate-50 border border-slate-200/80 space-y-1"
                >
                  <p className="text-sm font-bold text-slate-900">{item.term}</p>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                    {item.definition}
                  </p>
                  <p className="text-xs font-mono text-sky-900 pt-0.5">
                    Esempio: {item.example}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-sm text-slate-500 py-4 text-center">
                Nessun termine trovato per «{glossaryQuery}».
              </p>
            )}
          </div>
        </div>
      </section>

      {/* 3. Tabella Riepilogativa di tutto il Percorso Verticale (tabular-nums) */}
      <section className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 space-y-4">
        <div>
          <h2 className="font-display text-lg font-bold text-slate-900">
            Registro complessivo dei progressi per classe
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Panoramica completa delle attività svolte su questo dispositivo dalla Quarta Primaria alla Terza Media
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-sm tabular-nums">
            <thead>
              <tr className="border-b border-slate-200 text-xs font-semibold text-slate-500">
                <th className="py-3 pr-4">Classe</th>
                <th className="py-3 px-4">Unità studiate</th>
                <th className="py-3 px-4">Problemi catalogo</th>
                <th className="py-3 px-4">Varianti dinamiche</th>
                <th className="py-3 px-4">Tappe missione</th>
                <th className="py-3 pl-4 text-right">Tentativi totali</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {GRADE_PROFILES.map((grade) => {
                const prog = progressByGrade[grade.id];
                const unitsTotal = getUnitsByGrade(grade.id).length;
                const probsTotal = getProblemsByGrade(grade.id).length;
                const missions = getMissionsByGrade(grade.id);
                const totalChapters = missions.reduce(
                  (sum, m) => sum + m.chapters.length,
                  0
                );
                const doneChapters = Object.values(
                  prog.completedMissionChapters
                ).reduce((sum, arr) => sum + arr.length, 0);

                return (
                  <tr
                    key={grade.id}
                    className={
                      grade.id === currentGradeId ? 'bg-sky-50/40 font-medium' : ''
                    }
                  >
                    <td className="py-3 pr-4 text-slate-900 font-semibold">
                      {grade.buttonLabel}
                    </td>
                    <td className="py-3 px-4 font-mono text-slate-700">
                      {prog.completedUnitIds.length} / {unitsTotal}
                    </td>
                    <td className="py-3 px-4 font-mono text-slate-700">
                      {prog.solvedProblemIds.length} / {probsTotal}
                    </td>
                    <td className="py-3 px-4 font-mono text-slate-700">
                      {prog.solvedGeneratedCount}
                    </td>
                    <td className="py-3 px-4 font-mono text-slate-700">
                      {doneChapters} / {totalChapters}
                    </td>
                    <td className="py-3 pl-4 font-mono text-slate-700 text-right">
                      {prog.totalAttempts}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
