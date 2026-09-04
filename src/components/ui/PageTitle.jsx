/**
 * PageTitle — modelo padrão de título de página do site Santuario da Adoracao.
 *
 * Base: titulo "Playbacks com Letra" (aprovado pelo usuario como padrao).
 * Estrutura: badge-amber (eyebrow) + H1 Fraunces bold + subtitulo.
 *
 * Uso:
 *   <PageTitle
 *     eyebrow="Programacao"
 *     title="Cultos e"
 *     titleAccent="Agenda"        // palavra em dourado italico (opcional)
 *     subtitle="Nossa programacao semanal..."
 *   />
 *
 * Props:
 *   - eyebrow: texto pequeno do badge (uppercase automatico)
 *   - title: string principal
 *   - titleAccent: string opcional — palavra em dourado `#9C7A2E` italico
 *   - titleSuffix: string opcional — parte final apos o accent (ex: "Letra")
 *   - subtitle: string opcional — descricao abaixo do titulo
 *   - subtitleIcon: ReactNode opcional (emoji/icone) — renderiza o subtitulo
 *     como card aconchegante com chip de icone (usado em "Agenda Semanal")
 *   - align: 'center' (padrao) | 'left'
 */
export default function PageTitle({
  eyebrow,
  title,
  titleAccent,
  titleSuffix,
  subtitle,
  subtitleIcon,
  align = 'center',
}) {
  return (
    <div
      className={`mb-12 ${
        align === 'center' ? 'mx-auto max-w-3xl text-center' : 'max-w-2xl text-left'
      }`}
    >
      {/* Badge eyebrow — amber pill */}
      {eyebrow && (
        {eyebrow && (
          <p className="inline-flex items-center rounded-full bg-[#D4A24C]/15 border border-[#D4A24C]/30 px-4 py-1.5 text-[#9C7A2E] text-xs font-semibold uppercase tracking-[0.18em] mb-4">
            {eyebrow}
          </p>
        )}
      )}

      {/* H1 — Fraunces (font-display) bold */}
      <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-foreground tracking-tight leading-tight">
        {title}{' '}
        {titleAccent && (
          <span className="text-[#9C7A2E] italic font-medium">{titleAccent}</span>
        )}
        {titleSuffix && <> {titleSuffix}</>}
      </h1>

      {/* Subtitulo */}
      {subtitle && subtitleIcon ? (
        <p
          className={`mt-6 inline-flex items-start gap-3 rounded-2xl border border-[#D4A24C]/20 px-4 py-3 text-sm sm:text-base text-muted-foreground ${
            align === 'center' ? 'mx-auto max-w-xl' : 'max-w-xl'
          } leading-relaxed`}
        >
          <span>{subtitle}</span>
        </p>
      ) : subtitle ? (
        <p
          className={`mt-4 text-sm sm:text-base text-muted-foreground ${
            align === 'center' ? 'mx-auto max-w-xl' : 'max-w-xl'
          } leading-relaxed`}
        >
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}
