import { Suspense } from 'react'
import { OrbitControls } from '@react-three/drei'
import PlaceholderScene from './PlaceholderScene'
import StudioModel from './StudioModel'
import ArtworkWall from './ArtworkWall'

// Set USE_GLB to true once you've placed studio.glb in /public/
const USE_GLB = true

function LoadingFallback() {
  return (
    <mesh>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#333" />
    </mesh>
  )
}

export default function Scene({ onProjectClick }) {
  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[-5, 8, 2]} intensity={1.2} castShadow />
      <directionalLight position={[-3, 4, -3]} intensity={0.5} />
      {/* Gallery spot light aimed at the artwork wall */}
      <pointLight position={[2, 7, 0]} intensity={2.0} color="#fff8f0" />
      <pointLight position={[0, 4, 0]} intensity={0.8} />

      <OrbitControls
        target={[1, 2.5, 0]}
        enablePan={false}
        minDistance={0.5}
        maxDistance={12}
        enableDamping
        dampingFactor={0.06}
        minPolarAngle={Math.PI / 2 - 0.15}
        maxPolarAngle={Math.PI / 2 + 0.1}
      />

      <Suspense fallback={<LoadingFallback />}>
        {USE_GLB ? <StudioModel onProjectClick={onProjectClick} /> : <PlaceholderScene onProjectClick={onProjectClick} />}
        {USE_GLB && <ArtworkWall onProjectClick={onProjectClick} />}
      </Suspense>
    </>
  )
}
