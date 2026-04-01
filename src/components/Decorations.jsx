// 3D decorative objects: rug, potted plants, sleeping cat, desk + chair
// All built from Three.js primitives — no external assets needed

function Rug() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[1.5, 0.01, -1.5]}>
      <planeGeometry args={[3.5, 2.2]} />
      <meshStandardMaterial color="#8b3a2a" roughness={0.9} />
    </mesh>
  )
}

function Plant({ position }) {
  return (
    <group position={position}>
      {/* Pot */}
      <mesh position={[0, 0.18, 0]}>
        <cylinderGeometry args={[0.12, 0.09, 0.35, 12]} />
        <meshStandardMaterial color="#a0522d" roughness={0.8} />
      </mesh>
      {/* Soil */}
      <mesh position={[0, 0.36, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.12, 12]} />
        <meshStandardMaterial color="#2b1a0e" roughness={1} />
      </mesh>
      {/* Foliage — two overlapping spheres for a bushy look */}
      <mesh position={[0, 0.65, 0]}>
        <sphereGeometry args={[0.28, 10, 10]} />
        <meshStandardMaterial color="#2d5a27" roughness={0.8} />
      </mesh>
      <mesh position={[0.1, 0.55, 0.05]}>
        <sphereGeometry args={[0.18, 8, 8]} />
        <meshStandardMaterial color="#3a7a30" roughness={0.8} />
      </mesh>
    </group>
  )
}

function SleepingCat({ position }) {
  return (
    <group position={position}>
      {/* Body — elongated oval curled on floor */}
      <mesh position={[0, 0.14, 0]} scale={[1.5, 0.75, 1]}>
        <sphereGeometry args={[0.22, 14, 10]} />
        <meshStandardMaterial color="#c4702a" roughness={0.7} />
      </mesh>
      {/* Head — smaller sphere tucked to the side */}
      <mesh position={[0.26, 0.22, 0.1]}>
        <sphereGeometry args={[0.13, 12, 10]} />
        <meshStandardMaterial color="#c4702a" roughness={0.7} />
      </mesh>
      {/* Ear left */}
      <mesh position={[0.21, 0.34, 0.13]} rotation={[0, 0, -0.3]}>
        <coneGeometry args={[0.04, 0.08, 6]} />
        <meshStandardMaterial color="#b8632a" roughness={0.7} />
      </mesh>
      {/* Ear right */}
      <mesh position={[0.3, 0.34, 0.08]} rotation={[0, 0, 0.3]}>
        <coneGeometry args={[0.04, 0.08, 6]} />
        <meshStandardMaterial color="#b8632a" roughness={0.7} />
      </mesh>
      {/* Tail curling around body */}
      <mesh position={[-0.28, 0.1, 0.08]} rotation={[0.3, 0, 0.8]} scale={[0.4, 1, 0.4]}>
        <sphereGeometry args={[0.1, 8, 6]} />
        <meshStandardMaterial color="#c4702a" roughness={0.7} />
      </mesh>
    </group>
  )
}

function Desk({ position }) {
  return (
    <group position={position}>
      {/* Tabletop */}
      <mesh position={[0, 0.78, 0]}>
        <boxGeometry args={[1.4, 0.06, 0.65]} />
        <meshStandardMaterial color="#d4a96a" roughness={0.6} />
      </mesh>
      {/* Legs */}
      {[[-0.62, 0, -0.27], [0.62, 0, -0.27], [-0.62, 0, 0.27], [0.62, 0, 0.27]].map((lp, i) => (
        <mesh key={i} position={[lp[0], 0.38, lp[2]]}>
          <cylinderGeometry args={[0.03, 0.03, 0.75, 8]} />
          <meshStandardMaterial color="#b8863e" roughness={0.6} />
        </mesh>
      ))}
    </group>
  )
}

function Chair({ position }) {
  return (
    <group position={position}>
      {/* Seat */}
      <mesh position={[0, 0.5, 0]}>
        <boxGeometry args={[0.5, 0.06, 0.5]} />
        <meshStandardMaterial color="#d4a96a" roughness={0.6} />
      </mesh>
      {/* Backrest */}
      <mesh position={[0, 0.82, -0.22]}>
        <boxGeometry args={[0.5, 0.55, 0.05]} />
        <meshStandardMaterial color="#d4a96a" roughness={0.6} />
      </mesh>
      {/* Legs */}
      {[[-0.2, 0, -0.2], [0.2, 0, -0.2], [-0.2, 0, 0.2], [0.2, 0, 0.2]].map((lp, i) => (
        <mesh key={i} position={[lp[0], 0.24, lp[2]]}>
          <cylinderGeometry args={[0.025, 0.025, 0.5, 8]} />
          <meshStandardMaterial color="#b8863e" roughness={0.6} />
        </mesh>
      ))}
    </group>
  )
}

export default function Decorations() {
  return (
    <>
      <Rug />
      <Plant position={[-4.2, 0.5, 0.8]} />
      <Plant position={[4.0, 0.5, 0.8]} />
      <SleepingCat position={[0.5, 0.6, -0.6]} />
      <Desk position={[-2.8, 0.5, -2.0]} />
      <Chair position={[-2.8, 0.5, -1.2]} />
    </>
  )
}
