import { ArrowRight, CheckCircle2, ExternalLink, FlaskConical } from 'lucide-react';
import { GRADE_PROFILES } from '../data/grades';
import type { GradeId, GradeProgress } from '../types/math';
import { SafeImage } from './SafeImage';

interface ClassSelectorScreenProps {
  progressByGrade: Record<GradeId, GradeProgress>;
  onSelectGrade: (gradeId: GradeId) => void;
}

export function ClassSelectorScreen({
  progressByGrade,
  onSelectGrade,
}: ClassSelectorScreenProps) {
  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        {/* Intestazione editoriale pulita con collegamento a ScienzaLab */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-6 mb-8 border-b border-slate-200">
          <div>
            <span className="font-display text-xl font-bold tracking-tight text-slate-900">
              LogicaMente
            </span>
            <span className="text-xs sm:text-sm text-slate-500 block sm:inline sm:ml-3">
              Ambiente di problem solving matematico · Senza registrazione
            </span>
          </div>

          <a
            href="https://scienzalab.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-3.5 py-1.5 text-xs sm:text-sm font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-lg transition-colors whitespace-nowrap self-start sm:self-auto cursor-pointer"
            title="Visita ScienzaLab: laboratorio interattivo di scienze ed esperimenti"
          >
            <FlaskConical className="w-4 h-4 text-emerald-700 shrink-0" />
            <span>Vai a ScienzaLab</span>
            <ExternalLink className="w-3.5 h-3.5 text-emerald-600/70 shrink-0" />
          </a>
        </div>

        {/* Hero Split a 2 colonne bilanciate */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-12">
          <div className="lg:col-span-7 flex flex-col justify-center">
            <p className="text-sm font-medium text-sky-700 mb-3">
              Percorso verticale · Scuola Primaria e Secondaria di Primo Grado
            </p>
            <h1 className="font-display text-3xl sm:text-4xl lg:text-[2.75rem] font-bold tracking-tight text-slate-900 leading-[1.15] text-balance mb-4">
              Impara a comprendere, rappresentare e risolvere i problemi matematici
            </h1>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mb-6">
              Seleziona la tua classe per adattare automaticamente argomenti, complessità dei testi,
              rappresentazioni visive, vocabolario matematico, suggerimenti graduali e correzione ragionata
              degli errori. Potrai cambiare classe in qualsiasi momento dalle impostazioni conservando tutti i progressi.
            </p>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs sm:text-sm text-slate-500">
              <span>Spiegazioni guidate</span>
              <span aria-hidden="true">·</span>
              <span>Schemi a barre e segmenti</span>
              <span aria-hidden="true">·</span>
              <span>Diagnosi degli errori</span>
              <span aria-hidden="true">·</span>
              <span>Missioni reali</span>
              <span aria-hidden="true">·</span>
              <span>Adatto a PC, tablet e LIM</span>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="h-full min-h-[240px] rounded-xl overflow-hidden border border-slate-200 bg-white">
              <SafeImage
                imageKey="heroWorkshop"
                alt="Tavolo di studio con solidi geometrici in legno, compasso e quaderno a quadretti con disegni matematici"
                fallbackTitle="Laboratorio di Problem Solving"
                className="w-full h-full lg:h-full object-cover"
              />
            </div>
          </div>
        </section>

        {/* Sezione Scelta della Classe: ESCLUSIVAMENTE i 5 grandi pulsanti richiesti */}
        <section aria-labelledby="scelta-classe-heading">
          <div className="mb-6">
            <h2
              id="scelta-classe-heading"
              className="font-display text-2xl sm:text-3xl font-bold text-slate-900 text-balance"
            >
              Scegli la tua classe per iniziare
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-1">
              Tocca o clicca uno dei cinque pulsanti del percorso didattico:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {GRADE_PROFILES.map((grade) => {
              const prog = progressByGrade[grade.id];
              const solvedTotal =
                (prog?.solvedProblemIds.length ?? 0) +
                (prog?.solvedGeneratedCount ?? 0);
              const unitsDone = prog?.completedUnitIds.length ?? 0;
              const hasProgress = solvedTotal > 0 || unitsDone > 0;

              return (
                <button
                  key={grade.id}
                  type="button"
                  onClick={() => onSelectGrade(grade.id)}
                  className="group text-left bg-white border border-slate-200 hover:border-sky-600 rounded-xl p-6 flex flex-col justify-between min-h-[230px] transition-all duration-150 hover:-translate-y-0.5 cursor-pointer"
                >
                  <div>
                    <div className="flex items-center justify-between text-xs text-slate-500 mb-3 tabular-nums">
                      <span>0{grade.order} · {grade.schoolCycle}</span>
                      <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-sky-700 group-hover:translate-x-0.5 transition-transform shrink-0" />
                    </div>

                    <h3 className="font-display text-xl font-bold text-slate-900 group-hover:text-sky-800 transition-colors leading-snug mb-3">
                      {grade.buttonLabel}
                    </h3>

                    <p className="text-sm text-slate-600 leading-relaxed">
                      {grade.summary}
                    </p>
                  </div>

                  <div className="pt-4 mt-5 border-t border-slate-100 text-xs text-slate-500 tabular-nums">
                    {hasProgress ? (
                      <div className="flex items-center gap-1.5 text-emerald-700 font-medium">
                        <CheckCircle2 className="w-4 h-4 shrink-0" />
                        <span>
                          {solvedTotal} problemi · {unitsDone}/5 unità
                        </span>
                      </div>
                    ) : (
                      <span>5 unità guidate · Missioni attive</span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}
