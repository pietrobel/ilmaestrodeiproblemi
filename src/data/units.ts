import { GradeId, type CurriculumUnit } from '../types/math';

export const CURRICULUM_UNITS: CurriculumUnit[] = [
  // ===================== CLASSE QUARTA PRIMARIA =====================
  {
    id: '4p-u1',
    gradeId: GradeId.QuartaPrimaria,
    index: 1,
    title: 'Il senso delle quattro operazioni',
    subtitle: 'Capire quando unire, togliere, ripetere o distribuire in parti uguali',
    keyIdea:
      'Non scegliere mai l’operazione guardando solo una parola isolata: immagina la scena e chiediti se stai cercando il totale oppure una parte.',
    methodSteps: [
      'Leggi tutta la storia come se fosse un breve film e individua chi compie l’azione.',
      'Chiediti: le quantità sono diverse e si uniscono (+), si confrontano/tolgono (−), oppure una stessa quantità si ripete tante volte (×)?',
      'Se conosci già il totale e devi distribuire o raggruppare in parti uguali, usa la divisione (:).',
    ],
    workedExample: {
      problemText:
        'Per la festa della scuola la bidella sistema 96 sedie in file tutte uguali da 8 sedie ciascuna. Quante file riesce a formare?',
      reasoning: [
        'Conosco già il totale delle sedie (96) e quante sedie vanno in ogni fila (8).',
        'Raggruppo il totale in gruppi uguali da 8: eseguo una divisione di contenenza.',
        'Calcolo: 96 : 8 = 12 file.',
      ],
      finalAnswer: '12 file',
    },
    commonTrap:
      'Vedere la parola «ciascuna» e moltiplicare 96 × 8 senza accorgersi che 96 è già il totale delle sedie!',
    visual: {
      kind: 'bar-part-whole',
      caption: 'Totale di 96 sedie diviso in gruppi uguali da 8 sedie',
      values: [8, 8, 8, 8],
      labels: ['Fila 1 (8)', 'Fila 2 (8)', '...', 'Totale: 96 sedie'],
    },
    quickCheck: {
      prompt: 'In biblioteca arrivano 4 scatole con 15 libri ciascuna. Quale operazione trova il totale dei libri?',
      options: ['15 + 4', '15 × 4', '15 : 4', '15 − 4'],
      correctIndex: 1,
      explanation: 'La stessa quantità (15 libri) si ripete per 4 scatole uguali, quindi si usa la moltiplicazione: 15 × 4 = 60.',
    },
  },
  {
    id: '4p-u2',
    gradeId: GradeId.QuartaPrimaria,
    index: 2,
    title: 'Dati utili, superflui e nascosti',
    subtitle: 'Selezionare solo le informazioni che servono davvero',
    keyIdea:
      'Un buon solutore legge con la lente d’ingrandimento: scarta i numeri decorativi e trasforma in numero le parole-quantità.',
    methodSteps: [
      'Parti sempre dalla domanda finale: che cosa ti viene chiesto esattamente?',
      'Controlla ogni numero del testo: se cambi quel numero, cambia la risposta? Se no, è un dato superfluo.',
      'Cerca parole come «coppia» (2), «settimana» (7), «dozzina» (12), «doppio» (× 2): sono dati nascosti!',
    ],
    workedExample: {
      problemText:
        'Alle ore 16:00 Luca compra in cartoleria una dozzina di pennarelli e 6 matite colorate. Quanti strumenti da disegno ha comprato in tutto?',
      reasoning: [
        'L’orario «16:00» non cambia il numero di oggetti comprati: è un dato superfluo.',
        'La parola «dozzina» è un dato nascosto che vale 12 pennarelli.',
        'Unisco pennarelli e matite: 12 + 6 = 18 strumenti.',
      ],
      finalAnswer: '18 strumenti',
    },
    commonTrap:
      'Sommare tutti i numeri presenti nel testo (16 + 6) ignorando la parola «dozzina» e usando l’orario.',
    visual: {
      kind: 'bar-part-whole',
      caption: 'Una dozzina (12) + 6 matite = 18 strumenti (orario 16:00 scartato)',
      values: [12, 6],
      labels: ['Una dozzina (12)', '6 matite'],
    },
    quickCheck: {
      prompt: '«La classe 4ª B è composta da 22 alunni. Oggi 3 sono assenti e si legge a pagina 48». Qual è il dato superfluo per sapere quanti alunni sono presenti?',
      options: ['22 alunni', '3 assenti', 'Pagina 48', 'Nessuno'],
      correctIndex: 2,
      explanation: 'Il numero della pagina (48) non c’entra con il conteggio dei presenti (22 − 3 = 19).',
    },
  },
  {
    id: '4p-u3',
    gradeId: GradeId.QuartaPrimaria,
    index: 3,
    title: 'La domanda intermedia nei problemi a due operazioni',
    subtitle: 'Costruire il ponte tra i dati iniziali e la risposta finale',
    keyIdea:
      'Quando non puoi rispondere subito alla domanda finale, chiediti: «Quale informazione mi manca per fare l’ultimo calcolo?».',
    methodSteps: [
      'Leggi la domanda finale e individua quale dato ti manca per rispondere subito.',
      'Formula a voce o per iscritto la domanda intermedia (la «domanda nascosta»).',
      'Esegui la prima operazione, scrivi accanto al risultato che cosa rappresenta e usalo nella seconda operazione.',
    ],
    workedExample: {
      problemText:
        'Un fioraio ha 85 tulipani. Ne vende 25 al mattino e sistema quelli rimasti in 5 vasi uguali. Quanti tulipani mette in ogni vaso?',
      reasoning: [
        'Domanda intermedia: quanti tulipani restano dopo la vendita del mattino?',
        'Primo calcolo: 85 − 25 = 60 tulipani rimasti.',
        'Secondo calcolo: divido i 60 tulipani rimasti nei 5 vasi → 60 : 5 = 12 tulipani.',
      ],
      finalAnswer: '12 tulipani per vaso',
    },
    commonTrap:
      'Dividere subito 85 : 5 dimenticando di togliere prima i 25 tulipani già venduti.',
    visual: {
      kind: 'bar-comparison',
      caption: 'Da 85 togliamo 25: i 60 rimasti si dividono in 5 parti uguali',
      values: [60, 25],
      labels: ['60 rimasti (divisi in 5 vasi da 12)', '25 venduti'],
    },
    quickCheck: {
      prompt: 'Marta compra 3 quaderni da 2 € l’uno e paga con una banconota da 10 €. Qual è la domanda intermedia?',
      options: [
        'Quanti quaderni le restano?',
        'Quanto spende in tutto per i 3 quaderni?',
        'Quanto costa una penna?',
        'Quante banconote ha nel portafoglio?',
      ],
      correctIndex: 1,
      explanation: 'Prima di calcolare il resto da 10 €, bisogna sapere quanto spende in totale: 3 × 2 = 6 €.',
    },
  },
  {
    id: '4p-u4',
    gradeId: GradeId.QuartaPrimaria,
    index: 4,
    title: 'Denaro, tempo e misure nella vita quotidiana',
    subtitle: 'Gestire euro, resti, orari, minuti e grandezze concrete',
    keyIdea:
      'Attenzione al cambio: i soldi e i metri seguono la base 100 (1 € = 100 cent, 1 m = 100 cm), mentre le ore seguono la base 60 (1 ora = 60 minuti)!',
    methodSteps: [
      'Controlla che tutti i valori abbiano la stessa unità (non sommare euro interi e centesimi senza virgola!).',
      'Nei problemi sul tempo, ragiona a tappe sull’orologio: raggiungi prima l’ora intera successiva.',
      'Verifica sempre se il risultato ha senso nella realtà (il resto non può superare la banconota usata!).',
    ],
    workedExample: {
      problemText:
        'Un film d’animazione inizia alle 16:40 e dura 1 ora e 35 minuti. A che ora finisce? Quanti minuti dura in tutto?',
      reasoning: [
        '1 ora = 60 minuti, quindi la durata totale in minuti è 60 + 35 = 95 minuti.',
        'Dalle 16:40 aggiungo 1 ora → 17:40; aggiungo 20 minuti → 18:00; aggiungo gli ultimi 15 minuti → 18:15.',
      ],
      finalAnswer: '95 minuti (finisce alle 18:15)',
    },
    commonTrap:
      'Scrivere che 1 ora e 35 minuti equivalgono a 135 minuti (confondendo 1 ora = 60 min con 100 min!).',
    visual: {
      kind: 'bar-part-whole',
      caption: '1 ora (60 min) + 35 min = 95 minuti totali',
      values: [60, 35],
      labels: ['1 ora = 60 min', '35 min'],
    },
    quickCheck: {
      prompt: 'Un panino costa 2,50 € e una spremuta 1,50 €. Pago con 5 €. Quanto ricevo di resto?',
      options: ['1 €', '2 €', '1,50 €', '4 €'],
      correctIndex: 0,
      explanation: 'Spesa totale: 2,50 + 1,50 = 4,00 €. Resto: 5,00 − 4,00 = 1 €.',
    },
  },
  {
    id: '4p-u5',
    gradeId: GradeId.QuartaPrimaria,
    index: 5,
    title: 'Schemi a barre e problemi di confronto',
    subtitle: 'Disegnare «di più», «di meno» e parti uguali per vedere la soluzione',
    keyIdea:
      'Disegnare due barre allineate a sinistra rende visibile la differenza tra due quantità e impedisce di sbagliare segno.',
    methodSteps: [
      'Disegna una barra per ogni protagonista del problema partendo dalla stessa linea verticale.',
      'Segna con un tratteggio il pezzo in più (la differenza) tra la barra lunga e quella corta.',
      'Controlla chi ha di più e chi ha di meno prima di scegliere se sommare o sottrarre.',
    ],
    workedExample: {
      problemText:
        'Nel cestino rosso ci sono 34 mele. Nel cestino rosso ci sono 8 mele in più rispetto al cestino verde. Quante mele ci sono nei due cestini insieme?',
      reasoning: [
        'Attenzione alla lingua! Se il rosso ne ha 8 IN PIÙ del verde, allora il verde ne ha 8 IN MENO del rosso!',
        'Mele nel cestino verde: 34 − 8 = 26 mele.',
        'Totale nei due cestini: 34 + 26 = 60 mele.',
      ],
      finalAnswer: '60 mele',
    },
    commonTrap:
      'Leggere «8 in più» e fare subito 34 + 8 = 42, senza notare che 34 è già il cestino più grande!',
    visual: {
      kind: 'bar-comparison',
      caption: 'Cestino rosso (34) ha 8 mele in più del verde (26)',
      values: [34, 26],
      labels: ['Cestino rosso: 34', 'Cestino verde: 34 − 8 = 26'],
    },
    quickCheck: {
      prompt: 'Leo ha 18 figurine, cioè 5 in più di Tommaso. Quante figurine ha Tommaso?',
      options: ['23 figurine', '13 figurine', '90 figurine', '5 figurine'],
      correctIndex: 1,
      explanation: 'Se Leo ne ha 5 in più di Tommaso, Tommaso ne ha 5 in meno di Leo: 18 − 5 = 13.',
    },
  },

  // ===================== CLASSE QUINTA PRIMARIA =====================
  {
    id: '5p-u1',
    gradeId: GradeId.QuintaPrimaria,
    index: 1,
    title: 'Catene di operazioni ed espressioni aritmetiche',
    subtitle: 'Riassumere tutti i passaggi di un problema in un’unica scrittura ordinata',
    keyIdea:
      'Le parentesi e le precedenze (prima × e :, poi + e −) raccontano la storia del problema senza ambiguità.',
    methodSteps: [
      'Scomponi il problema nei suoi blocchi logici (es. spesa per gli adulti + spesa per i bambini).',
      'Ricorda le precedenze: moltiplicazioni e divisioni si eseguono prima di addizioni e sottrazioni.',
      'Usa le parentesi tonde quando una somma o una differenza deve essere calcolata prima di moltiplicare o dividere.',
    ],
    workedExample: {
      problemText:
        'Elena ha 50 €. Compra 3 libri da 9 € ciascuno e 4 quaderni da 2,50 € ciascuno. Quanto le rimane?',
      reasoning: [
        'Spesa libri: 3 × 9 = 27 €. Spesa quaderni: 4 × 2,50 = 10 €.',
        'L’espressione completa è: 50 − (3 × 9 + 4 × 2,50).',
        'Risolvo: 50 − (27 + 10) = 50 − 37 = 13 €.',
      ],
      finalAnswer: '13 €',
    },
    commonTrap:
      'Eseguire i calcoli da sinistra a destra senza rispettare la precedenza delle moltiplicazioni.',
    visual: {
      kind: 'bar-part-whole',
      caption: 'Budget 50 € = Libri (27 €) + Quaderni (10 €) + Resto (13 €)',
      values: [27, 10, 13],
      labels: ['Libri (27 €)', 'Quaderni (10 €)', 'Resto (13 €)'],
    },
    quickCheck: {
      prompt: 'Quale espressione calcola il costo di 5 confezioni composte ciascuna da un panino (3 €) e un succo (2 €)?',
      options: ['5 × 3 + 2', '5 × (3 + 2)', '(5 + 3) × 2', '5 + 3 × 2'],
      correctIndex: 1,
      explanation: 'Prima sommo il valore di una confezione (3 + 2 = 5 €) usando le parentesi, poi moltiplico per 5: 5 × (3 + 2) = 25 €.',
    },
  },
  {
    id: '5p-u2',
    gradeId: GradeId.QuintaPrimaria,
    index: 2,
    title: 'Frazioni e numeri decimali nella realtà',
    subtitle: 'Calcolare una parte dell’intero e la frazione complementare',
    keyIdea:
      'Il denominatore indica in quante parti uguali dividi il tutto; il numeratore indica quante di quelle parti consideri.',
    methodSteps: [
      'Disegna una barra divisa in tante caselle uguali quante ne indica il denominatore.',
      'Trova il valore di UNA sola parte (l’unità frazionaria) dividendo il totale per il denominatore.',
      'Se il problema chiede «quanto resta», puoi usare subito la frazione complementare!',
    ],
    workedExample: {
      problemText:
        'Un percorso ciclabile è lungo 45 km. Matteo ne ha già percorsi i 3/5. Quanti chilometri gli restano da percorrere?',
      reasoning: [
        'Valore di 1/5 del percorso: 45 : 5 = 9 km.',
        'Tratto già percorso (3/5): 9 × 3 = 27 km.',
        'Tratto rimanente (2/5 complementare): 45 − 27 = 18 km (oppure 9 × 2 = 18 km).',
      ],
      finalAnswer: '18 km',
    },
    commonTrap:
      'Fermarsi a 27 km (che è la parte già percorsa!) senza leggere che la domanda chiede quanti km RESTANO.',
    visual: {
      kind: 'fraction-grid',
      caption: 'Intero = 45 km diviso in 5 quinti da 9 km: 3/5 fatti (27 km) e 2/5 restanti (18 km)',
      values: [3, 5, 45],
      labels: ['Percorsi: 3/5 (27 km)', 'Restanti: 2/5 (18 km)'],
    },
    quickCheck: {
      prompt: 'In una scatola da 24 cioccolatini, i 3/8 sono fondenti. Quanti sono i cioccolatini fondenti?',
      options: ['8 cioccolatini', '9 cioccolatini', '15 cioccolatini', '64 cioccolatini'],
      correctIndex: 1,
      explanation: 'Divido l’intero in 8 parti uguali (24 : 8 = 3) e ne prendo 3: 3 × 3 = 9 cioccolatini fondenti.',
    },
  },
  {
    id: '5p-u3',
    gradeId: GradeId.QuintaPrimaria,
    index: 3,
    title: 'Compravendita, costo unitario e peso netto',
    subtitle: 'Capire gli scambi commerciali: spesa, ricavo, guadagno e perdita',
    keyIdea:
      'Distingui sempre se la relazione riguarda UN singolo pezzo (unitario) oppure TUTTA la merce (totale)!',
    methodSteps: [
      'Ricorda il triangolo della compravendita: Spesa + Guadagno = Ricavo (se il ricavo è minore della spesa, c’è Perdita).',
      'Passa dal valore unitario al valore totale moltiplicando per il numero di pezzi (o dividendo per fare l’inverso).',
      'Per i contenitori: Peso Lordo = Peso Netto + Tara.',
    ],
    workedExample: {
      problemText:
        'Un cartolaio acquista 20 astucci spendendo in tutto 90 € (spesa totale). Li rivende tutti a 6,50 € ciascuno. Qual è il suo guadagno totale?',
      reasoning: [
        'La spesa è già totale (90 €), mentre il prezzo di vendita (6,50 €) è unitario.',
        'Calcolo il ricavo totale: 20 × 6,50 = 130 €.',
        'Calcolo il guadagno totale: Ricavo − Spesa = 130 − 90 = 40 €.',
      ],
      finalAnswer: '40 €',
    },
    commonTrap:
      'Sottrarre 90 − 6,50 mescolando una spesa TOTALE con un ricavo UNITARIO!',
    visual: {
      kind: 'bar-part-whole',
      caption: 'Ricavo totale (130 €) = Spesa totale (90 €) + Guadagno totale (40 €)',
      values: [90, 40],
      labels: ['Spesa: 90 €', 'Guadagno: 40 €'],
    },
    quickCheck: {
      prompt: 'Una cassetta vuota (tara) pesa 0,8 kg. Piena di fragole (peso lordo) pesa 6,2 kg. Quanto pesano solo le fragole?',
      options: ['7,0 kg', '5,4 kg', '4,96 kg', '6,8 kg'],
      correctIndex: 1,
      explanation: 'Peso Netto = Peso Lordo − Tara = 6,2 − 0,8 = 5,4 kg.',
    },
  },
  {
    id: '5p-u4',
    gradeId: GradeId.QuintaPrimaria,
    index: 4,
    title: 'Misure ed equivalenze nei problemi',
    subtitle: 'Portare tutte le grandezze alla stessa unità prima di calcolare',
    keyIdea:
      'Non si possono sommare, sottrarre o dividere numeri espressi in unità di misura diverse: l’equivalenza è sempre il passo zero.',
    methodSteps: [
      'Sottolinea tutte le unità di misura nel testo e nella domanda finale (m, cm, kg, g, l, ml).',
      'Trasforma subito i dati nell’unità richiesta dalla domanda finale.',
      'Controlla i salti sulla scala metrica: ogni gradino vale ×10 o :10 (per le aree ×100 o :100!).',
    ],
    workedExample: {
      problemText:
        'Da una caraffa che contiene 1,8 litri di limonata si riempiono 6 bicchieri da 250 ml ciascuno. Quanti millilitri di limonata restano nella caraffa?',
      reasoning: [
        'La domanda chiede millilitri: trasformo subito 1,8 litri → 1800 ml.',
        'Limonata versata nei 6 bicchieri: 6 × 250 = 1500 ml.',
        'Limonata rimasta: 1800 − 1500 = 300 ml.',
      ],
      finalAnswer: '300 ml',
    },
    commonTrap:
      'Provare a calcolare con 1,8 e 250 senza convertire prima i litri in millilitri (1 l = 1000 ml).',
    visual: {
      kind: 'bar-part-whole',
      caption: '1,8 l = 1800 ml totali → 1500 ml versati + 300 ml rimasti',
      values: [1500, 300],
      labels: ['6 × 250 ml = 1500 ml', '300 ml rimasti'],
    },
    quickCheck: {
      prompt: 'Un nastro lungo 3 m viene tagliato in pezzi da 50 cm. Quanti pezzi si ottengono?',
      options: ['6 pezzi', '60 pezzi', '15 pezzi', '150 pezzi'],
      correctIndex: 0,
      explanation: 'Trasformo 3 m in 300 cm, poi divido per la lunghezza di ciascun pezzo: 300 : 50 = 6 pezzi.',
    },
  },
  {
    id: '5p-u5',
    gradeId: GradeId.QuintaPrimaria,
    index: 5,
    title: 'Perimetro e area delle figure piane',
    subtitle: 'Distinguere contorno e superficie nei problemi reali',
    keyIdea:
      'Se recinti, bordi o incornici calcoli il PERIMETRO; se pavimentati, vernici o semini un prato calcoli l’AREA.',
    methodSteps: [
      'Fai sempre uno schizzo quotato della figura scrivendo le misure sui lati e sull’altezza.',
      'Chiediti se l’azione riguarda il bordo lineare (m) o l’estensione interna (m²).',
      'Per il triangolo e il rombo non dimenticare mai il «diviso 2» nella formula dell’area!',
    ],
    workedExample: {
      problemText:
        'Un cortile rettangolare ha la base di 14 m e l’altezza di 9 m. Si vuole seminare prato inglese che costa 5 € al metro quadrato. Quanto si spende?',
      reasoning: [
        'Seminare il prato copre tutta la superficie interna → devo calcolare l’AREA, non il perimetro.',
        'Area del rettangolo: A = b × h = 14 × 9 = 126 m².',
        'Costo totale: 126 × 5 = 630 €.',
      ],
      finalAnswer: '630 €',
    },
    commonTrap:
      'Calcolare il perimetro (14 + 9) × 2 = 46 m al posto dell’area quando il problema parla di coprire una superficie.',
    visual: {
      kind: 'geometry-rect',
      caption: 'Rettangolo 14 m × 9 m: Area = 126 m², Perimetro = 46 m',
      values: [14, 9],
      labels: ['Base = 14 m', 'Altezza = 9 m'],
    },
    quickCheck: {
      prompt: 'Un’aiuola triangolare ha base 8 m e altezza 5 m. Qual è la sua area?',
      options: ['40 m²', '20 m²', '13 m²', '26 m²'],
      correctIndex: 1,
      explanation: 'L’area del triangolo è metà del rettangolo corrispondente: (8 × 5) : 2 = 40 : 2 = 20 m².',
    },
  },

  // ===================== CLASSE PRIMA MEDIA =====================
  {
    id: '1m-u1',
    gradeId: GradeId.PrimaMedia,
    index: 1,
    title: 'Espressioni, decimali e potenze nei problemi',
    subtitle: 'Modellizzare problemi articolati e crescite moltiplicative',
    keyIdea:
      'Quando una quantità si moltiplica ripetutamente per lo stesso fattore a ogni livello, entra in gioco una potenza!',
    methodSteps: [
      'Individua se la situazione è additiva, moltiplicativa o esponenziale (es. 4 scaffali × 4 scatole × 4 barattoli = 4³).',
      'Imposta l’espressione rispettando l’ordine: potenze → moltiplicazioni/divisioni → addizioni/sottrazioni.',
      'Risolvi dall’interno delle parentesi tonde verso le quadre e le graffe.',
    ],
    workedExample: {
      problemText:
        'Un magazzino ha 3 armadi; ogni armadio ha 3 ripiani; su ogni ripiano ci sono 3 scatole con 3 lampadine ciascuna. Se 11 lampadine sono fulminate, quante sono funzionanti?',
      reasoning: [
        'Il fattore 3 si ripete 4 volte: totale lampadine = 3⁴ = 81.',
        'Espressione risolutiva: 3⁴ − 11.',
        'Calcolo: 81 − 11 = 70 lampadine funzionanti.',
      ],
      finalAnswer: '70 lampadine',
    },
    commonTrap:
      'Confondere la potenza 3⁴ = 81 con il prodotto 3 × 4 = 12!',
    visual: {
      kind: 'bar-part-whole',
      caption: 'Totale 3⁴ = 81 lampadine → 70 funzionanti + 11 fulminate',
      values: [70, 11],
      labels: ['70 funzionanti', '11 fulminate'],
    },
    quickCheck: {
      prompt: 'Un messaggio viene inviato a 5 amici; ciascuno lo inoltra ad altri 5 nuovi amici, e ciascuno di questi a 5 nuovi amici. Quante persone lo ricevono nell’ultimo passaggio?',
      options: ['15 persone', '25 persone', '125 persone', '75 persone'],
      correctIndex: 2,
      explanation: 'Ad ogni passaggio il numero si moltiplica per 5: 5 × 5 × 5 = 5³ = 125 persone.',
    },
  },
  {
    id: '1m-u2',
    gradeId: GradeId.PrimaMedia,
    index: 2,
    title: 'Problemi con MCD e mcm',
    subtitle: 'Distinguere senza dubbi tra suddivisione massima e coincidenza nel tempo',
    keyIdea:
      'Usa il MCD quando devi DIVIDERE scorte in gruppi uguali più numerosi possibile; usa il mcm quando cicli diversi devono INCONTRARSI di nuovo insieme.',
    methodSteps: [
      'Chiediti: sto spezzando quantità grandi in pacchetti/pezzi più piccoli uguali? → Calcola il MCD.',
      'Chiediti: sto ripetendo intervalli di tempo/passi per trovare il primo incontro futuro? → Calcola il mcm.',
      'Nei problemi col MCD, attenzione alla domanda finale: chiede QUANTI gruppi (il MCD) o QUANTI oggetti in ciascun gruppo (totale : MCD)?',
    ],
    workedExample: {
      problemText:
        'Una volontaria prepara kit scuola identici usando tutte le 48 penne blu e i 36 quaderni disponibili, nel maggior numero possibile di kit. Quanti kit prepara e quante penne contiene ogni kit?',
      reasoning: [
        'Scompongo: 48 = 2⁴ × 3 e 36 = 2² × 3². Voglio il massimo numero di kit uguali → MCD(48, 36) = 2² × 3 = 12 kit.',
        'Penne in ogni kit: 48 : 12 = 4 penne (e 36 : 12 = 3 quaderni).',
      ],
      finalAnswer: '12 kit (con 4 penne ciascuno)',
    },
    commonTrap:
      'Calcolare il mcm(48, 36) = 144 invece del MCD quando si stanno dividendo oggetti in confezioni!',
    visual: {
      kind: 'bar-part-whole',
      caption: 'MCD(48, 36) = 12 kit identici, ciascuno con 4 penne e 3 quaderni',
      values: [4, 3],
      labels: ['4 penne per kit (48 : 12)', '3 quaderni per kit (36 : 12)'],
    },
    quickCheck: {
      prompt: 'Due fari lampeggiano uno ogni 8 secondi e l’altro ogni 12 secondi. Se lampeggiano insieme ora, tra quanti secondi lampeggeranno di nuovo insieme?',
      options: ['4 secondi', '20 secondi', '24 secondi', '96 secondi'],
      correctIndex: 2,
      explanation: 'È un problema di periodicità futura → mcm(8, 12) = 24 secondi.',
    },
  },
  {
    id: '1m-u3',
    gradeId: GradeId.PrimaMedia,
    index: 3,
    title: 'Il metodo grafico dei segmenti',
    subtitle: 'Risolvere problemi di somma-differenza, somma-multiplo e differenza-multiplo',
    keyIdea:
      'Rappresentando le grandezze con segmenti formati da unità uguali, qualunque relazione diventa visibile a colpo d’occhio.',
    methodSteps: [
      'Caso Somma + Differenza: togli la differenza dalla somma (S − D) per ottenere due segmenti uguali, poi dividi per 2.',
      'Caso Somma + Multiplo (es. uno è il triplo dell’altro): conta TUTTE le unità segmentarie (1 + 3 = 4 unità) e dividi la somma per 4.',
      'Caso Differenza + Multiplo (es. uno è il quadruplo dell’altro): la differenza vale (4 − 1) = 3 unità!',
    ],
    workedExample: {
      problemText:
        'La somma di due segmenti misura 68 cm e la loro differenza è 14 cm. Quanto misura il segmento maggiore?',
      reasoning: [
        'Tolgo la differenza dalla somma per pareggiare i due segmenti: 68 − 14 = 54 cm.',
        'Divido per 2 e trovo il segmento minore: 54 : 2 = 27 cm.',
        'Aggiungo la differenza e trovo il segmento maggiore: 27 + 14 = 41 cm (verifica: 27 + 41 = 68).',
      ],
      finalAnswer: '41 cm',
    },
    commonTrap:
      'Nei problemi somma-multiplo (es. «uno è il triplo dell’altro, somma 40»), dividere per 3 invece che per 4 (1 + 3 = 4 parti totali)!',
    visual: {
      kind: 'segments-sum-diff',
      caption: 'Somma = 68 cm, Differenza = 14 cm → Minore = 27 cm, Maggiore = 41 cm',
      values: [27, 41, 14],
      labels: ['Minore (27 cm)', 'Maggiore (27 + 14 = 41 cm)'],
    },
    quickCheck: {
      prompt: 'Luca e sua sorella hanno in tutto 45 anni, e l’età della sorella è il doppio di quella di Luca. Quanti anni ha Luca?',
      options: ['22,5 anni', '15 anni', '30 anni', '9 anni'],
      correctIndex: 1,
      explanation: 'Luca = 1 unità, Sorella = 2 unità → insieme formano 3 unità uguali: 45 : 3 = 15 anni.',
    },
  },
  {
    id: '1m-u4',
    gradeId: GradeId.PrimaMedia,
    index: 4,
    title: 'Problemi diretti e inversi con le frazioni',
    subtitle: 'Distinguere quando conosci l’intero e quando conosci una parte',
    keyIdea:
      'Chiediti subito: il numero dato nel testo rappresenta TUTTO l’intero (problema diretto) o solo UNA PARTE frazionaria (problema inverso)?',
    methodSteps: [
      'Problema diretto (conosci l’intero N, cerchi i m/n): calcola (N : n) × m.',
      'Problema inverso (sai che i m/n valgono P, cerchi l’intero): trova prima 1/n facendo P : m, poi moltiplica per n.',
      'Disegna sempre i quadratini dell’unità frazionaria per non invertire numeratore e denominatore!',
    ],
    workedExample: {
      problemText:
        'Giulia ha letto 60 pagine di un romanzo, che corrispondono ai 3/5 dell’intero libro. Quante pagine ha in tutto il romanzo?',
      reasoning: [
        '60 pagine NON sono tutto il libro, ma corrispondono a 3 quinti (3 parti uguali).',
        'Valore di 1 quinto (1/5): 60 : 3 = 20 pagine.',
        'Intero libro (5/5): 20 × 5 = 100 pagine.',
      ],
      finalAnswer: '100 pagine',
    },
    commonTrap:
      'Calcolare (60 : 5) × 3 = 36 pagine come se 60 fosse l’intero libro (ottenendo un libro più corto delle pagine già lette!).',
    visual: {
      kind: 'fraction-grid',
      caption: '3 parti valgono 60 pagine (20 ciascuna) → 5 parti valgono 100 pagine',
      values: [3, 5, 100],
      labels: ['3/5 letti = 60 pag.', 'Intero 5/5 = 100 pag.'],
    },
    quickCheck: {
      prompt: 'I 2/7 dei partecipanti a una gara sono 18 ragazzi. Quanti sono tutti i partecipanti?',
      options: ['63 partecipanti', '5 partecipanti', '36 partecipanti', '126 partecipanti'],
      correctIndex: 0,
      explanation: 'Se 2 settimi valgono 18, allora 1 settimo vale 18 : 2 = 9; l’intero (7/7) vale 9 × 7 = 63.',
    },
  },
  {
    id: '1m-u5',
    gradeId: GradeId.PrimaMedia,
    index: 5,
    title: 'Sistema metrico decimale, angoli e perimetri',
    subtitle: 'Equivalenze rigorose e relazioni geometriche fondamentali',
    keyIdea:
      'In geometria molti dati sono «nascosti» nei nomi delle figure: isoscele significa due lati congruenti, supplementari significa somma 180°.',
    methodSteps: [
      'Converti tutte le lunghezze nella stessa unità di misura richiesta.',
      'Traduci i termini geometrici in numeri: complementari = 90°, supplementari = 180°, somma angoli interni triangolo = 180°.',
      'Applica il metodo dei segmenti ai lati dei poligoni o alle ampiezze degli angoli!',
    ],
    workedExample: {
      problemText:
        'Due angoli sono supplementari e uno supera l’altro di 28°. Quanto misura ciascuno dei due angoli?',
      reasoning: [
        'Dato nascosto geometrico: «supplementari» significa che la loro somma è 180°.',
        'Applico Somma-Differenza con S = 180° e D = 28°: angolo minore = (180 − 28) : 2 = 152 : 2 = 76°.',
        'Angolo maggiore = 76 + 28 = 104°.',
      ],
      finalAnswer: '76° e 104°',
    },
    commonTrap:
      'Confondere angoli supplementari (somma 180°) con angoli complementari (somma 90°).',
    visual: {
      kind: 'segments-sum-diff',
      caption: 'Somma = 180° (supplementari), Differenza = 28° → 76° e 104°',
      values: [76, 104, 28],
      labels: ['Angolo α = 76°', 'Angolo β = 104°'],
    },
    quickCheck: {
      prompt: 'In un triangolo due angoli interni misurano 45° e 65°. Quanto misura il terzo angolo?',
      options: ['70°', '80°', '110°', '250°'],
      correctIndex: 0,
      explanation: 'La somma degli angoli interni di qualsiasi triangolo è sempre 180°: 180° − (45° + 65°) = 180° − 110° = 70°.',
    },
  },

  // ===================== CLASSE SECONDA MEDIA =====================
  {
    id: '2m-u1',
    gradeId: GradeId.SecondaMedia,
    index: 1,
    title: 'Frazioni residue e problemi razionali complessi',
    subtitle: 'Gestire frazioni di una parte rimanente passo dopo passo',
    keyIdea:
      'Attenzione alla frase «del rimanente»: una frazione calcolata sul resto va moltiplicata per la frazione residua precedente!',
    methodSteps: [
      'Dopo la prima tappa di frazione a/b, calcola subito il primo resto: 1 − a/b.',
      'Se la seconda tappa riguarda «i c/d del rimanente», moltiplica (c/d) × (1 − a/b) per riferirla all’intero.',
      'Trova la frazione finale residua e collegala al valore numerico noto.',
    ],
    workedExample: {
      problemText:
        'Un escursionista percorre al mattino 1/3 del sentiero e nel pomeriggio i 3/4 della parte rimanente. Gli restano ancora 4 km. Quanto è lungo tutto il sentiero?',
      reasoning: [
        'Dopo il mattino (1/3) restano i 2/3 del sentiero.',
        'Nel pomeriggio percorre i 3/4 di 2/3 = (3/4) × (2/3) = 1/2 dell’intero sentiero.',
        'Frazione già percorsa: 1/3 + 1/2 = 5/6. Quindi i 4 km finali corrispondono a 1/6 → Intero = 4 × 6 = 24 km!',
      ],
      finalAnswer: '24 km',
    },
    commonTrap:
      'Sommare direttamente 1/3 + 3/4 = 13/12 (più dell’intero!) dimenticando che 3/4 è riferito solo alla parte rimanente.',
    visual: {
      kind: 'fraction-grid',
      caption: 'Mattino 2/6 + Pomeriggio 3/6 + Resto 1/6 (4 km) = 6/6 (24 km)',
      values: [5, 6, 24],
      labels: ['Percorso: 5/6 (20 km)', 'Resto: 1/6 (4 km)'],
    },
    quickCheck: {
      prompt: 'Spendo 1/4 dei miei risparmi e poi la metà di ciò che mi era rimasto. Quale frazione del totale iniziale mi resta alla fine?',
      options: ['1/4', '3/8', '1/8', '1/2'],
      correctIndex: 1,
      explanation: 'Dopo 1/4 mi restano i 3/4; spendendo la metà di 3/4 (cioè 3/8), mi resta l’altra metà di 3/4, ovvero 3/8.',
    },
  },
  {
    id: '2m-u2',
    gradeId: GradeId.SecondaMedia,
    index: 2,
    title: 'Rapporti, scale e proporzioni (dirette e inverse)',
    subtitle: 'Distinguere proporzionalità diretta (y/x = k) e inversa (x · y = k)',
    keyIdea:
      'Prima di scrivere la proporzione, chiediti: «Se la prima grandezza raddoppia, l’altra raddoppia (diretta) oppure dimezza (inversa)?».',
    methodSteps: [
      'Costruisci una tabellina a due colonne con unità di misura chiare e frecce di variazione.',
      'Proporzionalità DIRETTA (es. kg di farina e focacce): frecce nello stesso verso → x₁ : x₂ = y₁ : y₂.',
      'Proporzionalità INVERSA (es. numero di rubinetti e tempo di riempimento): frecce opposte → x₁ : x₂ = y₂ : y₁ (oppure x₁ · y₁ = x₂ · y₂).',
    ],
    workedExample: {
      problemText:
        'Per imbiancare una scuola 6 pittori lavorando allo stesso ritmo impiegano 10 giorni. Quanti giorni impiegherebbero 15 pittori?',
      reasoning: [
        'Più pittori lavorano, MENO giorni servono → grandezze INVERSAMENTE proporzionali!',
        'Il prodotto «giornate-uomo» è costante: 6 × 10 = 60 giornate di lavoro.',
        'Con 15 pittori: x = 60 : 15 = 4 giorni.',
      ],
      finalAnswer: '4 giorni',
    },
    commonTrap:
      'Impostare una proporzione diretta 6 : 15 = 10 : x ottenendo 25 giorni (più pittori ci metterebbero più tempo: assurdo!).',
    visual: {
      kind: 'bar-comparison',
      caption: 'Prodotto costante: 6 pittori × 10 giorni = 15 pittori × 4 giorni = 60',
      values: [10, 4],
      labels: ['6 pittori → 10 giorni', '15 pittori → 4 giorni'],
    },
    quickCheck: {
      prompt: 'Su una carta geografica in scala 1 : 200 000 due città distano 3,5 cm. Qual è la loro distanza reale in km?',
      options: ['7 km', '70 km', '0,7 km', '35 km'],
      correctIndex: 0,
      explanation: '3,5 × 200 000 = 700 000 cm. Eseguendo l’equivalenza da cm a km (: 100 000) si ottengono 7 km.',
    },
  },
  {
    id: '2m-u3',
    gradeId: GradeId.SecondaMedia,
    index: 3,
    title: 'Percentuali, sconti e variazioni successive',
    subtitle: 'Padroneggiare aumenti, ribassi, IVA e percentuali inverse',
    keyIdea:
      'Una percentuale è un rapporto con denominatore 100: uno sconto del 20% significa pagare subito l’80% del prezzo iniziale.',
    methodSteps: [
      'Imposta la proporzione fondamentale: Parte : Totale = tasso : 100.',
      'Se cerchi il prezzo scontato del p%, puoi moltiplicare il prezzo iniziale per (100 − p) / 100.',
      'Se conosci il prezzo GIÀ scontato e cerchi il prezzo originario, usa (100 − p) come tasso nella proporzione!',
    ],
    workedExample: {
      problemText:
        'Una giacca viene venduta in saldo a 68 € dopo uno sconto del 15%. Qual era il prezzo di listino prima dei saldi?',
      reasoning: [
        '68 € NON è il 100%, ma corrisponde a 100% − 15% = 85% del prezzo originario!',
        'Proporzione: 68 : x = 85 : 100.',
        'Calcolo: x = (68 × 100) : 85 = 6800 : 85 = 80 €.',
      ],
      finalAnswer: '80 €',
    },
    commonTrap:
      'Calcolare il 15% di 68 € e sommarlo a 68 € (ottenendo 78,20 €): lo sconto era stato calcolato sul prezzo iniziale, non su 68 €!',
    visual: {
      kind: 'fraction-grid',
      caption: 'Prezzo pagato (85% = 68 €) + Sconto (15% = 12 €) = Listino 100% (80 €)',
      values: [85, 100, 80],
      labels: ['Pagato 85% (68 €)', 'Listino 100% (80 €)'],
    },
    quickCheck: {
      prompt: 'Uno zaino costa 60 €. Viene scontato del 25%. Qual è il prezzo finale scontato?',
      options: ['15 €', '45 €', '35 €', '48 €'],
      correctIndex: 1,
      explanation: 'Lo sconto è il 25% (1/4) di 60 €, cioè 15 €. Il prezzo finale è 60 − 15 = 45 €.',
    },
  },
  {
    id: '2m-u4',
    gradeId: GradeId.SecondaMedia,
    index: 4,
    title: 'Formule inverse dell’area e figure equivalenti',
    subtitle: 'Passare da una figura piana a un’altra con la stessa estensione',
    keyIdea:
      'Due poligoni equivalenti condividono la stessa area: calcola l’area del primo e usala con la formula inversa nel secondo!',
    methodSteps: [
      'Calcola l’area della figura di cui conosci tutti gli elementi.',
      'Poni Area₂ = Area₁ (perché il testo dice «equivalente»).',
      'Applica la formula inversa: nel triangolo e nel rombo ricorda di MOLTIPLICARE per 2 l’area prima di dividere!',
    ],
    workedExample: {
      problemText:
        'Un triangolo è equivalente a un quadrato di lato 12 cm. Sapendo che la base del triangolo misura 18 cm, quanto misura la sua altezza?',
      reasoning: [
        'Area del quadrato = 12² = 144 cm².',
        'Poiché sono equivalenti, anche l’area del triangolo vale 144 cm².',
        'Formula inversa dell’altezza del triangolo: h = (2 × A) : b = (2 × 144) : 18 = 288 : 18 = 16 cm.',
      ],
      finalAnswer: '16 cm',
    },
    commonTrap:
      'Dimenticare il «2 ×» nella formula inversa del triangolo e fare 144 : 18 = 8 cm!',
    visual: {
      kind: 'geometry-rect',
      caption: 'Quadrato 12×12 (A = 144 cm²) equivalente al Triangolo con b = 18 cm e h = 16 cm',
      values: [18, 16],
      labels: ['Base b = 18 cm', 'Altezza h = 16 cm'],
    },
    quickCheck: {
      prompt: 'Un rombo ha area 60 cm² e una diagonale lunga 10 cm. Quanto misura l’altra diagonale?',
      options: ['6 cm', '12 cm', '30 cm', '15 cm'],
      correctIndex: 1,
      explanation: 'Poiché A = (d₁ × d₂) : 2, la formula inversa richiede di raddoppiare l’area: d₂ = (2 × 60) : 10 = 12 cm.',
    },
  },
  {
    id: '2m-u5',
    gradeId: GradeId.SecondaMedia,
    index: 5,
    title: 'Il Teorema di Pitagora nelle figure e nella realtà',
    subtitle: 'Scoprire i triangoli rettangoli nascosti in rettangoli, rombi, trapezi e oggetti reali',
    keyIdea:
      'Individua sempre l’angolo retto: il lato opposto è l’ipotenusa (il lato più lungo, somma di quadrati); gli altri due sono i cateti (differenza di quadrati).',
    methodSteps: [
      'Disegna la figura ed evidenzia l’angolo di 90°: il lato di fronte all’angolo retto è l’ipotenusa c.',
      'Se cerchi l’ipotenusa: c = √(a² + b²). Se cerchi un cateto: a = √(c² − b²).',
      'Riconosci i triangoli rettangoli nascosti: nel rombo le semidiagonali sono i cateti e il lato è l’ipotenusa!',
    ],
    workedExample: {
      problemText:
        'Una scala lunga 5 m è appoggiata a un muro verticale; il piede della scala dista 3 m dalla base del muro. A quale altezza tocca il muro?',
      reasoning: [
        'Muro e pavimento formano un angolo retto: la scala (5 m) è l’ipotenusa, la distanza a terra (3 m) è un cateto.',
        'Cerco l’altro cateto (altezza h): uso la sottrazione sotto radice!',
        'h = √(5² − 3²) = √(25 − 9) = √16 = 4 m.',
      ],
      finalAnswer: '4 m',
    },
    commonTrap:
      'Sommare sempre i quadrati √(5² + 3²) senza controllare se il lato incognito è l’ipotenusa oppure un cateto!',
    visual: {
      kind: 'pythagoras',
      caption: 'Triangolo rettangolo: cateto a = 3 m, cateto h = 4 m, ipotenusa (scala) = 5 m',
      values: [3, 4, 5],
      labels: ['Base 3 m', 'Altezza 4 m', 'Scala 5 m'],
    },
    quickCheck: {
      prompt: 'Un rettangolo ha base 12 cm e altezza 5 cm. Quanto misura la sua diagonale?',
      options: ['17 cm', '13 cm', '8,5 cm', '169 cm'],
      correctIndex: 1,
      explanation: 'Base e altezza sono i cateti: d = √(12² + 5²) = √(144 + 25) = √169 = 13 cm (terna pitagorica 5-12-13).',
    },
  },

  // ===================== CLASSE TERZA MEDIA =====================
  {
    id: '3m-u1',
    gradeId: GradeId.TerzaMedia,
    index: 1,
    title: 'Numeri relativi e modellizzazione algebrica',
    subtitle: 'Operare con grandezze dotate di segno e tradurre problemi in espressioni letterali',
    keyIdea:
      'La differenza (variazione o escursione) tra uno stato finale e uno iniziale è sempre Valore Finale − Valore Iniziale, facendo attenzione al doppio segno meno!',
    methodSteps: [
      'Fissa lo zero di riferimento (livello del mare, 0 °C, pareggio di bilancio).',
      'Ricorda che sottrarre un numero negativo equivale a sommare il suo opposto: a − (−b) = a + b.',
      'Traduci le frasi in algebra: «il doppio di x diminuito di 3» si scrive 2x − 3; «il doppio di x diminuito di 3 tutto al quadrato» è (2x − 3)².',
    ],
    workedExample: {
      problemText:
        'In un rifugio alpino la temperatura minima notturna è stata di −7 °C, mentre a mezzogiorno è salita a +11 °C. Di quanti gradi è stata l’escursione termica?',
      reasoning: [
        'Escursione termica = Temperatura massima − Temperatura minima.',
        'Imposto il calcolo coi segni: (+11) − (−7).',
        'Applico la regola dei segni: +11 + 7 = +18 °C.',
      ],
      finalAnswer: '18 °C',
    },
    commonTrap:
      'Calcolare 11 − 7 = 4 °C dimenticando che per passare da −7 a 0 servono già 7 gradi e da 0 a +11 altri 11 gradi!',
    visual: {
      kind: 'bar-part-whole',
      caption: 'Da −7 °C a 0 °C (7 gradi) + da 0 °C a +11 °C (11 gradi) = 18 °C di escursione',
      values: [7, 11],
      labels: ['Da −7 a 0 (+7 °C)', 'Da 0 a +11 (+11 °C)'],
    },
    quickCheck: {
      prompt: 'Un sottomarino si trova a −120 m, risale di 45 m e poi scende di 30 m. A quale quota si trova ora?',
      options: ['−105 m', '−195 m', '−45 m', '+105 m'],
      correctIndex: 0,
      explanation: 'Calcolo algebrico: −120 + 45 − 30 = −75 − 30 = −105 m.',
    },
  },
  {
    id: '3m-u2',
    gradeId: GradeId.TerzaMedia,
    index: 2,
    title: 'Risolvere problemi con equazioni di primo grado',
    subtitle: 'Dalla scelta strategica dell’incognita x alla verifica di accettabilità',
    keyIdea:
      'Scegli come x la grandezza più semplice da cui dipendono le altre, traduci il legame globale in un’uguaglianza e controlla se la soluzione è accettabile.',
    methodSteps: [
      'Dichiara chiaramente l’incognita (es. «Sia x il numero di biglietti ridotti, con x naturale > 0»).',
      'Esprimi tutte le altre grandezze del problema in funzione di x.',
      'Individua l’uguaglianza chiave nel testo, risolvi l’equazione e verifica la soluzione nel testo originale!',
    ],
    workedExample: {
      problemText:
        'La somma di tre numeri interi consecutivi è 78. Qual è il maggiore dei tre numeri?',
      reasoning: [
        'Pongo il primo numero uguale a x; i due successivi sono (x + 1) e (x + 2).',
        'Imposto l’equazione: x + (x + 1) + (x + 2) = 78 → 3x + 3 = 78 → 3x = 75 → x = 25.',
        'Attenzione alla domanda finale! Chiede il MAGGIORE: x + 2 = 25 + 2 = 27.',
      ],
      finalAnswer: '27',
    },
    commonTrap:
      'Rispondere subito x = 25 senza rileggere che la domanda chiedeva il numero maggiore (x + 2 = 27)!',
    visual: {
      kind: 'equation-balance',
      caption: 'Equazione in equilibrio: 3x + 3 = 78 → 3x = 75 → x = 25 (numeri: 25, 26, 27)',
      values: [3, 3, 0, 78],
      labels: ['3x + 3', '78'],
    },
    quickCheck: {
      prompt: 'Il perimetro di un rettangolo è 50 cm e la base supera il doppio dell’altezza di 4 cm. Posta l’altezza = x, quale equazione è corretta?',
      options: [
        'x + (2x + 4) = 50',
        '2 · [x + (2x + 4)] = 50',
        'x · (2x + 4) = 50',
        '2x + 4 = 50',
      ],
      correctIndex: 1,
      explanation: 'Il perimetro comprende DUE basi e DUE altezze: 2 · (altezza + base) = 2 · [x + (2x + 4)] = 50.',
    },
  },
  {
    id: '3m-u3',
    gradeId: GradeId.TerzaMedia,
    index: 3,
    title: 'Cerchio, geometria solida e densità',
    subtitle: 'Volumi, superfici di prismi, cilindri, piramidi, coni e calcolo della massa',
    keyIdea:
      'Separa con ordine la geometria del solido (in cm³ o dm³) dalla fisica del materiale (Massa = Volume × densità), curando le equivalenze volumetriche (salti di 1000!).',
    methodSteps: [
      'Attenzione a raggio e diametro: se il testo dà il diametro d, calcola subito r = d : 2!',
      'Ricorda le due famiglie di volumi: prismi e cilindri hanno V = A_base · h; piramidi e coni hanno V = (A_base · h) / 3.',
      'Nelle equivalenze di volume ogni gradino vale 1000 (1 m³ = 1000 dm³ = 1000 litri; 1 dm³ = 1000 cm³).',
    ],
    workedExample: {
      problemText:
        'Un cilindro di ferro (densità 7,8 g/cm³) ha il diametro di base di 10 cm e l’altezza di 12 cm. Quanto pesa in chilogrammi? (Usa π ≈ 3,14)',
      reasoning: [
        'Dal diametro ricavo il raggio: r = 10 : 2 = 5 cm.',
        'Volume del cilindro: V = π · r² · h = 3,14 × 25 × 12 = 942 cm³.',
        'Massa in grammi: M = 942 × 7,8 = 7347,6 g → in chilogrammi (: 1000) ≈ 7,35 kg.',
      ],
      finalAnswer: '7,35 kg (7347,6 g)',
    },
    commonTrap:
      'Inserire il diametro (10 cm) direttamente al posto del raggio in π · r², quadruplicando per errore il volume!',
    visual: {
      kind: 'solid-cylinder',
      caption: 'Cilindro con r = 5 cm (d = 10 cm) e h = 12 cm → V = 942 cm³',
      values: [5, 12, 942],
      labels: ['Raggio r = 5 cm', 'Altezza h = 12 cm', 'V = 942 cm³'],
    },
    quickCheck: {
      prompt: 'Un serbatoio cubico ha lo spigolo interno di 2 m. Quanti litri d’acqua può contenere al massimo?',
      options: ['8 litri', '800 litri', '8000 litri', '6000 litri'],
      correctIndex: 2,
      explanation: 'Il volume è V = 2³ = 8 m³. Poiché 1 m³ = 1000 dm³ = 1000 litri, contiene 8 × 1000 = 8000 litri!',
    },
  },
  {
    id: '3m-u4',
    gradeId: GradeId.TerzaMedia,
    index: 4,
    title: 'Piano cartesiano e modelli lineari',
    subtitle: 'Distanza tra punti, poligoni sul piano e confronto tra tariffe y = mx + q',
    keyIdea:
      'Sul piano cartesiano la geometria e l’algebra si incontrano: due rette che si intersecano indicano il punto di pareggio tra due scelte!',
    methodSteps: [
      'Per segmenti orizzontali (stessa y) usa |x₂ − x₁|; per segmenti verticali (stessa x) usa |y₂ − y₁|.',
      'Per segmenti obliqui usa Pitagora sulle differenze delle coordinate: d = √[(x₂ − x₁)² + (y₂ − y₁)²].',
      'Nei confronti tra tariffe (quota fissa q + costo variabile m·x), eguaglia le due funzioni per trovare il punto di indifferenza.',
    ],
    workedExample: {
      problemText:
        'La palestra Alfa chiede 40 € di iscrizione più 15 € al mese; la palestra Beta non chiede iscrizione ma costa 25 € al mese. Dopo quanti mesi la spesa totale è identica?',
      reasoning: [
        'Modello Alfa: y₁ = 15x + 40. Modello Beta: y₂ = 25x (con x = numero di mesi).',
        'Punto di pareggio: 25x = 15x + 40 → 10x = 40 → x = 4 mesi.',
        'Dopo 4 mesi entrambe costano 100 €; per periodi più lunghi conviene Alfa!',
      ],
      finalAnswer: '4 mesi',
    },
    commonTrap:
      'Scambiare la quota fissa (pagata una sola volta) con il costo mensile moltiplicato per x.',
    visual: {
      kind: 'equation-balance',
      caption: 'Pareggio tariffe: 15x + 40 = 25x → x = 4 mesi (spesa comune = 100 €)',
      values: [15, 40, 25, 0],
      labels: ['Alfa: 15x + 40', 'Beta: 25x'],
    },
    quickCheck: {
      prompt: 'Qual è la distanza tra i punti A(−3; 2) e B(5; 2) nel piano cartesiano?',
      options: ['2 unità', '8 unità', '4 unità', '10 unità'],
      correctIndex: 1,
      explanation: 'I punti hanno la stessa ordinata (y = 2): la distanza orizzontale è |5 − (−3)| = |5 + 3| = 8 unità.',
    },
  },
  {
    id: '3m-u5',
    gradeId: GradeId.TerzaMedia,
    index: 5,
    title: 'Statistica, probabilità e quesiti stile Esame',
    subtitle: 'Media ponderata, eventi composti e ragionamento critico',
    keyIdea:
      'Nella media aritmetica conosci la somma totale dei dati (Somma = Media × Numero dati); nella probabilità verifica sempre il totale aggiornato dei casi possibili!',
    methodSteps: [
      'Se conosci la media M di n valori, ricava subito la loro somma complessiva: S = M × n.',
      'Nelle estrazioni SENZA reinserimento, al secondo turno diminuiscono sia il totale delle palline sia quelle già estratte.',
      'Esprimi la probabilità in frazione ridotta ai minimi termini o in percentuale secondo la richiesta.',
    ],
    workedExample: {
      problemText:
        'Nelle prime 4 verifiche di matematica Marco ha la media del 7. Quale voto deve prendere nella quinta verifica per portare la media esattamente a 7,4?',
      reasoning: [
        'Somma attuale dei primi 4 voti: 7 × 4 = 28.',
        'Per avere media 7,4 su 5 verifiche, la nuova somma dovrà essere: 7,4 × 5 = 37.',
        'Voto necessario nella quinta verifica: 37 − 28 = 9.',
      ],
      finalAnswer: '9',
    },
    commonTrap:
      'Fare la media tra 7 e il nuovo voto (7 + x) : 2 = 7,4 dimenticando che il 7 pesa per QUATTRO verifiche!',
    visual: {
      kind: 'bar-part-whole',
      caption: 'Somma obiettivo su 5 prove (37) = Somma prime 4 prove (28) + Quinto voto (9)',
      values: [28, 9],
      labels: ['Prime 4 prove: 28', '5ª prova: 9'],
    },
    quickCheck: {
      prompt: 'Lanciamo due monete equilibrate. Qual è la probabilità di ottenere esattamente una Testa e una Croce (in qualsiasi ordine)?',
      options: ['1/3', '1/2 (50%)', '1/4 (25%)', '2/3'],
      correctIndex: 1,
      explanation: 'I 4 casi equiprobabili sono TT, TC, CT, CC (non 3!). I casi favorevoli sono due (TC e CT), quindi 2/4 = 1/2 = 50%.',
    },
  },
];

export function getUnitsByGrade(gradeId: GradeId): CurriculumUnit[] {
  return CURRICULUM_UNITS.filter((u) => u.gradeId === gradeId).sort((a, b) => a.index - b.index);
}
