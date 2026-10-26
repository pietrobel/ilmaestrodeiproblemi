import { GradeId, type GradeProfile } from '../types/math';

export const GRADE_PROFILES: GradeProfile[] = [
  {
    id: GradeId.QuartaPrimaria,
    order: 1,
    buttonLabel: 'Quarta primaria',
    shortName: '4ª Primaria',
    schoolCycle: 'Scuola Primaria',
    summary:
      'Quattro operazioni, dati utili e superflui, domande intermedie, euro, tempo, misure e schemi a barre.',
    textComplexityNote: 'Frasi brevi e chiare legate alla vita quotidiana, con situazioni concrete.',
    numbersAndCalcNote: 'Numeri interi fino alle migliaia e primi decimali con euro e centesimi.',
    operationsCountNote: '1 o 2 operazioni con guida esplicita alla domanda intermedia.',
    visualStyleNote: 'Schemi a barre parte-tutto e modelli concreti di confronto.',
    defaultAutonomy: 'guidato',
    defaultLabTab: 'segmenti',
    topicsOverview: [
      'Addizione, sottrazione, moltiplicazione e divisione nei problemi',
      'Dati utili, superflui, mancanti e parole-numero nascoste',
      'Problemi a due operazioni e scoperta della domanda intermedia',
      'Denaro, resto, orari, durate e misure quotidiane',
      'Rappresentazioni concrete e schemi visivi a barre',
    ],
    glossary: [
      {
        term: 'Dato utile',
        definition: 'Un numero o una informazione del testo indispensabile per rispondere alla domanda.',
        example: 'Se compro 3 quaderni da 2 euro, "3" e "2 euro" sono dati utili.',
      },
      {
        term: 'Dato superfluo',
        definition: 'Un numero presente nel testo che racconta un dettaglio ma non serve per il calcolo.',
        example: '«Sara sale sull’autobus numero 15 con 8 euro»: il 15 non entra nei calcoli.',
      },
      {
        term: 'Dato nascosto',
        definition: 'Una quantità scritta con una parola invece che con cifre.',
        example: '«Una settimana» = 7 giorni, «una dozzina» = 12, «un paio» = 2.',
      },
      {
        term: 'Domanda intermedia',
        definition: 'Il passaggio che bisogna calcolare prima di poter rispondere alla domanda finale.',
        example: 'Prima trovo quanto spendo in tutto, poi calcolo il resto dalla banconota.',
      },
      {
        term: 'Schema a barre',
        definition: 'Un disegno con rettangoli proporzionati che mostra come le parti formano il tutto.',
        example: 'Tre blocchi uguali da 12 figurine mostrano subito 12 × 3 = 36.',
      },
    ],
  },
  {
    id: GradeId.QuintaPrimaria,
    order: 2,
    buttonLabel: 'Quinta primaria',
    shortName: '5ª Primaria',
    schoolCycle: 'Scuola Primaria',
    summary:
      'Problemi a più operazioni, frazioni e decimali, compravendita, equivalenze, perimetro e area, prime espressioni.',
    textComplexityNote: 'Testi articolati su negozi, laboratori, misure e progettazione di spazi.',
    numbersAndCalcNote: 'Numeri grandi, numeri decimali fino ai centesimi/millesimi e frazioni di quantità.',
    operationsCountNote: 'Da 2 a 3 operazioni, anche riassumibili in una espressione aritmetica semplice.',
    visualStyleNote: 'Griglie frazionarie, schemi spesa-guadagno-ricavo e figure piane quotate.',
    defaultAutonomy: 'guidato',
    defaultLabTab: 'frazioni',
    topicsOverview: [
      'Problemi a più operazioni ed espressioni aritmetiche semplici',
      'Frazioni di un numero e decimali in situazioni reali',
      'Compravendita: costo unitario, costo totale, spesa, ricavo e guadagno',
      'Misure di lunghezza, capacità, massa, tempo ed equivalenze',
      'Perimetro e area delle principali figure piane',
    ],
    glossary: [
      {
        term: 'Costo unitario',
        definition: 'Il prezzo di un solo oggetto, di un solo chilogrammo o di un solo litro.',
        example: 'Se 4 penne costano 6 €, il costo unitario è 6 : 4 = 1,50 €.',
      },
      {
        term: 'Spesa, Ricavo e Guadagno',
        definition: 'La spesa è quanto paga il negoziante; il ricavo è quanto incassa vendendo; il guadagno è Ricavo − Spesa.',
        example: 'Compro a 18 € (spesa) e rivendo a 25 € (ricavo): guadagno 7 €.',
      },
      {
        term: 'Frazione di un numero',
        definition: 'Si divide l’intero per il denominatore (parti totali) e si moltiplica per il numeratore (parti prese).',
        example: 'I 3/5 di 40 alunni: (40 : 5) × 3 = 8 × 3 = 24 alunni.',
      },
      {
        term: 'Equivalenza',
        definition: 'La trasformazione di una misura in un’altra unità dello stesso tipo mantenendo lo stesso valore.',
        example: '2,5 m = 250 cm; prima di sommare lunghezze servono unità uguali.',
      },
      {
        term: 'Perimetro e Area',
        definition: 'Il perimetro misura il contorno (es. m); l’area misura la superficie interna (es. m²).',
        example: 'Una recinzione riguarda il perimetro; le piastrelle riguardano l’area.',
      },
    ],
  },
  {
    id: GradeId.PrimaMedia,
    order: 3,
    buttonLabel: 'Prima secondaria di primo grado',
    shortName: '1ª Media',
    schoolCycle: 'Scuola Secondaria di I Grado',
    summary:
      'Espressioni e potenze, problemi con MCD e mcm, metodo grafico dei segmenti, frazioni, equivalenze e angoli.',
    textComplexityNote: 'Linguaggio matematico strutturato con relazioni tra grandezze (somma, differenza, multipli).',
    numbersAndCalcNote: 'Naturali, decimali, potenze, scomposizione in fattori primi e frazioni.',
    operationsCountNote: 'Problemi multi-step modellizzabili con metodo dei segmenti o espressioni complete.',
    visualStyleNote: 'Metodo grafico dei segmenti (unità frazionarie) e diagrammi angolari.',
    defaultAutonomy: 'guidato',
    defaultLabTab: 'segmenti',
    topicsOverview: [
      'Problemi con numeri naturali, decimali, potenze ed espressioni',
      'Divisibilità, problemi di ripartizione massima (MCD) e periodicità (mcm)',
      'Metodo grafico dei segmenti: somma-differenza, somma-multiplo, differenza-multiplo',
      'Problemi diretti e inversi con le frazioni',
      'Sistema metrico decimale, equivalenze e problemi sugli angoli',
    ],
    glossary: [
      {
        term: 'Unità segmentaria (u)',
        definition: 'Il segmento base scelto per rappresentare graficamente grandezze una multipla dell’altra.',
        example: 'Se A è il triplo di B, disegno B = 1 unità e A = 3 unità (totale 4 unità).',
      },
      {
        term: 'Somma e Differenza',
        definition: 'Conoscendo somma S e differenza D di due numeri: il minore è (S − D) : 2, il maggiore è (S + D) : 2.',
        example: 'Somma 30, differenza 6: togliendo 6 restano due parti uguali da 12; i numeri sono 12 e 18.',
      },
      {
        term: 'Massimo Comune Divisore (MCD)',
        definition: 'Il più grande divisore comune: risolve problemi in cui si vogliono formare il maggior numero di gruppi tutti uguali senza resti.',
        example: 'Dividere 24 panini e 36 succhi in sacchetti identici: MCD(24, 36) = 12 sacchetti.',
      },
      {
        term: 'Minimo comune multiplo (mcm)',
        definition: 'Il più piccolo multiplo comune: risolve problemi di eventi periodici che tornano a coincidere.',
        example: 'Un bus passa ogni 12 min e un altro ogni 18 min: coincidono ogni mcm(12, 18) = 36 min.',
      },
      {
        term: 'Angoli supplementari e complementari',
        definition: 'Due angoli sono complementari se la loro somma è 90°, supplementari se la loro somma è 180°.',
        example: 'Il supplementare di 65° misura 180° − 65° = 115°.',
      },
    ],
  },
  {
    id: GradeId.SecondaMedia,
    order: 4,
    buttonLabel: 'Seconda secondaria di primo grado',
    shortName: '2ª Media',
    schoolCycle: 'Scuola Secondaria di I Grado',
    summary:
      'Rapporti e proporzioni, percentuali e sconti, problemi frazionari inversi, equivalenza di figure piane e Teorema di Pitagora.',
    textComplexityNote: 'Testi tecnici con rapporti, scale geografiche, variazioni percentuali e geometria piana.',
    numbersAndCalcNote: 'Numeri razionali, radici quadrate, proporzioni continue e calcoli percentuali.',
    operationsCountNote: '2–4 passaggi logici con uso di formule inverse, proporzioni e radici quadrate.',
    visualStyleNote: 'Triangoli rettangoli quotati, tabelle di proporzionalità e barre percentuali.',
    defaultAutonomy: 'guidato',
    defaultLabTab: 'geometria',
    topicsOverview: [
      'Problemi avanzati e inversi con frazioni e frazioni residue',
      'Rapporti, scale di riduzione, proporzioni, grandezze direttamente e inversamente proporzionali',
      'Percentuali, sconti, aumenti e problemi finanziari reali',
      'Area dei poligoni, formule inverse e figure equivalenti',
      'Teorema di Pitagora applicato ai poligoni e a contesti reali',
    ],
    glossary: [
      {
        term: 'Proporzione',
        definition: 'Uguaglianza tra due rapporti (a : b = c : d). Il prodotto dei medi è uguale al prodotto degli estremi.',
        example: 'In 3 : 5 = x : 20 si ricava x = (5 × 3)? Attenzione: x è medio, quindi x = (3 × 20) : 5 = 12.',
      },
      {
        term: 'Proporzionalità inversa',
        definition: 'Due grandezze sono inversamente proporzionali se raddoppiando la prima la seconda dimezza (prodotto costante x · y = k).',
        example: 'Se 4 operai impiegano 6 giorni (4 × 6 = 24), 8 operai impiegano 24 : 8 = 3 giorni.',
      },
      {
        term: 'Problema inverso sulle frazioni',
        definition: 'Conosci il valore di una frazione e devi risalire all’intero: dividi per il numeratore e moltiplica per il denominatore.',
        example: 'Se i 3/4 di un serbatoio sono 60 litri, l’intero serbatoio contiene (60 : 3) × 4 = 80 litri.',
      },
      {
        term: 'Figure equivalenti',
        definition: 'Due figure piane che hanno la stessa area, anche se hanno forma e perimetro diversi.',
        example: 'Un quadrato di lato 6 cm (A = 36 cm²) è equivalente a un rettangolo di base 9 cm e altezza 4 cm.',
      },
      {
        term: 'Teorema di Pitagora',
        definition: 'In ogni triangolo rettangolo il quadrato costruito sull’ipotenusa è equivalente alla somma dei quadrati costruiti sui cateti: c² = a² + b².',
        example: 'Con cateti 6 m e 8 m, l’ipotenusa misura √(36 + 64) = √100 = 10 m.',
      },
    ],
  },
  {
    id: GradeId.TerzaMedia,
    order: 5,
    buttonLabel: 'Terza secondaria di primo grado',
    shortName: '3ª Media',
    schoolCycle: 'Scuola Secondaria di I Grado',
    summary:
      'Numeri relativi, calcolo letterale, equazioni di primo grado, cerchio e geometria solida, piano cartesiano, probabilità e statistica.',
    textComplexityNote: 'Problemi di modellizzazione algebrica, geometria nello spazio e quesiti argomentativi stile esame.',
    numbersAndCalcNote: 'Numeri reali (relativi, razionali, π), espressioni letterali ed equazioni lineari.',
    operationsCountNote: 'Scelta dell’incognita, impostazione algebrica o geometrica multi-passaggio in autonomia.',
    visualStyleNote: 'Bilancia algebrica delle equazioni, solidi 3D quotati e piano cartesiano.',
    defaultAutonomy: 'autonomo',
    defaultLabTab: 'equazioni',
    topicsOverview: [
      'Numeri relativi, calcolo letterale e traduzione in formule algebriche',
      'Modellizzazione e risoluzione di problemi con equazioni di primo grado',
      'Circonferenza, cerchio e geometria solida (prisma, cilindro, piramide, cono e densità)',
      'Piano cartesiano, distanza tra punti e confronto tra modelli lineari',
      'Statistica descrittiva, probabilità classica e problemi argomentativi d’esame',
    ],
    glossary: [
      {
        term: 'Incognita (x)',
        definition: 'La grandezza sconosciuta scelta come riferimento per tradurre le relazioni del problema in una equazione.',
        example: 'Se un lato supera l’altro di 4 cm, pongo la base = x e l’altezza = x + 4.',
      },
      {
        term: 'Principi di equivalenza',
        definition: 'Aggiungendo/sottraendo lo stesso termine o moltiplicando/dividendo per lo stesso numero (≠ 0) entrambi i membri, la soluzione non cambia.',
        example: 'Da 3x + 5 = 20 sottraggo 5 a entrambi i membri: 3x = 15, poi divido per 3: x = 5.',
      },
      {
        term: 'Densità (o peso specifico)',
        definition: 'Il rapporto tra la massa di un corpo e il suo volume (d = M / V, quindi M = V · d).',
        example: 'Un blocco di legno (d = 0,7 kg/dm³) di volume 20 dm³ ha massa 20 × 0,7 = 14 kg.',
      },
      {
        term: 'Volume di cilindro e cono',
        definition: 'Il cilindro ha volume V = π · r² · h; il cono avente stessa base e stessa altezza ha volume esattamente un terzo: V = (π · r² · h) / 3.',
        example: 'Con r = 3 cm, h = 10 cm e π ≈ 3,14: V_cilindro = 282,6 cm³, V_cono = 94,2 cm³.',
      },
      {
        term: 'Probabilità classica',
        definition: 'Il rapporto tra il numero dei casi favorevoli e il numero di tutti i casi ugualmente possibili (valore tra 0 e 1, o tra 0% e 100%).',
        example: 'Pescando da 5 palline rosse e 15 blu (totale 20), P(rossa) = 5/20 = 1/4 = 25%.',
      },
    ],
  },
];

export function getGradeProfile(gradeId: GradeId): GradeProfile {
  const found = GRADE_PROFILES.find((g) => g.id === gradeId);
  return found ?? GRADE_PROFILES[0];
}
