import { CHURCH } from "../data/church";

/**
 * Botao flutuante de Pedido de Oracao.
 *
 * Posicionado no canto inferior direito. Direciona para o WhatsApp
 * da igreja com mensagem pastoral pre-pronta.
 *
 * Copy prioriza acolhimento, sigilo e fe:
 *  - Eyebrow: "Com amor e fe" (acolhimento + fe)
 *  - Headline: "Peca uma oracao" (CTA claro: peca que orem por voce)
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
  // ASCII puro + acentos UTF-8 (sem em-dash, bullet, emoji)
  const message = encodeURIComponent(
    "Ola, equipe de intercessao!\n\n" +
      "Conforme Tiago 5:14, gostaria de pedir oracao. " +
      "Estou passando por um momento e creio que Deus ouve as nossas oracoes. " +
      "Se possivel, gostaria de manter em sigilo. " +
      "Que Deus abencoe cada um de voces pela dedicacao.\n\n" +
      "Muito obrigado(a)!"
  );

  const href = `https://wa.me/${CHURCH.whatsapp}?text=${message}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative inline-flex items-center gap-3 rounded-full bg-[#D4A24C] pl-3 pr-5 py-3 text-gray-900 shadow-lg shadow-[#D4A24C]/30 transition-all duration-300 hover:scale-[1.03] hover:shadow-2xl hover:shadow-[#D4A24C]/45 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4A24C]/70 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      aria-label="Pedir oracao pelo WhatsApp - equipe de intercessao"
    >
      {/* Halo de pulso (nao-interativo) */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-full bg-[#D4A24C]/45 animate-ping"
        style={{ animationDuration: "3s" }}
      />

      {/* Icone em container com glow suave no hover */}
      <span
        aria-hidden="true"
        className="relative grid h-10 w-10 flex-shrink-0 place-items-center rounded-full bg-white/25 shadow-inner transition-transform duration-300 group-hover:scale-110"
      >
        {/* Glow decorativo atras do icone (visivel no hover) */}
        <span
          aria-hidden="true"
          className="absolute inset-0 rounded-full bg-white/0 transition-colors duration-300 group-hover:bg-white/15"
        />

        {/* Emoji de maos em oracao 🙏 (escape Unicode pra evitar
            problemas de encoding do arquivo). Universalmente
            reconhecido: "pedido de oracao" em qualquer cultura. */}
        <span
          aria-hidden="true"
          className="relative text-2xl leading-none drop-shadow-sm transition-transform duration-300 group-hover:scale-110"
          style={{ fontFamily: "system-ui, -apple-system, 'Segoe UI Emoji', 'Apple Color Emoji', sans-serif" }}
        >
          {"\u{1F64F}"}
        </span>
      </span>

      {/* Hierarquia textual: eyebrow pastoral + headline caloroso */}
      <span className="relative flex flex-col items-start leading-tight">
        <span className="text-[9.5px] font-bold uppercase tracking-[0.22em] text-gray-700/65">
          Fale Conosco
        </span>
        <span className="font-serif text-[15.5px] font-semibold tracking-tight">
          Peca uma oracao
        </span>
      </span>

      {/* Seta que aparece no hover (feedback direcional) */}
      <svg
        aria-hidden="true"
        className="relative h-3.5 w-3.5 flex-shrink-0 opacity-0 -ml-1 transition-all duration-300 group-hover:opacity-100 group-hover:ml-0 text-gray-900"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
      </svg>

      {/* Tooltip pastoral (aparece no hover, desktop) */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute right-full top-1/2 -translate-y-1/2 mr-3 hidden whitespace-nowrap rounded-lg bg-gray-800 px-3 py-2 text-[11.5px] font-medium text-gray-100 opacity-0 shadow-xl ring-1 ring-gray-700 transition-all duration-300 group-hover:opacity-100 lg:block"
      >
        <span className="block font-semibold tracking-wide">Sigilo pastoral</span>
        <span className="block text-[10.5px] text-gray-400">
          Equipe de intercessao - Tiago 5:14
        </span>
      </span>
    </a>
  );
}