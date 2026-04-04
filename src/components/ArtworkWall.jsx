import { useState, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { useTexture } from '@react-three/drei'
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

function TexturedCanvas({ imageSrc, hovered }) {
  const texture = useTexture(imageSrc)
  return (
    <meshStandardMaterial
      map={texture}
      emissive={hovered ? '#f0c060' : '#000000'}
      emissiveIntensity={hovered ? 0.2 : 0}
    />
  )
}

function PlaceholderCanvas({ hovered, index }) {
  return (
    <meshStandardMaterial
      color={hovered ? '#fff8e7' : CANVAS_COLORS[index % CANVAS_COLORS.length]}
      emissive={hovered ? '#f0c060' : '#000000'}
      emissiveIntensity={hovered ? 0.3 : 0}
    />
  )
}

function ArtworkPlane({ project, position, onProjectClick, index }) {
  const [hovered, setHovered] = useState(false)
  const groupRef = useRef()

  useFrame(() => {
    if (!groupRef.current) return
    const target = hovered ? HOVER_OFFSET : FLOAT_OFFSET
    groupRef.current.position.z += (position[2] + target - groupRef.current.position.z) * 0.12
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
        {project.imageSrc
          ? <TexturedCanvas imageSrc={project.imageSrc} hovered={hovered} />
          : <PlaceholderCanvas hovered={hovered} index={index} />
        }
      </mesh>

      {/* Gold frame border */}
      <mesh position={[0, 0, -0.008]}>
        <planeGeometry args={[ARTWORK_W + 0.07, ARTWORK_H + 0.07]} />
        <meshStandardMaterial color={hovered ? '#e8c84a' : '#c9a84c'} metalness={0.6} roughness={0.3} />
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
