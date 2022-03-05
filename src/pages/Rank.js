import { Canvas } from "@react-three/fiber";

import Hearder from "./Hearder";

function Rank() {
  console.log("Rank!!");
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
      <Hearder position={[-4, 14, 0]} scale={0.001} />
    </Canvas>
  );
}

export default Rank;
