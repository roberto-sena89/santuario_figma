import { useState, useEffect } from "react";
import Navigation, { type Page } from "./components/Navigation";
import Footer from "./components/Footer";
import PrayerButton from "./components/PrayerButton";
import Home from "./pages/Home";
import Bible from "./pages/Bible";
import PalavraDodia from "./pages/PalavraDodia";
import Devocional from "./pages/Devocional";
import Playbacks from "./pages/Playbacks";
import Harpa from "./pages/Harpa";
import Cultos from "./pages/Cultos";
import Ministerios from "./pages/Ministerios";
import QuemSomos from "./pages/QuemSomos";
import Contribuicoes from "./pages/Contribuicoes";
import Contato from "./pages/Contato";
import AdminScale from "./components/AdminScale";
import { CHURCH } from "./data/church";

const NO_FOOTER_PAGES: Page[] = ["playbacks", "admin"];

const ALL_PAGES: Page[] = [
  "home", "biblia", "palavra-do-dia", "devocional", "playbacks",
  "harpa", "cultos", "ministerios", "quem-somos", "contribuicoes",
  "contato", "admin",
];

function hashToPage(): Page {
  const h = window.location.hash.replace(/^#\/?/, "").toLowerCase();
  return (ALL_PAGES as string[]).includes(h) ? (h as Page) : "home";
}

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>(hashToPage);
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
      playbacks: `Playbacks & Louvores — ${CHURCH.shortName}`,
      harpa: `Harpa Cristã — ${CHURCH.shortName}`,
      cultos: `Cultos e Agenda — ${CHURCH.shortName}`,
      ministerios: `Ministérios — ${CHURCH.shortName}`,
      "quem-somos": `Quem Somos — ${CHURCH.shortName}`,
      contribuicoes: `Contribuições — ${CHURCH.shortName}`,
      contato: `Contato — ${CHURCH.shortName}`,
      admin: `Escala — ${CHURCH.shortName}`,
    };
    document.title = titles[currentPage] || CHURCH.name;
  }, [currentPage]);

  // Sincroniza hash com a navegação (ex: /#/admin)
  useEffect(() => {
    const onHash = () => setCurrentPage(hashToPage());
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  const navigate = (page: Page) => {
    setCurrentPage(page);
    const h = page === "home" ? "" : `#/${page}`;
    if (window.location.hash !== h) window.location.hash = h;
  };

  const showFooter = !NO_FOOTER_PAGES.includes(currentPage);

  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return <Home onNavigate={navigate} />;
      case "biblia":
        return <Bible />;
      case "palavra-do-dia":
        return <PalavraDodia onNavigate={navigate} />;
      case "devocional":
        return <Devocional />;
      case "playbacks":
        return <Playbacks />;
      case "harpa":
        return <Harpa />;
      case "cultos":
        return <Cultos />;
      case "ministerios":
        return <Ministerios />;
      case "quem-somos":
        return <QuemSomos />;
      case "contribuicoes":
        return <Contribuicoes />;
      case "contato":
        return <Contato />;
      case "admin":
        return <AdminScale />;
      default:
        return <Home onNavigate={navigate} />;
    }
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

      {/* Prayer request floating button (canto inferior direito) */}
      <PrayerButton />

      {/* Back to top */}
      {showBackToTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-24 right-6 z-40 w-10 h-10 bg-card border border-border text-muted-foreground hover:text-foreground hover:border-accent/50 rounded-full shadow flex items-center justify-center transition-all"
          aria-label="Voltar ao topo"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
          </svg>
        </button>
      )}
    </div>
  );
}