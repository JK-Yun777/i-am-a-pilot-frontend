import { Suspense } from "react";

import { useHistory } from "react-router";
import { Canvas } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import { animated, useSpring } from "@react-spring/three";

import { color } from "../utils/color";
import Hearder from "../components/Header";
import SelectAirplaneColor from "../components/SelectAirplaneColor";

const AnimatedText = animated(Text);

function Select() {
  const history = useHistory();

  const goToGame = () => {
    history.push("/game");
  };

  const spring = useSpring({
    loop: true,
    from: { scale: [10, 10, 10] },
    to: { scale: [13, 13, 13] },
    config: {
      friction: 10,
    },
  });

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
      <spotLight position={[10, 10, 10]} angle={0.15} />
      <Suspense fallback={null}>
        <Hearder position={[-5, 14, 0]} scale={0.001} />
        <AnimatedText
          {...spring}
          color={color.deepPink}
          onClick={goToGame}
          position={[12, 1, 0]}
        >
          Game Start
        </AnimatedText>
        <SelectAirplaneColor />
      </Suspense>
    </Canvas>
  );
}

export default Select;
