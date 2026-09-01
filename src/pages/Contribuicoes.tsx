import { useState } from "react";
import { CHURCH } from "../data/church";
import PageTitle from "../components/ui/PageTitle";

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
                <PageTitle
                                  eyebrow="Contribuicoes"
                                  eyebrowIcon="💛"
                                  title="Dizimos e Ofertas"
                                  subtitle="Sua contribuicao financia os ministerios da igreja, as acoes sociais e a missao evangelistica. Cada oferta e um ato de adoracao e parceria com o trabalho de Deus."
                                  subtitleIcon="🎁"
                                  align="center"
                                />
                <div className="text-center max-w-3xl mx-auto my-10">
                                  <div className="bg-[#D4A24C]/8 border border-[#D4A24C]/20 rounded-2xl p-6 sm:p-8 shadow-sm">
                                    <blockquote className="font-bible italic text-foreground/80 text-xl leading-relaxed">
                                      "Cada um contribua segundo propôs no seu coração, não com tristeza ou por necessidade; porque Deus ama o que dá com alegria."
                                      <cite className="not-italic text-[#B8860B] dark:text-[#E8B35E] text-sm font-medium mt-3 block">— 2 Coríntios 9:7</cite>
                                    </blockquote>
                                  </div>
                                </div>

        <div className="grid sm:grid-cols-2 gap-8">
          {/* PIX */}
          <div className="bg-card/80 backdrop-blur-sm border border-border rounded-2xl overflow-hidden shadow-sm">
            <div className="bg-gradient-to-r from-[#D4A24C]/15 via-transparent to-transparent border-b border-border/60 p-6">
              <div className="flex items-center gap-3">
                <div className="grid h-11 w-11 place-items-center rounded-xl bg-[#D4A24C]/15 ring-1 ring-[#D4A24C]/25 shadow-sm shadow-[#D4A24C]/20">
                  <svg className="w-5 h-5 text-[#B8860B] dark:text-[#E8B35E]" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                  </svg>
                </div>
                <div>
                  <h2 className="font-display font-semibold text-foreground text-lg">PIX</h2>
                  <p className="text-muted-foreground text-xs">Transferência instantânea</p>
                </div>
              </div>
            </div>

            {/* QR Code placeholder */}
            <div className="p-6 border-b border-border/60">
              <div
                className="w-40 h-40 mx-auto bg-muted/50 rounded-2xl flex flex-col items-center justify-center gap-2 border-2 border-dashed border-[#D4A24C]/40 transition-colors duration-200 hover:border-[#D4A24C]/70"
                aria-label="Espaço para QR Code PIX"
              >
                <svg className="w-10 h-10 text-[#B8860B]/50 dark:text-[#E8B35E]/50" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
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
                <div key={item.label} className="flex items-center justify-between gap-4 rounded-xl px-3 py-2 transition-colors duration-150 hover:bg-muted/40">
                  <div className="min-w-0">
                    <p className="text-xs text-muted-foreground font-medium">{item.label}</p>
                    <p className="text-foreground text-sm font-mono truncate">{item.display}</p>
                  </div>
                  <button
                    onClick={() => copy(item.value, item.label)}
                    className="flex-shrink-0 w-7 h-7 flex items-center justify-center rounded-lg text-muted-foreground hover:text-[#B8860B] hover:bg-[#D4A24C]/10 dark:hover:text-[#E8B35E] transition-colors"
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
                className="w-full mt-4 bg-[#D4A24C] hover:bg-[#C4933C] text-gray-900 font-semibold py-3 rounded-xl text-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#D4A24C]/30"
              >
                {copied === "Chave PIX" ? "Chave copiada! ✓" : "Copiar chave PIX"}
              </button>
            </div>
          </div>

          {/* Transparência e FAQs */}
                    <div className="space-y-5">
                      {/* Transparency */}
                      <div className="group bg-card/80 backdrop-blur-sm border border-border rounded-2xl p-6 transition-all duration-300 hover:border-[#D4A24C]/40 hover:shadow-lg hover:shadow-[#D4A24C]/10">
                        <div className="flex items-center gap-3 mb-4">
                          <span className="grid h-9 w-9 place-items-center rounded-xl bg-[#D4A24C]/15 text-base ring-1 ring-[#D4A24C]/20" aria-hidden="true">
                            🛡️
                          </span>
                          <h2 className="font-display text-lg font-semibold text-foreground">
                            Transparência
                          </h2>
                        </div>
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
                              <svg className="w-4 h-4 text-[#B8860B] dark:text-[#E8B35E] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                              <span className="text-sm text-foreground">{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Duvidas */}
                      <div className="bg-[#D4A24C]/8 border border-[#D4A24C]/25 rounded-2xl p-6 transition-all duration-300 hover:shadow-lg hover:shadow-[#D4A24C]/10">
                        <div className="flex items-center gap-3 mb-3">
                          <span className="grid h-9 w-9 place-items-center rounded-xl bg-[#D4A24C]/15 text-base ring-1 ring-[#D4A24C]/20" aria-hidden="true">
                            💬
                          </span>
                          <div>
                            <p className="text-foreground font-medium text-sm">
                              Tem dúvidas sobre contribuições?
                            </p>
                          </div>
                        </div>
                        <p className="text-muted-foreground text-sm mb-4">
                          Fale diretamente com a secretaria ou tesouraria da igreja.
                        </p>
                        <a
                          href={`mailto:${CHURCH.email}`}
                          className="inline-flex items-center gap-2 text-[#B8860B] dark:text-[#E8B35E] hover:text-[#D4A24C] text-sm font-medium transition-colors"
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
