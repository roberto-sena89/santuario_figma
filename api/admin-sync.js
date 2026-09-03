// POST /api/admin-sync -> commit PESSOAS_PADRAO (e cultos) no GitHub -> Vercel auto-deploy
// body: { senha, pessoas: string[], cultos?: {key,dia,horario,titulo}[] }
// env: GH_TOKEN (fine-grained PAT Contents:write), ADMIN_SENHA opcional (default santuario2026)

export default async function handler(req, res) {
  // CORS simples
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, x-admin-senha");
  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const GH_TOKEN = process.env.GH_TOKEN;
  const ADMIN_SENHA = process.env.ADMIN_SENHA || "santuario2026";
  if (!GH_TOKEN) return res.status(500).json({ error: "GH_TOKEN não configurado na Vercel (Settings → Environment Variables)" });

  let body = req.body;
  if (typeof body === "string") { try { body = JSON.parse(body); } catch {} }
  const senha = body?.senha || req.headers["x-admin-senha"] || "";
  if (senha !== ADMIN_SENHA) return res.status(401).json({ error: "Senha admin inválida" });

  const pessoas = body?.pessoas;
  const cultos = body?.cultos; // opcional

  if (!Array.isArray(pessoas) || pessoas.length === 0) {
    return res.status(400).json({ error: "pessoas[] obrigatório" });
  }
  // normaliza e ordena
  const sorted = [...new Set(pessoas.map((s) => String(s).trim()).filter(Boolean))].sort((a,b)=>a.localeCompare(b,"pt-BR"));

  const owner = "roberto-sena89";
  const repo = "santuario_figma";
  const path = "src/data/escala.ts";
  const branch = "main";
  const apiBase = `https://api.github.com/repos/${owner}/${repo}/contents/${path}`;

  try {
    // 1) pega arquivo atual
    const getRes = await fetch(`${apiBase}?ref=${branch}`, {
      headers: { Authorization: `Bearer ${GH_TOKEN}`, Accept: "application/vnd.github+json", "X-GitHub-Api-Version": "2022-11-28" },
    });
    if (!getRes.ok) {
      const t = await getRes.text();
      return res.status(500).json({ error: `GitHub GET falhou ${getRes.status}: ${t.slice(0,400)}` });
    }
    const file = await getRes.json();
    const sha = file.sha;
    const content = Buffer.from(file.content, "base64").toString("utf-8");

    // 2) substitui bloco PESSOAS_PADRAO
    const novoBloco = `export const PESSOAS_PADRAO: string[] = [\n${sorted.map((s)=>`  "${s.replace(/"/g,'\\"')}",`).join("\n")}\n];`;
    // regex cobre export const PESSOAS_PADRAO: string[] = [ ... ];
    const re = /export const PESSOAS_PADRAO: string\[\] = \[[\s\S]*?\];/;
    if (!re.test(content)) return res.status(500).json({ error: "Bloco PESSOAS_PADRAO não encontrado em escala.ts" });
    let novoConteudo = content.replace(re, novoBloco);

    // 3) opcional: sincroniza DIAS_ESCALA se cultos vieram
    if (Array.isArray(cultos) && cultos.length > 0) {
      // cultos = [{key,dia,horario,titulo}]
      const cultosSorted = [...cultos].sort((a,b)=>{
        const ordem = {segunda:1,terca:2,quarta:3,quinta:4,sexta:5,sabado:6,domingo:7};
        const oa = ordem[a.key] ?? 99;
        const ob = ordem[b.key] ?? 99;
        if (oa!==ob) return oa-ob;
        return String(a.horario).localeCompare(String(b.horario));
      });
      const diasBloco = `export const DIAS_ESCALA: Omit<EscalaDia, "papeis">[] = [\n${cultosSorted.map((c)=>`  {\n    key: "${c.key}",\n    dia: "${c.dia}",\n    horario: "${c.horario}",\n    titulo: "${String(c.titulo).replace(/"/g,'\\"')}",\n  },`).join("\n")}\n];`;
      const reDias = /export const DIAS_ESCALA: Omit<EscalaDia, "papeis">\[\] = \[[\s\S]*?\];/;
      if (reDias.test(novoConteudo)) novoConteudo = novoConteudo.replace(reDias, diasBloco);
    }

    if (novoConteudo === content) return res.status(200).json({ ok:true, message:"Nada a alterar", commit: null });

    // 4) PUT commit
    const putRes = await fetch(apiBase, {
      method: "PUT",
      headers: { Authorization: `Bearer ${GH_TOKEN}`, Accept: "application/vnd.github+json", "X-GitHub-Api-Version": "2022-11-28", "Content-Type": "application/json" },
      body: JSON.stringify({
        message: `chore(admin): sync PESSOAS_PADRAO ${sorted.length} pessoas via /api/admin-sync`,
        content: Buffer.from(novoConteudo, "utf-8").toString("base64"),
        sha,
        branch,
      }),
    });
    if (!putRes.ok) {
      const t = await putRes.text();
      return res.status(500).json({ error: `GitHub PUT falhou ${putRes.status}: ${t.slice(0,600)}` });
    }
    const result = await putRes.json();
    return res.status(200).json({ ok:true, commit: result.commit?.sha || null, message: `Pessoas sincronizadas (${sorted.length}) — Vercel deploy em ~30s` });
  } catch (e) {
    return res.status(500).json({ error: String(e?.message || e).slice(0,600) });
  }
}
