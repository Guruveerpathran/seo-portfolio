import { useEffect, useRef } from 'react'

export default function usePortfolioMotion() {
  const progress = useRef(null)

  useEffect(() => {
    let frame = 0
    const update = () => {
      frame = 0
      const distance = document.documentElement.scrollHeight - window.innerHeight
      if (progress.current) progress.current.style.transform = `scaleX(${distance > 0 ? Math.min(1, Math.max(0, window.scrollY / distance)) : 0})`
    }
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update) }
    const resize = new ResizeObserver(schedule)
    resize.observe(document.body)
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    update()
    return () => {
      cancelAnimationFrame(frame)
      resize.disconnect()
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
    }
  }, [])

  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)')
    const pointer = window.matchMedia('(hover: hover) and (pointer: fine)')
    const cards = [...document.querySelectorAll('.project-art, .skill-panel')]
    const cleanups = cards.map(card => {
      let frame = 0
      const reset = () => {
        cancelAnimationFrame(frame)
        frame = 0
        card.style.removeProperty('--tilt-x')
        card.style.removeProperty('--tilt-y')
        card.style.removeProperty('--glow-x')
        card.style.removeProperty('--glow-y')
      }
      const move = event => {
        if (preference.matches || !pointer.matches) return
        const { clientX, clientY } = event
        cancelAnimationFrame(frame)
        frame = requestAnimationFrame(() => {
          const box = card.getBoundingClientRect()
          const x = Math.max(0, Math.min(1, (clientX - box.left) / box.width))
          const y = Math.max(0, Math.min(1, (clientY - box.top) / box.height))
          card.style.setProperty('--tilt-x', `${(0.5 - y) * 5}deg`)
          card.style.setProperty('--tilt-y', `${(x - 0.5) * 5}deg`)
          card.style.setProperty('--glow-x', `${x * 100}%`)
          card.style.setProperty('--glow-y', `${y * 100}%`)
        })
      }
      card.addEventListener('pointermove', move)
      card.addEventListener('pointerleave', reset)
      preference.addEventListener('change', reset)
      pointer.addEventListener('change', reset)
      return () => {
        reset()
        card.removeEventListener('pointermove', move)
        card.removeEventListener('pointerleave', reset)
        preference.removeEventListener('change', reset)
        pointer.removeEventListener('change', reset)
      }
    })
    return () => cleanups.forEach(cleanup => cleanup())
  }, [])

  return progress
}
