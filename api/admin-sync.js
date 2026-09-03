// POST /api/admin-sync -> commit PESSOAS_PADRAO (e cultos/escalas) no GitHub -> Vercel auto-deploy
// body: { senha, pessoas?: string[], cultos?: {key,dia,horario,titulo}[], escala?: EscalaSemana, escalas?: Record<string,EscalaSemana> }
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
  const escala = body?.escala; // EscalaSemana single
  const escalas = body?.escalas; // Record<string, EscalaSemana> full

  const hasPessoas = Array.isArray(pessoas) && pessoas.length > 0;
  const hasEscala = escala && typeof escala === "object" && escala.semana && Array.isArray(escala.dias);
  const hasEscalas = escalas && typeof escalas === "object" && Object.keys(escalas).length > 0;
  const hasCultos = Array.isArray(cultos) && cultos.length > 0;

  if (!hasPessoas && !hasEscala && !hasEscalas && !hasCultos) {
    return res.status(400).json({ error: "Nada para sincronizar: envie pessoas[], ou escala/escalas, ou cultos[]" });
  }

  const owner = "roberto-sena89";
  const repo = "santuario_figma";
  const branch = "main";

  try {
    const commits = [];

    // ---- 1) PESSOAS / CULTOS -> src/data/escala.ts ----
    if (hasPessoas || hasCultos) {
      const path = "src/data/escala.ts";
      const apiBase = `https://api.github.com/repos/${owner}/${repo}/contents/${path}`;
      const getRes = await fetch(`${apiBase}?ref=${branch}`, {
        headers: { Authorization: `Bearer ${GH_TOKEN}`, Accept: "application/vnd.github+json", "X-GitHub-Api-Version": "2022-11-28" },
      });
      if (!getRes.ok) {
        const t = await getRes.text();
        return res.status(500).json({ error: `GitHub GET escala.ts falhou ${getRes.status}: ${t.slice(0,400)}` });
      }
      const file = await getRes.json();
      const sha = file.sha;
      let content = Buffer.from(file.content, "base64").toString("utf-8");
      let novoConteudo = content;

      if (hasPessoas) {
        const sorted = [...new Set(pessoas.map((s) => String(s).trim()).filter(Boolean))].sort((a,b)=>a.localeCompare(b,"pt-BR"));
        const novoBloco = `export const PESSOAS_PADRAO: string[] = [\n${sorted.map((s)=>`  "${s.replace(/"/g,'\\"')}",`).join("\n")}\n];`;
        const re = /export const PESSOAS_PADRAO: string\[\] = \[[\s\S]*?\];/;
        if (!re.test(content)) return res.status(500).json({ error: "Bloco PESSOAS_PADRAO não encontrado em escala.ts" });
        novoConteudo = novoConteudo.replace(re, novoBloco);
      }

      if (hasCultos) {
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

      if (novoConteudo !== content) {
        const putRes = await fetch(apiBase, {
          method: "PUT",
          headers: { Authorization: `Bearer ${GH_TOKEN}`, Accept: "application/vnd.github+json", "X-GitHub-Api-Version": "2022-11-28", "Content-Type": "application/json" },
          body: JSON.stringify({
            message: hasPessoas ? `chore(admin): sync PESSOAS_PADRAO ${[...new Set(pessoas.map((s)=>String(s).trim()).filter(Boolean))].length} pessoas via /api/admin-sync` : `chore(admin): sync DIAS_ESCALA via /api/admin-sync`,
            content: Buffer.from(novoConteudo, "utf-8").toString("base64"),
            sha,
            branch,
            committer: { name: "Roberto Sena", email: "roberto_sena10@hotmail.com" },
            author: { name: "Roberto Sena", email: "roberto_sena10@hotmail.com" },
          }),
        });
        if (!putRes.ok) {
          const t = await putRes.text();
          return res.status(500).json({ error: `GitHub PUT escala.ts falhou ${putRes.status}: ${t.slice(0,600)}` });
        }
        const result = await putRes.json();
        commits.push(result.commit?.sha || "escala.ts");
      }
    }

    // ---- 2) ESCALAS -> src/data/escalas.json ----
    if (hasEscala || hasEscalas) {
      const path2 = "src/data/escalas.json";
      const apiBase2 = `https://api.github.com/repos/${owner}/${repo}/contents/${path2}`;
      let existing = {};
      let sha2 = null;
      const getRes2 = await fetch(`${apiBase2}?ref=${branch}`, {
        headers: { Authorization: `Bearer ${GH_TOKEN}`, Accept: "application/vnd.github+json", "X-GitHub-Api-Version": "2022-11-28" },
      });
      if (getRes2.ok) {
        const file2 = await getRes2.json();
        sha2 = file2.sha;
        try { existing = JSON.parse(Buffer.from(file2.content, "base64").toString("utf-8")); } catch { existing = {}; }
      } else if (getRes2.status !== 404) {
        const t = await getRes2.text();
        return res.status(500).json({ error: `GitHub GET escalas.json falhou ${getRes2.status}: ${t.slice(0,400)}` });
      }
      // merge
      let merged = { ...existing };
      if (hasEscalas) {
        for (const [k,v] of Object.entries(escalas)) merged[k] = v;
      }
      if (hasEscala) {
        merged[escala.semana] = escala;
      }
      const novoJson = JSON.stringify(merged, null, 2) + "\n";
      const putBody = {
        message: hasEscala ? `chore(admin): sync escala ${escala.semana} via /api/admin-sync` : `chore(admin): sync escalas ${Object.keys(escalas).length} semanas via /api/admin-sync`,
        content: Buffer.from(novoJson, "utf-8").toString("base64"),
        branch,
        committer: { name: "Roberto Sena", email: "roberto_sena10@hotmail.com" },
        author: { name: "Roberto Sena", email: "roberto_sena10@hotmail.com" },
      };
      if (sha2) putBody.sha = sha2;
      const putRes2 = await fetch(apiBase2, {
        method: "PUT",
        headers: { Authorization: `Bearer ${GH_TOKEN}`, Accept: "application/vnd.github+json", "X-GitHub-Api-Version": "2022-11-28", "Content-Type": "application/json" },
        body: JSON.stringify(putBody),
      });
      if (!putRes2.ok) {
        const t = await putRes2.text();
        return res.status(500).json({ error: `GitHub PUT escalas.json falhou ${putRes2.status}: ${t.slice(0,600)}` });
      }
      const result2 = await putRes2.json();
      commits.push(result2.commit?.sha || "escalas.json");
    }

    if (commits.length === 0) return res.status(200).json({ ok:true, message:"Nada a alterar", commit: null });
    return res.status(200).json({ ok:true, commit: commits.join(","), message: `Sincronizado (${commits.length} arquivo(s)) — Vercel deploy em ~30s` });
  } catch (e) {
    return res.status(500).json({ error: String(e?.message || e).slice(0,600) });
  }
}
