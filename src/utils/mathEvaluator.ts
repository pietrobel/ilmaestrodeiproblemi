import type { MathProblem } from '../types/math';

/**
 * Converte l'input dell'alunno (accettando sia la virgola italiana "12,5" sia il punto "12.5")
 * in un numero valido, oppure restituisce null se vuoto o non numerico.
 */
export function parseItalianNumber(raw: string): number | null {
  const cleaned = raw
    .trim()
    .replace(/\s+/g, '')
    .replace(',', '.');
  if (cleaned === '' || cleaned === '-' || cleaned === '+') {
    return null;
  }
  const parsed = Number(cleaned);
  return Number.isFinite(parsed) ? parsed : null;
}

/**
 * Formatta un numero con la virgola decimale secondo la convenzione italiana.
 */
export function formatItNumber(value: number, maxDecimals = 2): string {
  if (!Number.isFinite(value)) return '0';
  const rounded = Number(value.toFixed(maxDecimals));
  return rounded.toString().replace('.', ',');
}

export interface AnswerDiagnosis {
  isCorrect: boolean;
  headline: string;
  explanation: string;
  errorCategory?: string;
}

/**
 * Analizza la risposta numerica (e l'eventuale unità di misura) fornita dall'alunno,
 * individuando errori concettuali specifici (dati superflui, equivalenze mancanti,
 * risultati intermedi, errori di segno, inversione di operazioni).
 */
export function diagnoseStudentAnswer(
  problem: MathProblem,
  rawInput: string,
  selectedUnit?: string
): AnswerDiagnosis {
  const numericVal = parseItalianNumber(rawInput);

  if (numericVal === null) {
    return {
      isCorrect: false,
      headline: 'Inserisci un valore numerico valido',
      explanation:
        'Scrivi il numero del tuo risultato (puoi usare la virgola per i decimali, ad esempio 3,8).',
      errorCategory: 'Formato non valido',
    };
  }

  const tol = problem.answerTolerance ?? 0.02;
  const isValueMatch = Math.abs(numericVal - problem.finalAnswer) <= tol;

  if (isValueMatch) {
    if (selectedUnit && selectedUnit !== problem.unit) {
      return {
        isCorrect: false,
        headline: 'Il numero è esatto, ma controlla l’unità di misura!',
        explanation: `Il calcolo numerico (${formatItNumber(problem.finalAnswer)}) è corretto, ma hai selezionato «${selectedUnit}» invece dell’unità richiesta dalla domanda finale.`,
        errorCategory: 'Unità di misura errata',
      };
    }

    return {
      isCorrect: true,
      headline: 'Risposta corretta e ben ragionata!',
      explanation: `Ottimo lavoro: il risultato è ${formatItNumber(problem.finalAnswer)} ${problem.unit}. Sintesi: ${problem.expressionSummary}.`,
    };
  }

  // 1. Controlla le trappole specifiche del problema (commonErrors)
  for (const trap of problem.commonErrors) {
    const trapTol = trap.tolerance ?? 0.03;
    if (Math.abs(numericVal - trap.wrongValue) <= trapTol) {
      return {
        isCorrect: false,
        headline: `Attenzione: ${trap.errorType}`,
        explanation: trap.feedback,
        errorCategory: trap.errorType,
      };
    }
  }

  // 2. Controlla se coincide con il risultato di un passaggio intermedio
  for (let i = 0; i < problem.steps.length - 1; i++) {
    const step = problem.steps[i];
    if (Math.abs(numericVal - step.expectedResult) <= 0.02) {
      return {
        isCorrect: false,
        headline: 'Hai trovato il risultato di un passaggio intermedio!',
        explanation: `${formatItNumber(step.expectedResult)} ${step.unit} risponde al passaggio «${step.question}», ma ti manca ancora il calcolo conclusivo per rispondere alla domanda finale.`,
        errorCategory: 'Passaggio intermedio',
      };
    }
  }

  // 3. Controlla errore di segno (opposto esatto)
  if (
    problem.finalAnswer !== 0 &&
    Math.abs(numericVal + problem.finalAnswer) <= tol
  ) {
    return {
      isCorrect: false,
      headline: 'Controlla il segno (+ oppure −)!',
      explanation: `Il valore assoluto (${formatItNumber(Math.abs(problem.finalAnswer))}) è corretto, ma il segno è opposto rispetto a quanto richiesto.`,
      errorCategory: 'Errore di segno',
    };
  }

  // 4. Controlla errore di scala / equivalenza (×10, ×100, ×1000, :10, :100, :1000)
  if (problem.finalAnswer !== 0) {
    const ratio = Math.abs(numericVal / problem.finalAnswer);
    const scaleFactors = [10, 100, 1000, 0.1, 0.01, 0.001];
    for (const f of scaleFactors) {
      if (Math.abs(ratio - f) <= f * 0.01) {
        return {
          isCorrect: false,
          headline: 'Controlla la virgola o l’equivalenza tra unità di misura!',
          explanation: `Il tuo risultato (${formatItNumber(numericVal)}) differisce per un fattore 10/100/1000 dal valore atteso. Rileggi in quale unità di misura (${problem.unit}) è richiesta la risposta.`,
          errorCategory: 'Equivalenza o posizione della virgola',
        };
      }
    }
  }

  // 5. Messaggio diagnostico generale orientato alla revisione
  const diffRatio =
    problem.finalAnswer !== 0
      ? Math.abs(numericVal - problem.finalAnswer) / Math.abs(problem.finalAnswer)
      : Math.abs(numericVal);

  if (diffRatio < 0.12) {
    return {
      isCorrect: false,
      headline: 'Ci sei molto vicino: ricontrolla i calcoli!',
      explanation:
        'L’ordine di grandezza è plausibile, quindi l’impostazione potrebbe essere giusta: verifica con calma le operazioni aritmetiche o eventuali resti.',
      errorCategory: 'Possibile svista di calcolo',
    };
  }

  return {
    isCorrect: false,
    headline: 'Rivedi la strategia prima di ricalcolare',
    explanation:
      'Confronta il tuo risultato con lo schema visivo o apri un suggerimento graduale per verificare di aver scelto l’operazione giusta e scartato eventuali dati superflui.',
    errorCategory: 'Strategia da rivedere',
  };
}
