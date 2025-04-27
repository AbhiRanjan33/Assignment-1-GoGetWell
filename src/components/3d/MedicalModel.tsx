"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { Float, MeshTransmissionMaterial } from "@react-three/drei"
import { Vector3 } from "three"

export function DNAHelix({ position = [0, 0, 0], scale = 1, color1 = "#3b82f6", color2 = "#8b5cf6" }) {
  const groupRef = useRef()

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = clock.getElapsedTime() * 0.5
    }
  })

  // Create DNA helix structure
  const strandCount = 20
  const radius = 2
  const height = 10
  const twists = 2

  const strand1 = []
  const strand2 = []
  const connections = []

  for (let i = 0; i < strandCount; i++) {
    const angle = (i / strandCount) * Math.PI * 2 * twists
    const y = (i / strandCount) * height - height / 2

    // First strand
    const x1 = Math.cos(angle) * radius
    const z1 = Math.sin(angle) * radius

    // Second strand (opposite side)
    const x2 = Math.cos(angle + Math.PI) * radius
    const z2 = Math.sin(angle + Math.PI) * radius

    strand1.push(
      <mesh key={`strand1-${i}`} position={[x1, y, z1]} scale={0.3}>
        <sphereGeometry args={[0.5, 16, 16]} />
        <meshStandardMaterial color={color1} />
      </mesh>,
    )

    strand2.push(
      <mesh key={`strand2-${i}`} position={[x2, y, z2]} scale={0.3}>
        <sphereGeometry args={[0.5, 16, 16]} />
        <meshStandardMaterial color={color2} />
      </mesh>,
    )

    // Add connections every other node
    if (i % 2 === 0 && i < strandCount - 1) {
      connections.push(
        <mesh key={`connection-${i}`} position={[(x1 + x2) / 2, y, (z1 + z2) / 2]}>
          <cylinderGeometry args={[0.1, 0.1, radius * 2, 8]} rotation={[0, 0, Math.PI / 2]} />
          <meshStandardMaterial color="#ffffff" opacity={0.7} transparent />
        </mesh>,
      )
    }
  }

  return (
    <group ref={groupRef} position={new Vector3(...position)} scale={scale}>
      {strand1}
      {strand2}
      {connections}
    </group>
  )
}

export function StethoscopeModel({ position = [0, 0, 0], scale = 1, rotation = [0, 0, 0] }) {
  const groupRef = useRef()

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(clock.getElapsedTime() * 0.5) * 0.2 + rotation[1]
    }
  })

  return (
    <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
      <group ref={groupRef} position={new Vector3(...position)} scale={scale} rotation={rotation}>
        {/* Stethoscope head */}
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[1, 1, 0.3, 32]} />
          <MeshTransmissionMaterial
            backside
            samples={4}
            thickness={0.5}
            roughness={0.1}
            clearcoat={0.1}
            clearcoatRoughness={0.1}
            transmission={1}
            ior={1.5}
            chromaticAberration={0.06}
            color="#3b82f6"
          />
        </mesh>

        {/* Membrane */}
        <mesh position={[0, 0.2, 0]}>
          <cylinderGeometry args={[0.9, 0.9, 0.05, 32]} />
          <meshStandardMaterial color="#e0f2fe" metalness={0.8} roughness={0.2} />
        </mesh>

        {/* Tube start */}
        <mesh position={[0, -0.3, 0.7]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.15, 0.15, 1, 16]} />
          <meshStandardMaterial color="#3b82f6" />
        </mesh>

        {/* Tube bend */}
        <mesh position={[0, -0.3, 1.2]}>
          <torusGeometry args={[0.5, 0.15, 16, 32, Math.PI / 2]} rotation={[Math.PI / 2, 0, 0]} />
          <meshStandardMaterial color="#3b82f6" />
        </mesh>

        {/* Tube vertical */}
        <mesh position={[0.5, 0.7, 1.2]} rotation={[0, 0, 0]}>
          <cylinderGeometry args={[0.15, 0.15, 2, 16]} />
          <meshStandardMaterial color="#3b82f6" />
        </mesh>

        {/* Tube split */}
        <mesh position={[0.5, 1.7, 1.2]}>
          <sphereGeometry args={[0.2, 16, 16]} />
          <meshStandardMaterial color="#3b82f6" />
        </mesh>

        {/* Left ear tube */}
        <mesh position={[0.2, 2, 1.2]} rotation={[0, 0, Math.PI / 4]}>
          <cylinderGeometry args={[0.1, 0.1, 0.8, 16]} />
          <meshStandardMaterial color="#3b82f6" />
        </mesh>

        {/* Right ear tube */}
        <mesh position={[0.8, 2, 1.2]} rotation={[0, 0, -Math.PI / 4]}>
          <cylinderGeometry args={[0.1, 0.1, 0.8, 16]} />
          <meshStandardMaterial color="#3b82f6" />
        </mesh>

        {/* Left earpiece */}
        <mesh position={[-0.1, 2.3, 1.2]} rotation={[Math.PI / 2, 0, 0]}>
          <capsuleGeometry args={[0.15, 0.3, 8, 16]} />
          <meshStandardMaterial color="#1e40af" />
        </mesh>

        {/* Right earpiece */}
        <mesh position={[1.1, 2.3, 1.2]} rotation={[Math.PI / 2, 0, 0]}>
          <capsuleGeometry args={[0.15, 0.3, 8, 16]} />
          <meshStandardMaterial color="#1e40af" />
        </mesh>
      </group>
    </Float>
  )
}

export function PillModel({ position = [0, 0, 0], scale = 1, color1 = "#3b82f6", color2 = "#ffffff" }) {
  const pillRef = useRef()

  useFrame(({ clock }) => {
    if (pillRef.current) {
      pillRef.current.rotation.y = clock.getElapsedTime()
    }
  })

  return (
    <Float speed={2} rotationIntensity={0.3} floatIntensity={0.5}>
      <group ref={pillRef} position={new Vector3(...position)} scale={scale}>
        {/* Left half of pill */}
        <mesh position={[-0.5, 0, 0]}>
          <capsuleGeometry args={[0.5, 1, 8, 16]} />
          <meshStandardMaterial color={color1} />
        </mesh>

        {/* Right half of pill */}
        <mesh position={[0.5, 0, 0]}>
          <capsuleGeometry args={[0.5, 1, 8, 16]} />
          <meshStandardMaterial color={color2} />
        </mesh>
      </group>
    </Float>
  )
}

export function MedicalSphere({ position = [0, 0, 0], scale = 1 }) {
  const sphereRef = useRef()

  useFrame(({ clock }) => {
    if (sphereRef.current) {
      sphereRef.current.rotation.y = clock.getElapsedTime() * 0.2
      sphereRef.current.rotation.z = clock.getElapsedTime() * 0.1
    }
  })

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.3}>
      <group ref={sphereRef} position={new Vector3(...position)} scale={scale}>
        <mesh>
          <sphereGeometry args={[1, 32, 32]} />
          <MeshTransmissionMaterial
            backside
            samples={4}
            thickness={0.5}
            roughness={0.1}
            clearcoat={0.1}
            clearcoatRoughness={0.1}
            transmission={1}
            ior={1.5}
            chromaticAberration={0.06}
            color="#3b82f6"
          />
        </mesh>

        {/* Rings around the sphere */}
        <mesh rotation={[0, 0, Math.PI / 2]}>
          <torusGeometry args={[1.2, 0.05, 16, 100]} />
          <meshStandardMaterial color="#8b5cf6" transparent opacity={0.7} />
        </mesh>

        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[1.2, 0.05, 16, 100]} />
          <meshStandardMaterial color="#8b5cf6" transparent opacity={0.7} />
        </mesh>
      </group>
    </Float>
  )
}
