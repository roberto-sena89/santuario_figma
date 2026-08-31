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
        <div className="absolute inset-0 bg-primary">
          <img
            src={STAINED_IMAGE}
            alt="Vitral colorido de uma igreja com luz solar"
            className="w-full h-full object-cover opacity-40"
            loading="lazy"
            width={1200}
            height={700}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-primary/20" />
        </div>
        <div className="relative h-full flex flex-col items-center justify-end pb-12 text-center px-4">
          <p className="text-accent text-sm font-medium uppercase tracking-widest mb-2">
            Nossa História
          </p>
          <h1 className="font-display text-3xl sm:text-5xl font-light text-white">
            Quem Somos
          </h1>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Story */}
        <section className="grid lg:grid-cols-2 gap-12 items-start mb-20" aria-label="Nossa história">
          <div>
            <h2 className="font-display text-2xl sm:text-3xl font-light text-foreground mb-6">
              Uma história de fé e crescimento
            </h2>
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
            <div className="bg-card border border-border rounded-xl p-6">
              <div className="text-4xl font-display font-bold text-accent mb-2">
                {new Date().getFullYear() - CHURCH.founded}+
              </div>
              <div className="font-semibold text-foreground">Anos de ministério</div>
              <div className="text-muted-foreground text-sm">Desde {CHURCH.founded}</div>
            </div>
            <div className="bg-card border border-border rounded-xl p-6">
              <div className="text-4xl font-display font-bold text-accent mb-2">
                {CHURCH.members}+
              </div>
              <div className="font-semibold text-foreground">Membros ativos</div>
              <div className="text-muted-foreground text-sm">E crescendo a cada dia</div>
            </div>
            <div className="bg-card border border-border rounded-xl p-6">
              <div className="text-4xl font-display font-bold text-accent mb-2">7</div>
              <div className="font-semibold text-foreground">Ministérios ativos</div>
              <div className="text-muted-foreground text-sm">Servindo a cidade</div>
            </div>
          </div>
        </section>

        {/* Mission Vision Values */}
        <section className="mb-20" aria-label="Missão, visão e valores">
          <div className="grid sm:grid-cols-3 gap-6 mb-12">
            <div className="bg-primary text-primary-foreground rounded-2xl p-7">
              <div className="w-10 h-10 bg-accent/20 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-5 h-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h2 className="font-display text-xl font-semibold mb-3">Nossa Missão</h2>
              <p className="text-primary-foreground/80 text-sm leading-relaxed">
                Glorificar a Deus fazendo discípulos de Jesus Cristo em todos os âmbitos da vida, edificando o corpo de Cristo com a Palavra e o Espírito.
              </p>
            </div>
            <div className="bg-accent text-white rounded-2xl p-7">
              <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <h2 className="font-display text-xl font-semibold mb-3">Nossa Visão</h2>
              <p className="text-white/90 text-sm leading-relaxed">
                Ser uma igreja relevante, acolhedora e transformadora, que alcance gerações e comunidades com o amor de Cristo, impactando nossa cidade e além.
              </p>
            </div>
            <div className="bg-card border border-border rounded-2xl p-7">
              <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-5 h-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h2 className="font-display text-xl font-semibold text-foreground mb-3">Nossos Valores</h2>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Fé bíblica, amor ao próximo, integridade, comunhão, evangelismo, adoração genuína e serviço incondicional.
              </p>
            </div>
          </div>

          {/* Values grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {VALUES.map((v, i) => (
              <div key={i} className="bg-card border border-border rounded-xl p-5 flex gap-4">
                <div className="text-accent text-xl flex-shrink-0 mt-0.5" aria-hidden="true">
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
          <h2 className="font-display text-2xl font-light text-foreground mb-8">
            Nossa Liderança
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {CHURCH.leadership.map((leader, i) => (
              <div key={i} className="bg-card border border-border rounded-xl p-6">
                <div className="w-14 h-14 bg-accent/10 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-7 h-7 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <h3 className="font-display font-semibold text-foreground text-base">
                  {leader.name}
                </h3>
                <p className="text-accent text-xs font-medium uppercase tracking-wide mt-0.5 mb-3">
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
