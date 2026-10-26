import { GradeId, type MiniGameItem } from '../types/math';

export const MINI_GAMES_BANK: MiniGameItem[] = [
  // ================= QUARTA PRIMARIA =================
  {
    id: 'game-4p-1',
    gradeId: GradeId.QuartaPrimaria,
    category: 'dato-superfluo',
    title: 'La fermata del tram',
    storyContext: 'Pico ha acceso la sua lente d’ingrandimento! Guarda il testo e trova l’intruso.',
    prompt: '«Alle ore 8:15 Marco sale sul tram numero 14 con 5 euro in tasca per comprare 2 biglietti da 1,50 € ciascuno». Qual è il dato superfluo che NON serve per sapere quanto resto riceverà Marco?',
    options: [
      { id: 'o1', label: 'Il tram numero 14 (e l’orario 8:15)', isCorrect: true, explanation: 'Bravissimo! Il numero del tram (14) e l’orario (8:15) descrivono la scena, ma per il resto servono solo i 5 euro e i biglietti!' },
      { id: 'o2', label: 'I 5 euro in tasca', isCorrect: false, explanation: 'I 5 euro servono assolutamente: sono i soldi con cui Marco paga alla cassa!' },
      { id: 'o3', label: 'I 2 biglietti da 1,50 €', isCorrect: false, explanation: 'Questo dato serve per calcolare la spesa totale (2 × 1,50 € = 3 €)!' },
    ],
    mascotTip: 'Pico consiglia: chiediti sempre «Se cambio questo numero, il resto cambia oppure no?». Se non cambia, è superfluo!',
  },
  {
    id: 'game-4p-2',
    gradeId: GradeId.QuartaPrimaria,
    category: 'parola-nascosta',
    title: 'Il fornaio e le uova',
    storyContext: 'Le parole a volte indossano una maschera e nascondono un numero segreto!',
    prompt: '«Il pasticciere Carlo apre il frigo e trova una dozzina di uova fresche e un paio di uova sode». Quante uova ha in tutto Carlo?',
    options: [
      { id: 'o1', label: '14 uova (12 + 2)', isCorrect: true, explanation: 'Esatto! «Una dozzina» nasconde il numero 12 e «un paio» nasconde il numero 2: 12 + 2 = 14 uova!' },
      { id: 'o2', label: '10 uova', isCorrect: false, explanation: 'Attenzione! Una dozzina vale 12, non 10 (la decina è 10, la dozzina è 12)!' },
      { id: 'o3', label: '2 uova', isCorrect: false, explanation: 'Hai contato solo «un paio» (2), ma ci sono anche le 12 uova della dozzina!' },
    ],
    mascotTip: 'Pico ricorda: dozzina = 12, paio = 2, coppia = 2, settimana = 7 giorni!',
  },
  {
    id: 'game-4p-3',
    gradeId: GradeId.QuartaPrimaria,
    category: 'operazione-lampo',
    title: 'I sacchetti di biglie',
    storyContext: 'Leo il Castoro deve caricare il suo carretto! Aiutalo a scegliere l’operazione al volo.',
    prompt: '«Matteo ha 24 biglie di vetro e le vuole distribuire in parti uguali in 4 sacchetti». Quale operazione deve eseguire?',
    options: [
      { id: 'o1', label: '24 : 4 (Divisione)', isCorrect: true, explanation: 'Perfetto! Conosciamo il totale e lo distribuiamo in parti uguali: usiamo la divisione (24 : 4 = 6 biglie per sacchetto)!' },
      { id: 'o2', label: '24 × 4 (Moltiplicazione)', isCorrect: false, explanation: 'Attenzione: non stiamo moltiplicando le biglie! Ne abbiamo 24 in tutto e le dividiamo.' },
      { id: 'o3', label: '24 − 4 (Sottrazione)', isCorrect: false, explanation: 'La sottrazione toglie una quantità sola, non distribuisce in parti uguali!' },
    ],
    mascotTip: 'Leo dice: quando vedi «distribuire in parti uguali» o «fare gruppi uguali», la regina è la divisione (:).',
  },
  {
    id: 'game-4p-4',
    gradeId: GradeId.QuartaPrimaria,
    category: 'stima-ragionevole',
    title: 'La merenda di compleanno',
    storyContext: 'Zoe ti insegna il super-potere dei matematici: la stima a colpo d’occhio!',
    prompt: '«Compri 4 succhi di frutta a 1,90 € ciascuno e paghi con una banconota da 20 €». Senza calcolare i centesimi, quanto riceverai all’incirca di resto?',
    options: [
      { id: 'o1', label: 'Circa 12 euro', isCorrect: true, explanation: 'Grandioso! 1,90 € è quasi 2 €. Quattro succhi costano quasi 8 € (4 × 2). Il resto da 20 € sarà circa 20 − 8 = 12 € (esattamente 12,40 €)!' },
      { id: 'o2', label: 'Meno di 2 euro', isCorrect: false, explanation: 'Troppo poco! 4 succhi costano circa 8 euro, quindi con 20 euro avanzano molti più soldi!' },
      { id: 'o3', label: 'Circa 18 euro', isCorrect: false, explanation: 'Hai tolto il costo di 1 solo succo anziché di tutti e 4!' },
    ],
    mascotTip: 'Zoe consiglia: arrotonda i numeri brutti (1,90 € → 2 €) per vedere subito dove deve andare a cadere il risultato!',
  },

  // ================= QUINTA PRIMARIA =================
  {
    id: 'game-5p-1',
    gradeId: GradeId.QuintaPrimaria,
    category: 'dato-superfluo',
    title: 'La fattoria e il recinto',
    storyContext: 'Pico cerca l’intruso nei problemi di geometria!',
    prompt: '«Nel 2024 il fattore Giovanni compra una rete per recintare il suo orto rettangolare lungo 15 metri e largo 8 metri, dove crescono 48 piante di pomodoro». Quale dato NON serve per calcolare i metri di rete necessari?',
    options: [
      { id: 'o1', label: 'Le 48 piante di pomodoro (e l’anno 2024)', isCorrect: true, explanation: 'Esatto! Le piante stanno dentro l’orto e l’anno è una data. La rete va solo sul bordo (il perimetro: 15+8+15+8 = 46 m)!' },
      { id: 'o2', label: 'La lunghezza di 15 metri', isCorrect: false, explanation: 'Serve assolutamente: è uno dei lati del rettangolo!' },
      { id: 'o3', label: 'La larghezza di 8 metri', isCorrect: false, explanation: 'Serve assolutamente: è l’altro lato del rettangolo!' },
    ],
    mascotTip: 'Pico ricorda: per recintare serve solo il contorno (perimetro)! Tutto ciò che c’è dentro o la data è superfluo.',
  },
  {
    id: 'game-5p-2',
    gradeId: GradeId.QuintaPrimaria,
    category: 'parola-nascosta',
    title: 'La tavoletta di cioccolato frazionata',
    storyContext: 'Frazioni e golosità con Zoe l’Esploratrice!',
    prompt: '«Una tavoletta di cioccolato è formata da 24 quadratini. Luca ne mangia i 3/8». Quanti quadratini ha mangiato Luca?',
    options: [
      { id: 'o1', label: '9 quadratini', isCorrect: true, explanation: 'Perfetto! Dividi per il denominatore (24 : 8 = 3 quadratini per ottavo) e moltiplica per il numeratore (3 × 3 = 9)!' },
      { id: 'o2', label: '8 quadratini', isCorrect: false, explanation: '8 è il denominatore (il numero di fette uguali), non i quadratini mangiati!' },
      { id: 'o3', label: '15 quadratini', isCorrect: false, explanation: '15 sono i quadratini RIMASTI (la parte complementare 5/8)!' },
    ],
    mascotTip: 'Zoe dice: Denominatore in basso = dividi l’intero; Numeratore in alto = moltiplica per le parti prese!',
  },
  {
    id: 'game-5p-3',
    gradeId: GradeId.QuintaPrimaria,
    category: 'operazione-lampo',
    title: 'Recintare o Pavimentare?',
    storyContext: 'Leo il Castoro mette alla prova la tua abilità da geometra!',
    prompt: '«Devi comprare le piastrelle per pavimentare il fondo di una piscina rettangolare». Quale grandezza geometrica devi calcolare?',
    options: [
      { id: 'o1', label: 'L’Area (superficie in metri quadrati m²)', isCorrect: true, explanation: 'Bravissimo! Le piastrelle coprono tutta la superficie interna: si calcola l’AREA (base × altezza) in m²!' },
      { id: 'o2', label: 'Il Perimetro (contorno in metri lineari m)', isCorrect: false, explanation: 'Il perimetro è solo il bordo attorno alla vasca! Per coprire il pavimento serve l’area.' },
      { id: 'o3', label: 'La somma degli angoli', isCorrect: false, explanation: 'Gli angoli di un rettangolo sono 90°, ma non servono per sapere quante piastrelle comprare!' },
    ],
    mascotTip: 'Leo insegna: se dipingi, semini o piastrelli → AREA; se recinti, incornici o cammini lungo il bordo → PERIMETRO!',
  },
  {
    id: 'game-5p-4',
    gradeId: GradeId.QuintaPrimaria,
    category: 'stima-ragionevole',
    title: 'La cassa del supermercato (Spesa e Guadagno)',
    storyContext: 'Pico fa i conti veloci tra spesa, ricavo e guadagno.',
    prompt: '«Un negoziante compra una scatola di pennarelli a 4 € e la rivende a 7 €». Quanto guadagna su ogni scatola?',
    options: [
      { id: 'o1', label: 'Guadagna 3 € (Ricavo 7 € − Spesa 4 €)', isCorrect: true, explanation: 'Esatto! Il ricavo è tutto ciò che incassa (7 €), ma deve togliere la spesa iniziale (4 €): 7 − 4 = 3 € di guadagno pulito!' },
      { id: 'o2', label: 'Guadagna 7 €', isCorrect: false, explanation: '7 € è il ricavo lordo, ma ne aveva spesi 4 per comprarla!' },
      { id: 'o3', label: 'Guadagna 11 €', isCorrect: false, explanation: 'Hai sommato spesa e ricavo (4 + 7)! Ma il guadagno è la differenza.' },
    ],
    mascotTip: 'Pico consiglia: Spesa + Guadagno = Ricavo. Quindi Guadagno = Ricavo − Spesa!',
  },

  // ================= PRIMA MEDIA =================
  {
    id: 'game-1m-1',
    gradeId: GradeId.PrimaMedia,
    category: 'dato-superfluo',
    title: 'Sfida tra divisori e multipli',
    storyContext: 'Archi ti sfida a distinguere al volo quando serve il MCD e quando il mcm!',
    prompt: '«Due comete passano vicino alla Terra: una ogni 12 anni e una ogni 18 anni. Se passano insieme nel 2024, tra quanti anni passeranno di nuovo insieme?». Quale operatore logico serve?',
    options: [
      { id: 'o1', label: 'Il mcm(12, 18) = 36 anni (Minimo Comune Multiplo)', isCorrect: true, explanation: 'Brillante! È un evento periodico che si ripete nel futuro e torna a coincidere: serve il minimo comune multiplo (36 anni)!' },
      { id: 'o2', label: 'Il MCD(12, 18) = 6 anni (Massimo Comune Divisore)', isCorrect: false, explanation: 'Il MCD serve per dividere scorte in gruppi uguali, non per eventi periodici futuri!' },
      { id: 'o3', label: 'La somma 12 + 18 = 30 anni', isCorrect: false, explanation: 'Sommare i periodi non trova il momento in cui entrambi i cicli si allineano!' },
    ],
    mascotTip: 'Archi dice: Dividere in parti uguali → MCD; Incontrarsi di nuovo nel tempo → mcm!',
  },
  {
    id: 'game-1m-2',
    gradeId: GradeId.PrimaMedia,
    category: 'operazione-lampo',
    title: 'Il Metodo dei Segmenti Somma-Multiplo',
    storyContext: 'Leo ti mostra la magia delle unità segmentarie!',
    prompt: '«La somma di due segmenti è 40 cm e il segmento A è il triplo del segmento B». In quante parti uguali (unità segmentarie) devi dividere la somma?',
    options: [
      { id: 'o1', label: 'In 4 parti uguali (1u + 3u = 4u)', isCorrect: true, explanation: 'Esatto! Il segmento B vale 1 unità, il segmento A ne vale 3: insieme formano 1 + 3 = 4 unità uguali! 40 : 4 = 10 cm.' },
      { id: 'o2', label: 'In 3 parti uguali', isCorrect: false, explanation: 'Il tranello classico! Dividendo per 3 dimenticheresti il segmento B: le parti totali sono 1 + 3 = 4!' },
      { id: 'o3', label: 'In 2 parti uguali', isCorrect: false, explanation: 'I due segmenti non sono uguali, uno è triplo dell’altro!' },
    ],
    mascotTip: 'Leo ricorda: se uno è il triplo, le unità sono 1 + 3 = 4; se uno è il quadruplo, sono 1 + 4 = 5!',
  },

  // ================= SECONDA MEDIA =================
  {
    id: 'game-2m-1',
    gradeId: GradeId.SecondaMedia,
    category: 'parola-nascosta',
    title: 'La terna di Pitagora',
    storyContext: 'Archi e Maya ti mostrano il Teorema di Pitagora (da 2ª media)!',
    prompt: '«Un triangolo rettangolo ha i cateti di 3 metri e 4 metri». Quanto misura l’ipotenusa (il lato più lungo di fronte all’angolo di 90°)?',
    options: [
      { id: 'o1', label: '5 metri (√(3² + 4²) = √(9 + 16) = √25)', isCorrect: true, explanation: 'Eccellente! È la celebre terna pitagorica 3-4-5: la somma dei quadrati sui cateti fa 9 + 16 = 25, la cui radice è 5!' },
      { id: 'o2', label: '7 metri (3 + 4)', isCorrect: false, explanation: 'I lati obliqui non si sommano direttamente: vale il Teorema di Pitagora con i quadrati!' },
      { id: 'o3', label: '1 metro (4 − 3)', isCorrect: false, explanation: 'L’ipotenusa è il lato PIÙ LUNGO di tutto il triangolo, non può misurare 1 m!' },
    ],
    mascotTip: 'Archi ricorda: il Teorema di Pitagora vale nei triangoli rettangoli: ipotenusa c = √(a² + b²)!',
  },
  {
    id: 'game-2m-2',
    gradeId: GradeId.SecondaMedia,
    category: 'stima-ragionevole',
    title: 'Lo sconto del 20%',
    storyContext: 'Maya calcola al volo le percentuali commerciali.',
    prompt: '«Una felpa costa 50 € e viene applicato uno sconto del 20%». Quanto pagherai alla cassa?',
    options: [
      { id: 'o1', label: '40 € (lo sconto è 10 €, paghi l’80%)', isCorrect: true, explanation: 'Perfetto! Il 20% di 50 € è 10 € (oppure fai 50 × 0,80 = 40 €)!' },
      { id: 'o2', label: '30 €', isCorrect: false, explanation: '30 € corrisponderebbe a uno sconto del 40%, troppo alto!' },
      { id: 'o3', label: '10 €', isCorrect: false, explanation: '10 € è il valore dello SCONTO risparmiato, non il prezzo finale della felpa!' },
    ],
    mascotTip: 'Maya suggerisce: togliere il 20% significa pagare l’80% del prezzo!',
  },

  // ================= TERZA MEDIA =================
  {
    id: 'game-3m-1',
    gradeId: GradeId.TerzaMedia,
    category: 'operazione-lampo',
    title: 'La bilancia algebrica di Maya',
    storyContext: 'Maya l’Analista isola la x con i principi di equivalenza.',
    prompt: '«Nell’equazione 3x + 5 = 26, quale primo passaggio rispetta il 1° principio di equivalenza?»',
    options: [
      { id: 'o1', label: 'Sottrarre 5 a entrambi i piatti: 3x = 26 − 5 = 21', isCorrect: true, explanation: 'Esatto! Sottraendo 5 a entrambi i membri isoliamo il termine con la x (3x = 21), da cui x = 7!' },
      { id: 'o2', label: 'Dividere subito per 3 solo il 26', isCorrect: false, explanation: 'Non puoi dividere solo un pezzo: il 1° principio consiglia prima di togliere il +5!' },
      { id: 'o3', label: 'Sommare 5 a entrambi: 3x = 31', isCorrect: false, explanation: 'Se c’è +5 devi fare l’operazione OPPOSTA (−5) per eliminarlo!' },
    ],
    mascotTip: 'Maya dice: Tratta l’uguale (=) come il perno di una bilancia: ciò che togli a sinistra devi toglierlo anche a destra!',
  },
  {
    id: 'game-3m-2',
    gradeId: GradeId.TerzaMedia,
    category: 'stima-ragionevole',
    title: 'Dislivello con numeri relativi',
    storyContext: 'Archi calcola le temperature estreme sull’Etna.',
    prompt: '«La temperatura minima è stata di −3 °C e la massima di +9 °C». Di quanti gradi è stata l’escursione termica totale?',
    options: [
      { id: 'o1', label: '12 °C ((+9) − (−3) = 9 + 3)', isCorrect: true, explanation: 'Bravissimo! Da −3 °C a 0 °C ci sono 3 gradi, e da 0 °C a +9 °C ce ne sono altri 9: 3 + 9 = 12 °C di escursione!' },
      { id: 'o2', label: '6 °C (9 − 3)', isCorrect: false, explanation: 'Hai fatto 9 − 3 dimenticando che −3 è SOTTOZERO! L’escursione attraversa lo zero.' },
      { id: 'o3', label: '−6 °C', isCorrect: false, explanation: 'L’escursione (differenza tra max e min) è una distanza ed è sempre positiva!' },
    ],
    mascotTip: 'Archi ricorda: sottrarre un numero negativo equivale ad aggiungere il suo opposto: 9 − (−3) = 9 + 3 = 12!',
  },
];

export function getMiniGamesForGrade(gradeId: GradeId): MiniGameItem[] {
  // Ritorna i giochi dedicati a questa classe o delle classi immediatamente vicine
  return MINI_GAMES_BANK.filter(
    (g) => g.gradeId === gradeId
  );
}
