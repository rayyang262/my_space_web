import { AnimatePresence, motion } from "framer-motion"

function WarpFlash({ locationKey }) {
  return (
    <AnimatePresence>
      <motion.div
        key={locationKey + "-flash"}
        className="fixed inset-0 pointer-events-none overflow-hidden"
        style={{ zIndex: 9999 }}
        initial={{ opacity: 1 }}
        animate={{ opacity: 0, transition: { duration: 0.6, ease: "easeOut" } }}
        exit={{ opacity: 0 }}
      >
        {/* bottom burst */}
        <motion.div
          className="absolute rounded-full blur-[80px] left-[25%] top-[100%]"
          style={{ width: '50%', height: '50%', backgroundColor: 'hsl(136, 18%, 33%)' }}
          initial={{ scale: 0, opacity: 0.9 }}
          animate={{ scale: 10, opacity: 0, transition: { duration: 0.55, ease: "easeOut" } }}
        />
        {/* left glow */}
        <motion.div
          className="absolute blur-[100px] rounded-full bg-[#8ba888]/60 w-full h-full top-[-25%] left-[-50%]"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.5, 0], transition: { duration: 0.55, times: [0, 0.3, 1] } }}
        />
        {/* right glow */}
        <motion.div
          className="absolute blur-[100px] rounded-full bg-[#8ba888]/60 w-full h-full top-[25%] left-[50%]"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.5, 0], transition: { duration: 0.55, times: [0, 0.3, 1], delay: 0.05 } }}
        />
      </motion.div>
    </AnimatePresence>
  )
}

export default function WarpPageTransition({ children, locationKey }) {
  return (
    <>
      <WarpFlash locationKey={locationKey} />
      <AnimatePresence mode="wait">
        <motion.div
          key={locationKey}
          style={{ width: '100vw', height: '100vh', position: 'relative' }}
          initial={{ opacity: 0, y: 40, skewY: -1.5 }}
          animate={{
            opacity: 1, y: 0, skewY: 0,
            transition: {
              duration: 0.45,
              ease: [0.59, 0, 0.35, 1],
              y: { type: "spring", visualDuration: 0.5, bounce: 0.15 },
              opacity: { duration: 0.25 },
            },
          }}
          exit={{
            opacity: 0, y: -20, skewY: 1,
            transition: { duration: 0.2, ease: [0.59, 0, 0.35, 1] },
          }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </>
  )
}
