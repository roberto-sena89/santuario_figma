import { useState, useEffect, Suspense, lazy, Component, type ReactNode } from "react";
import Navigation, { type Page } from "./components/Navigation";
import Footer from "./components/Footer";
import PrayerButton from "./components/PrayerButton";
import SupportButton from "./components/SupportButton";
import ErrorBoundary from "./components/ErrorBoundary";
import Home from "./pages/Home";
// Páginas pesadas em lazy chunks — a inicial carrega leve (4G fraco)
const Bible = lazy(() => import("./pages/Bible"));
const PalavraDodia = lazy(() => import("./pages/PalavraDodia"));
const Devocional = lazy(() => import("./pages/Devocional"));
const Quiz = lazy(() => import("./pages/Quiz"));
const PlanoLeitura = lazy(() => import("./pages/PlanoLeitura"));
const Oracoes = lazy(() => import("./pages/Oracoes"));
const Momento = lazy(() => import("./pages/Momento"));
const Playbacks = lazy(() => import("./pages/Playbacks"));
const Harpa = lazy(() => import("./pages/Harpa"));
const Cultos = lazy(() => import("./pages/Cultos"));
const Ministerios = lazy(() => import("./pages/Ministerios"));
const QuemSomos = lazy(() => import("./pages/QuemSomos"));
const Contribuicoes = lazy(() => import("./pages/Contribuicoes"));
const Contato = lazy(() => import("./pages/Contato"));
const Missoes = lazy(() => import("./pages/Missoes"));
const MinisterioDetalhe = lazy(() => import("./pages/MinisterioDetalhe"));
const AdminScale = lazy(() => import("./components/AdminScale"));
import { CHURCH } from "./data/church";
import { MINISTERIOS } from "./data/ministerios";

const NO_FOOTER_PAGES: Page[] = ["admin"];

const ALL_PAGES: Page[] = [
  "home", "biblia", "palavra-do-dia", "devocional", "quiz", "plano", "playbacks",
  "harpa", "cultos", "ministerios", "quem-somos", "contribuicoes",
  "contato", "admin", "missoes", "oracoes", "momento",
];

function hashToPage(): Page {
  const h = window.location.hash.replace(/^#\/?/, "").toLowerCase().split("?")[0];
  if (h === "escala") return "admin";
  // Sub-rota #/ministerios/<id> → página ministerios
  if (h.startsWith("ministerios/")) return "ministerios";
  // Bíblia: aceita tanto #/biblia quanto #/collection:* e #/<slug>/<subtema>
  if (
    h === "biblia" ||
    h.startsWith("collection:") ||
    h.startsWith("testament:") ||
    h.startsWith("mulher") ||
    h.startsWith("homem") ||
    h.startsWith("jovens") ||
    h.startsWith("familia") ||
    h.startsWith("consolo")
  ) {
    return "biblia";
  }
  return (ALL_PAGES as string[]).includes(h) ? (h as Page) : "home";
}

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>(hashToPage);
  const [activeMinistry, setActiveMinistry] = useState<string | null>(null);
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  useEffect(() => {
    const onScroll = () => setShowBackToTop(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const titles: Record<Page, string> = {
      home: CHURCH.name,
      biblia: `Bíblia Sagrada — ${CHURCH.shortName}`,
      "palavra-do-dia": `Palavra do Dia — ${CHURCH.shortName}`,
      devocional: `Devocional Diário — ${CHURCH.shortName}`,
      quiz: `Quiz Bíblico — ${CHURCH.shortName}`,
      plano: `Plano de Leitura — ${CHURCH.shortName}`,
      playbacks: `Playbacks & Louvores — ${CHURCH.shortName}`,
      harpa: `Harpa Cristã — ${CHURCH.shortName}`,
      cultos: `Cultos e Agenda — ${CHURCH.shortName}`,
      ministerios: `Ministérios — ${CHURCH.shortName}`,
      "quem-somos": `Quem Somos — ${CHURCH.shortName}`,
      contribuicoes: `Apoie a Obra — ${CHURCH.shortName}`,
      contato: `Contato — ${CHURCH.shortName}`,
      admin: `Escala — ${CHURCH.shortName}`,
      missoes: `Missões — ${CHURCH.shortName}`,
      oracoes: `Mural de Oração — ${CHURCH.shortName}`,
      momento: `Momento com Deus — ${CHURCH.shortName}`,
    };
    document.title = activeMinistry
      ? `${MINISTERIOS.find((x) => x.id === activeMinistry)?.name ?? "Ministério"} — ${CHURCH.shortName}`
      : titles[currentPage] || CHURCH.name;
  }, [currentPage, activeMinistry]);

  // Sincroniza hash com a navegação (ex: /#/escala)
    useEffect(() => {
      const onHash = () => {
        // redirect legado #/admin → #/escala
        if (window.location.hash.toLowerCase() === "#/admin") {
          window.location.hash = "#/escala";
          return;
        }
        setCurrentPage(hashToPage());
        // Extrai sub-rota de ministério (#/ministerios/louvor)
        const m = window.location.hash.match(/^#\/ministerios\/([a-z]+)/);
        if (m && MINISTERIOS.some((x) => x.id === m[1])) {
          setActiveMinistry(m[1]);
        } else {
          setActiveMinistry(null);
        }
      };
      onHash();
      window.addEventListener("hashchange", onHash);
      return () => window.removeEventListener("hashchange", onHash);
    }, []);

  const navigate = (page: Page) => {
    setCurrentPage(page);
    const hash = page === "admin" ? "escala" : page;
    const h = page === "home" ? "" : `#/${hash}`;
    if (window.location.hash !== h) window.location.hash = h;
  };

  const showFooter = !NO_FOOTER_PAGES.includes(currentPage);

  const renderPage = () => {
    return (
      <ErrorBoundary>
        <Suspense
          fallback={
            <main
              id="main-content"
              className="min-h-screen bg-background pt-16 grid place-items-center"
              aria-label="Carregando página"
            >
              <p className="text-sm text-muted-foreground animate-pulse">
                Carregando...
              </p>
            </main>
          }
        >
        {(() => {
          switch (currentPage) {
            case "home":
              return <Home onNavigate={navigate} />;
            case "biblia":
              return <Bible />;
            case "palavra-do-dia":
              return <PalavraDodia onNavigate={navigate} />;
            case "devocional":
              return <Devocional />;
            case "quiz":
              return <Quiz />;
            case "plano":
              return <PlanoLeitura />;
            case "playbacks":
              return <Playbacks />;
            case "harpa":
              return <Harpa />;
            case "cultos":
              return <Cultos />;
            case "ministerios":
              if (activeMinistry)
                return <MinisterioDetalhe id={activeMinistry} onNavigate={navigate} />;
              return <Ministerios onNavigate={navigate} />;
            case "quem-somos":
              return <QuemSomos />;
            case "contribuicoes":
              return <Contribuicoes />;
            case "contato":
              return <Contato />;
            case "admin":
              return <AdminScale />;
            case "missoes":
              return <Missoes onNavigate={navigate} />;
            case "oracoes":
              return <Oracoes />;
            case "momento":
              return <Momento />;
            default:
              return <Home onNavigate={navigate} />;
          }
        })()}
        </Suspense>
      </ErrorBoundary>
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Navigation
        currentPage={currentPage}
        onNavigate={navigate}
      />

      <div className="flex-1">
        {renderPage()}
      </div>

      {showFooter && <Footer onNavigate={navigate} />}

            {/* FABs: Voltar ao topo + Apoie a Obra + Pedido de Oração */}
                                    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
                                      {showBackToTop && (
                                        <button
                                          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                                          className="w-10 h-10 bg-card border border-border text-muted-foreground hover:text-foreground hover:border-accent/50 rounded-full shadow flex items-center justify-center transition-all"
                                          aria-label="Voltar ao topo"
                                        >
                                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                                          </svg>
                                        </button>
                                      )}
                                      <SupportButton onNavigate={navigate} />
                                      <PrayerButton />
                                    </div>
    </div>
  );
}