import { useState, useEffect } from "react";
import { CHURCH } from "../data/church";

export type Page =
  | "home"
  | "biblia"
  | "palavra-do-dia"
  | "devocional"
  | "playbacks"
  | "harpa"
  | "cultos"
  | "ministerios"
  | "quem-somos"
  | "contribuicoes"
  | "contato";

interface NavProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
  darkMode: boolean;
  onToggleDark: () => void;
}

const NAV_ITEMS: { label: string; page: Page }[] = [
  { label: "Início", page: "home" },
  { label: "Bíblia", page: "biblia" },
  { label: "Cultos", page: "cultos" },
  { label: "Ministérios", page: "ministerios" },
  { label: "Playbacks", page: "playbacks" },
  { label: "Harpa", page: "harpa" },
  { label: "Contato", page: "contato" },
];

const MORE_ITEMS: { label: string; page: Page }[] = [
  { label: "Palavra do Dia", page: "palavra-do-dia" },
  { label: "Devocional", page: "devocional" },
  { label: "Quem Somos", page: "quem-somos" },
  { label: "Contribuições", page: "contribuicoes" },
];

export default function Navigation({ currentPage, onNavigate, darkMode, onToggleDark }: NavProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navigate = (page: Page) => {
    onNavigate(page);
    setMenuOpen(false);
    setMoreOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const allMobileItems = [...NAV_ITEMS, ...MORE_ITEMS];

  return (
    <>
      <a href="#main-content" className="skip-link">
        Pular para o conteúdo
      </a>

      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-card/95 backdrop-blur-sm border-b border-border shadow-sm"
            : "bg-card/80 backdrop-blur-sm border-b border-border/50"
        }`}
        role="banner"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <button
              onClick={() => navigate("home")}
              className="flex items-center gap-3 group"
              aria-label="Voltar para a página inicial"
            >
              <div className="w-9 h-9 rounded-full bg-accent flex items-center justify-center flex-shrink-0">
                <span className="text-white font-display font-bold text-sm leading-none">
                  {CHURCH.shortName.slice(0, 2)}
                </span>
              </div>
              <div className="hidden sm:block">
                <div className="font-display font-semibold text-foreground text-sm leading-tight group-hover:text-accent transition-colors">
                  {CHURCH.shortName}
                </div>
                <div className="text-muted-foreground text-xs leading-tight">
                  {CHURCH.slogan}
                </div>
              </div>
            </button>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-1" aria-label="Navegação principal">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.page}
                  onClick={() => navigate(item.page)}
                  className={`px-3 py-2 rounded text-sm font-medium transition-colors ${
                    currentPage === item.page
                      ? "text-accent bg-accent/10"
                      : "text-foreground/80 hover:text-foreground hover:bg-muted"
                  }`}
                  aria-current={currentPage === item.page ? "page" : undefined}
                >
                  {item.label}
                </button>
              ))}

              {/* More dropdown */}
              <div className="relative">
                <button
                  onClick={() => setMoreOpen(!moreOpen)}
                  className={`px-3 py-2 rounded text-sm font-medium transition-colors flex items-center gap-1 ${
                    MORE_ITEMS.some((i) => i.page === currentPage)
                      ? "text-accent bg-accent/10"
                      : "text-foreground/80 hover:text-foreground hover:bg-muted"
                  }`}
                  aria-expanded={moreOpen}
                  aria-haspopup="true"
                >
                  Mais
                  <svg
                    className={`w-3.5 h-3.5 transition-transform ${moreOpen ? "rotate-180" : ""}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {moreOpen && (
                  <div
                    className="absolute right-0 mt-1 w-48 bg-card border border-border rounded-lg shadow-lg py-1 z-50"
                    role="menu"
                  >
                    {MORE_ITEMS.map((item) => (
                      <button
                        key={item.page}
                        onClick={() => navigate(item.page)}
                        className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${
                          currentPage === item.page
                            ? "text-accent bg-accent/10"
                            : "text-foreground/80 hover:text-foreground hover:bg-muted"
                        }`}
                        role="menuitem"
                        aria-current={currentPage === item.page ? "page" : undefined}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </nav>

            {/* Right controls */}
            <div className="flex items-center gap-2">
              {/* Dark mode toggle */}
              <button
                onClick={onToggleDark}
                className="w-9 h-9 rounded-full flex items-center justify-center text-foreground/70 hover:text-foreground hover:bg-muted transition-colors"
                aria-label={darkMode ? "Ativar modo claro" : "Ativar modo escuro"}
              >
                {darkMode ? (
                  <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                ) : (
                  <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                )}
              </button>

              {/* Hamburger */}
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="lg:hidden w-9 h-9 rounded-full flex items-center justify-center text-foreground/70 hover:text-foreground hover:bg-muted transition-colors"
                aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
                aria-expanded={menuOpen}
                aria-controls="mobile-menu"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  {menuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div
            id="mobile-menu"
            className="lg:hidden border-t border-border bg-card"
            role="navigation"
            aria-label="Menu de navegação mobile"
          >
            <div className="max-w-7xl mx-auto px-4 py-3 grid grid-cols-2 gap-1">
              {allMobileItems.map((item) => (
                <button
                  key={item.page}
                  onClick={() => navigate(item.page)}
                  className={`text-left px-4 py-3 rounded text-sm font-medium transition-colors ${
                    currentPage === item.page
                      ? "text-accent bg-accent/10"
                      : "text-foreground/80 hover:text-foreground hover:bg-muted"
                  }`}
                  aria-current={currentPage === item.page ? "page" : undefined}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* Click-outside to close more dropdown */}
      {moreOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setMoreOpen(false)}
          aria-hidden="true"
        />
      )}
    </>
  );
}
