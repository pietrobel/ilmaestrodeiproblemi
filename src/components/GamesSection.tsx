import { useState } from 'react';
import {
  Trophy,
  RotateCcw,
  Sparkles,
  CheckCircle2,
  XCircle,
  Award,
  Zap,
  Target,
  ArrowRight,
} from 'lucide-react';
import { GradeId, type CharacterMascot, type MiniGameItem } from '../types/math';
import { MINI_GAMES_BANK, getMiniGamesForGrade } from '../data/games';
import { CHARACTERS, getMascotsForGrade, getDefaultMascotForGrade } from '../data/characters';
import { getGradeProfile } from '../data/grades';
import { CharacterCallout } from './CharacterCallout';

interface GamesSectionProps {
  gradeId: GradeId;
  savedHighScores: Record<string, number>;
  onSaveHighScore: (gameId: string, score: number) => void;
  selectedMascotId?: string;
}

export function GamesSection({
  gradeId,
  savedHighScores,
  onSaveHighScore,
  selectedMascotId,
}: GamesSectionProps) {
  const profile = getGradeProfile(gradeId);
  const availableMascots = getMascotsForGrade(gradeId);
  const currentMascot =
    CHARACTERS.find((c) => c.id === selectedMascotId) ||
    availableMascots[0] ||
    getDefaultMascotForGrade(gradeId);

  // Giochi disponibili per la classe corrente
  const classGames = getMiniGamesForGrade(gradeId);
  // Se per una classe ci sono pochi giochi specifici, unisci quelli compatibili senza mostrare contenuti fuori livello
  const activeGames =
    classGames.length > 0
      ? classGames
      : MINI_GAMES_BANK.filter((g) => g.gradeId === gradeId);

  const [currentGameIndex, setCurrentGameIndex] = useState(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [hasChecked, setHasChecked] = useState(false);
  const [scoreStreak, setScoreStreak] = useState(0);
  const [totalCorrect, setTotalCorrect] = useState(0);
  const [showCelebration, setShowCelebration] = useState(false);
  const [tipIndex, setTipIndex] = useState(0);

  const currentGame: MiniGameItem | undefined =
    activeGames[currentGameIndex % activeGames.length];

  const handleSelectOption = (optionId: string) => {
    if (hasChecked) return;
    setSelectedOptionId(optionId);
  };

  const handleCheckAnswer = () => {
    if (!selectedOptionId || !currentGame || hasChecked) return;
    setHasChecked(true);

    const chosen = currentGame.options.find((o) => o.id === selectedOptionId);
    if (chosen?.isCorrect) {
      const nextStreak = scoreStreak + 1;
      setScoreStreak(nextStreak);
      setTotalCorrect((prev) => prev + 1);
      const points = 100 + nextStreak * 25;
      onSaveHighScore(currentGame.id, points);
      setShowCelebration(true);
    } else {
      setScoreStreak(0);
      setShowCelebration(false);
    }
  };

  const handleNextGame = () => {
    setSelectedOptionId(null);
    setHasChecked(false);
    setShowCelebration(false);
    setCurrentGameIndex((prev) => (prev + 1) % activeGames.length);
  };

  const handleRestartStreak = () => {
    setSelectedOptionId(null);
    setHasChecked(false);
    setShowCelebration(false);
    setScoreStreak(0);
    setCurrentGameIndex(0);
  };

  const chosenOption = currentGame?.options.find((o) => o.id === selectedOptionId);
  const isCorrect = chosenOption?.isCorrect;

  return (
    <div className="space-y-6">
      {/* Intestazione Sezione Giochi */}
      <section className="bg-white border border-slate-200 rounded-xl p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <p className="text-xs text-slate-500 mb-0.5">
              Sfide veloci e palestra di logica · {profile.buttonLabel}
            </p>
            <h1 className="font-display text-2xl font-bold text-slate-900">
              Palestra Giochi di Problem Solving
            </h1>
          </div>

          {/* Indicatori di Punteggio e Serie */}
          <div className="flex items-center gap-3">
            <div className="px-3.5 py-1.5 rounded-lg bg-amber-50 border border-amber-200 flex items-center gap-2 text-amber-900 font-mono text-xs sm:text-sm font-semibold tabular-nums">
              <Zap className="w-4 h-4 text-amber-600" />
              <span>Serie attiva: {scoreStreak}</span>
            </div>
            <div className="px-3.5 py-1.5 rounded-lg bg-sky-50 border border-sky-200 flex items-center gap-2 text-sky-900 font-mono text-xs sm:text-sm font-semibold tabular-nums">
              <Trophy className="w-4 h-4 text-sky-600" />
              <span>Indovinati: {totalCorrect}</span>
            </div>
          </div>
        </div>

        {/* Mascot Callout con tip e accoglienza */}
        <CharacterCallout
          mascot={currentMascot}
          title={`${currentMascot.name} fa il tifo per te!`}
          message={currentMascot.tips[tipIndex % currentMascot.tips.length]}
          onNextTip={() => setTipIndex((prev) => prev + 1)}
        />
      </section>

      {/* Arena di Gioco */}
      {currentGame && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Card Principale del Gioco */}
          <div className="lg:col-span-8 bg-white border border-slate-200 rounded-xl p-6 flex flex-col justify-between space-y-6">
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs text-slate-500">
                <span className="font-semibold uppercase tracking-wider text-sky-800">
                  {currentGame.category === 'dato-superfluo' && '🔍 Caccia al Dato Superfluo'}
                  {currentGame.category === 'parola-nascosta' && '🎭 Parola-Numero Nascosta'}
                  {currentGame.category === 'operazione-lampo' && '⚡ Operazione al Volo'}
                  {currentGame.category === 'stima-ragionevole' && '🧭 Bussola della Stima'}
                </span>
                <span className="tabular-nums font-mono">
                  Sfida {currentGameIndex + 1} di {activeGames.length}
                </span>
              </div>

              <h2 className="font-display text-xl sm:text-2xl font-bold text-slate-900">
                {currentGame.title}
              </h2>

              <p className="text-xs sm:text-sm text-slate-600 italic bg-slate-50 p-3 rounded-lg border border-slate-100">
                {currentGame.storyContext}
              </p>

              {/* Testo del quesito */}
              <div className="p-4 sm:p-5 rounded-xl bg-slate-100/70 border border-slate-200 text-slate-900 font-medium text-base sm:text-lg leading-relaxed">
                {currentGame.prompt}
              </div>
            </div>

            {/* Opzioni di risposta selezionabili */}
            <div className="space-y-3 pt-2">
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Scegli la risposta corretta:
              </p>

              <div className="space-y-2.5">
                {currentGame.options.map((opt) => {
                  const isSelected = selectedOptionId === opt.id;
                  let optStyle =
                    'border-slate-200 hover:border-sky-300 bg-white text-slate-800';

                  if (hasChecked) {
                    if (opt.isCorrect) {
                      optStyle = 'border-emerald-500 bg-emerald-50 text-emerald-950 font-semibold';
                    } else if (isSelected && !opt.isCorrect) {
                      optStyle = 'border-rose-500 bg-rose-50 text-rose-950';
                    } else {
                      optStyle = 'border-slate-200 bg-slate-50 text-slate-400 opacity-60';
                    }
                  } else if (isSelected) {
                    optStyle = 'border-sky-600 bg-sky-50 text-sky-950 shadow-xs font-semibold';
                  }

                  return (
                    <button
                      key={opt.id}
                      type="button"
                      disabled={hasChecked}
                      onClick={() => handleSelectOption(opt.id)}
                      className={`w-full text-left p-4 rounded-xl border-2 transition-all flex items-start gap-3 cursor-pointer ${optStyle}`}
                    >
                      <span className="font-mono text-xs mt-0.5 px-2 py-0.5 rounded bg-slate-100 font-bold shrink-0">
                        {opt.id.toUpperCase()}
                      </span>
                      <span className="text-sm sm:text-base leading-snug flex-1">
                        {opt.label}
                      </span>
                      {hasChecked && opt.isCorrect && (
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                      )}
                      {hasChecked && isSelected && !opt.isCorrect && (
                        <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Spiegazione & Feedback educativo */}
            {hasChecked && chosenOption && (
              <div
                className={`p-4 rounded-xl border space-y-2 ${
                  isCorrect
                    ? 'bg-emerald-50 border-emerald-200 text-emerald-950'
                    : 'bg-rose-50 border-rose-200 text-rose-950'
                }`}
              >
                <div className="flex items-center gap-2 font-display text-sm font-bold">
                  {isCorrect ? (
                    <>
                      <Sparkles className="w-4 h-4 text-emerald-600" />
                      <span>Ottimo colpo! Risposta corretta!</span>
                    </>
                  ) : (
                    <>
                      <XCircle className="w-4 h-4 text-rose-600" />
                      <span>Non proprio! Guarda perché:</span>
                    </>
                  )}
                </div>
                <p className="text-xs sm:text-sm leading-relaxed">
                  {chosenOption.explanation}
                </p>
                <p className="text-xs font-semibold pt-1 border-t border-slate-200/50">
                  💡 {currentGame.mascotTip}
                </p>
              </div>
            )}

            {/* Pulsanti di azione */}
            <div className="flex items-center justify-between gap-4 pt-4 border-t border-slate-100">
              <button
                type="button"
                onClick={handleRestartStreak}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Ricomincia serie</span>
              </button>

              {!hasChecked ? (
                <button
                  type="button"
                  disabled={!selectedOptionId}
                  onClick={handleCheckAnswer}
                  className="px-5 py-2.5 rounded-lg bg-sky-700 hover:bg-sky-800 disabled:opacity-50 text-white font-semibold text-sm transition-colors cursor-pointer"
                >
                  Verifica Risposta
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleNextGame}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-sm transition-colors cursor-pointer"
                >
                  <span>Prossima Sfida</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Colonna Laterale: Medaglie, Personaggi e Schede */}
          <div className="lg:col-span-4 space-y-6">
            {/* Box Personaggio in primo piano */}
            <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-4">
              <div className="flex items-center gap-3">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-white text-2xl font-bold shadow-xs shrink-0"
                  style={{ backgroundColor: currentMascot.accentColor }}
                >
                  {currentMascot.id === 'pico' && '🦉'}
                  {currentMascot.id === 'leo' && '🦫'}
                  {currentMascot.id === 'zoe' && '🦊'}
                  {currentMascot.id === 'archi' && '🐱‍🎓'}
                  {currentMascot.id === 'maya' && '🐆'}
                </div>
                <div>
                  <h3 className="font-display text-base font-bold text-slate-900">
                    {currentMascot.name}
                  </h3>
                  <p className="text-xs text-slate-500">{currentMascot.species}</p>
                </div>
              </div>

              <div className="p-3 bg-slate-50 rounded-lg border border-slate-100 text-xs text-slate-700 space-y-1">
                <p className="font-semibold text-slate-900">Motto del compagno:</p>
                <p className="italic">«{currentMascot.catchphrase}»</p>
              </div>

              <div className="space-y-1.5">
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Altri compagni disponibili:
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {availableMascots.map((mascot) => (
                    <span
                      key={mascot.id}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium bg-slate-100 text-slate-700"
                    >
                      <span>
                        {mascot.id === 'pico' && '🦉'}
                        {mascot.id === 'leo' && '🦫'}
                        {mascot.id === 'zoe' && '🦊'}
                        {mascot.id === 'archi' && '🐱‍🎓'}
                        {mascot.id === 'maya' && '🐆'}
                      </span>
                      <span>{mascot.name}</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Medagliere & Record */}
            <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-display text-base font-bold text-slate-900 flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-amber-600" />
                  <span>I tuoi record</span>
                </h3>
                <span className="text-xs font-mono font-semibold text-slate-500">
                  {profile.shortName}
                </span>
              </div>

              <div className="space-y-2">
                {activeGames.map((game, i) => {
                  const hs = savedHighScores[game.id] ?? 0;
                  const isCurrent = i === currentGameIndex % activeGames.length;
                  return (
                    <div
                      key={game.id}
                      className={`p-2.5 rounded-lg border flex items-center justify-between text-xs transition-colors ${
                        isCurrent
                          ? 'border-sky-300 bg-sky-50/60'
                          : 'border-slate-100 bg-slate-50/60'
                      }`}
                    >
                      <div className="flex items-center gap-2 truncate pr-2">
                        <Target className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span className="truncate font-medium text-slate-800">
                          {game.title}
                        </span>
                      </div>
                      <span className="font-mono font-semibold text-slate-900 shrink-0 tabular-nums">
                        {hs > 0 ? `${hs} pt` : '—'}
                      </span>
                    </div>
                  );
                })}
              </div>

              <p className="text-[11px] text-slate-500 leading-normal">
                Ogni risposta corretta ti dà 100 punti base più un moltiplicatore per la serie consecutiva!
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
