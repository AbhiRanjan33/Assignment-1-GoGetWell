"use client"

import { useRef, useEffect } from "react"
import * as THREE from "three"
import { Canvas, useFrame } from "@react-three/fiber"

interface ParticlesProps {
  count?: number
  size?: number
  color?: string
  speed?: number
}

function Particles({ count = 500, size = 0.05, color = "white", speed = 0.001 }: ParticlesProps) {
  const mesh = useRef<THREE.Points>(null!)
  const positions = useRef<Float32Array>(null!)
  const velocities = useRef<Float32Array>(null!)

  useEffect(() => {
    if (!mesh.current) return

    const geometry = mesh.current.geometry as THREE.BufferGeometry
    positions.current = new Float32Array(count * 3)
    velocities.current = new Float32Array(count * 3)

    const radius = 3

    for (let i = 0; i < count; i++) {
      const i3 = i * 3

      // Random positions on the surface of a sphere
      const theta = Math.random() * 2 * Math.PI
      const phi = Math.acos(2 * Math.random() - 1)

      positions.current[i3] = radius * Math.sin(phi) * Math.cos(theta)
      positions.current[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
      positions.current[i3 + 2] = radius * Math.cos(phi)

      // Random velocities
      velocities.current[i3] = (Math.random() - 0.5) * 0.01
      velocities.current[i3 + 1] = (Math.random() - 0.5) * 0.01
      velocities.current[i3 + 2] = (Math.random() - 0.5) * 0.01
    }

    // Update geometry
    if (mesh.current && positions.current) {
      mesh.current.geometry.setAttribute("position", new THREE.BufferAttribute(positions.current, 3))
    }
  }, [count])

  useFrame(() => {
    if (!mesh.current || !positions.current || !velocities.current) return

    const positions = mesh.current.geometry.attributes.position.array as Float32Array

    for (let i = 0; i < positions.length; i += 3) {
      // Update positions based on velocities
      positions[i] += velocities.current[i]
      positions[i + 1] += velocities.current[i + 1]
      positions[i + 2] += velocities.current[i + 2]

      // Boundary check - if particle goes too far, bring it back
      const distance = Math.sqrt(positions[i] ** 2 + positions[i + 1] ** 2 + positions[i + 2] ** 2)

      if (distance > 3) {
        velocities.current[i] *= -1
        velocities.current[i + 1] *= -1
        velocities.current[i + 2] *= -1
      }
    }

    mesh.current.geometry.attributes.position.needsUpdate = true
    mesh.current.rotation.y += speed
  })

  return (
    <points ref={mesh}>
      <bufferGeometry />
      <pointsMaterial size={size} color={color} transparent opacity={0.6} />
    </points>
  )
}

export default function ParticleBackground({ className = "" }: { className?: string }) {
  return (
    <div className={`absolute inset-0 -z-10 ${className}`}>
      <Canvas camera={{ position: [0, 0, 2], fov: 60 }}>
        <ambientLight intensity={0.5} />
        <Particles />
      </Canvas>
    </div>
  )
}
