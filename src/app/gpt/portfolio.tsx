"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type Language = "en" | "pt";
type Layer = "interface" | "api" | "data" | "cloud";

const content = {
  en: {
    nav: { work: "Experience", stack: "Stack", about: "About", contact: "Let's talk" },
    hero: {
      eyebrow: "Fullstack developer / Brazil",
      titleLead: "Murilo",
      titleLast: "Monferrari",
      intro: "I turn complex operations into reliable software, from Python automations in production to fullstack products deployed on AWS.",
      workCta: "Explore my work",
      contactCta: "Start a conversation",
      availability: "Open to international opportunities",
      signal: "Currently building",
      signalValue: "Data systems for Brazilian coffee farms",
      terminalLabel: "production / live",
      metrics: [["02", "Real-world roles"], ["AWS", "Cloud deployments"], ["EN", "Fluent English"], ["7th", "CS semester"]],
    },
    work: {
      eyebrow: "Selected experience",
      title: "Software made for the real world.",
      intro: "I work across the full delivery chain: understanding the operation, designing the flow, shipping the product, and keeping it useful in production.",
      sim: {
        number: "01",
        period: "Nov 2025 - Present",
        role: "Fullstack Developer",
        company: "SIMCafe / Contractor",
        description: "Building a complete internal system for coffee-farm data entry and analysis, with an integrated web stack and deployment on AWS.",
        resultLabel: "Scope",
        result: "One connected product spanning interface, business logic, database, and infrastructure.",
        diagramTitle: "System architecture",
        diagramHint: "Select a layer",
        layers: {
          interface: ["Interface", "React + Vite", "Fast, focused workflows for entering and reading farm data."],
          api: ["Application", "Node.js + Express", "REST endpoints connect business rules to the product experience."],
          data: ["Data", "Prisma + PostgreSQL", "Structured persistence for operational and analytical information."],
          cloud: ["Cloud", "AWS", "Deployment infrastructure that takes the application into production."],
        },
      },
      golden: {
        number: "02",
        period: "Nov 2024 - Apr 2025",
        role: "Software Developer Intern",
        company: "Golden Rastreamento",
        description: "Developed Python REST API integrations across chatbots and financial systems, while treating and analyzing data to automate internal processes.",
        highlights: [["Python", "Production automations"], ["REST APIs", "System integrations"], ["Data", "Analysis and treatment"]],
      },
    },
    stack: {
      eyebrow: "Technical range",
      title: "One stack. Every layer.",
      intro: "Broad enough to own the path from idea to production, focused enough to make each decision count.",
      groups: [
        ["Languages", ["Python", "JavaScript", "TypeScript", "SQL", "C", "HTML", "CSS"]],
        ["Product", ["React", "Next.js", "Node.js", "Express", "REST APIs"]],
        ["Data & Cloud", ["PostgreSQL", "Prisma", "Docker", "AWS", "Git"]],
        ["Applied knowledge", ["System integration", "Process automation", "Data analysis", "Machine learning"]],
        ["AI-assisted", ["GitHub Copilot CLI", "OpenCode"]],
      ],
      note: "AI tools are used deliberately: as engineering support, never as a substitute for technical judgment.",
    },
    about: {
      eyebrow: "Beyond the code",
      title: "Curious by nature. Accountable by choice.",
      body: "I am a Computer Science student at UNIFEI who enjoys learning fast and translating ambiguity into clear, working systems. I am looking to contribute to international teams where autonomy, communication, and continuous improvement matter.",
      traits: [["01", "Adapt", "Learn new technologies and contexts quickly."], ["02", "Own", "Move solutions forward with autonomy and initiative."], ["03", "Connect", "See the whole system, not only the isolated task."], ["04", "Communicate", "Collaborate clearly across disciplines."]],
      educationLabel: "Education",
      degree: "B.Sc. in Computer Science",
      school: "Federal University of Itajuba / UNIFEI",
      period: "Jan 2023 - Dec 2026",
      status: "Currently enrolled / 7th semester",
    },
    contact: {
      eyebrow: "Available for the right challenge",
      title: "Let's build systems that last.",
      body: "Have a product, automation, or integration that needs thoughtful execution? I am ready to talk.",
      email: "Send an email",
      social: "Find me online",
      location: "Brazil / International teams",
      phone: "Phone",
      back: "Back to top",
    },
  },
  pt: {
    nav: { work: "Experiencia", stack: "Stack", about: "Sobre", contact: "Vamos conversar" },
    hero: {
      eyebrow: "Desenvolvedor fullstack / Brasil",
      titleLead: "Murilo",
      titleLast: "Monferrari",
      intro: "Transformo operacoes complexas em software confiavel, de automacoes Python em producao a produtos fullstack publicados na AWS.",
      workCta: "Conheca meu trabalho",
      contactCta: "Inicie uma conversa",
      availability: "Aberto a oportunidades internacionais",
      signal: "Construindo agora",
      signalValue: "Sistemas de dados para fazendas de cafe brasileiras",
      terminalLabel: "producao / online",
      metrics: [["02", "Experiencias reais"], ["AWS", "Deploys em nuvem"], ["EN", "Ingles fluente"], ["7o", "Periodo em CC"]],
    },
    work: {
      eyebrow: "Experiencia selecionada",
      title: "Software feito para o mundo real.",
      intro: "Atuo em toda a cadeia de entrega: entendo a operacao, desenho o fluxo, entrego o produto e garanto que ele seja util em producao.",
      sim: {
        number: "01",
        period: "Nov 2025 - Presente",
        role: "Desenvolvedor Fullstack",
        company: "SIMCafe / Contractor",
        description: "Desenvolvimento de um sistema interno completo para insercao e analise de dados de fazendas de cafe, com stack web integrada e deploy na AWS.",
        resultLabel: "Escopo",
        result: "Um unico produto conectando interface, regras de negocio, banco de dados e infraestrutura.",
        diagramTitle: "Arquitetura do sistema",
        diagramHint: "Selecione uma camada",
        layers: {
          interface: ["Interface", "React + Vite", "Fluxos rapidos e objetivos para inserir e consultar dados das fazendas."],
          api: ["Aplicacao", "Node.js + Express", "Endpoints REST conectam regras de negocio a experiencia do produto."],
          data: ["Dados", "Prisma + PostgreSQL", "Persistencia estruturada de informacoes operacionais e analiticas."],
          cloud: ["Nuvem", "AWS", "Infraestrutura de deploy que leva a aplicacao para producao."],
        },
      },
      golden: {
        number: "02",
        period: "Nov 2024 - Abr 2025",
        role: "Programador Estagiario",
        company: "Golden Rastreamento",
        description: "Desenvolvi integracoes via APIs REST em Python para chatbots e sistemas financeiros, alem de tratar e analisar dados para automatizar processos internos.",
        highlights: [["Python", "Automacoes em producao"], ["APIs REST", "Integracoes de sistemas"], ["Dados", "Analise e tratamento"]],
      },
    },
    stack: {
      eyebrow: "Amplitude tecnica",
      title: "Uma stack. Todas as camadas.",
      intro: "Amplitude para conduzir o caminho da ideia a producao, foco para fazer cada decisao importar.",
      groups: [
        ["Linguagens", ["Python", "JavaScript", "TypeScript", "SQL", "C", "HTML", "CSS"]],
        ["Produto", ["React", "Next.js", "Node.js", "Express", "APIs REST"]],
        ["Dados e nuvem", ["PostgreSQL", "Prisma", "Docker", "AWS", "Git"]],
        ["Conhecimento aplicado", ["Integracao de sistemas", "Automacao de processos", "Analise de dados", "Machine learning"]],
        ["IA como suporte", ["GitHub Copilot CLI", "OpenCode"]],
      ],
      note: "Ferramentas de IA sao usadas com criterio: como apoio de engenharia, nunca como substituto do julgamento tecnico.",
    },
    about: {
      eyebrow: "Alem do codigo",
      title: "Curioso por natureza. Responsavel por escolha.",
      body: "Sou estudante de Ciencia da Computacao na UNIFEI e gosto de aprender rapido, transformando ambiguidade em sistemas claros e funcionais. Busco contribuir em times internacionais que valorizem autonomia, comunicacao e evolucao continua.",
      traits: [["01", "Adaptar", "Aprendo rapidamente novas tecnologias e contextos."], ["02", "Assumir", "Conduzo solucoes com autonomia e proatividade."], ["03", "Conectar", "Enxergo o sistema completo, nao so a tarefa isolada."], ["04", "Comunicar", "Colaboro com clareza entre diferentes disciplinas."]],
      educationLabel: "Formacao",
      degree: "Bacharelado em Ciencia da Computacao",
      school: "Universidade Federal de Itajuba / UNIFEI",
      period: "Jan 2023 - Dez 2026",
      status: "Cursando / 7o periodo",
    },
    contact: {
      eyebrow: "Disponivel para o desafio certo",
      title: "Vamos construir sistemas que permanecem.",
      body: "Tem um produto, automacao ou integracao que precisa de uma execucao cuidadosa? Estou pronto para conversar.",
      email: "Enviar um email",
      social: "Encontre-me online",
      location: "Brasil / Times internacionais",
      phone: "Telefone",
      back: "Voltar ao topo",
    },
  },
} as const;

const layerOrder: Layer[] = ["interface", "api", "data", "cloud"];

function Arrow() {
  return <span className="gpt-arrow" aria-hidden="true" />;
}

export default function Portfolio() {
  const [language, setLanguage] = useState<Language>("en");
  const [activeLayer, setActiveLayer] = useState<Layer>("interface");
  const rootRef = useRef<HTMLDivElement>(null);
  const t = content[language];
  const activeLayerCopy = t.work.sim.layers[activeLayer];

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const elements = root.querySelectorAll<HTMLElement>("[data-reveal]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.14 },
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="gpt-portfolio" ref={rootRef}>
      <a className="gpt-skip" href="#main-content">Skip to content</a>

      <header className="gpt-nav" aria-label="Primary navigation">
        <a className="gpt-brand" href="#top" aria-label="Murilo Monferrari, home">
          <span>MM</span><i aria-hidden="true" />
        </a>
        <nav className="gpt-nav-links" aria-label="Portfolio sections">
          <a href="#experience">{t.nav.work}</a>
          <a href="#stack">{t.nav.stack}</a>
          <a href="#about">{t.nav.about}</a>
        </nav>
        <div className="gpt-nav-actions">
          <div className="gpt-lang" aria-label="Language selection">
            <button className={language === "en" ? "is-active" : ""} onClick={() => setLanguage("en")} type="button" aria-pressed={language === "en"}>EN</button>
            <button className={language === "pt" ? "is-active" : ""} onClick={() => setLanguage("pt")} type="button" aria-pressed={language === "pt"}>PT</button>
          </div>
          <a className="gpt-nav-contact" href="#contact">{t.nav.contact}<Arrow /></a>
        </div>
      </header>

      <main id="main-content">
        <section className="gpt-hero" id="top">
          <Image className="gpt-hero-image" src="/hero-workspace.png" alt="Developer workspace with code, architecture notes, and cloud tools" fill priority sizes="100vw" />
          <div className="gpt-hero-shade" aria-hidden="true" />
          <div className="gpt-hero-content">
            <div className="gpt-hero-copy">
              <div className="gpt-kicker gpt-kicker-light"><span className="gpt-kicker-line" />{t.hero.eyebrow}</div>
              <h1><span>{t.hero.titleLead}</span><strong>{t.hero.titleLast}</strong></h1>
              <p>{t.hero.intro}</p>
              <div className="gpt-hero-actions">
                <a className="gpt-button gpt-button-primary" href="#experience">{t.hero.workCta}<Arrow /></a>
                <a className="gpt-button gpt-button-ghost" href="mailto:murilorfm@gmail.com">{t.hero.contactCta}</a>
              </div>
            </div>

            <aside className="gpt-signal" aria-label={t.hero.signal}>
              <div className="gpt-signal-top"><span><i aria-hidden="true" />{t.hero.terminalLabel}</span><span>01:37:42</span></div>
              <div className="gpt-signal-code" aria-hidden="true">
                <span><b>def</b> ship_solution(idea):</span>
                <span>&nbsp;&nbsp;system = design(idea)</span>
                <span>&nbsp;&nbsp;<b>return</b> deploy(system)</span>
              </div>
              <div className="gpt-signal-bottom"><span>{t.hero.signal}</span><strong>{t.hero.signalValue}</strong></div>
            </aside>
          </div>

          <div className="gpt-hero-bottom">
            <p><i aria-hidden="true" />{t.hero.availability}</p>
            <div className="gpt-metrics">
              {t.hero.metrics.map(([value, label]) => <div key={label}><strong>{value}</strong><span>{label}</span></div>)}
            </div>
          </div>
        </section>

        <section className="gpt-work" id="experience">
          <div className="gpt-section-intro" data-reveal>
            <div>
              <div className="gpt-kicker"><span className="gpt-kicker-line" />{t.work.eyebrow}</div>
              <h2>{t.work.title}</h2>
            </div>
            <p>{t.work.intro}</p>
          </div>

          <article className="gpt-case gpt-case-sim" data-reveal>
            <div className="gpt-case-meta"><span>{t.work.sim.number}</span><p>{t.work.sim.period}</p></div>
            <div className="gpt-case-copy">
              <p className="gpt-case-company">{t.work.sim.company}</p>
              <h3>{t.work.sim.role}</h3>
              <p className="gpt-case-description">{t.work.sim.description}</p>
              <div className="gpt-case-result"><span>{t.work.sim.resultLabel}</span><p>{t.work.sim.result}</p></div>
            </div>

            <div className="gpt-architecture">
              <div className="gpt-architecture-head"><h4>{t.work.sim.diagramTitle}</h4><span>{t.work.sim.diagramHint}</span></div>
              <div className="gpt-layer-map" role="tablist" aria-label={t.work.sim.diagramTitle}>
                {layerOrder.map((layer, index) => {
                  const copy = t.work.sim.layers[layer];
                  return (
                    <div className="gpt-layer-step" key={layer}>
                      <button type="button" role="tab" aria-selected={activeLayer === layer} className={activeLayer === layer ? "is-active" : ""} onClick={() => setActiveLayer(layer)}>
                        <span>0{index + 1}</span><strong>{copy[0]}</strong><small>{copy[1]}</small>
                      </button>
                      {index < layerOrder.length - 1 && <i aria-hidden="true" />}
                    </div>
                  );
                })}
              </div>
              <div className="gpt-layer-detail" role="tabpanel" aria-live="polite">
                <span>{activeLayerCopy[0]}</span><strong>{activeLayerCopy[1]}</strong><p>{activeLayerCopy[2]}</p>
              </div>
            </div>
          </article>

          <article className="gpt-case gpt-case-golden" data-reveal>
            <div className="gpt-case-meta"><span>{t.work.golden.number}</span><p>{t.work.golden.period}</p></div>
            <div className="gpt-case-copy">
              <p className="gpt-case-company">{t.work.golden.company}</p>
              <h3>{t.work.golden.role}</h3>
              <p className="gpt-case-description">{t.work.golden.description}</p>
            </div>
            <div className="gpt-golden-highlights">
              {t.work.golden.highlights.map(([title, label], index) => <div key={title}><span>0{index + 1}</span><strong>{title}</strong><p>{label}</p></div>)}
            </div>
          </article>
        </section>

        <section className="gpt-stack" id="stack">
          <div className="gpt-stack-inner">
            <div className="gpt-stack-heading" data-reveal>
              <div className="gpt-kicker gpt-kicker-light"><span className="gpt-kicker-line" />{t.stack.eyebrow}</div>
              <h2>{t.stack.title}</h2>
              <p>{t.stack.intro}</p>
            </div>
            <div className="gpt-stack-list" data-reveal>
              {t.stack.groups.map(([group, items], index) => (
                <div className="gpt-stack-row" key={group as string}>
                  <span>0{index + 1}</span><h3>{group}</h3>
                  <div>{(items as readonly string[]).map((item) => <i key={item}>{item}</i>)}</div>
                </div>
              ))}
              <p className="gpt-ai-note">{t.stack.note}</p>
            </div>
          </div>
        </section>

        <section className="gpt-about" id="about">
          <div className="gpt-about-lead" data-reveal>
            <div className="gpt-kicker"><span className="gpt-kicker-line" />{t.about.eyebrow}</div>
            <h2>{t.about.title}</h2>
            <p>{t.about.body}</p>
          </div>

          <div className="gpt-traits" data-reveal>
            {t.about.traits.map(([number, title, copy]) => <div className="gpt-trait" key={number}><span>{number}</span><h3>{title}</h3><p>{copy}</p></div>)}
          </div>

          <div className="gpt-education" data-reveal>
            <div className="gpt-education-mark" aria-hidden="true">U</div>
            <div><span>{t.about.educationLabel}</span><h3>{t.about.degree}</h3><p>{t.about.school}</p></div>
            <div className="gpt-education-status"><span>{t.about.period}</span><strong><i aria-hidden="true" />{t.about.status}</strong></div>
          </div>
        </section>

        <section className="gpt-contact" id="contact">
          <div className="gpt-contact-inner" data-reveal>
            <div className="gpt-kicker gpt-kicker-light"><span className="gpt-kicker-line" />{t.contact.eyebrow}</div>
            <h2>{t.contact.title}</h2>
            <p>{t.contact.body}</p>
            <a className="gpt-email-link" href="mailto:murilorfm@gmail.com"><span>{t.contact.email}</span><strong>murilorfm@gmail.com</strong><Arrow /></a>
          </div>

          <footer className="gpt-footer">
            <div><span>{t.contact.social}</span><a href="https://github.com/gudyfut" target="_blank" rel="noreferrer">GitHub <Arrow /></a><a href="https://www.linkedin.com/in/murilo-monferrari" target="_blank" rel="noreferrer">LinkedIn <Arrow /></a></div>
            <div><span>{t.contact.phone}</span><a href="tel:+5535999121807">+55 35 99912 1807</a></div>
            <div><span>{t.contact.location}</span><strong>{language === "en" ? "Fluent English" : "Ingles fluente"}</strong></div>
            <a className="gpt-back-top" href="#top">{t.contact.back} <span aria-hidden="true">&uarr;</span></a>
          </footer>
        </section>
      </main>
    </div>
  );
}
