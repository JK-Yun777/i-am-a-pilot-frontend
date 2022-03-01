import React from "react";

import { Canvas } from "@react-three/fiber";

import AirPlane from "./pages/Airplane";

function App() {
  return (
    <Canvas
      className="canvas"
      colorManagement
      camera={{ position: [0, 0, 50], fov: 70 }}
    >
      <ambientLight intensity={0.5} />
      <directionalLight castShadow position={[0, 10, 0]} intensity={0.5} />
      <AirPlane />
    </Canvas>
  );
}

export default App;
