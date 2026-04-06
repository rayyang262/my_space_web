// 3D decorative objects loaded from GLB models
// All placed on the second floor (Y ≈ 3.5)

import { useGLTF } from '@react-three/drei'
import { MeshStandardMaterial, Color } from 'three'

const BASE = import.meta.env.BASE_URL

function Cat({ position, rotation = [0, 0, 0], scale = 1 }) {
  const { scene } = useGLTF(`${BASE}models/Cat.glb`)
  return <primitive object={scene.clone()} position={position} rotation={rotation} scale={scale} />
}

function Plant({ position, rotation = [0, 0, 0], scale = 1 }) {
  const { scene } = useGLTF(`${BASE}models/Plant - White Pot.glb`)
  return <primitive object={scene.clone()} position={position} rotation={rotation} scale={scale} />
}

function Sofa({ position, rotation = [0, 0, 0], scale = 1 }) {
  const { scene } = useGLTF(`${BASE}models/Sofa.glb`)
  return <primitive object={scene.clone()} position={position} rotation={rotation} scale={scale} />
}

const WOOD_MAT = new MeshStandardMaterial({ color: new Color('#8B5E3C'), roughness: 0.8, metalness: 0.0 })

function Fence({ position, rotation = [0, 0, 0], scale = 1 }) {
  const { scene } = useGLTF(`${BASE}models/Border.glb`)
  const clone = scene.clone()
  clone.traverse((obj) => {
    if (obj.isMesh) obj.material = WOOD_MAT
  })
  return <primitive object={clone} position={position} rotation={rotation} scale={scale} />
}

export default function Decorations() {
  return (
    <>
      {/* Sofa on second floor platform */}
      <Sofa   position={[-3, 2.95, -0.2]} rotation={[0, 1.7, 0]}   scale={0.5} />
      {/* Cat on second floor */}
      <Cat    position={[-2, 3.3, -2]}    rotation={[0, 2.5, 0]}   scale={0.008} />
      {/* Plants at front corners of second floor */}
      <Plant  position={[-3.2, 3.4, -1.8]} rotation={[0, 0, 0]}    scale={0.4} />

      {/* Second floor railing — fence segments along front edge */}
      <Fence position={[-0.9, 2.82, 0.1]} rotation={[0.01,  Math.PI + 0.04, 0]} scale={[1, 1.5, 1]} />
      <Fence position={[-0.82, 2.8, 2]} rotation={[0.01, Math.PI + 0.04, 0]} scale={[1, 1.5, 1]} />
      <Fence position={[-0.98, 2.84, -1.9]} rotation={[0.01, Math.PI + 0.04, 0]} scale={[1, 1.5, 1]} />
      <Fence position={[-1.78, 2.86, -2.95]} rotation={[0.1, -Math.PI/2 + 0.04, 0]} scale={[1, 1.5, 0.7]} />
    </>
  )
}

useGLTF.preload(`${BASE}models/Cat.glb`)
useGLTF.preload(`${BASE}models/Plant - White Pot.glb`)
useGLTF.preload(`${BASE}models/Sofa.glb`)
useGLTF.preload(`${BASE}models/Border.glb`)
