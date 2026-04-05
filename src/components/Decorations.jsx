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
      <Cat    position={[1.0, 3.5, -2.5]} rotation={[0, -0.5, 0]} scale={0.5} />
      <Sofa   position={[0.0, 3.5, -3.5]} rotation={[0, 0, 0]}    scale={0.6} />
      <Plant  position={[-2.0, 3.5, -2.0]} rotation={[0, 0, 0]}   scale={0.5} />
      <Plant  position={[ 2.5, 3.5, -2.0]} rotation={[0, 0, 0]}   scale={0.5} />
    </>
  )
}

useGLTF.preload(`${BASE}models/Cat.glb`)
useGLTF.preload(`${BASE}models/Plant - White Pot.glb`)
useGLTF.preload(`${BASE}models/Sofa.glb`)
