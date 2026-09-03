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
  carregarCultos,
  salvarCultos,
  DIAS_SEMANA_OPCOES,
  SUGESTOES_CULTO,
  papeisParaCulto,
  ORDEM_DIAS,
  type EscalaSemana,
  type EscalaDia,
} from "../data/escala";

const PESSOAS_KEY = "santuario_escala_pessoas";

function carregarPessoas(): string[] {
  try {
    const raw = localStorage.getItem(PESSOAS_KEY);
    if (raw) {
      const arr = JSON.parse(raw) as string[];
      if (Array.isArray(arr)) return [...arr].sort((a,b)=>a.localeCompare(b,"pt-BR"));
    }
  } catch {
    /* ignore */
  }
  return [...PESSOAS_PADRAO].sort((a,b)=>a.localeCompare(b,"pt-BR"));
}

function salvarPessoas(pessoas: string[]) {
  localStorage.setItem(PESSOAS_KEY, JSON.stringify([...pessoas].sort((a,b)=>a.localeCompare(b,"pt-BR"))));
}

function normalize(str: string) {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}

function AuxiliarPicker({
  diaKey,
  papelKey,
  pessoas,
  lista,
  onToggle,
  onAddPessoa,
}: {
  diaKey: string;
  papelKey: string;
  pessoas: string[];
  lista: string[];
  onToggle: (diaKey: string, papelKey: string, nome: string) => void;
  onAddPessoa: (nome: string) => void;
}) {
  const [busca, setBusca] = useState("");
  const [ordem, setOrdem] = useState<"sel" | "az">("az");
  const [filtroCargo, setFiltroCargo] = useState<"todos" | "obreiros" | "diacono" | "presbitero" | "pastor">("todos");

  const cargoDe = (nome: string) => {
    const n = normalize(nome);
    if (n.includes("pastor") || n.startsWith("pr.") || n.includes(" pr.") || n.startsWith("pra.") || n.includes(" pra.")) return "pastor" as const;
    if (n.includes("presbitero")) return "presbitero" as const;
    if (n.includes("diacon")) return "diacono" as const;
    return "obreiros" as const;
  };

  const filtrados = useMemo(() => {
    const b = normalize(busca.trim());
    let arr = pessoas.filter((p) => {
      const matchBusca = b ? normalize(p).includes(b) : true;
      const matchCargo = filtroCargo === "todos" ? true : cargoDe(p) === filtroCargo;
      return matchBusca && matchCargo;
    });
    if (ordem === "az") {
      arr.sort((a, b) => a.localeCompare(b, "pt-BR"));
    } else {
      arr.sort((a, b) => {
        const sa = lista.includes(a);
        const sb = lista.includes(b);
        if (sa !== sb) return sa ? -1 : 1;
        return a.localeCompare(b, "pt-BR");
      });
    }
    return arr;
  }, [pessoas, busca, ordem, lista, filtroCargo]);

  const podeAdicionar =
    busca.trim().length >= 3 &&
    !pessoas.some((p) => normalize(p) === normalize(busca.trim())) &&
    filtrados.length === 0;

  return (
    <div className="space-y-2.5">
      <div className="flex gap-2">
        <div className="relative flex-1">
          <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-foreground/40 text-[13px]" aria-hidden="true">⌕</span>
          <input
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            placeholder="Filtrar (ex: Ana)"
            aria-label={`Filtrar auxiliares de ${diaKey}`}
            className="w-full h-8 rounded-full border border-border/50 bg-card/60 pl-10 pr-9 text-[13px] font-medium text-foreground placeholder:text-foreground/35 focus:border-[#D4A24C]/60 focus:ring-1 focus:ring-[#D4A24C]/20 focus:bg-card focus:outline-none transition-all"
          />
          {busca && (
            <button
              type="button"
              onClick={() => setBusca("")}
              aria-label="Limpar filtro"
              className="absolute right-1.5 top-1/2 -translate-y-1/2 grid h-6 w-6 place-items-center rounded-full text-foreground/40 hover:text-foreground text-xs transition-colors"
            >✕</button>
          )}
        </div>
        <div className="relative">
          <select
            value={filtroCargo}
            onChange={(e) => setFiltroCargo(e.target.value as typeof filtroCargo)}
            aria-label="Filtrar por cargo"
            className="h-9 appearance-none rounded-full border border-border/60 bg-card pl-3.5 pr-8 text-[13px] font-semibold tracking-wide text-foreground shadow-sm focus:border-[#D4A24C] focus:ring-2 focus:ring-[#D4A24C]/20 focus:outline-none transition-all hover:border-[#D4A24C]/25 hover:shadow"
          >
          <option value="todos">Todos ({pessoas.length})</option>
          <option value="obreiros">Obreiros ({pessoas.filter((p)=>{const n=normalize(p); return !n.includes("pastor") && !n.startsWith("pr.") && !n.includes(" pr.") && !n.startsWith("pra.") && !n.includes(" pra.") && !n.includes("presbitero") && !n.includes("diacon");}).length})</option>
          <option value="diacono">Diácono ({pessoas.filter((p)=>normalize(p).includes("diacon")).length})</option>
          <option value="presbitero">Presbítero ({pessoas.filter((p)=>normalize(p).includes("presbitero")).length})</option>
          <option value="pastor">Pastor ({pessoas.filter((p)=>{const n=normalize(p); return n.includes("pastor")||n.startsWith("pr.")||n.includes(" pr.")||n.startsWith("pra.")||n.includes(" pra.");}).length})</option>
        </select>
          <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-foreground/40 text-[11px]" aria-hidden="true">▾</span>
        </div>
        <div className="flex items-center rounded-full border border-border/40 bg-transparent p-0.5">
          <button type="button" onClick={() => setOrdem("sel")} aria-pressed={ordem==="sel"} className={`rounded-full px-2 py-1 text-[11px] font-medium transition-colors ${ordem==="sel" ? "text-[#D4A24C] underline underline-offset-4 decoration-2" : "text-foreground/35 hover:text-foreground/60"}`} title="Selecionados primeiro">✓</button>
          <button type="button" onClick={() => setOrdem("az")} aria-pressed={ordem==="az"} className={`rounded-full px-2 py-1 text-[11px] font-medium transition-colors ${ordem==="az" ? "text-[#D4A24C] underline underline-offset-4 decoration-2" : "text-foreground/35 hover:text-foreground/60"}`} title="Ordem alfabética">A–Z</button>
        </div>
      </div>
      <div className="flex items-center justify-between px-1 py-0.5">
        <span className="text-[11px] font-medium tracking-wide text-foreground/35">{filtrados.length} de {pessoas.length} {filtroCargo!=="todos" ? `• ${filtroCargo}` : ""}{busca ? ` • "${busca}"` : ""}</span>
        {lista.length > 0 && (
          <button type="button" onClick={() => lista.forEach((n) => onToggle(diaKey, papelKey, n))} className="text-[11px] font-medium text-foreground/30 hover:text-red-400/70 transition-colors">limpar seleção</button>
        )}
      </div>
      {filtrados.length === 0 ? (
        <div className="rounded-xl border border-dashed border-border/40 bg-transparent px-4 py-6 text-center">
          <p className="text-xs font-medium text-foreground/40">Nenhum encontrado{podeAdicionar ? "" : " com esse filtro"}.</p>
          {podeAdicionar && (
            <button type="button" onClick={() => { onAddPessoa(busca.trim()); setBusca(""); }} className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-[#D4A24C] hover:text-[#C4933C] transition-colors">＋ Adicionar "{busca.trim()}"</button>
          )}
        </div>
      ) : (
        <div className="flex flex-wrap gap-1.5 max-h-48 overflow-y-auto pr-1 py-1">
          {filtrados.map((p) => {
            const ativo = lista.includes(p);
            return (
              <button
                key={p}
                type="button"
                onClick={() => onToggle(diaKey, papelKey, p)}
                aria-pressed={ativo}
                className={`rounded-full px-3 py-1.5 text-xs font-medium tracking-wide transition-colors focus:outline-none ${ativo ? "bg-[#D4A24C] text-gray-900" : "bg-transparent text-foreground/55 hover:bg-white/[0.06] hover:text-foreground/80 border border-transparent hover:border-white/5"}`}
              >
                {ativo ? "✓ " : ""}{p}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

function CultosManager({ onCultosChange }: { onCultosChange: () => void }) {
  const [cultos, setCultos] = useState<Omit<EscalaDia, "papeis">[]>(() => carregarCultos());
  const [diaKey, setDiaKey] = useState("domingo");
  const [horario, setHorario] = useState("18:00");
  const [titulo, setTitulo] = useState("");
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [filtro, setFiltro] = useState("");

  const salvar = (lista: Omit<EscalaDia, "papeis">[]) => {
    salvarCultos(lista);
    setCultos(carregarCultos());
    onCultosChange();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const t = titulo.trim();
    if (!t) return;
    const diaLabel = DIAS_SEMANA_OPCOES.find((d) => d.key === diaKey)?.label ?? diaKey;
    // key único: dia + slug do titulo (permite 2 cultos no mesmo dia com títulos diferentes)
    const slug = normalize(t).replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 20);
    const key = editIndex !== null ? cultos[editIndex].key : (cultos.some((c) => c.key === diaKey && normalize(c.titulo) === normalize(t)) ? `${diaKey}-${slug}` : diaKey);
    // se já existe key igual e não é edição, cria sufixo
    let finalKey = key;
    if (editIndex === null) {
      let i = 1;
      while (cultos.some((c) => c.key === finalKey)) {
        i++;
        finalKey = `${diaKey}-${slug}-${i}`;
        if (i > 10) break;
      }
      // se diaKey livre, usa ele puro
      if (!cultos.some((c) => c.key === diaKey)) finalKey = diaKey;
      else if (finalKey === diaKey) finalKey = `${diaKey}-${slug}`;
    }
    const novo = { key: finalKey, dia: diaLabel, horario, titulo: t };
    let novaLista: Omit<EscalaDia, "papeis">[];
    if (editIndex !== null) {
      novaLista = cultos.map((c, idx) => (idx === editIndex ? novo : c));
      setEditIndex(null);
    } else {
      novaLista = [...cultos, novo];
    }
    salvar(novaLista);
    setTitulo("");
  };

  const remover = (idx: number) => {
    if (cultos.length <= 1) return;
    if (!confirm(`Remover "${cultos[idx].titulo}"?`)) return;
    const novaLista = cultos.filter((_, i) => i !== idx);
    salvar(novaLista);
  };

  const editar = (idx: number) => {
    const c = cultos[idx];
    const opt = DIAS_SEMANA_OPCOES.find((o) => o.label === c.dia);
    setDiaKey(opt?.key ?? "domingo");
    setHorario(c.horario);
    setTitulo(c.titulo);
    setEditIndex(idx);
  };

  const cancelarEdit = () => {
    setEditIndex(null);
    setTitulo("");
  };

  const filtrados = cultos.filter((c) => {
    if (!filtro.trim()) return true;
    const b = normalize(filtro);
    return normalize(c.titulo).includes(b) || normalize(c.dia).includes(b) || c.horario.includes(b);
  });

  return (
    <div className="mb-6 rounded-[24px] border border-[#D4A24C]/15 bg-gradient-to-br from-card/95 via-card to-card/70 p-6 sm:p-7 shadow-[0_8px_40px_-16px_rgba(212,162,76,0.18),0_4px_16px_rgba(0,0,0,0.2)] backdrop-blur-sm">
      <div className="mb-6 flex items-center gap-4">
        <span className="grid h-11 w-11 flex-shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-[#D4A24C]/20 to-[#D4A24C]/10 text-[20px] shadow-sm shadow-[#D4A24C]/15 ring-1 ring-[#D4A24C]/20" aria-hidden="true">⛪</span>
        <div className="min-w-0 flex-1">
          <h2 className="font-display text-[22px] font-bold leading-none tracking-tight text-foreground">Eventos da Igreja</h2>
          <p className="mt-1.5 text-[13px] font-normal leading-relaxed text-foreground/65">Escolha ou crie o evento — dia, horário e título</p>
        </div>
        <span className="hidden sm:inline-flex items-center rounded-full bg-[#D4A24C] px-3.5 py-1.5 text-xs font-bold tracking-wide text-gray-900 shadow-sm shadow-[#D4A24C]/20">{cultos.length} {cultos.length === 1 ? "evento" : "eventos"}</span>
      </div>

      {/* Tabela */}
      <div className="mb-5 overflow-hidden rounded-2xl border border-border/60 bg-background/40 shadow-sm">
        <div className="flex items-center gap-3 border-b border-[#D4A24C]/15 bg-gradient-to-r from-[#D4A24C]/[0.09] via-[#D4A24C]/[0.04] to-transparent px-4 py-3">
          <div className="relative flex-1">
            <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-foreground/40 text-[13px]" aria-hidden="true">⌕</span>
            <input value={filtro} onChange={(e) => setFiltro(e.target.value)} placeholder="Filtrar culto (ex: Família)" aria-label="Filtrar cultos" className="w-full h-9 rounded-full border border-border/60 bg-card pl-10 pr-9 text-[13px] font-medium text-foreground placeholder:text-foreground/40 focus:border-[#D4A24C] focus:ring-2 focus:ring-[#D4A24C]/20 focus:outline-none transition-all" />
            {filtro && (<button type="button" onClick={() => setFiltro("")} aria-label="Limpar filtro" className="absolute right-1.5 top-1/2 -translate-y-1/2 grid h-7 w-7 place-items-center rounded-full bg-muted text-foreground/60 hover:bg-foreground/10 hover:text-foreground text-xs transition-colors">✕</button>)}
          </div>
          <span className="text-xs font-medium tracking-wide text-foreground/55 hidden sm:block whitespace-nowrap">{filtrados.length} de {cultos.length}</span>
        </div>
        <div className="divide-y divide-border/50">
          {/* header */}
          <div className="hidden sm:grid grid-cols-[1.25fr_96px_1.7fr_148px] gap-3 rounded-t-xl border-b border-[#D4A24C]/20 bg-gradient-to-r from-[#D4A24C]/[0.14] via-[#D4A24C]/[0.08] to-[#D4A24C]/[0.04] px-4 py-3.5 text-[11px] font-bold uppercase tracking-widest text-foreground/65 shadow-sm">
            <span>Dia</span><span>Horário</span><span>Nome do Culto/Ensaio</span><span className="text-right">Ações</span>
          </div>
          {filtrados.map((c, idx) => {
            const realIdx = cultos.indexOf(c);
            const isEdit = editIndex === realIdx;
            return (
              <div key={c.key} className={`grid gap-3 px-4 py-3.5 text-[14px] sm:grid-cols-[1.25fr_96px_1.7fr_148px] sm:items-center ${isEdit ? "bg-[#D4A24C]/[0.09] ring-1 ring-inset ring-[#D4A24C]/20" : "bg-card/40 hover:bg-[#D4A24C]/[0.04]"} transition-colors`}>
                <span className="flex items-center gap-2.5 text-foreground"><span className="grid h-8 w-8 place-items-center rounded-xl bg-[#D4A24C]/10 text-[13px] ring-1 ring-[#D4A24C]/15 flex-shrink-0">{EMOJI_DIA[c.key] ?? EMOJI_DIA[DIAS_SEMANA_OPCOES.find(o=>o.label===c.dia)?.key ?? ""] ?? "📅"}</span><span className="font-medium text-[14px] leading-tight text-foreground">{c.dia}</span><span className="sm:hidden ml-auto inline-flex items-center rounded-full bg-muted px-2.5 py-1 font-mono text-xs font-medium text-foreground/75">{c.horario}</span></span>
                <span className="hidden sm:inline-flex items-center justify-center rounded-full bg-muted/70 border border-border/40 px-2.5 py-1 font-mono text-xs font-medium tracking-wide text-foreground/80 w-fit">{c.horario}</span>
                <span className="font-medium text-[14px] leading-snug text-foreground break-words pr-2" title={c.titulo}>{c.titulo}</span>
                <span className="flex justify-end gap-1.5">
                  <button type="button" onClick={() => editar(realIdx)} aria-label={`Editar ${c.titulo}`} title="Editar nome/horário/dia" className={`inline-flex items-center gap-1 rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all ${isEdit ? "bg-[#D4A24C] text-gray-900 shadow-sm shadow-[#D4A24C]/20" : "bg-card border border-[#D4A24C]/25 text-[#D4A24C] hover:bg-[#D4A24C] hover:text-gray-900 hover:border-transparent shadow-sm"}`}>✎ {isEdit ? "editando" : "Editar"}</button>
                  <button type="button" onClick={() => remover(realIdx)} disabled={cultos.length <= 1} aria-label={`Excluir ${c.titulo}`} title={cultos.length <= 1 ? "Mantenha ao menos 1 culto" : "Excluir culto"} className="inline-flex items-center justify-center h-[30px] w-[30px] rounded-full bg-transparent border border-transparent text-foreground/40 hover:bg-red-500/10 hover:text-red-400 hover:border-red-500/20 disabled:opacity-25 disabled:cursor-not-allowed transition-colors text-[13px]">✕</button>
                </span>
              </div>
            );
          })}
          {filtrados.length === 0 && (<div className="px-4 py-10 text-center"><p className="text-[13px] font-medium text-foreground/60">Nenhum culto encontrado com esse filtro.</p><p className="mt-1 text-xs text-foreground/40">Tente outro termo ou limpe o filtro.</p></div>)}
        </div>
      </div>

      {/* Form criar/editar */}
      <form onSubmit={handleSubmit} className="space-y-2.5 rounded-xl border border-[#D4A24C]/15 bg-gradient-to-r from-[#D4A24C]/[0.09] via-[#D4A24C]/[0.04] to-transparent p-3.5 shadow-sm shadow-[#D4A24C]/5">
        <div className="flex flex-col sm:flex-row gap-2 items-end">
          <label className="flex-1 min-w-0 space-y-1 w-full">
            <span className="text-[11px] font-medium tracking-wide text-foreground/40 ml-1">Dia</span>
            <select value={diaKey} onChange={(e) => setDiaKey(e.target.value)} className="w-full h-9 rounded-full border border-border/40 bg-card/60 px-3.5 text-[13px] font-medium text-foreground focus:border-[#D4A24C]/60 focus:ring-1 focus:ring-[#D4A24C]/20 focus:bg-card focus:outline-none transition-all">
              {DIAS_SEMANA_OPCOES.map((o) => (<option key={o.key} value={o.key}>{o.label}</option>))}
            </select>
          </label>
          <label className="space-y-1 sm:w-[118px] w-full">
            <span className="text-[11px] font-medium tracking-wide text-foreground/40 ml-1">Horário</span>
            <div className="relative">
              <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-foreground/35 text-xs" aria-hidden="true">◷</span>
              <input type="time" value={horario} onChange={(e) => setHorario(e.target.value)} className="w-full h-9 rounded-full border border-border/50 bg-card pl-8 pr-3 text-[13px] font-semibold tracking-wide text-foreground shadow-sm hover:border-[#D4A24C]/20 focus:border-[#D4A24C] focus:ring-2 focus:ring-[#D4A24C]/15 focus:outline-none transition-all" />
            </div>
          </label>
          <label className="flex-[1.6] min-w-0 space-y-1 w-full">
            <span className="text-[11px] font-medium tracking-wide text-foreground/40 ml-1">Nome</span>
            <select value={titulo} onChange={(e) => setTitulo(e.target.value)} className="w-full h-9 rounded-full border border-border/40 bg-card/60 px-3.5 text-[13px] font-medium text-foreground focus:border-[#D4A24C]/60 focus:ring-1 focus:ring-[#D4A24C]/20 focus:bg-card focus:outline-none transition-all">
              <option value="">— Escolha —</option>
              {SUGESTOES_CULTO.map((s) => (<option key={s} value={s}>{s}</option>))}
            </select>
          </label>
          <div className="flex gap-1.5 shrink-0 w-full sm:w-auto">
            <button type="submit" disabled={!titulo.trim()} className="flex-1 sm:flex-none h-9 rounded-full bg-[#D4A24C] px-5 text-xs font-bold tracking-wide text-gray-900 shadow-sm hover:bg-[#C4933C] disabled:opacity-30 disabled:cursor-not-allowed transition-colors">{editIndex !== null ? "Salvar" : "＋ Criar"}</button>
            {editIndex !== null && (<button type="button" onClick={cancelarEdit} className="h-9 rounded-full px-4 text-xs font-medium text-foreground/50 hover:text-foreground transition-colors">Cancelar</button>)}
          </div>
        </div>
        <div className="flex flex-wrap gap-1.5 pt-1">
          {SUGESTOES_CULTO.map((s) => (
            <button key={s} type="button" onClick={() => setTitulo(s)} className={`rounded-full px-2.5 py-1 text-[11px] font-medium tracking-wide transition-colors ${normalize(titulo) === normalize(s) ? "bg-[#D4A24C] text-gray-900" : "bg-transparent text-foreground/45 hover:bg-white/[0.06] hover:text-foreground/75 border border-transparent hover:border-white/5"}`}>{s}</button>
          ))}
        </div>
      </form>
      <p className="mt-3 flex items-start gap-2 rounded-xl bg-transparent border border-border/30 px-3 py-2 text-[11px] leading-relaxed text-foreground/35"><span aria-hidden="true" className="mt-0">💡</span> <span>Alterar cultos recria a escala vazia das próximas semanas — escalas salvas não são apagadas.</span></p>
    </div>
  );
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
  const [buscaPessoas, setBuscaPessoas] = useState("");
  const [filtroCargoPessoas, setFiltroCargoPessoas] = useState<"todos" | "obreiros" | "diacono" | "presbitero" | "pastor">("todos");
  const [ordemPessoas, setOrdemPessoas] = useState<"az" | "orig">("az");

  const semanas = useMemo(() => semanasAoRedor(new Date(), 6), []);

  const [aba, setAba] = useState<"escala" | "cultos" | "pessoas">("escala");

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
    if (!nome) return;
    // dedup por normalize p/ evitar "João" duplicado com acento/caixa
    if (pessoas.some((p) => normalize(p) === normalize(nome))) return;
    setPessoas((prev) => {
      const nova = [...prev, nome].sort((a, b) => a.localeCompare(b, "pt-BR"));
      salvarPessoas(nova);
      return nova;
    });
    setNovaPessoa("");
  };

  const removerPessoa = (nome: string) => {
    setPessoas((prev) => {
      const nova = prev.filter((p) => p !== nome);
      salvarPessoas(nova);
      return nova;
    });
  };

  return (
    <main id="main-content" className="min-h-screen bg-background pt-16">
      <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
        {/* Cabeçalho */}
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4 rounded-[20px] border border-[#D4A24C]/10 bg-gradient-to-br from-card/80 to-card/40 px-5 py-4 sm:px-6 sm:py-5 shadow-[0_4px_24px_rgba(0,0,0,0.15)] backdrop-blur-sm">
          <div className="flex items-center gap-4">
            <span className="grid h-12 w-12 flex-shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-[#D4A24C]/20 to-[#D4A24C]/10 text-[22px] shadow-sm shadow-[#D4A24C]/15 ring-1 ring-[#D4A24C]/20">
              🗓️
            </span>
            <div className="min-w-0">
              <h1 className="font-display text-[26px] font-bold leading-none tracking-tight text-foreground">
                Escala Semanal
              </h1>
              <p className="mt-1.5 text-[13px] font-normal leading-relaxed text-foreground/65">
                Defina os papéis de cada culto da semana
              </p>
            </div>
          </div>
          <button
            onClick={onSair}
            className="inline-flex items-center gap-1.5 h-9 rounded-full border border-border/60 bg-card px-5 text-xs font-semibold tracking-wide text-foreground/70 shadow-sm hover:bg-muted hover:text-foreground hover:border-[#D4A24C]/20 hover:shadow transition-all"
          >
            ↪ Sair
          </button>
        </div>

        {/* Navegação de semanas */}
        <div className="mb-6 rounded-[20px] border border-[#D4A24C]/10 bg-gradient-to-br from-card/80 to-card/40 p-4 sm:p-5 shadow-[0_4px_24px_rgba(0,0,0,0.12)] backdrop-blur-sm">
          <div className="mb-3 flex items-center gap-2 rounded-xl border border-[#D4A24C]/15 bg-gradient-to-r from-[#D4A24C]/[0.11] via-[#D4A24C]/[0.06] to-transparent px-3 py-2.5 shadow-sm shadow-[#D4A24C]/5">
            <span className="grid h-7 w-7 place-items-center rounded-lg bg-[#D4A24C]/15 text-xs ring-1 ring-[#D4A24C]/15">📅</span>
            <span className="text-xs font-bold tracking-widest uppercase text-foreground/55">Semanas</span>
            <span className="ml-auto inline-flex items-center rounded-full bg-[#D4A24C]/10 border border-[#D4A24C]/15 px-2.5 py-1 text-xs font-semibold text-foreground/70">{formatSemana(semana)}</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {semanas.map((s) => (
              <button
                key={s}
                onClick={() => mudarSemana(s)}
                className={`rounded-full border px-3.5 py-2 text-xs font-semibold tracking-wide transition-all ${
                  s === semana
                    ? "bg-[#D4A24C] border-[#D4A24C] text-gray-900 shadow-sm shadow-[#D4A24C]/25 scale-[1.02]"
                    : "bg-card border-border/60 text-foreground/70 hover:bg-muted hover:text-foreground hover:border-[#D4A24C]/20 hover:shadow-sm"
                }`}
              >
                {formatSemana(s)}
              </button>
            ))}
          </div>
        </div>

        {/* Sub-menu Admin — 3 abas */}
        <div className="mb-6 flex rounded-full border border-border/60 bg-card p-1.5 gap-1.5 shadow-sm">
          {([
            { key: "cultos", label: "Eventos da Igreja", icon: "⛪" },
            { key: "escala", label: "Escala Semanal", icon: "🗓️" },
            { key: "pessoas", label: "Pessoas", icon: "👥", count: pessoas.length },
          ] as const).map((t) => {
            const ativo = aba === t.key;
            return (
              <button
                key={t.key}
                type="button"
                onClick={() => setAba(t.key as typeof aba)}
                aria-selected={ativo}
                className={`flex-1 inline-flex items-center justify-center gap-1.5 rounded-full px-4 py-2.5 text-xs font-bold tracking-wide transition-all ${ativo ? "bg-[#D4A24C] text-gray-900 shadow-sm shadow-[#D4A24C]/20" : "text-foreground/60 hover:text-foreground hover:bg-muted"}`}
              >
                <span aria-hidden="true" className="text-[13px]">{t.icon}</span>
                {t.label}
                {"count" in t && <span className={`ml-0.5 rounded-full px-1.5 py-0.5 text-[10px] font-bold ${ativo ? "bg-gray-900/15" : "bg-muted text-foreground/60"}`}>{(t as {count:number}).count}</span>}
              </button>
            );
          })}
        </div>

        {aba === "cultos" && (
          <CultosManager onCultosChange={() => {
          // reconstrói escala da semana atual mesclando papeis já preenchidos
          const cultosAtuais = carregarCultos();
          setEscala((prev) => {
            const mapaPrev = new Map(prev.dias.map((d) => [d.key, d]));
            const novosDias = cultosAtuais.map((c) => {
              const existente = mapaPrev.get(c.key);
              if (existente) return { ...c, papeis: existente.papeis };
              return { ...c, papeis: Object.fromEntries(papeisParaCulto(c.key).map((p) => [p.key, p.multi ? [] : ""])) };
            });
            return { ...prev, dias: novosDias };
          });
        }} />
        )}

        {aba === "escala" && (
        <>
        {/* Escala por dia — agrupado por dia (2 horários no mesmo card) */}
        <div className="space-y-5">
          {(() => {
            const ordemPorDia: Record<string, number> = {};
            DIAS_SEMANA_OPCOES.forEach(o => ordemPorDia[o.label] = ORDEM_DIAS[o.key] ?? 99);
            const grupos = new Map<string, typeof escala.dias>();
            for (const d of escala.dias) {
              const g = grupos.get(d.dia) ?? [];
              g.push(d);
              grupos.set(d.dia, g);
            }
            const gruposOrdenados = Array.from(grupos.entries()).sort((a,b)=>(ordemPorDia[a[0]]??99)-(ordemPorDia[b[0]]??99));
            gruposOrdenados.forEach(([,arr]) => arr.sort((a,b)=>a.horario.localeCompare(b.horario)));
            return gruposOrdenados.map(([diaLabel, dias]) => {
              const baseKey = DIAS_SEMANA_OPCOES.find(o=>o.label===diaLabel)?.key ?? dias[0].key.split("-")[0];
              return (
            <div
              key={diaLabel}
              className="rounded-[22px] border border-[#D4A24C]/10 bg-gradient-to-br from-card/90 via-card to-card/60 p-6 sm:p-7 shadow-[0_4px_24px_rgba(0,0,0,0.12)] backdrop-blur-sm"
            >
              <div className="mb-6 flex items-center gap-4">
                <span className="grid h-12 w-12 flex-shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-[#D4A24C]/20 to-[#D4A24C]/10 text-[22px] shadow-sm shadow-[#D4A24C]/15 ring-1 ring-[#D4A24C]/20">
                  {EMOJI_DIA[baseKey] ?? "📅"}
                </span>
                <div className="min-w-0 flex-1">
                  <h2 className="font-display text-[20px] font-bold leading-none tracking-tight text-foreground">
                    {diaLabel}
                  </h2>
                  <div className="mt-1.5 inline-flex items-center gap-1.5 rounded-full bg-[#D4A24C]/10 border border-[#D4A24C]/15 px-3 py-1 text-xs font-semibold tracking-wide text-foreground/70">
                    <span className="text-[#D4A24C] text-xs" aria-hidden="true">◷</span>
                    {dias.length === 1 ? `${dias[0].horario}` : `${dias.length} horários`}
                  </div>
                </div>
              </div>

              <div className="space-y-6 divide-y divide-border/40">
                {dias.map((dia) => (
                <div key={dia.key} className="pt-5 first:pt-0">
                  <div className="mb-4 flex items-center gap-2">
                    <span className="inline-flex items-center rounded-full bg-[#D4A24C]/10 border border-[#D4A24C]/20 px-3 py-1 text-xs font-bold tracking-wide text-[#B8860B] dark:text-[#E8B35E]">{dia.horario}</span>
                    <span className="text-[13px] font-semibold text-foreground/80 truncate">{dia.titulo}</span>
                    <button type="button" onClick={() => setAba("cultos")} className="ml-auto text-[11px] font-medium text-[#D4A24C] hover:text-[#C4933C] transition-colors">✎ editar</button>
                  </div>

              {(() => {
                const todos = papeisParaCulto(dia.key) ?? [];
                const singles = todos.filter((p) => !p.multi && p.key !== "regente");
                const direita = todos.filter((p) => p.multi || p.key === "regente");
                return (
                  <div className="grid gap-6 sm:grid-cols-2 items-start">
                    {/* Coluna esquerda — papéis single empilhados */}
                    <div className="space-y-5">
                      {singles.map((papel) => {
                        const valor = dia.papeis[papel.key];
                        return (
                          <div key={papel.key}>
                            <div className="mb-2.5 flex items-center gap-2.5">
                              <span className="grid h-8 w-8 place-items-center rounded-xl bg-[#D4A24C]/10 text-[13px] ring-1 ring-[#D4A24C]/15 flex-shrink-0" aria-hidden="true">
                                {PAPEL_EMOJI[papel.key] ?? "👤"}
                              </span>
                              <span className="font-display text-[13px] font-bold tracking-wide text-foreground/85">{papel.label}</span>
                            </div>
                            <select
                              value={typeof valor === "string" ? valor : ""}
                              onChange={(e) => setPapel(dia.key, papel.key, e.target.value)}
                              className="w-full h-9 rounded-full border border-border/60 bg-card px-3.5 text-[13px] font-medium text-foreground shadow-sm focus:border-[#D4A24C] focus:ring-2 focus:ring-[#D4A24C]/20 focus:outline-none hover:border-[#D4A24C]/20 transition-all"
                            >
                              <option value="">— Escolher pessoa —</option>
                              {[...pessoas].sort((a,b)=>a.localeCompare(b,"pt-BR")).map((p) => (<option key={p} value={p}>{p}</option>))}
                            </select>
                          </div>
                        );
                      })}
                    </div>
                    {/* Coluna direita — Auxiliar + Regente abaixo */}
                    <div className="space-y-5 sm:sticky sm:top-4">
                      {direita.map((papel) => {
                        const valor = dia.papeis[papel.key];
                        const isMulti = !!papel.multi;
                        if (isMulti) {
                          const lista = Array.isArray(valor) ? valor : [];
                          return (
                            <div key={papel.key}>
                              <div className="mb-2.5 flex items-center gap-2.5">
                                <span className="grid h-8 w-8 place-items-center rounded-xl bg-[#D4A24C]/10 text-[13px] ring-1 ring-[#D4A24C]/15 flex-shrink-0" aria-hidden="true">
                                  {PAPEL_EMOJI[papel.key] ?? "👤"}
                                </span>
                                <span className="font-display text-[13px] font-bold tracking-wide text-foreground/85">{papel.label}</span>
                                <span className={`ml-auto rounded-full border px-2.5 py-1 text-[11px] font-bold tracking-wide transition-all ${lista.length > 0 ? "bg-[#D4A24C] border-[#D4A24C] text-gray-900 shadow-sm shadow-[#D4A24C]/20" : "bg-card border-border/60 text-foreground/45"}`}>
                                  {lista.length > 0 ? `✓ ${lista.length} ${lista.length === 1 ? "pessoa" : "pessoas"}` : "selecione"}
                                </span>
                              </div>
                              <AuxiliarPicker diaKey={dia.key} papelKey={papel.key} pessoas={pessoas} lista={lista} onToggle={togglePapel} onAddPessoa={(nome) => {
                                if (!nome || pessoas.some((p) => normalize(p) === normalize(nome))) return;
                                setPessoas((prev) => {
                                  const nova = [...prev, nome].sort((a,b)=>a.localeCompare(b,"pt-BR"));
                                  salvarPessoas(nova);
                                  return nova;
                                });
                              }} />
                            </div>
                          );
                        }
                        // Regente de Louvor — single abaixo de Auxiliar
                        return (
                          <div key={papel.key}>
                            <div className="mb-2.5 flex items-center gap-2.5">
                              <span className="grid h-8 w-8 place-items-center rounded-xl bg-[#D4A24C]/10 text-[13px] ring-1 ring-[#D4A24C]/15 flex-shrink-0" aria-hidden="true">
                                {PAPEL_EMOJI[papel.key] ?? "👤"}
                              </span>
                              <span className="font-display text-[13px] font-bold tracking-wide text-foreground/85">{papel.label}</span>
                            </div>
                            <select
                              value={typeof valor === "string" ? valor : ""}
                              onChange={(e) => setPapel(dia.key, papel.key, e.target.value)}
                              className="w-full h-9 rounded-full border border-border/60 bg-card px-3.5 text-[13px] font-medium text-foreground shadow-sm focus:border-[#D4A24C] focus:ring-2 focus:ring-[#D4A24C]/20 focus:outline-none hover:border-[#D4A24C]/20 transition-all"
                            >
                              <option value="">— Escolher pessoa —</option>
                              {[...pessoas].sort((a,b)=>a.localeCompare(b,"pt-BR")).map((p) => (<option key={p} value={p}>{p}</option>))}
                            </select>
                          </div>
                        );
                      })}
                      {direita.length === 0 && <div className="hidden sm:block" />}
                    </div>
                  </div>
                );
              })()}
                </div>
                ))}
              </div>
            </div>
              );
            });
          })()}
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
        </>
        )}

        {aba === "pessoas" && (
        <>
        <div className="rounded-[24px] border border-[#D4A24C]/15 bg-gradient-to-br from-card/95 via-card to-card/70 p-6 sm:p-7 shadow-[0_8px_40px_-16px_rgba(212,162,76,0.18),0_4px_16px_rgba(0,0,0,0.2)] backdrop-blur-sm">
          <div className="mb-6 flex items-center gap-4 rounded-2xl border border-[#D4A24C]/20 bg-gradient-to-r from-[#D4A24C]/[0.11] via-[#D4A24C]/[0.06] to-transparent px-4 py-3.5 shadow-sm shadow-[#D4A24C]/10">
            <span className="grid h-11 w-11 flex-shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-[#D4A24C]/25 to-[#D4A24C]/15 text-[20px] shadow-sm shadow-[#D4A24C]/15 ring-1 ring-[#D4A24C]/25" aria-hidden="true">
              👥
            </span>
            <div className="min-w-0 flex-1">
              <h2 className="font-display text-[22px] font-bold leading-none tracking-tight text-foreground">
                Pessoas disponíveis para escalar
              </h2>
              <p className="mt-1.5 text-[13px] font-normal leading-relaxed text-foreground/65">
                Cadastre quem pode ser escalado nos cultos
              </p>
            </div>
            <span className="hidden sm:inline-flex items-center rounded-full bg-[#D4A24C] px-3.5 py-1.5 text-xs font-bold tracking-wide text-gray-900 shadow-sm shadow-[#D4A24C]/20">
              {pessoas.length} {pessoas.length === 1 ? "pessoa" : "pessoas"}
            </span>
          </div>
          <div className="mb-4 rounded-xl border border-[#D4A24C]/15 bg-[#D4A24C]/[0.06] p-2.5">
            <form onSubmit={adicionarPessoa} className="flex gap-2">
              <input
                value={novaPessoa}
                onChange={(e) => setNovaPessoa(e.target.value)}
                placeholder="Nome da pessoa (ex: Irmão João)"
                className="flex-1 h-9 rounded-full border border-border/60 bg-card px-4 text-[13px] font-medium text-foreground placeholder:text-foreground/40 focus:border-[#D4A24C] focus:ring-2 focus:ring-[#D4A24C]/20 focus:outline-none transition-all"
              />
              <button
                type="submit"
                className="inline-flex items-center gap-1.5 h-9 rounded-full bg-[#D4A24C] px-5 text-[13px] font-bold tracking-wide text-gray-900 shadow-sm shadow-[#D4A24C]/20 transition-all duration-200 hover:bg-[#C4933C] hover:shadow-md hover:shadow-[#D4A24C]/25 active:scale-[0.98]"
              >
                <span aria-hidden="true">＋</span>
                Adicionar
              </button>
            </form>
          </div>
          {/* Filtro e ordenação — mesmo padrão do Auxiliar */}
          {(() => {
            const cargoDeP = (nome: string) => {
              const n = normalize(nome);
              if (n.includes("pastor") || n.startsWith("pr.") || n.includes(" pr.") || n.startsWith("pra.") || n.includes(" pra.")) return "pastor";
              if (n.includes("presbitero")) return "presbitero";
              if (n.includes("diacon")) return "diacono";
              return "obreiros";
            };
            const filtradas = pessoas.filter((p) => {
              const matchBusca = buscaPessoas.trim() ? normalize(p).includes(normalize(buscaPessoas.trim())) : true;
              const matchCargo = filtroCargoPessoas === "todos" ? true : cargoDeP(p) === filtroCargoPessoas;
              return matchBusca && matchCargo;
            });
            const ordenadas = ordemPessoas === "az" ? [...filtradas].sort((a,b)=>a.localeCompare(b,"pt-BR")) : filtradas;
            return (
              <>
                <div className="mb-3 flex gap-2 rounded-xl border border-[#D4A24C]/15 bg-[#D4A24C]/[0.08] p-2.5 shadow-sm shadow-[#D4A24C]/5">
                  <div className="relative flex-1">
                    <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-foreground/40 text-[13px]" aria-hidden="true">⌕</span>
                    <input
                      value={buscaPessoas}
                      onChange={(e) => setBuscaPessoas(e.target.value)}
                      placeholder="Filtrar pessoas (ex: Ana)"
                      aria-label="Filtrar pessoas disponíveis"
                      className="w-full h-9 rounded-full border border-border/60 bg-card pl-10 pr-9 text-[13px] font-medium text-foreground placeholder:text-foreground/40 focus:border-[#D4A24C] focus:ring-2 focus:ring-[#D4A24C]/20 focus:outline-none transition-all"
                    />
                    {buscaPessoas && (
                      <button type="button" onClick={() => setBuscaPessoas("")} aria-label="Limpar filtro" className="absolute right-1.5 top-1/2 -translate-y-1/2 grid h-7 w-7 place-items-center rounded-full bg-muted text-foreground/60 hover:bg-foreground/10 hover:text-foreground text-xs transition-colors">✕</button>
                    )}
                  </div>
                  <div className="flex rounded-full border border-border/60 bg-card p-1">
                    <button type="button" onClick={() => setOrdemPessoas("az")} aria-pressed={ordemPessoas === "az"} className={`rounded-full px-3 py-1 text-xs font-semibold tracking-wide transition-all ${ordemPessoas === "az" ? "bg-[#D4A24C] text-gray-900 shadow-sm" : "text-foreground/60 hover:text-foreground"}`}>A–Z</button>
                    <button type="button" onClick={() => setOrdemPessoas("orig")} aria-pressed={ordemPessoas === "orig"} className={`rounded-full px-3 py-1 text-xs font-semibold tracking-wide transition-all ${ordemPessoas === "orig" ? "bg-[#D4A24C] text-gray-900 shadow-sm" : "text-foreground/60 hover:text-foreground"}`}>Cadastro</button>
                  </div>
                </div>
                <div className="mb-2 flex items-center justify-between px-1">
                  <span className="text-xs font-medium tracking-wide text-foreground/55">{ordenadas.length} de {pessoas.length} {buscaPessoas || filtroCargoPessoas !== "todos" ? "filtrados" : "cadastrados"}</span>
                  {(buscaPessoas || filtroCargoPessoas !== "todos") && (
                    <button type="button" onClick={() => { setBuscaPessoas(""); setFiltroCargoPessoas("todos"); }} className="text-xs font-medium text-foreground/50 hover:text-[#D4A24C] transition-colors">Limpar filtros</button>
                  )}
                </div>
                <div className="mb-3 flex flex-wrap gap-2 rounded-xl border border-[#D4A24C]/15 bg-[#D4A24C]/[0.06] px-3 py-2.5">
                  {([ "todos", "obreiros", "diacono", "presbitero", "pastor"] as const).map((c) => {
                    const label: Record<string,string> = { todos:"Todos", obreiros:"Obreiros", diacono:"Diácono", presbitero:"Presbítero", pastor:"Pastor" };
                    const ativo = filtroCargoPessoas === c;
                    const count = c === "todos" ? pessoas.length : pessoas.filter((p) => cargoDeP(p) === c).length;
                    return (
                      <button key={c} type="button" onClick={() => setFiltroCargoPessoas(c)} aria-pressed={ativo} className={`rounded-full border px-3.5 py-1.5 text-xs font-semibold tracking-wide transition-all ${ativo ? "bg-[#D4A24C] border-[#D4A24C] text-gray-900 shadow-sm shadow-[#D4A24C]/20" : "bg-card border-border/60 text-foreground/65 hover:bg-muted hover:text-foreground hover:border-[#D4A24C]/15"}`}>
                        {label[c]} <span className={`ml-1 rounded-full px-1.5 py-0.5 text-[10px] font-bold ${ativo ? "bg-gray-900/15" : "bg-muted text-foreground/60"}`}>{count}</span>
                      </button>
                    );
                  })}
                </div>
                {ordenadas.length === 0 ? (
                  <div className="rounded-2xl border border-dashed border-border/60 bg-muted/[0.03] px-4 py-8 text-center mb-2">
                    <p className="text-[13px] font-medium text-foreground/60">Nenhuma pessoa encontrada com esse filtro.</p>
                  </div>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {ordenadas.map((p) => (
                      <span key={p} className="group inline-flex items-center gap-2 rounded-full border border-border/60 bg-card px-3.5 py-2 text-xs font-medium text-foreground/80 transition-all duration-200 hover:border-[#D4A24C]/25 hover:bg-[#D4A24C]/[0.06] hover:text-foreground">
                        <span className="h-1.5 w-1.5 rounded-full bg-[#D4A24C]/60 shadow-sm shadow-[#D4A24C]/20 flex-shrink-0" aria-hidden="true" />
                        {p}
                        <button onClick={() => removerPessoa(p)} className="grid h-5 w-5 place-items-center rounded-full text-foreground/40 transition-colors hover:bg-red-500/10 hover:text-red-400" aria-label={`Remover ${p}`}>✕</button>
                      </span>
                    ))}
                  </div>
                )}
              </>
            );
          })()}
          <p className="mt-5 flex items-start gap-2 rounded-xl bg-[#D4A24C]/[0.06] border border-[#D4A24C]/10 px-3.5 py-2.5 text-xs leading-relaxed text-foreground/60">
            <span aria-hidden="true" className="mt-0.5">💾</span> <span>Salvo neste navegador (localStorage). Para aparecer para todos no Vercel, use Exportar abaixo e faça commit.</span>
          </p>
          {/* Exportar PESSOAS_PADRAO p/ Vercel */}
          <div className="mt-4 rounded-xl border border-[#D4A24C]/20 bg-gradient-to-br from-[#D4A24C]/[0.07] to-transparent p-3.5">
            <div className="mb-2 flex items-center gap-2">
              <span className="text-xs font-bold tracking-widest uppercase text-foreground/60">Exportar para o código</span>
              <span className="ml-auto text-[11px] text-foreground/40">{pessoas.length} pessoas</span>
            </div>
            <p className="mb-3 text-xs leading-relaxed text-foreground/55">Copia o array pronto para colar em <code className="rounded bg-muted px-1.5 py-0.5 text-[11px]">src/data/escala.ts → PESSOAS_PADRAO</code> e dar commit/push — aí todo navegador vê.</p>
            <div className="flex flex-wrap gap-2">
              <button type="button" onClick={async () => {
                const sorted = [...pessoas].sort((a,b)=>a.localeCompare(b,"pt-BR"));
                const snippet = `export const PESSOAS_PADRAO: string[] = [\n${sorted.map(s=>`  "${s.replace(/"/g,'\\"')}",`).join("\n")}\n];`;
                try { await navigator.clipboard.writeText(snippet); alert("Copiado! Cole em escala.ts e faça commit."); } catch { prompt("Copie o snippet:", snippet); }
              }} className="inline-flex items-center gap-1.5 h-8 rounded-full bg-[#D4A24C] px-4 text-xs font-bold text-gray-900 shadow-sm hover:bg-[#C4933C] transition-colors">📋 Copiar PESSOAS_PADRAO</button>
              <button type="button" onClick={() => {
                const blob = new Blob([JSON.stringify([...pessoas].sort((a,b)=>a.localeCompare(b,"pt-BR")), null, 2)], { type: "application/json" });
                const url = URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url; a.download = "pessoas.json"; a.click();
                URL.revokeObjectURL(url);
              }} className="inline-flex items-center gap-1.5 h-8 rounded-full border border-border/60 bg-card px-4 text-xs font-semibold text-foreground/70 hover:border-[#D4A24C]/30 hover:text-foreground transition-colors">⬇ Baixar JSON</button>
            </div>
          </div>
        </div>
        </>
        )}
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
