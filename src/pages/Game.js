import React, { Suspense, useEffect, useState } from "react";

import { useHistory } from "react-router";
import { Canvas } from "@react-three/fiber";
import { Physics } from "@react-three/cannon";

import { useStore } from "../utils/store";
import { sendGameResult } from "../api";
import AirPlane from "../pages/Airplane";
import Clouds from "../pages/Clouds";
import Ground from "../pages/Ground";
import BonusObjects from "./BonusObjects";
import GameHearder from "./GameHearder";
import Startup from "../pages/StartUp";
import GameOver from "../pages/GameOver";

function Game() {
  const [remainEnergy, setRemainEnergy] = useState(null);
  const [isGameOver, setIsGameOver] = useState(false);

  const startup = useStore((state) => state.startup);
  const userEmail = useStore((state) => state.userEmail);
  const distance = useStore((state) => state.distance);
  const start = useStore((state) => state.start);
  const stopGameBg = useStore((state) => state.stopGameBg);
  const history = useHistory();

  useEffect(() => {
    if (remainEnergy !== null && remainEnergy < 1) {
      setIsGameOver(true);
    }
  }, [remainEnergy]);

  useEffect(async () => {
    let timer;
    if (isGameOver) {
      try {
        await sendGameResult(userEmail, distance);
        stopGameBg();
        timer = setTimeout(() => {
          history.push("/rank");
        }, 3000);
      } catch (err) {
        console.log(err);
      }
    }

    return () => {
      clearTimeout(timer);
    };
  }, [isGameOver]);

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
          <GameHearder
            position={[-5, 14, 0]}
            scale={0.001}
            setRemainEnergy={setRemainEnergy}
          />

          {!startup && !isGameOver && (
            <Physics
              defaultContactMaterial={{
                restitution: 1.07,
                contactEquationRelaxation: 20,
              }}
              gravity={[0, -5, 0]}
            >
              <AirPlane dispose={null} />
              <BonusObjects dispose={null} />
              <Clouds dispose={null} />
              <Ground position={[0, -290, -70]} rotationSpeed={0.01} />
            </Physics>
          )}
          {startup && !isGameOver && <Startup />}
          {isGameOver && !startup && <GameOver />}
        </Suspense>
      </Canvas>
    </div>
  );
}

export default Game;
