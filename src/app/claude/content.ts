import type { IconName } from "./icons";

export type Lang = "en" | "pt";
export type LayerId = "frontend" | "backend" | "data" | "cloud" | "ai";

export const LINKS = {
  email: "murilorfm@gmail.com",
  mailto: "mailto:murilorfm@gmail.com",
  phone: "+55 (35) 99912-1807",
  tel: "tel:+5535999121807",
  github: "https://github.com/gudyfut",
  githubLabel: "github.com/gudyfut",
  linkedin: "https://www.linkedin.com/in/murilo-monferrari",
  linkedinLabel: "linkedin.com/in/murilo-monferrari",
  timezone: "America/Sao_Paulo",
} as const;

export const SECTION_IDS = ["top", "about", "experience", "stack", "contact"] as const;
export type SectionId = (typeof SECTION_IDS)[number];

export interface TermLine {
  kind: "cmd" | "out" | "ok";
  text: string;
}

export interface Chip {
  label: string;
  tags?: LayerId[];
}

export interface FlowNode {
  id: "users" | "web" | "api" | "db" | "aws";
  icon: IconName;
  title: string;
  sub: string;
  desc: string;
}

export interface Job {
  idx: string;
  role: string;
  company: string;
  kind: string;
  period: string;
  live?: boolean;
  desc: string;
  scopeLabel: string;
  scope: string;
  tags: string[];
  visualCaption: string;
}

export interface Dict {
  nav: {
    links: { id: SectionId; label: string }[];
    ctaLabel: string;
    openMenu: string;
    closeMenu: string;
    paletteLabel: string;
  };
  rail: { label: string; names: string[] };
  hero: {
    avail: string;
    role: string;
    intro: string;
    ctaWork: string;
    ctaEmail: string;
    kbdHint: string;
    stats: [string, string][];
    termTitle: string;
    termBadge: string;
    termLines: TermLine[];
    termAria: string;
  };
  marquee: string[];
  about: {
    stage: string;
    note: string;
    title: string;
    body: string;
    traits: { icon: IconName; title: string; desc: string }[];
    eduLabel: string;
    degree: string;
    school: string;
    period: string;
    status: string;
    progressLabel: string;
    langsLabel: string;
    langs: { label: string; level: string }[];
  };
  xp: {
    stage: string;
    note: string;
    title: string;
    lead: string;
    jobs: [Job, Job];
    diagram: {
      aria: string;
      hint: string;
      nodes: FlowNode[];
      aws: FlowNode;
    };
    hub: {
      aria: string;
      center: string;
      centerSub: string;
      targets: string[];
    };
  };
  stack: {
    stage: string;
    note: string;
    title: string;
    lead: string;
    filterHint: string;
    filters: { id: LayerId | "all"; label: string }[];
    groups: { id: string; icon: IconName; title: string; chips: Chip[]; note?: string }[];
  };
  contact: {
    stage: string;
    note: string;
    title: string;
    lead: string;
    avail: string;
    cards: { id: string; icon: IconName; label: string; value: string; href: string; external?: boolean }[];
    mailCta: string;
    copyBtn: string;
    timeLabel: string;
    loc: string;
    replies: string;
  };
  footer: { rights: string; credit: string; top: string };
  palette: {
    placeholder: string;
    empty: string;
    groups: { nav: string; act: string; link: string };
    hints: { nav: string; act: string; link: string };
    footKeys: { move: string; select: string; close: string };
    items: {
      top: string;
      about: string;
      xp: string;
      stack: string;
      contact: string;
      copyEmail: string;
      switchLang: string;
      print: string;
      coffee: string;
      github: string;
      linkedin: string;
      sendEmail: string;
      benchmark: string;
    };
  };
  toasts: { copied: string; coffee: string; print: string };
  a11y: { skip: string; navLabel: string; langLabel: string; heroLabel: string };
}

export const DICT: Record<Lang, Dict> = {
  en: {
    nav: {
      links: [
        { id: "about", label: "About" },
        { id: "experience", label: "Experience" },
        { id: "stack", label: "Stack" },
        { id: "contact", label: "Contact" },
      ],
      ctaLabel: "Let's talk",
      openMenu: "Open menu",
      closeMenu: "Close menu",
      paletteLabel: "Open command palette (Ctrl or ⌘ + K)",
    },
    rail: {
      label: "Page sections",
      names: ["Start", "About", "Experience", "Stack", "Contact"],
    },
    hero: {
      avail: "Open to international opportunities",
      role: "Fullstack Developer · Python Automation · AWS",
      intro:
        "I put Python automations into production and build complete web applications deployed on AWS. Computer Science student at UNIFEI, currently turning coffee-farm data into software — fluent in English and ready for international teams.",
      ctaWork: "See the work",
      ctaEmail: "Copy email",
      kbdHint: "for the command palette",
      stats: [
        ["02", "roles in production"],
        ["AWS", "cloud deployments"],
        ["EN", "fluent English"],
        ["7th", "semester · UNIFEI"],
      ],
      termTitle: "murilo@production: ~/portfolio",
      termBadge: "prod",
      termAria: "Animated terminal introducing Murilo",
      termLines: [
        { kind: "cmd", text: "whoami" },
        { kind: "out", text: "murilo-monferrari · fullstack developer (Brazil · GMT-3)" },
        { kind: "cmd", text: "python automations.py --env=production" },
        { kind: "ok", text: "automations live — chatbots & finance connected" },
        { kind: "cmd", text: "npm run deploy --workspace=simcafe" },
        { kind: "ok", text: "coffee-farm platform shipped to AWS" },
        { kind: "cmd", text: "cat status.txt" },
        { kind: "out", text: "open to international teams · english: fluent" },
      ],
    },
    marquee: [
      "Python",
      "TypeScript",
      "React",
      "Next.js",
      "Node.js",
      "Express",
      "Prisma",
      "PostgreSQL",
      "Docker",
      "AWS",
      "REST APIs",
      "Automation",
      "Machine Learning",
    ],
    about: {
      stage: "stage 01 · context",
      note: "// who i am",
      title: "Curious mind, production mindset.",
      body: "I'm a Computer Science undergrad at UNIFEI (7th semester) with real-world experience: Python automations running in production and fullstack applications deployed to AWS. Passionate about innovation, technology and continuous learning, I'm looking to contribute to international teams with proactivity and constant evolution.",
      traits: [
        {
          icon: "zap",
          title: "Fast learner",
          desc: "Continuous learning and quick adaptation to new technologies and contexts.",
        },
        {
          icon: "up-right",
          title: "Proactive & autonomous",
          desc: "Initiative and autonomy in building solutions and optimizing processes.",
        },
        {
          icon: "layers",
          title: "Systemic vision",
          desc: "An analytical, whole-system view when breaking down and solving problems.",
        },
        {
          icon: "chat",
          title: "Clear communicator",
          desc: "Clear communication and easy collaboration with multidisciplinary teams.",
        },
      ],
      eduLabel: "Education",
      degree: "B.Sc. in Computer Science",
      school: "UNIFEI — Federal University of Itajubá",
      period: "Jan 2023 — Dec 2026",
      status: "Currently enrolled",
      progressLabel: "Semester 7 of 8 · in progress",
      langsLabel: "Human languages",
      langs: [
        { label: "English", level: "Fluent" },
        { label: "Portuguese", level: "Native" },
      ],
    },
    xp: {
      stage: "stage 02 · production",
      note: "✓ code people rely on",
      title: "Code that runs in the real world.",
      lead: "Two roles, both with software people rely on every day — one building a complete farm-data platform, one automating a company's internal systems.",
      jobs: [
        {
          idx: "01",
          role: "Fullstack Developer",
          company: "SIMCafé",
          kind: "Contractor",
          period: "Nov 2025 — Present",
          live: true,
          desc: "I'm building SIMCafé's complete internal system for coffee-farm data: the team enters field data and turns it into analysis — through a stack I own end to end.",
          scopeLabel: "Scope",
          scope: "Full ownership: interface, API, data model and cloud infrastructure.",
          tags: ["React + Vite", "Node.js", "Express", "Prisma", "PostgreSQL", "AWS"],
          visualCaption: "Live architecture — select any layer to inspect it",
        },
        {
          idx: "02",
          role: "Software Developer Intern",
          company: "Golden Rastreamento",
          kind: "Internship",
          period: "Nov 2024 — Apr 2025",
          desc: "Built system integrations over REST APIs in Python — connecting the company's chatbots and financial systems — plus data analysis and treatment to automate internal processes.",
          scopeLabel: "Focus",
          scope: "Turning manual internal processes into Python automations in production.",
          tags: ["Python", "REST APIs", "Chatbots", "Financial systems", "Data analysis"],
          visualCaption: "Integration map — Golden Rastreamento",
        },
      ],
      diagram: {
        aria: "Interactive diagram of the SIMCafé system architecture",
        hint: "select a layer",
        nodes: [
          {
            id: "users",
            icon: "users",
            title: "Farm team",
            sub: "data in · insights out",
            desc: "SIMCafé's team works in the web app daily — entering field data and reading the analyses it produces.",
          },
          {
            id: "web",
            icon: "monitor",
            title: "Web app",
            sub: "React + Vite",
            desc: "Interface for entering coffee-farm data and exploring it as analysis.",
          },
          {
            id: "api",
            icon: "server",
            title: "REST API",
            sub: "Node.js + Express",
            desc: "Business rules and endpoints connecting the interface to the data layer.",
          },
          {
            id: "db",
            icon: "database",
            title: "Database",
            sub: "PostgreSQL · Prisma",
            desc: "A typed data model with Prisma ORM over PostgreSQL.",
          },
        ],
        aws: {
          id: "aws",
          icon: "cloud",
          title: "AWS",
          sub: "production",
          desc: "The whole platform is provisioned and running on AWS.",
        },
      },
      hub: {
        aria: "Diagram of Python integrations built at Golden Rastreamento",
        center: "Python",
        centerSub: "REST APIs",
        targets: ["Chatbots", "Financial systems", "Internal processes"],
      },
    },
    stack: {
      stage: "stage 03 · toolchain",
      note: "// 23 tools · 5 layers",
      title: "One stack, end to end.",
      lead: "Everything I need to take an idea from a blank terminal to a deployed product — and the judgment to know when to use what.",
      filterHint: "Filter by the layer you're hiring for",
      filters: [
        { id: "all", label: "Everything" },
        { id: "frontend", label: "Frontend" },
        { id: "backend", label: "Backend" },
        { id: "data", label: "Data" },
        { id: "cloud", label: "Cloud" },
        { id: "ai", label: "AI" },
      ],
      groups: [
        {
          id: "languages",
          icon: "code",
          title: "Languages",
          chips: [
            { label: "Python", tags: ["backend", "data", "ai"] },
            { label: "JavaScript", tags: ["frontend", "backend"] },
            { label: "TypeScript", tags: ["frontend", "backend"] },
            { label: "Node.js", tags: ["backend"] },
            { label: "SQL", tags: ["data"] },
            { label: "HTML", tags: ["frontend"] },
            { label: "CSS", tags: ["frontend"] },
            { label: "C" },
          ],
        },
        {
          id: "tools",
          icon: "layers",
          title: "Frameworks & tools",
          chips: [
            { label: "React", tags: ["frontend"] },
            { label: "Next.js", tags: ["frontend", "backend"] },
            { label: "Express", tags: ["backend"] },
            { label: "REST APIs", tags: ["backend"] },
            { label: "Prisma", tags: ["backend", "data"] },
            { label: "PostgreSQL", tags: ["data"] },
            { label: "Docker", tags: ["backend", "cloud"] },
            { label: "Git" },
            { label: "AWS", tags: ["cloud"] },
          ],
        },
        {
          id: "ai",
          icon: "bot",
          title: "AI in development",
          chips: [
            { label: "GitHub Copilot CLI", tags: ["ai"] },
            { label: "OpenCode", tags: ["ai"] },
          ],
          note: "Used deliberately and with judgment — AI as support for development, never as a replacement for understanding.",
        },
        {
          id: "extra",
          icon: "workflow",
          title: "Applied knowledge",
          chips: [
            { label: "System integration", tags: ["backend"] },
            { label: "Process automation", tags: ["backend", "data"] },
            { label: "Data analysis", tags: ["data", "ai"] },
            { label: "Machine Learning", tags: ["ai", "data"] },
          ],
        },
      ],
    },
    contact: {
      stage: "stage 04 · ship",
      note: "● open to work",
      title: "Let's ship something together.",
      lead: "Hiring a fullstack developer who's at home across automation, data and cloud? Tell me about your team — my inbox is open.",
      avail: "Open to international opportunities",
      cards: [
        { id: "email", icon: "mail", label: "Email", value: LINKS.email, href: LINKS.mailto },
        { id: "github", icon: "github", label: "GitHub", value: LINKS.githubLabel, href: LINKS.github, external: true },
        { id: "linkedin", icon: "linkedin", label: "LinkedIn", value: LINKS.linkedinLabel, href: LINKS.linkedin, external: true },
        { id: "phone", icon: "phone", label: "Phone", value: LINKS.phone, href: LINKS.tel },
      ],
      mailCta: "Write to me",
      copyBtn: "Copy email",
      timeLabel: "my local time",
      loc: "Brazil · GMT-3",
      replies: "I reply in English or Portuguese",
    },
    footer: {
      rights: "© 2026 Murilo R. F. Monferrari",
      credit: "Page designed & coded by Claude — AI Portfolio Benchmark",
      top: "Back to top",
    },
    palette: {
      placeholder: "Type a command or search…",
      empty: "No results for",
      groups: { nav: "Navigate", act: "Actions", link: "Links" },
      hints: { nav: "jump", act: "run", link: "open" },
      footKeys: { move: "move", select: "select", close: "close" },
      items: {
        top: "Go to start",
        about: "About — who I am",
        xp: "Experience — SIMCafé & Golden",
        stack: "Stack — tools & layers",
        contact: "Contact — let's talk",
        copyEmail: "Copy email address",
        switchLang: "Ler em português (PT-BR)",
        print: "Print / save as PDF",
        coffee: "Brew coffee",
        github: "Open GitHub — gudyfut",
        linkedin: "Open LinkedIn — murilo-monferrari",
        sendEmail: "Compose email",
        benchmark: "AI Portfolio Benchmark — home",
      },
    },
    toasts: {
      copied: "Email copied — talk soon?",
      coffee: "☕ Coffee brewed. Back to shipping.",
      print: "Opening print dialog — save as PDF",
    },
    a11y: {
      skip: "Skip to content",
      navLabel: "Main navigation",
      langLabel: "Page language",
      heroLabel: "Introduction",
    },
  },

  pt: {
    nav: {
      links: [
        { id: "about", label: "Sobre" },
        { id: "experience", label: "Experiência" },
        { id: "stack", label: "Stack" },
        { id: "contact", label: "Contato" },
      ],
      ctaLabel: "Vamos conversar",
      openMenu: "Abrir menu",
      closeMenu: "Fechar menu",
      paletteLabel: "Abrir paleta de comandos (Ctrl ou ⌘ + K)",
    },
    rail: {
      label: "Seções da página",
      names: ["Início", "Sobre", "Experiência", "Stack", "Contato"],
    },
    hero: {
      avail: "Aberto a oportunidades internacionais",
      role: "Desenvolvedor Fullstack · Automação Python · AWS",
      intro:
        "Coloco automações Python em produção e construo aplicações web completas com deploy na AWS. Estudante de Ciência da Computação na UNIFEI, hoje transformando dados de fazendas de café em software — com inglês fluente e pronto para times internacionais.",
      ctaWork: "Ver o trabalho",
      ctaEmail: "Copiar e-mail",
      kbdHint: "para a paleta de comandos",
      stats: [
        ["02", "experiências em produção"],
        ["AWS", "deploys na nuvem"],
        ["EN", "inglês fluente"],
        ["7º", "período · UNIFEI"],
      ],
      termTitle: "murilo@production: ~/portfolio",
      termBadge: "prod",
      termAria: "Terminal animado apresentando Murilo",
      termLines: [
        { kind: "cmd", text: "whoami" },
        { kind: "out", text: "murilo-monferrari · dev fullstack (Brasil · GMT-3)" },
        { kind: "cmd", text: "python automations.py --env=production" },
        { kind: "ok", text: "automações no ar — chatbots & financeiro integrados" },
        { kind: "cmd", text: "npm run deploy --workspace=simcafe" },
        { kind: "ok", text: "plataforma de fazendas de café publicada na AWS" },
        { kind: "cmd", text: "cat status.txt" },
        { kind: "out", text: "aberto a times internacionais · inglês: fluente" },
      ],
    },
    marquee: [
      "Python",
      "TypeScript",
      "React",
      "Next.js",
      "Node.js",
      "Express",
      "Prisma",
      "PostgreSQL",
      "Docker",
      "AWS",
      "REST APIs",
      "Automação",
      "Machine Learning",
    ],
    about: {
      stage: "etapa 01 · contexto",
      note: "// quem eu sou",
      title: "Mente curiosa, mentalidade de produção.",
      body: "Estudante de Ciência da Computação na UNIFEI (7º período), com experiência em automações Python em produção e desenvolvimento de aplicações fullstack com deploy na AWS. Apaixonado por inovação, tecnologia e aprendizado contínuo, busco contribuir com times internacionais com proatividade e evolução constante.",
      traits: [
        {
          icon: "zap",
          title: "Aprendizado rápido",
          desc: "Aprendizado contínuo e rápida adaptação a novas tecnologias e contextos.",
        },
        {
          icon: "up-right",
          title: "Proativo & autônomo",
          desc: "Proatividade e autonomia no desenvolvimento de soluções e otimização de processos.",
        },
        {
          icon: "layers",
          title: "Visão sistêmica",
          desc: "Visão analítica e de sistema completo na resolução de problemas.",
        },
        {
          icon: "chat",
          title: "Comunicação clara",
          desc: "Comunicação clara e facilidade para colaborar com times multidisciplinares.",
        },
      ],
      eduLabel: "Formação",
      degree: "Bacharelado em Ciência da Computação",
      school: "UNIFEI — Universidade Federal de Itajubá",
      period: "Jan 2023 — Dez 2026",
      status: "Matriculado atualmente",
      progressLabel: "7º de 8 períodos · cursando",
      langsLabel: "Idiomas",
      langs: [
        { label: "Inglês", level: "Fluente" },
        { label: "Português", level: "Nativo" },
      ],
    },
    xp: {
      stage: "etapa 02 · produção",
      note: "✓ código em produção",
      title: "Código que roda no mundo real.",
      lead: "Duas experiências, ambas com software usado todos os dias — uma construindo uma plataforma completa de dados agrícolas, outra automatizando os sistemas internos de uma empresa.",
      jobs: [
        {
          idx: "01",
          role: "Desenvolvedor Fullstack",
          company: "SIMCafé",
          kind: "Contractor",
          period: "Nov 2025 — Atual",
          live: true,
          desc: "Desenvolvo o sistema interno completo da SIMCafé para dados de fazendas de café: o time insere dados de campo e os transforma em análise — em uma stack que cuido de ponta a ponta.",
          scopeLabel: "Escopo",
          scope: "Responsabilidade total: interface, API, modelo de dados e infraestrutura na nuvem.",
          tags: ["React + Vite", "Node.js", "Express", "Prisma", "PostgreSQL", "AWS"],
          visualCaption: "Arquitetura ao vivo — selecione uma camada para inspecionar",
        },
        {
          idx: "02",
          role: "Programador Estagiário",
          company: "Golden Rastreamento",
          kind: "Estágio",
          period: "Nov 2024 — Abr 2025",
          desc: "Desenvolvi integrações de sistemas via API REST em Python — conectando os chatbots e os sistemas financeiros da empresa — além de análise e tratamento de dados para automatizar processos internos.",
          scopeLabel: "Foco",
          scope: "Transformar processos internos manuais em automações Python em produção.",
          tags: ["Python", "APIs REST", "Chatbots", "Sistemas financeiros", "Análise de dados"],
          visualCaption: "Mapa de integrações — Golden Rastreamento",
        },
      ],
      diagram: {
        aria: "Diagrama interativo da arquitetura do sistema SIMCafé",
        hint: "selecione uma camada",
        nodes: [
          {
            id: "users",
            icon: "users",
            title: "Time da fazenda",
            sub: "dados · análises",
            desc: "O time da SIMCafé usa o app todos os dias — inserindo dados de campo e lendo as análises geradas.",
          },
          {
            id: "web",
            icon: "monitor",
            title: "Web app",
            sub: "React + Vite",
            desc: "Interface para inserir dados das fazendas de café e explorá-los como análise.",
          },
          {
            id: "api",
            icon: "server",
            title: "API REST",
            sub: "Node.js + Express",
            desc: "Regras de negócio e endpoints conectando a interface à camada de dados.",
          },
          {
            id: "db",
            icon: "database",
            title: "Banco de dados",
            sub: "PostgreSQL · Prisma",
            desc: "Modelo de dados tipado com Prisma ORM sobre PostgreSQL.",
          },
        ],
        aws: {
          id: "aws",
          icon: "cloud",
          title: "AWS",
          sub: "produção",
          desc: "Toda a plataforma é provisionada e roda na AWS.",
        },
      },
      hub: {
        aria: "Diagrama das integrações Python criadas na Golden Rastreamento",
        center: "Python",
        centerSub: "APIs REST",
        targets: ["Chatbots", "Sistemas financeiros", "Processos internos"],
      },
    },
    stack: {
      stage: "etapa 03 · ferramentas",
      note: "// 23 ferramentas · 5 camadas",
      title: "Uma stack de ponta a ponta.",
      lead: "Tudo o que preciso para levar uma ideia do terminal em branco a um produto no ar — e o critério para saber quando usar cada coisa.",
      filterHint: "Filtre pela camada que você procura",
      filters: [
        { id: "all", label: "Tudo" },
        { id: "frontend", label: "Frontend" },
        { id: "backend", label: "Backend" },
        { id: "data", label: "Dados" },
        { id: "cloud", label: "Cloud" },
        { id: "ai", label: "IA" },
      ],
      groups: [
        {
          id: "languages",
          icon: "code",
          title: "Linguagens",
          chips: [
            { label: "Python", tags: ["backend", "data", "ai"] },
            { label: "JavaScript", tags: ["frontend", "backend"] },
            { label: "TypeScript", tags: ["frontend", "backend"] },
            { label: "Node.js", tags: ["backend"] },
            { label: "SQL", tags: ["data"] },
            { label: "HTML", tags: ["frontend"] },
            { label: "CSS", tags: ["frontend"] },
            { label: "C" },
          ],
        },
        {
          id: "tools",
          icon: "layers",
          title: "Frameworks & ferramentas",
          chips: [
            { label: "React", tags: ["frontend"] },
            { label: "Next.js", tags: ["frontend", "backend"] },
            { label: "Express", tags: ["backend"] },
            { label: "APIs REST", tags: ["backend"] },
            { label: "Prisma", tags: ["backend", "data"] },
            { label: "PostgreSQL", tags: ["data"] },
            { label: "Docker", tags: ["backend", "cloud"] },
            { label: "Git" },
            { label: "AWS", tags: ["cloud"] },
          ],
        },
        {
          id: "ai",
          icon: "bot",
          title: "IA no desenvolvimento",
          chips: [
            { label: "GitHub Copilot CLI", tags: ["ai"] },
            { label: "OpenCode", tags: ["ai"] },
          ],
          note: "Uso instruído e criterioso — IA como suporte ao desenvolvimento, nunca como substituto do entendimento.",
        },
        {
          id: "extra",
          icon: "workflow",
          title: "Conhecimentos complementares",
          chips: [
            { label: "Integração de sistemas", tags: ["backend"] },
            { label: "Automação de processos", tags: ["backend", "data"] },
            { label: "Análise de dados", tags: ["data", "ai"] },
            { label: "Machine Learning", tags: ["ai", "data"] },
          ],
        },
      ],
    },
    contact: {
      stage: "etapa 04 · entrega",
      note: "● aberto a propostas",
      title: "Vamos lançar algo juntos.",
      lead: "Procurando um dev fullstack que transita entre automação, dados e nuvem? Me conte sobre o seu time — minha caixa de entrada está aberta.",
      avail: "Aberto a oportunidades internacionais",
      cards: [
        { id: "email", icon: "mail", label: "E-mail", value: LINKS.email, href: LINKS.mailto },
        { id: "github", icon: "github", label: "GitHub", value: LINKS.githubLabel, href: LINKS.github, external: true },
        { id: "linkedin", icon: "linkedin", label: "LinkedIn", value: LINKS.linkedinLabel, href: LINKS.linkedin, external: true },
        { id: "phone", icon: "phone", label: "Telefone", value: LINKS.phone, href: LINKS.tel },
      ],
      mailCta: "Escreva para mim",
      copyBtn: "Copiar e-mail",
      timeLabel: "meu horário local",
      loc: "Brasil · GMT-3",
      replies: "Respondo em inglês ou português",
    },
    footer: {
      rights: "© 2026 Murilo R. F. Monferrari",
      credit: "Página desenhada & codada pelo Claude — AI Portfolio Benchmark",
      top: "Voltar ao topo",
    },
    palette: {
      placeholder: "Digite um comando ou busque…",
      empty: "Nada encontrado para",
      groups: { nav: "Navegar", act: "Ações", link: "Links" },
      hints: { nav: "ir", act: "rodar", link: "abrir" },
      footKeys: { move: "mover", select: "selecionar", close: "fechar" },
      items: {
        top: "Ir para o início",
        about: "Sobre — quem eu sou",
        xp: "Experiência — SIMCafé & Golden",
        stack: "Stack — ferramentas & camadas",
        contact: "Contato — vamos conversar",
        copyEmail: "Copiar endereço de e-mail",
        switchLang: "Read in English (EN)",
        print: "Imprimir / salvar em PDF",
        coffee: "Passar um café",
        github: "Abrir GitHub — gudyfut",
        linkedin: "Abrir LinkedIn — murilo-monferrari",
        sendEmail: "Escrever e-mail",
        benchmark: "AI Portfolio Benchmark — início",
      },
    },
    toasts: {
      copied: "E-mail copiado — até já?",
      coffee: "☕ Café passado. De volta ao deploy.",
      print: "Abrindo impressão — salve em PDF",
    },
    a11y: {
      skip: "Pular para o conteúdo",
      navLabel: "Navegação principal",
      langLabel: "Idioma da página",
      heroLabel: "Introdução",
    },
  },
};
