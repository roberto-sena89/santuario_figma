import { useMemo, useState } from "react";
import PageTitle from "../components/ui/PageTitle";
import { getQuizDaSemana, mensagemResultado } from "../data/quiz";
import { isoWeek } from "../data/escala";

type Fase = "intro" | "jogo" | "fim";

const bestKey = (quizId: string) => `santuario:quiz:best:${quizId}`;

function lerRecorde(quizId: string): number {
  try {
    return Number(localStorage.getItem(bestKey(quizId)) ?? 0) || 0;
  } catch {
    return 0;
  }
}

export default function Quiz() {
  const semana = useMemo(() => isoWeek(new Date()), []);
  const quiz = useMemo(() => getQuizDaSemana(semana), [semana]);

  const [fase, setFase] = useState<Fase>("intro");
  const [idx, setIdx] = useState(0);
  const [escolhas, setEscolhas] = useState<(number | null)[]>(
    () => Array(quiz.perguntas.length).fill(null)
  );
  const [recorde, setRecorde] = useState(() => lerRecorde(quiz.id));
  const [copiado, setCopiado] = useState(false);
  const [novoRecorde, setNovoRecorde] = useState(false);

  const atual = quiz.perguntas[idx];
  const respondida = escolhas[idx] !== null;
  const acertos = escolhas.filter(
    (e, i) => e !== null && e === quiz.perguntas[i].correta
  ).length;

  const responder = (alt: number) => {
    if (respondida) return;
    setEscolhas((prev) => prev.map((v, i) => (i === idx ? alt : v)));
  };

  const proxima = () => {
    if (idx + 1 < quiz.perguntas.length) {
      setIdx(idx + 1);
    } else {
      const total = acertos;
      if (total > lerRecorde(quiz.id)) {
        try {
          localStorage.setItem(bestKey(quiz.id), String(total));
        } catch {}
        setRecorde(total);
        setNovoRecorde(true);
      }
      setFase("fim");
    }
  };

  const reiniciar = () => {
    setEscolhas(Array(quiz.perguntas.length).fill(null));
    setIdx(0);
    setNovoRecorde(false);
    setFase("jogo");
  };

  const compartilhar = async () => {
    const texto = `Fiz ${acertos}/${quiz.perguntas.length} no Quiz Bíblico "${quiz.tema}" do Santuário da Adoração. Consegue me superar? 📖`;
    if (navigator.share) {
      try {
        await navigator.share({ title: "Quiz Bíblico", text: texto });
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
      window.open(`https://wa.me/?text=${encodeURIComponent(texto)}`, "_blank");
    }
  };

  return (
    <main id="main-content" className="min-h-screen bg-background pt-16">
      {/* Hero com imagem de fundo - /fotos/quiz/1.jpg */}
      <section className="relative overflow-hidden">
        <img
          src="/fotos/quiz/1.jpg"
          alt=""
          className="absolute inset-0 w-full h-full object-cover object-center"
          loading="eager"
          width={736}
          height={552}
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-background"
          aria-hidden="true"
        />
        <div className="relative z-10 max-w-3xl mx-auto px-4 py-12 sm:py-16">
          <PageTitle
            eyebrow="Quiz da semana"
            title="Quiz"
            titleAccent="Bíblico"
            subtitle={`${quiz.tema} — ${quiz.descricao} Semana ${semana}.`}
          />
        </div>
      </section>
      <section className="pb-12 sm:pb-16">
        <div className="max-w-3xl mx-auto px-4">

          {recorde > 0 && fase !== "jogo" && (
            <p className="text-center text-sm text-muted-foreground mb-8">
              🏆 Teu recorde neste tema:{" "}
              <strong className="text-[#D4A24C]">
                {recorde}/{quiz.perguntas.length}
              </strong>
            </p>
          )}

          {/* INTRO */}
          {fase === "intro" && (
            <div className="rounded-2xl border border-border bg-card p-6 sm:p-8 text-center">
              <p className="text-4xl mb-4" aria-hidden="true">📖</p>
              <h2 className="font-display text-2xl text-foreground mb-2">
                {quiz.perguntas.length} perguntas, 1 verdade
              </h2>
              <p className="text-muted-foreground text-sm mb-6">
                Cada resposta vem com a referência bíblica — aqui se aprende
                jogando. Sem cadastro, sem pressa.
              </p>
              <button
                onClick={() => setFase("jogo")}
                className="inline-flex h-11 items-center justify-center rounded-full bg-[#D4A24C] px-8 text-sm font-bold text-[#1A1409] transition-all hover:bg-[#C4933C] hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4A24C]/70"
              >
                Começar o quiz
              </button>
            </div>
          )}

          {/* JOGO */}
          {fase === "jogo" && (
            <div>
              <div className="flex items-center gap-2 mb-4" aria-hidden="true">
                {quiz.perguntas.map((_, i) => (
                  <span
                    key={i}
                    className={`h-1.5 flex-1 rounded-full ${
                      i < idx || (i === idx && respondida)
                        ? "bg-[#D4A24C]"
                        : i === idx
                          ? "bg-[#D4A24C]/50"
                          : "bg-border"
                    }`}
                  />
                ))}
              </div>
              <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground mb-2">
                Pergunta {idx + 1} de {quiz.perguntas.length}
              </p>
              <h2 className="font-display text-xl sm:text-2xl text-foreground mb-5">
                {atual.pergunta}
              </h2>

              <div className="grid gap-3">
                {atual.alternativas.map((alt, i) => {
                  const escolhida = escolhas[idx] === i;
                  const certa = i === atual.correta;
                  let cls =
                    "border-border bg-card hover:border-[#D4A24C]/45 hover:-translate-y-0.5";
                  if (respondida && certa)
                    cls = "border-emerald-500/60 bg-emerald-500/10";
                  else if (respondida && escolhida)
                    cls = "border-red-500/60 bg-red-500/10";
                  else if (respondida) cls = "border-border bg-card opacity-60";
                  return (
                    <button
                      key={i}
                      onClick={() => responder(i)}
                      disabled={respondida}
                      className={`rounded-xl border p-4 text-left text-sm text-foreground transition-all ${cls} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4A24C]/70`}
                    >
                      <span className="mr-2 font-bold text-[#D4A24C]">
                        {["A", "B", "C", "D"][i]}.
                      </span>
                      {alt}
                      {respondida && certa && (
                        <span className="ml-2" aria-hidden="true">✅</span>
                      )}
                      {respondida && escolhida && !certa && (
                        <span className="ml-2" aria-hidden="true">❌</span>
                      )}
                    </button>
                  );
                })}
              </div>

              {respondida && (
                <div className="mt-4 rounded-xl border border-[#D4A24C]/25 bg-[#D4A24C]/5 p-4">
                  <p className="text-sm text-foreground">
                    <strong className="text-[#D4A24C]">{atual.ref}</strong>
                    {" — "}
                    {atual.explica}
                  </p>
                  <button
                    onClick={proxima}
                    className="mt-3 inline-flex h-10 items-center rounded-full bg-[#D4A24C] px-6 text-sm font-bold text-[#1A1409] transition-all hover:bg-[#C4933C] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4A24C]/70"
                  >
                    {idx + 1 < quiz.perguntas.length
                      ? "Próxima pergunta →"
                      : "Ver meu resultado →"}
                  </button>
                </div>
              )}
            </div>
          )}

          {/* RESULTADO */}
          {fase === "fim" && (
            <div>
              <div className="rounded-2xl border border-border bg-card p-6 sm:p-8 text-center mb-6">
                <p className="text-5xl font-display text-[#D4A24C] mb-2">
                  {acertos}/{quiz.perguntas.length}
                </p>
                <p className="text-foreground font-semibold mb-1">
                  {mensagemResultado(acertos, quiz.perguntas.length)}
                </p>
                {novoRecorde && (
                  <p className="text-sm text-[#D4A24C] font-semibold">
                    🏆 Novo recorde pessoal!
                  </p>
                )}
                <div className="flex flex-col sm:flex-row gap-3 justify-center mt-6">
                  <button
                    onClick={compartilhar}
                    className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-[#D4A24C]/30 bg-[#D4A24C]/10 px-6 text-sm font-semibold text-[#D4A24C] transition-all hover:bg-[#D4A24C]/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4A24C]/70"
                  >
                    {copiado ? "Copiado!" : "Desafiar alguém"}
                  </button>
                  <button
                    onClick={reiniciar}
                    className="inline-flex h-11 items-center justify-center rounded-full border border-border px-6 text-sm font-semibold text-foreground transition-all hover:border-[#D4A24C]/45 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4A24C]/70"
                  >
                    Jogar de novo
                  </button>
                </div>
              </div>

              <h3 className="font-display text-xl text-foreground mb-4">
                Gabarito comentado
              </h3>
              <div className="grid gap-3">
                {quiz.perguntas.map((p, i) => (
                  <article
                    key={i}
                    className="rounded-xl border border-border bg-card p-4"
                  >
                    <p className="text-sm font-semibold text-foreground mb-1">
                      {i + 1}. {p.pergunta}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      ✅ {p.alternativas[p.correta]} —{" "}
                      <strong className="text-[#D4A24C]">{p.ref}</strong>
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">
                      {p.explica}
                      {escolhas[i] !== p.correta && (
                        <span className="text-foreground/70">
                          {" "}
                          (Tu marcaste: {p.alternativas[escolhas[i] ?? 0]})
                        </span>
                      )}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
