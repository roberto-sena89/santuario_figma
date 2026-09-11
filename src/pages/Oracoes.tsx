import { useEffect, useState } from "react";
import { HandHeart, NotebookPen, Globe, Smartphone, Sparkles } from "lucide-react";
import PageTitle from "../components/ui/PageTitle";
import { CHURCH } from "../data/church";
import {
  listarPedidos,
  publicarPedido,
  orarPor,
  contarTestemunho,
  jaOrei,
  modoMural,
  tempoRelativo,
  CATEGORIAS,
  type Pedido,
} from "../data/oracoes";

type Filtro = "todos" | "orados" | "testemunhos";

export default function Oracoes() {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [filtro, setFiltro] = useState<Filtro>("todos");
  const [modo, setModo] = useState<"kv" | "local">("local");
  const [nome, setNome] = useState("");
  const [categoria, setCategoria] = useState(CATEGORIAS[0]);
  const [texto, setTexto] = useState("");
  const [enviando, setEnviando] = useState(false);
  const [erroForm, setErroForm] = useState("");
  const [testAberto, setTestAberto] = useState<string | null>(null);
  const [testTexto, setTestTexto] = useState("");
  const [votei, setVotei] = useState<string[]>([]);

  useEffect(() => {
    listarPedidos()
      .then((p) => {
        setPedidos(p);
        setModo(modoMural());
      })
      .catch(() => {})
      .finally(() => setCarregando(false));
  }, []);

  // Ponte Devocional → Mural: pré-preenche o pedido com a oração do dia
  useEffect(() => {
    try {
      const v = localStorage.getItem("santuario:oracao_texto");
      if (v && v.trim()) setTexto(v.trim());
      localStorage.removeItem("santuario:oracao_texto");
    } catch {}
  }, []);

  const recarregar = async () => {
    const p = await listarPedidos().catch(() => null);
    if (p) {
      setPedidos(p);
      setModo(modoMural());
    }
  };

  const enviarPedido = async (e: React.FormEvent) => {
    e.preventDefault();
    setErroForm("");
    setEnviando(true);
    try {
      const novo = await publicarPedido(nome, texto, categoria);
      setPedidos((prev) => [novo, ...prev]);
      setModo(modoMural());
      setNome("");
      setTexto("");
      setCategoria(CATEGORIAS[0]);
    } catch (err) {
      setErroForm(err instanceof Error ? err.message : "Não foi possível publicar.");
    } finally {
      setEnviando(false);
    }
  };

  const orar = async (id: string) => {
    try {
      const n = await orarPor(id);
      setPedidos((prev) => prev.map((p) => (p.id === id ? { ...p, oracoes: n } : p)));
      setVotei((v) => [...v, id]);
    } catch (err) {
      if (err instanceof Error && err.message === "JA_ORADO") return;
    }
  };

  const enviarTestemunho = async (id: string) => {
    try {
      const atualizado = await contarTestemunho(id, testTexto);
      setPedidos((prev) => prev.map((p) => (p.id === id ? atualizado : p)));
      setTestAberto(null);
      setTestTexto("");
    } catch (err) {
      alert(err instanceof Error ? err.message : "Não foi possível enviar.");
    }
  };

  const visiveis = pedidos.filter((p) => {
    if (filtro === "testemunhos") return p.testemunho !== null;
    return true;
  });
  const ordenados =
    filtro === "orados"
      ? [...visiveis].sort((a, b) => b.oracoes - a.oracoes)
      : visiveis;
  const totalOracoes = pedidos.reduce((s, p) => s + (p.oracoes || 0), 0);

  return (
    <main id="main-content" className="min-h-screen bg-background pt-16">
      <section className="py-12 sm:py-16">
        <div className="max-w-3xl mx-auto px-4">
          <PageTitle
            eyebrow="Intercessão"
            title="Mural de"
            titleAccent="Oração"
            subtitle="Deixe teu pedido, ore pelos outros e volte para contar o testemunho."
          />

          <div className="flex flex-wrap items-center gap-2 mb-6">
            <span className="inline-flex items-center rounded-full border border-border px-3 py-1 text-xs text-muted-foreground">
              <HandHeart className="mr-1 inline h-3.5 w-3.5" aria-hidden="true" /> {totalOracoes} orações
            </span>
            <span className="inline-flex items-center rounded-full border border-border px-3 py-1 text-xs text-muted-foreground">
              <NotebookPen className="mr-1 inline h-3.5 w-3.5" aria-hidden="true" /> {pedidos.length} pedidos
            </span>
            <span
              title={
                modo === "kv"
                  ? "Pedidos visíveis para todos os visitantes"
                  : "KV ainda não ligado: pedidos visíveis só neste aparelho"
              }
              className="inline-flex items-center rounded-full border border-border px-3 py-1 text-xs text-muted-foreground"
            >
              {modo === "kv" ? (<><Globe className="mr-1 inline h-3.5 w-3.5" aria-hidden="true" /> Mural da comunidade</>) : (<><Smartphone className="mr-1 inline h-3.5 w-3.5" aria-hidden="true" /> Mural neste aparelho</>)}
            </span>
          </div>

          {/* Formulário */}
          <form
            onSubmit={enviarPedido}
            className="rounded-2xl border border-border bg-card p-5 sm:p-6 mb-8"
          >
            <h2 className="font-display text-xl text-foreground mb-4">
              Pedir oração
            </h2>
            <div className="grid sm:grid-cols-2 gap-3 mb-3">
              <div>
                <label htmlFor="oracao-nome" className="block text-sm font-medium text-foreground mb-1.5">
                  Nome
                </label>
                <input
                  id="oracao-nome"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  placeholder="Teu nome (opcional)"
                  maxLength={40}
                  autoComplete="name"
                  className="h-12 rounded-xl border border-border bg-background px-4 text-base text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/70"
                />
              </div>
              <div>
                <label htmlFor="oracao-categoria" className="block text-sm font-medium text-foreground mb-1.5">
                  Categoria
                </label>
                <select
                  id="oracao-categoria"
                  value={categoria}
                  onChange={(e) => setCategoria(e.target.value)}
                  className="h-12 rounded-xl border border-border bg-background px-4 text-base text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/70"
                >
                  {CATEGORIAS.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <label htmlFor="oracao-texto" className="block text-sm font-medium text-foreground mb-1.5">
                Pedido de oração <span className="text-red-500" aria-hidden="true">*</span>
              </label>
              <textarea
                id="oracao-texto"
                value={texto}
                onChange={(e) => setTexto(e.target.value)}
                placeholder="Escreva teu pedido de oração..."
                rows={3}
                maxLength={500}
                required
                aria-describedby="oracao-erro"
                className="w-full rounded-xl border border-border bg-background px-4 py-3 text-base text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/70"
              />
            </div>
            {erroForm && (
              <p id="oracao-erro" role="alert" className="mt-2 text-sm text-red-400">{erroForm}</p>
            )}
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 mt-4">
              <button
                type="submit"
                disabled={enviando || texto.trim().length < 10}
                className="inline-flex h-11 items-center justify-center rounded-full bg-gold px-8 text-sm font-bold text-gold-ink transition-all hover:bg-gold-hover disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/70"
              >
                {enviando ? "Publicando..." : "Publicar pedido"}
              </button>
              <a
                href={`https://wa.me/${CHURCH.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-muted-foreground hover:text-gold hover:underline"
              >
                Prefere sigilo total? Fala direto no WhatsApp →
              </a>
            </div>
          </form>

          {/* Filtros */}
          <div className="flex gap-2 mb-5" role="group" aria-label="Filtrar mural">
            {(
              [
                ["todos", "Todos"],
                ["orados", "Mais orados"],
                ["testemunhos", "Testemunhos"],
              ] as [Filtro, string][]
            ).map(([f, label]) => (
              <button
                key={f}
                aria-pressed={filtro === f}
                onClick={() => setFiltro(f)}
                className={`h-9 rounded-full border px-4 text-xs font-bold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/70 ${
                  filtro === f
                    ? "border-gold/60 bg-gold/15 text-gold"
                    : "border-border text-muted-foreground hover:border-gold/40"
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Lista */}
          {carregando ? (
            <p className="text-sm text-muted-foreground">Carregando mural...</p>
          ) : ordenados.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              Nenhum pedido aqui ainda. Seja o primeiro a publicar acima.
            </p>
          ) : (
            <div className="grid gap-4">
              {ordenados.map((p) => {
                const votado = votei.includes(p.id) || jaOrei(p.id);
                return (
                  <article
                    key={p.id}
                    aria-labelledby={`pedido-${p.id}-nome`}
                    className="rounded-2xl border border-border bg-card p-5"
                  >
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                      <span id={`pedido-${p.id}-nome`} className="font-bold text-foreground">{p.nome}</span>
                      <span aria-hidden="true">·</span>
                      <span>{tempoRelativo(p.criadoEm)}</span>
                      <span
                        className="ml-auto rounded-full border border-gold/30 bg-gold/10 px-2.5 py-0.5 font-semibold text-gold"
                      >
                        {p.categoria}
                      </span>
                    </div>
                    <p className="text-sm text-foreground leading-relaxed mb-3">
                      {p.texto}
                    </p>

                    {p.testemunho && (
                      <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/5 p-3.5 mb-3">
                        <p className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-400 mb-1">
                          <Sparkles className="mr-1 inline h-3.5 w-3.5" aria-hidden="true" /> Testemunho — Deus respondeu
                        </p>
                        <p className="text-sm text-foreground">{p.testemunho.texto}</p>
                      </div>
                    )}

                    <div className="flex flex-wrap items-center gap-2">
                      <button
                        onClick={() => orar(p.id)}
                        disabled={votado}
                        className={`inline-flex h-11 items-center gap-1.5 rounded-full border px-4 text-xs font-bold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/70 ${
                          votado
                            ? "border-gold/50 bg-gold/15 text-gold"
                            : "border-border text-foreground hover:border-gold/50"
                        }`}
                        aria-label={`Orar por este pedido (${p.oracoes} orações)`}
                      >
                        <HandHeart className="h-4 w-4" aria-hidden="true" />
                        {votado ? "Orando" : "Estou orando"} · {p.oracoes}
                      </button>
                      {!p.testemunho && testAberto !== p.id && (
                        <button
                          onClick={() => {
                            setTestAberto(p.id);
                            setTestTexto("");
                          }}
                          aria-label={`Contar testemunho do pedido de ${p.nome}`}
                          className="text-xs font-semibold text-muted-foreground hover:text-gold hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/70 rounded"
                        >
                          <span aria-hidden="true">Deus respondeu? Conta aqui →</span>
                          <span className="sr-only">Deus respondeu? Conta aqui</span>
                        </button>
                      )}
                    </div>

                    {testAberto === p.id && (
                      <div className="mt-3">
                        <label htmlFor={`testemunho-${p.id}`} className="block text-xs font-semibold text-foreground mb-1.5">
                          Teu testemunho
                        </label>
                        <textarea
                          id={`testemunho-${p.id}`}
                          value={testTexto}
                          onChange={(e) => setTestTexto(e.target.value)}
                          placeholder="Conta como Deus respondeu..."
                          rows={2}
                          maxLength={500}
                          className="w-full rounded-xl border border-border bg-background px-4 py-3 text-base text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/70"
                        />
                        <div className="flex gap-2 mt-2">
                          <button
                            onClick={() => enviarTestemunho(p.id)}
                            className="inline-flex h-9 items-center rounded-full bg-gold px-5 text-xs font-bold text-gold-ink hover:bg-gold-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/70"
                          >
                            Publicar testemunho
                          </button>
                          <button
                            onClick={() => setTestAberto(null)}
                            className="text-xs text-muted-foreground hover:underline"
                          >
                            Cancelar
                          </button>
                        </div>
                      </div>
                    )}
                  </article>
                );
              })}
            </div>
          )}

          <div className="mt-8 text-center">
            <button
              onClick={() => {
                setCarregando(true);
                recarregar().finally(() => setCarregando(false));
              }}
              aria-label="Atualizar mural de oração"
              className="text-xs font-semibold text-muted-foreground hover:text-gold hover:underline"
            >
              <span aria-hidden="true">Atualizar mural ↻</span>
              <span className="sr-only">Atualizar mural</span>
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
