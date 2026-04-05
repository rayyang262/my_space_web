// 3D decorative objects loaded from GLB models
// All placed on the second floor (Y ≈ 3.5)

import { useGLTF } from '@react-three/drei'

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

export default function Decorations() {
  return (
    <>
      {/* Sofa on second floor platform */}
      <Sofa   position={[-1.5, 3.0, -3.2]} rotation={[0, 0, 0]}      scale={0.35} />
      {/* Cat on second floor */}
      <Cat    position={[-1.5, 3.0, -3.5]} rotation={[0, 2.5, 0]}    scale={0.015} />
      {/* Plants at front corners of second floor */}
      <Plant  position={[-3.2, 3.0, -1.8]} rotation={[0, 0, 0]}      scale={0.4} />
      <Plant  position={[ 4.0, 3.0, -0.8]} rotation={[0, 0, 0]}      scale={0.4} />
    </>
  )
}

useGLTF.preload(`${BASE}models/Cat.glb`)
useGLTF.preload(`${BASE}models/Plant - White Pot.glb`)
useGLTF.preload(`${BASE}models/Sofa.glb`)
