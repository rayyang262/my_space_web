import { Suspense } from 'react'
import { OrbitControls } from '@react-three/drei'
import PlaceholderScene from './PlaceholderScene'
import StudioModel from './StudioModel'
import ArtworkWall from './ArtworkWall'
import Decorations from './Decorations'

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
      {/* Warm cozy ambient */}
      <ambientLight color="#fff5e0" intensity={0.6} />

      {/* Main directional light */}
      <directionalLight position={[-5, 8, 2]} intensity={0.9} castShadow color="#ffe8c0" />
      <directionalLight position={[-3, 4, -3]} intensity={0.4} color="#ffd9a0" />

      {/* Warm amber overhead glow */}
      <pointLight position={[0, 6, -1]} intensity={2.5} color="#ffb347" />

      {/* Soft fill */}
      <pointLight position={[0, 4, 0]} intensity={0.7} color="#fff0d0" />

      {/* Desk area atmosphere light */}
      <pointLight position={[-2.8, 2.5, -2.0]} intensity={0.6} color="#ff9a3c" />

      <OrbitControls
        target={[0, 1.5, -3]}
        enablePan={false}
        enableZoom={false}
        enableDamping
        dampingFactor={0.06}
        minAzimuthAngle={-Math.PI / 4}   // how far left (radians)
        maxAzimuthAngle={Math.PI / 4}  
        minPolarAngle={-Math.PI / 4}    // how far up (radians from top)
        maxPolarAngle={Math.PI / 4}
      />

      <Suspense fallback={<LoadingFallback />}>
        {USE_GLB ? <StudioModel onProjectClick={onProjectClick} /> : <PlaceholderScene onProjectClick={onProjectClick} />}
        {USE_GLB && <ArtworkWall onProjectClick={onProjectClick} />}
        <Decorations />
      </Suspense>
    </>
  )
}
