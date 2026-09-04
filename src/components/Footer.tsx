import { useEffect, useState } from "react";
import { CHURCH } from "../data/church";
import type { Page } from "./Navigation";

interface FooterProps {
  onNavigate: (page: Page) => void;
}

const NAV_PRIMARY: [string, Page][] = [
  ["Início", "home"],
  ["Bíblia Sagrada", "biblia"],
  ["Palavra do Dia", "palavra-do-dia"],
  ["Devocional", "devocional"],
  ["Cultos e Agenda", "cultos"],
];

const NAV_CHURCH: [string, Page][] = [
  ["Quem Somos", "quem-somos"],
  ["Ministérios", "ministerios"],
  ["Playbacks", "playbacks"],
  ["Harpa Cristã", "harpa"],
  ["Contribuições", "contribuicoes"],
  ["Contato", "contato"],
];

const SOCIALS = [
  {
    href: CHURCH.social.instagram,
    label: "Instagram",
    d: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z",
  },
  {
    href: CHURCH.social.facebook,
    label: "Facebook",
    d: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z",
  },
  {
    href: CHURCH.social.youtube,
    label: "YouTube",
    d: "M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z",
  },
];

export default function Footer({ onNavigate }: FooterProps) {
  const navigate = (page: Page) => {
    onNavigate(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const year = new Date().getFullYear();
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  // Calcula horas até o próximo culto (baseado na agenda real)
  const [hoursUntil, setHoursUntil] = useState<string | null>(null);
  const [nextServiceLabel, setNextServiceLabel] = useState<string>("");
  useEffect(() => {
    const SERVICES = [
      { day: 0, hour: 9, min: 0, label: "09h · Congregação Fazenda Nova" },
      { day: 0, hour: 18, min: 0, label: "18h · Igreja Sede" },
      { day: 3, hour: 19, min: 0, label: "19h · Culto de Ensino" },
    ];
    const update = () => {
      const now = new Date();
      let bestDiff = Infinity;
      let bestLabel = "";
      for (const s of SERVICES) {
        const next = new Date(now);
        let daysUntil = (s.day - now.getDay() + 7) % 7;
        if (daysUntil === 0) {
          const currentSecs = now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds();
          const serviceSecs = s.hour * 3600 + s.min * 60;
          if (currentSecs >= serviceSecs) daysUntil = 7;
        }
        next.setDate(now.getDate() + daysUntil);
        next.setHours(s.hour, s.min, 0, 0);
        const diff = next.getTime() - now.getTime();
        if (diff > 0 && diff < bestDiff) {
          bestDiff = diff;
          bestLabel = s.label;
        }
      }
      if (bestDiff === Infinity) return;
      const hours = Math.floor(bestDiff / (1000 * 60 * 60));
      const mins = Math.floor((bestDiff % (1000 * 60 * 60)) / (1000 * 60));
      setNextServiceLabel(bestLabel);
      if (hours < 1) setHoursUntil(`em ${mins}min`);
      else if (hours < 24) setHoursUntil(`em ${hours}h ${mins}min`);
      else setHoursUntil(`em ${Math.floor(hours / 24)}d ${hours % 24}h`);
    };
    update();
    const t = setInterval(update, 60_000);
    return () => clearInterval(t);
  }, []);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes("@")) return;
    setSubscribed(true);
    setEmail("");
    setTimeout(() => setSubscribed(false), 4000);
  };

  return (
    <footer
      className="relative bg-graphite text-graphite-fg overflow-hidden"
      role="contentinfo"
    >
      {/* Camadas decorativas — profundidade sem ruído */}
      <div
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#D4A24C]/40 to-transparent"
        aria-hidden="true"
      />
      <div
        className="absolute -top-40 left-1/2 -translate-x-1/2 h-80 w-[600px] rounded-full bg-[#D4A24C]/8 blur-3xl pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
          backgroundSize: "32px 32px",
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-4 pt-20 pb-8 sm:px-6 lg:px-8">
        {/* ════════════════════════════════════════════════════
            BLOCO 1 — Marca + tagline + redes + newsletter
            ════════════════════════════════════════════════════ */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16 pb-14 border-b border-graphite-fg/10">
          {/* Brand col — 5/12 */}
          <div className="lg:col-span-5">
            <div className="flex items-center gap-3.5 mb-7">
              <div
                className="relative grid h-12 w-12 place-items-center rounded-full bg-[#D4A24C]/15 ring-1 ring-[#D4A24C]/30 shadow-sm shadow-[#D4A24C]/20 transition-all duration-300 group-hover:shadow-md group-hover:shadow-[#D4A24C]/40"
                aria-hidden="true"
              >
                <svg
                  className="h-6 w-6 text-[#E8B35E]"
                  viewBox="0 0 32 32"
                  fill="none"
                  aria-hidden="true"
                >
                  <path d="M16 10c-1.6-1.2-3.8-1.6-6.5-1.4-.6 0-1 .5-1 1v10.6c0 .6.5 1 1 1C12.2 21 14.4 21.4 16 22.6c1.6-1.2 3.8-1.6 6.5-1.4.6 0 1-.5 1-1V9.6c0-.6-.5-1-1-1-2.7-.2-4.9.2-6.5 1.4z" fill="currentColor" />
                  <path d="M16 10v12.6" stroke="currentColor" strokeWidth="1" opacity="0.35" />
                  <path d="M11 11.5c1.4-.1 2.6.1 3.5.5v9.8c-.9-.4-2.1-.6-3.5-.5v-9.8zM21 11.5c-1.4-.1-2.6.1-3.5.5v9.8c.9-.4 2.1-.6 3.5-.5v-9.8z" fill="currentColor" opacity="0.25" />
                </svg>
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-[0.24em] text-graphite-fg/45 leading-none font-semibold">
                  {CHURCH.name.split(CHURCH.shortName)[0].trim()}
                </div>
                <div className="mt-1.5 flex items-baseline gap-1.5">
                  <span className="font-display text-xl font-semibold leading-none tracking-tight text-graphite-fg">
                    {CHURCH.shortName}
                  </span>
                  {CHURCH.name.split(CHURCH.shortName)[1] && (
                    <span className="font-display text-[15px] font-normal italic leading-none text-[#E8B35E]/90">
                      {CHURCH.name.split(CHURCH.shortName)[1].trim()}
                    </span>
                  )}
                </div>
                <div className="mt-2 flex items-center gap-2">
                  <span className="h-1 w-1 rounded-full bg-[#D4A24C]" aria-hidden="true" />
                  <span className="text-[10px] uppercase tracking-[0.22em] text-[#E8B35E]/70 font-medium">
                    {CHURCH.slogan}
                  </span>
                </div>
              </div>
            </div>

            <p className="max-w-md text-[14px] leading-[1.75] text-graphite-fg/75 font-serif font-light italic">
              {CHURCH.description}
            </p>

            {/* Status indicator — cultos */}
            {hoursUntil && (
              <div className="mt-6 inline-flex flex-col items-start gap-1 rounded-2xl border border-[#D4A24C]/30 bg-[#D4A24C]/10 backdrop-blur-sm px-4 py-2.5 shadow-sm shadow-[#D4A24C]/10">
                <span className="flex items-center gap-2.5">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success/70 opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
                  </span>
                  <span className="text-[11px] font-semibold text-[#E8B35E]">
                    Próximo culto {hoursUntil}
                  </span>
                </span>
                {nextServiceLabel && (
                  <span className="pl-4.5 text-[11px] text-graphite-fg/70">
                    {nextServiceLabel}
                  </span>
                )}
              </div>
            )}

            {/* Redes sociais */}
            <div className="mt-7 flex items-center gap-2">
              {SOCIALS.map((s) => (
                <a
                  key={s.href}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${s.label} da igreja`}
                  className="group relative grid h-10 w-10 place-items-center rounded-full border border-[#D4A24C]/25 bg-[#D4A24C]/5 text-[#E8B35E]/80 transition-all duration-300 hover:scale-105 hover:border-[#D4A24C]/60 hover:bg-[#D4A24C]/15 hover:text-[#E8B35E] hover:shadow-md hover:shadow-[#D4A24C]/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4A24C]/50 focus-visible:ring-offset-2 focus-visible:ring-offset-graphite"
                >
                  <svg
                    className="h-4 w-4 transition-transform duration-300 group-hover:scale-110"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d={s.d} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Newsletter col — 7/12 */}
          <div className="lg:col-span-7 flex flex-col">
            <div className="rounded-2xl border border-[#D4A24C]/15 bg-gradient-to-br from-[#D4A24C]/10 via-transparent to-graphite-soft/20 p-6 sm:p-8 shadow-sm shadow-[#D4A24C]/5">
              <div className="mb-4 flex items-center gap-3">
                <span className="block h-px w-8 bg-gradient-to-r from-transparent to-[#D4A24C]/60" aria-hidden="true" />
                <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#E8B35E]/90 leading-none">
                  Palavra diária
                </span>
              </div>

              <h3 className="font-serif text-[22px] sm:text-[24px] font-light leading-snug text-graphite-fg mb-2 text-balance">
                Receba o versículo e a agenda no seu e-mail.
              </h3>
              <p className="text-[13.5px] leading-[1.65] text-graphite-fg/65 mb-5 max-w-md">
                Sem spam, só conteúdo que edifica. Cancele quando quiser.
              </p>

              <form
                onSubmit={handleSubscribe}
                className="flex flex-col gap-2 sm:flex-row sm:items-stretch"
              >
                <label className="relative flex-1">
                  <span className="sr-only">Seu e-mail</span>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="seu@email.com"
                    aria-label="Endereço de e-mail para newsletter"
                    disabled={subscribed}
                    className="w-full rounded-full border border-graphite-fg/15 bg-graphite/40 px-5 py-3 text-[13.5px] text-graphite-fg placeholder:text-graphite-fg/40 outline-none transition-all duration-200 focus:border-accent/60 focus:bg-graphite/60 focus:ring-2 focus:ring-accent/20 disabled:opacity-50"
                  />
                </label>
                <button
                  type="submit"
                  disabled={subscribed}
                  className="group inline-flex items-center justify-center gap-2 rounded-full bg-[#D4A24C] px-6 py-3 text-[13.5px] font-semibold text-gray-900 shadow-sm transition-all duration-200 hover:bg-[#C4933C] hover:shadow-md hover:shadow-[#D4A24C]/25 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4A24C]/70 focus-visible:ring-offset-2 focus-visible:ring-offset-graphite disabled:opacity-60"
                >
                  {subscribed ? (
                    <>
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                      Inscrito
                    </>
                  ) : (
                    <>
                      Quero receber
                      <svg className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </>
                  )}
                </button>
              </form>

              <p className="mt-3 text-[10.5px] text-graphite-fg/45">
                Ao se inscrever, você concorda com nossa política de privacidade.
              </p>
            </div>
          </div>
        </div>

        {/* ════════════════════════════════════════════════════
            BLOCO 2 — Colunas de links + Contato + Agenda
            ════════════════════════════════════════════════════ */}
        <div className="grid grid-cols-1 gap-12 pt-14 sm:grid-cols-2 lg:grid-cols-12 lg:gap-12">
          <FooterColumn
            title="Navegação"
            items={NAV_PRIMARY}
            onNavigate={navigate}
            numbered
            className="sm:col-span-1 lg:col-span-3"
          />
          <FooterColumn
            title="A Igreja"
            items={NAV_CHURCH}
            onNavigate={navigate}
            className="sm:col-span-1 lg:col-span-3"
          />

          {/* Contato + agenda */}
          <div className="lg:col-span-6">
            <FooterTitle>Contato & Agenda</FooterTitle>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5">
              <div className="space-y-3.5 text-[13.5px] leading-[1.6]">
                <ContactRow icon="map">{CHURCH.address.full}</ContactRow>
                <ContactRow icon="phone">
                  <a
                    href={`tel:${CHURCH.phone.replace(/\D/g, "")}`}
                    className="text-graphite-fg/75 transition-colors hover:text-[#E8B35E]"
                  >
                    {CHURCH.phone}
                  </a>
                </ContactRow>
                <ContactRow icon="mail">
                  <a
                    href={`mailto:${CHURCH.email}`}
                    className="break-all text-graphite-fg/75 transition-colors hover:text-[#E8B35E]"
                  >
                    {CHURCH.email}
                  </a>
                </ContactRow>
              </div>

              <div className="rounded-xl border border-[#D4A24C]/15 bg-[#D4A24C]/5 px-5 py-5">
                <div className="mb-4 flex items-center gap-3">
                  <span className="block h-px w-6 bg-gradient-to-r from-transparent to-[#D4A24C]/60" aria-hidden="true" />
                  <h3 className="text-[10.5px] font-semibold uppercase tracking-[0.28em] text-[#E8B35E]/90 leading-none">
                    Horários dos Cultos
                  </h3>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-start gap-4">
                    <span className="flex-shrink-0 w-20 text-[12.5px] font-medium uppercase tracking-wider text-graphite-fg/55 pt-px">Domingo</span>
                    <div className="flex flex-col gap-1.5 text-[12.5px] leading-snug tabular-nums text-graphite-fg/85">
                      <span>09h <span className="text-graphite-fg/45">·</span> Congregação Fazenda Nova</span>
                      <span>18h <span className="text-graphite-fg/45">·</span> Igreja Sede</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-4 pt-3 border-t border-[#D4A24C]/10">
                    <span className="flex-shrink-0 w-20 text-[12.5px] font-medium uppercase tracking-wider text-graphite-fg/55 pt-px">Quarta</span>
                    <div className="flex flex-col gap-1.5 text-[12.5px] leading-snug tabular-nums text-graphite-fg/85">
                      <span>19h <span className="text-graphite-fg/45">·</span> Culto de Ensino <span className="text-graphite-fg/45">·</span> Igreja Sede</span>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* ════════════════════════════════════════════════════
            BLOCO 3 — Versículo editorial + bottom bar
            ════════════════════════════════════════════════════ */}
        <div className="mt-20">
          <figure className="relative w-full overflow-hidden rounded-2xl border border-[#D4A24C]/20 bg-gradient-to-br from-[#D4A24C]/10 via-graphite-soft/40 to-[#D4A24C]/5 px-8 py-10 sm:px-12 sm:py-12 text-center shadow-sm shadow-[#D4A24C]/5 backdrop-blur-sm">
            {/* Ornamento superior */}
            <div className="mb-5 flex items-center justify-center gap-3">
              <span className="block h-px w-10 bg-gradient-to-r from-transparent to-[#D4A24C]/50" aria-hidden="true" />
              <span className="font-serif text-[14px] text-[#D4A24C]/70 leading-none" aria-hidden="true">✦</span>
              <span className="block h-px w-10 bg-gradient-to-l from-transparent to-[#D4A24C]/50" aria-hidden="true" />
            </div>
            {/* Aspas decorativas grandes */}
            <span className="pointer-events-none absolute left-4 top-4 font-serif text-[64px] leading-none text-[#D4A24C]/15 select-none" aria-hidden="true">“</span>
            <span className="pointer-events-none absolute right-4 bottom-2 font-serif text-[64px] leading-none text-[#D4A24C]/15 select-none" aria-hidden="true">”</span>
            <blockquote className="font-bible text-[19px] sm:text-[21px] italic leading-[1.6] text-graphite-fg/85 max-w-xl mx-auto text-balance">
              Porque dele, e por ele, e para ele são todas as coisas.
            </blockquote>
            <figcaption className="mt-5 inline-flex items-center gap-2">
              <span className="block h-px w-6 bg-[#D4A24C]/40" aria-hidden="true" />
              <cite className="not-italic text-[10.5px] font-semibold uppercase tracking-[0.28em] text-[#E8B35E]/85 leading-none">
                Romanos 11:36
              </cite>
              <span className="block h-px w-6 bg-[#D4A24C]/40" aria-hidden="true" />
            </figcaption>
          </figure>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 flex flex-col items-center gap-4 border-t border-graphite-fg/10 pt-7 text-center sm:flex-row sm:justify-between sm:text-left">
          <p className="text-[11.5px] text-graphite-fg/55">
            © {year}{" "}
            <span className="text-graphite-fg/75 font-medium">{CHURCH.name}</span>
            . Todos os direitos reservados.
          </p>
          <p className="text-[11px] text-graphite-fg/45">
            CNPJ {CHURCH.pix.cnpj} · Feito com ❤︎ em {CHURCH.address.city}
          </p>
        </div>
      </div>
    </footer>
  );
}

/* ════════════════════════════════════════════════════
   Subcomponentes
   ════════════════════════════════════════════════════ */

function FooterTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-6">
      <h3 className="text-[10.5px] font-bold uppercase tracking-[0.22em] text-graphite-fg/55">
        {children}
      </h3>
      <div className="mt-3 h-px w-10 bg-gradient-to-r from-[#D4A24C]/70 to-transparent" />
    </div>
  );
}

function FooterColumn({
  title,
  items,
  onNavigate,
  numbered = false,
  className = "",
}: {
  title: string;
  items: [string, Page][];
  onNavigate: (page: Page) => void;
  numbered?: boolean;
  className?: string;
}) {
  return (
    <div className={className}>
      <FooterTitle>{title}</FooterTitle>
      <ul className="space-y-2.5 text-[13.5px]">
        {items.map(([label, page], i) => (
          <li key={page}>
            <button
              onClick={() => onNavigate(page)}
              className="group inline-flex items-baseline gap-2.5 text-graphite-fg/75 transition-colors duration-150 hover:text-[#E8B35E]"
            >
              {numbered && (
                <span
                  aria-hidden="true"
                  className="font-serif text-[10px] font-light text-graphite-fg/40 tabular-nums transition-colors duration-150 group-hover:text-[#E8B35E]"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
              )}
              <span className="relative">
                {label}
                <span
                  className="absolute -bottom-0.5 left-0 h-px w-0 bg-[#D4A24C] transition-all duration-300 group-hover:w-full"
                  aria-hidden="true"
                />
              </span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ContactRow({
  icon,
  children,
}: {
  icon: "map" | "phone" | "mail";
  children: React.ReactNode;
}) {
  const paths: Record<typeof icon, string> = {
    map: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0zM15 11a3 3 0 11-6 0 3 3 0 016 0z",
    phone:
      "M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z",
    mail: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
  };

  return (
    <div className="flex items-start gap-3 group">
      <span className="mt-0.5 grid h-7 w-7 place-items-center rounded-md bg-[#D4A24C]/15 text-[#E8B35E]/85 ring-1 ring-[#D4A24C]/20 transition-colors duration-200 group-hover:bg-[#D4A24C]/25 group-hover:text-[#E8B35E]">
        <svg
          className="h-3.5 w-3.5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.7}
            d={paths[icon]}
          />
        </svg>
      </span>
      <span className="pt-0.5">{children}</span>
    </div>
  );
}
