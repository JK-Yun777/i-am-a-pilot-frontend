import React, { Suspense } from "react";

import { useHistory } from "react-router";
import { Canvas } from "@react-three/fiber";
import { Stars, Text } from "@react-three/drei";

import { color } from "../utils/color";
import { useStore } from "../utils/store";
import Header from "../components/Header";
import Rank from "../components/Rank";

function Ranking() {
  const history = useHistory();
  const logout = useStore((state) => state.logout);
  const reset = useStore((state) => state.reset);
  const startRankBg = useStore((state) => state.startRankBg);
  const stopRankBg = useStore((state) => state.stopRankBg);

  startRankBg();

  const goToGame = () => {
    reset();
    stopRankBg();
    window.location.replace("/game");
  };

  const goToMain = () => {
    logout();
    stopRankBg();
    localStorage.removeItem("user");
    history.push("/");
  };

  return (
    <Canvas
      className="ranking-canvas"
      colorManagement
      shadows
      camera={{
        position: [0, 0, 20],
        fov: 70,
      }}
    >
      <ambientLight />
      <Suspense fallback={null}>
        <Header position={[-5, 14, 0]} scale={0.001} hearderTitle={"Rank"} />
        <Text
          position={[-2.8, 6, 0]}
          scale={10}
          color={color.rankTitle}
          onClick={goToGame}
        >
          RESTART
        </Text>
        <Text position={[-0.1, 6, 0]} scale={12} color={color.rankTitle}>
          |
        </Text>
        <Text
          position={[2.5, 6, 0]}
          scale={10}
          color={color.rankTitle}
          onClick={goToMain}
        >
          LOGOUT
        </Text>
        <Rank />
        <Stars
          radius={100}
          depth={100}
          count={2000}
          factor={6}
          saturation={0}
          fade={true}
        />
      </Suspense>
    </Canvas>
  );
}

export default Ranking;
