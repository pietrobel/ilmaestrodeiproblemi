import { useState, useEffect } from 'react';
import { RotateCcw } from 'lucide-react';
import { getGradeProfile } from '../data/grades';
import { GradeId } from '../types/math';
import { formatItNumber } from '../utils/mathEvaluator';
import { SafeImage } from './SafeImage';

interface VisualLabSectionProps {
  gradeId: GradeId;
}

export function VisualLabSection({ gradeId }: VisualLabSectionProps) {
  const profile = getGradeProfile(gradeId);

  // Definizione dei tab disponibili per ciascuna classe
  const getTabsForGrade = (gid: GradeId) => {
    switch (gid) {
      case GradeId.QuartaPrimaria:
        return [
          { id: '4p-barre', label: 'Barrette delle 4 Operazioni' },
          { id: '4p-frazioni', label: 'La Tavoletta delle Frazioni' },
          { id: '4p-perimetro', label: 'Il Cantiere del Perimetro (Bordi)' },
        ] as const;
      case GradeId.QuintaPrimaria:
        return [
          { id: '5p-compravendita', label: 'Spesa, Ricavo e Guadagno' },
          { id: '5p-frazioni-decimali', label: 'Frazioni e Decimali' },
          { id: '5p-area-perimetro', label: 'Perimetro vs Area (Recinto vs Mattonelle)' },
        ] as const;
      case GradeId.PrimaMedia:
        return [
          { id: '1m-segmenti', label: 'Metodo dei Segmenti (Somma-Diff/Multipli)' },
          { id: '1m-divisibilita', label: 'MCD e mcm Interattivo' },
          { id: '1m-angoli', label: 'Angoli Complementari e Supplementari' },
        ] as const;
      case GradeId.SecondaMedia:
        return [
          { id: '2m-proporzioni', label: 'Rapporti e Proporzioni' },
          { id: '2m-percentuali', label: 'Percentuali e Sconti' },
          { id: '2m-pitagora', label: 'Teorema di Pitagora (Cateti e Ipotenusa)' },
        ] as const;
      case GradeId.TerzaMedia:
      default:
        return [
          { id: '3m-equazioni', label: 'La Bilancia delle Equazioni' },
          { id: '3m-solidi', label: 'Solidi e Densità (Volume e Peso)' },
          { id: '3m-pitagora-spazio', label: 'Pitagora nello Spazio e Coordinate' },
        ] as const;
    }
  };

  const currentTabs = getTabsForGrade(gradeId);
  const [activeTab, setActiveTab] = useState<string>(currentTabs[0].id);

  // Se cambia classe, imposta sempre il primo tab idoneo della nuova classe
  useEffect(() => {
    setActiveTab(currentTabs[0].id);
  }, [gradeId]);

  // ================= STATI QUARTA PRIMARIA =================
  const [opMode, setOpMode] = useState<'add' | 'sub' | 'mul' | 'div'>('add');
  const [opValA, setOpValA] = useState<number>(20);
  const [opValB, setOpValB] = useState<number>(5);

  const [primFracDen, setPrimFracDen] = useState<number>(6);
  const [primFracNum, setPrimFracNum] = useState<number>(2);

  const [perimBase, setPerimBase] = useState<number>(7);
  const [perimAlt, setPerimAlt] = useState<number>(4);

  // ================= STATI QUINTA PRIMARIA =================
  const [shopSpesa, setShopSpesa] = useState<number>(40);
  const [shopGuadagno, setShopGuadagno] = useState<number>(15);

  const [decFracDen, setDecFracDen] = useState<number>(4);
  const [decFracNum, setDecFracNum] = useState<number>(3);

  const [rectBase, setRectBase] = useState<number>(12);
  const [rectAlt, setRectAlt] = useState<number>(6);

  // ================= STATI MEDIE =================
  // 1M: Segmenti
  const [segMode, setSegMode] = useState<'sum-diff' | 'sum-mult'>('sum-diff');
  const [segA, setSegA] = useState<number>(18);
  const [segDiff, setSegDiff] = useState<number>(10);
  const [segMult, setSegMult] = useState<number>(3);

  // 1M: Divisibilità MCD mcm
  const [numX, setNumX] = useState<number>(12);
  const [numY, setNumY] = useState<number>(18);

  // 1M: Angoli
  const [angleAlpha, setAngleAlpha] = useState<number>(35);

  // 2M: Proporzioni e percentuali
  const [propA, setPropA] = useState<number>(4);
  const [propB, setPropB] = useState<number>(10);
  const [propC, setPropC] = useState<number>(12);

  const [pctPrezzo, setPctPrezzo] = useState<number>(80);
  const [pctSconto, setPctSconto] = useState<number>(25);

  // 2M: Teorema di Pitagora (SOLO DALLA 2ª MEDIA!)
  const [catA, setCatA] = useState<number>(6);
  const [catB, setCatB] = useState<number>(8);

  // 3M: Equazioni e solidi
  const [eqCoeff, setEqCoeff] = useState<number>(3);
  const [eqConst, setEqConst] = useState<number>(6);
  const [eqX, setEqX] = useState<number>(5);
  const [eqStep, setEqStep] = useState<0 | 1 | 2>(0);

  // 3M: Solidi e densità
  const [solidR, setSolidR] = useState<number>(4);
  const [solidH, setSolidH] = useState<number>(10);
  const [solidDensity, setSolidDensity] = useState<number>(2.5); // vetro/alluminio

  // Calcoli live Pitagora (2ª Media)
  const hypC = Math.sqrt(catA * catA + catB * catB);
  const sqCatA = catA * catA;
  const sqCatB = catB * catB;
  const sqHyp = sqCatA + sqCatB;

  // Calcolo MCD e mcm
  const gcd = (a: number, b: number): number => (!b ? a : gcd(b, a % b));
  const currentGcd = gcd(numX, numY);
  const currentLcm = (numX * numY) / currentGcd;

  // Calcolo equazione
  const eqRhs = eqCoeff * eqX + eqConst;

  // Calcolo solido cilindro
  const cylVol = Math.PI * solidR * solidR * solidH;
  const cylMass = cylVol * solidDensity;

  return (
    <div className="space-y-6">
      {/* Intestazione del Laboratorio con immagine e Selettore Schede */}
      <section className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
          <div className="lg:col-span-8 p-6 sm:p-7 space-y-4 flex flex-col justify-between">
            <div>
              <p className="text-xs font-semibold text-sky-700 tracking-wide uppercase mb-1">
                Laboratorio Manipolativo · {profile.buttonLabel}
              </p>
              <h1 className="font-display text-2xl sm:text-3xl font-bold text-slate-900">
                Laboratorio Visivo del Maestro
              </h1>
              <p className="text-xs sm:text-sm text-slate-600 mt-1.5 leading-relaxed max-w-2xl">
                Tocca i blocchi, sposta i cursori ed esplora come prendono forma grandezze,
                proporzioni, perimetri e bilance matematiche in tempo reale.
              </p>
            </div>

            {/* Tab specifici per la classe */}
            <div
              role="group"
              aria-label="Scegli il modello della classe"
              className="inline-flex items-center gap-1 p-1 bg-slate-100 rounded-lg overflow-x-auto max-w-full"
            >
              {currentTabs.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-3.5 py-2 text-xs sm:text-sm font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    activeTab === tab.id
                      ? 'bg-white text-slate-900 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="lg:col-span-4 h-40 lg:h-auto min-h-[160px] overflow-hidden relative border-t lg:border-t-0 lg:border-l border-slate-200">
            <SafeImage
              imageKey="laboratorioVisivo"
              alt="Bilancia a due piatti ed elementi geometrici in legno del laboratorio"
              fallbackTitle="Laboratorio"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* ======================= QUARTA PRIMARIA: BARRETTE 4 OPERAZIONI ======================= */}
      {activeTab === '4p-barre' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          <div className="lg:col-span-8 bg-white border border-slate-200 rounded-xl p-6 flex flex-col justify-between space-y-6">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h2 className="font-display text-xl font-bold text-slate-900">
                  Il Muro delle 4 Operazioni
                </h2>
                <p className="text-xs sm:text-sm text-slate-500">
                  Guarda come si comportano le quantità con addizione, sottrazione, moltiplicazione e divisione
                </p>
              </div>
              <div className="inline-flex items-center gap-1 p-1 bg-slate-100 rounded-lg shrink-0 text-xs font-semibold">
                {(['add', 'sub', 'mul', 'div'] as const).map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => setOpMode(m)}
                    className={`px-2.5 py-1 rounded transition-colors cursor-pointer ${
                      opMode === m ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'
                    }`}
                  >
                    {m === 'add' && '+ Unire'}
                    {m === 'sub' && '− Togliere'}
                    {m === 'mul' && '× Ripetere'}
                    {m === 'div' && ': Dividere'}
                  </button>
                ))}
              </div>
            </div>

            <div className="quadretti-bg border border-slate-200 rounded-xl p-6 space-y-6">
              {opMode === 'add' && (
                <div className="space-y-4">
                  <div className="flex justify-between text-xs font-medium text-slate-600">
                    <span>Due parti diverse che si uniscono nel totale:</span>
                    <span className="font-mono font-bold text-sky-900">{opValA + opValB}</span>
                  </div>
                  <div className="h-12 bg-slate-100 rounded-lg p-1 flex items-center gap-1.5">
                    <div
                      style={{ width: `${(opValA / (opValA + opValB)) * 100}%` }}
                      className="h-full bg-sky-600 rounded-md flex items-center justify-center text-white font-mono text-xs font-bold"
                    >
                      Parte A: {opValA}
                    </div>
                    <div
                      style={{ width: `${(opValB / (opValA + opValB)) * 100}%` }}
                      className="h-full bg-amber-500 rounded-md flex items-center justify-center text-white font-mono text-xs font-bold"
                    >
                      Parte B: {opValB}
                    </div>
                  </div>
                </div>
              )}

              {opMode === 'sub' && (
                <div className="space-y-4">
                  <div className="flex justify-between text-xs font-medium text-slate-600">
                    <span>Dal totale togliamo una parte:</span>
                    <span className="font-mono font-bold text-slate-900">
                      Resta: {Math.max(0, opValA - opValB)}
                    </span>
                  </div>
                  <div className="h-12 bg-slate-100 rounded-lg p-1 flex items-center gap-1.5">
                    <div
                      style={{ width: `${Math.min(100, (Math.max(0, opValA - opValB) / opValA) * 100)}%` }}
                      className="h-full bg-sky-600 rounded-md flex items-center justify-center text-white font-mono text-xs font-bold"
                    >
                      Resto: {Math.max(0, opValA - opValB)}
                    </div>
                    <div
                      style={{ width: `${Math.min(100, (opValB / opValA) * 100)}%` }}
                      className="h-full bg-rose-400 rounded-md flex items-center justify-center text-white font-mono text-xs font-bold line-through"
                    >
                      Tolto: {opValB}
                    </div>
                  </div>
                </div>
              )}

              {opMode === 'mul' && (
                <div className="space-y-4">
                  <div className="flex justify-between text-xs font-medium text-slate-600">
                    <span>Una quantità ({opValA}) che si ripete {opValB} volte:</span>
                    <span className="font-mono font-bold text-sky-900">
                      Totale: {opValA * opValB}
                    </span>
                  </div>
                  <div className="grid gap-1.5" style={{ gridTemplateColumns: `repeat(${Math.min(6, opValB)}, minmax(0, 1fr))` }}>
                    {Array.from({ length: Math.min(6, opValB) }).map((_, idx) => (
                      <div
                        key={idx}
                        className="h-11 bg-emerald-600 rounded-md flex items-center justify-center text-white font-mono text-xs font-bold"
                      >
                        Gruppo {idx + 1} ({opValA})
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {opMode === 'div' && (
                <div className="space-y-4">
                  <div className="flex justify-between text-xs font-medium text-slate-600">
                    <span>Distribuiamo il totale ({opValA}) in {opValB} parti uguali:</span>
                    <span className="font-mono font-bold text-sky-900">
                      Ciascuna parte: {formatItNumber(opValA / opValB, 1)}
                    </span>
                  </div>
                  <div className="grid gap-1.5" style={{ gridTemplateColumns: `repeat(${Math.min(6, opValB)}, minmax(0, 1fr))` }}>
                    {Array.from({ length: Math.min(6, opValB) }).map((_, idx) => (
                      <div
                        key={idx}
                        className="h-11 bg-sky-700 rounded-md flex items-center justify-center text-white font-mono text-xs font-bold"
                      >
                        {formatItNumber(opValA / opValB, 1)}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="p-4 rounded-lg bg-sky-50 border border-sky-200 text-xs sm:text-sm text-sky-950 font-mono">
              {opMode === 'add' && `Operazione: ${opValA} + ${opValB} = ${opValA + opValB} (Addizione: unione di quantità)`}
              {opMode === 'sub' && `Operazione: ${opValA} − ${opValB} = ${opValA - opValB} (Sottrazione: togliere o trovare la differenza)`}
              {opMode === 'mul' && `Operazione: ${opValA} × ${opValB} = ${opValA * opValB} (Moltiplicazione: la stessa quantità ripetuta)`}
              {opMode === 'div' && `Operazione: ${opValA} : ${opValB} = ${formatItNumber(opValA / opValB, 1)} (Divisione: distribuire in parti uguali)`}
            </div>
          </div>

          <div className="lg:col-span-4 bg-white border border-slate-200 rounded-xl p-6 space-y-5">
            <h3 className="font-display text-lg font-bold text-slate-900">Regola i numeri</h3>
            <div>
              <div className="flex justify-between text-sm font-medium text-slate-700 mb-1.5">
                <label htmlFor="slider-4p-a">Quantità principale (A):</label>
                <span className="font-mono font-bold text-sky-800">{opValA}</span>
              </div>
              <input
                id="slider-4p-a"
                type="range"
                min={6}
                max={50}
                step={1}
                value={opValA}
                onChange={(e) => setOpValA(Number(e.target.value))}
                className="w-full accent-sky-700 cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-sm font-medium text-slate-700 mb-1.5">
                <label htmlFor="slider-4p-b">Seconda quantità o parti (B):</label>
                <span className="font-mono font-bold text-amber-800">{opValB}</span>
              </div>
              <input
                id="slider-4p-b"
                type="range"
                min={2}
                max={Math.min(10, opValA - 1)}
                step={1}
                value={opValB}
                onChange={(e) => setOpValB(Number(e.target.value))}
                className="w-full accent-amber-600 cursor-pointer"
              />
            </div>

            <div className="pt-4 border-t border-slate-100 text-xs text-slate-600 space-y-2">
              <p className="font-bold text-slate-900">Il consiglio del Detective Pico:</p>
              <p>
                «Non farti ingannare dalle parole: immagina sempre se hai già il totale (allora togli o dividi) oppure se devi costruirlo (allora unisci o moltiplichi)!»
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ======================= QUARTA PRIMARIA: TAVOLETTA FRAZIONI ======================= */}
      {activeTab === '4p-frazioni' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          <div className="lg:col-span-8 bg-white border border-slate-200 rounded-xl p-6 flex flex-col justify-between space-y-6">
            <div>
              <h2 className="font-display text-xl font-bold text-slate-900">
                La Tavoletta delle Frazioni Concrete
              </h2>
              <p className="text-xs sm:text-sm text-slate-500">
                Tocca le caselle per colorare le fette di cioccolato e capire denominatore e numeratore
              </p>
            </div>

            <div className="quadretti-bg border border-slate-200 rounded-xl p-6 space-y-4">
              <div className="flex justify-between text-xs font-semibold text-slate-700">
                <span>Intero diviso in {primFracDen} parti uguali</span>
                <span className="font-mono text-sky-800 font-bold">
                  Prese: {primFracNum} su {primFracDen} ({primFracNum}/{primFracDen})
                </span>
              </div>

              <div
                className="grid gap-2"
                style={{ gridTemplateColumns: `repeat(${primFracDen}, minmax(0, 1fr))` }}
              >
                {Array.from({ length: primFracDen }).map((_, idx) => {
                  const isColored = idx < primFracNum;
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setPrimFracNum(idx + 1)}
                      className={`h-24 rounded-lg border-2 flex flex-col items-center justify-center p-2 transition-all cursor-pointer ${
                        isColored
                          ? 'bg-amber-600 border-amber-800 text-white shadow-xs font-bold'
                          : 'bg-white border-dashed border-slate-300 text-slate-500 hover:border-amber-400'
                      }`}
                    >
                      <span className="text-xs">1/{primFracDen}</span>
                      <span className="text-sm mt-1">{isColored ? '🍫 Presa' : 'Vuota'}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 font-mono text-sm">
              <div className="p-3.5 rounded-lg bg-amber-50 border border-amber-200">
                <p className="text-xs font-sans text-amber-900 font-medium">Parte presa</p>
                <p className="text-xl font-bold text-amber-950 mt-0.5">
                  {primFracNum}/{primFracDen}
                </p>
              </div>
              <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200">
                <p className="text-xs font-sans text-slate-600 font-medium">Frazione complementare (ciò che resta)</p>
                <p className="text-xl font-bold text-slate-900 mt-0.5">
                  {primFracDen - primFracNum}/{primFracDen}
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 bg-white border border-slate-200 rounded-xl p-6 space-y-5">
            <h3 className="font-display text-lg font-bold text-slate-900">Imposta la frazione</h3>
            <div>
              <div className="flex justify-between text-sm font-medium text-slate-700 mb-1.5">
                <label htmlFor="slider-4p-den">Denominatore (in quante fette tagli):</label>
                <span className="font-mono font-bold text-sky-800">{primFracDen}</span>
              </div>
              <input
                id="slider-4p-den"
                type="range"
                min={2}
                max={8}
                step={1}
                value={primFracDen}
                onChange={(e) => {
                  const d = Number(e.target.value);
                  setPrimFracDen(d);
                  if (primFracNum > d) setPrimFracNum(d);
                }}
                className="w-full accent-sky-700 cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-sm font-medium text-slate-700 mb-1.5">
                <label htmlFor="slider-4p-num">Numeratore (quante fette prendi):</label>
                <span className="font-mono font-bold text-amber-700">{primFracNum}</span>
              </div>
              <input
                id="slider-4p-num"
                type="range"
                min={1}
                max={primFracDen}
                step={1}
                value={primFracNum}
                onChange={(e) => setPrimFracNum(Number(e.target.value))}
                className="w-full accent-amber-600 cursor-pointer"
              />
            </div>

            <div className="pt-4 border-t border-slate-100 text-xs text-slate-600 space-y-2">
              <p className="font-bold text-slate-900">La regola d’oro di Zoe:</p>
              <p>
                • <strong>Denominatore (in basso)</strong>: dice in quante parti UGUALI è diviso l’intero.
                <br />• <strong>Numeratore (in alto)</strong>: dice quante di quelle parti mangi o consideri!
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ======================= QUARTA PRIMARIA: CANTIERE DEL PERIMETRO ======================= */}
      {activeTab === '4p-perimetro' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          <div className="lg:col-span-8 bg-white border border-slate-200 rounded-xl p-6 flex flex-col justify-between space-y-6">
            <div>
              <h2 className="font-display text-xl font-bold text-slate-900">
                Il Cantiere del Perimetro: il Cammino lungo il Bordo
              </h2>
              <p className="text-xs sm:text-sm text-slate-500">
                In quarta primaria il perimetro è la misura del contorno (recinto): sommiamo i 4 lati!
              </p>
            </div>

            <div className="quadretti-bg border border-slate-200 rounded-xl p-6 flex items-center justify-center">
              <svg viewBox="0 0 380 200" className="w-full max-w-[400px] h-auto">
                {(() => {
                  const scale = 14;
                  const w = perimBase * scale;
                  const h = perimAlt * scale;
                  const x0 = (380 - w) / 2;
                  const y0 = (200 - h) / 2;
                  return (
                    <>
                      {/* Bordo rettangolo evidenziato */}
                      <rect
                        x={x0}
                        y={y0}
                        width={w}
                        height={h}
                        fill="#FEF3C7"
                        stroke="#D97706"
                        strokeWidth="4"
                        rx="4"
                      />
                      {/* Tratteggio dei quadretti interni */}
                      <text
                        x={x0 + w / 2}
                        y={y0 - 10}
                        textAnchor="middle"
                        fontSize="14"
                        fontWeight="bold"
                        fill="#0F172A"
                        fontFamily="IBM Plex Mono"
                      >
                        Base = {perimBase} quadretti
                      </text>
                      <text
                        x={x0 + w / 2}
                        y={y0 + h + 22}
                        textAnchor="middle"
                        fontSize="14"
                        fontWeight="bold"
                        fill="#0F172A"
                        fontFamily="IBM Plex Mono"
                      >
                        Base = {perimBase} quadretti
                      </text>
                      <text
                        x={x0 - 12}
                        y={y0 + h / 2}
                        textAnchor="end"
                        fontSize="14"
                        fontWeight="bold"
                        fill="#0F172A"
                        fontFamily="IBM Plex Mono"
                      >
                        {perimAlt}
                      </text>
                      <text
                        x={x0 + w + 12}
                        y={y0 + h / 2}
                        textAnchor="start"
                        fontSize="14"
                        fontWeight="bold"
                        fill="#0F172A"
                        fontFamily="IBM Plex Mono"
                      >
                        {perimAlt}
                      </text>
                    </>
                  );
                })()}
              </svg>
            </div>

            <div className="p-4 rounded-lg bg-amber-50 border border-amber-200 text-xs sm:text-sm font-mono text-amber-950 space-y-1">
              <p className="font-bold">
                Formula del perimetro: (Base + Altezza) × 2 oppure Lato + Lato + Lato + Lato
              </p>
              <p>
                Perimetro = ({perimBase} + {perimAlt}) × 2 = {perimBase + perimAlt} × 2 ={' '}
                <strong>{2 * (perimBase + perimAlt)} quadretti (o metri)</strong>
              </p>
            </div>
          </div>

          <div className="lg:col-span-4 bg-white border border-slate-200 rounded-xl p-6 space-y-5">
            <h3 className="font-display text-lg font-bold text-slate-900">Misure del rettangolo</h3>
            <div>
              <div className="flex justify-between text-sm font-medium text-slate-700 mb-1.5">
                <label htmlFor="slider-4p-pb">Base:</label>
                <span className="font-mono font-bold text-amber-800">{perimBase} m</span>
              </div>
              <input
                id="slider-4p-pb"
                type="range"
                min={3}
                max={15}
                step={1}
                value={perimBase}
                onChange={(e) => setPerimBase(Number(e.target.value))}
                className="w-full accent-amber-600 cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-sm font-medium text-slate-700 mb-1.5">
                <label htmlFor="slider-4p-pa">Altezza:</label>
                <span className="font-mono font-bold text-amber-800">{perimAlt} m</span>
              </div>
              <input
                id="slider-4p-pa"
                type="range"
                min={2}
                max={10}
                step={1}
                value={perimAlt}
                onChange={(e) => setPerimAlt(Number(e.target.value))}
                className="w-full accent-amber-600 cursor-pointer"
              />
            </div>

            <div className="pt-4 border-t border-slate-100 text-xs text-slate-600 space-y-2">
              <p className="font-bold text-slate-900">Leo il Castoro Costruttore spiega:</p>
              <p>
                «Il perimetro è come una staccionata tutto intorno al giardino: per trovarlo basta camminare lungo i bordi e sommare tutti e 4 i lati!»
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ======================= QUINTA PRIMARIA: COMPRAVENDITA ======================= */}
      {activeTab === '5p-compravendita' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          <div className="lg:col-span-8 bg-white border border-slate-200 rounded-xl p-6 flex flex-col justify-between space-y-6">
            <div>
              <h2 className="font-display text-xl font-bold text-slate-900">
                La Cassa del Negozio: Spesa, Ricavo e Guadagno
              </h2>
              <p className="text-xs sm:text-sm text-slate-500">
                Visualizza le tre grandezze fondamentali del commercio per non sbagliare mai formula
              </p>
            </div>

            <div className="quadretti-bg border border-slate-200 rounded-xl p-6 space-y-5">
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-semibold text-slate-700">
                  <span>Ricavo totale (tutto ciò che incassi alla cassa):</span>
                  <span className="font-mono text-emerald-800 font-bold text-base">
                    {shopSpesa + shopGuadagno} €
                  </span>
                </div>
                <div className="h-14 bg-slate-100 rounded-xl p-1.5 flex items-center gap-1.5">
                  <div
                    style={{ width: `${(shopSpesa / (shopSpesa + shopGuadagno)) * 100}%` }}
                    className="h-full bg-slate-600 rounded-lg flex items-center justify-center text-white font-mono text-xs font-bold"
                  >
                    Spesa iniziale: {shopSpesa} €
                  </div>
                  <div
                    style={{ width: `${(shopGuadagno / (shopSpesa + shopGuadagno)) * 100}%` }}
                    className="h-full bg-emerald-600 rounded-lg flex items-center justify-center text-white font-mono text-xs font-bold"
                  >
                    Guadagno pulito: +{shopGuadagno} €
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 font-mono text-xs sm:text-sm">
              <div className="p-3 rounded-lg bg-slate-100 border border-slate-200">
                <p className="font-sans text-xs text-slate-600 font-semibold">Spesa</p>
                <p className="text-base font-bold text-slate-900 mt-1">{shopSpesa} €</p>
              </div>
              <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200">
                <p className="font-sans text-xs text-emerald-900 font-semibold">Guadagno</p>
                <p className="text-base font-bold text-emerald-950 mt-1">+{shopGuadagno} €</p>
              </div>
              <div className="p-3 rounded-lg bg-sky-50 border border-sky-200">
                <p className="font-sans text-xs text-sky-900 font-semibold">Ricavo (Totale)</p>
                <p className="text-base font-bold text-sky-950 mt-1">
                  {shopSpesa + shopGuadagno} €
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 bg-white border border-slate-200 rounded-xl p-6 space-y-5">
            <h3 className="font-display text-lg font-bold text-slate-900">Regola il bilancio</h3>
            <div>
              <div className="flex justify-between text-sm font-medium text-slate-700 mb-1.5">
                <label htmlFor="slider-5p-spesa">Spesa del negoziante:</label>
                <span className="font-mono font-bold text-slate-900">{shopSpesa} €</span>
              </div>
              <input
                id="slider-5p-spesa"
                type="range"
                min={10}
                max={100}
                step={5}
                value={shopSpesa}
                onChange={(e) => setShopSpesa(Number(e.target.value))}
                className="w-full accent-slate-700 cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-sm font-medium text-slate-700 mb-1.5">
                <label htmlFor="slider-5p-guad">Guadagno desiderato:</label>
                <span className="font-mono font-bold text-emerald-700">+{shopGuadagno} €</span>
              </div>
              <input
                id="slider-5p-guad"
                type="range"
                min={5}
                max={60}
                step={5}
                value={shopGuadagno}
                onChange={(e) => setShopGuadagno(Number(e.target.value))}
                className="w-full accent-emerald-600 cursor-pointer"
              />
            </div>

            <div className="pt-4 border-t border-slate-100 text-xs text-slate-600 space-y-2">
              <p className="font-bold text-slate-900">Formule della compravendita:</p>
              <p>
                • <strong>Ricavo</strong> = Spesa + Guadagno
                <br />• <strong>Guadagno</strong> = Ricavo − Spesa
                <br />• <strong>Spesa</strong> = Ricavo − Guadagno
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ======================= QUINTA PRIMARIA: PERIMETRO VS AREA ======================= */}
      {activeTab === '5p-area-perimetro' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          <div className="lg:col-span-8 bg-white border border-slate-200 rounded-xl p-6 flex flex-col justify-between space-y-6">
            <div>
              <h2 className="font-display text-xl font-bold text-slate-900">
                Perimetro vs Area a Confronto (Senza formule premature)
              </h2>
              <p className="text-xs sm:text-sm text-slate-500">
                Il perimetro è il filo del recinto (in metri lineari m); l’area è il pavimento di piastrelle (in m²). Il triangolo è la metà esatta!
              </p>
            </div>

            <div className="quadretti-bg border border-slate-200 rounded-xl p-4 flex items-center justify-center">
              <svg viewBox="0 0 400 210" className="w-full max-w-[420px] h-auto">
                {(() => {
                  const scale = 11;
                  const w = rectBase * scale;
                  const h = rectAlt * scale;
                  const x0 = (400 - w) / 2;
                  const y0 = (200 - h) / 2;
                  return (
                    <>
                      {/* Rettangolo pieno */}
                      <rect
                        x={x0}
                        y={y0}
                        width={w}
                        height={h}
                        fill="#F8FAFC"
                        stroke="#94A3B8"
                        strokeDasharray="4 3"
                        strokeWidth="1.5"
                      />
                      {/* Triangolo colorato = metà del rettangolo */}
                      <polygon
                        points={`${x0},${y0} ${x0},${y0 + h} ${x0 + w},${y0 + h}`}
                        fill="#BAE6FD"
                        stroke="#0284C7"
                        strokeWidth="2.5"
                      />
                      {/* Diagonale divisoria */}
                      <line
                        x1={x0}
                        y1={y0}
                        x2={x0 + w}
                        y2={y0 + h}
                        stroke="#0284C7"
                        strokeWidth="2.5"
                      />
                      <text
                        x={x0 + w / 2}
                        y={y0 + h + 20}
                        textAnchor="middle"
                        fontSize="13"
                        fontWeight="bold"
                        fill="#0F172A"
                        fontFamily="IBM Plex Mono"
                      >
                        Base = {rectBase} m
                      </text>
                      <text
                        x={x0 - 10}
                        y={y0 + h / 2}
                        textAnchor="end"
                        fontSize="13"
                        fontWeight="bold"
                        fill="#0F172A"
                        fontFamily="IBM Plex Mono"
                      >
                        h = {rectAlt} m
                      </text>
                    </>
                  );
                })()}
              </svg>
            </div>

            <div className="grid grid-cols-3 gap-3 font-mono text-xs sm:text-sm">
              <div className="p-3 rounded-lg bg-amber-50 border border-amber-200">
                <p className="font-sans text-xs text-amber-900 font-semibold">Perimetro Rettangolo</p>
                <p className="text-base font-bold text-amber-950 mt-1">
                  {2 * (rectBase + rectAlt)} m
                </p>
              </div>
              <div className="p-3 rounded-lg bg-slate-100 border border-slate-200">
                <p className="font-sans text-xs text-slate-600 font-semibold">Area Rettangolo (b × h)</p>
                <p className="text-base font-bold text-slate-900 mt-1">
                  {rectBase * rectAlt} m²
                </p>
              </div>
              <div className="p-3 rounded-lg bg-sky-50 border border-sky-200">
                <p className="font-sans text-xs text-sky-900 font-semibold">Area Triangolo (metà: : 2)</p>
                <p className="text-base font-bold text-sky-950 mt-1">
                  {(rectBase * rectAlt) / 2} m²
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 bg-white border border-slate-200 rounded-xl p-6 space-y-5">
            <h3 className="font-display text-lg font-bold text-slate-900">Dimensioni figura</h3>
            <div>
              <div className="flex justify-between text-sm font-medium text-slate-700 mb-1.5">
                <label htmlFor="slider-5p-base">Base rettangolo:</label>
                <span className="font-mono font-bold text-sky-800">{rectBase} m</span>
              </div>
              <input
                id="slider-5p-base"
                type="range"
                min={4}
                max={20}
                step={1}
                value={rectBase}
                onChange={(e) => setRectBase(Number(e.target.value))}
                className="w-full accent-sky-700 cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-sm font-medium text-slate-700 mb-1.5">
                <label htmlFor="slider-5p-alt">Altezza rettangolo:</label>
                <span className="font-mono font-bold text-sky-800">{rectAlt} m</span>
              </div>
              <input
                id="slider-5p-alt"
                type="range"
                min={3}
                max={14}
                step={1}
                value={rectAlt}
                onChange={(e) => setRectAlt(Number(e.target.value))}
                className="w-full accent-sky-700 cursor-pointer"
              />
            </div>

            <div className="pt-4 border-t border-slate-100 text-xs text-slate-600 space-y-2">
              <p className="font-bold text-slate-900">Perché si fa diviso 2 nel triangolo?</p>
              <p>
                Guarda la figura tratteggiata: il triangolo azzurro occupa esattamente la metà del rettangolo che ha la stessa base e la stessa altezza!
              </p>
              <p className="text-[11px] text-amber-800 bg-amber-50 p-2 rounded border border-amber-200">
                Nota didattica: il Teorema di Pitagora con le radici quadrate si affronta in seconda media, quando si conoscono le proprietà dei quadrati e dei numeri irrazionali.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ======================= PRIMA MEDIA: METODO DEI SEGMENTI ======================= */}
      {activeTab === '1m-segmenti' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          <div className="lg:col-span-8 bg-white border border-slate-200 rounded-xl p-6 flex flex-col justify-between space-y-6">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h2 className="font-display text-xl font-bold text-slate-900">
                  {segMode === 'sum-diff'
                    ? 'Metodo Grafico: Somma e Differenza'
                    : 'Metodo Grafico: Somma e Multiplo (Unità u)'}
                </h2>
                <p className="text-xs sm:text-sm text-slate-500">
                  Risolvi i problemi senza x con la rappresentazione a segmenti
                </p>
              </div>
              <div className="inline-flex items-center gap-1 p-1 bg-slate-100 rounded-lg shrink-0">
                <button
                  type="button"
                  onClick={() => setSegMode('sum-diff')}
                  className={`px-3 py-1 text-xs font-semibold rounded cursor-pointer ${
                    segMode === 'sum-diff' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'
                  }`}
                >
                  Somma-Diff
                </button>
                <button
                  type="button"
                  onClick={() => setSegMode('sum-mult')}
                  className={`px-3 py-1 text-xs font-semibold rounded cursor-pointer ${
                    segMode === 'sum-mult' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'
                  }`}
                >
                  Somma-Multiplo
                </button>
              </div>
            </div>

            <div className="quadretti-bg border border-slate-200 rounded-xl p-6 space-y-5">
              {segMode === 'sum-diff' ? (
                <>
                  <div className="space-y-1">
                    <p className="text-xs font-medium text-slate-600">Segmento Minore (A): {segA} cm</p>
                    <div className="h-10 bg-slate-100 rounded-md p-1 flex">
                      <div className="h-full bg-sky-600 rounded flex items-center justify-center text-white font-mono text-xs font-bold px-3">
                        A = {segA}
                      </div>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs font-medium text-slate-600">
                      Segmento Maggiore (B = A + Differenza): {segA + segDiff} cm
                    </p>
                    <div className="h-10 bg-slate-100 rounded-md p-1 flex items-center gap-1">
                      <div className="h-full bg-sky-600 rounded flex items-center justify-center text-white font-mono text-xs font-bold px-3">
                        {segA}
                      </div>
                      <div className="h-full bg-amber-500 rounded flex items-center justify-center text-white font-mono text-xs font-bold px-3">
                        +{segDiff} (Diff)
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="space-y-1">
                    <p className="text-xs font-medium text-slate-600">1 unità segmentaria (1u): {segA} cm</p>
                    <div className="h-10 bg-sky-600 rounded flex items-center justify-center text-white font-mono text-xs font-bold w-24">
                      1u = {segA}
                    </div>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs font-medium text-slate-600">
                      Maggiore ({segMult} unità uguali): {segA * segMult} cm
                    </p>
                    <div className="flex gap-1">
                      {Array.from({ length: segMult }).map((_, i) => (
                        <div
                          key={i}
                          className="h-10 bg-sky-700 rounded flex items-center justify-center text-white font-mono text-xs font-bold w-24"
                        >
                          {segA}
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>

            <div className="p-4 rounded-lg bg-sky-50 border border-sky-200 font-mono text-xs sm:text-sm text-sky-950">
              {segMode === 'sum-diff' ? (
                <p>
                  Somma = {2 * segA + segDiff} cm · Differenza = {segDiff} cm → Minore = ({2 * segA + segDiff} − {segDiff}) : 2 = {segA} cm.
                </p>
              ) : (
                <p>
                  Somma = {segA * (1 + segMult)} cm · Unità = 1 + {segMult} = {1 + segMult}u → 1u = {segA * (1 + segMult)} : {1 + segMult} = {segA} cm.
                </p>
              )}
            </div>
          </div>

          <div className="lg:col-span-4 bg-white border border-slate-200 rounded-xl p-6 space-y-5">
            <h3 className="font-display text-lg font-bold text-slate-900">Parametri dei segmenti</h3>
            <div>
              <div className="flex justify-between text-sm font-medium text-slate-700 mb-1.5">
                <label htmlFor="slider-1m-a">Unità base (A):</label>
                <span className="font-mono font-bold text-sky-800">{segA} cm</span>
              </div>
              <input
                id="slider-1m-a"
                type="range"
                min={5}
                max={40}
                step={1}
                value={segA}
                onChange={(e) => setSegA(Number(e.target.value))}
                className="w-full accent-sky-700 cursor-pointer"
              />
            </div>

            {segMode === 'sum-diff' ? (
              <div>
                <div className="flex justify-between text-sm font-medium text-slate-700 mb-1.5">
                  <label htmlFor="slider-1m-diff">Differenza (D):</label>
                  <span className="font-mono font-bold text-amber-800">{segDiff} cm</span>
                </div>
                <input
                  id="slider-1m-diff"
                  type="range"
                  min={2}
                  max={30}
                  step={2}
                  value={segDiff}
                  onChange={(e) => setSegDiff(Number(e.target.value))}
                  className="w-full accent-amber-600 cursor-pointer"
                />
              </div>
            ) : (
              <div>
                <div className="flex justify-between text-sm font-medium text-slate-700 mb-1.5">
                  <label htmlFor="slider-1m-mult">Rapporto di moltiplicazione:</label>
                  <span className="font-mono font-bold text-sky-800">× {segMult}</span>
                </div>
                <input
                  id="slider-1m-mult"
                  type="range"
                  min={2}
                  max={6}
                  step={1}
                  value={segMult}
                  onChange={(e) => setSegMult(Number(e.target.value))}
                  className="w-full accent-sky-700 cursor-pointer"
                />
              </div>
            )}
          </div>
        </div>
      )}

      {/* ======================= PRIMA MEDIA: MCD E MCM ======================= */}
      {activeTab === '1m-divisibilita' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          <div className="lg:col-span-8 bg-white border border-slate-200 rounded-xl p-6 flex flex-col justify-between space-y-6">
            <div>
              <h2 className="font-display text-xl font-bold text-slate-900">
                Laboratorio MCD e mcm
              </h2>
              <p className="text-xs sm:text-sm text-slate-500">
                MCD = divisione in parti massime uguali | mcm = coincidenza periodica nel tempo
              </p>
            </div>

            <div className="quadretti-bg border border-slate-200 rounded-xl p-6 flex flex-col sm:flex-row items-center justify-around gap-6">
              <div className="text-center p-5 bg-sky-50 border border-sky-200 rounded-xl w-full sm:w-56">
                <p className="text-xs font-bold text-sky-900 uppercase">Massimo Comune Divisore</p>
                <p className="font-mono text-3xl font-extrabold text-sky-950 my-2">
                  MCD({numX}, {numY}) = {currentGcd}
                </p>
                <p className="text-xs text-slate-600">
                  Massimo numero di sacchetti o confezioni identiche senza avanzi!
                </p>
              </div>

              <div className="text-center p-5 bg-emerald-50 border border-emerald-200 rounded-xl w-full sm:w-56">
                <p className="text-xs font-bold text-emerald-900 uppercase">Minimo Comune Multiplo</p>
                <p className="font-mono text-3xl font-extrabold text-emerald-950 my-2">
                  mcm({numX}, {numY}) = {currentLcm}
                </p>
                <p className="text-xs text-slate-600">
                  Momento in cui due eventi ciclici tornano ad allinearsi insieme!
                </p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-700">
              <p className="font-bold text-slate-900">Come scegliere nel testo del problema?</p>
              <p>
                Se il problema parla di <strong>«dividere, tagliare in parti uguali il più grandi possibile»</strong> serve il <strong>MCD</strong>.
                <br />Se parla di <strong>«semafori che lampeggiano insieme, comete o bus che si incontrano di nuovo»</strong> serve il <strong>mcm</strong>.
              </p>
            </div>
          </div>

          <div className="lg:col-span-4 bg-white border border-slate-200 rounded-xl p-6 space-y-5">
            <h3 className="font-display text-lg font-bold text-slate-900">Scegli i due numeri</h3>
            <div>
              <div className="flex justify-between text-sm font-medium text-slate-700 mb-1.5">
                <label htmlFor="slider-num-x">Primo numero (X):</label>
                <span className="font-mono font-bold text-sky-800">{numX}</span>
              </div>
              <input
                id="slider-num-x"
                type="range"
                min={6}
                max={48}
                step={2}
                value={numX}
                onChange={(e) => setNumX(Number(e.target.value))}
                className="w-full accent-sky-700 cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-sm font-medium text-slate-700 mb-1.5">
                <label htmlFor="slider-num-y">Secondo numero (Y):</label>
                <span className="font-mono font-bold text-emerald-800">{numY}</span>
              </div>
              <input
                id="slider-num-y"
                type="range"
                min={6}
                max={48}
                step={2}
                value={numY}
                onChange={(e) => setNumY(Number(e.target.value))}
                className="w-full accent-emerald-600 cursor-pointer"
              />
            </div>
          </div>
        </div>
      )}

      {/* ======================= SECONDA MEDIA: TEOREMA DI PITAGORA ======================= */}
      {activeTab === '2m-pitagora' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          <div className="lg:col-span-8 bg-white border border-slate-200 rounded-xl p-6 flex flex-col justify-between space-y-6">
            <div>
              <div className="inline-block px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold mb-2">
                Programma ufficiale di 2ª Media
              </div>
              <h2 className="font-display text-xl font-bold text-slate-900">
                Il Teorema di Pitagora: c² = a² + b²
              </h2>
              <p className="text-xs sm:text-sm text-slate-500">
                La somma dei quadrati costruiti sui due cateti è esattamente uguale al quadrato costruito sull’ipotenusa!
              </p>
            </div>

            <div className="quadretti-bg border border-slate-200 rounded-xl p-4 flex items-center justify-center">
              <svg viewBox="0 0 420 220" className="w-full max-w-[440px] h-auto">
                {(() => {
                  const scale = 11;
                  const w = catB * scale;
                  const h = catA * scale;
                  const x0 = (420 - w) / 2;
                  const y0 = (200 - h) / 2;
                  return (
                    <>
                      {/* Triangolo rettangolo principale */}
                      <polygon
                        points={`${x0},${y0} ${x0},${y0 + h} ${x0 + w},${y0 + h}`}
                        fill="#E0F2FE"
                        stroke="#0369A1"
                        strokeWidth="3"
                      />
                      {/* Simbolo dell'angolo retto */}
                      <polyline
                        points={`${x0},${y0 + h - 14} ${x0 + 14},${y0 + h - 14} ${x0 + 14},${y0 + h}`}
                        fill="none"
                        stroke="#0F172A"
                        strokeWidth="2"
                      />
                      {/* Etichette cateti e ipotenusa */}
                      <text
                        x={x0 - 12}
                        y={y0 + h / 2}
                        textAnchor="end"
                        fontSize="13"
                        fontWeight="bold"
                        fill="#0F172A"
                        fontFamily="IBM Plex Mono"
                      >
                        a = {catA} m (a² = {sqCatA})
                      </text>
                      <text
                        x={x0 + w / 2}
                        y={y0 + h + 20}
                        textAnchor="middle"
                        fontSize="13"
                        fontWeight="bold"
                        fill="#0F172A"
                        fontFamily="IBM Plex Mono"
                      >
                        b = {catB} m (b² = {sqCatB})
                      </text>
                      <text
                        x={x0 + w / 2 + 10}
                        y={y0 + h / 2 - 8}
                        textAnchor="start"
                        fontSize="14"
                        fontWeight="bold"
                        fill="#0369A1"
                        fontFamily="IBM Plex Mono"
                      >
                        Ipotenusa c = {formatItNumber(hypC)} m
                      </text>
                    </>
                  );
                })()}
              </svg>
            </div>

            <div className="grid grid-cols-3 gap-3 font-mono text-xs sm:text-sm">
              <div className="p-3 rounded-lg bg-sky-50 border border-sky-200">
                <p className="font-sans text-xs text-sky-900 font-semibold">Quadrato su Cateto a</p>
                <p className="text-base font-bold text-sky-950 mt-1">{sqCatA} m²</p>
              </div>
              <div className="p-3 rounded-lg bg-sky-50 border border-sky-200">
                <p className="font-sans text-xs text-sky-900 font-semibold">Quadrato su Cateto b</p>
                <p className="text-base font-bold text-sky-950 mt-1">{sqCatB} m²</p>
              </div>
              <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200">
                <p className="font-sans text-xs text-emerald-900 font-semibold">Quadrato su Ipotenusa c</p>
                <p className="text-base font-bold text-emerald-950 mt-1">
                  {sqHyp} m² (c = {formatItNumber(hypC)} m)
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 bg-white border border-slate-200 rounded-xl p-6 space-y-5">
            <h3 className="font-display text-lg font-bold text-slate-900">Cateti del triangolo</h3>
            <div>
              <div className="flex justify-between text-sm font-medium text-slate-700 mb-1.5">
                <label htmlFor="slider-cat-a">Cateto minore (a):</label>
                <span className="font-mono font-bold text-sky-800">{catA} m</span>
              </div>
              <input
                id="slider-cat-a"
                type="range"
                min={3}
                max={15}
                step={1}
                value={catA}
                onChange={(e) => setCatA(Number(e.target.value))}
                className="w-full accent-sky-700 cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-sm font-medium text-slate-700 mb-1.5">
                <label htmlFor="slider-cat-b">Cateto maggiore (b):</label>
                <span className="font-mono font-bold text-sky-800">{catB} m</span>
              </div>
              <input
                id="slider-cat-b"
                type="range"
                min={4}
                max={20}
                step={1}
                value={catB}
                onChange={(e) => setCatB(Number(e.target.value))}
                className="w-full accent-sky-700 cursor-pointer"
              />
            </div>

            <div className="pt-2">
              <p className="text-xs font-semibold text-slate-500 mb-2">
                Terne Pitagoriche esatte (clicca per impostare):
              </p>
              <div className="flex flex-wrap gap-1.5">
                {[
                  [3, 4],
                  [6, 8],
                  [5, 12],
                  [8, 15],
                  [9, 12],
                ].map(([a, b]) => (
                  <button
                    key={`${a}-${b}`}
                    type="button"
                    onClick={() => {
                      setCatA(a);
                      setCatB(b);
                    }}
                    className="px-2.5 py-1 text-xs font-mono font-semibold bg-slate-100 hover:bg-sky-100 rounded cursor-pointer"
                  >
                    {a} · {b} · {Math.sqrt(a * a + b * b)}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 text-xs text-slate-600 space-y-1.5">
              <p className="font-bold text-slate-900">Perché si studia in 2ª Media?</p>
              <p>
                Perché richiede l’elevamento a potenza al quadrato (²) e l’operazione inversa di radice quadrata (√), applicata alle diagonali dei poligoni (rettangolo, rombo, trapezio).
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ======================= TERZA MEDIA: EQUAZIONI ======================= */}
      {activeTab === '3m-equazioni' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          <div className="lg:col-span-8 bg-white border border-slate-200 rounded-xl p-6 flex flex-col justify-between space-y-6">
            <div>
              <h2 className="font-display text-xl font-bold text-slate-900">
                La Bilancia Algebrica delle Equazioni di Primo Grado
              </h2>
              <p className="text-xs sm:text-sm text-slate-500">
                I due principi di equivalenza mantengono i due piatti sempre in equilibrio
              </p>
            </div>

            <div className="quadretti-bg border border-slate-200 rounded-xl p-6 space-y-6">
              <svg viewBox="0 0 440 180" className="w-full h-auto max-h-56">
                <polygon points="220,130 195,170 245,170" fill="#334155" />
                <line x1="60" y1="130" x2="380" y2="130" stroke="#0F172A" strokeWidth="5" />
                <rect x="40" y="65" width="150" height="54" rx="8" fill="#E0F2FE" stroke="#0284C7" strokeWidth="2.5" />
                <text x="115" y="98" textAnchor="middle" fontSize="18" fontWeight="bold" fill="#0F172A" fontFamily="IBM Plex Mono">
                  {eqStep === 0 ? `${eqCoeff}x + ${eqConst}` : eqStep === 1 ? `${eqCoeff}x` : 'x'}
                </text>
                <text x="220" y="100" textAnchor="middle" fontSize="22" fontWeight="bold" fill="#0284C7">=</text>
                <rect x="250" y="65" width="150" height="54" rx="8" fill="#ECFDF5" stroke="#059669" strokeWidth="2.5" />
                <text x="325" y="98" textAnchor="middle" fontSize="18" fontWeight="bold" fill="#0F172A" fontFamily="IBM Plex Mono">
                  {eqStep === 0 ? `${eqRhs}` : eqStep === 1 ? `${eqRhs - eqConst}` : `${eqX}`}
                </text>
              </svg>

              <div className="flex flex-wrap items-center justify-center gap-2">
                <button
                  type="button"
                  onClick={() => setEqStep(0)}
                  className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg border cursor-pointer ${
                    eqStep === 0 ? 'bg-sky-700 text-white' : 'bg-white text-slate-700'
                  }`}
                >
                  Stato iniziale
                </button>
                <button
                  type="button"
                  onClick={() => setEqStep(1)}
                  className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg border cursor-pointer ${
                    eqStep === 1 ? 'bg-sky-700 text-white' : 'bg-white text-slate-700'
                  }`}
                >
                  1° Principio (−{eqConst} a entrambi)
                </button>
                <button
                  type="button"
                  onClick={() => setEqStep(2)}
                  className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg border cursor-pointer ${
                    eqStep === 2 ? 'bg-emerald-700 text-white' : 'bg-white text-slate-700'
                  }`}
                >
                  2° Principio (: {eqCoeff} a entrambi)
                </button>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 font-mono text-xs sm:text-sm text-slate-800">
              {eqStep === 0 && `Equazione impostata: ${eqCoeff}x + ${eqConst} = ${eqRhs}.`}
              {eqStep === 1 && `Togliamo ${eqConst} da entrambi i lati: ${eqCoeff}x = ${eqRhs - eqConst}.`}
              {eqStep === 2 && `Dividiamo per ${eqCoeff}: x = ${eqX} (Soluzione verificata!).`}
            </div>
          </div>

          <div className="lg:col-span-4 bg-white border border-slate-200 rounded-xl p-6 space-y-5">
            <h3 className="font-display text-lg font-bold text-slate-900">Costruisci equazione</h3>
            <div>
              <div className="flex justify-between text-sm font-medium text-slate-700 mb-1.5">
                <label htmlFor="slider-3m-c">Coefficiente di x:</label>
                <span className="font-mono font-bold text-sky-800">{eqCoeff}</span>
              </div>
              <input
                id="slider-3m-c"
                type="range"
                min={2}
                max={7}
                step={1}
                value={eqCoeff}
                onChange={(e) => {
                  setEqCoeff(Number(e.target.value));
                  setEqStep(0);
                }}
                className="w-full accent-sky-700 cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-sm font-medium text-slate-700 mb-1.5">
                <label htmlFor="slider-3m-k">Termine noto (+b):</label>
                <span className="font-mono font-bold text-amber-800">+{eqConst}</span>
              </div>
              <input
                id="slider-3m-k"
                type="range"
                min={2}
                max={20}
                step={1}
                value={eqConst}
                onChange={(e) => {
                  setEqConst(Number(e.target.value));
                  setEqStep(0);
                }}
                className="w-full accent-amber-600 cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-sm font-medium text-slate-700 mb-1.5">
                <label htmlFor="slider-3m-x">Valore incognito di x:</label>
                <span className="font-mono font-bold text-emerald-800">{eqX}</span>
              </div>
              <input
                id="slider-3m-x"
                type="range"
                min={2}
                max={12}
                step={1}
                value={eqX}
                onChange={(e) => {
                  setEqX(Number(e.target.value));
                  setEqStep(0);
                }}
                className="w-full accent-emerald-600 cursor-pointer"
              />
            </div>
          </div>
        </div>
      )}

      {/* Fallback per tab non ancora selezionati */}
      {activeTab !== '4p-barre' &&
        activeTab !== '4p-frazioni' &&
        activeTab !== '4p-perimetro' &&
        activeTab !== '5p-compravendita' &&
        activeTab !== '5p-area-perimetro' &&
        activeTab !== '1m-segmenti' &&
        activeTab !== '1m-divisibilita' &&
        activeTab !== '2m-pitagora' &&
        activeTab !== '3m-equazioni' && (
          <div className="bg-white border border-slate-200 rounded-xl p-8 text-center space-y-4">
            <h2 className="font-display text-xl font-bold text-slate-900">
              Laboratorio {activeTab.toUpperCase()}
            </h2>
            <p className="text-sm text-slate-600 max-w-xl mx-auto">
              Simulazione interattiva attiva per {profile.buttonLabel}.
            </p>
            <button
              type="button"
              onClick={() => setActiveTab(currentTabs[0].id)}
              className="px-4 py-2 bg-sky-700 text-white font-semibold text-xs rounded-lg cursor-pointer"
            >
              Torna al simulatore principale
            </button>
          </div>
        )}
    </div>
  );
}
