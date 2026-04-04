import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Html } from '@react-three/drei'

const HOVER_COLOR = '#f0c060'
const HOVER_EMISSIVE_INTENSITY = 0.4

export default function ArtworkMesh({ mesh, project }) {
  const navigate = useNavigate()
  const [hovered, setHovered] = useState(false)
  const originalColor = useRef(null)

  function handlePointerOver(e) {
    e.stopPropagation()
    setHovered(true)
    document.body.style.cursor = 'pointer'

    if (mesh.material) {
      if (!originalColor.current) {
        originalColor.current = mesh.material.emissive?.getHex?.() ?? 0x000000
      }
      mesh.material.emissive?.set(HOVER_COLOR)
      mesh.material.emissiveIntensity = HOVER_EMISSIVE_INTENSITY
    }
  }

  function handlePointerOut(e) {
    e.stopPropagation()
    setHovered(false)
    document.body.style.cursor = 'auto'

    if (mesh.material && originalColor.current !== null) {
      mesh.material.emissive?.setHex(originalColor.current)
      mesh.material.emissiveIntensity = 0
    }
  }

  function handleClick(e) {
    e.stopPropagation()
    navigate(`/project/${project.id}`)
  }

  return (
    <primitive
      object={mesh}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
      onClick={handleClick}
    >
      {hovered && (
        <Html center distanceFactor={10} style={{ pointerEvents: 'none' }}>
          <div
            style={{
              background: 'rgba(10,10,10,0.85)',
              color: '#f0c060',
              fontFamily: 'DM Sans, sans-serif',
              fontSize: '11px',
              fontWeight: 500,
              letterSpacing: '0.08em',
              padding: '4px 10px',
              borderRadius: '3px',
              whiteSpace: 'nowrap',
              border: '1px solid rgba(240,192,96,0.3)',
            }}
          >
            {project.title}
          </div>
        </Html>
      )}
    </primitive>
  )
}
