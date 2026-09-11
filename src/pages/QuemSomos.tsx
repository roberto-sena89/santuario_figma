import { CHURCH } from "../data/church";

const STAINED_IMAGE =
  "https://images.unsplash.com/photo-1769184615259-e609796f63e3?w=1200&h=700&fit=crop&auto=format";

export default function QuemSomos() {
  const VALUES = [
    {
      icon: "✝",
      title: "Fidelidade à Palavra",
      text: "Acreditamos que a Bíblia é a Palavra de Deus, infalível e suficiente para toda prática de fé.",
    },
    {
      icon: "♥",
      title: "Amor ao Próximo",
      text: "O amor é o maior mandamento. Buscamos amar a Deus e ao próximo em cada ação e ministério.",
    },
    {
      icon: "◉",
      title: "Evangelismo",
      text: "O Evangelho de Cristo é poder de Deus para salvação. Somos chamados a anunciá-lo com ousadia.",
    },
    {
      icon: "✦",
      title: "Comunidade",
      text: "Nenhum cristão caminha sozinho. Valorizamos os laços de fraternidade e o crescimento mútuo.",
    },
    {
      icon: "★",
      title: "Adoração Genuína",
      text: "Adoramos a Deus em espírito e em verdade, valorizando a presença do Espírito Santo nos cultos.",
    },
    {
      icon: "◆",
      title: "Serviço e Missão",
      text: "Somos chamados a servir. Nosso compromisso vai além dos muros da igreja, alcançando nossa cidade.",
    },
  ];

  return (
    <main id="main-content" tabIndex={-1} className="min-h-screen bg-background pt-16">
      {/* Hero */}
      <section className="relative h-72 sm:h-96 overflow-hidden">
        <div className="absolute inset-0" aria-hidden="true">
                  <img
                    src={STAINED_IMAGE}
                    alt=""
                    className="w-full h-full object-cover opacity-70 saturate-[0.5]"
                    loading="lazy"
                    width={1200}
                    height={700}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                </div>
        <div className="relative h-full flex flex-col items-center justify-end pb-12 text-center px-4">
                  <p className="inline-flex items-center rounded-full bg-gold/15 border border-gold/30 px-4 py-1.5 text-gold-light text-xs font-semibold uppercase tracking-[0.18em]">
                    Nossa História
                  </p>
                  <h1 className="font-display text-3xl sm:text-5xl font-bold text-white [text-shadow:0_2px_12px_rgba(0,0,0,0.4)]">
                    Quem Somos
                  </h1>
                </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Story */}
        <section className="grid lg:grid-cols-2 gap-12 items-start mb-20" aria-labelledby="quem-historia">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <span className="grid h-11 w-11 flex-shrink-0 place-items-center rounded-2xl bg-gold/15 text-xl shadow-sm shadow-gold/20 ring-1 ring-gold/20" aria-hidden="true">
                📖
              </span>
              <h2 id="quem-historia" className="font-display text-2xl sm:text-3xl font-light text-foreground">
                Uma história de fé e crescimento
              </h2>
            </div>
            <div className="space-y-4 text-muted-foreground text-base leading-relaxed">
              <p>
                A {CHURCH.name} foi fundada em {CHURCH.founded} com um pequeno grupo de famílias reunidas em torno de um sonho: estabelecer uma comunidade de fé comprometida com o amor de Deus e o serviço ao próximo.
              </p>
              <p>
                Hoje, com mais de {CHURCH.members} membros ativos, a igreja serve como ponto de encontro espiritual para pessoas de diferentes origens e histórias de vida. Nossa missão permanece a mesma desde o início: pregar o Evangelho com clareza, amar as pessoas com autenticidade e discipular novos crentes para uma vida de fé sólida.
              </p>
              <p>
                Ao longo dos anos, Deus nos permitiu crescer em graça, em número e em alcance. Nossos ministérios atendem crianças, jovens, casais, idosos e a comunidade ao redor, sempre com o objetivo de refletir o amor de Cristo em ação concreta.
              </p>
            </div>
          </div>
          <div className="space-y-5">
            <div className="group bg-card/80 backdrop-blur-sm border border-border rounded-2xl p-6 transition-all duration-300 hover:border-gold/40 hover:shadow-lg hover:shadow-gold/10 hover:-translate-y-0.5">
              <div className="text-4xl font-display font-bold text-gold-light mb-2" aria-hidden="true">
                {new Date().getFullYear() - CHURCH.founded}+
              </div>
              <div className="font-semibold text-foreground"><span className="sr-only">{new Date().getFullYear() - CHURCH.founded} </span>Anos de ministério</div>
              <div className="text-muted-foreground text-sm">Desde {CHURCH.founded}</div>
            </div>
            <div className="group bg-card/80 backdrop-blur-sm border border-border rounded-2xl p-6 transition-all duration-300 hover:border-gold/40 hover:shadow-lg hover:shadow-gold/10 hover:-translate-y-0.5">
              <div className="text-4xl font-display font-bold text-gold-light mb-2" aria-hidden="true">
                {CHURCH.members}+
              </div>
              <div className="font-semibold text-foreground"><span className="sr-only">{CHURCH.members} </span>Membros ativos</div>
              <div className="text-muted-foreground text-sm">E crescendo a cada dia</div>
            </div>
            <div className="group bg-card/80 backdrop-blur-sm border border-border rounded-2xl p-6 transition-all duration-300 hover:border-gold/40 hover:shadow-lg hover:shadow-gold/10 hover:-translate-y-0.5">
              <div className="text-4xl font-display font-bold text-gold-light mb-2" aria-hidden="true">7</div>
              <div className="font-semibold text-foreground"><span className="sr-only">7 </span>Ministérios ativos</div>
              <div className="text-muted-foreground text-sm">Servindo a cidade</div>
            </div>
          </div>
        </section>

        {/* Mission Vision Values */}
        <section className="mb-20" aria-labelledby="quem-mvv">
                  <div className="flex items-center mb-8 bg-card/80 backdrop-blur-sm border border-border/20 rounded-2xl px-4 py-3">
                    <div>
                      <h2 id="quem-mvv" className="font-display text-2xl sm:text-3xl font-light text-foreground mb-1">
                        Missão, Visão e Valores
                      </h2>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        O que nos move, onde queremos chegar e quem somos
                      </p>
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-3 gap-6 mb-12">
                    <div className="group bg-card/80 backdrop-blur-sm border border-border/20 rounded-2xl p-7 transition-all duration-300 hover:border-gold/30 hover:shadow-lg hover:shadow-gold/10 hover:-translate-y-0.5">
                      <h3 className="font-display text-lg font-semibold text-foreground mb-1 uppercase tracking-[0.05em]">
                        Nossa Missão
                      </h3>
                      <div className="w-8 h-0.5 bg-accent/40 mb-4 rounded-full" />
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        Glorificar a Deus fazendo discípulos de Jesus Cristo em todos os âmbitos da vida, edificando o corpo de Cristo com a Palavra e o Espírito.
                      </p>
                    </div>
                    <div className="group bg-card/80 backdrop-blur-sm border border-border/20 rounded-2xl p-7 transition-all duration-300 hover:border-gold/30 hover:shadow-lg hover:shadow-gold/10 hover:-translate-y-0.5">
                      <h3 className="font-display text-lg font-semibold text-foreground mb-1 uppercase tracking-[0.05em]">
                        Nossa Visão
                      </h3>
                      <div className="w-8 h-0.5 bg-accent/40 mb-4 rounded-full" />
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        Ser uma igreja relevante, acolhedora e transformadora, que alcance gerações e comunidades com o amor de Cristo, impactando nossa cidade e além.
                      </p>
                    </div>
                    <div className="group bg-card/80 backdrop-blur-sm border border-border/20 rounded-2xl p-7 transition-all duration-300 hover:border-gold/30 hover:shadow-lg hover:shadow-gold/10 hover:-translate-y-0.5">
                      <h3 className="font-display text-lg font-semibold text-foreground mb-1 uppercase tracking-[0.05em]">
                        Nossos Valores
                      </h3>
                      <div className="w-8 h-0.5 bg-accent/40 mb-4 rounded-full" />
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        Fé bíblica, amor ao próximo, integridade, comunhão, evangelismo, adoração genuína e serviço incondicional.
                      </p>
                    </div>
                  </div>

                  {/* Values grid */}
                  <h3 className="sr-only">Valores</h3>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {VALUES.map((v, i) => (
                      <div key={i} className="group bg-card/80 backdrop-blur-sm border border-border/20 rounded-2xl p-5 transition-all duration-300 hover:border-gold/30 hover:shadow-lg hover:shadow-gold/8 hover:-translate-y-0.5">
                        <h4 className="font-display font-semibold text-foreground text-sm mb-2 uppercase tracking-[0.04em]">
                          {v.title}
                        </h4>
                        <div className="w-6 h-0.5 bg-accent/30 mb-3 rounded-full" aria-hidden="true" />
                        <p className="text-muted-foreground text-sm leading-relaxed">{v.text}</p>
                      </div>
                    ))}
                  </div>
                </section>

        {/* Leadership */}
        <section aria-labelledby="quem-lideranca">
          <div className="flex items-center mb-8 bg-card/80 backdrop-blur-sm border border-border/20 rounded-2xl px-4 py-3">
            <div>
              <h2 id="quem-lideranca" className="font-display text-2xl sm:text-3xl font-light text-foreground mb-1">
                Nossa Liderança
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Pessoas que conduzem nossa comunidade com fé e dedicação
              </p>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {CHURCH.leadership.map((leader, i) => (
              <div key={i} className="group bg-card/80 backdrop-blur-sm border border-border/20 rounded-2xl p-7 transition-all duration-300 hover:border-gold/30 hover:shadow-lg hover:shadow-gold/10 hover:-translate-y-0.5">
                <h3 className="font-display font-semibold text-foreground text-base mb-1 uppercase tracking-[0.04em]">
                  {leader.name}
                </h3>
                <div className="w-6 h-0.5 bg-accent/30 mb-3 rounded-full" />
                <p className="text-muted-foreground text-xs font-semibold uppercase tracking-wide mb-3">
                  {leader.role}
                </p>
                <p className="text-muted-foreground text-sm leading-relaxed">{leader.bio}</p>
              </div>
            ))}
          </div>
        </section>

        {/* LINK INTERNO — Primeira visita: Quem Somos → Cultos → Contato */}
        <section aria-label="Primeira visita" className="mt-16 rounded-2xl border border-gold/25 bg-gradient-to-br from-gold/[0.08] to-transparent p-6 sm:p-8 text-center">
          <h2 className="font-display text-2xl sm:text-3xl font-light text-foreground mb-2">
            Primeira vez por aqui?
          </h2>
          <p className="text-sm text-muted-foreground mb-6 max-w-xl mx-auto">
            Agora que você nos conheceu, venha nos visitar. Veja os horários dos cultos e o endereço — será uma alegria te receber.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="#/cultos"
              className="inline-flex h-11 items-center justify-center rounded-full bg-gold px-8 text-sm font-bold text-gold-ink transition-all hover:bg-gold-hover hover:-translate-y-0.5"
            >
              Ver horários dos cultos →
            </a>
            <a
              href="#/contato"
              className="inline-flex h-11 items-center justify-center rounded-full border border-gold/30 bg-gold/10 px-8 text-sm font-semibold text-gold-dark transition-colors hover:bg-gold/20"
            >
              Falar conosco
            </a>
          </div>
        </section>
      </div>
    </main>
  );
}

