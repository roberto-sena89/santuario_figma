import { useState } from "react";
import { CHURCH } from "../data/church";

type FormState = "idle" | "sending" | "success" | "error";

export default function Contato() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    prayer: false,
  });
  const [state, setState] = useState<FormState>("idle");

  const update = (key: keyof typeof form, value: string | boolean) =>
    setForm((f) => ({ ...f, [key]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setState("sending");
    // Simulate a submission (replace with real endpoint)
    await new Promise((r) => setTimeout(r, 1500));
    setState("success");
  };

  if (state === "success") {
    return (
      <main id="main-content" className="min-h-screen bg-background pt-16 flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 dark:bg-green-900/30">
            <svg className="w-10 h-10 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="font-display text-2xl font-semibold text-foreground mb-3">
            Mensagem enviada!
          </h2>
          <p className="text-muted-foreground text-base leading-relaxed mb-6">
            Obrigado por entrar em contato, {form.name.split(" ")[0]}! Respondemos em até 2 dias úteis.
            {form.prayer && " Seu pedido de oração foi recebido com amor e será levado ao Senhor."}
          </p>
          <button
            onClick={() => {
              setState("idle");
              setForm({ name: "", email: "", phone: "", subject: "", message: "", prayer: false });
            }}
            className="bg-accent hover:bg-accent/90 text-white font-semibold px-6 py-3 rounded-lg text-sm transition-colors"
          >
            Enviar outra mensagem
          </button>
        </div>
      </main>
    );
  }

  return (
    <main id="main-content" className="min-h-screen bg-background pt-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-10">
          <p className="text-accent text-sm font-medium uppercase tracking-widest mb-2">
            Fale Conosco
          </p>
          <h1 className="font-display text-3xl sm:text-4xl font-light text-foreground">
            Contato
          </h1>
          <p className="text-muted-foreground mt-2 max-w-lg">
            Tem perguntas, pedidos de oração ou quer saber mais sobre nossa igreja? Estamos aqui para ajudar.
          </p>
        </div>

        <div className="grid lg:grid-cols-[1fr_380px] gap-12">
          {/* Form */}
          <div className="bg-card border border-border rounded-2xl p-6 sm:p-8">
            <h2 className="font-display text-xl font-semibold text-foreground mb-6">
              Envie uma mensagem
            </h2>
            <form onSubmit={handleSubmit} noValidate>
              <div className="grid sm:grid-cols-2 gap-5 mb-5">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-foreground mb-1.5">
                    Nome <span className="text-red-500" aria-label="obrigatório">*</span>
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    autoComplete="name"
                    value={form.name}
                    onChange={(e) => update("name", e.target.value)}
                    placeholder="Seu nome completo"
                    className="w-full px-4 py-2.5 bg-background border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:border-accent focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-foreground mb-1.5">
                    E-mail <span className="text-red-500" aria-label="obrigatório">*</span>
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    autoComplete="email"
                    value={form.email}
                    onChange={(e) => update("email", e.target.value)}
                    placeholder="seu@email.com"
                    className="w-full px-4 py-2.5 bg-background border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:border-accent focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-5 mb-5">
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-1.5">
                    Telefone / WhatsApp
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    autoComplete="tel"
                    value={form.phone}
                    onChange={(e) => update("phone", e.target.value)}
                    placeholder="(11) 9 9999-9999"
                    className="w-full px-4 py-2.5 bg-background border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:border-accent focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-foreground mb-1.5">
                    Assunto
                  </label>
                  <select
                    id="subject"
                    value={form.subject}
                    onChange={(e) => update("subject", e.target.value)}
                    className="w-full px-4 py-2.5 bg-background border border-border rounded-lg text-sm text-foreground focus:border-accent focus:outline-none transition-colors"
                    aria-label="Selecionar assunto"
                  >
                    <option value="">Selecionar...</option>
                    <option value="visita">Quero visitar a igreja</option>
                    <option value="oracao">Pedido de oração</option>
                    <option value="aconselhamento">Aconselhamento pastoral</option>
                    <option value="ministerio">Participar de ministério</option>
                    <option value="contribuicao">Dúvida sobre contribuição</option>
                    <option value="outro">Outro assunto</option>
                  </select>
                </div>
              </div>

              <div className="mb-5">
                <label htmlFor="message" className="block text-sm font-medium text-foreground mb-1.5">
                  Mensagem <span className="text-red-500" aria-label="obrigatório">*</span>
                </label>
                <textarea
                  id="message"
                  required
                  rows={5}
                  value={form.message}
                  onChange={(e) => update("message", e.target.value)}
                  placeholder="Escreva sua mensagem aqui..."
                  className="w-full px-4 py-2.5 bg-background border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:border-accent focus:outline-none transition-colors resize-y"
                />
              </div>

              <label className="flex items-start gap-3 mb-6 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={form.prayer}
                  onChange={(e) => update("prayer", e.target.checked)}
                  className="mt-0.5 w-4 h-4 rounded border-border accent-accent cursor-pointer"
                  aria-describedby="prayer-desc"
                />
                <div>
                  <span className="text-sm text-foreground font-medium group-hover:text-accent transition-colors">
                    Incluir como pedido de oração
                  </span>
                  <p id="prayer-desc" className="text-xs text-muted-foreground mt-0.5">
                    Sua mensagem será levada em oração pela nossa equipe de intercessão.
                  </p>
                </div>
              </label>

              {state === "error" && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4 text-sm text-red-700 dark:bg-red-900/20 dark:border-red-800 dark:text-red-400">
                  Erro ao enviar mensagem. Por favor, tente novamente.
                </div>
              )}

              <button
                type="submit"
                disabled={state === "sending"}
                className="w-full bg-accent hover:bg-accent/90 disabled:opacity-60 text-white font-semibold py-3.5 rounded-lg text-sm transition-colors flex items-center justify-center gap-2"
              >
                {state === "sending" ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" aria-hidden="true" />
                    Enviando...
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                    Enviar mensagem
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Contact info sidebar */}
          <aside className="space-y-5">
            {/* Contact cards */}
            {[
              {
                icon: (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                ),
                label: "Endereço",
                value: CHURCH.address.full,
                href: CHURCH.address.mapsUrl,
                linkLabel: "Ver no mapa",
              },
              {
                icon: (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                ),
                label: "Telefone",
                value: CHURCH.phone,
                href: `tel:${CHURCH.phone.replace(/\D/g, "")}`,
                linkLabel: "Ligar agora",
              },
              {
                icon: (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                ),
                label: "E-mail",
                value: CHURCH.email,
                href: `mailto:${CHURCH.email}`,
                linkLabel: "Enviar e-mail",
              },
            ].map((item) => (
              <div key={item.label} className="bg-card border border-border rounded-xl p-5 flex gap-4">
                <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center text-accent flex-shrink-0">
                  {item.icon}
                </div>
                <div>
                  <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide mb-0.5">
                    {item.label}
                  </p>
                  <p className="text-foreground text-sm mb-1">{item.value}</p>
                  <a href={item.href} target="_blank" rel="noopener noreferrer" className="text-accent text-xs font-medium hover:underline">
                    {item.linkLabel} →
                  </a>
                </div>
              </div>
            ))}

            {/* WhatsApp */}
            <a
              href={`https://wa.me/${CHURCH.whatsapp}?text=${encodeURIComponent(CHURCH.whatsappMessage)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 bg-green-600 hover:bg-green-700 text-white rounded-xl p-5 transition-colors"
            >
              <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.117.554 4.099 1.523 5.82L0 24l6.334-1.5C8.024 23.427 9.979 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818c-1.983 0-3.847-.535-5.455-1.47l-.393-.228-4.003.949.964-3.87-.253-.407A9.776 9.776 0 012.182 12C2.182 6.59 6.59 2.182 12 2.182 17.41 2.182 21.818 6.59 21.818 12c0 5.41-4.408 9.818-9.818 9.818z" />
                </svg>
              </div>
              <div>
                <p className="font-semibold text-sm">Falar pelo WhatsApp</p>
                <p className="text-white/80 text-xs">Resposta rápida em horário comercial</p>
              </div>
            </a>

            {/* Service hours reminder */}
            <div className="bg-muted rounded-xl p-5">
              <h3 className="font-semibold text-foreground text-sm mb-3">Horários dos cultos</h3>
              <ul className="space-y-1.5 text-sm text-muted-foreground">
                <li><span className="font-medium text-foreground">Dom</span> — 09h · 10h30 · 19h</li>
                <li><span className="font-medium text-foreground">Ter</span> — 19h30 (Santa Ceia)</li>
                <li><span className="font-medium text-foreground">Qua</span> — 19h30 (Estudo Bíblico)</li>
                <li><span className="font-medium text-foreground">Qui</span> — 19h30 (Oração)</li>
                <li><span className="font-medium text-foreground">Sex</span> — 19h30 (Jovens)</li>
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
