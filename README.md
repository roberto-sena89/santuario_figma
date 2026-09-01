# Santuário da Adoração — Site (santuario_figma)

Site institucional da **Igreja Evangélica Santuário da Adoração** (nome curto: **Santuário**).

SPA construída com React + Vite + Tailwind CSS, em **dark mode fixo** com paleta
grafite + âmbar dourado. Toda a navegação é por **hash routing** (sem react-router):
`/#/biblia`, `/#/cultos`, `/#/harpa`, etc.

---

## Stack

| Camada       | Tecnologia                          |
| ------------ | ----------------------------------- |
| UI           | React 19 + TypeScript               |
| Build        | Vite 8 (`@vitejs/plugin-react`)     |
| Estilo       | Tailwind CSS 4 (via plugin `@tailwindcss/vite`) |
| Ícones       | `lucide-react` + SVGs inline        |
| Gerenciador  | pnpm                                |

## Scripts

```bash
pnpm install     # instala dependências
pnpm dev         # dev server em http://localhost:8443/ (vite --host 0.0.0.0)
pnpm build       # build de produção (dist/)
pnpm preview     # pré-visualiza o build
pnpm format      # formata com oxfmt
```

> O dev server roda na porta **8443** (padrão do Figma Make). Se a porta estiver
> ocupada: `taskkill /F /PID <pid>` e rode `pnpm dev` novamente.

---

## Estrutura

```
src/
├── App.tsx                    # estado de página, hash routing, FABs globais, document.title
├── main.tsx                   # entrypoint
├── index.css                  # tema Tailwind 4: paleta dark + fontes (Fraunces, Cormorant Garamond)
├── components/
│   ├── Navigation.tsx         # header com submenus (Bíblia, Multimídia, Sobre) + CTA "Apoie a Obra"
│   ├── Footer.tsx
│   ├── AdminScale.tsx         # painel admin da escala semanal (#/admin)
│   ├── EscalaSemanaCard.tsx   # card público da escala na página Cultos
│   ├── PrayerButton.tsx       # FAB "Peça uma oração"
│   ├── SupportButton.tsx      # FAB "Apoie a Obra"
│   ├── media/                 # PlayerModal, PlaybackGrid, FilterSidebar, PlaybacksHero
│   └── ui/                    # PageTitle, Skeleton
├── data/                      # catálogos e conteúdo (ver abaixo)
├── hooks/                     # usePlaybacks, useFocusTrap
├── pages/                     # uma página por rota (Home, Bible, Harpa, Cultos, ...)
└── utils/                     # normalização de texto etc.
```

### Páginas e rotas

| Rota (hash)          | Página                          |
| -------------------- | ------------------------------- |
| `#/`                 | Home                            |
| `#/biblia`           | Bíblia Sagrada (offline)        |
| `#/palavra-do-dia`   | Palavra do Dia                  |
| `#/devocional`       | Devocional Diário               |
| `#/playbacks`        | Playbacks & Louvores (YouTube)  |
| `#/harpa`            | Harpa Cristã (640 hinos)        |
| `#/cultos`           | Cultos e Agenda + Escala da Semana |
| `#/ministerios`      | Ministérios (`?m=<id>` abre o detalhe) |
| `#/quem-somos`       | Quem Somos                      |
| `#/contribuicoes`    | Apoie a Obra (PIX)              |
| `#/contato`          | Contato                         |
| `#/missoes`          | Missões                         |
| `#/admin`            | Painel da Escala (senha)        |

Sub-rotas: `#/ministerios/<id>` abre o detalhe do ministério (deep-link).

---

## Dados

| Arquivo                          | Conteúdo |
| -------------------------------- | -------- |
| `data/church.ts`                 | Identidade da igreja (nome, endereço, contatos, PIX, liderança) |
| `data/schedule.ts`               | Horários dos cultos (ordem Dom→Sáb) |
| `data/escala.ts`                 | Modelo da escala semanal + persistência localStorage |
| `data/ministerios.ts`            | Ministérios da igreja |
| `data/missoes.ts`                | Ações missionárias |
| `data/verses.ts` + `bibleBooks.ts` | Bíblia offline (NVA) |
| `data/devotionals.ts`            | Devocionais diários |
| `data/harpaCompleta.ts`          | Normaliza e busca os 640 hinos |
| `data/harpa_crista_640_hinos.json` | Hinos completos (estrofes + refrão) — carregado sob demanda |
| `data/harpa-external.json`       | Catálogo Harpa externo (~8.7k linhas, fallback) |
| `data/harpa.ts` / `harpaApi.ts`  | Cliente da API harpa-api + fallback local |
| `public/playbacks/`              | Catálogo de playbacks (~15.795) em chunks A–Z + manifest.json |

### Harpa Cristã (640 hinos)

A página `#/harpa` usa o JSON completo da Harpa Cristã (fonte:
[DanielLiberato/Harpa-Crista-JSON-640-Hinos-Completa](https://github.com/DanielLiberato/Harpa-Crista-JSON-640-Hinos-Completa)).
O JSON é **importado dinamicamente** (lazy) para não inchar o bundle principal —
vira um chunk separado que só baixa ao abrir a página. Recurso:

- Busca por número ou título
- Cards expansíveis com estrofes + refrão (fonte bíblica Cormorant Garamond)
- Paginação (24 hinos/página)

### Escala semanal (admin)

- `#/admin` exige senha fixa (definida em `AdminScale.tsx`).
- O pastor define a escala por semana (papéis rotativos por culto), com cadastro
  de pessoas.
- Persistência em `localStorage`; exibição pública na seção "Escala da Semana"
  da página Cultos.

### Playbacks

- Catálogo grande (~15.7k louvores) carregado em chunks com cache em
  `sessionStorage`; busca com normalização de texto.
- Favoritas persistidas em `localStorage` (`igreja:favoritas`).
- `PlayerModal` usa a **YouTube IFrame API** com controles próprios na base do
  player (play/pause, mudo, volume) — sempre visíveis e centralizados.

---

## Design system

- **Dark mode fixo** (sem toggle): `index.html` aplica `.dark` no `<head>` antes
  do CSS para evitar flash de tema claro.
- Paleta: fundo grafite `#0F1414`, cards `#151A19`, bordas `#2A302D`, texto
  `#E5E9E6`.
- **CTA âmbar dourado** `#D4A24C` (hover `#C4933C`) com texto grafite — nunca
  texto branco sobre o âmbar.
- Texto/borda secundária em grafite; texto âmbar claro `#B8860B` / escuro `#E8B35E`.
- Fontes: `Fraunces` (títulos), `Cormorant Garamond` (versículos/hinos, token
  `font-bible`), `Geist` (corpo).
- Padrão aconchegante: emojis, glassmorphism, badges pílula, hover lift e glow âmbar.
- FABs globais empilhados (Voltar ao topo + Apoie a Obra + Oração) em um único
  container `fixed bottom-6 right-6`.

---

## Deploy

- Repositório: `github.com/roberto-sena89/santuario_figma` (branch `main`).
- **Push para o GitHub NÃO faz auto-deploy.** O deploy é feito manualmente pelo
  usuário (Vercel). Após publicar, forçar atualização no navegador
  (`Ctrl+Shift+R`) porque a PWA serve cache antigo.
