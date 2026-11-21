import { useEffect, useRef, useState } from 'react'
import { portfolio } from '../data/portfolio'

export default function ContactModal({ open, onClose }) {
  const dialog = useRef(null)
  const closeButton = useRef(null)
  const [form, setForm] = useState({ name: '', email: '', message: '' })

  useEffect(() => {
    if (!open) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeButton.current?.focus()
    const onKeyDown = event => {
      if (event.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = previousOverflow
    }
  }, [open, onClose])

  if (!open) return null

  const submit = event => {
    event.preventDefault()
    const subject = `Portfolio enquiry from ${form.name}`
    const body = `Name: ${form.name}\nEmail: ${form.email}\n\nMessage:\n${form.message}`
    window.location.href = `mailto:${portfolio.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  }

  return (
    <div className="contact-modal-backdrop" role="presentation" onMouseDown={event => { if (event.target === event.currentTarget) onClose() }}>
      <section ref={dialog} className="contact-modal" role="dialog" aria-modal="true" aria-labelledby="contact-modal-title">
        <button ref={closeButton} className="contact-modal-close" type="button" onClick={onClose} aria-label="Close contact form">×</button>
        <div className="contact-modal-main">
          <div className="contact-form-column">
            <p className="eyebrow">LET’S TALK</p>
            <h2 id="contact-modal-title">Let’s make<br /><em>an impact.</em></h2>
            <p>Share your project or opportunity. Your email app will open with the message ready to send.</p>
            <form onSubmit={submit}>
              <label>Your name<input required autoComplete="name" value={form.name} onChange={event => setForm({ ...form, name: event.target.value })} /></label>
              <label>Email address<input type="email" required autoComplete="email" value={form.email} onChange={event => setForm({ ...form, email: event.target.value })} /></label>
              <label>Message<textarea required rows="4" value={form.message} onChange={event => setForm({ ...form, message: event.target.value })} /></label>
              <button className="button" type="submit">Create email <span aria-hidden="true">↗</span></button>
            </form>
          </div>
          <aside className="contact-modal-aside" aria-label="Contact information">
            <div className="contact-orbit" aria-hidden="true"><span>✦</span></div>
            <div className="contact-aside-copy"><span className="contact-availability"><i /> AVAILABLE FOR NEW OPPORTUNITIES</span><strong>SEO that works.<br />Websites that perform.</strong><p>{portfolio.role}</p></div>
            <a href={`mailto:${portfolio.email}`}>{portfolio.email}<span aria-hidden="true">↗</span></a>
          </aside>
        </div>
      </section>
    </div>
  )
}
