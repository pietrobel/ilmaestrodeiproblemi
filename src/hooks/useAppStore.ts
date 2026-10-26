import { useState, useEffect, useCallback } from 'react';
import {
  AutonomyMode,
  GradeId,
  type AppSettings,
  type GradeProgress,
  type PersistedAppState,
} from '../types/math';

const STORAGE_KEY = 'logicamente_app_state_v1';

function createEmptyProgress(): GradeProgress {
  return {
    completedUnitIds: [],
    solvedProblemIds: [],
    solvedGeneratedCount: 0,
    completedMissionChapters: {},
    totalAttempts: 0,
    firstTrySuccesses: 0,
    scratchpadNotes: {},
    gameHighScores: {},
  };
}

function createInitialState(): PersistedAppState {
  return {
    selectedGrade: null,
    settings: {
      limMode: false,
      autonomyMode: AutonomyMode.Adattivo,
      showTouchKeypad: false,
    },
    progressByGrade: {
      [GradeId.QuartaPrimaria]: createEmptyProgress(),
      [GradeId.QuintaPrimaria]: createEmptyProgress(),
      [GradeId.PrimaMedia]: createEmptyProgress(),
      [GradeId.SecondaMedia]: createEmptyProgress(),
      [GradeId.TerzaMedia]: createEmptyProgress(),
    },
  };
}

function loadState(): PersistedAppState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return createInitialState();
    const parsed = JSON.parse(raw) as Partial<PersistedAppState>;
    const defaults = createInitialState();
    return {
      selectedGrade: parsed.selectedGrade ?? null,
      settings: {
        ...defaults.settings,
        ...(parsed.settings ?? {}),
      },
      progressByGrade: {
        [GradeId.QuartaPrimaria]: {
          ...createEmptyProgress(),
          ...(parsed.progressByGrade?.[GradeId.QuartaPrimaria] ?? {}),
        },
        [GradeId.QuintaPrimaria]: {
          ...createEmptyProgress(),
          ...(parsed.progressByGrade?.[GradeId.QuintaPrimaria] ?? {}),
        },
        [GradeId.PrimaMedia]: {
          ...createEmptyProgress(),
          ...(parsed.progressByGrade?.[GradeId.PrimaMedia] ?? {}),
        },
        [GradeId.SecondaMedia]: {
          ...createEmptyProgress(),
          ...(parsed.progressByGrade?.[GradeId.SecondaMedia] ?? {}),
        },
        [GradeId.TerzaMedia]: {
          ...createEmptyProgress(),
          ...(parsed.progressByGrade?.[GradeId.TerzaMedia] ?? {}),
        },
      },
    };
  } catch {
    return createInitialState();
  }
}

export function useAppStore() {
  const [state, setState] = useState<PersistedAppState>(() => loadState());

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // Ignora errori di quota storage in modalità privata ristretta
    }
  }, [state]);

  // Applica o rimuove la classe CSS per la Modalità LIM ad alta leggibilità
  useEffect(() => {
    const root = document.documentElement;
    if (state.settings.limMode) {
      root.classList.add('lim-mode');
    } else {
      root.classList.remove('lim-mode');
    }
  }, [state.settings.limMode]);

  const selectGrade = useCallback((gradeId: GradeId | null) => {
    setState((prev) => ({
      ...prev,
      selectedGrade: gradeId,
    }));
  }, []);

  const updateSettings = useCallback((patch: Partial<AppSettings>) => {
    setState((prev) => ({
      ...prev,
      settings: {
        ...prev.settings,
        ...patch,
      },
    }));
  }, []);

  const markUnitCompleted = useCallback((gradeId: GradeId, unitId: string) => {
    setState((prev) => {
      const current = prev.progressByGrade[gradeId];
      if (current.completedUnitIds.includes(unitId)) return prev;
      return {
        ...prev,
        progressByGrade: {
          ...prev.progressByGrade,
          [gradeId]: {
            ...current,
            completedUnitIds: [...current.completedUnitIds, unitId],
          },
        },
      };
    });
  }, []);

  const recordAttempt = useCallback((gradeId: GradeId) => {
    setState((prev) => {
      const current = prev.progressByGrade[gradeId];
      return {
        ...prev,
        progressByGrade: {
          ...prev.progressByGrade,
          [gradeId]: {
            ...current,
            totalAttempts: current.totalAttempts + 1,
          },
        },
      };
    });
  }, []);

  const markProblemSolved = useCallback(
    (
      gradeId: GradeId,
      problemId: string,
      isGenerated: boolean,
      wasFirstTry: boolean
    ) => {
      setState((prev) => {
        const current = prev.progressByGrade[gradeId];
        const alreadySolved = current.solvedProblemIds.includes(problemId);
        return {
          ...prev,
          progressByGrade: {
            ...prev.progressByGrade,
            [gradeId]: {
              ...current,
              solvedProblemIds:
                !isGenerated && !alreadySolved
                  ? [...current.solvedProblemIds, problemId]
                  : current.solvedProblemIds,
              solvedGeneratedCount: isGenerated
                ? current.solvedGeneratedCount + 1
                : current.solvedGeneratedCount,
              firstTrySuccesses:
                wasFirstTry && !alreadySolved
                  ? current.firstTrySuccesses + 1
                  : current.firstTrySuccesses,
            },
          },
        };
      });
    },
    []
  );

  const markMissionChapterCompleted = useCallback(
    (gradeId: GradeId, missionId: string, chapterNumber: number) => {
      setState((prev) => {
        const current = prev.progressByGrade[gradeId];
        const prevChapters = current.completedMissionChapters[missionId] ?? [];
        if (prevChapters.includes(chapterNumber)) return prev;
        return {
          ...prev,
          progressByGrade: {
            ...prev.progressByGrade,
            [gradeId]: {
              ...current,
              completedMissionChapters: {
                ...current.completedMissionChapters,
                [missionId]: [...prevChapters, chapterNumber].sort((a, b) => a - b),
              },
            },
          },
        };
      });
    },
    []
  );

  const saveScratchpad = useCallback(
    (gradeId: GradeId, problemId: string, text: string) => {
      setState((prev) => {
        const current = prev.progressByGrade[gradeId];
        return {
          ...prev,
          progressByGrade: {
            ...prev.progressByGrade,
            [gradeId]: {
              ...current,
              scratchpadNotes: {
                ...current.scratchpadNotes,
                [problemId]: text,
              },
            },
          },
        };
      });
    },
    []
  );

  const resetGradeProgress = useCallback((gradeId: GradeId) => {
    setState((prev) => ({
      ...prev,
      progressByGrade: {
        ...prev.progressByGrade,
        [gradeId]: createEmptyProgress(),
      },
    }));
  }, []);

  const saveGameScore = useCallback(
    (gradeId: GradeId, gameId: string, score: number) => {
      setState((prev) => {
        const current = prev.progressByGrade[gradeId];
        const prevBest = current.gameHighScores?.[gameId] ?? 0;
        if (score <= prevBest) return prev;
        return {
          ...prev,
          progressByGrade: {
            ...prev.progressByGrade,
            [gradeId]: {
              ...current,
              gameHighScores: {
                ...(current.gameHighScores ?? {}),
                [gameId]: score,
              },
            },
          },
        };
      });
    },
    []
  );

  return {
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
  };
}

