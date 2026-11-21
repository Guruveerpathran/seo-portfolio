import { useState } from 'react'
import { portfolio as p } from './data/portfolio'
import ContactModal from './components/ContactModal'
import Navbar from './components/Navbar'
import AnimatedHeadline from './components/AnimatedHeadline'
import portrait from './assets/gurubalan-cutout.png'
import foodProject from './assets/project-food-3d.png'
import portfolioProject from './assets/project-portfolio-3d.png'
import bankProject from './assets/project-bank-3d.png'
import brainProject from './assets/project-brain-3d.png'
import agencyHero from './assets/developer-studio-hero.png'
import heroPortrait from './assets/gurubalan-hero-cutout.png'
import useReveal from './hooks/useReveal'
import usePortfolioMotion from './hooks/usePortfolioMotion'
import { Profile, Skills, Experience, Education } from './components/ResumeSections'

function ProjectCard({ project, image }) {
  return (
    <article className="project-card" data-reveal data-reveal-group="projects">
      <div className={`project-art ${project.color}`} aria-hidden="true">
        <img src={image} alt="" />
        <span className="project-number">{project.number} / SELECTED WORK</span>
        <span className="art-label">{project.stack[0]}</span>
      </div>
      <div className="project-content"><p className="eyebrow">{project.category}</p><h3>{project.title}</h3><p>{project.description}</p><div className="tags">{project.stack.map(tag => <span key={tag}>{tag}</span>)}</div>{project.url && <a className="text-link" href={project.url} target="_blank" rel="noreferrer">View project ↗</a>}</div>
    </article>
  )
}

export default function App() {
  const [contactOpen, setContactOpen] = useState(false)
  useReveal()
  const progress = usePortfolioMotion()
  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <Navbar onContact={() => setContactOpen(true)} />
      <div className="reading-progress" ref={progress} aria-hidden="true" />
      <main id="main" tabIndex={-1}>
        <div className="hero-band" style={{ '--agency-hero': `url(${agencyHero})` }}>
        <section className="hero wrap" id="home" tabIndex={-1}>
          <div className="hero-copy">
            <p className="eyebrow"><span className="status-dot" /> HELLO, I’M {p.name.toUpperCase()}</p>
            <AnimatedHeadline />
            <p className="intro">{p.introduction}</p>
            <div className="hero-actions"><a className="button" href="#experience">Explore my experience <span aria-hidden="true">↘</span></a><a className="hero-secondary" href="#contact">Let’s connect ↗</a></div>
          </div>
          <div className="hero-collage">
            <div className="showcase-grid" aria-label="Professional profile showcase">
              <article className="showcase-card showcase-result"><strong>JAVA</strong><span>Reliable applications built with purpose</span></article>
              <figure className="showcase-card showcase-photo"><img src={portrait} alt="Gurubalan V" width="960" height="1280" fetchPriority="high" /><figcaption><span>FULL STACK DEVELOPER</span><strong>Gurubalan V</strong></figcaption></figure>
              <article className="showcase-card showcase-mark" aria-hidden="true"><div><i /><i /><i /></div></article>
              <article className="showcase-card showcase-projects"><strong>3+</strong><span>Full-stack projects built</span></article>
              <article className="showcase-quality">JAVA + REACT + SPRING BOOT</article>
            </div>
          </div>
          <figure className="hero-profile-card" aria-label="Portrait of Gurubalan V">
            <img src={heroPortrait} alt="Gurubalan V" width="960" height="1280" fetchPriority="high" />
            <figcaption><span>AVAILABLE FOR OPPORTUNITIES</span><strong>Gurubalan V</strong><small>{p.role}<br />Madurai, Tamil Nadu</small></figcaption>
          </figure>
        </section>
        </div>
        <section className="section wrap" id="work" tabIndex={-1}>
          <div className="section-heading" data-reveal><div><p className="eyebrow">01 / SELECTED WORK</p><h2>Ideas brought to life<span>.</span></h2></div><p>A few things I’ve been working on.</p></div>
          <div className="project-grid">{p.projects.map((project, index) => <ProjectCard key={project.number} project={project} image={[foodProject, portfolioProject, bankProject, brainProject][index]} />)}</div>
        </section>
        <section className="resume-section" id="resume" tabIndex={-1} aria-label="Resume">
          <Profile />
          <Skills />
          <Experience />
          <Education />
        </section>
        <section className="contact contact-section wrap" id="contact" tabIndex={-1}>
          <p className="eyebrow" data-reveal data-reveal-group="contact">06 / LET’S CONNECT</p><h2 data-reveal data-reveal-group="contact">Ready to contribute.<br /><em>Let’s build together.</em></h2>
          <p data-reveal data-reveal-group="contact">Let’s connect about SEO, organic growth, content strategy, and website optimization.</p>
          <button className="button contact-open" data-reveal data-reveal-group="contact" type="button" onClick={() => setContactOpen(true)} aria-haspopup="dialog">Say hello <span aria-hidden="true">↗</span></button>
          <address className="contact-details" data-reveal data-reveal-group="contact"><a href={`mailto:${p.email}`}>{p.email}</a><a href={`tel:${p.phoneHref}`}>{p.phone}</a><span>{p.address}</span></address>
        </section>
      </main>
      <footer className="site-footer" data-reveal><div className="site-footer-inner"><span>© {new Date().getFullYear()} {p.name}</span><div>{p.github && <a href={p.github} target="_blank" rel="noreferrer">GitHub ↗</a>}{p.linkedin && <a href={p.linkedin} target="_blank" rel="noreferrer">LinkedIn ↗</a>}{p.hackerrank && <a href={p.hackerrank} target="_blank" rel="noreferrer">HackerRank ↗</a>}<a href="#home">Back to top ↑</a></div></div></footer>
      <ContactModal open={contactOpen} onClose={() => setContactOpen(false)} />
    </>
  )
}

