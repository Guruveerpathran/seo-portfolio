import { portfolio as p } from '../data/portfolio'

export function Profile() {
  return (
    <section className="about-section" id="about" tabIndex={-1}>
      <div className="wrap about-grid">
        <div data-reveal data-reveal-group="about"><p className="eyebrow">02 / ABOUT & CAREER OBJECTIVE</p><h2>Technical foundation.<br /><span className="muted">An SEO mindset.</span></h2><p className="profile-location">Based in {p.location}</p></div>
        <div data-reveal data-reveal-group="about"><p className="about-copy">{p.about}</p><div className="profile-details"><div><h3>Interests</h3><ul>{p.interests.map(item => <li key={item}>{item}</li>)}</ul></div><div><h3>Languages</h3><ul>{p.languages.map(item => <li key={item}>{item}</li>)}</ul></div></div></div>
      </div>
    </section>
  )
}

export function Skills() {
  return (
    <section className="section wrap" id="skills" tabIndex={-1}>
      <div className="section-heading" data-reveal><div><p className="eyebrow">03 / SKILLS & TOOLS</p><h2>Search, content & technology<span>.</span></h2></div><p>The skills behind better website visibility.</p></div>
      <div className="skill-grid">{p.skillGroups.map(group => <article className="skill-panel" data-reveal data-reveal-group="skills" key={group.title}><h3>{group.title}</h3><ul className="skills">{group.items.map(item => <li key={item}>{item}</li>)}</ul></article>)}</div>
    </section>
  )
}

export function Experience() {
  return (
    <section className="experience-section" id="experience" tabIndex={-1}><div className="wrap">
      <div className="section-heading" data-reveal><div><p className="eyebrow">04 / WORK EXPERIENCE</p><h2>Development to digital growth<span>.</span></h2></div></div>
      {p.experience.map(job => <article className="experience-card" data-reveal data-reveal-group="experience" key={`${job.company}-${job.role}`}><div className="experience-summary"><span className="date-label">{job.dates}</span><h3>{job.role}</h3><p>{job.company}<br />{job.location}</p></div><ul className="detail-list">{job.highlights.map(item => <li key={item}>{item}</li>)}</ul></article>)}
    </div></section>
  )
}

export function Education() {
  return (
    <section className="section wrap" id="education" tabIndex={-1}>
      <div className="section-heading" data-reveal><div><p className="eyebrow">05 / EDUCATION & GROWTH</p><h2>A foundation to build on<span>.</span></h2></div></div>
      <div className="education-grid"><div><h3 className="column-title" data-reveal>Education</h3><div className="education-list">{p.education.map(item => <article className="education-item" data-reveal data-reveal-group="education-timeline" key={item.qualification}><span className="date-label">{item.dates}</span><h3>{item.qualification}</h3><p>{item.institution}</p></article>)}</div></div><div className="credentials"><div><h3 className="column-title" data-reveal>Certifications & training</h3><ul className="certification-list">{p.certifications.map(item => <li data-reveal data-reveal-group="certifications" key={item.course}><strong>{item.course}</strong><span>{item.provider}</span></li>)}</ul></div><div className="achievement-panel" data-reveal><h3 className="column-title">Achievements</h3><ul className="detail-list">{p.achievements.map(item => <li key={item}>{item}</li>)}</ul></div></div></div>
    </section>
  )
}
