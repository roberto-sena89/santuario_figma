// Mural de Oração — API comunitária (compartilhada entre visitantes).
//
// GET  /api/oracoes            -> lista pedidos (mais recentes primeiro)
// POST /api/oracoes {acao:"criar", nome?, texto, categoria?}
// POST /api/oracoes {acao:"orar", id}
// POST /api/oracoes {acao:"testemunho", id, texto}
// POST /api/oracoes {acao:"excluir", id, senha}  (moderação: ADMIN_SENHA)
//
// Persistência: Upstash Redis REST (Vercel KV / Upstash).
// env: UPSTASH_REDIS_REST_URL + UPSTASH_REDIS_REST_TOKEN
// Sem KV configurado responde 501 KV_NAO_CONFIGURADO — o site então
// usa o mural local (localStorage) até o KV ser ligado.

const KEY = "oracoes:mural";
const MAX_PEDIDOS = 200;

function kvEnv() {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  return url && token ? { url, token } : null;
}

async function kv(cmd, ...args) {
  const env = kvEnv();
  const res = await fetch(
    `${env.url}/${cmd}/${args.map((a) => encodeURIComponent(a)).join("/")}`,
    { headers: { Authorization: `Bearer ${env.token}` } }
  );
  if (!res.ok) throw new Error(`KV ${cmd} falhou: ${res.status}`);
  return res.json();
}

async function lerTodos() {
  try {
    const data = await kv("get", KEY);
    const raw = data?.result;
    if (!raw) return [];
    const arr = typeof raw === "string" ? JSON.parse(raw) : raw;
    return Array.isArray(arr) ? arr : [];
  } catch {
    return [];
  }
}

async function salvarTodos(pedidos) {
  await kv("set", KEY, JSON.stringify(pedidos.slice(0, MAX_PEDIDOS)));
}

const nid = () =>
  `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 8)}`;

const CATEGORIAS = ["Saúde", "Família", "Gratidão", "Libertação", "Outro"];

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.status(200).end();

  if (!kvEnv()) {
    return res.status(501).json({
      error: "KV_NAO_CONFIGURADO",
      message:
        "Crie um KV na Vercel (Storage → KV) ou Upstash e sete UPSTASH_REDIS_REST_URL + UPSTASH_REDIS_REST_TOKEN.",
    });
  }

  try {
    if (req.method === "GET") {
      const pedidos = await lerTodos();
      pedidos.sort((a, b) => b.criadoEm - a.criadoEm);
      return res.status(200).json({ ok: true, pedidos });
    }

    if (req.method !== "POST")
      return res.status(405).json({ error: "Method not allowed" });

    let body = req.body;
    if (typeof body === "string") {
      try {
        body = JSON.parse(body);
      } catch {
        body = {};
      }
    }

    const pedidos = await lerTodos();

    if (body?.acao === "criar") {
      const texto = String(body.texto ?? "").trim().slice(0, 500);
      const nome = String(body.nome ?? "").trim().slice(0, 40) || "Anônimo";
      const categoria = CATEGORIAS.includes(body.categoria)
        ? body.categoria
        : "Outro";
      if (texto.length < 10)
        return res.status(400).json({ error: "Escreva o pedido com ao menos 10 letras." });
      const pedido = {
        id: nid(),
        nome,
        texto,
        categoria,
        criadoEm: Date.now(),
        oracoes: 0,
        testemunho: null,
      };
      pedidos.unshift(pedido);
      await salvarTodos(pedidos);
      return res.status(200).json({ ok: true, pedido });
    }

    if (body?.acao === "orar") {
      const p = pedidos.find((x) => x.id === body.id);
      if (!p) return res.status(404).json({ error: "Pedido não encontrado." });
      p.oracoes = (p.oracoes || 0) + 1;
      await salvarTodos(pedidos);
      return res.status(200).json({ ok: true, oracoes: p.oracoes });
    }

    if (body?.acao === "testemunho") {
      const p = pedidos.find((x) => x.id === body.id);
      if (!p) return res.status(404).json({ error: "Pedido não encontrado." });
      const texto = String(body.texto ?? "").trim().slice(0, 500);
      if (texto.length < 10)
        return res.status(400).json({ error: "Conte o testemunho com ao menos 10 letras." });
      p.testemunho = { texto, em: Date.now() };
      await salvarTodos(pedidos);
      return res.status(200).json({ ok: true, pedido: p });
    }

    if (body?.acao === "excluir") {
      const ADMIN_SENHA = process.env.ADMIN_SENHA;
      if (!ADMIN_SENHA || body.senha !== ADMIN_SENHA)
        return res.status(401).json({ error: "Não autorizado." });
      const restantes = pedidos.filter((x) => x.id !== body.id);
      await salvarTodos(restantes);
      return res.status(200).json({ ok: true });
    }

    return res.status(400).json({ error: "Ação inválida." });
  } catch (e) {
    return res.status(500).json({ error: String(e?.message || e).slice(0, 300) });
  }
}
