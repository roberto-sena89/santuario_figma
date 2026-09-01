import { useMemo, useState } from "react";
import {
  carregarEscalas,
  getEscala,
  salvarEscala,
  verificarSenha,
  isoWeek,
  semanasAoRedor,
  formatSemana,
  mondayOfWeek,
  escalaVazia,
  DIAS_ESCALA,
  PAPEIS_POR_DIA,
  PESSOAS_PADRAO,
  EMOJI_DIA,
  PAPEL_EMOJI,
  type EscalaSemana,
} from "../data/escala";

const PESSOAS_KEY = "santuario_escala_pessoas";

function carregarPessoas(): string[] {
  try {
    const raw = localStorage.getItem(PESSOAS_KEY);
    if (raw) return JSON.parse(raw) as string[];
  } catch {
    /* ignore */
  }
  return [...PESSOAS_PADRAO];
}

function salvarPessoas(pessoas: string[]) {
  localStorage.setItem(PESSOAS_KEY, JSON.stringify(pessoas));
}

export default function AdminScale() {
  const [autenticado, setAutenticado] = useState(
    () => sessionStorage.getItem("santuario_admin") === "1"
  );
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState(false);

  if (!autenticado) {
    const submit = (e: React.FormEvent) => {
      e.preventDefault();
      if (verificarSenha(senha)) {
        sessionStorage.setItem("santuario_admin", "1");
        setAutenticado(true);
      } else {
        setErro(true);
      }
    };
    return (
      <main id="main-content" className="min-h-screen bg-background pt-16">
        <div className="mx-auto max-w-md px-4 py-16">
          <div className="rounded-2xl border border-border bg-card/80 backdrop-blur-sm p-8 shadow-sm">
            <div className="mb-6 text-center">
              <span className="mx-auto mb-4 grid h-12 w-12 place-items-center rounded-full bg-[#D4A24C]/15 text-2xl ring-1 ring-[#D4A24C]/30">
                🔐
              </span>
              <h1 className="font-display text-2xl font-semibold text-foreground">
                Painel da Escala
              </h1>
              <p className="mt-1 text-sm text-muted-foreground">
                Acesso restrito ao Pastor e à Pastora
              </p>
            </div>
            <form onSubmit={submit} className="space-y-4">
              <div>
                <label
                  htmlFor="senha"
                  className="mb-1.5 block text-sm font-medium text-foreground"
                >
                  Senha
                </label>
                <input
                  id="senha"
                  type="password"
                  value={senha}
                  onChange={(e) => {
                    setSenha(e.target.value);
                    setErro(false);
                  }}
                  placeholder="Digite a senha"
                  autoComplete="current-password"
                  className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-[#D4A24C] focus:ring-2 focus:ring-[#D4A24C]/25 focus:outline-none"
                />
                {erro && (
                  <p className="mt-1.5 text-xs text-red-500">
                    Senha incorreta. Tente novamente.
                  </p>
                )}
              </div>
              <button
                type="submit"
                className="w-full rounded-xl bg-[#D4A24C] px-4 py-3 text-sm font-semibold text-gray-900 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#C4933C] hover:shadow-lg hover:shadow-[#D4A24C]/30"
              >
                Entrar
              </button>
            </form>
          </div>
        </div>
      </main>
    );
  }

  return <EscalaEditor onSair={() => {
    sessionStorage.removeItem("santuario_admin");
    setAutenticado(false);
  }} />;
}

function EscalaEditor({ onSair }: { onSair: () => void }) {
  const [semana, setSemana] = useState(() => isoWeek(new Date()));
  const [escala, setEscala] = useState<EscalaSemana>(() => getEscala(isoWeek(new Date())));
  const [pessoas, setPessoas] = useState<string[]>(carregarPessoas);
  const [novaPessoa, setNovaPessoa] = useState("");
  const [salvo, setSalvo] = useState(false);

  const semanas = useMemo(() => semanasAoRedor(new Date(), 6), []);

  const mudarSemana = (s: string) => {
    setSemana(s);
    setEscala(getEscala(s));
    setSalvo(false);
  };

  const setPapel = (diaKey: string, papelKey: string, valor: string) => {
    setEscala((prev) => ({
      ...prev,
      dias: prev.dias.map((d) =>
        d.key === diaKey
          ? { ...d, papeis: { ...d.papeis, [papelKey]: valor } }
          : d
      ),
    }));
    setSalvo(false);
  };

  // Para papéis multi (Auxiliar): adiciona ou remove pessoa da lista
  const togglePapel = (diaKey: string, papelKey: string, nome: string) => {
    setEscala((prev) => {
      const dias = prev.dias.map((d) => {
        if (d.key !== diaKey) return d;
        const atual = d.papeis[papelKey];
        const lista = Array.isArray(atual) ? atual : [];
        const nova = lista.includes(nome)
          ? lista.filter((p) => p !== nome)
          : [...lista, nome];
        return { ...d, papeis: { ...d.papeis, [papelKey]: nova } };
      });
      return { ...prev, dias };
    });
    setSalvo(false);
  };

  const salvar = () => {
    salvarEscala({ ...escala, semana });
    setSalvo(true);
    setTimeout(() => setSalvo(false), 2500);
  };

  const adicionarPessoa = (e: React.FormEvent) => {
    e.preventDefault();
    const nome = novaPessoa.trim();
    if (!nome || pessoas.includes(nome)) return;
    const nova = [...pessoas, nome];
    setPessoas(nova);
    salvarPessoas(nova);
    setNovaPessoa("");
  };

  const removerPessoa = (nome: string) => {
    const nova = pessoas.filter((p) => p !== nome);
    setPessoas(nova);
    salvarPessoas(nova);
  };

  return (
    <main id="main-content" className="min-h-screen bg-background pt-16">
      <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
        {/* Cabeçalho */}
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-2xl bg-[#D4A24C]/15 text-xl ring-1 ring-[#D4A24C]/25">
              🗓️
            </span>
            <div>
              <h1 className="font-display text-2xl font-semibold text-foreground">
                Escala Semanal
              </h1>
              <p className="text-sm text-muted-foreground">
                Defina os papéis de cada culto da semana
              </p>
            </div>
          </div>
          <button
            onClick={onSair}
            className="rounded-full border border-border px-4 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:border-[#D4A24C]/50 hover:text-[#B8860B]"
          >
            Sair
          </button>
        </div>

        {/* Navegação de semanas */}
        <div className="mb-6 rounded-2xl border border-border bg-card/80 p-3 backdrop-blur-sm">
          <div className="mb-2 px-1 text-xs font-medium text-muted-foreground">
            {formatSemana(semana)}
          </div>
          <div className="flex flex-wrap gap-1.5">
            {semanas.map((s) => (
              <button
                key={s}
                onClick={() => mudarSemana(s)}
                className={`rounded-full px-3 py-1.5 text-xs font-medium transition-all ${
                  s === semana
                    ? "bg-[#D4A24C] text-gray-900 shadow-sm shadow-[#D4A24C]/30"
                    : "bg-muted/60 text-foreground/70 hover:bg-muted"
                }`}
              >
                {formatSemana(s)}
              </button>
            ))}
          </div>
        </div>

        {/* Escala por dia */}
        <div className="space-y-5">
          {escala.dias.map((dia) => (
            <div
              key={dia.key}
              className="rounded-2xl border border-border bg-card/80 p-6 backdrop-blur-sm"
            >
              <div className="mb-5 flex items-center gap-3.5">
                <span className="grid h-11 w-11 flex-shrink-0 place-items-center rounded-2xl bg-[#D4A24C]/15 text-xl shadow-sm shadow-[#D4A24C]/20 ring-1 ring-[#D4A24C]/25">
                  {EMOJI_DIA[dia.key] ?? "📅"}
                </span>
                <div className="min-w-0">
                  <h2 className="font-display text-xl font-semibold leading-tight tracking-tight text-foreground">
                    {dia.titulo}
                  </h2>
                  <div className="mt-1 inline-flex items-center gap-1.5 rounded-full bg-muted/60 px-2.5 py-0.5 text-[11px] font-medium text-muted-foreground">
                    <span className="text-[#B8860B] dark:text-[#E8B35E]" aria-hidden="true">🕐</span>
                    {dia.dia} às {dia.horario}
                  </div>
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                {(PAPEIS_POR_DIA[dia.key] ?? []).map((papel) => {
                  const valor = dia.papeis[papel.key];
                  const lista = Array.isArray(valor) ? valor : [];
                  return (
                    <div key={papel.key} className={papel.multi ? "sm:col-span-2" : ""}>
                      <div className="mb-2 flex items-center gap-2">
                        <span className="grid h-7 w-7 place-items-center rounded-lg bg-[#D4A24C]/15 text-sm ring-1 ring-[#D4A24C]/20" aria-hidden="true">
                          {PAPEL_EMOJI[papel.key] ?? "👤"}
                        </span>
                        <span className="font-display text-sm font-semibold tracking-tight text-foreground">
                          {papel.label}
                        </span>
                        {papel.multi && (
                          <span
                            className={`ml-auto rounded-full px-2.5 py-1 text-[10px] font-semibold transition-all duration-200 ${
                              lista.length > 0
                                ? "bg-[#D4A24C]/15 text-[#B8860B] ring-1 ring-[#D4A24C]/25 dark:text-[#E8B35E]"
                                : "bg-muted text-muted-foreground/70 ring-1 ring-transparent"
                            }`}
                          >
                            {lista.length > 0
                              ? `✓ ${lista.length} ${lista.length === 1 ? "pessoa" : "pessoas"}`
                              : "selecione"}
                          </span>
                        )}
                      </div>
                      {papel.multi ? (
                        <div className="flex flex-wrap gap-1.5">
                          {pessoas.map((p) => {
                            const ativo = lista.includes(p);
                            return (
                              <button
                                key={p}
                                type="button"
                                onClick={() =>
                                  togglePapel(dia.key, papel.key, p)
                                }
                                className={`rounded-full px-3 py-1.5 text-xs font-medium transition-all duration-200 ${
                                  ativo
                                    ? "bg-[#D4A24C] text-gray-900 shadow-sm shadow-[#D4A24C]/30"
                                    : "bg-muted/60 text-foreground/70 ring-1 ring-transparent hover:bg-muted hover:text-foreground"
                                }`}
                              >
                                {ativo ? "✓ " : ""}{p}
                              </button>
                            );
                          })}
                        </div>
                      ) : (
                        <select
                          value={typeof valor === "string" ? valor : ""}
                          onChange={(e) =>
                            setPapel(dia.key, papel.key, e.target.value)
                          }
                          className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-[#D4A24C] focus:ring-2 focus:ring-[#D4A24C]/25 focus:outline-none"
                        >
                          <option value="">— Escolher pessoa —</option>
                          {pessoas.map((p) => (
                            <option key={p} value={p}>
                              {p}
                            </option>
                          ))}
                        </select>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Salvar */}
        <div className="sticky bottom-4 mt-6">
          <button
            onClick={salvar}
            className={`w-full rounded-xl px-4 py-3.5 text-sm font-semibold shadow-lg transition-all duration-300 hover:-translate-y-0.5 ${
              salvo
                ? "bg-green-600 text-white shadow-green-600/30"
                : "bg-[#D4A24C] text-gray-900 shadow-[#D4A24C]/30 hover:bg-[#C4933C]"
            }`}
          >
            {salvo ? "✓ Escala salva!" : "Salvar escala da semana"}
          </button>
        </div>

        {/* Pessoas cadastradas */}
        <div className="mt-8 rounded-2xl border border-border bg-card/80 p-6 backdrop-blur-sm">
          <div className="mb-5 flex items-center gap-3">
            <span className="grid h-10 w-10 flex-shrink-0 place-items-center rounded-xl bg-[#D4A24C]/15 text-lg shadow-sm shadow-[#D4A24C]/20 ring-1 ring-[#D4A24C]/25" aria-hidden="true">
              👥
            </span>
            <div className="min-w-0">
              <h2 className="font-display text-xl font-semibold leading-tight tracking-tight text-foreground">
                Pessoas disponíveis para escalar
              </h2>
              <p className="text-xs text-muted-foreground">
                Cadastre quem pode ser escalado nos cultos
              </p>
            </div>
            <span className="ml-auto inline-flex items-center gap-1 rounded-full bg-[#D4A24C]/15 px-3 py-1 text-xs font-semibold text-[#B8860B] ring-1 ring-[#D4A24C]/25 dark:text-[#E8B35E]">
              {pessoas.length} {pessoas.length === 1 ? "pessoa" : "pessoas"}
            </span>
          </div>
          <form onSubmit={adicionarPessoa} className="mb-5 flex gap-2">
            <input
              value={novaPessoa}
              onChange={(e) => setNovaPessoa(e.target.value)}
              placeholder="Nome da pessoa (ex: Irmão João)"
              className="flex-1 rounded-xl border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-[#D4A24C] focus:ring-2 focus:ring-[#D4A24C]/25 focus:outline-none"
            />
            <button
              type="submit"
              className="inline-flex items-center gap-1.5 rounded-xl bg-[#D4A24C] px-5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm shadow-[#D4A24C]/25 transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#C4933C] hover:shadow-md hover:shadow-[#D4A24C]/35 active:scale-[0.98]"
            >
              <span aria-hidden="true">＋</span>
              Adicionar
            </button>
          </form>
          <div className="flex flex-wrap gap-2">
            {pessoas.map((p) => (
              <span
                key={p}
                className="group inline-flex items-center gap-1.5 rounded-full border border-border bg-muted/50 px-3 py-1.5 text-xs text-foreground transition-colors duration-200 hover:border-[#D4A24C]/40 hover:bg-[#D4A24C]/5"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-[#D4A24C]/50" aria-hidden="true" />
                {p}
                <button
                  onClick={() => removerPessoa(p)}
                  className="grid h-4 w-4 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-red-500/10 hover:text-red-500"
                  aria-label={`Remover ${p}`}
                >
                  ✕
                </button>
              </span>
            ))}
          </div>
          <p className="mt-4 flex items-center gap-1.5 text-[11px] text-muted-foreground">
            <span aria-hidden="true">💾</span>
            A lista é salva neste navegador e usada em todos os papéis e semanas.
          </p>
        </div>
      </div>
    </main>
  );
}

/** Re-export para uso na página Cultos (escala da semana atual). */
export function getEscalaAtual() {
  const semana = isoWeek(new Date());
  return { semana, escala: getEscala(semana) };
}

export { mondayOfWeek };
