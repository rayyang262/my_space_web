// Placeholder scene used while studio.glb isn't ready yet.
// Shows a simple room with colored cubes representing artwork positions.
// Replace with <StudioModel /> once you've exported your GLB from SketchUp.

import { useState } from 'react'
import { projects } from '../data/projects'

// Spread placeholder cubes along a back wall
const POSITIONS = [
  [-3.5, 2.0, -4.9],
  [-1.8, 2.0, -4.9],
  [-0.1, 2.0, -4.9],
  [1.6, 2.0, -4.9],
  [3.3, 2.0, -4.9],
  [-2.7, 2.0, -4.9],
  [0, 2.0, -4.9],
  [2.7, 2.0, -4.9],
]

function ArtworkCube({ project, position, onProjectClick }) {
  const [hovered, setHovered] = useState(false)

  return (
    <mesh
      position={position}
      onClick={(e) => { e.stopPropagation(); onProjectClick(project.id) }}
      onPointerOver={(e) => { e.stopPropagation(); setHovered(true); document.body.style.cursor = 'pointer' }}
      onPointerOut={(e) => { setHovered(false); document.body.style.cursor = 'auto' }}
    >
      <boxGeometry args={[1, 1.3, 0.05]} />
      <meshStandardMaterial
        color={hovered ? '#f0c060' : '#e8e0d0'}
        emissive={hovered ? '#f0c060' : '#000000'}
        emissiveIntensity={hovered ? 0.3 : 0}
      />
    </mesh>
  )
}

// Simple room geometry
function Room() {
  return (
    <group>
      {/* Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>
      {/* Back wall */}
      <mesh position={[0, 3, -6]}>
        <planeGeometry args={[20, 6]} />
        <meshStandardMaterial color="#2a2a2a" />
      </mesh>
      {/* Left wall */}
      <mesh rotation={[0, Math.PI / 2, 0]} position={[-6, 3, 0]}>
        <planeGeometry args={[20, 6]} />
        <meshStandardMaterial color="#252525" />
      </mesh>
      {/* Right wall */}
      <mesh rotation={[0, -Math.PI / 2, 0]} position={[6, 3, 0]}>
        <planeGeometry args={[20, 6]} />
        <meshStandardMaterial color="#252525" />
      </mesh>
      {/* Ceiling */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 6, 0]}>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="#141414" />
      </mesh>
    </group>
  )
}

export default function PlaceholderScene({ onProjectClick }) {
  return (
    <>
      <Room />
      {projects.slice(0, POSITIONS.length).map((project, i) => (
        <ArtworkCube key={project.id} project={project} position={POSITIONS[i]} onProjectClick={onProjectClick} />
      ))}
    </>
  )
}
