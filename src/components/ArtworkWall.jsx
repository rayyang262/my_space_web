import { useState, useRef, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { TextureLoader } from 'three'
import { projects } from '../data/projects'

// 2 rows × 3 columns on the staircase (-Z) back wall
const COLS = [0.8, 2, 3.2]
const ROWS = [3.5, 2.0]
const ARTWORK_W = 1
const ARTWORK_H = 1.2
const WALL_Z = -4.35
const FLOAT_OFFSET = 0.18
const HOVER_OFFSET = 0.45

const POSITIONS = ROWS.flatMap(y => COLS.map(x => [x, y, WALL_Z]))
const CANVAS_COLORS = ['#e8d5b7', '#d4b896', '#c9a87a', '#b8956a', '#d9c4a0', '#c4a882']

function ArtworkPlane({ project, position, onProjectClick, index }) {
  const [hovered, setHovered] = useState(false)
  const [texture, setTexture] = useState(null)
  const groupRef = useRef()
  const matRef = useRef()

  useEffect(() => {
    if (!project.imageSrc) return
    new TextureLoader().load(
      project.imageSrc,
      (tex) => {
        tex.needsUpdate = true
        setTexture(tex)
      },
      undefined,
      () => {}
    )
  }, [project.imageSrc])

  useEffect(() => {
    if (matRef.current && texture) {
      matRef.current.map = texture
      matRef.current.needsUpdate = true
    }
  }, [texture])

  useFrame(() => {
    if (!groupRef.current) return
    const target = hovered ? HOVER_OFFSET : FLOAT_OFFSET
    groupRef.current.position.z += (position[2] + target - groupRef.current.position.z) * 0.12

    // Scale up smoothly on hover
    const targetScale = hovered ? 1.18 : 1.0
    groupRef.current.scale.x += (targetScale - groupRef.current.scale.x) * 0.1
    groupRef.current.scale.y += (targetScale - groupRef.current.scale.y) * 0.1
    groupRef.current.scale.z += (targetScale - groupRef.current.scale.z) * 0.1
  })

  return (
    <group
      ref={groupRef}
      position={[position[0], position[1], position[2] + FLOAT_OFFSET]}
      rotation={[0, 0, 0]}
    >
      <mesh
        onClick={(e) => { e.stopPropagation(); onProjectClick(project.id) }}
        onPointerOver={(e) => { e.stopPropagation(); setHovered(true); document.body.style.cursor = 'pointer' }}
        onPointerOut={() => { setHovered(false); document.body.style.cursor = 'auto' }}
      >
        <planeGeometry args={[ARTWORK_W, ARTWORK_H]} />
        <meshStandardMaterial
          ref={matRef}
          color={texture ? '#ffffff' : (hovered ? '#ffffff' : CANVAS_COLORS[index % CANVAS_COLORS.length])}
          map={texture || null}
          emissive={hovered ? '#ffffff' : '#000000'}
          emissiveIntensity={hovered ? 0.35 : 0}
        />
      </mesh>

      {/* Gold frame border */}
      <mesh position={[0, 0, -0.008]}>
        <planeGeometry args={[ARTWORK_W + 0.07, ARTWORK_H + 0.07]} />
        <meshStandardMaterial color={hovered ? '#d4b96a' : '#c9a84c'} metalness={0.6} roughness={0.3} />
      </mesh>

      {/* Shadow/depth backing */}
      <mesh position={[0, 0, -0.04]}>
        <planeGeometry args={[ARTWORK_W + 0.14, ARTWORK_H + 0.14]} />
        <meshStandardMaterial color="#1a1200" transparent opacity={0.4} />
      </mesh>
    </group>
  )
}

export default function ArtworkWall({ onProjectClick }) {
  return (
    <>
      {POSITIONS.map((pos, i) => {
        const project = projects[i]
        if (!project) return null
        return (
          <ArtworkPlane
            key={project.id}
            project={project}
            position={pos}
            onProjectClick={onProjectClick}
            index={i}
          />
        )
      })}
    </>
  )
}
