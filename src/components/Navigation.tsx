import { useState, useEffect, useRef } from "react";
import { CHURCH } from "../data/church";
import { House, BookOpen, CalendarDays, Users, Music, Sparkles, Mail, Heart, Globe, ChevronDown, ChevronRight, HandHeart, HandCoins } from "lucide-react";

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
  | "contato"
  | "admin"
  | "missoes"
  | "quiz"
  | "plano"
  | "oracoes"
  | "momento"
  | "escala-voluntarios";

interface NavProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
}

interface NavItem {
  label: string;
  page: Page;
  icon: React.ReactNode;
  group?: "core" | "more";
  submenu?: { label: string; page: Page; icon: React.ReactNode; desc: string; hash?: string }[];
  submenuLabel?: string;
  navigateParent?: boolean;
}

const NAV_ITEMS: NavItem[] = [
  { label: "Início", page: "home", icon: <House className="h-full w-full" />, group: "core" },
  {
    label: "Bíblia",
    page: "biblia",
    icon: <BookOpen className="h-full w-full" />,
    group: "core",
    submenuLabel: "Estudo da Palavra",
    submenu: [
      { label: "Bíblia Sagrada", page: "biblia", icon: <BookOpen className="h-full w-full" />, desc: "Leia, estude e marque versículos" },
      { label: "Plano de Leitura", page: "plano", icon: <BookOpen className="h-full w-full" />, desc: "A Bíblia inteira em 365 dias" },
      { label: "Quiz Bíblico", page: "quiz", icon: <Sparkles className="h-full w-full" />, desc: "Teste o que você aprendeu" },
    ],
  },
  {
    label: "Devocional",
    page: "devocional",
    icon: <Heart className="h-full w-full" />,
    group: "core",
    submenuLabel: "Devocionais — do rápido ao profundo",
    submenu: [
      { label: "Palavra do Dia", page: "palavra-do-dia", icon: <Sparkles className="h-full w-full" />, desc: "Um versículo para hoje" },
      { label: "Momento com Deus", page: "momento", icon: <Heart className="h-full w-full" />, desc: "Versículo + reflexão em 5 minutos" },
      { label: "Devocional Diário", page: "devocional", icon: <Heart className="h-full w-full" />, desc: "Reflexão completa + oração" },
    ],
  },
  {
    label: "Louvor",
    page: "playbacks",
    icon: <Music className="h-full w-full" />,
    group: "core",
    submenuLabel: "Música e adoração",
    submenu: [
      { label: "Playbacks", page: "playbacks", icon: <Music className="h-full w-full" />, desc: "Bases instrumentais para louvar" },
      { label: "Harpa Cristã", page: "harpa", icon: <Sparkles className="h-full w-full" />, desc: "Hinos e cânticos de adoração" },
    ],
  },
  {
    label: "Igreja",
    page: "quem-somos",
    icon: <Users className="h-full w-full" />,
    group: "core",
    submenuLabel: "Conheça a igreja",
    submenu: [
      { label: "Quem Somos", page: "quem-somos", icon: <Users className="h-full w-full" />, desc: "Nossa história, missão e liderança" },
      { label: "Cultos e Agenda", page: "cultos", icon: <CalendarDays className="h-full w-full" />, desc: "Horários, endereço e o que esperar" },
      { label: "Ministérios", page: "ministerios", icon: <Sparkles className="h-full w-full" />, desc: "Conheça nossos departamentos e grupos", hash: "#/ministerios" },
      { label: "Missões", page: "missoes", icon: <Globe className="h-full w-full" />, desc: "Conheça a obra missionária" },
      { label: "Contato", page: "contato", icon: <Mail className="h-full w-full" />, desc: "Fale conosco, endereço e WhatsApp" },
    ],
  },
];

const MORE_ITEMS: NavItem[] = [
  { label: "Mural de Oração", page: "oracoes", icon: <HandHeart className="h-full w-full" />, group: "more" },
  { label: "Contribuições", page: "contribuicoes", icon: <HandCoins className="h-full w-full" />, group: "more" },
];

const allMobileItems = [...NAV_ITEMS, ...MORE_ITEMS];

export default function Navigation({
  currentPage,
  onNavigate,
}: NavProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  const [mobileOpenSubmenu, setMobileOpenSubmenu] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const submenuRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const setSubmenuRef = (key: string) => (el: HTMLDivElement | null) => {
    submenuRefs.current[key] = el;
  };

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 12);
      const docH = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(docH > 0 ? Math.min(1, y / docH) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!openSubmenu) return;
    const onClick = (e: MouseEvent) => {
      const ref = submenuRefs.current[openSubmenu];
      if (ref && !ref.contains(e.target as Node)) {
        setOpenSubmenu(null);
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [openSubmenu]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) setMobileOpenSubmenu(null);
  }, [menuOpen]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const navigate = (page: Page) => {
    onNavigate(page);
    setMenuOpen(false);
    setOpenSubmenu(null);
    setMobileOpenSubmenu(null);
    const reduce = typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  };

  const isMoreActive = currentPage === "contribuicoes";

  return (
    <>
      <a href="#main-content" className="skip-link">
        Pular para o conteúdo
      </a>

      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,border-color] duration-500 ${
          scrolled
            ? "bg-card/90 backdrop-blur-xl border-b border-border shadow-[0_4px_24px_-8px_rgba(0,0,0,0.08)]"
            : "bg-card/70 backdrop-blur-md border-b border-border/40"
        }`}
        role="banner"
      >
        <div
          className="absolute bottom-0 inset-x-0 h-[2px] bg-border/40 overflow-hidden"
          aria-hidden="true"
        >
          <div
            className="h-full bg-gradient-to-r from-accent/60 via-accent to-accent/80 origin-left transition-transform duration-150"
            style={{ transform: `scaleX(${scrollProgress})` }}
          />
        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between gap-4">
            <button
              onClick={() => navigate("home")}
              className="group flex items-center gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 focus-visible:ring-offset-2 focus-visible:ring-offset-card rounded-lg pr-2"
              aria-label="Voltar para a página inicial"
            >
              <div className="relative">
                <div className="grid h-10 w-10 place-items-center rounded-full bg-gold/15 ring-1 ring-gold/30 shadow-sm shadow-gold/20 transition-all duration-300 group-hover:scale-105 group-hover:bg-gold/25 group-hover:shadow-md group-hover:shadow-gold/40">
                  <svg
                    className="h-5 w-5 text-gold-deep dark:text-gold-light"
                    viewBox="0 0 32 32"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M16 10c-1.6-1.2-3.8-1.6-6.5-1.4-.6 0-1 .5-1 1v10.6c0 .6.5 1 1 1C12.2 21 14.4 21.4 16 22.6c1.6-1.2 3.8-1.6 6.5-1.4.6 0 1-.5 1-1V9.6c0-.6-.5-1-1-1-2.7-.2-4.9.2-6.5 1.4z"
                      fill="currentColor"
                    />
                    <path
                      d="M16 10v12.6"
                      stroke="currentColor"
                      strokeWidth="1"
                      opacity="0.35"
                    />
                    <path
                      d="M11 11.5c1.4-.1 2.6.1 3.5.5v9.8c-.9-.4-2.1-.6-3.5-.5v-9.8zM21 11.5c-1.4-.1-2.6.1-3.5.5v9.8c.9-.4 2.1-.6 3.5-.5v-9.8z"
                      fill="currentColor"
                      opacity="0.25"
                    />
                  </svg>
                </div>
              </div>
              <div className="hidden sm:block text-left">
                <div className="text-[10px] uppercase tracking-[0.24em] text-muted-foreground/80 leading-none font-semibold">
                  {CHURCH.name.split(CHURCH.shortName)[0].trim()}
                </div>
                <div className="mt-1.5 flex items-baseline gap-1.5">
                  <span className="font-display text-[18px] font-semibold leading-none tracking-tight text-foreground transition-colors duration-200 group-hover:text-gold-deep dark:group-hover:text-gold-light">
                    {CHURCH.shortName}
                  </span>
                  {CHURCH.name.split(CHURCH.shortName)[1] && (
                    <span className="font-display text-[13px] font-normal italic leading-none text-gold-deep/80 dark:text-gold-light/80 transition-colors duration-200">
                      {CHURCH.name.split(CHURCH.shortName)[1].trim()}
                    </span>
                  )}
                </div>
                <div className="mt-2 flex items-center gap-2">
                  <span className="h-1 w-1 rounded-full bg-gold" aria-hidden="true" />
                  <span className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground leading-none font-medium">
                    {CHURCH.slogan}
                  </span>
                </div>
              </div>
            </button>

            <nav
              className="hidden lg:flex items-center gap-0.5"
              aria-label="Navegação principal"
            >
              {NAV_ITEMS.map((item) => {
                const active = currentPage === item.page;
                if (item.submenu) {
                  const isOpen = openSubmenu === item.page;
                  const subActive = item.submenu.some((s) => s.page === currentPage);
                  return (
                    <div key={item.page} className="relative" ref={setSubmenuRef(item.page)}>
                      <button
                        onClick={() => {
                          if (item.navigateParent) navigate(item.page);
                          setOpenSubmenu(isOpen ? null : item.page);
                        }}
                        onKeyDown={(e) => {
                          if (e.key === "Escape") {
                            e.stopPropagation();
                            setOpenSubmenu(null);
                          }
                          if (e.key === "ArrowDown" && !isOpen) {
                            e.preventDefault();
                            setOpenSubmenu(item.page);
                          }
                        }}
                        className={`group relative flex items-center gap-1 px-3.5 py-2 rounded-md text-[13.5px] font-medium transition-colors duration-200 ${
                          subActive || isOpen
                            ? "text-accent"
                            : "text-foreground/75 hover:text-foreground"
                        }`}
                        aria-expanded={isOpen}
                        aria-haspopup="menu"
                        aria-controls={`submenu-${item.page}`}
                      >
                        {item.label}
                        <ChevronDown
                          className={`h-3.5 w-3.5 transition-transform duration-200 ${
                            isOpen ? "rotate-180" : ""
                          }`}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          aria-hidden="true"
                         />
                        <span
                          className={`absolute inset-x-3.5 -bottom-px h-[2px] rounded-full bg-accent transition-transform duration-300 origin-center ${
                            subActive || isOpen
                              ? "scale-x-100"
                              : "scale-x-0 group-hover:scale-x-50"
                          }`}
                          aria-hidden="true"
                        />
                      </button>

                      {isOpen && (
                        <div
                          id={`submenu-${item.page}`}
                          className="absolute left-0 top-full mt-2 w-72 origin-top-left rounded-2xl border border-border bg-card/95 backdrop-blur-xl shadow-xl shadow-black/10 py-2 z-50"
                          role="menu"
                        >
                          <div className="px-3 pb-2 mb-1 border-b border-border/60">
                            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground/70">
                              {item.submenuLabel}
                            </p>
                          </div>
                          {item.submenu.map((sub) => {
                            const subActive = sub.hash
                              ? window.location.hash === sub.hash
                              : currentPage === sub.page;
                            return (
                              <button
                                key={sub.page + (sub.hash ?? "")}
                                onClick={() => {
                                  navigate(sub.page);
                                  if (sub.hash) window.location.hash = sub.hash;
                                }}
                                className={`group flex w-full items-center gap-3 px-3 py-2.5 text-[13.5px] transition-colors duration-150 ${
                                  subActive
                                    ? "text-accent bg-accent/8"
                                    : "text-foreground/80 hover:text-foreground hover:bg-muted/60"
                                }`}
                                role="menuitem"
                                aria-current={subActive ? "page" : undefined}
                              >
                                <span
                                  className={`grid h-8 w-8 flex-shrink-0 place-items-center rounded-lg transition-colors duration-150 ${
                                    subActive
                                      ? "bg-accent/15 text-accent"
                                      : "bg-muted/60 text-muted-foreground group-hover:text-foreground"
                                  }`}
                                  aria-hidden="true"
                                >
                                  <span className="h-4 w-4">{sub.icon}</span>
                                </span>
                                <span className="flex-1 text-left">
                                  <span className="block font-medium">{sub.label}</span>
                                  <span className="block text-[11px] text-muted-foreground/70 leading-tight">
                                    {sub.desc}
                                  </span>
                                </span>
                                {subActive && (
                                  <span
                                    className="h-1.5 w-1.5 rounded-full bg-accent"
                                    aria-hidden="true"
                                  />
                                )}
                              </button>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                }
                return (
                  <button
                    key={item.page}
                    onClick={() => navigate(item.page)}
                    className={`group relative px-3.5 py-2 rounded-md text-[13.5px] font-medium transition-colors duration-200 ${
                      active
                        ? "text-accent"
                        : "text-foreground/75 hover:text-foreground"
                    }`}
                    aria-current={active ? "page" : undefined}
                  >
                    {item.label}
                    <span
                      className={`absolute inset-x-3.5 -bottom-px h-[2px] rounded-full bg-accent transition-transform duration-300 origin-center ${
                        active
                          ? "scale-x-100"
                          : "scale-x-0 group-hover:scale-x-50"
                      }`}
                      aria-hidden="true"
                    />
                  </button>
                );
              })}

              <button
                onClick={() => navigate("oracoes")}
                aria-current={currentPage === "oracoes" ? "page" : undefined}
                className={`group inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold shadow-sm transition-all duration-300 hover:scale-[1.02] hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/70 focus-visible:ring-offset-2 focus-visible:ring-offset-card ${
                  currentPage === "oracoes"
                    ? "bg-gold-hover text-gray-900 shadow-gold/40"
                    : "border border-gold/40 bg-transparent text-gold-light hover:border-gold/60 hover:bg-gold/10"
                }`}
              >
                <HandHeart className="h-3 w-3" aria-hidden="true" /> Mural de Oração
                <svg
                  className="h-2.5 w-2.5 transition-transform duration-300 group-hover:translate-x-0.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>

              <button
                onClick={() => navigate("contribuicoes")}
                aria-current={isMoreActive ? "page" : undefined}
                className={`group inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold shadow-sm transition-all duration-300 hover:scale-[1.02] hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/70 focus-visible:ring-offset-2 focus-visible:ring-offset-card ${
                  isMoreActive
                    ? "bg-gold-hover text-gray-900 shadow-gold/40"
                    : "bg-gold text-gray-900 shadow-gold/30 hover:shadow-gold/45"
                }`}
              >
                <HandCoins className="h-3 w-3" aria-hidden="true" /> Apoie a Obra
                <svg
                  className="h-2.5 w-2.5 transition-transform duration-300 group-hover:translate-x-0.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </nav>

            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="lg:hidden grid h-11 w-11 place-items-center rounded-full text-foreground/70 transition-all duration-200 hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 focus-visible:ring-offset-2 focus-visible:ring-offset-card"
                aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
                aria-expanded={menuOpen}
                aria-controls="mobile-menu"
              >
                <span className="relative block h-4 w-4">
                  <span
                    className={`absolute left-0 top-0 h-0.5 w-4 rounded-full bg-current transition-all duration-300 ${
                      menuOpen ? "translate-y-1.5 rotate-45" : ""
                    }`}
                  />
                  <span
                    className={`absolute left-0 top-1.5 h-0.5 w-4 rounded-full bg-current transition-all duration-300 ${
                      menuOpen ? "scale-x-0 opacity-0" : ""
                    }`}
                  />
                  <span
                    className={`absolute left-0 top-3 h-0.5 w-4 rounded-full bg-current transition-all duration-300 ${
                      menuOpen ? "-translate-y-1.5 -rotate-45" : ""
                    }`}
                  />
                </span>
              </button>
            </div>
          </div>
        </div>

        <div
          id="mobile-menu"
          className={`lg:hidden absolute inset-x-0 top-full origin-top transition-all duration-300 ${
            menuOpen
              ? "opacity-100 translate-y-0 pointer-events-auto"
              : "opacity-0 -translate-y-2 pointer-events-none"
          }`}
          role="navigation"
          aria-label="Menu de navegação mobile"
        >
          <div className="border-t border-border bg-card/95 backdrop-blur-xl shadow-xl shadow-black/5">
            <div className="mx-auto max-w-7xl px-4 py-3">
              <div className="grid grid-cols-2 gap-1.5">
                {allMobileItems.map((item, i) => {
                  const active = currentPage === item.page;
                  if (item.submenu) {
                    const groupActive =
                      currentPage === item.page ||
                      item.submenu.some((s) => s.page === currentPage);
                    const open = mobileOpenSubmenu === item.page;
                    return (
                      <div
                        key={item.page}
                        className="col-span-2"
                        style={{ animationDelay: `${i * 30}ms` }}
                      >
                        <button
                          onClick={() => {
                            if (item.navigateParent) navigate(item.page);
                            setMobileOpenSubmenu(open ? null : item.page);
                          }}
                          aria-expanded={open}
                          aria-haspopup="true"
                          className={`group flex w-full items-center gap-3 px-3.5 py-3 rounded-lg text-[13.5px] font-medium transition-all duration-200 ${
                            open || groupActive
                              ? "bg-accent/10 text-accent ring-1 ring-accent/20"
                              : "text-foreground/80 hover:bg-muted hover:text-foreground"
                          }`}
                        >
                          <span
                            className={`grid h-7 w-7 flex-shrink-0 place-items-center rounded-md transition-colors ${
                              open || groupActive
                                ? "bg-accent/15 text-accent"
                                : "bg-muted/60 text-muted-foreground group-hover:text-foreground"
                            }`}
                            aria-hidden="true"
                          >
                            <span className="h-3.5 w-3.5">{item.icon}</span>
                          </span>
                          <span className="flex-1 truncate text-left">
                            {item.label}
                          </span>
                          <ChevronDown
                            className={`h-3.5 w-3.5 flex-shrink-0 transition-transform duration-200 ${
                              open ? "rotate-180" : ""
                            }`}
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            aria-hidden="true"
                           />
                        </button>

                        {open && (
                          <div className="mt-1 flex flex-col gap-0.5 pl-4">
                            {item.submenu.map((sub) => {
                              const subActive = sub.hash
                                ? window.location.hash === sub.hash
                                : currentPage === sub.page;
                              return (
                                <button
                                  key={sub.page + (sub.hash ?? "")}
                                  onClick={() => {
                                    navigate(sub.page);
                                    if (sub.hash) window.location.hash = sub.hash;
                                  }}
                                  className={`group flex w-full items-center gap-3 px-3.5 py-2.5 rounded-lg text-[13px] font-medium transition-all duration-150 ${
                                    subActive
                                      ? "bg-accent/10 text-accent ring-1 ring-accent/15"
                                      : "text-foreground/70 hover:bg-muted hover:text-foreground"
                                  }`}
                                  aria-current={subActive ? "page" : undefined}
                                >
                                  <span
                                    className={`grid h-6 w-6 flex-shrink-0 place-items-center rounded-md transition-colors ${
                                      subActive
                                        ? "bg-accent/15 text-accent"
                                        : "bg-muted/60 text-muted-foreground group-hover:text-foreground"
                                    }`}
                                    aria-hidden="true"
                                  >
                                    <span className="h-3 w-3">{sub.icon}</span>
                                  </span>
                                  <span className="flex-1 truncate text-left">
                                    {sub.label}
                                  </span>
                                  {subActive && (
                                    <span
                                      className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent"
                                      aria-hidden="true"
                                    />
                                  )}
                                </button>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    );
                  }
                  return (
                    <button
                      key={item.page}
                      onClick={() => navigate(item.page)}
                      style={{ animationDelay: `${i * 30}ms` }}
                      className={`group flex items-center gap-3 px-3.5 py-3 rounded-lg text-[13.5px] font-medium transition-all duration-200 ${
                        active
                          ? "bg-accent/10 text-accent ring-1 ring-accent/20"
                          : "text-foreground/80 hover:bg-muted hover:text-foreground"
                      }`}
                      aria-current={active ? "page" : undefined}
                    >
                      <span
                        className={`grid h-7 w-7 flex-shrink-0 place-items-center rounded-md transition-colors ${
                          active
                            ? "bg-accent/15 text-accent"
                            : "bg-muted/60 text-muted-foreground group-hover:text-foreground"
                        }`}
                        aria-hidden="true"
                      >
                        <span className="h-3.5 w-3.5">{item.icon}</span>
                      </span>
                      <span className="truncate">{item.label}</span>
                    </button>
                  );
                })}
              </div>

              <div className="mt-3 border-t border-border/60 pt-3">
                <p className="text-[11px] text-muted-foreground/70">
                  {CHURCH.name}
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div aria-hidden="true" className="h-16" />
    </>
  );
}
