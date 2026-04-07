import { MeshGradient } from '@paper-design/shaders-react'

// ── Color controls ─────────────────────────────────────────
const COLORS = [
  '#44624a',   // deep green
  '#8ba888',   // mid green
  '#c0cfb2',   // light sage
  '#f1ebe1',   // warm off-white
]
const BG_COLOR   = '#ffffff'   // base background
const SPEED      = 0.6         // animation speed (lower = slower)
// ───────────────────────────────────────────────────────────

export default function ShaderBackground() {
  return (
    <MeshGradient
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
      colors={COLORS}
      speed={SPEED}
      backgroundColor={BG_COLOR}
    />
  )
}
