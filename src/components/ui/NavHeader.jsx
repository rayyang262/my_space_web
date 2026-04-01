import { useRef, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'

const TABS = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
]

function Tab({ children, href, setPosition }) {
  const ref = useRef(null)
  const navigate = useNavigate()
  const location = useLocation()

  return (
    <li
      ref={ref}
      onMouseEnter={() => {
        if (!ref.current) return
        const { width } = ref.current.getBoundingClientRect()
        setPosition({ width, opacity: 1, left: ref.current.offsetLeft })
      }}
      onClick={() => navigate(href)}
      className="relative z-10 block cursor-pointer px-6 py-3 text-sm font-medium tracking-wide mix-blend-difference text-white"
    >
      {children}
    </li>
  )
}

function Cursor({ position }) {
  return (
    <motion.li
      animate={position}
      className="absolute z-0 h-5 rounded-full bg-white"
    />
  )
}

export default function NavHeader() {
  const [position, setPosition] = useState({ left: 0, width: 0, opacity: 0 })

  return (
    <div className="fixed top-5 left-0 right-0 z-50 flex justify-center pointer-events-none">
      <ul
        className="pointer-events-auto relative flex w-fit items-center rounded-full border border-white/20 bg-black/50 backdrop-blur-md px-16 py-8 shadow-xl gap-4"
        onMouseLeave={() => setPosition((pv) => ({ ...pv, opacity: 0 }))}
      >
        {TABS.map((tab) => (
          <Tab key={tab.href} href={tab.href} setPosition={setPosition}>
            {tab.label}
          </Tab>
        ))}
        <Cursor position={position} />
      </ul>
    </div>
  )
}
