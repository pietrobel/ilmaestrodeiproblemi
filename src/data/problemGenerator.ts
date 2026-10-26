import {
  DifficultyLevel,
  GradeId,
  type MathProblem,
} from '../types/math';
import { PRIMARY_PROBLEMS } from './problemsPrimary';
import { MIDDLE_PROBLEMS } from './problemsMiddle';

export const ALL_STATIC_PROBLEMS: MathProblem[] = [
  ...PRIMARY_PROBLEMS,
  ...MIDDLE_PROBLEMS,
];

export function getProblemsByGrade(gradeId: GradeId): MathProblem[] {
  return ALL_STATIC_PROBLEMS.filter((p) => p.gradeId === gradeId);
}

function randInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function pickOne<T>(items: T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}

/**
 * Genera dinamicamente un nuovo problema inedito calibrato sulla classe e sulla difficoltà,
 * con calcoli esatti, dati utili/superflui, passaggi guidati e diagnosi degli errori tipici.
 */
export function generateDynamicProblem(
  gradeId: GradeId,
  difficulty: DifficultyLevel = DifficultyLevel.Intermedio
): MathProblem {
  const uid = `gen-${gradeId}-${Date.now()}-${randInt(100, 999)}`;

  if (gradeId === GradeId.QuartaPrimaria) {
    const template = pickOne([1, 2]);
    if (template === 1) {
      const boxes = randInt(4, 8);
      const perBox = randInt(12, 24);
      const givenAway = randInt(6, 18);
      const busLine = randInt(11, 29);
      const total = boxes * perBox;
      const remaining = total - givenAway;
      return {
        id: uid,
        gradeId,
        unitId: '4p-u3',
        title: 'Pennarelli per il laboratorio creativo (Variante dinamica)',
        contextCategory: 'Scuola e creatività',
        difficulty,
        text: `Nell’aula numero ${busLine} arrivano ${boxes} confezioni con ${perBox} pennarelli ciascuna. Durante il laboratorio ${givenAway} pennarelli risultano scarichi e vengono messi da parte.`,
        finalQuestion: 'Quanti pennarelli funzionanti restano a disposizione?',
        dataItems: [
          {
            id: 'd1',
            label: `Aula numero ${busLine}`,
            kind: 'superfluo',
            explanation: 'Identifica la stanza ma non entra nel calcolo dei pennarelli.',
          },
          {
            id: 'd2',
            label: `${boxes} confezioni da ${perBox} pennarelli`,
            kind: 'utile',
            explanation: 'Serve per calcolare il totale iniziale dei pennarelli.',
          },
          {
            id: 'd3',
            label: `${givenAway} pennarelli scarichi`,
            kind: 'utile',
            explanation: 'Quantità da sottrarre dal totale.',
          },
        ],
        unknownOptions: [
          'Il numero di pennarelli funzionanti rimasti',
          'Il numero dell’aula del laboratorio',
          'Il prezzo delle confezioni',
        ],
        correctUnknownIndex: 0,
        steps: [
          {
            id: 's1',
            question: 'Domanda intermedia: quanti pennarelli ci sono in tutto nelle confezioni?',
            operationChoices: [
              `${boxes} × ${perBox}`,
              `${boxes} + ${perBox}`,
              `${perBox} − ${boxes}`,
              `${boxes} × ${busLine}`,
            ],
            correctChoiceIndex: 0,
            expectedResult: total,
            unit: 'pennarelli',
            explanation: `${boxes} × ${perBox} = ${total} pennarelli totali.`,
          },
          {
            id: 's2',
            question: 'Togliendo quelli scarichi, quanti pennarelli funzionanti restano?',
            operationChoices: [
              `${total} − ${givenAway}`,
              `${total} + ${givenAway}`,
              `${total} − ${busLine}`,
              `${perBox} − ${givenAway}`,
            ],
            correctChoiceIndex: 0,
            expectedResult: remaining,
            unit: 'pennarelli',
            explanation: `${total} − ${givenAway} = ${remaining} pennarelli funzionanti.`,
          },
        ],
        finalAnswer: remaining,
        unit: 'pennarelli',
        unitOptions: ['pennarelli', 'confezioni', 'aule'],
        expressionSummary: `(${boxes} × ${perBox}) − ${givenAway} = ${remaining}`,
        hints: [
          `Scarta subito il dato superfluo: il numero dell’aula (${busLine}) non serve.`,
          `Moltiplica ${boxes} confezioni per ${perBox} pennarelli.`,
          `Sottrai i ${givenAway} pennarelli scarichi dal totale trovato (${total}).`,
        ],
        commonErrors: [
          {
            wrongValue: total,
            errorType: 'Fermato alla domanda intermedia',
            feedback: `${total} sono tutti i pennarelli arrivati; ricorda di togliere i ${givenAway} scarichi!`,
          },
          {
            wrongValue: remaining + busLine,
            errorType: 'Dato superfluo utilizzato',
            feedback: `Attenzione: hai incluso il numero dell’aula (${busLine}) nei tuoi calcoli!`,
          },
        ],
        visualSchema: {
          type: 'bar-total',
          title: `${total} pennarelli totali (${boxes} × ${perBox})`,
          parts: [
            { label: 'Scarichi', value: givenAway },
            { label: 'Funzionanti', value: '?', highlight: true },
          ],
          totalLabel: `Totale = ${total}`,
        },
        isGenerated: true,
      };
    } else {
      const more = randInt(8, 19);
      const smaller = randInt(22, 45);
      const larger = smaller + more;
      const sum = smaller + larger;
      return {
        id: uid,
        gradeId,
        unitId: '4p-u5',
        title: 'Confronto tra due raccolte di conchiglie (Variante dinamica)',
        contextCategory: 'Confronto e schemi a barre',
        difficulty,
        text: `Sulla spiaggia Matteo raccoglie ${larger} conchiglie, cioè ${more} in più di sua cugina Greta.`,
        finalQuestion: 'Quante conchiglie hanno raccolto Matteo e Greta insieme?',
        dataItems: [
          {
            id: 'd1',
            label: `${larger} conchiglie di Matteo`,
            kind: 'utile',
            explanation: 'Quantità maggiore già nota.',
          },
          {
            id: 'd2',
            label: `Matteo ne ha ${more} in più di Greta`,
            kind: 'utile',
            explanation: `Significa che Greta ne ha ${more} IN MENO di Matteo.`,
          },
        ],
        unknownOptions: [
          'Il totale delle conchiglie dei due cugini insieme',
          'Solo le conchiglie di Matteo',
          'I minuti trascorsi in spiaggia',
        ],
        correctUnknownIndex: 0,
        steps: [
          {
            id: 's1',
            question: 'Quante conchiglie ha raccolto Greta?',
            operationChoices: [
              `${larger} − ${more}`,
              `${larger} + ${more}`,
              `${larger} × 2`,
              `${larger} : 2`,
            ],
            correctChoiceIndex: 0,
            expectedResult: smaller,
            unit: 'conchiglie',
            explanation: `Greta ne ha ${more} in meno: ${larger} − ${more} = ${smaller}.`,
          },
          {
            id: 's2',
            question: 'Quante conchiglie hanno in tutto Matteo e Greta?',
            operationChoices: [
              `${larger} + ${smaller}`,
              `${larger} + ${larger + more}`,
              `${larger} − ${smaller}`,
              `${smaller} + ${more}`,
            ],
            correctChoiceIndex: 0,
            expectedResult: sum,
            unit: 'conchiglie',
            explanation: `${larger} + ${smaller} = ${sum} conchiglie.`,
          },
        ],
        finalAnswer: sum,
        unit: 'conchiglie',
        unitOptions: ['conchiglie', 'secchielli', '€'],
        expressionSummary: `${larger} + (${larger} − ${more}) = ${sum}`,
        hints: [
          `Attenzione alla parola «in più»: Matteo (${larger}) è chi ne ha di più, quindi Greta ne ha di meno!`,
          `Calcola prima Greta facendo ${larger} − ${more} = ${smaller}.`,
          `Somma le conchiglie di Matteo (${larger}) e quelle di Greta (${smaller}).`,
        ],
        commonErrors: [
          {
            wrongValue: larger + more,
            errorType: 'Inversione di «in più»',
            feedback: `Hai fatto ${larger} + ${more}, ma Greta ha MENO conchiglie di Matteo!`,
          },
          {
            wrongValue: larger + (larger + more),
            errorType: 'Sommato dopo aver invertito il confronto',
            feedback: `Rileggi il confronto: Greta ha ${larger} − ${more} = ${smaller} conchiglie, non ${larger + more}.`,
          },
          {
            wrongValue: smaller,
            errorType: 'Risultato intermedio (solo Greta)',
            feedback: `${smaller} sono le conchiglie di Greta: ora aggiungi le ${larger} di Matteo!`,
          },
        ],
        visualSchema: {
          type: 'bar-diff',
          title: `Matteo (${larger}) supera Greta di ${more}`,
          parts: [
            { label: 'Matteo', value: larger },
            { label: 'Greta', value: '?', highlight: true },
          ],
          totalLabel: 'Insieme = ? conchiglie',
        },
        isGenerated: true,
      };
    }
  }

  if (gradeId === GradeId.QuintaPrimaria) {
    const den = pickOne([5, 6, 8, 9]);
    const num = randInt(2, den - 2);
    const unitVal = randInt(12, 30);
    const total = den * unitVal;
    const taken = num * unitVal;
    const left = total - taken;
    return {
      id: uid,
      gradeId,
      unitId: '5p-u2',
      title: 'Tappa cicloturistica a frazioni (Variante dinamica)',
      contextCategory: 'Frazioni nella realtà',
      difficulty,
      text: `Un itinerario ciclabile lungo un fiume misura complessivamente ${total} km. Un gruppo sportivo ne percorre al mattino i ${num}/${den}.`,
      finalQuestion: 'Quanti chilometri restano da percorrere nel pomeriggio?',
      dataItems: [
        {
          id: 'd1',
          label: `Percorso intero = ${total} km`,
          kind: 'utile',
          explanation: `Rappresenta l’intero tragitto (${den}/${den}).`,
        },
        {
          id: 'd2',
          label: `Frazione percorsa = ${num}/${den}`,
          kind: 'utile',
          explanation: `La frazione rimanente è ${den - num}/${den}.`,
        },
      ],
      unknownOptions: [
        'I chilometri rimanenti per il pomeriggio',
        'I chilometri già percorsi al mattino',
        'La velocità media in bici',
      ],
      correctUnknownIndex: 0,
      steps: [
        {
          id: 's1',
          question: `Quanto vale l’unità frazionaria (1/${den} di ${total} km)?`,
          operationChoices: [
            `${total} : ${den}`,
            `${total} : ${num}`,
            `${total} × ${num}`,
            `${total} − ${den}`,
          ],
          correctChoiceIndex: 0,
          expectedResult: unitVal,
          unit: 'km',
          explanation: `${total} : ${den} = ${unitVal} km.`,
        },
        {
          id: 's2',
          question: `Calcola i ${den - num}/${den} restanti (oppure ${total} − ${taken}):`,
          operationChoices: [
            `${unitVal} × ${den - num}`,
            `${unitVal} × ${num}`,
            `${total} − ${unitVal}`,
            `${unitVal} + ${den}`,
          ],
          correctChoiceIndex: 0,
          expectedResult: left,
          unit: 'km',
          explanation: `Restano ${den - num} parti da ${unitVal} km: ${unitVal} × ${den - num} = ${left} km.`,
        },
      ],
      finalAnswer: left,
      unit: 'km',
      unitOptions: ['km', 'm', 'ore'],
      expressionSummary: `${total} − (${total} : ${den}) × ${num} = ${left} km`,
      hints: [
        `Trova prima il valore di 1/${den} dividendo ${total} per ${den}.`,
        `Al mattino fanno ${num} parti (${taken} km); nel pomeriggio restano ${den} − ${num} = ${den - num} parti.`,
        `Moltiplica ${unitVal} km per ${den - num}.`,
      ],
      commonErrors: [
        {
          wrongValue: taken,
          errorType: 'Calcolata la parte già percorsa anziché quella rimanente',
          feedback: `${taken} km sono i ${num}/${den} percorsi al mattino! Sottraili da ${total} km per avere ciò che resta.`,
        },
        {
          wrongValue: unitVal,
          errorType: 'Fermato all’unità frazionaria',
          feedback: `${unitVal} km è solo 1/${den} del percorso; moltiplica per le ${den - num} parti rimaste!`,
        },
      ],
      visualSchema: {
        type: 'fraction',
        title: `Intero ${total} km diviso in ${den} parti da ${unitVal} km`,
        parts: [
          { label: `Fatti (${num}/${den})`, value: `${taken} km` },
          { label: `Restanti (${den - num}/${den})`, value: '? km', highlight: true },
        ],
        totalLabel: `Totale = ${total} km`,
      },
      isGenerated: true,
    };
  }

  if (gradeId === GradeId.PrimaMedia) {
    const mult = pickOne([3, 4, 5]);
    const multWord = mult === 3 ? 'il triplo' : mult === 4 ? 'il quadruplo' : 'il quintuplo';
    const u = randInt(7, 19);
    const smaller = u;
    const larger = u * mult;
    const sum = smaller + larger;
    const totalUnits = mult + 1;
    return {
      id: uid,
      gradeId,
      unitId: '1m-u3',
      title: 'Metodo dei segmenti: Somma e Multiplo (Variante dinamica)',
      contextCategory: 'Metodo dei segmenti',
      difficulty,
      text: `Due angoli adiacenti di un progetto tecnico hanno ampiezza complessiva di ${sum}°, e il maggiore è esattamente ${multWord} del minore.`,
      finalQuestion: 'Quanto misura in gradi l’angolo maggiore?',
      dataItems: [
        {
          id: 'd1',
          label: `Somma delle ampiezze = ${sum}°`,
          kind: 'utile',
          explanation: `Corrisponde a tutte le unità segmentarie messe insieme.`,
        },
        {
          id: 'd2',
          label: `Maggiore = ${multWord} del minore (${mult}u)`,
          kind: 'utile',
          explanation: `Minore = 1u, Maggiore = ${mult}u → insieme formano 1 + ${mult} = ${totalUnits} unità!`,
        },
      ],
      unknownOptions: [
        'L’ampiezza in gradi dell’angolo maggiore',
        'Solo l’ampiezza dell’angolo minore',
        'Il supplementare della somma',
      ],
      correctUnknownIndex: 0,
      steps: [
        {
          id: 's1',
          question: `Insieme formano 1 + ${mult} = ${totalUnits} unità uguali. Quanto vale 1 unità (angolo minore)?`,
          operationChoices: [
            `${sum} : ${totalUnits}`,
            `${sum} : ${mult}`,
            `${sum} − ${mult}`,
            `${sum} : (${mult - 1})`,
          ],
          correctChoiceIndex: 0,
          expectedResult: smaller,
          unit: '°',
          explanation: `${sum}° : ${totalUnits} = ${smaller}° (angolo minore).`,
        },
        {
          id: 's2',
          question: `Calcola ora l’angolo maggiore (${mult} unità):`,
          operationChoices: [
            `${smaller} × ${mult}`,
            `${smaller} + ${mult}`,
            `${sum} + ${smaller}`,
            `${smaller} × ${totalUnits}`,
          ],
          correctChoiceIndex: 0,
          expectedResult: larger,
          unit: '°',
          explanation: `${smaller}° × ${mult} = ${larger}° (verifica: ${smaller}° + ${larger}° = ${sum}°).`,
        },
      ],
      finalAnswer: larger,
      unit: '°',
      unitOptions: ['°', 'cm', 'rad'],
      expressionSummary: `(${sum} : ${totalUnits}) × ${mult} = ${larger}°`,
      hints: [
        `Disegna il minore di 1 quadratino e il maggiore di ${mult} quadratini: quanti quadratini hai in TUTTO? 1 + ${mult} = ${totalUnits}!`,
        `Dividi ${sum}° per ${totalUnits} per trovare 1 unità (${smaller}°).`,
        `Moltiplica per ${mult} perché la domanda chiede l’angolo MAGGIORE.`,
      ],
      commonErrors: [
        {
          wrongValue: smaller,
          errorType: 'Trovato l’angolo minore anziché il maggiore',
          feedback: `${smaller}° è l’angolo MINORE (1 unità)! Moltiplicalo per ${mult} per rispondere alla domanda.`,
        },
        {
          wrongValue: Number((sum / mult).toFixed(2)),
          tolerance: 0.2,
          errorType: `Diviso per ${mult} invece che per (1 + ${mult} = ${totalUnits})`,
          feedback: `Attenzione all’errore classico! Se uno è ${multWord} dell’altro, la somma comprende 1 + ${mult} = ${totalUnits} parti, non ${mult}!`,
        },
      ],
      visualSchema: {
        type: 'segments',
        title: `Somma = ${totalUnits}u = ${sum}° (Minore 1u, Maggiore ${mult}u)`,
        parts: [
          { label: 'Minore (1u)', value: `${smaller}°` },
          { label: `Maggiore (${mult}u)`, value: '? °', highlight: true },
        ],
        totalLabel: `Somma = ${sum}°`,
      },
      isGenerated: true,
    };
  }

  if (gradeId === GradeId.SecondaMedia) {
    const triples: [number, number, number][] = [
      [6, 8, 10],
      [9, 12, 15],
      [12, 16, 20],
      [10, 24, 26],
      [15, 20, 25],
      [16, 30, 34],
    ];
    const [a, b, c] = pickOne(triples);
    const area = (a * b) / 2;
    const perim = a + b + c;
    return {
      id: uid,
      gradeId,
      unitId: '2m-u5',
      title: 'Vela triangolare rettangola (Variante dinamica)',
      contextCategory: 'Teorema di Pitagora',
      difficulty,
      text: `Una vela ha la forma di un triangolo rettangolo con i due cateti lunghi rispettivamente ${a} dm e ${b} dm. Si deve cucire un nastro rinforzato lungo tutto il contorno esterno della vela.`,
      finalQuestion: 'Quanti decimetri di nastro occorrono per l’intero perimetro?',
      dataItems: [
        {
          id: 'd1',
          label: `Cateto minore = ${a} dm, Cateto maggiore = ${b} dm`,
          kind: 'utile',
          explanation: 'Lati perpendicolari attorno all’angolo retto.',
        },
        {
          id: 'd2',
          label: 'Contorno esterno = Perimetro (a + b + c)',
          kind: 'nascosto',
          explanation: 'Manca il terzo lato (ipotenusa c), ricavabile con il Teorema di Pitagora!',
        },
      ],
      unknownOptions: [
        'Il perimetro completo della vela (cateti + ipotenusa)',
        'La sola ipotenusa della vela',
        'L’area del tessuto della vela',
      ],
      correctUnknownIndex: 0,
      steps: [
        {
          id: 's1',
          question: `Calcola l’ipotenusa c con il Teorema di Pitagora √(${a}² + ${b}²):`,
          operationChoices: [
            `√(${a * a} + ${b * b}) = √${a * a + b * b}`,
            `√(${b * b} − ${a * a})`,
            `${a} + ${b}`,
            `(${a} × ${b}) : 2`,
          ],
          correctChoiceIndex: 0,
          expectedResult: c,
          unit: 'dm',
          explanation: `√(${a * a} + ${b * b}) = √${c * c} = ${c} dm.`,
        },
        {
          id: 's2',
          question: 'Somma i tre lati per ottenere il perimetro della vela:',
          operationChoices: [
            `${a} + ${b} + ${c}`,
            `${a} × ${b} : 2`,
            `2 × (${a} + ${b})`,
            `${c} × 3`,
          ],
          correctChoiceIndex: 0,
          expectedResult: perim,
          unit: 'dm',
          explanation: `Perimetro = ${a} + ${b} + ${c} = ${perim} dm.`,
        },
      ],
      finalAnswer: perim,
      unit: 'dm',
      unitOptions: ['dm', 'dm²', 'm'],
      expressionSummary: `${a} + ${b} + √(${a}² + ${b}²) = ${a} + ${b} + ${c} = ${perim} dm`,
      hints: [
        `Per bordare tutta la vela ti servono tutti e 3 i lati, ma conosci solo i due cateti (${a} dm e ${b} dm).`,
        `Trova l’ipotenusa: √(${a}² + ${b}²) = √(${a * a} + ${b * b}) = ${c} dm.`,
        `Somma ${a} + ${b} + ${c}.`,
      ],
      commonErrors: [
        {
          wrongValue: c,
          errorType: 'Fermato al calcolo dell’ipotenusa',
          feedback: `${c} dm è l’ipotenusa! Ora aggiungi i due cateti (${a} dm e ${b} dm) per ottenere tutto il perimetro.`,
        },
        {
          wrongValue: area,
          errorType: 'Calcolata l’area anziché il perimetro',
          feedback: `${area} dm² è l’area della vela; il nastro lungo il bordo richiede il PERIMETRO!`,
        },
      ],
      visualSchema: {
        type: 'pythagoras',
        title: `Triangolo rettangolo: cateti ${a} dm e ${b} dm`,
        parts: [
          { label: 'Cateto a', value: `${a} dm` },
          { label: 'Cateto b', value: `${b} dm` },
          { label: 'Perimetro (a+b+c)', value: '? dm', highlight: true },
        ],
      },
      isGenerated: true,
    };
  }

  // Terza Media
  const xSol = randInt(8, 22);
  const diff = randInt(4, 12);
  const coef = pickOne([2, 3]);
  const wordCoef = coef === 2 ? 'il doppio' : 'il triplo';
  // Numero x tale che coef * x + diff = x + rhsDiff -> (coef - 1)x + diff = total?
  // Facciamo un problema geometrico/algebrico pulitissimo:
  // Tre casse: la prima pesa x kg, la seconda supera x di diff kg, la terza pesa coef * x kg. Peso totale = S.
  const c1 = xSol;
  const c2 = xSol + diff;
  const c3 = coef * xSol;
  const totalWeight = c1 + c2 + c3;
  const sumCoeff = 1 + 1 + coef;
  return {
    id: uid,
    gradeId: GradeId.TerzaMedia,
    unitId: '3m-u2',
    title: 'Carico equilibrato su tre casse (Equazione dinamica)',
    contextCategory: 'Equazioni di I grado',
    difficulty,
    text: `Tre casse vengono caricate su un montacarichi per una massa totale di ${totalWeight} kg. La seconda cassa pesa ${diff} kg in più della prima, mentre la terza pesa ${wordCoef} della prima.`,
    finalQuestion: 'Qual è la massa in chilogrammi della TERZA cassa (la più pesante)?',
    dataItems: [
      {
        id: 'd1',
        label: `1ª cassa = x; 2ª cassa = x + ${diff}; 3ª cassa = ${coef}x`,
        kind: 'utile',
        explanation: 'Traduzione algebrica delle tre masse in funzione di x.',
      },
      {
        id: 'd2',
        label: `Massa complessiva = ${totalWeight} kg`,
        kind: 'utile',
        explanation: `Fornisce l’equazione x + (x + ${diff}) + ${coef}x = ${totalWeight}.`,
      },
    ],
    unknownOptions: [
      `La massa della terza cassa (${coef}x)`,
      'La massa x della prima cassa',
      'La media aritmetica delle tre casse',
    ],
    correctUnknownIndex: 0,
    steps: [
      {
        id: 's1',
        question: `Risolvi l’equazione x + (x + ${diff}) + ${coef}x = ${totalWeight} (cioè ${sumCoeff}x + ${diff} = ${totalWeight}). Quanto vale x?`,
        operationChoices: [
          `(${totalWeight} − ${diff}) : ${sumCoeff} = ${xSol}`,
          `(${totalWeight} + ${diff}) : ${sumCoeff}`,
          `${totalWeight} : ${sumCoeff}`,
          `${totalWeight} : ${coef}`,
        ],
        correctChoiceIndex: 0,
        expectedResult: xSol,
        unit: 'kg (1ª cassa)',
        explanation: `${sumCoeff}x = ${totalWeight - diff} → x = ${xSol} kg.`,
      },
      {
        id: 's2',
        question: `Attenzione alla domanda finale! Quanto pesa la TERZA cassa (${coef}x)?`,
        operationChoices: [
          `${coef} × ${xSol}`,
          `${xSol} + ${diff}`,
          `${xSol}`,
          `${totalWeight} − ${xSol}`,
        ],
        correctChoiceIndex: 0,
        expectedResult: c3,
        unit: 'kg',
        explanation: `Terza cassa = ${coef} × ${xSol} = ${c3} kg (verifica: ${c1} + ${c2} + ${c3} = ${totalWeight} kg).`,
      },
    ],
    finalAnswer: c3,
    unit: 'kg',
    unitOptions: ['kg', 'g', 'casse'],
    expressionSummary: `${sumCoeff}x + ${diff} = ${totalWeight} → x = ${xSol} kg → 3ª cassa = ${c3} kg`,
    hints: [
      `Poni x = massa della prima cassa. Allora le tre casse sono x, (x + ${diff}) e ${coef}x.`,
      `Somma i termini simili: ${sumCoeff}x + ${diff} = ${totalWeight} → ${sumCoeff}x = ${totalWeight - diff}.`,
      `Trovato x = ${xSol} kg, moltiplica per ${coef} perché è richiesta la TERZA cassa!`,
    ],
    commonErrors: [
      {
        wrongValue: xSol,
        errorType: 'Indicata la x (1ª cassa) anziché la 3ª cassa richiesta',
        feedback: `Hai risolto benissimo l’equazione (x = ${xSol} kg), ma x è la PRIMA cassa! La domanda chiede la TERZA (${coef}x = ${c3} kg).`,
      },
      {
        wrongValue: c2,
        errorType: 'Indicata la 2ª cassa anziché la 3ª',
        feedback: `${c2} kg è la seconda cassa (x + ${diff}); la terza vale ${coef} × ${xSol} = ${c3} kg!`,
      },
    ],
    visualSchema: {
      type: 'equation',
      title: `Equazione: ${sumCoeff}x + ${diff} = ${totalWeight}`,
      parts: [
        { label: '1ª (x)', value: `${c1} kg` },
        { label: `2ª (x+${diff})`, value: `${c2} kg` },
        { label: `3ª (${coef}x)`, value: '? kg', highlight: true },
      ],
      totalLabel: `Totale = ${totalWeight} kg`,
    },
    isGenerated: true,
  };
}
