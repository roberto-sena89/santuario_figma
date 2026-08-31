import { useState } from "react";
import { CHURCH } from "../data/church";

export default function Contribuicoes() {
  const [copied, setCopied] = useState<string | null>(null);

  const copy = async (value: string, label: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(label);
      setTimeout(() => setCopied(null), 2500);
    } catch {
      /* ignore */
    }
  };

  const pixData = [
    { label: "Chave PIX", value: CHURCH.pix.key, display: CHURCH.pix.key },
    { label: "Tipo de chave", value: CHURCH.pix.keyType, display: CHURCH.pix.keyType },
    { label: "Beneficiário", value: CHURCH.pix.beneficiary, display: CHURCH.pix.beneficiary },
    { label: "CNPJ", value: CHURCH.pix.cnpj, display: CHURCH.pix.cnpj },
    { label: "Banco", value: CHURCH.pix.bank, display: CHURCH.pix.bank },
    { label: "Agência", value: CHURCH.pix.agency, display: CHURCH.pix.agency },
    { label: "Conta", value: CHURCH.pix.account, display: CHURCH.pix.account },
  ];

  return (
    <main id="main-content" className="min-h-screen bg-background pt-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-12 text-center max-w-2xl mx-auto">
          <p className="text-accent text-sm font-medium uppercase tracking-widest mb-2">
            Contribuições
          </p>
          <h1 className="font-display text-3xl sm:text-4xl font-light text-foreground mb-4">
            Dízimos e Ofertas
          </h1>
          <p className="text-muted-foreground leading-relaxed">
            Sua contribuição financia os ministérios da igreja, as ações sociais e a missão evangelística. Cada oferta é um ato de adoração e parceria com o trabalho de Deus.
          </p>
          <blockquote className="mt-6 font-display italic text-foreground/70 text-base">
            "Cada um contribua segundo propôs no seu coração, não com tristeza ou por necessidade; porque Deus ama o que dá com alegria."
          </blockquote>
          <cite className="not-italic text-accent text-sm font-medium">— 2 Coríntios 9:7</cite>
        </div>

        <div className="grid sm:grid-cols-2 gap-8">
          {/* PIX */}
          <div className="bg-card border border-border rounded-2xl overflow-hidden">
            <div className="bg-primary p-6">
              <div className="flex items-center gap-3 mb-1">
                <div className="w-10 h-10 bg-accent/20 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                  </svg>
                </div>
                <div>
                  <h2 className="font-display font-semibold text-primary-foreground text-lg">PIX</h2>
                  <p className="text-primary-foreground/60 text-xs">Transferência instantânea</p>
                </div>
              </div>
            </div>

            {/* QR Code placeholder */}
            <div className="p-6 border-b border-border">
              <div
                className="w-40 h-40 mx-auto bg-muted rounded-xl flex flex-col items-center justify-center gap-2 border-2 border-dashed border-border"
                aria-label="Espaço para QR Code PIX"
              >
                <svg className="w-10 h-10 text-muted-foreground opacity-40" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                </svg>
                <p className="text-muted-foreground text-xs text-center px-2">
                  Insira o QR Code PIX aqui
                </p>
              </div>
            </div>

            {/* PIX data */}
            <div className="p-6 space-y-3">
              {pixData.map((item) => (
                <div key={item.label} className="flex items-center justify-between gap-4">
                  <div className="min-w-0">
                    <p className="text-xs text-muted-foreground font-medium">{item.label}</p>
                    <p className="text-foreground text-sm font-mono truncate">{item.display}</p>
                  </div>
                  <button
                    onClick={() => copy(item.value, item.label)}
                    className="flex-shrink-0 w-7 h-7 flex items-center justify-center rounded text-muted-foreground hover:text-accent hover:bg-accent/10 transition-colors"
                    aria-label={`Copiar ${item.label}`}
                  >
                    {copied === item.label ? (
                      <svg className="w-3.5 h-3.5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                    )}
                  </button>
                </div>
              ))}

              <button
                onClick={() => copy(CHURCH.pix.key, "Chave PIX")}
                className="w-full mt-4 bg-accent hover:bg-accent/90 text-white font-semibold py-3 rounded-lg text-sm transition-colors"
              >
                {copied === "Chave PIX" ? "Chave copiada! ✓" : "Copiar chave PIX"}
              </button>
            </div>
          </div>

          {/* Transparência e FAQs */}
          <div className="space-y-5">
            {/* Transparency */}
            <div className="bg-card border border-border rounded-2xl p-6">
              <h2 className="font-display text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                <svg className="w-5 h-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                Transparência
              </h2>
              <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                Todos os recursos recebidos são gerenciados com integridade e prestação de contas. Os demonstrativos financeiros são apresentados regularmente à congregação.
              </p>
              <div className="space-y-2.5">
                {[
                  "Prestação de contas mensal em culto",
                  "CNPJ registrado e ativo",
                  "Conselho de finanças eleito pela congregação",
                  "Relatório anual disponível para membros",
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <svg className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm text-foreground">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* How is used */}
            <div className="bg-card border border-border rounded-2xl p-6">
              <h2 className="font-display text-lg font-semibold text-foreground mb-4">
                Como os recursos são usados
              </h2>
              <div className="space-y-3">
                {[
                  { label: "Ação social e diaconia", pct: 30, color: "bg-green-500" },
                  { label: "Missões e evangelismo", pct: 25, color: "bg-blue-500" },
                  { label: "Manutenção da sede", pct: 25, color: "bg-accent" },
                  { label: "Ministérios e eventos", pct: 20, color: "bg-violet-500" },
                ].map((item) => (
                  <div key={item.label}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-foreground">{item.label}</span>
                      <span className="text-muted-foreground font-medium">{item.pct}%</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${item.color}`}
                        style={{ width: `${item.pct}%` }}
                        role="progressbar"
                        aria-valuenow={item.pct}
                        aria-valuemin={0}
                        aria-valuemax={100}
                        aria-label={`${item.label}: ${item.pct}%`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Duvidas */}
            <div className="bg-accent/5 border border-accent/20 rounded-2xl p-6">
              <p className="text-foreground font-medium text-sm mb-2">
                Tem dúvidas sobre contribuições?
              </p>
              <p className="text-muted-foreground text-sm mb-4">
                Fale diretamente com a secretaria ou tesouraria da igreja.
              </p>
              <a
                href={`mailto:${CHURCH.email}`}
                className="inline-flex items-center gap-2 text-accent hover:underline text-sm font-medium"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                {CHURCH.email}
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
