import { useState, useMemo } from "react";
import { getDevotionalByDate, getAllDevotionals, getDevotionalsByMonth } from "../data/devotionals";
import { BIBLE_BOOKS } from "../data/bibleBooks";
import { encodeBibleHash } from "../data/bibleUtils";

const WALLPAPERS = [
  "/fotos/devocional/1.jpg",
  "/fotos/devocional/2.jpg",
];

function formatLongDate(d: Date) {
  return d.toLocaleDateString("pt-BR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function addDays(d: Date, n: number) {
  const x = new Date(d);
  x.setDate(x.getDate() + n);
  return x;
}

const norm = (s: string) =>
  s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().trim();

/**
 * Converte "João 3:16" / "1 Tessalonicenses 5:18" / "Lamentações 3:22-23"
 * no deep-link da Bíblia (#/testament:NT/book:43/chapter:3).
 * Cai para "#/biblia" se a referência não for reconhecida.
 */
function verseRefToBibleHash(ref: string): string {
  const m = ref.match(/^(.+?)\s+(\d+)(?::.*)?$/);
  if (!m) return "#/biblia";
  const bookName = norm(m[1]);
  const chapter = parseInt(m[2], 10);
  const book = BIBLE_BOOKS.find(
    (b) => norm(b.pt) === bookName || norm(b.abbr) === bookName
  );
  if (!book || isNaN(chapter)) return "#/biblia";
  return encodeBibleHash(null, book.testament, book.id, chapter);
}

export default function Devocional() {
  const [baseDate, setBaseDate] = useState(() => new Date());
  const [copied, setCopied] = useState<string | null>(null);
  const [archiveYear, setArchiveYear] = useState(() => new Date().getFullYear());
  const [archiveMonth, setArchiveMonth] = useState(() => new Date().getMonth() + 1);
  const [archivePage, setArchivePage] = useState(1);

  const devotional = useMemo(() => getDevotionalByDate(baseDate), [baseDate]);
  const wallpaper = useMemo(() => {
    // rotaciona wallpaper pelo dia do ano
    const start = new Date(baseDate.getFullYear(), 0, 1);
    const dayOfYear = Math.floor((baseDate.getTime() - start.getTime()) / 86400000);
    return WALLPAPERS[Math.abs(dayOfYear) % WALLPAPERS.length];
  }, [baseDate]);

  const dateStr = formatLongDate(baseDate);
  const isoDate = baseDate.toISOString().split("T")[0];

  const copy = async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(key);
      setTimeout(() => setCopied(null), 2200);
    } catch {}
  };

  // Arquivo mensal - replica devocionaldiario.com.br ?nMes=&nAno=&pg=
  const archiveItems = useMemo(() => getDevotionalsByMonth(archiveYear, archiveMonth), [archiveYear, archiveMonth]);
  const perPage = 5;
  const totalPages = Math.max(1, Math.ceil(archiveItems.length / perPage));
  const paginated = useMemo(() => archiveItems.slice((archivePage - 1) * perPage, archivePage * perPage), [archiveItems, archivePage]);
  const monthNames = ["Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"];

  return (
    <main id="main-content" tabIndex={-1} className="min-h-screen bg-background pt-16">
      {/* Hero - replica estrutura Palavra do Dia mas com wallpaper do devocional */}
      <section className="relative py-12 sm:py-14 overflow-hidden" aria-label="Devocional do dia">
        <img
          src={wallpaper}
          alt=""
          className="absolute inset-0 w-full h-full object-cover object-center"
          loading="eager"
          width={1280}
          height={960}
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-black/80" aria-hidden="true" />
        <div className="absolute inset-0 opacity-20" aria-hidden="true" style={{ background: "radial-gradient(ellipse at center top, rgba(212,162,76,0.35), transparent 70%)" }} />
        <div className="relative z-10 max-w-3xl mx-auto px-4 text-center">
          <p className="inline-flex items-center justify-center rounded-full border border-gold/25 bg-gradient-to-r from-gold/15 to-gold-hover/10 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-gold mb-3 shadow-md shadow-black/20 backdrop-blur-sm">
            Devocional Diário
          </p>
          <div className="mt-1 flex items-center justify-center gap-3">
            <span aria-hidden="true" className="h-px w-8 bg-white/20" />
            <time className="text-[12px] font-medium uppercase tracking-[0.18em] text-white/70" dateTime={isoDate}>
              {dateStr}
            </time>
            <span aria-hidden="true" className="h-px w-8 bg-white/20" />
          </div>

          <h1 className="font-display text-2xl sm:text-3xl font-semibold text-white mt-5 mb-3 [text-shadow:0_2px_14px_rgba(0,0,0,0.85)]">
            {devotional.title}
          </h1>

          <blockquote className="mt-4 mb-2">
            <p className="font-display text-lg sm:text-xl lg:text-2xl font-normal text-white leading-relaxed italic [text-shadow:0_2px_14px_rgba(0,0,0,0.85)]">
              &ldquo;{devotional.verse}&rdquo;
            </p>
          </blockquote>
          <cite className="not-italic block text-gold-light font-semibold text-sm tracking-[0.06em] [text-shadow:0_1px_8px_rgba(0,0,0,0.85)]">
            {devotional.verseRef}
          </cite>
          <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/60">#{devotional.theme}</p>
          {/* LINK INTERNO 1 — Devocional → Bíblia (abre o capítulo da referência) */}
          <a
            href={verseRefToBibleHash(devotional.verseRef)}
            className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-gold/40 bg-gold/15 px-4 py-1.5 text-xs font-bold text-gold-light backdrop-blur-sm transition-colors hover:bg-gold/30 hover:text-white"
          >
            📖 Ler {devotional.verseRef} na Bíblia →
          </a>

          {/* Navegação de dias - como devocionaldiario Anterior/Próximo */}
          <div className="flex items-center justify-center gap-2 mt-6">
            <button
              onClick={() => setBaseDate((d) => addDays(d, -1))}
              className="inline-flex h-9 items-center justify-center rounded-full border border-white/20 bg-white/10 px-4 text-xs font-semibold text-white backdrop-blur-sm hover:bg-white/15 transition-colors"
              aria-label="Devocional anterior"
            >
              ← Anterior
            </button>
            <button
              onClick={() => setBaseDate(new Date())}
              className="inline-flex h-9 items-center justify-center rounded-full border border-gold/30 bg-gold/15 px-4 text-xs font-semibold text-gold backdrop-blur-sm hover:bg-gold/25 transition-colors"
            >
              Hoje
            </button>
            <button
              onClick={() => setBaseDate((d) => addDays(d, 1))}
              className="inline-flex h-9 items-center justify-center rounded-full border border-white/20 bg-white/10 px-4 text-xs font-semibold text-white backdrop-blur-sm hover:bg-white/15 transition-colors"
              aria-label="Próximo devocional"
            >
              Próximo →
            </button>
          </div>

        </div>
      </section>

      {/* Conteúdo: Pensamento + Oração - fiel ao devocionaldiario.com.br */}
      <section className="py-10 sm:py-14 bg-background">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-[1.7fr_0.9fr] gap-8">
            {/* Coluna principal */}
            <div className="space-y-8 min-w-0">
              {/* Pensamento */}
              <article className="rounded-2xl border border-border/60 bg-card/60 backdrop-blur-sm overflow-hidden">
                <div className="px-6 sm:px-8 py-6 border-b border-border/60 bg-gradient-to-r from-gold/[0.07] to-transparent">
                  <div className="flex items-center gap-2">
                    <span className="h-1 w-6 rounded-full bg-gold" aria-hidden="true" />
                    <h2 className="text-[11px] font-bold uppercase tracking-[0.22em] text-gold-light">Pensamento</h2>
                  </div>
                </div>
                <div className="px-6 sm:px-8 py-6 sm:py-7">
                  <div className="prose prose-neutral dark:prose-invert max-w-none">
                    {devotional.body.split("\n\n").map((para, i) => (
                      <p key={i} className="text-[15px] sm:text-[16px] leading-[1.85] text-foreground/90 mb-4 last:mb-0">
                        {para}
                      </p>
                    ))}
                  </div>
                </div>
              </article>

              {/* Oração */}
              <article className="rounded-2xl border border-gold/25 bg-gradient-to-br from-gold/[0.08] via-card/70 to-card/60 backdrop-blur-sm overflow-hidden">
                <div className="px-6 sm:px-8 py-6 border-b border-gold/20">
                  <div className="flex items-center gap-2">
                    <span className="grid h-7 w-7 place-items-center rounded-full bg-gold/20 text-gold-dark" aria-hidden="true">
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 21c-4-4-8-6.5-8-10a4 4 0 018-2 4 4 0 018 2c0 3.5-4 6-8 10z" /></svg>
                    </span>
                    <h2 className="text-[11px] font-bold uppercase tracking-[0.22em] text-gold-dark">Oração</h2>
                  </div>
                </div>
                <div className="px-6 sm:px-8 py-6">
                  <p className="text-[15px] sm:text-[16px] leading-[1.85] text-foreground/90 italic">
                    {devotional.prayer}
                  </p>
                  <div className="mt-6 flex flex-wrap gap-3">
                    <button
                      onClick={() => copy(devotional.prayer, "prayer")}
                      className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-4 py-2 text-xs font-semibold text-gold-dark hover:bg-gold/20 transition-colors"
                    >
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                      {copied === "prayer" ? "Copiada!" : "Copiar oração"}
                    </button>
                    {/* LINK INTERNO 2 — Devocional → Mural de Oração (pré-preenche o pedido) */}
                    <a
                      href="#/oracoes"
                      onClick={() => {
                        try { localStorage.setItem("santuario:oracao_texto", devotional.prayer); } catch {}
                      }}
                      className="inline-flex items-center gap-2 rounded-full bg-gold px-4 py-2 text-xs font-bold text-gray-900 shadow-md shadow-gold/25 transition-colors hover:bg-gold-hover"
                    >
                      🙏 Compartilhar no Mural de Oração →
                    </a>
                  </div>
                </div>
              </article>
            </div>

            {/* Sidebar - Ações como no original */}
            <aside className="space-y-6">
              {/* Navegação por dias - mini arquivo */}
              <div className="rounded-2xl border border-border/60 bg-card/50 p-5">
                <h3 className="text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground mb-3">Devocionais recentes</h3>
                <div className="space-y-2">
                  {getAllDevotionals().slice(0, 6).map((d) => (
                    <button
                      key={d.index}
                      onClick={() => {
                        const start = new Date(2024, 0, 1);
                        const target = new Date(start.getTime() + d.index * 86400000);
                        // mapeia para data próxima mantendo o mesmo devocional
                        const today = new Date();
                        const offset = d.index - (Math.floor((today.getTime() - start.getTime()) / 86400000) % 7);
                        setBaseDate(addDays(today, offset));
                      }}
                      className="w-full text-left rounded-xl border border-border/50 bg-background/60 px-4 py-3 hover:border-gold/30 hover:bg-gold/5 transition-colors group"
                    >
                      <p className="text-xs font-semibold text-foreground group-hover:text-gold-dark line-clamp-1">{d.title}</p>
                      <p className="text-[11px] text-muted-foreground line-clamp-1">{d.verseRef} • {d.theme}</p>
                    </button>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Arquivo - replica devocionaldiario.com.br: Devocionais por mês/ano + paginação */}
      <section className="py-10 sm:py-14 bg-muted/40 border-t border-border/40" aria-label="Arquivo de devocionais">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-gold-dark mb-2">Arquivo</p>
              <h2 className="font-display text-2xl sm:text-3xl font-semibold text-foreground">Devocionais</h2>
              <p className="text-sm text-muted-foreground mt-1">Navegue por mês e ano como no devocionaldiario.com.br — {archiveItems.length} devocionais em {monthNames[archiveMonth-1]} de {archiveYear}</p>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => { let m=archiveMonth-1, y=archiveYear; if(m<1){m=12;y--;} setArchiveMonth(m); setArchiveYear(y); setArchivePage(1); }} className="h-9 w-9 grid place-items-center rounded-full border border-border bg-background hover:border-gold/30" aria-label="Mês anterior">‹</button>
              <span className="min-w-[140px] text-center rounded-full border border-gold/20 bg-gold/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-gold-dark">{monthNames[archiveMonth-1]} {archiveYear}</span>
              <button onClick={() => { let m=archiveMonth+1, y=archiveYear; if(m>12){m=1;y++;} setArchiveMonth(m); setArchiveYear(y); setArchivePage(1); }} className="h-9 w-9 grid place-items-center rounded-full border border-border bg-background hover:border-gold/30" aria-label="Próximo mês">›</button>
            </div>
          </div>

          {/* Seletor de anos/meses - estilo devocionaldiario */}
          <div className="rounded-2xl border border-border/60 bg-card/60 p-4 sm:p-5 mb-8">
            <div className="flex flex-wrap gap-2 mb-4">
              {[2026,2025,2024].map(y => (
                <button key={y} onClick={() => { setArchiveYear(y); setArchivePage(1); }} className={`rounded-full px-4 py-1.5 text-xs font-bold border transition-colors ${y===archiveYear ? "bg-gold text-gray-900 border-gold" : "bg-background border-border text-muted-foreground hover:border-gold/30"}`}>{y}</button>
              ))}
            </div>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
              {monthNames.map((m,i) => (
                <button key={m} onClick={() => { setArchiveMonth(i+1); setArchivePage(1); }} className={`rounded-full px-3 py-2 text-xs font-semibold border transition-colors ${i+1===archiveMonth ? "bg-gold/15 border-gold/30 text-gold-dark" : "bg-background border-border/60 text-foreground/80 hover:border-gold/20"}`}>› {m} {archiveYear}</button>
              ))}
            </div>
          </div>

          {/* Lista paginada */}
          <div className="space-y-4">
            {paginated.map((item) => (
              <article key={item.dateObj.toISOString()} className="group rounded-2xl border border-border/60 bg-card/70 p-5 sm:p-6 hover:border-gold/30 hover:shadow-md transition-all">
                <div className="flex items-center gap-2 mb-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-muted px-3 py-1 text-[11px] font-semibold text-muted-foreground">
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                    {item.dateObj.toLocaleDateString("pt-BR", { day: "2-digit", month: "short", year: "numeric" })}
                  </span>
                  <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-gold">#{item.theme}</span>
                </div>
                <h3 className="font-display font-semibold text-foreground group-hover:text-gold-dark">{item.title}</h3>
                <p className="text-sm italic text-muted-foreground mt-1 line-clamp-2">&ldquo;{item.verse.slice(0,140)}...&rdquo; — {item.verseRef}</p>
                <p className="text-sm text-foreground/80 mt-2 line-clamp-2">{item.body.slice(0,160)}...</p>
                <button onClick={() => { setBaseDate(new Date(item.dateObj)); window.scrollTo({ top: 0, behavior: "smooth" }); }} className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-gold-dark hover:gap-1.5 transition-all">Ler devocional →</button>
              </article>
            ))}
          </div>

          {/* Paginação - réplica ?pg= */}
          <div className="flex items-center justify-center gap-2 mt-8">
            <span className="text-xs text-muted-foreground mr-2">Páginas:</span>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
              <button key={p} onClick={() => setArchivePage(p)} className={`h-8 min-w-8 rounded-full px-3 text-xs font-bold border ${p===archivePage ? "bg-gold text-gray-900 border-gold" : "bg-background border-border text-muted-foreground hover:border-gold/30"}`}>{p}</button>
            ))}
            {totalPages > 1 && <span className="text-xs text-muted-foreground ml-2">({archiveItems.length} no mês)</span>}
          </div>
        </div>
      </section>

      {/* Rodapé devocional - como no original: convite a meditar diariamente */}
      <section className="py-10 bg-muted/30 border-t border-border/40">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <p className="text-sm leading-relaxed text-muted-foreground">
            A proposta do <span className="font-semibold text-foreground">Devocional Diário</span> é incentivá-lo a buscar transformação e crescimento espiritual através da oração, meditação e estudo da Palavra. Dedique todos os dias um tempo a Deus e veja como Ele é fiel para recompensá-lo além do que você imagina.
          </p>
          <p className="text-xs text-muted-foreground/70 mt-3">Baseado em devocionaldiario.com.br — adaptado ao design Santuário da Adoração. 90 devocionais • arquivo 2024-2026</p>
        </div>
      </section>
    </main>
  );
}

