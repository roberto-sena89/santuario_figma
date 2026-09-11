import { useMemo, useState } from "react";
import PageTitle from "../components/ui/PageTitle";
import {
  getRitualDoDia,
  jaDisseAmem,
  dizerAmem,
  streakAmens,
  totalAmens,
} from "../data/ritual";
import {
  generateShareImage,
  shareImage,
} from "../components/bible/ShareImage";

const PASSOS = ["Versículo", "Reflexão", "Aplicação", "Amém", "Compartilhar"];

export default function Momento() {
  const ritual = useMemo(() => getRitualDoDia(), []);
  const [amem, setAmem] = useState(() => jaDisseAmem(ritual.dataISO));
  const [streak, setStreak] = useState(() => streakAmens(ritual.dataISO));
  const [total, setTotal] = useState(() => totalAmens());
  const [copiado, setCopiado] = useState(false);
  const [gerando, setGerando] = useState(false);
  const [imgMsg, setImgMsg] = useState("");

  const dataStr = new Date().toLocaleDateString("pt-BR", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  const textoVerso = `"${ritual.palavra.text}" — ${ritual.palavra.ref}`;

  const copiarVerso = async () => {
    try {
      await navigator.clipboard.writeText(textoVerso);
      setCopiado(true);
      setTimeout(() => setCopiado(false), 2500);
    } catch {
      /* ignore */
    }
  };

  const compartilharTexto = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title: "Momento com Deus", text: textoVerso });
        return;
      } catch {
        /* cancelado */
      }
    }
    copiarVerso();
  };

  const dizerAmemHoje = () => {
    if (amem) return;
    dizerAmem(ritual.dataISO);
    setAmem(true);
    setStreak(streakAmens(ritual.dataISO));
    setTotal(totalAmens());
  };

  const compartilharImagem = async () => {
    setGerando(true);
    setImgMsg("");
    try {
      const blob = await generateShareImage({
        collectionLabel: "Momento com Deus",
        collectionEmoji: "🕊️",
        subtema: {
          id: `momento-${ritual.dataISO}`,
          titulo: ritual.devocional.title,
          descricao: "Momento com Deus",
          versiculoDestaque: {
            texto: ritual.palavra.text,
            referencia: ritual.palavra.ref,
          },
          versiculos: [],
          reflexao: ritual.devocional.body.split("\n\n")[0] ?? "",
          oracao: ritual.devocional.prayer,
        },
        curator: dataStr,
        style: "generico",
      });
      const r = await shareImage(blob, `momento-com-deus-${ritual.dataISO}.png`);
      setImgMsg(
        r === "shared"
          ? "Compartilhado!"
          : "Imagem baixada — envia no WhatsApp/Status 📲"
      );
    } catch {
      setImgMsg("Não foi possível gerar a imagem neste aparelho.");
    } finally {
      setGerando(false);
    }
  };

  return (
    <main id="main-content" tabIndex={-1} className="min-h-screen bg-background pt-16">
      {/* Hero com imagem de fundo - /fotos/momento/1.jpg */}
      <section className="relative overflow-hidden">
        <img
          src="/fotos/momento/1.jpg"
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
        <div className="relative z-10 max-w-3xl mx-auto px-4 py-12 sm:py-16">
          <PageTitle
            eyebrow="Ritual diário"
            title="Momento com"
            titleAccent="Deus"
            subtitle={`${dataStr} — 5 passos, poucos minutos, um dia inteiro de diferença.`}
          />
        </div>
      </section>
      <section className="pb-12 sm:pb-16">
        <div className="max-w-3xl mx-auto px-4">

          {/* Trilha dos passos */}
          <ol
            className="flex items-center gap-1.5 mb-10"
            aria-label="Passos do momento"
          >
            {PASSOS.map((p, i) => (
              <li key={p} className="flex-1 text-center" aria-current={i === 0 ? "step" : undefined}>
                <span
                  className="block h-1.5 rounded-full bg-gold/70 mb-1.5"
                  aria-hidden="true"
                />
                <span className="text-xs font-bold uppercase tracking-[0.14em] text-muted-foreground">
                  {i + 1}. {p}
                </span>
              </li>
            ))}
          </ol>

          {/* 1 — Versículo */}
          <section aria-labelledby="momento-passo-1" className="mb-8 text-center">
            <h2 id="momento-passo-1" className="text-xs font-semibold uppercase tracking-[0.22em] text-gold-light mb-3">
              1 · Medite
            </h2>
            <blockquote>
              <p className="font-display text-2xl sm:text-3xl font-normal text-foreground leading-relaxed italic">
                "{ritual.palavra.text}"
              </p>
            </blockquote>
            <cite className="not-italic block mt-3 text-gold-light font-semibold tracking-[0.06em]">
              {ritual.palavra.ref} · #{ritual.palavra.theme}
            </cite>
            <div className="flex gap-2 justify-center mt-4">
              <button
                onClick={copiarVerso}
                aria-label={copiado ? "Versículo copiado" : "Copiar versículo"}
                aria-live="polite"
                className="h-10 rounded-full border border-border px-5 text-xs font-bold text-foreground transition-all hover:border-gold/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/70"
              >
                {copiado ? "Copiado!" : "Copiar"}
              </button>
              <button
                onClick={compartilharTexto}
                className="h-10 rounded-full border border-border px-5 text-xs font-bold text-foreground transition-all hover:border-gold/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/70"
              >
                Enviar texto
              </button>
            </div>
          </section>

          {/* 2 — Reflexão */}
          <section
            aria-labelledby="momento-passo-2"
            className="rounded-2xl border border-border bg-card p-5 sm:p-7 mb-6"
          >
            <h2 id="momento-passo-2" className="text-xs font-semibold uppercase tracking-[0.22em] text-gold-light mb-2">
              2 · Reflita — {ritual.devocional.title}
            </h2>
            {ritual.devocional.body.split("\n\n").map((par, i) => (
              <p
                key={i}
                className="text-[15px] text-foreground/85 leading-relaxed mb-4 last:mb-0"
              >
                {par}
              </p>
            ))}
            <div className="mt-5 rounded-xl border border-gold/25 bg-gold/5 p-4">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-gold-light mb-1.5">
                Oração
              </p>
              <p className="font-display italic text-[15px] text-foreground/90 leading-relaxed">
                {ritual.devocional.prayer}
              </p>
            </div>
          </section>

          {/* 3 — Aplicação */}
          <section
            aria-labelledby="momento-passo-3"
            className="rounded-2xl border border-gold/30 bg-gradient-to-br from-gold/[0.08] to-transparent p-5 sm:p-6 mb-6"
          >
            <h2 id="momento-passo-3" className="text-xs font-semibold uppercase tracking-[0.22em] text-gold-light mb-2">
              3 · Aplique
            </h2>
            <p className="font-display text-xl text-foreground leading-relaxed">
              {ritual.pergunta}
            </p>
            <p className="text-xs text-muted-foreground mt-2">
              Leva 1 minuto: responde em voz alta ou anota no celular.
            </p>
          </section>

          {/* 4 — Amém */}
          <section
            aria-labelledby="momento-passo-4"
            className="rounded-2xl border border-border bg-card p-5 sm:p-6 mb-6 text-center"
          >
            <h2 id="momento-passo-4" className="text-xs font-semibold uppercase tracking-[0.22em] text-gold-light mb-2">
              4 · Sele o momento
            </h2>
            <button
              onClick={dizerAmemHoje}
              disabled={amem}
              aria-pressed={amem}
              aria-label={amem ? "Amém de hoje registrado" : "Dizer amém ao momento de hoje"}
              className={`inline-flex h-12 items-center justify-center rounded-full px-10 text-sm font-bold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/70 ${
                amem
                  ? "border border-emerald-500/50 bg-emerald-500/10 text-emerald-400"
                  : "bg-gold text-gold-ink hover:bg-gold-hover hover:-translate-y-0.5"
              }`}
            >
              <span aria-hidden="true">{amem ? "🙏 Amém de hoje registrado" : "🙏 Amém"}</span>
              <span className="sr-only">{amem ? "Amém de hoje registrado" : "Amém"}</span>
            </button>
            <p role="status" className="text-sm text-muted-foreground mt-3">
              <span aria-hidden="true">🔥 </span>{streak} {streak === 1 ? "dia seguido" : "dias seguidos"} ·{" "}
              {total} {total === 1 ? "momento" : "momentos"} no total
            </p>
          </section>

          {/* 5 — Compartilhar imagem */}
          <section
            aria-labelledby="momento-passo-5"
            className="rounded-2xl border border-border bg-card p-5 sm:p-6 text-center"
          >
            <h2 id="momento-passo-5" className="text-xs font-semibold uppercase tracking-[0.22em] text-gold-light mb-2">
              5 · Espalhe
            </h2>
            <p className="text-sm text-muted-foreground mb-4">
              Gera uma imagem 1080×1920 do momento de hoje para Status, Stories
              ou WhatsApp.
            </p>
            <button
              onClick={compartilharImagem}
              disabled={gerando}
              aria-busy={gerando}
              className="inline-flex h-11 items-center justify-center rounded-full border border-gold/30 bg-gold/10 px-8 text-sm font-bold text-gold-light transition-all hover:bg-gold/20 disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/70"
            >
              {gerando ? "Gerando imagem..." : "Gerar imagem do dia"}
            </button>
            {imgMsg && (
              <p role="status" className="text-sm text-gold-light font-semibold mt-3">{imgMsg}</p>
            )}
          </section>
        </div>
      </section>
    </main>
  );
}

