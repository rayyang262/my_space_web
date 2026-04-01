import { Suspense } from 'react'
import { OrbitControls } from '@react-three/drei'
import PlaceholderScene from './PlaceholderScene'
import StudioModel from './StudioModel'
import ArtworkWall from './ArtworkWall'

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
      <pointLight position={[0, 6, -1]} intensity={2.0} color="#fff8f0" />
      <pointLight position={[0, 4, 0]} intensity={0.8} />

      <OrbitControls
        target={[0, 1.5, -3]}
        enablePan={false}
        minDistance={0.5}
        maxDistance={18}
        enableDamping
        dampingFactor={0.06}
      />

      <Suspense fallback={<LoadingFallback />}>
        {USE_GLB ? <StudioModel onProjectClick={onProjectClick} /> : <PlaceholderScene onProjectClick={onProjectClick} />}
        {USE_GLB && <ArtworkWall onProjectClick={onProjectClick} />}
      </Suspense>
    </>
  )
}
