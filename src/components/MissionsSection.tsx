import { useState, useEffect } from 'react';
import { CheckCircle2, Compass, ArrowLeft } from 'lucide-react';
import { getGradeProfile } from '../data/grades';
import { getMissionsByGrade } from '../data/missions';
import {
  AutonomyMode,
  type AppSettings,
  type GradeId,
  type GradeProgress,
} from '../types/math';
import { SafeImage } from './SafeImage';
import { ProblemSolverCard } from './ProblemWorkbench';

interface MissionsSectionProps {
  gradeId: GradeId;
  progress: GradeProgress;
  settings: AppSettings;
  onAttempt: () => void;
  onCompleteMissionChapter: (
    missionId: string,
    chapterNumber: number,
    problemId: string,
    wasFirstTry: boolean
  ) => void;
  onSaveScratchpad: (problemId: string, text: string) => void;
}

export function MissionsSection({
  gradeId,
  progress,
  settings,
  onAttempt,
  onCompleteMissionChapter,
  onSaveScratchpad,
}: MissionsSectionProps) {
  const profile = getGradeProfile(gradeId);
  const missions = getMissionsByGrade(gradeId);

  const [activeMissionId, setActiveMissionId] = useState<string | null>(null);
  const [activeChapterNum, setActiveChapterNum] = useState<number>(1);

  useEffect(() => {
    setActiveMissionId(null);
    setActiveChapterNum(1);
  }, [gradeId]);

  const activeMission = missions.find((m) => m.id === activeMissionId) ?? null;

  const defaultGuided =
    settings.autonomyMode === AutonomyMode.Guidato
      ? true
      : settings.autonomyMode === AutonomyMode.Autonomo
      ? false
      : profile.defaultAutonomy === 'guidato';

  if (!activeMission) {
    return (
      <div className="space-y-8">
        <section className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8">
          <p className="text-xs sm:text-sm text-slate-500 mb-1">
            Apprendimento situato · {profile.buttonLabel}
          </p>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-slate-900">
            Missioni Matematiche nella Realtà
          </h1>
          <p className="text-sm sm:text-base text-slate-600 mt-1.5 max-w-3xl">
            Ogni missione è una storia concreta divisa in tappe progressive: usa i dati raccolti
            sul campo per prendere decisioni, progettare spazi e completare l’incarico della tua classe.
          </p>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {missions.map((mission) => {
            const doneChapters =
              progress.completedMissionChapters[mission.id] ?? [];
            const totalChapters = mission.chapters.length;
            const isMissionComplete = doneChapters.length >= totalChapters;

            return (
              <article
                key={mission.id}
                className="bg-white border border-slate-200 rounded-xl overflow-hidden flex flex-col justify-between"
              >
                <div>
                  <div className="aspect-[16/9] w-full bg-slate-100 border-b border-slate-200 overflow-hidden">
                    <SafeImage
                      imageKey={mission.imageKey}
                      alt={mission.title}
                      fallbackTitle={mission.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="p-6 space-y-3">
                    <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 tabular-nums">
                      <span>{mission.context}</span>
                      <span aria-hidden="true">·</span>
                      <span>{mission.difficultyLabel}</span>
                      <span aria-hidden="true">·</span>
                      <span
                        className={
                          isMissionComplete
                            ? 'text-emerald-700 font-semibold'
                            : 'text-slate-600 font-medium'
                        }
                      >
                        {doneChapters.length}/{totalChapters} tappe completate
                      </span>
                    </div>

                    <h2 className="font-display text-xl sm:text-2xl font-bold text-slate-900">
                      {mission.title}
                    </h2>

                    <p className="text-sm text-slate-600 leading-relaxed">
                      {mission.subtitle}
                    </p>
                  </div>
                </div>

                <div className="px-6 pb-6 pt-2 flex items-center justify-between gap-4">
                  <button
                    type="button"
                    onClick={() => {
                      setActiveMissionId(mission.id);
                      const firstPending =
                        mission.chapters.find(
                          (c) => !doneChapters.includes(c.chapterNumber)
                        )?.chapterNumber ?? 1;
                      setActiveChapterNum(firstPending);
                    }}
                    className="px-5 py-2.5 text-sm font-semibold text-white bg-sky-700 hover:bg-sky-800 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    {doneChapters.length === 0
                      ? 'Inizia Missione'
                      : isMissionComplete
                      ? 'Rivedi Missione'
                      : 'Continua Missione'}
                  </button>

                  {isMissionComplete && (
                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700">
                      <CheckCircle2 className="w-4 h-4 shrink-0" />
                      <span>Missione conclusa</span>
                    </span>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    );
  }

  // Vista interna di una Missione attiva
  const doneList = progress.completedMissionChapters[activeMission.id] ?? [];
  const activeChapter =
    activeMission.chapters.find((c) => c.chapterNumber === activeChapterNum) ??
    activeMission.chapters[0];
  const isAllDone = doneList.length >= activeMission.chapters.length;

  return (
    <div className="space-y-6">
      <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <button
            type="button"
            onClick={() => setActiveMissionId(null)}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-600 hover:text-slate-900 cursor-pointer whitespace-nowrap shrink-0"
          >
            <ArrowLeft className="w-4 h-4 shrink-0" />
            <span>Torna a tutte le missioni</span>
          </button>

          <span className="text-xs font-mono text-slate-500 tabular-nums">
            Progresso missione: {doneList.length} / {activeMission.chapters.length} tappe
          </span>
        </div>

        <div>
          <h1 className="font-display text-2xl font-bold text-slate-900">
            {activeMission.title}
          </h1>
          <p className="text-sm text-slate-600 mt-1">{activeMission.subtitle}</p>
        </div>

        {/* Selettore tappe della missione */}
        <div className="flex items-center gap-2 overflow-x-auto pt-2">
          {activeMission.chapters.map((ch) => {
            const isCurrent = ch.chapterNumber === activeChapter.chapterNumber;
            const isCompleted = doneList.includes(ch.chapterNumber);
            return (
              <button
                key={ch.chapterNumber}
                type="button"
                onClick={() => setActiveChapterNum(ch.chapterNumber)}
                className={`px-4 py-2 rounded-lg border text-xs sm:text-sm font-semibold whitespace-nowrap shrink-0 transition-colors cursor-pointer flex items-center gap-2 tabular-nums ${
                  isCurrent
                    ? 'bg-sky-700 text-white border-sky-700'
                    : isCompleted
                    ? 'bg-emerald-50 text-emerald-900 border-emerald-200'
                    : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                }`}
              >
                <span>{ch.title}</span>
                {isCompleted && (
                  <CheckCircle2
                    className={`w-4 h-4 shrink-0 ${
                      isCurrent ? 'text-emerald-200' : 'text-emerald-600'
                    }`}
                  />
                )}
              </button>
            );
          })}
        </div>

        {isAllDone && (
          <div className="p-4 rounded-lg bg-emerald-50/80 border border-emerald-300 flex items-start gap-3">
            <Compass className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-bold text-emerald-950">
                ✓ Missione completata con successo!
              </p>
              <p className="text-sm text-emerald-900 mt-0.5">
                {activeMission.completionTakeaway}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Contesto narrativo della tappa */}
      <div className="bg-sky-50/70 border border-sky-200 rounded-xl p-5">
        <p className="text-xs font-semibold text-sky-900 mb-1">
          Scenario operativo · {activeChapter.title}
        </p>
        <p className="text-sm sm:text-base text-slate-800 leading-relaxed">
          {activeChapter.storyIntro}
        </p>
      </div>

      {/* Risolutore interattivo della tappa */}
      <ProblemSolverCard
        problem={activeChapter.problem}
        defaultGuided={defaultGuided}
        showTouchKeypadDefault={settings.showTouchKeypad}
        isAlreadySolved={doneList.includes(activeChapter.chapterNumber)}
        scratchpadValue={progress.scratchpadNotes[activeChapter.problem.id] ?? ''}
        onSaveScratchpad={(txt) => onSaveScratchpad(activeChapter.problem.id, txt)}
        onAttempt={onAttempt}
        onSolved={(firstTry) =>
          onCompleteMissionChapter(
            activeMission.id,
            activeChapter.chapterNumber,
            activeChapter.problem.id,
            firstTry
          )
        }
        onNextAction={
          activeChapter.chapterNumber < activeMission.chapters.length
            ? () => setActiveChapterNum(activeChapter.chapterNumber + 1)
            : () => setActiveMissionId(null)
        }
        nextActionLabel={
          activeChapter.chapterNumber < activeMission.chapters.length
            ? 'Avanza alla tappa successiva'
            : 'Concludi e torna alle missioni'
        }
      />
    </div>
  );
}
