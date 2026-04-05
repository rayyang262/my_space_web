import { useEffect } from 'react'
import { useGLTF } from '@react-three/drei'
import { Box3, Vector3, DoubleSide } from 'three'
import { projects } from '../data/projects'

const projectByMesh = Object.fromEntries(projects.map((p) => [p.meshName, p]))

// Target size: normalize longest axis to this many units
const TARGET_SIZE = 10

export default function StudioModel({ onProjectClick }) {
  const { scene } = useGLTF(`${import.meta.env.BASE_URL}studio.glb`)

  useEffect(() => {
    // Guard on the scene object so HMR remounts don't double-apply
    if (scene.userData.normalized) return
    scene.userData.normalized = true

    // Center and scale the model to fit the scene
    const box = new Box3().setFromObject(scene)
    const size = box.getSize(new Vector3())
    const center = box.getCenter(new Vector3())
    const maxDim = Math.max(size.x, size.y, size.z)
    const scale = TARGET_SIZE / maxDim

    scene.scale.setScalar(scale)
    scene.position.set(
      -center.x * scale,
      -box.min.y * scale, // sit on y=0 floor
      -center.z * scale
    )

    // Make all materials double-sided so interior faces are visible from all angles
    scene.traverse((obj) => {
      if (obj.isMesh) {
        const mats = Array.isArray(obj.material) ? obj.material : [obj.material]
        mats.forEach(m => { if (m) m.side = DoubleSide })
      }
    })

    // Log mesh names to help map to project IDs
    const meshNames = []
    scene.traverse((obj) => { if (obj.isMesh) meshNames.push(obj.name) })
    console.log('GLB mesh names:', JSON.stringify(meshNames))
  }, [scene])

  function handlePointerOver(e) {
    const mesh = e.object
    if (!mesh.name.startsWith('artwork_')) return
    e.stopPropagation()
    document.body.style.cursor = 'pointer'
    if (mesh.material?.emissive) {
      mesh.material.emissive.set('#f0c060')
      mesh.material.emissiveIntensity = 0.4
    }
  }

  function handlePointerOut(e) {
    const mesh = e.object
    if (!mesh.name.startsWith('artwork_')) return
    document.body.style.cursor = 'auto'
    if (mesh.material?.emissive) {
      mesh.material.emissive.set('#000000')
      mesh.material.emissiveIntensity = 0
    }
  }

  function handleClick(e) {
    const mesh = e.object
    const project = projectByMesh[mesh.name]
    if (!project) return
    e.stopPropagation()
    onProjectClick(project.id)
  }

  return (
    <primitive
      object={scene}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
      onClick={handleClick}
    />
  )
}

// Preload disabled — enable after confirming studio.glb loads correctly
// useGLTF.preload('/studio.glb')
