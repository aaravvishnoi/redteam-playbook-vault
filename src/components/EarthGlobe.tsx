import { useRef } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { TextureLoader } from 'three';

const Earth = () => {
  const meshRef = useRef<THREE.Group>(null);
  
  // Load earth textures
  const earthTexture = useLoader(
    TextureLoader,
    'https://unpkg.com/three-globe@2.31.0/example/img/earth-dark.jpg'
  );
  
  const earthOutline = useLoader(
    TextureLoader,
    'https://unpkg.com/three-globe@2.31.0/example/img/earth-topology.png'
  );

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.1;
    }
  });

  return (
    <group ref={meshRef}>
      {/* Base Earth */}
      <mesh>
        <sphereGeometry args={[2, 64, 64]} />
        <meshStandardMaterial
          map={earthTexture}
          color="#888888"
          emissive="#000000"
          roughness={1}
          metalness={0}
        />
      </mesh>
      
      {/* Continent outlines overlay */}
      <mesh>
        <sphereGeometry args={[2.01, 64, 64]} />
        <meshBasicMaterial
          map={earthOutline}
          transparent
          opacity={0.6}
          blending={THREE.AdditiveBlending}
          color="#ffffff"
        />
      </mesh>
      
      {/* Edge glow outline */}
      <mesh>
        <sphereGeometry args={[2.03, 64, 64]} />
        <meshBasicMaterial
          color="#ffffff"
          transparent
          opacity={0.05}
          side={THREE.BackSide}
        />
      </mesh>
    </group>
  );
};

const EarthGlobe = () => {
  return (
    <div className="h-[400px] w-full">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 3, 5]} intensity={0.8} color="#ffffff" />
        <Earth />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          rotateSpeed={0.5}
          autoRotate={false}
        />
      </Canvas>
    </div>
  );
};

export default EarthGlobe;
