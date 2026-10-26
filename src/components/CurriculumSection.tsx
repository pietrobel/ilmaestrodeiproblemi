import { useState, useEffect } from 'react';
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  AlertTriangle,
  SlidersHorizontal,
} from 'lucide-react';
import { getGradeProfile } from '../data/grades';
import { getUnitsByGrade } from '../data/units';
import {
  ActiveSection,
  type GradeId,
  type GradeProgress,
} from '../types/math';
import { LessonVisualDiagram } from './VisualSchemaRenderer';

interface CurriculumSectionProps {
  gradeId: GradeId;
  progress: GradeProgress;
  onCompleteUnit: (unitId: string) => void;
  onPracticeUnit: (unitId: string) => void;
  onNavigate: (section: ActiveSection) => void;
}

export function CurriculumSection({
  gradeId,
  progress,
  onCompleteUnit,
  onPracticeUnit,
  onNavigate,
}: CurriculumSectionProps) {
  const profile = getGradeProfile(gradeId);
  const units = getUnitsByGrade(gradeId);

  const [selectedUnitId, setSelectedUnitId] = useState<string>(
    units[0]?.id ?? ''
  );
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [checkSubmitted, setCheckSubmitted] = useState(false);

  // Aggiorna l'unità selezionata quando si cambia classe
  useEffect(() => {
    const first = getUnitsByGrade(gradeId)[0];
    if (first) {
      setSelectedUnitId(first.id);
      setSelectedAnswer(null);
      setCheckSubmitted(false);
    }
  }, [gradeId]);

  const activeUnit =
    units.find((u) => u.id === selectedUnitId) ?? units[0];

  const handleSelectUnit = (id: string) => {
    setSelectedUnitId(id);
    setSelectedAnswer(null);
    setCheckSubmitted(false);
  };

  const handleVerifyQuickCheck = () => {
    if (selectedAnswer === null || !activeUnit) return;
    setCheckSubmitted(true);
    if (selectedAnswer === activeUnit.quickCheck.correctIndex) {
      onCompleteUnit(activeUnit.id);
    }
  };

  const totalSolved =
    progress.solvedProblemIds.length + progress.solvedGeneratedCount;
  const missionsCount = Object.values(
    progress.completedMissionChapters
  ).reduce((acc, arr) => acc + arr.length, 0);

  return (
    <div className="space-y-8">
      {/* Intestazione della Classe Attiva con metriche pulite non racchiuse in pillole */}
      <section className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 pb-6 border-b border-slate-100">
          <div>
            <p className="text-xs sm:text-sm text-slate-500 mb-1.5">
              {profile.schoolCycle} · Percorso adattivo attivo
            </p>
            <h1 className="font-display text-2xl sm:text-3xl font-bold text-slate-900 text-balance">
              {profile.buttonLabel}
            </h1>
            <p className="text-sm sm:text-base text-slate-600 mt-1.5 max-w-3xl">
              {profile.summary}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => onNavigate(ActiveSection.Giochi)}
              className="px-4 py-2.5 text-sm font-semibold text-white bg-sky-700 hover:bg-sky-800 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              Sfide e Giochi Flash
            </button>
            <button
              type="button"
              onClick={() => onNavigate(ActiveSection.Laboratorio)}
              className="px-4 py-2.5 text-sm font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              Laboratorio Visivo
            </button>
            <button
              type="button"
              onClick={() => onNavigate(ActiveSection.Impostazioni)}
              className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-slate-700 border border-slate-300 hover:border-slate-400 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <SlidersHorizontal className="w-4 h-4 shrink-0" />
              <span>Cambia Classe</span>
            </button>
          </div>
        </div>

        {/* Striscia a 4 colonne del profilo didattico e dei progressi */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-6">
          <div>
            <p className="text-xs text-slate-500 mb-1">Unità completate</p>
            <p className="font-mono text-xl font-semibold text-slate-900 tabular-nums">
              {progress.completedUnitIds.length} / {units.length}
            </p>
            <p className="text-xs text-slate-500 mt-1">
              Spiegazioni ed esercizi rapidi
            </p>
          </div>
          <div>
            <p className="text-xs text-slate-500 mb-1">Problemi risolti</p>
            <p className="font-mono text-xl font-semibold text-slate-900 tabular-nums">
              {totalSolved}
            </p>
            <p className="text-xs text-slate-500 mt-1">
              Inclusi problemi dinamici
            </p>
          </div>
          <div>
            <p className="text-xs text-slate-500 mb-1">Tappe missione</p>
            <p className="font-mono text-xl font-semibold text-slate-900 tabular-nums">
              {missionsCount}
            </p>
            <p className="text-xs text-slate-500 mt-1">
              Sfide contestualizzate superate
            </p>
          </div>
          <div>
            <p className="text-xs text-slate-500 mb-1">Calibrazione automatica</p>
            <p className="text-sm font-semibold text-slate-900">
              {profile.defaultAutonomy === 'guidato'
                ? 'Guida passo-passo attiva'
                : 'Modellizzazione autonoma'}
            </p>
            <p className="text-xs text-slate-500 mt-1">
              {profile.operationsCountNote}
            </p>
          </div>
        </div>
      </section>

      {/* Layout a 2 colonne: Indice delle 5 Unità a sinistra + Lezione interattiva a destra */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <aside className="lg:col-span-4 bg-white border border-slate-200 rounded-xl p-5">
          <div className="pb-3 mb-3 border-b border-slate-100">
            <h2 className="font-display text-lg font-bold text-slate-900">
              Unità del percorso
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Seleziona un argomento per studiare il metodo e metterti alla prova
            </p>
          </div>

          <div className="space-y-2">
            {units.map((unit) => {
              const isSelected = unit.id === activeUnit?.id;
              const isDone = progress.completedUnitIds.includes(unit.id);

              return (
                <button
                  key={unit.id}
                  type="button"
                  onClick={() => handleSelectUnit(unit.id)}
                  className={`w-full text-left p-3.5 rounded-lg transition-colors cursor-pointer flex items-start justify-between gap-3 ${
                    isSelected
                      ? 'bg-sky-50 text-slate-900 border border-sky-300'
                      : 'hover:bg-slate-50 text-slate-700 border border-transparent'
                  }`}
                >
                  <div>
                    <p className="text-xs text-slate-500 tabular-nums mb-0.5">
                      Unità 0{unit.index}
                    </p>
                    <p className="text-sm font-semibold leading-snug">
                      {unit.title}
                    </p>
                  </div>
                  {isDone && (
                    <CheckCircle2
                      className="w-4 h-4 text-emerald-600 shrink-0 mt-1"
                      aria-label="Unità completata"
                    />
                  )}
                </button>
              );
            })}
          </div>
        </aside>

        {activeUnit && (
          <article className="lg:col-span-8 bg-white border border-slate-200 rounded-xl p-6 sm:p-8 space-y-8">
            {/* Titolo dell'Unità e Idea Chiave */}
            <div className="pb-6 border-b border-slate-100">
              <p className="text-xs text-slate-500 mb-1.5 tabular-nums">
                Unità 0{activeUnit.index} · {profile.buttonLabel}
              </p>
              <h2 className="font-display text-2xl font-bold text-slate-900 text-balance">
                {activeUnit.title}
              </h2>
              <p className="text-sm sm:text-base text-slate-600 mt-1">
                {activeUnit.subtitle}
              </p>

              <div className="mt-5 p-4 rounded-lg bg-sky-50/70 border border-sky-200">
                <p className="text-xs font-semibold text-sky-800 mb-1 flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4 shrink-0" />
                  <span>Principio chiave di problem solving</span>
                </p>
                <p className="text-sm sm:text-base text-slate-800 leading-relaxed">
                  {activeUnit.keyIdea}
                </p>
              </div>
            </div>

            {/* Passi del metodo + Rappresentazione visiva */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
              <div>
                <h3 className="font-display text-lg font-bold text-slate-900 mb-3">
                  Metodo in 3 passi
                </h3>
                <ol className="space-y-3">
                  {activeUnit.methodSteps.map((step, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 text-sm text-slate-700 leading-relaxed"
                    >
                      <span className="font-mono text-xs font-semibold text-sky-800 bg-sky-100 rounded w-6 h-6 flex items-center justify-center shrink-0 mt-0.5 tabular-nums">
                        {i + 1}
                      </span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
              </div>

              <div>
                <h3 className="font-display text-lg font-bold text-slate-900 mb-3">
                  Modello visivo
                </h3>
                <LessonVisualDiagram spec={activeUnit.visual} />
              </div>
            </div>

            {/* Problema modello svolto passo dopo passo */}
            <div className="pt-6 border-t border-slate-100 space-y-4">
              <h3 className="font-display text-lg font-bold text-slate-900">
                Esempio guidato svolto
              </h3>
              <div className="p-5 rounded-lg bg-slate-50 border border-slate-200 space-y-3">
                <p className="text-sm sm:text-base text-slate-900 font-medium leading-relaxed">
                  «{activeUnit.workedExample.problemText}»
                </p>
                <div className="space-y-2 pt-2 border-t border-slate-200/80">
                  {activeUnit.workedExample.reasoning.map((line, idx) => (
                    <p
                      key={idx}
                      className="text-sm text-slate-700 leading-relaxed"
                    >
                      <span className="font-mono font-semibold text-slate-900 mr-2 tabular-nums">
                        {idx + 1}.
                      </span>
                      {line}
                    </p>
                  ))}
                </div>
                <p className="text-sm font-semibold text-emerald-800 pt-1">
                  Risposta verificata: {activeUnit.workedExample.finalAnswer}
                </p>
              </div>

              {/* Avviso errore frequente (senza bordo sinistro spesso, ma con card uniforme e icona esplicita) */}
              <div className="p-4 rounded-lg bg-amber-50/70 border border-amber-200 flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-semibold text-amber-900 mb-0.5">
                    Errore tipico da evitare
                  </p>
                  <p className="text-sm text-amber-950 leading-relaxed">
                    {activeUnit.commonTrap}
                  </p>
                </div>
              </div>
            </div>

            {/* Esercizio interattivo immediato di comprensione */}
            <div className="pt-6 border-t border-slate-100 space-y-4">
              <div className="flex items-center justify-between gap-4">
                <h3 className="font-display text-lg font-bold text-slate-900">
                  Verifica subito di aver capito
                </h3>
                {progress.completedUnitIds.includes(activeUnit.id) && (
                  <span className="text-xs font-semibold text-emerald-700 flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>Superata</span>
                  </span>
                )}
              </div>

              <p className="text-sm sm:text-base text-slate-800 leading-relaxed">
                {activeUnit.quickCheck.prompt}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {activeUnit.quickCheck.options.map((opt, idx) => {
                  const isChosen = selectedAnswer === idx;
                  const isRight = idx === activeUnit.quickCheck.correctIndex;

                  let stateStyle =
                    'bg-white border-slate-200 hover:border-sky-500 text-slate-800';
                  if (checkSubmitted) {
                    if (isRight) {
                      stateStyle =
                        'bg-emerald-50 border-emerald-500 text-emerald-950 font-semibold';
                    } else if (isChosen && !isRight) {
                      stateStyle =
                        'bg-rose-50 border-rose-400 text-rose-950';
                    }
                  } else if (isChosen) {
                    stateStyle =
                      'bg-sky-50 border-sky-600 text-sky-950 font-semibold';
                  }

                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => {
                        setSelectedAnswer(idx);
                        setCheckSubmitted(false);
                      }}
                      className={`text-left px-4 py-3 rounded-lg border text-sm transition-colors cursor-pointer font-mono tabular-nums ${stateStyle}`}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                <button
                  type="button"
                  disabled={selectedAnswer === null}
                  onClick={handleVerifyQuickCheck}
                  className="px-5 py-2.5 text-sm font-semibold text-white bg-sky-700 hover:bg-sky-800 disabled:bg-slate-300 disabled:cursor-not-allowed rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                >
                  Controlla Risposta
                </button>

                <button
                  type="button"
                  onClick={() => onPracticeUnit(activeUnit.id)}
                  className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-sky-800 bg-sky-50 hover:bg-sky-100 border border-sky-200 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                >
                  <span>Risolvi i problemi di questa unità</span>
                  <ArrowRight className="w-4 h-4 shrink-0" />
                </button>
              </div>

              {checkSubmitted && selectedAnswer !== null && (
                <div
                  className={`p-4 rounded-lg border text-sm leading-relaxed ${
                    selectedAnswer === activeUnit.quickCheck.correctIndex
                      ? 'bg-emerald-50/80 border-emerald-300 text-emerald-950'
                      : 'bg-rose-50/80 border-rose-300 text-rose-950'
                  }`}
                >
                  <p className="font-semibold mb-1">
                    {selectedAnswer === activeUnit.quickCheck.correctIndex
                      ? '✓ Risposta esatta! Unità registrata nei tuoi progressi.'
                      : '✕ Non ancora: osserva il ragionamento e riprova.'}
                  </p>
                  <p>{activeUnit.quickCheck.explanation}</p>
                </div>
              )}
            </div>
          </article>
        )}
      </div>
    </div>
  );
}
