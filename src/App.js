import React, { Suspense, useEffect, useState } from "react";

import { Canvas } from "@react-three/fiber";
import { Physics } from "@react-three/cannon";
import { PresentationControls } from "@react-three/drei";

import { useStore } from "./utils/store";
import AirPlane from "./pages/Airplane";
import Clouds from "./pages/Clouds";
import Ground from "./pages/Ground";
import Obstacle from "./pages/Obstacle";
import Hearder from "./pages/Hearder";
import Startup from "./pages/StartUp";
import GameOver from "./pages/GameOver";

function App() {
  const [remainEnergy, setRemainEnergy] = useState(null);
  const [isGameOver, setIsGameOver] = useState(false);
  // const points = useStore((state) => state.points);
  const startup = useStore((state) => state.startup);
  const start = useStore((state) => state.start);

  useEffect(() => {
    if (remainEnergy !== null && remainEnergy < 1) {
      setIsGameOver(true);
    }
  }, [remainEnergy]);

  return (
    <div onClick={start}>
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
        <Suspense fallback={null}>
          <PresentationControls
            global
            config={{ mass: 2, tension: 500 }}
            snap={{ mass: 4, tension: 1500 }}
            polar={[-Math.PI / 3, Math.PI / 3]}
            azimuth={[-Math.PI / 1.4, Math.PI / 2]}
          >
            <Hearder
              rotation={[-Math.PI / 2, 0, 0]}
              position={[-19, 80, 0]}
              scale={0.003}
              setRemainEnergy={setRemainEnergy}
            />
          </PresentationControls>
          {!startup && !isGameOver && (
            <Physics
              defaultContactMaterial={{
                restitution: 1.07,
                contactEquationRelaxation: 20,
              }}
              gravity={[0, -5, 0]}
            >
              <AirPlane />
              <Obstacle />
              <Clouds />
              <Ground />
            </Physics>
          )}
          {startup && !isGameOver && <Startup />}
          {isGameOver && !startup && <GameOver />}
        </Suspense>
      </Canvas>
    </div>
  );
}

export default App;
