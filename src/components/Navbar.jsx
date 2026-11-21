import { useEffect, useRef, useState } from 'react'
import { portfolio } from '../data/portfolio'
import resumePdf from '../assets/GB-Resume.pdf (1).pdf'

const links = [
  { id: 'home', label: 'Home' },
  { id: 'work', label: 'Work' },
  { id: 'resume', label: 'Resume', href: resumePdf, external: true },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'education', label: 'Education' },
  { id: 'contact', label: 'Let’s talk', cta: true },
]

export default function Navbar({ onContact }) {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('home')
  const [scrolled, setScrolled] = useState(false)
  const header = useRef(null)
  const toggle = useRef(null)

  useEffect(() => {
    let frame = 0
    const update = () => {
      frame = 0
      setScrolled(window.scrollY > 12)
      const offset = header.current.getBoundingClientRect().height + 50
      let current = 'home'
      for (const { id } of links) {
        if (document.getElementById(id)?.getBoundingClientRect().top <= offset) current = id
      }
      if (window.scrollY > 0 && window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) current = 'contact'
      setActive(current)
    }
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update) }
    const onResize = () => { if (window.innerWidth > 960) setOpen(false); onScroll() }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onResize)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = event => {
      if (event.key === 'Escape') { setOpen(false); toggle.current.focus() }
    }
    const onOutside = event => { if (!header.current.contains(event.target)) setOpen(false) }
    document.addEventListener('keydown', onKey)
    document.addEventListener('pointerdown', onOutside)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('pointerdown', onOutside)
    }
  }, [open])

  const navigate = id => {
    setOpen(false)
    document.getElementById(id)?.focus({ preventScroll: true })
  }

  return (
    <header ref={header} className={`nav-shell${scrolled ? ' is-scrolled' : ''}`} onBlur={event => {
      if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false)
    }}>
      <div className="site-header wrap">
        <a className="brand" href="#home" aria-label={`${portfolio.name} home`} onClick={() => navigate('home')}>{portfolio.initials}<span>.</span></a>
        <button ref={toggle} className={`menu-toggle${open ? ' is-open' : ''}`} type="button" aria-expanded={open} aria-controls="main-navigation" aria-label={open ? 'Close navigation menu' : 'Open navigation menu'} onClick={() => setOpen(value => !value)}>
          <span className="menu-label">{open ? 'Close' : 'Menu'}</span><span className="menu-icon" aria-hidden="true"><span /><span /></span>
        </button>
        <nav id="main-navigation" className={`main-nav${open ? ' is-open' : ''}`} aria-label="Main navigation">
          {links.map(({ id, label, cta, href, external }) => <a key={id} href={href ?? `#${id}`} className={`nav-link${cta ? ' nav-cta' : ''}`} aria-current={active === id ? 'location' : undefined} aria-haspopup={cta ? 'dialog' : undefined} target={external ? '_blank' : undefined} rel={external ? 'noreferrer' : undefined} onClick={event => {
            if (cta) { event.preventDefault(); setOpen(false); onContact?.(); return }
            if (!external) navigate(id)
            else setOpen(false)
          }}>{label}{(cta || external) && <span aria-hidden="true">↗</span>}</a>)}
        </nav>
      </div>
    </header>
  )
}
