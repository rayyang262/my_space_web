import { useRef, useMemo, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const vertexShader = `
  uniform float time;
  uniform vec3 waveOrigin;
  uniform float waveStrength;
  varying vec2 vUv;
  varying float vWave;

  void main() {
    vUv = uv;
    vec3 pos = position;

    // Distance from wave origin
    float dist = distance(vec2(pos.x, pos.z), waveOrigin.xz);

    // Wave that bounces back from origin
    float wave = sin(dist * 15.0 - time * 4.0) * exp(-dist * 3.0) * waveStrength;
    pos.y += wave * 0.3;

    // Base animation
    pos.y += sin(pos.x * 8.0 + time) * 0.05;
    pos.y += cos(pos.z * 6.0 + time * 0.7) * 0.04;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`

const fragmentShader = `
  uniform float time;
  uniform vec3 color1;
  uniform vec3 color2;
  uniform vec3 color3;
  varying vec2 vUv;

  void main() {
    vec2 uv = vUv;

    // Animated noise pattern
    float noise = sin(uv.x * 20.0 + time) * cos(uv.y * 15.0 + time * 0.8);
    noise += sin(uv.x * 35.0 - time * 2.0) * cos(uv.y * 25.0 + time * 1.2) * 0.5;

    // Mix colors based on noise
    vec3 color = mix(color1, color2, noise * 0.5 + 0.5);
    color = mix(color, color3, abs(sin(time * 0.5)) * 0.3);

    // Glow effect
    float glow = 1.0 - length(uv - 0.5) * 1.5;
    glow = pow(max(glow, 0.0), 2.0);

    gl_FragColor = vec4(color * (0.8 + glow * 0.3), 1.0);
  }
`

export function InteractiveShaderBackground({ panelRef }) {
  const mesh = useRef()
  const uniforms = useMemo(
    () => ({
      time: { value: 0 },
      waveOrigin: { value: new THREE.Vector3(0, 0, 0) },
      waveStrength: { value: 0.8 },
      color1: { value: new THREE.Color('#44624a') },
      color2: { value: new THREE.Color('#8ba888') },
      color3: { value: new THREE.Color('#c0cfb2') },
    }),
    [],
  )

  useFrame((state) => {
    if (mesh.current) {
      uniforms.time.value = state.clock.elapsedTime

      // Get panel position if it exists
      if (panelRef?.current) {
        const rect = panelRef.current.getBoundingClientRect()
        const centerX = (rect.left + rect.right) / 2
        const centerY = (rect.top + rect.bottom) / 2

        // Normalize to -1 to 1 range
        const x = (centerX / window.innerWidth) * 2 - 1
        const y = -(centerY / window.innerHeight) * 2 + 1

        uniforms.waveOrigin.value.set(x * 5, 0, y * 5)

        // Wave strength pulses
        uniforms.waveStrength.value = 0.8 + Math.sin(state.clock.elapsedTime * 2) * 0.4
      }
    }
  })

  return (
    <mesh ref={mesh} position={[0, 0, 0]}>
      <planeGeometry args={[20, 20, 64, 64]} />
      <shaderMaterial
        uniforms={uniforms}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
      />
    </mesh>
  )
}
