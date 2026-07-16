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

const capabilities = [
  {
    label: "Aplicações",
    value: "React, Next.js, Node.js, Express, Prisma e PostgreSQL",
  },
  {
    label: "Automação",
    value: "Python, APIs REST, integração de sistemas e análise de dados",
  },
  {
    label: "Entrega",
    value: "AWS, Docker, Git e sistemas utilizados em ambiente de produção",
  },
];

function BenchmarkSection() {
  return (
    <section className="home-benchmark" id="benchmark">
      <div className="home-benchmark-head">
        <div>
          <p className="home-kicker">As três versões</p>
          <h2>Compare como cada modelo interpretou o mesmo briefing.</h2>
        </div>
        <p>
          Cada card abre uma página completa e independente. Mantive as
          informações e a tarefa iguais para conseguir comparar as escolhas de
          conteúdo, design e interação de cada modelo.
        </p>
      </div>

      <div className="home-model-grid">
        {modelPages.map((model, index) => (
          <article className="home-model" key={model.name}>
            <div className="home-model-top">
              <div className="home-model-index" aria-hidden="true">
                0{index + 1}
              </div>
              <Image
                className={`home-model-logo home-model-logo-${model.name.toLowerCase()}`}
                src={model.logo}
                alt={`Logo ${model.name}`}
                width={72}
                height={72}
              />
            </div>
            <div className="home-model-title">
              <h3>{model.name}</h3>
              <p>{model.model}</p>
            </div>
            <div className="home-model-tool">{model.tool}</div>
            <Link href={model.href}>
              Abrir portfolio {model.name}
              <span aria-hidden="true">→</span>
            </Link>
          </article>
        ))}
      </div>

      <div className="home-method">
        <div>
          <strong>Um único briefing</strong>
          <p>Reuni minha experiência, formação, stack e contatos no mesmo arquivo.</p>
        </div>
        <div>
          <strong>O mesmo prompt</strong>
          <p>Enviei a mesma tarefa para os três modelos, sem ajustes individuais.</p>
        </div>
        <div>
          <strong>Implementações separadas</strong>
          <p>Mantive cada versão isolada para preservar as decisões de cada IA.</p>
        </div>
      </div>

      <details className="home-prompt">
        <summary>
          <span>Ver prompt original enviado aos modelos</span>
          <span aria-hidden="true">+</span>
        </summary>
        <pre>{benchmarkPrompt}</pre>
      </details>
    </section>
  );
}

export default function Home() {
  return (
    <main className="home-page">
      <header className="home-header">
        <Link className="home-brand" href="/" aria-label="Página inicial">
          <strong>Murilo Monferrari</strong>
          <span className="home-brand-context">
            <span>AI Portfolio Benchmark</span>
            <small>3 versões · 2026</small>
          </span>
        </Link>

        <nav className="home-nav" aria-label="Acessar os três portfolios">
          <span className="home-nav-label">Portfolios</span>
          <Link className="home-nav-model" href="/gpt">GPT</Link>
          <Link className="home-nav-model" href="/claude">Claude</Link>
          <Link className="home-nav-model" href="/glm">GLM</Link>
          <a className="home-nav-contact" href="#curriculo">Currículo</a>
        </nav>
      </header>

      <section className="home-hero" aria-labelledby="home-title">
        <div className="home-hero-copy">
          <p className="home-eyebrow">GPT, Claude e GLM · mesmo briefing e mesmo prompt</p>
          <h1 id="home-title">AI Portfolio Benchmark: <span>Murilo Monferrari</span></h1>
          <p className="home-hero-lead">
            Para montar meu portfolio, pedi ao GPT, ao Claude e ao GLM que
            trabalhassem a partir das mesmas informações e da mesma tarefa.
            Nesta página, você pode abrir as três versões completas e comparar
            como cada modelo apresentou minha experiência profissional.
          </p>

          <div className="home-actions">
            <a className="home-button home-button-primary" href="#benchmark">
              Ver os três portfolios
              <span aria-hidden="true">↓</span>
            </a>
            <Link className="home-button home-button-secondary" href="/gpt">
              Abrir a versão do GPT
            </Link>
          </div>
        </div>

        <aside className="home-intro" aria-label="Regras do benchmark">
          <div className="home-intro-status">
            <span aria-hidden="true" />
            As três versões estão disponíveis para navegação
          </div>
          <dl>
            <div>
              <dt>Material</dt>
              <dd>Meu briefing profissional</dd>
            </div>
            <div>
              <dt>Instrução</dt>
              <dd>Um prompt compartilhado</dd>
            </div>
            <div>
              <dt>Entrega</dt>
              <dd>Três portfolios completos</dd>
            </div>
          </dl>
          <div className="home-intro-links">
            <a href="#benchmark">Escolher portfolio <span aria-hidden="true">↓</span></a>
            <a href="#experiencia">Ver contexto <span aria-hidden="true">↓</span></a>
          </div>
        </aside>
      </section>

      <BenchmarkSection />

      <section className="home-section home-profile" id="experiencia">
        <div className="home-section-heading">
          <p className="home-kicker">O que enviei aos modelos</p>
          <h2>Minha experiência foi o ponto de partida das três versões.</h2>
          <p>
            Usei o mesmo histórico profissional, a mesma formação e a mesma
            stack em todo o benchmark. O que muda é a maneira como cada modelo
            organizou e priorizou essas informações.
          </p>
        </div>

        <div className="home-experience">
          <article className="home-role">
            <div className="home-role-meta">
              <p>11/2025 · presente</p>
              <span>Contractor</span>
            </div>
            <div>
              <p className="home-role-company">SIMCafé</p>
              <h3>Desenvolvedor Fullstack</h3>
              <p>
                Desenvolvimento de um sistema interno completo para inserção e
                análise de dados de fazendas de café, do frontend à
                infraestrutura em nuvem.
              </p>
              <p className="home-role-stack">
                React + Vite · Node.js + Express · Prisma · PostgreSQL · AWS
              </p>
            </div>
          </article>

          <article className="home-role">
            <div className="home-role-meta">
              <p>11/2024 · 04/2025</p>
              <span>Estágio</span>
            </div>
            <div>
              <p className="home-role-company">Golden Rastreamento</p>
              <h3>Programador Estagiário</h3>
              <p>
                Integrações via API REST em Python entre chatbots, sistemas
                financeiros e processos internos, incluindo análise e
                tratamento de dados para automação.
              </p>
              <p className="home-role-stack">
                Python · REST APIs · Integração de sistemas · Automação
              </p>
            </div>
          </article>
        </div>
      </section>

      <section className="home-capabilities" aria-labelledby="capabilities-title">
        <div>
          <p className="home-kicker">Minha stack</p>
          <h2 id="capabilities-title">As tecnologias incluídas no briefing.</h2>
        </div>
        <dl>
          {capabilities.map((capability) => (
            <div key={capability.label}>
              <dt>{capability.label}</dt>
              <dd>{capability.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="home-resume" id="curriculo">
        <div className="home-resume-copy">
          <p className="home-kicker">Meu currículo</p>
          <h2>O documento que usei como referência para o benchmark.</h2>
          <p>
            Aqui estão minha experiência, formação e competências em uma única
            página. Você pode visualizar o PDF sem sair do site, abrir em uma
            nova aba ou baixar o arquivo. O currículo foi gerado no {" "}
            <a href="https://github.com/gudyfut/EditorCV" target="_blank" rel="noopener noreferrer">
              EditorCV
            </a>
            , um editor de currículos que desenvolvi como outro projeto.
          </p>
          <div className="home-resume-links">
            <a href="/CV%20Murilo.pdf" target="_blank" rel="noreferrer">
              Abrir em nova aba <span aria-hidden="true">↗</span>
            </a>
            <a href="/CV%20Murilo.pdf" download>
              Baixar PDF
            </a>
          </div>
        </div>

        <ResumeViewer />
      </section>

      <section className="home-contact" id="contato">
        <p className="home-kicker">Contato</p>
        <h2>Depois de conhecer as três versões, vamos conversar.</h2>
        <a className="home-contact-email" href="mailto:murilorfm@gmail.com">
          murilorfm@gmail.com <span aria-hidden="true">↗</span>
        </a>
        <div className="home-contact-bottom">
          <p>Murilo R. F. Monferrari · Itajubá, MG</p>
          <div>
            <a href="https://github.com/gudyfut" target="_blank" rel="noreferrer">
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/murilo-monferrari"
              target="_blank"
              rel="noreferrer"
            >
              LinkedIn
            </a>
            <a href="tel:+5535999121807">+55 (35) 99912-1807</a>
          </div>
        </div>
      </section>
    </main>
  );
}
