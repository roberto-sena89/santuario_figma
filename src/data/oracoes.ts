/**
 * MURAL DE ORAÇÃO — client com fallback local.
 * Tenta /api/oracoes (KV compartilhado); se o KV não estiver configurado
 * (501) ou a rede falhar, usa o mural local (localStorage deste navegador).
 * Quando o KV for ligado na Vercel, o mural vira comunitário sem mudar código.
 */

export interface Testemunho {
  texto: string;
  em: number;
}

export interface Pedido {
  id: string;
  nome: string;
  texto: string;
  categoria: string;
  criadoEm: number;
  oracoes: number;
  testemunho: Testemunho | null;
}

export const CATEGORIAS = ["Saúde", "Família", "Gratidão", "Libertação", "Outro"];

const KEY_LOCAL = "santuario:oracoes:locais";
const KEY_VOTEI = "santuario:oracoes:votei";
const KEY_MODO = "santuario:oracoes:modo"; // "kv" | "local"

const SEMENTES: Pedido[] = [
  {
    id: "semente-1",
    nome: "Equipe de Intercessão",
    texto:
      "Toda terça oramos pelos pedidos deste mural. Deixe o teu — nenhum pedido é pequeno demais para Deus.",
    categoria: "Outro",
    criadoEm: Date.now() - 6 * 86400000,
    oracoes: 12,
    testemunho: null,
  },
  {
    id: "semente-2",
    nome: "Maria",
    texto: "Pedi oração pela cirurgia do meu pai e correu tudo bem. Deus é fiel!",
    categoria: "Saúde",
    criadoEm: Date.now() - 3 * 86400000,
    oracoes: 18,
    testemunho: {
      texto: "A cirurgia foi um sucesso e ele já está em casa se recuperando. Obrigada a todos que oraram!",
      em: Date.now() - 1 * 86400000,
    },
  },
];

async function api<T>(init: RequestInit, tentativas = 1): Promise<T> {
  const res = await fetch("/api/oracoes", {
    headers: { "Content-Type": "application/json" },
    ...init,
  });
  if (res.status === 501) throw new Error("KV_NAO_CONFIGURADO");
  const data = await res.json().catch(() => ({}));
  if (!res.ok || tentativas < 1) {
    if (!res.ok) throw new Error(data.error || `HTTP ${res.status}`);
  }
  return data as T;
}

function lerLocais(): Pedido[] {
  try {
    const raw = localStorage.getItem(KEY_LOCAL);
    if (!raw) {
      localStorage.setItem(KEY_LOCAL, JSON.stringify(SEMENTES));
      return [...SEMENTES];
    }
    const arr = JSON.parse(raw);
    return Array.isArray(arr) ? arr : [...SEMENTES];
  } catch {
    return [...SEMENTES];
  }
}

function salvarLocais(pedidos: Pedido[]) {
  try {
    localStorage.setItem(KEY_LOCAL, JSON.stringify(pedidos.slice(0, 200)));
  } catch {}
}

export function modoMural(): "kv" | "local" {
  try {
    return (localStorage.getItem(KEY_MODO) as "kv" | "local") || "local";
  } catch {
    return "local";
  }
}

function setModo(m: "kv" | "local") {
  try {
    localStorage.setItem(KEY_MODO, m);
  } catch {}
}

export function jaOrei(id: string): boolean {
  try {
    const arr = JSON.parse(localStorage.getItem(KEY_VOTEI) ?? "[]");
    return Array.isArray(arr) && arr.includes(id);
  } catch {
    return false;
  }
}

function marcarVoto(id: string) {
  try {
    const arr = JSON.parse(localStorage.getItem(KEY_VOTEI) ?? "[]");
    const next = Array.isArray(arr) ? [...arr, id] : [id];
    localStorage.setItem(KEY_VOTEI, JSON.stringify(next));
  } catch {}
}

export async function listarPedidos(): Promise<Pedido[]> {
  try {
    const data = await api<{ pedidos: Pedido[] }>({ method: "GET" });
    setModo("kv");
    return data.pedidos ?? [];
  } catch {
    setModo("local");
    const locais = lerLocais();
    return [...locais].sort((a, b) => b.criadoEm - a.criadoEm);
  }
}

export async function publicarPedido(
  nome: string,
  texto: string,
  categoria: string
): Promise<Pedido> {
  const t = texto.trim();
  if (t.length < 10) throw new Error("Escreva o pedido com ao menos 10 letras.");
  try {
    const data = await api<{ pedido: Pedido }>({
      method: "POST",
      body: JSON.stringify({ acao: "criar", nome, texto: t, categoria }),
    });
    setModo("kv");
    return data.pedido;
  } catch (e) {
    if (e instanceof Error && e.message !== "KV_NAO_CONFIGURADO") throw e;
    setModo("local");
    const pedido: Pedido = {
      id: `local-${Date.now().toString(36)}`,
      nome: nome.trim().slice(0, 40) || "Anônimo",
      texto: t.slice(0, 500),
      categoria: CATEGORIAS.includes(categoria) ? categoria : "Outro",
      criadoEm: Date.now(),
      oracoes: 0,
      testemunho: null,
    };
    const locais = lerLocais();
    locais.unshift(pedido);
    salvarLocais(locais);
    return pedido;
  }
}

export async function orarPor(id: string): Promise<number> {
  if (jaOrei(id)) throw new Error("JA_ORADO");
  try {
    const data = await api<{ oracoes: number }>({
      method: "POST",
      body: JSON.stringify({ acao: "orar", id }),
    });
    marcarVoto(id);
    return data.oracoes;
  } catch (e) {
    if (e instanceof Error && e.message !== "KV_NAO_CONFIGURADO") throw e;
    const locais = lerLocais();
    const p = locais.find((x) => x.id === id);
    if (!p) throw new Error("Pedido não encontrado.");
    p.oracoes = (p.oracoes || 0) + 1;
    salvarLocais(locais);
    marcarVoto(id);
    return p.oracoes;
  }
}

export async function contarTestemunho(id: string, texto: string): Promise<Pedido> {
  const t = texto.trim();
  if (t.length < 10) throw new Error("Conte o testemunho com ao menos 10 letras.");
  try {
    const data = await api<{ pedido: Pedido }>({
      method: "POST",
      body: JSON.stringify({ acao: "testemunho", id, texto: t }),
    });
    return data.pedido;
  } catch (e) {
    if (e instanceof Error && e.message !== "KV_NAO_CONFIGURADO") throw e;
    const locais = lerLocais();
    const p = locais.find((x) => x.id === id);
    if (!p) throw new Error("Pedido não encontrado.");
    p.testemunho = { texto: t.slice(0, 500), em: Date.now() };
    salvarLocais(locais);
    return p;
  }
}

/** "há X dias/horas" simples. */
export function tempoRelativo(ts: number): string {
  const s = Math.floor((Date.now() - ts) / 1000);
  if (s < 3600) return `há ${Math.max(1, Math.floor(s / 60))} min`;
  if (s < 86400) return `há ${Math.floor(s / 3600)} h`;
  const d = Math.floor(s / 86400);
  return d === 1 ? "há 1 dia" : `há ${d} dias`;
}
