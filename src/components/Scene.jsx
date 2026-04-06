import { Suspense } from 'react'
import { OrbitControls, useTexture, Text } from '@react-three/drei'
import { RepeatWrapping } from 'three'
import PlaceholderScene from './PlaceholderScene'
import StudioModel from './StudioModel'
import ArtworkWall from './ArtworkWall'
import Decorations from './Decorations'

function Floor({ position = [0, 0.8, -2], size = [14, 12], repeat = [4, 4], rotation = [-Math.PI / 2 + 0.03, 0, 0.04] }) {
  const texture = useTexture(`${import.meta.env.BASE_URL}textures/floor.jpg`)
  texture.wrapS = texture.wrapT = RepeatWrapping
  texture.repeat.set(...repeat)

  return (
    <mesh rotation={rotation} position={position} renderOrder={2}>
      <planeGeometry args={size} />
      <meshStandardMaterial map={texture} roughness={0.6} polygonOffset polygonOffsetFactor={-4} polygonOffsetUnits={-4} />
    </mesh>
  )
}

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
        minPolarAngle={Math.PI / 4}    // how far up (radians from top)
        maxPolarAngle={Math.PI / 2}
      />

      <Suspense fallback={<LoadingFallback />}>
        {/* Ground floor */}
        <Floor position={[0, 0.8, -2]} size={[14, 12]} repeat={[4, 4]} />
        {/* Second floor loft — smaller rect, stays within platform away from stairs */}
        <Floor position={[-3.1, 3, 0.4]} size={[4, 6]} repeat={[1.5, 1.5]} />
        <Floor position={[-3.5, 3.1, -3.2]} size={[2, 2]} repeat={[1.5, 1.5]} />
        {USE_GLB ? <StudioModel onProjectClick={onProjectClick} /> : <PlaceholderScene onProjectClick={onProjectClick} />}
        {USE_GLB && <ArtworkWall onProjectClick={onProjectClick} />}
        <Decorations />
        {/* Wall title text */}
        <Text
          position={[2, 4.6, -4.3]}
          fontSize={0.35}
          color="#2a1a0a"
          anchorX="center"
          anchorY="middle"
          letterSpacing={0.05}
        >
          MY WORKS
        </Text>
      </Suspense>
    </>
  )
}
