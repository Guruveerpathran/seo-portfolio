import { useEffect } from 'react'

// Native, one-time viewport reveals. Content remains visible if unsupported.
export default function useReveal() {
  useEffect(() => {
    if (!('IntersectionObserver' in window)) return
    const elements = [...document.querySelectorAll('[data-reveal]')]
    const groups = new Map()

    elements.forEach(element => {
      const group = element.dataset.revealGroup || `single-${groups.size}`
      const index = groups.get(group) || 0
      element.dataset.revealIndex = index
      element.dataset.revealDirection = index % 2 === 0 ? 'left' : 'right'
      groups.set(group, index + 1)
    })

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return
        observer.unobserve(entry.target)
        entry.target.dataset.revealed = 'true'
        entry.target.style.setProperty('--reveal-delay', `${Math.min(Number(entry.target.dataset.revealIndex || 0) * 110, 440)}ms`)

        // Apply on the next frame so the browser always paints the animation
        // from its first keyframe, including on a fast initial page load.
        requestAnimationFrame(() => entry.target.classList.add('is-revealed'))
      })
    }, { threshold: 0.14, rootMargin: '0px 0px -8% 0px' })
    elements.forEach(element => observer.observe(element))
    return () => {
      observer.disconnect()
    }
  }, [])
}
