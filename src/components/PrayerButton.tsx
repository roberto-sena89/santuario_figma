import { CHURCH } from "../data/church";

/**
 * Botao flutuante de Pedido de Oracao.
 *
 * Posicionado no canto inferior direito. Direciona para o WhatsApp
 * da igreja com mensagem pastoral pre-pronta.
 *
 * Copy prioriza acolhimento, sigilo e fe:
 *  - Eyebrow: "Com amor e fe" (acolhimento + fe)
 *  - Headline: "Peça uma oração" (CTA claro: peça que orem por você)
 *  - Tooltip no hover: "Sigilo pastoral" + "Tiago 5:14"
 *  - Mensagem WhatsApp cita Tiago 5:14 e oferece confidencialidade
 *
 * Icone: SVG personalizado de maos em oracao (palmas unidas,
 * com glow suave no hover). Substitui o emoji ?? que tinha
 * problemas de encoding em alguns clients.
 *
 * Recursos visuais:
 *  - Pulso suave pra chamar atencao sem ser intrusivo (3s)
 *  - Glow ambar cresce no hover
 *  - Seta que aparece no hover
 *  - Anel de foco acessivel
 */
export default function PrayerButton() {
  // Mensagem pastoral — Tiago 5:14 + convite + sigilo
  // Acentos UTF-8 (sem em-dash, bullet, emoji)
  const message = encodeURIComponent(
    "Olá, equipe de intercessão!\n\n" +
      "Conforme Tiago 5:14, gostaria de pedir oração. " +
      "Estou passando por um momento e creio que Deus ouve as nossas orações. " +
      "Se possível, gostaria de manter em sigilo. " +
      "Que Deus abençoe cada um de vocês pela dedicação.\n\n" +
      "Muito obrigado(a)!"
  );

  const href = `https://wa.me/${CHURCH.whatsapp}?text=${message}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative inline-flex flex-col items-center justify-center rounded-2xl border border-[#D4A24C]/20 bg-white px-6 py-4 text-center shadow-lg shadow-black/10 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-[#D4A24C]/30 hover:shadow-xl hover:shadow-black/15 active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4A24C]/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      aria-label="Pedir oração pelo WhatsApp - equipe de intercessão"
    >
      {/* Texto centralizado — sem ícone, alinhamento impecável */}
      <span className="flex flex-col items-center gap-1 leading-none">
        <span className="text-[9px] font-bold uppercase tracking-[0.22em] text-[#B8860B]/60">
          Com amor e fé
        </span>
        <span className="font-serif text-[15px] font-semibold tracking-tight text-gray-900">
          Peça uma oração
        </span>
        <span className="mt-1 text-[11px] font-medium leading-relaxed text-gray-500">
          Sigilo pastoral · Tiago 5:14
        </span>
      </span>

      {/* Tooltip pastoral — desktop */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute right-full top-1/2 -translate-y-1/2 mr-3 hidden whitespace-nowrap rounded-xl border border-border bg-white px-3.5 py-2.5 text-left opacity-0 shadow-xl transition-all duration-300 group-hover:opacity-100 lg:block"
      >
        <span className="block text-[11px] font-semibold tracking-wide text-gray-900">Equipe de intercessão</span>
        <span className="block text-[11px] leading-relaxed text-gray-500">Oração com sigilo e acolhimento</span>
      </span>
    </a>
  );
}