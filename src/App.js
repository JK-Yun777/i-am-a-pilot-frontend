import React, { Suspense } from "react";

import { Canvas } from "@react-three/fiber";
import { Physics } from "@react-three/cannon";
import { OrbitControls } from "@react-three/drei";

import AirPlane from "./pages/Airplane";
// import Ground from "./pages/Ground";
import Obstacle from "./pages/Obstacle";
import { useStore } from "./utils/store";
import { Particles } from "./components/Particle";

function App() {
  const points = useStore((state) => state.points);
  console.log(points);
  return (
    <Canvas
      className="canvas"
      colorManagement
      shadows
      camera={{
        position: [0, 0, 20],
        fov: 70,
      }}
    >
      <ambientLight intensity={0.5} />
      <directionalLight castShadow position={[0, 10, 0]} intensity={0.5} />
      <Physics
        defaultContactMaterial={{
          restitution: 1.07,
          contactEquationRelaxation: 20,
        }}
        gravity={[0, -5, 0]}
      >
        <Suspense fallback={null}>
          <AirPlane />
          <Obstacle />
          <Particles />
        </Suspense>
        {/* <Ground /> */}
      </Physics>
      <OrbitControls enablePan={false} enableZoom={true} enableRotate={false} />
    </Canvas>
  );
}

export default App;
