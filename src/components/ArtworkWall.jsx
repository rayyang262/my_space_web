import { useState, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { projects } from '../data/projects'

// 3 rows × 2 columns on the staircase (right) wall
const COLS = [-0.6, 0.6]
const ROWS = [5.2, 3.7, 2.2]
const ARTWORK_W = 1.05
const ARTWORK_H = 1.15
const WALL_X = 4.25
const FLOAT_OFFSET = 0.18    // resting float distance from wall (in -X direction)
const HOVER_OFFSET = 0.45    // pop-out distance on hover

const POSITIONS = ROWS.flatMap(y => COLS.map(z => [WALL_X, y, z]))

function ArtworkPlane({ project, position, onProjectClick }) {
  const [hovered, setHovered] = useState(false)
  const groupRef = useRef()

  useFrame(() => {
    if (!groupRef.current) return
    const target = hovered ? HOVER_OFFSET : FLOAT_OFFSET
    // Lerp the X offset smoothly
    groupRef.current.position.x += (position[0] - target - groupRef.current.position.x) * 0.12
  })

  return (
    <group
      ref={groupRef}
      position={[position[0] - FLOAT_OFFSET, position[1], position[2]]}
      rotation={[0, -Math.PI / 2, 0]}
    >
      {/* Canvas face */}
      <mesh
        onClick={(e) => { e.stopPropagation(); onProjectClick(project.id) }}
        onPointerOver={(e) => { e.stopPropagation(); setHovered(true); document.body.style.cursor = 'pointer' }}
        onPointerOut={() => { setHovered(false); document.body.style.cursor = 'auto' }}
      >
        <planeGeometry args={[ARTWORK_W, ARTWORK_H]} />
        <meshStandardMaterial
          color={hovered ? '#fff8e7' : '#f5f5f0'}
          emissive={hovered ? '#f0c060' : '#000000'}
          emissiveIntensity={hovered ? 0.3 : 0}
        />
      </mesh>

      {/* Frame border */}
      <mesh position={[0, 0, -0.008]}>
        <planeGeometry args={[ARTWORK_W + 0.07, ARTWORK_H + 0.07]} />
        <meshStandardMaterial color={hovered ? '#1a1a1a' : '#2a2a2a'} />
      </mesh>

      {/* Shadow/depth backing — gives a floating card look */}
      <mesh position={[0, 0, -0.04]}>
        <planeGeometry args={[ARTWORK_W + 0.14, ARTWORK_H + 0.14]} />
        <meshStandardMaterial color="#111111" transparent opacity={0.35} />
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
          />
        )
      })}
    </>
  )
}
