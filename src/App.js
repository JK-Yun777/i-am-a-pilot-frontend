import React from "react";

import { Canvas } from "@react-three/fiber";

import Ground from "./components/Ground";

function App() {
  return (
    <Canvas className="canvas">
      <ambientLight intensity={0.5} />
      <spotLight position={[0, 10, 0]} />
      <Ground />
    </Canvas>
  );
}

export default App;
