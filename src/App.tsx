import { useState } from 'react';
import { ActiveSection } from './types/math';
import { useAppStore } from './hooks/useAppStore';
import { getGradeProfile } from './data/grades';
import { ClassSelectorScreen } from './components/ClassSelectorScreen';
import { TopBar } from './components/TopBar';
import { CurriculumSection } from './components/CurriculumSection';
import { ProblemWorkbench } from './components/ProblemWorkbench';
import { VisualLabSection } from './components/VisualLabSection';
import { GamesSection } from './components/GamesSection';
import { MissionsSection } from './components/MissionsSection';
import { SettingsSection } from './components/SettingsSection';

export default function App() {
  const {
    state,
    selectGrade,
    updateSettings,
    markUnitCompleted,
    recordAttempt,
    markProblemSolved,
    markMissionChapterCompleted,
    saveScratchpad,
    saveGameScore,
    resetGradeProgress,
  } = useAppStore();

  const [activeSection, setActiveSection] = useState<ActiveSection>(
    ActiveSection.Percorso
  );
  const [unitFilterForProblems, setUnitFilterForProblems] = useState<
    string | null
  >(null);

  // Prima schermata: Scelta della Classe con i 5 grandi pulsanti richiesti
  if (!state.selectedGrade) {
    return (
      <ClassSelectorScreen
        progressByGrade={state.progressByGrade}
        onSelectGrade={(gradeId) => {
          selectGrade(gradeId);
          setActiveSection(ActiveSection.Percorso);
        }}
      />
    );
  }

  const gradeId = state.selectedGrade;
  const currentProgress = state.progressByGrade[gradeId];
  const gradeProfile = getGradeProfile(gradeId);

  const handlePracticeUnit = (unitId: string) => {
    setUnitFilterForProblems(unitId);
    setActiveSection(ActiveSection.Problemi);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleQuickPractice = () => {
    setUnitFilterForProblems(null);
    setActiveSection(ActiveSection.Problemi);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigate = (section: ActiveSection) => {
    if (section !== ActiveSection.Problemi) {
      setUnitFilterForProblems(null);
    }
    setActiveSection(section);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-slate-900">
      <TopBar
        activeSection={activeSection}
        onNavigate={handleNavigate}
        onQuickPractice={handleQuickPractice}
      />

      <main className="flex-1 max-w-[1360px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {activeSection === ActiveSection.Percorso && (
          <CurriculumSection
            gradeId={gradeId}
            progress={currentProgress}
            onCompleteUnit={(unitId) => markUnitCompleted(gradeId, unitId)}
            onPracticeUnit={handlePracticeUnit}
            onNavigate={handleNavigate}
          />
        )}

        {activeSection === ActiveSection.Problemi && (
          <ProblemWorkbench
            gradeId={gradeId}
            progress={currentProgress}
            settings={state.settings}
            initialUnitFilter={unitFilterForProblems}
            onClearUnitFilter={() => setUnitFilterForProblems(null)}
            onAttempt={() => recordAttempt(gradeId)}
            onSolved={(problemId, isGenerated, wasFirstTry) =>
              markProblemSolved(gradeId, problemId, isGenerated, wasFirstTry)
            }
            onSaveScratchpad={(problemId, text) =>
              saveScratchpad(gradeId, problemId, text)
            }
          />
        )}

        {activeSection === ActiveSection.Laboratorio && (
          <VisualLabSection gradeId={gradeId} />
        )}

        {activeSection === ActiveSection.Giochi && (
          <GamesSection
            gradeId={gradeId}
            savedHighScores={currentProgress.gameHighScores ?? {}}
            onSaveHighScore={(gameId, score) => saveGameScore(gradeId, gameId, score)}
            selectedMascotId={state.settings.selectedMascotId}
          />
        )}

        {activeSection === ActiveSection.Missioni && (
          <MissionsSection
            gradeId={gradeId}
            progress={currentProgress}
            settings={state.settings}
            onAttempt={() => recordAttempt(gradeId)}
            onCompleteMissionChapter={(
              missionId,
              chapterNumber,
              problemId,
              wasFirstTry
            ) => {
              markMissionChapterCompleted(gradeId, missionId, chapterNumber);
              markProblemSolved(gradeId, problemId, false, wasFirstTry);
            }}
            onSaveScratchpad={(problemId, text) =>
              saveScratchpad(gradeId, problemId, text)
            }
          />
        )}

        {activeSection === ActiveSection.Impostazioni && (
          <SettingsSection
            currentGradeId={gradeId}
            settings={state.settings}
            progressByGrade={state.progressByGrade}
            onSelectGrade={(nextGrade) => {
              selectGrade(nextGrade);
              setUnitFilterForProblems(null);
            }}
            onUpdateSettings={updateSettings}
            onResetCurrentGrade={() => resetGradeProgress(gradeId)}
          />
        )}
      </main>

      <footer className="border-t border-slate-200 bg-white mt-12">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-semibold text-slate-700">LogicaMente</span>
            <span aria-hidden="true">·</span>
            <span>Classe attiva: {gradeProfile.buttonLabel}</span>
            <span aria-hidden="true">·</span>
            <span>Progressi salvati localmente sul dispositivo</span>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <a
              href="https://scienzalab.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-emerald-700 hover:text-emerald-900 font-semibold underline underline-offset-2"
              title="Laboratorio interattivo di scienze ed esperimenti"
            >
              <span>🧪 ScienzaLab</span>
            </a>
            <button
              type="button"
              onClick={() => handleNavigate(ActiveSection.Impostazioni)}
              className="hover:text-slate-900 underline underline-offset-2 cursor-pointer"
            >
              Cambia classe ({gradeProfile.shortName})
            </button>
            <button
              type="button"
              onClick={() =>
                updateSettings({ limMode: !state.settings.limMode })
              }
              className="hover:text-slate-900 underline underline-offset-2 cursor-pointer"
            >
              {state.settings.limMode
                ? 'Disattiva Modalità LIM'
                : 'Attiva Modalità LIM'}
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
