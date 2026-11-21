import { useEffect, useState } from 'react'

const headlinePairs = [
  ['Content strategy.', 'Search visibility.'],
  ['Search visibility.', 'Organic growth.'],
  ['SEO expertise.', 'Full stack skills.'],
  ['Technical SEO.', 'Organic growth.'],
  ['React interfaces.', 'Java backends.'],
  ['Content strategy.', 'Search visibility.'],
  ['Clean code.', 'Responsive web.'],
  ['Search analytics.', 'Informed strategy.'],
]

export default function AnimatedHeadline() {
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const timer = window.setInterval(() => {
      if (!document.hidden) {
        setActiveIndex(index => (index + 1) % headlinePairs.length)
      }
    }, 2000)

    return () => window.clearInterval(timer)
  }, [])

  const [firstLine, secondLine] = headlinePairs[activeIndex]

  return (
    <div className="headline-block">
      <h1 className="hero-headline" aria-label={`${firstLine} ${secondLine}`}>
        <span className="headline-animation" key={activeIndex}>
          {firstLine}<b>{secondLine}</b>
        </span>
      </h1>
    </div>
  )
}
