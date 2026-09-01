import { useState, useEffect, useCallback } from "react";
import Navigation, { type Page } from "./components/Navigation";
import Footer from "./components/Footer";
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
import { CHURCH } from "./data/church";

const NO_FOOTER_PAGES: Page[] = ["playbacks"];

function useDarkMode(): [boolean, () => void] {
  const [dark, setDark] = useState(() => {
    const stored = localStorage.getItem("iegv_dark_mode");
    if (stored !== null) return stored === "true";
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("iegv_dark_mode", String(dark));
  }, [dark]);

  const toggle = useCallback(() => setDark((d) => !d), []);
  return [dark, toggle];
}

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>("home");
  const [darkMode, toggleDark] = useDarkMode();
  const [showBackToTop, setShowBackToTop] = useState(false);

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
    };
    document.title = titles[currentPage] || CHURCH.name;
  }, [currentPage]);

  const showFooter = !NO_FOOTER_PAGES.includes(currentPage);

  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return <Home onNavigate={setCurrentPage} />;
      case "biblia":
        return <Bible />;
      case "palavra-do-dia":
        return <PalavraDodia onNavigate={setCurrentPage} />;
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
      default:
        return <Home onNavigate={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Navigation
        currentPage={currentPage}
        onNavigate={setCurrentPage}
        darkMode={darkMode}
        onToggleDark={toggleDark}
      />

      <div className="flex-1">
        {renderPage()}
      </div>

      {showFooter && <Footer onNavigate={setCurrentPage} />}

      {/* WhatsApp floating button */}
      <a
        href={`https://wa.me/${CHURCH.whatsapp}?text=${encodeURIComponent(CHURCH.whatsappMessage)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#1F8A4A] hover:bg-[#196D3A] text-white rounded-full shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 focus:outline-none focus:ring-2 focus:ring-olive-400 focus:ring-offset-2 focus:ring-offset-background"
        aria-label="Abrir conversa no WhatsApp"
      >
        <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
          <path d="M12 0C5.373 0 0 5.373 0 12c0 2.117.554 4.099 1.523 5.82L0 24l6.334-1.5C8.024 23.427 9.979 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818c-1.983 0-3.847-.535-5.455-1.47l-.393-.228-4.003.949.964-3.87-.253-.407A9.776 9.776 0 012.182 12C2.182 6.59 6.59 2.182 12 2.182 17.41 2.182 21.818 6.59 21.818 12c0 5.41-4.408 9.818-9.818 9.818z" />
        </svg>
      </a>

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
