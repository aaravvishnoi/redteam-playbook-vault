import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere } from '@react-three/drei';
import * as THREE from 'three';

const WireframeEarth = () => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.1;
    }
  });

  return (
    <group>
      {/* Main sphere wireframe */}
      <Sphere ref={meshRef} args={[2, 32, 32]}>
        <meshBasicMaterial
          wireframe
          color="#ffffff"
          transparent
          opacity={0.3}
        />
      </Sphere>

      {/* Latitude lines */}
      {[-60, -30, 0, 30, 60].map((lat, i) => (
        <mesh key={`lat-${i}`} rotation={[Math.PI / 2, 0, 0]} position={[0, Math.sin((lat * Math.PI) / 180) * 2, 0]}>
          <ringGeometry args={[Math.cos((lat * Math.PI) / 180) * 2 - 0.01, Math.cos((lat * Math.PI) / 180) * 2, 64]} />
          <meshBasicMaterial color="#ffffff" side={THREE.DoubleSide} transparent opacity={0.5} />
        </mesh>
      ))}

      {/* Longitude lines */}
      {[0, 30, 60, 90, 120, 150].map((lon, i) => (
        <mesh key={`lon-${i}`} rotation={[0, (lon * Math.PI) / 180, 0]}>
          <torusGeometry args={[2, 0.005, 8, 64]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.5} />
        </mesh>
      ))}

      {/* Axis line */}
      <mesh>
        <cylinderGeometry args={[0.01, 0.01, 5, 8]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.3} />
      </mesh>
    </group>
  );
};

const EarthGlobe = () => {
  return (
    <div className="h-[400px] w-full">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 45 }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.5} />
        <WireframeEarth />
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
