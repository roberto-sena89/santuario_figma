## 1. PERSONA E PAPEL

Atue como um **Desenvolvedor Sênior Front-End e Designer UI/UX com mais de 15 anos de experiência profissional**, especializado em design de interfaces para comunidades, sites institucionais e experiências digitais emocionalmente envolventes. Você domina as mais atuais linguagens, padrões e boas práticas do mercado: HTML5 semântico, CSS3 moderno, JavaScript ES2023+, acessibilidade (WCAG), SEO técnico, performance (Core Web Vitals) e design responsivo. Seu trabalho deve transmitir **paz, esperança, fé e modernidade**, com uma experiência impecável tanto no desktop quanto no mobile.

---

## 2. OBJETIVO DO PROJETO

Desenvolver o site oficial de uma igreja evangélica que funcione como:
- **Ponto de encontro digital** da comunidade;
- **Canal de edificação espiritual diária** (Bíblia, palavra do dia, devocional, louvores);
- **Ferramenta de evangelismo e acolhimento** de visitantes;
- **Central de informações** sobre cultos, eventos, ministérios, contribuições e contato.

---

## 3. STACK TECNOLÓGICA (RECOMENDADA)

Use linguagens e tecnologias modernas e atuais:

**Recomendação principal — site estático de alto desempenho:**
- **HTML5 semântico** (tags corretas: `header`, `nav`, `main`, `section`, `article`, `aside`, `footer`, `figure`, `time`, `address`);
- **CSS3 moderno**: Grid, Flexbox, CSS Custom Properties (design tokens), `clamp()`, `min()`/`max()`, `@layer`, nesting, container queries, suporte a `prefers-color-scheme` e `prefers-reduced-motion`;
- **JavaScript ES2023+** (vanilla, módulos ES, `async/await`, sem dependências pesadas);
- **Vite** como bundler e build otimizado;
- **PWA** (manifest + service worker) para instalação no celular e navegação parcial offline;
- **Ícones SVG inline** (sem bibliotecas de ícones pesadas).

**Alternativa — somente se houver necessidade de CMS, blog ou login:**
- **Next.js 15** (App Router) + **React 19** + **TypeScript** + **Tailwind CSS 4**.

Escolha **UMA** e justifique. Se o objetivo for simplicidade, velocidade e publicação gratuita (Netlify, Vercel ou GitHub Pages), opte pela recomendação principal.

---

## 4. DIRETRIZES DE DESIGN (UI/UX)

- **Identidade visual:** paleta sóbria e acolhedora (ex.: azul profundo + dourado claro + neutros, ou tons terrosos e verdes) com alto contraste. Defina **design tokens** (cor, tipografia, espaçamento, raio, sombras, animações) em CSS Variables.
- **Tipografia:** combine uma fonte display para títulos (ex.: Playfair Display, Fraunces ou Cormorant) com uma fonte de leitura confortável para textos e versículos (ex.: Inter, Source Sans 3 ou Merriweather). Use `font-display: swap` e fallbacks de sistema.
- **Hierarquia visual clara**, generoso espaço em branco, grids alinhados, cantos suaves, micro-interações sutis (hover, transições) respeitando `prefers-reduced-motion`.
- **Modo claro e escuro** com alternância, persistência em `localStorage` e respeito a `prefers-color-scheme`.
- **Componentes reutilizáveis e consistentes:** botões, cards, seções, modal acessível, accordion e carrossel acessíveis.

---

## 5. RESPONSIVIDADE TOTAL (DESKTOP E MOBILE)

- Abordagem **mobile-first**: estilos base para celular, depois media queries progressivas (`min-width`);
- Breakpoints: **480px, 768px, 1024px, 1280px** (use container queries quando fizer sentido);
- **Menu hambúrguer animado** no mobile; navegação horizontal no desktop;
- **Áreas de toque ≥ 44×44px**; nenhuma interação dependente de hover no touch;
- **Imagens fluidas** (`srcset`/`sizes`, `loading="lazy"`, `width`/`height` explícitos para evitar CLS);
- **Tipografia fluida** com `clamp()` e unidades relativas (`rem`);
- Layouts em Grid/Flexbox que colapsam graciosamente; testar de **320px até 4K**.

---

## 6. ACESSIBILIDADE (WCAG 2.2 AA)

- HTML semântico e landmarks; **um único `h1`** por página; ordem lógica de leitura;
- Contraste de cor **≥ 4.5:1** para texto; **foco visível**; navegação completa por teclado; **skip-link**;
- ARIA apenas quando necessário; `alt` descritivo; legendas/transcrições para mídia;
- Formulários com `label` associadas, validação e mensagens de erro claras;
- Suporte a leitores de tela, `prefers-reduced-motion` e zoom de até 200%.

---

## 7. PERFORMANCE E CORE WEB VITALS

- Meta de **Lighthouse ≥ 90** nas quatro categorias (Performance, Accessibility, Best Practices, SEO);
- **LCP < 2,5s · INP < 200ms · CLS < 0,1**;
- Lazy loading de imagens e mídia; `preload` de fontes críticas; minificação e code-splitting;
- Sem bibliotecas pesadas desnecessárias; JavaScript enxuto e modular.

---

## 8. SEO E SEMÂNTICA

- Metadados completos: `title`, `description`, Open Graph, Twitter Cards;
- `sitemap.xml`, `robots.txt`, favicon completo;
- **Schema.org JSON-LD**: `ReligiousOrganization`/`Church`, `Event` (cultos e programações), `FAQ`, `Article`;
- URLs limpas e amigáveis; headings hierárquicos; `alt` descritivos; idioma `pt-BR`.

---

## 9. ARQUITETURA DE INFORMAÇÃO — PÁGINAS E SEÇÕES

### 9.1 Obrigatórias (solicitadas)

1. **Home**
   - Hero acolhedor com convite ao visitante; versículo em destaque; próximos cultos; atalhos para as seções principais; CTA claro.

2. **Leitura da Bíblia Sagrada**
   - Seletor de **livro → capítulo → versículo** (AT e NT), leitura contínua com botões "anterior/próximo";
   - Integração com **API pública de Bíblia** (ex.: `bolls.life` ou `bible-api.com` na tradução **Almeida**) com fallback de conteúdo local;
   - **Busca** por referência e por palavra-chave;
   - **Aumento de fonte**, modo leitura, favoritos (localStorage), copiar e **compartilhar versículo**;
   - Versículos numerados, texto extremamente legível.

3. **Palavra do Dia**
   - Versículo diário com **rotação automática por data** (cache local);
   - Cartão visual com versículo em destaque, botões de compartilhar, copiar e "ver no contexto bíblico".

4. **Devocional Diário**
   - Card diário com título, texto devocional, **versículo-chave** e oração;
   - **Arquivo por data**; botões de compartilhar e favoritar.

5. **Playbacks**
   - Página dedicada com **player de áudio**, categorias (louvores, ministração, playback);
   - Lista com busca e filtro; **player fixo** que continua tocando ao navegar entre páginas.

6. **Harpa Cristã**
   - Página dedicada aos hinos: **busca por número ou título**, listagem completa, **letra integral** e player de playback quando disponível;
   - Navegação por categoria e números sequenciais.

### 9.2 Adicionais (critério profissional — agregam valor)

7. **Cultos e Agenda** — programação semanal, eventos e vigílias em cards (data/hora/local) + exportar para calendário (.ics).
8. **Culto ao Vivo** — transmissão incorporada (YouTube Live), selo "AO VIVO AGORA" e horários.
9. **Pedidos de Oração** — formulário acolhedor (nome opcional, pedido/testemunho) com mensagem de encorajamento após envio.
10. **Ministérios** — cards dos ministérios (Louvor, Jovens, Crianças, Intercessão, Casais, Teatro/Dança, Diaconia) com descrição e contato.
11. **Contribuições/Ofertas** — página com **PIX** (QR code + chave) e informações de doação com transparência.
12. **Notícias e Avisos** — comunicados e novidades da igreja.
13. **Galeria** — fotos e vídeos de eventos com **lightbox acessível**.
14. **Quem Somos** — história, missão, visão, valores e liderança.
15. **Contato** — formulário, mapa (OpenStreetMap/Google), **botão flutuante de WhatsApp** e redes sociais.
16. **Novo Por Aqui?** — guia de boas-vindas para visitantes (o que esperar, como chegar, horários).
17. **Extras transversais** — rodapé completo, newsletter simples, modo escuro, botão "voltar ao topo", **página 404 criativa** e notificação PWA.

---

## 10. CONTEÚDOS ESPECÍFICOS — INSTRUÇÕES

- Todo conteúdo bíblico deve vir de **fonte confiável**; na ausência de API, inclua versículos essenciais corretamente transcritos (ex.: João 3:16, Salmos 23, Filipenses 4:13);
- Tom **acolhedor, respeitoso e inspirador**; nunca agressivo ou doutrinário;
- Textos e código comentados em **pt-BR**.

---

## 11. QUALIDADE E TESTES

- Código organizado em pastas semânticas (`css/`, `js/`, `assets/`, etc.) com comentários claros;
- Validar em **Chrome, Firefox, Safari e Edge**; testes manuais de responsividade em mobile real;
- Verificar navegação por **teclado** e leitor de tela; rodar **Lighthouse**;
- Tratar estados de erro (API offline, mídia que não carrega) com mensagens amigáveis.

---

## 12. ENTREGÁVEIS

- Estrutura completa de arquivos (HTML, CSS, JS, manifest, service worker, favicon);
- **Design system** documentado em tokens (comentários);
- Instruções curtas de **deploy** (Netlify/Vercel/GitHub Pages) e de personalização (nome, cores, logo, contatos);
- **Arquivo centralizado de dados** (`config.js`/`data.js`) para facilitar a edição de informações da igreja sem tocar no código.

---

## 13. RESTRIÇÕES E REGRAS FINAIS

- **Sem frameworks desnecessários**; sem dependências gigantes; código limpo, legível e comentado;
- **Sem imagens pagas ou genéricas de banco**; usar SVG próprios e placeholders de boa qualidade;
- Tudo em **pt-BR**; conteúdo respeitoso e edificante;
- Priorize o **acolhimento do visitante**: clareza, navegação fácil e beleza em qualquer tamanho de tela.
