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
    <main id="main-content" className="min-h-screen bg-background pt-16">
      {/* Hero */}
      <section className="relative h-72 sm:h-96 overflow-hidden" aria-label="Foto da igreja">
        <div className="absolute inset-0">
                  <img
                    src={STAINED_IMAGE}
                    alt="Vitral colorido de uma igreja com luz solar"
                    className="w-full h-full object-cover opacity-70 saturate-[0.5]"
                    loading="lazy"
                    width={1200}
                    height={700}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                </div>
        <div className="relative h-full flex flex-col items-center justify-end pb-12 text-center px-4">
                  <p className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-accent/40 px-4 py-1.5 text-accent text-xs font-semibold uppercase tracking-[0.18em] mb-3 backdrop-blur-sm">
                    <span aria-hidden="true">⛪</span>
                    Nossa História
                  </p>
                  <h1 className="font-display text-3xl sm:text-5xl font-bold text-white [text-shadow:0_2px_12px_rgba(0,0,0,0.4)]">
                    Quem Somos
                  </h1>
                </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Story */}
        <section className="grid lg:grid-cols-2 gap-12 items-start mb-20" aria-label="Nossa história">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <span className="grid h-11 w-11 flex-shrink-0 place-items-center rounded-2xl bg-[#D4A24C]/15 text-xl shadow-sm shadow-[#D4A24C]/20 ring-1 ring-[#D4A24C]/20">
                📖
              </span>
              <h2 className="font-display text-2xl sm:text-3xl font-light text-foreground">
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
            <div className="group bg-card/80 backdrop-blur-sm border border-border rounded-2xl p-6 transition-all duration-300 hover:border-[#D4A24C]/40 hover:shadow-lg hover:shadow-[#D4A24C]/10 hover:-translate-y-0.5">
              <div className="text-4xl font-display font-bold text-[#B8860B] dark:text-[#E8B35E] mb-2">
                {new Date().getFullYear() - CHURCH.founded}+
              </div>
              <div className="font-semibold text-foreground">Anos de ministério</div>
              <div className="text-muted-foreground text-sm">Desde {CHURCH.founded}</div>
            </div>
            <div className="group bg-card/80 backdrop-blur-sm border border-border rounded-2xl p-6 transition-all duration-300 hover:border-[#D4A24C]/40 hover:shadow-lg hover:shadow-[#D4A24C]/10 hover:-translate-y-0.5">
              <div className="text-4xl font-display font-bold text-[#B8860B] dark:text-[#E8B35E] mb-2">
                {CHURCH.members}+
              </div>
              <div className="font-semibold text-foreground">Membros ativos</div>
              <div className="text-muted-foreground text-sm">E crescendo a cada dia</div>
            </div>
            <div className="group bg-card/80 backdrop-blur-sm border border-border rounded-2xl p-6 transition-all duration-300 hover:border-[#D4A24C]/40 hover:shadow-lg hover:shadow-[#D4A24C]/10 hover:-translate-y-0.5">
              <div className="text-4xl font-display font-bold text-[#B8860B] dark:text-[#E8B35E] mb-2">7</div>
              <div className="font-semibold text-foreground">Ministérios ativos</div>
              <div className="text-muted-foreground text-sm">Servindo a cidade</div>
            </div>
          </div>
        </section>

        {/* Mission Vision Values */}
        <section className="mb-20" aria-label="Missão, visão e valores">
                  <div className="flex items-center gap-3 mb-8">
                    <span className="grid h-11 w-11 flex-shrink-0 place-items-center rounded-2xl bg-[#D4A24C]/15 text-xl shadow-sm shadow-[#D4A24C]/20 ring-1 ring-[#D4A24C]/20">
                      🎯
                    </span>
                    <div>
                      <h2 className="font-display text-2xl sm:text-3xl font-light text-foreground">
                        Missão, Visão e Valores
                      </h2>
                      <p className="text-sm text-muted-foreground">
                        O que nos move, onde queremos chegar e quem somos
                      </p>
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-3 gap-6 mb-12">
                    <div className="group bg-card/80 backdrop-blur-sm border border-[#D4A24C]/30 rounded-2xl p-7 transition-all duration-300 hover:shadow-lg hover:shadow-[#D4A24C]/15 hover:-translate-y-0.5">
                      <div className="w-10 h-10 bg-[#D4A24C]/15 rounded-xl flex items-center justify-center mb-4 ring-1 ring-[#D4A24C]/20 transition-transform duration-300 group-hover:scale-110">
                        <span className="text-lg" aria-hidden="true">📜</span>
                      </div>
                      <h2 className="font-display text-xl font-semibold text-foreground mb-3">
                        Nossa Missão
                      </h2>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        Glorificar a Deus fazendo discípulos de Jesus Cristo em todos os âmbitos da vida, edificando o corpo de Cristo com a Palavra e o Espírito.
                      </p>
                    </div>
                    <div className="group bg-card/80 backdrop-blur-sm border border-[#D4A24C]/30 rounded-2xl p-7 transition-all duration-300 hover:shadow-lg hover:shadow-[#D4A24C]/15 hover:-translate-y-0.5">
                      <div className="w-10 h-10 bg-[#D4A24C]/15 rounded-xl flex items-center justify-center mb-4 ring-1 ring-[#D4A24C]/20 transition-transform duration-300 group-hover:scale-110">
                        <span className="text-lg" aria-hidden="true">👁️</span>
                      </div>
                      <h2 className="font-display text-xl font-semibold text-foreground mb-3">
                        Nossa Visão
                      </h2>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        Ser uma igreja relevante, acolhedora e transformadora, que alcance gerações e comunidades com o amor de Cristo, impactando nossa cidade e além.
                      </p>
                    </div>
                    <div className="group bg-card/80 backdrop-blur-sm border border-[#D4A24C]/30 rounded-2xl p-7 transition-all duration-300 hover:shadow-lg hover:shadow-[#D4A24C]/15 hover:-translate-y-0.5">
                      <div className="w-10 h-10 bg-[#D4A24C]/15 rounded-xl flex items-center justify-center mb-4 ring-1 ring-[#D4A24C]/20 transition-transform duration-300 group-hover:scale-110">
                        <span className="text-lg" aria-hidden="true">💎</span>
                      </div>
                      <h2 className="font-display text-xl font-semibold text-foreground mb-3">
                        Nossos Valores
                      </h2>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        Fé bíblica, amor ao próximo, integridade, comunhão, evangelismo, adoração genuína e serviço incondicional.
                      </p>
                    </div>
                  </div>

                  {/* Values grid */}
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {VALUES.map((v, i) => (
                      <div key={i} className="group bg-card/80 backdrop-blur-sm border border-border rounded-2xl p-5 flex gap-4 transition-all duration-300 hover:border-[#D4A24C]/40 hover:shadow-lg hover:shadow-[#D4A24C]/10 hover:-translate-y-0.5">
                        <div className="text-[#B8860B] dark:text-[#E8B35E] text-xl flex-shrink-0 mt-0.5 transition-transform duration-300 group-hover:scale-110" aria-hidden="true">
                          {v.icon}
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground text-sm mb-1">{v.title}</h3>
                          <p className="text-muted-foreground text-xs leading-relaxed">{v.text}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

        {/* Leadership */}
        <section aria-label="Liderança">
          <div className="flex items-center gap-3 mb-8">
            <span className="grid h-11 w-11 flex-shrink-0 place-items-center rounded-2xl bg-[#D4A24C]/15 text-xl shadow-sm shadow-[#D4A24C]/20 ring-1 ring-[#D4A24C]/20">
              🙌
            </span>
            <div>
              <h2 className="font-display text-2xl sm:text-3xl font-light text-foreground">
                Nossa Liderança
              </h2>
              <p className="text-sm text-muted-foreground">
                Pessoas que conduzem nossa comunidade com fé e dedicação
              </p>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {CHURCH.leadership.map((leader, i) => (
              <div key={i} className="group bg-card/80 backdrop-blur-sm border border-border rounded-2xl p-6 transition-all duration-300 hover:border-[#D4A24C]/40 hover:shadow-lg hover:shadow-[#D4A24C]/10 hover:-translate-y-0.5">
                <div className="w-14 h-14 bg-[#D4A24C]/15 rounded-full flex items-center justify-center mb-4 ring-1 ring-[#D4A24C]/25 transition-transform duration-300 group-hover:scale-110">
                  <svg className="w-7 h-7 text-[#B8860B] dark:text-[#E8B35E]" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <h3 className="font-display font-semibold text-foreground text-base">
                  {leader.name}
                </h3>
                <p className="text-[#B8860B] dark:text-[#E8B35E] text-xs font-semibold uppercase tracking-wide mt-1 mb-3">
                  {leader.role}
                </p>
                <p className="text-muted-foreground text-sm leading-relaxed">{leader.bio}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
