import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const INTRO_DONE_KEY = 'portfolio-intro-done'
const INTRO_VIDEO_FILE = 'logo-intro.mp4'

function hasIntroDone() {
  try {
    return sessionStorage.getItem(INTRO_DONE_KEY) === '1'
  } catch {
    return true
  }
}

function prefersReducedMotion() {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function markIntroDone() {
  try {
    sessionStorage.setItem(INTRO_DONE_KEY, '1')
  } catch {
    /* ignore quota / private mode */
  }
}

function videoBaseUrl() {
  const base = import.meta.env.BASE_URL
  return base.endsWith('/') ? base : `${base}/`
}

export default function IntroSplash() {
  const [visible, setVisible] = useState(() => {
    if (typeof window === 'undefined') return false
    if (hasIntroDone()) return false
    if (prefersReducedMotion()) {
      markIntroDone()
      return false
    }
    return true
  })

  const finishedRef = useRef(false)
  const videoRef = useRef(null)
  const safetyTimerRef = useRef(null)

  const finalizeIntro = useCallback(() => {
    if (finishedRef.current) return
    finishedRef.current = true
    markIntroDone()
    if (safetyTimerRef.current) {
      clearTimeout(safetyTimerRef.current)
      safetyTimerRef.current = null
    }
    setVisible(false)
  }, [])

  useEffect(() => {
    if (!visible) return
    const el = videoRef.current
    if (!el) return

    const armSafetyTimeout = () => {
      if (safetyTimerRef.current) clearTimeout(safetyTimerRef.current)
      const d = Number.isFinite(el.duration) && el.duration > 0 ? el.duration : 8
      safetyTimerRef.current = window.setTimeout(() => {
        finalizeIntro()
      }, (d + 2) * 1000)
    }

    const onLoadedMeta = () => {
      armSafetyTimeout()
    }

    el.addEventListener('loadedmetadata', onLoadedMeta)
    if (el.readyState >= 1) armSafetyTimeout()

    return () => {
      el.removeEventListener('loadedmetadata', onLoadedMeta)
      if (safetyTimerRef.current) {
        clearTimeout(safetyTimerRef.current)
        safetyTimerRef.current = null
      }
    }
  }, [visible, finalizeIntro])

  const srcMp4 = `${videoBaseUrl()}intro/${INTRO_VIDEO_FILE}`

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="portfolio-intro-overlay"
          className="fixed inset-0 flex flex-col items-center justify-center"
          style={{
            zIndex: 10050,
            backgroundColor: '#0a0a0a',
            pointerEvents: 'auto',
          }}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.45, ease: [0.59, 0, 0.35, 1] } }}
        >
          <motion.div
            className="relative flex flex-1 w-full min-h-0 items-center justify-center px-4 pb-16 pt-8"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1, transition: { duration: 0.35, ease: [0.59, 0, 0.35, 1] } }}
          >
            <video
              ref={videoRef}
              className="max-h-[min(85vh,100%)] max-w-full w-auto h-auto object-contain"
              src={srcMp4}
              autoPlay
              muted
              playsInline
              preload="auto"
              aria-label="Site introduction"
              onEnded={finalizeIntro}
              onError={finalizeIntro}
            />
          </motion.div>

          <button
            type="button"
            onClick={finalizeIntro}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 cursor-pointer border-none bg-transparent px-4 py-2 text-sm tracking-wide text-[#e8e0d0]/55 underline-offset-4 transition-colors hover:text-[#e8e0d0]/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e8e0d0]/40"
            style={{ fontFamily: 'inherit' }}
          >
            Skip
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
