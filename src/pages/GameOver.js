import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";

import { StyledText } from "../utils/text";

function GameOver() {
  const ref = useRef();
  useFrame((state) => {
    const s = 1 + 0.01 * (1 + Math.sin(state.clock.getElapsedTime() * 2)) * 2;
    ref.current.scale.set(s, s, s);
  });
  return (
    <StyledText
      position={[0, 0.5, 1]}
      ref={ref}
      fontSize={2.5}
      children={"Game over"}
    />
  );
}

export default GameOver;
