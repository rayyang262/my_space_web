import { useState, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { projects } from '../data/projects'

// 2 rows × 3 columns on the staircase (-Z) back wall
const COLS = [0.8, 2, 3.2]   // X positions
const ROWS = [3.5, 2.0]        // Y positions
const ARTWORK_W = 1
const ARTWORK_H = 1.2
const WALL_Z = -4.35
const FLOAT_OFFSET = 0.18    // resting float distance from wall (toward +Z = toward camera)
const HOVER_OFFSET = 0.45    // pop-out distance on hover

const POSITIONS = ROWS.flatMap(y => COLS.map(x => [x, y, WALL_Z]))

function ArtworkPlane({ project, position, onProjectClick }) {
  const [hovered, setHovered] = useState(false)
  const groupRef = useRef()

  useFrame(() => {
    if (!groupRef.current) return
    const target = hovered ? HOVER_OFFSET : FLOAT_OFFSET
    // Float in +Z direction from wall (toward camera at Z positive)
    groupRef.current.position.z += (position[2] + target - groupRef.current.position.z) * 0.12
  })

  return (
    <group
      ref={groupRef}
      position={[position[0], position[1], position[2] + FLOAT_OFFSET]}
      rotation={[0, 0, 0]}
    >
      {/* Canvas face — default planeGeometry faces +Z toward camera */}
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

      {/* Frame border — local -Z = toward wall */}
      <mesh position={[0, 0, -0.008]}>
        <planeGeometry args={[ARTWORK_W + 0.07, ARTWORK_H + 0.07]} />
        <meshStandardMaterial color={hovered ? '#1a1a1a' : '#2a2a2a'} />
      </mesh>

      {/* Shadow/depth backing */}
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
