export type Lang = "en" | "pt";

export const PROFILE = {
  name: "Murilo R. F. Monferrari",
  firstName: "Murilo",
  lastName: "Monferrari",
  initials: "MM",
  email: "murilorfm@gmail.com",
  phone: "+55 (35) 99912-1807",
  phoneHref: "+5535999121807",
  github: "github.com/gudyfut",
  githubUrl: "https://github.com/gudyfut",
  linkedin: "linkedin.com/in/murilo-monferrari",
  linkedinUrl: "https://www.linkedin.com/in/murilo-monferrari",
  location: "Itajubá, MG — Brazil",
  role: "Fullstack Developer",
  roleNote: { en: "CS Student @ UNIFEI", pt: "Estudante de CC @ UNIFEI" },
  period: { en: "7th semester", pt: "7º período" },
};

export const NAV: { id: string; en: string; pt: string }[] = [
  { id: "home", en: "Home", pt: "Início" },
  { id: "about", en: "About", pt: "Sobre" },
  { id: "skills", en: "Skills", pt: "Skills" },
  { id: "experience", en: "Experience", pt: "Experiência" },
  { id: "education", en: "Education", pt: "Formação" },
  { id: "contact", en: "Contact", pt: "Contato" },
];

export const HERO_TITLES = {
  en: [
    "I build fullstack apps",
    "I automate with Python",
    "I ship to the cloud (AWS)",
    "I'm ready for global teams",
  ],
  pt: [
    "Construo apps fullstack",
    "Automatizo com Python",
    "Faço deploy na nuvem (AWS)",
    "Pronto para times globais",
  ],
};

export const TERMINAL = {
  en: [
    { cmd: "whoami", out: "murilo.monferrari — fullstack developer" },
    { cmd: "cat role.txt", out: "CS Student @ UNIFEI · Fullstack · Python · AWS" },
    { cmd: "ls focus/", out: "automation  fullstack  cloud  systems-integration" },
    { cmd: "status --now", out: "open to internships & international teams" },
  ],
  pt: [
    { cmd: "whoami", out: "murilo.monferrari — desenvolvedor fullstack" },
    { cmd: "cat role.txt", out: "Estudante de CC @ UNIFEI · Fullstack · Python · AWS" },
    { cmd: "ls focus/", out: "automacao  fullstack  nuvem  integracao-sistemas" },
    { cmd: "status --agora", out: "aberto a estágios e times internacionais" },
  ],
};

export const ABOUT = {
  en: {
    eyebrow: "About me",
    heading: "A developer who turns ideas into shipped software.",
    body: "I'm a Computer Science student at UNIFEI (7th semester) with hands-on experience building Python automations that run in production and shipping fullstack applications deployed on AWS. I'm driven by innovation, technology and continuous learning — eager to contribute to international teams with proactivity and steady growth.",
    points: [
      {
        title: "Production-grade automation",
        text: "Real Python automations and system integrations running live, not just demos.",
      },
      {
        title: "Fullstack, end to end",
        text: "From React UIs to Node/Express + Prisma + PostgreSQL backends on AWS.",
      },
      {
        title: "Fluent English, global-ready",
        text: "Comfortable communicating and collaborating with international teams.",
      },
    ],
  },
  pt: {
    eyebrow: "Sobre mim",
    heading: "Um desenvolvedor que transforma ideias em software entregue.",
    body: "Estudante de Ciência da Computação na UNIFEI (7º período), com experiência em automações Python em produção e desenvolvimento de aplicações fullstack com deploy na AWS. Movido por inovação, tecnologia e aprendizado contínuo, em busca de contribuir em times internacionais com proatividade e evolução constante.",
    points: [
      {
        title: "Automação de verdade",
        text: "Automações em Python e integrações de sistemas rodando em produção, não só em demo.",
      },
      {
        title: "Fullstack de ponta a ponta",
        text: "Do front em React ao back em Node/Express + Prisma + PostgreSQL na AWS.",
      },
      {
        title: "Inglês fluente, perfil global",
        text: "À vontade para se comunicar e colaborar com equipes internacionais.",
      },
    ],
  },
};

export const STATS = [
  { value: 2, suffix: "", en: { label: "Pro roles", sub: "Fullstack + Intern" }, pt: { label: "Funções reais", sub: "Fullstack + Estágio" } },
  { value: 7, suffix: "", en: { label: "Semester", sub: "CS @ UNIFEI" }, pt: { label: "Período", sub: "CC @ UNIFEI" } },
  { value: 10, suffix: "+", en: { label: "Technologies", sub: "in active stack" }, pt: { label: "Tecnologias", sub: "na stack ativa" } },
  { value: 2026, suffix: "", en: { label: "Graduation", sub: "on track" }, pt: { label: "Formação", sub: "no prazo" } },
];

export const SOFT_SKILLS = {
  en: [
    "Continuous learning",
    "Proactivity & autonomy",
    "Systems thinking",
    "Clear communication",
  ],
  pt: [
    "Aprendizado contínuo",
    "Proatividade e autonomia",
    "Visão sistêmica",
    "Comunicação clara",
  ],
};

export const SKILL_GROUPS: {
  key: string;
  icon: string;
  en: { title: string; sub: string };
  pt: { title: string; sub: string };
  items: string[];
}[] = [
  {
    key: "languages",
    icon: "code",
    en: { title: "Languages", sub: "What I write code in" },
    pt: { title: "Linguagens", sub: "O que eu escrevo" },
    items: ["Python", "JavaScript", "TypeScript", "Node.js", "SQL", "HTML", "CSS", "C"],
  },
  {
    key: "stack",
    icon: "layers",
    en: { title: "Tools & Stack", sub: "How I build & ship" },
    pt: { title: "Ferramentas & Stack", sub: "Como eu construo" },
    items: ["REST APIs", "Express", "React", "Next.js", "Prisma", "PostgreSQL", "Docker", "Git", "AWS"],
  },
  {
    key: "ai",
    icon: "spark",
    en: { title: "AI in dev", sub: "Used deliberately" },
    pt: { title: "IA no dev", sub: "Uso criterioso" },
    items: ["GitHub Copilot CLI", "OpenCode"],
  },
  {
    key: "extra",
    icon: "compass",
    en: { title: "Complementary", sub: "Beyond the basics" },
    pt: { title: "Complementares", sub: "Além do básico" },
    items: ["Systems integration", "Process automation", "Data analysis", "Machine Learning"],
  },
];

export const LANGUAGES_SPOKEN = {
  en: [{ name: "English", level: "Fluent", pct: 100 }, { name: "Portuguese", level: "Native", pct: 100 }],
  pt: [{ name: "Inglês", level: "Fluente", pct: 100 }, { name: "Português", level: "Nativo", pct: 100 }],
};

export type Experience = {
  role: { en: string; pt: string };
  company: string;
  period: string;
  current?: boolean;
  en: string[];
  pt: string[];
  stack: string[];
  accent: string;
};

export const EXPERIENCE: Experience[] = [
  {
    role: { en: "Fullstack Developer (Contractor)", pt: "Desenvolvedor Fullstack (Contractor)" },
    company: "SIMCafé",
    period: "11/2025 — Present",
    current: true,
    accent: "#34d399",
    en: [
      "Building a complete internal system for entering and analyzing data from coffee farms.",
      "Frontend in React + Vite, backend in Node.js + Express + Prisma, PostgreSQL database, deployed on AWS.",
    ],
    pt: [
      "Desenvolvimento de sistema interno completo de inserção e análise de dados de fazendas de café.",
      "Frontend em React + Vite, backend em Node.js + Express + Prisma, banco PostgreSQL, deploy na AWS.",
    ],
    stack: ["React", "Vite", "Node.js", "Express", "Prisma", "PostgreSQL", "AWS"],
  },
  {
    role: { en: "Intern Programmer", pt: "Programador Estagiário" },
    company: "Golden Rastreamento",
    period: "11/2024 — 04/2025",
    accent: "#22d3ee",
    en: [
      "Built REST API system integrations in Python, including chatbots and the company's financial systems.",
      "Analyzed and processed data to automate internal processes.",
    ],
    pt: [
      "Integrações de sistemas via API REST em Python, incluindo integração com chatbots e sistemas financeiros da empresa.",
      "Análise e tratamento de dados para automação de processos internos.",
    ],
    stack: ["Python", "REST APIs", "Chatbots", "Data Analysis", "Automation"],
  },
];

export const EDUCATION = {
  en: {
    eyebrow: "Education",
    heading: "Building a strong CS foundation.",
    degree: "B.Sc. in Computer Science",
    school: "Universidade Federal de Itajubá (UNIFEI)",
    period: "01/2023 — 12/2026",
    status: "Currently enrolled · 7th semester",
  },
  pt: {
    eyebrow: "Formação",
    heading: "Construindo uma base sólida em CC.",
    degree: "Bacharelado em Ciência da Computação",
    school: "Universidade Federal de Itajubá (UNIFEI)",
    period: "01/2023 — 12/2026",
    status: "Matriculado atualmente · 7º período",
  },
};

export const CONTACT = {
  en: {
    eyebrow: "Let's talk",
    heading: "Have a role or a project? Let's build it.",
    body: "Open to internships, fullstack roles and international teams. The fastest way to reach me is email — but any channel works.",
    cta: "Send an email",
    copy: "Copy",
    copied: "Copied!",
  },
  pt: {
    eyebrow: "Vamos conversar",
    heading: "Tem uma vaga ou projeto? Vamos construir.",
    body: "Aberto a estágios, vagas fullstack e times internacionais. O caminho mais rápido é o email — mas qualquer canal funciona.",
    cta: "Enviar email",
    copy: "Copiar",
    copied: "Copiado!",
  },
};

export const UI = {
  en: {
    available: "Available for work",
    locationLabel: "Based in",
    scrollDown: "Scroll to explore",
    langLabel: "PT",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    commandHint: "Press",
    commandKeys: "Ctrl K",
    commandTitle: "Jump to section",
    backHome: "Back to benchmark",
    builtWith: "Crafted by GLM",
    terminalTitle: "murilo@portfolio",
    viewProject: "View",
    tech: "Tech",
    stackLabel: "Stack",
    period: "Period",
  },
  pt: {
    available: "Disponível para trabalhar",
    locationLabel: "Localizado em",
    scrollDown: "Role para explorar",
    langLabel: "EN",
    openMenu: "Abrir menu",
    closeMenu: "Fechar menu",
    commandHint: "Pressione",
    commandKeys: "Ctrl K",
    commandTitle: "Ir para a seção",
    backHome: "Voltar ao benchmark",
    builtWith: "Feito por GLM",
    terminalTitle: "murilo@portfolio",
    viewProject: "Ver",
    tech: "Tecnologias",
    stackLabel: "Stack",
    period: "Período",
  },
};
