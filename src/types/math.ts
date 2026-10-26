import type { AppImageKey } from '../assets/imageMap';

export enum GradeId {
  QuartaPrimaria = '4p',
  QuintaPrimaria = '5p',
  PrimaMedia = '1m',
  SecondaMedia = '2m',
  TerzaMedia = '3m',
}

export enum DifficultyLevel {
  Base = 'base',
  Intermedio = 'intermedio',
  Avanzato = 'avanzato',
}

export enum AutonomyMode {
  Adattivo = 'adattivo',
  Guidato = 'guidato',
  Autonomo = 'autonomo',
}

export enum ActiveSection {
  Percorso = 'percorso',
  Problemi = 'problemi',
  Laboratorio = 'laboratorio',
  Giochi = 'giochi',
  Missioni = 'missioni',
  Impostazioni = 'impostazioni',
}

export interface CharacterMascot {
  id: string;
  name: string;
  species: string;
  role: string;
  greeting: string;
  catchphrase: string;
  badgeTitle: string;
  accentColor: string;
  gradeIds: GradeId[];
  tips: string[];
}

export interface MiniGameItem {
  id: string;
  category: 'dato-superfluo' | 'operazione-lampo' | 'stima-ragionevole' | 'parola-nascosta';
  title: string;
  gradeId: GradeId;
  prompt: string;
  storyContext: string;
  options: {
    id: string;
    label: string;
    isCorrect: boolean;
    explanation: string;
  }[];
  mascotTip: string;
}

export interface GlossaryItem {
  term: string;
  definition: string;
  example: string;
}

export interface GradeProfile {
  id: GradeId;
  order: number;
  buttonLabel: string; // Exact label for the 5 class selection buttons
  shortName: string;
  schoolCycle: string;
  summary: string;
  textComplexityNote: string;
  numbersAndCalcNote: string;
  operationsCountNote: string;
  visualStyleNote: string;
  defaultAutonomy: 'guidato' | 'autonomo';
  defaultLabTab: 'segmenti' | 'frazioni' | 'geometria' | 'equazioni';
  topicsOverview: string[];
  glossary: GlossaryItem[];
}

export interface LessonCheckQuestion {
  prompt: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface LessonVisualSpec {
  kind: 'bar-part-whole' | 'bar-comparison' | 'segments-sum-diff' | 'fraction-grid' | 'geometry-rect' | 'pythagoras' | 'equation-balance' | 'solid-cylinder';
  caption: string;
  values: number[];
  labels: string[];
}

export interface CurriculumUnit {
  id: string;
  gradeId: GradeId;
  index: number;
  title: string;
  subtitle: string;
  keyIdea: string;
  methodSteps: string[];
  workedExample: {
    problemText: string;
    reasoning: string[];
    finalAnswer: string;
  };
  commonTrap: string;
  visual: LessonVisualSpec;
  quickCheck: LessonCheckQuestion;
}

export interface ProblemDatum {
  id: string;
  label: string; // e.g. "24 quaderni" or "Autobus linea 14" or "Una dozzina = 12"
  kind: 'utile' | 'superfluo' | 'nascosto';
  explanation: string;
}

export interface ProblemStep {
  id: string;
  question: string; // Intermediate question or step goal
  operationChoices: string[]; // 3-4 candidate mathematical expressions/operations
  correctChoiceIndex: number;
  expectedResult: number;
  unit: string;
  explanation: string;
}

export interface CommonErrorTrap {
  wrongValue: number;
  tolerance?: number;
  errorType: string; // e.g. "Dato superfluo utilizzato", "Risultato intermedio", "Equivalenza mancante"
  feedback: string;
}

export interface ProblemVisualSchema {
  type: 'bar-total' | 'bar-diff' | 'segments' | 'fraction' | 'geometry' | 'pythagoras' | 'equation' | 'cylinder';
  title: string;
  parts: { label: string; value: number | string; highlight?: boolean }[];
  totalLabel?: string;
}

export interface MathProblem {
  id: string;
  gradeId: GradeId;
  unitId: string;
  title: string;
  contextCategory: string;
  difficulty: DifficultyLevel;
  text: string;
  finalQuestion: string;
  dataItems: ProblemDatum[];
  unknownOptions: string[];
  correctUnknownIndex: number;
  steps: ProblemStep[];
  finalAnswer: number;
  answerTolerance?: number;
  unit: string;
  unitOptions: string[];
  expressionSummary: string;
  hints: [string, string, string];
  commonErrors: CommonErrorTrap[];
  visualSchema: ProblemVisualSchema;
  isGenerated?: boolean;
}

export interface MissionChapter {
  chapterNumber: number;
  title: string;
  storyIntro: string;
  problem: MathProblem;
}

export interface MathMission {
  id: string;
  gradeId: GradeId;
  title: string;
  subtitle: string;
  context: string;
  difficultyLabel: string;
  imageKey: AppImageKey;
  chapters: MissionChapter[];
  completionTakeaway: string;
}

export interface GradeProgress {
  completedUnitIds: string[];
  solvedProblemIds: string[];
  solvedGeneratedCount: number;
  completedMissionChapters: Record<string, number[]>; // missionId -> completed chapter numbers
  totalAttempts: number;
  firstTrySuccesses: number;
  scratchpadNotes: Record<string, string>;
  gameHighScores: Record<string, number>;
}

export interface AppSettings {
  limMode: boolean;
  autonomyMode: AutonomyMode;
  showTouchKeypad: boolean;
  selectedMascotId?: string;
}

export interface PersistedAppState {
  selectedGrade: GradeId | null;
  settings: AppSettings;
  progressByGrade: Record<GradeId, GradeProgress>;
}
