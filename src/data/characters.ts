import { GradeId, type CharacterMascot } from '../types/math';

export const CHARACTERS: CharacterMascot[] = [
  {
    id: 'maestro',
    name: 'Il Maestro dei Problemi',
    species: 'Maestro di Matematica e Logica',
    role: 'Mentore e Guida del Percorso',
    greeting: 'Benvenuto nel mio laboratorio! Pronto a scoprire il segreto di ogni problema matematico?',
    catchphrase: 'Nessun problema è un muro: con la logica diventa una scala per salire più in alto!',
    badgeTitle: 'Sigillo del Maestro',
    accentColor: '#0369A1',
    gradeIds: [
      GradeId.QuartaPrimaria,
      GradeId.QuintaPrimaria,
      GradeId.PrimaMedia,
      GradeId.SecondaMedia,
      GradeId.TerzaMedia,
    ],
    tips: [
      'Un problema è come un racconto con una sorpresa finale: prima immagina la scena, poi cerca la domanda!',
      'Non avere mai fretta di fare i calcoli: chi disegna uno schema o una barretta ha già risolto a metà.',
      'Sbagliare è la parte più bella dell’imparare: ogni tentativo ci insegna quale strada scartare!',
      'Prima di confermare il risultato, chiediti sempre: «Ha senso nella vita reale?»',
    ],
  },
  {
    id: 'pico',
    name: 'Pico la Civetta',
    species: 'Civetta Detective',
    role: 'Detective dei Dati e dei Tranelli',
    greeting: 'Uhu! Pronto a investigare con me?',
    catchphrase: 'Occhio di falco: scova il dato nascosto e scarta quello superfluo!',
    badgeTitle: 'Spilla Detective',
    accentColor: '#D97706',
    gradeIds: [GradeId.QuartaPrimaria, GradeId.QuintaPrimaria],
    tips: [
      'Prima di calcolare, leggi la domanda: cosa dobbiamo scoprire esattamente?',
      'Se un numero racconta solo un particolare (come il numero dell’autobus), è un dato superfluo: salutalo e non usarlo!',
      'Attento alle parole travestite da numero: «una dozzina» è 12, «un paio» è 2, «una settimana» sono 7 giorni!',
      'Prima di scrivere il risultato, chiediti: «Ha senso nella realtà?»',
    ],
  },
  {
    id: 'leo',
    name: 'Leo il Castoro',
    species: 'Castoro Costruttore',
    role: 'Mastro degli Schemi e delle Barrette',
    greeting: 'Squadra e matita pronte! Costruiamo la soluzione!',
    catchphrase: 'Un disegno vale più di cento parole: con le barrette la soluzione si vede subito!',
    badgeTitle: 'Matita d’Oro',
    accentColor: '#059669',
    gradeIds: [GradeId.QuartaPrimaria, GradeId.QuintaPrimaria, GradeId.PrimaMedia],
    tips: [
      'Disegna una barretta per ciascuna quantità: vedi subito chi ha di più e chi ha di meno.',
      'Nei problemi parte-tutto, unisci i pezzi per avere il totale, oppure togli una parte dal totale per trovare il resto!',
      'Perimetro = il recinto (tutto intorno); Area = il pavimento da coprire!',
      'Se tagli via la differenza tra due barre, ottieni due pezzi identici!',
    ],
  },
  {
    id: 'zoe',
    name: 'Zoe l’Esploratrice',
    species: 'Volpe Avventuriera',
    role: 'Guida delle Missioni sul Campo',
    greeting: 'Zaino in spalla! La prossima sfida ci aspetta!',
    catchphrase: 'Ogni problema è una tappa: passo dopo passo si arriva in vetta!',
    badgeTitle: 'Bussola d’Argento',
    accentColor: '#0284C7',
    gradeIds: [GradeId.QuartaPrimaria, GradeId.QuintaPrimaria, GradeId.PrimaMedia],
    tips: [
      'Attenzione all’equivalenza! Non puoi sommare metri e centimetri: trasformali prima nella stessa unità!',
      'Quando vai al negozio, ricorda: Spesa + Guadagno = Ricavo.',
      'Le frazioni sono come una pizza: il denominatore dice quante fette tagli, il numeratore quante ne mangi!',
      'Ragiona a tappe: risolvi la prima domanda e usa la risposta per quella finale!',
    ],
  },
  {
    id: 'archi',
    name: 'Prof. Archimede',
    species: 'Gatto Filosofo e Matematico',
    role: 'Mentor di Logica e Strategie',
    greeting: 'Eureka! Affrontiamo questo enigma con metodo!',
    catchphrase: 'La matematica non è imparare formule a memoria, ma capire perché funzionano.',
    badgeTitle: 'Sigillo di Archimede',
    accentColor: '#4F46E5',
    gradeIds: [GradeId.PrimaMedia, GradeId.SecondaMedia, GradeId.TerzaMedia],
    tips: [
      'Cerca il modello matematico: somma-differenza, proporzione o equazione?',
      'Usa il MCD per dividere in parti uguali massime, il mcm per calcolare incontri futuri che si ripetono.',
      'Nel Teorema di Pitagora (dalla seconda media!), individua prima l’angolo retto: l’ipotenusa è sempre di fronte a lui!',
      'Un buon matematico controlla sempre l’ordine di grandezza del risultato prima di confermarlo.',
    ],
  },
  {
    id: 'maya',
    name: 'Maya l’Analista',
    species: 'Lince dei Dati',
    role: 'Stratega di Equazioni e Geometria',
    greeting: 'Equilibrio perfetto! Trasformiamo il testo in algebra!',
    catchphrase: 'Le equazioni sono come bilance: ciò che fai da una parte lo fai anche dall’altra!',
    badgeTitle: 'Prisma di Cristallo',
    accentColor: '#E11D48',
    gradeIds: [GradeId.SecondaMedia, GradeId.TerzaMedia],
    tips: [
      'Chiama «x» la grandezza incognita che non conosci e scrivi il problema come una bilancia.',
      'Nelle proporzioni ricorda: prodotto degli estremi = prodotto dei medi.',
      'Nelle percentuali ragiona sulla parte e sul 100: uno sconto del 20% significa che paghi l’80%!',
      'Nello spazio tridimensionale attenzione alle unità di volume: ogni salto sulla scala vale 1000!',
    ],
  },
];

export function getMascotsForGrade(gradeId: GradeId): CharacterMascot[] {
  return CHARACTERS.filter((c) => c.gradeIds.includes(gradeId));
}

export function getDefaultMascotForGrade(_gradeId: GradeId): CharacterMascot {
  return CHARACTERS[0]; // Il Maestro dei Problemi
}
