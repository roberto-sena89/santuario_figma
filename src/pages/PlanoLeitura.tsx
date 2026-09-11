import { useMemo, useState } from "react";
import { Flame } from "lucide-react";
import PageTitle from "../components/ui/PageTitle";
import {
  PLANO_365,
  diaDoAno,
  getLeituraDoDia,
  carregarDiasLidos,
  marcarDiaLido,
  desmarcarDia,
  calcularStreak,
  selosConquistados,
  type DiaLeitura,
} from "../data/planoLeitura";
import { encodeBibleHash } from "../data/bibleUtils";

const MESES = [
  "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
  "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro",
];
const DIAS_MES = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

/** Agrupa os 365 dias por mês (ano comum). */
function diasPorMes(): { mes: string; dias: DiaLeitura[] }[] {
  const grupos: { mes: string; dias: DiaLeitura[] }[] = [];
  let pos = 0;
  for (let m = 0; m < 12; m++) {
    grupos.push({ mes: MESES[m], dias: PLANO_365.slice(pos, pos + DIAS_MES[m]) });
    pos += DIAS_MES[m];
  }
  return grupos;
}

export default function PlanoLeitura() {
  const hoje = useMemo(() => new Date(), []);
  const ano = hoje.getFullYear();
  const hojeDia = diaDoAno(hoje);
  const leituraHoje = getLeituraDoDia(hoje);

  const [lidos, setLidos] = useState<Set<number>>(() => carregarDiasLidos(ano));
  const [copiado, setCopiado] = useState(false);

  const streak = calcularStreak(lidos, hojeDia);
  const pct = Math.round((lidos.size / 365) * 100);
  const selos = selosConquistados(lidos.size);
  const meses = useMemo(diasPorMes, []);
  const hojeLido = lidos.has(hojeDia);

  const alternar = (dia: number) => {
    setLidos((prev) => {
      const next = new Set(prev);
      if (next.has(dia)) next.delete(dia);
      else next.add(dia);
      try {
        localStorage.setItem(
          `santuario:plano:${ano}`,
          JSON.stringify([...next].sort((a, b) => a - b))
        );
      } catch {}
      return next;
    });
  };

  const marcarHoje = () => {
    if (hojeLido) setLidos(desmarcarDia(ano, hojeDia));
    else setLidos(marcarDiaLido(ano, hojeDia));
  };

  const compartilhar = async () => {
    const texto = `Estou lendo a Bíblia em 365 dias no site do Santuário da Adoração: ${lidos.size}/365 (${pct}%) com ${streak} dias seguidos. Vem comigo? 📖🔥`;
    if (navigator.share) {
      try {
        await navigator.share({ title: "Plano de Leitura", text: texto });
        return;
      } catch {
        /* cancelado */
      }
    }
    try {
      await navigator.clipboard.writeText(texto);
      setCopiado(true);
      setTimeout(() => setCopiado(false), 2500);
    } catch {
      /* ignore */
    }
  };

  return (
    <main id="main-content" tabIndex={-1} className="min-h-screen bg-background pt-16">
      {/* Hero com imagem de fundo - /fotos/plano-de-leitura/1.jpg */}
      <section className="relative overflow-hidden">
        <img
          src="/fotos/plano-de-leitura/1.jpg"
          alt=""
          className="absolute inset-0 w-full h-full object-cover object-center"
          loading="eager"
          width={736}
          height={414}
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-background"
          aria-hidden="true"
        />
        <div className="relative z-10 max-w-4xl mx-auto px-4 py-12 sm:py-16">
          <PageTitle
            eyebrow="Plano de leitura"
            title="Bíblia em"
            titleAccent="365 dias"
            subtitle="Gênesis a Apocalipse, ~3 capítulos por dia. Marque cada dia e construa tua sequência."
          />
        </div>
      </section>
      <section className="pb-12 sm:pb-16">
        <div className="max-w-4xl mx-auto px-4">

          {/* Barra de progresso */}
          <div className="rounded-2xl border border-border bg-card p-5 sm:p-6 mb-6">
            <div className="flex items-center justify-between text-sm mb-2">
              <span className="text-muted-foreground">
                <strong className="text-foreground">{lidos.size}</strong> de 365 dias
              </span>
              <span className="font-bold text-gold-light">{pct}%</span>
            </div>
            <div
              className="h-2.5 rounded-full bg-border overflow-hidden"
              role="progressbar"
              aria-valuenow={pct}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label={`Progresso do plano de leitura: ${lidos.size} de 365 dias, ${pct}% concluído`}
            >
              <div
                className="h-full rounded-full bg-gradient-to-r from-gold to-gold-hover transition-all"
                style={{ width: `${pct}%` }}
              />
            </div>
            <div className="flex flex-wrap items-center gap-2 mt-4">
              <span
                className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-bold ${
                  streak > 0
                    ? "border-gold/40 bg-gold/10 text-gold-light"
                    : "border-border text-muted-foreground"
                }`}
              >
                <Flame className="mr-1 inline h-4 w-4 text-gold" aria-hidden="true" />
                <span className="sr-only">Sequência atual: </span>
                {streak} {streak === 1 ? "dia seguido" : "dias seguidos"}
              </span>
              {selos.map((s) => (
                <span
                  key={s.dias}
                  className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs font-semibold ${
                    s.ok
                      ? "border-gold/40 bg-gold/10 text-gold-light"
                      : "border-border opacity-40 grayscale text-muted-foreground"
                  }`}
                >
                  <span aria-hidden="true">{s.emoji}</span>
                  <span className="sr-only">{s.nome}{s.ok ? ", conquistado" : `, falta ${s.dias} dias`}</span>
                </span>
              ))}
              <button
                onClick={compartilhar}
                aria-live="polite"
                aria-label={copiado ? "Progresso copiado" : "Compartilhar progresso do plano de leitura"}
                className="ml-auto text-xs font-semibold text-gold-light hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/70 rounded"
              >
                {copiado ? "Copiado!" : "Compartilhar progresso"}
              </button>
            </div>
          </div>

          {/* Leitura de hoje */}
          <div className="rounded-2xl border border-gold/30 bg-gradient-to-br from-gold/[0.08] to-transparent p-5 sm:p-6 mb-10">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold-light mb-1">
              Leitura de hoje — dia {hojeDia} de 365
            </p>
            <div className="flex flex-wrap gap-2 my-3">
              {leituraHoje.caps.map((c) => (
                <a
                  key={`${c.bookId}-${c.chapter}`}
                  href={encodeBibleHash(null, c.testament, c.bookId, c.chapter)}
                  aria-label={`Ler ${c.abbr} ${c.chapter} na Bíblia`}
                  className="rounded-full border border-gold/30 bg-background px-3.5 py-1.5 text-sm font-semibold text-foreground transition-all hover:border-gold/60 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/70"
                >
                  {c.abbr} {c.chapter}
                </a>
              ))}
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Toque num capítulo para ler na Bíblia. Depois volte e marque o dia.
            </p>
            <button
              onClick={marcarHoje}
              aria-pressed={hojeLido}
              aria-live="polite"
              className={`inline-flex h-11 items-center justify-center rounded-full px-8 text-sm font-bold transition-all hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/70 ${
                hojeLido
                  ? "border border-emerald-500/50 bg-emerald-500/10 text-emerald-400"
                  : "bg-gold text-gold-ink hover:bg-gold-hover"
              }`}
            >
              <span aria-hidden="true">{hojeLido ? "✓ Dia concluído (desfazer)" : "Marquei como lida"}</span>
              <span className="sr-only">{hojeLido ? "Dia concluído, desfazer" : "Marquei como lida"}</span>
            </button>
          </div>

          {/* Grade do ano */}
          <h2 className="font-display text-2xl text-foreground mb-1">
            O ano inteiro
          </h2>
          <p className="text-sm text-muted-foreground mb-6">
            Toque num dia para marcar ou desmarcar. Dias passados em aberto podem
            ser repostos — constância vence perfeição.
          </p>
          {meses.map((g) => (
            <div key={g.mes} className="mb-5">
              <h3 id={`plano-mes-${g.mes}`} className="text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground mb-2">
                {g.mes}
              </h3>
              <div role="group" aria-labelledby={`plano-mes-${g.mes}`} className="flex flex-wrap gap-1.5">
                {g.dias.map((d, i) => {
                  const lido = lidos.has(d.dia);
                  const ehHoje = d.dia === hojeDia;
                  return (
                    <button
                      key={d.dia}
                      onClick={() => alternar(d.dia)}
                      aria-label={`Dia ${d.dia} de 365 (${d.resumo})${lido ? ", lido" : ""}${ehHoje ? ", hoje" : ""}`}
                      aria-pressed={lido}
                      className={`w-10 h-10 rounded-lg border text-xs font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/70 ${
                        lido
                          ? "border-gold/60 bg-gold/20 text-gold-light"
                          : ehHoje
                            ? "border-gold bg-background text-foreground ring-1 ring-gold/50"
                            : "border-border bg-card text-muted-foreground hover:border-gold/40"
                      }`}
                    >
                      {i + 1}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
