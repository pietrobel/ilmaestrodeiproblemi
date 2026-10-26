import { useState, useEffect, useMemo } from 'react';
import {
  CheckCircle2,
  XCircle,
  Lightbulb,
  RefreshCw,
  Calculator,
  Eye,
  NotebookPen,
  ArrowRight,
} from 'lucide-react';
import { getGradeProfile } from '../data/grades';
import { getUnitsByGrade } from '../data/units';
import {
  generateDynamicProblem,
  getProblemsByGrade,
} from '../data/problemGenerator';
import {
  AutonomyMode,
  DifficultyLevel,
  GradeId,
  type AppSettings,
  type GradeProgress,
  type MathProblem,
} from '../types/math';
import {
  diagnoseStudentAnswer,
  formatItNumber,
  parseItalianNumber,
  type AnswerDiagnosis,
} from '../utils/mathEvaluator';
import { ProblemVisualDiagram } from './VisualSchemaRenderer';
import { CharacterCallout } from './CharacterCallout';
import { CHARACTERS, getDefaultMascotForGrade, getMascotsForGrade } from '../data/characters';

interface ProblemSolverCardProps {
  problem: MathProblem;
  defaultGuided: boolean;
  showTouchKeypadDefault: boolean;
  isAlreadySolved: boolean;
  scratchpadValue: string;
  onSaveScratchpad: (text: string) => void;
  onAttempt: () => void;
  onSolved: (wasFirstTry: boolean) => void;
  onNextAction?: () => void;
  nextActionLabel?: string;
}

/**
 * Componente riutilizzabile sia nella sezione Problemi sia dentro ogni capitolo delle Missioni:
 * gestisce Analisi Dati, Schema Visivo, Modalità Guidata passo-passo, Modalità Autonoma,
 * Tastierino LIM/Tablet, Suggerimenti progressivi e Diagnosi Intelligente degli Errori.
 */
export function ProblemSolverCard({
  problem,
  defaultGuided,
  showTouchKeypadDefault,
  isAlreadySolved,
  scratchpadValue,
  onSaveScratchpad,
  onAttempt,
  onSolved,
  onNextAction,
  nextActionLabel = 'Prossimo Problema',
}: ProblemSolverCardProps) {
  const [isGuidedMode, setIsGuidedMode] = useState<boolean>(defaultGuided);
  const [showKeypad, setShowKeypad] = useState<boolean>(showTouchKeypadDefault);
  const [showSchema, setShowSchema] = useState<boolean>(true);
  const [hintsOpened, setHintsOpened] = useState<number>(0);
  const [showFullSolution, setShowFullSolution] = useState<boolean>(false);

  // Fase 1: Comprensione dati & incognita
  const [inspectedDataIds, setInspectedDataIds] = useState<string[]>([]);
  const [selectedUnknown, setSelectedUnknown] = useState<number | null>(null);

  // Fase 2: Passaggi guidati
  const [stepChoices, setStepChoices] = useState<Record<string, number>>({});
  const [stepInputs, setStepInputs] = useState<Record<string, string>>({});
  const [stepVerified, setStepVerified] = useState<Record<string, boolean>>({});
  const [stepFeedback, setStepFeedback] = useState<Record<string, string>>({});

  // Fase 3: Risposta finale
  const [finalInput, setFinalInput] = useState<string>('');
  const [selectedUnit, setSelectedUnit] = useState<string>(problem.unitOptions[0] ?? problem.unit);
  const [diagnosis, setDiagnosis] = useState<AnswerDiagnosis | null>(null);
  const [localAttempts, setLocalAttempts] = useState<number>(0);

  // Reset quando cambia problema
  useEffect(() => {
    setIsGuidedMode(defaultGuided);
    setHintsOpened(0);
    setShowFullSolution(false);
    setInspectedDataIds([]);
    setSelectedUnknown(null);
    setStepChoices({});
    setStepInputs({});
    setStepVerified({});
    setStepFeedback({});
    setFinalInput('');
    setSelectedUnit(problem.unitOptions[0] ?? problem.unit);
    setDiagnosis(null);
    setLocalAttempts(0);
  }, [problem.id, defaultGuided, problem.unit, problem.unitOptions]);

  const toggleInspectDatum = (id: string) => {
    setInspectedDataIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const handleCheckStep = (stepIndex: number) => {
    const step = problem.steps[stepIndex];
    if (!step) return;
    const chosenOp = stepChoices[step.id];
    const rawVal = stepInputs[step.id] ?? '';
    const numVal = parseItalianNumber(rawVal);

    if (chosenOp === undefined) {
      setStepFeedback((prev) => ({
        ...prev,
        [step.id]: 'Seleziona prima l’operazione corretta tra le opzioni proposte.',
      }));
      return;
    }

    if (chosenOp !== step.correctChoiceIndex) {
      setStepFeedback((prev) => ({
        ...prev,
        [step.id]:
          'L’operazione scelta non traduce correttamente questa fase: rileggi la domanda del passaggio e osserva lo schema.',
      }));
      return;
    }

    if (numVal === null || Math.abs(numVal - step.expectedResult) > 0.05) {
      setStepFeedback((prev) => ({
        ...prev,
        [step.id]: `L’operazione è giusta! Ora controlla il calcolo numerico per questo passaggio.`,
      }));
      return;
    }

    setStepVerified((prev) => ({ ...prev, [step.id]: true }));
    setStepFeedback((prev) => ({
      ...prev,
      [step.id]: `✓ Passaggio verificato: ${step.explanation}`,
    }));

    // Se è l'ultimo passaggio, precompila comodamente la casella finale se vuota
    if (stepIndex === problem.steps.length - 1 && finalInput.trim() === '') {
      setFinalInput(formatItNumber(step.expectedResult));
      setSelectedUnit(problem.unit);
    }
  };

  const handleVerifyFinal = () => {
    onAttempt();
    const nextAttemptNum = localAttempts + 1;
    setLocalAttempts(nextAttemptNum);

    const result = diagnoseStudentAnswer(problem, finalInput, selectedUnit);
    setDiagnosis(result);

    if (result.isCorrect) {
      onSolved(nextAttemptNum === 1 && hintsOpened === 0);
    }
  };

  const appendKeypadChar = (ch: string) => {
    if (ch === 'C') {
      setFinalInput('');
      return;
    }
    if (ch === '⌫') {
      setFinalInput((prev) => prev.slice(0, -1));
      return;
    }
    setFinalInput((prev) => prev + ch);
  };

  const isPrimary =
    problem.gradeId === GradeId.QuartaPrimaria ||
    problem.gradeId === GradeId.QuintaPrimaria;

  const difficultyLabel =
    problem.difficulty === DifficultyLevel.Base
      ? 'Difficoltà Base'
      : problem.difficulty === DifficultyLevel.Intermedio
      ? 'Difficoltà Intermedia'
      : 'Difficoltà Avanzata';

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 space-y-8">
      {/* Barra superiore del problema: metadati puliti + selettore modalità Guidata/Autonoma */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-5 border-b border-slate-100">
        <div>
          <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 mb-1">
            <span>{problem.contextCategory}</span>
            <span aria-hidden="true">·</span>
            <span>{difficultyLabel}</span>
            {problem.isGenerated && (
              <>
                <span aria-hidden="true">·</span>
                <span className="text-sky-700 font-medium">Variante dinamica</span>
              </>
            )}
            {isAlreadySolved && (
              <>
                <span aria-hidden="true">·</span>
                <span className="text-emerald-700 font-semibold">✓ Già risolto</span>
              </>
            )}
          </div>
          <h2 className="font-display text-xl sm:text-2xl font-bold text-slate-900">
            {problem.title}
          </h2>
        </div>

        {/* Controllo segmentato funzionale Guidato vs Autonomo */}
        <div
          role="group"
          aria-label="Modalità di risoluzione"
          className="inline-flex items-center gap-1 p-1 bg-slate-100 rounded-lg self-start sm:self-auto shrink-0"
        >
          <button
            type="button"
            onClick={() => setIsGuidedMode(true)}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              isGuidedMode
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {isPrimary ? 'Guidato con aiutini' : 'Guidato passo-passo'}
          </button>
          <button
            type="button"
            onClick={() => setIsGuidedMode(false)}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              !isGuidedMode
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {isPrimary ? 'Provo da solo' : 'Autonomo'}
          </button>
        </div>
      </div>

      {/* Testo del problema e Domanda Finale ad alta leggibilità */}
      <div className="p-5 sm:p-6 rounded-xl bg-slate-50 border border-slate-200 space-y-4">
        <p className="text-base sm:text-lg text-slate-900 leading-relaxed">
          {problem.text}
        </p>
        <div className="pt-3 border-t border-slate-200/80">
          <p className="text-xs font-semibold text-sky-800 mb-0.5">
            {isPrimary ? 'La domanda da risolvere:' : 'Domanda a cui rispondere:'}
          </p>
          <p className="text-base sm:text-lg font-bold text-slate-900">
            {problem.finalQuestion}
          </p>
        </div>
      </div>

      {/* Griglia a 2 colonne: Schema Visivo & Analisi Dati a sinistra, Risoluzione & Quaderno a destra */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-5 space-y-6">
          {/* Schema visivo con toggle */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <h3 className="font-display text-base font-bold text-slate-900">
                {isPrimary ? 'Disegno e Schema Visivo' : 'Rappresentazione visiva'}
              </h3>
              <button
                type="button"
                onClick={() => setShowSchema((v) => !v)}
                className="inline-flex items-center gap-1.5 text-xs font-medium text-sky-700 hover:text-sky-900 cursor-pointer whitespace-nowrap shrink-0"
              >
                <Eye className="w-3.5 h-3.5 shrink-0" />
                <span>{showSchema ? 'Nascondi schema' : 'Mostra schema'}</span>
              </button>
            </div>
            {showSchema && <ProblemVisualDiagram schema={problem.visualSchema} />}
          </div>

          {/* Lente sui Dati (Utili, Superflui, Nascosti) */}
          <div className="space-y-3 pt-4 border-t border-slate-100">
            <div>
              <h3 className="font-display text-base font-bold text-slate-900">
                {isPrimary ? '🔍 La lente del detective sui dati' : 'Analisi dei dati del testo'}
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                {isPrimary
                  ? 'Tocca ogni pezzetto del testo per scovare i dati utili, i tranelli e le parole nascoste:'
                  : 'Clicca su ciascun elemento del testo per verificare se è un dato utile, superfluo o nascosto:'}
              </p>
            </div>

            <div className="space-y-2">
              {problem.dataItems.map((item) => {
                const isRevealed = inspectedDataIds.includes(item.id);
                return (
                  <div key={item.id}>
                    <button
                      type="button"
                      onClick={() => toggleInspectDatum(item.id)}
                      className={`w-full text-left px-3.5 py-2.5 rounded-lg border text-sm transition-colors cursor-pointer flex items-center justify-between gap-2 ${
                        isRevealed
                          ? item.kind === 'superfluo'
                            ? 'bg-amber-50/70 border-amber-300 text-amber-950'
                            : item.kind === 'nascosto'
                            ? 'bg-sky-50 border-sky-300 text-sky-950'
                            : 'bg-emerald-50/60 border-emerald-300 text-emerald-950'
                          : 'bg-white border-slate-200 hover:border-slate-300 text-slate-800'
                      }`}
                    >
                      <span className="font-medium">{item.label}</span>
                      <span className="text-xs font-semibold shrink-0">
                        {isRevealed
                          ? item.kind === 'superfluo'
                            ? 'Dato superfluo'
                            : item.kind === 'nascosto'
                            ? 'Dato nascosto'
                            : 'Dato utile'
                          : 'Analizza'}
                      </span>
                    </button>
                    {isRevealed && (
                      <p className="text-xs text-slate-600 px-2 pt-1.5 pb-1 leading-relaxed">
                        {item.explanation}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Quaderno a quadretti per appunti e calcoli liberi */}
          <div className="space-y-2 pt-4 border-t border-slate-100">
            <label
              htmlFor={`scratch-${problem.id}`}
              className="flex items-center gap-1.5 font-display text-base font-bold text-slate-900"
            >
              <NotebookPen className="w-4 h-4 text-slate-600 shrink-0" />
              <span>Foglio a quadretti per i tuoi calcoli</span>
            </label>
            <textarea
              id={`scratch-${problem.id}`}
              rows={4}
              value={scratchpadValue}
              onChange={(e) => onSaveScratchpad(e.target.value)}
              placeholder="Scrivi qui dati, equivalenze, espressioni o passaggi intermedi..."
              className="w-full rounded-lg border border-slate-200 quadretti-bg p-3 font-mono text-sm text-slate-800 leading-5 resize-y"
            />
          </div>
        </div>

        {/* Colonna destra: Percorso Guidato (se attivo) + Risposta Finale + Diagnosi Errori */}
        <div className="lg:col-span-7 space-y-6">
          {isGuidedMode && (
            <div className="space-y-5 pb-6 border-b border-slate-100">
              {/* Scelta dell'incognita */}
              <div className="space-y-2.5">
                <p className="text-xs font-semibold text-slate-500">
                  Fase 1 · Individua l’obiettivo finale (incognita)
                </p>
                <div className="space-y-2">
                  {problem.unknownOptions.map((opt, idx) => {
                    const chosen = selectedUnknown === idx;
                    const isCorrect = idx === problem.correctUnknownIndex;
                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setSelectedUnknown(idx)}
                        className={`w-full text-left px-3.5 py-2.5 rounded-lg border text-sm transition-colors cursor-pointer ${
                          chosen
                            ? isCorrect
                              ? 'bg-emerald-50 border-emerald-400 text-emerald-950 font-medium'
                              : 'bg-rose-50 border-rose-300 text-rose-950'
                            : 'bg-white border-slate-200 hover:border-sky-400 text-slate-700'
                        }`}
                      >
                        {chosen && (isCorrect ? '✓ ' : '✕ ')}
                        {opt}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Passaggi intermedi guidati */}
              <div className="space-y-4">
                <p className="text-xs font-semibold text-slate-500">
                  Fase 2 · Costruisci la soluzione passaggio per passaggio
                </p>

                {problem.steps.map((step, idx) => {
                  const verified = Boolean(stepVerified[step.id]);
                  const chosen = stepChoices[step.id];
                  const feedback = stepFeedback[step.id];

                  return (
                    <div
                      key={step.id}
                      className={`p-4 rounded-xl border space-y-3 ${
                        verified
                          ? 'bg-emerald-50/40 border-emerald-300'
                          : 'bg-slate-50/70 border-slate-200'
                      }`}
                    >
                      <p className="text-sm font-semibold text-slate-900">
                        <span className="font-mono text-sky-800 mr-1.5 tabular-nums">
                          Passo {idx + 1}.
                        </span>
                        {step.question}
                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {step.operationChoices.map((op, opIdx) => (
                          <button
                            key={opIdx}
                            type="button"
                            onClick={() =>
                              setStepChoices((prev) => ({
                                ...prev,
                                [step.id]: opIdx,
                              }))
                            }
                            className={`text-left px-3 py-2 rounded-lg border font-mono text-xs sm:text-sm tabular-nums transition-colors cursor-pointer ${
                              chosen === opIdx
                                ? 'bg-sky-700 text-white border-sky-700 font-semibold'
                                : 'bg-white text-slate-800 border-slate-200 hover:border-sky-400'
                            }`}
                          >
                            {op}
                          </button>
                        ))}
                      </div>

                      <div className="flex flex-wrap items-center gap-2.5 pt-1">
                        <label
                          htmlFor={`step-val-${step.id}`}
                          className="text-xs font-medium text-slate-600"
                        >
                          Risultato passo {idx + 1}:
                        </label>
                        <input
                          id={`step-val-${step.id}`}
                          type="text"
                          inputMode="decimal"
                          value={stepInputs[step.id] ?? ''}
                          onChange={(e) =>
                            setStepInputs((prev) => ({
                              ...prev,
                              [step.id]: e.target.value,
                            }))
                          }
                          placeholder="Calcola..."
                          className="w-28 px-3 py-1.5 text-sm font-mono tabular-nums bg-white border border-slate-300 rounded-lg"
                        />
                        <span className="text-xs font-mono text-slate-600">
                          {step.unit}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleCheckStep(idx)}
                          className="px-3.5 py-1.5 text-xs font-semibold text-sky-800 bg-sky-100 hover:bg-sky-200 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                        >
                          Verifica passo
                        </button>
                      </div>

                      {feedback && (
                        <p
                          className={`text-xs leading-relaxed ${
                            verified ? 'text-emerald-800 font-medium' : 'text-amber-900'
                          }`}
                        >
                          {feedback}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Box Risposta Finale + Unità di misura + Tastierino LIM */}
          <div className="space-y-4">
            <div className="flex items-center justify-between gap-4">
              <h3 className="font-display text-lg font-bold text-slate-900">
                Risposta finale e verifica
              </h3>
              <button
                type="button"
                onClick={() => setShowKeypad((k) => !k)}
                className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-600 hover:text-slate-900 cursor-pointer whitespace-nowrap shrink-0"
              >
                <Calculator className="w-3.5 h-3.5 shrink-0" />
                <span>
                  {showKeypad ? 'Chiudi tastierino LIM' : 'Tastierino LIM / Tablet'}
                </span>
              </button>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <div className="flex-1">
                <label htmlFor={`final-ans-${problem.id}`} className="sr-only">
                  Valore numerico della risposta finale
                </label>
                <input
                  id={`final-ans-${problem.id}`}
                  type="text"
                  inputMode="decimal"
                  value={finalInput}
                  onChange={(e) => setFinalInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleVerifyFinal();
                  }}
                  placeholder="Scrivi il risultato numerico (es. 42 o 3,8)"
                  className="w-full px-4 py-3 text-base font-mono font-semibold tabular-nums bg-white border border-slate-300 rounded-lg text-slate-900"
                />
              </div>

              <div>
                <label htmlFor={`final-unit-${problem.id}`} className="sr-only">
                  Unità di misura
                </label>
                <select
                  id={`final-unit-${problem.id}`}
                  value={selectedUnit}
                  onChange={(e) => setSelectedUnit(e.target.value)}
                  className="w-full sm:w-auto px-3.5 py-3 text-sm font-mono font-medium bg-slate-50 border border-slate-300 rounded-lg text-slate-900 cursor-pointer"
                >
                  {problem.unitOptions.map((u) => (
                    <option key={u} value={u}>
                      {u}
                    </option>
                  ))}
                </select>
              </div>

              <button
                type="button"
                onClick={handleVerifyFinal}
                className="px-6 py-3 text-sm font-semibold text-white bg-sky-700 hover:bg-sky-800 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                Verifica Risposta
              </button>
            </div>

            {/* Tastierino numerico per LIM e Tablet */}
            {showKeypad && (
              <div className="grid grid-cols-4 sm:grid-cols-7 gap-2 p-3 bg-slate-50 border border-slate-200 rounded-xl">
                {['7', '8', '9', '4', '5', '6', '1', '2', '3', '0', ',', '-', '⌫', 'C'].map(
                  (key) => (
                    <button
                      key={key}
                      type="button"
                      onClick={() => appendKeypadChar(key)}
                      className="min-h-[44px] py-2 px-3 rounded-lg bg-white hover:bg-sky-50 border border-slate-200 font-mono text-base font-semibold text-slate-900 transition-colors cursor-pointer tabular-nums"
                    >
                      {key}
                    </button>
                  )
                )}
              </div>
            )}

            {/* Pannello di Correzione Intelligente degli Errori / Conferma */}
            {diagnosis && (
              <div
                role="status"
                className={`p-5 rounded-xl border space-y-2 ${
                  diagnosis.isCorrect
                    ? 'bg-emerald-50/80 border-emerald-400 text-emerald-950'
                    : 'bg-rose-50/80 border-rose-300 text-rose-950'
                }`}
              >
                <div className="flex items-start gap-2.5">
                  {diagnosis.isCorrect ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
                  ) : (
                    <XCircle className="w-5 h-5 text-rose-700 shrink-0 mt-0.5" />
                  )}
                  <div className="space-y-1 flex-1">
                    <p className="text-sm sm:text-base font-bold">
                      {diagnosis.headline}
                    </p>
                    <p className="text-sm leading-relaxed">
                      {diagnosis.explanation}
                    </p>
                  </div>
                </div>

                {diagnosis.isCorrect && onNextAction && (
                  <div className="pt-3 flex justify-end">
                    <button
                      type="button"
                      onClick={onNextAction}
                      className="inline-flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                    >
                      <span>{nextActionLabel}</span>
                      <ArrowRight className="w-4 h-4 shrink-0" />
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Aiuti progressivi a 3 livelli + Spiegazione completa */}
            <div className="pt-4 border-t border-slate-100 space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <button
                  type="button"
                  disabled={hintsOpened >= 3}
                  onClick={() => setHintsOpened((h) => Math.min(3, h + 1))}
                  className="inline-flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-medium text-amber-900 bg-amber-50 hover:bg-amber-100 disabled:opacity-50 disabled:cursor-not-allowed border border-amber-200 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                >
                  <Lightbulb className="w-4 h-4 text-amber-700 shrink-0" />
                  <span>
                    {hintsOpened === 0
                      ? 'Chiedi un suggerimento (1/3)'
                      : hintsOpened < 3
                      ? `Suggerimento successivo (${hintsOpened + 1}/3)`
                      : 'Tutti i suggerimenti mostrati (3/3)'}
                  </span>
                </button>

                {(localAttempts >= 2 || diagnosis?.isCorrect || isAlreadySolved) && (
                  <button
                    type="button"
                    onClick={() => setShowFullSolution((s) => !s)}
                    className="px-4 py-2 text-xs sm:text-sm font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    {showFullSolution
                      ? 'Nascondi svolgimento completo'
                      : 'Mostra svolgimento completo'}
                  </button>
                )}
              </div>

              {hintsOpened > 0 && (
                <div className="space-y-2 p-4 rounded-xl bg-amber-50/60 border border-amber-200">
                  {problem.hints.slice(0, hintsOpened).map((hint, idx) => (
                    <p key={idx} className="text-sm text-amber-950 leading-relaxed">
                      <span className="font-mono font-semibold mr-2 tabular-nums">
                        Aiuto {idx + 1}:
                      </span>
                      {hint}
                    </p>
                  ))}
                </div>
              )}

              {showFullSolution && (
                <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-2.5">
                  <p className="text-xs font-semibold text-slate-500">
                    Svolgimento ragionato completo
                  </p>
                  {problem.steps.map((s, idx) => (
                    <p key={s.id} className="text-sm text-slate-800 leading-relaxed">
                      <span className="font-mono font-semibold text-sky-800 mr-2 tabular-nums">
                        {idx + 1}.
                      </span>
                      {s.explanation}
                    </p>
                  ))}
                  <p className="text-sm font-mono font-semibold text-slate-900 pt-2 border-t border-slate-200 tabular-nums">
                    Espressione sintetica: {problem.expressionSummary} → Risposta:{' '}
                    {formatItNumber(problem.finalAnswer)} {problem.unit}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

interface ProblemWorkbenchProps {
  gradeId: GradeId;
  progress: GradeProgress;
  settings: AppSettings;
  initialUnitFilter?: string | null;
  onClearUnitFilter?: () => void;
  onAttempt: () => void;
  onSolved: (problemId: string, isGenerated: boolean, wasFirstTry: boolean) => void;
  onSaveScratchpad: (problemId: string, text: string) => void;
}

export function ProblemWorkbench({
  gradeId,
  progress,
  settings,
  initialUnitFilter,
  onClearUnitFilter,
  onAttempt,
  onSolved,
  onSaveScratchpad,
}: ProblemWorkbenchProps) {
  const profile = getGradeProfile(gradeId);
  const units = getUnitsByGrade(gradeId);
  const staticProblems = useMemo(() => getProblemsByGrade(gradeId), [gradeId]);

  const [difficultyFilter, setDifficultyFilter] = useState<'all' | DifficultyLevel>('all');
  const [unitFilter, setUnitFilter] = useState<string>(initialUnitFilter ?? 'all');
  const [dynamicProblem, setDynamicProblem] = useState<MathProblem | null>(null);
  const [selectedProblemId, setSelectedProblemId] = useState<string>(
    staticProblems[0]?.id ?? ''
  );

  useEffect(() => {
    if (initialUnitFilter) {
      setUnitFilter(initialUnitFilter);
      setDifficultyFilter('all');
      setDynamicProblem(null);
      const firstInUnit = staticProblems.find((p) => p.unitId === initialUnitFilter);
      if (firstInUnit) setSelectedProblemId(firstInUnit.id);
    }
  }, [initialUnitFilter, staticProblems]);

  useEffect(() => {
    setDynamicProblem(null);
    setDifficultyFilter('all');
    if (!initialUnitFilter) {
      setUnitFilter('all');
      const firstUnsolved =
        staticProblems.find((p) => !progress.solvedProblemIds.includes(p.id)) ??
        staticProblems[0];
      if (firstUnsolved) setSelectedProblemId(firstUnsolved.id);
    }
  }, [gradeId]);

  const filteredProblems = useMemo(() => {
    return staticProblems.filter((p) => {
      if (difficultyFilter !== 'all' && p.difficulty !== difficultyFilter) {
        return false;
      }
      if (unitFilter !== 'all' && p.unitId !== unitFilter) {
        return false;
      }
      return true;
    });
  }, [staticProblems, difficultyFilter, unitFilter]);

  const activeProblem: MathProblem = useMemo(() => {
    if (dynamicProblem) return dynamicProblem;
    return (
      filteredProblems.find((p) => p.id === selectedProblemId) ??
      filteredProblems[0] ??
      staticProblems[0]
    );
  }, [dynamicProblem, filteredProblems, selectedProblemId, staticProblems]);

  const defaultGuided =
    settings.autonomyMode === AutonomyMode.Guidato
      ? true
      : settings.autonomyMode === AutonomyMode.Autonomo
      ? false
      : profile.defaultAutonomy === 'guidato';

  const handleGenerateVariant = () => {
    const targetDiff =
      difficultyFilter === 'all' ? DifficultyLevel.Intermedio : difficultyFilter;
    const generated = generateDynamicProblem(gradeId, targetDiff);
    setDynamicProblem(generated);
  };

  const handleNextProblem = () => {
    if (dynamicProblem) {
      handleGenerateVariant();
      return;
    }
    const idx = filteredProblems.findIndex((p) => p.id === activeProblem.id);
    const next = filteredProblems[(idx + 1) % filteredProblems.length];
    if (next) setSelectedProblemId(next.id);
  };

  const availableMascots = getMascotsForGrade(gradeId);
  const currentMascot =
    CHARACTERS.find((c) => c.id === settings.selectedMascotId) ||
    availableMascots[0] ||
    getDefaultMascotForGrade(gradeId);

  const isPrimaryGrade =
    gradeId === GradeId.QuartaPrimaria || gradeId === GradeId.QuintaPrimaria;

  return (
    <div className="space-y-6">
      {/* Box compagno di squadra / Mascot callout */}
      <CharacterCallout
        mascot={currentMascot}
        title={`${currentMascot.name} è al tuo fianco`}
        message={
          isPrimaryGrade
            ? `«Ciao! Leggi con calma il problema e cerca la domanda. Se trovi un numero che non serve a rispondere, è un dato superfluo: non usarlo!»`
            : `«Individua prima le relazioni tra i dati e l’incognita: puoi modellizzare il problema con il metodo dei segmenti o con un’espressione aritmetica.»`
        }
      />
      {/* Barra di controllo filtri progressione difficoltà, unità e generatore infinito */}
      <section className="bg-white border border-slate-200 rounded-xl p-5 sm:p-6 space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <p className="text-xs text-slate-500 mb-0.5 tabular-nums">
              {profile.buttonLabel} · {progress.solvedProblemIds.length}/
              {staticProblems.length} problemi del catalogo risolti ·{' '}
              {progress.solvedGeneratedCount} varianti dinamiche
            </p>
            <h1 className="font-display text-2xl font-bold text-slate-900">
              Palestra di Problem Solving
            </h1>
          </div>

          <button
            type="button"
            onClick={handleGenerateVariant}
            className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-sky-800 bg-sky-50 hover:bg-sky-100 border border-sky-200 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer self-start lg:self-auto"
          >
            <RefreshCw className="w-4 h-4 shrink-0" />
            <span>Genera Nuova Variante</span>
          </button>
        </div>

        {/* Filtri difficoltà e unità */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-3 border-t border-slate-100">
          <div
            role="group"
            aria-label="Filtra per difficoltà"
            className="inline-flex items-center gap-1 p-1 bg-slate-100 rounded-lg self-start overflow-x-auto max-w-full"
          >
            {(
              [
                { id: 'all', label: 'Tutti i livelli' },
                { id: DifficultyLevel.Base, label: 'Base' },
                { id: DifficultyLevel.Intermedio, label: 'Intermedio' },
                { id: DifficultyLevel.Avanzato, label: 'Avanzato' },
              ] as const
            ).map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => {
                  setDynamicProblem(null);
                  setDifficultyFilter(tab.id);
                }}
                className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  difficultyFilter === tab.id && !dynamicProblem
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <label htmlFor="unit-filter-select" className="text-xs text-slate-500 whitespace-nowrap">
              Argomento:
            </label>
            <select
              id="unit-filter-select"
              value={unitFilter}
              onChange={(e) => {
                setDynamicProblem(null);
                setUnitFilter(e.target.value);
                if (e.target.value === 'all' && onClearUnitFilter) {
                  onClearUnitFilter();
                }
              }}
              className="px-3 py-1.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-lg text-slate-800 max-w-[260px] truncate cursor-pointer"
            >
              <option value="all">Tutte le unità della classe</option>
              {units.map((u) => (
                <option key={u.id} value={u.id}>
                  0{u.index}. {u.title}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Selettore orizzontale problemi disponibili */}
        {!dynamicProblem && filteredProblems.length > 0 && (
          <div className="flex items-center gap-2 overflow-x-auto pt-2 pb-1">
            {filteredProblems.map((prob, i) => {
              const isCurrent = prob.id === activeProblem.id;
              const isSolved = progress.solvedProblemIds.includes(prob.id);
              return (
                <button
                  key={prob.id}
                  type="button"
                  onClick={() => setSelectedProblemId(prob.id)}
                  className={`px-3.5 py-2 rounded-lg border text-xs font-medium whitespace-nowrap shrink-0 transition-colors cursor-pointer flex items-center gap-1.5 tabular-nums ${
                    isCurrent
                      ? 'bg-sky-700 text-white border-sky-700 font-semibold'
                      : isSolved
                      ? 'bg-emerald-50/70 text-emerald-900 border-emerald-200 hover:border-emerald-400'
                      : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <span>
                    {i + 1}. {prob.title}
                  </span>
                  {isSolved && (
                    <CheckCircle2
                      className={`w-3.5 h-3.5 shrink-0 ${
                        isCurrent ? 'text-emerald-200' : 'text-emerald-600'
                      }`}
                    />
                  )}
                </button>
              );
            })}
          </div>
        )}
      </section>

      {/* Scheda attiva di risoluzione */}
      {activeProblem ? (
        <ProblemSolverCard
          problem={activeProblem}
          defaultGuided={defaultGuided}
          showTouchKeypadDefault={settings.showTouchKeypad}
          isAlreadySolved={
            !activeProblem.isGenerated &&
            progress.solvedProblemIds.includes(activeProblem.id)
          }
          scratchpadValue={progress.scratchpadNotes[activeProblem.id] ?? ''}
          onSaveScratchpad={(txt) => onSaveScratchpad(activeProblem.id, txt)}
          onAttempt={onAttempt}
          onSolved={(firstTry) =>
            onSolved(activeProblem.id, Boolean(activeProblem.isGenerated), firstTry)
          }
          onNextAction={handleNextProblem}
          nextActionLabel={
            activeProblem.isGenerated
              ? 'Genera un’altra variante'
              : 'Passa al problema successivo'
          }
        />
      ) : (
        <div className="bg-white border border-slate-200 rounded-xl p-8 text-center space-y-3">
          <p className="text-base font-medium text-slate-700">
            Nessun problema statico corrisponde a questa combinazione di filtri.
          </p>
          <button
            type="button"
            onClick={() => {
              setDifficultyFilter('all');
              setUnitFilter('all');
            }}
            className="px-4 py-2 text-sm font-semibold text-white bg-sky-700 rounded-lg hover:bg-sky-800 cursor-pointer"
          >
            Mostra tutti i problemi
          </button>
        </div>
      )}
    </div>
  );
}
