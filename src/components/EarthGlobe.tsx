import { useRef, useMemo } from 'react';
import { Canvas, useFrame, useLoader, extend } from '@react-three/fiber';
import { OrbitControls, shaderMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { TextureLoader } from 'three';

// Custom grayscale material
const GrayscaleEarthMaterial = shaderMaterial(
  {
    map: null,
    bumpMap: null,
    bumpScale: 0.05,
    lightPosition: new THREE.Vector3(5, 3, 3),
  },
  // Vertex shader
  `
    varying vec2 vUv;
    varying vec3 vNormal;
    varying vec3 vPosition;
    
    void main() {
      vUv = uv;
      vNormal = normalize(normalMatrix * normal);
      vPosition = (modelViewMatrix * vec4(position, 1.0)).xyz;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  // Fragment shader
  `
    uniform sampler2D map;
    uniform vec3 lightPosition;
    
    varying vec2 vUv;
    varying vec3 vNormal;
    varying vec3 vPosition;
    
    void main() {
      vec4 texColor = texture2D(map, vUv);
      
      // Convert to grayscale
      float gray = dot(texColor.rgb, vec3(0.299, 0.587, 0.114));
      
      // Increase contrast - make continents white, oceans dark
      gray = smoothstep(0.15, 0.55, gray);
      
      // Calculate lighting
      vec3 lightDir = normalize(lightPosition - vPosition);
      float diff = max(dot(vNormal, lightDir), 0.0);
      float ambient = 0.3;
      float lighting = ambient + diff * 0.7;
      
      // Apply lighting to grayscale
      vec3 finalColor = vec3(gray) * lighting;
      
      gl_FragColor = vec4(finalColor, 1.0);
    }
  `
);

extend({ GrayscaleEarthMaterial });

const Earth = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<any>(null);
  
  const earthTexture = useLoader(
    TextureLoader,
    'https://unpkg.com/three-globe@2.31.0/example/img/earth-blue-marble.jpg'
  );

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.08;
    }
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[2, 64, 64]} />
      {/* @ts-ignore */}
      <grayscaleEarthMaterial
        ref={materialRef}
        map={earthTexture}
        lightPosition={[5, 3, 3]}
      />
    </mesh>
  );
};

const EarthGlobe = () => {
  return (
    <div className="h-[400px] w-full">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        style={{ background: 'transparent' }}
      >
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
