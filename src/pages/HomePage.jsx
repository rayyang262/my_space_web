import { Canvas } from '@react-three/fiber'
import { useNavigate } from 'react-router-dom'
import Scene from '../components/Scene'
import '../styles/HomePage.css'

export default function HomePage() {
  const navigate = useNavigate()

  return (
    <div className="home-canvas">
      <Canvas
        camera={{ position: [4, 3.5, 1.5], fov: 72 }}
        shadows
        gl={{ antialias: true }}
      >
        <Scene onProjectClick={(id) => navigate(`/project/${id}`)} />
      </Canvas>
    </div>
  )
}
