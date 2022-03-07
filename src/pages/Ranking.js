import { Suspense } from "react";

import { useHistory } from "react-router";
import { Canvas } from "@react-three/fiber";
import { Stars, Text } from "@react-three/drei";

import { color } from "../utils/color";
import { useStore } from "../utils/store";
import RankHearder from "../components/Rank/RankHearder";
import Rank from "../components/Rank";

function Ranking() {
  const history = useHistory();
  const logout = useStore((state) => state.logout);

  const goToGame = () => {
    history.push("/game");
  };

  const goToMain = () => {
    logout();
    history.push("/");
  };
  return (
    <div>
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
          <RankHearder position={[-5, 14, 0]} scale={0.001} />
          <Text
            position={[-2.5, 6, 0]}
            scale={10}
            color={color.rankTitle}
            onClick={goToGame}
          >
            RESTART
          </Text>
          <Text position={[0, 6, 0]} scale={12} color={color.rankTitle}>
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
    </div>
  );
}

export default Ranking;
