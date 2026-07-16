import Image from "next/image";
import Link from "next/link";
import ResumeViewer from "./resume-viewer";
import "./home.css";

const modelPages = [
  {
    name: "GPT",
    href: "/gpt",
    model: "GPT-5.6-sol xhigh",
    tool: "Codex CLI",
    logo: "/gpt-cropped.png",
  },
  {
    name: "Claude",
    href: "/claude",
    model: "Claude Fable 5 Max",
    tool: "Claude Code",
    logo: "/claude.png",
  },
  {
    name: "GLM",
    href: "/glm",
    model: "GLM-5.2",
    tool: "OpenCode",
    logo: "/zai.png",
  },
];

const benchmarkPrompt = [
  "Crie uma pagina unica de portfolio para Murilo Monferrari usando as informacoes em GitHub/Portfolio/public/portfolio-briefing.md.",
  "",
  "A pagina deve funcionar como um portfolio final, moderno e memoravel. Use criatividade para destacar o portfolio, com implementações que impressionem e surpreendam. Voce pode usar qualquer ferramenta, biblioteca, tecnica visual ou interacao que considerar adequado, desde que o resultado seja responsivo, polido e facil de navegar.",
  "",
  "Use a pasta destinada ao seu modelo para desenvolver sua pagina: src/app/gpt, src/app/claude ou src/app/glm, conforme indicado pelo avaliador. Nao altere a homepage do benchmark nem as paginas dos outros modelos.",
  "",
  "Entregue o melhor resultado possivel em uma unica pagina, com boa hierarquia visual, conteudo fiel ao briefing e implementacoes interessantes que chamem a atencao sem prejudicar usabilidade ou performance.",
].join("\n");

const stack = [
  "TypeScript",
  "React",
  "Next.js",
  "Node.js",
  "Python",
  "PostgreSQL",
  "AWS",
  "Docker",
];

function Benchmark() {
  return (
    <div className="home-benchmark" id="benchmark">
      <div className="home-benchmark-heading">
        <div>
          <p className="home-kicker">Experimento dentro do portfolio</p>
          <h3>Quando meu currículo virou briefing para três IAs.</h3>
        </div>
        <div className="home-benchmark-copy">
          <p>
            Eu pedi ao GPT, ao Claude e ao GLM que criassem um portfolio usando
            apenas as informações do meu currículo e exatamente o mesmo prompt.
            Ao comparar as entregas, percebi o limite do material: sem os meus
            projetos como matéria-prima, os modelos produziram boas páginas de
            apresentação profissional, não portfolios completos.
          </p>
          <p>
            Mantive as três versões abaixo como um benchmark de interpretação,
            design e implementação. Este site, agora com trabalhos reais, é o
            portfolio que completa aquela experiência.
          </p>
        </div>
      </div>

      <div className="home-model-grid">
        {modelPages.map((model, index) => (
          <Link
            className="home-model"
            href={model.href}
            key={model.name}
            aria-label={`Abrir apresentação criada pelo ${model.name}`}
          >
            <div className="home-model-top">
              <span className="home-model-index">0{index + 1}</span>
              <Image
                className="home-model-logo"
                src={model.logo}
                alt={`Logo ${model.name}`}
                width={56}
                height={56}
              />
            </div>
            <div className="home-model-info">
              <h4>{model.name}</h4>
              <p>{model.model}</p>
              <span>{model.tool}</span>
            </div>
            <div className="home-model-cta">
              <span>Abrir apresentação</span>
              <span className="home-model-arrow" aria-hidden="true">↗</span>
            </div>
          </Link>
        ))}
      </div>

      <details className="home-prompt">
        <summary>
          <span>Ver o prompt original enviado aos três modelos</span>
          <span aria-hidden="true">+</span>
        </summary>
        <pre>{benchmarkPrompt}</pre>
      </details>
    </div>
  );
}

function CineAnalyticsVisual() {
  return (
    <div className="project-visual project-visual-cine" aria-hidden="true">
      <div className="cine-toolbar">
        <span>CINE / ANALYTICS</span>
        <span>2006—2026</span>
      </div>
      <div className="cine-summary">
        <div>
          <small>BASE ANALISADA</small>
          <strong>2.501</strong>
          <span>filmes processados</span>
        </div>
        <div>
          <small>PIPELINE</small>
          <strong>TMDB</strong>
          <span>dados + inflação CPI-U</span>
        </div>
      </div>
      <div className="cine-chart">
        <div className="cine-chart-label">
          <span>Retorno por gênero</span>
          <span>ROI ajustado</span>
        </div>
        <div className="cine-bars">
          <i /><i /><i /><i /><i /><i /><i /><i />
        </div>
        <div className="cine-axis"><span>2006</span><span>2016</span><span>2026</span></div>
      </div>
    </div>
  );
}

function EditorVisual() {
  return (
    <div className="project-visual project-visual-editor" aria-hidden="true">
      <div className="editor-toolbar">
        <span>EditorCV</span>
        <div><i /><i /><i /></div>
      </div>
      <div className="editor-workspace">
        <div className="editor-form">
          <small>DADOS PESSOAIS</small>
          <span className="editor-input editor-input-long" />
          <span className="editor-input" />
          <small>ORDEM DOS MÓDULOS</small>
          <span className="editor-module">01&nbsp;&nbsp; Sobre mim</span>
          <span className="editor-module">02&nbsp;&nbsp; Experiência</span>
          <span className="editor-module">03&nbsp;&nbsp; Habilidades</span>
        </div>
        <div className="editor-paper">
          <strong>MURILO MONFERRARI</strong>
          <span className="editor-paper-contact" />
          <small>SOBRE</small>
          <i /><i /><i className="short" />
          <small>EXPERIÊNCIA</small>
          <i /><i /><i />
          <small>HABILIDADES</small>
          <i /><i className="short" />
        </div>
      </div>
    </div>
  );
}

function SimCafeVisual() {
  return (
    <div className="project-visual project-visual-simcafe" aria-hidden="true">
      <div className="simcafe-toolbar">
        <span>SIMCAFÉ / OPERAÇÕES</span>
        <i>Produção</i>
      </div>
      <div className="simcafe-metrics">
        <div><span>Fazendas</span><strong>Dados centralizados</strong></div>
        <div><span>Infraestrutura</span><strong>AWS + PostgreSQL</strong></div>
      </div>
      <div className="simcafe-table">
        <div><span>PROPRIEDADE</span><span>SAFRA</span><span>STATUS</span></div>
        <div><strong>Fazenda 01</strong><span>2025/26</span><i>Atualizado</i></div>
        <div><strong>Fazenda 02</strong><span>2025/26</span><i>Atualizado</i></div>
        <div><strong>Fazenda 03</strong><span>2025/26</span><i>Em análise</i></div>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <main className="home-page">
      <header className="home-header">
        <a className="home-brand" href="#inicio" aria-label="Voltar ao início">
          <strong>Murilo Monferrari</strong>
          <span>Fullstack &amp; Automation</span>
        </a>

        <nav className="home-nav" aria-label="Navegação principal">
          <a href="#curriculo">Currículo</a>
          <a href="#benchmark">Benchmark</a>
          <a href="#projetos">Projetos</a>
          <a
            className="home-nav-github"
            href="https://github.com/gudyfut"
            target="_blank"
            rel="noreferrer"
          >
            GitHub <span aria-hidden="true">↗</span>
          </a>
        </nav>
      </header>

      <section className="home-hero" id="inicio" aria-labelledby="home-title">
        <div className="home-hero-copy">
          <p className="home-eyebrow">Ciência da Computação · UNIFEI</p>
          <h1 id="home-title">Murilo<br />Monferrari</h1>
          <p className="home-hero-lead">
            Eu desenvolvo aplicações fullstack e automações que saem do papel,
            integram sistemas e chegam à produção.
          </p>
          <p className="home-hero-detail">
            Tenho experiência com produtos web, integrações em Python e deploy
            na AWS. Busco oportunidades para construir software com impacto real
            em equipes brasileiras ou internacionais.
          </p>
          <div className="home-actions">
            <a className="home-button home-button-primary" href="#projetos">
              Conhecer meus projetos <span aria-hidden="true">↓</span>
            </a>
            <a className="home-button home-button-secondary" href="mailto:murilorfm@gmail.com">
              Entrar em contato
            </a>
          </div>
        </div>

        <aside className="home-hero-scope" aria-label="Áreas de atuação">
          <div className="home-hero-status">
            <span aria-hidden="true" />
            Em busca de novas oportunidades
          </div>
          <ol>
            <li>
              <span>01</span>
              <div><strong>Produtos web</strong><p>React, Next.js, Node.js e bancos relacionais.</p></div>
            </li>
            <li>
              <span>02</span>
              <div><strong>Automação</strong><p>Python, APIs REST, dados e integração de sistemas.</p></div>
            </li>
            <li>
              <span>03</span>
              <div><strong>Produção</strong><p>AWS, Docker, Git e responsabilidade ponta a ponta.</p></div>
            </li>
          </ol>
          <div className="home-hero-meta">
            <span>Itajubá, MG</span>
            <span>Inglês fluente</span>
          </div>
        </aside>
      </section>

      <section className="home-resume" id="curriculo" aria-labelledby="resume-title">
        <div className="home-section-heading">
          <div>
            <p className="home-kicker">Currículo</p>
            <h2 id="resume-title">Experiência real, da automação ao produto completo.</h2>
          </div>
          <p>
            Estou no 7º período de Ciência da Computação na UNIFEI. Minha
            trajetória combina integração de sistemas, análise de dados e
            desenvolvimento fullstack com infraestrutura em nuvem.
          </p>
        </div>

        <div className="home-resume-layout">
          <div className="home-career">
            <article className="home-role">
              <div className="home-role-meta">
                <span>11/2025 — presente</span>
                <small>Contractor</small>
              </div>
              <div>
                <p className="home-role-company">SIMCafé</p>
                <h3>Desenvolvedor Fullstack</h3>
                <p>
                  Desenvolvo um sistema interno completo para inserção e análise
                  de dados de fazendas de café, do frontend ao deploy na AWS.
                </p>
                <span className="home-role-stack">React · Node.js · Prisma · PostgreSQL · AWS</span>
              </div>
            </article>

            <article className="home-role">
              <div className="home-role-meta">
                <span>11/2024 — 04/2025</span>
                <small>Estágio</small>
              </div>
              <div>
                <p className="home-role-company">Golden Rastreamento</p>
                <h3>Programador Estagiário</h3>
                <p>
                  Criei integrações em Python entre APIs, chatbots e sistemas
                  financeiros, automatizando o tratamento de dados e processos internos.
                </p>
                <span className="home-role-stack">Python · APIs REST · Dados · Automação</span>
              </div>
            </article>

            <article className="home-role home-role-education">
              <div className="home-role-meta">
                <span>2023 — 2026</span>
                <small>7º período</small>
              </div>
              <div>
                <p className="home-role-company">UNIFEI</p>
                <h3>Bacharelado em Ciência da Computação</h3>
                <p>Formação prevista para dezembro de 2026.</p>
              </div>
            </article>
          </div>

          <aside className="home-resume-aside" aria-label="Currículo e tecnologias">
            <ResumeViewer />
            <div className="home-resume-links">
              <a href="/CV%20Murilo.pdf" target="_blank" rel="noreferrer">
                Abrir PDF <span aria-hidden="true">↗</span>
              </a>
              <a href="/CV%20Murilo.pdf" download>Baixar currículo</a>
            </div>
            <div className="home-stack" aria-label="Principais tecnologias">
              {stack.map((technology) => <span key={technology}>{technology}</span>)}
            </div>
          </aside>
        </div>

        <Benchmark />
      </section>

      <section className="home-projects" id="projetos" aria-labelledby="projects-title">
        <div className="home-section-heading home-projects-heading">
          <div>
            <p className="home-kicker">Projetos selecionados</p>
            <h2 id="projects-title">Trabalhos que completam a história.</h2>
          </div>
          <p>
            Selecionei três projetos que mostram como penso produto, dados e
            engenharia. Dois têm código público; o sistema da SIMCafé é um case
            profissional em produção.
          </p>
        </div>

        <div className="home-project-list">
          <article className="home-project">
            <CineAnalyticsVisual />
            <div className="home-project-copy">
              <div className="home-project-number">01 / DATA PRODUCT</div>
              <h3>CineAnalytics</h3>
              <p>
                Dashboard interativo que investiga o desempenho financeiro de
                2.501 filmes. Construí um pipeline em Python para coletar dados
                do TMDB, corrigir valores pela inflação e alimentar análises em Next.js.
              </p>
              <div className="home-project-tags">
                <span>Python</span><span>Pandas</span><span>Next.js</span><span>ECharts</span>
              </div>
              <div className="home-project-links">
                <a href="https://cine-analytics-vercel.vercel.app" target="_blank" rel="noreferrer">
                  Abrir dashboard <span aria-hidden="true">↗</span>
                </a>
                <a href="https://github.com/gudyfut/CineAnalyticsVercel" target="_blank" rel="noreferrer">
                  Ver código
                </a>
              </div>
            </div>
          </article>

          <article className="home-project home-project-reverse">
            <EditorVisual />
            <div className="home-project-copy">
              <div className="home-project-number">02 / DEVELOPER TOOL</div>
              <h3>EditorCV</h3>
              <p>
                Editor visual de currículos com preview A4 em tempo real,
                módulos reordenáveis, importação em JSON e exportação para PDF.
                Foi a ferramenta que usei para gerar o currículo deste site.
              </p>
              <div className="home-project-tags">
                <span>React</span><span>TypeScript</span><span>Vite</span><span>dnd-kit</span>
              </div>
              <div className="home-project-links">
                <a href="https://github.com/gudyfut/EditorCV" target="_blank" rel="noreferrer">
                  Ver projeto no GitHub <span aria-hidden="true">↗</span>
                </a>
              </div>
            </div>
          </article>

          <article className="home-project">
            <SimCafeVisual />
            <div className="home-project-copy">
              <div className="home-project-number">03 / PRODUCTION SYSTEM</div>
              <h3>Sistema SIMCafé</h3>
              <p>
                Aplicação interna para centralizar a inserção e a análise de
                dados de fazendas de café. Atuo de ponta a ponta, modelando o
                banco, construindo as interfaces e mantendo o deploy na AWS.
              </p>
              <div className="home-project-tags">
                <span>React</span><span>Express</span><span>Prisma</span><span>PostgreSQL</span><span>AWS</span>
              </div>
              <div className="home-project-private">
                <span aria-hidden="true" /> Código privado · sistema em produção
              </div>
            </div>
          </article>
        </div>

        <a className="home-all-projects" href="https://github.com/gudyfut" target="_blank" rel="noreferrer">
          Ver todos os repositórios no GitHub <span aria-hidden="true">↗</span>
        </a>
      </section>

      <footer className="home-footer" id="contato">
        <div>
          <strong>Murilo Monferrari</strong>
          <span>Fullstack · Automação · Dados</span>
        </div>
        <a className="home-footer-email" href="mailto:murilorfm@gmail.com">murilorfm@gmail.com</a>
        <nav aria-label="Links de contato">
          <a href="https://github.com/gudyfut" target="_blank" rel="noreferrer">GitHub</a>
          <a href="https://www.linkedin.com/in/murilo-monferrari" target="_blank" rel="noreferrer">LinkedIn</a>
          <a href="tel:+5535999121807">+55 (35) 99912-1807</a>
        </nav>
      </footer>
    </main>
  );
}
